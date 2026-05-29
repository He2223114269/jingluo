'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { timelineData, capabilities } from '@/data/mock';

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium mb-6">
              技术复盘
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              风控模型迭代项目
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              通过3轮模型迭代与区域差异化策略优化，将资损率从13%降至5%，
              同时保持通过率稳定。以下是完整的技术复盘。
            </p>
          </div>
        </AnimatedSection>

        {/* Project Background */}
        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">01</span>
              项目背景
            </h2>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8">
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>
                  业务线资损率长期处于13%的高位，远超行业平均水平。经过初步分析，发现主要问题集中在以下几个方面：
                  风控模型老化，特征覆盖不足；策略体系单一，缺乏区域差异化；监控系统缺失，无法及时发现异常。
                </p>
                <p>
                  项目目标明确：通过模型迭代与策略优化，在6个月内将资损率降至5%以下，同时保持通过率不低于70%，
                  并建立完整的风控监控体系，确保长期稳定性。
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-slate-800/50">
                  <div className="text-xl font-bold text-red-400">13%</div>
                  <div className="text-xs text-slate-500 mt-1">初始资损率</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-800/50">
                  <div className="text-xl font-bold text-cyan-400">5%</div>
                  <div className="text-xs text-slate-500 mt-1">目标资损率</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-800/50">
                  <div className="text-xl font-bold text-slate-300">70%+</div>
                  <div className="text-xs text-slate-500 mt-1">通过率要求</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-800/50">
                  <div className="text-xl font-bold text-slate-300">6个月</div>
                  <div className="text-xs text-slate-500 mt-1">项目周期</div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Iteration Timeline */}
        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">02</span>
              迭代过程
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[#334155]" />

              <div className="space-y-8">
                {timelineData.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="relative pl-16">
                      {/* Timeline dot */}
                      <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-[#1e293b] border-2 border-cyan-400 z-10" />
                      
                      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                            {item.phase}
                          </span>
                          <span className="text-xs text-slate-500">{item.date}</span>
                        </div>
                        <h3 className="text-base font-semibold text-slate-100 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.description}</p>
                        <div className="grid grid-cols-3 gap-3">
                          {item.metrics.map((metric, j) => (
                            <div key={j} className="text-center p-2 rounded-lg bg-slate-800/50">
                              <div className="text-sm font-semibold text-cyan-400">{metric.value}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* System Capabilities */}
        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">03</span>
              系统能力
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="bg-[#1e293b] border border-[#334155] rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400 text-xs font-bold">
                      {cap.subtitle.slice(0, 1)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100">{cap.title}</h3>
                      <span className="text-xs text-cyan-400/60">{cap.subtitle}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.items.map((item, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400 border border-[#334155]">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Results Summary */}
        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">04</span>
              结果总结
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: '资损率降幅', value: '62%', sub: '13% → 5%' },
                { label: 'KS值提升', value: '+28%', sub: '0.32 → 0.41' },
                { label: 'AUC提升', value: '+9%', sub: '0.78 → 0.85' },
                { label: '区域策略效果', value: '+21%', sub: '8个省份覆盖' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center"
                >
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{item.value}</div>
                  <div className="text-sm text-slate-300 mb-1">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Reflections */}
        <AnimatedSection>
          <section>
            <h2 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">05</span>
              思考
            </h2>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                模型迭代不是一次性的工作，而是持续优化的过程。在项目中，最大的挑战不在于模型算法本身，
                而在于如何将模型能力转化为业务价值。这需要建模工程师具备策略思维和工程落地能力。
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                区域差异化策略的实施让我深刻认识到，风控不是一刀切的工作。不同区域的风险特征差异显著，
                需要针对性地调整策略参数。同时，监控体系的建立是确保长期效果的关键，
                只有实时感知模型和策略的变化，才能及时做出调整。
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                未来，我将继续探索更精细化的风控方案，包括实时特征计算、图模型在反欺诈中的应用，
                以及自动化策略调优等方向，持续提升风控系统的智能化水平。
              </p>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
