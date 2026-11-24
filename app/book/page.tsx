import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { SessionForm } from "./session-form"

export const metadata: Metadata = pageMeta("/book", "Talk to us", "Tell us what your business does and the question your team can’t answer today. We show you what LongStrider would keep, and what you’d own.")

const STEPS = [
  { title: "Tell us what you do.", body: "Legal is not insurance, and neither is a services firm. The first call is us learning your business and the question your team can’t answer today." },
  { title: "See it on something like yours.", body: "We show the real product on work like yours: the facts it keeps, the promises it catches, the receipts under each answer." },
  { title: "Decide if it’s worth building.", body: "If it is, we scope it with you in writing: where it runs, what connects, and what your company would own." },
]

export default function BookConcept() {
  return (
    <main>
      <section className="lx-hero bk-hero">
        <div className="lx-wrap lx-hero-grid bk-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Talk to us</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Tell us what you do. We&rsquo;ll show you what it would keep.
            </h1>
            <p className="lx-lead" data-rise="2">
              A call with the people who built LongStrider. You bring what your business does and one real question. You
              leave knowing whether it&rsquo;s worth building, and what you&rsquo;d own if it is.
            </p>
          </div>
          <div data-rise="2">
            <SessionForm />
          </div>
        </div>
        <ol className="lx-wrap bk-steps bk-steps-row" data-rise="3">
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
      </section>

      <section className="hx-section hx-deep">
        <p className="lx-wrap mh-question" data-reveal>
          Rather see it first? A short walk through the product, no sales call.{" "}
          <Link href="/product">See it answer</Link>{" "}
          Or see what owning it means: <Link href="/own-it">your cloud today, inside your walls when you&rsquo;re ready</Link>.
        </p>
      </section>
    </main>
  )
}
