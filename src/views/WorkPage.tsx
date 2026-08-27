'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { workOverview, workModules, workMilestones } from '@/data/mock';

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium mb-6">
              工作介绍 · Work Overview
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              {workOverview.role}
            </h1>
            <p className="text-cyan-400/80 text-sm mb-2">
              {workOverview.company} · {workOverview.period}
            </p>
            <p className="text-slate-400 leading-relaxed max-w-3xl">
              {workOverview.summary}
            </p>
          </div>
        </AnimatedSection>

        {/* KPIs */}
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {workOverview.kpis.map((kpi, i) => (
              <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{kpi.value}</div>
                <div className="text-sm text-slate-200 mt-2">{kpi.label}</div>
                <div className="text-xs text-slate-500 mt-1">{kpi.desc}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Module Nav */}
        <AnimatedSection>
          <div className="flex flex-wrap gap-2 mb-14">
            {workModules.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(m.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-slate-300 bg-slate-800/70 hover:bg-cyan-400/10 hover:text-cyan-300 border border-[#334155] px-3 py-1.5 rounded-full transition-colors"
              >
                {m.no} {m.title}
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Modules */}
        {workModules.map((m, idx) => (
          <AnimatedSection key={m.id}>
            <section id={m.id} className="mb-14 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-xl">
                  {m.icon}
                </span>
                <h2 className="text-xl font-bold text-slate-100">
                  <span className="text-cyan-400 text-sm mr-2">{m.no}</span>
                  {m.title}
                </h2>
              </div>

              <div className="space-y-4">
                {/* 做了什么 */}
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    做了什么
                  </h3>
                  <ul className="space-y-2">
                    {m.did.map((item, i) => (
                      <li key={i} className="text-sm text-slate-400 leading-relaxed flex gap-2">
                        <span className="text-slate-600 shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 怎么做 */}
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    怎么做的
                  </h3>
                  <ul className="space-y-2">
                    {m.how.map((item, i) => (
                      <li key={i} className="text-sm text-slate-400 leading-relaxed flex gap-2">
                        <span className="text-slate-600 shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 成果 */}
                <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                    成果
                  </h3>
                  <ul className="space-y-2">
                    {m.result.map((item, i) => (
                      <li key={i} className="text-sm text-cyan-100/80 leading-relaxed flex gap-2">
                        <span className="text-cyan-400 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {idx < workModules.length - 1 && (
                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent" />
              )}
            </section>
          </AnimatedSection>
        ))}

        {/* Milestones */}
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-sm">★</span>
              里程碑时间线
            </h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[#334155]" />
              <div className="space-y-6">
                {workMilestones.map((item, i) => (
                  <div key={i} className="relative pl-16">
                    <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#1e293b] border-2 border-cyan-400 z-10" />
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
                      <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                        {item.period}
                      </span>
                      <p className="text-sm text-slate-300 mt-2">{item.event}</p>
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
