'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

const patentInfo = {
  title: '图正则非负矩阵分解的聚类方法、装置及介质',
  number: 'P20241074',
  status: '授权发明专利',
  date: '2024',
};

const innovations = [
  {
    title: '超图正则项',
    desc: '摒弃传统方法仅依赖邻接矩阵构建原始矩阵（局限于节点一维信息），引入超图概念捕捉多元复杂信息维度，实现更精准的社区结构发现。',
    icon: 'network',
  },
  {
    title: '自编码解码结构',
    desc: '设计解码组件，将编码后的矩阵精确重构为原始矩阵。编码-解码结构使模型能深入挖掘数据的潜在信息，探索深层次节点联系与模式。',
    icon: 'loop',
  },
  {
    title: '鲁棒约束优化',
    desc: '在目标函数中引入新型范数约束，显著降低算法对数据噪音的敏感度。面对复杂、嘈杂的真实数据集时，仍保持卓越的鲁棒性与准确性。',
    icon: 'shield',
  },
];

const datasets = [
  { name: '3-Sources', acc: 62.1, f1: 58.3, nmi: 55.7 },
  { name: 'BBC', acc: 68.5, f1: 65.2, nmi: 61.8 },
  { name: 'BBCSport', acc: 71.2, f1: 68.9, nmi: 64.3 },
  { name: 'WebKB', acc: 55.8, f1: 52.1, nmi: 48.6 },
  { name: 'UCI Digits', acc: 59.4, f1: 56.7, nmi: 52.9 },
];

const projectTimeline = [
  { date: '2023.03', event: '项目立项，完成文献调研与理论基础学习', icon: 'start' },
  { date: '2023.06', event: '提出超图正则项与自编码结构，完成算法框架设计', icon: 'design' },
  { date: '2023.09', event: '算法编程实现，在公开数据集上进行初步验证', icon: 'code' },
  { date: '2023.12', event: '完成约束项优化，算法在多个数据集平均准确率达63.4%', icon: 'result' },
  { date: '2024.06', event: '项目结项，提交发明专利（图正则非负矩阵分解的聚类方法、装置及介质）', icon: 'patent' },
  { date: '2024.11', event: '发明专利获得授权', icon: 'done' },
];

function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    network: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>,
    loop: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    shield: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    start: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    design: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    code: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    result: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    patent: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    done: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    chip: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    book: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  };
  return icons[name] || <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}

