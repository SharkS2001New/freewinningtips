import FreeFixturesDisplayTable from '@/components/shared/free-fixtures-table';
import React, {useEffect, useState} from 'react';
import getFreePredictionsData from '@/components/functions/get-free-football-predictions';
import { useRouter } from 'next/router';
import getTomorrowsDate from '@/components/functions/GetTomorrowsDate';
import ArticleList from '@/components/shared/articles';
import LatestVIPWins from '@/components/shared/latest-vip-wins';

function TomorrowsFreeTips() {
  const router = useRouter();  
  const [gamesfixtures, setGames] = useState([]); //defined as an array 
  let tomorrows_date = getTomorrowsDate(1);   

  let fetch_url = "https://api.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date="+tomorrows_date;

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
                    <h2>Football Prediction Tomorrow</h2>
                    <p>
                        Increase your chances for reaping success with our surest football predictions. 
                        Our expert analysts critique the stats and consider all the factors that can 
                        affect a match outcome to bring you the most amazing predictions online. We 
                        keep you on a winning streak with predictions for today, tomorrow, or the 
                        weekend matches. Whether you’re looking to win the bet in a local league or 
                        the international one, we’ve got you sorted. Check out our site for the best 
                        football predictions and tips today.
                    </p>
                    <p>
                        For live football results, visit <a href="/pitch-predictions-live-matches"> Pitch Predictions Live Matches</a> 
                        and get live results with match previews, fixture odds, standings, and team analysis.
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
      <div className="row">
        <div className="col-lg-12">
          <FreeFixturesDisplayTable gamesfixtures={gamesfixtures} url={router.pathname.substring(1)} title="TOMORROWS FOOTBALL PREDICTIONS"/>
        </div>
      </div>
      <hr/>
      <ArticleList />
      <br/>
      <LatestVIPWins title="Latest VIP Prediction Wins"/>
      <div className="container">
        <h2>Tomorrow Football Predictions</h2>
        <p>Get free, expert-analyzed tomorrow football predictions from FreeWinningTips. We are the go-to platform for the surest, most reliable football match predictions, tips, and results. Our dedicated expert team analyzes the football fixtures from local to international leagues. We provide the latest insights for tomorrow's games to help you strategize for betting success.</p>

        <h3>Tomorrow Football Matches</h3>
        <p>We cover tomorrow's football matches in advance so you can make an informed betting decision. Our expert analysts check out the stats and other match factors to bring you tomorrow's soccer prediction well in advance. You can check our site daily to get the tip of the day, plus predictions for tomorrow's matches.</p>

        <h3>Football Fixtures Tomorrow</h3>
        <p>We set you on the path to earning profits with our carefully curated football fixtures tomorrow. We cover all of tomorrow's matches worldwide to provide you with predictions such as 1x2, over/under, BTTS, correct score, and many more. We also cover football fixtures for <a href="https://freewinningtips.com/jackpot-predictions" target="_blank" rel="noopener noreferrer">jackpot predictions</a> to help you win the jackpot cash prize or bonuses.</p>

        <h3>Correct Score Tomorrow Prediction</h3>
        <p>Most expert pundits want the correct score prediction for matches. If you are one of them, then FreeWinningTips is the best platform for you. We have expert analysts who critique the statistics and check out other factors that could affect a match outcome to bring you the correct score tomorrow games. We deliver to you the surest prediction so that you can increase the odds in your favor in the betting market.</p>

        <h3>Tomorrow Prediction Tips</h3>
        <p>Our pro tipsters provide you with winning tips for tomorrow football matches. You can find these tips for free on our platform. We also have a <a href="https://freewinningtips.com/vip-packages" target="_blank" rel="noopener noreferrer">VIP package</a> where we deliver pro tips and predictions for tomorrow's games conveniently to your phone. We regularly update our website to bring you tomorrow's tips and predictions before the games start. Most bookies allow you to make a prediction at least a week before the games kick off. We keep you informed and ready with the surest football tips and predictions.</p>

        <h3>Sure Tomorrow Predictions</h3>
        <p>The best way to increase your chances of winning is to get sure predictions for tomorrow's games. Betting is not something you want to leave to luck or chance. You want to be certain that you are making the right decision that will significantly boost your chances of reaping profits.</p>
        <p>You want to make big money from the game you love. You can rely on our site to give you the surest predictions in the market. We have a team of professionals with experience in match analysis. We have <a href="https://freewinningtips.com" target="_blank" rel="noopener noreferrer">free tips</a> and predictions as well as a VIP package. Whatever you choose, you can count on us to edge you closer to winning the bet.</p>
      </div>
      </div>
    </React.Fragment>
  )
}

export default TomorrowsFreeTips;
