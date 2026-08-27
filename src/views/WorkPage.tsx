'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import {
  workIdentity,
  workScale,
  workDuties,
  workFlow,
  workCases,
  workAutomation,
  workCapability,
  workMilestones,
} from '@/data/mock';

export default function WorkPage() {
  const [openCase, setOpenCase] = useState<string | null>(null);
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header / 01 业务背景 */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium mb-6">
              工作经历 · WORK EXPERIENCE
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">{workIdentity.role}</h1>
            <p className="text-cyan-400/80 text-sm mb-4">{workIdentity.company} · {workIdentity.period}</p>
            <p className="text-slate-400 leading-relaxed max-w-5xl">{workIdentity.summary}</p>

            <div className="mt-6 bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />01 业务背景
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                消费金融实时授信风控：面向手机分期消费场景，在贷前准入环节做秒级授信决策。
                业务覆盖多省份、多业务场景，日均约 3000 笔授信订单，累计放款规模 7 亿+。
                不是课堂项目，而是在真实生产环境里做风控。
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* 03 业务规模 */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="text-sm font-semibold text-cyan-400 mb-4">03 业务规模 · BUSINESS SCALE</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {workScale.map((s, i) => (
                <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{s.value}</div>
                  <div className="text-sm text-slate-200 mt-2">{s.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 02 职责边界 */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="text-sm font-semibold text-cyan-400 mb-4">02 我的职责边界 · RESPONSIBILITY</div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 mb-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                独立/主导负责实时授信业务的风控分析、模型开发、策略设计及效果监控，参与贷前准入全流程。
                覆盖完整风控链路，而非单一环节：
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {workDuties.map((d, i) => (
                <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-lg p-4">
                  <div className="text-sm font-medium text-slate-200">{d.title}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 04 核心工作流 */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="text-sm font-semibold text-cyan-400 mb-4">04 核心工作流 · RISK CONTROL LOOP</div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="flex flex-col items-center">
                {workFlow.map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex items-center gap-3 bg-slate-800/60 border border-[#334155] rounded-lg px-4 py-2.5">
                      <span className="text-xs text-cyan-400 font-mono">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm text-slate-200">{step}</span>
                    </div>
                    {i < workFlow.length - 1 ? (
                      <div className="flex flex-col items-center py-1">
                        <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-1">
                        <span className="text-cyan-400/70 text-xs mb-1">↺ 持续迭代</span>
                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 05 核心案例 */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="text-sm font-semibold text-cyan-400 mb-4">05 核心案例 · CASE STUDIES</div>
            <div className="space-y-8">
              {workCases.map((c) => (
                <div key={c.no} id={`case-${c.no.toLowerCase().replace(' ', '-')}`} className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden scroll-mt-24">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155] bg-slate-800/40">
                    <h3 className="text-base font-semibold text-slate-100">
                      <span className="text-cyan-400 text-xs mr-2">{c.no}</span>
                      {c.title}
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-800/40 rounded-lg p-4">
                        <div className="text-xs font-semibold text-cyan-400 mb-1.5">业务问题</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{c.problem}</p>
                      </div>
                      <div className="bg-slate-800/40 rounded-lg p-4">
                        <div className="text-xs font-semibold text-cyan-400 mb-1.5">问题定位</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{c.locate}</p>
                      </div>
                      <div className="bg-slate-800/40 rounded-lg p-4">
                        <div className="text-xs font-semibold text-cyan-400 mb-1.5">建模分析</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{c.model}</p>
                      </div>
                      <div className="bg-slate-800/40 rounded-lg p-4">
                        <div className="text-xs font-semibold text-cyan-400 mb-1.5">策略设计</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{c.strategy}</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-4">
                      <div className="text-xs font-semibold text-cyan-400 mb-1.5">线上验证</div>
                      <p className="text-sm text-slate-400 leading-relaxed">{c.verify}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {c.results.map((r, i) => (
                        <div key={i} className="text-center p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/20">
                          <div className="text-lg font-bold text-cyan-300">{r.v}</div>
                          <div className="text-xs text-slate-400 mt-1">{r.k}</div>
                        </div>
                      ))}
                    </div>
                    {(c as any).contribution && (
                      <div className="mt-4 bg-slate-800/60 border border-[#334155] rounded-lg p-4">
                        <div className="text-xs font-semibold text-cyan-400 mb-1.5">我的贡献</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{(c as any).contribution}</p>
                      </div>
                    )}
                    {(c as any).detail && (
                      <div className="mt-4">
                        <button
                          onClick={() => setOpenCase(openCase === c.no ? null : c.no)}
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                        >
                          {openCase === c.no ? '收起完整复盘' : '展开完整复盘（业务背景 → 问题发现 → 模型 → 策略 → 上线 → 迭代）'}
                          <svg
                            className={`w-3.5 h-3.5 transition-transform ${openCase === c.no ? 'rotate-90' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        {openCase === c.no && (
                          <div className="mt-4 space-y-3">
                            {(c as any).detail.map((d: any, i: number) => (
                              <div key={i} className="flex gap-4 bg-slate-800/40 rounded-lg p-4">
                                <span className="text-xs font-semibold text-cyan-400 shrink-0 w-20 pt-0.5">{d.t}</span>
                                <p className="text-sm text-slate-400 leading-relaxed">{d.c}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 06 自动化与工程化 */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="text-sm font-semibold text-cyan-400 mb-4">06 自动化与工程化 · ENGINEERING</div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-3">原流程 · 人工</div>
                  <div className="flex flex-wrap gap-2">
                    {workAutomation.before.map((s, i) => (
                      <span key={i} className="text-xs text-slate-500 bg-slate-800/60 border border-[#334155] px-3 py-1.5 rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-cyan-400 mb-3">改造后 · 自动化</div>
                  <div className="flex flex-wrap gap-2">
                    {workAutomation.after.map((s, i) => (
                      <span key={i} className="text-xs text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#334155] flex flex-wrap gap-6">
                <div className="text-sm text-slate-300">
                  覆盖：<span className="text-cyan-300 font-semibold">{workAutomation.cover}</span>
                </div>
                <div className="text-sm text-slate-300">
                  效果：<span className="text-cyan-300 font-semibold">{workAutomation.effect}</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 07 能力地图 */}
        <AnimatedSection>
          <div className="mb-14">
            <div className="text-sm font-semibold text-cyan-400 mb-4">07 能力地图 · CAPABILITY MAP</div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-center mb-8">
                <div className="inline-block bg-cyan-400/10 border border-cyan-400/30 rounded-full px-6 py-2 text-cyan-300 font-semibold text-sm">
                  {workCapability.core}
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {workCapability.columns.map((col, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-xl p-5 text-center">
                    <div className="text-sm font-semibold text-slate-200 mb-3">{col.title}</div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {col.items.map((item, j) => (
                        <span key={j} className="text-xs text-slate-400 bg-slate-700/40 px-2.5 py-1 rounded">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mb-6">
                <div className="text-xs text-slate-500 mb-2">↓</div>
                <div className="inline-block bg-slate-800/60 border border-cyan-400/20 rounded-full px-6 py-2 text-cyan-300/90 text-sm">
                  {workCapability.loop}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-2">算法研究 · 额外能力</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {workCapability.research.map((item, i) => (
                    <span key={i} className="text-xs text-cyan-400/70 bg-cyan-400/5 border border-cyan-400/15 px-2.5 py-1 rounded">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 里程碑时间线 */}
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
                    <div
                      className={`absolute left-4 top-1.5 w-4 h-4 rounded-full z-10 ${
                        (item as any).stage === 'next'
                          ? 'bg-cyan-400 border-2 border-cyan-300 animate-pulse'
                          : 'bg-[#1e293b] border-2 border-cyan-400'
                      }`}
                    />
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded ${
                            (item as any).stage === 'next'
                              ? 'text-cyan-300 bg-cyan-400/10 border border-cyan-400/30'
                              : 'text-cyan-400 bg-cyan-400/10'
                          }`}
                        >
                          {item.period}
                        </span>
                        {(item as any).stage && (item as any).stage !== 'next' && (
                          <span className="text-[10px] text-slate-500 border border-[#334155] px-1.5 py-0.5 rounded">
                            {(item as any).stage}
                          </span>
                        )}
                      </div>
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
