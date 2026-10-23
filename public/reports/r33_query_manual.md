# 淘顺实时授信 · 常用取数逻辑手册

> 版本 2026-10-23　|　配套《全流程风控细节手册》
> 原则：**能跑现成脚本就不写 SQL；必须写 SQL 时先过 `sql_guard.py`，再走 `run_sql.py` 留痕。**

---

## 0. 使用约定（先看这一段）

### 0.1 默认口径六件套

| 项 | 默认值 | 说明 |
|---|---|---|
| 业务 | `source_business_type='淘顺实时授信'`（DWS）/ `business_type='02'`（申请表） | 除非明确要通融/中移保理 |
| 客群 | `custtype='00'` 公众 | 要全量必须显式说明 |
| 去重 | 按 `id_number_enc`，成功优先 | 逐笔口径不得对外 |
| 特批 | 默认剔除 | 剔 `order_channel_id='特批白名单'` 或 `COALESCE(first_risk_result,'')!='特批白名单用户'` |
| 时间 | 按 `add_time`（申请）/ `complete_time`（竣工）/ `order_month`（Vintage） | 三者不可混用 |
| 单位 | `order_amt`/`remaining_principal` 为**分**；`order_amt_yuan` 为元 | 输出元一律 /100 |

### 0.2 优先用脚本

| 需求 | 直接跑 |
|---|---|
| 某省通过率 | `python3 ~/scripts/passrate.py --province 湖南省` |
| 某省通过率为什么变 | `python3 ~/scripts/prov_pass_query.py 湖南 --days 14` |
| 门店/代理商 | `python3 ~/scripts/probe_store.py "关键词"` |
| 月度质态 vs 配置 | `python3 ~/scripts/monthly_pass_ratio_review.py --province 湖南省` |
| 控到目标通过率 | `python3 ~/scripts/prov_quota_plan.py 湖南 --target 0.30` |
| Vintage | `python3 ~/vintage_query.py --province 广西壮族自治区 --start 2026-01 --end 2026-06` |

### 0.3 必做三查

1. 主体键唯一？（门店用 `store_id`，不用名称）
2. `not (A and B)` 是否遇 NULL？（全部 `coalesce`）
3. join 右表主键有重复？（风控表 `order_no` 必须先去重）

---

## 1. 通过率类

### 1.1 全省 × 按日（标准模板）

口径：去重 + 公众 + 剔特批；分母=申请数，分子=授信成功。

```sql
SELECT
    DATE_FORMAT(a1.add_time, '%Y-%m-%d') AS 日期,
    a1.store_addr_province AS 省份,
    COUNT(*) AS 申请数,
    SUM(CASE WHEN a1.apply_status = '授信成功' THEN 1 ELSE 0 END) AS 通过数,
    ROUND(SUM(CASE WHEN a1.apply_status = '授信成功'
                    AND COALESCE(a3.first_risk_result, '') != '特批白名单用户'
              THEN 1 ELSE 0 END) / COUNT(*), 4) AS 通过率
FROM ods.ods_ts_credit_yzf_order_grant_apply a1
LEFT JOIN ods.ods_ts_credit_yzf_order_grant_apply a2
       ON a1.id_number_enc = a2.id_number_enc
      AND ((a2.apply_status = '授信成功' AND a1.apply_status != '授信成功')
           OR (a1.apply_status = a2.apply_status AND a1.id < a2.id))
LEFT JOIN (SELECT order_no, MAX(first_risk_result) AS first_risk_result
           FROM ods.ods_ts_order_white_list_control
           WHERE type = '淘顺实时授信' GROUP BY order_no) a3
       ON a1.ct_user_id = a3.order_no
WHERE a2.id IS NULL
  AND a1.business_type = '02'
  AND a1.custtype = '00'
  AND a1.add_time >= '2026-10-01' AND a1.add_time < '2026-11-01'
GROUP BY 日期, 省份
ORDER BY 省份, 日期;
```

⚠️ 源库（ts MySQL）`apply_status` 是中文且不支持窗口函数，写法相同但表名换 `credit_yzf_order_grant_apply`。

### 1.2 分支级通过率

口径：在 1.1 基础上按 `strategy_id` 分组；**先确认线上跑哪套体系**。

