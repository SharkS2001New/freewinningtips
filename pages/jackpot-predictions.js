import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import getGithubSiteContent from '@/components/functions/GithubPagesContent';
import Preloader from '@/components/includes/preloader';
import SeoContentDisplay from '@/components/shared/seo_content_display';
import { Adsense } from "@ctrl/react-adsense";

const JackpotTips = () => {
  const [activeJackpotList, setActiveJackpotList] = useState([]);
  const [selectedJackpot, setSelectedJackpot] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchJackpotTips();
  }, [router.isReady]);

  const [seo_into_content, setIntoSeoContent] = useState([]);
  const [seo_content, setSeoContent] = useState([]);

  useEffect(() => {
    getGithubSiteContent("main-pages-intro/jackpots-page-intro.md").then(data => {
      setIntoSeoContent(data.page_content);
    });

    getGithubSiteContent("main-pages/jackpots-predictions.md").then(data => {
      setSeoContent(data.page_content);
    });
  }, []);

  const headers = { "Authorization": "R9TxV3PbOEu7qZnJKgydC5LmX2" };

  const fetchJackpotTips = async () => {
    try {
      const response = await fetch('https://api.pitchpredictions.com/api/fetch_active_jackpots_only', {
        headers: headers
      });
      const data = await response.json();

      if (data.status && data.data) {
        setActiveJackpotList(data.data);
      }
    } catch (error) {
      console.error('Error fetching jackpot tips:', error);
    }
  };

  const colors = ['#FFC300', '#36D7B7', '#eb8034', '#34c3eb', '#e534eb', '#F39C12', '#1ABC9C', '#2ECC71', '#9B59B6', '#8E44AD', '#2980B9'];

  return (
    <React.Fragment>
      <br />
      <div className="row mb-2">
        <div className="col-lg-12 col-12">
            {seo_into_content.length > 0 ? <SeoContentDisplay props={seo_into_content} /> : <Preloader />}
        </div>
      </div>
      <div className="jackpot-tips-section mb-2">
        <div>
          {activeJackpotList.length >0 ?
          <React.Fragment>
            <h2 className="text-center mb-2" style={{ fontWeight: "bold", fontSize: "20px" }}>Active Jackpot Predictions</h2>
            <p className="sectionTitle text-center mb-3" style={{ color: "blue" }}>Click on a Jackpot to open its fixtures.</p>
            <div className="row">
              {activeJackpotList.map((jackpot, index) => (
                <div key={jackpot.jackpot_name} className="col-md-3 col-6 mb-2 d-flex justify-content-center">
                  <div className={`jackpot-name card p-2 ${selectedJackpot?.jackpot_name === jackpot.jackpot_name ? 'selected' : ''}`}
                    style={{ backgroundColor: colors[index % colors.length], cursor: "pointer", color: "black", fontWeight: "bold" }}>
                    <a href={getJackpotUrl(jackpot.jackpot_name)} style={{ textDecoration: "none", color: "black" }}>
                      <div className="jackpot-details text-center">
                        <div className="jackpot-name" title="Click to view my matches">
                          {getModifiedJackpotName(jackpot.jackpot_name)}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))} 
            </div>
          </React.Fragment>
          : <></>}
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
          <h2 className="text-center mb-2" style={{ fontWeight: "bold", fontSize: "20px" }}>All Jackpot Predictions</h2>
          <div className="row">
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "white",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/sportpesa-mega-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Sportpesa Mega Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/sportpesa-midweek-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Sportpesa Midweek Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/mozzart-bet-grand-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Mozzart Super Grand Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/betika-kitonga-tanzania-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Betika Kitonga Jackpot Tanzania Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/sportpesa-supa-jackpot-tanzania-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Sportpesa Supa Jackpot Tanzania Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/mozzart-super-daily-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Mozzart Super Daily Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/betika-midweek-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Betika Midweek Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/sportpesa-midweek-tanzania-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Sportpesa Midweek Tanzania Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/shabiki-midweek-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Shabiki Midweek Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/sporty-bet-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Sportybet Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/betpawa-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Betpawa Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/1xbet-toto-15-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        1XBet Toto 15 Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/odibet-laki-tatu-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Odi Laki Tatu Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/betking-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Betking Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2 d-flex justify-content-center">
              <div className={`jackpot-name card p-2`}
                  style={{ cursor: "pointer", color: "black",backgroundColor: "#2980B9", fontWeight: "bold" }}>
                  <a href="https://freewinningtips.com/jackpots/merrybet-jackpot-predictions" style={{ textDecoration: "none", color: "white" }}>
                    <div className="jackpot-details text-center">
                      <div className="jackpot-name"
                        title="Click to view my matches">
                        Merrybet Jackpot Prediction
                      </div>
                    </div>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {seo_content.length > 0 ? <SeoContentDisplay props={seo_content} /> : <Preloader />}
      </div>
    </React.Fragment>
  );
};

export default JackpotTips;

// Helper function to get the modified jackpot name
const getModifiedJackpotName = (originalName) => {
  if (originalName === "Betpawa Pick13 Jackpot" || originalName === "Betpawa Pick 17 Jackpot") {
    return "Betpawa Jackpot Predictions";
  }
  return originalName + " Predictions";
};

// Helper function to get the jackpot URL
const getJackpotUrl = (originalName) => {
  if (originalName === "Betpawa Pick13 Jackpot" || originalName === "Betpawa Pick 17 Jackpot") {
    return "/jackpots/betpawa-jackpot-predictions";
  }
  return "/jackpots/" + originalName.toLowerCase().replace(/\s+/g, '-') + "-predictions";
};