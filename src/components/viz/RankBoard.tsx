'use client';

interface Row { name: string; orders: number; sub?: string }

export default function RankBoard({ title, rows, note }: { title: string; rows: Row[]; note?: string }) {
  const max = Math.max(...rows.map((r) => r.orders));
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
      <div className="text-sm font-semibold text-slate-200 mb-3">{title}</div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={r.name}>
            <div className="flex items-center justify-between text-[11px] mb-1 gap-2">
              <span className="text-slate-300 truncate">
                <span className="text-slate-500 mr-1.5">{i + 1}</span>{r.name}
              </span>
              <span className="text-slate-400 whitespace-nowrap">
                {r.orders.toLocaleString()}{r.sub ? ` · ${r.sub}` : ''}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-900/60">
              <div className="h-1.5 rounded-full bg-cyan-400/70" style={{ width: `${(r.orders / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      {note && <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">{note}</p>}
    </div>
  );
}
