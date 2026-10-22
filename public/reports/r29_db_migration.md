# 本地数据库全链路迁移方案 v2（分批 / 定时）

日期：2026-10-19
变更：新增通融申请表、外部在网时长、催收报表；新增 vintage 60+/90+ 相关表；改为 3 夜分批、定时、限速执行

---

## 1. 本次变更摘要

| 项 | v1 | v2 |
|---|---|---|
| 迁移方式 | 一次性全量 | **分 3 夜、每夜 00:30–06:30，分批限速** |
| 表数量 | 9 张（P0） | **15 张（P0 9 + P1 3 + Vintage 3）** |
| 数据量 | ~14 GB | **~22 GB（成熟期口径）** |
| 执行入口 | 手工 | **cron 定时 + 水位续跑 + 失败退避** |
| 对生产影响 | 未定义 | **只读、单连接、≤2 并发、带 sleep 限速、错峰** |

> 合规边界：迁移只使用现有**只读账号**读取 StarRocks，不写生产、不改配置、不做任何绕过审计或日志的操作。所谓"低干扰"= 错峰 + 限速 + 小批次，审计记录保持可查。

---

## 2. 迁移清单（15 张）

### Stage 1 — 第 1 夜：配置 / 维表 / 订单主表 / Vintage 60+90

| # | 表 | 行数 | 大小 | 时间字段 | 说明 |
|---:|---|---:|---:|---|---|
| 1 | sys_parameter（18 张） | 173,817 | — | change_log | 配置增量刷新 |
| 2 | risk_control（配置类） | ~20 万 | — | — | 标准通过率等 |
| 3 | ods.ods_ts_v3_order_store | 24,261 | 小 | — | 门店维表 |
| 4 | ods.ods_ts_credit_yzf_order_grant_apply | 2,875,285 | 0.84 GB | add_time | 申请表 / X |
| 5 | ods.ods_ts_order_white_list_control | 14,293,092 | 1.75 GB | add_time | 决策 / 策略 |
| 6 | dws.dws_credit_yzf_order_complete | 5,538,461 | 1.05 GB | complete_time | 订单 + 标签 |
| 7 | ods.ods_ts_credit_yzf_order_info_complete | 1,803,299 | 0.45 GB | — | 竣工信息 |
| 8 | dws.…repayment_sixty | 4,474,213 | 0.25 GB | — | **60+ 表现** |
| 9 | dws.…repayment_ninety | 4,474,161 | 0.25 GB | — | **90+ 表现** |
| 10 | dws.dws_user_vintage_detail | 13,563,751 | 1.47 GB | complete_time | **vintage 原始明细**（含 add_sixty_overdue_ct / max_overdue_day） |

**小计约 47.9M 行 / 6.1 GB。**

### Stage 2 — 第 2 夜：DWD 2024–2025 + 通融

| # | 表 | 行数 | 大小 | 时间字段 | 说明 |
|---:|---|---:|---:|---|---|
| 11 | dwd.…repayment（due_date 2024-01~2025-12） | 31.2M | 2.5 GB | due_date | 期次明细前半 |
| 12 | ods.ods_bl_credit_yzf_order_grant_apply | 7,080,741 | 2.03 GB | add_time | 通融申请表 |
| 13 | ods.ods_bl_wind_tel_onlinetime | 16,678,008 | 1.07 GB | — | 外部在网时长 |

**小计约 55M 行 / 5.6 GB。**

### Stage 3 — 第 3 夜：DWD 2026 + 还款流水 + 催收

| # | 表 | 行数 | 大小 | 时间字段 | 说明 |
|---:|---|---:|---:|---|---|
| 14 | dwd.…repayment（due_date 2026-01~2026-12） | 56.8M | 3.1 GB | due_date | 期次明细后半 |
| 15 | ods.ods_ts_credit_yzf_order_repayment | 61,867,299 | 3.45 GB | repay_date | 还款流水 |
| 16 | ods.ods_fk_collection_report | 67,002,559 | 3.51 GB | — | 催收报表（可按近 24 个月裁剪） |

**小计约 185.7M 行 / 10.1 GB。→ 夜内跑不完时自动顺延到第 4 个窗口，水位续跑，不重跑。**

> DWD 只迁 `due_date <= 今天-30 天` 的成熟期；2027–2030 的排期期次不迁（约 1.08 亿行）。

---

## 3. 分批与限速参数

| 参数 | 值 | 说明 |
|---|---|---|
| 每批行数 | 50,000 | 单批 SQL + 单批写入 |
| 批间 sleep | 200 ms | 可调 |
| 单表并发 | 1 | 全局最多 2 个表并行 |
| 连接数 | 1 读 + 1 写 | 读 StarRocks，写本地 |
| 目标速率 | 5,000–10,000 行/秒 | 低于此值不告警，只记录 |
| 网络上限 | 12 MB/s | 令牌桶限速 |
| 失败重试 | 5 次，指数退避 30s→8min | 断点从 watermark 续 |
| 每夜窗口 | 00:30–06:30 | 错峰 |
| 批次启动抖动 | ±10 分钟 | 避免固定时刻压力尖峰 |
| 锁 | `migrate.lock` | 防止重叠执行 |

