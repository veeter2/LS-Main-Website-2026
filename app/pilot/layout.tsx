import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start a Pilot — Deploy Sovereign Intelligence',
  description:
    'Begin a LongStrider pilot. A pilot is not a test — it is the first 90 days of an intelligence layer that compounds permanently on your infrastructure. Deploy in your environment. Own everything from day one.',
  keywords: [
    'LongStrider pilot program',
    'enterprise AI pilot',
    'sovereign AI deployment',
    'AI pilot program enterprise',
    'institutional intelligence pilot',
    'enterprise AI trial',
    'deploy AI on-premises',
  ],
  openGraph: {
    title: 'Start a Pilot — LongStrider',
    description:
      'A pilot is the beginning of an intelligence layer that compounds from day one. Deploy in your environment. Own everything. Starts in 90 days.',
    url: 'https://longstrider.ai/pilot',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start a Pilot — LongStrider',
    description: 'The beginning of an intelligence layer that compounds permanently. Deploy in your environment. Own everything from day one.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/pilot' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
