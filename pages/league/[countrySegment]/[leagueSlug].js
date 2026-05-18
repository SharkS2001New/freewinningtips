import fs from 'fs';
import path from 'path';
import React from 'react';
import Head from 'next/head';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import {
  parseCountrySegment,
  parseLeagueSlug,
  buildLeaguePath,
} from '@/components/functions/leagueUrl';
import FixturesRow from '@/components/shared/FixturesRow';
import LeaguePageHeader from '@/components/leagues/LeaguePageHeader';
import LeaguePredictionsContent from '@/components/seo-content/league-predictions-content';
import DataNotFoundPage from '@/components/includes/datanotfound';

const API_AUTH = 'R9TxV3PbOEu7qZnJKgydC5LmX2';
const CACHE_DIR = path.join(process.cwd(), 'public', 'cache', 'league-data');
const CACHE_TTL_MS = 5 * 60 * 1000;

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: API_AUTH,
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function buildLeagueJsonLd({ leagueName, countryName, leagueId, fetchDate, canonicalPath }) {
  const pageUrl = `https://freewinningtips.com${canonicalPath}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${leagueName} Predictions Today | 1X2 Tips`,
      description: `Free ${leagueName} football predictions and 1X2 tips for ${countryName}. Fixtures, upcoming matches, and results on FreeWinningTips.`,
      url: pageUrl,
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FreeWinningTips',
        url: 'https://freewinningtips.com',
      },
      about: {
        '@type': 'SportsOrganization',
        name: leagueName,
        location: { '@type': 'Country', name: countryName },
      },
      dateModified: fetchDate,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Where can I find free ${leagueName} tips today?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Visit the fixtures section on this page when ${leagueName} matches are scheduled, or browse all of today's predictions at freewinningtips.com/predictions/todays-predictions.`,
          },
        },
        {
          '@type': 'Question',
          name: `Are ${leagueName} predictions on FreeWinningTips free?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Standard 1X2 predictions and fixture lists are free. Optional VIP packages offer additional analysis.',
          },
        },
        {
          '@type': 'Question',
          name: `Does FreeWinningTips guarantee winning ${leagueName} bets?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Predictions are for information only. Football outcomes cannot be guaranteed. Always gamble responsibly.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://freewinningtips.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: countryName,
          item: pageUrl,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: leagueName,
          item: pageUrl,
        },
      ],
    },
  ];
}

