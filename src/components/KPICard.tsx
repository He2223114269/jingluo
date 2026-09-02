'use client';

import { motion } from 'framer-motion';
import CountUp from './CountUp';

interface KPICardProps {
  label: string;
  value: number;
  unit?: string;
  trend?: number;
  prefix?: string;
  decimals?: number;
  status?: 'normal' | 'warning' | 'danger';
}

export default function KPICard({ label, value, unit = '', trend, prefix = '', decimals = 0, status = 'normal' }: KPICardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(6, 182, 212, 0.08)' }}
      transition={{ duration: 0.2 }}
      className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 sm:p-6 flex flex-col gap-3"
    >
      <div className="text-sm text-slate-400 font-medium">{label}</div>
      <div className="flex items-end gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-slate-100">
          <CountUp end={value} decimals={decimals} prefix={prefix} />
        </span>
        {unit && <span className="text-sm text-slate-400 mb-1">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className={`text-xs font-medium flex items-center gap-1 ${
          trend > 0
            ? status === 'danger' ? 'text-red-400' : 'text-emerald-400'
            : trend < 0
            ? status === 'danger' ? 'text-emerald-400' : 'text-red-400'
            : 'text-slate-400'
        }`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            {trend > 0 ? (
              <path d="M6 2L10 7H2L6 2Z"/>
            ) : trend < 0 ? (
              <path d="M6 10L2 5H10L6 10Z"/>
            ) : (
              <path d="M2 6H10" stroke="currentColor" strokeWidth="2"/>
            )}
          </svg>
          {trend > 0 ? '+' : ''}{trend.toFixed(1)}{unit}
        </div>
      )}
    </motion.div>
  );
}
