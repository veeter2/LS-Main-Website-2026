import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { CallSplit } from "./call-split"
import { ExpertInterview } from "./expert-interview"
import { RecordDemo } from "../record/record-demo"
import { Desk } from "../commitments/desk"

export const metadata: Metadata = pageMeta("/product", "What it does: facts, promises, decisions", "LongStrider turns your team’s conversations into a dated, sourced record your company owns. Counts, not guesses. Promises tracked only after you confirm.")

/**
 * What LongStrider does, in the order a buyer meets it: the record, the
 * promises, the specialists, overnight, and the agents that build on it.
 */

const RECORD_POINTS = [
  {
    title: "Counted, not guessed.",
    body: "How often, since when, who said it. The count is done by the system over the whole record, and the model is handed the number to put into words. It is not allowed to estimate.",
  },
  {
    title: "Correct it once.",
    body: "Fix a fact and the fix is kept, with who made it and when. The old fact isn\u2019t deleted. It\u2019s marked as replaced, so you can always see what it used to believe.",
  },
  {
    title: "Honest about gaps.",
    body: "When there isn\u2019t enough to go on, it says \u201CI don\u2019t have a record of that yet\u201D and tells you what it\u2019s waiting on.",
  },
]

const NIGHT = [
  {
    time: "11:04 pm",
    body: "A partner mentions, in passing, that Pellworth has been talking to another carrier.",
  },
  {
    time: "Overnight",
    body: "Filed with Pellworth. Linked to the two earlier hints. Checked against how Ashgrove went last spring.",
  },
  {
    time: "9:00 am",
    body: "One line at the top of your morning: what changed, what it means for the renewal, and the three sources behind it.",
  },
]

const RUNS = ["Monday\u2019s run:", "Tuesday\u2019s run:", "Wednesday\u2019s run:"]
const ALONE = "starts from nothing"
const OURS = ["starts from the record", "builds on Monday", "builds on both"]

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
              LongStrider takes what your team already puts into AI, in chat, in documents, in uploaded files and call
              transcripts, and keeps the part that matters: the facts, the promises, what changed, and what keeps coming
              up. Each with its source. Each yours.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </Link>
              <a className="lx-btn lx-btn-ghost" href="#record">
                See it answer
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              <span>The record</span>
              <span>The promises</span>
              <span>The specialists</span>
              <span>Overnight</span>
              <span>Your agents</span>
            </div>
          </div>
          <div data-rise="2">
            <CallSplit />
            <p className="lx-illustrative">Real behavior. Fictional account.</p>
          </div>
        </div>
      </section>

      {/* 01: The record */}
      <section className="hx-section hx-deep" id="record">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">01</span> The record
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Search finds a document that mentions Pellworth. This knows what <em>happened</em> with Pellworth.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Every fact is dated. Every change is kept, with what it replaced. Every answer points back to the message
              it came from, and you can open it.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <RecordDemo />
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

      {/* 02: Promises */}
      <section className="hx-section" id="promises">
        <div className="lx-wrap lx-hero-grid hx-flip">
          <div data-reveal data-delay="1">
            <Desk />
          </div>
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">02</span> The promises
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Every promise gets an owner and a <em>date</em>. After you say so.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              &ldquo;I&rsquo;ll send the revised terms Friday&rdquo; is a commitment. LongStrider notices it, files it,
              and suggests it to the person who said it. It only goes on their desk once they confirm. Nothing is tracked
              that nobody agreed to, and nothing clears itself.
            </p>
          </div>
        </div>
      </section>

      {/* 03: Specialists */}
      <section className="hx-section hx-deep" id="experts">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> The specialists
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Hire a specialist. It <em>interviews</em> you first.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              A specialist is a built-in expert for one job: renewals, claims, a practice area, your call traffic. Before
              it does anything it asks how your company works. What counts as risk here. Who can agree to what. Which
              accounts matter this quarter. Your answers go into the record, so it starts from your judgment, not a
              generic playbook. Then it studies, and brings back findings you keep or bin.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <ExpertInterview />
            <p className="lx-illustrative">Real flow. Fictional answers.</p>
          </div>
        </div>
      </section>

      {/* 04: Overnight */}
      <section className="hx-section" id="overnight">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> Overnight
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Most nights it does <em>nothing</em>. That&rsquo;s the point.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            At five in the morning it asks one question: did anything new land yesterday? If not, it stops, and you
            aren&rsquo;t paying for a model to re-read what it already knows. If something did, it reads what the day
            wrote, links the notes that say the same thing, flags the ones that contradict, and leaves a short note at
            the top of your morning.
          </p>
        </div>
        <ol className="lx-wrap nt-line">
          {NIGHT.map((n, i) => (
            <li key={n.time} className="nt-step" data-reveal data-delay={String(i + 1)}>
              <span className="nt-time lx-num">
                <b>{n.time}</b>
              </span>
              <p>{n.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 05: Agents */}
      <section className="hx-section hx-deep" id="agents">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">05</span> Your agents
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Your agents start where <em>yesterday&rsquo;s</em> left off.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              The model is the voice. LongStrider is the memory and the judgment. Agents you build read the record before
              they act and bring their findings back. You decide what goes into memory. So Wednesday&rsquo;s run starts
              from Monday&rsquo;s and Tuesday&rsquo;s, instead of from nothing.
            </p>
          </div>
          <div className="ag" data-reveal data-delay="2" aria-label="Agent runs with and without a shared record">
            <div className="ag-row">
              <span className="ag-label">On their own</span>
              <ol className="ag-runs">
                {RUNS.map((r) => (
                  <li key={r} className="ag-run ag-run-alone">
                    <span className="ag-run-name">{r}</span>
                    <span className="ag-run-note">{ALONE}</span>
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
                    <span className="ag-run-note">{OURS[i]}</span>
                  </li>
                ))}
              </ol>
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
            promises and the first morning note, built from your conversations, not ours.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/security">
              Where it runs, and who owns it
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
