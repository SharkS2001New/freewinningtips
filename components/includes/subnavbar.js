// components/FilterTabs.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const Subnavbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const tabs = [
    { name: 'Free Picks', href: '/predictions/free-betting-tips-today' },
    { name: '1.5 Goals', href: '/predictions/1-5-goals' },
    { name: '2.5 Goals', href: '/predictions/2-5-goals' },
    { name: 'Over 3.5 Goals', href: '/predictions/3-5-goals' },
    { name: 'Acca Tips', href: '/acca-tips' },
    { name: 'BTTS', href: '/predictions/gg-no-gg' },
    { name: 'Draw No Bet', href: '/predictions/draw' },
    { name: 'Double Chance', href: '/predictions/double-chance' },
  ];

  return (
    <div className="filter-bar">
      <div className="filter-scroll">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`filter-tab ${currentPath === tab.href ? 'active' : ''}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subnavbar;