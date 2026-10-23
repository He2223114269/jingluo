# 淘顺实时授信 · 全流程风控细节手册

> 版本 2026-10-23　|　依据：BUSINESS_KNOWLEDGE.md、知识库方法论/案例、平台 risk_engine 代码
> 标注：🔴 = 硬规则/易错点　⚠️ = 口径待确认或需现场核实

---

## 目录

1. 业务本质与全链路
2. 数据底座与核心表
3. 审批全流程（前置 / 初审 / 捞回 / 复审）
4. 策略分支体系
5. 通过率体系与配置
6. 名单与特殊通道
7. 门店与渠道管控
8. 套餐与资方
9. 质态计量（逾期 / Vintage / 终损 / 额度满足率）
10. 监控与预警
11. 配置变更工作流
12. 数据口径陷阱清单
13. 工具与脚本
14. 附录：字段速查

---

## 1. 业务本质与全链路

### 1.1 业务模式

用户在营业厅办理合约机（买手机 + 承诺在网套餐），我方对这笔合约提供**实时授信**，用户按月缴套餐费，运营商下发「红包」到我方账户，账期日扣除红包 = 当期还款。

🔴 **核心认知：本业务没有传统意义的主动还款。用户在网 = 履约，离网 = 违约。**

推论：
- 逾期的本质是**离网**（不是无还款能力）
- Vintage 的账龄是在网月数（MOB），不是传统 DPD
- 门店欺诈导致批量离网是风控重点
- 账期日决定逾期判定：电信全国 **10 号**，移动因省而异；宽限期 **1 天**

### 1.2 全链路

```
申请 → 前置规则拦截 → 初审（规则引擎） → 捞回? → 复审（模型决策） → 授信 → 竣工 → 分期还款 → 逾期/催收
                                        ↘ 特批/白名单 → 直接通过
```

### 1.3 关键业务参数

| 项 | 值 |
|---|---|
| 申请业务标识 | `business_type = '02'`（淘顺实时授信） |
| 风控表业务标识 | `type = '淘顺实时授信'`（不带横杠） |
| 默认客群 | `custtype = '00'` 公众 |
| 客群编码 | 00 公众 / 01 VIP / 06 存量 VIP（先享合约另有 04、15） |
| 本网 | 电信（`operator_real = '电信'`；DWS 数值 `3`） |
| 异网 | 移动 + 联通（DWS `1` / `2`） |
| 老用户 | `online_duration >= 4 AND operator_real = '电信'` |
| 金额单位 | 申请表 `order_amt` 为**分**；DWS `order_amt_yuan` 为元 |
| 授信通过 | `apply_status = '授信成功'` |

---

## 2. 数据底座与核心表

### 2.1 数据源（4 个）

| 库 | 连接 | 用途 |
|---|---|---|
| StarRocks 风险库 | `get_data(data_type='risk')` | DWS/DWD/ODS 明细，主战场 |
| 淘顺分期 MySQL | `get_data(data_type='ts')` | 业务源库，实时取数/写门店等级 |
| 百旅 MySQL `bailv_np` | `get_data(data_type='bl')` | 通融业务 + 风控配置源 |
| 本地 MySQL `risk_control` | `get_data(data_type='local')` | `sys_parameter.*` 配置镜像、标准通过率、工作台账 |

### 2.2 申请主表 `credit_yzf_order_grant_apply`

| 字段 | 说明 | 常见值 |
|---|---|---|
| `add_time` | 申请时间 | |
| `apply_status` | 申请状态 | **StarRocks：SUCCESS/FAIL**；**源库：授信成功/授信失败**（🔴 两套不能混） |
| `custtype` | 用户类型 | 00/01/06 |
| `supplier_code` / `supplier_name` | 代理商 | |
| `store_addr_province` / `store_addr_city` | 门店省/市 | |
| `id_number_enc` | 身份证加密值 | 去重键 |
| `credit_amt` | 授信额度（分） | |
| `goods_price` | 商品价格（分） | |
| `order_amt` | 🔴 **直降金额（分）** | 非实付、非订单额；四川直降 1440/1800/2880 对应 144000/180000/288000 |
| `ct_user_id` | 用户 ID | 关联风控表 `order_no` |
| `user_risk_level` | 风险等级 | `'E'` = 特批白名单 |
| `business_type` | 业务类型 | `'02'` 实时授信 / `'03'` 小额 |
| `online_duration` | ⚠️ 申请主表**无**此字段 | 在风控表/DWS |

