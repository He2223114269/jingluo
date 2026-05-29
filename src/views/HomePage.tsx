'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import CountUp from '@/components/CountUp';
import { heroKPIs, capabilities, projects, articles } from '@/data/mock';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-16">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              系统运行中
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight mb-6">
              风控建模算法工程师
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              独立负责实时授信业务风控建模与策略制定<br className="hidden sm:block" />
              构建数据驱动的风控系统，持续降低业务资损
            </p>
          </motion.div>

          {/* KPI Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12"
          >
            {heroKPIs.map((kpi, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(6, 182, 212, 0.08)' }}
                transition={{ duration: 0.2 }}
                className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center"
              >
                <div className="text-sm text-slate-400 mb-2">{kpi.label}</div>
                <div className="text-2xl font-bold text-slate-100">
                  {kpi.before && kpi.after ? (
                    <span>
                      <span className="text-red-400/70">{kpi.before}</span>
                      <span className="text-slate-500 mx-2">→</span>
                      <span className="text-cyan-400">{kpi.after}</span>
                    </span>
                  ) : (
                    <span className="text-cyan-400">{kpi.value}</span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1">{kpi.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => onNavigate('case-study')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/25 transition-all duration-200"
          >
            查看核心案例
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </motion.button>
        </div>
      </section>

      {/* Core Case Preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">核心案例</h2>
                <p className="text-slate-400 text-sm mt-1">风控模型迭代项目</p>
              </div>
              <button
                onClick={() => onNavigate('case-study')}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                查看详情
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
                    <CountUp end={62} suffix="%" prefix="-" />
                  </div>
                  <div className="text-sm text-slate-400">资损率降幅</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
                    <CountUp end={3} suffix="轮" />
                  </div>
                  <div className="text-sm text-slate-400">模型迭代</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
                    <CountUp end={21} suffix="%" prefix="+" />
                  </div>
                  <div className="text-sm text-slate-400">策略优化提升</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#334155]">
                <p className="text-slate-400 text-sm leading-relaxed">
                  通过3轮模型迭代与区域差异化策略优化，将资损率从13%降至5%，同时保持通过率稳定。
                  项目覆盖8个省份，建立完整的风控监控体系，实现模型与策略的持续迭代优化。
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Capability System */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">能力体系</h2>
            <p className="text-slate-400 text-sm mb-10">风控建模工程师的核心能力矩阵</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(6, 182, 212, 0.06)' }}
                  className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm font-bold">
                      {cap.subtitle.slice(0, 1)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">{cap.title}</h3>
                      <span className="text-xs text-cyan-400/70">{cap.subtitle}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{cap.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cap.items.map((item, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400 border border-[#334155]">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">精选项目</h2>
                <p className="text-slate-400 text-sm mt-1">核心项目经验</p>
              </div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                全部项目
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      project.status === '已完成' ? 'bg-emerald-400/10 text-emerald-400' :
                      project.status === '已上线' ? 'bg-cyan-400/10 text-cyan-400' :
                      'bg-amber-400/10 text-amber-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400 border border-[#334155]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Thinking Preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">思考</h2>
                <p className="text-slate-400 text-sm mt-1">风控领域的思考与总结</p>
              </div>
              <button
                onClick={() => onNavigate('thinking')}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                更多文章
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
            </div>
          </AnimatedSection>
          <div className="space-y-4">
            {articles.map((article, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -1 }}
                  className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 cursor-pointer hover:border-cyan-400/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-100 mb-2">{article.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{article.excerpt}</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap mt-1">{article.date}</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
