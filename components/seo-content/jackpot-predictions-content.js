import Link from 'next/link';
import MarketBrowseTips from '@/components/shared/MarketBrowseTips';
import AnalystByline from '@/components/shared/AnalystByline';

const FAQ_ITEMS = [
  {
    q: 'Are FreeWinningTips jackpot predictions free?',
    a: 'Yes. Core jackpot lineups and match tips for Sportpesa, Betika, Mozzart, Shabiki, Odibet, Sportybet, Betking, 1xBet and more are free to browse. VIP jackpot packages add deeper notes for subscribers.',
  },
  {
    q: 'Which jackpots do you cover?',
    a: 'We cover Sportpesa Mega & Midweek, Betika Midweek & Kitonga TZ, Mozzart Grand & Daily, Shabiki, Odibet Laki Tatu, Sportybet, Betking, 1xBet Toto 15, and related East African jackpots.',
  },
  {
    q: 'When are jackpot tips published?',
    a: 'Mega and weekend jackpots usually update early in the week. Midweek jackpots (e.g. Betika, Sportpesa Midweek) are refreshed by Tuesday evening where possible.',
  },
];

const JackpotPredictionsPageContent = () => {
  return (
    <section className="seo-section">
      <div className="seo-inner">
        <AnalystByline />
        <MarketBrowseTips title="Daily Tips Beyond Jackpots" />

        <h2>Free Jackpot Predictions — Sportpesa, Betika &amp; More</h2>
        <p>
          FreeWinningTips publishes free jackpot predictions for Kenya and East Africa&apos;s biggest
          multi-game jackpots. Each jackpot page lists full fixtures with tip, probability, odds, and
          written analysis so you can build a lineup with context — not guesswork.
        </p>
        <p>
          Start with{' '}
          <Link href="/jackpots/sportpesa-mega-jackpot-predictions">Sportpesa Mega Jackpot predictions</Link>,{' '}
          <Link href="/jackpots/betika-midweek-jackpot-predictions">Betika Midweek Jackpot predictions</Link>,
          or <Link href="/jackpots/mozzart-bet-grand-jackpot-predictions">Mozzart Super Grand Jackpot</Link>.
        </p>

        <h2>How We Predict Jackpot Fixtures</h2>
        <p>
          Jackpot slips require many correct outcomes. Our process scores each fixture individually
          using form, H2H, market movement, and analyst review, then presents the full card so you can
          swap selections where you disagree. Methodology:{' '}
          <Link href="/how-we-predict">how we predict</Link>. Track single-tip accuracy on{' '}
          <Link href="/results">results</Link>.
        </p>

        <h2>Sportpesa Mega Jackpot &amp; Midweek Focus</h2>
        <p>
          Sportpesa Mega Jackpot (typically 17 games) and Sportpesa Midweek remain high-search
          products in Kenya. FreeWinningTips publishes tip + probability for each match and updates
          score results when fixtures finish so you can audit performance.
        </p>

        <h2>Frequently Asked Questions — Jackpot Predictions</h2>
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

export default JackpotPredictionsPageContent;
