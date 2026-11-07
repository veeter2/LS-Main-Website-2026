import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"

export const metadata: Metadata = pageMeta("/company", "About LongStrider · Why we built it", "The industry built brilliant engines and gave them amnesia. We built the missing layer, and built it to belong to you. Here is why we built it.")

/**
 * Company: why LongStrider exists and how it works as a business.
 */

const CHARTER = ["You pay for it. You own it.", "Your data stays where you put it.", "What it learns compounds for you, not for a vendor."]

const PRINCIPLES = [
  {
    title: "Ownership first.",
    body: "Every design decision starts with one question: does the customer end up owning more? If not, we don’t build it that way.",
  },
  {
    title: "Plain words, true numbers.",
    body: "We say what it does in language anyone can check. When something isn’t built yet, the site says “not yet.”",
  },
  {
    title: "The record over the guess.",
    body: "When the evidence is thin, the honest answer is “I don’t know yet.” The system is built to say that, and so are we.",
  },
  {
    title: "Built with you, owned by you.",
    body: "We don’t sell seats. We build it alongside your team, and what gets built stays with the company that built it.",
  },
]

const PARTS = ["Anthropic", "OpenAI", "DeepSeek", "Ollama, or any OpenAI-compatible local server", "Postgres", "Next.js"]

export default function CompanyConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Company</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              We built this because nobody else <em>would</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              The industry built brilliant engines and gave them amnesia. Every AI conversation starts from zero, and every
              deployment needs your business explained again. That isn&rsquo;t a model problem. It&rsquo;s a missing layer.
              So we built it, and we built it to belong to you.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </Link>
              <Link className="lx-btn lx-btn-ghost" href="/manifesto">
                Read the manifesto
              </Link>
            </div>
          </div>
          <div data-rise="2">
            <article className="ch lx-card" aria-label="Our founding principle">
              <span className="ch-label">Founding principle</span>
              <ol>
                {CHARTER.map((c, i) => (
                  <li key={c}>
                    <span className="ch-n lx-num">{["I", "II", "III"][i]}</span>
                    <p>{c}</p>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      {/* 01: Why */}
      <section className="hx-section hx-deep" id="why">
        <div className="lx-wrap mh-story">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> Why we exist
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Software got rented back to you at a <em>markup</em>.
          </h2>
          <div className="mh-story-body" data-reveal data-delay="2">
            <p>
              For thirty years enterprise software ran the same play: charge for access, keep the intelligence, make leaving
              painful. Your data lives on their servers. Your workflows depend on their APIs. Your knowledge compounds, for
              them.
            </p>
            <p>
              Small and mid-sized companies paid the most for it, rebuilding from scratch every time they switched tools,
              every time a vendor changed its pricing, every time a model got replaced by a better one.
            </p>
          </div>
        </div>
        <blockquote className="lx-wrap cp-quote" data-reveal data-delay="2">
          &ldquo;AI without a memory it can&rsquo;t lose isn&rsquo;t intelligent. It&rsquo;s a very fast amnesiac.&rdquo;
        </blockquote>
      </section>

      {/* 02: How we got here */}
      <section className="hx-section" id="story">
        <div className="lx-wrap mh-story">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> How we got here
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            The pattern was always the <em>same</em>.
          </h2>
          <div className="mh-story-body" data-reveal data-delay="2">
            <p>
              Across enterprise software, AI rollouts and two previous companies, one problem kept surfacing. Companies
              building on AI platforms were creating knowledge that didn&rsquo;t belong to them. Every conversation taught the
              vendor. The customer got the bill.
            </p>
            <p>
              LongStrider started from one premise, that the memory has to be the customer&rsquo;s, and was built from the
              ground up to deliver it. A small team, building lean on purpose. Thirteen real people have used it every day
              since spring 2026, and it has kept about 222,000 facts for them so far. We&rsquo;d rather tell you that number
              than pretend it&rsquo;s thousands of companies.
            </p>
          </div>
        </div>
      </section>

      {/* 03: How we work */}
      <section className="hx-section hx-deep" id="principles">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">03</span> How we work
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Four things we won&rsquo;t <em>trade</em>.
          </h2>
        </div>
        <div className="lx-wrap gx-points cp-principles">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="gx-point" data-reveal data-delay={String(i + 1)}>
              <span className="gx-numeral">{["I", "II", "III", "IV"][i]}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04: Replaceable parts */}
      <section className="hx-section" id="parts">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">04</span> Replaceable parts
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Every part is <em>replaceable</em>. That&rsquo;s the design.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Run on a frontier model today and a local one tomorrow. The memory stays exactly where you left it, because the only
              part that has to be ours is the engine, and even that can move inside your walls.
            </p>
          </div>
          <ul className="cp-parts" data-reveal data-delay="2" aria-label="Components LongStrider runs with">
            {PARTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
            <li className="cp-parts-ours">Your memory: the one part that stays.</li>
          </ul>
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Build it <em>with</em> us.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            We work closely with a small number of companies at a time. If you want to own what your company learns, start
            with a working session.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/manifesto">
              Read the manifesto
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
