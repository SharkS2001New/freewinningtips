// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css';
import "../styles/blog.css"; 
import Head from 'next/head';
import Navbar from '../components/includes/navbar'
import Footer from '../components/includes/footer';
import React from "react";
import { useRouter } from 'next/router';
import Script from 'next/script';
import MetaContent from '@/components/functions/meta-title-content';
import useScrollRestoration from '@/components/functions/useScrollRestoration';

function App({ Component, pageProps }) {
  var meta_content_data = MetaContent(); //Meta content dynamic data
 
  const router = useRouter(); //fetch page link data  

  //Restore scroll position after data has been loaded and displayed
  useScrollRestoration(router); 
  
  return (
    <React.Fragment>
      {/* Inject seo content for static pages excluding the dynamic pages such as match details and football predictions by date*/}
      <Head>
        <title>{meta_content_data[0]}</title>
        <link rel="dns-prefetch" href="https://freewinningtips.com" crossOrigin />
        <link rel="preconnect" href="https://freewinningtips.com" crossOrigin />

        <link rel="dns-prefetch" href="https://api.pitchpredictions.com" crossOrigin />
        <link rel="preconnect" href="https://api.pitchpredictions.com" crossOrigin />

        <link rel="canonical" href={`https://freewinningtips.com${router.pathname}`} key="canonical" />
        <meta name="robots" content="index, follow"></meta>
        <meta name="language" content="en"></meta>
        <meta name="revisit-after" content="7 days"></meta>
        <meta name="copyright" content="© 2025 Freewinningtips All rights reserved."  />
  
        <link rel="dns-prefetch" href="https://adservice.google.com/" crossOrigin />
        <link rel="preconnect" href="https://adservice.google.com/" crossOrigin />

        <link rel='dns-prefetch' href="https://pagead2.googlesyndication.com" />
        <link rel='preconnect' href="https://pagead2.googlesyndication.com" />

        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net/" crossOrigin />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net/" crossOrigin /> 

        <link rel="dns-prefetch" href="https://www.googletagservices.com/" crossOrigin />
        <link rel="preconnect" href="https://www.googletagservices.com/" crossOrigin /> 

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#202c3c" />
        <meta name="description" content={meta_content_data[1]} />
        <meta name="keywords" content={meta_content_data[2]} />
        <meta name="google-adsense-account" content="ca-pub-5665711413000284"/>
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@freewinningtips" />
        <meta name="twitter:title" content={meta_content_data[0]} />
        <meta name="twitter:description" content={meta_content_data[1]} />
        <meta name="twitter:image" content="https://freewinningtips.com/freewinningtips.png" />
        <meta name="twitter:url" content={`https://freewinningtips.com${router.pathname}`} />

        <meta property="og:title" content={meta_content_data[0]} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://freewinningtips.com/freewinningtips.png" />
        <meta property="og:description" content={meta_content_data[1]} />
        <meta property="og:url" content={`https://freewinningtips.com${router.pathname}`} />
      </Head>

    {/* <!-- Google tag (gtag.js) --> */}
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-KH2W81P2ZD" async></Script>
    <Script id='google-analytics' strategy="afterInteractive" async dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KH2W81P2ZD', {
        page_path: window.location.pathname,
        });
        `,
    }}></Script>

      <Navbar/>
      <div> {/**style={{backgroundColor:"#212830"}} */}
        {/**The page title */}
      {meta_content_data[3] != null ? 
          <div className="d-flex flex-wrap justify-content-center pb-1 pt-2"  style={{backgroundColor:"rgb(25, 118, 210)",color: "white",fontWeight:"bold" }}>
              <h1 className="h1headerTitle">{meta_content_data[3]}</h1>
          </div> 
        : ""}
        <div className="container-mob desktop-container-resize"> 
          <div className="d-flex" id="wrapper">
            <div id="page-content-wrapper" >
                <div className="col-lg-12 col-12">                  
                  <div style={{marginTop: "0px"}}>
                    <Component {...pageProps} />
                  </div>
                </div>           
            </div>
          </div>
        </div>
      <Footer/> 
      </div>   
    </React.Fragment>
  )  
}

export default  App;
