import React, { useState } from "react";
import { buildLeaguePath } from "@/components/functions/detailsUrls";

function CountryLeagueGroup({
  formedleagueName,
  group,
  groupIndex,
  countryName,
  countryFlag,
  urlName,
}) {
  const [rowsToShow, setRowsToShow] = useState(5);

  if (!group[0]?.props?.props?.[0]) return null;

  const gameDetails = group[0].props.props[0].game_details;
  if (!gameDetails) return null;

  const leagueId = gameDetails.league?.id || gameDetails.league_id;
  const originalleagueName = gameDetails.league?.name || gameDetails.league_name || "";
  const leagueType = gameDetails.league?.type || gameDetails.league_type || "League";
  const leagueCountry =
    gameDetails.league?.country || gameDetails.country_name || countryName || "";

  const leagueHref = leagueId && originalleagueName && leagueCountry
    ? buildLeaguePath(leagueCountry, originalleagueName, leagueId)
    : null;
  const standingsHref = leagueHref
    ? buildLeaguePath(leagueCountry, originalleagueName, leagueId, "standings")
    : null;

  return (
    <div key={`${formedleagueName}-${groupIndex}`}>
      <div
        style={{ backgroundColor: "#f0f7f0", padding: "2px" }}
        className="responsive-row fixturesTextSize pb-1 pt-1 mb-1"
      >
        <div className="responsive-cell hide-on-mobile"></div>

        <div className="responsive-cell team-link-x" style={{ textAlign: "left" }}>
          {countryFlag ? (
            <img
              src={countryFlag}
              className="img-fluid league-logo"
              alt={`${countryName}-flag`}
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : null}
          <span style={{ fontWeight: "bold" }}>
            {(countryName || leagueCountry || "").toUpperCase()} :&nbsp;
            {leagueHref ? (
              <a href={leagueHref} className="ml-2 linkTxt">
                {originalleagueName}
              </a>
            ) : (
              originalleagueName
            )}
          </span>
        </div>

        <div className="responsive-cell team-link" style={{ marginLeft: "auto" }}>
          {leagueType === "League" && standingsHref ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a href={standingsHref} className="ml-2 linkTxt">
                <span>Standings</span>
              </a>
            </div>
          ) : null}
        </div>

        <div className="responsive-cell hide-on-mobile"></div>
      </div>

      <div className="responsive-row fixtures-header-row hide-on-mobile">
        <div className="responsive-cell star-cell" aria-hidden="true"></div>
        <div className="responsive-cell team-link" aria-hidden="true"></div>
        <div className="responsive-cell team-link-y fixtures-odds-header">
          {urlName && urlName.includes("double-chance-predictions") ? (
            <>
              <span>1X</span>
              <span>X2</span>
              <span>12</span>
            </>
          ) : urlName && urlName.includes("predictions-halftime-fulltime") ? (
            <>
              <span>HT1</span>
              <span>HTX</span>
              <span>HT2</span>
            </>
          ) : urlName && urlName.includes("predictions-under-over") ? (
            <>
              <span>O 2.5</span>
              <span>U 2.5</span>
            </>
          ) : urlName && urlName.includes("predictions-both-to-score") ? (
            <>
              <span>YES</span>
              <span>NO</span>
            </>
          ) : (
            <>
              <span>1</span>
              <span>X</span>
              <span>2</span>
            </>
          )}
        </div>
        <div className="responsive-cell team-link-average">Avg</div>
        <div className="responsive-cell">Tip</div>
        <div className="responsive-cell">%</div>
        <div className="responsive-cell team-link-standings">Time</div>
        <div className="responsive-cell team-link-scores">Score</div>
      </div>

      {group.slice(0, rowsToShow)}

      {group.length > rowsToShow ? (
        <div className="table-row">
          <div className="table-cell" colSpan="12">
            <button
              type="button"
              className="btn btn-link btn-sm fixturesTextSize"
              style={{ color: "#B11111", fontWeight: "bold" }}
              onClick={() => setRowsToShow((prev) => prev + 15)}
            >
              Show More Matches ({group.length - rowsToShow} remaining)
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CountrysPageRenders(props) {
  if (!props.renderPredictions || !Array.isArray(props.renderPredictions)) {
    return [];
  }

  const groups = {};
  let countryName = "";
  let countryFlag = "";

  props.renderPredictions.forEach((prediction) => {
    if (!prediction?.props?.props?.[0]) return;

    const gameDetails = prediction.props.props[0].game_details;
    if (!gameDetails) return;

    const leagueName = gameDetails.league?.name || gameDetails.league_name || "";
    const leagueId = gameDetails.league?.id || gameDetails.league_id || "";
    const formedleagueName = `${leagueName}${leagueId}`;

    countryFlag =
      gameDetails.league?.country_logo ||
      gameDetails.downloaded_country_flag ||
      countryFlag;

    if (!countryName) {
      countryName = gameDetails.league?.country || gameDetails.country_name || "";
    }

    if (!groups[formedleagueName]) {
      groups[formedleagueName] = [];
    }
    groups[formedleagueName].push(prediction);
  });

  if (Object.keys(groups).length === 0) {
    return (
      <div className="text-center p-4">No fixtures available for this country</div>
    );
  }

  return Object.entries(groups)
    .map(([formedleagueName, group], groupIndex) => (
      <CountryLeagueGroup
        key={`${formedleagueName}-${groupIndex}`}
        formedleagueName={formedleagueName}
        group={group}
        groupIndex={groupIndex}
        countryName={countryName}
        countryFlag={countryFlag}
        urlName={props.url_name}
      />
    ))
    .filter(Boolean);
}

export default CountrysPageRenders;
