// pages/yesterdays-games.js (or whatever the file is called)
import fs from 'fs';
import path from 'path';
import React from 'react';

import FixturesRow from '@/components/shared/FixturesRow';
import getFormattedYesterdayDate from '@/components/functions/GetYesterdaysDate';
import YesterdaysPageContent from '@/components/seo-content/yesterdays-page-content';

// Shared cache config — must match other pages exactly
const CACHE_DIR    = path.join(process.cwd(), 'public', 'cache', 'pages-data');
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours for yesterday's data (doesn't change)

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
  const fetchDate = getFormattedYesterdayDate(); // Now works without parameter
  // Use a different cache file for yesterday's data
  const cachePath = path.join(CACHE_DIR, `yesterdays_${fetchDate}.json`);

  let fixtures = [];

  try {
    // Ensure cache directory exists
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    // --- Try cache first ---
    if (fs.existsSync(cachePath)) {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      const age   = Date.now() - new Date(cache.generatedAt).getTime();

      if (age <= CACHE_TTL_MS) {
        return {
          props: { fixtures: cache.data, fetchDate },
        };
      }

      // Cache expired - remove it
      fs.unlinkSync(cachePath);
    }

    // --- Cache miss: fetch from API ---
    const url = `https://develop.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date=${fetchDate}`;
    
    const res = await fetch(url, {
      headers: { 
        Authorization: 'R9TxV3PbOEu7qZnJKgydC5LmX2' 
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status === true && Array.isArray(data.data)) {
      fixtures = data.data;

      // Save to cache for future requests
      const payload = JSON.stringify({
        generatedAt: new Date().toISOString(),
        fixtureDate: fetchDate,
        data:        fixtures,
        count:       fixtures.length,
      }, null, 2);

      const tmp = `${cachePath}.tmp.${Date.now()}`;
      fs.writeFileSync(tmp, payload);
      fs.renameSync(tmp, cachePath);
    }

  } catch (err) {
    console.error('[yesterdays-games] getServerSideProps error:', err.message);

    // Fallback to expired cache rather than empty page
    if (fs.existsSync(cachePath)) {
      try {
        const fallback = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        fixtures = fallback.data || [];
      } catch { 
        // corrupt cache — fixtures stays [] 
      }
    }
  }

  return {
    props: { fixtures, fetchDate },
  };
}