// components/FixturesRow.js
import { useState } from 'react';

// Import the prediction functions (make sure these paths are correct)
import DoubleChanceWinningTeam from "../functions/double_chance_winning_team_and_odd";
import WinningTeamPred1x2 from "../functions/determine_winning_team_and_odd";
import ComputeFixtureAverage from "../functions/ComputefixtureAverage";
import UnderOverWinningTeamAndOdd from "../functions/under_over_winning_team_and_odd";
import DetermineWinningOrLost from "../functions/determine_won_or_lost";

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
const MatchRow = ({ fixture, predictionType = 'all' }) => {
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

  // Calculate predictions using the same logic as your original code
  const winningtip = WinningTeamPred1x2(
    fixture.percent_pred_home,
    fixture.percent_pred_draw,
    fixture.percent_pred_away,
    fixture.goals_home,
    fixture.goals_away
  );

  const doubleChancewinningTip = DoubleChanceWinningTeam(
    fixture.percent_pred_home,
    fixture.percent_pred_draw,
    fixture.percent_pred_away,
    fixture.goals_home,
    fixture.goals_away
  );

  const fixturesAverage = ComputeFixtureAverage(
    fixture.teams_perfomance_home_for,
    fixture.teams_perfomance_home_aganist,
    fixture.teams_perfomance_away_for,
    fixture.teams_perfomance_away_aganist,
    fixture.teams_games_played_home,
    fixture.teams_games_played_away
  );

  const winning_team_probs = UnderOverWinningTeamAndOdd(fixturesAverage, false);

  // Determine which tip to show based on predictionType
  let tipText = '';
  let tipOdds = '-';
  let tipProb = '74';

  // Helper: ensure odds is always a plain string, never JSX or undefined
  const safeOdds = (val) => {
    if (!val || (typeof val !== 'string' && typeof val !== 'number')) return '-';
    return String(val);
  };

  switch (predictionType) {
    case 'double-chance':
      tipText = doubleChancewinningTip[0];
      tipOdds = safeOdds(doubleChancewinningTip[1] || fixture.bets_home);
      tipProb = doubleChancewinningTip[2] || '65';
      break;

    case '1-5-goals':
      if (winning_team_probs !== "-") {
        tipText = winning_team_probs + '1.5';
        tipOdds = safeOdds(fixture.bets_home);
        tipProb = winning_team_probs === "Over" ? '68' : '72';
      } else {
        tipText = '-';
      }
      break;

    case '2-5-goals':
      if (winning_team_probs !== "-") {
        tipText = winning_team_probs + '2.5';
        tipOdds = safeOdds(fixture.bets_home);
        tipProb = winning_team_probs === "Over" ? '65' : '70';
      } else {
        tipText = '-';
      }
      break;

    case '3-5-goals':
      if (winning_team_probs !== "-") {
        tipText = winning_team_probs + '3.5';
        tipOdds = safeOdds(fixture.bets_home);
        tipProb = winning_team_probs === "Over" ? '60' : '68';
      } else {
        tipText = '-';
      }
      break;

    case 'gg-no-gg':
      tipText = fixture.both_team_to_score || 'GG';
      tipOdds = safeOdds(fixture.bets_home);
      tipProb = fixture.both_team_to_score_prob || '55';
      break;

    default: // 'all' or '1x2'
      if ((fixturesAverage < 2.0 || fixturesAverage > 3.0) && fixturesAverage !== "-") {
        if (parseFloat(fixturesAverage) > 2.5) {
          tipText = "Over2.5";
          tipOdds = safeOdds(fixture.bets_home);
          tipProb = '68';
        } else {
          tipText = "Under2.5";
          tipOdds = safeOdds(fixture.bets_home);
          tipProb = '72';
        }
      } else {
        if ((winningtip[0] === "1" && parseFloat(fixture.percent_pred_home) < 49) ||
            (winningtip[0] === "X" && parseFloat(fixture.percent_pred_draw) < 49) ||
            (winningtip[0] === "2" && parseFloat(fixture.percent_pred_away) < 49)) {
          tipText = doubleChancewinningTip[0];
          tipOdds = safeOdds(doubleChancewinningTip[1] || fixture.bets_home);
          tipProb = doubleChancewinningTip[2] || '65';
        } else {
          tipText = winningtip[0];
          tipOdds = safeOdds(winningtip[1] || fixture.bets_home);
          tipProb = winningtip[2] || '60';
        }
      }
      break;
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
            <span className="match-score">
              {homeScore} - {awayScore}
              {tipText && tipText !== '-' && DetermineWinningOrLost(tipText, fixture.goals_home, fixture.goals_away)}
            </span>
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
const LeagueCard = ({ league, fixtures, predictionType, defaultOpen = true }) => {
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
            <MatchRow key={fixture.fixture_id || idx} fixture={fixture} predictionType={predictionType} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Fixtures Component
const FixturesRow = ({ fixtures, emptyMessage = "No predictions available for today. Check back soon!", predictionType = 'all' }) => {
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
        <LeagueCard key={idx} league={group.league} fixtures={group.fixtures} predictionType={predictionType} />
      ))}
    </div>
  );
};

export default FixturesRow;