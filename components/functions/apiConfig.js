export const API_BASE = 'https://api.pitchpredictions.com/api';
export const SITE_ORIGIN = 'https://www.freewinningtips.com';
export const BLOG_SITE_KEY = 'freetips';

/** Backend ACCESS_TOKEN — required for Node/SSR (Origin alone is not enough). */
export function getAccessToken() {
  return (
    process.env.ACCESS_TOKEN ||
    process.env.PITCH_ACCESS_TOKEN ||
    'UJlhuDILIR1Lc2IEwZDIKOln9d'
  );
}

/** @deprecated use getServerApiHeaders — kept for older imports */
export const API_AUTH = getAccessToken();

/** Headers for Node SSR / pages/api / shared helpers hitting pitchpredictions API. */
export function getServerApiHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json; charset=UTF-8',
    Origin: SITE_ORIGIN,
    Authorization: `Bearer ${getAccessToken()}`,
    ...extra,
  };
}

export const API_SERVER_HEADERS = getServerApiHeaders();

/** Headers so the API returns freewinningtips blogs, not pitchpredictions. */
export const BLOG_API_HEADERS = {
  ...getServerApiHeaders(),
  'X-Site-Key': BLOG_SITE_KEY,
};

/** Today's predictions: 5 min. Results/historical pages use longer TTLs. */
export const CACHE_TTL = {
  TODAY: 5 * 60 * 1000,
  TOMORROW: 60 * 60 * 1000,
  YESTERDAY: 12 * 60 * 60 * 1000,
};

export const PREDICTION_ENDPOINTS = {
  homepage: 'fetch_todays_free_winning_tips',
  btts: 'fetch_btts_free_winning_tips',
  doublechance: 'fetch_double_chance_free_winning_tips',
  draws: 'fetch_draws_matches_fixtures',
  over15: 'fetch_under_over15_free_winning_tips',
  over25: 'fetch_under_over25_free_winning_tips',
  todays_predictions: 'fetch_all_matches_fixtures_no_limit',
};
