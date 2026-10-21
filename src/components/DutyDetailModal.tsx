'use client';

import { useEffect } from 'react';
import { PlatformArchitecture } from '@/components/viz/WorkVisuals';

function Shell({ kicker, title, onClose, children }: { kicker: string; title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[#334155] bg-[#0f172a] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#334155] bg-[#0f172a]/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="text-[11px] text-cyan-400 mb-1">{kicker}</div>
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          </div>
          <button onClick={onClose} aria-label="关闭" className="shrink-0 rounded-md border border-[#334155] px-2.5 py-1 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/60">✕</button>
        </div>
        <div className="px-6 py-5 space-y-5">{children}</div>
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="text-[12px] text-slate-400 leading-relaxed flex gap-2">
          <span className="text-slate-600">•</span><span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Chips({ items, tone = 'cyan' }: { items: string[]; tone?: 'cyan' | 'amber' }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className={`text-[11px] px-2 py-1 rounded border ${tone === 'amber' ? 'border-amber-400/25 bg-amber-400/5 text-amber-200' : 'border-[#334155] bg-slate-800/50 text-slate-300'}`}>{t}</span>
      ))}
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#334155]">
      <table className="w-full text-[12px]">
        <thead className="bg-slate-800/60 text-slate-400">
          <tr>{head.map((h) => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody className="text-slate-300">
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[#334155]/70">
              {r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'text-cyan-300 font-mono' : 'text-slate-400'}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold text-cyan-400 mb-2">{title}</div>
      {children}
    </div>
  );
}

/* ---------- 各类案例专用视图 ---------- */

function CreditModel() {
  const funnel = [['200+', '原始字段'], ['60', '候选特征'], ['20+', '入模特征'], ['1', '评分输出']];
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">目标不是最高 AUC，而是跨月跨省稳定、业务能解释。核心在特征筛选与样本口径。</p>
      <Block title="特征漏斗">
        <div className="space-y-2">
          {funnel.map(([v, k], i) => (
            <div key={k} className="flex items-center gap-3">
              <div className="w-16 text-right text-sm font-semibold text-cyan-300">{v}</div>
              <div className="flex-1 h-8 rounded bg-slate-800/60 border border-[#334155]" style={{ width: `${100 - i * 20}%` }}>
                <div className="h-full rounded bg-cyan-400/10 flex items-center px-3 text-[11px] text-slate-400">{k}</div>
              </div>
            </div>
          ))}
        </div>
      </Block>
      <div className="grid sm:grid-cols-3 gap-3">
        {[['逾期样本', '约 3.4%'], ['不平衡处理', '权重 + 分层采样'], ['验证方式', '时间外 OOT']].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-[#334155] bg-slate-800/40 p-3 text-center">
            <div className="text-[12px] font-semibold text-cyan-300">{v}</div>
            <div className="text-[10px] text-slate-500 mt-1">{k}</div>
          </div>
        ))}
      </div>
      <Block title="建模约束"><Bullets items={['不用未来信息与贷后字段；缺失值单独分箱，不做简单填充。', '按时间切训练 / 验证 / OOT，避免数据穿越；分省、分客群单独验证。', '分数与通过率-Cutoff 表对齐，策略侧可直接使用。']} /></Block>
    </>
  );
}

function ModelEval() {
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">评估看的是“换时间、换省份还成不成立”，不是只看一个总体指标。</p>
      <Block title="三维评估">
        <Table head={['维度', '看什么', '结论用途']} rows={[
          ['训练', 'KS / AUC 拟合', '排除过拟合'],
          ['OOT', '跨时间稳定性', '判断能否上线'],
          ['分群', '省 / 客群 / 渠道', '定位局部失效'],
        ]} />
      </Block>
      <Block title="冠军挑战者">
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {['现网模型', '挑战者模型', '并行评估', '通过客群质态对比', '上线 / 回滚'].map((s, i, a) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-lg border border-[#334155] bg-slate-800/40 px-3 py-1.5 text-slate-300">{s}</span>
              {i < a.length - 1 && <span className="text-slate-600">→</span>}
            </span>
          ))}
        </div>
      </Block>
      <Block title="偏差归因（模拟 vs 实盘）"><Bullets items={['结构效应：客群占比变化带来的差异。', '分支效应：同一批人在两边落到不同分支。', '数据 artifact：映射缺失、编码颠倒、拉黑渠道污染。']} /></Block>
      <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-3 text-[12px] text-slate-300 leading-relaxed">
        实测：定位本网/异网编码颠倒，导致 24/24 分支质态剧变；修复后重建 24 省评估基线。
      </div>
    </>
  );
}

