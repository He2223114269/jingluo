'use client';

import AnimatedSection from '@/components/AnimatedSection';
import { profile, work, education, matrix, research } from '@/data/profile';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-semibold text-slate-100 mb-5">
      <span className="w-1 h-4 rounded bg-cyan-400" />
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 resume-root">
      <style>{`
        @media print {
          @page { size: A4; margin: 12mm; }
          body { background: #fff !important; }
          nav, footer, .no-print { display: none !important; }
          .resume-root { padding: 0 !important; background: #fff !important; }
          .resume-root * { color: #111 !important; border-color: #d4d4d8 !important; box-shadow: none !important; }
          .resume-card { background: #fff !important; break-inside: avoid; page-break-inside: avoid; }
          .resume-item { break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto print:max-w-none">
        <AnimatedSection>
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-wide">
                  {profile.name}
                </h1>
                <p className="text-cyan-400 mt-2">{profile.role}</p>
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <div>📞 {profile.phone}</div>
                <div>📧 {profile.email}</div>
                <div>🔗 {profile.github}</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">{profile.summary}</p>
            <div className="mt-5 no-print">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-md text-sm bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
              >
                打印 / 另存 PDF
              </button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <section className="mb-8">
            <SectionTitle>工作经历</SectionTitle>
            <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-6 resume-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <div>
                  <span className="text-slate-100 font-semibold">{work.company}</span>
                  <span className="text-slate-500 mx-2">·</span>
                  <span className="text-slate-300 text-sm">{work.role}</span>
                </div>
                <span className="text-xs text-slate-500">{work.period}</span>
              </div>
              <p className="text-sm text-slate-400 mb-5">{work.intro}</p>
              <div className="space-y-5">
                {work.blocks.map((block) => (
                  <div key={block.title} className="resume-item">
                    <h3 className="text-sm font-semibold text-cyan-300 mb-2">▎{block.title}</h3>
                    <ul className="space-y-2">
                      {block.items.map((item, i) => (
                        <li key={i} className="text-sm leading-relaxed text-slate-300 flex gap-2">
                          <span className="text-slate-600 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="mb-8">
            <SectionTitle>教育背景</SectionTitle>
            <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-6 resume-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-slate-100 font-semibold">{education.school}</span>
                <span className="text-xs text-slate-500">{education.period}</span>
              </div>
              <p className="text-sm text-slate-300 mt-2">{education.detail}</p>
              <p className="text-sm text-slate-400 mt-1">{education.honors}</p>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <section className="mb-8">
            <SectionTitle>风控能力矩阵</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              {matrix.map((group) => (
                <div key={group.title} className="rounded-xl border border-[#334155] bg-[#1e293b] p-5 resume-card">
                  <h3 className="text-sm font-semibold text-slate-100 mb-2">{group.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{group.items.join('  |  ')}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section>
            <SectionTitle>研究项目</SectionTitle>
            <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-6 resume-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <span className="text-slate-100 font-semibold">{research.title}</span>
                <span className="text-xs text-slate-500">{research.period}</span>
              </div>
              <ul className="space-y-2">
                {research.items.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed text-slate-300 flex gap-2">
                    <span className="text-slate-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
