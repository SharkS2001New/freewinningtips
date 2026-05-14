// components/includes/Sidebar.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import popularLeaguesData from '../../public/jsonfiles/popular-leagues.json';
import otherLeaguesData from '../../public/jsonfiles/other-leagues.json';

const COUNTRIES_PER_PAGE = 20;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [pinnedLeagues, setPinnedLeagues] = useState([]);
  const [otherLeagues, setOtherLeagues] = useState([]);
  const [openCountries, setOpenCountries] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(COUNTRIES_PER_PAGE);

  // Navigation links for mobile sidebar
  const navLinks = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Tip of the Day', href: '/tip-of-the-day', icon: '💡' },
    { name: 'All Predictions', href: '/predictions/todays-predictions', icon: '📊' },
    { name: 'Must Win Today', href: '/predictions/must-win-teams-today', icon: '🔥' },
    { name: 'VIP Tips', href: '/free-vip-tips-today', icon: '⭐' },
    { name: 'Jackpot Predictions', href: '/jackpot-predictions', icon: '🎰' },
  ];

  // Close sidebar when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (onClose) onClose();
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router, onClose]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  /* ── parse JSON files - DIRECT from JSON, no fallbacks ── */
  const getPopularLeagues = useMemo(() => {
    try {
      // Direct access - if JSON has .data property, use it, otherwise use as is
      if (popularLeaguesData?.data && Array.isArray(popularLeaguesData.data)) {
        return popularLeaguesData.data;
      }
      if (Array.isArray(popularLeaguesData)) {
        return popularLeaguesData;
      }
      return [];
    } catch { 
      console.error('Error loading popular leagues from JSON');
      return []; 
    }
  }, []);

  const getOtherLeagues = useMemo(() => {
    try {
      if (otherLeaguesData?.data && Array.isArray(otherLeaguesData.data)) {
        return otherLeaguesData.data;
      }
      if (Array.isArray(otherLeaguesData)) {
        return otherLeaguesData;
      }
      return [];
    } catch { 
      console.error('Error loading other leagues from JSON');
      return []; 
    }
  }, []);

  /* ── group all other-leagues by country ── */
  const leaguesByCountry = useMemo(() => {
    const groups = {};
    getOtherLeagues.forEach(league => {
      const key = league.country_name || 'Other';
      if (!groups[key]) {
        groups[key] = {
          flag: league.downloaded_country_flag || league.flag || null,
          code: league.country_code,
          leagues: [],
        };
      }
      groups[key].leagues.push(league);
    });
    return groups;
  }, [getOtherLeagues]);

  /* ── sorted country entries ── */
  const allCountryEntries = useMemo(
    () => Object.entries(leaguesByCountry).sort(([a], [b]) => a.localeCompare(b)),
    [leaguesByCountry]
  );

  /* ── slice to currently visible ── */
  const visibleCountryEntries = useMemo(
    () => allCountryEntries.slice(0, visibleCount),
    [allCountryEntries, visibleCount]
  );

  const hasMore = visibleCount < allCountryEntries.length;
  const nextBatch = Math.min(COUNTRIES_PER_PAGE, allCountryEntries.length - visibleCount);

  /* ── popular leagues (top section) - FROM DYNAMIC JSON ── */
  const popularLeaguesList = useMemo(() => {
    // Return the actual popular leagues from the JSON file
    // No fallback - use whatever is in the JSON
    return getPopularLeagues.slice(0, 10);
  }, [getPopularLeagues]);

  /* ── toggle country expand/collapse ── */
  const toggleCountry = useCallback(name => {
    setOpenCountries(prev => ({ ...prev, [name]: !prev[name] }));
  }, []);

  /* ── load / cache on mount ── */
  useEffect(() => {
    setMounted(true);
    const loadLeagues = async () => {
      setIsLoading(true);
      try {
        if (typeof window === 'undefined') return;
        const now = Date.now();

        // pinned leagues - from JSON directly (no caching needed since it's local)
        setPinnedLeagues(getPopularLeagues);

        // other leagues - from JSON directly
        setOtherLeagues(getOtherLeagues);
        
      } catch (err) {
        console.error('Error loading leagues:', err);
        setPinnedLeagues(getPopularLeagues);
        setOtherLeagues(getOtherLeagues);
      } finally {
        setIsLoading(false);
      }
    };
    loadLeagues();
  }, [getPopularLeagues, getOtherLeagues]);

  /* ── country code fallback ── */
  const getCountryCode = name => {
    const map = {
      Albania:'AL', Algeria:'DZ', Andorra:'AD', Angola:'AO',
      Argentina:'AR', Australia:'AU', Austria:'AT', Belgium:'BE',
      Brazil:'BR', England:'EN', France:'FR', Germany:'DE',
      Italy:'IT', Portugal:'PT', Spain:'ES', Sweden:'SE',
    };
    return map[name] || name.substring(0, 2).toUpperCase();
  };

  const leagueHref = l =>
    `/league/${l.league_name?.replace(/\s+/g, '-').toLowerCase()}-${l.league_id}`;

  /* ── skeleton ── */
  if (!mounted || isLoading) {
    return (
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} suppressHydrationWarning>
        <div className="sidebar-header">
          <span className="sidebar-logo">⚽ FreeWinningTips</span>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>
        <div className="sidebar-nav-links">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-row" />)}
        </div>
        <div className="sidebar-section">
          <div className="section-header">🏆 LEAGUES</div>
          <div className="leagues-list">
            {[1,2,3,4,5,6,7].map(i => <div key={i} className="skeleton-row" />)}
          </div>
        </div>
        <div className="sidebar-section">
          <div className="section-header">🌍 COUNTRIES</div>
          <div className="countries-list">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-row" />)}
          </div>
        </div>
      </aside>
    );
  }

  /* ── full render ── */
  return (
    <>
      {/* Overlay for mobile */}
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} suppressHydrationWarning>
        {/* Sidebar Header - ONLY SHOWS ON MOBILE (hidden on desktop via CSS) */}
        <div className="sidebar-header">
          <span className="sidebar-logo">⚽ FreeWinningTips</span>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>

        {/* Navigation Links - Mobile Only (desktop hides via CSS) */}
        <div className="sidebar-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-nav-link ${router.pathname === link.href ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-name">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* ── POPULAR LEAGUES ── */}
        <div className="sidebar-section">
          <div className="section-header">🏆 POPULAR LEAGUES</div>
          <div className="leagues-list">
            {popularLeaguesList.map((league, i) => (
              // href={leagueHref(league)}
              <a key={i}  className="league-item" onClick={onClose}>
                {league.downloaded_country_flag
                  ? <img src={league.downloaded_country_flag} alt={league.country_name} className="league-flag-img" loading="lazy" />
                  : <span className="league-flag-placeholder">{getCountryCode(league.country_name)}</span>
                }
                <span className="league-name">{league.league_name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── COUNTRIES (paginated) ── */}
        <div className="sidebar-section">
          <div className="section-header">
            🌍 COUNTRIES
            <span className="country-count">
              {Math.min(visibleCount, allCountryEntries.length)} / {allCountryEntries.length}
            </span>
          </div>

          <div className="countries-list">
            {visibleCountryEntries.map(([countryName, countryData]) => (
              <div key={countryName} className="country-group">
                <div className="country-header" onClick={() => toggleCountry(countryName)}>
                  <div className="country-info">
                    {countryData.flag
                      ? <img src={countryData.flag} alt={countryName} className="country-flag-img" loading="lazy" />
                      : <span className="country-flag-placeholder">{getCountryCode(countryName)}</span>
                    }
                    <span className="country-name">{countryName}</span>
                    <span className="country-league-count">({countryData.leagues.length})</span>
                  </div>
                  <span className="country-chevron">
                    {openCountries[countryName] ? '▼' : '▶'}
                  </span>
                </div>

                {openCountries[countryName] && (
                  <div className="country-leagues">
                    {countryData.leagues.map((league, i) => (
                      // href={leagueHref(league)}
                      <a key={i}  className="country-league-item" onClick={onClose}>
                        {league.league_name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {hasMore && (
            <button
              className="load-more-btn"
              onClick={() => setVisibleCount(c => c + COUNTRIES_PER_PAGE)}
            >
              Load {nextBatch} more countries
            </button>
          )}

          {!hasMore && allCountryEntries.length > COUNTRIES_PER_PAGE && (
            <button
              className="load-more-btn load-less-btn"
              onClick={() => {
                setVisibleCount(COUNTRIES_PER_PAGE);
                setOpenCountries({});
              }}
            >
              ▲ Show less
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;