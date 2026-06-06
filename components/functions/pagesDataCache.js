import fs from 'fs';
import path from 'path';
import { API_BASE, API_AUTH, CACHE_TTL } from '@/components/functions/apiConfig';

export { API_BASE, API_AUTH, CACHE_TTL, PREDICTION_ENDPOINTS } from '@/components/functions/apiConfig';

const PAGES_CACHE_DIR = path.join(process.cwd(), 'public', 'cache', 'pages-data');

function ensureCacheDir() {
  if (!fs.existsSync(PAGES_CACHE_DIR)) {
    fs.mkdirSync(PAGES_CACHE_DIR, { recursive: true });
  }
}

function cachePathFor(cacheKey, fetchDate) {
  return path.join(PAGES_CACHE_DIR, `${cacheKey}_${fetchDate}.json`);
}

function readFreshCache(filePath, ttlMs) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const cache = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const age = Date.now() - new Date(cache.generatedAt).getTime();
    if (age <= ttlMs) return cache;
    fs.unlinkSync(filePath);
  } catch {
    // corrupt or unreadable cache
  }
  return null;
}

function readStaleCache(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function writeCache(filePath, payload) {
  ensureCacheDir();
  const json = JSON.stringify(payload, null, 2);
  const tmp = `${filePath}.tmp.${Date.now()}`;
  fs.writeFileSync(tmp, json);
  fs.renameSync(tmp, filePath);
}

async function fetchFromApi(url) {
  const res = await fetch(url, {
    headers: { Authorization: API_AUTH },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * Fetch fixtures with disk cache. Returns { fixtures, ...extra } from cache on hit,
 * or fetches from API on miss. Falls back to stale cache on API error.
 */
export async function fetchCachedFixtures({
  cacheKey,
  fetchDate,
  endpoint,
  ttlMs = CACHE_TTL.TODAY,
  logLabel = cacheKey,
  queryParams = {},
}) {
  const filePath = cachePathFor(cacheKey, fetchDate);
  let fixtures = [];

  try {
    const cached = readFreshCache(filePath, ttlMs);
    if (cached) {
      return { fixtures: cached.data || [], ...pickExtra(cached) };
    }

    const params = new URLSearchParams({ fixture_date: fetchDate, ...queryParams });
    const url = `${API_BASE}/${endpoint}?${params}`;
    const data = await fetchFromApi(url);

    if (data.status === true && Array.isArray(data.data)) {
      fixtures = data.data;
      writeCache(filePath, {
        generatedAt: new Date().toISOString(),
        fixtureDate: fetchDate,
        data: fixtures,
        count: fixtures.length,
        totalCount: data.total ?? fixtures.length,
      });
    }
  } catch (err) {
    console.error(`[${logLabel}] fetchCachedFixtures error:`, err.message);
    const stale = readStaleCache(filePath);
    if (stale?.data) {
      fixtures = stale.data;
    }
  }

  return { fixtures, totalCount: fixtures.length };
}

/**
 * First batch for paginated today's predictions list (SSR initial load).
 */
export async function fetchCachedPaginatedFixtures({
  cacheKey = 'todays_predictions',
  fetchDate,
  ttlMs = CACHE_TTL.TODAY,
  logLabel = 'todays-predictions',
  startIndex = 0,
  endIndex = 19,
}) {
  const filePath = cachePathFor(cacheKey, fetchDate);
  const baseUrl = `${API_BASE}/fetch_all_matches_fixtures_no_limit?fixture_date=${fetchDate}`;

  let initialData = [];
  let totalCount = 0;
  let endpointStatus = 'success';
  let error = null;

  try {
    const cached = readFreshCache(filePath, ttlMs);
    if (cached) {
      return {
        initialData: cached.data || [],
        totalCount: cached.totalCount || 0,
        endpointStatus: 'success',
        error: null,
        baseUrl,
      };
    }

    const url = `${baseUrl}&start_index=${startIndex}&end_index=${endIndex}`;
    const data = await fetchFromApi(url);

    if (data.status === true && Array.isArray(data.data)) {
      initialData = data.data;
      totalCount = data.total || initialData.length;

      writeCache(filePath, {
        generatedAt: new Date().toISOString(),
        fixtureDate: fetchDate,
        data: initialData,
        count: initialData.length,
        totalCount,
      });
    } else {
      endpointStatus = 'error';
      error = data.message || 'API returned error';
    }
  } catch (err) {
    console.error(`[${logLabel}] fetchCachedPaginatedFixtures error:`, err.message);
    endpointStatus = 'error';
    error = err.message;

    const stale = readStaleCache(filePath);
    if (stale?.data) {
      initialData = stale.data;
      totalCount = stale.totalCount || 0;
      endpointStatus = 'success';
      error = null;
    }
  }

  return { initialData, totalCount, endpointStatus, error, baseUrl };
}

function pickExtra(cache) {
  const extra = {};
  if (cache.totalCount != null) extra.totalCount = cache.totalCount;
  return extra;
}

/** Recursively remove all .json cache files under public/cache. */
export function clearAllCacheFiles(cacheRoot) {
  const root = cacheRoot || path.join(process.cwd(), 'public', 'cache');
  if (!fs.existsSync(root)) return 0;

  let count = 0;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      count += clearAllCacheFiles(fullPath);
    } else if (entry.name.endsWith('.json')) {
      fs.unlinkSync(fullPath);
      count++;
    }
  }
  return count;
}
