// Mock data for the Risk Control Engineer Portfolio

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  teamSize?: string;
  duration?: string;
}

export interface CaseDetail {
  t: string;
  c: string;
}

export interface WorkCase {
  no: string;
  title: string;
  problem: string;
  locate: string;
  model: string;
  strategy: string;
  verify: string;
  results: { k: string; v: string }[];
  contribution?: string;
  detail?: CaseDetail[];
}

export interface MilestoneItem {
  period: string;
  event: string;
  stage?: string;
}


export const heroKPIs = [
  { label: '覆盖省份', value: '30 省', trend: 'up' as const, description: '通过率与质态监控覆盖' },
  { label: '累计管理放款', value: '22 亿+', trend: 'up' as const, description: '2024-11 入职起' },
  { label: '日均授信订单', value: '3,000+', trend: 'up' as const, description: '实时授信决策' },
];

export const capabilities = [
  {
    title: '信用评分建模',
    subtitle: 'Modeling',
    description: '基于 XGBoost 构建生产级风险评分模型与特征工程管线：200+ 原始字段筛选 20+ 核心特征，IV 筛选 + 相关性分析 + 分箱校验，类别权重与分层采样处理样本不平衡。',
    items: ['XGBoost / 评分卡', '特征工程', 'IV / 分箱', 'KS / AUC / PSI', '拒绝推断'],
  },
  {
    title: '分层策略决策',
    subtitle: 'Strategy',
    description: '设计 3 层 20+ 节点分层策略树，按客群 × 渠道 + 运营商 × 行为与外部评分动态定阈；建立通过率双向调控与资损目标反推配额机制。',
    items: ['策略树设计', '客群分层', '通过率-Cutoff 校准', '资损配额反推', '灰度上线'],
  },
  {
    title: '风险监控与异常治理',
    subtitle: 'Monitoring',
    description: '搭建通过率、资损、套餐、渠道、地市、门店、代理商与模型效果的多维监控；建立门店欺诈识别特征与分级处置机制，推动常态化治理。',
    items: ['通过率日报与归因', 'Vintage / 终损', '门店欺诈识别', '评级体系', '异常预警'],
  },
  {
    title: '工程化与平台',
    subtitle: 'Engineering',
    description: '开发全流程风控监控平台与工具链：Python + FastAPI + StarRocks，配置同步 / 校验 / 推送 / 回读三件套，统计入口 + SQL 守门 + 自动留痕。',
    items: ['Python / SQL', 'FastAPI', 'StarRocks', '自动化监控', '配置治理'],
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'loss-audit',
    title: '24 省模型迁移资损评估：口径审计与修正',
    description: '在 24 省模型迁移的资损评估中，发现并修正一个「结果自洽、公式正确、但结论完全错误」的系统性低估（小样本零逾期）；并识别出 5 个省的评级映射异常，避免用失真数据做分批上线决策。',
    tags: ['数据审计', '口径治理', '贝叶斯收缩', 'SQL / StarRocks'],
    status: '已完成',
    teamSize: '独立完成',
    duration: '2026.09',
  },
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
  {
    id: 'zhihuan-ecology',
    title: '智环生态——污泥数智处理与资源化利用引领者',
    description: '第九届互联网+创新创业大赛国家三等奖（项目负责人）。构建"污水厂→污泥处理→水泥厂"完整产业链，以负压低沸烘干技术将污泥含水率从80%降至30%以下，压缩制成再生燃料实现污泥资源化利用。',
    tags: ['污泥资源化', '互联网+国三', '专利', '创新创业'],
    status: '已完成',
    teamSize: '项目负责人',
    duration: '2023.07 - 2024.06',
  },
  {
    id: 'ecomind',
    title: 'Ecomind——基于LSTM的智能电网项目',
    description: '第十六届节能减排社会实践与科技竞赛国家三等奖（项目创始人）。基于LSTM构建用电负荷预测模型，分析用户用电数据与行为模式，提供针对性节电建议，测试可减少12-21%电费。',
    tags: ['LSTM', '时序预测', '物联网', '节能减排'],
    status: '已完成',
    teamSize: '项目创始人',
    duration: '2023.04 - 2023.07',
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
    role: '风控策略建模工程师',
    company: '长沙淘顺信息科技有限公司',
    period: '2024.11 - 至今',
    focus: '「淘顺实时授信」业务唯一独立负责人：准入规则、信用评分、策略决策、贷后监控与风险分析闭环；覆盖 30 省、累计管理放款超 22 亿元',
  },
  growth: [
    { year: '2023', event: '主持省级大创项目，提出基于超图正则化的深度非负矩阵分解社区发现算法，授权发明专利1项' },
    { year: '2024', event: '入职淘顺科技，独立负责实时授信业务风控模型搭建与策略制定' },
    { year: '2025', event: '搭建通过率自动化监控体系（覆盖11省），建立客群质态分析框架与Vintage资损预测方法论，主导门店欺诈识别专项' },
    { year: '2026', event: '24 省策略体系分 4 批灰度上线（零配置事故）；建立月度逐省通过率双向调控与资损配额反推机制；门店欺诈治理与特批口径修正；构建风控监控平台与工具链' },
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
        link: 'research-dnmf',
      },
      {
        title: '参与谢小良教授科研团队',
        subtitle: '国家社科基金重点项目 / 国家自然科学基金申报',
        period: '2023.06 - 至今',
        role: '研究组成员 · 本科生团队统筹负责人',
        description: '参与国家社科基金重点项目结项工作及国家自然科学基金项目申报筹备，具体负责本科生团队的任务分配与协作管理。在粮食安全方向独立研究《生态环境"再野化"视域下中国粮食安全统计监测体系创新》及《全球疫情冲击背景下中国粮食供应链安全风险的统计监测与预警研究》，以种粮安全、耕地安全、气候风险等五个一级指标及24个二级指标构建评价体系。',
        result: '评价体系获导师高度评价，被正式聘请为科研团队研究组成员，带领本科生团队完成多项课题任务',
      },
    ],
  },
};

