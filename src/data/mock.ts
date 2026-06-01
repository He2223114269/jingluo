// Mock data for the Risk Control Engineer Portfolio

export const heroKPIs = [
  { label: '通过率监控覆盖', value: '11省', trend: 'up' as const, description: '每日自动化监控推送' },
  { label: '竞赛获奖', value: '国家级4项', trend: 'up' as const, description: '互联网+、节能减排等' },
  { label: '知识产权', value: '专利+软著5项', trend: 'up' as const, description: '发明专利2项、软著3项' },
];

export const capabilities = [
  {
    title: '风控建模',
    subtitle: 'Modeling',
    description: '基于XGBoost与决策树构建信用评分模型，独立负责实时授信业务风控模型搭建与策略制定。',
    items: ['信用评分模型', 'XGBoost/决策树', '特征工程', 'A/B测试评估'],
  },
  {
    title: '策略分析',
    subtitle: 'Strategy',
    description: '设计风控全流程决策树，覆盖用户准入、额度评估、审批策略等关键环节，持续优化通过率与坏账平衡。',
    items: ['策略设计', '客群画像分析', '多维度逾期归因', '门店异常行为分析'],
  },
  {
    title: '数据分析',
    subtitle: 'Data Analysis',
    description: '自主开发数据分析与监控工具，实现对日常授信、异常指标的实时追踪预警，输出风控建议并推动策略调整。',
    items: ['Python/Pandas数据处理', 'StarRocks大数据查询', '自动化监控脚本', '微信推送报告'],
  },
  {
    title: '算法研发',
    subtitle: 'Algorithm',
    description: '主持省级大创项目，提出基于超图正则化的深度非负矩阵分解社区发现算法，授权发明专利1项。',
    items: ['非负矩阵分解', '深度学习', '超图算法', '科研论文写作'],
  },
];

export const projects = [
  {
    id: 'risk-control-engine',
    title: '风控决策分析平台',
    description: '搭建完整的风控决策分析平台（GitHub开源），实现从数据采集、策略分析、评分卡建模到可视化看板的全链路，覆盖订单全生命周期监控。',
    tags: ['Next.js', 'FastAPI', 'Python', 'ECharts'],
    status: '迭代中',
  },
  {
    id: 'real-time-risk',
    title: '淘顺实时授信风控系统',
    description: '独立负责实时授信业务风控，基于XGBoost与决策树构建信用评分模型，设计风控流程树，日均处理超千笔授信申请。',
    tags: ['XGBoost', '决策树', '策略优化', 'SQL'],
    status: '已上线',
  },
  {
    id: 'deep-mf',
    title: '深度矩阵分解社区发现研究',
    description: '主持省级大创项目，提出基于超图正则化的深度非负矩阵分解方法，授权发明专利1项，在多个公开数据集平均准确率达63.4%。',
    tags: ['深度学习', '非负矩阵分解', '超图', 'Python'],
    status: '已完成',
    teamSize: '2人（导师指导 + 本人执行）',
    duration: '2023.03 - 2025.06',
  },
];

export const articles = [
  {
    id: 'pass-rate-monitor',
    title: '通过率监控体系搭建：从手动查数到自动推送',
    excerpt: '如何从零搭建一套覆盖11省的每日通过率自动化监控系统？从SQL、Python脚本到微信推送的完整实践。',
    date: '2026-05',
  },
  {
    id: 'tebie-analysis',
    title: '特批白名单对Vintage曲线的影响分析与治理',
    excerpt: '特批用户占比从13%飙升至43%导致Vintage曲线失真，如何发现问题、定位根因并推动策略调整？',
    date: '2026-05',
  },
];

