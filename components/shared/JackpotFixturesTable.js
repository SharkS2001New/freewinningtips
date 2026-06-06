// components/JackpotFixturesTable.js
import DateTimeToUsersTimezone from '@/components/functions/DatetimeToUsersTimezone';

const JackpotFixturesTable = ({ 
  fixtures, 
  jackpotName = "Jackpot Predictions", 
  jackpotData = { startDate: "", endDate: "" },
  showDateColumn = true 
}) => {
  const TeamLogo = ({ name, logo, className, size = 18 }) => {
    if (logo) {
      return (
        <img
          src={logo}
          alt={name || ''}
          className={className}
          width={size}
          height={size}
          loading="lazy"
          style={{ objectFit: 'contain', flexShrink: 0 }}
        />
      );
    }
    return <div className={className} aria-hidden="true" />;
  };

  const getPrediction1x2 = (homePct, drawPct, awayPct) => {
    if (homePct > drawPct && homePct > awayPct) return "1";
    if (awayPct > homePct && awayPct > drawPct) return "2";
    return "X";
  };

  const getDoubleChancePrediction = (homePct, drawPct, awayPct) => {
    const percentages = [
      { label: "1", value: homePct },
      { label: "X", value: drawPct },
      { label: "2", value: awayPct },
    ];
    percentages.sort((a, b) => b.value - a.value);
    // Restore natural 1 / X / 2 order so we get "1X", "12", "X2" — never reversed
    const top2 = new Set(percentages.slice(0, 2).map(p => p.label));
    return ["1", "X", "2"].filter(l => top2.has(l)).join("");
  };

  const wonStyle = {
    fontWeight: "bold", borderRadius: "50%", width: "18px", height: "18px",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "green", color: "white", fontSize: "11px", marginLeft: "4px",
    flexShrink: 0,
  };

  const lostStyle = {
    fontWeight: "bold", borderRadius: "50%", width: "18px", height: "18px",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "red", color: "white", fontSize: "11px", marginLeft: "4px",
    flexShrink: 0,
  };

  // Green if pred1x2 OR double-chance won; red only when both lost
  const getResultIcon = (pred1x2, predDC, goalsHome, goalsAway) => {
    if (goalsHome === "-" || goalsAway === "-") return null;
    const h = parseInt(goalsHome);
    const a = parseInt(goalsAway);
    const wonWith = (tip) => {
      if (tip === "1")  return h > a;
      if (tip === "X")  return h === a;
      if (tip === "2")  return h < a;
      if (tip === "1X") return h >= a;
      if (tip === "X2") return h <= a;
      if (tip === "12") return h !== a;
      return false;
    };
    if (wonWith(pred1x2) || wonWith(predDC)) return <span style={wonStyle}>✓</span>;
    return <span style={lostStyle}>✗</span>;
  };

  const parseScores = (fixture) => {
    try {
      const s = typeof fixture.scores === "string" ? JSON.parse(fixture.scores) : fixture.scores;
      const ft = s?.fulltime;
      if (ft?.home !== null && ft?.away !== null && ft?.home !== undefined) {
        return { home: ft.home, away: ft.away };
      }
    } catch {}
    return { home: "-", away: "-" };
  };

  const getGameCount = () => {
    return fixtures.length;
  };

  return (
    <>
      <style jsx>{`
        .jp-root {
          font-family: Arial, sans-serif;
          font-size: 13px;
          color: #222;
          background: #f5f5f5;
          min-height: 100vh;
        }

        .jp-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 12px;
        }

        /* Header */
        .jp-header {
          background: #2e7d32;
          color: #fff;
          padding: 12px 18px;
          border-radius: 6px 6px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }

        .jp-header h1 {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }

        .jp-header-dates {
          font-size: 11px;
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .jp-header-dates span {
          color: #ff6b6b;
          font-weight: 600;
        }

        /* ===== DESKTOP TABLE ===== */
        .jp-table-wrap {
          overflow-x: auto;
          background: #fff;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 6px 6px;
        }

        .jp-table {
          width: 100%;
          border-collapse: collapse;
          min-width: ${showDateColumn ? '700px' : '600px'};
        }

        .jp-table thead tr {
          background: #2e7d32;
          color: #fff;
        }

        .jp-table thead th {
          padding: 8px 10px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          border: none;
        }

        .jp-table thead th.th-teams {
          text-align: left;
        }

        .jp-table tbody tr.fixture-row {
          border-bottom: 1px solid #e8e8e8;
        }

        .jp-table tbody tr.fixture-row:hover {
          background: #f9fafb;
        }

        .jp-table td {
          padding: 6px 8px;
          vertical-align: middle;
          text-align: center;
          border: none;
        }

        .td-num {
          font-size: 12px;
          font-weight: 600;
          color: #555;
          width: 30px;
        }

        .td-date {
          width: 85px;
          color: #777;
          font-size: 10px;
          line-height: 1.5;
        }

        .td-teams {
          text-align: left !important;
          min-width: 170px;
          padding: 4px 8px !important;
        }

        .team-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 2px 0;
        }

        .team-logo-placeholder,
        .team-logo-img {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .team-logo-placeholder {
          background: #e8e8e8;
        }

        .team-name-txt {
          font-size: 12px;
          font-weight: 500;
          color: #222;
        }

        .td-scores {
          width: 70px;
        }

        .score-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: #555;
          font-size: 12px;
          font-weight: 600;
        }

        /* 1x2 — horizontal 3 badges */
        .td-1x2 {
          min-width: 120px;
        }

        .pct-row {
          display: flex;
          gap: 4px;
          justify-content: center;
        }

        .pct-box {
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 3px 6px;
          font-size: 11px;
          font-weight: 600;
          color: #333;
          min-width: 38px;
          text-align: center;
          background: #fafafa;
        }

        .pct-box.empty { color: #aaa; }

        /* Preds */
        .td-preds { min-width: 80px; }

        .pred-badges {
          display: flex;
          gap: 4px;
          justify-content: center;
        }

        .pred-badge {
          background: #f5a623;
          color: #fff;
          font-weight: 700;
          font-size: 11px;
          padding: 3px 7px;
          border-radius: 3px;
          min-width: 26px;
          text-align: center;
        }

        /* Odds — 3 values stacked vertically */
        .td-odds { min-width: 55px; }

        .odds-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2px 0;
          gap: 1px;
        }

        .odds-val {
          font-size: 11px;
          font-weight: 600;
          color: #333;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .odds-val.winning {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #a5d6a7;
        }

        .odds-val.empty-odd {
          color: #aaa;
        }

        /* ===== MOBILE CARDS ===== */
        .jp-mobile { display: none; }

        @media (max-width: 768px) {
          .jp-table-wrap { display: none; }
          .jp-mobile { display: block; }

          .jp-mobile-list {
            background: #fff;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 6px 6px;
            overflow: hidden;
          }

          .jp-card {
            border-bottom: 1px solid #e8e8e8;
            padding: 6px 8px 4px;
          }

          .jp-card:last-child { border-bottom: none; }

          .jp-card-grid {
            display: grid;
            grid-template-columns: 18px 1fr 50px 40px 50px 44px;
            align-items: center;
            gap: 3px;
          }

          .mc-num {
            font-size: 11px;
            font-weight: 600;
            color: #555;
            text-align: center;
          }

          .mc-team-row {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 1px 0;
          }

          .mc-logo-placeholder,
          .mc-logo-img {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            flex-shrink: 0;
          }

          .mc-logo-placeholder {
            background: #e8e8e8;
          }

          .mc-team-name {
            font-size: 11px;
            font-weight: 500;
            color: #222;
          }

          .mc-scores {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .mc-score-line {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3px;
            font-size: 11px;
            font-weight: 600;
            color: #555;
          }

          .mc-pcts {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .mc-pct {
            font-size: 10px;
            font-weight: 600;
            color: #333;
          }

          .mc-preds {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .mc-pred-badge {
            background: #f5a623;
            color: #fff;
            font-weight: 700;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 3px;
            text-align: center;
            min-width: 26px;
          }

          .mc-odds {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 2px;
          }

          .mc-odd {
            font-size: 10px;
            font-weight: 600;
            color: #333;
            padding: 1px 4px;
            border-radius: 3px;
          }

          .mc-odd.winning {
            background: #e8f5e9;
            color: #2e7d32;
            border: 1px solid #a5d6a7;
          }

          .mc-odd.empty-odd {
            color: #aaa;
          }

          .jp-card-date {
            padding-left: 21px;
            margin-top: 3px;
            font-size: 10px;
            color: #888;
          }
        }
      `}</style>

      <div className="jp-root">
        <div className="jp-container">
          <div className="jp-header">
            <h1>{jackpotName} Prediction {getGameCount()} Games</h1>
            <div className="jp-header-dates">
              <span>Start: {jackpotData.startDate || "N/A"}</span> -
              <span>End: {jackpotData.endDate || "N/A"}</span>
            </div>
          </div>

          {/* ===== DESKTOP TABLE ===== */}
          <div className="jp-table-wrap">
            <table className="jp-table">
              <thead>
                <tr>
                  <th style={{ width: 30 }}>#</th>
                  {showDateColumn && <th style={{ width: 85 }}>Date</th>}
                  <th className="th-teams">Teams</th>
                  <th>Score</th>
                  <th>1x2</th>
                  <th>Preds</th>
                  <th>Odds</th>
                </tr>
              </thead>
              <tbody>
                {fixtures.map((fixture, index) => {
                  const homePct = parseInt(fixture.percent_pred_home) || 0;
                  const drawPct = parseInt(fixture.percent_pred_draw) || 0;
                  const awayPct = parseInt(fixture.percent_pred_away) || 0;
                  const hasPct = !!(fixture.percent_pred_home && homePct + drawPct + awayPct > 0);

                  const pred1x2 = getPrediction1x2(homePct, drawPct, awayPct);
                  const predDC = getDoubleChancePrediction(homePct, drawPct, awayPct);
                  const scores = parseScores(fixture);
                  const formattedDate = fixture.date ? DateTimeToUsersTimezone(fixture.date) : "";

                  const homeOdd = fixture.bets_home || null;
                  const drawOdd = fixture.bets_draw || null;
                  const awayOdd = fixture.bets_away || null;

                  // Win/lost icon — only when real scores are available
                  const resultIcon = getResultIcon(pred1x2, predDC, scores.home, scores.away);

                  return (
                    <tr key={fixture.fixture_id || index} className="fixture-row">
                      <td className="td-num">{fixture.jackpot_position || index + 1}</td>
                      {showDateColumn && (
                        <td className="td-date">
                          {formattedDate.split(" ").map((part, i) => (
                            <div key={i}>{part}</div>
                          ))}
                        </td>
                      )}
                      <td className="td-teams">
                        <div className="team-row">
                          <TeamLogo
                            name={fixture.home_team_name}
                            logo={fixture.home_team_logo}
                            className={fixture.home_team_logo ? 'team-logo-img' : 'team-logo-placeholder'}
                          />
                          <span className="team-name-txt">{fixture.home_team_name}</span>
                        </div>
                        <div className="team-row">
                          <TeamLogo
                            name={fixture.away_team_name}
                            logo={fixture.away_team_logo}
                            className={fixture.away_team_logo ? 'team-logo-img' : 'team-logo-placeholder'}
                          />
                          <span className="team-name-txt">{fixture.away_team_name}</span>
                        </div>
                      </td>
                      <td className="td-scores">
                        <div className="score-line">
                          {resultIcon ? (
                            <>
                              {scores.home} : {scores.away}
                              {resultIcon}
                            </>
                          ) : (scores.home !== "-" ? `${scores.home} : ${scores.away}` : <span style={{ color: '#aaa' }}>-</span>)}
                        </div>
                      </td>
                      <td className="td-1x2">
                        <div className="pct-row">
                          <span className={`pct-box${!hasPct ? " empty" : ""}`}>{hasPct ? `${homePct}%` : "-"}</span>
                          <span className={`pct-box${!hasPct ? " empty" : ""}`}>{hasPct ? `${drawPct}%` : "-"}</span>
                          <span className={`pct-box${!hasPct ? " empty" : ""}`}>{hasPct ? `${awayPct}%` : "-"}</span>
                        </div>
                      </td>
                      <td className="td-preds">
                        <div className="pred-badges">
                          <span className="pred-badge">{pred1x2}</span>
                          <span className="pred-badge">{predDC}</span>
                        </div>
                      </td>
                      <td className="td-odds">
                        <div className="odds-stack">
                          <span className={`odds-val${pred1x2 === "1" ? " winning" : ""}${!homeOdd ? " empty-odd" : ""}`}>
                            {homeOdd || "--"}
                          </span>
                          <span className={`odds-val${pred1x2 === "X" ? " winning" : ""}${!drawOdd ? " empty-odd" : ""}`}>
                            {drawOdd || "--"}
                          </span>
                          <span className={`odds-val${pred1x2 === "2" ? " winning" : ""}${!awayOdd ? " empty-odd" : ""}`}>
                            {awayOdd || "--"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ===== MOBILE CARDS ===== */}
          <div className="jp-mobile">
            <div className="jp-mobile-list">
              {fixtures.map((fixture, index) => {
                const homePct = parseInt(fixture.percent_pred_home) || 0;
                const drawPct = parseInt(fixture.percent_pred_draw) || 0;
                const awayPct = parseInt(fixture.percent_pred_away) || 0;
                const hasPct = !!(fixture.percent_pred_home && homePct + drawPct + awayPct > 0);

                const pred1x2 = getPrediction1x2(homePct, drawPct, awayPct);
                const predDC = getDoubleChancePrediction(homePct, drawPct, awayPct);
                const scores = parseScores(fixture);
                const formattedDate = fixture.date ? DateTimeToUsersTimezone(fixture.date) : "";

                const homeOdd = fixture.bets_home || null;
                const drawOdd = fixture.bets_draw || null;
                const awayOdd = fixture.bets_away || null;

                // Win/lost icon — only when real scores are available
                const resultIcon = getResultIcon(pred1x2, predDC, scores.home, scores.away);

                return (
                  <div key={fixture.fixture_id || index} className="jp-card">
                    <div className="jp-card-grid">
                      <div className="mc-num">{fixture.jackpot_position || index + 1}</div>

                      <div className="mc-teams">
                        <div className="mc-team-row">
                          <TeamLogo
                            name={fixture.home_team_name}
                            logo={fixture.home_team_logo}
                            className={fixture.home_team_logo ? 'mc-logo-img' : 'mc-logo-placeholder'}
                            size={16}
                          />
                          <span className="mc-team-name">{fixture.home_team_name}</span>
                        </div>
                        <div className="mc-team-row">
                          <TeamLogo
                            name={fixture.away_team_name}
                            logo={fixture.away_team_logo}
                            className={fixture.away_team_logo ? 'mc-logo-img' : 'mc-logo-placeholder'}
                            size={16}
                          />
                          <span className="mc-team-name">{fixture.away_team_name}</span>
                        </div>
                      </div>

                      <div className="mc-scores">
                        <div className="mc-score-line">
                          {resultIcon ? (
                            <>
                              {scores.home} : {scores.away}
                              {resultIcon}
                            </>
                          ) : (scores.home !== "-" ? `${scores.home} : ${scores.away}` : <span style={{ color: '#aaa' }}>-</span>)}
                        </div>
                      </div>

                      <div className="mc-pcts">
                        <span className="mc-pct">{hasPct ? `${homePct}%` : "-"}</span>
                        <span className="mc-pct">{hasPct ? `${drawPct}%` : "-"}</span>
                        <span className="mc-pct">{hasPct ? `${awayPct}%` : "-"}</span>
                      </div>

                      <div className="mc-preds">
                        <span className="mc-pred-badge">{pred1x2}</span>
                        <span className="mc-pred-badge">{predDC}</span>
                      </div>

                      <div className="mc-odds">
                        <span className={`mc-odd${pred1x2 === "1" ? " winning" : ""}${!homeOdd ? " empty-odd" : ""}`}>
                          {homeOdd || "--"}
                        </span>
                        <span className={`mc-odd${pred1x2 === "X" ? " winning" : ""}${!drawOdd ? " empty-odd" : ""}`}>
                          {drawOdd || "--"}
                        </span>
                        <span className={`mc-odd${pred1x2 === "2" ? " winning" : ""}${!awayOdd ? " empty-odd" : ""}`}>
                          {awayOdd || "--"}
                        </span>
                      </div>
                    </div>

                    {showDateColumn && <div className="jp-card-date">{formattedDate}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JackpotFixturesTable;