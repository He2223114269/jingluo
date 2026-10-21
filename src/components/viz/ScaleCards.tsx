'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scaleCards } from '@/data/mock';

type Card = (typeof scaleCards)[number];

export default function ScaleCards() {
  const [active, setActive] = useState<string | null>(null);
  const card: Card | undefined = scaleCards.find((c) => c.key === active);

  return (
    <div onMouseLeave={() => setActive(null)}>
      {/* 五个数据框：未选中时平铺；选中后整体收缩，让出视觉中心 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {scaleCards.map((c: Card) => {
          const isActive = c.key === active;
          return (
            <button
              key={c.key}
              type="button"
              onMouseEnter={() => setActive(c.key)}
              onFocus={() => setActive(c.key)}
              onClick={() => setActive(isActive ? null : c.key)}
              aria-expanded={isActive}
              className={`text-left bg-[#1e293b] border rounded-xl p-4 sm:p-5 transition-all duration-300 ease-out origin-center ${
                active
                  ? isActive
                    ? 'border-cyan-400/60 scale-[0.96] opacity-95 shadow-lg shadow-cyan-500/10'
                    : 'border-[#334155] scale-[0.84] opacity-45'
                  : 'border-[#334155] scale-100 hover:border-cyan-400/30'
              }`}
            >
              <div className="text-xs text-slate-400">{c.label}</div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1">{c.value}</div>
              <div className="text-[11px] text-slate-500 mt-1">{c.sub}</div>
            </button>
          );
        })}
      </div>

      {/* 释放出来的明细：占据视觉中心 */}
      <AnimatePresence mode="wait">
        {card && (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-4 rounded-2xl border border-cyan-400/30 bg-slate-900/70 p-5 sm:p-6 shadow-2xl shadow-black/30"
            >
              <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6">
                <div>
                  <div className="text-xs text-slate-400">{card.label}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-300 mt-1">{card.value}</div>
                  <p className="text-[12px] text-slate-400 leading-relaxed mt-3">{card.note}</p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {card.facts.map((f) => (
                      <div key={f.k} className="rounded-lg border border-[#334155] bg-slate-800/40 p-2.5 text-center">
                        <div className="text-[12px] font-semibold text-cyan-300">{f.v}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{f.k}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 mb-2">{card.barsNote}</div>
                  <div className="space-y-2">
                    {card.bars.map((b) => (
                      <div key={b.name} className="flex items-center gap-3">
                        <div className="w-20 text-[10px] text-slate-500 truncate text-right">{b.name}</div>
                        <div className="flex-1 h-2 rounded-full bg-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(b.pct, 2)}%` }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                            className="h-2 rounded-full bg-cyan-400/70"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
