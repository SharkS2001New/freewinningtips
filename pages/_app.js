// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import '../styles/new-styles.css';
import '../styles/matchdetails.css';
import '../styles/details-pages.css';
import "../styles/blog.css"; 
import "../styles/auth-css.css";
import "../styles/customer-pay.css";
import Head from 'next/head';
import Navbar from '../components/includes/navbar';
import Footer from '../components/includes/footer';
import Sidebar from '../components/includes/Sidebar';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Script from 'next/script';
import MetaContent from '@/components/functions/meta-title-content';
import { SITE_ORIGIN } from '@/components/functions/apiConfig';
import useScrollRestoration from '@/components/functions/useScrollRestoration';
import Subnavbar from '@/components/includes/subnavbar';

function App({ Component, pageProps }) {
  var meta_content_data = MetaContent();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useScrollRestoration(router);
  
  const path = router.pathname;
  const isHomepage = router.pathname === '/';
  const isDirectWinPage = router.pathname === '/predictions/direct-win-predictions';
  const pageTitle = meta_content_data[0] || '';
  const pageDescription = meta_content_data[1] || '';
  const ogTitle = isHomepage
    ? 'Free Football Predictions Today | FreeWinningTips'
    : isDirectWinPage
      ? 'Direct Win Predictions Today | FreeWinningTips'
      : pageTitle;
  const ogDescription = isHomepage
    ? 'Expert football betting tips for today — 1X2, BTTS, Over/Under, Accumulator & Jackpots. Free daily picks across 50+ leagues.'
    : isDirectWinPage
      ? 'Free daily direct win football picks — 1X2 tips with 70%+ probability across 200+ leagues. Updated every morning.'
      : pageDescription;
  
  // Check if the current page includes 'auth' in its route
  const isAuthPage = router.pathname.includes("auth");
  
  // Excluded routes where sidebar should NOT be shown
  const excludedRoutes = ["/blog"];
  const shouldShowSidebar = !isAuthPage; //!excludedRoutes.includes(path) &&

  // Close sidebar on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsSidebarOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/freewinningtips.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/freewinningtips-icon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/freewinningtips-apple-touch.png" />
        <link rel="dns-prefetch" href={SITE_ORIGIN} crossOrigin />
        <link rel="preconnect" href={SITE_ORIGIN} crossOrigin />
        <link rel="dns-prefetch" href="https://api.pitchpredictions.com" crossOrigin />
        <link rel="preconnect" href="https://api.pitchpredictions.com" crossOrigin />
        <link rel="canonical" href={`${SITE_ORIGIN}${router.asPath.split('?')[0]}`} key="canonical" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="copyright" content="© 2025 Freewinningtips All rights reserved." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#202c3c" />
        <meta name="description" content={pageDescription} />
        <meta name="google-adsense-account" content="ca-pub-5665711413000284"/>
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@freewinningtips" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={`${SITE_ORIGIN}/freewinningtips-icon.png`} />
        <meta name="twitter:url" content={`${SITE_ORIGIN}${router.asPath.split('?')[0]}`} />

        <meta property="og:title" content={ogTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_ORIGIN}/freewinningtips-icon.png`} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={`${SITE_ORIGIN}${router.asPath.split('?')[0]}`} />
      </Head>

      {/* Google Analytics */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-KH2W81P2ZD" async />
      <Script id='google-analytics' strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KH2W81P2ZD', {
          page_path: window.location.pathname,
        });
        `,
      }} />

      <Navbar toggleSidebar={toggleSidebar} />
      
      <div>
        {/* Page Title */}
        {meta_content_data[3] != null && (
          <div className="d-flex flex-wrap justify-content-center pb-1 pt-2" style={{ color: "black", fontWeight: "bold" }}>
            <h1 className="h1headerTitle">{meta_content_data[3]}</h1>
          </div>
        )}
        
        <div className="container-mob desktop-container-resize">
          <div className="layout-wrapper">
            {/* Main Content Area */}
            <div className={`main-content ${isAuthPage || !shouldShowSidebar ? 'full-width' : ''}`}>
              <Subnavbar/>
              <div style={{ marginTop: "0px" }}>
                <Component {...pageProps} />
              </div>
            </div>
            
            {/* Sidebar - Only shown when needed */}
            {shouldShowSidebar && (
              <div className="sidebar-wrapper">
                <div className="sidebar-container">
                  <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;