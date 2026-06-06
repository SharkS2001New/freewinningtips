// pages/index.js
import HomepageContent   from '@/components/seo-content/homepage';
import BlogPostsSection  from '@/components/shared/short-blog-posts';
import FixturesRow       from '@/components/shared/FixturesRow';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';


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
  const fetchDate = getFormattedCurrentDate();
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'homepage',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'homepage',
  });
  return { props: { fixtures, fetchDate } };
}