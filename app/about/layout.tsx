import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — The Founding Story',
  description:
    'LongStrider was founded after watching institutional knowledge walk out the door at scale. The founding story, the team, and the thesis: sovereign AI intelligence is the most important architectural decision an organization will make.',
  keywords: [
    'LongStrider founding story',
    'sovereign AI company',
    'enterprise AI startup',
    'institutional memory company',
    'AI sovereignty company',
    'LongStrider about',
    'Matt Veitch LongStrider',
  ],
  openGraph: {
    title: 'About LongStrider — The Founding Story',
    description:
      'Founded after watching institutional knowledge walk out the door at scale. The thesis: sovereign, compounding intelligence is the most important architectural decision an organization will make.',
    url: 'https://longstrider.ai/about',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About LongStrider — The Founding Story',
    description: 'The founding story and thesis: sovereign, compounding intelligence is the most important architectural decision an organization will make.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/about' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
