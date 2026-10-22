# 外部分风控接口 迁移进风控平台 — 实施计划（待拍板）

| 项 | 内容 |
|---|---|
| 日期 | 2026-10-09 |
| 目标 | 把 jar 里的外部分接口迁移到平台自研 Python 客户端，**摆脱 jpype + jar 依赖**，支持测试/生产双环境 |
| 现状 | 已打通 1 个接口（modelInfo）的完整调用链，加密与 jar 字节级一致 |
| 状态 | **计划阶段，未执行** |

---

## 一、已探明、可直接复用的技术要素

1. **传输**：POST，body = 密文 **HEX 串**，Content-Type: text/plain
2. **加密**：AES-128-ECB/PKCS7，key = 指定串的 Base64 解码（16 字节）
   - 已用 jar 的 cn.bctools.common.AESEncryptionUtil 做**字节级对照，完全一致**
   - 该 key 硬编码在 jar 的 AESEncryptionUtil.SECRET_KEY
3. **响应**：明文 JSON（不加密）
4. **环境**：仅 modelInfo 已知成对地址
   - 测试 http://tsk.mynatapp.cc/test/mall/riskModel/modelInfo
   - 生产 http://unicom.bfravel.cn/mall/riskModel/modelInfo
   - 其余接口常量池里**只有 unicom.bfravel.cn 生产地址**

---

## 二、迁移范围：24 个接口（按域分组）

### A. 风控模型 / 评分（10）
| 方法 | 参数 DTO | 字段数 |
|---|---|---|
| api_model_info（生产）/ api_model_info_test（测试） | ApiModelInfo | 22 |
| api_risk_model | ApiRiskModel | 2 |
| api_risk_model_bad_users | ApiRiskModelBadUsers | 3 |
| api_tencent_tyf | ApiTencentTyf | 4 |
| api_xxhf | ApiXxhf | 4 |
| api_score139Plus | ApiScore139Plus | 5 |
| api_Ful_linkLxf139 | APIFullinkLxf139 | 5 |
| api_Ful_linkLxf140 | APIFullinkLxf140 | 5 |
| api_ivoryVone | IvoryVone | 4 |
| api_ivoryVtwo | IvoryVtwo | 4 |

### B. 运营商 / 在网（7）
| 方法 | 参数 DTO | 字段数 |
|---|---|---|
| api_telOnLineStatus | TelOnLineStatus | 3 |
| online_status | OnlineStatus | 2 |
| api_wind_tel_online_status | ApiWindTelOnlineStatus | 3 |
| api_wind_tel_onlinetime | ApiWindTelOnlinetime | 3 |
| api_wd_telStatus | ApiWDTelStatus | 3 |
| api_online_time | ApiOnlineTime | 3 |
| api_wd_MobileInfo | ApiWDMobileInfo | 11 |

### C. 三要素 / 实名（2）
| 方法 | 参数 DTO | 字段数 |
|---|---|---|
| api_wind_three_elements_verification | ApiWindThreeElementsVerification | 5 |
| api_wd_threeElementsVerification | ApiWDThreeElementsVerification | 5 |

### D. 账单 / 其它（5）
| 方法 | 参数 DTO | 字段数 |
|---|---|---|
| api_wind_three_bill | ApiWindThreeBill | 4 |
| api_orgName | ApiOrgName | 5 |
| ali_pre_risk | AliPreRisk | 4 |
| api_zkzt_dc | ZKZTDc | 3 |
| api_zkzt_zj | ZKZTZj | 2 |

---

## 三、架构设计（建议落点：risk_engine/toolkit/external_api/）

| 文件 | 职责 |
|---|---|
| crypto.py | AES-128-ECB 加密封装；key 从本地密钥文件/SecretRef 读，**不入 git** |
| client.py | 通用客户端：DTO → JSON → 加密 → HEX → POST → 解析响应；env=test/prod |
| endpoints.py | 接口注册表：method → {url_test, url_prod, dto_class, fields} |
| dtos.py | 各接口参数 DTO（dataclass），字段严格对齐 jar |
| registry.py | 统一入口：call("api_model_info", env="test", **kwargs) |
| tests/ | 单测 + **与 jar 的黄金对照**脚本 |

设计原则：
- 默认 env=test；打生产必须显式传参，防止误伤
- 字段名严格照 jar（含 IvoryVone/Vtwo 那种首字母大写的 IdCardNo/Name/Mobile 差异）
- 每个接口的 method → URL 配对**逐方法从字节码提取并验证**，不靠猜

---

## 四、分批执行

| 批次 | 内容 | 理由 |
|---|---|---|
| **批次 1** | api_model_info + api_model_info_test（并补齐 firstStrategyName） | 已有实测基础，闭环最快；jar 的 DTO 缺该字段，自研版可补齐 |
| **批次 2** | 运营商/在网 7 个（B 组） | 风控最常调用，与在网时长/在网状态强相关 |
| **批次 3** | 三要素 + 账单 + 其它（C/D 组，7 个） | 低频，可批量做 |
| **批次 4** | 评分类剩余（A 组其余 8 个） | 多数是与第三方的联合模型，需确认是否仍在用 |

每批**标准五步**：
1. 从字节码提取该接口的 URL + body 组装细节
2. **黄金对照**：同参数分别走 jar 与自研客户端，响应逐字段比对
3. 落地 DTO + 注册表 + 单测
4. 落档（BUSINESS_KNOWLEDGE + 工具索引）
5. 抽查测试环境实调

---

## 五、验收标准

- 自研客户端与 jar 对同一入参返回**逐字段一致**
- 加密输出与 jar 字节级一致（modelInfo 已验证）
- 测试/生产可切换，默认 test
- key、生产地址等敏感信息不入 git

---

## 六、风险与阻塞项（需你确认）

