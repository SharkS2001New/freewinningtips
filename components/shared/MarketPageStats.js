export default function MarketPageStats({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="market-page-stats" role="group" aria-label="Page highlights">
      {items.map((item) => (
        <div key={item.label} className="market-page-stats-item">
          <span className="market-page-stats-value">{item.value}</span>
          <span className="market-page-stats-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
