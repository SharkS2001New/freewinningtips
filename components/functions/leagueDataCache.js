import fs from 'fs';
import path from 'path';

const LEAGUE_CACHE_ROOT = path.join(process.cwd(), 'public', 'cache', 'league-data');

export const LEAGUE_CACHE_TTL = {
  today: 5 * 60 * 1000,         // 5 minutes — today's fixtures
  upcoming: 5 * 60 * 1000,      // 5 minutes — upcoming fixtures
  results: 24 * 60 * 60 * 1000, // 24 hours — results don't change often
  standings: 3 * 60 * 60 * 1000, // 3 hours
  meta: 3 * 60 * 60 * 1000,
};

function leagueCacheDir(leagueId) {
  return path.join(LEAGUE_CACHE_ROOT, String(leagueId));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readCache(filePath, ttlMs) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const cache = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const age = Date.now() - new Date(cache.generatedAt).getTime();
    if (age <= ttlMs) return cache.data;
  } catch {
    // corrupt cache
  }
  return null;
}

function writeCache(filePath, data) {
  ensureDir(path.dirname(filePath));
  const payload = JSON.stringify(
    { generatedAt: new Date().toISOString(), data },
    null,
    2
  );
  const tmp = `${filePath}.tmp.${Date.now()}`;
  fs.writeFileSync(tmp, payload);
  fs.renameSync(tmp, filePath);
}

/**
 * Read through disk cache or fetch fresh data and persist.
 */
export async function withLeagueCache(filePath, ttlMs, fetchFresh) {
  const cached = readCache(filePath, ttlMs);
  if (cached !== null) return cached;

  const data = await fetchFresh();
  writeCache(filePath, data);
  return data;
}

export function leagueCachePaths(leagueId, fetchDate) {
  const dir = leagueCacheDir(leagueId);
  return {
    dir,
    meta: path.join(dir, 'meta.json'),
    today: path.join(dir, `today_${fetchDate}.json`),
    upcoming: path.join(dir, 'upcoming.json'),
    results: path.join(dir, 'results.json'),
    standings: path.join(dir, 'standings.json'),
  };
}
