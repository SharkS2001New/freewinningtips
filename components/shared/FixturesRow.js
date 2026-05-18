// components/FixturesRow.js
import { useState, useEffect } from 'react';

import DoubleChanceWinningTeam    from "../functions/double_chance_winning_team_and_odd";
import WinningTeamPred1x2         from "../functions/determine_winning_team_and_odd";
import ComputeFixtureAverage      from "../functions/ComputefixtureAverage";
import UnderOverWinningTeamAndOdd from "../functions/under_over_winning_team_and_odd";
import DetermineWinningOrLost     from "../functions/determine_won_or_lost";

// ---------------------------------------------------------------------------
// Team Forms Cache
// Calls /api/team-forms which handles disk caching server-side.
// In-memory cache prevents duplicate requests within the same page session.
// ---------------------------------------------------------------------------
class TeamFormsCache {
  constructor() {
    this.memCache        = new Map(); // string id -> form data (session memory)
    this.pendingRequests = new Map(); // batchKey -> Promise (dedup in-flight)
  }

  async fetchTeamForms(teamIds, fixtureDate) {
    if (!teamIds?.length) return {};

    const strIds     = [...new Set(teamIds.map(String))];
    const uncachedIds = strIds.filter(id => !this.memCache.has(`${fixtureDate}_${id}`));

    // All in memory — return immediately
    if (uncachedIds.length === 0) {
      return Object.fromEntries(
        strIds.map(id => [id, this.memCache.get(`${fixtureDate}_${id}`)]).filter(([, v]) => v)
      );
    }

    // Batch uncached into groups of 10
    const batches = [];
    for (let i = 0; i < uncachedIds.length; i += 10) {
      batches.push(uncachedIds.slice(i, i + 10));
    }

    const batchResults = await Promise.all(
      batches.map(batch => this.fetchBatch(batch, fixtureDate))
    );

    // Populate memory cache
    const allFetched = Object.assign({}, ...batchResults);
    Object.entries(allFetched).forEach(([id, data]) => {
      this.memCache.set(`${fixtureDate}_${String(id)}`, data);
    });

    // Return all requested IDs
    const result = {};
    strIds.forEach(id => {
      const data = this.memCache.get(`${fixtureDate}_${id}`);
      if (data) result[id] = data;
    });
    return result;
  }

