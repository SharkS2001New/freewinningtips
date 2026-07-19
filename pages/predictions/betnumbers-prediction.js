import Head from 'next/head';

import BetnumbersPageContent from '@/components/seo-content/betnumbers-page-content';
import BetnumbersPredictionsSchema from '@/components/seo-content/betnumbers-predictions-schema';
import FixturesRow from '@/components/shared/FixturesRow';
import { fetchCachedFixtures, CACHE_TTL } from '@/components/functions/pagesDataCache';

function getFormattedCurrentDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function BetnumbersPackages({ fixtures }) {
  return (
    <>
      <Head>
        <BetnumbersPredictionsSchema />
      </Head>
      <div className="page-root">
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
        </div>

        <BetnumbersPageContent />
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
    logLabel: 'betnumbers-prediction-page',
  });
  return { props: { fixtures, fetchDate } };
}