function PassRate() {
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">通过率不是概率，是分数线。调通过率 = 移动阈值，效果取决于客群分值密度。</p>
      <Block title="分数线映射（示意）">
        <svg viewBox="0 0 720 170" className="w-full h-auto">
          <line x1="50" y1="140" x2="700" y2="140" stroke="#475569" />
          <line x1="50" y1="20" x2="50" y2="140" stroke="#475569" />
          <polyline points="60,40 160,55 260,78 360,100 460,118 560,130 660,136" fill="none" stroke="#22d3ee" strokeWidth="2" />
          <text x="55" y="16" fill="#64748b" fontSize="10">分值阈值</text>
          <text x="640" y="158" fill="#64748b" fontSize="10">配置通过率</text>
          <line x1="360" y1="20" x2="360" y2="140" stroke="#f59e0b" strokeDasharray="4 4" />
          <text x="366" y="34" fill="#f59e0b" fontSize="10">当前阈值</text>
        </svg>
        <p className="text-[11px] text-slate-500">通过率越高，阈值越低；同一阈值落到不同客群，实际通过率不同。</p>
      </Block>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-3">
          <div className="text-[12px] font-semibold text-emerald-300 mb-1">上调（优质分支）</div>
          <div className="text-[11px] text-slate-400">质态好、本网/老客占比高 → 降阈值放量</div>
        </div>
        <div className="rounded-lg border border-rose-400/25 bg-rose-400/5 p-3">
          <div className="text-[12px] font-semibold text-rose-300 mb-1">下调（高风险分支）</div>
          <div className="text-[11px] text-slate-400">逾期高、异网/新客集中 → 升阈值压降</div>
        </div>
      </div>
      <Block title="执行顺序"><Chips items={['看分支质态', '定方向', '换算 cutoff', '配置校验', '推送回读', '1–2 周回验']} /></Block>
      <Block title="边界"><Bullets items={['单次 10–20pp，避免来回折腾。', '禁止线性外推：+10pp 不等于通过率 +10pp。', '渠道 / 地市 / 套餐浮动是加法，不是乘法。']} /></Block>
    </>
  );
}

function LossQuota() {
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">先有风险预算，再分配到省与分支；不是先定通过率再看资损。</p>
      <Block title="配额反推（示意）">
        <svg viewBox="0 0 720 180" className="w-full h-auto">
          {[['总目标 9%', 80, 120, '#22d3ee'], ['分支 A–C', 260, 70, '#38bdf8'], ['分支 D–E', 420, 40, '#818cf8'], ['省级配额', 580, 90, '#a78bfa']].map(([t, x, h, c], i) => (
            <g key={t as string}>
              <rect x={x as number} y={150 - (h as number)} width="70" height={h as number} rx="6" fill={c as string} opacity="0.5" />
              <text x={(x as number) + 35} y={165} textAnchor="middle" fill="#94a3b8" fontSize="10">{t}</text>
              {i < 3 && <text x={(x as number) + 78} y="120" fill="#475569" fontSize="12">→</text>}
            </g>
          ))}
        </svg>
        <p className="text-[11px] text-slate-500">按分支历史质态加权，A→E 依次放开；优质分支多给量，高风险分支保留最低配额。</p>
      </Block>
      <Block title="关键口径"><Bullets items={['资损统一用终损预估，不用当期逾期替代。', '分支权重来自历史质态，不拍脑袋。', '配额调整与通过率调整分开评估，避免双变量同时动。']} /></Block>
    </>
  );
}

