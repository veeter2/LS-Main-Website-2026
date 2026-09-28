import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Partners — concept" }

/**
 * Partners: for consultancies and engineering firms. Built from the partner
 * brief, minus its fictional client quote, its internal counts and its
 * "clients can't leave" framing — the promise here is that the client owns
 * their memory and the partner owns their method.
 */

const STACK = [
  {
    who: "Your client's",
    what: "Their memory",
    body: "Every fact, decision and correction — on their infrastructure, theirs to keep.",
    tone: "client",
  },
  {
    who: "Yours",
    what: "Your method",
    body: "Vertical configurations, specialist playbooks, integrations and the relationship.",
    tone: "partner",
  },
  {
    who: "Ours",
    what: "The engine",
    body: "The record, the overnight tidy, the judgement and the rules layer underneath.",
    tone: "ours",
  },
]

const SIGNALS = [
  {
    n: "78%",
    label: "of organisations use AI in at least one business function",
    source: "McKinsey Global Survey on AI, 2025",
    href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
  },
  {
    n: "$761B",
    label: "forecast spend on AI services by 2027",
    source: "Gartner AI spending forecast, January 2026",
    href: "https://www.gartner.com/en/newsroom/press-releases/2026-01-22-gartner-forecasts-worldwide-ai-spending-to-reach-nearly-3-trillion-by-2027",
  },
  {
    n: "$5.9B",
    label: "in generative AI bookings at a single firm in one year",
    source: "Accenture FY2025 Annual Report",
    href: "https://www.accenture.com/us-en/investor-relations",
  },
]

const WAYS = [
  {
    name: "Deploy & maintain",
    line: "Run it for your clients as a managed service.",
    points: ["Deploy into each client's environment", "Keep it healthy and configured", "Recurring work, not one-off projects"],
  },
  {
    name: "Wrap & extend",
    line: "Build your vertical on top of the engine.",
    points: ["Configurations for your industry", "Specialists that carry your playbook", "Sellable as your own offering"],
  },
  {
    name: "Advise & transform",
    line: "Lead the knowledge work itself.",
    points: ["Design what a client should keep", "Govern who sees what", "Evolve it as the business changes"],
  },
]

const ARC = [
  {
    time: "Day one",
    title: "It starts learning",
    body: "From the first conversation, and from the documents your client brings. Nobody has to fill it in by hand.",
  },
  {
    time: "Ninety days",
    title: "A working model of the business",
    body: "Decisions and their outcomes, relationships, and patterns only visible across months of work.",
  },
  {
    time: "One year",
    title: "It knows more than any recent hire",
    body: "It does not leave. It does not take competing offers. It does not need an exit interview.",
  },
  {
    time: "Three years",
    title: "An asset with provable value",
    body: "A documented institutional memory, owned by the client, that shows up in due diligence.",
  },
]

export default function PartnersConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Partners</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Help your clients build something that gets more <em>valuable</em> every year.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider is the engine consultancies and engineering firms deploy, build services on, and run as recurring
              work — without writing a line of AI infrastructure. The substrate is ours. The vertical IP is completely
              yours.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/pilot">
                Start the conversation <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#ways">
                Three ways to partner
              </a>
            </div>
          </div>
          <div data-rise="2">
            <div className="pt-stack" aria-label="Who owns which part">
              {STACK.map((s) => (
                <div key={s.what} className="pt-layer" data-tone={s.tone}>
                  <span className="pt-who">{s.who}</span>
                  <span className="pt-what">{s.what}</span>
                  <span className="pt-body">{s.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 01 — The shift */}
      <section className="hx-section hx-deep" id="shift">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> The shift
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            There&rsquo;s one layer AI will never <em>commoditise</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Agents now do in hours what took teams weeks, and clients are asking sharper questions about what they pay for.
            What no model knows and no vendor ships is the memory of one specific organisation — its decisions, its
            relationships, what it learned the hard way. The firms that build that for their clients will lead their
            vertical.
          </p>
        </div>
        <div className="lx-wrap rn">
          {SIGNALS.map((s, i) => (
            <div key={s.n} className="rn-item" data-reveal data-delay={String(i + 1)}>
              <span className="rn-n lx-num">{s.n}</span>
              <span className="rn-label">{s.label}</span>
              <a className="pt-source" href={s.href} target="_blank" rel="noreferrer">
                {s.source}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 02 — Ways to partner */}
      <section className="hx-section" id="ways">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> Three ways to partner
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Deploy it, build on it, or lead the <em>work</em>.
          </h2>
        </div>
        <div className="lx-wrap sw-grid pt-ways">
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

      {/* 03 — What the client gets */}
      <section className="hx-section hx-deep" id="arc">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">03</span> What your client gets
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Not a project that ends. An asset that <em>compounds</em>.
          </h2>
        </div>
        <ol className="lx-wrap nt-line pt-arc">
          {ARC.map((a, i) => (
            <li key={a.time} className="nt-step" data-reveal data-delay={String(i + 1)}>
              <span className="nt-time">{a.time}</span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 — The deal */}
      <section className="hx-section" id="deal">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">04</span> The deal
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Your client owns their memory. You own your <em>method</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Clients stay because the work keeps getting better — not because they&rsquo;re locked in. Their memory is
              theirs, on their infrastructure. What you build on the engine — your configurations, your specialists, your
              way of running the practice — is yours to take to every client in your vertical.
            </p>
          </div>
          <ul className="pt-terms" data-reveal data-delay="2">
            <li>
              <span>Selective</span>A small number of partners per vertical
            </li>
            <li>
              <span>Direct</span>Working with the founding team from day one
            </li>
            <li>
              <span>Sovereign</span>Deploy hosted, in the client&rsquo;s cloud, or fully on-premises
            </li>
          </ul>
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Build the intelligence practice in your <em>vertical</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Tell us your clients, your industry and the problem you keep seeing. We&rsquo;ll show you what a first
            deployment looks like.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <a className="lx-btn lx-btn-primary" href="/pilot">
              Start the conversation <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <Link className="lx-btn lx-btn-ghost" href="/concepts/how-it-works">
              Review the architecture
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
