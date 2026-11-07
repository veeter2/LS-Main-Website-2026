import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { SentenceJourney } from "./sentence-journey"

export const metadata: Metadata = pageMeta("/how-it-works", "How LongStrider works · The memory layer", "Three layers: the record, the order, the judgment. Counted by the system, written by the model you choose. Scoped to the person in the database.")

/**
 * How LongStrider works, for the technical buyer: one sentence followed
 * through the system, the three layers, the split of work between the model
 * and the memory, correction, and what an architect needs to know.
 */

const SOURCES = ["Chat", "Documents", "Uploaded files", "Call transcripts from your call-tracking system", "Your own agents"]

const OURS = [
  { name: "The record", body: "Every conversation broken into facts, each dated, each with who said it and where." },
  { name: "The order", body: "Facts filed by account, matter and person, linked to each other, with promises on the right desk." },
  { name: "The judgment", body: "What kind of question this is, what counts, what contradicts, and the rules you set." },
]

const MODEL_DOES = [
  "Understands the question in plain language",
  "Writes the answer in your house voice",
  "Summarizes, drafts, reasons over what it\u2019s handed",
]

const WE_DO = [
  "Remembers every conversation, dated and sourced",
  "Counts, orders and compares across months of work",
  "Decides what the model sees, and who\u2019s allowed to see it",
  "Checks for contradictions before it answers",
  "Keeps every correction, with who and why",
  "Writes a receipt of what the model was shown, every reply",
]

const ARCHITECT = [
  {
    title: "Any model, your keys.",
    body: "Seven jobs, seven model settings, one screen. Change the chat model on Tuesday and Wednesday\u2019s memory is identical. We did it in October. 222,000 facts, none re-taught.",
  },
  {
    title: "Your agents plug in.",
    body: "They read the record before they act and bring back findings. A person decides what enters memory.",
  },
  {
    title: "Scoped by default.",
    body: "Every fact belongs to a person, a team or the company, and every read is checked against who\u2019s asking, in the database, not in the prompt.",
  },
  {
    title: "Traceable.",
    body: "Every reply writes a receipt: which drawers it opened, which facts it was shown, how long each step took.",
  },
  {
    title: "Runs where you need it.",
    body: "Hosted and isolated to you today. Private cloud and an on-premises build, scoped with you. The filing lane can already run on your own hardware.",
  },
  {
    title: "Never trains a model.",
    body: "LongStrider has no training code. Model vendors are bound by their business terms, and we\u2019ll show you which ones.",
  },
]

export default function HowItWorksConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">How it works</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              The model is the voice. We&rsquo;re the <em>memory</em> and the judgment.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider sits between the work your people do and the model that writes the answers. It turns
              conversations into a record you own, keeps that record in order, and hands the model exactly what it needs for
              this one question. The answer comes from your company&rsquo;s history, not from a model&rsquo;s best guess.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Book an architecture session <span className="lx-arrow" aria-hidden>→</span>
              </Link>
              <a className="lx-btn lx-btn-ghost" href="#layers">
                See the three layers
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              <span>Any model, your keys</span>
              <span>Counts from the record</span>
              <span>Scoped to the person</span>
            </div>
          </div>
          <div data-rise="2">
            <SentenceJourney />
            <p className="lx-illustrative">Real behavior, stage by stage. Fictional firm.</p>
          </div>
        </div>
      </section>

      {/* 01: Three layers */}
      <section className="hx-section hx-deep" id="layers">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> The architecture
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Three layers. You own the <em>middle</em> one.
          </h2>
        </div>
        <div className="lx-wrap ly" data-reveal data-delay="2" aria-label="The three layers of LongStrider">
          <div className="ly-band">
            <span className="ly-label">Where the work happens.</span>
            <ul className="ly-chips">
              {SOURCES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="ox-bridge" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="ly-band ly-ours">
            <span className="ly-label">LongStrider, yours.</span>
            <div className="ly-parts">
              {OURS.map((p) => (
                <div key={p.name} className="ly-part">
                  <h3>{p.name}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ox-bridge" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="ly-band">
            <span className="ly-label">The model, rented and replaceable.</span>
            <p className="ly-model">
              Any frontier model through your keys, or a local model on your hardware for the filing lane. It gets the facts
              it needs for this question and writes the answer. It never has to keep the memory. If its vendor changes
              its interface, its terms or its price, you change a setting.
            </p>
          </div>
        </div>
      </section>

      {/* 02: Division of labor */}
      <section className="hx-section" id="split">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> Why the answers are exact
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Counted by the system. <em>Written</em> by the model.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Language models are good with words and unreliable with arithmetic across hundreds of conversations. So
            LongStrider does the remembering, the counting and the checking itself, and gives the model the result to put
            into words.
          </p>
        </div>
        <div className="lx-wrap dl" data-reveal data-delay="2">
          <div className="dl-col">
            <span className="dl-head">The model does</span>
            <ul>
              {MODEL_DOES.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="dl-col dl-ours">
            <span className="dl-head">LongStrider does</span>
            <ul>
              {WE_DO.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03: Correction */}
      <section className="hx-section hx-deep" id="correct">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> Correct it once
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              A correction is a <em>lesson</em>, not an edit.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              When someone fixes a fact, LongStrider keeps the fix, who made it and why. The old fact isn&rsquo;t erased.
              It&rsquo;s marked as replaced, so you can always see what it believed, when, and what changed its mind.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <article className="cr lx-card" aria-label="Example: a corrected fact">
              <span className="cr-label">Reyes · closing date</span>
              <p className="cr-old">
                12 November <span className="lx-num">(Kayla, 3 Nov)</span>
              </p>
              <p className="cr-new">
                19 November <span className="lx-num">(Kayla, 6 Nov)</span>
              </p>
              <div className="cr-why">
                <span className="cr-why-label">Why it changed</span>
                <span>&ldquo;Legal pushed it.&rdquo; Kayla, 7 Nov.</span>
              </div>
              <div className="mh-note-sources">
                <span className="rx-source">
                  <span className="rx-source-kind">Chat</span>
                  <span className="rx-source-date lx-num">7 Nov</span>
                </span>
                <span className="rx-stamp rx-stamp-gold">History kept</span>
              </div>
            </article>
                      </div>
        </div>
      </section>

      {/* 04: For architects */}
      <section className="hx-section" id="architects">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> For your architects
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Built to sit beside your <em>stack</em>, not on top of it.
          </h2>
        </div>
        <div className="lx-wrap mh-facts">
          {ARCHITECT.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String((i % 3) + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring your <em>architect</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            An hour with the people who built it: where it runs, how it connects to your tools and models, and what your
            company would own at the end.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book an architecture session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/security">
              Security and ownership
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
