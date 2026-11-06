import Link from "next/link"
import type { ReactNode } from "react"
import "./for.css"

export type Buyer = {
  eyebrow: string
  title: ReactNode
  lead: string
  points: { title: string; body: string }[]
  /** Optional: the single proof section (heading, body, one visual). */
  proof?: { heading: ReactNode; body: ReactNode; visual?: ReactNode; caption?: string }
  /** Optional extra sections, rendered between proof and the questions. */
  sections?: ReactNode
  questions: { q: string; a: string }[]
  next: { label: string; href: string }
  /** Button label for both CTAs. Defaults to "Book a working session". */
  cta?: string
}

/**
 * One short page per buyer: finance, technology, the team. The same
 * product, argued from what that person has to answer for.
 */
export function BuyerPage({ b }: { b: Buyer }) {
  const cta = b.cta ?? "Book a working session"
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap by-hero">
          <p className="lx-eyebrow" data-rise="0">
            {b.eyebrow}
          </p>
          <h1 className="lx-display lx-h1 by-h1" data-rise="1">
            {b.title}
          </h1>
          <p className="lx-lead" data-rise="2">
            {b.lead}
          </p>
          <div className="lx-cta-row" data-rise="3">
            <a className="lx-btn lx-btn-primary" href="/book">
              {cta} <span className="lx-arrow" aria-hidden>→</span>
            </a>
          </div>
        </div>
        <div className={`lx-wrap mh-facts by-points${b.points.length === 4 ? " mh-facts-2" : ""}`}>
          {b.points.map((p, i) => (
            <div key={p.title} className="mh-fact" data-rise={String(i + 3)}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {b.proof && (
        <section className="hx-section hx-deep">
          <div className={`lx-wrap${b.proof.visual ? " lx-hero-grid" : ""}`}>
            <div>
              <h2 className="lx-display hx-h2" data-reveal>
                {b.proof.heading}
              </h2>
              <div data-reveal data-delay="1">
                {b.proof.body}
              </div>
            </div>
            {b.proof.visual && (
              <div data-reveal data-delay="2">
                {b.proof.visual}
                {b.proof.caption && <p className="lx-illustrative">{b.proof.caption}</p>}
              </div>
            )}
          </div>
        </section>
      )}

      {b.sections}

      <section className="hx-section">
        <div className="lx-wrap by-faq">
          <p className="lx-eyebrow" data-reveal>
            What you&rsquo;ll want to know
          </p>
          <dl>
            {b.questions.map((x) => (
              <div key={x.q} className="by-qa" data-reveal>
                <dt>{x.q}</dt>
                <dd>{x.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring one real <em>question</em>.
          </h2>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="1">
            <a className="lx-btn lx-btn-primary" href="/book">
              {cta} <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <Link className="lx-btn lx-btn-ghost" href={b.next.href}>
              {b.next.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