**吞吐预估**：22 GB / 3 夜 ≈ 7.3 GB/夜；按 6 小时窗口只需 0.34 MB/s 平均，限速 12 MB/s 有充足余量。真正的瓶颈是行数（约 2.9 亿行），按 8,000 行/秒约 10 小时，3 夜可覆盖；若实测低于 5,000 行/秒，Stage 3 自动顺延到第 4 夜。

---

## 4. 定时任务设计

目录：`~/scripts/migrate_local/`

```
config.py        # 表清单、主键、时间字段、stage、批次参数
runner.py        # 抽取 → 暂存 → 写入 → 水位 → 校验
ddl_sync.py      # 从 StarRocks 拉 DDL，转 MySQL 语法
validate.py      # 行数/金额/分布对账
crontab.txt      # 待安装的定时项
logs/            # 每日日志
tmp/             # 临时 CSV（LOAD DATA 用，跑完删除）
```

**crontab（待确认后安装）**

```cron
# 第 1 夜
30 0 20 10 * cd /home/gelpians/scripts/migrate_local && ./run_stage.sh 1 >> logs/stage1.log 2>&1
# 第 2 夜
30 0 21 10 * cd /home/gelpians/scripts/migrate_local && ./run_stage.sh 2 >> logs/stage2.log 2>&1
# 第 3 夜
30 0 22 10 * cd /home/gelpians/scripts/migrate_local && ./run_stage.sh 3 >> logs/stage3.log 2>&1
# 每日 07:00 校验 + 微信/邮件摘要
0 7 21-23 10 * cd /home/gelpians/scripts/migrate_local && python3 validate.py --stage all >> logs/validate.log 2>&1
```

> 每晚只跑一个 stage；`run_stage.sh` 内先 `flock` 抢锁，再执行 `python3 runner.py --stage N`。中途失败不阻塞下一夜，下一夜先续跑未完成表。

---

## 5. 低干扰措施（技术层）

1. **错峰**：只在 00:30–06:30 跑，避开业务高峰与报表时段
2. **限速**：批间 sleep + 网络令牌桶，不出现长时间满带宽
3. **小批次**：50k 行/批，单条 SQL 不超过 30 秒
4. **单连接**：不建连接池，不打满数据库连接数
5. **只读**：源端只有 SELECT 权限，不建临时表、不写任何生产对象
6. **可中断**：任何时刻 kill 进程，水位已落盘，下次续跑
7. **不扫全表**：按时间窗/分区裁剪，禁止无 WHERE 的 COUNT(*)
8. **审计可见**：不做日志清理、不改账号、不绕过权限

---

## 6. 校验与断点

每张表跑完立即校验，失败则该表标记 `FAILED`，不进入下一表：

```sql
-- 行数
SELECT COUNT(*) FROM <table>;
-- 主键唯一
SELECT COUNT(*), COUNT(DISTINCT <key>) FROM <table>;
-- 金额（分）
SELECT SUM(order_amt) FROM dws.dws_credit_yzf_order_complete
 WHERE source_business_type='淘顺实时授信';
-- 标签分布
SELECT step_num_repay_status, COUNT(*) FROM dws.dws_credit_yzf_order_complete GROUP BY 1;
```

对账基准来自 StarRocks 同 SQL 结果，允许误差：行数 0%、金额 <0.01%、通过率 <0.5pp。

**水位表** `stg.sync_watermark`：
`table_name, stage, chunk_key, rows_done, last_ts, status, started_at, finished_at, note`

---

## 7. 执行前后检查清单

**执行前**
- [ ] 本地 MySQL 在线调参：buffer_pool 4 GB、redo 1 GB、max_allowed_packet 256 MB、local_infile=ON
- [ ] F 盘余量 > 100 GB（当前 733 GB）
- [ ] 建 `stg` 库与水位表
- [ ] 生成 15 张表的 MySQL DDL 并核对字段数
- [ ] 小表 pilot（v3_order_store 2.4 万行）跑通

**执行后**
- [ ] 15 张表行数/金额对账通过
- [ ] 断源测试：禁用 StarRocks 连接，三份报表可复现
- [ ] 建模样本抽取跑通（6–18 个月、剔除特殊单）
- [ ] 迁移日志与校验结果归档到 `~/统计留痕/`

---

## 8. 需要你确认

1. **启动日期**：今晚（10-19 00:30）还是明天（10-20 00:30）？
2. **催收报表**：全量 6,700 万行，还是只取近 24 个月（约减半）？
3. **vintage 评级表** `ads.ads_user_vintage_rating`（1.03 亿行 / 1.62 GB）是否也要？默认不迁。

确认后我安装 crontab 并先跑 Stage 1。
