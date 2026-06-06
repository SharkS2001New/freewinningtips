// pages/free-vip-tips-today.js (or wherever this page lives)
import FreeVipTipsTodayPageContent from '@/components/seo-content/free-vip-tips-today-content';
import FixturesRow                 from '@/components/shared/FixturesRow';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';


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
  const { fixtures } = await fetchCachedFixtures({
    cacheKey: 'homepage',
    fetchDate,
    endpoint: 'fetch_todays_free_winning_tips',
    ttlMs: CACHE_TTL.TODAY,
    logLabel: 'free-vip-tips-today-page',
  });
  return { props: { fixtures, fetchDate } };
}