export const timelineData = [
  {
    phase: '入行',
    date: '2024.11',
    title: '入职淘顺科技 · 风控建模算法工程师',
    description: '加入长沙淘顺信息科技有限公司，独立负责公司实时授信业务的风控模型搭建与策略制定。',
    metrics: [
      { label: '业务', value: '淘顺实时授信' },
      { label: '角色', value: '独立负责' },
      { label: '方向', value: '风控建模' },
    ],
  },
  {
    phase: '模型',
    date: '2024.12',
    title: '信用评分模型搭建',
    description: '基于XGBoost与决策树构建信用评分模型，设计风控流程树，覆盖用户准入、额度评估、审批策略等全链路。',
    metrics: [
      { label: '算法', value: 'XGBoost' },
      { label: '覆盖', value: '全流程' },
      { label: '评估', value: 'A/B测试' },
    ],
  },
  {
    phase: '工具',
    date: '2025.01',
    title: '自动化监控体系搭建',
    description: '自主开发数据分析与监控工具，实现每日通过率自动化追踪、省份达标判断、微信推送日报，覆盖11个省份。',
    metrics: [
      { label: '覆盖省份', value: '11省' },
      { label: '推送方式', value: '微信日报' },
      { label: '频率', value: '每日09:00' },
    ],
  },
  {
    phase: '分析',
    date: '2025.05',
    title: '多维度客群质态分析',
    description: '建立策略ID×本异网×新老客交叉分析框架，发现广西新客准入偏松、湖南特批占比异常等问题，推动策略调整。',
    metrics: [
      { label: '分析维度', value: '策略×客群' },
      { label: '发现', value: '准入偏松' },
      { label: '输出', value: '风控建议' },
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
    school: '湖南工商大学',
    major: '数据科学与大数据技术',
    degree: '本科',
    gpa: '3.2/4 (top10%)',
    courses: ['机器学习', '深度学习', '强化学习', 'Python程序设计', '数据挖掘', '算法分析与设计'],
    political: '中共党员',
  },
  awards: [
    '第九届全国大学生互联网+创新创业大赛 国家三等奖（项目负责人）',
    '第十六届全国大学生节能减排社会实践与科技竞赛 国家三等奖（项目负责人）',
    '第九届全国大学生统计建模大赛 省级三等奖（项目负责人）',
    '第十四届全国大学生数学建模大赛 省级三等奖（编程手）',
    '发明专利2项、软件著作权3项',
  ],
  career: {
    role: '风控建模算法工程师',
    company: '长沙淘顺信息科技有限公司',
    period: '2024.11 - 至今',
    focus: '独立负责淘顺实时授信业务风控模型搭建与策略制定',
  },
  growth: [
    { year: '2023', event: '主持省级大创项目，提出基于超图正则化的深度非负矩阵分解社区发现算法，授权发明专利1项' },
    { year: '2024', event: '入职淘顺科技，独立负责实时授信业务风控模型搭建与策略制定' },
    { year: '2025', event: '搭建通过率自动化监控体系，覆盖11省，建立多维度客群质态分析框架' },
    { year: '2026', event: '构建风控决策分析平台（GitHub开源），持续沉淀个人案例与方法论' },
  ],
  campusProjects: [
    {
      title: '深度矩阵分解算法研究',
      period: '2023.03 - 2024.06',
      role: '项目负责人',
      description: '主持省级大学生创新训练项目，提出基于超图正则化的深度非负矩阵分解（DNMF）社区发现算法。核心创新在于引入超图正则项替代传统邻接矩阵，捕捉多元信息维度；设计解码组件使编码后的矩阵能精确重构为原始矩阵，提升信息解析能力；优化约束项降低算法对数据噪音的敏感度。',
      result: '改进算法在多个公开数据集平均准确率达63.4%，获授权发明专利1项（图正则非负矩阵分解的聚类方法、装置及介质）',
      tags: ['非负矩阵分解', '深度学习', '社区发现', 'Python'],
    },
    {
      title: 'iChallenge-PM眼疾分类数据集深度学习模型复现与优化',
      period: '2023.09 - 2024.10',
      role: '独立开发',
      description: '基于PaddlePaddle深度学习框架成功复现并优化了LeNet、AlexNet、GoogLeNet等五种经典卷积神经网络算法，对包含多种眼部疾病图像样本的iChallenge-PM数据集进行训练与评估。通过灵活调整网络层数、卷积核大小等参数，适应不同的眼疾分类任务。',
      result: '掌握了各经典CNN模型的架构特点与调参方法',
      tags: ['深度学习', 'CV', 'PaddlePaddle', 'CNN'],
    },
    {
      title: '全国大学生数学建模竞赛',
      period: '2023.09 - 2024.09',
      role: '建模与编程（2023）/ 算法实现（2024）',
      description: '2023年竞赛中独立提出一种贪婪激活探索算法，通过迭代求解所有航行方向选择最优方向前行，成功解决海底多波探测航线路线规划问题。2024年竞赛中负责所有算法的实现与部分模型建立，独立实现板凳龙的轨迹可视化呈现与实体碰撞检测，输出速度与坐标数据。',
      result: '2023年省级三等奖（编程手），2024年继续参赛',
      tags: ['算法设计', '数学建模', 'Python', '可视化'],
    },
    {
      title: 'Ecomind — 基于LSTM的智能电网项目',
      period: '2023.04 - 2023.07',
      role: '项目创始人',
      description: '作为Ecomind项目创始人，项目旨在分析用户的用电数据，总结用电结构与规律，给用户针对性建议以减少待机耗电、优化用电结构。负责整个项目的把关、数据收集与处理、算法模型开发。使用开源数据集与团队成员及导师的用电数据作为训练集。',
      result: '测试发现根据不同用户场景可减少12-21%电费',
      tags: ['LSTM', '时序预测', '物联网', '数据分析'],
    },
  ],
  research: {
    projects: [
      {
        title: '主持大学生创新创业训练计划项目',
        subtitle: '基于超图正则化的深度非负矩阵分解的社区发现研究',
        period: '2023.03 - 2025.06',
        role: '项目负责人',
        description: '主持省级大学生创新训练项目，提出基于超图正则化的深度非负矩阵分解（DNMF）社区发现算法。以超图正则项替代传统邻接矩阵构建原始矩阵，捕捉多元复杂信息维度；设计自编码结构将编码后的矩阵精确重构为原始矩阵，提升深层节点信息的挖掘能力；在目标函数中引入新型范数约束，降低算法对数据噪音的敏感度。',
        result: '授权发明专利1项（图正则非负矩阵分解的聚类方法、装置及介质），改进算法在多个公开数据集平均准确率达63.4%',
      },
      {
        title: '参与谢小良教授科研团队',
        subtitle: '国家社科基金重点项目',
        period: '2023.06 - 至今',
        role: '研究组成员 · 本科生团队统筹负责人',
        description: '参与国家社科基金重点项目的结项工作及国家社科基金重大项目的立项筹备。负责本科生团队的任务分配与协作管理。独立研究《生态环境"再野化"视域下中国粮食安全统计监测体系创新》，通过总结前人研究及国家二十大报告，提出以种粮安全、耕地安全、气候风险等五个一级指标及24个二级指标构建评价体系。',
        result: '评价体系获导师高度评价，被正式聘请为科研团队研究组成员',
      },
    ],
  },
};
