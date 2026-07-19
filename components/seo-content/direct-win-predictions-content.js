import Link from 'next/link';
import AnalystByline from '@/components/shared/AnalystByline';

const DIRECT_WIN_FAQ_ITEMS = [
  {
    question: 'What does a direct win bet mean?',
    answer:
      'A direct win bet names one team to win a match outright, with no draw option. If the game ends level, the bet loses regardless of which side was backed.',
  },
  {
    question: 'Is direct win riskier than a normal win bet?',
    answer:
      "Yes, in the sense that a standard win bet on a 1X2 market only concerns that one outcome among three available options, while a direct win bet removes the draw from the market entirely — so the odds are usually shorter, and there's no separate draw outcome cushioning the line.",
  },
  {
    question: 'Why are there fewer direct win tips than other markets on this site?',
    answer:
      "Because most matches aren't lopsided enough to justify it. We only publish a direct win pick when the data shows a clear, consistent gap between two teams — everything else stays on our 1X2 or double chance pages instead.",
  },
  {
    question: 'Do I need to register to see these predictions?',
    answer:
      'No. Every direct win prediction on this page is free to view, with no account or subscription required.',
  },
  {
    question: 'Can a direct win prediction ever be guaranteed?',
    answer:
      'No. A draw is always mathematically possible, however strong the favourite looks on paper. Treat every direct win pick as a high-conviction, data-backed selection — not a certainty.',
  },
];

