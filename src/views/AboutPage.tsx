'use client';

import AnimatedSection from '@/components/AnimatedSection';
import { aboutData } from '@/data/mock';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">关于我</h1>
            <p className="text-lg text-slate-400">一名风控建模算法工程师的成长路径</p>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">01</span>
              教育背景
            </h2>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2L18 7L10 12L2 7L10 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 9V14C6 14 8 16 10 16C12 16 14 14 14 14V9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-100">{aboutData.education.school}</h3>
                  <p className="text-sm text-slate-400 mt-1">{aboutData.education.major}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{aboutData.education.degree} · 绩点 {aboutData.education.gpa} · {aboutData.education.political}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {aboutData.education.courses.map((c, i) => (
                      <span key={i} className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Awards */}
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">02</span>
              竞赛与成果
            </h2>
            <div className="space-y-3">
              {aboutData.awards.map((award, i) => (
                <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 flex items-start gap-3">
                  <span className="text-cyan-400 mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 15L8 12L3.5 15L4.5 9.5L1 6L6 5.5L8 1Z"/>
                    </svg>
                  </span>
                  <p className="text-sm text-slate-300">{award}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Campus Projects */}
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">03</span>
              校园项目
            </h2>
            <div className="space-y-4">
              {aboutData.campusProjects.map((proj, i) => (
                <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">{proj.title}</h3>
                      <p className="text-xs text-cyan-400/70 mt-0.5">{proj.role}</p>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded shrink-0">{proj.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{proj.description}</p>
                  <p className="text-sm text-cyan-400/80 mb-3">→ {proj.result}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className="text-xs text-slate-500 bg-slate-700/30 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Research */}
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">04</span>
              科研经历
            </h2>
            <div className="space-y-4">
              {aboutData.research.projects.map((rp, i) => (
                <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">{rp.title}</h3>
                      <p className="text-sm text-slate-400 mt-0.5">{rp.subtitle}</p>
                      <p className="text-xs text-cyan-400/70 mt-0.5">{rp.role}</p>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded shrink-0">{rp.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mt-3">{rp.description}</p>
                  <p className="text-sm text-cyan-400/80 mt-3">→ {rp.result}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Career */}
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">05</span>
              职业经历
            </h2>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <rect x="3" y="7" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M7 7V5C7 3.9 7.9 3 9 3H11C12.1 3 13 3.9 13 5V7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">{aboutData.career.role}</h3>
                  <p className="text-sm text-cyan-400/80 mt-0.5">{aboutData.career.company}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{aboutData.career.period}</p>
                  <p className="text-sm text-slate-400 mt-2">{aboutData.career.focus}</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Growth Path */}
        <AnimatedSection>
          <section>
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">06</span>
              能力成长路径
            </h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[#334155]" />
              <div className="space-y-6">
                {aboutData.growth.map((item, i) => (
                  <div key={i} className="relative pl-16">
                    <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#1e293b] border-2 border-cyan-400 z-10" />
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
