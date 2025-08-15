// Import the necessary functions and components
import React, { useEffect, useState, useRef } from 'react';
import DateTimeToUsersTimezone from '@/components/functions/DatetimeToUsersTimezone';
import WinningTeamPred1x2 from '@/components/functions/determine_winning_team_and_odd';
import { useRouter } from 'next/router';
import SeoContentDisplay from '@/components/shared/seo_content_display';
import Preloader from '@/components/includes/preloader';
import getGithubSiteContent from '@/components/functions/GithubPagesContent';
import formatJackpotNameFromURL from '@/components/functions/FormatJackpotNameFromUrl';
import getMinMaxDates from '@/components/functions/jackpot_start_end_dates';
import { Adsense } from "@ctrl/react-adsense";

const specificJackpotTips = () => {
  const [jackpotTips, setJackpotTips] = useState([]);
  const [selectedJackpot, setSelectedJackpot] = useState(null);
  const jackpotTableRef = useRef(null);
  const router = useRouter();

  const [seo_into_content, setIntoSeoContent] = useState([]);
  const [seo_content, setSeoContent] = useState([]);

  useEffect(() => {
    // getGithubSiteContent("main-pages-intro/jackpots-page-intro.md").then(data => {
    //   setIntoSeoContent(data.page_content);
    // });

    getGithubSiteContent(router.pathname.substring(1)+".md").then(data => {
      setSeoContent(data.page_content);
    });
  }, []);

  useEffect(() => {
    fetchJackpotFixtures(formatJackpotNameFromURL(router.pathname));
  }, [selectedJackpot]);

  const headers = { "Partner-Authorization": "q2LsJ9FmT6XvRaCbHuYdK8ZwN4" };

  const fetchJackpotFixtures = async (jackpotName) => {
    try {
      const response = await fetch(`https://api.alljackpotpredictions.com/api/fetch_jackpot_fixtures_by_name?jackpot_name=${jackpotName}`, {
        headers: headers
      });
      const data = await response.json();

      if (data.status && data.data) {
        setJackpotTips(data.data);
      }
    } catch (error) {
      console.error('Error fetching jackpot fixtures:', error);
    }
  };

  let winningtip = "";
  
  const [showAllSteps, setShowAllSteps] = useState(false);

  const toggleShowAllSteps = () => {
    setShowAllSteps(!showAllSteps);
  };

  return (
    <React.Fragment>
    <div className="jackpot-tips-section">
      {jackpotTips.length > 0 ? (
        <div ref={jackpotTableRef} className="jackpot-table mb-5">
        <p className="text-center blink_me">Buy Premium Jackpot Predictions Now and Win a Bonus!!!</p>
        <div className="floating-card">
            <h2 className="sectionTitle text-center"><u>How to Buy Premium Jackpot Predictions</u></h2>
            <ul className="bullet-list">
            <li><span className="bullet">1:</span> To Get Premium Winning {formatJackpotNameFromURL(router.pathname)} Tips: <b>Pay KES 105</b></li>
            <li><span className="bullet">2:</span> Go to LIPA NA MPESA</li>
            <li><span className="bullet">3:</span> Select BUY GOODS AND SERVICES</li>
            {showAllSteps && (
                <>
                <li><span className="bullet">4:</span> Enter MPESA Till No: <b>8881950</b></li>
                <li><span className="bullet">5:</span> Enter the amount <b>KES 105 and confirm (ALPAC SOFTWARE SOLUTIONS)</b></li>
                <li><span className="bullet">6:</span> Games are sent via SMS. <b>Ensure you have activated promotional messages by Dialing *456*9*5*5*1# </b></li>
                <br/>
                <p>For more information contact support via SMS/WhatsApp: <b>+254111509962</b> or Click here: 
                    <a href="https://api.whatsapp.com/send/?phone=254799489335&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm" type="button" style={{whiteSpace: "nowrap", marginLeft: "10px", fontWeight: "bold"}}>WHATSAPP</a>
                </p>
                </>
            )}
            </ul>
            <div className="text-center">
                <button className="btn btn-link fixturesTextSize view-all-button"
                style={{ color: "#B11111", textDecoration: "underline", fontWeight: "bold",border: "none", textAlign: "left" }}
                onClick={toggleShowAllSteps}>
                {showAllSteps ? 'View Fewer Steps' : 'View All Steps'}
                </button>
            </div>
        </div>
        <br/>
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
        <h2 className="sectionTitle text-center">Free {formatJackpotNameFromURL(router.pathname)} Predictions</h2>
        <h3 className="sectionTitle text-center">(Starts At: {DateTimeToUsersTimezone(getMinMaxDates(jackpotTips)["minDate"])} - Ends At: {DateTimeToUsersTimezone(getMinMaxDates(jackpotTips)["maxDate"])})</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Teams</th>
              <th className="text-center">Tip</th>
              <th>Date</th>
              <th className="text-center">Result</th>
            </tr>
          </thead>
          <tbody>
            {jackpotTips.map((jackpot, index) => (
              winningtip = WinningTeamPred1x2(jackpot.percent_pred_home, jackpot.percent_pred_draw, jackpot.percent_pred_away, jackpot.goals_home, jackpot.goals_away),

              <tr key={jackpot.id}>
                <td>{index + 1}</td>
                <td>{jackpot.home_team_name} <span style={{ color: 'red' }}>VS</span> &nbsp; {jackpot.away_team_name}</td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ display: 'inline-block', marginRight: '4px', fontWeight: "bold", fontSize: "15px" }}>{winningtip[0]}</div>&nbsp;
                  <div style={{ display: 'inline-block' }}>{winningtip[1]}</div>
                </td>
                <td>{DateTimeToUsersTimezone(jackpot.date)}</td>
                <td className="text-center">
                  {jackpot.goals_home !== null && jackpot.goals_away !== null
                    ? `${jackpot.goals_home} - ${jackpot.goals_away}`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <div className="d-flex justify-content-center mb-20">
          <br />
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <br />
        </div>
      )}
    </div>
    <div className="row jackpot-tips-section  mb-2">
      <p className="sectionTitle text-center">Multibet VIP Packages are Also Available. Click the buttons below to explore more.</p>
        <div className="position-relative pt-3">
            <div className="row  nav scrollable justify-content-center">
                <div className="col-lg-3 col-4 ">
                    <div className="d-grid gap-2 mx-auto">
                        <a className="btn btn-warning btn-sm" type="button" href="/vip-packages" style={{whiteSpace: "nowrap",fontWeight: 'bold', marginLeft: "0px"}}>VIP PACKAGES</a>
                    </div>
                </div>
                <div className="col-lg-3 col-4">
                    <div className="d-grid gap-2 mx-auto">
                        <a className="btn btn-primary btn-sm" type="button" style={{whiteSpace: "nowrap",marginLeft: "5px", fontWeight: "bold"}} href="/tip-of-the-day">TIP OF THE DAY </a>
                    </div>
                </div>
                <div className="col-lg-3 col-4">
                    <div className="d-grid gap-2 mx-auto">
                        <a href="https://api.whatsapp.com/send/?phone=254799489335&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm" type="button" style={{whiteSpace: "nowrap", marginLeft: "10px", fontWeight: "bold"}}>WHATSAPP</a>
                    </div>
                </div>
            </div>  
        </div>
        <br/>
    </div>
    <br/><br/>
    <div className="container">
     {seo_content.length > 0 ? <SeoContentDisplay props={seo_content} /> : <Preloader />}
   </div>
   </React.Fragment>
  );
};

export default specificJackpotTips;