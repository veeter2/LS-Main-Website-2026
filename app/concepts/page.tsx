import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Site preview" }

/**
 * The review map for the new site: every page grouped the way a visitor
 * meets it, so the team can walk it end to end before it goes live. The
 * earlier hero explorations sit at the bottom, kept for reference.
 */

const GROUPS = [
  {
    name: "The argument",
    pages: [
      { href: "/concepts/home", title: "Home", line: "You're building on rented land. Here's how to own what your company learns." },
      { href: "/concepts/manifesto", title: "The Manifesto", line: "The long read: the evidence, the moat, and what it looks like in the room." },
    ],
  },
  {
    name: "The product",
    pages: [
      { href: "/concepts/product", title: "What it does", line: "The record, the promises, the specialists, the overnight tidy, your agents." },
      { href: "/concepts/how-it-works", title: "How it works", line: "One sentence followed through the system, and the three layers." },
      { href: "/concepts/security", title: "Security & ownership", line: "Where it runs, who can see what, and whose keys." },
      { href: "/concepts/research", title: "Research", line: "The score we published, what we fixed, and where we're going." },
    ],
  },
  {
    name: "Who it's for",
    pages: [
      { href: "/concepts/industries", title: "Industries", line: "Insurance, legal and automotive: where judgement lives in people." },
      { href: "/concepts/for/finance", title: "For the CFO", line: "An AI budget that ends in an asset, not a renewal." },
      { href: "/concepts/for/technology", title: "For the CTO", line: "A memory layer your architects can inspect." },
      { href: "/concepts/for/teams", title: "For your team", line: "Stop explaining your job to a chat window every morning." },
      { href: "/concepts/partners", title: "Partners", line: "Your client owns their memory. You own your method." },
    ],
  },
  {
    name: "The company",
    pages: [
      { href: "/concepts/company", title: "Company", line: "Why we exist, and the four things we won't trade." },
      { href: "/concepts/book", title: "Book a session", line: "Not a demo. A working session on your problem." },
    ],
  },
]

const EARLIER = [
  { href: "/concepts/home-v1", name: "Homepage, record-first" },
  { href: "/concepts/record", name: "A · The Record" },
  { href: "/concepts/learning-gap", name: "B · The Learning Gap" },
  { href: "/concepts/owned", name: "C · Owned Memory" },
  { href: "/concepts/commitments", name: "D · Commitments" },
]

export default function ConceptsIndex() {
  return (
    <main className="lx-hero cx-index">
      <div className="lx-wrap">
        <p className="lx-eyebrow" data-rise="0">Site preview, for review</p>
        <h1 className="lx-display cx-h1" data-rise="1">
          The new LongStrider site, <em>in daylight</em>.
        </h1>
        <p className="lx-lead cx-lead" data-rise="2">
          Every page of the new site, grouped the way a visitor meets it. Lora throughout, the Manifesto&rsquo;s gold and
          spacing, and only claims the product can back today. Not public. Share the link, and every page is hidden from
          search.
        </p>

        <Link href="/concepts/home" className="cx-card cx-feature lx-card" data-rise="2">
          <span className="lx-eyebrow">Start here: the homepage</span>
          <span className="cx-line">Every dollar you spent on AI this year made someone else&rsquo;s platform smarter.</span>
          <span className="cx-why">
            Ownership first: you&rsquo;re building on rented land, knowledge walks out the door, and the record, the promises
            and the pushback are the proof. Not search. An asset.
          </span>
          <span className="cx-open">
            Open the homepage <span aria-hidden>→</span>
          </span>
        </Link>

        <div className="cx-map" data-rise="3">
          {GROUPS.map((g) => (
            <section key={g.name} className="cx-group" aria-label={g.name}>
              <span className="lx-eyebrow">{g.name}</span>
              <ul>
                {g.pages.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href}>
                      <span className="cx-map-title">{p.title}</span>
                      <span className="cx-map-line">{p.line}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <nav className="cx-pages" aria-label="Earlier explorations">
          <span className="lx-eyebrow">Earlier explorations</span>
          {EARLIER.map((e) => (
            <Link key={e.href} href={e.href}>
              {e.name}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}
