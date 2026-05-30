// pages/index.js
import fs   from 'fs';
import path from 'path';

import HomepageContent   from '@/components/seo-content/homepage';
import BlogPostsSection  from '@/components/shared/short-blog-posts';
import FixturesRow       from '@/components/shared/FixturesRow';

const CACHE_DIR    = path.join(process.cwd(), 'public', 'cache', 'pages-data');
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes — free tips change frequently

function getFormattedCurrentDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export default function Home({ fixtures, fetchDate }) {
  return (
    <>
      <div className="page-root">
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />

          <div className="view-more-wrap">
            <a href="/predictions/todays-predictions" className="btn-view-more">
              View More Predictions &nbsp;↗
            </a>
          </div>
        </div>

        <div className="tg-banner">
          <p>Join our Telegram for updates &amp; picks</p>
          <a href="https://t.me/s/freewinningtips1x2" target="_blank" rel="noopener noreferrer" className="tg-circle" aria-label="Join Telegram">✈️</a>
        </div>

        <BlogPostsSection />
        <HomepageContent />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const fetchDate = "2026-05-30";
  const cachePath = path.join(CACHE_DIR, `homepage_${fetchDate}.json`);

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
        // Cache is fresh — use it
        return {
          props: {
            fixtures:   cache.data,
            fetchDate,
          },
        };
      }

      // Cache expired — remove it
      fs.unlinkSync(cachePath);
    }

    // --- Cache miss: fetch from API ---
    const res  = await fetch(
      `https://develop.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date=${fetchDate}`,
      { headers: { Authorization: 'R9TxV3PbOEu7qZnJKgydC5LmX2' } }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status === true && Array.isArray(data.data)) {
      fixtures = data.data;

      // Save to cache — atomic write to avoid partial reads
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
    console.error('[homepage] getServerSideProps error:', err.message);

    // Fetch failed — try expired cache as fallback rather than showing nothing
    if (fs.existsSync(cachePath)) {
      try {
        const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        fixtures = cache.data || [];
      } catch {
        // Corrupt cache — fixtures stays []
      }
    }
  }

  return {
    props: { fixtures, fetchDate },
  };
}