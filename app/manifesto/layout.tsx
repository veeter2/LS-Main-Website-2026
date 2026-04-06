import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Manifesto',
  description:
    'The case against borrowed intelligence. LongStrider argues that sovereign, compounding institutional memory is the only defensible AI architecture for enterprises that refuse to rent what they should own.',
  keywords: [
    'AI sovereignty manifesto',
    'enterprise AI philosophy',
    'sovereign intelligence argument',
    'institutional memory case',
    'AI data ownership',
    'why own AI not rent',
  ],
  openGraph: {
    title: 'The Manifesto — LongStrider',
    description:
      'The case against borrowed intelligence. Why enterprise AI must be owned, not rented. The argument for sovereign, compounding institutional memory.',
    url: 'https://longstrider.ai/manifesto',
    type: 'article',
    images: [
      {
        url: 'https://longstrider.ai/og-default.png',
        width: 1200,
        height: 630,
        alt: 'LongStrider Manifesto — The Case Against Borrowed Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Manifesto — LongStrider',
    description: 'The case against borrowed intelligence. Why enterprise AI must be owned, not rented.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: {
    canonical: 'https://longstrider.ai/manifesto',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
