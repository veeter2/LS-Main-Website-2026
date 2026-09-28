import type { Metadata } from "next"
import { Doors } from "../_components/doors"
import { MemoryCurve } from "./memory-curve"

export const metadata: Metadata = { title: "Concept B — The Learning Gap" }

const POINTS = [
  {
    n: "I",
    title: "Nothing taught twice",
    body: "What your team explains once stays explained — shared only with the people it belongs to.",
  },
  {
    n: "II",
    title: "Answers you can audit",
    body: "Counts and dates come from the record, with the source attached. Finance can check the work.",
  },
  {
    n: "III",
    title: "Heavy lifting at night",
    body: "Organising runs overnight in batches on lower-cost models. Your people talk to the model you choose.",
  },
]

export default function LearningGapConcept() {
  return (
    <main>
      <section className="lx-hero gx-hero">
        <div className="lx-wrap gx-head">
          <p className="lx-eyebrow" data-rise="0">Why most AI pilots stall</p>
          <h1 className="lx-display lx-h1 gx-h1" data-rise="1">
            Most AI pilots stall for one&nbsp;reason.
            <br />
            <em>They forget.</em>
          </h1>
          <p className="lx-lead gx-lead" data-rise="2">
            MIT reviewed more than 300 enterprise AI initiatives and found 95% delivered no measurable return. The cause
            wasn&rsquo;t the model. It was tools that don&rsquo;t keep what they learn. LongStrider is the layer that keeps
            it — so month twelve is worth more than month one.
          </p>
          <div className="lx-cta-row gx-cta" data-rise="3">
            <a className="lx-btn lx-btn-primary" href="/concepts/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <a className="lx-btn lx-btn-ghost" href="#how">
              How it keeps what it learns
            </a>
          </div>
        </div>

        <div className="lx-wrap gx-chart" data-rise="4" id="how">
          <MemoryCurve />
          <p className="gx-source">
            Illustration, not a measurement. Study:{" "}
            <a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" target="_blank" rel="noreferrer">
              MIT NANDA, &ldquo;The GenAI Divide: State of AI in Business 2025&rdquo;
            </a>
          </p>
        </div>

        <div className="lx-wrap gx-points">
          {POINTS.map((p, i) => (
            <div key={p.n} className="gx-point" data-reveal data-delay={String(i + 1)}>
              <span className="gx-numeral">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Doors />
    </main>
  )
}
