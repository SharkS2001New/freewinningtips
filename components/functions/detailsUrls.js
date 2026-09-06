import { buildLeaguePath, slugify } from '@/components/functions/leagueUrl';

/** Country page paths (search + detail pages). */
export function buildCountryPath(countryName, tab = 'fixtures') {
  const countrySlug = slugify(countryName);
  if (!countrySlug) return '/';
  const safeTab = tab === 'results' ? 'results' : 'fixtures';
  return `/country/football-predictions-for-${countrySlug}/${safeTab}`;
}

/** Team detail paths. */
export function buildTeamPath(teamName, teamId, tab = 'results') {
  if (!teamName || !teamId) return '/';
  const slug = `${slugify(teamName)}-${teamId}`;
  const allowed = new Set(['results', 'standings', 'upcoming-matches', 'players']);
  const safeTab = allowed.has(tab) ? tab : 'results';
  return `/team/${slug}/${safeTab}`;
}

/**
 * Match detail paths.
 * Canonical slug: football-predictions-{home}-vs-{away}-{fixtureId}
 */
export function buildMatchPath(homeName, awayName, fixtureId, tab = 'matches') {
  if (!homeName || !awayName || !fixtureId) return '/';
  const slug = `football-predictions-${slugify(homeName)}-vs-${slugify(awayName)}-${fixtureId}`;
  const allowed = new Set([
    'matches',
    'odds',
    'overall-statistics',
    'standings',
    'upcoming-matches',
  ]);
  const safeTab = allowed.has(tab) ? tab : 'matches';
  return `/match/${slug}/${safeTab}`;
}

/** Build match path from a fixture-like object. */
export function buildMatchPathFromFixture(fixture, tab = 'matches') {
  const home =
    fixture?.home_team?.name ||
    fixture?.home_team_name ||
    '';
  const away =
    fixture?.away_team?.name ||
    fixture?.away_team_name ||
    '';
  const id =
    fixture?.fixture_id ||
    fixture?.match?.id ||
    fixture?.id ||
    '';
  return buildMatchPath(home, away, id, tab);
}

export { buildLeaguePath, slugify };
