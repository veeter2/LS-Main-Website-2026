import type { Metadata } from "next"
import { Doors } from "../_components/doors"
import { Desk } from "./desk"

export const metadata: Metadata = { title: "Concept D — Commitments" }

export default function CommitmentsConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">For the people who do the work</p>
            <h1 className="lx-display lx-h1 dx-h1" data-rise="1">
              It remembers who promised <em>what</em>, and by&nbsp;when.
            </h1>
            <p className="lx-lead" data-rise="2">
              Every conversation leaves promises behind. LongStrider catches them, keeps them on your desk until
              they&rsquo;re done, and tidies what it learned overnight — so you start the day knowing what&rsquo;s owed,
              not hunting for it.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/pilot">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#product">
                See a day with it
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              <span>Nothing drops between meetings</span>
              <span>Correct it once, it sticks</span>
            </div>
          </div>

          <div data-rise="2">
            <Desk />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
        </div>
      </section>
      <Doors />
    </main>
  )
}
