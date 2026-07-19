import React from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import FixturesRow from '@/components/shared/FixturesRow';
import CorrectScorePageContent from '@/components/seo-content/correct-score-content';

export default function CorrectScorePredictionsPage({ fixtures }) {
  return (
    <div className="page-root">
      <div className="container-main">
        <FixturesRow fixtures={fixtures} predictionType="1x2" />
      </div>
      <CorrectScorePageContent />
    </div>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'correct_score_hub',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'correct-score-page',
  });
  return { props: { fixtures } };
}
