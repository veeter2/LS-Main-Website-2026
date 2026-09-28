import type { Metadata } from "next"
import Link from "next/link"
import { DeploymentMap } from "./deployment-map"
import { ModelSwitch } from "../owned/model-switch"

export const metadata: Metadata = { title: "Security & ownership — concept" }

const OWNERSHIP = [
  {
    title: "It belongs to you",
    body: "The memory, the links between facts and every correction are your company's asset — not a feature of our service.",
  },
  {
    title: "It trains no one's model",
    body: "LongStrider never trains a model on your data. Models do the talking; the memory stays with you.",
  },
  {
    title: "It outlives every vendor",
    body: "Change models or providers and nothing has to be re-taught. In a sovereign build, the whole knowledge graph is yours to keep.",
  },
]

const SCOPES = [
  { ring: "Just you", items: ["Your promises and follow-ups", "What you asked it to keep private"] },
  { ring: "Your team", items: ["Shared accounts and decisions", "Who owns what, and by when"] },
  { ring: "The company", items: ["Policies and rules it follows", "What every new hire should know"] },
]

const WAYS = [
  {
    name: "Hosted",
    line: "A dedicated instance we run, isolated to you.",
    points: ["Your data stays in your environment", "No shared infrastructure", "The fastest way to start"],
  },
  {
    name: "Private cloud",
    line: "Containerised software inside your VPC.",
    points: ["Your servers, your perimeter", "No source code shipped", "Full data residency"],
  },
  {
    name: "Sovereign build",
    line: "Built alongside your team, on your hardware.",
    points: ["A private model inside your walls", "Air-gap capable, no calls out", "Everything belongs to you, permanently"],
  },
  {
    name: "Partner program",
    line: "Run it under your brand, for your clients.",
    points: ["For consultancies and service firms", "You bring the vertical knowledge", "The engine is yours to operate"],
  },
]

export default function SecurityConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Security &amp; ownership</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Your memory. Your walls.
              <br />
              Your <em>keys</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              Everything LongStrider learns about your business belongs to you — where it runs, who can see it, and which
              model it talks to. Choose how much lives inside your own perimeter, all the way to a sovereign build with no
              calls out.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/concepts/book">
                Book a security walkthrough <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <Link className="lx-btn lx-btn-ghost" href="#ways">
                Four ways to run it
              </Link>
            </div>
          </div>
          <div data-rise="2">
            <DeploymentMap />
          </div>
        </div>
      </section>

      <section className="hx-section hx-deep" id="whose">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> Whose is it?
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Yours. Not a feature of <em>our</em> service.
          </h2>
        </div>
        <div className="lx-wrap mh-facts">
          {OWNERSHIP.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hx-section" id="who">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">02</span> Who can see what
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Scoped to the person it <em>belongs</em> to.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Every memory belongs to someone. What&rsquo;s yours stays yours; team knowledge is visible to the team — and
              only the team. Every answer shows where it came from, and every correction is logged, so you can always see how
              it learned what it knows.
            </p>
          </div>
          <div className="sc-rings" data-reveal data-delay="2" aria-label="Three scopes of memory">
            {SCOPES.map((s, i) => (
              <div key={s.ring} className={`sc-ring sc-ring-${i}`}>
                <span className="sc-ring-label">{s.ring}</span>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hx-section hx-deep" id="model">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> Your model, your keys
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              The model is rented. The memory is <em>yours</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Bring the frontier model you trust through your own keys, or run a private model on your own hardware.
              LongStrider keeps the memory in one place you control and lets the model do the talking — so when a better one
              arrives, you switch and nothing has to be re-taught.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <ModelSwitch />
            <p className="lx-illustrative">Illustrative example — try switching the model</p>
          </div>
        </div>
      </section>

      <section className="hx-section" id="rules">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> It follows your rules
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            You write the rules. It keeps the <em>record</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Set how it speaks, what it won&rsquo;t do, and when it must check with a person first — configuration, not
            prompting. Every correction your people make is kept, so the system&rsquo;s judgement can be audited, not taken
            on trust.
          </p>
        </div>
      </section>

      <section className="hx-section hx-deep" id="ways">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">05</span> Four ways to run it
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            As much of it inside your walls as <em>you</em> need.
          </h2>
        </div>
        <div className="lx-wrap sw-grid">
          {WAYS.map((w, i) => (
            <article key={w.name} className="sw-card lx-card" data-reveal data-delay={String(i + 1)}>
              <h3>{w.name}</h3>
              <p className="sw-line">{w.line}</p>
              <ul>
                {w.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring your <em>security</em> team.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Walk through where it runs, who can see what, and which model it talks to — with your own people in the room.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <a className="lx-btn lx-btn-primary" href="/concepts/book">
              Book a security walkthrough <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <Link className="lx-btn lx-btn-ghost" href="/concepts/home">
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>

      <footer className="lx-foot">
        <div className="lx-wrap">
          Concept preview — not published. <Link href="/concepts">All concepts</Link>
        </div>
      </footer>
    </main>
  )
}
