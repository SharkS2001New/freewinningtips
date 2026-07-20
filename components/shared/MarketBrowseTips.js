const MARKETS = [
  { label: 'Today\'s Predictions', href: '/predictions/todays-predictions' },
  { label: 'Free Picks', href: '/predictions/free-betting-tips-today' },
  { label: 'Over 1.5', href: '/predictions/1-5-goals' },
  { label: 'Over 2.5', href: '/predictions/2-5-goals' },
  { label: 'BTTS / GG', href: '/predictions/gg-no-gg' },
  { label: 'Double Chance', href: '/predictions/double-chance' },
  { label: 'Draw No Bet', href: '/predictions/draw' },
  { label: 'Accumulator', href: '/predictions/accumulator-tips' },
  { label: 'Correct Score', href: '/predictions/correct-score' },
  { label: 'BetNumbers', href: '/predictions/betnumbers-prediction' },
  { label: 'Must Win Today', href: '/predictions/must-win-teams-today' },
  { label: 'Jackpot', href: '/jackpot-predictions' },
  { label: 'Direct Win', href: '/predictions/direct-win-predictions' },
];

export default function MarketBrowseTips({ title = 'Browse Tips by Market' }) {
  return (
    <section className="market-browse" aria-label={title}>
      <h2 className="market-browse-title">{title}</h2>
      <p className="market-browse-sub">
        Jump to the FreeWinningTips market that matches your betting style — all free, updated daily.
      </p>
      <div className="market-browse-links">
        {MARKETS.map((market) => (
          <a key={market.href} href={market.href} className="market-browse-pill">
            {market.label}
          </a>
        ))}
      </div>
    </section>
  );
}
