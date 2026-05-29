'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

interface RiskInput {
  age: number;
  income: number;
  hasOverdue: boolean;
  deviceRisk: 'low' | 'medium' | 'high';
}

interface RiskOutput {
  score: number;
  decision: '通过' | '拒绝' | '人工复审';
  reasons: string[];
  strategy: string;
}

function calculateRisk(input: RiskInput): RiskOutput {
  let score = 70; // Base score
  const reasons: string[] = [];

  // Age factor
  if (input.age < 22) {
    score -= 10;
    reasons.push('年龄偏小');
  } else if (input.age > 55) {
    score -= 8;
    reasons.push('年龄偏大');
  } else if (input.age >= 28 && input.age <= 45) {
    score += 5;
  }

  // Income factor
  if (input.income < 3000) {
    score -= 15;
    reasons.push('收入较低');
  } else if (input.income < 5000) {
    score -= 8;
    reasons.push('收入一般');
  } else if (input.income >= 10000) {
    score += 10;
  } else if (input.income >= 8000) {
    score += 5;
  }

  // Overdue factor (heavily weighted)
  if (input.hasOverdue) {
    score -= 25;
    reasons.push('逾期记录');
  }

  // Device risk factor
  if (input.deviceRisk === 'high') {
    score -= 20;
    reasons.push('设备风险高');
  } else if (input.deviceRisk === 'medium') {
    score -= 8;
    reasons.push('设备风险中等');
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Decision logic
  let decision: RiskOutput['decision'];
  let strategy: string;

  if (score >= 60) {
    decision = '通过';
    strategy = '自动通过，标准额度';
  } else if (score >= 40) {
    decision = '人工复审';
    strategy = '转人工复审，降低额度';
  } else {
    decision = '拒绝';
    strategy = '直接拒绝，建议30天后重新申请';
  }

  if (reasons.length === 0) {
    reasons.push('各项指标正常');
  }

  return { score, decision, reasons, strategy };
}

export default function DemoPage() {
  const [input, setInput] = useState<RiskInput>({
    age: 30,
    income: 8000,
    hasOverdue: false,
    deviceRisk: 'low',
  });

  const [output, setOutput] = useState<RiskOutput | null>(null);
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = () => {
    setCalculating(true);
    setOutput(null);
    setTimeout(() => {
      const result = calculateRisk(input);
      setOutput(result);
      setCalculating(false);
    }, 800);
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return '#10b981';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getDecisionStyle = (decision: string) => {
    if (decision === '通过') return 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400';
    if (decision === '人工复审') return 'bg-amber-400/10 border-amber-400/30 text-amber-400';
    return 'bg-red-400/10 border-red-400/30 text-red-400';
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">风险模拟器</h1>
            <p className="text-lg text-slate-400">输入用户信息，模拟风控评分与决策</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <AnimatedSection delay={0.1}>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <h2 className="text-base font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-cyan-400">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM8 3a1 1 0 110 2 1 1 0 010-2zM7 6h2v5H7V6z" fill="currentColor"/>
                </svg>
                输入参数
              </h2>

              <div className="space-y-5">
                {/* Age */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    年龄：<span className="text-slate-200 font-medium">{input.age}岁</span>
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={input.age}
                    onChange={(e) => setInput({ ...input, age: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>18</span>
                    <span>65</span>
                  </div>
                </div>

                {/* Income */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    月收入：<span className="text-slate-200 font-medium">{input.income.toLocaleString()}元</span>
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="30000"
                    step="500"
                    value={input.income}
                    onChange={(e) => setInput({ ...input, income: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1,000</span>
                    <span>30,000</span>
                  </div>
                </div>

                {/* Overdue */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">是否有逾期记录</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setInput({ ...input, hasOverdue: false })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                        !input.hasOverdue
                          ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
                          : 'bg-slate-800 border-[#334155] text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      无逾期
                    </button>
                    <button
                      onClick={() => setInput({ ...input, hasOverdue: true })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                        input.hasOverdue
                          ? 'bg-red-400/10 border-red-400/30 text-red-400'
                          : 'bg-slate-800 border-[#334155] text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      有逾期
                    </button>
                  </div>
                </div>

                {/* Device Risk */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">设备风险等级</label>
                  <div className="flex gap-3">
                    {(['low', 'medium', 'high'] as const).map((level) => {
                      const labels = { low: '低', medium: '中', high: '高' };
                      const colors = {
                        low: input.deviceRisk === 'low' ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400' : 'bg-slate-800 border-[#334155] text-slate-400',
                        medium: input.deviceRisk === 'medium' ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-slate-800 border-[#334155] text-slate-400',
                        high: input.deviceRisk === 'high' ? 'bg-red-400/10 border-red-400/30 text-red-400' : 'bg-slate-800 border-[#334155] text-slate-400',
                      };
                      return (
                        <button
                          key={level}
                          onClick={() => setInput({ ...input, deviceRisk: level })}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${colors[level]}`}
                        >
                          {labels[level]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                disabled={calculating}
                className="w-full mt-6 py-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {calculating ? '计算中...' : '开始评估'}
              </button>
            </div>
          </AnimatedSection>

          {/* Output Panel */}
          <AnimatedSection delay={0.2}>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <h2 className="text-base font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-cyan-400">
                  <path d="M8 1L2 5v6l6 4 6-4V5L8 1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                评估结果
              </h2>

              <AnimatePresence mode="wait">
                {output ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Score */}
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-center w-32 h-32">
                        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="52" fill="none" stroke="#334155" strokeWidth="8" />
                          <circle
                            cx="60" cy="60" r="52"
                            fill="none"
                            stroke={getScoreColor(output.score)}
                            strokeWidth="8"
                            strokeDasharray={`${(output.score / 100) * 327} 327`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold" style={{ color: getScoreColor(output.score) }}>
                            {output.score}
                          </span>
                          <span className="text-xs text-slate-500">风险评分</span>
                        </div>
                      </div>
                    </div>

                    {/* Decision */}
                    <div className="text-center">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border ${getDecisionStyle(output.decision)}`}>
                        {output.decision}
                      </span>
                    </div>

                    {/* Strategy */}
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-xs text-slate-500 mb-1">风控策略</div>
                      <div className="text-sm text-slate-300">{output.strategy}</div>
                    </div>

                    {/* Risk Explanation */}
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-xs text-slate-500 mb-2">风险原因分析</div>
                      <div className="space-y-2">
                        {output.reasons.map((reason, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              reason.includes('逾期') ? 'bg-red-400' :
                              reason.includes('收入') ? 'bg-amber-400' :
                              reason.includes('设备') ? 'bg-amber-400' :
                              reason.includes('年龄') ? 'bg-amber-400' :
                              'bg-emerald-400'
                            }`} />
                            <span className="text-sm text-slate-300">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explanation Module */}
                    <div className="border border-cyan-400/20 bg-cyan-400/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-cyan-400 text-sm">👉</span>
                        <span className="text-xs font-medium text-cyan-400">解释模块</span>
                      </div>
                      <p className="text-sm text-slate-300">
                        {output.score < 40
                          ? `高风险原因：${output.reasons.filter(r => r !== '各项指标正常').join(' + ')}。综合评分过低，建议拒绝。`
                          : output.score < 60
                          ? `中等风险原因：${output.reasons.filter(r => r !== '各项指标正常').join(' + ')}。建议人工复审并降低额度。`
                          : '风险可控，各项指标在可接受范围内，建议自动通过。'
                        }
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-slate-500"
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" className="mb-4 opacity-30">
                      <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M24 20v8M20 24h8" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p className="text-sm">输入参数后点击评估</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