// ============ 工作介绍页数据 ============
export const workIdentity = {
  role: '风控策略建模工程师',
  company: '长沙淘顺信息科技有限公司',
  period: '2024.11 - 至今',
  title: '消费金融实时授信风控',
  summary:
    '独立负责「淘顺实时授信」端到端风控全链路：准入规则、信用评分、策略决策、贷后监控与风险分析闭环；负责该业务唯一独立负责人，覆盖 30 省、日均 3,000 单、累计管理放款超 22 亿元；并主导通融实时授信迁移、淘顺先享合约等项目。',
};

export const workScale = [
  { value: '30 省', label: '业务覆盖', desc: '实时授信业务覆盖' },
  { value: '3,000+', label: '日均授信订单', desc: '贷前准入，秒级响应' },
  { value: '22 亿+', label: '累计管理放款', desc: '2024-11 入职起' },
  { value: '24 省', label: '分批迁移上线', desc: '2026-09 分 4 批上线' },
];


export const scaleDetail = {
  monthly: [
    { ym: '2024-11', amt: 1.05 }, { ym: '2024-12', amt: 1.09 },
    { ym: '2025-01', amt: 0.63 }, { ym: '2025-02', amt: 0.27 },
    { ym: '2025-03', amt: 0.31 }, { ym: '2025-04', amt: 0.44 },
    { ym: '2025-05', amt: 0.90 }, { ym: '2025-06', amt: 0.82 },
    { ym: '2025-07', amt: 0.95 }, { ym: '2025-08', amt: 0.95 },
    { ym: '2025-09', amt: 0.85 }, { ym: '2025-10', amt: 1.06 },
    { ym: '2025-11', amt: 1.07 }, { ym: '2025-12', amt: 1.49 },
    { ym: '2026-01', amt: 1.49 }, { ym: '2026-02', amt: 1.68 },
    { ym: '2026-03', amt: 1.17 }, { ym: '2026-04', amt: 0.93 },
    { ym: '2026-05', amt: 1.30 }, { ym: '2026-06', amt: 1.15 },
    { ym: '2026-07', amt: 1.07 }, { ym: '2026-08', amt: 0.75 },
    { ym: '2026-09', amt: 0.60 },
  ],
  provinces: [
    { name: '湖南', pct: 70.0 }, { name: '贵州', pct: 13.1 }, { name: '江西', pct: 6.5 },
    { name: '广西', pct: 2.9 }, { name: '甘肃', pct: 2.3 }, { name: '其他 24 省', pct: 5.2 },
  ],
  segments: [
    { name: '存量 VIP', pct: 48.4 }, { name: '公众', pct: 29.0 }, { name: 'VIP', pct: 22.6 },
  ],
  facts: [
    { k: '单笔均额', v: '1,453 元' },
    { k: '人均单数', v: '1.0 单' },
    { k: '峰值月', v: '2026-02 · 1.68 亿' },
  ],
};



