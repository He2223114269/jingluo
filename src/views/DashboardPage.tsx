'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import KPICard from '@/components/KPICard';
import EChartsWrapper from '@/components/EChartsWrapper';
import type { PassRateReport, TrendItem } from '@/services/api';
import { getPassRateReport, getDailyTrend } from '@/services/api';
import { dashboardKPIs, alerts } from '@/data/mock';

const darkChartTheme = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94a3b8', fontFamily: 'inherit' },
  title: { textStyle: { color: '#f1f5f9' } },
  legend: { textStyle: { color: '#94a3b8' } },
  grid: { containLabel: true },
};

// ── 通过率 API 数据 ──

function usePassRateData() {
  const [data, setData] = useState<PassRateReport | null>(null);
  const [trend, setTrend] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        const [report, trendData] = await Promise.all([
          getPassRateReport(7),
          getDailyTrend(
            new Date(Date.now() - 13 * 86400000).toISOString().slice(0, 10),
            new Date().toISOString().slice(0, 10)
          ),
        ]);
        if (!cancelled) { setData(report); setTrend(trendData); }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : '获取通过率数据失败');
      } finally { if (!cancelled) setLoading(false); }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);
  return { data, trend, loading, error };
}

// ── ECharts 图表配置 ──

function getTrendChartOption(trend: TrendItem[]) {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['通过率(%)', '申请数'], top: 0 },
    xAxis: { type: 'category', data: trend.map(t => (t['日期'] || '').slice(5)), axisLabel: { color: '#64748b' } },
    yAxis: [
      { type: 'value', min: 0, axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { color: '#1e293b' } } },
      { type: 'value', splitLine: { show: false } },
    ],
    series: [
      { name: '通过率(%)', type: 'line', data: trend.map(t => t['通过率%']), smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#06b6d4', width: 2 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(6,182,212,0.15)' }, { offset: 1, color: 'rgba(6,182,212,0)' }] } } },
      { name: '申请数', type: 'bar', yAxisIndex: 1, data: trend.map(t => t['申请数']), itemStyle: { color: '#8b5cf6', borderRadius: [3, 3, 0, 0] }, barWidth: '30%' },
    ],
  };
}

function getProvinceChartOption(data: Record<string, number | string>[]) {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    xAxis: { type: 'category', data: data.map(p => (p['省份'] || '').replace(/省|回族自治区|壮族自治区|维吾尔自治区|自治区/g, '')), axisLabel: { rotate: 45 } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { color: '#1e293b' } } },
    grid: { bottom: 80 },
    series: [{
      type: 'bar',
      data: data.map(p => ({ value: p['通过率%'], itemStyle: { color: Number(p['通过率%']) < 50 ? '#ef4444' : Number(p['通过率%']) < 60 ? '#f59e0b' : '#06b6d4', borderRadius: [3, 3, 0, 0] } })),
      barWidth: '50%',
      label: { show: true, position: 'top', color: '#94a3b8', fontSize: 10, formatter: '{c}%' },
    }],
  };
}

function getCompareChartOption(compare: Record<string, number | string>[]) {
  return {
    ...darkChartTheme, tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['实际通过率(%)', '标准通过率(%)'], top: 0 },
    xAxis: { type: 'category', data: compare.map(p => (p['省份'] || '').replace(/省|回族自治区|壮族自治区|维吾尔自治区|自治区/g, '')), axisLabel: { rotate: 45 } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { color: '#1e293b' } } },
    grid: { bottom: 80 },
    series: [
      { name: '实际通过率(%)', type: 'bar', data: compare.map(p => ({ value: p['通过率%'], itemStyle: { color: '#06b6d4', borderRadius: [3, 3, 0, 0] } })), barWidth: '30%' },
      { name: '标准通过率(%)', type: 'bar', data: compare.map(p => ({ value: p['标准通过率%'], itemStyle: { color: '#f59e0b', borderRadius: [3, 3, 0, 0] } })), barWidth: '30%' },
    ],
  };
}

