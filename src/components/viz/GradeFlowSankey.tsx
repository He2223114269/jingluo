'use client';

type G = { g: string; q: string; share: number; pass: number; pd: number; color: string };

const grades: G[] = [
  { g: 'A', q: '≤4%', share: 5, pass: 90, pd: 2, color: '#22d3ee' },
  { g: 'B', q: '4–6%', share: 15, pass: 70, pd: 4, color: '#38bdf8' },
  { g: 'C', q: '6–8%', share: 30, pass: 50, pd: 6, color: '#60a5fa' },
  { g: 'D', q: '8–10%', share: 35, pass: 25, pd: 8, color: '#818cf8' },
  { g: 'E', q: '>10%', share: 15, pass: 2, pd: 12, color: '#f472b6' },
];

const H = 300, Y0 = 34, SCALE = H / 100;

export default function GradeFlowSankey() {
  let ly = Y0;
  const left = grades.map((x) => {
    const shareH = x.share * SCALE;
    const app = (x.share * x.pass) / 100;
    const appH = app * SCALE;
    const seg = { ...x, y: ly, h: shareH, appH, rejH: shareH - appH, app };
    ly += shareH;
    return seg;
  });

  const totalPass = left.reduce((a, b) => a + b.app, 0);
  const approvedPd = left.reduce((a, b) => a + b.app * b.pd, 0) / totalPass;
  const allPd = left.reduce((a, b) => a + b.share * b.pd, 0) / 100;
  const rejectedPd = (allPd * 100 - approvedPd * totalPass) / (100 - totalPass);

  const passH = totalPass * SCALE;
  const rejH = (100 - totalPass) * SCALE;

  let py = Y0;
  const rp = left.map((s) => { const y = py; py += s.appH; return { ...s, y }; });
  const rejTop = Y0 + passH + 26;
  let ry = rejTop;
  const rr = left.map((s) => { const y = ry; ry += s.rejH; return { ...s, y }; });

  const X0 = 110, X1 = 250, X2 = 540, X3 = 680;
  const mid = (X1 + X2) / 2;

  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-slate-400">客群流向：左侧高度=客群占比，深色=通过部分，右侧分段=通过/拒绝客群的来源构成</span>
        <span className="text-[10px] text-slate-500">示意口径</span>
      </div>

      <svg viewBox="0 0 760 370" className="w-full h-auto">
        {/* 右侧标题 */}
        <text x={X2} y={Y0 - 10} fontSize="11" fill="#a5f3fc">通过客群 {totalPass.toFixed(1)}% · 逾期 {approvedPd.toFixed(2)}%</text>
        <text x={X2} y={rejTop - 10} fontSize="11" fill="#cbd5e1">拒绝客群 {(100 - totalPass).toFixed(1)}% · 逾期 {rejectedPd.toFixed(2)}%</text>

        {/* 左侧分段 */}
        {left.map((s) => (
          <g key={`l${s.g}`}>
            <rect x={X0} y={s.y} width={X1 - X0} height={s.h} rx={2} fill={s.color} opacity={0.22} />
            <rect x={X0} y={s.y} width={X1 - X0} height={s.appH} rx={2} fill={s.color} opacity={0.9} />
            <text x={X0 - 8} y={s.y + s.h / 2 - 2} textAnchor="end" fontSize="11" fill="#e2e8f0">{s.g} <tspan fill="#64748b">({s.q})</tspan></text>
            <text x={X0 - 8} y={s.y + s.h / 2 + 10} textAnchor="end" fontSize="9" fill="#94a3b8">占比 {s.share}% · 通过 {s.pass}%</text>
          </g>
        ))}

        {/* 通过流 */}
        {rp.map((s) => (
          <path key={`p${s.g}`}
            d={`M ${X1} ${s.y} C ${mid} ${s.y}, ${mid} ${s.y}, ${X2} ${s.y} L ${X2} ${s.y + s.appH} C ${mid} ${s.y + s.appH}, ${mid} ${s.y + s.appH}, ${X1} ${s.y + s.appH} Z`}
            fill={s.color} opacity={0.45} />
        ))}

        {/* 拒绝流 */}
        {rr.map((r, i) => {
          const s = left[i];
          return (
            <path key={`r${r.g}`}
              d={`M ${X1} ${s.y + s.appH} C ${mid} ${s.y + s.appH}, ${mid} ${r.y}, ${X2} ${r.y} L ${X2} ${r.y + r.rejH} C ${mid} ${r.y + r.rejH}, ${mid} ${s.y + s.h}, ${X1} ${s.y + s.h} Z`}
              fill={s.color} opacity={0.12} />
          );
        })}

        {/* 右侧来源分段（关键：能看出构成） */}
        {rp.map((s) => (
          <g key={`rp${s.g}`}>
            <rect x={X2} y={s.y} width={X3 - X2} height={s.appH} fill={s.color} opacity={0.9} />
            {s.appH > 14 && <text x={(X2 + X3) / 2} y={s.y + s.appH / 2 + 3} textAnchor="middle" fontSize="9" fill="#0f172a">{s.g} {(s.app / totalPass * 100).toFixed(0)}%</text>}
          </g>
        ))}
        {rr.map((s) => (
          <g key={`rr${s.g}`}>
            <rect x={X2} y={s.y} width={X3 - X2} height={s.rejH} fill={s.color} opacity={0.35} />
            {s.rejH > 14 && <text x={(X2 + X3) / 2} y={s.y + s.rejH / 2 + 3} textAnchor="middle" fontSize="9" fill="#0f172a">{s.g} {(s.rejH / (H - passH) * 100).toFixed(0)}%</text>}
          </g>
        ))}
      </svg>

      {/* 图例 */}
      <div className="flex flex-wrap gap-3 mt-1">
        {grades.map((g) => (
          <span key={g.g} className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: g.color }} />
            {g.g} {g.q} · 逾期 {g.pd}%
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 p-2.5 text-center">
          <div className="text-base font-bold text-cyan-300">{totalPass.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-500">最终通过率</div>
        </div>
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-2.5 text-center">
          <div className="text-base font-bold text-emerald-300">{approvedPd.toFixed(2)}%</div>
          <div className="text-[10px] text-slate-500">通过客群逾期率</div>
        </div>
        <div className="rounded-lg border border-[#334155] bg-slate-900/40 p-2.5 text-center">
          <div className="text-base font-bold text-slate-300">{allPd.toFixed(2)}%</div>
          <div className="text-[10px] text-slate-500">全客群逾期率</div>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
        读法：左侧每档高度=该档客群占比；深色=通过部分（比例即配置通过率）；右侧上块为通过客群、下块为拒绝客群，分段颜色显示来源；最右侧数字为各档在对应客群中的占比。
        中间档通过率为示例值，A/E 档为既定方案（90% / 2%）。
      </p>
    </div>
  );
}
