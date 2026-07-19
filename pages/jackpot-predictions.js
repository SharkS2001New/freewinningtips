dcca// pages/jackpot-predictions.js  (or wherever this page lives)
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import JackpotPredictionsPageContent from '@/components/seo-content/jackpot-predictions-content';

/* ─────────────────────────────────────────────
   STATIC JACKPOT LIST
   (matches exactly the links in the original code)
───────────────────────────────────────────── */
const ALL_JACKPOTS = [
  { label: 'Sportpesa Mega Jackpot Predictions',          href: '/jackpots/sportpesa-mega-jackpot-predictions' },
  { label: 'Sportpesa Midweek Jackpot Predictions',       href: '/jackpots/sportpesa-midweek-jackpot-predictions' },
  { label: 'Sportpesa Supa Jackpot 17 Predictions TZ',    href: '/jackpots/sportpesa-supa-jackpot-tanzania-predictions' },
  { label: 'Sportpesa Supa Jackpot 13 Predictions TZ',    href: '/jackpots/sportpesa-midweek-tanzania-jackpot-predictions' },
  { label: 'Betika Midweek Jackpot Predictions',          href: '/jackpots/betika-midweek-jackpot-predictions' },
  { label: 'Betika Kitonga Jackpot TZ',                   href: '/jackpots/betika-kitonga-tanzania-predictions' },
  { label: 'Mozzart Super Grand Jackpot Predictions',     href: '/jackpots/mozzart-bet-grand-jackpot-predictions' },
  { label: 'Mozzart Super Daily Jackpot Predictions',     href: '/jackpots/mozzart-super-daily-jackpot-predictions' },
  { label: 'Shabiki Jackpot Predictions',                 href: '/jackpots/shabiki-midweek-jackpot-predictions' },
  { label: 'Odibet Laki Tatu Daily Jackpot Predictions',  href: '/jackpots/odibet-laki-tatu-jackpot-predictions' },
  { label: 'Sportybet Jackpot Predictions',               href: '/jackpots/sporty-bet-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions Uganda',          href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions Nigeria',         href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions Kenya',           href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions Tanzania',        href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions Zambia',          href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions Ghana',           href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions Cameroon',        href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betpawa Jackpot Predictions DR Congo',        href: '/jackpots/betpawa-jackpot-predictions' },
  // { label: 'Betway Jackpot Predictions Uganda',           href: '/jackpots/betway-jackpot-predictions-uganda' },
  // { label: 'Betway Jackpot Predictions Kenya',            href: '/jackpots/betway-jackpot-predictions-kenya' },
  // { label: 'Betway Jackpot Predictions Tanzania',         href: '/jackpots/betway-jackpot-predictions-tanzania' },
  // { label: '22 Bet Toto Jackpot Predictions',             href: '/jackpots/22-bet-toto-jackpot-predictions' },
  // { label: 'Bet9ja Super9ja Jackpot Predictions',         href: '/jackpots/bet9ja-jackpot-predictions' },
  { label: 'Betking Jackpot Prediction',                  href: '/jackpots/betking-jackpot-predictions' },
  // { label: 'Merrybet Jackpot Prediction',                 href: '/jackpots/merrybet-jackpot-predictions' },
  { label: '1XBet Toto 15 Jackpot Prediction',           href: '/jackpots/1xbet-toto-15-jackpot-predictions' },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const ACTIVE_COLORS = [
  '#FFC300','#36D7B7','#eb8034','#34c3eb',
  '#e534eb','#F39C12','#1ABC9C','#2ECC71',
  '#9B59B6','#8E44AD','#2980B9',
];

const getModifiedJackpotName = (name) => {
  if (name === 'Betpawa Pick13 Jackpot' || name === 'Betpawa Pick 17 Jackpot') {
    return 'Betpawa Jackpot Predictions';
  }
  return name + ' Predictions';
};

const getJackpotUrl = (name) => {
  if (name === 'Betpawa Pick13 Jackpot' || name === 'Betpawa Pick 17 Jackpot') {
    return '/jackpots/betpawa-jackpot-predictions';
  }
  return '/jackpots/' + name.toLowerCase().replace(/\s+/g, '-') + '-predictions';
};

/* ─────────────────────────────────────────────
   JACKPOT BUTTON — outlined pill style
───────────────────────────────────────────── */
function JackpotBtn({ label, href }) {
  return (
    <a href={href} className="jp-btn">
      {label}
    </a>
  );
}

/* ─────────────────────────────────────────────
   ACTIVE JACKPOT CARD — coloured
───────────────────────────────────────────── */
function ActiveJackpotCard({ jackpot, color }) {
  return (
    <a href={getJackpotUrl(jackpot.jackpot_name)} className="jp-active-card" style={{ background: color }}>
      {getModifiedJackpotName(jackpot.jackpot_name)}
    </a>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function JackpotPredictions() {
  const router = useRouter();
  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    fetch('/api/jackpots/active')          // ← proxy route (avoids CORS + hides auth)
      .then(r => r.json())
      .then(data => {
        if (data.status && Array.isArray(data.data)) setActiveList(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router.isReady]);

  return (
    <>
      <div className="jp-page">
        {/* ── ALL JACKPOTS — 2-column outlined list ── */}
        <section className="jp-section">
          <div className="jp-grid">
            {ALL_JACKPOTS.map(jp => (
              <JackpotBtn key={jp.label} label={jp.label} href={jp.href} />
            ))}
          </div>
        </section>

        <JackpotPredictionsPageContent/>
      </div>
    </>
  );
}