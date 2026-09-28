import type { Metadata } from "next"
import { Doors } from "../_components/doors"
import { RecordDemo } from "./record-demo"

export const metadata: Metadata = { title: "Concept A · The Record" }

export default function RecordConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Memory for the whole company</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Ask what happened.
              <br />
              Get the <em>record</em>,
              <br />
              not a guess.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider keeps every conversation your team has with AI, turns it into facts with a source for each one,
              and answers from that record. Exact counts. Real dates. And when there isn&rsquo;t enough to go on, it says
              so.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/concepts/book">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#see">
                Watch it answer
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              <span>Sourced answers</span>
              <span>Scoped to each person</span>
              <span>Your choice of model</span>
            </div>
          </div>

          <div data-rise="2">
            <RecordDemo />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
        </div>
      </section>
      <Doors />
    </main>
  )
}
