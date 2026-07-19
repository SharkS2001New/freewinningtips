import Link from 'next/link';
import {
  getFeaturedPicks,
  formatTipLabel,
} from '@/components/functions/predictionTip';
import MarketBrowseTips from '@/components/shared/MarketBrowseTips';
import AnalystByline from '@/components/shared/AnalystByline';

const FAQ_ITEMS = [
  {
    question: 'Are FreeWinningTips predictions free?',
    answer:
      'Yes. We publish free daily football predictions covering 1X2, BTTS, Over/Under, Accumulator, and Double Chance markets. A VIP tier with additional high-confidence picks is also available — see our VIP Tips page for details.',
  },
  {
    question: 'How accurate are your football predictions?',
    answer:
      'Our analysts maintain a verified average success rate of over 70% across all free markets, tracked and published monthly. We include wins, losses, and voids in our stats — nothing is hidden. Visit our Results Archive to check historical performance before following any tip.',
  },
  {
    question: 'Which football leagues do you cover?',
    answer:
      'We cover 50+ competitions including the English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, UEFA Champions League, MLS, and African leagues including the Kenyan Premier League, Egyptian Premier League, and South African PSL.',
  },
  {
    question: 'How often are predictions updated?',
    answer:
      'Free predictions are published daily by 9:00 AM East Africa Time (EAT). VIP picks are sent directly to subscribers via Telegram or WhatsApp, usually by 8:00 AM on match days.',
  },
  {
    question: 'How are your predictions made?',
    answer:
      'Our team uses a statistical model that scores each match on team form, head-to-head history, player availability, venue advantage, and market odds movement. A senior analyst reviews every pick before publication and checks for late team news.',
  },
  {
    question: 'What is the Jackpot Predictions section?',
    answer:
      'Our Jackpot Predictions cover major weekly jackpots like Sportpesa Mega Jackpot. We provide full predicted scorelines and match tips for all jackpot games, with an in-depth analysis of each fixture. Visit our Jackpot Predictions page for this week\'s picks.',
  },
];

const FEATURE_ROWS = [
  { feature: 'Free daily tips', detail: '1X2, BTTS, Over/Under, Accumulator, Double Chance, Draw No Bet — no subscription needed' },
  { feature: '50+ leagues', detail: 'EPL, La Liga, Serie A, Bundesliga, Ligue 1, MLS, CAF leagues, Kenyan Premier League and more' },
  { feature: 'Transparent accuracy', detail: 'Monthly win-rate stats published openly — we don\'t hide our misses' },
  { feature: 'Same-day tips', detail: 'Predictions updated by 9:00 AM EAT every day, including weekends' },
  { feature: 'VIP picks', detail: 'Subscribe to Must Win Teams Today for exclusive high-confidence tips via WhatsApp/Telegram' },
];

const HomepageContent = ({ fixtures = [] }) => {
  const featuredPicks = getFeaturedPicks(fixtures, 5);

  return (
    <section className="seo-section">
      <div className="seo-inner">
        <AnalystByline />
        <MarketBrowseTips title="Browse FreeWinningTips Markets" />

        <p>
          FreeWinningTips publishes free football predictions every day, covering 50+ leagues from the English Premier League to the Kenyan Premier League. Our analysis team processes team form, head-to-head records, player availability, and betting market movement to calculate a probability score for each match. Every tip you see — 1X2, BTTS, Over/Under, Accumulator, or Jackpot — is backed by data, not guesswork. Check our{' '}
          <Link href="/results">monthly results archive</Link> to see our verified accuracy rates before you follow any prediction.
        </p>

        <p className="seo-nav-links">
          Browse{' '}
          <Link href="/predictions/todays-predictions">today&apos;s football predictions</Link>,{' '}
          <Link href="/predictions/free-betting-tips-today">free football betting picks today</Link>,{' '}
          <Link href="/predictions/must-win-teams-today">must-win football teams today</Link>,{' '}
          <Link href="/predictions/gg-no-gg">both teams to score predictions</Link>,{' '}
          <Link href="/yesterdays-free-football-predictions">yesterday&apos;s free football predictions</Link>, and{' '}
          <Link href="/tomorrows-free-football-predictions">tomorrow&apos;s free football betting tips</Link>.
        </p>

        <h2>How Our Football Predictions Work</h2>
        <p>
          Every prediction on FreeWinningTips goes through a three-step analysis process before it is published:
        </p>
        <p>
          <strong>Statistical modelling</strong> — We calculate expected goals, form index, and home/away advantage using data from the last 10 matches for each team.
        </p>
        <p>
          <strong>Market analysis</strong> — We cross-reference our model output against bookmaker odds across 10+ bookmakers to identify value and spot line movement.
        </p>
        <p>
          <strong>Expert review</strong> — A senior analyst does a final check for breaking news: injuries, suspensions, weather, or team selection changes published in the 24 hours before kick-off.{' '}
          <Link href="/how-we-predict">Read our full methodology</Link>.
        </p>

        <h2>Why Bettors Choose FreeWinningTips</h2>
        <p>There are hundreds of football prediction sites. Here is what makes FreeWinningTips different:</p>
        <table className="seo-feature-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_ROWS.map((row) => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Today&apos;s Free Betting Tips</h2>
        {featuredPicks.length > 0 ? (
          <ul className="featured-picks-list">
            {featuredPicks.map((pick) => (
              <li key={pick.fixture.fixture_id || `${pick.matchLabel}-${pick.tip}`}>
                <strong>{pick.matchLabel}</strong>
                {' | '}
                {formatTipLabel(pick.tip, pick.market)}
                {pick.probability ? ` | Probability: ${pick.probability}%` : ''}
                {pick.analystNote && (
                  <p className="featured-pick-note">
                    <em>Analyst note:</em> {pick.analystNote}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Featured picks for today will appear here once fixtures are loaded. Check back shortly after 9:00 AM EAT.</p>
        )}

        <h2>Frequently Asked Questions</h2>
        <div className="homepage-faq">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="homepage-faq-item">
              <h3>{item.question}</h3>
              {item.question === 'Which football leagues do you cover?' ? (
                <p>
                  {item.answer} Therefore, it helps enable more effective sports betting on{' '}
                  <a
                    href="https://rizetoto.com"
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                  >
                    토토사이트
                  </a>
                  .
                </p>
              ) : (
                <p>{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageContent;
export { FAQ_ITEMS };
