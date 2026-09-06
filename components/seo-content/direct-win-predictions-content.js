import Link from 'next/link';
import AnalystByline from '@/components/shared/AnalystByline';
import MarketBrowseTips from '@/components/shared/MarketBrowseTips';

/**
 * GoalVertex has no /direct-win-predictions page.
 * Pattern borrowed from their Must Win / win-only cards:
 * RG notice → analyst → trust bullets → market browse → explainer → FAQ.
 */

const DIRECT_WIN_FAQ_ITEMS = [
  {
    question: 'What does a direct win bet mean?',
    answer:
      'A direct win bet names one team to win a match outright, with no draw option. If the game ends level, the bet loses regardless of which side was backed.',
  },
  {
    question: 'How are direct win predictions selected?',
    answer:
      'Our statistical model scores fixtures on home or away win probability, current form, head-to-head, opposition defensive record, and live market movement. Only high-confidence home or away wins pass the filter — then a manual analyst review before publication.',
  },
  {
    question: 'Are these predictions free?',
    answer:
      'Yes, completely free. Every direct win prediction and probability score is free — no account, subscription, or payment.',
  },
  {
    question: 'What is the difference between Direct Win and Must Win Teams Today?',
    answer:
      'Must Win Teams Today is a fixed daily card of exactly 10 teams. Direct Win lists every fixture that clears our higher win-only confidence filter that day — so the count can be higher or lower than 10.',
  },
  {
    question: 'Can a direct win prediction ever be guaranteed?',
    answer:
      'No. A draw is always mathematically possible. Treat every direct win pick as a high-conviction, data-backed selection — not a certainty. Always bet responsibly.',
  },
];

function AccuracyTable({ accuracyStats }) {
  const rows = [
    { label: 'Home Win (1)', bucket: accuracyStats.homeWin },
    { label: 'Away Win (2)', bucket: accuracyStats.awayWin },
    { label: 'All direct win picks', bucket: accuracyStats.all },
  ];

  return (
    <table className="seo-feature-table">
      <thead>
        <tr>
          <th>Market</th>
          <th>Picks published</th>
          <th>Correct</th>
          <th>Win rate</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td>{row.label}</td>
            <td>{row.bucket.published || '—'}</td>
            <td>{row.bucket.correct || '—'}</td>
            <td>
              {row.bucket.published
                ? `${Math.round((row.bucket.correct / row.bucket.published) * 100)}%`
                : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const DirectWinPredictionsPageContent = ({ accuracyStats, accuracySummary = '—' }) => {
  return (
    <section className="seo-section">
      <div className="seo-inner">
        <p className="market-rg-notice">
          <strong>Responsible Gambling Notice:</strong> Direct win predictions are for informational
          and entertainment purposes only. No prediction is guaranteed. FreeWinningTips promotes
          responsible gambling — only bet what you can afford to lose. 18+ only.
        </p>

        <p>
          <strong>Stephen Karuku</strong> — Lead Predictions Analyst, FreeWinningTips Editorial
        </p>
        <p>
          Stephen manually checks every direct win selection against team news and market movement
          before it&apos;s published, holding this market to a tighter confidence bar because of how
          unforgiving it is when wrong.
        </p>
        <AnalystByline />

        <ul className="seo-bullet-list">
          <li>Home and away wins only</li>
          <li>High-confidence filter before publish</li>
          <li>Expert-reviewed every morning</li>
          <li>100% free — no registration needed</li>
        </ul>

        <MarketBrowseTips title="More Win Tips" />

        <h2>Direct Win Predictions — Win Only, No Draw Cover</h2>
        <p>
          Picking a direct win means picking a side with no draw to fall back on — the team you name
          either wins the match or the bet is gone. This page covers home and away win predictions
          only, backed by form data, head-to-head statistics, defensive records, and live market
          movement. We only publish a pick when the data shows a clear gap between the two sides.
        </p>
        <p>
          For a fixed daily shortlist of exactly 10 teams, use{' '}
          <Link href="/predictions/must-win-teams-today">must win teams today</Link>. For
          multi-market tips (Over/Under, BTTS, 1X2), use{' '}
          <Link href="/predictions/betnumbers-prediction">BetNumbers predictions</Link>.
        </p>

        <h2>Direct Win Accuracy — Last 30 Days</h2>
        <p>
          We track every prediction we publish
          {accuracySummary !== '—' ? ` (${accuracySummary} overall)` : ''}. See the full archive on
          our <Link href="/results">results page</Link>.
        </p>
        <AccuracyTable accuracyStats={accuracyStats} />

        <h2>Frequently Asked Questions</h2>
        <div className="homepage-faq">
          {DIRECT_WIN_FAQ_ITEMS.map((item) => (
            <div key={item.question} className="homepage-faq-item">
              <h3>{item.question}</h3>
              <p>
                {item.question ===
                'What is the difference between Direct Win and Must Win Teams Today?' ? (
                  <>
                    Must Win Teams Today is a fixed daily card of exactly 10 teams. Direct Win lists
                    every fixture that clears our higher win-only confidence filter that day — so the
                    count can be higher or lower than 10. Compare both on{' '}
                    <Link href="/predictions/must-win-teams-today">must win teams today</Link>.
                  </>
                ) : (
                  item.answer
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectWinPredictionsPageContent;
