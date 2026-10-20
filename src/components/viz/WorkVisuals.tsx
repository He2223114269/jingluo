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

/* 分支质态 A~E 与通过率：阶梯式递减（A/E 为确定值，中间档按质态递减） */
export function GradeLadder() {
  const grades = [
    { g: 'A', q: '≤4%', p: 90, color: '#22d3ee' },
    { g: 'B', q: '4~6%', p: 70, color: '#38bdf8' },
    { g: 'C', q: '6~8%', p: 50, color: '#60a5fa' },
    { g: 'D', q: '8~10%', p: 30, color: '#818cf8' },
    { g: 'E', q: '>10%', p: 2, color: '#f472b6' },
  ];
  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="flex items-end gap-4 h-44">
        {grades.map((x) => (
          <div key={x.g} className="flex-1 flex flex-col items-center justify-end h-full">
            <div className="text-[11px] text-slate-400 mb-1">{x.p}%</div>
            <div
              className="w-full rounded-t"
              style={{ height: `${Math.max(x.p, 3)}%`, background: x.color, opacity: 0.85 }}
            />
            <div className="text-sm font-semibold text-slate-200 mt-2">{x.g}</div>
            <div className="text-[10px] text-slate-500">逾期 {x.q}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-3">
        按分支半年质态分档：A 档 ≤4% 给到 90%，逐档递减至 E 档 &gt;10% 仅 2%；中间档位按质态连续递减（图中为示意）。
      </p>
    </div>
  );
}

/* 特批白名单的结构性扭曲 */
export function SpecialShareChart() {
  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4 space-y-4">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">特批占湖南订单</span>
          <span className="text-amber-300">34.9%</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-900/60">
          <div className="h-2.5 rounded-full bg-amber-400/80" style={{ width: '34.9%' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">特批贡献未还本金</span>
          <span className="text-rose-300">47.7%</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-900/60">
          <div className="h-2.5 rounded-full bg-rose-400/80" style={{ width: '47.7%' }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="rounded-lg border border-rose-400/25 bg-rose-400/5 p-3">
          <div className="text-lg font-bold text-rose-300">6.63%</div>
          <div className="text-[11px] text-slate-400 mt-1">特批未还率</div>
        </div>
        <div className="rounded-lg border border-slate-600/40 bg-slate-900/30 p-3">
          <div className="text-lg font-bold text-slate-300">3.43%</div>
          <div className="text-[11px] text-slate-400 mt-1">普通客群未还率</div>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        特批单 17,168 笔、占湖南 34.9%，未还率是普通客群的近 2 倍，贡献 47.7% 未还本金 —— 不剔除会系统性拉偏 Vintage 曲线。
      </p>
    </div>
  );
}

/* 监控平台四层架构 */
export function PlatformArchitecture() {
  const layers = [
    { t: '展示层', d: '六大模块面板 · KPI 概览 · 异常告警', c: '#22d3ee' },
    { t: '服务层', d: 'FastAPI · 17+ 监控 / 分析接口', c: '#38bdf8' },
    { t: '指标层', d: '本地 ADS 聚合 · 全国 / 省 / 市 × 5 类切片', c: '#60a5fa' },
    { t: '数据层', d: 'StarRocks · DWS / ODS 业务表', c: '#818cf8' },
  ];
  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="space-y-2">
        {layers.map((l) => (
          <div key={l.t} className="flex items-center gap-3 rounded-lg border border-[#334155] bg-slate-900/40 p-3">
            <span className="w-1.5 h-8 rounded" style={{ background: l.c }} />
            <div className="w-16 text-xs font-semibold text-slate-200">{l.t}</div>
            <div className="text-xs text-slate-400">{l.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500">
        <span className="px-2 py-1 rounded border border-[#334155]">监控</span>
        <span>→</span>
        <span className="px-2 py-1 rounded border border-[#334155]">归因</span>
        <span>→</span>
        <span className="px-2 py-1 rounded border border-[#334155]">调参</span>
        <span className="text-cyan-400">闭环</span>
      </div>
    </div>
  );
}
