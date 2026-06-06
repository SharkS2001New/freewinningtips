// pages/tomorrows-games.js (or whatever the file is called)
import React from 'react';

import getTomorrowsDate from '@/components/functions/GetTomorrowsDate';
import FixturesRow from '@/components/shared/FixturesRow';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import TomorrowspageContent from '@/components/seo-content/tomorrows-page-content';


export default function TomorrowsGames({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
      <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
      </div>
      <TomorrowspageContent />
    </div>
  );
}

export async function getServerSideProps() {
  const fetchDate = getTomorrowsDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'tomorrows',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.TOMORROW,
    logLabel: 'tomorrows-page',
  });
  return { props: { fixtures, fetchDate } };
}