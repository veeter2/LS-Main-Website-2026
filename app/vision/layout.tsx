import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision — Reflective Intelligence',
  description:
    'LongStrider is the first AI platform to exhibit Reflective Intelligence — Generation III beyond generative and agentic. A system that builds operational context, questions its own outputs, and speaks without being prompted.',
  keywords: [
    'reflective AI intelligence',
    'generation III AI',
    'AI beyond agents',
    'self-aware AI platform',
    'AI proactive intelligence',
    'AI operational context',
    'sovereign reflective AI',
    'AI that knows your business',
    'enterprise AI vision 2026',
  ],
  openGraph: {
    title: 'Reflective Intelligence — The Vision | LongStrider',
    description:
      'Generation I: Generative. Generation II: Agentic. Generation III: Reflective. LongStrider is the first system to organically develop operational self-awareness.',
    url: 'https://longstrider.ai/vision',
    type: 'article',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflective Intelligence — The Vision | LongStrider',
    description: 'Generation III AI: beyond generative, beyond agentic. The first system to develop operational self-awareness. The founding thesis.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/vision' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
