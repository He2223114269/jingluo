'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

const patents = [
  { title: '一种生物燃料催化剂及使用该催化剂的生物燃料制备工艺', number: 'CN202311086939.X', status: '发明专利（在审）', date: '2023' },
  { title: '一种大棚污泥干化进出结构', number: 'CN202421603251.4', status: '实用新型专利', date: '2024' },
  { title: '污泥脱水处理设备', number: 'CN220867260U', status: '实用新型专利', date: '2024' },
];

const techCards = [
  {
    title: '负压低沸烘干技术',
    desc: '在真空环境下降低水的沸点，使污泥中的水分在低温下蒸发，热能利用率达90%以上。内置搅拌系统防止结块，一次性将含水率从80%降至30%以下。',
    icon: 'vacuum',
  },
  {
    title: '多物料催化强化热值技术',
    desc: '将污泥、园林绿化废弃物和催化剂进行配比处理，污泥热值提高36%。经深圳计量检测研究院检测，含1.8%煤矸石的实验组燃烧热值高达2976 cal/g。',
    icon: 'flame',
  },
  {
    title: '污泥再生燃料技术',
    desc: '将干化后的污泥压缩成颗粒状再生燃料，定向销售给水泥厂协同焚烧。水泥窑1000℃高温下无二噁英生成，飞灰制成水泥熟料实现重金属固化。',
    icon: 'recycle',
  },
];

const processSteps = [
  { step: '01', label: '破碎搅拌', desc: '将含水率80%的污泥与园林绿化垃圾、脱水剂混合破碎搅拌', color: 'from-cyan-500 to-blue-600' },
  { step: '02', label: '负压低沸烘干', desc: '利用真空负压环境降低沸点，高效蒸发水分至含水率30%以下', color: 'from-purple-500 to-pink-600' },
  { step: '03', label: '压缩成型', desc: '将对辊压缩机将干燥污泥压缩成颗粒状再生燃料', color: 'from-emerald-500 to-teal-600' },
  { step: '04', label: '水泥窑协同焚烧', desc: '燃料售予水泥厂，1000℃焚烧后飞灰制成水泥熟料', color: 'from-amber-500 to-orange-600' },
];

const awards = [
  { title: '第九届全国大学生互联网+创新创业大赛', level: '国家三等奖', role: '项目负责人', year: '2023' },
];

function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    vacuum: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>,
    flame: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>,
    recycle: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>,
    patent: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
    plant: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>,
    coin: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    target: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  };
  return icons[name] || <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
}