export const provinceMap = [
  { name: '湖南省', label: '湖南', orders: 1060911, amt: 15.54, first: '2024-11' },
  { name: '贵州省', label: '贵州', orders: 199022, amt: 3.08, first: '2024-11' },
  { name: '江西省', label: '江西', orders: 97918, amt: 1.5, first: '2024-11' },
  { name: '广西壮族自治区', label: '广西', orders: 44018, amt: 0.52, first: '2024-11' },
  { name: '甘肃省', label: '甘肃', orders: 34776, amt: 0.44, first: '2026-03' },
  { name: '安徽省', label: '安徽', orders: 24208, amt: 0.23, first: '2026-01' },
  { name: '海南省', label: '海南', orders: 21226, amt: 0.26, first: '2025-03' },
  { name: '江苏省', label: '江苏', orders: 7269, amt: 0.1, first: '2026-03' },
  { name: '宁夏回族自治区', label: '宁夏', orders: 6548, amt: 0.08, first: '2024-11' },
  { name: '四川省', label: '四川', orders: 3794, amt: 0.06, first: '2026-03' },
  { name: '吉林省', label: '吉林', orders: 3639, amt: 0.04, first: '2026-03' },
  { name: '河北省', label: '河北', orders: 2392, amt: 0.02, first: '2026-08' },
  { name: '陕西省', label: '陕西', orders: 1836, amt: 0.02, first: '2026-08' },
  { name: '湖北省', label: '湖北', orders: 1409, amt: 0.02, first: '2026-08' },
  { name: '辽宁省', label: '辽宁', orders: 1294, amt: 0.02, first: '2026-08' },
  { name: '山东省', label: '山东', orders: 1137, amt: 0.02, first: '2026-08' },
  { name: '山西省', label: '山西', orders: 709, amt: 0.01, first: '2026-07' },
  { name: '河南省', label: '河南', orders: 637, amt: 0.01, first: '2026-08' },
  { name: '浙江省', label: '浙江', orders: 589, amt: 0.01, first: '2026-06' },
  { name: '内蒙古自治区', label: '内蒙古', orders: 556, amt: 0.01, first: '2026-08' },
  { name: '黑龙江省', label: '黑龙江', orders: 480, amt: 0.01, first: '2026-08' },
  { name: '云南省', label: '云南', orders: 276, amt: 0, first: '2026-08' },
  { name: '青海省', label: '青海', orders: 170, amt: 0, first: '2026-08' },
  { name: '西藏自治区', label: '西藏', orders: 125, amt: 0, first: '2026-08' },
  { name: '新疆维吾尔自治区', label: '新疆', orders: 114, amt: 0, first: '2026-08' },
  { name: '福建省', label: '福建', orders: 69, amt: 0, first: '2026-08' },
  { name: '重庆市', label: '重庆', orders: 58, amt: 0, first: '2026-08' },
  { name: '天津市', label: '天津', orders: 45, amt: 0, first: '2026-08' },
  { name: '北京市', label: '北京', orders: 44, amt: 0, first: '2026-08' },
];

