import React from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import FixturesRow from '@/components/shared/FixturesRow';
import Over35PageContent from '@/components/seo-content/over35-page-content';


export default function Over25Games({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="2-5-goals" />
        </div>

        {/* SEO CONTENT */}
        <Over35PageContent/>
      </div>
  )
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'over25',
    fetchDate,
    endpoint: 'fetch_under_over25_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'over25-page',
  });
  return { props: { fixtures, fetchDate } };
}