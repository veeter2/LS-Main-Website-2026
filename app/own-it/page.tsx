import type { Metadata } from "next"
import Link from "next/link"
import { pageMeta } from "@/lib/page-meta"
import { LadderArt } from "../_components/ladder-art"
import "./own-it.css"

export const metadata: Metadata = pageMeta(
  "/own-it",
  "Own it outright · Hosted today, air-gapped when you're ready",
  "Not SaaS. Licensed software you own: start hosted, bring your own keys, run your own model, move it inside your walls. The memory never has to move.",
)

/**
 * The buyer's side of how it works: the path from working session to
 * ownership, the deployment ladder from hosted to air-gapped, and what
 * "owning it" means in practice. Every claim here matches what is true
 * today; the ladder states honestly which rungs are scoped with you.
 */

const PATH = [
  {
    step: "1",
    title: "The working session.",
    body: "One hour. Your hardest question and your people in the room. You see the record, the promises and the morning note built from your material — not a slide deck about ours. You keep what we build.",
    cost: "Free",
  },
  {
    step: "2",
    title: "The scoped build.",
    body: "If it's worth doing, we scope it together: which sources connect, which experts to seat, where it runs. Fixed scope, fixed price, in writing. Nothing starts before you approve it.",
    cost: "Quoted in writing",
  },
  {
    step: "3",
    title: "You own it.",
    body: "A license you hold, not a seat you rent. A monthly support line you can cancel. When you stop paying us, the system keeps working on the model you choose. Your company owns the memory either way.",
    cost: "License + optional support",
  },
]

const LADDER = [
  {
    rung: "Hosted to start",
    status: "Available now",
    body: "Your company's own instance, isolated to you, run by us. The fastest way to start — most companies do. Your keys from day one; the memory is yours to export any time.",
  },
  {
    rung: "Your own keys (BYOK)",
    status: "Available now",
    body: "Bring the frontier model you trust through your own API keys. We never hold a key we don't need, and the spend shows on your bill, not ours.",
  },
  {
    rung: "Your own model",
    status: "Filing lane today, more scoped with you",
    body: "Any OpenAI-compatible server, including Ollama on your own hardware. The background job that files new facts can run on your machines today. Which jobs move fully local is a scope conversation.",
  },
  {
    rung: "Private cloud",
    status: "Scoped with you",
    body: "The whole system inside your cloud account — AWS, Azure, GCP, or the rack in your office. Same software, your infrastructure, our help setting it up.",
  },
  {
    rung: "Air-gapped",
    status: "Call us",
    body: "Nothing leaves the building: no outside model, no outside connection in the memory's path. If that's your requirement, call us — it's the deployment the architecture was built for, and we scope it by hand.",
  },
]

const OWN_FACTS = [
  {
    title: "Your data sits in plain Postgres.",
    body: "Readable with any tool you already own. Ask for an export and you get rows, not a paragraph.",
  },
  {
    title: "No training, ever.",
    body: "LongStrider has no training code. It learns by filing what your people say into the record — which is why nothing has to be re-taught when you change models.",
  },
  {
    title: "Switch anything, lose nothing.",
    body: "Change the model, the host or the hardware. The memory stays exactly where you left it. We moved every job to a different model in October; the memory didn't notice.",
  },
  {
    title: "Fire us and keep everything.",
    body: "Cancel support and the system keeps working. The license doesn't expire, the keys are yours, and the rows are yours.",
  },
]

export default function OwnItPage() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap">
          <div>
            <p className="lx-eyebrow" data-rise="0">
              Not SaaS. Software you own.
            </p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Rent the model. Own <em>everything</em> else.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider is licensed software, not a subscription you rent. Start hosted and move it
              inside your walls when you're ready — your keys, your model, or no model outside the
              building at all. The memory never has to move, so nothing is ever re-taught.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </Link>
              <Link className="lx-btn lx-btn-ghost" href="#ladder">
                The five ways to run it
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hx-section" id="path">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> How you start
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Three steps. You own it at the <em>end</em> of the first one.
          </h2>
        </div>
        <div className="lx-wrap mh-facts mh-facts-2">
          {PATH.map((p, i) => (
            <div key={p.step} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>
                {p.step} {p.title}
              </h3>
              <p>{p.body}</p>
              <p className="own-cost">{p.cost}</p>
            </div>
          ))}
        </div>
      </section>

      <LadderArt />

      <section className="hx-section hx-deep" id="ladder">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> The ladder
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Five ways to run it. Climb <em>any</em> time.
          </h2>
          <p className="lx-lead" data-reveal data-delay="2">
            Every rung runs the same record. Moving up never moves the memory — that's the part
            we own the architecture for, and the part no rented stack can offer.
          </p>
        </div>
        <div className="lx-wrap own-ladder" aria-label="Deployment options from hosted to air-gapped">
          {LADDER.map((r, i) => (
            <div key={r.rung} className="own-rung" data-reveal data-delay={String((i % 3) + 1)}>
              <div className="own-rung-head">
                <span className="own-rung-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{r.rung}</h3>
                <span className="own-status">{r.status}</span>
              </div>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hx-section" id="history">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> Bring your history
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Your old emails and call logs are the <em>point</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Connect your CRM, your files, your forms and your call transcripts. Import years of
              history. It's filed into the record in days and useful the week it lands — dated,
              sourced, scoped to who it belongs to.
            </p>
          </div>
          <div className="own-modelbox" data-reveal data-delay="2" aria-label="Why there is no training step">
            <p className="own-modelbox-title">&ldquo;How long does it take to train?&rdquo;</p>
            <p>
              There is no training step. LongStrider learns by filing what your people say into a
              record you own — so it's useful the week you import, and nothing has to be re-taught
              when you change models. A trained model is a cost
              you can't move. A record is an asset you can.
            </p>
          </div>
        </div>
      </section>

      <section className="hx-section hx-deep" id="own">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> What owning means
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            &ldquo;Fire us and keep <em>everything</em>.&rdquo;
          </h2>
        </div>
        <div className="lx-wrap mh-facts mh-facts-2">
          {OWN_FACTS.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hx-section">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring us your hardest <em>question</em>.
          </h2>
          <p className="lx-lead" data-reveal data-delay="1">
            An hour, your people, one real question from your business. You leave knowing what your
            company would own — and which rung of the ladder it would start on.
          </p>
          <div className="lx-cta-row" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
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