export const topSuppliers = [
  { name: '贵州兴信大通讯贸易', orders: 12981, stores: 127 },
  { name: '东安恒信通手机卖场', orders: 12915, stores: 36 },
  { name: '张家界永定诚至通讯店', orders: 8370, stores: 11 },
  { name: '遵义兴信大通讯贸易', orders: 7676, stores: 31 },
  { name: '湖南飞鸿电子信息', orders: 7385, stores: 22 },
  { name: '永州冷水滩七信手机店', orders: 7200, stores: 35 },
  { name: '长沙广袤德馨科技', orders: 6989, stores: 24 },
  { name: '遵义中源恒信通讯', orders: 6717, stores: 28 },
];

export const topStores = [
  { name: '岳阳开发区乐科通讯店', province: '湖南', orders: 4362 },
  { name: '益阳桃花仑建资国力手机卖场', province: '湖南', orders: 3020 },
  { name: '长沙芙蓉迅磊鑫专营店', province: '湖南', orders: 2824 },
  { name: '耒阳五一中心厅五洲店', province: '湖南', orders: 2787 },
  { name: '宁远中心营业厅凯利通信', province: '湖南', orders: 2594 },
  { name: '汨罗亿佰佳中心营业厅', province: '湖南', orders: 2473 },
  { name: '邵东齐欣大卖场', province: '湖南', orders: 2456 },
  { name: '平江县中心营业厅', province: '湖南', orders: 2257 },
];

