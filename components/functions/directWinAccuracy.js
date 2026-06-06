import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import {
  getFixtureTip,
  gradeTip,
  normalizeTipForResult,
} from '@/components/functions/predictionTip';

const DIRECT_WIN_MIN_PROB = 70;

function formatDateISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function createEmptyStats() {
  return {
    homeWin: { published: 0, correct: 0 },
    awayWin: { published: 0, correct: 0 },
    doubleChance: { published: 0, correct: 0 },
    all: { published: 0, correct: 0 },
  };
}

function getDirectWinCategory(tip, market, probability) {
  if (!probability || probability < DIRECT_WIN_MIN_PROB) return null;

  const normalized = normalizeTipForResult(tip);
  if (!normalized || normalized === '-') return null;

  if (market === '1X2') {
    if (normalized === '1') return 'homeWin';
    if (normalized === '2') return 'awayWin';
    return null;
  }

  if (market === 'Double Chance' && ['1X', 'X2', '12'].includes(normalized)) {
    return 'doubleChance';
  }

  return null;
}

function recordPick(stats, category, outcome) {
  stats.all.published += 1;
  if (outcome === 'win') stats.all.correct += 1;

  stats[category].published += 1;
  if (outcome === 'win') stats[category].correct += 1;
}

export function formatAccuracyCell(bucket) {
  if (!bucket.published) return '—';
  const rate = Math.round((bucket.correct / bucket.published) * 100);
  return `${bucket.correct}/${bucket.published} (${rate}%)`;
}

export async function fetchDirectWinAccuracyStats(days = 30) {
  const stats = createEmptyStats();

  for (let i = 1; i <= days; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const fetchDate = formatDateISO(date);

    try {
      const { fixtures } = await fetchCachedFixtures({
        cacheKey: `direct_win_accuracy_${fetchDate}`,
        fetchDate,
        endpoint: 'fetch_todays_free_winning_tips',
        ttlMs: CACHE_TTL.YESTERDAY,
        logLabel: `direct-win-accuracy-${fetchDate}`,
      });

      if (!Array.isArray(fixtures)) continue;

      fixtures.forEach((fixture) => {
        const { tip, probability, market } = getFixtureTip(fixture, 'all');
        const category = getDirectWinCategory(tip, market, probability);
        if (!category) return;

        const outcome = gradeTip(tip, fixture.score?.home, fixture.score?.away);
        if (outcome === 'void') return;

        recordPick(stats, category, outcome);
      });
    } catch {
      // skip days with no cached data
    }
  }

  return stats;
}