### 2.3 风控表 `order_white_list_control`

查询必加 `type = '淘顺实时授信'`。

| 字段 | 说明 |
|---|---|
| `order_no` | 关联 `ct_user_id`；🔴 有重复行（约 1.3M 行 / 1.2999M 唯一），join 前先 `group by order_no` 去重 |
| `first_risk_result` | 初审结果；`'特批白名单用户'` = 特批 |
| `second_risk_result` | 复审结果 |
| `strategy_id` | 客群分支 ID |
| `model_id` | 外部数据源 |
| `lxf` | 灵犀分（A 卡分值） |
| `recall_strategy` | 捞回标志 |
| `is_certify` | 🔴 存的是**补贴比例**，不是人脸结果 |
| `online_duration` | 在网时长（月/档位码） |
| `operator_real` | 运营商文本（电信/移动/联通） |
| `store_level` | 渠道等级（管控/拉灰/拉黑…） |
| `pass_flag` | Y=过 / N=拒 |

🔴 **覆盖范围**：该表只覆盖**公众（00）**。2026 年 VIP 申请 53.4 万条几乎全部匹配不上（01 匹配 1 条、06 匹配 0 条）→ 新老客/本异网/在网时长判断只对公众有效。

### 2.4 竣工宽表 `dws.dws_credit_yzf_order_complete`

| 字段 | 说明 |
|---|---|
| `order_status` | 已竣工/已退货/已结清/已结束 |
| `order_amt` / `order_amt_yuan` | 订单金额（分 / 元） |
| `order_channel_id` | `'特批白名单'` = 特批（仅 DWS 有） |
| `remaining_principal` | 剩余本金（分，含未到期部分） |
| `lmd_step_num_repay_status` | 🔴 **标准逾期判断字段**，=2 逾期 |
| `step_num_repay_status` | ⚠️ 有约 9% 误报，不建议用于质态 |
| `total_due_count` | **已到期期数**（不是总期数） |
| `total_repaid_count` | 已还期数 |
| `amt` | 实还总金额（DWS 无 `principal` 字段） |
| `conn_overdue_day` | 连续逾期天数（≥90 = 连续 3 个月+） |
| `max_over_due_day` | 最大逾期天数 |
| `operator_real` | 数值：1=移动 2=联通 3=电信 |

在贷口径：
```
SUM(CASE WHEN remaining_principal > 0 THEN 1 ELSE 0 END) 在贷订单数
SUM(CASE WHEN remaining_principal > 0 THEN remaining_principal ELSE 0 END)/100 在贷余额元
```

### 2.5 还款明细与 Vintage 表

| 表 | 用途 |
|---|---|
| `dwd.dwd_credit_yzf_order_complete_repayment` | 每期明细（要按竣工日切必须用它重算） |
| `..._repayment_next_month_ten_day` | 次月 10 号口径（默认主表） |
| `..._repayment_thirty` / `_sixty` / `_ninety` | 30+/60+/90+ 口径，字段结构同构 |
| `dws_credit_yzf_order_complete_repayment_thirty` | mobN 矩阵（订单级） |

---

## 3. 审批全流程

### 3.1 前置规则拦截

命中硬规则直接拦，**不进入初审**。

- 典型规则：**24 小时内存在 1 笔授信失败记录**（防重复进件）
- 🔴 这类记录**没有 strategy_id**，不是漏配 → 统计通过率结构时必须单列「前置拦截」
- 初审浮动配置表：`risk_initial_strategy_control`，字段 `first_strategy_name` / `strategy_type` / `pass_ratio`
- 实例：2026-10-08 首推批次 `B2026100829EA`（全国 · tr24 小时内存在 1 笔授信失败记录 · 全策略 · −0.30）
- 外部分接口「初审浮动」已实测生效：返回 `initialStrategyPassRatio = -0.30`

### 3.2 初审 — 规则引擎（`first_risk_result`）

| 规则 | 说明 |
|---|---|
| 特批白名单 | `user_risk_level = 'E'` → 直接通过 |
| 保证金白名单 | 保证金业务特殊通道（四要素校验） |
| 用户黑白名单 | 按身份证校验，白名单可扣次数免风控 |
| 年龄限制 | 22~65 岁 |
| 拉黑门店 / 渠道 | 门店熔断、渠道封禁 |
| 门店熔断 | 逾期率过高门店自动熔断（通常 3 天） |
| 半年内授信失败记录 | tr/ts 系统有失败记录 |
| 同身份证/合约号办单过多 | 同一身份证或合约号 ≥2 单拒绝 |
| 同一手机号变更/授信成功 | 防刷单 |
| 三要素一致性 | 姓名 + 身份证 + 手机号 |
| 贵州专用规则 | 贵州地区特殊规则 |