export const scaleCards = [
  {
    key: 'fund', label: '资金规模', value: '22.02 亿', sub: '累计管理放款',
    note: '订单金额合计，含已结清订单，不是当前在贷余额。',
    facts: [
      { k: '单笔均额', v: '1,453 元' },
      { k: '峰值月', v: '2026-02 · 1.68 亿' },
      { k: '订单合计', v: '151.5 万笔' },
    ],
    bars: [
      { name: '2024-11', pct: 62, v: '1.05 亿' },
      { name: '2025-02', pct: 16, v: '0.27 亿' },
      { name: '2025-05', pct: 54, v: '0.90 亿' },
      { name: '2025-08', pct: 57, v: '0.95 亿' },
      { name: '2025-11', pct: 64, v: '1.07 亿' },
      { name: '2026-02', pct: 100, v: '1.68 亿' },
      { name: '2026-05', pct: 77, v: '1.30 亿' },
      { name: '2026-09', pct: 36, v: '0.60 亿' },
    ],
    barsNote: '月度放款额（相对峰值）',
  },
  {
    key: 'daily', label: '日均单量', value: '2,200 单', sub: '全周期均值',
    note: '2024-11-04 至 2026-09-23；近 90 天日均 2,009 单，2026-09 停流前最后一个月 4.19 万单。',
    facts: [
      { k: '峰值月', v: '2026-02 · 11.70 万' },
      { k: '近 90 天日均', v: '2,009 单' },
      { k: '最新月', v: '2026-09 · 4.19 万' },
    ],
    bars: [
      { name: '2025-10', pct: 61, v: '7.17 万' },
      { name: '2025-11', pct: 65, v: '7.57 万' },
      { name: '2025-12', pct: 89, v: '10.44 万' },
      { name: '2026-01', pct: 88, v: '10.35 万' },
      { name: '2026-02', pct: 100, v: '11.70 万' },
      { name: '2026-03', pct: 69, v: '8.10 万' },
      { name: '2026-04', pct: 56, v: '6.49 万' },
      { name: '2026-05', pct: 77, v: '9.03 万' },
      { name: '2026-06', pct: 68, v: '7.91 万' },
      { name: '2026-07', pct: 64, v: '7.46 万' },
      { name: '2026-08', pct: 46, v: '5.34 万' },
      { name: '2026-09', pct: 36, v: '4.19 万' },
    ],
    barsNote: '近 12 个月单量（相对峰值）',
  },
  {
    key: 'province', label: '省份覆盖', value: '30 省', sub: '业务开通口径',
    note: '按订单发生地统计，实际有订单 29 省；其余为已开通未放量。',
    facts: [
      { k: '前 3 省合计', v: '89.6%' },
      { k: '湖南占比', v: '70.0%' },
      { k: '实际有单', v: '29 省' },
    ],
    bars: [
      { name: '湖南', pct: 100, v: '106.1 万单' },
      { name: '贵州', pct: 18.8, v: '19.9 万单' },
      { name: '江西', pct: 9.2, v: '9.8 万单' },
      { name: '广西', pct: 4.1, v: '4.4 万单' },
      { name: '甘肃', pct: 3.3, v: '3.5 万单' },
    ],
    barsNote: 'Top 5 省单量（相对湖南）',
  },
  {
    key: 'supplier', label: '合作代理商', value: '26,891 家', sub: '实际成交口径',
    note: '实际产生成交的代理商名称数，非签约总量。',
    facts: [
      { k: '头部单量', v: '1.30 万单' },
      { k: '头部门店数', v: '127 家' },
      { k: 'Top8 占比', v: '约 9%' },
    ],
    bars: [
      { name: '贵州兴信大', pct: 100, v: '12,981 单' },
      { name: '东安恒信通', pct: 99, v: '12,915 单' },
      { name: '张家界诚至', pct: 64, v: '8,370 单' },
      { name: '遵义兴信大', pct: 59, v: '7,676 单' },
      { name: '湖南飞鸿', pct: 57, v: '7,385 单' },
    ],
    barsNote: 'Top 5 代理商单量（相对第一）',
  },
  {
    key: 'store', label: '服务门店', value: '34,110 家', sub: '实际成交口径',
    note: '实际产生成交的门店数，按门店名 + 省份去重，非签约门店总量。',
    facts: [
      { k: '头部门店单量', v: '4,362 单' },
      { k: '头部省份', v: '湖南' },
      { k: '门店均单', v: '约 44 单' },
    ],
    bars: [
      { name: '岳阳乐科', pct: 100, v: '4,362 单' },
      { name: '益阳国力', pct: 69, v: '3,020 单' },
      { name: '长沙迅磊鑫', pct: 65, v: '2,824 单' },
      { name: '耒阳五洲', pct: 64, v: '2,787 单' },
      { name: '宁远凯利', pct: 59, v: '2,594 单' },
    ],
    barsNote: 'Top 5 门店单量（相对第一）',
  },
];

export const workDuties = [
  { title: '准入规则与策略树', desc: '3 层 20+ 节点分层策略设计' },
  { title: '信用评分建模', desc: 'XGBoost / 评分卡 / 特征工程' },
  { title: '模型评估与迭代', desc: 'KS / AUC / PSI / 拒绝推断' },
  { title: '通过率双向调控', desc: '优质分支放量、高风险压降' },
  { title: '资损目标配额反推', desc: '分支级资损加权定通过率' },
  { title: 'Vintage / 终损预测', desc: '四种方法交叉验证' },
  { title: '门店 / 代理商 / 套餐评级', desc: '数据驱动评分 + 硬性门槛' },
  { title: '多维风险监控', desc: '通过率 / 资损 / 结构 / 模型效果' },
  { title: '对外数据交付', desc: '口径卡 + 交叉校验 + 标准模板' },
  { title: '工程化平台', desc: '监控平台与 30+ 参数化工具' },
];

export const workFlow = [
  '业务数据',
  '数据分析 / 特征工程',
  '风险建模',
  '模型评估',
  '策略设计',
  '线上决策',
  '通过率 / 风险监控',
  'Vintage / Migration',
  '问题定位',
  '策略迭代',
];

