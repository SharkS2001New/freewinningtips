import { useRouter } from 'next/router';
import Link from 'next/link';

import FixturesRow from '@/components/shared/FixturesRow';
import LeagueStandingsTable from '@/components/leagues/LeagueStandingsTable';
import LeagueViewMoreLink from '@/components/leagues/LeagueViewMoreLink';

const TABS = [
  { id: 'summary', label: 'Summary' },
  { id: 'fixtures', label: 'Fixtures' },
  { id: 'results', label: 'Results' },
  { id: 'standings', label: 'Standings' },
];

const SUMMARY_UPCOMING = 5;
const SUMMARY_RESULTS = 5;

const fixtureRowProps = {
  predictionType: '1x2',
  hideLeagueHeader: true,
  skipTeamForms: true,
};

export default function LeaguePageContent({
  leagueName,
  countryName,
  canonicalPath,
  todaysFixtures,
  upcomingFixtures,
  leagueResults,
  standings,
}) {
  const router = useRouter();
  const activeTab = typeof router.query.tab === 'string' ? router.query.tab : 'summary';
  const tab = TABS.some(t => t.id === activeTab) ? activeTab : 'summary';

  const hasToday = todaysFixtures?.length > 0;
  const hasUpcoming = upcomingFixtures?.length > 0;
  const hasResults = leagueResults?.length > 0;
  const hasStandings = standings?.length > 0;

  const summaryUpcoming = upcomingFixtures.slice(0, SUMMARY_UPCOMING);
  const summaryResults = leagueResults.slice(0, SUMMARY_RESULTS);

  const tabHref = (tabId) =>
    tabId === 'summary' ? canonicalPath : `${canonicalPath}?tab=${tabId}`;

  return (
    <>
      <nav className="league-tabs-nav" aria-label="League sections">
        {TABS.map(({ id, label }) => (
          <Link
            key={id}
            href={tabHref(id)}
            scroll={false}
            shallow
            className={`league-tab-link ${tab === id ? 'active' : ''}`}
            aria-current={tab === id ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="league-tab-panel">
        {tab === 'summary' && (
          <>
            {hasToday && (
              <section className="league-section">
                <h2 className="league-section-title">Today&apos;s {leagueName} matches</h2>
                <FixturesRow fixtures={todaysFixtures} {...fixtureRowProps} />
              </section>
            )}

            {summaryUpcoming.length > 0 && (
              <section className="league-section">
                <h2 className="league-section-title">Upcoming {leagueName} fixtures</h2>
                <FixturesRow fixtures={summaryUpcoming} {...fixtureRowProps} />
                {upcomingFixtures.length > SUMMARY_UPCOMING && (
                  <LeagueViewMoreLink href={tabHref('fixtures')}>
                    View all upcoming fixtures
                  </LeagueViewMoreLink>
                )}
              </section>
            )}

            {summaryResults.length > 0 && (
              <section className="league-section">
                <h2 className="league-section-title">Latest {leagueName} results</h2>
                <FixturesRow fixtures={summaryResults} {...fixtureRowProps} />
                {leagueResults.length > SUMMARY_RESULTS && (
                  <LeagueViewMoreLink href={tabHref('results')}>
                    View all results
                  </LeagueViewMoreLink>
                )}
              </section>
            )}

            {hasStandings && (
              <section className="league-section">
                <h2 className="league-section-title">{leagueName} standings</h2>
                <LeagueStandingsTable
                  standings={standings}
                  leagueName={leagueName}
                  compact
                  maxRows={5}
                />
                {standings.length > 5 && (
                  <LeagueViewMoreLink href={tabHref('standings')}>
                    Full standings table
                  </LeagueViewMoreLink>
                )}
              </section>
            )}

            {!hasToday && !summaryUpcoming.length && !summaryResults.length && !hasStandings && (
              <p className="league-empty-note">
                No summary data available for {leagueName} right now. Try the Fixtures, Results,
                or Standings tabs, or browse{' '}
                <Link href="/predictions/todays-predictions">today&apos;s predictions</Link>.
              </p>
            )}
          </>
        )}

        {tab === 'fixtures' && (
          <>
            {hasToday && (
              <section className="league-section">
                <h2 className="league-section-title">Today&apos;s {leagueName} matches</h2>
                <FixturesRow fixtures={todaysFixtures} {...fixtureRowProps} />
              </section>
            )}

            {hasUpcoming ? (
              <section className="league-section">
                <h2 className="league-section-title">Upcoming {leagueName} fixtures</h2>
                <FixturesRow fixtures={upcomingFixtures} {...fixtureRowProps} />
              </section>
            ) : (
              !hasToday && (
                <p className="league-empty-note">
                  No fixtures scheduled for {leagueName} at the moment.
                </p>
              )
            )}
          </>
        )}

        {tab === 'results' && (
          <section className="league-section">
            <h2 className="league-section-title">{leagueName} results</h2>
            {hasResults ? (
              <FixturesRow fixtures={leagueResults} {...fixtureRowProps} />
            ) : (
              <p className="league-empty-note">No recent results available for {leagueName}.</p>
            )}
          </section>
        )}

        {tab === 'standings' && (
          <section className="league-section">
            <h2 className="league-section-title">{leagueName} standings — {countryName}</h2>
            <LeagueStandingsTable standings={standings} leagueName={leagueName} />
          </section>
        )}
      </div>
    </>
  );
}
