import Link from 'next/link';
import AnalystByline from '@/components/shared/AnalystByline';

const BETNUMBERS_FAQ_ITEMS = [
  {
    question: "Where can I find today's bet numbers predictions?",
    answer:
      "This page is updated daily with fresh bet numbers covering the biggest fixtures in Europe and Africa's leading domestic leagues. Every selection includes written analysis and a confidence rating, and the full list is free to view.",
  },
  {
    question: "How accurate are FreeWinningTips' bet numbers?",
    answer:
      'Every bet numbers selection is generated from statistical modelling — recent form, head-to-head data, and market movement — then reviewed manually before publication. We publish results openly, including losses, so you can judge accuracy for yourself rather than take a marketing claim at face value.',
  },
  {
    question: 'Are bet numbers predictions completely free?',
    answer:
      'Yes. Every prediction on this page is free, with no subscription, no paywall, and no registration required.',
  },
  {
    question: 'Which bookmakers and leagues do you cover?',
    answer:
      'Our bet numbers cross-reference market movement from Sportpesa, Betika, Mozzart, and Bet9ja, and cover leagues including the Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and top domestic competitions across Kenya, Nigeria, and Uganda.',
  },
  {
    question: 'Can bet numbers be 100% sure?',
    answer:
      'No. Football is unpredictable and no prediction can be guaranteed. FreeWinningTips provides data-driven analysis to give you a genuine statistical edge, but every selection carries risk. Always bet responsibly.',
  },
];

