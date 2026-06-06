import React from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import FixturesRow from '@/components/shared/FixturesRow';
import BothTeamsToScorePageContent from '@/components/seo-content/both-teams-to-score-content';


export default function BothTeamsToScoreGames({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="gg-no-gg" />
        </div>

        {/* SEO CONTENT */}
        <BothTeamsToScorePageContent/>
      </div>
  )
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'btts',
    fetchDate,
    endpoint: 'fetch_btts_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'btts-page',
  });
  return { props: { fixtures, fetchDate } };
}