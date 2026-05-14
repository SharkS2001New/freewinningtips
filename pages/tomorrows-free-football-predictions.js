// pages/tomorrows-games.js (or whatever the file is called)
import React from 'react';
import getTomorrowsDate from '@/components/functions/GetTomorrowsDate';
import FixturesRow from '@/components/shared/FixturesRow';
import TomorrowspageContent from '@/components/seo-content/tomorrows-page-content';

export default function TomorrowsGames({ fixtures }) {
  return (
    <div className="page-root">
      <div className="container-main">
        <FixturesRow fixtures={fixtures} />
      </div>
      <TomorrowspageContent />
    </div>
  );
}

export async function getServerSideProps() {
  const fetchDate = getTomorrowsDate(); // Now works without parameter
  const url = `https://api.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date=${fetchDate}`;

  let fixtures = [];
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === true && Array.isArray(data.data)) {
      fixtures = data.data;
    }
  } catch (err) {
    console.error('Failed to fetch predictions:', err);
  }

  return {
    props: { fixtures, fetchDate },
  };
}