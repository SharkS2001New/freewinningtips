import popularLeaguesData from '../../public/jsonfiles/popular-leagues.json';
import otherLeaguesData from '../../public/jsonfiles/other-leagues.json';

function normalizeKey(value) {
  return String(value || '').trim().toLowerCase();
}

function buildLeagueLookup() {
  const map = new Map();
  const leagues = [
    ...(popularLeaguesData?.data || []),
    ...(otherLeaguesData?.data || []),
  ];

  leagues.forEach((entry) => {
    if (!entry?.league_id || !entry?.league_name) return;
    const key = `${normalizeKey(entry.country_name)}::${normalizeKey(entry.league_name)}`;
    if (!map.has(key)) {
      map.set(key, entry.league_id);
    }
  });

  return map;
}

const LEAGUE_LOOKUP = buildLeagueLookup();

export function resolveLeagueIdFromFixture(fixture) {
  const league = fixture?.league || {};
  const fromApi = league.id || fixture?.league_id;
  if (fromApi && Number(fromApi) > 0) return Number(fromApi);

  const key = `${normalizeKey(league.country)}::${normalizeKey(league.name)}`;
  return LEAGUE_LOOKUP.get(key) || null;
}

/** Ensure league.id and league_id are set on each fixture (SSR + cache). */
export function enrichFixturesWithLeagueIds(fixtures) {
  if (!Array.isArray(fixtures)) return [];

  return fixtures.map((fixture) => {
    const leagueId = resolveLeagueIdFromFixture(fixture);
    if (!leagueId) return fixture;

    return {
      ...fixture,
      league_id: leagueId,
      league: {
        ...(fixture.league || {}),
        id: leagueId,
      },
    };
  });
}
