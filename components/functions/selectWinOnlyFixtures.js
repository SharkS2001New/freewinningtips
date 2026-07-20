/**
 * GoalVertex-style win-only card: home or away wins only (never draws),
 * ranked by model probability. Used by Must Win (top 10) and Direct Win.
 */
export function getHomeAwayWinEdge(fixture) {
  const prediction1x2 = fixture?.predictions?.['1x2'] || {};
  const home = Number(prediction1x2.home) || 0;
  const away = Number(prediction1x2.away) || 0;
  const draw = Number(prediction1x2.draw) || 0;

  if (home <= 0 && away <= 0) return null;
  if (home >= away) {
    return { side: '1', team: fixture.home_team, probability: home, draw, opponentProb: away };
  }
  return { side: '2', team: fixture.away_team, probability: away, draw, opponentProb: home };
}

export function selectWinOnlyFixtures(fixtures = [], { limit = null, minProb = 65 } = {}) {
  const ranked = fixtures
    .map((fixture) => {
      const edge = getHomeAwayWinEdge(fixture);
      if (!edge) return null;
      if (edge.probability < minProb) return null;
      // Skip when draw is the clear favourite — not a "win" pick
      if (edge.draw > edge.probability) return null;
      return { fixture, ...edge };
    })
    .filter(Boolean)
    .sort((a, b) => b.probability - a.probability);

  const sliced = limit ? ranked.slice(0, limit) : ranked;
  return sliced.map((row) => row.fixture);
}

export function summarizeWinOnlyCard(fixtures = []) {
  let homeWins = 0;
  let awayWins = 0;
  let best = null;

  for (const fixture of fixtures) {
    const edge = getHomeAwayWinEdge(fixture);
    if (!edge) continue;
    if (edge.side === '1') homeWins += 1;
    else awayWins += 1;
    if (!best || edge.probability > best.probability) {
      best = {
        probability: edge.probability,
        teamName: edge.team?.name || (edge.side === '1' ? 'Home' : 'Away'),
        home: fixture.home_team?.name,
        away: fixture.away_team?.name,
        league: fixture.league?.name,
        side: edge.side,
      };
    }
  }

  return {
    count: fixtures.length,
    homeWins,
    awayWins,
    best,
  };
}
