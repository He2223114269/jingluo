'use client';

import { useState } from 'react';
import { scaleCards } from '@/data/mock';

type Card = (typeof scaleCards)[number];

export default function ScaleCards() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {scaleCards.map((c: Card) => {
        const open = active === c.key;
        return (
          <div
            key={c.key}
            className="relative"
            onMouseEnter={() => setActive(c.key)}
            onMouseLeave={() => setActive(null)}
          >
            <button
              type="button"
              onClick={() => setActive(open ? null : c.key)}
              className={`w-full text-left bg-[#1e293b] border rounded-xl p-4 sm:p-5 transition-all duration-200 ${
                open
                  ? 'border-cyan-400/50 scale-[1.04] z-20 shadow-xl shadow-black/30'
                  : 'border-[#334155] hover:border-cyan-400/30'
              } ${active && !open ? 'opacity-60' : ''}`}
            >
              <div className="text-xs text-slate-400">{c.label}</div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1">{c.value}</div>
              <div className="text-[11px] text-slate-500 mt-1">{c.sub}</div>
            </button>

            {open && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-30 w-[320px] max-w-[86vw] rounded-xl border border-[#334155] bg-slate-900/98 p-4 shadow-2xl">
                <p className="text-[11px] text-slate-400 leading-relaxed">{c.note}</p>

                <div className="grid grid-cols-3 gap-2 mt-3">
                  {c.facts.map((f) => (
                    <div key={f.k} className="rounded-lg border border-[#334155] bg-slate-800/40 p-2 text-center">
                      <div className="text-[11px] font-semibold text-cyan-300">{f.v}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{f.k}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-1.5">
                  {c.bars.map((b) => (
                    <div key={b.name}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-slate-400">{b.name}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800">
                        <div className="h-1.5 rounded-full bg-cyan-400/70" style={{ width: `${Math.max(b.pct, 2)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 mt-2">{c.barsNote}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