function AccuracyTable({ accuracyStats }) {
  const rows = [
    { label: 'Home Win (1)', bucket: accuracyStats.homeWin },
    { label: 'Away Win (2)', bucket: accuracyStats.awayWin },
    { label: 'Double Chance', bucket: accuracyStats.doubleChance },
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
        <p>
          Picking a direct win means picking a side and removing your own safety net. There&apos;s no
          draw to fall back on — the team you name either wins the match or the bet is gone. That&apos;s
          why this page is short by design: we&apos;d rather publish five fixtures we&apos;re genuinely
          confident about than twenty where half are guesses dressed up as tips.
        </p>

        <h2>What Counts as a Direct Win</h2>
        <p>
          A direct win market strips football down to two outcomes instead of three. You&apos;re not
          betting on a draw not happening as a side effect of backing a team, the way you would with a
          standard match-result bet — you&apos;re betting on the draw not happening as the entire
          premise. Get that wrong, even by one stoppage-time equaliser, and the bet is settled as a
          loss.
        </p>
        <p>
          That structure makes direct win a poor fit for evenly matched games and a strong fit for
          fixtures where one side is clearly, measurably better than the other on current form.
        </p>

        <h2>The Filter We Run Before a Match Makes This List</h2>
        <p>
          Every fixture starts with the same dataset we use across FreeWinningTips: form over the last
          five and ten games, home and away splits, scoring and conceding trends, head-to-head results,
          and confirmed team news. For a direct win tip specifically, we&apos;re not interested in a
          fixture where that data shows a mild edge — we need a wide, consistent gap across most of
          those inputs pointing the same direction.
        </p>
        <p>
          We cross-check that gap against real-time pricing from Sportpesa, Betika, Mozzart, and
          Bet9ja. A firming market price on our favoured side backs up the data. A drifting price is
          usually the market reacting to something we haven&apos;t confirmed yet, and when that happens,
          the fixture gets pulled rather than published on a hunch.
        </p>
        <p>
          Team news is the final gate. If a confirmed lineup isn&apos;t out and an absence could
          plausibly close the gap between the two sides, we leave the fixture off the page. It&apos;s a
          conservative approach, and it&apos;s meant to be — a direct win pick that&apos;s wrong
          doesn&apos;t get partial credit. Read more in{' '}
          <Link href="/how-we-predict">how we predict</Link>, or browse{' '}
          <Link href="/predictions/todays-predictions">today&apos;s predictions</Link>,{' '}
          <Link href="/predictions/betnumbers-prediction">bet numbers</Link>,{' '}
          <Link href="/predictions/gg-no-gg">BTTS tips</Link>, and{' '}
          <Link href="/predictions/correct-score">correct score</Link>.
        </p>

        <h2>Direct Win Compared to Other Match-Result Markets</h2>
        <ul className="seo-bullet-list">
          <li>
            <strong>1X2</strong> — three separate outcomes (home, draw, away); a draw doesn&apos;t
            affect a home-win or away-win bet&apos;s odds structure the way it eliminates a direct win
            bet.
          </li>
          <li>
            <strong>Double chance</strong> — combines two outcomes into one bet (e.g. home win or draw)
            for a smaller but safer return.
          </li>
          <li>
            <strong>Direct win</strong> — one team, no draw cover, shorter odds on the favourite than
            the equivalent straight 1X2 selection.
          </li>
        </ul>

        <h2>How Sure Is &apos;Sure&apos;?</h2>
        <p>
          Not 100%, and we&apos;re not going to tell you otherwise. Direct win predictions are built on
          real statistical gaps between two teams, but football doesn&apos;t run on statistics alone —
          referees, red cards, and one deflected shot can undo a form gap that looked decisive on paper.
          A site that promises certainty on this market specifically is either exaggerating or
          hasn&apos;t thought through what &quot;direct win&quot; actually means.
        </p>
        <p>
          What we can offer is a shortlist built from a genuinely strict filter, with the supporting
          data shown next to every pick, and a track record we&apos;re willing to publish in full —
          wins and losses both.
        </p>

        <h2>Direct Win Accuracy — Last 30 Days</h2>
        <p>
          We track every prediction we publish. The table below shows verified results from the last 30
          days{accuracySummary !== '—' ? ` (${accuracySummary} overall)` : ''}.
        </p>
        <AccuracyTable accuracyStats={accuracyStats} />
        <p>
          See the full archive on our <Link href="/results">results page</Link>.
        </p>

        <h2>Always Free</h2>
        <p>
          Every direct win prediction here is published free, with no VIP list and no paywalled
          &quot;real&quot; version hiding behind a Telegram invite. If a site sells you direct win tips
          at a premium while giving away weaker picks for free, ask yourself why the good ones need a
          price tag.
        </p>

        <h2>Behind the Picks</h2>
        <p>
          <strong>Stephen Karuku</strong> — Lead Predictions Analyst, FreeWinningTips
        </p>
        <p>
          Stephen manually checks every direct win selection against team news and market movement
          before it&apos;s published, holding this market to a tighter confidence bar than standard 1X2
          tips because of how unforgiving it is when wrong. His background spans football statistics and
          betting-market analysis across Europe&apos;s major leagues and East Africa&apos;s domestic
          football.
        </p>
        <AnalystByline />

        <h2>Bet Responsibly</h2>
        <p>
          Direct win predictions are for informational and entertainment purposes only. Football
          outcomes are never guaranteed, and a draw remains possible in any match regardless of the
          statistical gap between two teams. Stake only what you can afford to lose. If gambling is
          affecting your life or someone close to you, contact your national gambling support helpline.
          18+ only.
        </p>

        <h2>Direct Win — Frequently Asked Questions</h2>
        <div className="homepage-faq">
          {DIRECT_WIN_FAQ_ITEMS.map((item) => (
            <div key={item.question} className="homepage-faq-item">
              <h3>{item.question}</h3>
              <p>
                {item.question ===
                'Why are there fewer direct win tips than other markets on this site?' ? (
                  <>
                    Because most matches aren&apos;t lopsided enough to justify it. We only publish a
                    direct win pick when the data shows a clear, consistent gap between two teams —
                    everything else stays on our{' '}
                    <Link href="/predictions/todays-predictions">1X2</Link> or{' '}
                    <Link href="/predictions/draw">double chance</Link> pages instead.
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
