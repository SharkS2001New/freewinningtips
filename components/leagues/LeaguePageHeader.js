const LeaguePageHeader = ({
  leagueName,
  countryName,
  countryLogo = '',
  leagueLogo = '',
  leagueShortName = '',
}) => {
  return (
    <div className="league-page-header">
      <div className="league-page-header-inner">
        {countryLogo ? (
          <img src={countryLogo} alt={countryName} className="league-page-flag" loading="lazy" />
        ) : (
          <span className="league-page-flag-placeholder" aria-hidden="true">⚽</span>
        )}
        {leagueLogo ? (
          <img src={leagueLogo} alt={leagueName} className="league-page-logo" loading="lazy" />
        ) : null}
        <div className="league-page-titles">
          <h1 className="league-page-title">
            {leagueName}
            {leagueShortName ? <span className="league-page-short"> ({leagueShortName})</span> : null}
          </h1>
          <p className="league-page-subtitle">{countryName} · Football predictions &amp; 1X2 tips</p>
        </div>
      </div>
    </div>
  );
};

export default LeaguePageHeader;
