// pages/free-vip-tips-today.js (or wherever this page lives)
import fs   from 'fs';
import path from 'path';

import FreeVipTipsTodayPageContent from '@/components/seo-content/free-vip-tips-today-content';
import FixturesRow                 from '@/components/shared/FixturesRow';

// Shared cache config — must match pages/index.js exactly
const CACHE_DIR    = path.join(process.cwd(), 'public', 'cache', 'pages-data');
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getFormattedCurrentDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export default function VIPPackages({ fixtures, fetchDate }) {
  return (
    <>
      <div className="page-root">
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
        </div>
        <FreeVipTipsTodayPageContent />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const cachePath = path.join(CACHE_DIR, `homepage_${fetchDate}.json`);

  let fixtures = [];

  try {
    // Ensure cache directory exists (homepage may not have run yet)
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

      fs.unlinkSync(cachePath);
    }

    // --- Cache miss: fetch and populate for all pages ---
    const res = await fetch(
      `https://api.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date=${fetchDate}`,
      { headers: { Authorization: 'R9TxV3PbOEu7qZnJKgydC5LmX2' } }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status === true && Array.isArray(data.data)) {
      fixtures = data.data;

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
    console.error('[free-vip-tips] getServerSideProps error:', err.message);

    // Fallback to expired cache rather than empty page
    if (fs.existsSync(cachePath)) {
      try {
        fixtures = JSON.parse(fs.readFileSync(cachePath, 'utf8')).data || [];
      } catch { /* corrupt cache — fixtures stays [] */ }
    }
  }

  return {
    props: { fixtures, fetchDate },
  };
}