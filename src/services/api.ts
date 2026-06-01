// 风控引擎后端 API 调用层
// 配置：默认指向本地开发服务器，生产环境替换为实际地址

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
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

// ── API 方法 ──

/** 获取完整通过率报告 */
export async function getPassRateReport(days = 7, province?: string): Promise<PassRateReport> {
  const params = new URLSearchParams({ days: String(days) });
  if (province) params.set('province', province);
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate?${params}`);
}

/** 获取整体通过率 */
export async function getOverallPassRate(days = 7, province?: string): Promise<OverallPassRate> {
  const params = new URLSearchParams({ days: String(days) });
  if (province) params.set('province', province);
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/overall?${params}`);
}

/** 获取分省通过率 */
export async function getByProvince(days = 30, minTotal = 50): Promise<ProvincePassRate[]> {
  const params = new URLSearchParams({ days: String(days), min_total: String(minTotal) });
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/by-province?${params}`);
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
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/daily-trend?${params}`);
}

/** 获取各省 vs 标准通过率对比 */
export async function getCompare(days = 7): Promise<CompareItem[]> {
  return fetchJSON(`${API_BASE}/api/v1/monitor/pass-rate/compare?days=${days}`);
}
