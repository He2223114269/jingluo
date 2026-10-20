'use client';

/* 分数线机制示意：同一分数线，不同客群分布 → 不同实际通过率 */
export function ScoreLineDiagram() {
  const curves = [
    { label: '客群 A（分值整体偏高）', y: 40, pass: '约 78%', color: '#22d3ee' },
    { label: '客群 B（分值居中）', y: 110, pass: '约 42%', color: '#38bdf8' },
    { label: '客群 C（分值偏低）', y: 180, pass: '约 12%', color: '#818cf8' },
  ];
  const x0 = 130, x1 = 700, threshold = 470;
  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <svg viewBox="0 0 760 250" className="w-full h-auto">
        {curves.map((c) => {
          const cx = c.y === 40 ? 560 : c.y === 110 ? 470 : 380;
          const pts = Array.from({ length: 41 }, (_, i) => {
            const x = 140 + i * 13.5;
            const d = (x - cx) / 70;
            const y = c.y + 28 - 34 * Math.exp(-0.5 * d * d);
            return `${x},${y.toFixed(1)}`;
          }).join(' ');
          const area = `140,${c.y + 28} ` + pts + ` 680,${c.y + 28}`;
          return (
            <g key={c.label}>
              <polygon points={area} fill={c.color} opacity="0.10" />
              <polyline points={pts} fill="none" stroke={c.color} strokeWidth="1.6" />
              <text x="140" y={c.y + 44} fill="#94a3b8" fontSize="11">{c.label}</text>
              <text x="690" y={c.y + 44} fill={c.color} fontSize="11">{c.pass}</text>
            </g>
          );
        })}
        <line x1={threshold} y1="18" x2={threshold} y2="222" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 4" />
        <text x={threshold + 8} y="30" fill="#f59e0b" fontSize="11">分数线（由配置通过率映射）</text>
        <line x1="140" y1="228" x2="700" y2="228" stroke="#475569" strokeWidth="1" />
        <text x="140" y="244" fill="#64748b" fontSize="10">低分</text>
        <text x="670" y="244" fill="#64748b" fontSize="10">高分</text>
        <text x="360" y="244" fill="#64748b" fontSize="10">模型评分</text>
      </svg>
      <p className="text-xs text-slate-500 mt-2">
        同一分数线落到不同客群上，实际通过率不同；配置通过率只是移动分数线，不是直接给出通过概率。
      </p>
    </div>
  );
}

/* 24 省 4 批迁移流程 */
export function MigrationTimeline() {
  const steps = [
    { t: '数据与策略选型', d: '确认数据源、模型与策略基线' },
    { t: '客群模拟定档', d: '分省模拟，确定各分支通过率档位' },
    { t: '配置生成与校验', d: '分支映射、cutoff 预置、跨表一致性检查' },
    { t: '分批灰度切换', d: '24 省分 4 批，逐批回读核对' },
    { t: '切后监控', d: '通过率 / 质态 / 结构，异常分支单独处理' },
  ];
  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4 overflow-x-auto">
      <div className="flex items-stretch gap-2 min-w-[640px]">
        {steps.map((s, i) => (
          <div key={s.t} className="flex items-center gap-2 flex-1">
            <div className="flex-1 bg-slate-900/40 border border-[#334155] rounded-lg p-3">
              <div className="text-[10px] text-cyan-400 font-mono mb-1">0{i + 1}</div>
              <div className="text-xs font-medium text-slate-200">{s.t}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{s.d}</div>
            </div>
            {i < steps.length - 1 && <span className="text-slate-600 text-xs">→</span>}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-3">
        24 省分 4 批上线：每批切换后核对配置值与行数，确认无误再进入下一批；切后跟踪通过率与质态。
      </p>
    </div>
  );
}

/* 门店欺诈：特征 → 规则 → 处置 */
export function FraudFlow() {
  const features = ['营业员办单集中度', '套餐单一化', '新客 + 异网双高', '金额标准化', '新客逾期率', '极端重复申请'];
  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="text-xs text-slate-500 mb-2">识别特征（6 项）</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {features.map((f) => (
          <span key={f} className="text-[11px] px-2 py-1 rounded bg-slate-900/50 border border-[#334155] text-slate-300">{f}</span>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
          <div className="text-amber-300 font-medium mb-1">命中 ≥ 2 条</div>
          <div className="text-slate-400">进入人工核查</div>
        </div>
        <div className="rounded-lg border border-red-400/25 bg-red-400/5 p-3">
          <div className="text-red-300 font-medium mb-1">命中 ≥ 3 条</div>
          <div className="text-slate-400">门店级熔断 / 拉黑</div>
        </div>
        <div className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 p-3">
          <div className="text-cyan-300 font-medium mb-1">日常机制</div>
          <div className="text-slate-400">每日扫描 → 预警 → 处置</div>
        </div>
      </div>
    </div>
  );
}
