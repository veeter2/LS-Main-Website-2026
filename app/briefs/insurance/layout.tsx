import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance — Claims Intelligence & Underwriting Memory',
  description:
    'Decades of adjuster judgment, edge-case precedent, and carrier-specific exception logic lives in people — and walks out the door when they leave. LongStrider makes claims intelligence permanent, sovereign, and retrievable.',
  keywords: [
    'insurance AI platform',
    'claims intelligence software',
    'underwriting memory AI',
    'institutional knowledge insurance',
    'claims adjuster knowledge management',
    'insurance institutional intelligence',
    'sovereign AI insurance',
  ],
  openGraph: {
    title: 'Insurance Brief — Claims Intelligence & Underwriting Memory | LongStrider',
    description:
      'Institutional knowledge is the real underwriting asset. LongStrider makes adjuster judgment, exception logic, and claims precedent permanent, sovereign, and retrievable.',
    url: 'https://longstrider.ai/briefs/insurance',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance — Claims Intelligence & Underwriting Memory | LongStrider',
    description: 'Decades of adjuster judgment and exception logic should not walk out the door. LongStrider makes it permanent.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/briefs/insurance' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
