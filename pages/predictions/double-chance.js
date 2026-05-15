import React from 'react';
import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import FixturesRow from '@/components/shared/FixturesRow';
import DoubleChancePageContent from '@/components/seo-content/double-chance-content';

export default function DoubleChancePagesGames({ fixtures }) {
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
  const url = `https://api.pitchpredictions.com/api/fetch_double_chance_free_winning_tips?fixture_date=${fetchDate}`;

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
