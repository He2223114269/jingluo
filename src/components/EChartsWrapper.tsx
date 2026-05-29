'use client';

import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface EChartsWrapperProps {
  option: Record<string, unknown>;
  height?: string;
  className?: string;
}

export default function EChartsWrapper({ option, height = '300px', className = '' }: EChartsWrapperProps) {
  return (
    <div className={`w-full ${className}`}>
      <ReactECharts
        option={option}
        style={{ height, width: '100%' }}
        opts={{ renderer: 'canvas' }}
        notMerge={true}
      />
    </div>
  );
}
