'use client';

/**
 * 监控子面板导航栏 — 固定在主导航下方
 * 当访问 monitor-* 页面时显示
 */

export type MonitorPage =
  | 'monitor-pass-rate'
  | 'monitor-overdue'
  | 'monitor-model'
  | 'monitor-volume'
  | 'monitor-rating'
  | 'monitor-special';

const monitorTabs: { key: MonitorPage; label: string }[] = [
  { key: 'monitor-pass-rate', label: '通过率' },
  { key: 'monitor-overdue', label: '逾期率' },
  { key: 'monitor-model', label: '模型监控' },
  { key: 'monitor-volume', label: '业务量' },
  { key: 'monitor-rating', label: '评级分析' },
  { key: 'monitor-special', label: '特殊维度' },
];

function navigateTo(page: string) {
  window.location.hash = page;
  window.dispatchEvent(new Event('hashchange'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

interface MonitorNavProps {
  currentPage: MonitorPage;
}

export default function MonitorNav({ currentPage }: MonitorNavProps) {
  return (
    <div className="sticky top-16 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-[#334155]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { window.location.hash = 'dashboard'; window.dispatchEvent(new Event('hashchange')); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-slate-500 hover:text-slate-300 transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            概览
          </button>
          <div className="w-px h-4 bg-[#334155] mx-1 shrink-0" />
          {monitorTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => navigateTo(tab.key)}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-all duration-200 shrink-0 ${
                currentPage === tab.key
                  ? 'text-cyan-400 bg-cyan-400/10 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
