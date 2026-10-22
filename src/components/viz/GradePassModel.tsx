'use client';

type Grade = {
  g: string;
  q: string;
  share: number;   // 客群占比 %
  pass: number;    // 配置通过率 %
  pd: number;      // 该档客群逾期率 %
};

const grades: Grade[] = [
  { g: 'A', q: '≤4%', share: 5, pass: 90, pd: 2 },
  { g: 'B', q: '4–6%', share: 15, pass: 70, pd: 4 },
  { g: 'C', q: '6–8%', share: 30, pass: 50, pd: 6 },
  { g: 'D', q: '8–10%', share: 35, pass: 25, pd: 8 },
  { g: 'E', q: '>10%', share: 15, pass: 2, pd: 12 },
];

export default function GradePassModel() {
  const rows = grades.map((x) => ({
    ...x,
    approved: (x.share * x.pass) / 100,      // 通过贡献（占全客群）
  }));
  const totalPass = rows.reduce((a, b) => a + b.approved, 0);
  const approvedPd = rows.reduce((a, b) => a + b.approved * b.pd, 0) / totalPass;
  const allPd = rows.reduce((a, b) => a + b.share * b.pd, 0) / 100;
  const rejectedPd = (allPd * 100 - approvedPd * totalPass) / (100 - totalPass);

  return (
    <div className="bg-slate-800/40 border border-[#334155] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-slate-400">按质态分档 → 定通过率 → 加权得出通过客群质态</span>
        <span className="text-[10px] text-slate-500">示意口径</span>
      </div>

      {/* 表头 */}
      <div className="grid grid-cols-[40px_1fr_64px_64px_72px] gap-2 text-[10px] text-slate-500 mb-2 px-1">
        <span>等级</span><span>客群占比 / 通过部分</span><span className="text-right">配置通过率</span><span className="text-right">逾期率</span><span className="text-right">通过贡献</span>
      </div>

      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.g} className="grid grid-cols-[40px_1fr_64px_64px_72px] gap-2 items-center">
            <div>
              <span className="text-[12px] font-semibold text-slate-200">{r.g}</span>
              <span className="block text-[9px] text-slate-600">{r.q}</span>
            </div>

            {/* 占比条：实心 = 通过部分，浅色 = 被拒部分 */}
            <div>
              <div className="relative h-3 rounded-full bg-slate-900/60 overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-cyan-400/25" style={{ width: `${r.share}%` }} />
                <div className="absolute inset-y-0 left-0 bg-cyan-400/80" style={{ width: `${r.approved}%` }} />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
                <span>占比 {r.share}%</span>
                <span className="text-cyan-300/80">通过 {r.approved.toFixed(1)}%</span>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-300">{r.pass}%</div>
            <div className="text-right text-[11px] text-slate-300">{r.pd}%</div>
            <div className="text-right text-[11px] font-mono text-cyan-300/80">{r.approved.toFixed(1)}%</div>
          </div>
        ))}
      </div>

      {/* 结果 */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 p-3 text-center">
          <div className="text-xl font-bold text-cyan-300">{totalPass.toFixed(1)}%</div>
          <div className="text-[10px] text-slate-500 mt-1">最终通过率</div>
        </div>
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-3 text-center">
          <div className="text-xl font-bold text-emerald-300">{approvedPd.toFixed(2)}%</div>
          <div className="text-[10px] text-slate-500 mt-1">通过客群逾期率</div>
        </div>
        <div className="rounded-lg border border-[#334155] bg-slate-900/40 p-3 text-center">
          <div className="text-xl font-bold text-slate-300">{allPd.toFixed(2)}%</div>
          <div className="text-[10px] text-slate-500 mt-1">全客群逾期率</div>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
        算法：通过贡献 = 客群占比 × 配置通过率；最终通过率 = Σ 通过贡献；通过客群质态 = Σ(通过贡献 × 该档逾期率) ÷ 最终通过率。
        结果：通过率从全客群 {100}% 收窄到 {totalPass.toFixed(1)}%，通过客群逾期率比全客群低 {(allPd - approvedPd).toFixed(2)}pp，被拒客群逾期率约 {rejectedPd.toFixed(2)}%。
      </p>
      <p className="text-[10px] text-slate-600 mt-1">＊中间档通过率为示例值，用于说明计算关系；实际以各省配置为准。</p>
    </div>
  );
}
