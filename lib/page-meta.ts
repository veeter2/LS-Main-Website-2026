import type { Metadata } from "next"

const BASE_URL = "https://www.longstrider.ai"
const OG_IMAGE = `${BASE_URL}/og-default.png`

/**
 * Per-page metadata. A page that sets openGraph or twitter replaces the layout's
 * whole object, so the image, site name and card type are restated here, and the
 * canonical URL points at the page itself rather than the home page.
 * `title` is the page title without the " · LongStrider" suffix the layout adds.
 */
export function pageMeta(path: string, title: string, description: string): Metadata {
  const url = `${BASE_URL}${path}`
  const full = `${title} · LongStrider`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "LongStrider",
      url,
      title: full,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "LongStrider. The AI memory your company owns.", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@longstriderai",
      creator: "@longstriderai",
      title: full,
      description,
      images: [OG_IMAGE],
    },
  }
}
