import { formatTipLabel } from '@/components/functions/predictionTip';

/**
 * GoalVertex analysis pattern (verbatim templates, brand-swapped):
 *
 * BetNumbers:
 *   "{Tip} – The model gives this BetNumbers pick a confidence level of {X}%.
 *    Based on recent form, head-to-head records, and current market conditions,
 *    this selection offers strong value."
 *
 * Must Win / Direct Win (win-only):
 *   "{Team} come into this fixture in strong form with a {X}% confidence rating
 *    from our model. {Team} have shown consistency in recent matches, while
 *    {Opponent} have struggled in similar situations. Based on recent form,
 *    head-to-head records, and current market conditions, the win is well
 *    supported by the data."
 */
export function buildMatchTipAnalysis({
  fixture,
  tip,
  probability,
  odds,
  predictionType = 'all',
  brandKeyword = null,
}) {
  if (!tip || tip === '-') return null;

  const home = fixture?.home_team?.name || 'Home';
  const away = fixture?.away_team?.name || 'Away';
  const tipStr = String(tip).toUpperCase();
  const tipDisplay = formatTipLabel(
    tip,
    predictionType === 'gg-no-gg'
      ? 'BTTS'
      : predictionType === 'double-chance'
        ? 'Double Chance'
        : '1X2'
  );
  const prob = probability != null && probability !== ''
    ? String(probability).replace('%', '')
    : null;
  const isWinOnly = predictionType === 'win-only' || tipStr === '1' || tipStr === '2';
  const pickedTeam = tipStr === '2' ? away : tipStr === '1' ? home : null;
  const opponent = tipStr === '2' ? home : tipStr === '1' ? away : null;

  // --- Must Win / Direct Win pattern (GoalVertex) ---
  if (predictionType === 'win-only' && pickedTeam && opponent) {
    const conf = prob || '70';
    const body = [
      `${pickedTeam} come into this fixture in strong form with a ${conf}% confidence rating from our model.`,
      `${pickedTeam} have shown consistency in recent matches, while ${opponent} have struggled in similar situations.`,
      'Based on recent form, head-to-head records, and current market conditions, the win is well supported by the data.',
    ].join(' ');

    return {
      market: tipStr === '1' ? 'Home Win' : 'Away Win',
      tipDisplay: tipStr === '1' ? `${pickedTeam} to win` : `${pickedTeam} to win away`,
      summary: tipStr === '1' ? `${pickedTeam} to win` : `${pickedTeam} to win away`,
      body,
    };
  }

  // --- BetNumbers / multi-market pattern (GoalVertex) ---
  const pickNoun = brandKeyword ? `${brandKeyword} pick` : 'pick';
  const confLine = prob
    ? `The model gives this ${pickNoun} a confidence level of ${prob}%.`
    : `The model gives this ${pickNoun} a high confidence rating.`;

  let probTail = '';
  const p1x2 = fixture?.predictions?.['1x2'];
  if (p1x2 && (tipStr === '1' || tipStr === '2' || tipStr === 'X')) {
    const h = Math.round(Number(p1x2.home) || 0);
    const d = Math.round(Number(p1x2.draw) || 0);
    const a = Math.round(Number(p1x2.away) || 0);
    probTail = ` Home win probability ${h}%, Away win probability ${a}%, Draw probability ${d}%.`;
  }

  const oddsText = odds && odds !== '-' ? ` at odds of ${odds}` : '';
  const body = `${tipDisplay} – ${confLine} Based on recent form, head-to-head records, and current market conditions, this selection offers strong value${oddsText}.${probTail}`;

  return {
    market: tipDisplay,
    tipDisplay,
    summary: tipDisplay,
    body,
  };
}