export default function DashboardPage() {
  const { data: passRate, trend, loading: prLoading, error: prError } = usePassRateData();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">监控概览</h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                实时
              </span>
            </div>
            <p className="text-slate-400 text-sm">核心指标概览 — 点击左侧菜单查看详细分析</p>
          </div>
        </AnimatedSection>

        {/* KPI Cards */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardKPIs.map((kpi, i) => (
              <KPICard key={i} label={kpi.label} value={kpi.value} unit={kpi.unit} trend={kpi.trend} decimals={kpi.label === 'KS值' ? 2 : 1} status={kpi.status} />
            ))}
          </div>
        </AnimatedSection>

        {/* 通过率监控 */}
        <AnimatedSection delay={0.15}>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-100">通过率实时数据</h2>
              {prLoading && <span className="text-xs text-slate-500">加载中...</span>}
              {prError && <span className="text-xs text-red-400">{prError}</span>}
              {passRate && <span className="text-xs text-slate-500">近{passRate.query_days}天</span>}
            </div>

            {passRate && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <KPICard label="整体通过率" value={passRate.overall['通过率%']} unit="%" trend={0} status={passRate.overall['通过率%'] >= 55 ? 'normal' : 'warning'} />
                  <KPICard label="申请数" value={passRate.overall['申请数']} unit="笔" trend={0} status="normal" />
                  <KPICard label="异网占比" value={passRate.overall['异网占比%']} unit="%" trend={0} status={passRate.overall['异网占比%'] <= 30 ? 'normal' : 'warning'} />
                  <KPICard label="新客占比" value={passRate.overall['新客占比%']} unit="%" trend={0} status="normal" />
                </div>

                {trend.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                      <h3 className="text-sm font-medium text-slate-300 mb-3">通过率趋势</h3>
                      <EChartsWrapper option={getTrendChartOption(trend)} height="280px" />
                    </div>
                    {passRate.by_province.length > 0 && (
                      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                        <h3 className="text-sm font-medium text-slate-300 mb-3">分省通过率</h3>
                        <EChartsWrapper option={getProvinceChartOption(passRate.by_province)} height="280px" />
                      </div>
                    )}
                  </div>
                )}

                {passRate.compare.length > 0 && (
                  <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                    <h3 className="text-sm font-medium text-slate-300 mb-3">实际 vs 标准通过率</h3>
                    <EChartsWrapper option={getCompareChartOption(passRate.compare)} height="280px" />
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {(() => {
                        const ok = passRate.compare.filter((c: any) => String(c['评估']).includes('达标') || String(c['评估']).includes('优秀')).length;
                        const bad = passRate.compare.filter((c: any) => String(c['评估']).includes('不达标')).length;
                        return (
                          <>
                            <div className="text-center p-3 rounded-lg bg-emerald-400/5 border border-emerald-400/20"><span className="text-emerald-400 text-xl font-bold">{ok}</span><p className="text-xs text-slate-500">达标省市</p></div>
                            <div className="text-center p-3 rounded-lg bg-red-400/5 border border-red-400/20"><span className="text-red-400 text-xl font-bold">{bad}</span><p className="text-xs text-slate-500">不达标省市</p></div>
                            <div className="text-center p-3 rounded-lg bg-slate-400/5 border border-slate-400/20"><span className="text-slate-300 text-xl font-bold">{passRate.compare.length}</span><p className="text-xs text-slate-500">总省市数</p></div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Alerts */}
        <AnimatedSection delay={0.2}>
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">异常提示</h2>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${alert.type === 'danger' ? 'bg-red-400/5 border-red-400/20' : alert.type === 'warning' ? 'bg-amber-400/5 border-amber-400/20' : 'bg-emerald-400/5 border-emerald-400/20'}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === 'danger' ? 'bg-red-400' : alert.type === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <div className="flex-1">
                    <p className={`text-sm ${alert.type === 'danger' ? 'text-red-300' : alert.type === 'warning' ? 'text-amber-300' : 'text-emerald-300'}`}>{alert.message}</p>
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
