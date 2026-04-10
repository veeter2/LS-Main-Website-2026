import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lora } from "next/font/google"
import "./globals.css"
import "../styles/ls-tokens.css"
import "../styles/responsive.css"
import { Navigation } from "@/components/navigation"
import { SiteAmbient } from "@/components/site-ambient"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const lora = Lora({
  subsets: ["latin"], 
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const BASE_URL = 'https://longstrider.ai';
const OG_IMAGE  = `${BASE_URL}/og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'LongStrider — Sovereign Intelligence Platform',
    template: '%s | LongStrider',
  },
  description:
    'LongStrider is the sovereign intelligence platform that accumulates institutional knowledge across every interaction, compounds it overnight, and permanently owns it on your infrastructure. LLM-agnostic. 100% on-premises.',
  keywords: [
    'sovereign AI platform',
    'institutional memory AI',
    'enterprise AI knowledge graph',
    'on-premises AI platform',
    'LLM-agnostic AI',
    'compounding intelligence',
    'AI agent substrate',
    'data sovereignty AI',
    'enterprise AI memory',
    'AI for professional services',
    'sovereign intelligence',
    'LongStrider',
  ],
  authors:  [{ name: 'LongStrider', url: BASE_URL }],
  creator:  'LongStrider',
  publisher:'LongStrider',
  category: 'Technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:          BASE_URL,
    siteName:    'LongStrider',
    title:       'LongStrider — Sovereign Intelligence Platform',
    description: 'The AI platform that accumulates institutional knowledge, compounds it overnight, and permanently owns it on your infrastructure.',
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    'LongStrider — Sovereign Intelligence. Permanently Yours.',
        type:   'image/png',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@longstriderai',
    creator:     '@longstriderai',
    title:       'LongStrider — Sovereign Intelligence Platform',
    description: 'The AI platform that accumulates institutional knowledge, compounds it overnight, and permanently owns it on your infrastructure.',
    images:      [OG_IMAGE],
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
}


const JSONLD_ORG = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://longstrider.ai/#organization',
      name: 'LongStrider',
      url: 'https://longstrider.ai',
      logo: { '@type': 'ImageObject', url: 'https://longstrider.ai/longstrider-logo.svg' },
      description: 'LongStrider is the sovereign intelligence platform that accumulates institutional knowledge across every interaction, compounds it overnight, and permanently owns it on your infrastructure.',
      foundingDate: '2024',
      sameAs: ['https://twitter.com/longstriderai'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://longstrider.ai/#software',
      name: 'LongStrider Intelligence Platform',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Linux, macOS, Windows, Cloud',
      description: 'A sovereign, LLM-agnostic intelligence substrate with Four-Axis Recall, nightly Dream Compiler synthesis, and a 13-agent autonomous fleet — on your own infrastructure.',
      featureList: [
        'Sovereign on-premises deployment',
        'LLM-agnostic (OpenAI, Anthropic, Ollama, Llama)',
        'Four-Axis Recall (Entity × Temporal × Well × Topic)',
        'Nightly Dream Compiler synthesis',
        '13-agent autonomous fleet',
        'MCP-native architecture',
        'Zero telemetry',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://longstrider.ai/#website',
      url: 'https://longstrider.ai',
      name: 'LongStrider',
      publisher: { '@id': 'https://longstrider.ai/#organization' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_ORG) }}
        />
      </head>
      <body>
        <SiteAmbient />
        <div style={{ position: "relative", zIndex: 1 }}>
        <Navigation />
        {children}
        <Footer /></div>
        <Toaster />
      </body>
    </html>
  )
}

