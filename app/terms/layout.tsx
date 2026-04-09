import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — LongStrider',
  description:
    'LongStrider terms of service. Sovereign intelligence deployed in your environment — your data stays yours, permanently.',
  openGraph: {
    title: 'Terms of Service | LongStrider',
    description: 'LongStrider terms of service. Your data, your environment, your intelligence layer.',
    url: 'https://longstrider.ai/terms',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | LongStrider',
    description: 'LongStrider terms of service.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/terms' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
