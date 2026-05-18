import React from 'react';
import Head from 'next/head';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import {
  parseCountrySegment,
  parseLeagueSlug,
  buildLeaguePath,
} from '@/components/functions/leagueUrl';
import { fetchLeaguePageData } from '@/components/functions/fetchLeaguePageData';
import LeaguePageHeader from '@/components/leagues/LeaguePageHeader';
import LeaguePageContent from '@/components/leagues/LeaguePageContent';
import LeaguePredictionsContent from '@/components/seo-content/league-predictions-content';

function buildLeagueJsonLd({ leagueName, countryName, fetchDate, canonicalPath }) {
  const pageUrl = `https://freewinningtips.com${canonicalPath}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${leagueName} Predictions Today | 1X2 Tips`,
      description: `Free ${leagueName} football predictions and 1X2 tips for ${countryName}. Fixtures, results, and standings on FreeWinningTips.`,
      url: pageUrl,
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FreeWinningTips',
        url: 'https://freewinningtips.com',
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
            text: `Visit this league page for today's fixtures, upcoming matches, results, and standings.`,
          },
        },
        {
          '@type': 'Question',
          name: `Does FreeWinningTips guarantee winning ${leagueName} bets?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Predictions are for information only. Always gamble responsibly.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://freewinningtips.com/' },
        { '@type': 'ListItem', position: 2, name: countryName, item: pageUrl },
        { '@type': 'ListItem', position: 3, name: leagueName, item: pageUrl },
      ],
    },
  ];
}

export default function LeaguePredictionsPage(props) {
  const {
    todaysFixtures,
    upcomingFixtures,
    leagueResults,
    standings,
    displayLeagueName,
    displayCountryName,
    leagueMeta,
    leagueId,
    fetchDate,
    canonicalPath,
  } = props;

  const meta = leagueMeta?.[0] || {};
  const leagueName = meta.league_name || displayLeagueName;
  const countryName = meta.country_name || displayCountryName;

  const hasToday = todaysFixtures?.length > 0;
  const hasUpcoming = upcomingFixtures?.length > 0;
  const hasResults = leagueResults?.length > 0;

  const jsonLd = buildLeagueJsonLd({
    leagueName,
    countryName,
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

        <div className="container-main">
          <LeaguePageContent
            leagueName={leagueName}
            countryName={countryName}
            canonicalPath={canonicalPath}
            todaysFixtures={todaysFixtures}
            upcomingFixtures={upcomingFixtures}
            leagueResults={leagueResults}
            standings={standings}
          />
        </div>

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
    return { redirect: { destination: '/', permanent: false } };
  }

  const { countryNameForApi, displayCountryName } = countryParsed;
  const { leagueId, leagueNameForApi, displayLeagueName } = leagueParsed;
  const fetchDate = getFormattedCurrentDate();
  const canonicalPath = buildLeaguePath(displayCountryName, displayLeagueName, leagueId);

  try {
    const data = await fetchLeaguePageData({
      leagueId,
      leagueNameForApi,
      countryNameForApi,
      fetchDate,
    });

    return {
      props: {
        ...data,
        displayLeagueName,
        displayCountryName,
        leagueId,
        fetchDate,
        canonicalPath,
      },
    };
  } catch (err) {
    console.error('[league-page] getServerSideProps:', err.message);

    return {
      props: {
        leagueMeta: [],
        todaysFixtures: [],
        upcomingFixtures: [],
        leagueResults: [],
        standings: [],
        displayLeagueName,
        displayCountryName,
        leagueId,
        fetchDate,
        canonicalPath,
      },
    };
  }
}
