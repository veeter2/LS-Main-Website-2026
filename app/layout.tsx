import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LongStrider — The AI That Actually Knows You",
  description:
    "LongStrider is the first Living Memory system. It doesn't just remember — it understands how you think, what matters to you, and how your ideas connect over time. Request early access.",
  keywords: "living memory, AI memory, personal AI, digital consciousness, longstrider",
  authors: [{ name: "LongStrider" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.longstrider.ai",
    title: "LongStrider — The AI That Actually Knows You",
    description: "The first Living Memory system. It doesn't just remember — it understands how you think.",
    siteName: "LongStrider",
  },
  twitter: {
    card: "summary_large_image",
    title: "LongStrider — The AI That Actually Knows You",
    description: "Living Memory. The AI that actually knows you.",
    creator: "@longstriderai",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