export const workCases: WorkCase[] = [
  {
    no: 'Case 01',
    title: '24 省策略体系迁移与分批上线',
    problem: '新业务体系需在 24 省接入，各省客群结构差异大、上线窗口集中，任何配置错配都会直接影响放款。',
    locate: '逐省核对客群结构、分支映射与 cutoff 阈值，先做数据源与模型策略选型，再用客群模拟定位各省差异。',
    model: '客群模拟 + 拒绝推断（被拒样本 ×1.1 上浮）评估各档通过率对资损的影响，形成省级定档建议。',
    strategy: '配置生成与校验 → cutoff 阈值预置 → 分 4 批灰度切换 → 切后监控与回读核对。',
    verify: '全流程核对生产配置值与行数，切换期间未发生配置事故，通过率贴标准。',
    results: [
      { k: '接入省份', v: '24 省' },
      { k: '上线批次', v: '4 批' },
      { k: '配置事故', v: '0 起' },
    ],
    contribution: '主导风控侧方案设计与迁移验证，协调数据与研发完成分批上线。',
    detail: [
      { t: '业务背景', c: '业务体系升级需要在 24 省完成策略接入，各省客群与历史质态差异显著，不能一套参数直接铺开。' },
      { t: '方法', c: '先用客群模拟评估各省在不同通过率档位下的风险表现，再据此确定分支配置与 cutoff。' },
      { t: '上线', c: '按省分 4 批灰度切换，每批切换后核对配置值、行数与时间字段，确认无误再进入下一批。' },
      { t: '验证', c: '切换后持续跟踪通过率与质态，与标准及模拟结果比对，异常分支单独排查。' },
      { t: '复盘', c: '迁移的关键不是把参数推上去，而是每批都能回读、能回滚、能解释偏差来源。' },
    ],
  },
  {
    no: 'Case 02',
    title: '分支质态分级与通过率双向调控（2608 评级体系）',
    problem: '统一通过率无法适配各省分支质态：优质分支被压量，高风险分支反而放量。',
    locate: '按省 × 分支拆解半年质态，以逾期率为准绳划分 A~E 五档，识别需要放开与需要压降的分支。',
    model: '分支级质态 + 通过率-Cutoff 曲线，评估阈值移动对实际通过率的非线性影响。',
    strategy: 'A 档（≤4%）→90% 逐档递减至 E 档（>10%）→2%；优质上调、劣质压降，并按资损目标反推各省通过率配额。',
    verify: '1-2 周后生产回验，实际通过率与分支质态回归目标区间，倒挂分支单独修正。',
    results: [
      { k: '评级档位', v: 'A~E 五档' },
      { k: '调控方向', v: '双向' },
      { k: '配额依据', v: '分支级资损' },
    ],
    contribution: '独立完成分级规则设计与配置方案，推动在各业务体系中落地。',
  },
  {
    no: 'Case 03',
    title: '门店欺诈识别与拦截治理',
    problem: '贵州业务质态恶化，逾期高度集中在少数门店，常规策略无法定位到门店层。',
    locate: '提炼 6 项识别特征：营业员办单集中度、套餐单一化、新客 + 异网双高、金额标准化、新客逾期率、极端重复申请。',
    model: '回溯历史数据做多维交叉验证，锁定集中欺诈门店（贵州 1 月 3 家门店贡献 38% 逾期、单店放量 5~6 倍）。',
    strategy: '命中 ≥2 条核查、≥3 条熔断；累计批量拉黑 18 家质态差门店 + 亚速系 12 家，并落地为日常监控与人工处置机制。',
    verify: '门店拉黑 / 管控渠道日均拦截高风险进件约 550 单（2026-09 单月 1.26 万单，拒绝率 99.98%）。',
    results: [
      { k: '识别门店', v: '18 家' },
      { k: '日均拦截', v: '约 550 单' },
      { k: '月均规避放款', v: '约 1,900 万元' },
    ],
    contribution: '独立完成分析与特征提炼，推动特征落地为日常监控、预警与处置机制。',
  },
  {
    no: 'Case 04',
    title: '特批白名单对 Vintage 的扭曲与口径修正',
    problem: '全量 Vintage 曲线与真实风险不符，终损预测系统性偏低，影响资损判断。',
    locate: '特批客户不走策略、直接放行；占比由 0（2025-10 前）升至峰值 14.95%（2026-01），且几乎全部集中在湖南。',
    model: '按公众 / 存量 VIP / 特批分层拆分，四种终损预测方法交叉验证，识别客群结构对全量曲线的稀释。',
    strategy: '建立剔除特批的 Vintage 评估口径，分层拆分修正，并在月报中固定披露。',
    verify: '特批单 17,168 笔、占湖南 34.9%；未还率 6.63% vs 普通客群 3.43%，贡献 47.7% 未还本金；修正后真实逾期率评估差异约 3pp。',
    results: [
      { k: '特批单量', v: '17,168 笔' },
      { k: '占湖南', v: '34.9%' },
      { k: '未还本金贡献', v: '47.7%' },
    ],
    contribution: '独立定位失真根因并推动评估口径修正。',
  },
  {
    no: 'Case 05',
    title: '风控监控平台与工具链',
    problem: '人工 SQL → Excel → 汇总 → 推送，异常发现滞后，口径容易漂移。',
    locate: '梳理通过率、资损、套餐、渠道、地市、门店、代理商与模型效果的监控需求，确定统一指标口径。',
    model: '本地 ADS 层聚合通过率 / 逾期率指标（全国 / 省 / 市 × 5 类切片），支撑监控 → 归因 → 调参闭环。',
    strategy: '17+ 监控 / 分析接口 + 六大模块面板 + 统一统计入口 + SQL 校验守门 + 自动留痕。',
    verify: '一键运行替代手工脚本，异常 30 分钟内告警；配置同步 / 校验 / 推送 / 回读形成标准流程。',
    results: [
      { k: '监控接口', v: '17+' },
      { k: '参数化工具', v: '30+' },
      { k: '异常告警', v: '30 分钟内' },
    ],
    contribution: '主导平台设计与开发，沉淀配置治理与统计留痕规范。',
  },
];

