import FreeFixturesDisplayTable from '@/components/shared/free-fixtures-table';
import React, {useEffect, useState} from 'react';
import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import getFreePredictionsData from '@/components/functions/get-free-football-predictions';
import { useRouter } from 'next/router';
import LatestVIPWins from '@/components/shared/latest-vip-wins';
import ShortBlogPosts from "../components/shared/short-blog-posts";

export default function Home() {
  const router = useRouter();  
  const [gamesfixtures, setGames] = useState([]); //defined as an array 
  let todays_date = getFormattedCurrentDate();  
  
  let fetch_url = "https://api.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date="+todays_date;

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
                      <h1>Direct & Accurate Football Prediction</h1>
                      <p>
                          Looking for the best and most accurate football prediction site? Look no further than FreeWinningTips.com! We provide top-notch, reliable predictions that help you make informed betting decisions. Our team of seasoned analysts uses cutting-edge algorithms and in-depth data analysis to ensure you get the most accurate football predictions available.
                          Whether it’s major leagues like the Premier League, La Liga, or niche markets, FreeWinningTips.com covers it all. Our predictions include match results, correct scores, goal totals, and more everything you need to stay ahead of the game. And the best part? It’s all completely free!
                      </p>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="row mb-4">
                          <div className="d-grid gap-2 col-8 mx-auto">
                              <a href="/free-vip-tips-today" className="btn btn-warning" style={{fontWeight: "bold"}} type="button">FREE VIP TIPS</a>
                          </div>
                      </div>
                      <div className="row mb-4">
                          <div className="d-grid gap-2 col-8 mx-auto">
                              <a className="btn btn-primary" type="button" href="/tip-of-the-day">TIP OF THE DAY &nbsp;&nbsp;<i className="bi bi-cash"></i></a>
                          </div>
                      </div>
                      <div className="row mb-2">
                          <div className="d-grid gap-2 col-8 mx-auto">
                              <a className="btn btn-outline-primary" href="https://t.me/s/freewinningtips1x2" target="_blank" rel="noopener noreferrer" type="button">TELEGRAM TIPS &nbsp;&nbsp;<i className="bi bi-telegram"></i></a>
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
          <FreeFixturesDisplayTable gamesfixtures={gamesfixtures} url={router.pathname.substring(1)} title="TODAY's FOOTBALL PREDICTIONS"/>
          
          <div className="d-flex flex-wrap justify-content-center pt-1">
            <a className="btn btn-outline-primary" href="/predictions/todays-predictions" rel="noopener noreferrer" type="button">&nbsp;&nbsp;<i className="bi bi-arrow-up-right-square-fill"></i>&nbsp;&nbsp;View More</a>
          </div>
        </div>
      </div>
      <ShortBlogPosts/>
      <LatestVIPWins title="Latest VIP Prediction Wins"/>
      <div className="container">
            <h2>Accurate Soccer Predictions</h2>
            <p>
            We don't just predict winners, we provide accurate soccer predictions. This level of precision helps bettors make decisions on a variety of markets, from match results to over/under bets.
            </p>
            <p>
                FreeWinningTips is the most accurate and reliable site for football predictions. We cover predictions for <a href="https://freewinningtips.com/yesterdays-free-football-predictions" target="_blank" rel="noopener noreferrer">yesterday</a>, today, and <a href="https://freewinningtips.com/tomorrows-free-football-predictions" target="_blank" rel="noopener noreferrer">tomorrow’s matches</a>. Our aim is to save you the time and energy it would take to analyze the fixtures. We have a team of experts who analyze the stats and other factors to deliver the surest predictions.
            </p>

            <h2>Free football prediction</h2>
            <p>
                At Freewinningtips.com, we believe that quality football predictions should be accessible to everyone. We offer free tips daily, including insights on the most popular football leagues and international tournaments. Whether you're looking for predictions on the English Premier League or smaller local leagues, we’ve got you covered.
            </p>
            
            <h2>Direct Win Prediction Today</h2>
            <p>
            <b>Direct Win Prediction</b> is a statistical method designed to forecast the outcomes of matches. FreeWinningTips utilizes data from previous matches, encompassing team performance and player statistics, to pinpoint patterns and trends that can inform predictions of future match results.
                Direct Win Prediction extends beyond the realm of football. It finds application in basketball, tennis, and various other sports as well.
            </p>
            <h2>Free Big Win Prediction</h2>
            <p>
             Our Free Big Win Prediction section is dedicated to providing you with the best tips to maximize your betting success.
               Ready to take your betting to the next level? Visit our Free Big Win Prediction section and start making smarter bets today. For even more exclusive tips and predictions, check out our VIP packages designed to enhance your betting strategy.
            </p>
            <p>
                Our tips are data-based so that you can bet with confidence. We provide our users with free winning tips for today’s matches. Additionally, we have a VIP package that will significantly transform how you bet. Once you subscribe to the <a href="predictions/must-win-teams-today" rel="noopener noreferrer">Must Win Teams Today</a>, you’ll get exclusive tips and predictions conveniently delivered to your phone. Subscribe now to get winning tips today.
            </p>

            <h2>Why Freewinningtips.com Is the Best Prediction Site</h2>
            <p>
              We take pride in being recognized as one of the <strong>best football prediction sites.</strong> Our team is dedicated to offering unmatched accuracy and reliability. Plus, our user-friendly interface and mobile accessibility make it easy for bettors to access predictions on the go. 
              </p>
              <p>
                Not all prediction sites are created equal. Some are leaps and bounds ahead of others. So, what makes a site the "best"? It boils down to a few key factors: accuracy, reliability, and user experience. You want a site that doesn’t just throw random guesses but provides well-thought-out predictions based on solid data.
            </p>
            <p>
                Our in-house team of experts analyzes all of Saturday’s games, domestic or international, to bring you the surest match tips and predictions. We publish Saturday football tips and predictions before the weekend so you can have ample time to strategize before the games begin.
            </p>

            <h2>Everyday Winning Tips - Winning Prediction Site</h2>
            <p>
                You can check out our website for <b>everyday Winning tips.</b> We are the best because we depend on stats to bring you the winning tips and predictions. We also have an experienced team of experts who pay attention to every factor and detail so you can bet confidently <b>Daily 98 Winning Tips</b>.
            </p>

            <h2>Football betting tips today</h2>
            <p>
                Pundits can rely on our football betting tips today to help them accelerate their chances of winning. Our <a href="https://www.betsassured.com" target="_blank" rel="noopener noreferrer">pro tipsters</a> analyze the football matches to bring you tips based on reliable data and facts. We have a seamless system that helps us capture all the information we need to provide you with the most awesome football betting tips today. FreeWinningTips gets you nearer to your goal of winning than ever.
            </p>

            <h2>New Features on Freewinningtips.com</h2>
            <p><b>Daily Sure Wins</b></p>
            <p>Our <strong>daily sure wins</strong> section features handpicked games with the highest probability of success. These are perfect for bettors who want to win consistently without taking too much risk.</p>
            <p><b>Accumulator Bets</b></p>
            <p>Maximize your winnings with our accumulator bet predictions. We carefully select multiple matches that, when combined, offer huge potential returns. Accumulator betting is ideal for risk-takers who want to multiply their profits.</p>
            <p><b>Sure Bets Tips</b></p>
            <p>For those who prefer minimal risk, we provide <strong>sure bets tips</strong> with the highest probability of winning. These predictions are designed to offer the safest betting opportunities, ideal for bettors looking for steady gains.</p>
            <h2>Jackpot Predictions</h2>
            <p>
                Feeling lucky? Jackpot predictions are for those who are looking to make it big. These tips cover multiple games and require you to predict the outcome of all of them to win a significant payout. It’s like playing a lottery with a strategic twist.
            </p>
        </div>
    </div>
    </React.Fragment>
  )
}
