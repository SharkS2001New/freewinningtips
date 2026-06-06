import React from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import FixturesRow from '@/components/shared/FixturesRow';
import DoubleChancePageContent from '@/components/seo-content/double-chance-content';


export default function DoubleChancePagesGames({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="double-chance" />
        </div>

        {/* SEO CONTENT */}
        <DoubleChancePageContent/>
      </div>
  )
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'doublechance',
    fetchDate,
    endpoint: 'fetch_double_chance_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'double-chance-page',
  });
  return { props: { fixtures, fetchDate } };
}