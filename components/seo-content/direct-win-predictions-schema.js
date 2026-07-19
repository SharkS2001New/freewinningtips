import { SITE_ORIGIN } from '@/components/functions/apiConfig';

const PAGE_URL = `${SITE_ORIGIN}/predictions/direct-win-predictions`;
const AUTHOR_ID = `${SITE_ORIGIN}/#/schema/person/stephen-karuku`;

const FAQ_SCHEMA_ITEMS = [
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
    "Lead Predictions Analyst at FreeWinningTips. Manually checks every direct win selection against team news and market movement across Europe's major leagues and East African football.",
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Direct Win Predictions Today – No Draw, Just the Winner',
  description:
    "Direct win predictions for today's matches, published only when one team clearly outclasses the other. Free, analyst-checked, updated daily across Europe's top leagues and African football.",
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
  name: 'Direct Win Predictions Today – No Draw, Just the Winner | FreeWinningTips',
  url: PAGE_URL,
  description:
    "Direct win predictions for today's matches, published only when one team clearly outclasses the other. Free, analyst-checked, updated daily across Europe's top leagues and African football.",
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
        name: 'Direct Win Predictions',
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

export default function DirectWinPredictionsSchema() {
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
