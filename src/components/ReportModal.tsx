'use client';

import { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function ReportModal({ slug, title, onClose }: { slug: string; title: string; onClose: () => void }) {
  const [html, setHtml] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  useEffect(() => {
    let alive = true;
    fetch(`/reports/${slug}.md`)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.text(); })
      .then((t) => { if (alive) setHtml(marked.parse(t) as string); })
      .catch(() => { if (alive) setErr('报告原文加载失败'); });
    return () => { alive = false; };
  }, [slug]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#334155] bg-[#0f172a] shadow-2xl report-modal">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#334155] bg-[#0f172a]/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="text-[11px] text-cyan-400 mb-1">报告原文</div>
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={`/reports/${slug}.md`} target="_blank" rel="noreferrer"
              className="text-[11px] px-2 py-1 rounded border border-[#334155] text-slate-400 hover:text-slate-200">原始 MD</a>
            <button onClick={onClose} aria-label="关闭" className="rounded-md border border-[#334155] px-2.5 py-1 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/60">✕</button>
          </div>
        </div>

        <div className="px-6 py-6">
          {err ? (
            <p className="text-sm text-rose-300">{err}</p>
          ) : (
            <div className="report-md" dangerouslySetInnerHTML={{ __html: html }} />
          )}
        </div>
      </div>

      <style>{`
        .report-md { color:#cbd5e1; font-size:13px; line-height:1.75; }
        .report-md h1 { font-size:20px; font-weight:700; color:#f1f5f9; margin:0 0 12px; }
        .report-md h2 { font-size:15px; font-weight:700; color:#e2e8f0; margin:22px 0 8px; padding-bottom:5px; border-bottom:1px solid #334155; }
        .report-md h3 { font-size:13.5px; font-weight:600; color:#cbd5e1; margin:16px 0 6px; }
        .report-md p { margin:8px 0; }
        .report-md ul, .report-md ol { margin:8px 0; padding-left:20px; }
        .report-md li { margin:3px 0; }
        .report-md table { width:100%; border-collapse:collapse; margin:12px 0; font-size:11.5px; }
        .report-md th, .report-md td { border:1px solid #334155; padding:6px 8px; text-align:left; vertical-align:top; }
        .report-md th { background:#1e293b; color:#e2e8f0; }
        .report-md code { background:#1e293b; padding:1px 4px; border-radius:3px; font-size:11px; }
        .report-md pre { background:#0b1220; border:1px solid #334155; border-radius:8px; padding:10px; overflow-x:auto; }
        .report-md blockquote { border-left:3px solid #22d3ee55; padding-left:10px; color:#94a3b8; margin:10px 0; }
        .report-md a { color:#22d3ee; text-decoration:underline; }
        .report-md strong { color:#e2e8f0; }
      `}</style>
    </div>
  );
}
