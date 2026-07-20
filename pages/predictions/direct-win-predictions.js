import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import { fetchDirectWinAccuracyStats, formatAccuracyCell } from '@/components/functions/directWinAccuracy';
import {
  selectWinOnlyFixtures,
  summarizeWinOnlyCard,
} from '@/components/functions/selectWinOnlyFixtures';
import FixturesRow from '@/components/shared/FixturesRow';
import MarketPageStats from '@/components/shared/MarketPageStats';
import DirectWinPredictionsPageContent from '@/components/seo-content/direct-win-predictions-content';
import DirectWinPredictionsSchema from '@/components/seo-content/direct-win-predictions-schema';

const EMPTY_ACCURACY_STATS = {
  homeWin: { published: 0, correct: 0 },
  awayWin: { published: 0, correct: 0 },
  doubleChance: { published: 0, correct: 0 },
  all: { published: 0, correct: 0 },
};

/**
 * GoalVertex has no dedicated Direct Win URL — pattern reused from their
 * Must Win / win-only cards: win-only tips, stats strip, formulaic analysis,
 * then evergreen SEO + FAQ below.
 */
export default function DirectWinPredictionsPage({
  fixtures,
  accuracyStats,
  accuracySummary,
  cardSummary,
}) {
  const stats = [
    { value: String(cardSummary.count || 0), label: 'Direct Wins' },
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
        <DirectWinPredictionsSchema />
      </Head>
      <div className="page-root">
        <div className="container-main">
          <p className="market-page-eyebrow">Updated Daily — 100% Free</p>
          <p className="market-page-lead">
            Direct win predictions for today&apos;s matches — home and away wins only, published when
            one team clearly outclasses the other. Every selection backed by form data,
            head-to-head records, and full written analysis.
          </p>
          <MarketPageStats items={stats} />
          <h2 className="market-page-list-title">Today&apos;s Direct Win Predictions</h2>
          <p className="market-page-list-meta">
            {cardSummary.count || 0} picks selected today
            {cardSummary.homeWins != null
              ? ` · ${cardSummary.homeWins} Home Wins · ${cardSummary.awayWins} Away Wins`
              : ''}
          </p>
          <FixturesRow
            fixtures={fixtures}
            predictionType="win-only"
            flatList
            emptyMessage="No direct win picks cleared the filter for today. Check must win teams or today's predictions."
          />
          <p className="market-page-best">
            Prefer a fixed daily 10? See{' '}
            <Link href="/predictions/must-win-teams-today">must win teams today</Link>. Multi-market
            tips: <Link href="/predictions/betnumbers-prediction">BetNumbers predictions</Link>.
          </p>
        </div>

        <DirectWinPredictionsPageContent
          accuracyStats={accuracyStats}
          accuracySummary={accuracySummary}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const [{ fixtures: allFixtures }, accuracyStats] = await Promise.all([
    fetchCachedFixtures({
      cacheKey: 'homepage',
      fetchDate,
      endpoint: 'fetch_todays_free_winning_tips',
      ttlMs: CACHE_TTL.TODAY,
      logLabel: 'direct-win-predictions-page',
    }),
    fetchDirectWinAccuracyStats(30),
  ]);

  const fixtures = selectWinOnlyFixtures(allFixtures, { minProb: 70 });
  const cardSummary = summarizeWinOnlyCard(fixtures);

  return {
    props: {
      fixtures,
      fetchDate,
      cardSummary,
      accuracyStats: accuracyStats || EMPTY_ACCURACY_STATS,
      accuracySummary: formatAccuracyCell((accuracyStats || EMPTY_ACCURACY_STATS).all),
    },
  };
}
