import React, {useState, useEffect} from "react";
import DateTimeToUsersTimezone from "../functions/DatetimeToUsersTimezone";
import DoubleChanceWinningTeam from "../functions/double_chance_winning_team_and_odd";
import WinningTeamPred1x2 from "../functions/determine_winning_team_and_odd";
import { Adsense } from "@ctrl/react-adsense";
import { useRouter } from 'next/router'
import ComputeFixtureAverage from "../functions/ComputefixtureAverage";
import UnderOverWinningTeamAndOdd from "../functions/under_over_winning_team_and_odd";
import DetermineWinningOrLost from "../functions/determine_won_or_lost";

function FreeFixturesDisplayTable(props){
  const router = useRouter();
  let winningtip = "";        
  let doubleChancewinningTip = "";
  let fixturesAverage = "";
  let winning_team_probs = "";

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
  
    // Function to get the correct suffix
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Covers 11th, 12th, 13th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const formattedDate = date.toLocaleString('en-US', { 
      weekday: 'long', 
      day: 'numeric',  // Include day here
      month: 'long', 
      year: 'numeric' 
    });
  
    // Add the suffix to the day
    const dayWithSuffix = `${day}${suffix(day)}`;
  
    // Replace the numeric day with the day including the suffix
    const finalFormattedDate = formattedDate.replace(day, dayWithSuffix);
  
    setCurrentDate(finalFormattedDate);
  }, []);

  return (
      <React.Fragment>         
        <div className="container mb-2">
          <div className="col-lg-12 col-sm-12 o-hidden">
              <div className="nav scrollable nav-fill small position-relative flex-nowrap fixturesTextSize pb-2 pt-2">
                  <a href="/predictions/todays-predictions" rel="noopener noreferrer" className={`nav-link scroll-card ${props.url === "" || props.url === "predictions/todays-predictions" ? "activeElement" : ""}`}>
                    All Predictions
                  </a>
                  <a href="/predictions/double-chance" rel="noopener noreferrer" className={`nav-link scroll-card ${props.url === "predictions/double-chance" ? "activeElement" : ""}`}>
                    Double Chance
                  </a>
                  <a href="/predictions/1-5-goals" rel="noopener noreferrer" className={`nav-link scroll-card ${props.url === "predictions/1-5-goals" ? "activeElement" : ""}`}>
                    1.5 Goals
                  </a>
                  <a href="/predictions/2-5-goals" rel="noopener noreferrer" className={`nav-link scroll-card ${props.url === "predictions/2-5-goals" ? "activeElement" : ""}`}>
                    2.5 Goals
                  </a>
                  <a href="/predictions/3-5-goals" rel="noopener noreferrer" className={`nav-link scroll-card ${props.url === "predictions/3-5-goals" ? "activeElement" : ""}`}>
                    3.5 Goals
                  </a>
                  <a href="/predictions/gg-no-gg" rel="noopener noreferrer" className={`nav-link scroll-card ${props.url === "predictions/gg-no-gg" ? "activeElement" : ""}`}>
                    GG/NO GG
                  </a>
              </div>
          </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center pt-2"  style={{color: "black",fontWeight:"bold" }}>
          <h2 className="sectionTitle">{props.title}</h2>
      </div>
      <div className="d-flex flex-wrap justify-content-center pt-2" style={{color: "black", fontWeight:"bold" }}>
        {router.pathname.substring(1) !== "yesterdays-free-football-predictions" && 
        router.pathname.substring(1) !== "tomorrows-free-football-predictions" ? 
          <h3 style={{fontSize: "medium", color: "blue"}}>{currentDate}</h3>
          : null }
      </div>       
      {props.gamesfixtures.length >0 ?
        <table className="styled-table mb-2">
          <thead>
            <tr>
              <th scope="col" style={{width: "10%"}}>Time</th>
              <th scope="col" style={{width: "10%"}}>League</th>
              <th scope="col">Fixture</th>
              <th scope="col" style={{textAlign: "center"}}>Tip</th>
              <td scope="col" style={{fontWeight: "bold", textAlign: "center"}}>Scores</td>
            </tr>
          </thead>
          <tbody>
            {props.gamesfixtures.map((fixture, index) => (
              winningtip = WinningTeamPred1x2(fixture.percent_pred_home,fixture.percent_pred_draw,fixture.percent_pred_away, fixture.goals_home, fixture.goals_away),
              doubleChancewinningTip =  DoubleChanceWinningTeam(fixture.percent_pred_home,fixture.percent_pred_draw,fixture.percent_pred_away, fixture.goals_home, fixture.goals_away),
              fixturesAverage = ComputeFixtureAverage(fixture.teams_perfomance_home_for,fixture.teams_perfomance_home_aganist,fixture.teams_perfomance_away_for,fixture.teams_perfomance_away_aganist,fixture.teams_games_played_home,fixture.teams_games_played_away),
              winning_team_probs = UnderOverWinningTeamAndOdd(fixturesAverage, props.isMobile),

              //Call function to convert date time to users timezone
              <tr key={index}>
                <td style={{width: "10%"}}>{`${DateTimeToUsersTimezone(fixture.date).split(' ')[1]}`}</td>
                <td style={{width: "10%"}}>{`${fixture.league_short_name}`}</td>
                <td>{fixture.home_team_name} &nbsp;<span style={{ color: 'red' }}>VS</span> &nbsp;{fixture.away_team_name}</td>
                {router.pathname.substring(1) === "" || router.pathname.substring(1) === "predictions/todays-predictions" || router.pathname.substring(1) === "predictions/todays-predictions"  ?
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                      {(fixturesAverage < 2.0 || fixturesAverage > 3.0) && fixturesAverage !== "-" ? (
                        parseFloat(fixturesAverage) > 2.5 ? (
                          <>
                            {"Over2.5"}&nbsp;&nbsp;{DetermineWinningOrLost("Over2.5", fixture.goals_home, fixture.goals_away)}
                          </>
                        ) : (
                          <>
                            {"Under2.5"}&nbsp;&nbsp;{DetermineWinningOrLost("Under2.5", fixture.goals_home, fixture.goals_away)}
                          </>
                        )
                      ) : (
                        (winningtip[0] === "1" && parseFloat(fixture.percent_pred_home) < 49) ||
                        (winningtip[0] === "X" && parseFloat(fixture.percent_pred_draw) < 49) ||
                        (winningtip[0] === "2" && parseFloat(fixture.percent_pred_away) < 49) ? (
                          <>
                            {doubleChancewinningTip[0]}&nbsp;&nbsp;{DetermineWinningOrLost(doubleChancewinningTip[0], fixture.goals_home, fixture.goals_away)}
                          </>
                        ) : (
                          <>
                            {winningtip[0]}&nbsp;&nbsp;{DetermineWinningOrLost(winningtip[0], fixture.goals_home, fixture.goals_away)}
                          </>
                        )
                      )}
                    </div>&nbsp;
                  </td>                
                : router.pathname.substring(1) === "predictions/double-chance"  ?
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                      {doubleChancewinningTip[0]} &nbsp;&nbsp;
                      {DetermineWinningOrLost(doubleChancewinningTip[0], fixture.goals_home, fixture.goals_away)}
                    </div>&nbsp;
                  </td>              
                : router.pathname.substring(1) === "predictions/1-5-goals"  ?
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                      {winning_team_probs == "-" ? '' : winning_team_probs + '1.5'} &nbsp;&nbsp;
                      {DetermineWinningOrLost(winning_team_probs + '1.5', fixture.goals_home, fixture.goals_away)}
                    </div>&nbsp;
                  </td> 
                : router.pathname.substring(1) === "predictions/2-5-goals"  ?
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                      {winning_team_probs == "-" ? '' : winning_team_probs + '2.5'}&nbsp;&nbsp;
                      {DetermineWinningOrLost(winning_team_probs + '2.5', fixture.goals_home, fixture.goals_away)}
                    </div>&nbsp;
                  </td> 
                : router.pathname.substring(1) === "predictions/3-5-goals"  ?
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                      {winning_team_probs == "-" ? '' : winning_team_probs + '3.5'} &nbsp;&nbsp;
                      {DetermineWinningOrLost(winning_team_probs + '3.5', fixture.goals_home, fixture.goals_away)}
                    </div>&nbsp;
                  </td> 
                : router.pathname.substring(1) === "predictions/gg-no-gg"  ?
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                        {fixture.both_team_to_score} &nbsp;&nbsp;
                        {DetermineWinningOrLost(fixture.both_team_to_score, fixture.goals_home, fixture.goals_away)}
                      </div>&nbsp;
                    </td> 
                :
                  <td style={{ textAlign: "center" }}>
                      <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                        {winningtip[0]}  &nbsp;&nbsp;
                        {DetermineWinningOrLost(winningtip[0], fixture.goals_home, fixture.goals_away)}
                      </div>&nbsp;
                  </td>
                }
                <td style={{ textAlign: "center" }}>
                    <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>
                      {fixture.goals_home === null ? '-' : fixture.goals_home + ' - ' + fixture.goals_away}
                    </div>&nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        : 
        //Show Loading
        <div className="d-flex justify-content-center mb-20">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      }
          
      <div className="container justify-content-center">
        <Adsense
            client="ca-pub-5665711413000284"
            slot="4141567825"
            style={{ display: "block" }}
            layout="display"
            format="auto"
        /> 
      </div>
      <br/>
    </React.Fragment>
  );      
}

export default FreeFixturesDisplayTable;
