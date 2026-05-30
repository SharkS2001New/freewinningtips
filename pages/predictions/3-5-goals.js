import fs from 'fs';
import path from 'path';
import React from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import FixturesRow from '@/components/shared/FixturesRow';
import Over35PageContent from '@/components/seo-content/over35-page-content';

// Shared cache config — must match other pages exactly
const CACHE_DIR    = path.join(process.cwd(), 'public', 'cache', 'pages-data');
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default function Over35Games({ fixtures, fetchDate }) {
  return (
    <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="3-5-goals" />
        </div>

        {/* SEO CONTENT */}
        <Over35PageContent/>
      </div>
  )
}

export async function getServerSideProps() {
  const fetchDate = "2026-05-30"; // getFormattedCurrentDate() --- IGNORE ---
  // Use a different cache file for this API endpoint
  const cachePath = path.join(CACHE_DIR, `over35_${fetchDate}.json`);

  let fixtures = [];

  try {
    // Ensure cache directory exists
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    // --- Try shared cache first ---
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
    const url = `https://develop.pitchpredictions.com/api/fetch_under_over35_free_winning_tips?fixture_date=${fetchDate}`;
    
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
    console.error('[over35-page] getServerSideProps error:', err.message);

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