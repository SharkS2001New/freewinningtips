import Link from 'next/link';
import MarketBrowseTips from '@/components/shared/MarketBrowseTips';
import AnalystByline from '@/components/shared/AnalystByline';

const FAQ_ITEMS = [
  {
    q: 'What does BTTS / GG mean?',
    a: 'Both Teams To Score (BTTS), also called GG, means both teams score at least one goal. NG / No GG means at least one team fails to score.',
  },
  {
    q: 'Are FreeWinningTips BTTS predictions free?',
    a: 'Yes. All GG/NG tips on this page are free daily. VIP packages add additional high-confidence BTTS bankers delivered by Telegram or WhatsApp.',
  },
  {
    q: 'How are BTTS tips selected?',
    a: 'Our model estimates both-teams-to-score probability using scoring rates, defensive concession rates, head-to-head GG frequency, and BTTS odds movement. An analyst reviews squad news before publication.',
  },
  {
    q: 'Which leagues get BTTS tips?',
    a: 'We publish BTTS tips across 200+ leagues including EPL, La Liga, Serie A, Bundesliga, Ligue 1, MLS, and African leagues including the Kenyan Premier League.',
  },
];

const BothTeamsToScorePageContent = () => {
  return (
    <section className="seo-section">
      <div className="seo-inner">
        <AnalystByline />
        <MarketBrowseTips title="Related Free Betting Markets" />

        <h2>Both Teams To Score Predictions Today (BTTS / GG Tips)</h2>
        <p>
          FreeWinningTips publishes free both teams to score predictions every day. Each BTTS tip
          includes a probability score and odds when available, so you can see why both sides are
          expected to find the net — or why a No-GG / NG angle is preferred.
        </p>
        <p>
          Compare today&apos;s BTTS list with{' '}
          <Link href="/predictions/todays-predictions">today&apos;s football predictions</Link>,{' '}
          <Link href="/predictions/2-5-goals">Over/Under 2.5 tips</Link>, and{' '}
          <Link href="/tomorrows-free-football-predictions">tomorrow&apos;s free football betting tips</Link>.
        </p>

        <h2>How Our GG / NG Model Works</h2>
        <p>
          The BTTS model scores attacking output and defensive vulnerability for each side, then
          blends that with market odds. When BTTS Yes odds drop sharply with strong model agreement,
          the tip is prioritised. When both attacks are blunt or one side sits deep, NG can be the
          published call. Full methodology:{' '}
          <Link href="/how-we-predict">how we predict</Link>.
        </p>

        <h2>Why Bettors Use FreeWinningTips for BTTS</h2>
        <p>
          BTTS markets reward consistency more than longshot scorelines. FreeWinningTips focuses on
          clear probability edges, publishes free tips without registration, and tracks outcomes in
          our <Link href="/results">results archive</Link> so you can verify performance before
          staking.
        </p>

        <h2>Frequently Asked Questions — BTTS Predictions</h2>
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="homepage-faq-item">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BothTeamsToScorePageContent;
