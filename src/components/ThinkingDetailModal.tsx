'use client';

import { useEffect } from 'react';
import type { ThinkingItem } from '@/data/thinking';

export default function ThinkingDetailModal({ item, onClose }: { item: ThinkingItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[#334155] bg-[#0f172a] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#334155] bg-[#0f172a]/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-slate-500">{item.date}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300/90 border border-cyan-400/20">{item.cat}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
          </div>
          <button onClick={onClose} aria-label="关闭" className="shrink-0 rounded-md border border-[#334155] px-2.5 py-1 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/60">✕</button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{item.finding}</p>
          {item.detail.map((d) => (
            <div key={d.t} className="rounded-lg border border-[#334155] bg-slate-800/30 p-4">
              <div className="text-[11px] font-semibold text-cyan-400 mb-1.5">{d.t}</div>
              <p className="text-[13px] text-slate-300 leading-relaxed">{d.c}</p>
            </div>
          ))}
          {item.tags && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((t) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/70 border border-[#334155] text-slate-500">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
