import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lora } from "next/font/google"
import "./site.css"
import { ConceptShell } from "./_components/shell"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const BASE_URL = "https://www.longstrider.ai"
const OG_IMAGE = `${BASE_URL}/og-default.png`
const TITLE = "LongStrider · The AI memory your company owns"
const DESCRIPTION =
  "Every fact, promise and decision your team puts into AI, kept with its source and owned by your company. Works with any model. Book a working session."

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s · LongStrider",
  },
  description: DESCRIPTION,
  keywords: [
    "institutional knowledge software",
    "institutional memory",
    "AI knowledge management",
    "private LLM",
    "self-hosted AI",
    "on-premises AI",
    "AI memory for business",
    "company memory",
    "LongStrider",
  ],
  authors: [{ name: "LongStrider", url: BASE_URL }],
  creator: "LongStrider",
  publisher: "LongStrider",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "LongStrider",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "LongStrider. The AI memory your company owns.", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@longstriderai",
    creator: "@longstriderai",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: { canonical: BASE_URL },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f6f3ec",
}

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "LongStrider",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/longstrider-logo-512.png`, width: 512, height: 512 },
      description: "LongStrider keeps every fact, promise and decision a company puts into AI, with its source, owned by the company and independent of the model.",
      foundingDate: "2024",
      address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
      sameAs: ["https://twitter.com/longstriderai"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#software`,
      name: "LongStrider",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud, private cloud, on-premises",
      description: "Company memory for AI: dated, sourced facts, promises and decisions kept in Postgres, scoped to each person, answered by the model you choose.",
      featureList: [
        "Facts, promises and decisions kept with their source",
        "Counts and dates from the record, not estimates",
        "Any model through your own keys, or a model you already run",
        "Row-level scoping in Postgres",
        "Receipts on every reply",
        "Overnight pass that links repeats and flags conflicts",
        "Licensed and installed, not rented per seat",
      ],
      offers: { "@type": "Offer", description: "Licensed software with a build fee and yearly support. Scoped in a working session." },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "LongStrider",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lora.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      </head>
      <body>
        <ConceptShell>{children}</ConceptShell>
      </body>
    </html>
  )
}
