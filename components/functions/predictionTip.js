/** Shared tip extraction and grading for featured picks and results pages. */

function parseGoalScore(value) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeTipForResult(tipText) {
  if (!tipText || tipText === '-') return null;

  const compact = String(tipText).trim().toUpperCase().replace(/\s+/g, '');

  if (['OVER2.5', 'OV2.5', 'OV25'].includes(compact)) return 'Over2.5';
  if (['UNDER2.5', 'UN2.5', 'UN25'].includes(compact)) return 'Under2.5';
  if (['OVER1.5', 'OV1.5', 'OV15'].includes(compact)) return 'Over1.5';
  if (['UNDER1.5', 'UN1.5', 'UN15'].includes(compact)) return 'Under1.5';

  return String(tipText).trim();
}

export function getHighestProbTeam(prediction1x2 = {}) {
  const home = prediction1x2.home || 0;
  const draw = prediction1x2.draw || 0;
  const away = prediction1x2.away || 0;
  if (home > draw && home > away) return '1';
  if (draw > home && draw > away) return 'X';
  if (away > home && away > draw) return '2';
  return '-';
}

export function getFixtureTip(fixture, predictionType = 'all') {
  const predictions = fixture.predictions || {};
  const prediction1x2 = predictions['1x2'] || {};
  const doubleChance = predictions.double_chance || {};
  const overUnder = predictions.over_under_2_5 || {};
  const btts = predictions.both_teams_to_score || {};
  const avgGoals = predictions.avg_goals || '-';
  const odds = fixture.odds || {};

  switch (predictionType) {
    case 'double-chance':
      return {
        tip: doubleChance.type || '-',
        probability: doubleChance.probability ?? null,
        market: 'Double Chance',
      };
    case '1-5-goals':
    case '2-5-goals':
      return {
        tip: overUnder.prediction || '-',
        probability: overUnder.probability ?? null,
        market: 'Over/Under 2.5',
      };
    case 'gg-no-gg':
      return {
        tip: btts.prediction ? btts.prediction.toUpperCase() : '-',
        probability: btts.probability ?? null,
        market: 'BTTS',
      };
    case '1x2': {
      const tip = getHighestProbTeam(prediction1x2);
      const prob =
        tip === '1' ? prediction1x2.home :
        tip === 'X' ? prediction1x2.draw :
        tip === '2' ? prediction1x2.away : null;
      return { tip, probability: prob, market: '1X2' };
    }
    default: {
      const avgGoalsNum = avgGoals !== '-' ? parseFloat(avgGoals) : null;
      const isAvgExtreme = avgGoalsNum !== null && (avgGoalsNum < 2.0 || avgGoalsNum > 3.0);
      const winningTeam = getHighestProbTeam(prediction1x2);
      const winningProb =
        winningTeam === '1' ? (prediction1x2.home || 0) :
        winningTeam === 'X' ? (prediction1x2.draw || 0) :
        winningTeam === '2' ? (prediction1x2.away || 0) : 0;
      const isWinningProbLow = winningProb < 50 && winningTeam !== '-';
      const bttsYesOdds = odds.btts?.yes ? parseFloat(odds.btts.yes) : null;
      const isBTTSFavorable = bttsYesOdds !== null && bttsYesOdds < 1.40 && btts?.prediction === 'yes';

      if (isBTTSFavorable && btts?.prediction) {
        return { tip: btts.prediction.toUpperCase(), probability: btts.probability ?? null, market: 'BTTS' };
      }
      if (isAvgExtreme && overUnder?.prediction) {
        return { tip: overUnder.prediction, probability: overUnder.probability ?? null, market: 'Over/Under 2.5' };
      }
      if (isWinningProbLow && doubleChance?.type) {
        return { tip: doubleChance.type, probability: doubleChance.probability ?? null, market: 'Double Chance' };
      }
      return { tip: winningTeam, probability: winningProb || null, market: '1X2' };
    }
  }
}

export function formatTipLabel(tip, market) {
  const normalized = normalizeTipForResult(tip);
  if (market === '1X2') {
    if (normalized === '1') return '1X2: Home Win';
    if (normalized === 'X') return '1X2: Draw';
    if (normalized === '2') return '1X2: Away Win';
  }
  if (market === 'BTTS') {
    if (normalized === 'YES' || normalized === 'GG') return 'BTTS: Yes';
    if (normalized === 'NO') return 'BTTS: No';
  }
  if (market === 'Double Chance') return `Double Chance: ${tip}`;
  if (market === 'Over/Under 2.5') return String(tip);
  return String(tip);
}

export function getAnalystNote(recommendation) {
  if (!recommendation) return '';
  const firstLine = String(recommendation).split('\n')[0].trim();
  return firstLine.endsWith('.') ? firstLine : `${firstLine}.`;
}

export function getFeaturedPicks(fixtures, limit = 5) {
  if (!Array.isArray(fixtures)) return [];

  return fixtures
    .map((fixture) => {
      const { tip, probability, market } = getFixtureTip(fixture, 'all');
      return {
        fixture,
        tip,
        probability,
        market,
        matchLabel: `${fixture.home_team?.name || 'Home'} vs ${fixture.away_team?.name || 'Away'}`,
        analystNote: getAnalystNote(fixture.predictions?.recommendation),
      };
    })
    .filter((item) => item.tip && item.tip !== '-' && item.probability)
    .sort((a, b) => (b.probability || 0) - (a.probability || 0))
    .slice(0, limit);
}

export function gradeTip(tipText, homeScore, awayScore) {
  const home = parseGoalScore(homeScore);
  const away = parseGoalScore(awayScore);
  if (home === null || away === null) return 'void';

  const totalGoals = home + away;
  const tip = normalizeTipForResult(tipText);
  if (!tip) return 'void';

  let won = false;
  switch (tip) {
    case '1': won = home > away; break;
    case 'X': won = home === away; break;
    case '2': won = away > home; break;
    case '1X': won = home >= away; break;
    case 'X2': won = away >= home; break;
    case '12': won = home !== away; break;
    case 'Over1.5': won = totalGoals >= 2; break;
    case 'Under1.5': won = totalGoals <= 1; break;
    case 'Over2.5': won = totalGoals >= 3; break;
    case 'Under2.5': won = totalGoals <= 2; break;
    case 'YES':
    case 'GG': won = home > 0 && away > 0; break;
    case 'NO': won = home === 0 || away === 0; break;
    default: return 'void';
  }
  return won ? 'win' : 'loss';
}
