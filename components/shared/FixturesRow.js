import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buildLeaguePathFromFixture } from '@/components/functions/leagueUrl';

// ---------------------------------------------------------------------------
// Team Forms Cache
// ---------------------------------------------------------------------------
class TeamFormsCache {
  constructor() {
    this.memCache = new Map();
    this.pendingRequests = new Map();
  }

  async fetchTeamForms(teamIds, fixtureDate) {
    if (!teamIds?.length) return {};

    const strIds = [...new Set(teamIds.map(String))];
    const uncachedIds = strIds.filter(id => !this.memCache.has(`${fixtureDate}_${id}`));

    if (uncachedIds.length === 0) {
      return Object.fromEntries(
        strIds.map(id => [id, this.memCache.get(`${fixtureDate}_${id}`)]).filter(([, v]) => v)
      );
    }

    const batches = [];
    for (let i = 0; i < uncachedIds.length; i += 10) {
      batches.push(uncachedIds.slice(i, i + 10));
    }

    const batchResults = await Promise.all(
      batches.map(batch => this.fetchBatch(batch, fixtureDate))
    );

    const allFetched = Object.assign({}, ...batchResults);
    Object.entries(allFetched).forEach(([id, data]) => {
      this.memCache.set(`${fixtureDate}_${String(id)}`, data);
    });

    const result = {};
    strIds.forEach(id => {
      const data = this.memCache.get(`${fixtureDate}_${id}`);
      if (data) result[id] = data;
    });
    return result;
  }