```sql
SELECT
    a3.strategy_id,
    COUNT(*) AS 申请数,
    SUM(CASE WHEN a1.apply_status = '授信成功' THEN 1 ELSE 0 END) AS 通过数,
    ROUND(SUM(CASE WHEN a1.apply_status = '授信成功' THEN 1 ELSE 0 END) / COUNT(*), 4) AS 通过率
FROM ods.ods_ts_credit_yzf_order_grant_apply a1
JOIN (SELECT order_no, MAX(strategy_id) AS strategy_id
      FROM ods.ods_ts_order_white_list_control
      WHERE type = '淘顺实时授信' AND add_time >= '2026-10-01'
      GROUP BY order_no) a3
  ON a1.ct_user_id = a3.order_no
WHERE a1.business_type = '02' AND a1.custtype = '00'
  AND a1.add_time >= '2026-10-01'
GROUP BY a3.strategy_id
ORDER BY 申请数 DESC;
```

### 1.3 客群切片（新老客 / 本异网）

```sql
SELECT
    CASE WHEN a3.online_duration <= 3 THEN '新客' ELSE '老客' END AS 客群,
    CASE WHEN a3.operator_real = '电信' THEN '本网' ELSE '异网' END AS 网络,
    COUNT(*) AS 申请数,
    ROUND(SUM(CASE WHEN a1.apply_status='授信成功' THEN 1 ELSE 0 END)/COUNT(*), 4) AS 通过率
FROM ods.ods_ts_credit_yzf_order_grant_apply a1
LEFT JOIN (SELECT order_no, MAX(online_duration) AS online_duration,
                  MAX(operator_real) AS operator_real
           FROM ods.ods_ts_order_white_list_control
           WHERE type='淘顺实时授信' GROUP BY order_no) a3
       ON a1.ct_user_id = a3.order_no
WHERE a1.business_type='02' AND a1.custtype='00'
  AND a1.add_time >= '2026-10-01'
GROUP BY 客群, 网络;
```

🔴 风控表只覆盖公众；VIP 用这套会几乎全部落「异网/老客」，不要用。

### 1.4 门店 / 套餐通过率

把 1.1 的 `GROUP BY` 换成 `a1.supplier_code, a1.supplier_name` 或 DWS 侧 `store_id, store_name` / `pack_name`，并加 `HAVING COUNT(*) >= 10`。

⚠️ 门店维度建议从 DWS 取（有 `store_id`），申请表只有名称，重名会合并。

### 1.5 达标判断

`差距 = 实际通过率 − 标准通过率`（标准取 `risk_control.risk_parameter_pass_radio`）
- `abs(差距) <= 0.03` 优秀
- `abs(差距) <= 0.05` 达标
- `> 0.05` 不达标

---

## 2. 逾期与质态类

### 2.1 全省当前逾期率

```sql
SELECT province,
       COUNT(*) AS 竣工数,
       SUM(CASE WHEN lmd_step_num_repay_status = 2 THEN 1 ELSE 0 END) AS 逾期数,
       ROUND(SUM(CASE WHEN lmd_step_num_repay_status = 2 THEN 1 ELSE 0 END) / COUNT(*), 4) AS 逾期率
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type = '淘顺实时授信'
  AND order_status = '已竣工'
  AND custtype = '00'
  AND complete_time >= '2026-01-01'
GROUP BY province
ORDER BY 逾期率 DESC;
```

🔴 用 `lmd_step_num_repay_status`，不是 `step_num_repay_status`（后者约 9% 误报）。

### 2.2 门店质态（含 FPD/SPD/TPD）

```sql
SELECT province, store_id, store_name,
       COUNT(*) AS 竣工数,
       ROUND(SUM(one_step_thirty_is_overdue)   * 1.0 / COUNT(*), 4) AS FPD30率,
       ROUND(SUM(two_step_thirty_is_overdue)   * 1.0 / COUNT(*), 4) AS SPD30率,
       ROUND(SUM(three_step_thirty_is_overdue) * 1.0 / COUNT(*), 4) AS TPD30率,
       ROUND(SUM(CASE WHEN lmd_step_num_repay_status = 2 THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 4) AS 当前未还率
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type = '淘顺实时授信'
  AND order_status = '已竣工'
GROUP BY province, store_id, store_name
HAVING 竣工数 >= 10
ORDER BY 当前未还率 DESC;
```

### 2.3 套餐质态

把 `GROUP BY` 换成 `province, pack_name`，加 `HAVING 竣工数 >= 10`。

### 2.4 金额段质态

