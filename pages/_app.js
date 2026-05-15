// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import "../styles/blog.css"; 
import "../styles/auth-css.css";
import Head from 'next/head';
import Navbar from '../components/includes/navbar';
import Footer from '../components/includes/footer';
import Sidebar from '../components/includes/Sidebar';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Script from 'next/script';
import MetaContent from '@/components/functions/meta-title-content';
import useScrollRestoration from '@/components/functions/useScrollRestoration';
import Subnavbar from '@/components/includes/subnavbar';

function App({ Component, pageProps }) {
  var meta_content_data = MetaContent();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useScrollRestoration(router);
  
  const path = router.pathname;
  
  // Check if the current page includes 'auth' in its route
  const isAuthPage = router.pathname.includes("auth");
  
  // Excluded routes where sidebar should NOT be shown
  const excludedRoutes = ["/blog"];
  const shouldShowSidebar = !excludedRoutes.includes(path) && !isAuthPage;

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
        <title>{meta_content_data[0]}</title>
        <link rel="dns-prefetch" href="https://freewinningtips.com" crossOrigin />
        <link rel="preconnect" href="https://freewinningtips.com" crossOrigin />
        <link rel="dns-prefetch" href="https://api.pitchpredictions.com" crossOrigin />
        <link rel="preconnect" href="https://api.pitchpredictions.com" crossOrigin />
        <link rel="canonical" href={`https://freewinningtips.com${router.pathname}`} key="canonical" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="copyright" content="© 2025 Freewinningtips All rights reserved." />
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