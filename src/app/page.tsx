'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import MonitorSidebar, { type MonitorPage } from '@/components/MonitorSidebar';

// PageKey 类型定义（与 Navbar 保持一致）
type PageKey = 'home' | 'work' | 'projects' | 'thinking' | 'about' | 'resume' | 'dashboard' | 'monitor-pass-rate' | 'monitor-overdue' | 'monitor-model' | 'monitor-volume' | 'monitor-rating' | 'monitor-special' | 'research-dnmf' | 'project-zhihuan' | 'project-ecomind' | 'case-loss-audit';
import Footer from '@/components/Footer';
import HomePage from '@/views/HomePage';
import WorkPage from '@/views/WorkPage';
import ProjectsPage from '@/views/ProjectsPage';
import ThinkingPage from '@/views/ThinkingPage';
import AboutPage from '@/views/AboutPage';
import ResumePage from '@/views/ResumePage';
import DashboardPage from '@/views/DashboardPage';
import MonitorPassRate from '@/views/MonitorPassRate';
import MonitorOverdue from '@/views/MonitorOverdue';
import MonitorModel from '@/views/MonitorModel';
import MonitorVolume from '@/views/MonitorVolume';
import MonitorRating from '@/views/MonitorRating';
import MonitorSpecial from '@/views/MonitorSpecial';
import ResearchDNMF from '@/views/ResearchDNMF';
import ProjectZhiHuan from '@/views/ProjectZhiHuan';
import ProjectEcomind from '@/views/ProjectEcomind';
import CaseLossAudit from '@/views/CaseLossAudit';

const validPages = ['home', 'work', 'projects', 'thinking', 'about', 'resume', 'dashboard', 'monitor-pass-rate', 'monitor-overdue', 'monitor-model', 'monitor-volume', 'monitor-rating', 'monitor-special', 'research-dnmf', 'project-zhihuan', 'project-ecomind', 'case-loss-audit'];

function getInitialPage(): PageKey {
  // 服务端渲染时始终返回 'home'，避免 hydration 不匹配
  if (typeof window === 'undefined') return 'home';
  try {
    const hash = window.location.hash.slice(1);
    if (hash && validPages.includes(hash)) {
      return hash as PageKey;
    }
  } catch {}
  return 'home';
}

// 判断当前是否在监控面板区域
function isMonitorPage(page: PageKey): page is MonitorPage {
  return page === 'dashboard' || page.startsWith('monitor-');
}

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 首帧后读取 hash，既避免 hydration mismatch，也避开 effect 内同步 setState
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const page = getInitialPage();
      if (page !== 'home') setCurrentPage(page);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as PageKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update hash on page change
  useEffect(() => {
    if (window.location.hash.slice(1) !== currentPage) {
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && validPages.includes(hash)) {
        setCurrentPage(hash as PageKey);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'work':
        return <WorkPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'thinking':
        return <ThinkingPage />;
      case 'about':
        return <AboutPage />;
      case 'resume':
        return <ResumePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'monitor-pass-rate':
        return <MonitorPassRate />;
      case 'monitor-overdue':
        return <MonitorOverdue />;
      case 'monitor-model':
        return <MonitorModel />;
      case 'monitor-volume':
        return <MonitorVolume />;
      case 'monitor-rating':
        return <MonitorRating />;
      case 'monitor-special':
        return <MonitorSpecial />;
      case 'research-dnmf':
        return <ResearchDNMF />;
      case 'project-zhihuan':
        return <ProjectZhiHuan />;
      case 'project-ecomind':
        return <ProjectEcomind />;
      case 'case-loss-audit':
        return <CaseLossAudit />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const monitorPage = isMonitorPage(currentPage) ? currentPage : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="flex flex-1">
        {monitorPage && (
          <MonitorSidebar
            currentPage={monitorPage}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            onNavigate={handleNavigate}
          />
        )}
        <main className={`flex-1 transition-all duration-300 ${monitorPage ? (sidebarCollapsed ? 'ml-16' : 'ml-56') : ''}`}>
          {renderPage()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
