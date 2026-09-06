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
        style={{ backgroundColor: "#eef7ff", padding: "2px" }}
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

      <div
        className="responsive-row hide-on-mobile"
        style={{ fontSize: "12px", border: "none", backgroundColor: "whitesmoke" }}
      >
        <div className="responsive-cell"></div>
        <div className="responsive-cell team-link"></div>
        <div className="responsive-cell team-link-y">
          {urlName && urlName.includes("double-chance-predictions") ? (
            <>
              <span className="m-4">1X</span>
              <span className="m-4">X2</span>
              <span className="m-4">12</span>
            </>
          ) : urlName && urlName.includes("predictions-halftime-fulltime") ? (
            <>
              <span className="m-3">HT1</span>
              <span className="m-3">HTX</span>
              <span className="m-3">HT2</span>
            </>
          ) : urlName && urlName.includes("predictions-under-over") ? (
            <>
              <span className="m-3">O 2.5</span>
              <span className="m-3">U 2.5</span>
            </>
          ) : urlName && urlName.includes("predictions-both-to-score") ? (
            <>
              <span className="m-3">YES</span>
              <span className="m-3">NO</span>
            </>
          ) : (
            <>
              <span className="m-4">1</span>
              <span className="m-4">X</span>
              <span className="m-4">2</span>
            </>
          )}
        </div>
        <div className="responsive-cell team-link-average">Avg</div>
        <div className="responsive-cell">
          Prediction{" "}
          {urlName && urlName.includes("predictions-halftime-fulltime")
            ? "(HT / FT)"
            : ""}{" "}
        </div>
        <div className="responsive-cell team-link-standings"></div>
        <div className="responsive-cell team-link-l"></div>
        <div className="responsive-cell team-link-scores"></div>
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
