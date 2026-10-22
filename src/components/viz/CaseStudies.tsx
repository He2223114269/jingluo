'use client';

import { SpecialShareChart, PlatformArchitecture } from '@/components/viz/WorkVisuals';
import GradeComposition from '@/components/viz/GradeComposition';

function CaseShell({ no, title, kicker, children }: { no: string; title: string; kicker: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#334155] bg-[#1e293b] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-[#334155] bg-slate-800/40">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-cyan-400">{no}</span>
          <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        </div>
        <span className="text-[10px] text-slate-500">{kicker}</span>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function KV({ items }: { items: [string, string][] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-3 text-center">
          <div className="text-lg font-bold text-cyan-300">{v}</div>
          <div className="text-[10px] text-slate-500 mt-1">{k}</div>
        </div>
      ))}
    </div>
  );
}

function Bullets({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-cyan-400 mb-2">{title}</div>
      <ul className="space-y-1.5">
        {items.map((t) => (
          <li key={t} className="text-[12px] text-slate-400 leading-relaxed flex gap-2"><span className="text-slate-600">•</span><span>{t}</span></li>
        ))}
      </ul>
    </div>
  );
}

function Tradeoff({ chose, rejected, reason }: { chose: string; rejected: string; reason: string }) {
  return (
    <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4">
      <div className="text-[11px] font-semibold text-amber-300 mb-2">关键取舍</div>
      <div className="grid sm:grid-cols-2 gap-3 text-[12px]">
        <div><span className="text-slate-500">选择：</span><span className="text-slate-200">{chose}</span></div>
        <div><span className="text-slate-500">放弃：</span><span className="text-slate-400">{rejected}</span></div>
      </div>
      <p className="text-[11px] text-slate-500 mt-2">理由：{reason}</p>
    </div>
  );
}

function Review({ items }: { items: string[] }) {
  return (
    <div className="rounded-lg border border-[#334155] bg-slate-900/30 p-4">
      <div className="text-[11px] font-semibold text-slate-400 mb-2">复盘与不足</div>
      <ul className="space-y-1.5">
        {items.map((t) => (
          <li key={t} className="text-[11px] text-slate-500 leading-relaxed flex gap-2"><span className="text-slate-600">–</span><span>{t}</span></li>
        ))}
      </ul>
    </div>
  );
}

