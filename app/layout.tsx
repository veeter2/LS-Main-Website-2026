import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"
import "../styles/ls-tokens.css"
import { Navigation } from "@/components/navigation"
import { SiteAmbient } from "@/components/site-ambient"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const lora = Lora({ 
  subsets: ["latin"], 
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "LongStrider — The AI layer that knows your business.",
  description:
    "LongStrider is a sovereign intelligence layer that sits above your existing stack, accumulates institutional knowledge, and compounds it over time. Fully owned by you.",
  keywords:
    "sovereign intelligence, institutional knowledge, enterprise AI, knowledge compounding, data sovereignty, AI layer, longstrider",
  authors: [{ name: "LongStrider" }],
  creator: "LongStrider",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://longstrider.ai",
    title: "LongStrider — The AI layer that knows your business.",
    description: "Sovereign intelligence that compounds. Yours to own.",
    siteName: "LongStrider",
  },
  twitter: {
    card: "summary_large_image",
    title: "LongStrider — The AI layer that knows your business.",
    description: "Sovereign intelligence that compounds. Yours to own.",
    creator: "@longstriderai",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${lora.variable} ${inter.variable}`} style={{ background: "#080809" }}>
      <body style={{
        fontFamily: "var(--font-lora), Georgia, serif",
        color: "rgba(255,255,255,0.88)",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "geometricPrecision",
      }}>
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
