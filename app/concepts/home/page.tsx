import type { Metadata } from "next"
import Link from "next/link"
import { OwnershipBoard } from "./ownership-board"
import { RecordDemo } from "../record/record-demo"
import { Desk } from "../commitments/desk"
import { MemoryCurve } from "../learning-gap/memory-curve"

export const metadata: Metadata = { title: "Homepage concept" }

/**
 * The Manifesto's argument as a homepage: the problem is ownership (you are
 * building on rented land), memory is how you get it back, and the proof is
 * shown, not claimed. One running example (the Alder account) throughout.
 */

const RENTED = [
  {
    title: "It's their memory",
    body: "The memory features vendors offer keep your history on their platform, under their terms. What your team teaches them improves their product.",
  },
  {
    title: "Switch, and start from zero",
    body: "Models get cheaper and better every quarter, and you will change them. The context your team built doesn't come with you.",
  },
  {
    title: "People leave. So does what they knew",
    body: "The client history only one person carried goes with them on their last day. It was never written down — it was only ever taught to a chat window.",
  },
]

const COMPARE_ROWS = ["What it does", "Who it belongs to", "What it knows"]
const COMPARE = [
  {
    name: "Enterprise search",
    cells: ["Finds the documents you already have", "Rented, per seat", "What someone wrote down"],
  },
  {
    name: "Memory tools for developers",
    cells: ["Stores and fetches data for apps engineers build", "Plumbing — you build the product", "What it was handed"],
  },
  {
    name: "LongStrider",
    cells: [
      "Builds what your company learns, as it works",
      "You — it survives model switches and departures",
      "Who promised what, what changed, and when to push back",
    ],
    ours: true,
  },
]

const ASSET = [
  { n: "I", title: "Nothing taught twice", body: "What your team explains once stays explained — shared only with the people it belongs to." },
  { n: "II", title: "Answers you can audit", body: "Counts and dates come from the record, with the source attached. Finance can check the work." },
  { n: "III", title: "It outlives the model", body: "Change providers next year and the memory stays put. The asset is the memory, not the model." },
]