export default function LeaguePredictionsPage({
  todaysFixtures,
  upcomingFixtures,
  leagueResults,
  displayLeagueName,
  displayCountryName,
  leagueMeta,
  leagueId,
  fetchDate,
  endpointStatus,
  error,
  canonicalPath,
}) {
  const meta = leagueMeta?.[0] || {};
  const leagueName = meta.league_name || displayLeagueName;
  const countryName = meta.country_name || displayCountryName;

  const hasToday = todaysFixtures?.length > 0;
  const hasUpcoming = upcomingFixtures?.length > 0;
  const hasResults = leagueResults?.length > 0;
  const showNothing = !hasToday && !hasUpcoming && !hasResults;

  const jsonLd = buildLeagueJsonLd({
    leagueName,
    countryName,
    leagueId,
    fetchDate,
    canonicalPath,
  });

  return (
    <>
      <Head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="page-root">
        <div className="container-main">
          <LeaguePageHeader
            leagueName={leagueName}
            countryName={countryName}
            countryLogo={meta.downloaded_country_flag || ''}
            leagueLogo={meta.downloaded_league_logo || ''}
            leagueShortName={meta.league_short_name || ''}
          />
        </div>

        {hasToday && (
          <div className="container-main league-section">
            <h2 className="league-section-title">Today&apos;s {leagueName} matches</h2>
            <FixturesRow
              fixtures={todaysFixtures}
              predictionType="1x2"
              emptyMessage={`No ${leagueName} matches scheduled for today.`}
            />
          </div>
        )}

        {hasUpcoming && (
          <div className="container-main league-section">
            <h2 className="league-section-title">Upcoming {leagueName} fixtures</h2>
            <FixturesRow
              fixtures={upcomingFixtures}
              predictionType="1x2"
              emptyMessage={`No upcoming ${leagueName} fixtures available right now.`}
            />
          </div>
        )}

        {!hasUpcoming && hasResults && (
          <div className="container-main league-section">
            <h2 className="league-section-title">Recent {leagueName} results</h2>
            <p className="league-section-intro">
              No upcoming {leagueName} fixtures are listed right now. Browse recent finished
              matches and scores below.
            </p>
            <FixturesRow
              fixtures={leagueResults}
              predictionType="1x2"
              emptyMessage={`No recent ${leagueName} results available.`}
            />
          </div>
        )}

        {showNothing && (
          <div className="container-main league-section">
            {endpointStatus === 'error' && error ? (
              <DataNotFoundPage
                props={error || `We could not load ${leagueName} data. Please try again later.`}
              />
            ) : (
              <p className="league-empty-note">
                There are no {leagueName} matches, upcoming fixtures, or recent results to
                display at the moment. Please check back during the active season or explore{' '}
                <a href="/predictions/todays-predictions">today&apos;s predictions</a>.
              </p>
            )}
          </div>
        )}

        <LeaguePredictionsContent
          displayLeagueName={leagueName}
          displayCountryName={countryName}
          fetchDate={fetchDate}
          hasToday={hasToday}
          hasUpcoming={hasUpcoming}
          hasResults={hasResults}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const countrySegment = context.params?.countrySegment || '';
  const leagueSlug = context.params?.leagueSlug || '';

  const countryParsed = parseCountrySegment(countrySegment);
  const leagueParsed = parseLeagueSlug(leagueSlug);

  if (!countryParsed || !leagueParsed) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { countryNameForApi, displayCountryName } = countryParsed;
  const { leagueId, leagueNameForApi, displayLeagueName } = leagueParsed;

  const fetchDate = getFormattedCurrentDate();
  const cachePath = path.join(CACHE_DIR, `${leagueId}_${fetchDate}.json`);
  const canonicalPath = buildLeaguePath(displayCountryName, displayLeagueName, leagueId);

  const emptyProps = {
    todaysFixtures: [],
    upcomingFixtures: [],
    leagueResults: [],
    displayLeagueName,
    displayCountryName,
    leagueMeta: [],
    leagueId,
    fetchDate,
    canonicalPath,
    endpointStatus: 'success',
    error: null,
  };

  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    if (fs.existsSync(cachePath)) {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      const age = Date.now() - new Date(cache.generatedAt).getTime();
      if (age <= CACHE_TTL_MS) {
        return { props: { ...emptyProps, ...cache.data } };
      }
      fs.unlinkSync(cachePath);
    }

    let leagueMeta = [];
    let todaysFixtures = [];
    let upcomingFixtures = [];
    let leagueResults = [];
    let endpointStatus = 'success';
    let error = null;

    try {
      const topData = await fetchJson(
        `https://api.pitchpredictions.com/api/fetch_leagues_top_data?league_id=${leagueId}`
      );
      if (topData.status === true) {
        leagueMeta = topData.data || [];
      }
    } catch (err) {
      console.error('[league-page] top data:', err.message);
    }

    try {
      const todaysData = await fetchJson(
        `https://api.pitchpredictions.com/api/fetch_todays_fixtures_by_league_id?league_id=${leagueId}&fixture_date=${fetchDate}`
      );
      if (todaysData.status === true) {
        todaysFixtures = todaysData.data || [];
      }
    } catch (err) {
      console.error('[league-page] today fixtures:', err.message);
    }

    try {
      const fixturesData = await fetchJson(
        `https://api.pitchpredictions.com/api/fetch_league_fixtures?league_name=${encodeURIComponent(leagueNameForApi)}&country_name=${encodeURIComponent(countryNameForApi)}`
      );

      if (fixturesData.status === true) {
        upcomingFixtures = fixturesData.data || [];
      } else {
        endpointStatus = 'error';
        error = fixturesData.message || 'Failed to load upcoming fixtures';
      }
    } catch (err) {
      console.error('[league-page] upcoming fixtures:', err.message);
      endpointStatus = 'error';
      error = err.message;
    }

    if (!upcomingFixtures.length) {
      try {
        const resultsData = await fetchJson(
          `https://api.pitchpredictions.com/api/fetch_league_results?league_name=${encodeURIComponent(leagueNameForApi)}&country_name=${encodeURIComponent(countryNameForApi)}`
        );
        if (resultsData.status === true) {
          leagueResults = resultsData.data || [];
          if (leagueResults.length) {
            endpointStatus = 'success';
            error = null;
          }
        }
      } catch (err) {
        console.error('[league-page] league results:', err.message);
      }
    }

    const payload = {
      todaysFixtures,
      upcomingFixtures,
      leagueResults,
      displayLeagueName,
      displayCountryName,
      leagueMeta,
      leagueId,
      fetchDate,
      canonicalPath,
      endpointStatus,
      error,
    };

    const tmp = `${cachePath}.tmp.${Date.now()}`;
    fs.writeFileSync(
      tmp,
      JSON.stringify({ generatedAt: new Date().toISOString(), data: payload }, null, 2)
    );
    fs.renameSync(tmp, cachePath);

    return { props: payload };
  } catch (err) {
    console.error('[league-page] getServerSideProps:', err.message);

    if (fs.existsSync(cachePath)) {
      try {
        const fallback = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        return {
          props: {
            ...emptyProps,
            ...fallback.data,
            endpointStatus: 'success',
            error: null,
          },
        };
      } catch {
        // ignore corrupt cache
      }
    }

    return {
      props: {
        ...emptyProps,
        endpointStatus: 'error',
        error: err.message,
      },
    };
  }
}
