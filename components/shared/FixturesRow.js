// components/FixturesRow.js
import { useState } from 'react';

// Form result dot component (W, D, L)
const FormDot = ({ result }) => {
  const map = { W: 'dot-w', L: 'dot-l', D: 'dot-d' };
  return <span className={`form-dot ${map[result] ?? 'dot-d'}`}>{result}</span>;
};

// Generate mock form if API doesn't provide it
const getMockHomeForm = () => {
  const forms = ['W W D B W', 'W W W W D', 'W L W D W', 'D W L W D'];
  return forms[Math.floor(Math.random() * forms.length)];
};

const getMockAwayForm = () => {
  const forms = ['L D L W L', 'W L D L L', 'L W D L W', 'D L L W D'];
  return forms[Math.floor(Math.random() * forms.length)];
};

// Single Match Row Component
const MatchRow = ({ fixture }) => {
  // Extract or generate form strings
  let homeFormStr = fixture.home_form || fixture.teams_perfomance_home || getMockHomeForm();
  let awayFormStr = fixture.away_form || fixture.teams_perfomance_away || getMockAwayForm();
  
  // Split into array of letters, take first 5
  const homeForm = homeFormStr.split(' ').slice(0, 5);
  const awayForm = awayFormStr.split(' ').slice(0, 5);
  
  // Get scores if available
  const homeScore = fixture.goals_home !== null ? fixture.goals_home : '';
  const awayScore = fixture.goals_away !== null ? fixture.goals_away : '';
  const hasScore = homeScore !== '' && awayScore !== '';
  const matchStatus = fixture.status_short || (hasScore ? 'FT' : 'NS');
  
  // Determine the tip based on prediction percentages
  let tipText = 'UNDER 3.5';
  let tipOdds = fixture.odds || '0';
  let tipProb = '74';
  
  if (fixture.percent_pred_home && fixture.bets_home) {
    const homePct = parseInt(fixture.percent_pred_home);
    if (homePct > 60) {
      tipText = `HOME (1)`;
      tipOdds = fixture.bets_home;
      tipProb = homePct;
    } else if (parseInt(fixture.percent_pred_away) > 45) {
      tipText = `AWAY (2)`;
      tipOdds = fixture.bets_away;
      tipProb = fixture.percent_pred_away;
    } else {
      tipText = `UNDER 3.5`;
      tipOdds = fixture.bets_home || '0';
      tipProb = '74';
    }
  }
  
  // Format time if no score
  const matchTime = fixture.date ? fixture.date.split(' ')[1] : (fixture.kickoff_time || '19:00');

  return (
    <div className="match-row">
      {/* HOME TEAM */}
      <div className="team team-home">
        <span className="team-name">{fixture.home_team_name || fixture.home_team || '—'}</span>
        <div className="form-dots">
          {homeForm.map((r, i) => <FormDot key={i} result={r} />)}
        </div>
      </div>

      {/* CENTER: STATUS, SCORE or TIME, VS */}
      <div className="match-center">
        {hasScore ? (
          <>
            <span className="match-status">{matchStatus}</span>
            <span className="match-score">{homeScore} - {awayScore}</span>
          </>
        ) : (
          <>
            <span className="match-time">{matchTime}</span>
            <span className="match-vs">VS</span>
          </>
        )}
      </div>

      {/* AWAY TEAM */}
      <div className="team team-away">
        <span className="team-name">{fixture.away_team_name || fixture.away_team || '—'}</span>
        <div className="form-dots">
          {awayForm.map((r, i) => <FormDot key={i} result={r} />)}
        </div>
      </div>

      {/* TIPS / ODDS / PROB BADGES */}
      <div className="match-badges">
        <div className="badge-pill">
          <span className="badge-label">TIPS</span>
          <span className="badge-val">{tipText}</span>
        </div>
        <div className="badge-pill">
          <span className="badge-label">ODDS</span>
          <span className="badge-val">{tipOdds}</span>
        </div>
        <div className="badge-pill">
          <span className="badge-label">PROB.%</span>
          <span className="badge-val">{tipProb}</span>
        </div>
      </div>
    </div>
  );
};

// League Card Component (Collapsible)
const LeagueCard = ({ league, fixtures, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  
  const getFlag = (country) => {
    const flags = { 
      England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
      Spain: '🇪🇸', 
      Italy: '🇮🇹', 
      Germany: '🇩🇪', 
      France: '🇫🇷', 
      Portugal: '🇵🇹',
      Norway: '🇳🇴'
    };
    return flags[country] || '🏆';
  };
  
  return (
    <div className="league-card">
      <button className="league-header" onClick={() => setOpen(!open)}>
        <span className="league-name">
          <span className="league-flag">{getFlag(league.country)}</span>
          {league.country}: {league.name}
        </span>
        <span className="league-chev">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="match-list">
          {fixtures.map((fixture, idx) => (
            <MatchRow key={fixture.fixture_id || idx} fixture={fixture} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Fixtures Component
const FixturesRow = ({ fixtures, emptyMessage = "No predictions available for today. Check back soon!" }) => {
  // Group fixtures by league
  const groupByLeague = (fixturesList) => {
    const map = new Map();
    fixturesList.forEach(f => {
      const leagueKey = f.league_name || f.league || 'Other';
      if (!map.has(leagueKey)) {
        map.set(leagueKey, {
          league: { 
            name: leagueKey, 
            country: f.country_name || f.country || 'International',
            flag: f.league_flag || ''
          },
          fixtures: []
        });
      }
      map.get(leagueKey).fixtures.push(f);
    });
    return Array.from(map.values());
  };

  const groups = groupByLeague(fixtures);

  if (groups.length === 0) {
    return (
      <div className="empty-state">
        <span>📭</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="predictions-col">
      {groups.map((group, idx) => (
        <LeagueCard key={idx} league={group.league} fixtures={group.fixtures} />
      ))}
    </div>
  );
};

export default FixturesRow;