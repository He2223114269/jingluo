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
            <p className="text-lg text-slate-400">一名风控建模工程师的成长路径</p>
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
                <div>
                  <h3 className="text-base font-semibold text-slate-100">{aboutData.education.school}</h3>
                  <p className="text-sm text-slate-400 mt-1">{aboutData.education.major}</p>
                  <p className="text-sm text-slate-500 mt-1">{aboutData.education.degree}</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Career Start */}
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">02</span>
              职业起点
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
                  <p className="text-sm text-slate-400 mt-1">{aboutData.career.company}</p>
                  <p className="text-sm text-slate-500 mt-1">{aboutData.career.focus}</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Growth Path */}
        <AnimatedSection>
          <section>
            <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">03</span>
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
