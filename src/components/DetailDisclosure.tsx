'use client';

import { useState } from 'react';

interface Props {
  title?: string;
  hint?: string;
  children: React.ReactNode;
}

export default function DetailDisclosure({ title, hint, children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 border-t border-[#334155]/60 pt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        aria-expanded={open}
      >
        <span>{open ? '收起细节' : hint || '展开细节'}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && <div className="mt-4 space-y-4">{title && <div className="text-xs text-slate-500">{title}</div>}{children}</div>}
    </div>
  );
}
