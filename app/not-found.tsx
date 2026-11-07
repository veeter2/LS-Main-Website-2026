import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main>
      <section className="lx-hero nf-hero">
        <div className="lx-wrap nf-wrap">
          <p className="lx-eyebrow" data-rise="0">
            404
          </p>
          <h1 className="lx-display lx-h1" data-rise="1">
            We can&rsquo;t find that page.
          </h1>
          <p className="lx-lead" data-rise="2">
            It may have moved, or the address may have a typo. Here are two places to start.
          </p>
          <div className="lx-cta-row" data-rise="3">
            <Link className="lx-btn lx-btn-primary" href="/product">
              See the product <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/book">
              Book a session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
