import type { Metadata } from "next"
import Link from "next/link"
import { SessionForm } from "./session-form"

export const metadata: Metadata = { title: "Book a working session — concept" }

const STEPS = [
  { title: "Bring one real question", body: "A client, a claim, a matter, a rollout — something your team can't answer quickly today." },
  { title: "Watch it become a record", body: "We show what LongStrider keeps from your own material: the facts, the promises, the sources." },
  { title: "See what you'd own", body: "Where it would run, who could see what, and what your company would own ninety days in." },
]

const WHO = [
  { role: "Finance", line: "What it costs, and why it's an asset rather than a subscription." },
  { role: "Technology", line: "Where it runs, how it connects, and which model it talks to." },
  { role: "The team", line: "Whether it answers the questions they actually get asked." },
]

export default function BookConcept() {
  return (
    <main>
      <section className="lx-hero bk-hero">
        <div className="lx-wrap lx-hero-grid bk-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Book a working session</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Not a demo. A working session on <em>your</em> problem.
            </h1>
            <p className="lx-lead" data-rise="2">
              An hour with the people who built LongStrider, your people, and one real question. You leave knowing whether
              it&rsquo;s worth building — and what you would own if it is.
            </p>
            <ol className="bk-steps" data-rise="3">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="bk-n lx-num">{i + 1}</span>
                  <div>
                    <h2>{s.title}</h2>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div data-rise="2">
            <SessionForm />
          </div>
        </div>
      </section>

      <section className="hx-section hx-deep" id="who">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            Who should come
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Bring the people who&rsquo;ll have to say <em>yes</em>.
          </h2>
        </div>
        <div className="lx-wrap mh-facts">
          {WHO.map((w, i) => (
            <div key={w.role} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{w.role}</h3>
              <p>{w.line}</p>
            </div>
          ))}
        </div>
        <p className="lx-wrap mh-question" data-reveal data-delay="2">
          Prefer to read first? Start with <Link href="/concepts/manifesto">the Manifesto</Link> or{" "}
          <Link href="/concepts/security">security &amp; ownership</Link>.
        </p>
      </section>

      <footer className="lx-foot">
        <div className="lx-wrap">
          Concept preview — not published. <Link href="/concepts">All concepts</Link>
        </div>
      </footer>
    </main>
  )
}