```sql
SELECT province,
       CASE WHEN order_amt_yuan < 500  THEN '<500'
            WHEN order_amt_yuan < 1000 THEN '500-1000'
            WHEN order_amt_yuan < 2000 THEN '1000-2000'
            ELSE '2000+' END AS 金额段,
       COUNT(*) AS 竣工数,
       ROUND(SUM(CASE WHEN lmd_step_num_repay_status = 2 THEN 1 ELSE 0 END) / COUNT(*), 4) AS 未还率
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type = '淘顺实时授信' AND order_status = '已竣工'
GROUP BY province, 金额段
ORDER BY province, 金额段;
```

---

## 3. Vintage 类

### 3.1 单省 Vintage（默认次月10号口径）

```sql
SELECT order_month,
       SUM(order_ct) AS 订单数,
       ROUND(SUM(principal_sum) / 1000000, 2) AS 放款万元,
       ROUND(SUM(mob1_wastage) / SUM(principal_sum), 4) AS mob1,
       ROUND(SUM(mob3_wastage) / SUM(principal_sum), 4) AS mob3,
       ROUND(SUM(mob6_wastage) / SUM(principal_sum), 4) AS mob6,
       ROUND(SUM(mob12_wastage) / SUM(principal_sum), 4) AS mob12
FROM dws.dws_credit_yzf_order_complete_repayment_next_month_ten_day
WHERE source_business_type = '淘顺实时授信'
  AND province = '广西壮族自治区'
  AND custtype = '00'
  AND (order_channel_id IS NULL OR order_channel_id NOT IN ('特批白名单','保证金'))
  AND province != '上海市'
  AND order_month >= '2026-01' AND order_month <= '2026-09'
GROUP BY order_month
ORDER BY order_month;
```

### 3.2 全国汇总

去掉 `province` 过滤与 `GROUP BY` 中的省份即可；分母权重自动按 `principal_sum`。

### 3.3 换口径

把表名 `_next_month_ten_day` 换成 `_thirty` / `_sixty` / `_ninety`，**其他一个字不用改**。

### 3.4 终损法 4（逐队列）

```sql
WITH q AS (
  SELECT province, order_month,
         SUM(principal_sum) AS p,
         SUM(mob3_wastage)  AS m3,
         SUM(mob6_wastage)  AS m6,
         SUM(mob12_wastage) AS m12
  FROM dws.dws_credit_yzf_order_complete_repayment_next_month_ten_day
  WHERE source_business_type='淘顺实时授信'
    AND (order_channel_id IS NULL OR order_channel_id NOT IN ('特批白名单','保证金'))
    AND province != '上海市' AND custtype='00'
  GROUP BY province, order_month
), f AS (
  SELECT province, order_month, p,
         GREATEST(m12 * 1.10, m3, m6, m12) / p AS loss_rate
  FROM q WHERE m12 > 0
)
SELECT province,
       ROUND(SUM(loss_rate * p) / SUM(p), 4) AS 终损率
FROM f GROUP BY province;
```

🔴 必须逐队列算再加权，不能全量 pooled。

### 3.5 月报格式

```bash
python -m risk_engine.loss_forecast.monthly_report --version 2026-09 --business 淘顺实时授信 --export
```

产物：12-sheet Excel，落 `data/month_report/<YYYY-MM>/`。

---

## 4. 在贷与资损类

### 4.1 在贷余额 / 在贷订单

```sql
SELECT province,
       SUM(CASE WHEN remaining_principal > 0 THEN 1 ELSE 0 END) AS 在贷订单数,
       ROUND(SUM(CASE WHEN remaining_principal > 0 THEN remaining_principal ELSE 0 END) / 100, 2) AS 在贷余额元
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type = '淘顺实时授信'
GROUP BY province;
```

### 4.2 30+ / 90+（A 口径）

```sql
SELECT province,
       SUM(CASE WHEN total_add_thirty_overdue >= 1 THEN 1 ELSE 0 END) AS 三十加订单,
       SUM(CASE WHEN conn_overdue_day >= 90 THEN 1 ELSE 0 END) AS 九十加订单,
       SUM(CASE WHEN total_add_thirty_overdue >= 1 THEN remaining_principal ELSE 0 END) / 100 AS 三十加余额元
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type = '淘顺实时授信' AND order_status='已竣工'
GROUP BY province;
```

### 4.3 额度满足率

```sql
SELECT store_addr_province AS province,
       COUNT(*) AS 通过数,
       ROUND(SUM(CASE WHEN order_amt IS NOT NULL AND credit_amt IS NOT NULL
                       AND CAST(order_amt AS DECIMAL(20,2)) <= CAST(credit_amt AS DECIMAL(20,2))
                 THEN 1 ELSE 0 END) / COUNT(*), 4) AS 满足率
FROM ods.ods_ts_credit_yzf_order_grant_apply
WHERE apply_status = '授信成功' AND custtype = '00'
  AND add_time >= '2026-01-01'
GROUP BY store_addr_province;
```

