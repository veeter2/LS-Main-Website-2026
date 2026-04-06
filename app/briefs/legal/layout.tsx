import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal — Institutional Practice Intelligence',
  description:
    'Senior partner knowledge — the precedents, client nuances, and strategic patterns built over decades — resets every time someone leaves the firm. LongStrider makes legal practice intelligence permanent and sovereign.',
  keywords: [
    'legal AI platform',
    'law firm knowledge management',
    'institutional practice intelligence',
    'senior partner knowledge retention',
    'legal AI memory',
    'sovereign AI law firm',
    'practice intelligence software',
  ],
  openGraph: {
    title: 'Legal Brief — Institutional Practice Intelligence | LongStrider',
    description:
      'Practice intelligence should not retire when partners do. LongStrider makes senior partner knowledge permanent, sovereign, and retrievable by every member of the firm.',
    url: 'https://longstrider.ai/briefs/legal',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal — Institutional Practice Intelligence | LongStrider',
    description: 'Practice intelligence should not retire when partners do. LongStrider makes it permanent.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/briefs/legal' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
