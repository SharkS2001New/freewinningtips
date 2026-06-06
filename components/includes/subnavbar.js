// components/FilterTabs.js
import { useRouter } from 'next/router';

const Subnavbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const tabs = [
    { name: 'Free Picks',    href: '/predictions/free-betting-tips-today' },
    { name: '1.5 Goals',     href: '/predictions/1-5-goals' },
    { name: '2.5 Goals',     href: '/predictions/2-5-goals' },
    { name: 'Acca Tips',     href: '/predictions/accumulator-tips' },
    { name: 'BTTS',          href: '/predictions/gg-no-gg' },
    { name: 'Draw No Bet',   href: '/predictions/draw' },
    { name: 'Double Chance', href: '/predictions/double-chance' },
  ];

  return (
    <>
      <div className="subnav-bar">
        <div className="subnav-inner">
          {tabs.map((tab) => {
            const isActive = currentPath === tab.href;
            return (
              <a
                key={tab.name}
                href={tab.href}
                className={`pill-tab${isActive ? ' pill-active' : ''}`}
              >
                {tab.name}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Subnavbar;