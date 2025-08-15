import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import getGithubSiteContent from '../functions/GithubPagesContent';
import SeoContentDisplay from './seo_content_display';
import Preloader from "../includes/preloader";

function CompetitoPagesInto(){
    const router = useRouter();
    const[seo_into_content, setIntoSeoContent] = useState([]);

    useEffect(()=>{
        if (router.isReady) {
            getGithubSiteContent("competitiors-pages-into/"+ router.asPath.substring(1) + ".md").then(data => {  
                setIntoSeoContent(data.page_content); 
            })  
        }
    },[router.isReady])

    return (
    <div className="container mb-1">
        <div className="position-relative subscribeToVip">
            <div className="row">
                <div className="col-lg-8 col-12">
                    {seo_into_content.length > 0 ? <SeoContentDisplay props={seo_into_content} /> : <Preloader />}
                </div>
                <div className="col-lg-4 col-12">
                    <div className="row mb-2">
                        <div className="d-grid gap-2 col-8 mx-auto">
                            <a href="/vip-packages" className="btn btn-warning" style={{fontWeight: "bold"}} type="button">VIP PACKAGES</a>
                        </div>
                    </div>
                    {/* <div className="row mb-2">
                        <div className="d-grid gap-2 col-8 mx-auto">
                            <button className="btn btn-outline-info" type="button">REGISTER FOR FREE NOW</button>
                        </div>
                    </div> */}
                    {/* <div className="row mb-2">
                        <div className="d-grid gap-2 col-8 mx-auto">
                            <button className="btn btn-outline-danger" type="button">OUR PAST PREDICTIONS</button>
                        </div>
                    </div> */}
                    <div className="row mb-2">
                        <div className="d-grid gap-2 col-8 mx-auto">
                            <a className="btn btn-primary" type="button" style={{fontWeight: "bold"}} href="/tip-of-the-day">TIP OF THE DAY &nbsp;&nbsp;<i className="bi bi-cash"></i></a>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="d-grid gap-2 col-8 mx-auto">
                            <a className="btn btn-outline-primary" href="https://t.me/freewinningtips1x2" target="_blank" rel="noopener noreferrer" type="button">TELEGRAM TIPS &nbsp;&nbsp;<i className="bi bi-telegram"></i></a>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="d-grid gap-2 col-8 mx-auto">
                            <a href="https://api.whatsapp.com/send/?phone=254799489335&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="btn btn-success" type="button" style={{whiteSpace: "nowrap", fontWeight: "bold"}}>WHATSAPP</a>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
    )
}

export default CompetitoPagesInto;