// Mock data for the Risk Control Engineer Portfolio

export const heroKPIs = [
  { label: '资损率', before: '13%', after: '5%', trend: 'down' as const, description: '模型迭代后资损率大幅下降' },
  { label: '模型迭代', value: '3次', trend: 'up' as const, description: '持续优化模型表现' },
  { label: '区域策略优化', value: '+21%', trend: 'up' as const, description: '区域差异化策略提升' },
];

export const capabilities = [
  {
    title: '建模能力',
    subtitle: 'Modeling',
    description: '基于业务场景构建风控评分模型，涵盖信用评分、反欺诈模型、催收模型等，持续迭代优化模型性能指标。',
    items: ['评分卡模型', 'XGBoost/LightGBM', '特征工程', '模型评估与调优'],
  },
  {
    title: '策略能力',
    subtitle: 'Strategy',
    description: '设计并实施差异化风控策略，结合业务目标与风险偏好，制定准入、额度、定价等全链路策略体系。',
    items: ['策略设计', 'A/B测试', '策略效果评估', '区域差异化策略'],
  },
  {
    title: '工程能力',
    subtitle: 'Engineering',
    description: '将模型与策略工程化落地，构建实时风控决策引擎，确保系统高可用、低延迟、可扩展。',
    items: ['实时决策引擎', '特征计算平台', '模型部署上线', '系统性能优化'],
  },
  {
    title: '监控能力',
    subtitle: 'Monitoring',
    description: '建立全链路风控监控体系，实时追踪模型稳定性、策略效果、资损波动，及时发现并处理异常。',
    items: ['模型稳定性监控', 'PSI预警', '资损实时监控', '异常归因分析'],
  },
];

export const projects = [
  {
    id: 'risk-model-iteration',
    title: '风控模型迭代项目',
    description: '通过3轮模型迭代，将资损率从13%降至5%，同时保持通过率稳定。结合区域差异化策略，实现额外21%的效果提升。',
    tags: ['评分卡', 'XGBoost', '策略优化'],
    status: '已完成',
  },
  {
    id: 'realtime-engine',
    title: '实时风控决策引擎',
    description: '构建毫秒级实时风控决策系统，支持多模型并行调用、策略动态配置，日均决策量超百万次。',
    tags: ['决策引擎', '实时计算', '高可用'],
    status: '已上线',
  },
  {
    id: 'fraud-detection',
    title: '反欺诈模型体系',
    description: '搭建多维度反欺诈模型体系，覆盖设备指纹、行为序列、关系网络等维度，欺诈识别率提升35%。',
    tags: ['反欺诈', '图模型', '行为分析'],
    status: '迭代中',
  },
];

export const articles = [
  {
    id: 'model-stability',
    title: '风控模型稳定性监控：从PSI到归因分析',
    excerpt: '模型上线后稳定性如何保障？本文从PSI监控出发，讨论模型漂移的检测与归因方法。',
    date: '2025-08',
  },
  {
    id: 'strategy-design',
    title: '差异化风控策略设计：从全局到区域',
    excerpt: '不同区域的风险特征差异显著，如何设计兼顾全局与局部的策略体系？',
    date: '2025-06',
  },
];

export const timelineData = [
  {
    phase: '阶段一',
    date: '2024.11',
    title: '初始模型搭建',
    description: '基于历史数据构建基线评分卡模型，完成特征筛选与模型训练，建立基础风控能力。',
    metrics: [
      { label: '资损率', value: '13% → 7%' },
      { label: 'KS值', value: '0.32' },
      { label: 'AUC', value: '0.78' },
    ],
  },
  {
    phase: '阶段二',
    date: '2025.03',
    title: '模型优化',
    description: '引入XGBoost模型，优化特征工程，增加行为类特征与交叉特征，模型性能显著提升。',
    metrics: [
      { label: '资损率', value: '7% → 5%' },
      { label: 'KS值', value: '0.41' },
      { label: 'AUC', value: '0.85' },
    ],
  },
  {
    phase: '阶段三',
    date: '2025.06',
    title: '区域策略优化',
    description: '针对不同区域风险特征，设计差异化风控策略，优化准入与额度策略，实现区域精细化管理。',
    metrics: [
      { label: '策略效果', value: '+21%' },
      { label: '覆盖区域', value: '8个省份' },
      { label: '通过率', value: '稳定' },
    ],
  },
  {
    phase: '阶段四',
    date: '持续',
    title: '持续迭代',
    description: '建立模型监控体系，持续追踪PSI、KS等指标，定期迭代模型与策略，确保风控效果持续优化。',
    metrics: [
      { label: 'PSI', value: '<0.1' },
      { label: '迭代周期', value: '季度' },
      { label: '监控覆盖', value: '100%' },
    ],
  },
];

