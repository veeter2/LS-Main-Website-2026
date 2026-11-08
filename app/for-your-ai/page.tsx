import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { AskYourAI } from "../_components/ask-your-ai"
import { CHECKS, NOT, ORGANS } from "@/lib/for-your-ai"

export const metadata: Metadata = pageMeta(
  "/for-your-ai",
  "Ask your own AI about LongStrider",
  "The plain facts about LongStrider, written for the AI you already use, and three prompts to paste into ChatGPT, Claude, Gemini, Perplexity or Copilot for an honest read.",
)

/**
 * The human-readable twin of /llms.txt: the same facts, for people, plus the
 * three prompts. Everything here comes from lib/for-your-ai.
 */
export default function ForYourAI() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap fy-wrap">
          <p className="lx-eyebrow" data-rise="0">For your AI</p>
          <h1 className="lx-display lx-h1" data-rise="1">
            Don&rsquo;t take our word for it. Ask your <em>own</em> AI.
          </h1>
          <p className="lx-lead" data-rise="2">
            Most buyers now have an AI read a vendor before they do. Good. This page is the plain version of what
            we&rsquo;d want it to know, and the same prompts the homepage offers. The machine-readable twin is at{" "}
            <a className="fy-mono" href="/llms.txt">/llms.txt</a>.
          </p>
          <div className="lx-cta-row" data-rise="3">
            <a className="lx-btn lx-btn-primary" href="#prompts">
              Copy a prompt <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <Link className="lx-btn lx-btn-ghost" href="/book">
              Or book a working session
            </Link>
          </div>
        </div>
      </section>

      <section className="hx-section hx-deep" id="what">
        <div className="lx-wrap fy-wrap">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> What it is
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Company memory for <em>AI</em>.
          </h2>
          <p className="fy-lead" data-reveal data-delay="2">
            Facts, promises and decisions a company puts into AI, kept with their source, owned by the company, answered
            by any model. People talk to it like a chat; it keeps what they say as dated records with a source. Each
            record is scoped to the person it came from. Counts and dates in answers come from the record, not estimates.
            Every reply shows receipts: which conversation, which date.
          </p>
          <p className="fy-lead" data-reveal data-delay="2">Seven things run on that record:</p>
          <ol className="mm-rows" data-reveal data-delay="3" aria-label="Seven things that run on the memory">
            {ORGANS.map((o, i) => (
              <li key={o.name} className="mm-row">
                <span className="mm-n lx-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="mm-name">{o.name}</span>
                <p className="mm-body">{o.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hx-section" id="not">
        <div className="lx-wrap fy-wrap">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> What it is not
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Three things it <em>isn&rsquo;t</em>.
          </h2>
          <ul className="fy-list" data-reveal data-delay="2">
            {NOT.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hx-section hx-deep" id="facts">
        <div className="lx-wrap fy-wrap">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">03</span> Facts a buyer checks
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            The short <em>answers</em>.
          </h2>
          <ul className="fy-list" data-reveal data-delay="2">
            {CHECKS.map((c) => (
              <li key={c.label}>
                <b>{c.label}.</b> {c.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hx-section" id="prompts">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> The prompts
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Paste one into the AI you already <em>use</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            ChatGPT, Claude, Gemini, Perplexity or Copilot. It reads our pages, pulls in what it already knows about your
            company, and tells you where LongStrider fits and where it doesn&rsquo;t.
          </p>
        </div>
        <div className="lx-wrap ay-wrap" data-reveal data-delay="2">
          <AskYourAI compact />
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Then bring us what it <em>said</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            An hour, your people, one real question, and whatever your AI flagged. You leave knowing whether it&rsquo;s
            worth building and what you&rsquo;d own.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/product">
              What it does
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
