import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { FilmStill } from "./_components/film-still"
import { AskYourAI } from "./_components/ask-your-ai"
import { HeroVideo } from "./_components/hero-video"
import { ReceiptCard } from "./_components/proof-cards"

export const metadata: Metadata = {
  ...pageMeta(
    "",
    "The model changes. The memory is yours.",
    "A system of intelligence your company owns. It takes what your people, systems and files already know, learns every day, and any model you choose answers from it.",
  ),
  title: { absolute: "LongStrider · The model changes. The memory is yours." },
}

/**
 * Homepage v2 (Concept A, 2026-11-11): the enemy in the headline, the three
 * "not a" lines as the subhead, then the whole room. No stats anywhere; the
 * figures live in the briefs. The hero is the concept film (rendered from
 * /video); the section stills are gone. Names match the app's tabs.
 */

// Said as a buyer asks it. The "no" is the short answer; the sentence after it is the real one.
const NOT_THIS = [
  { no: "Not a chatbot.", yes: "A brain your company owns. Chat is one door into it." },
  { no: "Not a harness.", yes: "The memory and the judgment live here. The model is only the voice." },
  { no: "Not a wrapper around one model.", yes: "Any model, through your own keys. Swap it and nothing is re-taught." },
  { no: "Not rented.", yes: "Software you own, on your machines or ours. A cost you capitalize, not a bill forever." },
  { no: "Not a search box.", yes: "A memory that counts, dates and sources every fact, and says when it is unsure." },
  { no: "Not one person\u2019s assistant.", yes: "Private memory for each person, shared memory for the company, both in one place." },
]

const BUYERS = [
  { who: "For the CFO", title: "An AI budget that ends in an asset, not a renewal.", href: "/for/finance" },
  { who: "For the CTO", title: "Postgres, row-level scoping, any model through your keys. Open it up.", href: "/for/technology" },
  { who: "For compliance", title: "Every read checked against who’s asking. Every write leaves a receipt: what changed, who, when.", href: "/security" },
  { who: "For your team", title: "Stop explaining your job to a chat window every morning.", href: "/for/teams" },
]

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="lx-hero hx-home">
        <div className="lx-wrap hx-center">
          <h1 className="lx-display lx-h1 mh-h1" data-rise="1">
            The model changes. The memory is <em>yours</em>.
          </h1>
          <p className="lx-lead hx-lead-center mh-nots" data-rise="2">
            LongStrider is a system of intelligence your company owns. It takes what your people, your systems and your
            files already know, learns from it every day, and any model you choose answers from it.
          </p>
          <div className="lx-cta-row hx-cta-center" data-rise="3">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Talk to us <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/product">
              See what it does
            </Link>
          </div>
        </div>
        <div className="lx-wrap" data-rise="4">
          <HeroVideo />
          <p className="lx-lead hx-lead-center mh-sovereign">
            <Link href="/own-it">
              <strong>Sovereign by design.</strong> Your box, your models, your keys.
            </Link>
          </p>
        </div>
      </section>

      {/* 01: One memory */}
      <section className="hx-section hx-deep" id="room">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> One memory
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            One room. Everything your company knows about <em>itself</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Eight parts, one memory underneath all of them. Take the memory away and they&rsquo;re the same tools everyone
            else sells. Keep it, and every one of them gets better each month, because the memory does.
          </p>
        </div>
        <div className="lx-wrap">
          <p className="mm-foot" data-reveal>
            All eight read one memory. That&rsquo;s what you license, and that&rsquo;s what you own.{" "}
            <Link href="/product">What it does →</Link>
          </p>
        </div>
      </section>

      {/* 02: How it's different */}
      <section className="hx-section" id="different">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> How it&rsquo;s different
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Other systems feed memory to the model. This one owns the memory and decides when the model is worth{" "}
            <em>calling</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            The memory does the remembering. The model only supplies the words. That is why the bill is smaller, the
            answers are backed, and nothing is taught twice.
          </p>
        </div>
        <div className="lx-wrap">
          <ul className="hx-not" data-reveal>
            {NOT_THIS.map((n) => (
              <li key={n.no}>
                <span className="hx-not-no">
                  <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 7l10 10M17 7L7 17" /></svg>
                  {n.no}
                </span>
                <span className="hx-not-yes">
                  <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  {n.yes}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lx-wrap pf-wrap pf-wrap-home" data-reveal>
          <ReceiptCard compact />
          <p className="lx-illustrative">Every answer comes with its receipt. Click any line and it opens.</p>
        </div>
      </section>

      {/* 03: Where it runs */}
      <section className="hx-section hx-deep" id="where">
        <FilmStill src="/art/film-sun.jpg" alt="The model as a sun over the memory: it lights the land, it does not own it." />
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">03</span> Where it runs
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Your box, your models, your keys. Nothing leaves the <em>building</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Or a cloud model through your own keys. Same product either way. You stop renting AI and start owning it: an asset on your books, not a bill every month. Fire us and keep everything.
          </p>
        </div>
      </section>

      {/* Ask your own AI */}
      <section className="hx-section" id="ask">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            Don&rsquo;t take our word for it
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Ask your <em>own</em> AI.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Paste one prompt into ChatGPT, Claude, Gemini, Perplexity or Copilot. It reads our pages, pulls in what it
            already knows about your company, and tells you where LongStrider fits and where it doesn&rsquo;t.
          </p>
        </div>
        <div className="lx-wrap ay-wrap" data-reveal data-delay="2">
          <AskYourAI strip />
        </div>
      </section>

      {/* Who it's for */}
      <section className="hx-section hx-deep" id="buyers">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            Who it&rsquo;s for
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Four people have to say <em>yes</em>.
          </h2>
        </div>
        <div className="lx-wrap">
          <div className="lx-doors-grid mh-doors mh-doors-4">
            {BUYERS.map((d, i) => (
              <Link key={d.who} href={d.href} className="lx-door" data-reveal data-delay={String(i + 1)}>
                <span className="lx-eyebrow">{d.who}</span>
                <h3>{d.title}</h3>
                <span className="lx-more">
                  Read more <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="hx-close" id="company">
        <FilmStill src="/art/film-strider.jpg" alt="The strider walks the road along the memory, the arch of the record behind." />
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring us your <em>hardest</em> problem.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Tell us what your business does and the question your team can&rsquo;t answer today. We&rsquo;ll show you
            what LongStrider would keep: the memory, the promises and the first morning note.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Talk to us <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/own-it">
              Not SaaS? See how you own it
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
