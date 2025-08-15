import FreeFixturesDisplayTable from '@/components/shared/free-fixtures-table';
import React, {useEffect, useState} from 'react';
import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import getFreePredictionsData from '@/components/functions/get-free-football-predictions';
import { useRouter } from 'next/router';
import LatestVIPWins from '@/components/shared/latest-vip-wins';
import ArticleList from '@/components/shared/articles';

export default function Home() {
  const router = useRouter();  
  const [gamesfixtures, setGames] = useState([]); //defined as an array 
  let todays_date = getFormattedCurrentDate();  
  
  let fetch_url = "https://api.pitchpredictions.com/api/fetch_all_matches_fixtures_no_limit?fixture_date="+todays_date;

  useEffect(()=>{  
      if (router.isReady) { 
        getFreePredictionsData(fetch_url).then(data=> {
          if (data.status === true) {
            setGames(data.data);
          } else {
            setGames(data);
          }
      })  
    }
  },[fetch_url])  

  return (
    <React.Fragment>
    <div className="free-tips-section">
        <div className="container">
          <div className="position-relative subscribeToVip">
              <div className="row">
                  <div className="col-lg-8 col-12">
                      <h1>Must Win Tips Today: Free Winning Tips</h1>
                      <p>
                          Looking for today’s top football predictions? You’ve come to the right place! Our expert tipsters have analyzed today’s fixtures to bring you the best must-win tips. Here are 10 teams with a high probability of winning their matches today
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
      <br/>
      <br/>
      <div className="row mb-4">
        <div className="col-lg-12">         
          {/* <div className="d-flex flex-wrap justify-content-center pt-1"  style={{color: "white",fontWeight:"bold", backgroundColor: "#10816b" }}>
              <h2 className="sectionTitle">Free Football Tips</h2>
          </div>  */}
          <FreeFixturesDisplayTable gamesfixtures={gamesfixtures} url={router.pathname.substring(1)} title="TODAY's FOOTBALL PREDICTIONS"/>
        </div>
      </div>
      <hr/>
      <ArticleList />
      <br/>
      <LatestVIPWins title="Latest VIP Prediction Wins"/>
      <hr/>
      <div className="container">
            <h2>Must Win Teams Today: Your Ultimate Guide to Today's Winning Picks</h2>
            <p>
                Predicting the outcome of football matches can feel like trying to catch lightning in a bottle. But with the right analysis and insight, it's possible to identify teams that are most likely to win. Whether you're looking for must-win teams today, 10 teams to win today, away teams to win today, or the best home teams to win today, we've got you covered.
            </p>

            <h2>Understanding the Importance of Must-Win Teams</h2>
            <p>
                Every day, football enthusiasts and bettors alike look for the most promising teams to back. But what exactly is a must-win team? Simply put, a must-win team is one that has the highest probability of winning based on form, statistics, and situational factors like injuries or home advantage.
            </p>

            <h2>How We Select Must-Win Teams</h2>
            <p>
                Our team of experts analyzes a range of factors before determining which teams fall into the must-win category. These factors include:
                Current Form: How well has the team performed in recent games?
                Injury Reports: Are key players missing due to injury?
                Head-to-Head Stats: What do the historical matchups suggest?
                Motivation: Is the team fighting for a championship, avoiding relegation, or playing with nothing to lose?
            </p>

            <h2>Why Trust Our Predictions?</h2>
            <p>
                Our team at FreeWinningTips comprises experienced analysts who understand the nuances of football betting. We use advanced data analytics to provide you with the most accurate predictions possible. By considering various metrics, such as player performance, team dynamics, and other key factors, we ensure that our tips are well-rounded and reliable.
            </p>

            <h2>Conclusion: Your Path to Smarter Betting</h2>
            <p>
                Finding the must-win teams today, the best away teams, or the best home teams to win today requires a blend of research, analysis, and sometimes a bit of gut feeling. At Amazingstakes, we help you navigate this complex landscape with confidence. Follow our daily tips, stay informed, and make smarter betting choices to increase your chances of success.
            </p>

        </div>
    </div>
    </React.Fragment>
  )
}
