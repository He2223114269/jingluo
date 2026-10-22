# 配置更新机制全面梳理报告（2026-08-24）

> 背景：2026-08-21 发生配置推送覆盖事故（215 行被触碰），当日修复三层防线。2026-08-24 应要求对整个更新机制重新梳理、对齐每个细节。
> 梳理范围：`risk_engine/toolkit/sync/` 下 config_push.py / runner.py / ddl_registry.py / sync_config_report.py / sync_tracker.py

## 2026-08-24 同日修复已完成 ✅

1. **BUSINESS_KEYS 补齐**：risk_model→[model_id]、risk_pack_info→[business_type, province, pack_id]（修复 id 对齐失效）
2. **BIZ_RULES 双层校验**（新增）：行级（生产目标行业务键必须匹配期望值）+ 字段级（UPDATE 只允许改参数，禁止改身份/键/时间字段；INSERT 业务键必须匹配）
3. **_guard_other_business 重写**：按表用业务键列构造归属查询（修复 3 张表保护静默失效）；查询失败/命中其他业务 → 抛 RuntimeError 中止批次（不再静默跳过）
4. **_validate_field_changes**（新增）：改 score_code/channel_level/isv/update_time 等禁止字段 → 抛异常；INSERT 非期望业务 → 抛异常
5. **_strip_meta_fields**（新增）：推送前剥离 update_time/add_time，防止本地旧时间戳回退生产（8-21 事故 update_time 被刷的机制）
6. 单测 17/17 通过；真实环境干跑 8 表一致、无变更

## 2026-08-24 下午追加修复 ✅

7. **单一配置源 table_filters.py**：SYNC_FILTERS（分析视图，含通融）/ PUSH_FILTERS（推送视图，只淘顺）收敛，ddl_registry / config_push / sync_config_report 三处改为导入，消除重复维护漂移
8. **同步范围对齐推送范围**：risk_strategy_id_info 同步筛选 result='2511' → result IN ('2511','2604')，2604 行从"历史残留"变为正常同步行，消除陈旧值反向覆盖生产风险
9. **增量删除基准修复**：本地删除对比从"本地全表 − 源库筛选内"改为"本地筛选内 − 源库筛选内"（与全量语义一致），2604 残留不再被误删（修复前会删 20 条 → 连锁删生产；修复后 0 误删）
10. 验证：增量删除 0 误删、2604 全部在源库筛选内、推送范围仍 59=59

### 顺带发现（2026-08-24）
- 生产 risk_strategy_id_info 当天新增 576 行通融实时授信策略（add_time=update_time=2026-08-24），推送侧隔离不受影响（diff=0），同步侧下次全量会拉入本地

---

## 一、全链路概览

```
┌─────────────┐    sync_config()    ┌──────────────────┐   config_push.py   ┌─────────────┐
│  生产源库 bl  │ ──────────────────▶ │ 本地 sys_parameter │ ─────────────────▶ │  生产源库 bl  │
│ bailv_np.8表 │   全量/增量拉取      │   (分析+修改视图)   │   diff→确认→API写入 │ bailv_np.8表 │
└─────────────┘                     └──────────────────┘                    └─────────────┘
      ▲                                                                           │
      └──────────────── 推送成功后自动 sync_config(full) 回读校验 ←────────────────┘
```

**两条通道、两个视图（关键设计）**：
- **同步（bl→本地）**：本地是"分析视图"，筛选 = `isv IN ('淘顺','通融')`，**含通融**，供查看/分析
- **推送（本地→bl）**：只推"淘顺实时授信"范围，**不含通融** → 通融行永远不会被推送触碰 ✅
- 写入生产统一走 API `http://47.119.190.118:7999/table_change`（db_name=bl_risk），禁止裸 SQL 写 bl

**标准流程**：`plan.py` 录计划 → 改本地 `sys_parameter.*` → `config_validate.py` 校验 → `config_push.py` 推送（差异预览 + y/n 确认 + change_log）→ 自动 `sync_config(full)` 回读 → 逐表校验 → 报告用户 → 用户确认后落档

---

## 二、9 张配置表机制矩阵（2026-08-24 实测）

