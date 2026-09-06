import Link from 'next/link';
import AnalystByline from '@/components/shared/AnalystByline';
import MarketBrowseTips from '@/components/shared/MarketBrowseTips';

/**
 * SEO block mirrors GoalVertex /must-win-teams-today section order + FAQ.
 * Brand swapped only — structure and claims pattern kept.
 */
const MUST_WIN_FAQ_ITEMS = [
  {
    question: 'How are the must win teams today selected?',
    answer:
      "Our statistical model evaluates every fixture in the day's calendar and scores each one across five factors: home or away win probability, current form over the last 10 games, head-to-head win rate at the specific venue, the opposition's defensive record on the road, and live betting market movement. The top scoring fixtures then go to our analysts for a manual review. Only after that review do they appear on this page — typically published by 8am each morning.",
  },
  {
    question: 'Why is the page limited to exactly 10 teams?',
    answer:
      'Because quality is more valuable than quantity. Publishing 50 win picks a day sounds impressive but it forces the inclusion of low-confidence selections that dilute the usefulness of the page. Ten carefully chosen teams — each individually reviewed — gives you a focused, high-quality daily card. Every team on this list has a clear data case behind it.',
  },
  {
    question: 'Are these predictions free?',
    answer:
      'Yes, completely free. All 10 win predictions and the win probability scores are freely accessible to everyone with no account, subscription, or payment of any kind. FreeWinningTips will never charge for predictions.',
  },
  {
    question: "Can I build an accumulator using today's teams?",
    answer:
      "Yes and many of our readers do. Taking 4 or 5 of today's 10 selections and combining them in an accumulator can generate strong odds while maintaining a realistic chance of landing all legs. Our Accumulator Tips page features pre-built daily accas — some of which draw on fixtures from this page. Always bet responsibly and treat accumulators as entertainment rather than income.",
  },
  {
    question: 'When is this page updated?',
    answer:
      'The must win teams today page is updated every morning, typically by 8am. Late team news and injury updates that arrive closer to kick-off may occasionally prompt a note to be added to an individual card\'s analysis but the selections themselves are set from the morning publication. The page resets completely with a fresh set of 10 teams the following day.',
  },
];

const MustWinTeamspageContent = ({ cardSummary = {} }) => {
  return (
    <section className="seo-section">
      <div className="seo-inner">
        <p className="market-rg-notice">
          <strong>Responsible Gambling Notice:</strong> Football predictions are for informational
          and entertainment purposes only. No prediction is guaranteed. FreeWinningTips promotes
          responsible gambling — only bet what you can afford to lose. 18+ only.
        </p>

        <p>
          <strong>Stephen Karuku</strong> — Lead Predictions Analyst, FreeWinningTips Editorial
        </p>
        <p>
          Every team on the FreeWinningTips must win teams today page is individually reviewed by
          Stephen and our editorial team each morning before the page goes live — we never automate
          these selections without review.
        </p>
        <AnalystByline />

        <ul className="seo-bullet-list">
          <li>Exactly 10 teams — no more, no less</li>
          <li>Home and away wins only</li>
          <li>Expert-reviewed every morning</li>
          <li>100% free — no registration needed</li>
        </ul>

        <MarketBrowseTips title="More Win Tips" />

        <h2>Must Win Teams Today — FreeWinningTips&apos; Daily 10</h2>
        <p>
          Every morning FreeWinningTips publishes exactly 10 teams to win today — no more, no fewer.
          This page covers home and away win predictions only, drawn from across the world&apos;s
          most popular leagues and backed by form data, head-to-head statistics, defensive records,
          and live market movement. We limit this page to 10 selections deliberately because a
          smaller card of well-researched win picks is far more useful to bettors than a bloated list
          of low-confidence guesses. Every team listed above has been individually assessed by our
          analysts before the page goes live — these are not algorithmically generated selections
          with no thought behind them.
        </p>
        <p>
          The 10 teams span a mix of leagues each day, balancing popular European competitions where
          data quality is richest with selections from other leagues where our model has identified a
          particularly clear edge
          {cardSummary.homeWins != null
            ? ` — today that mix is ${cardSummary.homeWins} home win${cardSummary.homeWins === 1 ? '' : 's'} and ${cardSummary.awayWins} away win${cardSummary.awayWins === 1 ? '' : 's'}`
            : ''}
          . For bettors who want to build an accumulator from today&apos;s selections, our{' '}
          <Link href="/predictions/accumulator-tips">Accumulator Tips</Link> page features pre-built
          daily accas that sometimes draw on these same fixtures.
        </p>

        <h2>Why 10 Teams and Win-Only Predictions?</h2>
        <p>
          Most prediction pages mix markets — throwing over/under goals tips, BTTS predictions, and
          correct score picks all into the same list. FreeWinningTips&apos; must win teams today page
          is deliberately different. It covers one market only: which team wins the match. Home win
          or away win, nothing else. This focus makes the page cleaner and more useful for bettors
          who want to back specific teams rather than betting on match totals or goal-scoring
          patterns. Ten selections per day is large enough to give genuine selection variety across
          multiple leagues, and small enough to ensure every pick deserves its place on the list
          rather than being padding.
        </p>

        <h2>Frequently Asked Questions</h2>
        <div className="homepage-faq">
          {MUST_WIN_FAQ_ITEMS.map((item) => (
            <div key={item.question} className="homepage-faq-item">
              <h3>{item.question}</h3>
              <p>
                {item.question === "Can I build an accumulator using today's teams?" ? (
                  <>
                    Yes and many of our readers do. Taking 4 or 5 of today&apos;s 10 selections and
                    combining them in an accumulator can generate strong odds while maintaining a
                    realistic chance of landing all legs. Our{' '}
                    <Link href="/predictions/accumulator-tips">Accumulator Tips</Link> page features
                    pre-built daily accas — some of which draw on fixtures from this page. Always bet
                    responsibly and treat accumulators as entertainment rather than income.
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

export default MustWinTeamspageContent;
