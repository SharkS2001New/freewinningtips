import DateTimeToUsersTimezone from "@/components/functions/DatetimeToUsersTimezone";
import getFormattedCurrentDate from "@/components/functions/GetTodaysDate";
import React, { useState, useEffect } from "react";
import { Adsense } from "@ctrl/react-adsense";

function TipoftheDay() {
  const [tipData, setTipData] = useState([]);
  const currentDate = getFormattedCurrentDate();

  const headers = { "Authorization": "R9TxV3PbOEu7qZnJKgydC5LmX2" }; // This is the authorization header from the api.pitchpredictions.com

  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch("https://api.pitchpredictions.com/api/match_of_the_day?fixture_date="+currentDate, {
        headers: headers
    })
      .then((response) => response.json())
      .then((data) => setTipData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="free-tips-section">
    <div className="mb-5 pt-3" style={{margin: "auto"}}>
        <div className="container">
          <div className="position-relative subscribeToVip">
              <div className="row">
                  <div className="col-lg-8 col-12">
                      <h2>Football Prediction Today</h2>
                      <p>
                        Make every day a rich experience with our free game of the day tips and predictions. We will keep you on a winning streak with
                        our single tip of the day, banker tip of the day, plus so much more. All our tips are based on data and expert analysis. 
                        Our pro tipsters provide you with a professional tip of the day to accelerate your opportunity to make profits. We analyze 
                        all the relevant factors to conveniently offer you the surest match of the day predictions and tips.
                      </p>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="row mb-4">
                          <div className="d-grid gap-2 col-8 mx-auto">
                              <a href="/vip-packages" className="btn btn-warning" style={{fontWeight: "bold"}} type="button">VIP PACKAGES</a>
                          </div>
                      </div>
                      <div className="row mb-4">
                          <div className="d-grid gap-2 col-8 mx-auto">
                              <a className="btn btn-primary" type="button" href="/tip-of-the-day">TIP OF THE DAY &nbsp;&nbsp;<i className="bi bi-cash"></i></a>
                          </div>
                      </div>
                      <div className="row mb-2">
                          <div className="d-grid gap-2 col-8 mx-auto">
                              <a className="btn btn-outline-primary" href="https://t.me/freewinningtips1x2" target="_blank" rel="noopener noreferrer" type="button">TELEGRAM TIPS &nbsp;&nbsp;<i className="bi bi-telegram"></i></a>
                          </div>
                      </div>
                  </div>
              </div>  
          </div>
        </div>
        <div className="row mb-5" style={{margin: "auto"}}>
            <br/>
            <h2 className="sectionTitle text-center">Game of the Day</h2>            
            <table className="styled-table">
                <thead>
                <tr>
                    <th>Country (League)</th>
                    <th>Match</th>
                    <th>Time</th>
                    <th>Tip</th>
                    <th>Scores</th>
                </tr>
                </thead>
                <tbody>
                {tipData.map((match) => (
                    <tr key={match.fixture_id}>
                        <td><img
                            src={match.downloaded_country_flag}
                            alt={match.league_name}
                            style={{ width: "30px", height: "20px" }}
                            />&nbsp;&nbsp;
                        {match.country_name} ({match.league_name})</td>
                        <td>{match.home_team_name} &nbsp;<span style={{ color: 'red' }}>VS</span> &nbsp;{match.away_team_name}</td>
                        <td>{DateTimeToUsersTimezone(match.date).split(' ')[1]}</td>
                        <td style={{ textAlign: "left", width: "15%" }}>
                            <div style={{ display: 'inline-block', marginRight: '3px', fontWeight: "bold", fontSize: "14px" }}>{match.option_picked}</div>&nbsp;
                            <div style={{ display: 'inline-block' }}>{determineOutcome(match.goals_home, match.goals_away, match.option_picked)}</div>
                        </td>
                        <td>
                            {match.goals_home !== null && match.goals_away !== null
                            ? `${match.goals_home} - ${match.goals_away}`
                            : "-"}
                        </td>
                    </tr>
                ))}
                </tbody>                
            </table>
        </div>
        <br/>
        <Adsense
            client="ca-pub-5665711413000284"
            slot="4141567825"
            style={{ display: "block" }}
            layout="display"
            format="auto"
        /> 
        <br/> 
        <div className="container">
            <h2>Free Game of the Day</h2>
            <p>
                Free Winning Tips is the leading platform for gaining tips and predictions for the game of the day. Our team of professionals analyzes the stats and other vital factors to bring you winning tips and predictions every day at no cost to you.
            </p>
            <p>
                You can check out our website at any time of day to find the most carefully curated match predictions.
            </p>

            <h2>Tip of the Day</h2>
            <p>
                Our pro tipsters provide you with the most accurate and reliable tip of the day. We aim to help any pundit, whether a professional or a newbie, make a winning decision regarding betting. As such, you can find a single tip of the day conveniently provided on our site.
            </p>
            <p>
                We are here to equip you with the tips to make a well-informed decision and elevate your betting tactic to a new level.
            </p>

            <h2>Banker Tip of the Day</h2>
            <p>
                Our team works tirelessly to bring you banker bet tips. Our tips will certainly land you the profits you seek as they are based on expert insights and data analysis.
            </p>
            <p>
                You can find what you need here on our platform, whether single or multiple tips. We have a top-notch system in place that gives us the latest stats. Also, our team of expert analysts critique all the factors to bring you the surest tip of the day.
            </p>
            <p>
                You can catch all the daily banker tips on our site for all your favorite games, be it local leagues or international leagues. Here, you’ll find tips such as over/under goals, 1x2, halftime/fulltime, double chance, correct score, etc.
            </p>

            <h2>Match of the Day Prediction</h2>
            <p>
                Catch all the latest match of the day prediction here at FreeWinningTips. We keep our website updated with the latest from the football world. We consider all the factors that can influence a match outcome, from player injury to team form and strength, amongst others.
            </p>
            <p>
                Our platform is regularly updated and delivers professional tips and predictions before the match kicks off so that you can stay ahead of your competitors.
            </p>

            <h2>Professional Tip of the Day</h2>
            <p>
                We lead online with the surest and most reliable professional tip of the day. We provide you with free tips from our pro tipsters. Our tips and predictions have helped countless pundits win huge cash prizes. We also provide you with jackpot tips and predictions. We are meticulous in our match analysis, so you can have an awesome time watching the game and placing your bet. We can confidently assure you of a high chance of winning as our tips are based on expert analysis and statistics.
            </p>
            <p>
                Our platform also provides you with VIP/premium tips. The VIP package is for those who want more exclusive betting tips. These tips are conveniently delivered to your phone via SMS or our app. Subscription to our VIP tips is easy and convenient for you.
            </p>
            <p>
                When you use our site to inform your betting strategy, you’ll discover that every day is a winning day. We are here to empower your choices and make every day exciting.
            </p>
        </div>
    </div>
    </div>
  );
}