export default function HomeConcept() {
  return (
    <main>
      {/* The problem */}
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">The intelligence layer you own</p>
            <h1 className="lx-display lx-h1 mh-h1" data-rise="1">
              Every dollar you spent on AI this year made someone else&rsquo;s platform <em>smarter</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              Your team teaches AI your business every day — the decisions, the clients, the promises. Today that
              knowledge sits on a platform you rent, resets when you change models, and walks out the door when people
              leave. LongStrider keeps it: exact, sourced, and yours.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/pilot">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#own">
                See what you&rsquo;d own
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              <span>Yours, not your vendor&rsquo;s</span>
              <span>Survives a model switch</span>
              <span>Every answer sourced</span>
            </div>
          </div>
          <div data-rise="2">
            <OwnershipBoard />
            <p className="lx-illustrative">Illustration</p>
          </div>
        </div>
      </section>

      {/* 01 — Rented land */}
      <section className="hx-section hx-deep" id="rented">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> The problem
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Every company using AI is building on <em>rented land</em>.
          </h2>
        </div>
        <div className="lx-wrap mh-facts">
          {RENTED.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <p className="lx-wrap mh-question" data-reveal data-delay="2">
          The question most companies haven&rsquo;t answered: where does everything you learn go — and{" "}
          <em>who owns it?</em>
        </p>
      </section>

      {/* 02 — What walks out the door */}
      <section className="hx-section" id="departure">
        <div className="lx-wrap mh-story">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> What walks out the door
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Eleven years. Two weeks&rsquo; notice.
          </h2>
          <div className="mh-story-body" data-reveal data-delay="2">
            <p>
              Your head of client services resigns on a Friday. She knows every key account — the politics, the
              preferences, the history no CRM ever held.
            </p>
            <p>
              On Monday, her replacement opens LongStrider. The relationships, the decisions and the promises are there,
              each with where it came from — because the system was learning alongside her the whole time.
            </p>
            <p className="mh-story-turn">
              Her expertise didn&rsquo;t leave with her. <em>It became the company&rsquo;s.</em>
            </p>
          </div>
          <p className="lx-illustrative mh-left" data-reveal data-delay="3">
            A scenario
          </p>
        </div>
      </section>

      {/* 03 — What owning it looks like */}
      <section className="hx-section hx-deep" id="own">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> What owning it looks like
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Ask what happened. Get the <em>record</em> — not a guess.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Every conversation becomes facts with a source. Ask how often, or when, and get a number you can check. When
              there isn&rsquo;t enough to go on, it says so.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <RecordDemo />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
        </div>

        <div className="lx-wrap lx-hero-grid hx-flip mh-second">
          <div data-reveal data-delay="1">
            <Desk />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
          <div>
            <h3 className="lx-display mh-h3" data-reveal>
              And it keeps the <em>promises</em>.
            </h3>
            <p className="lx-lead" data-reveal data-delay="1">
              When Priya agreed to hold the rate, that was a commitment with a condition and a date. LongStrider tracks who
              promised what, to whom and by when — tidies what it learned overnight — and brings it back before it slips.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — Integrity */}
      <section className="hx-section" id="integrity">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">04</span> The integrity to push back
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Most AI remembers everything and agrees with everything.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              LongStrider remembers — and has the integrity to challenge you. When a decision contradicts a pattern
              it&rsquo;s been tracking, it says so, with the evidence and what happened last time. Ninety days in, it&rsquo;s
              asking the questions you didn&rsquo;t know to ask.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <article className="mh-note lx-card">
              <span className="mh-note-label">This morning</span>
              <p className="mh-note-text">
                Last week&rsquo;s plan to discount Alder looks like Brennan in March: the discount didn&rsquo;t secure the
                renewal, and the margin never came back. Worth a second look before Friday?
              </p>
              <div className="mh-note-sources">
                <span className="rx-source">
                  <span className="rx-source-kind">Pricing call</span>
                  <span className="rx-source-date lx-num">18 Sep</span>
                </span>
                <span className="rx-source">
                  <span className="rx-source-kind">Brennan retro</span>
                  <span className="rx-source-date lx-num">March</span>
                </span>
                <span className="rx-stamp rx-stamp-gold">A contradiction, flagged</span>
              </div>
            </article>
            <p className="lx-illustrative">Illustrative example</p>
          </div>
        </div>
      </section>

      {/* 05 — Retrieval is not intelligence */}
      <section className="hx-section hx-deep" id="different">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">05</span> Retrieval is not intelligence
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Not search. Not a memory API. <em>An asset.</em>
          </h2>
        </div>
        <div className="lx-wrap" data-reveal data-delay="2">
          <div className="mh-compare" role="table" aria-label="How LongStrider differs">
            <div className="mh-compare-row mh-compare-headrow" role="row">
              <span role="columnheader" />
              {COMPARE.map((c) => (
                <span key={c.name} role="columnheader" className={c.ours ? "mh-ours mh-ours-head" : undefined}>
                  {c.name}
                </span>
              ))}
            </div>
            {COMPARE_ROWS.map((label, r) => (
              <div key={label} className="mh-compare-row" role="row">
                <span role="rowheader" className="mh-compare-label">
                  {label}
                </span>
                {COMPARE.map((c) => (
                  <span key={c.name} role="cell" className={c.ours ? "mh-ours" : undefined}>
                    <span className="mh-cell-name">{c.name}</span>
                    {c.cells[r]}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — An asset */}
      <section className="hx-section" id="asset">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">06</span> An asset, not a subscription
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            The one AI line item that&rsquo;s worth <em>more</em> every month.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            MIT reviewed more than 300 enterprise AI initiatives and found 95% delivered no measurable return — because the
            tools didn&rsquo;t keep what they learned. LongStrider does, so month twelve knows what month one never could.
            And what it knows belongs to the company: something that shows up in due diligence, not in a renewal notice.
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
          {ASSET.map((p, i) => (
            <div key={p.n} className="gx-point" data-reveal data-delay={String(i + 1)}>
              <span className="gx-numeral">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section className="hx-close" id="company">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring us your <em>hardest</em> problem.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            A working session with your people and a real question. You&rsquo;ll see the answer, the source and the promise
            — and what your company would own ninety days from now.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <a className="lx-btn lx-btn-primary" href="/pilot">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <a className="lx-btn lx-btn-ghost" href="/concepts/manifesto">
              Read the manifesto
            </a>
          </div>
        </div>
      </section>

      <footer className="lx-foot">
        <div className="lx-wrap">
          Concept preview — not published. Examples on this page are illustrative. <Link href="/concepts">All concepts</Link>
        </div>
      </footer>
    </main>
  )
}
