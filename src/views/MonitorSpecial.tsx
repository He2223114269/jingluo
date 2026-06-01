'use client';

import AnimatedSection from '@/components/AnimatedSection';


export default function MonitorSpecial() {
  const goBack = () => { window.location.hash = 'dashboard'; window.dispatchEvent(new Event('hashchange')); };
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-8">
            <button onClick={goBack} className="px-3 py-1.5 rounded-lg bg-[#1e293b] border border-[#334155] text-slate-400 hover:text-slate-200 text-sm transition-all">&larr; 返回概览</button>
            <h1 className="text-2xl font-bold text-slate-100">特殊维度监控</h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs">开发中</span>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="w-16 h-16 rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
            <p className="text-lg font-medium mb-2">特批白名单、门店熔断、异常告警</p>
            <p className="text-sm">后端 API 对接后即可展示实时数据</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
