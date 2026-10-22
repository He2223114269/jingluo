# 贵州决策树模型迁移（gz_v1）

- **日期**：2026-07-22
- **类型**：模型模拟
- **状态**：🟡 草稿待校正

## 背景
贵州决策树从 `decision_engine/rule_group/` 迁移到 `model_registry/models/gz_v1.py`——模型统一注册，模拟流程用 model_registry 加载分类器，不再自己写。

## 口径
- 模型位置：risk_engine/model_registry/models/gz_v1.py（已迁移到正确位置）
- 使用方式：`model_registry.load().classify_batch()`（平台标准分类流水线）

## 沉淀（可复用规则）
- **不用平台函数就是错**：模型必须注册到 model_registry，禁止自己写分类器（MEMORY.md 铁律）
- 模型注册位置：risk_engine/model_registry/models/

## 关联资产
- 模型：risk_engine/model_registry/models/gz_v1.py
- 日记：memory/2026-07-22.md
- 规则：MEMORY.md「核心禁令（不创造分类器）」

## 待跟进
- [ ] 湖南省 23 客群模型注册（当时待注册）