| # | 事项 | 影响 |
|---|---|---|
| 1 | **其余 23 个接口的测试地址未知** | 只能对生产地址做验证；或找木头要 test 镜像地址 |
| 2 | key 是否所有接口共用 | 常量池看只有一个 SECRET_KEY，推测共用；需验证 |
| 3 | 生产是否需额外鉴权（header/sign） | 目前测试环境不需要；生产未验证 |
| 4 | 24 个接口哪些还在用 | 全迁可能白做，建议按使用频率分批 |
| 5 | jar 版 DTO 缺 firstStrategyName | 自研版按需求文档补齐即可 |

---

## 七、需要你拍板

1. **迁移范围**：全部 24 个，还是先做「modelInfo + 高频运营商类」？
2. **验证强度**：是否每个接口都做 jar 黄金对照（稳但慢）？还是抽查？
3. **测试地址**：其余接口的 test 地址你能拿到吗？拿不到就走生产只读验证。
4. **落点确认**：平台仓库 risk_engine/toolkit/external_api/ 是否合适？要不要同时挂到平台前端/API 层？

---

## 附录：本轮已产出的可复用资产

- 接口调用脚本：~/scripts/_oneoff/2026-10/initial_strategy_float_test.py
- 加密密钥：~/scripts/_oneoff/2026-10/ext_risk_test_key.txt（chmod 600，不入 git）
- jar 家底清单：~/scripts/_oneoff/2026-10/jar_inventory.txt
- 已验证结论：BUSINESS_KNOWLEDGE.md「外部分风控接口」节

---

# 四、平台内构建方式（2026-10-09 补充）

## 4.1 定位
外部分接口本质是「一个数据源」，与 risk_engine/toolkit/connectors/ 同级同类，遵循同一哲学：
上层只关心「我有数据源」，不关心底下连什么。

## 4.2 目录与文件（落点 risk_engine/toolkit/external_api/）
| 文件 | 职责 |
|---|---|
| __init__.py | 门面：call() / get_client() |
| crypto.py | AesEcbCipher：AES-128-ECB/PKCS7，encrypt→HEX / decrypt |
| settings.py | env / key / 超时 / 重试 / 生产开关 |
| dto.py | ApiRequest 基类 + 各接口 DTO（字段顺序照 jar，支持 extra 透传） |
| endpoints.py | 接口注册表：name → EndpointSpec(dto, urls{test,prod}, timeout, retries) |
| client.py | 拼参 → 加密 → POST(text/plain, HEX) → 解析；错误归一 + 重试 |
| errors.py | DecryptFailed / Transport / Upstream5xx / Payload 分类 |
| tests/ | 黄金向量回归 + 注册表校验 |

新增接口 = 加一条 spec + 一个 DTO，client 不改。

## 4.3 分层（只向下依赖）
config/settings → crypto → dto → endpoints → client
                                        ├→ feature_store/online（实时取数→特征）
                                        ├→ decision_engine（当数据源）
                                        └→ backend/api/routes（给人/前端）

## 4.4 接线点
| 组件 | 怎么接 |
|---|---|
| config | RiskEngineSettings 增 ExternalApiSettings；key 走 SecretRef/本地 600 文件，不入 git；env 默认 test |
| feature_store | 结果落表（dwd_ext_api_result）→ offline 从表取（训练可复现）；online 实时调 + 缓存 |
| decision_engine | 薄适配 fetch(params) -> dict，与 db 连接器同形 |
| backend/api | 新增 routes/external_api.py（prefix=/api/external）并在 main.py 注册 |

## 4.5 落库与可观测
复用现成的 risk_info_record（风控接口调用记录表），记录 api_name/env/requestId/耗时/缓存/错误码，
产出「外部接口可用性看板」，与 risk_business 的模型降级优先级联动。

---

# 七、风险与注意事项

## 🔴 红线
1. 契约漂移：其余 23 个接口字段全靠反推 jar → 固化为回归测试 + 登记 jar 版本 hash
2. 密钥/地址漂移：→ 每日健康探测，失败告警
3. 同步调用拖垮授信链路：→ 短超时 + 熔断 + 缓存 + 重试上限，并写死「取不到走哪条分支」

## 🟡 合规/安全
4. 三要素留痕（姓名+身份证+手机号）→ 调用落库
5. 测试与日志脱敏，禁止真实身份证/手机号
6. 生产域名归属确认（unicom.bfravel.cn）

## 🟢 工程
7. 加密用库（cryptography，已装），不用 shell 调 openssl
8. DTO 允许额外字段透传（field 集会演进）
9. 并发/限流 + 批量排队
10. 先盘 24 个接口的实际使用情况，避免维护死接口

## 🔵 联动
11. 与「去外部数据决策树重建」是同一件事的两面：本迁移补早期发现，重建的树是兜底分支，应联动
12. 模块责任人：碰生产调用，需 review 约定

---

# 九、迁移进度（2026-10-09）

## 已完成（批次 1 主体）
- 新增模块 risk_engine/toolkit/external_api/（crypto / settings / dto / endpoints / client / errors / tests / README）
- 依赖：cryptography 50.0.2（已装入 .venv）、pytest 9.1.1（dev）
- 密钥落位：~/.risk/external_api_key（chmod 600，不入 git）
- 单元测试：3 passed（黄金向量与 jar 一致、加解密往返、key 长度校验）
- 安全自检：env=prod 在未开 allow_prod 时被正确拒绝
- 实调：隧道抖动期多次 502，客户端正确归类为 ExternalApiUpstreamError 并重试

## 待办
- 隧道恢复后完成 modelInfo 实调对照（命中 -0.30 / 未命中 0）
- 每日健康探测脚本 + 接入 crontab
- 批次 2：运营商/在网 7 个接口
