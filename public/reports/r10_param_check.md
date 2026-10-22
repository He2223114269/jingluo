# 风控参数变更校验机制说明

> 版本: v1.0 | 日期: 2026-07-30

---

## 工具三件套

| 工具 | 文件路径 | 作用 |
|:---|:---|---|
| `plan.py` | `risk_engine/toolkit/sync/plan.py` | 记录变更计划到 `sys_parameter.change_plan` 表 |
| `config_validate.py` | `risk_engine/toolkit/sync/config_validate.py` | 校验配置是否正确（5条规则） |
| `config_push.py` | `risk_engine/toolkit/sync/config_push.py` | 本地改完后推送到 bl 源库 |

### 变更计划表 `sys_parameter.change_plan`

| 字段 | 说明 |
|:---|---|
| id | 自增主键 |
| table_name | 改哪张配置表（risk_score_control、risk_channel_control 等） |
| province | 哪个省份 |
| score_code | 策略分支编码（score_control 专用） |
| operation | INSERT / UPDATE / DELETE |
| field_name | 改什么字段 |
| old_value | 原值 |
| new_value | 新值 |
| status | **待确认 → 已确认 → 已推送 / 已取消** |
| notes | 备注/变更原因 |
| batch_id | 关联推送批次号（推送后回填） |

---

## 5条校验规则

| # | 规则 | 校验内容 | 标准来源 |
|:---:|:---|---|:---|
| 1 | 📐 **通过率合理性** | pass_ratio/rise_pass_ratio 是否在合理范围、是否为0、是否≥90% | 硬编码范围 |
| 2 | 🗺️ **省份覆盖度** | 其他配置表的省份是否与 score_control 一致（有没有漏配/多配） | **`risk_score_control` 动态读取** |
| 3 | 🏪 **标准5渠道** | 每个省份是否有优质/保证金/拉灰/普通/监管 5个渠道 | score_control 的省份清单 |
| 4 | 🔢 **score_code完整性** | 每个省份是否至少配了分支 | 自身分组统计 |
| 5 | 🔗 **跨表一致性** | score_control 有的省，channel_control 有没有？反之亦然 | score_control vs 其他表 |

---

## 完整工作流（含案例）

### 第一步：用户说要改什么

> 用户："我要配置一下西藏的通过率，把通过率为0.05的下降到0.04"

### 第二步：查当前值、录计划

查配置表确认当前值：

```
西藏 001_2511 pass_ratio=0.05
西藏 002_2511 pass_ratio=0.05
西藏 003_2511 pass_ratio=0.05
西藏 004_2511 pass_ratio=0.05
  其余分支 0.10
```

用 `plan.py` 录入变更计划（也可以用 SQL 直接 INSERT）：

```bash
python plan.py --add --table risk_score_control --province 西藏自治区 \
  --field pass_ratio --old 0.05 --new 0.04 --note "西藏001通过率下调"
```

记录在 change_plan 表中，状态为「待确认」。

### 第三步：用户确认

```bash
python plan.py --confirm <id>
```

状态变为「已确认」。

### 第四步：用户改本地配置表

用户手动修改 `sys_parameter.risk_score_control` 中西藏 001~004 的 pass_ratio 从 0.05 改为 0.04。

### 第五步：跑校验

```bash
# 全量校验
python config_validate.py

# 聚焦省份校验
python config_validate.py --province 西藏自治区

# 只看规则校验（不拉diff）
python config_validate.py --rules-only

# 输出报告到文件
python config_validate.py --province 西藏自治区 --output 校验报告_西藏.md
```

校验重点：
- ❌ **省份覆盖度**：检查有没有其他省被连带影响（类似今天的事故）
- ❌ **计划vs实际**：实际改的值是否跟计划一致
- ❌ **跨表一致性**：西藏的 channel_control、city_control 等有没有对齐

### 第六步：校验通过 → 推送

```bash
python config_push.py
```

推送到 bl 源库。

### 第七步：关联批次号，更新计划状态

```bash
python plan.py --link <id> --batch B20260730XXXX
```

状态变为「已推送」。

---

## plan.py 常用命令速查

```bash
# 查看所有待确认计划
python plan.py

# 按状态筛选
python plan.py --status 待确认
python plan.py --status 已推送

# 新增计划
python plan.py --add --table risk_score_control --province 湖北省 \
  --field pass_ratio --new 0.75 --note "湖北上线，参考江西配置"

# 确认执行
python plan.py --confirm 3

# 取消
python plan.py --cancel 3 --note "暂缓上线"

# 关联批次号
python plan.py --link 3 --batch B202607300001
```

---

## 触发条件（什么话术会触发这套流程）

任何以下对话，**必须走标准化流程**，不得当成普通需求处理：

- "调通过率"、"调整配置"、"配置一下"
- "上线新省"、"新接入"、"接入省份"
- "把xx改成xx" 涉及风控配置表字段值
- "改渠道浮动"、"调cutoff"
- "下线省份"、"下线配置"

---

## 已发现的存量问题（供参考）

以下问题在校验工具首次运行时已被检出，尚待确认：

| 问题 | 详情 |
|:---|---|
| ❌ 海南/保证金渠道 | `rise_pass_ratio=0.65` 超出合理范围 [-0.5, 0.5] |
| ❌ 山西/大同 city_control | `pass_ratio=0.8` 超出合理范围 [-0.5, 0.5] |
| ⚠️ 山东 | channel_control 有配置，但 score_control 没有（可能是遗留配置） |
| ⚠️ 多省 score_code | pass_ratio=0 的分支（需确认是否故意设为0） |
| 💡 多省 pass_ratio | >=90% 的高通过率分支（需确认是否合理） |
