import { SITE_ORIGIN } from '@/components/functions/apiConfig';

const PAGE_URL = `${SITE_ORIGIN}/predictions/direct-win-predictions`;

const FAQ_SCHEMA_ITEMS = [
  {
    question: 'What are direct win predictions?',
    answer:
      'Direct win predictions are high-confidence 1X2 picks where our analysts identify a clear match winner based on form, head-to-head data, team news, and statistical modelling. These are single-outcome bets — home win or away win — chosen only when the probability score exceeds 70%.',
  },
  {
    question: 'How accurate are FreeWinningTips direct win predictions?',
    answer:
      'Our direct win tips maintain an average accuracy rate above 70%, tracked and published monthly on our Results page. We only publish picks where our model returns a probability of 70% or higher.',
  },
  {
    question: 'Are direct win predictions free?',
    answer:
      'Yes. All direct win predictions on this page are free to access daily. A VIP subscription unlocks additional banker tips with deeper analysis delivered via Telegram and WhatsApp.',
  },
  {
    question: 'Which leagues do direct win predictions cover?',
    answer:
      'We publish direct win picks for 200+ leagues including the EPL, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, MLS, and African leagues including the Kenyan Premier League, South African PSL, and Egyptian Premier League.',
  },
  {
    question: 'What is the difference between a direct win and an accumulator?',
    answer:
      'A direct win is a single-match prediction — you bet on one outcome and win or lose on that game alone. An accumulator combines multiple picks into one bet, offering higher returns but requiring all selections to win.',
  },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Direct Win Predictions Today — High-Confidence Football Picks',
  url: PAGE_URL,
  description:
    'Free direct win football predictions updated daily. Expert 1X2 picks with probability scores across 200+ leagues.',
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
  const schemas = [webPageSchema, faqSchema];

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