function CaseMigration() {
  const batches = [
    { n: '第 1 批', d: '数据与策略选型确认，配置基线建立', tag: '准备' },
    { n: '第 2 批', d: '客群模拟定档，分批生成配置', tag: '模拟' },
    { n: '第 3 批', d: 'cutoff 预置与跨表校验，灰度切换', tag: '切换' },
    { n: '第 4 批', d: '回读核对 + 切后监控，异常分支单独处理', tag: '验证' },
  ];
  return (
    <CaseShell no="CASE 01" title="24 省策略体系迁移与分批上线" kicker="项目推进型">
      <p className="text-sm text-slate-300 leading-relaxed">
        新体系要在 24 省落地，窗口集中、配置量大。目标不是“切得快”，而是<strong className="text-slate-100">每一批都能回读、能回滚、能解释偏差</strong>。
      </p>
      <div className="grid sm:grid-cols-4 gap-2">
        {batches.map((b, i) => (
          <div key={b.n} className="relative rounded-lg border border-[#334155] bg-slate-900/40 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-cyan-400/80">{b.n}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300">{b.tag}</span>
            </div>
            <div className="text-[10px] text-slate-400 leading-relaxed">{b.d}</div>
            {i < 3 && <span className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 text-[10px]">→</span>}
          </div>
        ))}
      </div>
      <Tradeoff
        chose="分 4 批灰度，每批回读后再推进"
        rejected="一次性全量切换，追求上线速度"
        reason="单批异常可定位、可回滚；代价是周期拉长，但避免了全省同时错配。"
      />
      <KV items={[['接入省份', '24 省'], ['上线批次', '4 批'], ['配置事故', '0 起']]} />
      <Bullets title="执行要点" items={['先模拟定档，再动配置，避免上线后反复调。', '每批核对配置值、行数与时间字段，异常批次停止推进。', '切后跟踪通过率与质态，偏离标准的分支单独处理，不整体回滚。']} />
      <Review items={['分支映射若能自动校验，迁移还可以更快。', '部分省样本量小，模拟定档的置信度有限，需靠切后回验兜底。']} />
    </CaseShell>
  );
}

function CaseGrade() {
  return (
    <CaseShell no="CASE 02" title="分支质态分级与通过率双向调控" kicker="策略决策型">
      <p className="text-sm text-slate-300 leading-relaxed">
        统一通过率无法适配各省分支：优质分支被压量，高风险分支反而放量。改法是按质态分档，再逐档定阈值。
      </p>
      <GradeComposition />
      <Tradeoff
        chose="按半年质态分 A–E 五档，优质上调、劣质压降"
        rejected="全省统一压降或统一放量"
        reason="一刀切会把好客户挡在外面，也会让坏客户继续进来；分档能用同一套规则解释给业务。"
      />
      <KV items={[['评级档位', 'A–E 五档'], ['调控方向', '双向'], ['配置依据', '分支级资损']]} />
      <Bullets title="执行要点" items={['先看半年质态，不拿单日数据反推配置。', '单次调整 10–20pp，避免来回折腾。', '1–2 周后回验，偏离目标的分支单独修正。']} />
      <Review items={['中间档位样本不足，分档只能先粗后细。', '实际通过率受客群分值分布影响，配置值不等于结果。']} />
    </CaseShell>
  );
}

function CaseFraud() {
  const feats = [
    ['营业员办单集中度', '单店单人占比异常'],
    ['套餐单一化', '短期集中同一套餐'],
    ['新客 + 异网双高', '新客占比与异网占比同时偏高'],
    ['金额标准化', '金额高度集中在同一档'],
    ['新客逾期率', '新客逾期显著高于门店均值'],
    ['极端重复申请', '同人多设备/多门店反复提交'],
  ];
  return (
    <CaseShell no="CASE 03" title="门店欺诈识别与拦截治理" kicker="特征治理型">
      <p className="text-sm text-slate-300 leading-relaxed">
        贵州业务质态恶化，逾期高度集中在少数门店。常规策略看不到这一层，需要把“门店行为”变成可识别信号。
      </p>
      <div className="rounded-lg border border-[#334155] bg-slate-900/40 p-4">
        <div className="text-[11px] font-semibold text-cyan-400 mb-2">识别特征（6 项）</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {feats.map(([t, d]) => (
            <div key={t} className="rounded border border-[#334155] bg-slate-800/40 px-2.5 py-2">
              <div className="text-[11px] text-slate-200">{t}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 text-[11px]">
        <div className="rounded-lg border border-amber-400/25 bg-amber-400/5 p-3"><div className="text-amber-300 font-medium mb-1">命中 ≥ 2 条</div><div className="text-slate-400">人工核查</div></div>
        <div className="rounded-lg border border-rose-400/25 bg-rose-400/5 p-3"><div className="text-rose-300 font-medium mb-1">命中 ≥ 3 条</div><div className="text-slate-400">门店级熔断 / 拉黑</div></div>
        <div className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 p-3"><div className="text-cyan-300 font-medium mb-1">日常机制</div><div className="text-slate-400">每日扫描 → 预警 → 处置</div></div>
      </div>
      <KV items={[['识别门店', '18 家'], ['日均拦截', '约 550 单'], ['月均规避放款', '约 1,900 万（估算）']]} />
      <Tradeoff
        chose="先门店级熔断与拉黑，再谈策略微调"
        rejected="只调通过率或阈值"
        reason="风险集中在门店与办单人，调阈值会误伤正常门店；先切断来源更直接。"
      />
      <Review items={['门店换手后需要重新识别，静态名单会失效。', '代理商层管控弱于门店层，是下一步要补的。']} />
    </CaseShell>
  );
}

function CaseVintage() {
  return (
    <CaseShell no="CASE 04" title="特批白名单对 Vintage 的扭曲与口径修正" kicker="口径治理型">
      <p className="text-sm text-slate-300 leading-relaxed">
        全量 Vintage 曲线与真实风险不符，终损预测系统性偏低。根因不是模型，而是<strong className="text-slate-100">一条不走策略的通道</strong>。
      </p>
      <SpecialShareChart />
      <Tradeoff
        chose="先修评估口径，把特批单独披露"
        rejected="直接收紧或关闭特批通道"
        reason="通道涉及业务与资方，不是风控单方面能关；先让数字说真话，再推动业务决策。"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-[#334155] bg-slate-900/40 p-4">
          <div className="text-[11px] text-slate-500 mb-1">修正前</div>
          <div className="text-[12px] text-slate-300">全量曲线被特批稀释，终损偏低</div>
        </div>
        <div className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 p-4">
          <div className="text-[11px] text-cyan-300 mb-1">修正后</div>
          <div className="text-[12px] text-slate-300">分客群口径 + 特批单列，评估差异约 3pp</div>
        </div>
      </div>
      <KV items={[['特批单量', '17,168 笔'], ['占湖南', '34.9%'], ['未还本金贡献', '47.7%']]} />
      <Review items={['特批准入标准仍未量化，是遗留问题。', '口径修正解决了“看得准”，但没解决“放得对”。']} />
    </CaseShell>
  );
}

function CasePlatform() {
  return (
    <CaseShell no="CASE 05" title="风控监控平台与工具链" kicker="工程化型">
      <p className="text-sm text-slate-300 leading-relaxed">
        原来是人工 SQL → Excel → 汇总 → 推送，异常发现滞后、口径容易漂。目标是把“监控 → 归因 → 调参”跑在同一个系统里。
      </p>
      <PlatformArchitecture />
      <Tradeoff
        chose="先脚本化，再平台化"
        rejected="一开始就做完整平台"
        reason="先用脚本验证指标与口径，能跑通再抽象成接口，避免平台建在错误口径上。"
      />
      <KV items={[['监控接口', '17+'], ['参数化工具', '30+'], ['异常告警', '30 分钟内']]} />
      <Bullets title="工程约束" items={['配置变更必须可回读、可回滚，不允许 0000 时间字段。', 'SQL 执行前先过守门规则，统计自动留痕。', '一次性脚本不留在根目录，可复用的进索引。']} />
      <Review items={['指标口径仍需人工守门，自动校验是下一步。', '平台覆盖监控与配置，未覆盖建模训练全流程。']} />
    </CaseShell>
  );
}

export default function CaseStudies() {
  return (
    <div className="space-y-6">
      <CaseMigration />
      <CaseGrade />
      <CaseFraud />
      <CaseVintage />
      <CasePlatform />
    </div>
  );
}