| 表 | 同步筛选(ddl_registry) | 推送筛选(config_push) | 业务键(BUSINESS_KEYS) | 覆盖保护生效? | 本地=生产(推送范围) |
|---|---|---|---|---|---|
| risk_business | 淘顺+通融 实时授信 | 淘顺 实时授信 | ✅ isv+bussiness+model_id | ✅ | 3=3 ✅ |
| risk_score_control | 淘顺+通融+生效/NULL | 淘顺+生效 | ✅ isv+bussiness+province+score_code | ✅ | 518=518 ✅ |
| risk_channel_control | 淘顺+通融 实时授信 | 淘顺 实时授信 | ✅ isv+bussiness+province+channel_level | ✅ | 130=130 ✅ |
| risk_city_control | 淘顺+通融 实时授信 | 淘顺 实时授信 | ✅ isv+bussiness+province+city | ✅ | 27=27 ✅ |
| risk_cutoff | 淘顺+通融 实时授信 | 淘顺（黑名单**不推**） | ✅ isv+bussiness+province+city | — | 80092=80092 ✅ |
| risk_strategy_id_info | 淘顺2511 + 通融实时授信 | 淘顺 2511/2604 | ✅ strategy_id | ❌ **失效**(无isv/bussiness列) | 59=59 ✅ |
| **risk_model** | **全量(无筛选)** | **全量(无筛选)** | ❌ **缺失** | ❌ **失效** | 14=14 ✅ |
| **risk_pack_info** | 翼支付实时授信 | 翼支付实时授信 | ❌ **缺失**(表有business_type可用) | ❌ **失效** | 865=865 ✅ |
| risk_pack_name_control | 实时授信(含通融) | 淘顺 实时授信 | ✅ isv+bussiness+province+pack_name | ✅ | 244=244 ✅ |

**当前全部一致（diff=0），推送不会产生任何变更。但结构上存在以下问题。**

---

## 三、问题清单

### 🔴 P0 — 推送侧覆盖保护漏洞（3 张表保护静默失效）

**根因**：`_guard_other_business()` 写死查 `isv, bussiness` 两列，而 `risk_strategy_id_info` / `risk_model` / `risk_pack_info` 三张表**没有这两列**（实测：SQL 报 `Unknown column 'isv'`）→ `_safe_read` 吞掉异常返回空 → `blocked=[]` → **保护被静默跳过，无任何告警**。

| 表 | 后果 |
|---|---|
| **risk_model**（最危险） | ① 无 BUSINESS_KEYS → `_reconcile_ids` 直接 return，**新行 id 裸用**，本地 id ≤ 生产全表 max(16) 时撞 id 即覆盖其他业务记录；② 全量推送（无筛选）→ 本地任何改动直接作用于全表（含 id=5 通融模型 tx_tianyu、id=16 测试行） |
| **risk_pack_info** | ① 无 BUSINESS_KEYS → id 不对齐，INSERT 撞 id 覆盖风险；② 保护失效 |
| **risk_strategy_id_info** | 有 strategy_id 业务键 → id 对齐保护在，风险较低；但归属保护无兜底 |

**8-21 三层防线修复漏了这两张无业务键的表**（BUSINESS_KEYS 字典里就没有它们）。

### 🔴 P0 — 增量同步会删掉"同步范围外但源库存在"的行（连锁污染生产）

**机制**：增量模式删除逻辑 = `本地全表 id − 源库同步筛选范围内 id`。
**实测**：`risk_strategy_id_info` 本地 112 行 = 同步范围内 92 + **历史残留 2604 行 20 条**（id 758-762 等，生产也有，内容一致）。这 20 条不在同步范围（同步只拉 result='2511'）→ **跑一次增量同步就被删** → 之后 push diff 出 20 条 DELETE → **生产 2604 策略配置被删**。

**当前侥幸安全**：实际调用方（config_push 推送后、sync_config_report.py 一键同步）都用 `mode="full"`（全量模式只删筛选范围内，保留残留行）；**增量模式无调用方**，但它是公开 API，任何人/脚本调用即触发。

**修复方向**：删除基准改为源库**全表** id（`local_ids − src_full_ids`），"源库仍存在的行"一律保留。

### 🟠 P1 — 同步/推送筛选条件三处重复维护，改一处漏一处

筛选条件同时存在于：
1. `ddl_registry.py` CONFIG_TABLES.filter_sql（同步用）
2. `config_push.py` TABLE_FILTERS（推送用）
3. `sync_config_report.py` TABLE_FILTERS（一键同步报告用）

