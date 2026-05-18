import Link from 'next/link';

const LeagueViewMoreLink = ({ href, children }) => {
  if (!href) return null;

  return (
    <div className="league-view-more-wrap">
      <Link href={href} scroll={false} shallow className="league-view-more-btn">
        <span className="league-view-more-label">{children}</span>
        <span className="league-view-more-arrow" aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default LeagueViewMoreLink;
