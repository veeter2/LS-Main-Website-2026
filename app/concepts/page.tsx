import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Hero concepts" }

const CONCEPTS = [
  {
    href: "/concepts/record",
    letter: "A",
    name: "The Record",
    line: "Ask what happened. Get the record, not a guess.",
    who: "Leads with the end user · proof for the CTO",
    why: "Owns the category's biggest complaint — AI that's almost right — with exact, sourced answers and the honesty to say “not yet.”",
  },
  {
    href: "/concepts/learning-gap",
    letter: "B",
    name: "The Learning Gap",
    line: "Most AI pilots stall for one reason. They forget.",
    who: "Leads with the CFO",
    why: "Builds on MIT's finding that 95% of AI pilots show no return because the tools don't learn. Nobody in the category uses it on their homepage.",
  },
  {
    href: "/concepts/owned",
    letter: "C",
    name: "Owned Memory",
    line: "The model is rented. The memory is yours.",
    who: "Leads with the CTO",
    why: "OpenAI, Anthropic and Microsoft all keep memory inside their own walls. This one says what you keep when you switch.",
  },
  {
    href: "/concepts/commitments",
    letter: "D",
    name: "Commitments",
    line: "It remembers who promised what, and by when.",
    who: "Leads with the people who use it daily",
    why: "Competitors store “facts” and “context.” Nobody sells promises kept — the thing a user feels every morning.",
  },
]

export default function ConceptsIndex() {
  return (
    <main className="lx-hero cx-index">
      <div className="lx-wrap">
        <p className="lx-eyebrow" data-rise="0">Homepage hero — four directions</p>
        <h1 className="lx-display cx-h1" data-rise="1">
          Same brand. Same Lora. <em>Daylight.</em>
        </h1>
        <p className="lx-lead cx-lead" data-rise="2">
          Four ways to open the site, each aimed at a different buyer. Every one keeps Lora, the Manifesto&rsquo;s gold
          and spacing, and says only what the product does today.
        </p>
        <Link href="/concepts/home" className="cx-card cx-feature lx-card" data-rise="2">
          <span className="lx-eyebrow">The homepage — all four, one story</span>
          <span className="cx-line">What it is → why you need it → what it&rsquo;s like → why it&rsquo;s safe to own.</span>
          <span className="cx-why">
            Leads with The Record, then the learning gap, the promise kept, and owned memory — one running example
            from top to bottom.
          </span>
          <span className="cx-open">
            Open the homepage <span aria-hidden>→</span>
          </span>
        </Link>
        <div className="cx-grid">
          {CONCEPTS.map((c, i) => (
            <Link key={c.href} href={c.href} className="cx-card lx-card" data-rise={String(i + 2)}>
              <span className="cx-letter">{c.letter}</span>
              <span className="lx-eyebrow">{c.name}</span>
              <span className="cx-line">{c.line}</span>
              <span className="cx-who">{c.who}</span>
              <span className="cx-why">{c.why}</span>
              <span className="cx-open">
                Open <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
