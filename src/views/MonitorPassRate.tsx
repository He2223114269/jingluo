'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import KPICard from '@/components/KPICard';
import EChartsWrapper from '@/components/EChartsWrapper';
import { getPassRateReport, getDailyTrend } from '@/services/api';

function usePassRateData() {
  const [data, setData] = useState<any>(null);
  const [trend, setTrend] = useState<any[]>([]);
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

const darkChartTheme = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94a3b8', fontFamily: 'inherit' },
  title: { textStyle: { color: '#f1f5f9' } },
  legend: { textStyle: { color: '#94a3b8' } },
  grid: { containLabel: true },
};

function getTrendChartOption(trend: any[]) {
  return {
    ...darkChartTheme,
    tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['通过率(%)', '申请数'], textStyle: { color: '#94a3b8' }, top: 0 },
    xAxis: { type: 'category', data: trend.map((t: any) => (t['日期'] || '').slice(5)), axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#64748b' } },
    yAxis: [
      { type: 'value', min: 0, axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { color: '#1e293b' } } },
      { type: 'value', splitLine: { show: false } },
    ],
    series: [
      { name: '通过率(%)', type: 'line', data: trend.map((t: any) => t['通过率%']), smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#06b6d4', width: 2 }, itemStyle: { color: '#06b6d4' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(6,182,212,0.15)' }, { offset: 1, color: 'rgba(6,182,212,0)' }] } } },
      { name: '申请数', type: 'bar', yAxisIndex: 1, data: trend.map((t: any) => t['申请数']), itemStyle: { color: '#8b5cf6', borderRadius: [3, 3, 0, 0] }, barWidth: '30%' },
    ],
  };
}

function getProvinceChartOption(data: any[]) {
  return {
    ...darkChartTheme,
    tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    xAxis: { type: 'category', data: data.map((p: any) => (p['省份'] || '').replace(/省|回族自治区|壮族自治区|维吾尔自治区|自治区/g, '')), axisLabel: { rotate: 45 } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { color: '#1e293b' } } },
    grid: { bottom: 80 },
    series: [{
      type: 'bar',
      data: data.map((p: any) => ({ value: p['通过率%'], itemStyle: { color: p['通过率%'] < 50 ? '#ef4444' : p['通过率%'] < 60 ? '#f59e0b' : '#06b6d4', borderRadius: [3, 3, 0, 0] } })),
      barWidth: '50%',
      label: { show: true, position: 'top', color: '#94a3b8', fontSize: 10, formatter: '{c}%' },
    }],
  };
}

function getCompareChartOption(compare: any[]) {
  return {
    ...darkChartTheme,
    tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#e2e8f0' } },
    legend: { data: ['实际通过率(%)', '标准通过率(%)'], top: 0 },
    xAxis: { type: 'category', data: compare.map((p: any) => (p['省份'] || '').replace(/省|回族自治区|壮族自治区|维吾尔自治区|自治区/g, '')), axisLabel: { rotate: 45 } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, splitLine: { lineStyle: { color: '#1e293b' } } },
    grid: { bottom: 80 },
    series: [
      { name: '实际通过率(%)', type: 'bar', data: compare.map((p: any) => ({ value: p['通过率%'], itemStyle: { color: '#06b6d4', borderRadius: [3, 3, 0, 0] } })), barWidth: '30%' },
      { name: '标准通过率(%)', type: 'bar', data: compare.map((p: any) => ({ value: p['标准通过率%'], itemStyle: { color: '#f59e0b', borderRadius: [3, 3, 0, 0] } })), barWidth: '30%' },
    ],
  };
}


export default function MonitorPassRate() {
  const { data, trend, loading, error } = usePassRateData();

  const goBack = () => {
    window.location.hash = 'dashboard';
    window.dispatchEvent(new Event('hashchange'));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-8">
            <button onClick={goBack} className="px-3 py-1.5 rounded-lg bg-[#1e293b] border border-[#334155] text-slate-400 hover:text-slate-200 text-sm transition-all">&larr; 返回概览</button>
            <h1 className="text-2xl font-bold text-slate-100">通过率监控</h1>
            {loading && <span className="text-xs text-slate-500">加载中...</span>}
            {error && <span className="text-xs text-red-400">{error}</span>}
          </div>
        </AnimatedSection>

        {data && (
          <>
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KPICard label="整体通过率" value={data.overall['通过率%']} unit="%" trend={0} status={data.overall['通过率%'] >= 55 ? 'normal' : 'warning'} />
                <KPICard label="申请数" value={data.overall['申请数']} unit="笔" trend={0} status="normal" />
                <KPICard label="异网占比" value={data.overall['异网占比%']} unit="%" trend={0} status={data.overall['异网占比%'] <= 30 ? 'normal' : 'warning'} />
                <KPICard label="新客占比" value={data.overall['新客占比%']} unit="%" trend={0} status="normal" />
              </div>
            </AnimatedSection>

            {trend.length > 0 && (
              <AnimatedSection delay={0.15}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                    <h3 className="text-sm font-medium text-slate-300 mb-3">通过率趋势</h3>
                    <EChartsWrapper option={getTrendChartOption(trend)} height="300px" />
                  </div>
                  {data.by_province.length > 0 && (
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                      <h3 className="text-sm font-medium text-slate-300 mb-3">分省通过率</h3>
                      <EChartsWrapper option={getProvinceChartOption(data.by_province)} height="300px" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            )}

            {data.compare.length > 0 && (
              <AnimatedSection delay={0.2}>
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
                  <h3 className="text-sm font-medium text-slate-300 mb-3">实际 vs 标准通过率</h3>
                  <EChartsWrapper option={getCompareChartOption(data.compare)} height="300px" />
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {(() => {
                      const ok = data.compare.filter((c: any) => String(c['评估']).includes('达标') || String(c['评估']).includes('优秀')).length;
                      const bad = data.compare.filter((c: any) => String(c['评估']).includes('不达标')).length;
                      return (
                        <>
                          <div className="text-center p-3 rounded-lg bg-emerald-400/5 border border-emerald-400/20"><span className="text-emerald-400 text-xl font-bold">{ok}</span><p className="text-xs text-slate-500">达标省市</p></div>
                          <div className="text-center p-3 rounded-lg bg-red-400/5 border border-red-400/20"><span className="text-red-400 text-xl font-bold">{bad}</span><p className="text-xs text-slate-500">不达标省市</p></div>
                          <div className="text-center p-3 rounded-lg bg-slate-400/5 border border-slate-400/20"><span className="text-slate-300 text-xl font-bold">{data.compare.length}</span><p className="text-xs text-slate-500">总省市数</p></div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </>
        )}
      </div>
    </div>
  );
}
