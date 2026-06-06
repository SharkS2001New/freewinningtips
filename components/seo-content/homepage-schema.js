import { SITE_ORIGIN } from '@/components/functions/apiConfig';

const FAQ_SCHEMA_ITEMS = [
  {
    question: 'Are FreeWinningTips predictions free?',
    answer:
      'Yes. We publish free daily football predictions covering 1X2, BTTS, Over/Under, Accumulator, and Double Chance markets. A VIP tier with additional tips is also available.',
  },
  {
    question: 'How accurate are FreeWinningTips predictions?',
    answer:
      'Our analysts achieve a verified average success rate of over 70% across all markets, tracked monthly. Full results history is published on our Results page.',
  },
  {
    question: 'Which football leagues do you cover?',
    answer:
      'We cover 50+ leagues including the English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, MLS, and local African leagues including Kenyan Premier League.',
  },
  {
    question: 'How do I get VIP tips?',
    answer:
      'Subscribe to our Must Win Teams Today VIP package. Tips are delivered directly to your phone via Telegram or WhatsApp after subscribing.',
  },
  {
    question: 'How are your predictions made?',
    answer:
      'Our team of football analysts uses a statistical model that processes team form, head-to-head records, player availability, venue advantage, and market odds to calculate probability scores for each match.',
  },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FreeWinningTips',
  url: SITE_ORIGIN,
  description: 'Free daily football predictions and betting tips covering 50+ leagues.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_ORIGIN}/predictions/todays-predictions?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FreeWinningTips',
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/freewinningtipslogo.png`,
  sameAs: [
    'https://www.facebook.com/freewinningtips1x2',
    'https://x.com/FWT1x2',
    'https://instagram.com/freewinningtips1x2',
    'https://t.me/s/freewinningtips1x2',
  ],
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

export default function HomepageSchema() {
  const schemas = [websiteSchema, organizationSchema, faqSchema];

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