### 3.3 捞回（recall）

- 初审拒绝后，命中 `recall_strategy` 的用户可进入复审
- 捞回不等于放宽：复审仍按分支阈值判定
- 统计时「捞回后通过」要单独标识，不能与初审直通混算

### 3.4 复审 — 11 个环节

```
① 客群划分 → strategy_id
② 基础通过率（risk_score_control）
③ 渠道浮动（risk_channel_control）
④ 地市浮动（risk_city_control）
⑤ 套餐浮动（risk_pack_name_control）
⑥ 代扣浮动（risk_withholding_control）
⑦ 汇总为最终通过率
⑧ 模型路由（risk_business，优先级 1→2→3 降级）
⑨ A 卡评分（lxf / 灵犀分）
⑩ 截断查询（risk_cutoff）
⑪ 通过/拒绝判定
```

**判定方向**（`risk_model` 配置正负相关性）：
- 正相关（高分=高风险）：分数 **<** 截断分 → 通过
- 负相关（高分=低风险）：分数 **>=** 截断分 → 通过

**拒绝归属**：
- `apply_msg = '综合评分不通过'` / `'综合评审不通过'` → 我方风控拒绝
- 英文提示 → 翼支付侧拒绝
- 🔴 两者必须分开归因，不能都算「策略收紧」

---

## 4. 策略分支体系

### 4.1 四套体系并存

| 体系 | 适用 | 分支数 | 配置位置 | 映射 |
|---|---|---|---|---|
| 灵犀分 2511（`yzf_jx_*`） | 湖南/江西/安徽/广西/甘肃/四川/江苏/湖北等多数省 | 15~23 | `risk_score_control` | `risk_strategy_id_info`（province='江西省' 为全国源头） |
| 2604 档位（A/B/C/D） | 贵州 | 20 | `risk_score_control` | `taoshun_fenqi.risk_strategy_code_info` |
| 2608 评级（A~E） | 24 省（河南 + 23 省） | 24 支/省 | `risk_score_control` score_code=*_2608 | `risk_strategy_id_info` result='2608' |
| 通融 `tongrong_v1` | 通融迁移省 | 参数驱动 | `risk_param` / `risk_strategy_info_config` | 由决策树实时算 |

### 4.2 2511 体系编码规则

- `score_code = 0{id-517}_2511`（id=532 → 015_2511）
- 分支按 本网/异网 × 补贴率档 × 金额档 × 性别/在网 切分
- 23 个标准分支（001~023_2511）

### 4.3 2608 评级体系

| 档位 | 分支逾期率 | pass_ratio |
|---|---|---|
| A | ≤ 4% | 90% |
| B | (4%, 6%] | 75% |
| C | (6%, 8%] | 50% |
| D | (8%, 10%] | 10% |
| E | > 10% | 2% |

- 每省 24 分支 = 576 行（`risk_strategy_id_info`）+ 24×5=120 行（`risk_score_control`）
- **缺失分支统一补 E 档 2%**，避免新客群被误杀
- 渠道层标准 4 件套：优质 +0.10 / 普通 0 / 拉灰 0 / 监管 −0.10
- 上线节奏：2026-08-25 批量接入 23 省 → 2026-09-14 定稿 → 09-15~09-18 分 4 批切换 24 省

### 4.4 🔴 线上体系 ≠ 配置体系

**调通过率前必须先确认线上实际跑哪套**（江苏/陕西教训：配置 2608、线上跑 2511，调了零效果）。

判断方法：
```
SELECT strategy_id, COUNT(*)
FROM ods.ods_ts_order_white_list_control
WHERE type = '淘顺实时授信' AND add_time >= CURDATE() - INTERVAL 7 DAY
GROUP BY strategy_id ORDER BY 2 DESC;
```

- `yzf_jx_*` → 2511
- `ydjb_*` / `ydhx2_*` / `zybl_*` / `tsxx2.0_*` / `tryzf_*` → 其他老体系
- `*_2608` / 省前缀 `*_ts_*` → 2608

---

## 5. 通过率体系与配置

