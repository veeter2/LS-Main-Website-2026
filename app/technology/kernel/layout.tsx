import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Intelligence Kernel — LLM Control & Five-Axis Scoring',
  description:
    'The Intelligence Kernel is the layer between your queries and your LLM. It routes intent, runs 19 parallel recall queries, scores results across five axes simultaneously, assembles the Contextual Intelligence Package, and enforces behavioral policy — before a single token is generated.',
  keywords: [
    'AI intelligence kernel',
    'LLM control layer',
    'five-axis AI scoring',
    'AI recall architecture',
    'CIP assembly AI',
    'AI runtime policy',
    'sovereign AI kernel',
    'LongStrider intelligence kernel',
  ],
  openGraph: {
    title: 'The Intelligence Kernel — LLM Control & Five-Axis Scoring | LongStrider',
    description:
      '19 parallel recall queries. Five-axis scoring. Contextual Intelligence Package assembly. Behavioral policy enforcement. All before a single token is generated.',
    url: 'https://longstrider.ai/technology/kernel',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Intelligence Kernel | LongStrider',
    description: '19 parallel recall queries. Five-axis scoring. CIP assembly. All before a single token is generated.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/technology/kernel' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
