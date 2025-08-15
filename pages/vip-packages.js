import CountdownTimer from '@/components/shared/count-down-timer';
import FAQSection from '@/components/shared/vip-faq-questions';
import BasicPlans from '@/components/shared/vip-plans/basic-plans';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import LatestVIPWins from '@/components/shared/latest-vip-wins';

function VIPPackages() {
    const router = useRouter(); 

    return (
        <React.Fragment>
        <div className="free-tips-section">
        <div className="mb-5"><br/>   
            <div className="row container mb-2">
                <div className="col-12">
                    <h2>Vip Football Predictions | Everyday is a Winning Day</h2>
                    <p>
                        Boost your chances for betting success with our VIP football predictions today. We have a team of experts and pro tipsters who 
                        provide you with the most accurate and reliable predictions in the market. Our VIP package stands out as we consider all the 
                        stats and factors to conveniently provide you with predictions that accelerate your chances of winning. Subscribe to our VIP 
                        prediction today for the most amazing, top premium predictions.
                    </p>
                    <p>To explore our payment methods, please visit <a href="#payment-methods">Our Payment Methods</a> page.</p>
                </div>     
            </div>       
            <div className="row container mb-2" style={{margin: "auto"}}>
                <div className="col line left"></div>
                <div className="col-6 text-center">
                    <h2 className="h1headerTitle">V.I.P TIPS EXPIRES IN</h2>
                </div>
                <div className="col line right"></div>
            </div>
            <div className="row mb-5">
                <CountdownTimer/>
            </div>    
            <BasicPlans/> 
            <br/>          
            <LatestVIPWins title="Latest VIP Prediction Wins"/>
            <br/>        
            {/**Faq Section */}
            <FAQSection/>           
        </div>        
        <div className="container">
            <h2>Football Predictions</h2>
            <p>
                FreeWinningTips offers football fans the best VIP football predictions. Our VIP package is the best because the predictions are comprehensive and are based on stats. We have a team of expert analysts who critically evaluate the stats plus other factors that can affect each match. We consider all the factors to bring you the surest and most reliable VIP football predictions.
            </p>

            <h2>Correct score VIP prediction</h2>
            <p>
                Pundits can find correct score VIP prediction here at FreeWinningTips. Our team of experts has prior experience in making correct score predictions. We also cover markets such as 1x2, over/under, BTTS, and many more.
            </p>
            <p>
                Once you subscribe to our VIP package, you'll get correct score predictions conveniently delivered to your phone either via SMS or through our app.
            </p>

            <h2>Vip prediction tomorrow</h2>
            <p>
                Prepare to bet with confidence by checking out our VIP prediction tomorrow. We are timely with our predictions so that you can make an informed decision when it comes to betting. Our team analyzes all the latest stats to deliver the most comprehensive predictions.
            </p>

            <h2>Vip prediction for today's matches</h2>
            <p>
                We have experience in analyzing local and international leagues. Our predictions cover today's matches, including the Premier League, Europa League, Champions League, La Liga, Italy Serie A, French League, and many more. Your football experience will always differ from our VIP package, which will always keep you on the path to riches.
            </p>

            <h2>Top premium prediction today</h2>
            <p>
                Premium predictions have something that you won't find on the free package. These predictions result from a comprehensive match analysis and carefully curated information that empowers your betting strategy. We analyze all of today's matches before the kick-off and deliver the predictions hours before the games start to give you an edge over your competitors.
            </p>

            <h2>Free VIP tips today</h2>
            <p>
                Our free VIP tips today are the most accurate and reliable tipster tips in the market. This is because we have a seamless system that lets us access the latest stats. Our in-house team has extensive experience in match analysis. Although no site can give you 100% VIP predictions, our predictions are more than 70% accurate.
            </p>
            <p>
                Check out our VIP prediction for today's matches for a chance to reap profits from your favorite game.
            </p>

            <h2>Vip prediction today sure wins</h2>
            <p>
                Our VIP prediction today assures you of sure wins as we provide predictions based on stats. We offer insights that minimize the risks and maximize your odds of winning. Our site also provides you with Sportpesa VIP prediction, correct score VIP prediction, and VIP predictions for tomorrow and this weekend's matches.
            </p>

            <h2>VIP Prediction FAQs At FreeWinningTips</h2>

            <h3>Which is the best VIP prediction site in Kenya?</h3>
            <p>
                FreeWinningTips is the best VIP prediction site in Kenya. Our platform is user-friendly and convenient. We have a track record of turning ordinary pundits into winners. Our VIP predictions are derived from our expert analysts, who critically analyze the stats to bring you the most accurate and reliable VIP predictions.
            </p>

            <h3>How do I receive VIP football predictions?</h3>
            <p>
                You receive VIP football predictions conveniently on your phone, either by SMS or our app. Once you subscribe to our VIP package, you get the latest match predictions accurately delivered to you.
            </p>

            <h3>Is there a guarantee of winning with VIP predictions?</h3>
            <p>
                We provide you with VIP predictions after conducting a careful analysis of the stats plus other factors. However, betting does entail a level of certainty. You should be aware of any site that assures you their predictions are 100%. Whereas we cannot guarantee you a win every time, you can be sure that our predictions are the surest in the market.
            </p>
        </div>  
        </div>     
        <br/>
    </React.Fragment>    
    );
}

export default VIPPackages;
