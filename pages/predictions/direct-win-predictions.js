import React from 'react';
import Head from 'next/head';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import { fetchDirectWinAccuracyStats, formatAccuracyCell } from '@/components/functions/directWinAccuracy';
import FixturesRow from '@/components/shared/FixturesRow';
import DirectWinPredictionsPageContent from '@/components/seo-content/direct-win-predictions-content';
import DirectWinPredictionsSchema from '@/components/seo-content/direct-win-predictions-schema';

const EMPTY_ACCURACY_STATS = {
  homeWin: { published: 0, correct: 0 },
  awayWin: { published: 0, correct: 0 },
  doubleChance: { published: 0, correct: 0 },
  all: { published: 0, correct: 0 },
};

export default function DirectWinPredictionsPage({ fixtures, fetchDate, accuracyStats, accuracySummary }) {
  return (
    <>
      <Head>
        <DirectWinPredictionsSchema />
      </Head>
      <div className="page-root">
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
        </div>

        <DirectWinPredictionsPageContent accuracyStats={accuracyStats} accuracySummary={accuracySummary} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const [{ fixtures }, accuracyStats] = await Promise.all([
    fetchCachedFixtures({
      cacheKey: 'homepage',
      fetchDate,
      endpoint: 'fetch_todays_free_winning_tips',
      ttlMs: CACHE_TTL.TODAY,
      logLabel: 'direct-win-predictions-page',
    }),
    fetchDirectWinAccuracyStats(30),
  ]);

  return {
    props: {
      fixtures,
      fetchDate,
      accuracyStats: accuracyStats || EMPTY_ACCURACY_STATS,
      accuracySummary: formatAccuracyCell((accuracyStats || EMPTY_ACCURACY_STATS).all),
    },
  };
}
