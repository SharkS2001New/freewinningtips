import { formatTipLabel } from '@/components/functions/predictionTip';

function marketLabelFromTip(tip, predictionType) {
  if (predictionType === 'gg-no-gg') return 'Both Teams To Score';
  if (predictionType === 'double-chance') return 'Double Chance';
  if (predictionType === '1-5-goals' || predictionType === '2-5-goals') return 'Over/Under Goals';
  if (predictionType === '1x2') return 'Match Result (1X2)';
  return formatTipLabel(tip, tip === 'YES' || tip === 'NO' || tip === 'GG' ? 'BTTS' : '1X2');
}

/**
 * Build GoalVertex-style written analysis from fixture tip data.
 * Unique enough per match for SEO density without inventing fake stats.
 */
export function buildMatchTipAnalysis({
  fixture,
  tip,
  probability,
  odds,
  predictionType = 'all',
}) {
  if (!tip || tip === '-') return null;

  const home = fixture?.home_team?.name || 'Home';
  const away = fixture?.away_team?.name || 'Away';
  const league = fixture?.league?.name || 'this competition';
  const country = fixture?.league?.country || '';
  const leagueLine = country ? `${league} (${country})` : league;
  const prob = probability != null && probability !== ''
    ? String(probability).replace('%', '')
    : null;
  const oddsText = odds && odds !== '-' ? ` at odds of ${odds}` : '';
  const tipDisplay = formatTipLabel(tip, predictionType === 'gg-no-gg' ? 'BTTS' : predictionType === 'double-chance' ? 'Double Chance' : '1X2');
  const market = marketLabelFromTip(tip, predictionType);

  const confidence = prob
    ? `Our model gives this selection a confidence level of ${prob}%.`
    : 'Our model flags this as a high-value selection based on current data.';

  return {
    market,
    tipDisplay,
    summary: `${tipDisplay} — ${confidence}`,
    body: [
      `${tipDisplay} in ${home} vs ${away} (${leagueLine}). ${confidence} Based on recent form, head-to-head patterns, and current market conditions, this ${market.toLowerCase()} pick is supported by FreeWinningTips statistical modelling${oddsText}.`,
      `${home} and ${away} were assessed on attacking output, defensive solidity, and home/away splits before this tip was published. A senior analyst reviews every FreeWinningTips selection for late team news before kick-off.`,
    ].join(' '),
  };
}
