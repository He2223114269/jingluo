// 风控引擎后端 API 调用层
// 个人简历站默认使用静态兜底数据；配置 NEXT_PUBLIC_API_BASE 后自动切换真实后端。

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';
const HAS_API_BASE = Boolean(API_BASE);

async function fetchJSON<T>(url: string, fallback: T): Promise<T> {
  if (!HAS_API_BASE) return fallback;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.warn('API unavailable, using portfolio fallback data.', error);
    return fallback;
  }
}

// ── 类型定义（使用 Record 兼容中文字段名） ──

/** 整体通过率 */
export type OverallPassRate = Record<string, number>;

/** 分省通过率 */
export type ProvincePassRate = Record<string, number | string>;

/** 各省 vs 标准对比 */
export type CompareItem = Record<string, number | string>;

/** 通过率完整报告 */
export interface PassRateReport {
  generated_at: string;
  query_days: number;
  overall: OverallPassRate;
  by_province: ProvincePassRate[];
  compare: CompareItem[];
}

/** 单日趋势 */
export type TrendItem = Record<string, number | string>;

// ── 静态兜底数据：用于 Vercel / 简历展示场景 ──

const fallbackProvinces: ProvincePassRate[] = [
  { 省份: '湖南省', '通过率%': 62.4 },
  { 省份: '甘肃省', '通过率%': 58.7 },
  { 省份: '江西省', '通过率%': 46.8 },
  { 省份: '广西壮族自治区', '通过率%': 39.6 },
  { 省份: '海南省', '通过率%': 37.2 },
  { 省份: '吉林省', '通过率%': 24.8 },
];

const fallbackCompare: CompareItem[] = [
  { 省份: '湖南省', '通过率%': 62.4, '标准通过率%': 60, 评估: '优秀' },
  { 省份: '甘肃省', '通过率%': 58.7, '标准通过率%': 60, 评估: '优秀' },
  { 省份: '江西省', '通过率%': 46.8, '标准通过率%': 45, 评估: '优秀' },
  { 省份: '广西壮族自治区', '通过率%': 39.6, '标准通过率%': 40, 评估: '优秀' },
  { 省份: '海南省', '通过率%': 37.2, '标准通过率%': 40, 评估: '达标' },
  { 省份: '吉林省', '通过率%': 24.8, '标准通过率%': 25, 评估: '优秀' },
];

function makeFallbackTrend(days = 14): TrendItem[] {
  const base = [51.2, 49.8, 52.4, 50.6, 48.9, 47.5, 46.1, 44.8, 43.6, 42.9, 41.5, 40.7, 39.8, 40.2];
  const volume = [2860, 3024, 2948, 3116, 2982, 2764, 2688, 2810, 2932, 2875, 3018, 2966, 2841, 2917];
  return base.slice(-days).map((rate, index) => {
    const date = new Date(Date.now() - (days - index - 1) * 86400000).toISOString().slice(0, 10);
    return { 日期: date, '通过率%': rate, 申请数: volume[base.length - days + index] ?? 2800 };
  });
}

function makeFallbackReport(days = 7): PassRateReport {
  return {
    generated_at: new Date().toISOString(),
    query_days: days,
    overall: {
      '通过率%': 40.2,
      申请数: 2917,
      '异网占比%': 38.6,
      '新客占比%': 44.1,
    },
    by_province: fallbackProvinces,
    compare: fallbackCompare,
  };
}

// ── API 方法 ──

/** 获取完整通过率报告 */
export async function getPassRateReport(days = 7, province?: string): Promise<PassRateReport> {
  const params = new URLSearchParams({ days: String(days) });
  if (province) params.set('province', province);
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate?${params}`, makeFallbackReport(days));
}

/** 获取整体通过率 */
export async function getOverallPassRate(days = 7, province?: string): Promise<OverallPassRate> {
  const params = new URLSearchParams({ days: String(days) });
  if (province) params.set('province', province);
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/overall?${params}`, makeFallbackReport(days).overall);
}

/** 获取分省通过率 */
export async function getByProvince(days = 30, minTotal = 50): Promise<ProvincePassRate[]> {
  const params = new URLSearchParams({ days: String(days), min_total: String(minTotal) });
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/by-province?${params}`, fallbackProvinces);
}

/** 获取通过率趋势 */
export async function getDailyTrend(
  startDate: string,
  endDate?: string,
  province?: string
): Promise<TrendItem[]> {
  const params = new URLSearchParams({ start_date: startDate });
  if (endDate) params.set('end_date', endDate);
  if (province) params.set('province', province);
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/daily-trend?${params}`, makeFallbackTrend(14));
}

/** 获取各省 vs 标准通过率对比 */
export async function getCompare(days = 7): Promise<CompareItem[]> {
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/compare?days=${days}`, fallbackCompare);
}
