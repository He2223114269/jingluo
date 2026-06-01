'use client';

/**
 * 监控面板侧边栏 — 固定在页面左侧
 * 包含所有监控模块入口，支持快速切换
 */

import { useCallback } from 'react';

export type MonitorPage =
  | 'dashboard'
  | 'monitor-pass-rate'
  | 'monitor-overdue'
  | 'monitor-model'
  | 'monitor-volume'
  | 'monitor-rating'
  | 'monitor-special';

interface SidebarItem {
  key: MonitorPage;
  label: string;
  icon: string; // SVG path 简写
  desc?: string;
}

const sidebarItems: SidebarItem[] = [
  { key: 'dashboard', label: '概览', icon: 'grid' },
  { key: 'monitor-pass-rate', label: '通过率', icon: 'chart', desc: '通过率·申请量·异网' },
  { key: 'monitor-overdue', label: '逾期率', icon: 'alert', desc: 'M1+·M3+·月度趋势' },
  { key: 'monitor-model', label: '模型监控', icon: 'activity', desc: 'KS·AUC·PSI' },
  { key: 'monitor-volume', label: '业务量', icon: 'bar', desc: '申请·放款·渠道' },
  { key: 'monitor-rating', label: '评级分析', icon: 'layers', desc: '代理商店铺套餐' },
  { key: 'monitor-special', label: '特殊维度', icon: 'shield', desc: '特批·熔断·告警' },
];

function getIcon(svg: string, className: string) {
  const icons: Record<string, JSX.Element> = {
    grid: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>,
    chart: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>,
    alert: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    activity: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
    bar: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    layers: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>,
    shield: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  };
  return icons[svg] || icons.grid;
}

interface MonitorSidebarProps {
  currentPage: MonitorPage;
  collapsed: boolean;
  onToggle: () => void;
  onNavigate: (page: string) => void;
}

export default function MonitorSidebar({ currentPage, collapsed, onToggle, onNavigate }: MonitorSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-[#0f172a]/98 border-r border-[#334155]/50 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* 折叠按钮 */}
      <div className="flex items-center justify-end px-3 py-3 border-b border-[#334155]/30">
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-all"
          title={collapsed ? '展开侧栏' : '折叠侧栏'}
        >
          <svg className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} />
          </svg>
        </button>
      </div>

      {/* 导航项 */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = currentPage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="shrink-0">{getIcon(item.icon, 'w-5 h-5')}</span>
              {!collapsed && (
                <div className="text-left min-w-0">
                  <div className="font-medium truncate">{item.label}</div>
                  {item.desc && <div className="text-[10px] text-slate-600 truncate">{item.desc}</div>}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* 底部信息 */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-[#334155]/30">
          <div className="text-[10px] text-slate-600">风控引擎决策分析平台</div>
          <div className="text-[10px] text-slate-700">v0.1.0</div>
        </div>
      )}
    </aside>
  );
}