  async fetchBatch(teamIds, fixtureDate) {
    const sorted   = [...teamIds].sort();
    const batchKey = `${fixtureDate}_${sorted.join(',')}`;

    // Deduplicate in-flight requests
    if (this.pendingRequests.has(batchKey)) {
      return this.pendingRequests.get(batchKey);
    }

    const promise = (async () => {
      try {
        // Call our own API route — it handles disk caching
        const res = await fetch(
          `/api/team-forms?team_ids=${sorted.join(',')}&fixture_date=${fixtureDate}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json.data || {};
      } catch (err) {
        console.error('[TeamFormsCache] Fetch error:', err.message);
        return {};
      } finally {
        this.pendingRequests.delete(batchKey);
      }
    })();

    this.pendingRequests.set(batchKey, promise);
    return promise;
  }
}

const teamFormsCache = new TeamFormsCache();

// ---------------------------------------------------------------------------
// Tip -> bet market mapping
// API stores "Over 2.5" (with space); tipText is "Over2.5" (no space)
// ---------------------------------------------------------------------------
const TIP_TO_BET = {
  '1X': ['Double Chance', 'Home/Draw'],
  'X2': ['Double Chance', 'Draw/Away'],
  '12': ['Double Chance', 'Home/Away'],

  'Over1.5':  ['Goals Over/Under', 'Over 1.5'],
  'Under1.5': ['Goals Over/Under', 'Under 1.5'],
  'Over2.5':  ['Goals Over/Under', 'Over 2.5'],
  'Under2.5': ['Goals Over/Under', 'Under 2.5'],
  'Over3.5':  ['Goals Over/Under', 'Over 3.5'],
  'Under3.5': ['Goals Over/Under', 'Under 3.5'],

  'GG':  ['Both Teams Score', 'Yes'],
  'Yes': ['Both Teams Score', 'Yes'],
  'No':  ['Both Teams Score', 'No'],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const safeOdds = (val) => {
  if (!val || (typeof val !== 'string' && typeof val !== 'number')) return '-';
  return String(val);
};

function getOddsFromDetails(betDetails, betType, value) {
  try {
    if (!betDetails) return null;
    const bets     = typeof betDetails === 'string' ? JSON.parse(betDetails) : betDetails;
    const category = bets.find(b => b.name === betType);
    if (!category?.values) return null;
    const entry = category.values.find(v => String(v.value) === String(value));
    return entry?.odd ?? null;
  } catch {
    return null;
  }
}

function getOddForTip(tipText, fixture) {
  if (tipText === '1') return safeOdds(fixture.bets_home);
  if (tipText === 'X') return safeOdds(fixture.bets_draw);
  if (tipText === '2') return safeOdds(fixture.bets_away);

  const mapping = TIP_TO_BET[tipText];
  if (!mapping) return '-';

  const odd = getOddsFromDetails(fixture.bet_goals_in_details, mapping[0], mapping[1]);
  return safeOdds(odd);
}

// ---------------------------------------------------------------------------
// Form dot components
// ---------------------------------------------------------------------------

const FormDot = ({ result }) => {
  const map = { W: 'dot-w', L: 'dot-l', D: 'dot-d' };
  return <span className={`form-dot ${map[result] ?? 'dot-d'}`}>{result}</span>;
};

// Animated skeleton circles shown while form data is loading
const FormDotsSkeleton = () => (
  <div className="form-dots">
    {[...Array(6)].map((_, i) => (
      <span key={i} className="form-dot form-dot-skeleton" />
    ))}
    <style jsx>{`
      .form-dot-skeleton {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
        margin: 0 2px;
      }
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

// Empty circles shown when no form data exists at all
const FormDotsEmpty = () => (
  <div className="form-dots">
    {[...Array(6)].map((_, i) => (
      <span key={i} className="form-dot form-dot-empty" />
    ))}
    <style jsx>{`
      .form-dot-empty {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px dashed #ccc;
        margin: 0 2px;
        opacity: 0.5;
      }
    `}</style>
  </div>
);

// ---------------------------------------------------------------------------
// Single match row
// ---------------------------------------------------------------------------

const MatchRow = ({ fixture, predictionType = 'all', teamForms = {}, formsLoading = false }) => {
  const homeTeamId = String(fixture.home_team_id);
  const awayTeamId = String(fixture.away_team_id);

  const homeFormData = teamForms[homeTeamId];
  const awayFormData = teamForms[awayTeamId];

  // Show skeleton while loading and no data yet for this team
  const showHomeSkeleton = formsLoading && !homeFormData;
  const showAwaySkeleton = formsLoading && !awayFormData;

  // Resolve form string: API data > fixture fallback fields
  const homeFormStr = homeFormData?.form_string || fixture.home_form || fixture.teams_perfomance_home || '';
  const awayFormStr = awayFormData?.form_string || fixture.away_form || fixture.teams_perfomance_away || '';

  const homeForm = homeFormStr ? homeFormStr.split(' ').slice(0, 6) : [];
  const awayForm = awayFormStr ? awayFormStr.split(' ').slice(0, 6) : [];

  // Scores
  const homeScore   = fixture.goals_home !== null ? fixture.goals_home : '';
  const awayScore   = fixture.goals_away !== null ? fixture.goals_away : '';
  const hasScore    = homeScore !== '' && awayScore !== '';
  const matchStatus = fixture.status_short || (hasScore ? 'FT' : 'NS');

  // Predictions
  const winningtip = WinningTeamPred1x2(
    fixture.percent_pred_home, fixture.percent_pred_draw, fixture.percent_pred_away,
    fixture.goals_home, fixture.goals_away
  );
  const doubleChancewinningTip = DoubleChanceWinningTeam(
    fixture.percent_pred_home, fixture.percent_pred_draw, fixture.percent_pred_away,
    fixture.goals_home, fixture.goals_away
  );
  const fixturesAverage = ComputeFixtureAverage(
    fixture.teams_perfomance_home_for,  fixture.teams_perfomance_home_aganist,
    fixture.teams_perfomance_away_for,  fixture.teams_perfomance_away_aganist,
    fixture.teams_games_played_home,    fixture.teams_games_played_away
  );
  const winning_team_probs = UnderOverWinningTeamAndOdd(fixturesAverage, false);

  // Resolve tip + probability
  let tipText = '';
  let tipProb  = '74';

  switch (predictionType) {
    case 'double-chance':
      tipText = doubleChancewinningTip[0];
      tipProb = doubleChancewinningTip[2] || '65';
      break;

    case '1-5-goals':
      tipText = winning_team_probs !== '-' ? `${winning_team_probs}1.5` : '-';
      tipProb = winning_team_probs === 'Over' ? '68' : '72';
      break;

    case '2-5-goals':
      tipText = winning_team_probs !== '-' ? `${winning_team_probs}2.5` : '-';
      tipProb = winning_team_probs === 'Over' ? '65' : '70';
      break;

    case '3-5-goals':
      tipText = winning_team_probs !== '-' ? `${winning_team_probs}3.5` : '-';
      tipProb = winning_team_probs === 'Over' ? '60' : '68';
      break;

    case 'gg-no-gg':
      tipText = fixture.both_team_to_score || 'GG';
      tipProb = fixture.both_team_to_score_prob || '55';
      break;

    case '1x2':
      tipText = winningtip[0] || '-';
      tipProb = winningtip[2] || '60';
      break;

    default: {
      const avg = parseFloat(fixturesAverage);
      if ((fixturesAverage < 2.0 || fixturesAverage > 3.0) && fixturesAverage !== '-') {
        tipText = avg > 2.5 ? 'Over2.5' : 'Under2.5';
        tipProb = avg > 2.5 ? '68' : '72';
      } else {
        const lowConf =
          (winningtip[0] === '1' && parseFloat(fixture.percent_pred_home) < 49) ||
          (winningtip[0] === 'X' && parseFloat(fixture.percent_pred_draw)  < 49) ||
          (winningtip[0] === '2' && parseFloat(fixture.percent_pred_away)  < 49);

        tipText = lowConf ? doubleChancewinningTip[0] : winningtip[0];
        tipProb = lowConf
          ? (doubleChancewinningTip[2] || '65')
          : (winningtip[2] || '60');
      }
      break;
    }
  }

  const tipOdds   = tipText && tipText !== '-' ? getOddForTip(tipText, fixture) : '-';
  const tipResult = tipText && tipText !== '-'
    ? DetermineWinningOrLost(tipText, fixture.goals_home, fixture.goals_away)
    : null;

  const matchTime = fixture.date
    ? fixture.date.split(' ')[1]
    : (fixture.kickoff_time || '19:00');

  // Render the right form dots component
  const renderFormDots = (showSkeleton, form) => {
    if (showSkeleton)    return <FormDotsSkeleton />;
    if (form.length > 0) return <div className="form-dots">{form.map((r, i) => <FormDot key={i} result={r} />)}</div>;
    return <FormDotsEmpty />;
  };

  return (
    <div className="match-row">
      {/* HOME TEAM */}
      <div className="team team-home">
        <span className="team-name">{fixture.home_team_name || fixture.home_team || '—'}</span>
        {renderFormDots(showHomeSkeleton, homeForm)}
      </div>

      {/* CENTER */}
      <div className="match-center">
        {hasScore ? (
          <>
            <span className="match-status">{matchStatus}</span>
            <div className="match-score-wrapper">
              <span className="match-score">{homeScore} - {awayScore}</span>
              {tipResult}
            </div>
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
        {renderFormDots(showAwaySkeleton, awayForm)}
      </div>

      {/* BADGES */}
      <div className="match-badges">
        <div className="badge-pill">
          <span className="badge-label">TIP</span>
          <span className="badge-val">{tipText || '-'}</span>
        </div>
        <div className="badge-pill">
          <span className="badge-label">ODD</span>
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

// ---------------------------------------------------------------------------
// League card
// ---------------------------------------------------------------------------

const LeagueCard = ({ league, fixtures, predictionType, teamForms, formsLoading, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  const getFlag = (country) => ({
    England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Spain: '🇪🇸',    Italy: '🇮🇹',
    Germany: '🇩🇪',       France: '🇫🇷',   Portugal: '🇵🇹',
    Norway:  '🇳🇴',       Belgium: '🇧🇪',  Netherlands: '🇳🇱',
    Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  }[country] || '🏆');

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
            <MatchRow
              key={fixture.fixture_id || idx}
              fixture={fixture}
              predictionType={predictionType}
              teamForms={teamForms}
              formsLoading={formsLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const FixturesRow = ({
  fixtures,
  emptyMessage = "No predictions available for today. Check back soon!",
  predictionType = 'all',
}) => {
  const [teamForms,    setTeamForms]    = useState({});
  const [formsLoading, setFormsLoading] = useState(true);

  useEffect(() => {
    if (!fixtures?.length) {
      setFormsLoading(false);
      return;
    }

    const teamIds = [...new Set(
      fixtures.flatMap(f => [f.home_team_id, f.away_team_id]).filter(Boolean)
    )];

    if (!teamIds.length) {
      setFormsLoading(false);
      return;
    }

    const today       = new Date();
    const todayStr    = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const fixtureDate = fixtures[0]?.unformatedDate || todayStr;

    setFormsLoading(true);

    teamFormsCache.fetchTeamForms(teamIds, fixtureDate)
      .then(forms => setTeamForms(forms))
      .catch(err  => console.error('[FixturesRow] Error loading forms:', err))
      .finally(()  => setFormsLoading(false));

  }, [fixtures]);

  const groupByLeague = (list) => {
    const map = new Map();
    list.forEach(f => {
      const key = f.league_name || f.league || 'Other';
      if (!map.has(key)) {
        map.set(key, {
          league: { name: key, country: f.country_name || f.country || 'International' },
          fixtures: [],
        });
      }
      map.get(key).fixtures.push(f);
    });
    return Array.from(map.values());
  };

  const groups = groupByLeague(fixtures);

  if (!groups.length) {
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
        <LeagueCard
          key={idx}
          league={group.league}
          fixtures={group.fixtures}
          predictionType={predictionType}
          teamForms={teamForms}
          formsLoading={formsLoading}
        />
      ))}
    </div>
  );
};

export default FixturesRow;