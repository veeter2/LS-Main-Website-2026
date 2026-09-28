import type { Metadata } from "next"
import Link from "next/link"
import { RecordDemo } from "../record/record-demo"
import { MemoryCurve } from "../learning-gap/memory-curve"
import { Desk } from "../commitments/desk"
import { ModelSwitch } from "../owned/model-switch"

export const metadata: Metadata = { title: "Homepage concept — v1 (the record first)" }

/**
 * One story, told top to bottom with one running example (the Alder account):
 * what it is → why you need it → what it's like → why it's safe to own.
 */

const WHY = [
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

export default function HomeConcept() {
  return (
    <main>
      {/* 01 — What it is */}
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
              <a className="lx-btn lx-btn-primary" href="/pilot">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#research">
                Why this matters
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

      {/* 02 — Why you need it */}
      <section className="hx-section hx-deep" id="research">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> Why your AI couldn&rsquo;t have answered that
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Most AI pilots stall for one&nbsp;reason.
            <br />
            <em>They forget.</em>
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Ask a typical assistant about Alder and it starts from zero, every time. MIT reviewed more than 300 enterprise
            AI initiatives and found 95% delivered no measurable return — not because the models were weak, but because
            the tools didn&rsquo;t keep what they learned. LongStrider keeps it, so month twelve is worth more than month
            one.
          </p>
        </div>
        <div className="lx-wrap hx-chart" data-reveal data-delay="2">
          <MemoryCurve />
          <p className="gx-source">
            Illustration, not a measurement. Study:{" "}
            <a
              href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
              target="_blank"
              rel="noreferrer"
            >
              MIT NANDA, &ldquo;The GenAI Divide: State of AI in Business 2025&rdquo;
            </a>
          </p>
        </div>
        <div className="lx-wrap gx-points">
          {WHY.map((p, i) => (
            <div key={p.n} className="gx-point" data-reveal data-delay={String(i + 1)}>
              <span className="gx-numeral">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — What it's like */}
      <section className="hx-section" id="product">
        <div className="lx-wrap lx-hero-grid hx-flip">
          <div data-reveal data-delay="1">
            <Desk />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> What it did with that answer
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              It caught the <em>promise</em> — and kept it on your desk.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              When Priya agreed to hold the rate, that wasn&rsquo;t just a fact. It was a commitment, with a condition and
              a date. LongStrider keeps track of who promised what, to whom and by when, tidies what it learned overnight,
              and brings it back before it slips.
            </p>
            <div className="lx-assure" data-reveal data-delay="3">
              <span>Nothing drops between meetings</span>
              <span>Correct it once, it sticks</span>
              <span>Tidied every night</span>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Why it's safe to own */}
      <section className="hx-section hx-deep" id="security">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">04</span> Why it&rsquo;s safe to own
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              The model is rented.
              <br />
              The memory is <em>yours</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Models change every few months. The Alder history shouldn&rsquo;t. LongStrider keeps your company&rsquo;s
              memory in one place you control, scoped to each person, and lets the model you choose do the talking.
              It&rsquo;s built to run frontier or private models, with your own keys — switch, and nothing has to be
              re-taught.
            </p>
            <div className="lx-assure" data-reveal data-delay="3">
              <span>Your keys</span>
              <span>Frontier or private models</span>
              <span>Scoped to each person</span>
            </div>
          </div>
          <div data-reveal data-delay="2">
            <ModelSwitch />
            <p className="lx-illustrative">Illustrative example — try switching the model</p>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="hx-close" id="company">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Start with one team.
            <br />
            Watch the <em>record</em> build.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            A working session with your people and a real question — so you can see the answer, the source and the promise
            for yourself.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <a className="lx-btn lx-btn-primary" href="/pilot">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <a className="lx-btn lx-btn-ghost" href="/technology">
              How it works
            </a>
          </div>
        </div>
      </section>

      <footer className="lx-foot">
        <div className="lx-wrap">
          Concept preview — not published. Examples on this page are illustrative.{" "}
          <Link href="/concepts">All concepts</Link>
        </div>
      </footer>
    </main>
  )
}
