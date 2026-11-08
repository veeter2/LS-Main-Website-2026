import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { DeploymentMap } from "./deployment-map"
import "./security.css"
import { FaqJsonLd } from "../_components/faq-jsonld"

export const metadata: Metadata = pageMeta("/security", "Security and ownership · Your rules, your keys", "Software you install and own. Where it runs, who can see what, and which model it talks to, including one you already run. Straight answers.")

const OWNERSHIP = [
  {
    title: "It belongs to you.",
    body: "The facts, the links between them and every correction are your company\u2019s asset. Ask for an export and you get rows, not a paragraph.",
  },
  {
    title: "It trains no one\u2019s model.",
    body: "LongStrider has no training code. The models do the talking under their business terms, which we\u2019ll show you line by line.",
  },
  {
    title: "It outlives every vendor.",
    body: "Change models and nothing has to be re-taught. We moved every job to a different model in October. The memory didn\u2019t notice.",
  },
  {
    title: "It isn\u2019t on a vendor\u2019s terms.",
    body: "A rented stack comes with someone else\u2019s rules, and those rules can move. Here the license is yours, the keys are yours, the rows are yours. The model is a setting.",
  },
]

const SCOPES = [
  { ring: "Just you", items: ["Your promises and follow-ups", "What you asked it to keep private"] },
  { ring: "Your team", items: ["Shared accounts and decisions", "Who owns what, and by when"] },
  { ring: "The company", items: ["The rules it follows", "What every new hire should know"] },
]

const ANSWERS = [
  {
    title: "Certifications.",
    body: "No SOC 2 yet. We\u2019re a small team and we haven\u2019t started the audit. Ask us anything the audit would ask; we\u2019ll answer in writing, and the controls are the kind you can read yourself: Postgres row scoping, your own keys, receipts on every reply.",
  },
  { title: "Trackers.", body: "None on this site. None in the product." },
  { title: "Data residency.", body: "Hosted instances run in the United States. Private cloud runs wherever you put it." },
  { title: "Access.", body: "Row-level rules on every memory table, verified in production. Every reply logs what it read." },
  { title: "Deletion.", body: "Ask, and the rows are gone. Receipts show what was removed." },
  { title: "Security contact.", body: "security@longstrider.ai" },
]

const VOICES = ["Claude", "GPT", "DeepSeek", "Local model"]

export default function SecurityConcept() {
  return (
    <main>
      <FaqJsonLd items={ANSWERS.map((a) => ({ q: a.title.replace(/\.$/, ""), a: a.body }))} />
      <section className="lx-hero">
        <div className="lx-wrap">
          <div>
            <p className="lx-eyebrow" data-rise="0">Security and ownership</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Your memory. Your rules. Your <em>keys</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              Everything LongStrider learns about your business belongs to you: where it runs, who can see it, and which
              model it talks to. Here is exactly what that means today, and what we build with you.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Book a security walkthrough <span className="lx-arrow" aria-hidden>→</span>
              </Link>
              <Link className="lx-btn lx-btn-ghost" href="#ways">
                What&rsquo;s true today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hx-section hx-deep" id="whose">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> Whose is it
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Yours. Not a feature of <em>our</em> service.
          </h2>
        </div>
        <div className="lx-wrap mh-facts mh-facts-2">
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
              Scoped to the person it <em>belongs</em> to. Checked on every read.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Every fact belongs to someone. What&rsquo;s yours stays yours. Team knowledge is visible to the team, and only
              the team. The check happens in the database, on every read, not in the prompt. Every reply writes a receipt of
              what it opened, so you can always see how it learned what it knows.
            </p>
            <p className="sec-stat" data-reveal data-delay="3">
              Three in four leaders now say where their AI runs shapes their strategy, and 62% worry about relying on
              foreign-owned AI. (Deloitte, State of AI in the Enterprise, October 2026)
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
              The model is rented. The memory <em>stays</em> put.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Bring the frontier model you trust through your own keys, point it at a model you already run in-house, or put
              a local model on your own hardware for the filing lane. LongStrider is not a service you log into with our
              model behind it. It is software you install, and the model is whatever you choose. When a better one arrives,
              you switch, and nothing has to be re-taught.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <div className="ox-stack" aria-label="Example: the model can change while the memory stays the same">
              <div className="ox-layer ox-voice lx-card">
                <div className="ox-layer-head">
                  <span className="ox-layer-label">The voice</span>
                </div>
                <div className="sec-models">
                  {VOICES.map((v) => (
                    <span key={v} className="sec-model">{v}</span>
                  ))}
                </div>
              </div>
              <div className="sec-bridge" aria-hidden>
                <span />
              </div>
              <div className="ox-layer ox-memory">
                <div className="ox-layer-head">
                  <span className="ox-layer-label">The memory</span>
                </div>
                <ul className="ox-rows">
                  <li>
                    <span className="ox-text">
                      Thistlewood: scope revision promised twice (14 Oct, 29 Oct). Owner: Dev. Due Friday. Source: chat,
                      call transcript.
                    </span>
                  </li>
                </ul>
                <div className="ox-foot">
                  <span className="ox-check" aria-hidden>✓</span>
                  Same facts. Same sources. Nothing re-taught.
                </div>
              </div>
            </div>
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
            Set how it speaks, what it won&rsquo;t do, and when it must check with a person first. That&rsquo;s configuration,
            not prompting. Every correction your people make is kept, so the system&rsquo;s judgment can be audited rather
            than taken on trust.
          </p>
          <p className="sec-rules-note" data-reveal data-delay="3">
            Deloitte&rsquo;s four levels of AI autonomy are informs, recommends, executes within limits, and acts.
            LongStrider sits at &ldquo;recommends,&rdquo; on purpose. It proposes; a person confirms; every write is receipted
            and can be undone. 40% of companies already let AI act without approval and only 9% call their multi-agent
            workflows fully governed. We&rsquo;d rather be in the 9%. (Deloitte, October 2026)
          </p>
        </div>
      </section>

      <section className="hx-section hx-deep" id="ways">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">05</span> Where it runs
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            As much of it inside your walls as <em>you</em> need. Here&rsquo;s what&rsquo;s true today.
          </h2>
        </div>
        <div className="lx-wrap">
          <div className="sec-map" data-reveal data-delay="2">
            <DeploymentMap />
          </div>
          <div className="sec-partner lx-card" data-reveal data-delay="3">
            <p>
              <b>Partner program.</b> For consultancies and service firms that want to run it for their clients. You bring
              the vertical knowledge; the engine is yours to operate. <Link href="/partners">→ Partners</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="hx-section" id="answers">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">06</span> What a security team will ask
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Straight <em>answers</em>.
          </h2>
        </div>
        <div className="lx-wrap mh-facts">
          {ANSWERS.map((f, i) => (
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
            Bring your <em>security</em> team.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Walk through where it runs, who can see what, and which model it talks to, with your own people in the room.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a security walkthrough <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/">
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
