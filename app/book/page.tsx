import type { Metadata } from "next"
import { BrandArt } from "../_components/brand-art"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { SessionForm } from "./session-form"

export const metadata: Metadata = pageMeta("/book", "Book a working session", "An hour, your people, one real question. You leave knowing whether it’s worth building and what you’d own. Not a demo, a working session.")

const STEPS = [
  { title: "Bring one real question.", body: "A client, a claim, a matter, an engagement. Something your team can’t answer quickly today." },
  { title: "Watch it become a record.", body: "We show what LongStrider keeps from your own material: the facts, the promises, the sources." },
  { title: "See what you’d own.", body: "Where it would run, who could see what, and what your company would have ninety days in." },
]

export default function BookConcept() {
  return (
    <main>
      <section className="lx-hero bk-hero">
        <div className="lx-wrap lx-hero-grid bk-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">BOOK</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Not a demo. A working session on your problem.
            </h1>
            <p className="lx-lead" data-rise="2">
              An hour with the people who built LongStrider, your people, and one real question. You leave knowing whether
              it&rsquo;s worth building, and what you&rsquo;d own if it is.
            </p>
            <ol className="bk-steps" data-rise="3">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="bk-n lx-num">{i + 1}</span>
                  <div>
                    <h2>{s.title}</h2>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div data-rise="2">
            <SessionForm />
          </div>
        </div>
      </section>

      <section className="hx-section hx-deep">
        <BrandArt name="arch" />
        <p className="lx-wrap mh-question" data-reveal>
          Rather see it first? Three annotated screens, no sales call.{" "}
          <Link href="/product">See it answer</Link>
        </p>
      </section>
    </main>
  )
}
