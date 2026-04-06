import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Memory Architecture — Signal Ingestion & Four-Axis Recall',
  description:
    'Every signal is entity-resolved, embedded, gravity-scored, and written to the substrate. Four-Axis Recall cross-references entity relationships, temporal arcs, knowledge clusters, and semantic similarity simultaneously — returning narrative context, not a list of results.',
  keywords: [
    'AI memory architecture',
    'four-axis recall AI',
    'AI knowledge graph memory',
    'signal ingestion AI',
    'AI gravity weighting',
    'knowledge cluster AI',
    'LongStrider memory',
    'sovereign AI memory',
  ],
  openGraph: {
    title: 'The Memory Architecture — Signal Ingestion & Four-Axis Recall | LongStrider',
    description:
      'Entity-resolved. Gravity-scored. Cross-referenced across four axes simultaneously. The memory architecture that makes institutional intelligence retrievable.',
    url: 'https://longstrider.ai/technology/memory',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Memory Architecture | LongStrider',
    description: 'Entity-resolved. Gravity-scored. Four-axis recall. Institutional intelligence that is retrievable, not just stored.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/technology/memory' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
