import Link from "next/link"

const DOORS = [
  {
    who: "For the CFO",
    title: "An AI line item that's worth more every month.",
    body: "What your team teaches it stays. No re-explaining, no starting over when you change vendors, and answers you can check against the record.",
    href: "/concepts/learning-gap",
  },
  {
    who: "For the CTO",
    title: "One memory layer. Your choice of model.",
    body: "Memory lives in one place you control, scoped to each person. Models plug in behind it and can be swapped without losing what's been learned.",
    href: "/concepts/owned",
  },
  {
    who: "For your team",
    title: "Stop re-explaining. Start from what's known.",
    body: "It remembers the people, the decisions and the promises, and keeps them in front of you until they're done.",
    href: "/concepts/commitments",
  },
]

export function Doors() {
  return (
    <>
      <section className="lx-doors" id="product" aria-label="Who it's for">
        <div className="lx-wrap lx-doors-grid">
          {DOORS.map((d, i) => (
            <Link key={d.who} href={d.href} className="lx-door" data-reveal data-delay={String(i + 1)}>
              <span className="lx-eyebrow">{d.who}</span>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
              <span className="lx-more">
                Read more <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <footer className="lx-foot">
        <div className="lx-wrap">
          Concept preview, not published. Examples on this page are illustrative. <Link href="/concepts">All concepts</Link>
        </div>
      </footer>
    </>
  )
}