export default TipoftheDay;

//Check if Tip won or Lost
const determineOutcome = (goalsHome, goalsAway, optionPicked) => {
    if (goalsHome === null || goalsAway === null) {
      return ""; // The match result is pending
    }
    
    if (optionPicked === "1" && goalsHome > goalsAway) {
      return <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
    } else if (optionPicked === "X" && goalsHome === goalsAway) {
        return <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
    } else if (optionPicked === "2" && goalsHome < goalsAway) {
        return <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
    } else if (["1X", "X2", "12"].includes(optionPicked)) {
        if (
          (optionPicked === "1X" && (goalsHome >= goalsAway || goalsAway === null)) ||
          (optionPicked === "X2" && (goalsAway >= goalsHome || goalsHome === null)) ||
          (optionPicked === "12" && (goalsHome !== goalsAway || goalsAway === null))
        ) {
            return <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        }
    } else if (["Over2.5", "Under2.5"].includes(optionPicked)) {
        if (
          (optionPicked === "Over2.5" && (goalsHome + goalsAway > 2.5 || goalsHome === null || goalsAway === null)) ||
          (optionPicked === "Under2.5" && (goalsHome + goalsAway <= 2.5 || goalsHome === null || goalsAway === null))
        ) {
            return <span style={{fontWeight: "bold", borderRadius: "20px", padding: "5px", backgroundColor: "green", border: "1px solid green", color: "white", fontSize: "12px"}}>Won</span>;
        } 
    } else {
      return ""; // Default case: Option not matched, assumed lost
    }
  };
  