// components/Footer.js
import React, { useState, useEffect } from "react";

function SponsorLinks() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const CACHE_KEY = "fwt_footer_sponsors_v1";

    const applyLinks = (links) => {
      if (!cancelled) setSponsors(Array.isArray(links) ? links : []);
    };

    try {
      const raw = window.sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.links) && parsed.links.length) {
          applyLinks(parsed.links);
        }
      }
    } catch {
      // ignore
    }

    const load = async () => {
      try {
        const res = await fetch("/api/site-content/footer-sponsors", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return;
        const json = await res.json();
        const links = Array.isArray(json?.links) ? json.links : [];
        applyLinks(links);
        try {
          window.sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ links, at: Date.now() })
          );
        } catch {
          // ignore
        }
      } catch {
        // Keep footer usable without sponsors if the file/API is unavailable.
      }
    };

    const timeoutId = window.setTimeout(load, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!sponsors.length) {
    return null;
  }

  return (
    <div className="footer-sponsor-section">
      <p className="footer-sponsor-title">Our Partners &amp; Sponsors</p>
      <div className="footer-sponsor-links">
        {sponsors.map((sponsor, index) => (
          <a
            key={`${sponsor.id || sponsor.url}-${index}`}
            href={sponsor.url}
            target="_blank"
            rel={
              Array.isArray(sponsor.rel) && sponsor.rel.length
                ? sponsor.rel.join(" ")
                : "noopener noreferrer"
            }
            className="footer-sponsor-link"
          >
            {sponsor.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">

      {/* ── TOP DIVIDER ── */}
      <div className="footer-divider" />

      {/* ── TOP NAV: About | Contact | Blog ── */}
      <div className="footer-top-nav">
        <a href="/about-us" className="footer-top-a">About</a>
        <a href="/how-we-predict" className="footer-top-a">How We Predict</a>
        <a href="/results" className="footer-top-a">Results</a>
        <a href="/contact-us" className="footer-top-a">Contact</a>
        <a href="/blog" className="footer-top-a">Blog</a>
      </div>

      {/* ── COPYRIGHT ── */}
      <div className="footer-copy-row">
        <p className="footer-copyright">
          Copyright © 2023 - {year} FreeWinningTips.com. All rights reserved.
        </p>
        <p className="footer-tags">
          <a href="https://www.pitchpredictions.com" target="_blank" rel="noopener noreferrer">PitchPredictions.com</a> |{' '}
          <a href="https://www.betsassured.com" target="_blank" rel="noopener noreferrer">Betsassured.com</a> |{' '}
          <a href="https://windrawtips.com" target="_blank" rel="noopener noreferrer">Windrawtips.com</a> |{' '}
          <a href="/our-partners" className="footer-partner-a">Our Partners</a>
        </p>
      </div>

      {/* ── 18+ WARNING ── */}
      <div className="footer-age-row">
        <span className="badge-18">18+</span>
        <p>You must be 18 years old or over to use this site. Please bet responsibly.</p>
      </div>

      {/* ── SOCIAL ICONS ── */}
      <div className="footer-social-row">
        <span className="footer-follow-label">Follow FreeWinningTips on:</span>
        <div className="footer-socials">

          {/* Facebook */}
          <a href="https://www.facebook.com/freewinningtips1x2" target="_blank" rel="noopener noreferrer"
             className="social-icon social-fb" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a href="https://x.com/FWT1x2" target="_blank" rel="noopener noreferrer"
             className="social-icon social-x" aria-label="X">
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com/freewinningtips1x2" target="_blank" rel="noopener noreferrer"
             className="social-icon social-ig" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          {/* Telegram */}
          <a href="https://t.me/s/freewinningtips1x2" target="_blank" rel="noopener noreferrer"
             className="social-icon social-tg" aria-label="Telegram">
            <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.613c-.15.67-.543.833-1.097.518l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.214-3.053 5.56-5.023c.242-.214-.053-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.202-.657-.643.136-.953l11.574-4.463c.535-.194 1.003.13.91.6z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── LEGAL aS ── */}
      <div className="footer-legal-row">
        <a href="/our-terms-and-conditions" className="footer-legal-a">T&amp;C</a>
        <span className="footer-sep">|</span>
        <a href="/our-privacy-policy" className="footer-legal-a">Privacy Policy</a>
        <span className="footer-sep">|</span>
        <a href="/payment-methods" className="footer-legal-a">Payment Methods</a>
        <span className="footer-sep">|</span>
        <a href="/sitemaps" className="footer-legal-a">Sitemap</a>
      </div>

      {/* ── RESPONSIBLE GAMBLING ── */}
      <div className="footer-gamble-row">
        <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="footer-gamble-a">
          Safer. Better. Together
        </a>
        <span className="footer-sep">|</span>
        <a href="https://www.gambleaware.org" target="_blank" rel="noopener noreferrer" className="footer-gamble-a">
          GambleAware
        </a>
        <span className="footer-sep">|</span>
        <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" className="footer-gamble-a">
          GamblingTherapy
        </a>
      </div>

      {/* ── RESPONSIBLE GAMBLING DETAIL ── */}
      <hr className="footer-hr" />

      <div className="footer-responsible">
        <strong>⚠️ Responsible Gambling:</strong> FreeWinningTips provides predictions and
        analysis for informational and entertainment purposes only. Betting involves financial
        risk — never bet more than you can afford to lose. Gambling can be addictive. If
        gambling is affecting you or someone you know, seek help at{' '}
        <a
          href="https://www.begambleaware.org"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="footer-warn-a"
        >
          BeGambleAware.org
        </a>{' '}
        or contact your national gambling helpline. You must be 18 years or older to use
        betting services. FreeWinningTips does not guarantee any prediction outcomes.
      </div>

      <SponsorLinks />

      {/* ── BACK TO TOP — fixed floating bottom-right (appears after scrolling) ── */}
      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
}

export default Footer;