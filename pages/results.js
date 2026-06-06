import Link from 'next/link';
import {
  getFixtureTip,
  formatTipLabel,
  gradeTip,
} from '@/components/functions/predictionTip';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';

function formatDateISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function buildResultRows(fixtures, date) {
  if (!Array.isArray(fixtures)) return [];

  return fixtures
    .map((fixture) => {
      const { tip, market } = getFixtureTip(fixture, 'all');
      const homeScore = fixture.score?.home;
      const awayScore = fixture.score?.away;
      const outcome = gradeTip(tip, homeScore, awayScore);
      if (outcome === 'void') return null;

      return {
        id: fixture.fixture_id,
        date,
        match: `${fixture.home_team?.name || 'Home'} vs ${fixture.away_team?.name || 'Away'}`,
        market,
        tip: formatTipLabel(tip, market),
        score: `${homeScore}-${awayScore}`,
        outcome,
      };
    })
    .filter(Boolean);
}

async function fetchResultsHistory(days = 30) {
  const rows = [];

  for (let i = 1; i <= days; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const fetchDate = formatDateISO(date);

    try {
      const { fixtures } = await fetchCachedFixtures({
        cacheKey: `results_${fetchDate}`,
        fetchDate,
        endpoint: 'fetch_todays_free_winning_tips',
        ttlMs: CACHE_TTL.YESTERDAY,
        logLabel: `results-${fetchDate}`,
      });
      rows.push(...buildResultRows(fixtures, fetchDate));
    } catch {
      // skip days with no data
    }
  }

  return rows.sort((a, b) => b.date.localeCompare(a.date) || a.match.localeCompare(b.match));
}

function computeStats(rows) {
  const wins = rows.filter((row) => row.outcome === 'win').length;
  const losses = rows.filter((row) => row.outcome === 'loss').length;
  const total = wins + losses;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  return { wins, losses, total, winRate };
}

export default function ResultsPage({ rows, stats }) {
  return (
    <div className="page-root">
      <div className="container-main">
        <section className="seo-section">
          <div className="seo-inner">
            <p>
              This page tracks verified FreeWinningTips prediction outcomes over the last 30 days.
              Every result includes wins, losses, and voids where applicable — nothing is hidden.
              Use this archive to review our accuracy before following any tip.
            </p>

            <div className="results-summary">
              <p><strong>30-day summary:</strong> {stats.wins} wins, {stats.losses} losses ({stats.winRate}% win rate across {stats.total} graded picks)</p>
            </div>

            {rows.length > 0 ? (
              <div className="results-table-wrap">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Match</th>
                      <th>Market</th>
                      <th>Tip</th>
                      <th>Score</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={`${row.date}-${row.id}`}>
                        <td>{row.date}</td>
                        <td>{row.match}</td>
                        <td>{row.market}</td>
                        <td>{row.tip}</td>
                        <td>{row.score}</td>
                        <td className={row.outcome === 'win' ? 'result-win' : 'result-loss'}>
                          {row.outcome === 'win' ? 'Win' : 'Loss'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No graded results are available yet. Check back after today&apos;s matches finish.</p>
            )}

            <p>
              Want to see how we produce these picks? Read{' '}
              <Link href="/how-we-predict">how we predict football matches</Link>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const rows = await fetchResultsHistory(30);
  const stats = computeStats(rows);

  return {
    props: {
      rows: rows.slice(0, 200),
      stats,
    },
  };
}
