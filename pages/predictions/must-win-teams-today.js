import Head from 'next/head';
import Link from 'next/link';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import {
  selectWinOnlyFixtures,
  summarizeWinOnlyCard,
} from '@/components/functions/selectWinOnlyFixtures';
import FixturesRow from '@/components/shared/FixturesRow';
import MarketPageStats from '@/components/shared/MarketPageStats';
import MustWinTeamspageContent from '@/components/seo-content/must-win-teams-page-content';
import MustWinTeamsSchema from '@/components/seo-content/must-win-teams-schema';

export default function MustWinTeamsPage({ fixtures, fetchDate, cardSummary }) {
  const dateModified = fetchDate ? `${fetchDate}T06:00:00+03:00` : undefined;

  // GoalVertex chrome: 10 | Teams Today, Win Only | Home & Away, Free | Always & Forever
  const stats = [
    { value: String(cardSummary.count || 10), label: 'Teams Today' },
    { value: 'Win Only', label: 'Home & Away' },
    { value: 'Free', label: 'Always & Forever' },
    {
      value: `${cardSummary.homeWins || 0} / ${cardSummary.awayWins || 0}`,
      label: 'Home / Away Wins',
    },
  ];

  return (
    <>
      <Head>
        <MustWinTeamsSchema dateModified={dateModified} />
      </Head>
      <div className="page-root">
        <div className="container-main">
          <p className="market-page-eyebrow">Exactly 10 Teams — Updated Every Morning</p>
          <p className="market-page-lead">
            Today&apos;s 10 teams to win — home and away wins only, hand-picked by our analysts each
            morning. Every selection backed by form data, head-to-head records, and full written
            analysis.
          </p>
          <MarketPageStats items={stats} />
          <h2 className="market-page-list-title">10 Teams to Win Today</h2>
          <p className="market-page-list-meta">
            {cardSummary.count || 0} teams selected today
            {cardSummary.homeWins != null
              ? ` · ${cardSummary.homeWins} Home Wins · ${cardSummary.awayWins} Away Wins`
              : ''}
          </p>
          <FixturesRow
            fixtures={fixtures}
            predictionType="win-only"
            flatList
            emptyMessage="No must-win teams cleared the filter for today. Check back in the morning."
          />
          <p className="market-page-best">
            All {cardSummary.count || 10} teams to win today are loaded — check back tomorrow morning
            for a fresh selection.
            {cardSummary.best ? (
              <>
                {' '}
                <strong>Today&apos;s Best Win Pick:</strong> {cardSummary.best.home} vs{' '}
                {cardSummary.best.away} — highest confidence on today&apos;s card at{' '}
                {Math.round(cardSummary.best.probability)}% (
                {cardSummary.best.side === '1' ? 'Home Win' : 'Away Win'}).
              </>
            ) : null}{' '}
            See also <Link href="/predictions/direct-win-predictions">direct win predictions</Link>.
          </p>
        </div>

        <MustWinTeamspageContent cardSummary={cardSummary} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures: allFixtures } = await fetchCachedFixtures({
    cacheKey: 'homepage',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'must-win-teams-today-page',
  });

  const fixtures = selectWinOnlyFixtures(allFixtures, { limit: 10, minProb: 65 });
  const cardSummary = summarizeWinOnlyCard(fixtures);

  return { props: { fixtures, fetchDate, cardSummary } };
}
