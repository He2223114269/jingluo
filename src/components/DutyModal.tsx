'use client';

import { useEffect } from 'react';
import type { DutyDetail } from '@/data/mock';

export default function DutyModal({
  title,
  detail,
  onClose,
}: {
  title: string;
  detail: DutyDetail;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[86vh] overflow-y-auto rounded-2xl border border-[#334155] bg-[#0f172a] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#334155] bg-[#0f172a]/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="text-[11px] text-cyan-400 mb-1">职责细节</div>
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          </div>
          <button onClick={onClose} aria-label="关闭" className="shrink-0 rounded-md border border-[#334155] px-2.5 py-1 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/60">✕</button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <p className="text-sm text-slate-300 leading-relaxed">{detail.intro}</p>

          <div>
            <div className="text-xs font-semibold text-cyan-400 mb-3">怎么做</div>
            <div className="space-y-2">
              {detail.steps.map((s, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-[#334155] bg-slate-800/30 p-3">
                  <span className="shrink-0 text-[10px] font-mono text-cyan-400/80 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="text-[13px] font-medium text-slate-200">{s.t}</div>
                    <div className="text-[12px] text-slate-400 leading-relaxed mt-1">{s.c}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-cyan-400 mb-2">关键规则</div>
              <ul className="space-y-1.5">
                {detail.rules.map((r, i) => (
                  <li key={i} className="text-[12px] text-slate-400 leading-relaxed flex gap-2">
                    <span className="text-slate-600">•</span><span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold text-cyan-400 mb-2">结果与验证</div>
              <ul className="space-y-1.5">
                {detail.results.map((r, i) => (
                  <li key={i} className="text-[12px] text-slate-400 leading-relaxed flex gap-2">
                    <span className="text-cyan-500/60">✓</span><span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {detail.note && <p className="text-[11px] text-slate-500 leading-relaxed">{detail.note}</p>}
        </div>
      </div>
    </div>
  );
}
