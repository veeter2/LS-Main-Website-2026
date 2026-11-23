import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { FilmStill } from "./_components/film-still"
import { AskYourAI } from "./_components/ask-your-ai"
import { HeroVideo } from "./_components/hero-video"
import { ReceiptLive } from "./_components/receipt-live"

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

const ROOM = [
  { name: "Chat.", body: "Answers from what your company already knows, with a receipt under every reply." },
  { name: "Receipts.", body: "Click any answer and see what it used, what it cost, and who can see it." },
  { name: "Promises.", body: "Every “I’ll get that to you” is written down, with a name and a date." },
  { name: "Today.", body: "What moved, what slipped, what to do first. Written before you sit down." },
  { name: "Experts.", body: "A specialist that already knows your rules and your history. No re-briefing." },
  { name: "Agents.", body: "Overnight work that starts where yesterday’s left off." },
  { name: "Governance.", body: "Which model, whose keys, what each answer cost, one screen. Swap the model and nothing is taught twice." },
  { name: "Connections.", body: "Your CRM, files, forms and payments. Plugged in once, kept in sync." },
]

// Said as a buyer asks it. The "no" is the short answer; the sentence after it is the real one.
const NOT_THIS = [
  { no: "Not a chatbot.", yes: "A brain your company owns. Chat is one door into it." },
  { no: "Not a harness.", yes: "The memory and the judgment live here. The model is only the voice." },
  { no: "Not a wrapper around one model.", yes: "Any model, through your own keys. Swap it and nothing is re-taught." },
  { no: "Not rented.", yes: "Software you own, on your machines or ours. A cost you capitalize, not a bill forever." },
  { no: "Not a search box.", yes: "A memory that counts, dates and sources every fact, and says when it is unsure." },
  { no: "Not one person\u2019s assistant.", yes: "Private memory for each person, shared memory for the company, both in one place." },
]

type Icon = "coin" | "receipt" | "pen" | "clocks"
function CardIcon({ kind }: { kind: Icon }) {
  const d: Record<Icon, React.ReactNode> = {
    coin: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M9.5 10.2c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.4-2.5 1.8-2.5.8-2.5 1.8 1 1.7 2.5 1.7 2.5-.7 2.5-1.7M12 7v10" />
      </>
    ),
    receipt: (
      <>
        <path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z" />
        <path d="M9 8h6M9 11.5h6M9 15h4" />
      </>
    ),
    pen: (
      <>
        <path d="M4 20l4-1 10.5-10.5a2.1 2.1 0 0 0-3-3L5 16z" />
        <path d="M13 7l3 3M4 20h16" />
      </>
    ),
    clocks: (
      <>
        <circle cx="8" cy="12" r="4.5" />
        <path d="M8 9.5V12l1.8 1.2" />
        <path d="M16.5 7.5a4.5 4.5 0 1 0 3.2 7.7 3.6 3.6 0 0 1-3.2-7.7z" />
      </>
    ),
  }
  return (
    <svg className="mh-icon" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {d[kind]}
    </svg>
  )
}

const DIFFERENT: { title: string; body: string; icon: Icon }[] = [
  { icon: "coin", title: "A smaller model bill", body: "The model sees only the slice that earns it. Cost doesn’t grow with what it knows." },
  { icon: "receipt", title: "Answers you can check", body: "Every answer traces to a record it can show you. When there isn’t one, it says so." },
  {
    icon: "pen",
    title: "Teach it once",
    body: "Rules, corrections and lessons carry forward. Month twelve knows what month one never could.",
  },
  {
    icon: "clocks",
    title: "Two speeds",
    body: "In the moment it decides what matters. At night it reads everything, links what repeats, flags what contradicts, and writes you a letter.",
  },
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
          <ol className="mm-rows" aria-label="The eight parts">
            {ROOM.map((o, i) => (
              <li key={o.name} className="mm-row" data-reveal data-delay={String((i % 3) + 1)}>
                <span className="mm-n lx-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="mm-name">{o.name}</span>
                <p className="mm-body">{o.body}</p>
              </li>
            ))}
          </ol>
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
        <div className="lx-wrap mh-facts mh-facts-2">
          {DIFFERENT.map((f, i) => (
            <div key={f.title} className="mh-fact mh-fact-icon" data-reveal data-delay={String(i + 1)}>
              <h3>
                <CardIcon kind={f.icon} />
                {f.title}
              </h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <div className="lx-wrap pf-wrap pf-wrap-home" data-reveal>
          <p className="lx-eyebrow">Every answer shows its work</p>
          <ReceiptLive />
          <p className="lx-illustrative">Every answer comes with its receipt. Click any line and it opens.</p>
        </div>
      </section>

      {/* 03: Where it runs */}
      <section className="hx-section hx-deep" id="where">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">03</span> Where it runs
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Your box, your models, your <em>keys</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Hosted now. Private cloud and on-premises built with you. Your keys either way. You stop renting AI and start owning it: an asset on your books, not a bill every month. Fire us and keep everything.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="3">
            <Link className="lx-btn lx-btn-ghost" href="/own-it">
              See how you own it <span className="lx-arrow" aria-hidden>→</span>
            </Link>
          </div>
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
            Your role
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            See what it does for <em>your</em> job.
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
        <FilmStill src="/art/steps.webp" alt="The strider steps from one lit stone to the next along the road." />
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
