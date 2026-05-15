import React from 'react';
import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import TodayspageContent from '@/components/seo-content/todays-predictions-content';
import FixturesRow from '@/components/shared/FixturesRow';

export default function TodaysGames({ fixtures }) {
  return (
    <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
        </div>

        {/* SEO CONTENT */}
      <TodayspageContent/>
      </div>
  )
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const url = `https://api.pitchpredictions.com/api/fetch_all_matches_fixtures_no_limit?fixture_date=${fetchDate}`;

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