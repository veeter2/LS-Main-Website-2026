import type { Metadata } from "next"
import Link from "next/link"
import { pageMeta } from "@/lib/page-meta"
import { MemoryStays } from "../_components/memory-stays"
import { FilmStill } from "../_components/film-still"
import "./own-it.css"

export const metadata: Metadata = pageMeta(
  "/own-it",
  "Sovereign by design · Your keys, your machine",
  "Not SaaS. Sovereign software you own: your own key from day one, your own model on your own machine, hosted by us or in your rack. The memory never moves.",
)

/**
 * The buyer's side of how it works: the path from first call to
 * ownership, the five ways to run it (your keys first), and what "owning
 * it" means in practice. Every claim here matches what is true today; the
 * ladder states honestly which rungs are scoped with you.
 */

const PATH = [
  {
    step: "1",
    title: "The first call.",
    body: "You tell us what your business does and the question your team can’t answer today. We show you the real product on work like yours, not a slide deck about ours.",
    cost: "",
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
    rung: "Your own API key. Day one.",
    status: "Available now",
    body: "Cloud models, or open models through your own gateway. The spend lands on your bill, never ours. This is the first step: we never sell or rent a model.",
  },
  {
    rung: "Your own model on your own machine.",
    status: "Available now",
    body: "Ollama, vLLM, LM Studio, Qwen. Chat and filing both run on hardware you own. Nothing has to be re-taught when you switch.",
  },
  {
    rung: "The app hosted by us, isolated to you.",
    status: "Available now",
    body: "We run the software in an instance that is yours alone. We never hold a model you pay us for.",
  },
  {
    rung: "Your cloud or your rack.",
    status: "Scoped with you",
    body: "The whole system inside your cloud account or the rack in your office. Same software, your infrastructure, our help setting it up.",
  },
  {
    rung: "Nothing leaves the building.",
    status: "Call us",
    body: "No outside model, no outside connection in the memory\u2019s path. If that is your requirement, call us. It is the deployment the architecture was built for, and we scope it by hand.",
  },
]

const OWN_FACTS = [
  {
    title: "Your data sits in plain Postgres.",
    body: "Your data sits in plain Postgres you can read with any tool you already own.",
  },
  {
    title: "No training, ever.",
    body: "LongStrider has no training code. It learns by filing what your people say into the record, which is why nothing has to be re-taught when you change models.",
  },
  {
    title: "Switch anything, lose nothing.",
    body: "Change the model, the host or the hardware. The memory stays exactly where you left it. We moved every job to a different model in October; the memory didn't notice.",
  },
  {
    title: "Fire us and keep everything.",
    body: "Cancel support and the system keeps working. The license doesn't expire, the keys are yours, and the rows are yours.",
  },
  {
    title: "Nothing goes out in your name until you say yes.",
    body: "Nothing goes out in your name until a person says yes, and the yes is on the record. The AI drafts and proposes; your people decide.",
  },
  {
    title: "One record, not five AI tools.",
    body: "Experts and agents work from the same record, and every one of them makes it richer. A correction in chat changes what the overnight pass believes.",
  },
]

export default function OwnItPage() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap">
          <div>
            <p className="lx-eyebrow" data-rise="0">
              Sovereign by design. Software you own.
            </p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Your model. Your machine. Own <em>all</em> of it.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider is licensed software, not a subscription you rent. The money you’d have spent on
              seats buys something your company owns, on your books, not a bill every month. Your own key
              from day one, your own model on your own machine, hosted by us or in your rack. The memory
              never moves, so nothing is ever re-taught.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Talk to us <span className="lx-arrow" aria-hidden>→</span>
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
              {p.cost ? <p className="lx-label lx-label-quiet own-cost">{p.cost}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <MemoryStays />

      <section className="hx-section hx-deep" id="ladder">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> The ladder
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Your keys. Your model. Your <em>machine</em>.
          </h2>
          <p className="lx-lead" data-reveal data-delay="2">
            Five ways to run it, in the order most companies take them. Every one runs the same
            record. Moving between them never moves the memory.
          </p>
        </div>
        <div className="lx-wrap own-ladder" aria-label="Five ways to run it">
          {LADDER.map((r, i) => (
            <div key={r.rung} className="lx-card-flat own-rung" data-reveal data-delay={String((i % 3) + 1)}>
              <div className="own-rung-head">
                <span className="lx-label own-rung-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{r.rung}</h3>
                <span className="lx-label own-status">{r.status}</span>
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
              history. It is filed into the record in days and useful the week it lands: dated,
              sourced, scoped to who it belongs to.
            </p>
          </div>
          <div className="own-modelbox" data-reveal data-delay="2" aria-label="Why there is no training step">
            <p className="own-modelbox-title">&ldquo;How long does it take to train?&rdquo;</p>
            <p>
              There is no training step. LongStrider learns by filing what your people say into a
              record you own, so it is useful the week you import, and nothing has to be re-taught
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
        <FilmStill src="/art/film-dune.jpg" alt="A dune of memory with a gold road along its foot." />
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring us your hardest <em>question</em>.
          </h2>
          <p className="lx-lead" data-reveal data-delay="1">
            An hour, your people, one real question from your business. You leave knowing what your
            company would own, and which rung of the ladder it would start on.
          </p>
          <p className="lx-lead hx-lead-center pf-buyer" data-reveal data-delay="1">
            Methods built inside a chat box can stop being yours. Built here, they stay yours: your keys, your record, your license.
          </p>
          <div className="lx-cta-row" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Talk to us <span className="lx-arrow" aria-hidden>→</span>
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
