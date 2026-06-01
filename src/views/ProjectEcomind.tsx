'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

const techFeatures = [
  {
    title: 'LSTM时序预测模型',
    desc: '基于LSTM（长短期记忆网络）构建用电负荷预测模型，捕捉用户用电行为的时间序列特征，实现对未来用电量的精准预测。',
  },
  {
    title: '用电结构画像',
    desc: '对用户的用电数据进行多维度分析，构建个性化的用电结构与用电习惯画像，识别待机耗电、高峰用电等可优化环节。',
  },
  {
    title: '智能节电建议',
    desc: '基于预测结果与画像分析，生成针对性的节电建议，包括待机耗电管理、用电时段优化、设备能效评估等。',
  },
  {
    title: 'IoT数据采集',
    desc: '通过物联网设备采集实时用电数据，结合开源数据集与用户实际用电数据，构建完整的训练与评估体系。',
  },
];

export default function ProjectEcomind() {
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
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">节能减排 国三</span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">LSTM时序预测</span>
              <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">IoT智能电网</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
              Ecomind
              <span className="block text-2xl sm:text-3xl text-slate-400 mt-1">基于LSTM的智能电网项目</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl">
              第十六届节能减排社会实践与科技竞赛 国家三等奖 · 项目创始人
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 项目概述 */}
        <AnimatedSection delay={0.1}>
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">项目概述</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Ecomind是一个旨在分析用户用电数据、总结用电结构与规律，从而为用户提供针对性节电建议的智能电网项目。
              通过LSTM时序预测模型分析用户的用电行为模式，识别待机耗电等无效用电，优化用电结构。
            </p>
            <p className="text-slate-300 leading-relaxed">
              项目负责人全面负责整个项目的把关、数据收集与处理、算法模型开发。
              使用开源数据集与团队成员及导师的用电数据作为训练集，
              测试发现根据不同用户场景可减少<span className="text-emerald-400 font-medium">12-21%</span>的电费支出。
            </p>
          </div>
        </AnimatedSection>

        {/* 核心技术与实现 */}
        <AnimatedSection delay={0.15}>
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">核心技术</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techFeatures.map((f, i) => (
                <div key={i} className="bg-[#0f172a]/50 rounded-lg p-5 border border-[#334155]/50 hover:border-emerald-500/20 transition-all">
                  <h3 className="text-sm font-medium text-emerald-300 mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 项目亮点 */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">12-21%</div>
              <p className="text-xs text-slate-500">电费节省幅度</p>
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">LSTM</div>
              <p className="text-xs text-slate-500">核心预测算法</p>
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">国三</div>
              <p className="text-xs text-slate-500">节能减排大赛</p>
            </div>
          </div>
        </AnimatedSection>

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
