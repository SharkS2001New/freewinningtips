import Link from 'next/link';

export default function HowWePredictPage() {
  return (
    <div className="page-root">
      <div className="container-main">
        <section className="seo-section">
          <div className="seo-inner">
            <p>
              FreeWinningTips combines statistical modelling, market analysis, and human expert review
              to publish daily football predictions across 50+ leagues. This page explains our
              methodology so you can understand exactly how each tip is produced.
            </p>

            <h2>Our Three-Step Prediction Process</h2>
            <p>
              Every match goes through the same pipeline before a tip is published on the homepage
              or category pages like{' '}
              <Link href="/predictions/todays-predictions">today&apos;s football predictions</Link>,{' '}
              <Link href="/predictions/gg-no-gg">both teams to score predictions</Link>, and{' '}
              <Link href="/predictions/free-betting-tips-today">free football betting picks today</Link>.
            </p>

            <h3>1. Statistical modelling</h3>
            <p>
              Our model ingests team form from the last 10 matches, head-to-head history, expected goals,
              home/away advantage, and player availability signals. It outputs probability scores for
              1X2, BTTS, Over/Under, and Double Chance markets. Data sources include historical match
              databases, league standings, and injury reports aggregated from public team news feeds.
            </p>

            <h3>2. Market analysis</h3>
            <p>
              Model probabilities are compared against odds from 10+ bookmakers. We flag value when our
              probability exceeds the implied bookmaker probability, and we monitor line movement to
              detect sharp market shifts before kick-off.
            </p>

            <h3>3. Expert review</h3>
            <p>
              A senior analyst reviews every shortlisted pick for late-breaking news: injuries,
              suspensions, weather, rotation, or tactical changes published within 24 hours of kick-off.
              Only picks that pass this review are published.
            </p>

            <h2>Who Reviews the Tips?</h2>
            <p>
              Our editorial team includes football analysts with roles focused on European leagues,
              African domestic competitions, and accumulator/jackpot markets. Analysts work in shifts
              so morning publications and last-minute updates are covered seven days a week.
            </p>
            <ul>
              <li><strong>James</strong> — Lead analyst, Premier League &amp; Champions League</li>
              <li><strong>Amina</strong> — African leagues &amp; CAF competitions specialist</li>
              <li><strong>Daniel</strong> — Statistical modelling &amp; Over/Under markets</li>
              <li><strong>Sarah</strong> — BTTS, Double Chance &amp; accumulator selections</li>
            </ul>

            <h2>Transparency &amp; Results</h2>
            <p>
              We publish monthly win-rate statistics on our{' '}
              <Link href="/results">Results Archive</Link>, including wins, losses, and voids.
              We do not retroactively remove losing picks. If you want to verify performance before
              following a tip, start there.
            </p>

            <h2>Update Schedule</h2>
            <p>
              Free predictions are published daily by 9:00 AM East Africa Time (EAT), including weekends.
              VIP picks for{' '}
              <Link href="/predictions/must-win-teams-today">must-win football teams today</Link>{' '}
              are delivered to subscribers via Telegram or WhatsApp, usually by 8:00 AM on match days.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
