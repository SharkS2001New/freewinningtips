import React from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import FixturesRow from '@/components/shared/FixturesRow';
import Over15PageContent from '@/components/seo-content/over15-page-content';


export default function Over15Games({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="1-5-goals" />
        </div>

        {/* SEO CONTENT */}
        <Over15PageContent/>
      </div>
  )
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'over15',
    fetchDate,
    endpoint: 'fetch_under_over15_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'over15-page',
  });
  return { props: { fixtures, fetchDate } };
}