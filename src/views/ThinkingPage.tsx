'use client';

import { useMemo, useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { thinkingItems, thinkingSummary } from '@/data/thinking';
import type { ThinkingItem } from '@/data/thinking';
import ThinkingDetailModal from '@/components/ThinkingDetailModal';

const CATS = ['全部', '门店', '套餐', '策略', '模型', '监控', '治理', '质态', '对外', '工程', '事故'];

export default function ThinkingPage() {
  const [cat, setCat] = useState('全部');
  const [selected, setSelected] = useState<ThinkingItem | null>(null);

  const filtered = useMemo(
    () => (cat === '全部' ? thinkingItems : thinkingItems.filter((x) => x.cat === cat)),
    [cat]
  );

  const groups = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((item) => {
      const m = item.date.slice(0, 7);
      if (!map.has(m)) map.set(m, []);
      map.get(m)!.push(item);
    });
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">思考</h1>
            <p className="text-slate-400 leading-relaxed">
              按时间顺序归档的分析、评估与调整：小到门店、套餐的专项判断，大到业务调整、模型效果与体系迁移。
              最后是一份阶段总结。
            </p>
          </div>
        </AnimatedSection>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                cat === c
                  ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300'
                  : 'border-[#334155] text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {c}
              {c !== '全部' && (
                <span className="ml-1 text-[9px] text-slate-600">
                  {thinkingItems.filter((x) => x.cat === c).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 时间线 */}
        <div className="space-y-8">
          {groups.map(([month, items]) => (
            <div key={month}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-mono text-cyan-400/90">{month}</span>
                <span className="h-px flex-1 bg-[#334155]" />
                <span className="text-[10px] text-slate-600">{items.length} 条</span>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <button key={item.title} type="button" onClick={() => setSelected(item)}
                    className="w-full text-left rounded-xl border border-[#334155] bg-[#1e293b] p-4 hover:border-cyan-400/25 hover:bg-slate-800/30 transition-colors group">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-slate-500">{item.date.slice(5)}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300/90 border border-cyan-400/20">{item.cat}</span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-slate-100 mb-1.5 group-hover:text-cyan-200 transition-colors flex items-center gap-2">
                      {item.title}
                      <span className="text-[9px] text-slate-600 group-hover:text-cyan-400">详情 →</span>
                    </h3>
                    <p className="text-[12px] text-slate-400 leading-relaxed">{item.finding}</p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.tags.map((t) => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/70 border border-[#334155] text-slate-500">{t}</span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 阶段总结 */}
        <AnimatedSection>
          <section className="mt-14">
            <div className="rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.03] p-6 sm:p-8">
              <div className="text-[11px] text-cyan-400 mb-2">SUMMARY</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-5">{thinkingSummary.title}</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {thinkingSummary.stats.map((s) => (
                  <div key={s.k} className="rounded-lg border border-[#334155] bg-slate-900/40 p-3 text-center">
                    <div className="text-lg font-bold text-cyan-300">{s.v}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{s.k}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {thinkingSummary.paragraphs.map((p, i) => (
                  <p key={i} className="text-[13px] text-slate-300 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
      {selected && <ThinkingDetailModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
