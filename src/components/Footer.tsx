'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[#334155]/50 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500">
          RiskControl.sys — 风控建模工程师能力展示系统
        </div>
        <div className="text-xs text-slate-600">
          Built with Next.js + Tailwind CSS + ECharts
        </div>
      </div>
    </footer>
  );
}
