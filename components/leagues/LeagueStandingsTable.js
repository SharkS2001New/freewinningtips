const FormDot = ({ result }) => {
  const map = { W: 'dot-w', L: 'dot-l', D: 'dot-d' };
  const letter = String(result || '').toUpperCase();
  return <span className={`form-dot ${map[letter] ?? 'dot-d'}`}>{letter}</span>;
};

const LeagueStandingsTable = ({
  standings = [],
  compact = false,
  maxRows,
  leagueName = 'League',
}) => {
  const rows = maxRows ? standings.slice(0, maxRows) : standings;

  if (!rows.length) {
    return (
      <p className="league-empty-note">Standings are not available for this league right now.</p>
    );
  }

  return (
    <div className={`league-card standings-card ${compact ? 'standings-card-compact' : ''}`}>
      <div className="league-header standings-card-header">
        <span className="league-name">
          <span className="league-flag">🏆</span>
          {leagueName} — Standings
        </span>
      </div>

      <div className="standings-list">
        <div className="standings-row standings-row-head" aria-hidden="true">
          <span className="standings-col-rank">#</span>
          <span className="standings-col-team">Team</span>
          <span className="standings-col-stat">P</span>
          <span className="standings-col-stat">W</span>
          <span className="standings-col-stat">D</span>
          <span className="standings-col-stat">L</span>
          <span className="standings-col-stat">GD</span>
          <span className="standings-col-pts">Pts</span>
          <span className="standings-col-form">Form</span>
        </div>

        {rows.map((row) => {
          const team = row.team || {};
          const all = row.all || {};
          const formStr = row.form || '';
          const formLetters = formStr.split('').filter(Boolean).slice(-5);
          const gd = row.goalsDiff;
          const gdDisplay =
            gd == null || gd === ''
              ? '—'
              : gd > 0
                ? `+${gd}`
                : String(gd);

          return (
            <div key={team.id || row.rank} className="standings-row">
              <span className="standings-col-rank standings-rank">{row.rank}</span>
              <div className="standings-col-team">
                {team.logo ? (
                  <img
                    src={team.logo}
                    alt=""
                    className="standings-team-logo"
                    loading="lazy"
                  />
                ) : null}
                <span className="standings-team-name">{team.name}</span>
              </div>
              <span className="standings-col-stat">{all.played ?? '—'}</span>
              <span className="standings-col-stat">{all.win ?? '—'}</span>
              <span className="standings-col-stat">{all.draw ?? '—'}</span>
              <span className="standings-col-stat">{all.lose ?? '—'}</span>
              <span className="standings-col-stat standings-gd">{gdDisplay}</span>
              <span className="standings-col-pts standings-points">{row.points ?? '—'}</span>
              <div className="standings-col-form">
                <div className="form-dots standings-form">
                  {formLetters.length > 0
                    ? formLetters.map((r, i) => <FormDot key={i} result={r} />)
                    : <span className="standings-form-empty">—</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeagueStandingsTable;
