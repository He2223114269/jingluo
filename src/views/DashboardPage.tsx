'use client';

import { useSyncExternalStore } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import KPICard from '@/components/KPICard';
import EChartsWrapper from '@/components/EChartsWrapper';
import {
  dashboardKPIs,
  ksCurveData,
  aucCurveData,
  psiData,
  strategyPassRate,
  riskSegmentBadRate,
  regionData,
  regionOptimization,
  alerts,
} from '@/data/mock';

const darkChartTheme = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94a3b8', fontFamily: 'inherit' },
  title: { textStyle: { color: '#f1f5f9' } },
  legend: { textStyle: { color: '#94a3b8' } },
  grid: { containLabel: true },
};

function getKsChartOption() {
  return {
    ...darkChartTheme,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    legend: {
      data: ['Train KS', 'OOT KS'],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    xAxis: {
      type: 'category',
      data: ksCurveData.months,
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#1e293b' } },
    },
    series: [
      {
        name: 'Train KS',
        type: 'line',
        data: ksCurveData.train,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#06b6d4', width: 2 },
        itemStyle: { color: '#06b6d4' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(6,182,212,0.15)' }, { offset: 1, color: 'rgba(6,182,212,0)' }] } },
      },
      {
        name: 'OOT KS',
        type: 'line',
        data: ksCurveData.oot,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#8b5cf6', width: 2 },
        itemStyle: { color: '#8b5cf6' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(139,92,246,0.1)' }, { offset: 1, color: 'rgba(139,92,246,0)' }] } },
      },
    ],
  };
}

function getAucChartOption() {
  return {
    ...darkChartTheme,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    legend: {
      data: ['Train AUC', 'OOT AUC'],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    xAxis: {
      type: 'category',
      data: aucCurveData.months,
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      min: 0.7,
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#1e293b' } },
    },
    series: [
      {
        name: 'Train AUC',
        type: 'line',
        data: aucCurveData.train,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#06b6d4', width: 2 },
        itemStyle: { color: '#06b6d4' },
      },
      {
        name: 'OOT AUC',
        type: 'line',
        data: aucCurveData.oot,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#8b5cf6', width: 2 },
        itemStyle: { color: '#8b5cf6' },
      },
    ],
  };
}

function getPsiChartOption() {
  return {
    ...darkChartTheme,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    legend: {
      data: ['PSI', '阈值'],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    xAxis: {
      type: 'category',
      data: psiData.months,
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#1e293b' } },
    },
    series: [
      {
        name: 'PSI',
        type: 'bar',
        data: psiData.values.map((v) => ({
          value: v,
          itemStyle: {
            color: v > psiData.threshold ? '#ef4444' : '#06b6d4',
            borderRadius: [3, 3, 0, 0],
          },
        })),
        barWidth: '40%',
      },
      {
        name: '阈值',
        type: 'line',
        data: psiData.months.map(() => psiData.threshold),
        lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
        itemStyle: { color: '#f59e0b' },
        symbol: 'none',
      },
    ],
  };
}

function getStrategyChartOption() {
  return {
    ...darkChartTheme,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    legend: {
      data: ['通过率(%)', '坏账率(%)'],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    xAxis: {
      type: 'category',
      data: strategyPassRate.strategies,
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: [
      {
        type: 'value',
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: '#1e293b' } },
      },
      {
        type: 'value',
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#64748b', fontSize: 11 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '通过率(%)',
        type: 'bar',
        data: strategyPassRate.passRates,
        itemStyle: { color: '#06b6d4', borderRadius: [3, 3, 0, 0] },
        barWidth: '30%',
      },
      {
        name: '坏账率(%)',
        type: 'bar',
        yAxisIndex: 1,
        data: strategyPassRate.badRates,
        itemStyle: { color: '#ef4444', borderRadius: [3, 3, 0, 0] },
        barWidth: '30%',
      },
    ],
  };
}

function getRiskSegmentChartOption() {
  return {
    ...darkChartTheme,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    legend: {
      data: ['坏账率(%)', '占比(%)'],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    xAxis: {
      type: 'category',
      data: riskSegmentBadRate.segments,
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: [
      {
        type: 'value',
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: '#1e293b' } },
      },
      {
        type: 'value',
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#64748b', fontSize: 11 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '坏账率(%)',
        type: 'bar',
        data: riskSegmentBadRate.badRates,
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const colors = ['#10b981', '#06b6d4', '#f59e0b', '#f97316', '#ef4444'];
            return colors[params.dataIndex] || '#06b6d4';
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: '40%',
      },
      {
        name: '占比(%)',
        type: 'line',
        yAxisIndex: 1,
        data: riskSegmentBadRate.proportions,
        smooth: true,
        lineStyle: { color: '#8b5cf6', width: 2 },
        itemStyle: { color: '#8b5cf6' },
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  };
}

function getRegionChartOption() {
  return {
    ...darkChartTheme,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    xAxis: {
      type: 'category',
      data: regionData.provinces,
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#1e293b' } },
    },
    series: [
      {
        type: 'bar',
        data: regionData.lossRates.map((v) => ({
          value: v,
          itemStyle: {
            color: v > 5 ? '#ef4444' : v > 4.5 ? '#f59e0b' : '#06b6d4',
            borderRadius: [3, 3, 0, 0],
          },
        })),
        barWidth: '50%',
      },
    ],
  };
}

function getRegionOptimizationChartOption() {
  return {
    ...darkChartTheme,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    xAxis: {
      type: 'category',
      data: ['优化前', '优化后'],
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#64748b', fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#1e293b' } },
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: regionOptimization.before, itemStyle: { color: '#ef4444', borderRadius: [3, 3, 0, 0] } },
          { value: regionOptimization.after, itemStyle: { color: '#06b6d4', borderRadius: [3, 3, 0, 0] } },
        ],
        barWidth: '40%',
        label: {
          show: true,
          position: 'top',
          color: '#94a3b8',
          fontSize: 12,
          formatter: '{c}%',
        },
      },
    ],
  };
}

const emptySubscribe = () => () => {};

export default function DashboardPage() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-slate-400 py-20">加载监控面板...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">风控监控面板</h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                实时
              </span>
            </div>
            <p className="text-slate-400 text-sm">风控系统核心指标监控</p>
          </div>
        </AnimatedSection>

        {/* KPI Cards */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardKPIs.map((kpi, i) => (
              <KPICard
                key={i}
                label={kpi.label}
                value={kpi.value}
                unit={kpi.unit}
                trend={kpi.trend}
                decimals={kpi.label === 'KS值' ? 2 : 1}
                status={kpi.status}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Model Monitoring */}
        <AnimatedSection delay={0.15}>
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">模型监控</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-3">KS曲线</h3>
                <EChartsWrapper option={getKsChartOption()} height="260px" />
              </div>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-3">AUC曲线</h3>
                <EChartsWrapper option={getAucChartOption()} height="260px" />
              </div>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-3">PSI监控</h3>
                <EChartsWrapper option={getPsiChartOption()} height="260px" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Strategy Analysis */}
        <AnimatedSection delay={0.2}>
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">策略分析</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-3">策略通过率对比</h3>
                <EChartsWrapper option={getStrategyChartOption()} height="280px" />
              </div>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-3">风险分段坏账率</h3>
                <EChartsWrapper option={getRiskSegmentChartOption()} height="280px" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Region Analysis */}
        <AnimatedSection delay={0.25}>
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">区域分析</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-3">各省资损率对比</h3>
                <EChartsWrapper option={getRegionChartOption()} height="280px" />
              </div>
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-3">
                  {regionOptimization.province}省优化前后对比
                </h3>
                <EChartsWrapper option={getRegionOptimizationChartOption()} height="280px" />
                <div className="mt-3 text-center">
                  <span className="text-xs text-emerald-400">
                    优化后资损率下降 {regionOptimization.improvement}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Alerts */}
        <AnimatedSection delay={0.3}>
          <div>
            <h2 className="text-lg font-semibold text-slate-100 mb-4">异常提示</h2>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${
                    alert.type === 'danger'
                      ? 'bg-red-400/5 border-red-400/20'
                      : alert.type === 'warning'
                      ? 'bg-amber-400/5 border-amber-400/20'
                      : 'bg-emerald-400/5 border-emerald-400/20'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    alert.type === 'danger'
                      ? 'bg-red-400'
                      : alert.type === 'warning'
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm ${
                      alert.type === 'danger'
                        ? 'text-red-300'
                        : alert.type === 'warning'
                        ? 'text-amber-300'
                        : 'text-emerald-300'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
