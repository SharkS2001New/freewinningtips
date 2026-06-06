import React from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import FixturesRow from '@/components/shared/FixturesRow';
import VenasbetPageContent from '@/components/seo-content/venasbet-content';


export default function VenasbetPage({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
        </div>

        {/* SEO CONTENT */}
        <VenasbetPageContent/>
      </div>
  )
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'homepage',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'venasbet-page',
  });
  return { props: { fixtures, fetchDate } };
}