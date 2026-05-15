// pages/index.js
import HomepageContent from '@/components/seo-content/homepage';
import BlogPostsSection from '@/components/shared/short-blog-posts';
import FixturesRow from '@/components/shared/FixturesRow';

function getFormattedCurrentDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function Home({ fixtures, fetchDate }) {
  return (
    <>
      <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} predictionType="all" />
          
          <div className="view-more-wrap">
            <a href="/predictions/todays-predictions" className="btn-view-more">
              View More Predictions &nbsp;↗
            </a>
          </div>
        </div>

        {/* TELEGRAM BANNER */}
        <div className="tg-banner">
          <p>Join our Telegram for updates &amp; picks</p>
          <a href="https://t.me/s/freewinningtips1x2" target="_blank" rel="noopener noreferrer" className="tg-circle" aria-label="Join Telegram">✈️</a>
        </div>

        {/* BLOG POSTS SECTION */}
        <BlogPostsSection />

        {/* SEO CONTENT */}
        <HomepageContent />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  const url = `https://api.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date=${fetchDate}`;

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