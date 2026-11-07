import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import "./partners.css"

export const metadata: Metadata = pageMeta("/partners", "Partners · Your client’s memory, your method", "For consultancies and service firms: deploy it, build on it, or lead the work. The engine is ours. The vertical knowledge is yours.")

/**
 * Partners: for consultancies, managed service providers and engineering firms.
 * The promise is that the client owns their memory and the partner owns their method.
 */

const STACK = [
  {
    who: "Your client’s",
    what: "Their memory.",
    body: "Every fact, decision and correction, on their instance, theirs to keep.",
    tone: "client",
  },
  {
    who: "Yours",
    what: "Your method.",
    body: "Vertical configurations, specialist playbooks, integrations, the relationship.",
    tone: "partner",
  },
  {
    who: "Ours",
    what: "The engine.",
    body: "The record, the overnight pass, the judgment and the rules layer.",
    tone: "ours",
  },
]

const SIGNALS = [
  {
    text: "88% of organizations now use AI in at least one function. About 37% see any profit from it.",
    source: "McKinsey, State of AI, 2025 and 2026",
    href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
  },
  {
    text: "Gartner forecasts $761 billion of spending on AI services in 2027 alone.",
    source: "Gartner, January 2026",
    href: "https://www.gartner.com/en/newsroom/press-releases/2026-01-22-gartner-forecasts-worldwide-ai-spending-to-reach-nearly-3-trillion-by-2027",
  },
  {
    text: "Accenture booked $5.9 billion of generative AI work in fiscal 2025.",
    source: "Accenture 8-K, September 2025",
    href: "https://www.accenture.com/us-en/investor-relations",
  },
]

const WAYS = [
  {
    name: "Deploy and maintain.",
    body: "Run it for your clients as a managed service. Deploy into each client’s instance, keep it healthy and configured, recurring work instead of one-off projects.",
  },
  {
    name: "Wrap and extend.",
    body: "Build your vertical on the engine. Configurations for your industry, specialists that carry your playbook, sold as your own offering.",
  },
  {
    name: "Advise and transform.",
    body: "Lead the knowledge work itself. Design what a client should keep, govern who sees what, evolve it as the business changes.",
  },
  {
    name: "Private equity operating partners.",
    body: "One operating partner, ten to thirty portfolio companies, one memory engine each. We treat PE as a partner channel, not a customer segment, because that’s how the buying actually works.",
  },
]

const ARC = [
  {
    time: "Day one.",
    body: "It starts learning from the first conversation and the documents your client brings. Nobody fills it in by hand.",
  },
  {
    time: "Ninety days.",
    body: "A working model of the business: decisions and their outcomes, relationships, patterns only visible across months.",
  },
  {
    time: "One year.",
    body: "It knows more than any recent hire. It doesn’t leave, doesn’t take competing offers, and doesn’t need an exit interview.",
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
              Your client owns their memory. You own your <em>method</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider is the engine consultancies, managed service providers and engineering firms deploy for clients,
              build services on, and run as recurring work, without writing a line of AI infrastructure. The engine is ours.
              The vertical knowledge and the relationship are yours.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Start the conversation <span className="lx-arrow" aria-hidden>→</span>
              </Link>
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

      {/* 01: The shift */}
      <section className="hx-section hx-deep" id="shift">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> The shift
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            There&rsquo;s one layer AI won&rsquo;t <em>commoditize</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Agents now do in hours what took teams weeks, and clients are asking sharper questions about what they pay for.
            What no model knows and no vendor ships is the memory of one specific company: its decisions, its
            relationships, what it learned the hard way. The firms that build that for their clients will own their
            vertical.
          </p>
        </div>
        <ul className="lx-wrap pt-sig">
          {SIGNALS.map((s, i) => (
            <li key={s.source} data-reveal data-delay={String(i + 1)}>
              <span>{s.text}</span>
              <a className="pt-source" href={s.href} target="_blank" rel="noreferrer">
                ({s.source})
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 02: Ways to partner */}
      <section className="hx-section" id="ways">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> Three ways to partner
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Deploy it, build on it, or lead the <em>work</em>.
          </h2>
        </div>
        <div className="lx-wrap sw-grid pt-ways pt-ways-four">
          {WAYS.map((w, i) => (
            <article key={w.name} className="sw-card lx-card" data-reveal data-delay={String(i + 1)}>
              <h3>{w.name}</h3>
              <p className="sw-line">{w.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 03: What the client gets */}
      <section className="hx-section hx-deep" id="arc">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">03</span> What your client gets
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            A project that doesn&rsquo;t end. An asset that keeps <em>growing</em>.
          </h2>
        </div>
        <ol className="lx-wrap nt-line pt-arc pt-arc-three">
          {ARC.map((a, i) => (
            <li key={a.time} className="nt-step" data-reveal data-delay={String(i + 1)}>
              <span className="nt-time">{a.time}</span>
              <p>{a.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04: The deal */}
      <section className="hx-section" id="deal">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">04</span> The deal
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Clients stay because the work keeps getting better, not because they&rsquo;re <em>locked in</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Their memory is theirs, on their instance. What you build on the engine, your configurations, your specialists, your
              way of running the practice, is yours to take to every client in your vertical.
            </p>
          </div>
          <ul className="pt-terms" data-reveal data-delay="2">
            <li>
              <span>Selective.</span>A small number of partners per vertical.
            </li>
            <li>
              <span>Direct.</span>You work with the founding team from day one.
            </li>
            <li>
              <span>Where they need it.</span>Hosted now; private cloud and on-premises built together.
            </li>
          </ul>
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Build the memory practice in your <em>vertical</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Tell us your clients, your industry and the problem you keep seeing. We&rsquo;ll show you what a first
            deployment looks like.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Start the conversation <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/how-it-works">
              Review the architecture
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
