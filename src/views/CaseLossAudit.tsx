'use client';

import AnimatedSection from '@/components/AnimatedSection';

const goProjects = () => {
  window.location.hash = 'projects';
  window.dispatchEvent(new Event('hashchange'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const kpis = [
  { v: '1 天', l: '从质疑到修正完成', c: 'text-cyan-400' },
  { v: '6 个', l: '资损被低估的省份', c: 'text-amber-400' },
  { v: '5 个', l: '评级映射异常省', c: 'text-rose-400' },
  { v: '3.4 万+', l: '受影响的决策单量', c: 'text-emerald-400' },
];

const wrongRows = [
  ['浙江', '0.39%', '6.25%'],
  ['上海', '0.00%', '19.85%'],
  ['西藏', '0.94%', '11.99%'],
];

const sampleRows = [
  ['浙江', '3', '0', '0.00%', '97.9%'],
  ['西藏', '69', '0', '0.00%', '85.9%'],
  ['上海', '1~3', '0', '0.00%', '100%'],
  ['重庆', '2', '0', '0.00%', '71.8%'],
  ['江苏', '1', '0', '0.00%', '68.9%'],
];

const fixRows = [
  ['浙江', '0.35% / 0.39%', '2.07% / 2.28%', true],
  ['上海', '0.00% / 0.00%', '1.65% / 1.81%', true],
  ['西藏', '0.86% / 0.94%', '1.38% / 1.51%', true],
  ['北京', '3.23% / 3.55%', '2.59% / 2.84%', true],
  ['江苏', '4.07% / 4.47%', '4.35% / 4.79%', true],
  ['重庆', '3.44% / 3.78%', '4.09% / 4.50%', true],
  ['全国合计', '3.73% / 4.11%', '3.82% / 4.20%', true],
];

const rules = [
  {
    t: '汇总表审查不能只验算术',
    d: '必须逐格回源比对 —— 串行、错行只有比对才看得出来。',
  },
  {
    t: '档位级加权必须做小样本收缩',
    d: '任何档位标签少于 30 个、或恰好 0 逾期，必须兜底，不能直接采用 0%。',
  },
  {
    t: '判断「质态改善」三看',
    d: '① 档位分支数分布是否正常；② 各档位的 lxf / 本网占比有无实质差异；③ 同名分支在其它省的档位横向对照。',
  },
  {
    t: '表现期不足不能判质量',
    d: 'mob1 / mob2 的回落是规律性必然，不能当作质态改善的证据。',
  },
];

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2.5 text-left font-medium text-slate-400 whitespace-nowrap">
      {children}
    </th>
  );
}

function Table({
  head,
  rows,
  highlight,
}: {
  head: string[];
  rows: React.ReactNode[][];
  highlight?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#334155]/60">
      <table className="w-full text-sm">
        <thead className="bg-[#0f172a]/70">
          <tr>
            {head.map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[#334155]/40">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-4 py-2.5 align-top ${
                    highlight !== undefined && j === highlight
                      ? 'font-semibold text-rose-400'
                      : 'text-slate-300'
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-6">
      {children}
    </div>
  );
}

function H2({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-100 mb-4">
      <span className="font-mono text-sm text-slate-500">{no}</span>
      {children}
    </h2>
  );
}

export default function CaseLossAudit() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#334155]/50">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <button
              onClick={goProjects}
              className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回项目列表
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                数据审计
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                口径治理
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                贝叶斯收缩
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
              24 省模型迁移资损评估
              <span className="block text-xl sm:text-2xl text-slate-400 mt-2">
                一次「数据看起来没问题」的口径审计
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-3xl leading-relaxed">
              在 24 省风控模型迁移的资损评估中，定位并修正了一个「结果自洽、公式正确、
              但结论完全错误」的系统性低估；并进一步识别出 5 个省的评级映射异常，
              避免了用失真数据做分批上线决策。
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* KPI */}
        <AnimatedSection delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {kpis.map((k) => (
              <div key={k.l} className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                <div className={`text-2xl font-bold ${k.c} mb-1`}>{k.v}</div>
                <p className="text-xs text-slate-500">{k.l}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 01 背景 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="01">背景与约束</H2>
            <p className="text-slate-300 leading-relaxed mb-4">
              淘顺实时授信需将 23~24 个通融省份迁移到新模型。为决定「哪些省先上、哪些省后上」，
              必须给出各省在<span className="text-cyan-400 font-medium">「当前配置 × 当前客群」</span>下的资损预估。
            </p>
            <p className="text-slate-300 leading-relaxed">
              难点在于：2026 年 8–9 月这批客群竣工仅 0–1 个月，
              <span className="text-amber-400 font-medium">没有任何成熟逾期标签</span>
              （淘顺 2026-07 竣工当期逾期率仅 1.79%、08 月 0.92%、09 月 0%），
              资损只能靠历史成熟标签的分档风险率外推。
            </p>
          </Card>
        </AnimatedSection>

        {/* 02 信号 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="02">第一个信号：结果「太漂亮」</H2>
            <p className="text-slate-300 leading-relaxed mb-4">
              首版推算给出的各省资损中，出现了几个明显不合常理的低值：
            </p>
            <Table head={['省份', '首版资损（含推断）', '该省 25 年口径参考']} rows={wrongRows} highlight={1} />
            <p className="text-slate-300 leading-relaxed mt-4">
              业务方提出质疑：「通过率降了这么多，逾期反而掉到 1% 以内，可信吗？」
              —— 这正是本次审计的起点。
            </p>
          </Card>
        </AnimatedSection>

        {/* 03 定位 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="03">定位过程</H2>

            <h3 className="text-sm font-semibold text-cyan-300 mb-2">3.1　先验算术：全对</h3>
            <p className="text-slate-300 leading-relaxed mb-5">
              通过率变化 = 通过率 − 2025 实际通过率 ✓；资损率（含推断）= 资损率（实标）× 1.1 ✓；
              预计通过 ≈ 申请 × 通过率 ✓。表内完全自洽 ——{' '}
              <span className="text-slate-100 font-medium">问题不在算术，而在校验维度之外。</span>
            </p>

            <h3 className="text-sm font-semibold text-cyan-300 mb-2">3.2　反向溯源：10 省串行 + 合计行取错</h3>
            <ul className="space-y-3 mb-5">
              <li className="text-slate-300 leading-relaxed">
                <span className="text-slate-100 font-medium">10 个省的「2025 两列」整体串行</span>
                ：辽宁格里装的其实是江苏的数（40.70% / 5.95% vs 江苏 40.73% / 5.94%），
                并形成一条「辽宁 ← 江苏 ← 吉林 ← 湖北 ← 黑龙江 ← 河南 ← 河北」的错位链。
              </li>
              <li className="text-slate-300 leading-relaxed">
                <span className="text-slate-100 font-medium">合计行取错省份</span>
                ：合计的 72.60% / 5.85% 实际是青海省的值；按 25 年样本加权应为 57.24% / 8.04%。
              </li>
            </ul>

            <h3 className="text-sm font-semibold text-cyan-300 mb-2">
              3.3　机制定位：档位级加权里的「小样本零逾期」
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              通过客群资损率 = Σ(通过量 × 该档位历史逾期率) ÷ Σ通过量。问题出在「该档位历史逾期率」：
            </p>
            <Table
              head={['省份', 'A 档历史标签数', 'A 档逾期数', '估出的 A 档逾期率', 'A 档占通过量']}
              rows={sampleRows}
              highlight={3}
            />
            <p className="text-slate-300 leading-relaxed mt-4">
              86%~98% 的通过量走的是「0%」这个估计值，全省资损自然被压到 1% 以下。
            </p>

            <h3 className="text-sm font-semibold text-cyan-300 mb-2 mt-5">3.4　反证检验</h3>
            <p className="text-slate-300 leading-relaxed">
              把西藏 A 档改用全省整体逾期率（11.36%）兜底，则全省资损 ≈{' '}
              <span className="text-emerald-400 font-medium">10.6%</span>，与 25 年口径的 11.99% 吻合
              —— 证实「低于 1%」是假象而非真实改善。
            </p>
          </Card>
        </AnimatedSection>

        {/* 04 方法 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="04">修正方法：贝叶斯收缩</H2>
            <p className="text-slate-300 leading-relaxed mb-4">
              对每个「省 × 档位」的逾期率做收缩，以全国同档率作为先验：
            </p>
            <pre className="overflow-x-auto rounded-lg bg-[#0f172a] border border-[#334155]/60 px-5 py-4 font-mono text-[13px] leading-6 text-cyan-200 mb-5">
{`p_修正 = (该档位逾期数 + K × 全国同档率) / (该档位标签数 + K)
K = 30`}
            </pre>
            <p className="text-slate-300 leading-relaxed mb-4">
              全国同档率取自 12 万~13.6 万标签的成熟样本，足够稳定：
            </p>
            <Table
              head={['档位', 'A', 'B', 'C', 'D', 'E']}
              rows={[['全国逾期率', '1.92%', '4.64%', '6.51%', '8.28%', '18.81%']]}
            />
          </Card>
        </AnimatedSection>

        {/* 05 结果 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="05">修正结果</H2>
            <Table head={['省份', '修正前（实标 / 含推断）', '修正后']} rows={fixRows} highlight={2} />
            <p className="text-slate-300 leading-relaxed mt-4">
              同时修正了结论方向：这一轮配置的资损是
              <span className="text-amber-400 font-medium">小幅上升</span>
              （同口径 4.16% → 4.20%），而非原报告暗示的改善。
            </p>
          </Card>
        </AnimatedSection>

        {/* 06 追问 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="06">追问：「质态改善」是真的吗？</H2>
            <p className="text-slate-300 leading-relaxed mb-4">
              修正后浙江 2.07%、西藏 1.38%，虽高于 0.35%，却仍显著低于 25 年口径。
              为判断「改善」是否为真，做了三重交叉验证：
            </p>
            <ol className="space-y-3 mb-5 list-decimal list-inside">
              <li className="text-slate-300 leading-relaxed">
                <span className="text-slate-100 font-medium">档位分布</span>
                ：浙江的评级映射为 <span className="text-rose-400 font-medium">A = 1 支 / E = 23 支</span>
                （全国最极端，其余省份均有 A~E 的完整分布）。
              </li>
              <li className="text-slate-300 leading-relaxed">
                <span className="text-slate-100 font-medium">质量指标差异</span>
                ：浙江唯一 A 档分支的 lxf 均值 53.6，E 档 52.9 —— 二者没有实质差别。
              </li>
              <li className="text-slate-300 leading-relaxed">
                <span className="text-slate-100 font-medium">同名分支横向对照</span>
                ：分支 <code className="rounded bg-[#0f172a] px-1.5 py-0.5 font-mono text-[13px] text-cyan-200">*_old_self_risk_gamt_6</code>{' '}
                在 25 个省中，16 省为 D/E、4 省为 C、5 省为 B，
                <span className="text-rose-400 font-medium">仅北京 / 浙江 / 海南被判为 A</span>。
              </li>
            </ol>
            <p className="text-slate-300 leading-relaxed mb-4">
              结论：<span className="text-rose-400 font-medium">浙江的「质态改善」是评级映射造成的假象</span>
              。若该分支按 E 档计，浙江通过率应为 1.9%（与 25 年口径 3.4% 吻合），而不是现在的 45.1%。
            </p>
            <p className="text-slate-300 leading-relaxed">
              由此连带识别出北京（A=3 / D=1 / E=20）、上海（A=5 / E=19）、福建（A=6 / E=18）、
              青海（A=1）同样存在档位缺失异常，建议暂停其配置决策、先复核映射。
            </p>
          </Card>
        </AnimatedSection>

        {/* 07 规则 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="07">沉淀的可复用规则</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rules.map((r) => (
                <div
                  key={r.t}
                  className="bg-[#0f172a]/50 rounded-lg p-5 border border-[#334155]/50 hover:border-cyan-500/20 transition-all"
                >
                  <h3 className="text-sm font-medium text-cyan-300 mb-2">{r.t}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{r.d}</p>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>

        {/* 08 价值 */}
        <AnimatedSection delay={0.1}>
          <Card>
            <H2 no="08">业务价值</H2>
            <ul className="space-y-3">
              <li className="text-slate-300 leading-relaxed">
                · 直接避免了用失真数据做 24 省迁移分批决策 —— 受影响省份覆盖{' '}
                <span className="text-emerald-400 font-medium">3.4 万+ 单</span>。
              </li>
              <li className="text-slate-300 leading-relaxed">
                · 阻止了「把评级映射异常当成质态改善」的误判：若按原结论推进，
                浙江会以 45.1% 的通过率放行一个实际相当于 E 档的客群。
              </li>
              <li className="text-slate-300 leading-relaxed">
                · 产出可复用的审计清单，已固化为日常分析的自检项。
              </li>
            </ul>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="text-center py-8 border-t border-[#334155]/30">
            <button
              onClick={goProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e293b] border border-[#334155] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-sm"
            >
              ← 返回项目列表
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
