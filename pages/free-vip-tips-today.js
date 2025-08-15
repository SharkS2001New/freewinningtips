import getGithubSiteContent from '@/components/functions/GithubPagesContent';
import SeoContentDisplay from '@/components/shared/seo_content_display';
import CountdownTimer from '@/components/shared/count-down-timer';
import FAQSection from '@/components/shared/vip-faq-questions';
import BasicPlans from '@/components/shared/vip-plans/basic-plans';
import React, {useState, useEffect} from 'react';
import LatestVIPWins from '@/components/shared/latest-vip-wins';
import { useRouter } from 'next/router';
import Preloader from '@/components/includes/preloader';

function VIPPackages() {
    const router = useRouter(); 
    const[seo_into_content, setIntoSeoContent] = useState([]);
    const[seo_content, setSeoContent] = useState([]);
    const[how_to_pay_content, setHowToPayContent] = useState([]);

    useEffect(()=>{
        getGithubSiteContent("main-pages-intro/vips-package-intro.md").then(data => {  
            setIntoSeoContent(data.page_content); 
        })  

        getGithubSiteContent("main-pages/vip-tips.md").then(data => {  
            setSeoContent(data.page_content);
        })   

        getGithubSiteContent("payments/how-to-pay-popup.md").then(data => {  
            setHowToPayContent(data.page_content); 
        })   
    },[router.isReady])

    return (
        <React.Fragment>
        <div className="free-tips-section">
            <div className="mb-5"><br/>   
                <div className="row container mb-2">
                    {seo_into_content.length > 0 ? <SeoContentDisplay props={seo_into_content} /> : <Preloader />}
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
        </div>   
         <div className="container">
            <SeoContentDisplay props={seo_content}/>
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
                    <SeoContentDisplay props={how_to_pay_content}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>  
        <br/>
    </React.Fragment>    
    );
}

export default VIPPackages;