export default function ResearchDNMF() {
  const [activeTab, setActiveTab] = useState<'overview' | 'method' | 'results' | 'formula'>('overview');

  const goBack = () => { window.location.hash = 'projects'; window.dispatchEvent(new Event('hashchange')); };
  const goProjects = () => { window.location.hash = 'projects'; window.dispatchEvent(new Event('hashchange')); };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#334155]/50">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <button onClick={goBack} className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              返回项目列表
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">省级大创项目</span>
              <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">深度非负矩阵分解</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">社区发现</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
              基于超图正则化的深度非负矩阵分解
              <span className="block text-2xl sm:text-3xl text-slate-400 mt-1">的社区发现研究</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl">
              省级大学生创新训练项目 · 授权发明专利1项 · 多数据集平均准确率63.4%
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
              { key: 'method' as const, label: '研究方法' },
              { key: 'formula' as const, label: '公式推导' },
              { key: 'results' as const, label: '成果与验证' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <>
            {/* 项目摘要 */}
            <AnimatedSection delay={0.1}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">项目摘要</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  社区发现是网络科学中的核心问题，旨在将复杂网络中的节点划分为具有紧密内部连接的社区结构。
                  传统非负矩阵分解（NMF）方法在社区发现中取得了良好效果，但大多局限于利用邻接矩阵捕捉节点的一维信息，
                  且仅有编码过程，无法深入挖掘节点间的潜在联系。
                </p>
                <p className="text-slate-300 leading-relaxed">
                  本项目提出一种<strong className="text-cyan-400">基于超图正则化的深度非负矩阵分解（DNMF）</strong>算法。
                  引入超图正则项替代传统邻接矩阵，捕捉多元复杂信息维度；设计解码组件实现编码信息的精确重构；
                  优化约束项降低算法对噪音的敏感度。实验表明，改进算法在多个公开数据集上平均准确率达63.4%，
                  相关成果获授权发明专利1项。
                </p>
              </div>
            </AnimatedSection>

            {/* 研究背景 */}
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><Icon name="book" className="w-5 h-5 text-amber-400" /></div>
                    <h3 className="text-lg font-medium text-slate-100">研究背景</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex gap-2">
                      <span className="text-slate-600 shrink-0">•</span>
                      <span>社区发现是识别复杂网络中具有紧密内部连接的节点群体的关键任务，广泛应用于社交网络、生物信息学等领域</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-600 shrink-0">•</span>
                      <span>传统NMF方法仅依赖邻接矩阵构建原始矩阵，局限于捕捉节点的一维信息，无法表达复杂多元的节点关系</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-600 shrink-0">•</span>
                      <span>现有深度NMF方法仅有编码过程，缺少解码结构，无法有效挖掘数据中的深层潜在信息</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-600 shrink-0">•</span>
                      <span>目标函数中的约束项对数据噪音敏感，在复杂真实数据集中鲁棒性不足</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"><Icon name="chip" className="w-5 h-5 text-cyan-400" /></div>
                    <h3 className="text-lg font-medium text-slate-100">核心突破</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>引入<strong className="text-cyan-400">超图正则项</strong>替代传统邻接矩阵，捕捉节点间多维复杂关系</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>设计<strong className="text-cyan-400">编码-解码结构</strong>，实现深层潜在信息的精确重构与挖掘</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>引入<strong className="text-cyan-400">新型范数约束</strong>，显著提升算法在噪音数据中的鲁棒性</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>多数据集平均准确率<strong className="text-cyan-400">63.4%</strong>，授权<strong className="text-cyan-400">发明专利1项</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* 技术架构图 */}
            <AnimatedSection delay={0.2}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">算法架构</h2>
                <div className="flex flex-col items-center">
                  {/* 架构图 */}
                  <div className="w-full max-w-2xl">
                    {/* 输入层 */}
                    <div className="flex justify-center mb-2">
                      <div className="px-6 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 text-sm font-medium">原始特征矩阵 X</div>
                    </div>
                    {/* 箭头 */}
                    <div className="flex justify-center mb-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b"><path d="M12 4v16m0 0l-4-4m4 4l4-4" strokeWidth="2"/></svg></div>

                    {/* 超图正则项 */}
                    <div className="flex justify-center mb-2">
                      <div className="px-6 py-3 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm">
                        超图正则项 H ← 捕捉多元信息维度
                      </div>
                    </div>
                    <div className="flex justify-center mb-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b"><path d="M12 4v16m0 0l-4-4m4 4l4-4" strokeWidth="2"/></svg></div>

                    {/* 编码器 */}
                    <div className="flex justify-center mb-1">
                      <div className="px-8 py-4 rounded-lg bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-sm font-medium">编码器 Encoder</div>
                    </div>
                    <div className="flex justify-center gap-16 mb-1">
                      <div className="px-3 py-2 rounded bg-slate-800/50 text-xs text-slate-500">非线性变换</div>
                      <div className="px-3 py-2 rounded bg-slate-800/50 text-xs text-slate-500">深层特征提取</div>
                    </div>
                    <div className="flex justify-center my-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b"><path d="M12 4v16m0 0l-4-4m4 4l4-4" strokeWidth="2"/></svg></div>

                    {/* 潜在表示 */}
                    <div className="flex justify-center mb-2">
                      <div className="px-6 py-3 rounded-lg bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-sm font-medium">潜在表示 Z</div>
                    </div>
                    <div className="flex justify-center mb-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b"><path d="M12 4v16m0 0l-4-4m4 4l4-4" strokeWidth="2"/></svg></div>

                    {/* 解码器 */}
                    <div className="flex justify-center mb-1">
                      <div className="px-8 py-4 rounded-lg bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-sm font-medium">解码器 Decoder</div>
                    </div>
                    <div className="flex justify-center gap-16 mb-1">
                      <div className="px-3 py-2 rounded bg-slate-800/50 text-xs text-slate-500">信息重构</div>
                      <div className="px-3 py-2 rounded bg-slate-800/50 text-xs text-slate-500">矩阵复原</div>
                    </div>
                    <div className="flex justify-center my-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b"><path d="M12 4v16m0 0l-4-4m4 4l4-4" strokeWidth="2"/></svg></div>

                    {/* 输出 */}
                    <div className="flex justify-center">
                      <div className="px-6 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-300 text-sm font-medium">重构矩阵 X̂ → 社区划分结果</div>
                    </div>
                  </div>

                  <div className="mt-6 text-xs text-slate-500 text-center">
                    目标函数: min ||X - X̂||² + α·tr(H<sup>T</sup>LH) + β·R(Z) &nbsp;|&nbsp; 超图正则 + 重构误差 + 约束优化
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* 时间线 */}
            <AnimatedSection delay={0.25}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">项目时间线</h2>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-[#334155]" />
                  <div className="space-y-8">
                    {projectTimeline.map((item, i) => (
                      <div key={i} className="relative flex items-start gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-[#0f172a] border-2 border-[#334155] flex items-center justify-center shrink-0">
                          <Icon name={item.icon} className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex-1 pt-1.5">
                          <span className="text-xs text-cyan-400 font-mono">{item.date}</span>
                          <p className="text-sm text-slate-300 mt-0.5">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Tab: Methodology */}
        {activeTab === 'method' && (
          <>
            <AnimatedSection delay={0.1}>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-6">三大核心创新</h2>
                <div className="grid grid-cols-1 gap-6">
                  {innovations.map((item, i) => (
                    <div key={i} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 flex items-start gap-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center shrink-0">
                        <Icon name={item.icon} className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-slate-100 mb-2">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">与传统方法的对比</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#334155]">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">维度</th>
                        <th className="text-left py-3 px-4 text-slate-500 font-medium">传统NMF</th>
                        <th className="text-left py-3 px-4 text-cyan-400 font-medium">本方法 (DNMF)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334155]/50">
                      <tr><td className="py-3 px-4 text-slate-300">矩阵构建</td><td className="py-3 px-4 text-slate-500">邻接矩阵（一维信息）</td><td className="py-3 px-4 text-slate-300">超图正则项（多维信息）</td></tr>
                      <tr><td className="py-3 px-4 text-slate-300">网络结构</td><td className="py-3 px-4 text-slate-500">仅有编码</td><td className="py-3 px-4 text-slate-300">编码-解码结构</td></tr>
                      <tr><td className="py-3 px-4 text-slate-300">鲁棒性</td><td className="py-3 px-4 text-slate-500">对噪音敏感</td><td className="py-3 px-4 text-slate-300">新型范数约束，鲁棒性强</td></tr>
                      <tr><td className="py-3 px-4 text-slate-300">信息挖掘</td><td className="py-3 px-4 text-slate-500">浅层特征</td><td className="py-3 px-4 text-slate-300">深层潜在信息</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Tab: Formula */}
        {activeTab === 'formula' && (
          <>
    {/* 公式样式定义 */}
            <style>{`
              .math-box {
                background: linear-gradient(135deg, rgba(6,182,212,0.03), rgba(139,92,246,0.03));
                border: 1px solid rgba(51,65,85,0.5);
                transition: all 0.3s ease;
              }
              .math-box:hover {
                border-color: rgba(6,182,212,0.3);
                box-shadow: 0 0 30px rgba(6,182,212,0.05);
              }
              .math-formula {
                font-family: 'Times New Roman', 'CMU Serif', Georgia, serif;
                letter-spacing: 0.02em;
                line-height: 1.8;
              }
              .formula-main {
                font-size: 1.4rem;
                padding: 1.5rem 2rem;
                text-align: center;
              }
              .formula-sub {
                font-size: 1.1rem;
                padding: 1rem 1.5rem;
                text-align: center;
              }
              .formula-step {
                background: rgba(15,23,42,0.6);
                border: 1px solid rgba(51,65,85,0.3);
                border-radius: 0.75rem;
                padding: 1rem 1.5rem;
                transition: all 0.3s ease;
              }
              .formula-step:hover {
                border-color: rgba(6,182,212,0.2);
                background: rgba(15,23,42,0.8);
              }
              .formula-arrow {
                color: rgba(100,116,139,0.5);
                font-size: 1.5rem;
                text-align: center;
                line-height: 1;
              }
            `}</style>

        {/* 目标函数 */}
        <AnimatedSection delay={0.1}>
          <div className="math-box rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">目标函数</h2>
            <p className="text-slate-400 text-sm mb-6">
              本算法旨在最小化重构误差的同时，通过超图正则项保持数据的局部几何结构，
              并引入约束项提升解的鲁棒性。总目标函数定义如下：
            </p>

            <div className="bg-[#0f172a]/60 rounded-xl p-6 border border-[#334155]/50 mb-6">
              <div className="math-formula formula-main text-cyan-300">
                <span className="text-slate-400">min</span> ℒ 
                <span className="text-slate-400"> = </span>
                <span className="text-cyan-400">ℒ<sub>rec</sub></span>
                <span className="text-slate-400"> + </span>
                <span className="text-slate-300">α</span>
                <span className="text-slate-400"> · </span>
                <span className="text-purple-400">ℒ<sub>hyp</sub></span>
                <span className="text-slate-400"> + </span>
                <span className="text-slate-300">β</span>
                <span className="text-slate-400"> · </span>
                <span className="text-emerald-400">ℒ<sub>reg</sub></span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent mx-4 my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-lg bg-slate-800/40 border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
                  <div className="text-cyan-400 font-medium mb-2 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>重构误差项
                  </div>
                  <div className="math-formula formula-sub text-cyan-300">
                    ℒ<sub>rec</sub> = ‖<b>X</b> − <b>X̂</b>‖²<sub>F</sub>
                  </div>
                  <div className="text-[11px] text-slate-500 text-center mt-2 italic">保证编码-解码信息的重构保真度</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/40 border border-purple-500/10 hover:border-purple-500/30 transition-all">
                  <div className="text-purple-400 font-medium mb-2 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>超图正则项
                  </div>
                  <div className="math-formula formula-sub text-purple-300">
                    ℒ<sub>hyp</sub> = tr(<b>H</b><sup>T</sup><b>L</b><sub>h</sub><b>H</b>)
                  </div>
                  <div className="text-[11px] text-slate-500 text-center mt-2 italic">保持超图结构的局部几何信息</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/40 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                  <div className="text-emerald-400 font-medium mb-2 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>约束正则项
                  </div>
                  <div className="math-formula formula-sub text-emerald-300">
                    ℒ<sub>reg</sub> = ‖<b>W</b>‖<sub>1</sub>
                  </div>
                  <div className="text-[11px] text-slate-500 text-center mt-2 italic">L₁范数约束，提升稀疏性与鲁棒性</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-500 bg-slate-800/20 rounded-lg p-3 border border-[#334155]/30">
              <span>α &gt; 0, β &gt; 0 — 正则化超参数</span>
              <span className="text-slate-600">|</span>
              <span>‖ · ‖<sub>F</sub> — Frobenius 范数</span>
              <span className="text-slate-600">|</span>
              <span>tr(·) — 矩阵的迹</span>
            </div>
          </div>
        </AnimatedSection>

        {/* 重构误差项推导 */}
        <AnimatedSection delay={0.15}>
          <div className="math-box rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">重构误差项推导</h2>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="formula-step">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">1</span>
                  <span className="text-sm font-medium text-slate-200">编码过程</span>
                </div>
                <div className="math-formula text-sm text-slate-300 text-center py-2 bg-slate-900/40 rounded-lg">
                  <b>H</b> = φ(<b>X</b> · <b>W</b><sub>e</sub>) = ReLU(<b>X</b> · <b>W</b><sub>e</sub>)
                </div>
                <div className="text-[11px] text-slate-600 text-center mt-1">原始特征 <b>X</b> 通过编码器权重 <b>W</b><sub>e</sub> 映射到潜在表示 <b>H</b></div>
              </div>

              <div className="formula-arrow">↓</div>

              {/* Step 2 */}
              <div className="formula-step">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-purple-500/20">2</span>
                  <span className="text-sm font-medium text-slate-200">深度扩展</span>
                </div>
                <div className="math-formula text-sm text-slate-300 text-center py-2 bg-slate-900/40 rounded-lg">
                  <b>H</b><sup>(k)</sup> = φ(<b>H</b><sup>(k−1)</sup> · <b>W</b><sup>(k)</sup>)
                </div>
                <div className="text-[11px] text-slate-600 text-center mt-1">通过多层非线性变换提取深层特征表示</div>
              </div>

              <div className="formula-arrow">↓</div>

              {/* Step 3 */}
              <div className="formula-step">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">3</span>
                  <span className="text-sm font-medium text-slate-200">解码重构</span>
                </div>
                <div className="math-formula text-sm text-slate-300 text-center py-2 bg-slate-900/40 rounded-lg">
                  <b>X̂</b> = ψ(<b>H</b> · <b>W</b><sub>d</sub>) = <b>H</b> · <b>W</b><sub>d</sub>
                </div>
                <div className="text-[11px] text-slate-600 text-center mt-1">通过解码器权重 <b>W</b><sub>d</sub> 将潜在表示重构回原始空间</div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent my-4" />

              {/* Final */}
              <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl p-5 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-cyan-300">重构误差</span>
                </div>
                <div className="math-formula text-base text-cyan-300 text-center py-3">
                  ℒ<sub>rec</sub> = ‖<b>X</b> − <b>X̂</b>‖²<sub>F</sub> = Σ<sub>i,j</sub> (<b>X</b><sub>ij</sub> − <b>X̂</b><sub>ij</sub>)²
                </div>
                <div className="text-[11px] text-slate-500 text-center mt-1">
                  Frobenius 范数度量原始矩阵与重构矩阵之间的差异
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 超图正则项推导 */}
        <AnimatedSection delay={0.2}>
          <div className="math-box rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">超图正则项推导</h2>

            <div className="space-y-4">
              <div className="formula-step">
                <div className="text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-[10px]">L</span>
                  超图拉普拉斯矩阵
                </div>
                <div className="math-formula text-sm text-slate-300 text-center py-3 bg-slate-900/40 rounded-lg">
                  <b>L</b><sub>h</sub> = <b>D</b><sub>v</sub> − <b>A</b><sub>h</sub>
                </div>
                <div className="text-[11px] text-slate-600 text-center mt-1">
                  其中 <b>D</b><sub>v</sub> 为顶点度对角矩阵，<b>A</b><sub>h</sub> 为超图邻接矩阵
                </div>
              </div>

              <div className="formula-step">
                <div className="text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-[10px]">A</span>
                  超图邻接矩阵定义
                </div>
                <div className="math-formula text-sm text-slate-300 text-center py-3 bg-slate-900/40 rounded-lg">
                  (<b>A</b><sub>h</sub>)<sub>ij</sub> = Σ<sub>e ∈ E</sub> <b>w</b>(e) · <b>h</b>(i, e) · <b>h</b>(j, e) / δ(e)
                </div>
                <div className="text-[11px] text-slate-600 text-center mt-1">
                  超边 e 连接节点 i 和 j 的权重，w(e) 为超边权重，δ(e) 为超边度
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl p-5 border border-purple-500/20">
                <div className="text-sm font-medium text-purple-300 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-[10px]">R</span>
                  超图正则项
                </div>
                <div className="math-formula text-base text-purple-300 text-center py-3">
                  ℒ<sub>hyp</sub> = tr(<b>H</b><sup>T</sup> · <b>L</b><sub>h</sub> · <b>H</b>) = ½ Σ<sub>i,j</sub> <b>A</b><sub>ij</sub> ‖<b>h</b><sub>i</sub> − <b>h</b><sub>j</sub>‖²
                </div>
                <div className="text-[11px] text-slate-500 text-center mt-1">
                  保持超图结构中相邻节点在潜在空间中的距离相近
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 迭代更新规则 */}
        <AnimatedSection delay={0.25}>
          <div className="math-box rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">迭代更新规则</h2>
            <p className="text-slate-400 text-sm mb-4">
              采用乘法更新策略（Multiplicative Update Rules），在每次迭代中保证目标函数单调不增：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="formula-step">
                <div className="text-sm font-medium text-purple-300 mb-2">编码器权重更新</div>
                <div className="math-formula text-sm text-slate-300 text-center py-3">
                  <b>W</b><sub>e</sub> ← <b>W</b><sub>e</sub> ⊙ (∇<sup>−</sup>ℒ) / (∇<sup>+</sup>ℒ)
                </div>
              </div>
              <div className="formula-step">
                <div className="text-sm font-medium text-emerald-300 mb-2">解码器权重更新</div>
                <div className="math-formula text-sm text-slate-300 text-center py-3">
                  <b>W</b><sub>d</sub> ← <b>W</b><sub>d</sub> ⊙ (<b>X</b> · <b>H</b><sup>T</sup>) / (<b>W</b><sub>d</sub> · <b>H</b> · <b>H</b><sup>T</sup>)
                </div>
              </div>
            </div>

            <div className="formula-step mb-4">
              <div className="text-sm font-medium text-cyan-300 mb-2">潜在表示更新</div>
              <div className="math-formula text-sm text-slate-300 text-center py-3">
                <b>H</b> ← <b>H</b> ⊙ (<b>W</b><sub>d</sub><sup>T</sup> · <b>X</b> + α · <b>A</b><sub>h</sub> · <b>H</b>) / (<b>W</b><sub>d</sub><sup>T</sup> · <b>W</b><sub>d</sub> · <b>H</b> + α · <b>D</b><sub>v</sub> · <b>H</b> + β · <b>I</b>)
              </div>
              <div className="text-[11px] text-slate-500 text-center">
                ⊙ 表示逐元素乘法，除号为逐元素除法，<b>I</b> 为单位矩阵
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20">
              <div className="text-xs text-amber-400 font-medium mb-2 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                收敛条件
              </div>
              <div className="math-formula text-xs text-slate-400">
                ‖ℒ<sup>(t+1)</sup> − ℒ<sup>(t)</sup>‖ / ‖ℒ<sup>(t)</sup>‖ &lt; ε &nbsp; 或 &nbsp; 达到最大迭代次数 T<sub>max</sub>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 算法流程 */}
        <AnimatedSection delay={0.3}>
          <div className="math-box rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">算法流程</h2>
            <div className="bg-[#0f172a]/80 rounded-xl p-5 border border-[#334155]/50 font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#334155]/30">
                <span className="text-emerald-400 font-medium">输入</span>
                <span className="text-slate-600">:</span>
                <span className="text-slate-300">原始特征矩阵 <b>X</b>, α, β, 隐层维度 k, 最大迭代 T</span>
              </div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#334155]/30">
                <span className="text-emerald-400 font-medium">输出</span>
                <span className="text-slate-600">:</span>
                <span className="text-slate-300"><b>W</b><sub>e</sub>, <b>W</b><sub>d</sub>, <b>H</b></span>
              </div>
              <div className="space-y-1.5">
                <p><span className="text-cyan-400 font-medium">1</span> <span className="text-slate-600">:</span> 初始化 <b>W</b><sub>e</sub>, <b>W</b><sub>d</sub>, <b>H</b>（随机初始化）</p>
                <p><span className="text-cyan-400 font-medium">2</span> <span className="text-slate-600">:</span> 构建超图邻接矩阵 <b>A</b><sub>h</sub> 和度矩阵 <b>D</b><sub>v</sub></p>
                <p className="mt-2"><span className="text-purple-400 font-medium">repeat</span></p>
                <p className="ml-6"><span className="text-cyan-400 font-medium">3</span> <span className="text-slate-600">:</span> <b>H</b> ← φ(<b>X</b> · <b>W</b><sub>e</sub>) &nbsp;<span className="text-slate-600">▷ 编码</span></p>
                <p className="ml-6"><span className="text-cyan-400 font-medium">4</span> <span className="text-slate-600">:</span> <b>X̂</b> ← <b>H</b> · <b>W</b><sub>d</sub> &nbsp;<span className="text-slate-600">▷ 解码重构</span></p>
                <p className="ml-6"><span className="text-cyan-400 font-medium">5</span> <span className="text-slate-600">:</span> 按乘法更新规则更新 <b>W</b><sub>e</sub>, <b>W</b><sub>d</sub>, <b>H</b></p>
                <p className="ml-6"><span className="text-cyan-400 font-medium">6</span> <span className="text-slate-600">:</span> 计算 ℒ = ‖<b>X</b> − <b>X̂</b>‖²<sub>F</sub> + α·tr(<b>H</b><sup>T</sup><b>L</b><sub>h</sub><b>H</b>) + β·‖<b>W</b>‖₁</p>
                <p className="mt-2"><span className="text-purple-400 font-medium">until</span> 收敛或达到 T<sub>max</sub></p>
                <p className="mt-3 pt-3 border-t border-[#334155]/30"><span className="text-cyan-400 font-medium">7</span> <span className="text-slate-600">:</span> 对 <b>H</b> 执行 K-Means 聚类，输出社区划分结果</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
          </>
        )}

        {/* Tab: Results */}
        {activeTab === 'results' && (
          <>
            {/* 专利信息 */}
            <AnimatedSection delay={0.1}>
              <div className="bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 rounded-xl p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100">授权发明专利</h2>
                    <p className="text-sm text-emerald-400 mt-0.5">已获得国家知识产权局授权</p>
                  </div>
                </div>
                <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-[#334155]">
                  <p className="text-slate-200 font-medium mb-1">{patentInfo.title}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                    <span>专利号：{patentInfo.number}</span>
                    <span>类型：{patentInfo.status}</span>
                    <span>日期：{patentInfo.date}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* 数据集结果 */}
            <AnimatedSection delay={0.15}>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">数据集验证</h2>
                <p className="text-sm text-slate-400 mb-6">
                  在多个公开数据集上进行评估，与多种基线方法对比，本方法在准确率、F1分数、NMI等指标上均取得领先表现。
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#334155]">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">数据集</th>
                        <th className="text-right py-3 px-4 text-cyan-400 font-medium">准确率 (ACC)</th>
                        <th className="text-right py-3 px-4 text-purple-400 font-medium">F1分数</th>
                        <th className="text-right py-3 px-4 text-amber-400 font-medium">NMI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#334155]/50">
                      {datasets.map((d, i) => (
                        <tr key={i} className="hover:bg-slate-800/30">
                          <td className="py-3 px-4 text-slate-300 font-medium">{d.name}</td>
                          <td className="py-3 px-4 text-right text-slate-300">{d.acc}%</td>
                          <td className="py-3 px-4 text-right text-slate-300">{d.f1}%</td>
                          <td className="py-3 px-4 text-right text-slate-300">{d.nmi}%</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-[#334155] font-medium">
                        <td className="py-3 px-4 text-slate-100">平均</td>
                        <td className="py-3 px-4 text-right text-cyan-400">63.4%</td>
                        <td className="py-3 px-4 text-right text-purple-400">60.2%</td>
                        <td className="py-3 px-4 text-right text-amber-400">56.7%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </AnimatedSection>

            {/* 项目信息卡片 */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">省级</div>
                  <p className="text-xs text-slate-500">大学生创新训练项目</p>
                </div>
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">1项</div>
                  <p className="text-xs text-slate-500">授权发明专利</p>
                </div>
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">63.4%</div>
                  <p className="text-xs text-slate-500">平均准确率</p>
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