function Vintage() {
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">Vintage 看同一批订单随时间暴露的风险；终损预测要能解释偏差。</p>
      <Block title="分客群曲线（示意）">
        <svg viewBox="0 0 720 180" className="w-full h-auto">
          <line x1="50" y1="150" x2="700" y2="150" stroke="#475569" />
          <line x1="50" y1="20" x2="50" y2="150" stroke="#475569" />
          {[['公众', '#22d3ee', '60,140 160,110 260,92 360,82 460,76 560,72 660,70'], ['存量VIP', '#38bdf8', '60,145 160,125 260,112 360,104 460,99 560,96 660,94'], ['特批', '#f472b6', '60,142 160,108 260,88 360,76 460,70 560,66 660,64']].map(([n, c, p]) => (
            <g key={n as string}>
              <polyline points={p as string} fill="none" stroke={c as string} strokeWidth="2" />
              <text x="670" y={(p as string).split(' ').slice(-1)[0].split(',')[1]} fill={c as string} fontSize="10">{n}</text>
            </g>
          ))}
          <text x="300" y="170" fill="#64748b" fontSize="10">MOB</text>
        </svg>
      </Block>
      <Block title="四种预测方法">
        <Table head={['方法', '适用', '注意']} rows={[
          ['前 3 期加权', '早期稳定', '受首期波动影响'],
          ['最新账期外推', '趋势明确', '需足够账期'],
          ['加权平均', '成熟批次', '不适用下降期'],
          ['最大已观察 MOB', '到期批次', '与实盘校验偏差'],
        ]} />
      </Block>
      <Block title="必须做的修正"><Bullets items={['客群占比畸变时分层拆分，不用全量曲线外推。', '特批不走策略，单独口径披露，避免拉偏。', '趋势下降期不能用全期平均（会高估）。']} /></Block>
      <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-3 text-[12px] text-slate-300 leading-relaxed">
        特批单 17,168 笔、占湖南 34.9%，未还率 6.63% vs 3.43%，贡献 47.7% 未还本金；剔除后评估差异约 3pp。
      </div>
    </>
  );
}

function Rating() {
  const cells = [
    { q: '低', s: '大', t: '放量 + 优先资源', c: 'emerald' },
    { q: '低', s: '小', t: '观察', c: 'cyan' },
    { q: '高', s: '大', t: '熔断 + 核查', c: 'rose' },
    { q: '高', s: '小', t: '拉灰 / 监管', c: 'amber' },
  ];
  const color = (c: string) => c === 'emerald' ? 'border-emerald-400/30 bg-emerald-400/5 text-emerald-200' : c === 'rose' ? 'border-rose-400/30 bg-rose-400/5 text-rose-200' : c === 'amber' ? 'border-amber-400/30 bg-amber-400/5 text-amber-200' : 'border-cyan-400/25 bg-cyan-400/5 text-cyan-200';
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">评级不是为了排名，而是决定资源与管控：谁能放量、谁要核查、谁要熔断。</p>
      <Block title="质态 × 规模 矩阵">
        <div className="grid grid-cols-2 gap-3">
          {cells.map((c) => (
            <div key={c.t} className={`rounded-lg border p-3 ${color(c.c)}`}>
              <div className="text-[10px] text-slate-500 mb-1">质态 {c.q} · 规模 {c.s}</div>
              <div className="text-[12px] font-semibold">{c.t}</div>
            </div>
          ))}
        </div>
      </Block>
      <Block title="处置链路"><Chips items={['每日扫描', '多维判定', '命中 ≥2 核查', '命中 ≥3 熔断', '处置后跟踪']} /></Block>
      <Block title="硬门槛"><Bullets items={['门店 DPD30+ ≥10% 为内部处置阈值。', '出现集中欺诈特征（营业员集中、套餐单一、极端重复申请）直接进入处置。', '处置后跟踪新增进件与逾期变化，避免误伤。']} /></Block>
    </>
  );
}