export const dashboardKPIs = [
  { label: '资损率', value: 5.2, unit: '%', trend: -0.3, status: 'normal' as const },
  { label: 'KS值', value: 0.41, unit: '', trend: 0.02, status: 'normal' as const },
  { label: '通过率', value: 72.8, unit: '%', trend: 1.2, status: 'normal' as const },
  { label: '坏账率', value: 1.8, unit: '%', trend: -0.1, status: 'normal' as const },
];

export const ksCurveData = {
  months: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08'],
  train: [0.38, 0.39, 0.41, 0.42, 0.41, 0.43, 0.42, 0.41],
  oot: [0.35, 0.37, 0.39, 0.40, 0.38, 0.41, 0.40, 0.39],
};

export const aucCurveData = {
  months: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08'],
  train: [0.82, 0.83, 0.85, 0.86, 0.85, 0.87, 0.86, 0.85],
  oot: [0.79, 0.81, 0.83, 0.84, 0.82, 0.85, 0.84, 0.83],
};

export const psiData = {
  months: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08'],
  values: [0.03, 0.05, 0.04, 0.06, 0.15, 0.08, 0.05, 0.04],
  threshold: 0.1,
};

export const strategyPassRate = {
  strategies: ['策略A', '策略B', '策略C', '策略D', '策略E'],
  passRates: [78, 72, 65, 82, 70],
  badRates: [2.1, 1.8, 1.5, 2.8, 1.9],
};

export const riskSegmentBadRate = {
  segments: ['极低风险', '低风险', '中风险', '高风险', '极高风险'],
  badRates: [0.3, 0.8, 2.1, 4.5, 8.2],
  proportions: [25, 30, 25, 15, 5],
};

export const regionData = {
  provinces: ['广东', '浙江', '江苏', '四川', '河南', '湖北', '湖南', '山东'],
  lossRates: [4.2, 3.8, 4.5, 6.1, 5.8, 5.2, 4.9, 5.5],
};

export const regionOptimization = {
  province: '四川',
  before: 7.8,
  after: 5.1,
  improvement: 34.6,
};

export const alerts = [
  { type: 'warning' as const, message: 'PSI异常：2025-05月PSI=0.15，超过阈值0.10', time: '2025-05-15 09:30' },
  { type: 'danger' as const, message: '资损波动：某区域资损率周环比上升1.2%', time: '2025-07-22 14:15' },
  { type: 'warning' as const, message: '模型漂移：OOT KS值连续2月下降', time: '2025-08-01 10:00' },
  { type: 'success' as const, message: '策略优化生效：区域策略优化后资损下降34.6%', time: '2025-06-20 16:45' },
];

export const aboutData = {
  education: {
    school: '某985高校',
    major: '统计学 / 机器学习方向',
    degree: '硕士',
  },
  career: {
    role: '风控建模工程师',
    company: '某头部金融科技公司',
    focus: '负责信贷风控模型建设与策略优化',
  },
  growth: [
    { year: '2022', event: '入行风控领域，从数据分析起步' },
    { year: '2023', event: '独立负责评分卡模型建设，完成首个模型上线' },
    { year: '2024', event: '主导风控模型迭代项目，资损率从13%降至5%' },
    { year: '2025', event: '构建区域差异化策略体系，效果提升21%' },
  ],
};
