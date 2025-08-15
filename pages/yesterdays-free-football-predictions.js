import FreeFixturesDisplayTable from '@/components/shared/free-fixtures-table';
import React, {useEffect, useState} from 'react';
import getFreePredictionsData from '@/components/functions/get-free-football-predictions';
import { useRouter } from 'next/router';
import getFormattedYesterdayDate from '@/components/functions/GetYesterdaysDate';
import ArticleList from '@/components/shared/articles';
import LatestVIPWins from '@/components/shared/latest-vip-wins';

function YesterdayFreeTips() {
  const router = useRouter();  
  const [gamesfixtures, setGames] = useState([]); //defined as an array 
  let yesterdays_date = getFormattedYesterdayDate();   

  let fetch_url = "https://api.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date="+yesterdays_date;

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
                    <h2>Football Prediction Yesterday</h2>
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
          <FreeFixturesDisplayTable gamesfixtures={gamesfixtures} url={router.pathname.substring(1)} title="YESTERDAYS FOOTBALL RESULTS"/>
        </div>
      </div>
      <hr/>
      <ArticleList />
      <br/>
      <LatestVIPWins title="Latest VIP Prediction Wins"/>
      <hr/>
      <div className="container">
        <h2>Yesterday Football Predictions & Results</h2>
        <p>Get football predictions for yesterday's games at FreeWinningTips. You can check the results of yesterday's matches and find out how our predictions fared for all the matches that took place yesterday. If you are a bettor who likes being armed with the facts for <a href="https://freewinningtips.com/yesterdays-free-football-predictions" target="_blank" rel="noopener noreferrer">yesterday's matches</a>, our platform is your best choice. We provide you with all the insights you need, including pro tips, predictions, and results, to increase your chances of success.</p>

        <h3>Yesterday Football Prediction</h3>
        <p>We post all the results of yesterday's football predictions. Our predictions are from experts who carefully analyze the stats combined with other factors to deliver to you the surest predictions. In addition, we have pro tipsters who keep you on the path to winning with the most accurate and reliable tips.</p>
        <p>FreeWinningTips is the best football prediction site in the world that offers high-stakes and low-stakes predictions. Our information is thorough, so you can confidently look at yesterday's matches to fine-tune your betting strategy.</p>
        <p>Feel free to check our site for football predictions for today's matches and tomorrow's games as well. We provide all the information you need to save time and empower you to make a sure bet.</p>

        <h3>Yesterday Football Results</h3>
        <p>Check out our carefully curated football results for yesterday's games. We cover a variety of matches, from yesterday's football match results to the Premier League, Bundesliga, La Liga, and other international and local leagues. We carefully curate all the results from correct scores yesterday, 1x2, over and under, plus other outcomes so that you can find clarity over yesterday's games.</p>
        <p>You can check the results against our predictions to see how FreeWinningTips is helping pundits make profits. Our expert analysts deliver predictions based on stats to accelerate your chances of winning. You can check which of our predictions were 100% sure. Although predicting a match with 100% certainty is almost impossible, our precision score is well beyond 50%.</p>
        <p>We also provide you with <a href="https://pitchpredictions.com/live-football-predictions" target="_blank" rel="noopener noreferrer">live football scores and results</a>.</p>

        <h3>Correct Score Yesterday</h3>
        <p>You can find the correct score yesterday for the matches. We give our users the most up-to-date, live, and accurate results for yesterday's games. When you check the table, you'll find that we have indicated every game where we predicted a correct score.</p>
        <p>We have a track record of turning ordinary football fans into winners. Whether you are an expert or new to the betting game, you'll find powerful tips and predictions that will completely transform how you bet. We are the home of winners, and yesterday's football predictions prove that we are precise and experienced.</p>

        <h3>Yesterday's Football Match Results in the Premier League</h3>
        <p>FreeWinningTips provides you with free football match results for the Premier League. If you are a Premier League fan, our site is your best source of information as we bring you the most accurate results. We have a team of experts with experience analyzing the Premier League's stats. You can access all the results and predictions for yesterday's Premier League matches for free.</p>
      </div>
      </div>
    </React.Fragment>
  )
}

export default YesterdayFreeTips;
