'use client';

import { useMemo, useState } from 'react';

type Base = { g: string; q: string; share: number; passRate: number; pd: number; color: string };

const BASE: Base[] = [
  { g: 'A', q: '≤4%', share: 5, passRate: 90, pd: 2, color: '#22d3ee' },
  { g: 'B', q: '4–6%', share: 15, passRate: 70, pd: 4, color: '#38bdf8' },
  { g: 'C', q: '6–8%', share: 30, passRate: 50, pd: 6, color: '#60a5fa' },
  { g: 'D', q: '8–10%', share: 35, passRate: 25, pd: 8, color: '#818cf8' },
  { g: 'E', q: '>10%', share: 15, passRate: 2, pd: 12, color: '#f472b6' },
];

const H = 280, Y0 = 34, SCALE = H / 100;

export default function GradeFlowSankey() {
  const [state, setState] = useState(() => BASE.map((b) => ({ share: b.share, passRate: b.passRate })));
  const [open, setOpen] = useState(false);
  const sumShare = state.reduce((a, b) => a + b.share, 0) || 1;

  const calc = useMemo(() => {
    const rows = BASE.map((b, i) => {
      const share = (state[i].share / sumShare) * 100;
      const pass = state[i].passRate;
      return { ...b, share, pass, app: (share * pass) / 100 };
    });
    const totalPass = rows.reduce((a, b) => a + b.app, 0);
    const approvedPd = rows.reduce((a, b) => a + b.app * b.pd, 0) / (totalPass || 1);
    const allPd = rows.reduce((a, b) => a + b.share * b.pd, 0) / 100;
    const rejectedPd = ((allPd * 100) - approvedPd * totalPass) / (100 - totalPass || 1);
    return { rows, totalPass, approvedPd, allPd, rejectedPd };
  }, [state, sumShare]);

  const { rows, totalPass, approvedPd, allPd, rejectedPd } = calc;

  // 左侧堆叠
  let ly = Y0;
  const left = rows.map((r) => {
    const h = r.share * SCALE;
    const appH = r.app * SCALE;
    const seg = { ...r, y: ly, h, appH, rejH: h - appH };
    ly += h;
    return seg;
  });

  const passH = totalPass * SCALE;
  const rejTop = Y0 + passH + 26;
  let py = Y0;
  const rp = [...left].sort((a, b) => b.app - a.app).map((s) => { const y = py; py += s.appH; return { ...s, y }; });
  const passSlot = new Map(rp.map((s) => [s.g, s]));
  let ry = rejTop;
  const rr = left.map((s) => { const y = ry; ry += s.rejH; return { ...s, y }; });

  const X0 = 100, X1 = 230, X2 = 480, X3 = 600;
  const mid = (X1 + X2) / 2;

  const update = (i: number, key: 'share' | 'passRate', v: number) => {
    setState((prev) => prev.map((s, j) => (j === i ? { ...s, [key]: v } : s)));
  };

  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[11px] text-slate-400">客群流向与通过结构</span>
        <div className="flex items-center gap-2">
          {open && (
            <button onClick={() => setState(BASE.map((b) => ({ share: b.share, passRate: b.passRate })))}
              className="text-[10px] px-2 py-1 rounded border border-[#334155] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60">重置</button>
          )}
          <button onClick={() => setOpen(!open)}
            className="text-[10px] px-2 py-1 rounded border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10">
            {open ? '收起参数 ▲' : '调整参数 ▾'}
          </button>
        </div>
      </div>

      <div>
        {/* 图 */}
        <div>
          <svg viewBox="0 0 640 360" className="w-full h-auto">
            <text x={X2} y={Y0 - 10} fontSize="10" fill="#a5f3fc">通过 {totalPass.toFixed(1)}% · 逾期 {approvedPd.toFixed(2)}%</text>
            <text x={X2} y={rejTop - 10} fontSize="10" fill="#cbd5e1">拒绝 {(100 - totalPass).toFixed(1)}% · 逾期 {rejectedPd.toFixed(2)}%</text>

            {left.map((s) => (
              <g key={s.g}>
                <rect x={X0} y={s.y} width={X1 - X0} height={s.h} rx={2} fill={s.color} opacity={0.2} />
                <rect x={X0} y={s.y} width={X1 - X0} height={s.appH} rx={2} fill={s.color} opacity={0.9} />
                <text x={X0 - 6} y={s.y + s.h / 2 - 1} textAnchor="end" fontSize="10" fill="#e2e8f0">{s.g}</text>
                <text x={X0 - 6} y={s.y + s.h / 2 + 9} textAnchor="end" fontSize="8" fill="#94a3b8">{s.share.toFixed(0)}% / {s.passRate}%</text>
              </g>
            ))}

            {left.map((s) => {
              const t = passSlot.get(s.g)!;
              return <path key={`p${s.g}`} d={`M ${X1} ${s.y} C ${mid} ${s.y}, ${mid} ${t.y}, ${X2} ${t.y} L ${X2} ${t.y + t.appH} C ${mid} ${t.y + t.appH}, ${mid} ${s.y + s.appH}, ${X1} ${s.y + s.appH} Z`} fill={s.color} opacity={0.45} />;
            })}
            {rr.map((r, i) => {
              const s = left[i];
              return <path key={`r${r.g}`} d={`M ${X1} ${s.y + s.appH} C ${mid} ${s.y + s.appH}, ${mid} ${r.y}, ${X2} ${r.y} L ${X2} ${r.y + r.rejH} C ${mid} ${r.y + r.rejH}, ${mid} ${s.y + s.h}, ${X1} ${s.y + s.h} Z`} fill={s.color} opacity={0.12} />;
            })}

            {rp.map((s) => (
              <g key={`rp${s.g}`}>
                <rect x={X2} y={s.y} width={X3 - X2} height={s.appH} fill={s.color} opacity={0.9} />
                {s.appH > 12 && <text x={(X2 + X3) / 2} y={s.y + s.appH / 2 + 3} textAnchor="middle" fontSize="8" fill="#0f172a">{s.g} {(s.app / totalPass * 100).toFixed(0)}%</text>}
              </g>
            ))}
            {rr.map((s) => (
              <g key={`rr${s.g}`}>
                <rect x={X2} y={s.y} width={X3 - X2} height={s.rejH} fill={s.color} opacity={0.35} />
                {s.rejH > 12 && <text x={(X2 + X3) / 2} y={s.y + s.rejH / 2 + 3} textAnchor="middle" fontSize="8" fill="#0f172a">{s.g} {(s.rejH / (H - passH) * 100).toFixed(0)}%</text>}
              </g>
            ))}
          </svg>
        </div>

        {/* 控制：默认收起 */}
        {open && (
        <div className="mt-3 grid sm:grid-cols-2 gap-2">
          {BASE.map((b, i) => (
            <div key={b.g} className="rounded-lg border border-[#334155] bg-slate-900/30 p-2.5">
              <div className="flex items-center justify-between text-[10px] mb-1.5">
                <span className="text-slate-300"><span className="font-semibold">{b.g}</span> <span className="text-slate-600">{b.q} · 逾期 {b.pd}%</span></span>
                <span className="text-slate-500">占比 {rows[i].share.toFixed(0)}% · 通过 {state[i].passRate}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="text-[9px] text-slate-600">客群占比</span>
                  <input type="range" min={0} max={60} step={1} value={state[i].share}
                    onChange={(e) => update(i, 'share', Number(e.target.value))}
                    className="w-full accent-cyan-400" />
                </label>
                <label className="block">
                  <span className="text-[9px] text-slate-600">配置通过率</span>
                  <input type="range" min={0} max={100} step={1} value={state[i].passRate}
                    onChange={(e) => update(i, 'passRate', Number(e.target.value))}
                    className="w-full accent-cyan-400" />
                </label>
              </div>
            </div>
          ))}
          <p className="text-[9px] text-slate-600 leading-relaxed sm:col-span-2">占比总和自动归一为 100%；右侧通过客群按贡献从大到小排列。A/E 的初始通过率为既定方案，中间档为示例。</p>
        </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 p-2 text-center">
          <div className="text-sm font-bold text-cyan-300">{totalPass.toFixed(1)}%</div>
          <div className="text-[9px] text-slate-500">最终通过率</div>
        </div>
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-2 text-center">
          <div className="text-sm font-bold text-emerald-300">{approvedPd.toFixed(2)}%</div>
          <div className="text-[9px] text-slate-500">通过客群逾期率</div>
        </div>
        <div className="rounded-lg border border-[#334155] bg-slate-900/40 p-2 text-center">
          <div className="text-sm font-bold text-slate-300">{allPd.toFixed(2)}%</div>
          <div className="text-[9px] text-slate-500">全客群逾期率</div>
        </div>
      </div>
    </div>
  );
}
