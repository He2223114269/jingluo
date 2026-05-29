'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar, { type PageKey } from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/views/HomePage';
import CaseStudyPage from '@/views/CaseStudyPage';
import ProjectsPage from '@/views/ProjectsPage';
import ThinkingPage from '@/views/ThinkingPage';
import AboutPage from '@/views/AboutPage';
import DashboardPage from '@/views/DashboardPage';
import DemoPage from '@/views/DemoPage';

const validPages = ['home', 'case-study', 'projects', 'thinking', 'about', 'dashboard', 'demo'];

function getInitialPage(): PageKey {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.slice(1);
    if (hash && validPages.includes(hash)) {
      return hash as PageKey;
    }
  }
  return 'home';
}

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageKey>(getInitialPage);
  const isInitialRender = useRef(true);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as PageKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update hash on page change (skip initial render since getInitialPage already read it)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    window.location.hash = currentPage;
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
      case 'case-study':
        return <CaseStudyPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'thinking':
        return <ThinkingPage />;
      case 'about':
        return <AboutPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'demo':
        return <DemoPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
