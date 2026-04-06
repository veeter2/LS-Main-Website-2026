import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Briefs — Sovereign Intelligence by Vertical',
  description:
    'How LongStrider solves institutional knowledge loss across industries: insurance, legal, automotive, financial services, healthcare, and energy. Industry-specific briefs with scenarios and deployment guidance.',
  keywords: [
    'enterprise AI by industry',
    'AI institutional intelligence briefs',
    'sovereign AI insurance',
    'sovereign AI legal',
    'enterprise AI professional services',
    'institutional knowledge AI',
    'AI industry solutions',
  ],
  openGraph: {
    title: 'Industry Briefs — Sovereign Intelligence by Vertical | LongStrider',
    description:
      'Institutional knowledge loss is not generic. LongStrider solves it for each industry specifically — insurance, legal, automotive, financial services, healthcare, and energy.',
    url: 'https://longstrider.ai/briefs',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industry Briefs | LongStrider',
    description: 'How LongStrider solves institutional knowledge loss across six industries. Specific, technical, deployable.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/briefs' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