const BetnumbersPageContent = () => {
  return (
    <section className="seo-section">
      <div className="seo-inner">
        <p>
          Free, expert-reviewed bet numbers for today&apos;s fixtures — built from real statistical
          analysis, checked by a human analyst before publication, and tracked openly so you can see
          exactly how they perform.
        </p>

        <h2>What Are Bet Numbers?</h2>
        <p>
          Bet numbers are structured football predictions covering match outcomes, goal markets, and
          both-teams-to-score selections, presented match by match with the reasoning behind each
          pick. On FreeWinningTips, every bet number selection carries a written analysis and a
          confidence rating, so you understand why a pick was made rather than being handed a bare
          tip and told to trust it.
        </p>
        <p>
          This page is updated daily with fresh selections across the biggest leagues in Europe and
          the domestic leagues that matter most to bettors across Kenya, Nigeria, and Uganda. Every
          selection is free — there is no paywall, no VIP tier, and no registration required to see
          today&apos;s full list.
        </p>

        <h2>How We Generate Our Bet Numbers Predictions</h2>
        <p>
          Our process starts with the underlying match data: recent form across the last five and ten
          fixtures, home and away performance splits, goals scored and conceded averages,
          head-to-head history, and confirmed team news. We then check that data against live market
          movement across the major bookmakers used across East and West Africa, including Sportpesa,
          Betika, Mozzart, and Bet9ja, to identify where our model&apos;s view and the market&apos;s
          view diverge — that gap is usually where the real value sits.
        </p>
        <p>
          Once the model shortlists a selection, it is reviewed manually before publication. If a
          squad has not been confirmed and the missing information could reasonably change the
          outcome, we hold the pick rather than publish a guess. That discipline occasionally means
          fewer bet numbers on a given day, but it is what keeps our published track record honest.
        </p>
        <p>
          Every prediction on this page carries a confidence rating. A selection rated at 80% or
          above has cleared a considerably higher internal bar than one rated at 60% — use that
          distinction when deciding how much weight to give any individual tip. Read more in{' '}
          <Link href="/how-we-predict">how we predict</Link>, or browse{' '}
          <Link href="/predictions/todays-predictions">today&apos;s football predictions</Link>,{' '}
          <Link href="/predictions/gg-no-gg">BTTS tips</Link>,{' '}
          <Link href="/predictions/direct-win-predictions">direct win predictions</Link>, and{' '}
          <Link href="/predictions/correct-score">correct score tips</Link>.
        </p>

        <h2>Are Bet Numbers 100% Guaranteed?</h2>
        <p>
          No. No football prediction — bet numbers included — can ever be guaranteed. Football
          involves human decision-making, refereeing calls, injuries, and weather, and no statistical
          model accounts for all of it. If a site is promising you guaranteed wins or a
          &quot;cannot lose&quot; bet numbers list, treat that claim with real caution — it is not an
          honest description of how football betting works.
        </p>
        <p>
          What we offer instead is a data-backed, high-probability selection with the reasoning shown
          alongside it. A pick rated 85% confidence is not a guarantee, but across a large enough
          sample of similarly rated selections, the underlying probabilities work in your favour over
          time. That is the correct way to think about bet numbers, and it&apos;s the standard this
          page is built around.
        </p>

        <h2>Markets Covered in Today&apos;s Bet Numbers</h2>
        <ul className="seo-bullet-list">
          <li>
            <strong>Match result (1X2)</strong> — home win, away win, and draw selections
          </li>
          <li>
            <strong>Both Teams To Score (BTTS)</strong> — yes/no picks with a supporting probability
          </li>
          <li>
            <strong>Over/Under goals</strong> — covering the 1.5, 2.5, and 3.5 goal lines
          </li>
          <li>
            <strong>Double chance</strong> selections for lower-risk coverage
          </li>
          <li>
            <strong>Correct score</strong> predictions for higher-odds selections
          </li>
        </ul>
        <p>
          Coverage spans the English Premier League, UEFA Champions League, La Liga, Serie A,
          Bundesliga, and Ligue 1, alongside domestic leagues across Kenya, Nigeria, Uganda, and
          other African football markets that larger prediction sites often skip.
        </p>

        <h2>100% Free — No Registration, No Paywall</h2>
        <p>
          Every bet number prediction published on FreeWinningTips is free to read, every day. There
          is no subscription tier that unlocks &quot;better&quot; tips and no email or phone number
          required to view today&apos;s full list. We believe accurate football analysis should be
          available to everyone, not sold at a premium to the bettors who can least afford to lose
          money chasing paid tipsters.
        </p>
        <p>
          Where we do track performance, we publish it openly — including the picks that didn&apos;t
          land. A prediction site that only shows you its wins is not giving you an honest picture of
          its track record, and that transparency is central to how this page is run. See our{' '}
          <Link href="/results">results archive</Link> for the published track record.
        </p>

        <h2>Meet the Analyst</h2>
        <p>
          <strong>Stephen Karuku</strong> — Lead Predictions Analyst, FreeWinningTips
        </p>
        <p>
          Stephen has spent years analysing football statistics and betting markets across
          Europe&apos;s top five leagues and East Africa&apos;s domestic competitions. He reviews every
          bet numbers selection before it is published on FreeWinningTips, checking team news, market
          movement, and model output against each other to make sure the published confidence rating
          reflects the actual strength of the data — not marketing language designed to sound more
          certain than it is.
        </p>
        <AnalystByline />

        <h2>Bet Responsibly</h2>
        <p>
          Bet numbers predictions are provided for informational and entertainment purposes only. No
          outcome is guaranteed, and past performance does not guarantee future results. Only bet
          what you can afford to lose. If gambling is affecting you or someone you know, contact your
          national responsible gambling helpline for confidential support. 18+ only.
        </p>

        <h2>Frequently Asked Questions</h2>
        <div className="homepage-faq">
          {BETNUMBERS_FAQ_ITEMS.map((item) => (
            <div key={item.question} className="homepage-faq-item">
              <h3>{item.question}</h3>
              <p>
                {item.question === "How accurate are FreeWinningTips' bet numbers?" ? (
                  <>
                    Every bet numbers selection is generated from statistical modelling — recent
                    form, head-to-head data, and market movement — then reviewed manually before
                    publication. We publish results openly, including losses, so you can judge
                    accuracy for yourself rather than take a marketing claim at face value. Check
                    our <Link href="/results">Results page</Link>.
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

export default BetnumbersPageContent;
