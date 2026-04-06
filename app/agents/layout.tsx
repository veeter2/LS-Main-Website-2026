import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Intelligence — The Compounding Flywheel',
  description:
    'LongStrider agents write to the same knowledge graph as humans. Every agent run compounds with every human conversation — synthesized overnight by the Dream Compiler. Stop running agents. Start compounding intelligence.',
  keywords: [
    'AI agent memory',
    'enterprise AI agents',
    'AI agent knowledge graph',
    'sovereign AI agents',
    'compounding agent intelligence',
    'AI agent substrate',
    'agentic AI platform',
    'AI agents vs pipelines',
    'AI agent governance',
    'LangChain alternative',
    'CrewAI alternative',
    'AI agent institutional memory',
  ],
  openGraph: {
    title: 'Agent Intelligence — The Compounding Flywheel | LongStrider',
    description:
      'Every agent run writes to the same knowledge graph as your humans. Synthesized overnight. Compounding permanently. This is what every other agent framework is missing.',
    url: 'https://longstrider.ai/agents',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Intelligence — The Compounding Flywheel | LongStrider',
    description: 'Every agent run writes to the same knowledge graph as your humans. Compounding permanently. Stop running agents. Start compounding intelligence.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/agents' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
