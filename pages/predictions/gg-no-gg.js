import FreeFixturesDisplayTable from '@/components/shared/free-fixtures-table';
import React, {useEffect, useState} from 'react';
import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import getFreePredictionsData from '@/components/functions/get-free-football-predictions';
import { useRouter } from 'next/router';
import LatestVIPWins from '@/components/shared/latest-vip-wins';

export default function GGNoGG() {
  const router = useRouter();  
  const [gamesfixtures, setGames] = useState([]); //defined as an array 
  let todays_date = getFormattedCurrentDate();  
  
  let fetch_url = "https://api.pitchpredictions.com/api/fetch_btts_free_winning_tips?fixture_date="+todays_date;

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
                    <h2>Football Prediction Today</h2>
                    <p>
                        Increase your chances for reaping success with our surest football predictions. 
                        Our expert analysts critique the stats and consider all the factors that can 
                        affect a match outcome to bring you the most amazing predictions online. We 
                        keep you on a winning streak with predictions for today, tomorrow, or the 
                        weekend matches. Whether you’re looking to win the bet in a local league or 
                        the international one, we’ve got you sorted. Check out our site for the best 
                        football predictions and tips today.
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
      <div className="row mb-4">
        <div className="col-lg-12">         
          {/* <div className="d-flex flex-wrap justify-content-center pt-1"  style={{color: "white",fontWeight:"bold", backgroundColor: "#10816b" }}>
              <h2 className="sectionTitle">Free Football Tips</h2>
          </div>  */}
          <FreeFixturesDisplayTable gamesfixtures={gamesfixtures} url={router.pathname.substring(1)} title="GG/No GG Predictions"/>
        </div>
      </div>
      <LatestVIPWins title="Latest VIP Prediction Wins"/>
      <hr/>
      <div className="container">
            <h2>GG/No GG Predictions</h2>
            <p>
                FreeWinningTips is the most accurate and reliable site for football predictions. We cover predictions for <a href="https://freewinningtips.com/yesterdays-free-football-predictions" target="_blank" rel="noopener noreferrer">yesterday</a>, today, and <a href="https://freewinningtips.com/tomorrows-free-football-predictions" target="_blank" rel="noopener noreferrer">tomorrow’s matches</a>. Our aim is to save you the time and energy it would take to analyze the fixtures. We have a team of experts who analyze the stats and other factors to deliver the surest predictions.
            </p>

            <h2>Free football prediction today</h2>
            <p>
                Our site provides free football predictions today. Our analysts critically analyze all the football fixtures by considering the stats, team form, previous performance, and player injury, amongst others, to bring the best soccer predictions today.
            </p>

            <h2>Today football prediction tips</h2>
            <p>
                Every football fan wants tips that will open their eyes to how best to win. You want tips that are direct to the point, accurate, and sure. Our pro tipsters meet this need as they have experience in delivering the best football tips for today. We aim to keep you informed by uploading all our latest tips and predictions pre-match.
            </p>
            <p>
                Our tips are data-based so that you can bet with confidence. We provide our users with free winning tips for today’s matches. Additionally, we have a VIP package that will significantly transform how you bet. Once you subscribe to the <a href="https://freewinningtips.com/vip-packages" target="_blank" rel="noopener noreferrer">VIP/premium package</a>, you’ll get exclusive tips and predictions conveniently delivered to your phone. Subscribe now to get winning tips today.
            </p>

            <h2>Saturday football tips and predictions</h2>
            <p>
                Do you plan to win this Saturday? The best way to secure your win is by checking out our Saturday football tips and predictions. We provide you with predictions for all the major and minor leagues. You’ll find correct score predictions from our site, btts, gg, over/under, 1x2, handicapped, and many more.
            </p>
            <p>
                Our in-house team of experts analyzes all of Saturday’s games, domestic or international, to bring you the surest match tips and predictions. We publish Saturday football tips and predictions before the weekend so you can have ample time to strategize before the games begin.
            </p>

            <h2>Best football prediction today</h2>
            <p>
                You can check out our website for the best football prediction today. We are the best because we depend on stats to bring you the winning tips and predictions. We also have an experienced team of experts who pay attention to every factor and detail so you can bet confidently.
            </p>

            <h2>Football betting tips today</h2>
            <p>
                Pundits can rely on our football betting tips today to help them accelerate their chances of winning. Our <a href="https://freewinningtips.com/tipster-tips" target="_blank" rel="noopener noreferrer">pro tipsters</a> analyze the football matches to bring you tips based on reliable data and facts. We have a seamless system that helps us capture all the information we need to provide you with the most awesome football betting tips today. FreeWinningTips gets you nearer to your goal of winning than ever.
            </p>

            <h2>Best football tips for today</h2>
            <p>
                You can eliminate the high betting risks by looking at our football tips today. Our site is renowned for offering the best football tips for today. We stay abreast of all the changes that occur, including last-minute changes, to bring you the winning football tips today.
            </p>
        </div>
    </div>
    </React.Fragment>
  )
}
