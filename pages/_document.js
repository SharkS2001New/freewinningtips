import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/freewinningtips.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"/>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5665711413000284"
          crossOrigin="anonymous" strategy="afterInteractive"></script>
      </Head>
      <body>
        {/* <div id='zone_1270723317'></div> */}

        {/* <div id='zone_2090840204'></div> */}

        <div className="clever-core-ads"></div>

        {/**1xbet popup banner */}
        {/* <div id='zone_1322491250' ></div> */}
        
        <Main />
        <NextScript />
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
        {/* <Script
          id="ftd-agency-script-1270723317"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,o,g,r,a,m){
                  var cid='zone_1270723317';
                  w[r]=w[r]||function(){(w[r+'l']=w[r+'l']||[]).push(arguments)};
                  function e(b,w,r){
                      if((w[r+'h']=b.pop())&&!w.ABN){
                          var a=d.createElement(o),p=d.getElementsByTagName(o)[0];
                          a.async=1;
                          a.src='https://cdn.'+w[r+'h']+'/libs/e.js';
                          a.onerror=function(){e(g,w,r)};
                          p.parentNode.insertBefore(a,p);
                      }
                  }
                  e(g,w,r);
                  w[r](cid,{id:1270723317,domain:w[r+'h']});
              })(window,document,'script',['ftd.agency'],'ABNS');
            `,
          }}
        /> */}

        {/* Clever Core Script  */}
        <Script
          id="clever-core"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (document, window) {
                var a, c = document.createElement("script"), f = window.frameElement;

                c.id = "CleverCoreLoader78681";
                c.src = "https://scripts.cleverwebserver.com/dd81450c8861a32004d657e2b04f386d.js";
                c.async = true;
                c.type = "text/javascript";
                c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
                c.setAttribute("data-callback", "put-your-callback-function-here");
                c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
                c.setAttribute("data-callback-url-view", "put-your-view-macro-here");

                try {
                  a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
                } catch (e) {
                  a = false;
                }
                a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
                a.parentNode.insertBefore(c, a);
              })(document, window);
            `,
          }}
        />

        {/**1xbet popup banner */}
        {/* <Script
          id="ftd-agency-script-1322491250"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,o,g,r,a,m){
                  var cid='zone_1322491250';
                  w[r]=w[r]||function(){(w[r+'l']=w[r+'l']||[]).push(arguments)};
                  function e(b,w,r){
                      if((w[r+'h']=b.pop())&&!w.ABN){
                          var a=d.createElement(o),
                              p=d.getElementsByTagName(o)[0];
                          a.async=1;
                          a.src='https://cdn.'+w[r+'h']+'/libs/e.js';
                          a.onerror=function(){e(g,w,r)};
                          p.parentNode.insertBefore(a,p);
                      }
                  }
                  e(g,w,r);
                  w[r](cid,{id:1322491250,domain:w[r+'h']});
              })(window,document,'script',['ftd.agency'],'ABNS');
            `,
          }}
        /> */}
        </body>
    </Html>
  )
}
