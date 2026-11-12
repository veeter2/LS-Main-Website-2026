import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import Image from "next/image"
import { AskYourAI } from "./_components/ask-your-ai"

export const metadata: Metadata = {
  ...pageMeta(
    "",
    "Stop teaching AI your business every morning",
    "Not a model, not a search box, not a wrapper. LongStrider is the software your company runs its AI on, and owns. It keeps what your people tell it, works on it overnight, and hands it to whichever model you run this year.",
  ),
  title: { absolute: "LongStrider · Stop teaching AI your business every morning" },
}

/**
 * Homepage v2 (Concept A, 2026-11-11): the enemy in the headline, the three
 * "not a" lines as the subhead, then the whole room. No stats anywhere; the
 * figures live in the briefs. Screens are the demo account (Dana Thistlewood,
 * COO of a fictional dealer group). Names match the app's tabs.
 */

const ROOM = [
  { name: "Today.", body: "What moved, what slipped, what to do first. Written overnight, before you sit down." },
  {
    name: "Memory.",
    body: "Everything your company has said to it, dated and sourced. It files itself, checks itself, and works on it overnight.",
  },
  { name: "Chat.", body: "It answers from the record first and calls the model only for the words." },
  { name: "Promises.", body: "Who said they would do what, by when. It brings them back on the day." },
  { name: "Experts.", body: "Hire a specialist. It interviews you first, then works the way your business works." },
  { name: "Agents.", body: "Work that starts where yesterday’s left off, with the same memory as you." },
  { name: "Governance.", body: "Which model, whose keys, what it cost, who saw what. One screen." },
  { name: "Connections.", body: "CRM, calls, email, documents. Plugged in once, they teach it every day." },
]

const DIFFERENT = [
  { title: "Fewer tokens", body: "The model sees only the slice that earns it. Cost doesn’t grow with what it knows." },
  { title: "Fewer made-up answers", body: "Every answer traces to a record it can show you. When there isn’t one, it says so." },
  {
    title: "Teach it once",
    body: "Rules, corrections and lessons carry forward. Month twelve knows what month one never could.",
  },
  {
    title: "Two speeds",
    body: "In the moment it decides what matters. At night it reads everything, links what repeats, flags what contradicts, and writes you a letter.",
  },
]

const WHERE = ["Regulated industries", "Anyone who won’t hand IP to a frontier model", "Companies quoted seven figures to build a brain"]

const BUYERS = [
  { who: "For the CFO", title: "An AI budget that ends in an asset, not a renewal.", href: "/for/finance" },
  { who: "For the CTO", title: "Postgres, row-level scoping, any model through your keys. Open it up.", href: "/for/technology" },
  { who: "For compliance", title: "Every read checked against who’s asking. Every write receipted.", href: "/security" },
  { who: "For your team", title: "Stop explaining your job to a chat window every morning.", href: "/for/teams" },
]

function Shot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="mh-screen">
      <Image src={src} alt={alt} width={800} height={537} sizes="(max-width: 900px) 100vw, 900px" />
      <figcaption className="lx-illustrative">{caption}</figcaption>
    </figure>
  )
}

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="lx-hero">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-rise="0">
            Company memory
          </p>
          <h1 className="lx-display lx-h1 mh-h1" data-rise="1">
            Stop teaching AI your business every <em>morning</em>.
          </h1>
          <p className="lx-lead hx-lead-center mh-nots" data-rise="2">
            Not a model. Not a search box. Not a wrapper around someone else&rsquo;s chat. LongStrider is the software
            your company runs its AI on, and owns.
          </p>
          <p className="lx-lead hx-lead-center" data-rise="2">
            It keeps what your people tell it, works on it overnight, and hands it to whichever model you run this year.
            Switch models and nothing is taught twice.
          </p>
          <div className="lx-cta-row hx-cta-center" data-rise="3">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/product">
              See what it does
            </Link>
          </div>
        </div>
        <div className="lx-wrap" data-rise="4">
          <Shot
            src="/shots/chat.jpg"
            alt="LongStrider chat. Dana asks how to make a known problem look new; the reply shows she flagged it in September."
            caption="Dana asks how to make a problem look new. It shows her she knew in September."
          />
        </div>
      </section>

      {/* 01: The room */}
      <section className="hx-section hx-deep" id="room">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> The room
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            One room. Everything your company knows about <em>itself</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Eight parts, one memory underneath all of them. Take the memory away and they&rsquo;re the same tools everyone
            else sells. Keep it, and every one of them gets better each month, because the record does.
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
            All eight read one record. That&rsquo;s what you license, and that&rsquo;s what you own.{" "}
            <Link href="/product">What it does →</Link>
          </p>
        </div>
        <div className="lx-wrap" data-reveal data-delay="2">
          <Shot src="/shots/memory.jpg" alt="LongStrider Memory page, nine months of a company's record." caption="Memory, nine months in." />
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
        </div>
        <div className="lx-wrap mh-facts mh-facts-2">
          {DIFFERENT.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <div className="lx-wrap" data-reveal data-delay="2">
          <Shot src="/shots/today.jpg" alt="LongStrider Today page, the morning summary." caption="Today. The morning page, written overnight." />
        </div>
      </section>

      {/* 03: Where it runs */}
      <section className="hx-section hx-deep" id="where">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">03</span> Where it runs
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Your box, your models, your keys. Nothing leaves the <em>building</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Or a frontier model through a gateway you control. Same product either way. Fire us and keep everything.
          </p>
          <ul className="lx-assure mh-center" data-reveal data-delay="3" aria-label="Who this is for">
            {WHERE.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <div className="lx-wrap" data-reveal data-delay="2">
          <Shot src="/shots/experts.jpg" alt="LongStrider Experts page. Hire a role; it interviews you first." caption="Experts. Hire a role, it interviews you first." />
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
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Bring us your <em>hardest</em> problem.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            An hour, your people, one real question. You&rsquo;ll see the answer, the source it came from, and the promise
            it caught, built from your material. You leave knowing what your company would own ninety days from now.
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