### 5.1 五层浮动（全部为**加法**）

```
最终通过率 = 基础 pass_ratio
           + 渠道浮动
           + 地市浮动
           + 套餐浮动
           + 代扣浮动
```

| 层 | 表 | 定位键 |
|---|---|---|
| 基础 | `risk_score_control` | (业务, strategy_id/score_code, 省份) |
| 渠道 | `risk_channel_control` | (业务, isv, 省份, 渠道等级, 策略 type) |
| 地市 | `risk_city_control` | (业务, isv, 省份, 城市, 策略 type) |
| 套餐 | `risk_pack_name_control` | 套餐名称 |
| 代扣 | `risk_withholding_control` | 是否代扣 |

🔴 **加法不是乘法**：+0.30 = +30 个百分点，不是 ×1.3。

### 5.2 固定通过率渠道（覆盖浮动）

表 `risk_channel_fixed_pass_rate`：给指定渠道设**绝对值**通过率，优先级高于 `risk_channel_control`。

| 渠道 | 通过率 | 范围 |
|---|---|---|
| 管控渠道 | 10% | 全国 · 淘顺 |
| 单卡限制渠道 | 5% | 全国 · 淘顺 |
| 管控渠道 | 10% | 全国 · 通融 |
| 湖南单卡限制渠道 | 5% | 湖南省 |

🔴 **归属机制**：不是按门店打标，而是**按套餐类型自动判定**——湖南「没带融合」的套餐自动走「湖南单卡限制渠道」，门店表里查不到是正常的。

### 5.3 cutoff 机制（分数线）

```
综合通过率 → risk_cutoff 查表 → 模型分值门槛 → 用户分数与之比较
```

- 定位键：(`model_id`, 业务, 策略 type, 省份, isv, 通过率)
- 通过率粒度：101 档（0% ~ 100% 每 1% 一档）
- 生成方法：初审通过样本按 (province, strategy_type, isv) 分组 → 取 101 个分位点 → 单调性定方向
- 🔴 **必须按「全国」兜底**：部分省无行时，不兜底会算出 0% 通过率
- 🔴 cutoff 与 score_control 是**两条通道**：cutoff 走专用 API，`config_push` 的 PUSH_BLACKLIST 含 `risk_cutoff`

### 5.4 🔴 pass_ratio 是分数线不是概率

- 配置值只是「目标分数线」，实际通过率 = 该分支客群分数超过阈值的占比
- 同一数值在不同省/分支，实际通过率不同
- 效果**非线性**：调 +10pp 可能实际 +2pp 也可能 +25pp（取决于分值密度）
- 实证：山东某批四档实际与 P(lxf ≤ cutoff(PR)) 逐档吻合（A 33.3%、B 25.9%、C 4.3%、D 0.9%）

### 5.5 配置按省存储

- `risk_score_control.pass_ratio` **按 province 分行存储**，改某省只影响该省
- 会跨省外溢的只有**映射表** `risk_strategy_id_info`（江西那 15 行是全国共用源头）
- 结论：分支层 + 套餐层可直接按省操作，无需担心外溢

### 5.6 调整总原则

1. 要提升 → 优先提质态优秀分支（逾期低、本网、老客）
2. 要下降 → 优先压质态差分支（逾期高先砍）
3. 依据**半年质态**分层，不用单日数据机械反推
4. 单次幅度 +10~20pp，分批执行
5. 调整后 1~2 周验证实际通过率回落，并等账期验证质态

质态分档参考：<1% 极优 / 1~2% 优质 / 2~3% 中等只小幅 / >4.5% 该压

---

## 6. 名单与特殊通道

### 6.1 特批白名单

- 标识：DWS `order_channel_id = '特批白名单'`；申请表 `user_risk_level = 'E'`
- 100% 通过，不走风控
- 逾期率 4%~12%（高于普通 3%~4%）
- 🔴 做 Vintage 必须剔除；湖南 6 个地市（益阳/湘西/怀化/娄底/湘潭/张家界）100% 依赖特批

### 6.2 用户黑白名单 `risk_user_black_white_list`

- 位置：淘顺源库 + bl 源库；StarRocks 同步 `ods_ts_risk_user_black_white_list`
- 校验键：**身份证 `id_number`**
- `user_type`：黑名单 / 白名单
- `number`：免风控通过次数（默认 2，用一次扣一次，扣完失效）
- `business_type`：淘顺实时授信 / 贵州随心购 / 中移保理等

