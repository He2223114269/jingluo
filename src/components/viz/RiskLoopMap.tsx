'use client';

const stages = [
  { t: '数据与口径', input: '申请 / 风控 / 还款 / 外部', action: '口径卡、统一取数', output: '可复算 SQL + 留痕' },
  { t: '分析与洞察', input: '可复算底数', action: '客群分层、Vintage、敞口、门店', output: '问题定位 + 优先级' },
  { t: '策略与模型', input: '定位结论', action: '规则树、评分、配额、Cutoff', output: '配置方案 + 模拟结果' },
  { t: '配置与上线', input: '配置方案', action: '同步、校验、推送、回读、灰度', output: '批次号 + 回读记录' },
  { t: '监控与归因', input: '生产数据', action: '日报、异动归因、预警', output: '预警名单 + 归因结论' },
];

const routine = [
  { k: '每日', items: ['通过率日报', '异常归因', '门店扫描'], out: '日报 + 预警名单' },
  { k: '每周', items: ['资损 / 结构', '模型 KS / PSI', '渠道 / 地市质态'], out: '周报 + 处置建议' },
  { k: '每月', items: ['Vintage / 终损', '月度调控', '评级复核'], out: '月报（12 sheet）+ 配置方案' },
];

const triggers = [
  { s: '通过率异常', p: '先查配置 / 体系，再查结构', back: '回策略' },
  { s: '资损超目标', p: '拆分支与客群', back: '回配额' },
  { s: '门店集中逾期', p: '查欺诈特征与集中度', back: '回评级与处置' },
  { s: '模型 PSI 漂移', p: '看分数迁移与分群', back: '回模型校准' },
];

const projects = [
  { t: '迁移接入', d: '24 省分 4 批灰度，配置与线上一致' },
  { t: '专项治理', d: '门店欺诈、特批口径修正' },
  { t: '平台建设', d: '监控平台、参数化工具、配置治理' },
  { t: '外部变化', d: '外部数据断供，内部特征重建决策树' },
];

export default function RiskLoopMap() {
  return (
    <div className="space-y-4">
      {/* 例行节奏 */}
      <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-semibold text-slate-100">例行节奏</div>
          <div className="text-[10px] text-slate-500">日 / 周 / 月固定运转</div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {routine.map((r) => (
            <div key={r.k} className="rounded-lg border border-[#334155] bg-slate-900/40 p-3">
              <div className="text-[11px] font-mono text-cyan-400/80 mb-2">{r.k}</div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {r.items.map((i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/70 border border-[#334155] text-slate-400">{i}</span>)}
              </div>
              <div className="text-[10px] text-slate-500">产出：<span className="text-slate-400">{r.out}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* 主链路 */}
      <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-semibold text-slate-100">主链路</div>
          <div className="text-[10px] text-slate-500">输入 → 动作 → 产出，全链路主导</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((s, i) => (
            <div key={s.t} className="relative rounded-lg border border-[#334155] bg-slate-900/40 p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[10px] font-mono text-cyan-400/80">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[12px] font-semibold text-slate-100">{s.t}</span>
              </div>
              <div className="space-y-1 text-[10px] leading-relaxed">
                <div><span className="text-slate-600">输入 </span><span className="text-slate-400">{s.input}</span></div>
                <div><span className="text-slate-600">动作 </span><span className="text-slate-400">{s.action}</span></div>
                <div><span className="text-cyan-600">产出 </span><span className="text-cyan-200/80">{s.output}</span></div>
              </div>
              {i < stages.length - 1 && <span className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 迭代触发 */}
      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.03] p-5">
        <div className="text-[13px] font-semibold text-slate-100 mb-3">什么时候回到策略（不是无条件迭代）</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {triggers.map((t) => (
            <div key={t.s} className="flex items-center gap-2 text-[11px] rounded-lg border border-[#334155] bg-slate-900/40 px-3 py-2">
              <span className="text-amber-300 shrink-0">{t.s}</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-400 flex-1">{t.p}</span>
              <span className="text-cyan-300 shrink-0">{t.back}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 项目节奏 */}
      <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-semibold text-slate-100">项目节奏</div>
          <div className="text-[10px] text-slate-500">一次性、有明确交付</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {projects.map((p) => (
            <div key={p.t} className="rounded-lg border border-[#334155] bg-slate-900/40 p-3">
              <div className="text-[12px] font-medium text-slate-200">{p.t}</div>
              <div className="text-[10px] text-slate-500 mt-1 leading-relaxed">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
