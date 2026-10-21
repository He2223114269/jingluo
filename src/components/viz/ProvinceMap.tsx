'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface Row { name: string; label: string; orders: number; amt: number; first: string }

export default function ProvinceMap({ data, compact = false, height = 420 }: { data: Row[]; compact?: boolean; height?: number }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const echarts = await import('echarts');
      const geo = await fetch('/geo/china.json').then((r) => r.json());
      if (!alive) return;
      echarts.registerMap('china', geo);
      setReady(true);
    })();
    return () => { alive = false; };
  }, []);

  if (!ready) {
    return (
      <div className={compact ? '' : 'bg-[#1e293b] border border-[#334155] rounded-xl p-5'}>
        {!compact && <div className="text-sm font-semibold text-slate-200 mb-3">省份覆盖</div>}
        <div style={{ height }} className="flex items-center justify-center text-sm text-slate-500">地图加载中…</div>
      </div>
    );
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,23,42,0.95)',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
      formatter: (p: { name: string; data?: Row }) => {
        const d = data.find((x) => x.name === p.name);
        if (!d) return `${p.name}<br/>暂无业务`;
        return `${d.label}<br/>单量：${d.orders.toLocaleString()} 单<br/>放款：${d.amt.toFixed(2)} 亿<br/>首单：${d.first}`;
      },
    },
    visualMap: {
      type: 'piecewise',
      left: 8,
      bottom: 8,
      itemWidth: 12,
      itemHeight: 10,
      textStyle: { color: '#94a3b8', fontSize: 10 },
      pieces: [
        { min: 200000, label: '≥ 20 万单', color: '#0e7490' },
        { min: 50000, max: 199999, label: '5–20 万', color: '#0891b2' },
        { min: 10000, max: 49999, label: '1–5 万', color: '#22d3ee' },
        { min: 1000, max: 9999, label: '1 千–1 万', color: '#67e8f9' },
        { min: 1, max: 999, label: '< 1 千', color: '#a5f3fc' },
        { value: 0, label: '无业务', color: '#1e293b' },
      ],
    },
    series: [
      {
        type: 'map',
        map: 'china',
        roam: false,
        zoom: 1.15,
        label: { show: false },
        itemStyle: { borderColor: '#334155', borderWidth: 0.6 },
        emphasis: {
          label: { show: true, color: '#fff', fontSize: 10 },
          itemStyle: { areaColor: '#f59e0b' },
        },
        data: data.map((d) => ({ name: d.name, value: d.orders })),
      },
    ],
  };

  return (
    <div className={compact ? '' : 'bg-[#1e293b] border border-[#334155] rounded-xl p-5'}>
      {!compact && (
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-slate-200">省份覆盖</div>
          <div className="text-[11px] text-slate-500">按单量着色 · 悬停查看金额与首单时间</div>
        </div>
      )}
      <ReactECharts option={option} style={{ height, width: '100%' }} notMerge />
      {!compact && (
        <p className="text-[11px] text-slate-500 mt-1">
          29 省有实际订单；颜色越深单量越大，湖南占 70%。空白省份为尚未放量。
        </p>
      )}
    </div>
  );
}
