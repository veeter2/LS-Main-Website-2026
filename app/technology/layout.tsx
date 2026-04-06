import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology — Intelligence Architecture',
  description:
    'How LongStrider works: the Cognitive Formatting Engine, Four-Axis Recall, Dream Compiler, and sovereign Agent Fleet. A full architecture walkthrough of the intelligence substrate that compounds institutional knowledge.',
  keywords: [
    'AI knowledge graph architecture',
    'enterprise AI technical architecture',
    'cognitive formatting engine',
    'four-axis AI recall',
    'AI dream compiler',
    'LLM-agnostic architecture',
    'sovereign AI technical stack',
    'compounding AI intelligence architecture',
  ],
  openGraph: {
    title: 'Technology — Intelligence Architecture | LongStrider',
    description:
      'The full architecture: Cognitive Formatting Engine, Four-Axis Recall, overnight Dream Compiler, and 13-agent sovereign fleet. How institutional memory compounds.',
    url: 'https://longstrider.ai/technology',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technology — Intelligence Architecture | LongStrider',
    description: 'The full architecture: CFE, Four-Axis Recall, Dream Compiler, Agent Fleet. How institutional memory compounds.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/technology' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