export default function ProjectZhiHuan() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'business' | 'results'>('overview');

  const goProjects = () => { window.location.hash = 'projects'; window.dispatchEvent(new Event('hashchange')); };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#334155]/50">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <button onClick={goProjects} className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              返回项目列表
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">互联网+ 国三</span>
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">高教主赛道</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-medium">本科生创意组</span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">污泥资源化</span>
              <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">3项专利</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
              智环生态
              <span className="block text-2xl sm:text-3xl text-slate-400 mt-1">污泥数智处理与资源化利用引领者</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl">
              第九届互联网+创新创业大赛国家三等奖 · 发明专利1项 · 实用新型专利2项
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <AnimatedSection delay={0.05}>
          <div className="flex gap-1 py-6 border-b border-[#334155]/30 mb-8 overflow-x-auto">
            {[
              { key: 'overview' as const, label: '项目概览' },
              { key: 'tech' as const, label: '核心技术' },
              { key: 'business' as const, label: '商业模式' },
              { key: 'results' as const, label: '成果与专利' },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.key ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
              >{tab.label}</button>
            ))}
          </div>
        </AnimatedSection>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <>
            <AnimatedSection delay={0.1}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">项目背景</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  随着我国城市化进程加快，污泥产量急剧增加。预计2025年突破1亿吨，污泥处理市场规模超700亿元。
                  污泥含水率高（浓缩后约97%，脱水后仍达80%），当含水量达79.9%时，热值全部用于水分蒸发，热量损失100%。
                  当前我国生物质能源在能源消费结构中占比不足3.1%，远低于全球均值8.09%，提高占比刻不容缓。
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  针对污泥含水率高、资源化利用难两大痛点，智环生态团队经实地走访、三下乡实践与产研学协同创新，
                  研发四大核心技术，设计一体化污泥燃料制备设备，实现污泥资源化利用。
                </p>
                <p className="text-slate-300 leading-relaxed">
                  国家政策要求到2025年污泥无害化处置率达90%以上。在此背景下，智环生态项目构建"污水厂→污泥处理→水泥厂"
                  创新链路，将污泥制成再生燃料替代煤炭，燃烧后CO₂排放仅为等量煤炭的5%。
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">处理流程</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {processSteps.map((step, i) => (
                    <div key={i} className="relative">
                      <div className={`bg-gradient-to-br ${step.color} rounded-xl p-5 text-center relative z-10`}>
                        <span className="text-2xl font-bold text-white/30 block mb-1">{step.step}</span>
                        <h3 className="text-white font-medium mb-1">{step.label}</h3>
                        <p className="text-white/70 text-xs">{step.desc}</p>
                      </div>
                      {i < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-2 z-20">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="#334155"><path d="M8 0l8 8-8 8z"/></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-xs text-slate-500">
                  完整链路：污水厂 → 污泥脱水 → 园林垃圾配比 → 负压低沸烘干 → 压缩成型 → 水泥厂协同焚烧 → 飞灰制成水泥熟料
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="target" className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-medium text-slate-100">核心优势</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✦</span><span>处理模式国内领先——"污水厂—污泥处理—水泥厂"便捷通道，上下游均已签订战略意向合同</span></li>
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✦</span><span>污泥脱水技术国内领先——低温真空一体化干化设备，低能耗高效率，将含水率80%降至30%以下</span></li>
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✦</span><span>多物料催化强化热值——污泥热值提高36%，有效代替部分煤的使用</span></li>
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✦</span><span>全自动化设备，减少人工成本，符合市场发展趋势</span></li>
                  </ul>
                </div>
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="coin" className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-medium text-slate-100">社会效益</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex gap-2"><span className="text-amber-400 shrink-0">✦</span><span>解决污泥难资源化利用的行业痛点，实现稳定化、无害化、资源化</span></li>
                    <li className="flex gap-2"><span className="text-amber-400 shrink-0">✦</span><span>再生燃料代替煤炭，碳排放仅为等量煤炭的5%</span></li>
                    <li className="flex gap-2"><span className="text-amber-400 shrink-0">✦</span><span>重金属通过水泥窑高温焚烧固化在水泥熟料中，避免二次污染</span></li>
                    <li className="flex gap-2"><span className="text-amber-400 shrink-0">✦</span><span>推动城市废物回收利用体系有效融合，助力新型城镇化建设</span></li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">市场验证</h2>
                <div className="space-y-4">
                  <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-[#334155]/50">
                    <h3 className="text-sm font-medium text-cyan-300 mb-2">浏阳市北控水务（城市污泥）</h3>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs mb-2">
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-cyan-400 font-medium block">20吨/天</span><span className="text-slate-500">处置规模</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-cyan-400 font-medium block">7吨/天</span><span className="text-slate-500">生物燃料产出</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-cyan-400 font-medium block">一次性脱水</span><span className="text-slate-500">制备燃料</span></div>
                    </div>
                    <div className="text-xs text-slate-500">工艺路线：一次性污泥脱水制备生物质燃料｜运行效果：减量化无害化明显，产品性能优良</div>
                  </div>

                  <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-[#334155]/50">
                    <h3 className="text-sm font-medium text-purple-300 mb-2">安徽六安凯天环保（城市污泥）</h3>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs mb-2">
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-purple-400 font-medium block">115吨/天</span><span className="text-slate-500">处置规模</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-purple-400 font-medium block">40吨/天</span><span className="text-slate-500">生物燃料产出</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-purple-400 font-medium block">低温极限真空</span><span className="text-slate-500">脱水技术</span></div>
                    </div>
                    <div className="text-xs text-slate-500">核心技术：低温干燥极限真空脱水 + 生物质裂化裂解催化剂｜凯天环保出具应用证明</div>
                  </div>

                  <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-[#334155]/50">
                    <h3 className="text-sm font-medium text-emerald-300 mb-2">株洲中材水泥（燃料应用）</h3>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs mb-2">
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-emerald-400 font-medium block">替代16%</span><span className="text-slate-500">煤的使用</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-emerald-400 font-medium block">547万元</span><span className="text-slate-500">年节约成本</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-emerald-400 font-medium block">29,424吨</span><span className="text-slate-500">年减排CO₂</span></div>
                    </div>
                    <div className="text-xs text-slate-500">经株洲中材水泥对燃料从热值、空气干燥基水分等六个维度全面检测，可部分替代煤炭使用</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Tab: Technology */}
        {activeTab === 'tech' && (
          <>
            <AnimatedSection delay={0.1}>
              <h2 className="text-xl font-semibold text-slate-100 mb-6">三大核心技术</h2>
              <div className="space-y-6 mb-8">
                {techCards.map((card, i) => (
                  <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Icon name={card.icon} className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-100 mb-2">{card.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">技术原理详解</h2>

                <div className="space-y-6">
                  <div className="bg-[#0f172a]/50 rounded-lg p-5 border border-[#334155]/50">
                    <h3 className="text-sm font-medium text-cyan-300 mb-3">一体化低温真空干燥设备</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      采用"仿生原理+重力过滤+挤压+低温干燥极限真空"的复合脱水设计，效率高、占地小、安装简便。
                      利用真空泵形成负压环境降低水的沸点，污泥中的水分在低温下蒸发，热能利用效率达90%以上。
                      内置搅拌系统防止结块，一次性将含水率从80%降至30%以下，体积缩减为原来的1/3。
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-cyan-400 font-medium">能耗减30%</span><br /><span className="text-slate-500">vs 市场现有设备</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-cyan-400 font-medium">成本降40%</span><br /><span className="text-slate-500">vs 市场现有设备</span></div>
                      <div className="p-2 rounded bg-slate-800/50"><span className="text-cyan-400 font-medium">小型化设计</span><br /><span className="text-slate-500">无需清洗水</span></div>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">获湖南省环境保护科学研究院认可推荐</div>
                  </div>

                  <div className="bg-[#0f172a]/50 rounded-lg p-5 border border-[#334155]/50">
                    <h3 className="text-sm font-medium text-emerald-300 mb-3">多物料催化强化热值</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      自研催化剂（主要成分：Pb(NO₃)₂ + Er(OTf)₃ + 秘密配方），能迅速将纤维素等植物性材料催化裂解为小分子，
                      在极短时间内实现完全转化。将污泥、园林绿化废弃物和催化剂进行科学配比，经深圳市计量质量检测研究院检测，
                      污泥热值提高<span className="text-emerald-400">36%</span>（含1.8%煤矸石实验组燃烧热值高达2976 cal/g），有效代替部分煤的使用。
                    </p>
                  </div>

                  <div className="bg-[#0f172a]/50 rounded-lg p-5 border border-[#334155]/50">
                    <h3 className="text-sm font-medium text-purple-300 mb-3">再生燃料制备与处置</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      将干化后的污泥通过对辊成型机压缩成颗粒状再生燃料，定向售卖给水泥厂进行协同焚烧。
                      水泥窑温度高达<span className="text-purple-400">1000℃</span>，在此温度下焚烧不会产生二噁英。
                      焚烧后的飞灰被制成水泥熟料，对其中重金属进行了固化处理，不会对人类造成二次污染。
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Tab: Business */}
        {activeTab === 'business' && (
          <>
            <AnimatedSection delay={0.1}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">商业模式</h2>
                <div className="bg-[#0f172a]/60 rounded-xl p-6 border border-[#334155]/50 mb-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                      <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                        <div className="text-cyan-400 font-medium mb-1">上游</div>
                        <div className="text-sm text-slate-300">污水厂</div>
                        <div className="text-xs text-slate-500">收储污泥·收取处置费</div>
                      </div>
                      <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <div className="text-emerald-400 font-medium mb-1">核心处理</div>
                        <div className="text-sm text-slate-300">智环生态</div>
                        <div className="text-xs text-slate-500">负压低沸烘干·压缩成型</div>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
                        <div className="text-purple-400 font-medium mb-1">下游</div>
                        <div className="text-sm text-slate-300">水泥厂</div>
                        <div className="text-xs text-slate-500">销售再生燃料·协同焚烧</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 text-center">
                      收入来源：污泥处置费 + 园林绿化废弃物处置费 + 再生燃料销售收入
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <h3 className="text-lg font-medium text-slate-100 mb-4">市场前景</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">•</span><span>2022年污泥年产量7809.1万吨，预计2025年超过9000万吨</span></li>
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">•</span><span>国家政策持续推动污泥无害化、资源化利用</span></li>
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">•</span><span>预计2024年长沙地区日处理污泥约500吨，日产燃料约180吨</span></li>
                    <li className="flex gap-2"><span className="text-emerald-400 shrink-0">•</span><span>污泥处置产业快速成为资本市场投资热点</span></li>
                  </ul>
                </div>
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <h3 className="text-lg font-medium text-slate-100 mb-4">合作资源</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span><span>浏阳市北控水务建设有限公司——战略合作</span></li>
                    <li className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span><span>长沙凯迈新能科技有限公司——技术走访调研</span></li>
                    <li className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span><span>中懿微生物——检测协作、技术支持</span></li>
                    <li className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span><span>湖南工商大学理学院——科研支撑</span></li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Tab: Results */}
        {activeTab === 'results' && (
          <>
            <AnimatedSection delay={0.1}>
              <div className="bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">知识产权</h2>
                <p className="text-sm text-slate-400 mb-4">团队以第一发明人申请知识产权10项（专利授权6项，参与制定地方行业标准2项）</p>
                <div className="space-y-3">
                  {patents.map((p, i) => (
                    <div key={i} className="bg-[#0f172a]/50 rounded-lg p-4 border border-[#334155]">
                      <div className="flex items-start gap-3">
                        <Icon name="patent" className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-slate-200 text-sm font-medium">{p.title}</p>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                            <span>{p.number}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${p.status.includes('在审') ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{p.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">竞赛获奖</h2>
                {awards.map((a, i) => (
                  <div key={i} className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <h3 className="text-slate-200 font-medium">{a.title}</h3>
                        <div className="flex gap-3 text-xs text-slate-500 mt-1">
                          <span className="text-amber-400 font-medium">{a.level}</span>
                          <span>角色：{a.role}</span>
                          <span>{a.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">1项</div>
                  <p className="text-xs text-slate-500">发明专利（在审）</p>
                </div>
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">2项</div>
                  <p className="text-xs text-slate-500">实用新型专利</p>
                </div>
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-amber-400 mb-1">国三</div>
                  <p className="text-xs text-slate-500">互联网+大赛</p>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Footer */}
        <AnimatedSection delay={0.3}>
          <div className="text-center py-8 border-t border-[#334155]/30">
            <button onClick={goProjects} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e293b] border border-[#334155] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all text-sm">
              ← 返回项目列表
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
