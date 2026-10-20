'use client';

interface Row { name: string; orders: number; amt?: number }

function Bar({ label, pct, value, color }: { label: string; pct: number; value: string; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-900/60">
        <div className="h-2 rounded-full" style={{ width: `${Math.max(pct, 0.6)}%`, background: color }} />
      </div>
    </div>
  );
}

export function ProvinceBoard({ rows, total }: { rows: Row[]; total: number }) {
  const colors = ['#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#f472b6', '#94a3b8'];
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold text-slate-200">省份分布</div>
        <div className="text-[11px] text-slate-500">按订单量 · 前 7 省 + 其他</div>
      </div>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <Bar
            key={r.name}
            label={r.name}
            pct={(r.orders / total) * 100}
            value={`${((r.orders / total) * 100).toFixed(1)}% · ${(r.orders / 10000).toFixed(1)} 万单`}
            color={colors[i % colors.length]}
          />
        ))}
      </div>
      <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
        湖南 + 贵州 + 江西合计占 89.6%，业务高度集中；其余省份多为小体量验证或早期接入。
      </p>
    </div>
  );
}

export function SegmentBoard({ segments, channels }: { segments: Row[]; channels: Row[] }) {
  const segTotal = segments.reduce((a, b) => a + b.orders, 0);
  const chTotal = channels.reduce((a, b) => a + b.orders, 0);
  const segColors = ['#22d3ee', '#818cf8', '#f472b6'];
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
      <div className="text-sm font-semibold text-slate-200 mb-4">客群与渠道结构</div>
      <div className="text-[11px] text-slate-500 mb-2">客群（按订单量）</div>
      <div className="space-y-2 mb-4">
        {segments.map((s, i) => (
          <Bar
            key={s.name}
            label={s.name}
            pct={(s.orders / segTotal) * 100}
            value={`${((s.orders / segTotal) * 100).toFixed(1)}%`}
            color={segColors[i % segColors.length]}
          />
        ))}
      </div>
      <div className="text-[11px] text-slate-500 mb-2">渠道（按订单量）</div>
      <div className="space-y-2">
        {channels.map((c) => (
          <Bar
            key={c.name}
            label={c.name}
            pct={(c.orders / chTotal) * 100}
            value={`${((c.orders / chTotal) * 100).toFixed(2)}%`}
            color={c.name === '普通进件' ? '#38bdf8' : '#f59e0b'}
          />
        ))}
      </div>
      <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
        存量 VIP 是最大客群（48.4%）；特批与保证金通道合计不足 1.5%，但需要单独口径评估。
      </p>
    </div>
  );
}
