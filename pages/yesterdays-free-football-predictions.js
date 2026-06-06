// pages/yesterdays-games.js (or whatever the file is called)
import React from 'react';

import FixturesRow from '@/components/shared/FixturesRow';
import getFormattedYesterdayDate from '@/components/functions/GetYesterdaysDate';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';
import YesterdaysPageContent from '@/components/seo-content/yesterdays-page-content';


export default function YesterdayGames({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
      <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
      </div>
      <YesterdaysPageContent />
    </div>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedYesterdayDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'yesterdays',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.YESTERDAY,
    logLabel: 'yesterdays-page',
  });
  return { props: { fixtures, fetchDate } };
}