且**有意不一致**（同步含通融、推送只淘顺）。一旦某人只改一处（比如把 2604 加进同步范围），两侧漂移 → 事故。建议收敛为单一配置源（如 ddl_registry 或独立 constants 模块），推送侧从同步侧派生（`淘顺子集`）。

### 🟠 P1 — 陈旧本地行反向覆盖生产（隐蔽风险）

**机制**：2604 行在同步范围外 → 生产 2604 若被外部修改，本地**永远不会同步更新**（残留旧值）→ push diff 时判定"本地有修改"→ **把生产新值推回旧值**。
当前 2604 本地=生产一致，未触发；但这是"陈旧数据覆盖生产新值"的机制漏洞，随生产侧人工调整增多而概率上升。
**修复方向**：同步范围与推送范围对齐（把 2604 纳入同步），或对"同步范围外的推送行"做来源标记，仅允许显式手工维护。

### 🟡 P2 — 校验盲区

`_verify_table` 对无 BUSINESS_KEYS 的表（risk_model / risk_pack_info）退化为硬编码字段交集（可能为空）→ **只能比行数，内容错乱验不出**。需补匹配键（risk_model→model_id；risk_pack_info→business_type+province+pack_id）。

### 🟡 P2 — 恢复能力：快照齐全，但无自动回滚

change_log 实测（5,646 条）：
- UPDATE 4,022 条，旧值覆盖率 **99.8%**
- DELETE 160 条，整行 JSON 旧值覆盖率 **100%**
- 字段：batch_id/table_name/row_id/field_name/old_value/new_value/operation_type/status/api_request/api_response

**但只有 `--history` 查看，没有 `--rollback` 命令**。恢复 = 从 change_log 捞 old_value 手写 SQL 反向写回。建议补 `config_push.py --rollback --batch BXXXX`（自动反向 UPDATE / 重新 INSERT 被删行 / DELETE 误插行），并做一次恢复演练。

### 🟡 顺带发现（非本次机制问题）

- 生产 risk_pack_name_control 有 2 条通融异常行（id 239113/239114，广西，橙分期，pass_ratio=-1.00）——即 8-21 事故遗留的"通融 2 条 -1.0"，本地同步范围内缺失（增量会补拉），正确值待拍板
- 生产 risk_model 含 id=16 `TEST_NULL101205 测试无id推送_请删除`（status=0）测试残留，建议清理
- risk_cutoff 本地 94,938 行（淘顺 80,092 + 通融 14,846），在推送黑名单 ✅ 正确

---

## 四、修复建议（按优先级）

| # | 优先级 | 修复项 | 工作量 |
|---|---|---|---|
| 1 | P0 | `_guard_other_business` 改造：按表适配归属判断（有 isv/bussiness 用两列，否则用 business_type / model_id 等），**SQL 失败必须告警中断，禁止静默跳过** | 半天 |
| 2 | P0 | 补 BUSINESS_KEYS：risk_model→[model_id]、risk_pack_info→[business_type, province, pack_id]（用户确认键组合） | 1h |
| 3 | P1 | 增量同步删除基准改为源库全表 id（保留源库仍存在的行，保护 2604 残留） | 1h |
| 4 | P1 | 筛选条件收敛单一配置源 + 同步/推送范围对齐（2604 纳入同步） | 半天 |
| 5 | P1 | `_verify_table` 补 risk_model / risk_pack_info 匹配键 | 1h |
| 6 | P2 | `--rollback --batch` 自动回滚命令 + 恢复演练 | 1天 |
| 7 | P2 | 通融 2 条 -1.0 正确值、risk_model 测试行清理（需用户拍板） | — |

**不改动时的现状**：推送链路对 5 张有 isv/bussiness 的表是安全的（三层防线+实测一致）；risk_model / risk_pack_info 一旦有新增行（如新模型注册、新套餐录入），即暴露覆盖风险。

---

## 五、验证记录

- 2026-08-24 实测：9 张表推送范围 本地=生产 全部 diff=0
- 2026-08-21 修复验证：撞通融 insert/delete 全拦截 ✅、淘顺记录正常推送 ✅、新 id 重新分配 ✅
- 8-21 事故 215 行内容与本地/历史快照零差异（更新动作越界，数据无损）；中移保理 8,311 条全在