### 6.3 保证金白名单 `bond_white_list`

- 校验：**代理商名称 + 身份证 + 姓名 + 手机号 四要素**
- `is_use`：Y/N，**使用后即失效**
- 变体：`_ydhx` / `_zybl`
- 海南保证金通道质态偏差（709 单逾期 12.27%），需单独评估

### 6.4 白转灰名单（2026-08-04 上线，全国）

- 背景：部分存量 VIP 白名单被翼支付改为「公众类型 + 风险等级 A」
- 规则：**公众 + A 级** 按白名单策略执行（高通过率）
- 已知：A 级公众 2026-03 起放量（月申请约 2,000），通过率 42%~47%；质态优于非 A 级（成熟期 0.6%~1.9% vs 0.7%~5.1%）
- ⚠️ 统计口径尚未最终确定（身份三分法待确认）

---

## 7. 门店与渠道管控

### 7.1 门店等级表 `v3_order_store`

- 源库：`taoshun_fenqi.v3_order_store`；数仓同步 `ods.ods_ts_v3_order_store`
- 关键字段：`isv` / `type`（`翼支付实时授信`）/ `province` / `city` / `store_code` / `store_name` / `channel_level` / `notes` / `adjust_type` / `add_time` / `update_time`
- 渠道等级：优质 / 普通 / 监管 / 拉灰 / 拉黑 / 灰名单 / 扶持 / 临时扶持
- 🔴 写权限：主账号 `taoshunfenqi_fk_hc` **只有 SELECT**；写入门店必须用 `taoshunfenqi_fk_rank`

### 7.2 操作方式

🔴 **不是 UPDATE，而是 INSERT 新记录**；同一 `store_code` 取 **id 最大** 的一条生效。

```
INSERT INTO v3_order_store
 (isv,type,province,city,store_code,store_name,channel_level,notes,adjust_type,add_time,update_time)
VALUES ('淘顺','翼支付实时授信','<省>','<市>','<store_code>','<store_name>',
        '拉黑渠道','<依据>','门店欺诈',NOW(),NOW());
```

- 提交必须 `autocommit=False` + 显式 `commit()`
- 操作后回读确认

### 7.3 🔴 人工拉黑会被月度刷新覆盖

- 实例：宁夏某店 2026-08-13 拉黑，2026-09-13 月度等级刷新把 `channel_level` 刷回「拉灰渠道」
- 复核要求：**同时看 `channel_level` 和 `update_time`**；update_time 晚于拉黑时间且等级变了 = 被覆盖
- 建议：拉黑后下月初复查一次；推动平台把人工拉黑加入刷新豁免

### 7.4 查门店管控时间

🔴 **不能看 `v3_order_store.update_time`**（那是维表刷新时间）。

正确做法：查风控表 `ods_ts_order_white_list_control`：
- 字段：`store_name` / `store_level` / `pass_flag` / `add_time` / `refuse_sum`
- 找**最早出现大范围「管控/拉灰渠道 + pass_flag='N'」**的时间
- ⚠️ 表里是「拉灰渠道」，不是「拉黑渠道」，写错查不到
- 轨迹：普通渠道 → 管控渠道 → 拉灰渠道，要看整条时间线

### 7.5 门店欺诈识别（命中 ≥2 条预警）

| 编号 | 规则 |
|---|---|
| R1 | 单营业员月办单 > 50 笔 |
| R2 | 单套餐占比 > 90% |
| R3 | 异网 > 40% + 新客 > 80% |
| R4 | 金额高度标准化（同一金额区间） |
| R5 | 新客逾期率 > 50% |
| R6 | 同一身份证月申请 > 5 次 |

**拉黑阈值**：逾期 30 天率 ≥ 10%
**熔断**：单店月申请 > 100 笔或逾期率 > 30% 可自动停，通常 3 天

### 7.6 门店/代理商检索口径

- 申请表 `supplier_code` 是**按单归属**（谁提交的这单）
- DWS `supplier_code` 是**门店级码**（常与 store_id 同值）
- `v3_order_store` 无代理商字段
- 🔴 同一门店编码可挂多个代理商；两表归属会不一致，统计时必须说明取哪一侧
- 工具：`python3 ~/scripts/probe_store.py "<关键词>"`（约 2 秒出全量）

---

## 8. 套餐与资方

### 8.1 套餐浮动 `risk_pack_name_control`

