import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Field Notes — Research & Analysis',
  description:
    'White papers, novel thoughts, and technical guides on sovereign AI architecture, institutional memory, and the future of enterprise intelligence. From the team building it.',
  keywords: [
    'AI architecture white papers',
    'enterprise AI research',
    'sovereign AI guides',
    'institutional memory research',
    'AI field notes',
    'LongStrider research',
  ],
  openGraph: {
    title: 'Field Notes — Research & Analysis | LongStrider',
    description:
      'White papers, novel thoughts, and technical guides on sovereign AI architecture and institutional memory. From the team building it.',
    url: 'https://longstrider.ai/field-notes',
    images: [{ url: 'https://longstrider.ai/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Field Notes | LongStrider',
    description: 'White papers, guides, and novel thoughts on sovereign AI architecture. From the team building it.',
    images: ['https://longstrider.ai/og-default.png'],
  },
  alternates: { canonical: 'https://longstrider.ai/field-notes' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
