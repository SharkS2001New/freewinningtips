import Head from 'next/head';

import BetnumbersPageContent from '@/components/seo-content/betnumbers-page-content';
import BetnumbersPredictionsSchema from '@/components/seo-content/betnumbers-predictions-schema';
import FixturesRow from '@/components/shared/FixturesRow';
import MarketPageStats from '@/components/shared/MarketPageStats';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';

function getFormattedCurrentDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function BetnumbersPackages({ fixtures }) {
  const tipCount = fixtures?.length || 0;

  // GoalVertex chrome: Accuracy / Tips Today / Leagues / Free
  const stats = [
    { value: `${tipCount}+`, label: 'Tips Today' },
    { value: '50+', label: 'Leagues Covered' },
    { value: 'Free', label: 'Always & Forever' },
    { value: 'Daily', label: 'Updated' },
  ];

  return (
    <>
      <Head>
        <BetnumbersPredictionsSchema />
      </Head>
      <div className="page-root">
        <div className="container-main">
          <p className="market-page-eyebrow">Updated Daily — 100% Free</p>
          <p className="market-page-lead">
            Premium BetNumbers predictions and free football tips for every match today —
            data-driven, highly accurate, across 50+ leagues worldwide.
          </p>
          <MarketPageStats items={stats} />
          <h2 className="market-page-list-title">Today&apos;s BetNumbers Predictions</h2>
          <FixturesRow
            fixtures={fixtures}
            predictionType="all"
          />
        </div>

        <BetnumbersPageContent />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'homepage',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'betnumbers-prediction-page',
  });
  return { props: { fixtures, fetchDate } };
}
