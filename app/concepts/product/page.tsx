import type { Metadata } from "next"
import Link from "next/link"
import { CallSplit } from "./call-split"
import { ExpertInterview } from "./expert-interview"
import { RecordDemo } from "../record/record-demo"
import { Desk } from "../commitments/desk"

export const metadata: Metadata = { title: "What it does — concept" }

/**
 * What LongStrider does, in the order a buyer meets it: the record, the
 * promises, the specialists, the overnight tidy, and the agents that build on
 * it. Same running example as the homepage (the Alder account).
 */

const RECORD_POINTS = [
  { title: "Counted, not guessed", body: "How often, since when, who said it — answered from the record with the source attached." },
  { title: "Correct it once", body: "Fix a fact and the fix is kept, with who made it and when. It won't come back wrong." },
  { title: "Honest about gaps", body: "When there isn't enough to go on, it says so — and tells you what it's waiting for." },
]

const NIGHT = [
  {
    time: "11:04 pm",
    title: "A signal arrives",
    body: "A partner mentions, in passing, that Alder has been talking to a competitor.",
  },
  {
    time: "Overnight",
    title: "It does the tidying",
    body: "Files it with Alder, merges it with two earlier hints, and checks it against how Brennan went in March.",
  },
  {
    time: "9:00 am",
    title: "You get a position",
    body: "One note at the top of your morning: what changed, what it means for Friday, and the three sources behind it.",
  },
]

const RUNS = ["Monday's run", "Tuesday's run", "Wednesday's run"]

export default function ProductConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">What it does</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Your people talk. Your company <em>remembers</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider listens to the work your team already does — calls, chats, email, documents — and keeps what
              matters: the facts, the promises, what changed and what keeps coming up. Each with its source, and each
              yours.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/pilot">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#record">
                See it answer
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              <span>The record</span>
              <span>The promises</span>
              <span>The specialists</span>
              <span>The overnight tidy</span>
              <span>Your agents</span>
            </div>
          </div>
          <div data-rise="2">
            <CallSplit />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
        </div>
      </section>

      {/* 01 — The record */}
      <section className="hx-section hx-deep" id="record">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">01</span> The record
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Retrieval is not <em>intelligence</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Search finds a document that mentions Alder. LongStrider knows what happened with Alder — every fact dated,
              every change kept, every answer traceable to where it came from.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <RecordDemo />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
        </div>
        <div className="lx-wrap mh-facts">
          {RECORD_POINTS.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 02 — Promises */}
      <section className="hx-section" id="promises">
        <div className="lx-wrap lx-hero-grid hx-flip">
          <div data-reveal data-delay="1">
            <Desk />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">02</span> The promises
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Every promise gets an owner and a <em>date</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              &ldquo;I&rsquo;ll send the revised terms Friday&rdquo; is a commitment, not small talk. LongStrider notices
              it, suggests it to the person who made it, and — once they confirm — keeps it on their desk until it&rsquo;s
              done. Nothing is tracked that nobody agreed to.
            </p>
          </div>
        </div>
      </section>

      {/* 03 — Specialists */}
      <section className="hx-section hx-deep" id="experts">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> The specialists
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Hire a specialist that <em>interviews</em> you first.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Choose the expertise you need — renewals, claims, a practice area. Before it does anything, it asks how your
              company works: what matters, what counts as risk, who decides. Your answers go into the record, so it starts
              from your judgement instead of someone else&rsquo;s.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <ExpertInterview />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
        </div>
      </section>

      {/* 04 — Overnight */}
      <section className="hx-section" id="overnight">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> It gets smarter while you sleep
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            A signal at 11pm. A <em>position</em> by 9am.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Every night it tidies what the day taught it: duplicates merged, conflicts flagged, new facts filed where they
            belong and checked against what happened before. You wake up to what changed — not a pile to sort.
          </p>
        </div>
        <ol className="lx-wrap nt-line">
          {NIGHT.map((n, i) => (
            <li key={n.time} className="nt-step" data-reveal data-delay={String(i + 1)}>
              <span className="nt-time lx-num">{n.time}</span>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 05 — Agents */}
      <section className="hx-section hx-deep" id="agents">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">05</span> Agents that compound
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              We don&rsquo;t ship agents. We make every agent&rsquo;s work <em>permanent</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              The model is the voice; LongStrider is the memory and the judgement. Your agents read the record before they
              act and write back what they found — so Wednesday&rsquo;s run starts where Tuesday&rsquo;s finished, instead
              of from nothing.
            </p>
          </div>
          <div className="ag" data-reveal data-delay="2" aria-label="Agent runs with and without a shared record">
            <div className="ag-row">
              <span className="ag-label">On their own</span>
              <ol className="ag-runs">
                {RUNS.map((r) => (
                  <li key={r} className="ag-run ag-run-alone">
                    <span className="ag-run-name">{r}</span>
                    <span className="ag-run-note">Starts from nothing</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="ag-row ag-row-ours">
              <span className="ag-label">On LongStrider</span>
              <ol className="ag-runs">
                {RUNS.map((r, i) => (
                  <li key={r} className="ag-run">
                    <span className="ag-run-name">{r}</span>
                    <span className="ag-run-note">
                      {i === 0 ? "Starts from the record" : `Builds on ${i === 1 ? "Monday" : "Monday and Tuesday"}`}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="ag-record">
                <span>The record — yours, growing with every run</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            See it on your <em>own</em> work.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Bring a real account and the people who know it. In one working session you&rsquo;ll see the record, the
            promises and the first morning note — built from your conversations, not ours.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <a className="lx-btn lx-btn-primary" href="/pilot">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <Link className="lx-btn lx-btn-ghost" href="/concepts/security">
              Where it runs, and who owns it
            </Link>
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
