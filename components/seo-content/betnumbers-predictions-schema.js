import { SITE_ORIGIN } from '@/components/functions/apiConfig';

const PAGE_URL = `${SITE_ORIGIN}/predictions/betnumbers-prediction`;
const AUTHOR_ID = `${SITE_ORIGIN}/#/schema/person/stephen-karuku`;

const FAQ_SCHEMA_ITEMS = [
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

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: 'Stephen Karuku',
  jobTitle: 'Lead Predictions Analyst',
  worksFor: {
    '@type': 'Organization',
    name: 'FreeWinningTips',
    url: SITE_ORIGIN,
  },
  description:
    'Lead Predictions Analyst at FreeWinningTips. Reviews bet numbers selections using team news, market movement, and statistical model output across Europe and East African leagues.',
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Today's Bet Numbers Predictions – Free & Accurate",
  description:
    "Get today's free bet numbers predictions from FreeWinningTips — expert-reviewed football tips with a transparent track record. Covering EPL, La Liga, and African leagues, updated daily.",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  author: {
    '@id': AUTHOR_ID,
  },
  publisher: {
    '@type': 'Organization',
    name: 'FreeWinningTips',
    url: SITE_ORIGIN,
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "Today's Bet Numbers Predictions – Free & Accurate | FreeWinningTips",
  url: PAGE_URL,
  description:
    "Get today's free bet numbers predictions from FreeWinningTips — expert-reviewed football tips with a transparent track record. Covering EPL, La Liga, and African leagues, updated daily.",
  author: {
    '@id': AUTHOR_ID,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Predictions',
        item: `${SITE_ORIGIN}/predictions/todays-predictions`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Bet Numbers Predictions',
        item: PAGE_URL,
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SCHEMA_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function BetnumbersPredictionsSchema() {
  const schemas = [personSchema, articleSchema, webPageSchema, faqSchema];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
