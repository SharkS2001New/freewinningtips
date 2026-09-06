import { SITE_ORIGIN } from '@/components/functions/apiConfig';

const PAGE_URL = `${SITE_ORIGIN}/predictions/must-win-teams-today`;
const AUTHOR_ID = `${SITE_ORIGIN}/#/schema/person/stephen-karuku`;

const FAQ_SCHEMA_ITEMS = [
  {
    question: 'How are the must win teams today selected?',
    answer:
      "Our statistical model evaluates every fixture in the day's calendar and scores each one across five factors: home or away win probability, current form over the last 10 games, head-to-head win rate at the specific venue, the opposition's defensive record on the road, and live betting market movement. The top scoring fixtures then go to our analysts for a manual review. Only after that review do they appear on this page — typically published by 8am each morning.",
  },
  {
    question: 'Why is the page limited to exactly 10 teams?',
    answer:
      'Because quality is more valuable than quantity. Publishing 50 win picks a day sounds impressive but it forces the inclusion of low-confidence selections that dilute the usefulness of the page. Ten carefully chosen teams — each individually reviewed — gives you a focused, high-quality daily card. Every team on this list has a clear data case behind it.',
  },
  {
    question: 'Are these predictions free?',
    answer:
      'Yes, completely free. All 10 win predictions and the win probability scores are freely accessible to everyone with no account, subscription, or payment of any kind. FreeWinningTips will never charge for predictions.',
  },
  {
    question: "Can I build an accumulator using today's teams?",
    answer:
      "Yes and many of our readers do. Taking 4 or 5 of today's 10 selections and combining them in an accumulator can generate strong odds while maintaining a realistic chance of landing all legs. Our Accumulator Tips page features pre-built daily accas — some of which draw on fixtures from this page. Always bet responsibly and treat accumulators as entertainment rather than income.",
  },
  {
    question: 'When is this page updated?',
    answer:
      "The must win teams today page is updated every morning, typically by 8am. Late team news and injury updates that arrive closer to kick-off may occasionally prompt a note to be added to an individual card's analysis but the selections themselves are set from the morning publication. The page resets completely with a fresh set of 10 teams the following day.",
  },
];

export default function MustWinTeamsSchema({ dateModified }) {
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
    headline: 'Must Win Teams Today – 10 Teams to Win Today',
    description:
      "Exactly 10 must win teams today — home and away wins only. Free, analyst-reviewed football tips updated every morning.",
    url: PAGE_URL,
    mainEntityOfPage: PAGE_URL,
    dateModified: dateModified || undefined,
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
    name: 'Must Win Teams Today – 10 Teams to Win Today | FreeWinningTips',
    url: PAGE_URL,
    description:
      "Exactly 10 must win teams today — home and away wins only. Free, analyst-reviewed football tips updated every morning.",
    dateModified: dateModified || undefined,
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
        { '@type': 'ListItem', position: 3, name: 'Must Win Teams Today', item: PAGE_URL },
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
