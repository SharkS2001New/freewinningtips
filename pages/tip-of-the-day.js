import TipsoftheDayPageContent from '@/components/seo-content/tips-of-the-day-content';
import FixturesRow from '@/components/shared/FixturesRow';

function getFormattedCurrentDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function VIPPackages({ fixtures, fetchDate }) {
  return (
    <>
      <div className="page-root">
        {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
        <div className="container-main">
          <FixturesRow fixtures={fixtures} />
        </div>

        {/* SEO CONTENT */}
        <TipsoftheDayPageContent />
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