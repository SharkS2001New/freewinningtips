import {
  leagueCachePaths,
  withLeagueCache,
  LEAGUE_CACHE_TTL,
} from '@/components/functions/leagueDataCache';
import { API_BASE, getServerApiHeaders } from '@/components/functions/apiConfig';

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getServerApiHeaders(),
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchPostJson(url, body) {
  return fetchJson(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function parseStandingsRows(standingsPayload) {
  if (!standingsPayload?.length) return [];

  const raw = standingsPayload[0]?.standings_data;
  if (!raw) return [];

  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (Array.isArray(parsed?.[0])) return parsed[0];
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

/**
 * Load all league page data with per-endpoint disk cache TTLs.
 * Fetches run in parallel so total wait ≈ slowest API, not sum of all calls.
 */
export async function fetchLeaguePageData({
  leagueId,
  leagueNameForApi,
  countryNameForApi,
  fetchDate,
}) {
  const paths = leagueCachePaths(leagueId, fetchDate);

  const [
    leagueMeta,
    todaysFixtures,
    upcomingFixtures,
    leagueResults,
    standings,
  ] = await Promise.all([
    withLeagueCache(paths.meta, LEAGUE_CACHE_TTL.meta, async () => {
      try {
        const topData = await fetchJson(
          `${API_BASE}/fetch_leagues_top_data?league_id=${leagueId}`
        );
        return topData.status === true ? topData.data || [] : [];
      } catch (err) {
        console.error('[league-data] meta:', err.message);
        return [];
      }
    }),

    withLeagueCache(paths.today, LEAGUE_CACHE_TTL.today, async () => {
      try {
        const todaysData = await fetchJson(
          `${API_BASE}/fetch_todays_fixtures_by_league_id?league_id=${leagueId}&fixture_date=${fetchDate}`
        );
        return todaysData.status === true ? todaysData.data || [] : [];
      } catch (err) {
        console.error('[league-data] today:', err.message);
        return [];
      }
    }),

    withLeagueCache(paths.upcoming, LEAGUE_CACHE_TTL.upcoming, async () => {
      try {
        const fixturesData = await fetchJson(
          `${API_BASE}/fetch_league_fixtures?league_name=${encodeURIComponent(leagueNameForApi)}&country_name=${encodeURIComponent(countryNameForApi)}`
        );
        return fixturesData.status === true ? fixturesData.data || [] : [];
      } catch (err) {
        console.error('[league-data] upcoming:', err.message);
        return [];
      }
    }),

    withLeagueCache(paths.results, LEAGUE_CACHE_TTL.results, async () => {
      try {
        const resultsData = await fetchJson(
          `${API_BASE}/fetch_league_results?league_name=${encodeURIComponent(leagueNameForApi)}&country_name=${encodeURIComponent(countryNameForApi)}`
        );
        return resultsData.status === true ? resultsData.data || [] : [];
      } catch (err) {
        console.error('[league-data] results:', err.message);
        return [];
      }
    }),

    withLeagueCache(paths.standings, LEAGUE_CACHE_TTL.standings, async () => {
      try {
        const standingsData = await fetchPostJson(
          `${API_BASE}/fetch_team_standings`,
          { league_id: leagueId }
        );
        const raw = standingsData.status === true ? standingsData.data || [] : [];
        return parseStandingsRows(raw);
      } catch (err) {
        console.error('[league-data] standings:', err.message);
        return [];
      }
    }),
  ]);

  return {
    leagueMeta,
    todaysFixtures,
    upcomingFixtures,
    leagueResults,
    standings,
  };
}