- `pass_ratio` 为**加法浮动**
- 用于对高直降/长周期/单卡套餐单独收紧
- 🔴 同名套餐换档会漏网（36 期 vs 36 月），按「主键 + 档位」双重确认
- 查询时必须**全量列全**（按 update_time 分组），不能 LIMIT 截断——曾因截断漏掉 −0.30~−0.50 批次

### 8.2 湖南单产品双层管控（示例）

1. 套餐层（2026-09-01）：139/169/199 单产品 −0.50；99/129 −0.40；其余单产品 −0.30
2. 渠道层（2026-09-08）：湖南单卡限制渠道 = **固定 5%**
3. 融合系 14 档 +0.20（2026-08-21）→ 「提优质、压劣质」已完成

### 8.3 套餐类型识别（单卡 vs 融合）

| 省 | 融合识别 | 区分度 |
|---|---|---|
| 安徽 | `pack_name LIKE '%徽金卡%'` | 强（单卡 4.14% vs 融合 1.35%） |
| 湖南 | `pack_name LIKE '%融合%'` | 中（1.46% vs 0.66%） |
| 江苏 | 含「权益包」 | 弱（2.20% vs 1.92%） |
| 贵州 | 含「重点机型」= 优质机型 | 强（5.47% vs 13.46%） |

⚠️ `fusion_flag` 字段几乎全空，不可用；`risk_pack_info.fusion_type` 仅安徽充分。

### 8.4 资方（isv / fund_code）

| fund_code | 名称 | 属性 |
|---|---|---|
| TSTFBL | 通服保理 | 他营 |
| TSTFBLTE | 通服保理提额 | 他营 |
| TSTCRZ | 甜橙融租 | 联营 |
| TSJTTB | 锦泰投保 | 联营 |
| TSTYBL | 天翼保理 | 联营 |
| TSTCRZXE | 小额 | 联营 |

对外支撑/资损/Vintage 按资方出数时，先区分联营/他营口径。

---

## 9. 质态计量

### 9.1 逾期口径

| 用途 | 口径 |
|---|---|
| 🔴 标准逾期 | `order_status='已竣工' AND lmd_step_num_repay_status=2` |
| 不用 | `step_num_repay_status=2`（约 9% 误报） |
| 不用 | `is_overdue`（5400 万条仅 1 条标记） |
| 30+（A 口径） | `total_add_thirty_overdue >= 1`（累计） |
| 90+（A 口径） | `conn_overdue_day >= 90`（时点） |

🔴 30+/90+ 只出 **A 口径**，不再并列 B 口径。

### 9.2 逾期多口径分析（三视角）

| 视角 | 指标 |
|---|---|
| 当期表现 | `lmd_step_num_repay_status = 2` |
| 历史沉淀 | FPD30 / SPD30 / TPD30（`one/two/three_step_thirty_is_overdue`） |
| 时间窗口 | `complete_time` 范围（活跃期/淡旺季） |

单看当前逾期率会失真：老单已结清、新单未到还款日。

### 9.3 FSTQPD 链式标签

- 宽限期 1 天：`due_time = due_date + 1天`
- pd1 / pd7 / pd14 / pd30
- FPD/SPD/TPD/QPD 链式（前一期未逾期才算首次）→ 4×4 = **16 个标签**
- 辅助字段：`repaid_count` / `should_repay_count` / `overdue_cumsum` / `dpd_max`

### 9.4 Vintage 表体系

| 表 | 口径 |
|---|---|
| `..._next_month_ten_day` | 次月 10 号（默认） |
| `..._thirty` / `..._sixty` / `..._ninety` | 30+/60+/90+ |

字段：`order_month` / `province` / `order_ct` / `principal_sum` / `mobN_wastage` / `mobN_order_ct` / `custtype` / `order_channel_id`

计算：`mobN逾期率 = mobN_wastage / principal_sum`（**金额口径**）

🔴 必加过滤：
1. `source_business_type = '淘顺实时授信'`
2. `(order_channel_id IS NULL OR order_channel_id NOT IN ('特批白名单','保证金'))`
3. `province != '上海市'`
4. 公众版加 `custtype = '00'`

### 9.5 终损预测

| 预测列 | 公式 |
|---|---|
| mob3_predict | mob3 × 2.3 |
| mob2_predict | mob2 × 3.3 |
| mob1_predict | mob1 × 6.3 |

