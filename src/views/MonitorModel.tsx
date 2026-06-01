'use client';

import AnimatedSection from '@/components/AnimatedSection';
import EChartsWrapper from '@/components/EChartsWrapper';
import { ksCurveData, aucCurveData, psiData, strategyPassRate, riskSegmentBadRate } from '@/data/mock';

const darkChartTheme = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94a3b8', fontFamily: 'inherit' },
  title: { textStyle: { color: '#f1f5f9' } },
  legend: { textStyle: { color: '#94a3b8' } },
  grid: { containLabel: true },
};

function ksOption() {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['Train KS', 'OOT KS'], top: 0 },
    xAxis: { type: 'category', data: ksCurveData.months, axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#64748b' } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1e293b' } }, axisLabel: { color: '#64748b' } },
    series: [
      { name: 'Train KS', type: 'line', data: ksCurveData.train, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#06b6d4', width: 2 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(6,182,212,0.15)' }, { offset: 1, color: 'rgba(6,182,212,0)' }] } } },
      { name: 'OOT KS', type: 'line', data: ksCurveData.oot, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#8b5cf6', width: 2 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(139,92,246,0.1)' }, { offset: 1, color: 'rgba(139,92,246,0)' }] } } },
    ],
  };
}

function aucOption() {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['Train AUC', 'OOT AUC'], top: 0 },
    xAxis: { type: 'category', data: aucCurveData.months, axisLine: { lineStyle: { color: '#334155' } } },
    yAxis: { type: 'value', min: 0.7, splitLine: { lineStyle: { color: '#1e293b' } } },
    series: [
      { name: 'Train AUC', type: 'line', data: aucCurveData.train, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#06b6d4', width: 2 } },
      { name: 'OOT AUC', type: 'line', data: aucCurveData.oot, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#8b5cf6', width: 2 } },
    ],
  };
}

function psiOption() {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['PSI', '阈值'], top: 0 },
    xAxis: { type: 'category', data: psiData.months },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1e293b' } } },
    series: [
      { name: 'PSI', type: 'bar', data: psiData.values.map((v: number) => ({ value: v, itemStyle: { color: v > psiData.threshold ? '#ef4444' : '#06b6d4', borderRadius: [3, 3, 0, 0] } })), barWidth: '40%' },
      { name: '阈值', type: 'line', data: psiData.months.map(() => psiData.threshold), lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' }, symbol: 'none' },
    ],
  };
}

function strategyOption() {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['通过率(%)', '坏账率(%)'], top: 0 },
    xAxis: { type: 'category', data: strategyPassRate.strategies },
    yAxis: [{ type: 'value', splitLine: { lineStyle: { color: '#1e293b' } } }, { type: 'value', splitLine: { show: false } }],
    series: [
      { name: '通过率(%)', type: 'bar', data: strategyPassRate.passRates, itemStyle: { color: '#06b6d4', borderRadius: [3, 3, 0, 0] }, barWidth: '30%' },
      { name: '坏账率(%)', type: 'bar', yAxisIndex: 1, data: strategyPassRate.badRates, itemStyle: { color: '#ef4444', borderRadius: [3, 3, 0, 0] }, barWidth: '30%' },
    ],
  };
}

function riskSegmentOption() {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['坏账率(%)', '占比(%)'], top: 0 },
    xAxis: { type: 'category', data: riskSegmentBadRate.segments },
    yAxis: [{ type: 'value', splitLine: { lineStyle: { color: '#1e293b' } } }, { type: 'value', splitLine: { show: false } }],
    series: [
      { name: '坏账率(%)', type: 'bar', data: riskSegmentBadRate.badRates, itemStyle: { color: (p: any) => ['#10b981','#06b6d4','#f59e0b','#f97316','#ef4444'][p.dataIndex] || '#06b6d4', borderRadius: [3, 3, 0, 0] }, barWidth: '40%' },
      { name: '占比(%)', type: 'line', yAxisIndex: 1, data: riskSegmentBadRate.proportions, smooth: true, lineStyle: { color: '#8b5cf6', width: 2 }, symbol: 'circle', symbolSize: 6 },
    ],
  };
}


export default function MonitorModel() {
  const goBack = () => { window.location.hash = 'dashboard'; window.dispatchEvent(new Event('hashchange')); };
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-8">
            <button onClick={goBack} className="px-3 py-1.5 rounded-lg bg-[#1e293b] border border-[#334155] text-slate-400 hover:text-slate-200 text-sm transition-all">&larr; 返回概览</button>
            <h1 className="text-2xl font-bold text-slate-100">模型监控</h1>
            <span className="text-xs text-slate-500">Mock 数据</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-lg font-semibold text-slate-100 mb-4">模型稳定性</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4"><h3 className="text-sm font-medium text-slate-300 mb-3">KS曲线</h3><EChartsWrapper option={ksOption()} height="260px" /></div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4"><h3 className="text-sm font-medium text-slate-300 mb-3">AUC曲线</h3><EChartsWrapper option={aucOption()} height="260px" /></div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4"><h3 className="text-sm font-medium text-slate-300 mb-3">PSI监控</h3><EChartsWrapper option={psiOption()} height="260px" /></div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="text-lg font-semibold text-slate-100 mb-4">策略分析</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4"><h3 className="text-sm font-medium text-slate-300 mb-3">策略通过率对比</h3><EChartsWrapper option={strategyOption()} height="280px" /></div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4"><h3 className="text-sm font-medium text-slate-300 mb-3">风险分段坏账率</h3><EChartsWrapper option={riskSegmentOption()} height="280px" /></div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
