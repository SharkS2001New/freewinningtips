import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import SeoContentDisplay from "@/components/shared/seo_content_display";
import getGithubSiteContent from '@/components/functions/GithubPagesContent';
import Preloader from '../includes/preloader';

function HowToPlay(){
  const router = useRouter();
  const[how_to_pay_content, setHowToPayContent] = useState([]);

  useEffect(()=>{
      getGithubSiteContent("payments/how-to-pay.md").then(data => {  
          setHowToPayContent(data.page_content); 
      })   
  },[router.isReady])

    return (
    <div className="sites-card">
        <div className="row container mb-2">
          <div className="col-12">
            <h3 className="border-bottom">What We Offer</h3>
            <p style={{ lineHeight: '1.8' }}>
              We offer both free and paid football predictions. You can find daily free tips on this site, and if you subscribe,
              we'll send you exclusive paid predictions via FreeWinningTips SMS.
              For any questions, contact us via Message Or WhatsApp at <b>+254111509962</b> Email: <b>support@freewinningtips.com</b>.
            </p>
          </div>
        </div>
        <div className="row container">
          <div className="col-12">
           {how_to_pay_content.length > 0 ? <SeoContentDisplay props={how_to_pay_content} /> : <Preloader />}
          </div>
        </div>
    </div>        
    )
}

export default HowToPlay;