function Monitoring() {
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">监控要能回答：哪里变了、为什么变、要不要动。</p>
      <Block title="监控矩阵">
        <Table head={['维度', '指标', '频次']} rows={[
          ['通过率', '分省 / 分支 / 渠道', '每日'],
          ['资损', 'Vintage / 终损 / 目标达标', '每周 / 每月'],
          ['结构', '新老客 / 本异网 / 年龄 / 金额', '每日'],
          ['模型', 'KS / PSI / 分群坏账', '每周'],
          ['门店', '放量 / 逾期集中 / 同人重复', '每日'],
        ]} />
      </Block>
      <Block title="异动归因三步">
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {['配置变更', '体系切换', '结构漂移'].map((s, i, a) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-lg border border-[#334155] bg-slate-800/40 px-3 py-1.5 text-slate-300">{s}</span>
              {i < a.length - 1 && <span className="text-slate-600">→</span>}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-2">先排除口径与配置，再谈策略效果；异常 30 分钟内告警。</p>
      </Block>
    </>
  );
}

function Delivery() {
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">对外数据的关键不是算得快，而是口径说得清、数字对得上。</p>
      <Block title="交付三件套">
        <div className="grid sm:grid-cols-3 gap-3">
          {[['统计汇总', '订单 / 余额 / 多口径逾期'], ['口径说明', '时间窗、客群、分子分母'], ['分资方附表', '逐项可复核']].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-[#334155] bg-slate-800/40 p-3">
              <div className="text-[12px] font-semibold text-slate-200">{t}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </Block>
      <Block title="校验链"><Chips items={['口径卡', '统一取数', '分资方加总 = 总数', '金额分转元', '换路径重算']} /></Block>
      <Block title="易错点"><Bullets items={['金额源单位是分，必须转换并注明。', '每个指标写清含什么、不含什么（利息、罚息）。', '口径有歧义时双口径并列，不选一个藏起来。']} /></Block>
    </>
  );
}

function Platform() {
  return (
    <>
      <p className="text-sm text-slate-300 leading-relaxed">把一次性分析变成可重复运行的系统，才算真正解决问题。</p>
      <Block title="平台分层"><PlatformArchitecture /></Block>
      <Block title="配置治理三件套"><Chips items={['同步 bl→本地', '校验覆盖度与合理性', '推送生产', '回读值与时间字段']} /></Block>
      <Block title="约束"><Bullets items={['配置变更必须可回读、可回滚，不允许 0000 时间字段。', 'SQL 执行前先过守门规则，统计自动留痕。', '一次性脚本不留在根目录，可复用的进索引。']} /></Block>
    </>
  );
}

export default function DutyDetailModal({ title, onClose }: { title: string; onClose: () => void }) {
  const map: Record<string, { kicker: string; body: React.ReactNode }> = {
    '信用评分建模': { kicker: '建模 · 评分', body: <CreditModel /> },
    '模型评估与迭代': { kicker: '建模 · 评估', body: <ModelEval /> },
    '通过率双向调控': { kicker: '决策 · 通过率', body: <PassRate /> },
    '资损目标配额反推': { kicker: '计量 · 资损', body: <LossQuota /> },
    'Vintage / 终损预测': { kicker: '计量 · Vintage', body: <Vintage /> },
    '门店 / 代理商 / 套餐评级': { kicker: '治理 · 评级', body: <Rating /> },
    '多维风险监控': { kicker: '治理 · 监控', body: <Monitoring /> },
    '对外数据交付': { kicker: '交付 · 对外', body: <Delivery /> },
    '工程化平台': { kicker: '工程 · 平台', body: <Platform /> },
  };
  const conf = map[title];
  if (!conf) return null;
  return <Shell kicker={conf.kicker} title={title} onClose={onClose}>{conf.body}</Shell>;
}