### 4.4 资损敞口

```text
敞口 = 在贷余额 × 终损率（分省）
优先级排序：按敞口降序，不按在贷规模
```

---

## 5. 申请与审批类

### 5.1 审批漏斗

```sql
SELECT
  COUNT(*) AS 申请数,
  SUM(CASE WHEN w.order_no IS NULL THEN 1 ELSE 0 END) AS 无风控记录,
  SUM(CASE WHEN w.strategy_id IS NULL AND w.order_no IS NOT NULL THEN 1 ELSE 0 END) AS 前置拦截,
  SUM(CASE WHEN w.first_risk_result IS NOT NULL THEN 1 ELSE 0 END) AS 有初审结果,
  SUM(CASE WHEN a.apply_status='授信成功' THEN 1 ELSE 0 END) AS 终通过
FROM ods.ods_ts_credit_yzf_order_grant_apply a
LEFT JOIN (SELECT order_no, MAX(strategy_id) strategy_id,
                  MAX(first_risk_result) first_risk_result
           FROM ods.ods_ts_order_white_list_control
           WHERE type='淘顺实时授信' GROUP BY order_no) w
       ON a.ct_user_id = w.order_no
WHERE a.business_type='02' AND a.custtype='00'
  AND a.add_time >= '2026-10-01';
```

⚠️ 「无风控记录」也可能是失败单不落库，需按 5.4 单独判定。

### 5.2 拒绝原因分布

```sql
SELECT apply_msg, COUNT(*) AS 笔数
FROM ods.ods_ts_credit_yzf_order_grant_apply
WHERE business_type='02' AND apply_status IN ('FAIL','授信失败')
  AND add_time >= '2026-10-01'
GROUP BY apply_msg ORDER BY 笔数 DESC;
```

- `综合评分不通过` / `综合评审不通过` = 我方拒绝
- 英文文案 = 翼支付侧拒绝

### 5.3 捞回分析

```sql
SELECT CASE WHEN recall_strategy IS NULL OR recall_strategy='' THEN '未捞回' ELSE '捞回' END AS 类型,
       COUNT(*) AS 笔数,
       SUM(CASE WHEN pass_flag='Y' THEN 1 ELSE 0 END) AS 通过数
FROM ods.ods_ts_order_white_list_control
WHERE type='淘顺实时授信' AND add_time >= '2026-10-01'
GROUP BY 类型;
```

### 5.4 通过率虚高识别

```text
① 按小时看通过率是否某时点突变
② 风控表按省统计 add_time 当日是否 0 条
③ 申请表 fail=0 且 pass>0 → 失败单没落库
⇒ 该窗口数据不可用于调控
```

---

## 6. 门店 / 代理商类

### 6.1 单店全维度

直接跑 `probe_store.py`，不要手写。

### 6.2 门店当前管控等级

```sql
SELECT id, store_code, store_name, channel_level, notes, adjust_type, add_time, update_time
FROM taoshun_fenqi.v3_order_store
WHERE store_code = '<store_code>'
ORDER BY id DESC;
```

🔴 取 **id 最大** 一条为当前生效；`update_time` 只代表刷新时间，不代表管控时间。

### 6.3 门店管控时间（正确口径）

```sql
SELECT DATE(add_time) AS 日期, store_level, pass_flag, COUNT(*) AS 笔数
FROM ods.ods_ts_order_white_list_control
WHERE type='淘顺实时授信'
  AND store_name = '<门店名>'
  AND store_level IN ('管控渠道','拉灰渠道','拉黑渠道')
GROUP BY 日期, store_level, pass_flag
ORDER BY 日期;
```

找最早出现「大量 pass_flag='N'」的日期。

### 6.4 门店拉黑候选（月维度）

```sql
SELECT province, store_id, store_name,
       COUNT(*) AS 竣工数,
       SUM(CASE WHEN add_thirty_overdue = 1 THEN 1 ELSE 0 END) AS 三十加,
       ROUND(SUM(CASE WHEN add_thirty_overdue = 1 THEN 1 ELSE 0 END)/COUNT(*), 4) AS 三十加率
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type='淘顺实时授信' AND order_status='已竣工'
GROUP BY province, store_id, store_name
HAVING 竣工数 >= 20 AND 三十加率 >= 0.10
ORDER BY 三十加率 DESC;
```

---

## 7. 配置类（本地镜像）

### 7.1 查某省分支配置

