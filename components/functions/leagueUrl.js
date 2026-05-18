/** Canonical country segment prefix for new league links */
export const LEAGUE_COUNTRY_PREFIX = 'football-tips-and-predictions-for-';

/** Legacy prefix still supported when parsing URLs */
export const LEAGUE_COUNTRY_PREFIX_LEGACY = 'football-predictions-for-';

const COUNTRY_PREFIXES = [LEAGUE_COUNTRY_PREFIX, LEAGUE_COUNTRY_PREFIX_LEGACY];

export function slugify(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function removeLastIntegerPart(str) {
  const match = String(str).match(/-(\d+)$/);
  if (!match) return str;
  return str.slice(0, str.lastIndexOf(match[0]));
}

export function parseLeagueSlug(leagueSlug) {
  const match = String(leagueSlug || '').match(/-(\d+)$/);
  if (!match) return null;

  const leagueId = parseInt(match[1], 10);
  const leagueNameSlug = removeLastIntegerPart(leagueSlug);
  const leagueNameForApi = leagueNameSlug.replace(/-/g, ' ');
  const displayLeagueName = titleCaseFromSlug(leagueNameSlug);

  return { leagueId, leagueNameSlug, leagueNameForApi, displayLeagueName };
}

export function parseCountrySegment(countrySegment) {
  const segment = String(countrySegment || '');
  for (const prefix of COUNTRY_PREFIXES) {
    if (segment.startsWith(prefix)) {
      const countrySlug = segment.slice(prefix.length);
      return {
        countrySlug,
        countryNameForApi: countrySlug.replace(/-/g, ' '),
        displayCountryName: titleCaseFromSlug(countrySlug),
      };
    }
  }
  return null;
}

export function buildLeaguePath(countryName, leagueName, leagueId, tab) {
  const countrySlug = slugify(countryName);
  const leagueSlug = `${slugify(leagueName)}-${leagueId}`;
  const base = `/league/${LEAGUE_COUNTRY_PREFIX}${countrySlug}/${leagueSlug}`;
  if (!tab || tab === 'summary') return base;
  return `${base}?tab=${tab}`;
}

/** Build league page URL from a fixture row when league_id is present */
export function buildLeaguePathFromFixture(fixture, tab) {
  const leagueId = fixture?.league_id;
  const leagueName = fixture?.league_name || fixture?.league;
  const countryName = fixture?.country_name || fixture?.country;
  if (!leagueId || !leagueName || !countryName) return null;
  return buildLeaguePath(countryName, leagueName, leagueId, tab);
}
