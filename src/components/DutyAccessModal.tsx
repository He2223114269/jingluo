'use client';

import { useEffect } from 'react';

function Node({ x, y, w, h, title, sub, tone = 'normal' }: { x: number; y: number; w: number; h: number; title: string; sub?: string; tone?: 'normal' | 'accent' | 'muted' }) {
  const fill = tone === 'accent' ? 'rgba(34,211,238,0.12)' : tone === 'muted' ? 'rgba(30,41,59,0.6)' : 'rgba(30,41,59,0.9)';
  const stroke = tone === 'accent' ? '#22d3ee' : '#334155';
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={fill} stroke={stroke} strokeWidth={1} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2 + 4)} textAnchor="middle" fontSize="11" fill={tone === 'accent' ? '#a5f3fc' : '#e2e8f0'}>{title}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="9" fill="#64748b">{sub}</text>}
    </g>
  );
}

export default function DutyAccessModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="准入规则与策略树">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[#334155] bg-[#0f172a] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#334155] bg-[#0f172a]/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="text-[11px] text-cyan-400 mb-1">决策流程 · 准入</div>
            <h3 className="text-lg font-semibold text-slate-100">准入规则与策略树</h3>
          </div>
          <button onClick={onClose} aria-label="关闭" className="shrink-0 rounded-md border border-[#334155] px-2.5 py-1 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/60">✕</button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            准入是一条三层漏斗：<span className="text-cyan-300">先分客群</span>，再按渠道与运营商切分，最后用行为与外部评分定阈值。
            每个叶子节点落到一个 <span className="text-cyan-300">score_code</span>（如 2511-0xx），配置表与线上策略一一对应。
          </p>

          {/* 决策树 */}
          <div className="rounded-xl border border-[#334155] bg-slate-900/40 p-4">
            <div className="text-xs font-semibold text-cyan-400 mb-3">决策路径</div>
            <svg viewBox="0 0 760 300" className="w-full h-auto">
              <Node x={310} y={10} w={140} h={40} title="提交授信申请" tone="accent" />
              <line x1="380" y1="50" x2="380" y2="72" stroke="#475569" />
              <Node x={300} y={72} w={160} h={40} title="L1 客群分层" sub="公众 / 存量VIP / VIP" />
              {[80, 300, 520].map((x, i) => (
                <g key={x}>
                  <line x1="380" y1="112" x2="380" y2="128" stroke="#475569" />
                  <line x1="380" y1="128" x2={x + 70} y2="128" stroke="#475569" />
                  <line x1={x + 70} y1="128" x2={x + 70} y2="142" stroke="#475569" />
                  <Node x={x} y={142} w={140} h={40} title={['公众分支', '存量 VIP 分支', 'VIP 分支'][i]} sub="独立阈值与配额" />
                </g>
              ))}
              {[80, 300, 520].map((x) => (
                <g key={`c${x}`}>
                  <line x1={x + 70} y1="182" x2={x + 70} y2="198" stroke="#475569" />
                  <Node x={x - 10} y={198} w={160} h={40} title="L2 渠道 × 运营商" sub="等级 × 本网/异网" />
                </g>
              ))}
              {[80, 300, 520].map((x) => (
                <g key={`d${x}`}>
                  <line x1={x + 70} y1="238" x2={x + 70} y2="254" stroke="#475569" />
                  <Node x={x - 10} y={254} w={160} h={40} title="L3 行为 + 外部评分" sub="→ score_code" tone="accent" />
                </g>
              ))}
            </svg>
            <p className="text-[11px] text-slate-500 mt-2">
              三层都通过才会进入审批链；任一层不满足则落到对应拒绝或降档分支。
            </p>
          </div>

          {/* 规则表 */}
          <div>
            <div className="text-xs font-semibold text-cyan-400 mb-2">规则构成</div>
            <div className="overflow-hidden rounded-lg border border-[#334155]">
              <table className="w-full text-[12px]">
                <thead className="bg-slate-800/60 text-slate-400">
                  <tr><th className="text-left px-3 py-2 font-medium">代号</th><th className="text-left px-3 py-2 font-medium">维度</th><th className="text-left px-3 py-2 font-medium">作用</th></tr>
                </thead>
                <tbody className="text-slate-300">
                  {[
                    ['R1', '客群', '决定走哪条分支与初始配额'],
                    ['R2', '渠道等级', '低等级渠道收紧阈值，高等级适度放开'],
                    ['R3', '运营商', '本网 / 异网分别设阈，异网更严'],
                    ['R4', '行为', '在网时长、历史授信表现、重复申请'],
                    ['R5', '外部评分', '作为动态阈值输入；缺失时走中性化'],
                  ].map((r) => (
                    <tr key={r[0]} className="border-t border-[#334155]/70">
                      <td className="px-3 py-2 font-mono text-cyan-300">{r[0]}</td>
                      <td className="px-3 py-2">{r[1]}</td>
                      <td className="px-3 py-2 text-slate-400">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 审批链 */}
          <div>
            <div className="text-xs font-semibold text-cyan-400 mb-2">审批链与兜底</div>
            <div className="flex flex-wrap items-center gap-2 text-[12px]">
              {['初审（策略树）', '复审（高风险 / 捞回）', '授信', '放款'].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-lg border border-[#334155] bg-slate-800/40 px-3 py-1.5 text-slate-300">{s}</span>
                  {i < arr.length - 1 && <span className="text-slate-600">→</span>}
                </span>
              ))}
            </div>
            <ul className="mt-3 space-y-1.5 text-[12px] text-slate-400 leading-relaxed">
              <li>• 分支缺失：兜底到 E 档，不默认放行。</li>
              <li>• 外部数据不可用：不硬拒，改用内部特征重建阈值（中性化约等于 −1）。</li>
              <li>• 复审捞回：初审拒绝原因与捞回结果交叉复盘，减少无效拒量。</li>
            </ul>
          </div>

          <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-3 text-[12px] text-slate-300 leading-relaxed">
            结果：3 层 20+ 节点策略树；24 省接入后配置与线上一致；初审拒绝原因 × 捞回分析使无效拒量下降约 15%。
          </div>
        </div>
      </div>
    </div>
  );
}
