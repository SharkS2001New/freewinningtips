import getGithubSiteContent from "@/components/functions/GithubPagesContent";
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import getFreePredictionsData from "@/components/functions/get-free-football-predictions";
import getFormattedCurrentDate from "@/components/functions/GetTodaysDate";
import SeoContentDisplay from "@/components/shared/seo_content_display";
import CompetitorPagesFixtures from "@/components/shared/competitor-pages-fixtures";
import BasicPlans from "@/components/shared/vip-plans/basic-plans";
import Preloader from "@/components/includes/preloader";
import getAdminSelectedFreePredictionsData from '@/components/functions/admin-selected-free-football-predictions';

function CompetitorPages(){
    const[seo_content, setSeoContent] = useState([]);
    const[how_to_pay_content, setHowToPayContent] = useState([]);
    const [gamesfixtures, setGames] = useState([]); //defined as an array
    const [adminGamesfixtures, setAdminGames] = useState([]); //defined as an array  
    const router = useRouter();

    let todays_date = getFormattedCurrentDate();  
  
    let admin_selection_fetch_url = "https://admin.pitchpredictions.com/api/fetch-today-fixtures";

    let fetch_url = "https://api.pitchpredictions.com/api/fetch_todays_free_winning_tips?fixture_date="+todays_date;
  
    useEffect(()=>{ 
        if (router.isReady) { 
            getAdminSelectedFreePredictionsData(admin_selection_fetch_url,todays_date).then(data1=> {
                if (data1.status === true) {
                  setAdminGames(data1.data);
                } else {
                  setAdminGames(data1);
                }
            })  
            
            getFreePredictionsData(fetch_url).then(data=> {
                if (data.status === true) {
                    setGames(data.data);
                } else { 
                    setGames(data);
                }
            })  
        }
    },[router.isReady])  
        
    useEffect(()=>{
        if (router.isReady) {
            getGithubSiteContent(router.asPath.substring(1) + ".md").then(data => {  
                setSeoContent(data.page_content);
            })   

            getGithubSiteContent("payments/how-to-pay-popup.md").then(data => {  
                setHowToPayContent(data.page_content); 
            })   
        }
    },[router.isReady]) 

    return (
        <React.Fragment>
            {/* <CompetitoPagesInto/>           */}
            <br/>
            <div className="row mb-4">
                <div className="col-lg-7">
                    <CompetitorPagesFixtures adminGamesfixtures={adminGamesfixtures} gamesfixtures={gamesfixtures} url={router.pathname.substring(1)} title="TODAY's FREE FOOTBALL PREDICTIONS"/>
                </div>
                <div className="col-lg-5">
                    <div className="container">
                        <h2>Jackpot Predictions at FreeWinningTips</h2>
                        <p style={{fontWeight: "bold", fontSize: "16px"}}>Check out our active Jackpot Predictions now: <a href="/jackpot-predictions" className="btn btn-link">Active Jackpot Predictions</a></p>
                        <h3>We also provide other Jackpot Predictions, including:</h3>
                        <ul>
                            <li>Sportpesa Mega Jackpot Predictions</li>
                            <li>Sportpesa Midweek Jackpot Predictions</li>
                            <li>Sportpesa Supa Jackpot Tanzania Predictions</li>
                            <li>Sportpesa Midweek Tanzania Jackpot Predictions</li>
                            <li>Betika Sababisha Jackpot Predictions</li>
                            <li>Betika Grand Jackpot Predictions</li>
                            <li>Mozzart Super Grand Jackpot Predictions</li>
                            <li>Mozzart Super Daily Jackpot Predictions</li>
                            <li>Betika Kitonga Jackpot Tanzania</li>
                            <li>Betika Midweek Jackpot Predictions</li>
                            <li>Shabiki Jackpot Predictions</li>
                            <li>Sportybet Jackpot Predictions</li>
                            <li>Betpawa Jackpot Predictions</li>
                            <li>1XBet Toto 15 Jackpot Predictions</li>
                            <li>BetKing Jackpot Predictions</li>
                        </ul> 
                    </div>                   
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-lg-12">
                    <div className="text-center container mb-3" style={{margin: "auto"}}>
                        <h2 className="h1headerTitle"><u>PRIMATIPS VIP PACKAGE PLANS</u></h2>
                    </div>
                    <BasicPlans/> 
                </div>
            </div>
            <div className="container">
                {seo_content.length > 0 ? <SeoContentDisplay props={seo_content} /> : <Preloader />}
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header"> 
                        <h5 className="modal-title" id="exampleModalLongTitle">How To Buy Tips (Join Now)</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {how_to_pay_content.length > 0 ? <SeoContentDisplay props={how_to_pay_content} /> : <Preloader />}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>       
    )
}

export default CompetitorPages; 