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
    question: 'How are direct win predictions selected?',
    answer:
      'Our statistical model scores fixtures on home or away win probability, current form, head-to-head, opposition defensive record, and live market movement. Only high-confidence home or away wins pass the filter — then a manual analyst review before publication.',
  },
  {
    question: 'Are these predictions free?',
    answer:
      'Yes, completely free. Every direct win prediction, written analysis, and probability score is free — no account, subscription, or payment.',
  },
  {
    question: 'What is the difference between Direct Win and Must Win Teams Today?',
    answer:
      'Must Win Teams Today is a fixed daily card of exactly 10 teams. Direct Win lists every fixture that clears our higher win-only confidence filter that day — so the count can be higher or lower than 10.',
  },
  {
    question: 'Can a direct win prediction ever be guaranteed?',
    answer:
      'No. A draw is always mathematically possible. Treat every direct win pick as a high-conviction, data-backed selection — not a certainty. Always bet responsibly.',
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
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Direct Win Predictions Today – No Draw, Just the Winner',
  description:
    "Direct win predictions for today's matches — home and away wins only. Free, analyst-checked, updated daily.",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  author: { '@id': AUTHOR_ID },
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
    "Direct win predictions for today's matches — home and away wins only. Free, analyst-checked, updated daily.",
  author: { '@id': AUTHOR_ID },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Predictions',
        item: `${SITE_ORIGIN}/predictions/todays-predictions`,
      },
      { '@type': 'ListItem', position: 3, name: 'Direct Win Predictions', item: PAGE_URL },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SCHEMA_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function DirectWinPredictionsSchema() {
  return (
    <>
      {[personSchema, articleSchema, webPageSchema, faqSchema].map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
