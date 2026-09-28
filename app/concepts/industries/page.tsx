import type { Metadata } from "next"
import Link from "next/link"
import { IndustryAsk } from "./industry-ask"

export const metadata: Metadata = { title: "Industries — concept" }

/**
 * Industries: insurance, legal and automotive only. Lines and scenarios come
 * from the existing briefs; their figures are kept illustrative and the
 * per-employee tracking idea from the automotive brief is left out.
 */

type Vertical = {
  id: string
  name: string
  line: React.ReactNode
  lead: string
  quote: string
  breaks: { title: string; body: string }[]
  owns: string[]
}

const VERTICALS: Vertical[] = [
  {
    id: "insurance",
    name: "Insurance",
    line: (
      <>
        The precedent is the real <em>policy</em>.
      </>
    ),
    lead: "Decades of adjuster judgement, edge-case precedent and carrier-specific exceptions live in people. When they leave, the reasoning leaves with them — and in a business where inconsistency means bad-faith and E&O exposure, that's not an inconvenience.",
    quote: "Copilots make individuals faster, not organisations smarter.",
    breaks: [
      {
        title: "A retirement resets judgement",
        body: "A twenty-year adjuster leaves with the edge cases that never made it into the manual.",
      },
      {
        title: "Exceptions get rediscovered",
        body: "How the last one was resolved lives in an email thread nobody can find.",
      },
      {
        title: "Underwriting reasoning stays behind",
        body: "When a book moves, the data goes with it. Why it was priced that way doesn't.",
      },
    ],
    owns: [
      "Every exception, and how it was resolved",
      "The reasoning behind each reserve and settlement",
      "What each retiring adjuster knew",
    ],
  },
  {
    id: "legal",
    name: "Legal",
    line: (
      <>
        Practice intelligence shouldn&rsquo;t retire when partners <em>do</em>.
      </>
    ),
    lead: "Law firms don't have an AI problem. They have a continuity problem. The tools can retrieve and draft — none of them remember which concessions were deliberate, which positions the firm approved, or what the client said privately.",
    quote: "Your tools can retrieve and generate. None of them remember.",
    breaks: [
      {
        title: "Partners leave with the context",
        body: "Decades of client history, negotiating posture and approved risk positions walk out together.",
      },
      {
        title: "Approved precedent gets rediscovered",
        body: "The prior sign-off is buried in a closed file, so the work is done again.",
      },
      {
        title: "Handoffs lose the reasoning",
        body: "The new team gets the documents — not the strategy behind them.",
      },
    ],
    owns: [
      "The firm's approved positions, and when they changed",
      "The strategy behind every matter",
      "What each partner knew about each client",
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    line: (
      <>
        Distribution does not guarantee <em>absorption</em>.
      </>
    ),
    lead: "Dealer networks don't lack information. They suffer from fragmented operational memory — guidance spread across portals, inboxes, PDFs, training and calls, with no view of what actually took hold in each store.",
    quote: "A network gets smarter only when what works in one store reaches the others.",
    breaks: [
      {
        title: "Five systems, one message",
        body: "Every initiative arrives through a different channel, and nobody sees the whole picture.",
      },
      {
        title: "No view of what stuck",
        body: "Leadership can't tell which stores acted, which misunderstood, and which worked around it.",
      },
      {
        title: "The field never talks back",
        body: "Repeated questions and local fixes don't flow up — so the next rollout repeats the last one's mistakes.",
      },
    ],
    owns: [
      "What worked, in which store, and why",
      "The questions the field keeps asking",
      "The local know-how that used to leave with people",
    ],
  },
]

export default function IndustriesConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Industries</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Where what people know <em>is</em> the business.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider is built for industries where judgement lives in people, mistakes are expensive, and the reasoning
              behind a decision matters as much as the decision itself.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/concepts/book">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </a>
            </div>
            <nav className="in-jump" data-rise="4" aria-label="Industries on this page">
              {VERTICALS.map((v) => (
                <a key={v.id} href={`#${v.id}`}>
                  {v.name}
                </a>
              ))}
            </nav>
          </div>
          <div data-rise="2">
            <IndustryAsk />
            <p className="lx-illustrative">Illustrative examples — pick an industry</p>
          </div>
        </div>
      </section>

      {VERTICALS.map((v, i) => (
        <section key={v.id} className={`hx-section${i % 2 === 0 ? " hx-deep" : ""}`} id={v.id}>
          <div className="lx-wrap lx-hero-grid in-grid">
            <div>
              <p className="lx-eyebrow" data-reveal>
                <span className="hx-step">{String(i + 1).padStart(2, "0")}</span> {v.name}
              </p>
              <h2 className="lx-display hx-h2" data-reveal data-delay="1">
                {v.line}
              </h2>
              <p className="lx-lead" data-reveal data-delay="2">
                {v.lead}
              </p>
              <blockquote className="in-quote" data-reveal data-delay="3">
                {v.quote}
              </blockquote>
            </div>
            <div className="in-side" data-reveal data-delay="2">
              <span className="in-label">Where it breaks today</span>
              <ul className="in-breaks">
                {v.breaks.map((b) => (
                  <li key={b.title}>
                    <h3>{b.title}</h3>
                    <p>{b.body}</p>
                  </li>
                ))}
              </ul>
              <div className="in-owns">
                <span className="in-label in-label-gold">What you&rsquo;d own</span>
                <ul>
                  {v.owns.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring the case that keeps you up at <em>night</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            A working session with your people and one real question from your business — a claim, a matter, a rollout.
            You&rsquo;ll see what LongStrider would keep, and what your company would own.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <a className="lx-btn lx-btn-primary" href="/concepts/book">
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