**终损法 4（采用口径）**：
- 逐账期队列算：`max(mob12×1.10, max(mob3..mob12))`
- 按 `principal_sum` 加权汇总
- 🔴 不能对全量 pooled 直接汇总（会串账期，出现 mob18 < mob12 的假象）
- 未成熟队列：借成熟省形状系数 k = mob12/mob6 外推（湖南/贵州淘顺 VIP k≈1.78）

### 9.6 额度满足率

- 定义：通过订单中 `order_amt <= credit_amt` 的占比（订单维度，不去重）
- NULL 按不满足计
- 首次结果：全国 **93.82%**；广西 76.71% 最低，湖南 99.19% 最高
- 用途：全国路由按「通过率 × 额度满足率」分配份额

### 9.7 资损敞口

```
敞口 = 在贷余额 × 终损预估
```

- 决定优先动哪个省，不能只看在贷规模
- 实例：贵州在贷非最大但敞口第一；湖南在贷最大但终损最低

### 9.8 各省综合评分（⚠️ 部分待确认）

`综合评分 = 本省排名分 × 0.3 + 全国排名分 × 0.7`
- 排名依据：一手流量通过率 × 额度满足率
- 一手流量近似：24 小时内无通融申请记录
- 待确认：关联键、去重口径、排名范围

---

## 10. 监控与预警

| 监控 | 频率 | 内容 |
|---|---|---|
| 通过率日报 | 每日 09:00 | 微信 + 邮件双推，>5pp 异动归因 |
| 异动归因 | 随日报 | 变更台账 → 客群结构 → 策略 |
| 批次/体系切换监控 | 切换期逐日 | 通过率 + 结构分解（走策略/前置/拉黑） |
| 门店欺诈扫描 | 每日 | R1~R6 规则 |
| 档位倒挂巡检 | 每周 | 如 C 档 < D 档 |
| 额度满足率 | 月度 | 路由份额依据 |
| Vintage | 月度 | 月报 |
| 链路健康 | 按需 | 路由/接口故障窗口剔除 |

**三条纪律**
1. 先确认线上跑哪套体系
2. 通过率必须去重（逐笔与去重可差 15pp+）
3. 停流期走「停流模式」，业务停摆 ≠ 单量异常

### 🔴 通过率虚高识别（失败单不落库）

三步判定：
1. 按小时看通过率是否某时点突变
2. 源库风控表按 `type` + `add_time` 统计某省是否 0 条
3. 申请表 `fail=0` 且 `pass>0` = 失败单没落库

→ 属生产链路异动，该窗口数据**不可用于调控决策**。

---

## 11. 配置变更工作流

### 11.1 触发条件

任何「调通过率 / 配新省 / 改渠道浮动 / 调 cutoff / 上线省份」都必须走标准流程。

### 11.2 七步流程

1. 查当前配置值（`sys_parameter.*`）
2. 录变更计划（`plan.py` 或 `change_plan`）
3. 告知计划内容，确认后标记「已确认」
4. 改本地配置
5. 跑 `config_validate` → 必须 0 错误
6. `config_push` 推送生产
7. 回读校验：值 + `add_time`/`update_time`（🔴 不能有 0000）+ 行数；记批次号

### 11.3 校验重点

- 计划值 vs 实际值
- 省份覆盖度完整
- 通过率合理区间
- 跨表一致性
- 🔴 时间字段不能是 `0000-00-00`

### 11.4 config_push 三层防线

1. **只推变更行**（不再整表 REPLACE）
2. **新行 id 用生产全表 max(id)+1**（不是淘顺过滤后的 max）
3. **id 归属保护**：要写入的 id 在生产必须属于 `isv='淘顺' AND bussiness='实时授信'`，否则拒绝

### 11.5 回滚

- 变更前备份原值（CSV）
- 按批次号回滚
- 回滚后同样回读校验

---

## 12. 数据口径陷阱清单

