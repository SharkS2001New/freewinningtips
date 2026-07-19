import Link from 'next/link';
import MarketBrowseTips from '@/components/shared/MarketBrowseTips';
import AnalystByline from '@/components/shared/AnalystByline';

const FAQ_ITEMS = [
  {
    q: 'Are correct score predictions free on FreeWinningTips?',
    a: 'Yes. Correct-score analysis and related high-confidence tips are free to read. VIP packages add exclusive banker scorelines with deeper notes for subscribers.',
  },
  {
    q: 'How does FreeWinningTips forecast scorelines?',
    a: 'We use expected-goals and Poisson-style scoreline distributions, then overlay form, defensive records, and market odds. Only higher-probability scorelines are highlighted for publication.',
  },
  {
    q: 'Are correct scores guaranteed?',
    a: 'No. Correct score is a high-variance market. Treat tips as probabilistic edges, stake responsibly, and verify recent results on our Results Archive.',
  },
];

const CorrectScorePageContent = () => {
  return (
    <section className="seo-section">
      <div className="seo-inner">
        <AnalystByline />
        <MarketBrowseTips title="Combine Correct Score With Other Markets" />

        <h2>Correct Score Predictions Today — Free Exact Scoreline Tips</h2>
        <p>
          FreeWinningTips publishes free correct score predictions alongside our daily match tips.
          Exact score markets pay more than simple 1X2 picks, but they carry higher risk. We only
          highlight scorelines where our distribution model shows a meaningful probability edge —
          typically when a scoreline clears roughly a 20%+ model threshold (about 4/1 implied odds or
          shorter).
        </p>
        <p>
          Cross-check with{' '}
          <Link href="/predictions/todays-predictions">today&apos;s football predictions</Link>,{' '}
          <Link href="/predictions/direct-win-predictions">direct win predictions</Link>, and{' '}
          <Link href="/predictions/gg-no-gg">BTTS tips</Link> before locking a scoreline.
        </p>

        <h2>How Our Correct Score Model Works</h2>
        <p>
          Attack and defence metrics feed an expected-goals view of each match. A Poisson-style grid
          estimates the probability of common scorelines (1-0, 2-1, 1-1, 0-0, 2-0, etc.). Analysts then
          filter for injuries, suspensions, and motivational factors. Learn more on{' '}
          <Link href="/how-we-predict">how we predict</Link>.
        </p>

        <h2>How to Bet Correct Scores Responsibly</h2>
        <p>
          Correct score staking should be smaller than 1X2 stakes. Prefer combining a high-confidence
          match direction with a small scoreline punt, or use FreeWinningTips VIP for curated bankers.
          Review graded outcomes on our <Link href="/results">results page</Link>.
        </p>

        <h2>Frequently Asked Questions — Correct Score</h2>
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

export default CorrectScorePageContent;
