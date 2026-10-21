'use client';

const stages = [
  {
    t: '数据与口径', d: '把业务数据变成可用、可复现的底数',
    chips: ['申请 / 风控 / 还款', '外部数据', '口径卡', '统一取数', '统计留痕'],
  },
  {
    t: '分析与洞察', d: '先看清风险从哪里来，再谈策略',
    chips: ['客群结构', 'Vintage / 终损', '风险敞口', '门店 / 代理商', '套餐'],
  },
  {
    t: '策略与模型', d: '把判断固化成规则、分数与配额',
    chips: ['准入规则树', '信用评分', '通过率-Cutoff', '资损配额', '分级评级'],
  },
  {
    t: '配置与上线', d: '每一次变更都可校验、可回读、可回滚',
    chips: ['配置同步', '校验', '推送', '回读', '分批灰度'],
  },
  {
    t: '监控与归因', d: '发现异常，定位原因，回到策略',
    chips: ['通过率日报', '资损 / 结构', '模型 KS / PSI', '异动归因', '预警'],
  },
];

export default function RiskLoopMap() {
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 sm:p-6">
      {/* 主流程 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stages.map((s, i) => (
          <div key={s.t} className="relative">
            <div className="h-full rounded-xl border border-[#334155] bg-slate-900/40 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-cyan-400/80">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[13px] font-semibold text-slate-100">{s.t}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{s.d}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.chips.map((c) => (
                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/70 border border-[#334155] text-slate-400">{c}</span>
                ))}
              </div>
            </div>
            {i < stages.length - 1 && (
              <span className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs">→</span>
            )}
          </div>
        ))}
      </div>

      {/* 迭代回环 */}
      <div className="mt-4 flex items-center gap-3">
        <svg viewBox="0 0 1000 40" className="w-full h-9" preserveAspectRatio="none">
          <path d="M980,6 C980,34 940,34 900,34 L120,34 C80,34 40,34 20,6" fill="none" stroke="#164e63" strokeWidth="1.5" strokeDasharray="5 4" />
          <path d="M20,6 L14,16 M20,6 L26,16" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
        </svg>
        <span className="shrink-0 text-[11px] text-cyan-400/80">监控发现异常 → 回到分析与策略，持续迭代</span>
      </div>

      {/* 支撑层 */}
      <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-4">
        <div className="text-[11px] text-cyan-300 mb-2">支撑层 · 贯穿全流程</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            ['监控平台与工具链', '17+ 接口 · 30+ 参数化工具 · 自动化日报'],
            ['三套评级体系', '门店 / 代理商 / 套餐 · 分级处置'],
            ['配置治理', '同步 / 校验 / 推送 / 回读 · 变更留痕'],
            ['对外交付', '口径卡 · 交叉校验 · 标准模板'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-[#334155] bg-slate-900/40 p-3">
              <div className="text-[12px] font-medium text-slate-200">{t}</div>
              <div className="text-[10px] text-slate-500 mt-1 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
