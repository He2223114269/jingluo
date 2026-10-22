'use client';

type G = { g: string; q: string; share: number; pass: number; pd: number; color: string };

const grades: G[] = [
  { g: 'A', q: '≤4%', share: 5, pass: 90, pd: 2, color: '#22d3ee' },
  { g: 'B', q: '4–6%', share: 15, pass: 70, pd: 4, color: '#38bdf8' },
  { g: 'C', q: '6–8%', share: 30, pass: 50, pd: 6, color: '#60a5fa' },
  { g: 'D', q: '8–10%', share: 35, pass: 25, pd: 8, color: '#818cf8' },
  { g: 'E', q: '>10%', share: 15, pass: 2, pd: 12, color: '#f472b6' },
];

const H = 300;
const Y0 = 10;
const scale = H / 100;

export default function GradeFlowSankey() {
  // 左：按客群占比堆叠
  let ly = Y0;
  const left = grades.map((x) => {
    const shareH = x.share * scale;
    const appH = (x.share * x.pass) / 100 * scale;
    const seg = { ...x, y: ly, h: shareH, appH, rejH: shareH - appH };
    ly += shareH;
    return seg;
  });

  const totalPass = grades.reduce((a, b) => a + (b.share * b.pass) / 100, 0);
  const approvedPd = grades.reduce((a, b) => a + (b.share * b.pass / 100) * b.pd, 0) / totalPass;
  const allPd = grades.reduce((a, b) => a + (b.share * b.pd), 0) / 100;

  // 右：通过 / 拒绝两个节点
  const passH = totalPass * scale;
  const rejH = (100 - totalPass) * scale;
  let py = Y0;
  const rightPass = left.map((s) => { const y = py; py += s.appH; return { ...s, y }; });
  let ry = Y0 + passH + 8;
  const rightRej = left.map((s) => { const y = ry; ry += s.rejH; return { ...s, y }; });

  const X0 = 120, X1 = 270, X2 = 610, X3 = 700;
  const mid = (X1 + X2) / 2;

  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-slate-400">客群 → 通过 / 拒绝：宽度=客群占比，分流=通过率，颜色深浅=该档质态</span>
        <span className="text-[10px] text-slate-500">示意口径</span>
      </div>

      <svg viewBox={`0 0 780 ${H + 60}`} className="w-full h-auto">
        {/* 左侧分级 */}
        {left.map((s) => (
          <g key={`l${s.g}`}>
            <rect x={X0} y={s.y} width={X1 - X0} height={s.h} rx={3} fill={s.color} opacity={0.28} />
            <rect x={X0} y={s.y} width={X1 - X0} height={s.appH} rx={3} fill={s.color} opacity={0.85} />
            <text x={X0 - 8} y={s.y + s.h / 2 - 2} textAnchor="end" fontSize="11" fill="#e2e8f0">{s.g} <tspan fill="#64748b">({s.q})</tspan></text>
            <text x={X0 - 8} y={s.y + s.h / 2 + 10} textAnchor="end" fontSize="9" fill="#94a3b8">占比 {s.share}% · 通过 {s.pass}%</text>
          </g>
        ))}

        {/* 连线：通过 */}
        {rightPass.map((s) => (
          <path
            key={`p${s.g}`}
            d={`M ${X1} ${s.y} C ${mid} ${s.y}, ${mid} ${s.y}, ${X2} ${s.y} L ${X2} ${s.y + s.appH} C ${mid} ${s.y + s.appH}, ${mid} ${s.y + s.appH}, ${X1} ${s.y + s.appH} Z`}
            fill={s.color} opacity={0.35}
          />
        ))}
        {/* 连线：拒绝 */}
        {rightRej.map((r, i) => {
          const s = left[i];
          return (
            <path
              key={`r${r.g}`}
              d={`M ${X1} ${s.y + s.appH} C ${mid} ${s.y + s.appH}, ${mid} ${r.y}, ${X2} ${r.y} L ${X2} ${r.y + r.rejH} C ${mid} ${r.y + r.rejH}, ${mid} ${s.y + s.h}, ${X1} ${s.y + s.h} Z`}
              fill="#64748b" opacity={0.12}
            />
          );
        })}

        {/* 右侧节点 */}
        <rect x={X2} y={Y0} width={X3 - X2} height={passH} rx={4} fill="#22d3ee" opacity={0.25} />
        <text x={X3 + 8} y={Y0 + passH / 2 - 2} fontSize="11" fill="#a5f3fc">通过客群</text>
        <text x={X3 + 8} y={Y0 + passH / 2 + 12} fontSize="10" fill="#94a3b8">{totalPass.toFixed(1)}% · 逾期 {approvedPd.toFixed(2)}%</text>

        <rect x={X2} y={Y0 + passH + 8} width={X3 - X2} height={rejH} rx={4} fill="#64748b" opacity={0.18} />
        <text x={X3 + 8} y={Y0 + passH + 8 + rejH / 2 - 2} fontSize="11" fill="#cbd5e1">拒绝客群</text>
        <text x={X3 + 8} y={Y0 + passH + 8 + rejH / 2 + 12} fontSize="10" fill="#94a3b8">{(100 - totalPass).toFixed(1)}% · 逾期 {(((allPd * 100) - approvedPd * totalPass) / (100 - totalPass)).toFixed(2)}%</text>
      </svg>

      <div className="grid grid-cols-3 gap-2 mt-2">
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
        图中：左侧每档高度=客群占比，深色部分=通过部分（通过率），右侧宽度=通过/拒绝总量；颜色越暖表示该档质态越差。最终通过客群质态按通过量加权。
      </p>
    </div>
  );
}