  async fetchBatch(teamIds, fixtureDate) {
    const sorted = [...teamIds].sort();
    const batchKey = `${fixtureDate}_${sorted.join(',')}`;

    if (this.pendingRequests.has(batchKey)) {
      return this.pendingRequests.get(batchKey);
    }

    const promise = (async () => {
      try {
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
// ---------------------------------------------------------------------------
const TIP_TO_BET = {
  '1': ['Match Winner', 'Home'],
  'X': ['Match Winner', 'Draw'],
  '2': ['Match Winner', 'Away'],
  '1X': ['Double Chance', 'Home/Draw'],
  'X2': ['Double Chance', 'Draw/Away'],
  '12': ['Double Chance', 'Home/Away'],
  'Over2.5': ['Goals Over/Under', 'Over 2.5'],
  'Under2.5': ['Goals Over/Under', 'Under 2.5'],
  'YES': ['Both Teams Score', 'Yes'],
  'NO': ['Both Teams Score', 'No'],
};

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

const safeOdds = (val) => {
  if (!val || (typeof val !== 'string' && typeof val !== 'number')) return '-';
  return String(val);
};

function getOddForTip(tipText, fixture) {
  const odds = fixture.odds || {};
  
  switch (tipText) {
    case '1': return safeOdds(odds.home);
    case 'X': return safeOdds(odds.draw);
    case '2': return safeOdds(odds.away);
    case '1X': return safeOdds(odds.double_chance?.home_draw);
    case 'X2': return safeOdds(odds.double_chance?.draw_away);
    case '12': return safeOdds(odds.double_chance?.home_away);
    case 'Over2.5': return safeOdds(odds.over_under?.over_2_5);
    case 'Under2.5': return safeOdds(odds.over_under?.under_2_5);
    case 'YES': return safeOdds(odds.btts?.yes);
    case 'NO': return safeOdds(odds.btts?.no);
    default: return '-';
  }
}

function determineTipResult(tipText, homeScore, awayScore) {
  if (homeScore === null || awayScore === null) return null;
  
  switch (tipText) {
    case '1': return homeScore > awayScore ? 'W' : (homeScore === awayScore ? 'L' : 'L');
    case 'X': return homeScore === awayScore ? 'W' : 'L';
    case '2': return awayScore > homeScore ? 'W' : (homeScore === awayScore ? 'L' : 'L');
    case '1X': return homeScore >= awayScore ? 'W' : 'L';
    case 'X2': return awayScore >= homeScore ? 'W' : 'L';
    case '12': return homeScore !== awayScore ? 'W' : 'L';
    case 'Over2.5': return (homeScore + awayScore) > 2.5 ? 'W' : 'L';
    case 'Under2.5': return (homeScore + awayScore) < 2.5 ? 'W' : 'L';
    case 'YES': return homeScore > 0 && awayScore > 0 ? 'W' : 'L';
    case 'NO': return homeScore === 0 || awayScore === 0 ? 'W' : 'L';
    default: return null;
  }
}

// ---------------------------------------------------------------------------
// Form dot components
// ---------------------------------------------------------------------------

const FormDot = ({ result }) => {
  const map = { W: 'dot-w', L: 'dot-l', D: 'dot-d' };
  return <span className={`form-dot ${map[result] ?? 'dot-d'}`}>{result}</span>;
};

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
  // Extract data from new API structure
  const homeTeam = fixture.home_team || {};
  const awayTeam = fixture.away_team || {};
  const match = fixture.match || {};
  const score = fixture.score || {};
  const predictions = fixture.predictions || {};
  const odds = fixture.odds || {};

  const homeTeamId = String(homeTeam.id);
  const awayTeamId = String(awayTeam.id);

  const homeFormData = teamForms[homeTeamId];
  const awayFormData = teamForms[awayTeamId];

  const showHomeSkeleton = formsLoading && !homeFormData;
  const showAwaySkeleton = formsLoading && !awayFormData;

  // Get form strings from API or fallback
  const homeFormStr = homeFormData?.form_string || '';
  const awayFormStr = awayFormData?.form_string || '';

  const homeForm = homeFormStr ? homeFormStr.split('').slice(0, 6) : [];
  const awayForm = awayFormStr ? awayFormStr.split('').slice(0, 6) : [];

  // Scores
  const homeScore = score.home !== null ? score.home : '';
  const awayScore = score.away !== null ? score.away : '';
  const hasScore = homeScore !== '' && awayScore !== '';
  const matchStatus = match.status || (hasScore ? 'FT' : 'NS');

  // Get prediction values from API (already provided)
  const prediction1x2 = predictions["1x2"] || {};
  const doubleChance = predictions.double_chance || {};
  const overUnder = predictions.over_under_2_5 || {};
  const btts = predictions.both_teams_to_score || {};
  const avgGoals = predictions.avg_goals || '-';

  // Helper to get highest probability team from API
  const getHighestProbTeam = () => {
    const home = prediction1x2.home || 0;
    const draw = prediction1x2.draw || 0;
    const away = prediction1x2.away || 0;
    if (home > draw && home > away) return '1';
    if (draw > home && draw > away) return 'X';
    if (away > home && away > draw) return '2';
    return '-';
  };

  // Determine tip based on prediction type
  let tipText = '';
  let tipProb = '';

  switch (predictionType) {
    case 'double-chance':
      // Use API's double chance prediction
      tipText = doubleChance.type || '-';
      tipProb = doubleChance.probability !== null && doubleChance.probability !== undefined 
        ? `${doubleChance.probability}%` 
        : '-';
      break;
      
    case '1-5-goals':
    case '2-5-goals':
    case '3-5-goals':
      // Use API's over/under prediction
      tipText = overUnder.prediction || '-';
      tipProb = overUnder.probability !== null && overUnder.probability !== undefined 
        ? `${overUnder.probability}%` 
        : '-';
      break;
      
    case 'gg-no-gg':
      // Use API's BTTS prediction
      tipText = btts.prediction ? btts.prediction.toUpperCase() : '-';
      tipProb = btts.probability !== null && btts.probability !== undefined 
        ? `${btts.probability}%` 
        : '-';
      break;
      
    case '1x2':
      // Use API's 1x2 prediction
      tipText = getHighestProbTeam();
      const probValue = tipText === '1' ? prediction1x2.home :
                       tipText === 'X' ? prediction1x2.draw :
                       tipText === '2' ? prediction1x2.away : 0;
      tipProb = probValue ? `${probValue}%` : '-';
      break;
      
    default: // 'all' - accumulator / smart selection using API predictions
      const avgGoalsNum = avgGoals !== '-' ? parseFloat(avgGoals) : null;
      const isAvgExtreme = avgGoalsNum !== null && (avgGoalsNum < 2.0 || avgGoalsNum > 3.0);
      
      // Get API's 1x2 prediction
      const winningTeam = getHighestProbTeam();
      const winningProb = winningTeam === '1' ? (prediction1x2.home || 0) :
                          winningTeam === 'X' ? (prediction1x2.draw || 0) :
                          winningTeam === '2' ? (prediction1x2.away || 0) : 0;
      
      // Check if winning probability is low (less than 50%)
      const isWinningProbLow = winningProb < 50 && winningTeam !== '-';
      
      // Check BTTS Yes odds for accumulator (if available from API)
      const bttsYesOdds = odds.btts?.yes ? parseFloat(odds.btts.yes) : null;
      const isBTTSFavorable = bttsYesOdds !== null && bttsYesOdds < 1.40 && btts?.prediction === 'yes';
      
      // Decision tree for accumulator tips - using API's predictions
      if (isBTTSFavorable && btts?.prediction) {
        // Use API's BTTS prediction when odds are very favorable
        tipText = btts.prediction.toUpperCase();
        tipProb = btts.probability !== null && btts.probability !== undefined 
          ? `${btts.probability}%` 
          : '-';
      } else if (isAvgExtreme && overUnder?.prediction) {
        // Use API's Over/Under 2.5 prediction when avg goals is extreme
        tipText = overUnder.prediction;
        tipProb = overUnder.probability !== null && overUnder.probability !== undefined 
          ? `${overUnder.probability}%` 
          : '-';
      } else if (isWinningProbLow && doubleChance?.type) {
        // Use API's Double Chance prediction when winning probability is low
        tipText = doubleChance.type;
        tipProb = doubleChance.probability !== null && doubleChance.probability !== undefined 
          ? `${doubleChance.probability}%` 
          : '-';
      } else {
        // Use API's 1X2 prediction as default
        tipText = winningTeam;
        tipProb = winningProb ? `${winningProb}%` : '-';
      }
      break;
  }

  const tipOdds = tipText && tipText !== '-' ? getOddForTip(tipText, fixture) : '-';
  const tipResult = tipText && tipText !== '-' && hasScore
    ? determineTipResult(tipText, homeScore, awayScore)
    : null;

  const matchTime = match.datetime 
    ? new Date(match.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '19:00';

  const renderFormDots = (showSkeleton, form) => {
    if (showSkeleton) return <FormDotsSkeleton />;
    if (form.length > 0) return <div className="form-dots">{form.map((r, i) => <FormDot key={i} result={r} />)}</div>;
    return <FormDotsEmpty />;
  };

  return (
    <div className="match-row">
      <div className="team team-home">
        <span className="team-name">{homeTeam.name || '—'}</span>
        {renderFormDots(showHomeSkeleton, homeForm)}
      </div>

      <div className="match-center">
        {hasScore ? (
          <>
            <span className="match-status">{matchStatus}</span>
            <div className="match-score-wrapper">
              <span className="match-score">{homeScore} - {awayScore}</span>
              {tipResult && <span className={`tip-result ${tipResult === 'W' ? 'tip-win' : 'tip-lose'}`}>{tipResult}</span>}
            </div>
          </>
        ) : (
          <>
            <span className="match-time">{matchTime}</span>
            <span className="match-vs">VS</span>
          </>
        )}
      </div>

      <div className="team team-away">
        <span className="team-name">{awayTeam.name || '—'}</span>
        {renderFormDots(showAwaySkeleton, awayForm)}
      </div>

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

const LeagueCard = ({
  league,
  fixtures,
  predictionType,
  teamForms,
  formsLoading,
  defaultOpen = true,
  hideLeagueHeader = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const getFlag = (country) => ({
    England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Spain: '🇪🇸', Italy: '🇮🇹',
    Germany: '🇩🇪', France: '🇫🇷', Portugal: '🇵🇹',
    Norway: '🇳🇴', Belgium: '🇧🇪', Netherlands: '🇳🇱',
    Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', Brazil: '🇧🇷', Australia: '🇦🇺',
    Austria: '🇦🇹', Argentina: '🇦🇷',
  }[country] || '🏆');

  const leagueHref = league.leagueId
    ? buildLeaguePathFromFixture({
        league_id: league.leagueId,
        league_name: league.name,
        country_name: league.country,
      })
    : null;

  const leagueLabel = (
    <>
      <span className="league-flag">{getFlag(league.country)}</span>
      {league.country}: {league.name}
    </>
  );

  const showMatches = hideLeagueHeader || open || Boolean(leagueHref);

  return (
    <div className="league-card">
      {!hideLeagueHeader && (
        leagueHref ? (
          <Link href={leagueHref} className="league-header league-header-link">
            <span className="league-name">{leagueLabel}</span>
            <span className="league-chev">↗</span>
          </Link>
        ) : (
          <button type="button" className="league-header" onClick={() => setOpen(!open)}>
            <span className="league-name">{leagueLabel}</span>
            <span className="league-chev">{open ? '▲' : '▼'}</span>
          </button>
        )
      )}
      {showMatches && (
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
  hideLeagueHeader = false,
  skipTeamForms = false,
}) => {
  const [teamForms, setTeamForms] = useState({});
  const [formsLoading, setFormsLoading] = useState(false);

  useEffect(() => {
    if (!fixtures?.length || skipTeamForms) {
      setTeamForms({});
      setFormsLoading(false);
      return;
    }

    const teamIds = [...new Set(
      fixtures.flatMap(f => [f.home_team?.id, f.away_team?.id]).filter(Boolean)
    )];

    if (!teamIds.length) {
      setFormsLoading(false);
      return;
    }

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const fixtureDate = fixtures[0]?.match?.unformatted_date || todayStr;

    setFormsLoading(true);

    teamFormsCache.fetchTeamForms(teamIds, fixtureDate)
      .then(forms => setTeamForms(forms))
      .catch(err => console.error('[FixturesRow] Error loading forms:', err))
      .finally(() => setFormsLoading(false));
  }, [fixtures, skipTeamForms]);

  const groupByLeague = (list) => {
    const map = new Map();
    list.forEach(f => {
      const league = f.league || {};
      const key = league.name || 'Other';
      if (!map.has(key)) {
        map.set(key, {
          league: {
            name: key,
            country: league.country || 'International',
            leagueId: league.id || null,
          },
          fixtures: [],
        });
      }
      if (!map.get(key).league.leagueId && league.id) {
        map.get(key).league.leagueId = league.id;
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
          hideLeagueHeader={hideLeagueHeader}
        />
      ))}
    </div>
  );
};

export default FixturesRow;