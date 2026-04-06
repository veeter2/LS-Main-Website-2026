import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automotive — Dealership & Service Intelligence',
  description:
    'Service advisor history, customer relationship patterns, and vehicle-specific institutional knowledge resets every time a technician or advisor leaves. LongStrider makes dealership intelligence permanent and sovereign.',
  keywords: [
    'automotive AI platform',
    'dealership knowledge management',
    'service advisor intelligence',
    'automotive institutional memory',
    'car dealership AI',
    'sovereign AI automotive',
    'dealership AI memory',
  ],
  openGraph: {
    title: 'Automotive Brief — Dealership & Service Intelligence | LongStrider',
    description:
      'Service relationships and institutional knowledge should not reset every time someone leaves the dealership. LongStrider makes it permanent and retrievable.',
    url: 'https://longstrider.ai/briefs/automotive',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automotive — Dealership & Service Intelligence | LongStrider',
    description: 'Service relationships and institutional knowledge should not reset when staff leave. LongStrider makes it permanent.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/briefs/automotive' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