export const workAutomation = {
  before: ['人工 SQL', 'Excel 汇总', '人工检查', '手动发送'],
  after: ['StarRocks', 'Python 指标计算', '异常检测', '自动生成报告', '微信推送'],
  cover: '30 省全覆盖',
  effect: '从人工查数转向每日自动化监控，异常 T+0 发现',
};

export const workCapability = {
  core: '风控策略建模工程师',
  columns: [
    {
      title: '建模与评估',
      items: ['XGBoost / 评分卡', '特征工程', 'KS / AUC / PSI', '拒绝推断'],
    },
    {
      title: '策略与计量',
      items: ['分层策略树', '客群分层', '通过率-Cutoff', 'Vintage / 终损', '资损配额反推'],
    },
    {
      title: '工程与数据',
      items: ['Python / Pandas', 'SQL / StarRocks', 'FastAPI', '自动化监控', '配置治理'],
    },
  ],
  loop: '准入规则 → 信用评分 → 策略决策 → 贷后监控 → 风险分析',
  research: ['图学习 / NMF', '深度学习', '超图算法'],
};

export const workMilestones: MilestoneItem[] = [
  { period: '2023', event: '校园算法研究：深度非负矩阵分解社区发现，授权发明专利 1 项', stage: '校园' },
  { period: '2024.11', event: '入职淘顺科技，独立负责「淘顺实时授信」端到端风控', stage: '职场' },
  { period: '2025', event: '搭建通过率自动化监控体系，建立客群质态分析框架与 Vintage / 终损预测方法论' },
  { period: '2026.09', event: '24 省策略体系分 4 批灰度上线，切换零配置事故、通过率贴标准' },
  { period: '2026.10', event: '门店欺诈治理、特批口径修正、月度 Vintage 报告与监控平台常态化运行' },
  { period: 'Next', event: '风控算法 / 建模深度与工程化能力持续深化', stage: 'next' },
];
