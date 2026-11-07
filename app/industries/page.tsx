import "./industries.css"
import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { IndustryAsk } from "./industry-ask"

export const metadata: Metadata = pageMeta("/industries", "For insurance, legal and professional services", "Where what people know is the business. Keep adjuster judgment, partner knowledge and client history when the people leave.")

type Vertical = {
  id: string
  name: string
  line: React.ReactNode
  lead: string
  stat?: string
  breaks: { title: string; body: string }[]
  owns: string
  signs: string
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
    lead: "Decades of adjuster judgment, edge-case precedent and carrier-specific exceptions live in people. When they leave, the reasoning leaves with them. In a business where inconsistency means bad-faith and E&O exposure, that isn\u2019t an inconvenience.",
    stat: "Nearly a quarter of claims adjusters are expected to retire by the end of 2027, and 73% of insurance professionals say the biggest impact will be the loss of institutional knowledge. (Sedgwick, 2026 Loss Adjusting Insights, via Risk & Insurance)",
    breaks: [
      {
        title: "A retirement resets judgment.",
        body: "A twenty-year adjuster leaves with the edge cases that never made it into the manual.",
      },
      {
        title: "Exceptions get rediscovered.",
        body: "How the last one was resolved lives in an email thread nobody can find.",
      },
      {
        title: "The reasoning stays behind.",
        body: "When a book moves, the data goes with it. Why it was priced that way doesn\u2019t.",
      },
    ],
    owns: "Every exception, and how it was resolved. The reasoning behind each reserve and settlement. What each retiring adjuster knew, confirmed by them while they were still here.",
    signs: "The chief claims officer owns the pain. The CIO owns the budget. Compliance has the final word, and the NAIC AI bulletin now adopted in about half the states asks them to document exactly how an AI system is governed. Every write in LongStrider is receipted and undoable. That\u2019s the audit trail.",
  },
  {
    id: "legal",
    name: "Legal",
    line: (
      <>
        Practice knowledge shouldn&rsquo;t retire when partners <em>do</em>.
      </>
    ),
    lead: "Law firms don\u2019t have an AI problem. They have a continuity problem. The tools can retrieve and draft. None of them remember which concessions were deliberate, which positions the firm approved, or what the client said privately.",
    stat: "US law firms recorded 3,009 lateral partner moves in 2025, a five-year high. (Global Legal Post, 2026)",
    breaks: [
      {
        title: "Partners leave with the context.",
        body: "Decades of client history, negotiating posture and approved risk positions walk out together.",
      },
      {
        title: "Approved precedent gets rediscovered.",
        body: "The prior sign-off is buried in a closed file, so the work is done again.",
      },
      {
        title: "Handoffs lose the reasoning.",
        body: "The new team gets the documents and none of the strategy behind them.",
      },
    ],
    owns: "The firm\u2019s approved positions, and when they changed. The strategy behind every matter. What each partner knew about each client.",
    signs: "The CKO or director of knowledge management owns it. The managing partner signs. The general counsel approves, and ABA Opinion 512 makes confidentiality the first question. Every fact in LongStrider is scoped to the matter team, in the database, and a read outside that scope returns nothing.",
  },
  {
    id: "professional-services",
    name: "Professional services",
    line: (
      <>
        Your product is what your people <em>know</em>.
      </>
    ),
    lead: "Every method, every relationship, every hard-won pattern lives in people. Firms are using AI on 44% of projects now, up from 23% a year ago, and 85% say it saves time. Only 30% say it makes money. (SPI Research, 2026) Savings don\u2019t compound. A record does.",
    breaks: [
      {
        title: "The method lives in the partner.",
        body: "The way you run an engagement was never written down because the person who invented it is still running it.",
      },
      {
        title: "The client memory lives in the lead.",
        body: "Three years of \u201cwhat they actually care about\u201d goes with whoever had the relationship.",
      },
      {
        title: "Every new hire starts cold.",
        body: "Six months to learn what the firm already knew.",
      },
    ],
    owns: "The method, as it\u2019s actually practiced. Every client\u2019s history, with the promises kept and the ones that weren\u2019t. A new hire\u2019s first week that starts where the last person\u2019s left off.",
    signs: "The COO or head of delivery. The managing partner signs. In a 60-person firm that\u2019s often the same two people in one room, which is why the working session is an hour.",
  },
]

export default function IndustriesConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Who it&rsquo;s for</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Where what people know <em>is</em> the business.
            </h1>
            <p className="lx-lead" data-rise="2">
              Built for work where judgment lives in people, mistakes are expensive, and the reasoning behind a decision
              matters as much as the decision.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </Link>
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
            <p className="lx-illustrative">
              Real behavior. Fictional companies. These answers come from notes and files your people put in;
              LongStrider doesn&rsquo;t read a claims system or a DMS on its own yet.
            </p>
          </div>
        </div>
      </section>

      {VERTICALS.map((v, i) => (
        <section key={v.id} className={`hx-section${i % 2 === 0 ? " hx-deep" : ""}`} id={v.id}>
          <div className="lx-wrap lx-hero-grid in-grid">
            <div>
              <p className="lx-eyebrow" data-reveal>
                <span className="hx-step">{String(i + 1).padStart(2, "0")}</span> &middot; {v.name}
              </p>
              <h2 className="lx-display hx-h2" data-reveal data-delay="1">
                {v.line}
              </h2>
              <p className="lx-lead" data-reveal data-delay="2">
                {v.lead}
              </p>
              {v.stat && (
                <blockquote className="in-quote" data-reveal data-delay="3">
                  {v.stat}
                </blockquote>
              )}
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
                <p>{v.owns}</p>
              </div>
              <p className="in-signs">
                <b>Who signs.</b> {v.signs}
              </p>
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
            A working session with your people and one real question from your business: a claim, a matter, an engagement.
            You&rsquo;ll see what LongStrider would keep, and what your company would own.
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
