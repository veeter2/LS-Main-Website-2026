import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Program — Build Recurring Revenue on Sovereign AI',
  description:
    'LongStrider partner firms deploy sovereign intelligence into client environments, wrap services around it, and own it as a recurring revenue asset. Transform from project billing to platform-embedded recurring revenue at 5–10× valuation multiples.',
  keywords: [
    'AI platform for consulting firms',
    'enterprise AI partner program',
    'AI recurring revenue professional services',
    'consulting firm AI platform',
    'AI reseller program',
    'sovereign AI partnership',
    'AI platform valuation multiple',
    'professional services AI transformation',
    'AI for advisory firms',
    'institutional intelligence partner',
  ],
  openGraph: {
    title: 'Partner Program — Build Recurring Revenue on AI | LongStrider',
    description:
      'Deploy sovereign intelligence into your client environments. Own it as recurring revenue. Transform from 1–2× project billing to 5–10× platform-embedded valuation.',
    url: 'https://longstrider.ai/partners',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner Program — AI Recurring Revenue | LongStrider',
    description: 'Transform from project billing to platform-embedded recurring revenue. 5–10× valuation multiple vs 1–2×. Deploy sovereign AI for your clients.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/partners' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
