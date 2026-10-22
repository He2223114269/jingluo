'use client';

const grades = [
  { g: 'A', q: '≤4%', share: 5, pass: 90, pd: 2, color: '#22d3ee' },
  { g: 'B', q: '4–6%', share: 15, pass: 70, pd: 4, color: '#38bdf8' },
  { g: 'C', q: '6–8%', share: 30, pass: 50, pd: 6, color: '#60a5fa' },
  { g: 'D', q: '8–10%', share: 35, pass: 25, pd: 8, color: '#818cf8' },
  { g: 'E', q: '>10%', share: 15, pass: 2, pd: 12, color: '#f472b6' },
];

export default function GradeComposition() {
  const approved = grades.map((x) => (x.share * x.pass) / 100);
  const rejected = grades.map((x) => x.share - (x.share * x.pass) / 100);
  const totalPass = approved.reduce((a, b) => a + b, 0);
  const totalRej = rejected.reduce((a, b) => a + b, 0);
  const approvedPd = grades.reduce((a, b, i) => a + approved[i] * b.pd, 0) / totalPass;
  const allPd = grades.reduce((a, b) => a + b.share * b.pd, 0) / 100;
  const rejectedPd = (allPd * 100 - approvedPd * totalPass) / totalRej;

  const bars = [
    { t: '全客群', total: 100, vals: grades.map((x) => x.share) },
    { t: '通过客群', total: totalPass, vals: approved },
    { t: '拒绝客群', total: totalRej, vals: rejected },
  ];

  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="text-[11px] text-slate-400 mb-3">筛选前后客群结构：同一批人，通过后 A/B/C 占比上升、D/E 占比下降</div>

      <div className="space-y-4">
        {bars.map((bar) => (
          <div key={bar.t}>
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
              <span className="text-slate-300">{bar.t}</span>
              <span>{bar.t === '全客群' ? '100%' : `${bar.total.toFixed(1)}%`}</span>
            </div>
            <div className="flex h-7 w-full overflow-hidden rounded">
              {bar.vals.map((v, i) => {
                const pct = (v / bar.total) * 100;
                return (
                  <div key={grades[i].g} className="h-full flex items-center justify-center transition-all"
                    style={{ width: `${pct}%`, background: grades[i].color, opacity: bar.t === '全客群' ? 0.55 : 0.8 }}
                    title={`${grades[i].g}: ${pct.toFixed(1)}%`}>
                    {pct > 7 && <span className="text-[9px] text-slate-900 font-medium">{grades[i].g} {pct.toFixed(0)}%</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 明细 */}
      <div className="mt-4 overflow-hidden rounded-lg border border-[#334155]">
        <table className="w-full text-[11px]">
          <thead className="bg-slate-800/60 text-slate-400">
            <tr>
              <th className="text-left px-2 py-1.5 font-medium">等级</th>
              <th className="text-right px-2 py-1.5 font-medium">客群占比</th>
              <th className="text-right px-2 py-1.5 font-medium">通过率</th>
              <th className="text-right px-2 py-1.5 font-medium">逾期率</th>
              <th className="text-right px-2 py-1.5 font-medium">通过贡献</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, i) => (
              <tr key={g.g} className="border-t border-[#334155]/70">
                <td className="px-2 py-1.5 text-slate-200">{g.g} <span className="text-slate-600">{g.q}</span></td>
                <td className="px-2 py-1.5 text-right text-slate-400">{g.share}%</td>
                <td className="px-2 py-1.5 text-right text-slate-300">{g.pass}%</td>
                <td className="px-2 py-1.5 text-right text-slate-300">{g.pd}%</td>
                <td className="px-2 py-1.5 text-right font-mono text-cyan-300/80">{approved[i].toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        通过客群：{totalPass.toFixed(1)}% 的人，逾期率 {approvedPd.toFixed(2)}%；拒绝客群：{totalRej.toFixed(1)}%，逾期率约 {rejectedPd.toFixed(2)}%。
        中间档通过率为示例值，A/E 档为既定方案（90% / 2%）。
      </p>
    </div>
  );
}
