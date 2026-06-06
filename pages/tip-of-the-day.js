// pages/tips-of-the-day.js (or wherever this page lives)
import TipsoftheDayPageContent from '@/components/seo-content/tips-of-the-day-content';
import FixturesRow from '@/components/shared/FixturesRow';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';


function getFormattedCurrentDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function TipsOfTheDay({ fixtures, fetchDate }) {
  return (
    <>
      <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
        </div>

        {/* SEO CONTENT */}
        <TipsoftheDayPageContent />
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
    logLabel: 'tip-of-the-day-page',
  });
  return { props: { fixtures, fetchDate } };
}