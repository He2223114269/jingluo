'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { projects } from '@/data/mock';

function navigateTo(page: string) {
  window.location.hash = page;
  window.dispatchEvent(new Event('hashchange'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">项目</h1>
            <p className="text-lg text-slate-400">风控领域的核心项目经验</p>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        project.status === '已完成' ? 'bg-emerald-400/10 text-emerald-400' :
                        project.status === '已上线' ? 'bg-cyan-400/10 text-cyan-400' :
                        'bg-amber-400/10 text-amber-400'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-slate-500">{project.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-3">{project.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400 border border-[#334155]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:w-48 flex flex-row sm:flex-col gap-3">
                    <div className="flex-1 p-3 rounded-lg bg-slate-800/50 text-center">
                      <div className="text-xs text-slate-500 mb-1">项目周期</div>
                      <div className="text-sm font-medium text-slate-300">{(project as any).duration || '6个月'}</div>
                    </div>
                    <div className="flex-1 p-3 rounded-lg bg-slate-800/50 text-center">
                      <div className="text-xs text-slate-500 mb-1">团队规模</div>
                      <div className="text-sm font-medium text-slate-300">{(project as any).teamSize || '3-5人'}</div>
                    </div>
                  </div>
                </div>
                {project.id === 'deep-mf' && (
                  <div className="mt-4 pt-4 border-t border-[#334155]/30">
                    <button
                      onClick={() => navigateTo('research-dnmf')}
                      className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      查看完整项目详情
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
