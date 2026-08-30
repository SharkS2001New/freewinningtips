// pages/jackpots/sportpesa-mega-jackpot.js
import React from 'react';
import JackpotFixturesTable from '@/components/shared/JackpotFixturesTable';
import getMinMaxDates from '@/components/functions/jackpot_start_end_dates';
import { getJackpotServerHeaders } from '@/components/functions/apiConfig';

export default function SpecificJackpotPred({ fixtures, jackpotData }) {
  return (
    <JackpotFixturesTable 
      fixtures={fixtures}
      jackpotName="Betking Jackpot"
      jackpotData={jackpotData}
      showDateColumn={true}
    />
  );
}

export async function getServerSideProps() {
  const headers = getJackpotServerHeaders();
  const url = `https://api.alljackpotpredictions.com/api/fetch_jackpot_fixtures_by_name?jackpot_name=${encodeURIComponent("Betking Jackpot")}`;

  let fixtures = [];
  let jackpotData = { startDate: "", endDate: "" };

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    if (data.status === true && Array.isArray(data.data)) {
      fixtures = data.data;
      if (fixtures.length > 0) {
        const { minDate, maxDate } = getMinMaxDates(fixtures);
        jackpotData.startDate = minDate !== "No data available"
          ? new Date(minDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
          : "No data available";
        jackpotData.endDate = maxDate !== "No data available"
          ? new Date(maxDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
          : "No data available";
      }
    }
  } catch (err) {
    console.error("Failed to fetch jackpot fixtures:", err);
  }

  return { props: { fixtures, jackpotData } };
}