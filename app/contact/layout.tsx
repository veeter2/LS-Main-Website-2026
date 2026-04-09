import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — LongStrider',
  description:
    'Get in touch with the LongStrider team. Questions about sovereign AI architecture, enterprise pilots, or partnership opportunities.',
  openGraph: {
    title: 'Contact | LongStrider',
    description: 'Get in touch with the LongStrider team.',
    url: 'https://longstrider.ai/contact',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | LongStrider',
    description: 'Get in touch with the LongStrider team.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/contact' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
