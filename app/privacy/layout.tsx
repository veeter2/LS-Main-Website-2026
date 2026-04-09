import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — LongStrider',
  description:
    'LongStrider privacy policy. Your intelligence layer is yours — deployed in your environment, zero telemetry, fully sovereign.',
  openGraph: {
    title: 'Privacy Policy | LongStrider',
    description: 'LongStrider privacy policy. Your intelligence layer, your environment, zero telemetry.',
    url: 'https://longstrider.ai/privacy',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | LongStrider',
    description: 'LongStrider privacy policy. Zero telemetry. Fully sovereign.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/privacy' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