```sql
SELECT id, province, score_code, pass_ratio, update_time
FROM risk_control.sys_parameter_risk_score_control
WHERE province='湖南省' AND isv='淘顺' AND status='生效'
ORDER BY score_code;
```

⚠️ 实际表名以本地库为准（`risk_score_control`）；不同环境前缀可能不同。

### 7.2 查映射

```sql
SELECT id, strategy_id, strategy_type, score_code
FROM risk_control.sys_parameter_risk_strategy_id_info
WHERE province='江西省'
ORDER BY id;
```

### 7.3 查 cutoff

```sql
SELECT *
FROM risk_control.sys_parameter_risk_cutoff
WHERE province='湖南省' AND strategy_type='<分支>' AND pass_ratio BETWEEN 0.29 AND 0.31;
```

### 7.4 查套餐浮动

```sql
SELECT id, province, pack_name, pass_ratio, update_time
FROM risk_control.sys_parameter_risk_pack_name_control
WHERE province='湖南省'
ORDER BY update_time DESC;
```

🔴 全量列全，不要 LIMIT。

---

## 8. 名单类

### 8.1 用户黑白名单

```sql
SELECT id_number, user_name, user_type, business_type, number, add_time
FROM taoshun_fenqi.risk_user_black_white_list
WHERE id_number = '<身份证>'
  AND business_type = '淘顺实时授信';
```

### 8.2 保证金白名单

```sql
SELECT supplier_name, id_card, user_name, mobile_no, is_use, status, province, add_time
FROM taoshun_fenqi.bond_white_list
WHERE id_card = '<身份证>' AND is_use = 'N';
```

### 8.3 特批规模

```sql
SELECT province,
       COUNT(*) AS 特批单量,
       SUM(order_amt_yuan) AS 特批金额元
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type='淘顺实时授信'
  AND order_channel_id='特批白名单'
GROUP BY province ORDER BY 特批单量 DESC;
```

---

## 9. 对外交付类

### 9.1 分资方统计

```sql
SELECT fund_code,
       COUNT(*) AS 订单数,
       ROUND(SUM(order_amt_yuan)/10000, 2) AS 订单金额万元,
       ROUND(SUM(remaining_principal)/100/10000, 2) AS 在贷余额万元,
       SUM(CASE WHEN total_add_thirty_overdue >= 1 THEN 1 ELSE 0 END) AS 三十加,
       SUM(CASE WHEN conn_overdue_day >= 90 THEN 1 ELSE 0 END) AS 九十加
FROM dws.dws_credit_yzf_order_complete
WHERE source_business_type='淘顺实时授信' AND order_status='已竣工'
GROUP BY fund_code;
```

### 9.2 口径说明必写项

1. 时间窗口（含/不含当天）
2. 客群范围（公众/VIP/全量）
3. 是否含特批、是否含保证金
4. 金额含什么（本金/不含利息罚息）
5. 订单维度还是人去重
6. 单位（源为分，已转元）
7. 数据时点

---

## 10. 通用组件

### 10.1 去重子查询（可复用）

```sql
LEFT JOIN ods.ods_ts_credit_yzf_order_grant_apply a2
       ON a1.id_number_enc = a2.id_number_enc
      AND ((a2.apply_status='授信成功' AND a1.apply_status!='授信成功')
           OR (a1.apply_status=a2.apply_status AND a1.id < a2.id))
WHERE a2.id IS NULL
```

规则：**成功优先；同状态取 id 最小（最早）**。

### 10.2 风控表去重

```sql
SELECT order_no, MAX(strategy_id) AS strategy_id, MAX(first_risk_result) AS first_risk_result
FROM ods.ods_ts_order_white_list_control
WHERE type='淘顺实时授信'
GROUP BY order_no
```

### 10.3 日期区间

```sql
AND add_time >= '2026-10-01' AND add_time < '2026-11-01'   -- 左闭右开，避免边界重复
```

### 10.4 省名标准化

源库省名带「省/自治区/市」，跨表 join 前统一去掉后缀或建映射。

---

## 11. 交付前校验清单

- [ ] 主体数 / 单量 / 金额三方交叉，量级与历史一致
- [ ] 分省加总 = 全国
- [ ] 分资方加总 = 全量
- [ ] 关键数字换一条 SQL 路径复算
- [ ] 单位换算已标注
- [ ] 口径说明已随表交付
- [ ] 已过 `sql_guard`，已留痕 `统计留痕/`

---

*模板均为只读查询；涉及写入（门店等级、配置）必须先确认再执行。*