| # | 陷阱 | 正确做法 |
|---|---|---|
| 1 | `not (A and B)` 遇 NULL 静默丢行 | `coalesce` 包裹 |
| 2 | 门店键用名称去重 | 用 `store_id`；(province,store_id,store_name) 会重复计数 |
| 3 | join 右表主键重复放大行数 | 先 `group by` 去重（风控表 order_no 有重复） |
| 4 | 金额单位混淆 | 申请表/DWS `order_amt` = 分；`order_amt_yuan` = 元 |
| 5 | 源库与 StarRocks 字段差异 | 源库 `apply_status` 中文、无 `source_business_type`、不支持窗口函数 |
| 6 | 逐笔口径当通过率 | 必须按 `id_number_enc` 去重、成功优先 |
| 7 | 用 `step_num_repay_status` 判逾期 | 用 `lmd_step_num_repay_status` |
| 8 | 特批混入 Vintage | 必剔 `特批白名单` + `保证金` + 上海 |
| 9 | 同名套餐换档漏网 | 按主键 + 档位 |
| 10 | 套餐查询 LIMIT 截断 | 全量列全 |
| 11 | `is_overdue` / `fusion_flag` 字段 | 均不可用 |
| 12 | `online_duration` 当连续月数 | 是**档位码**（1=0-3月 … 5=24月+，−1=无数据） |
| 13 | 通融数据含测试单 | 剔除名称含「测试」/「test」 |
| 14 | VIP 用风控表判本异网 | 风控表只覆盖公众，VIP 匹配不上 |
| 15 | 模拟结论直接用于生产 | 模拟 ≠ 生产分类器，以生产质态为准 |

---

## 13. 工具与脚本

### 13.1 取数

| 工具 | 用途 |
|---|---|
| `~/scripts/passrate.py` | 🔴 通过率唯一入口（官方去重口径写死） |
| `~/scripts/probe_store.py` | 门店/代理商一查到底（约 2 秒） |
| `~/scripts/prov_pass_query.py` | 某省通过率变化（走势+分支+配置） |
| `~/scripts/run_sql.py` | 统计统一入口（过关卡 + 留痕） |
| `~/scripts/sql_guard.py` | SQL 陷阱拦截 |
| `~/vintage_query.py` | Vintage 查询（多口径/多省/全国） |

### 13.2 调控

| 工具 | 用途 |
|---|---|
| `prov_quota_plan.py` | 「把 X 省控到 Y%」出配额方案 |
| `monthly_pass_ratio_review.py` | 月度逐省排查（质态 vs 配置） |
| `check_grade_monotonicity.py` | 档位倒挂巡检 |
| `monitor_batch_switch.py` | 批次切换观察 |

### 13.3 平台模块

| 模块 | 用途 |
|---|---|
| `risk_engine.toolkit.sync` | 配置同步 / 校验 / 推送（plan / config_validate / config_push） |
| `risk_engine.toolkit.metrics` | 通过率、指标计算 |
| `risk_engine.model_registry` | 模型注册（jiangxi_v1 / hunan_v1 / gz_v1 / tongrong_v1） |
| `risk_engine.loss_forecast.monthly_report` | 月报（12-sheet vintage Excel） |
| `risk_engine.rating.supplier` | 代理商评级（v3.2） |

### 13.4 报表

- 月度资损报表（3 sheet，对外）
- 对外支撑模板（双口径 + 口径说明）
- 锦泰 30+ Vintage（竣工月 × MOB，与月报版式不同）

---

## 14. 附录：字段速查

### 14.1 常用筛选

```
source_business_type = '淘顺实时授信'   -- DWS
business_type = '02'                    -- 申请表
type = '淘顺实时授信'                    -- 风控表
custtype = '00'                         -- 公众（默认）
order_status = '已竣工'
lmd_step_num_repay_status = 2           -- 逾期
```

### 14.2 通过率标准模板要点

1. self-join 去重（成功优先，同状态取 id 小）
2. `business_type='02'` + `custtype='00'`
3. `COALESCE(first_risk_result,'') != '特批白名单用户'`
4. 左连风控表 `a1.ct_user_id = a3.order_no`

### 14.3 在网时长码表

| 码 | 含义 |
|---|---|
| 1 | 0~3 月 |
| 2 | 3~6 月 |
| 3 | 6~12 月 |
| 4 | 12~24 月 |
| 5 | 24 月及以上 |
| −1 | 无数据 |

本网两年以上 = `operator_real='电信' AND online_duration='5'`

### 14.4 常用阈值

| 项 | 阈值 |
|---|---|
| 通过率达标 | 差距 ≤3% 优秀 / ≤5% 达标 / >5% 不达标（双向绝对值） |
| 门店拉黑 | 逾期 30 天率 ≥10% |
| 门店熔断 | 月申请 >100 笔 或 逾期率 >30%，通常 3 天 |
| 新客 | `online_duration <= 3` |
| 样本有效性 | 竣工样本 <200 单需标记 |

---

*手册依据内部知识库整理；标注 ⚠️ 的条目为口径待确认项，落地前需与平台/业务复核。*
