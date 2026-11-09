import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { MemoryCurve } from "./learning-gap/memory-curve"
import { OwnershipBoard } from "./_components/ownership-board"
import { RentVsOwn } from "./_components/rent-vs-own"
import { OvernightPass } from "./_components/overnight-pass"
import { Desk } from "./commitments/desk"
import { AskYourAI } from "./_components/ask-your-ai"
import { ORGANS } from "@/lib/for-your-ai"

export const metadata: Metadata = {
  ...pageMeta("", "The AI memory your company owns", "Every fact, promise and decision your people put into AI, kept with its source, on your infrastructure, under your own model. Licensed, not rented."),
  title: { absolute: "LongStrider · The AI memory your company owns" },
}

/**
 * Homepage v1 copy: the ownership spine. The problem is that company memory
 * lives in rented seats; the answer is a record the company licenses and owns.
 * Scenarios are fictional (Reyes closing, Pellworth renewal).
 */

const PROBLEMS = [
  {
    title: "It isn’t a record",
    body: "What the vendor keeps is a paraphrase. You can’t see the line it came from, and you can’t audit it.",
  },
  {
    title: "It doesn’t move",
    body: "Models get cheaper and better every quarter. When you switch, and you will, the memory stays in the old seat.",
  },
  {
    title: "People leave with it",
    body: "The history only one person carried goes out the door on their last day, because the only place it was ever written down was a chat window.",
  },
  {
    title: "You don’t set the terms",
    body: "The vendor can change the interface, the privacy rules or the token price on a Tuesday. You find out when something your business runs on stops working, and you keep paying.",
  },
]

const COMPARE_ROWS = ["What it keeps", "What it does with it", "Who owns it", "What you pay for", "Who sets the terms", "What it can tell you"]
const COMPARE = [
  {
    name: "Enterprise search",
    cells: [
      "The documents you already have",
      "Finds it when you search",
      "You rent it per seat",
      "Seats, forever",
      "The vendor. Interface, privacy rules and price can change without you",
      "What someone wrote down",
    ],
  },
  {
    name: "Memory inside a chat seat",
    cells: [
      "A summary the vendor writes about you",
      "Repeats it back, inside that one seat",
      "The vendor. You can read it, not export it",
      "Seats, forever",
      "The vendor. Same seat, same terms",
      "What it remembers about your preferences",
    ],
  },
  {
    name: "LongStrider",
    cells: [
      "Dated facts, promises and decisions, each with its source",
      "Works on it. Links repeats, flags conflicts, keeps promises, and answers from the record",
      "Your company. You license the software, it runs where you say, and it survives a model switch and a resignation",
      "A build you own, then support. An asset on your books, not a line that resets every January",
      "You. The model is a setting, the keys are yours, and the rows export",
      "Who promised what, what changed, and when to push back",
    ],
    ours: true,
  },
]

const BUYERS = [
  {
    who: "For the CFO",
    title: "An AI budget that ends in an asset, not a renewal.",
    href: "/for/finance",
  },
  {
    who: "For the CTO",
    title: "Postgres, row-level scoping, any model through your keys. Open it up.",
    href: "/for/technology",
  },
  {
    who: "For compliance",
    title: "Every read checked against who’s asking. Every write receipted.",
    href: "/security",
  },
  {
    who: "For your team",
    title: "Stop explaining your job to a chat window every morning.",
    href: "/for/teams",
  },
]

const PROOF = [
  "Every fact has a source",
  "Counts, not guesses",
  "Your own model, your own keys",
  "Licensed, not rented",
  "Nothing tracked without your yes",
  "Yours if you leave",
]

export default function HomeConcept() {
  return (
    <main>
      {/* Hero */}
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Company memory</p>
            <h1 className="lx-display lx-h1 mh-h1" data-rise="1">
              The AI memory your company <em>owns</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              Not a search box over the documents you already have. Those find what you wrote down. LongStrider keeps
              what your people say to AI, with its source, on your infrastructure, under your own model, and works on
              it. You license it and install it. Switch models next year and nothing is taught twice.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </Link>
              <Link className="lx-btn lx-btn-ghost" href="/pricing">
                See pricing
              </Link>
            </div>
            <ul className="lx-assure" data-rise="4" aria-label="What you get">
              {PROOF.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div data-rise="2">
            <OwnershipBoard />
            <p className="lx-illustrative">Illustration</p>
          </div>
        </div>
      </section>

      {/* 01: The problem */}
      <section className="hx-section hx-deep" id="rented">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> The problem
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Your people teach AI your business every day. Then it <em>forgets</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Every chat window your team opens starts from zero. The client history, the reason you walked away from a
            supplier, the rate someone agreed to hold through December: your people type it in, and it&rsquo;s gone by the
            next session. The vendors now offer &ldquo;memory.&rdquo; Read what you actually get. A summary you can&rsquo;t
            open, inside a seat you rent, that you can&rsquo;t export and can&rsquo;t take with you.
          </p>
        </div>
        <div className="lx-wrap mh-facts mh-facts-2">
          {PROBLEMS.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <p className="lx-wrap mh-question mh-plain" data-reveal data-delay="2">
          Deloitte asked 3,500 leaders this year. 81% said AI has made their decisions faster. 25% said it has changed how
          the business works. The rest are, in Deloitte&rsquo;s words, &ldquo;stuffing new capabilities into old operating
          models.&rdquo; (Deloitte, State of AI in the Enterprise, October 2026)
        </p>
        <p className="lx-wrap mh-question mh-plain mh-question-tight" data-reveal data-delay="3">
          Nearly 90% of 542 executives with AI contracts believed they could switch vendors inside four weeks. Of the
          companies that tried, 58% said the move failed or took far more than planned. (Zapier survey, reported by The
          Register, April 2026.) Companies planned to spend 1.9 times last year on AI and spent 4.7 times. (Menlo
          Ventures, November 2026.)
        </p>
      </section>

      {/* 02: What walks out the door */}
      <section className="hx-section" id="departure">
        <div className="lx-wrap mh-story">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> What walks out the door
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Eleven years. Two weeks&rsquo; notice.
          </h2>
          <div className="mh-story-body" data-reveal data-delay="2">
            <p>
              Your head of client services resigns on a Friday. She knows every key account: the politics, the
              preferences, the history no CRM ever held.
            </p>
            <p>
              On Monday her replacement opens LongStrider. The relationships, the decisions and the promises are there,
              each with where it came from, because the system was learning alongside her the whole time.
            </p>
            <p className="mh-story-turn">
              Her expertise didn&rsquo;t leave with her. <em>It became the company&rsquo;s.</em>
            </p>
          </div>
          <p className="lx-illustrative mh-left" data-reveal data-delay="3">
            A scenario
          </p>
        </div>
      </section>

      {/* 03: What owning it looks like */}
      <section className="hx-section hx-deep" id="own">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> What owning it looks like
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Ask what happened. Get the <em>record</em>, not a guess.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Every conversation becomes dated facts with a source. Ask how many times, or when, and you get a number you
              can check. When there isn&rsquo;t enough to go on, it tells you that instead.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <div className="rx-demo lx-card" aria-label="Example: asking LongStrider about a closing date">
              <div className="rx-list">
                <div className="rx-exchange">
                  <div className="rx-q">
                    <span className="rx-who">You</span>
                    <p className="rx-q-text">
                      How many times has the Reyes closing date come up this month, and what&rsquo;s the latest?
                    </p>
                  </div>
                  <div className="rx-reading" data-on="true">
                    <span className="rx-pulse" aria-hidden />
                    Reading 9 conversations across 2 people
                  </div>
                  <div className="rx-a" data-on="true">
                    <span className="rx-who rx-who-ls">LongStrider</span>
                    <p>
                      The Reyes closing date has come up <b className="lx-num">7 times</b> since <b>3 November</b>. You
                      gave me two dates: <b>the 12th</b> on Monday, and <b>the 19th</b> yesterday, in a different thread.
                      I&rsquo;ve flagged that as a conflict. Which one stands?
                    </p>
                    <div className="rx-sources">
                      <span className="rx-source">
                        <span className="rx-source-kind">Chat</span>
                        <span className="rx-source-date lx-num">3 Nov</span>
                      </span>
                      <span className="rx-source">
                        <span className="rx-source-kind">Chat</span>
                        <span className="rx-source-date lx-num">6 Nov</span>
                      </span>
                      <span className="rx-stamp rx-stamp-gold">Counted from the record</span>
                      <span className="rx-stamp rx-stamp-gold">Conflict flagged overnight</span>
                    </div>
                  </div>
                </div>
                <div className="rx-exchange">
                  <div className="rx-q">
                    <span className="rx-who">You</span>
                    <p className="rx-q-text">The 19th. Legal pushed it.</p>
                  </div>
                  <div className="rx-a" data-on="true">
                    <span className="rx-who rx-who-ls">LongStrider</span>
                    <p>Kept. The 12th is marked as replaced, with your correction and the reason. It won&rsquo;t come back.</p>
                    <div className="rx-sources">
                      <span className="rx-stamp rx-stamp-quiet">Correction kept</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="lx-illustrative">Real behavior. Fictional firm.</p>
          </div>
        </div>

        <div className="lx-wrap lx-hero-grid hx-flip mh-second">
          <div data-reveal data-delay="1">
            <Desk />
            <p className="lx-illustrative">Illustrative example</p>
          </div>
          <div>
            <h3 className="lx-display mh-h3" data-reveal>
              And it keeps the <em>promises</em>.
            </h3>
            <p className="lx-lead" data-reveal data-delay="1">
              &ldquo;I&rsquo;ll have the revised schedule to the broker by Friday&rdquo; is a commitment with an owner and
              a date. LongStrider hears it, files it, and shows it to the person who said it. Nothing goes on your desk
              until you say so. Friday morning it&rsquo;s in your five for the day, with the message it came from one click
              away.
            </p>
          </div>
        </div>
      </section>

      {/* 04: More than memory */}
      <section className="hx-section" id="more">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> More than memory
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Memory is the floor. Everything else <em>stands</em> on it.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Each part below works because it remembers. Take the memory away and they&rsquo;re the same tools everyone
            else sells. Keep it, and every one of them gets better each month, because the record does.
          </p>
        </div>
        <div className="lx-wrap">
          <ol className="mm-rows" aria-label="Seven things that run on the memory">
            {ORGANS.map((o, i) => (
              <li key={o.name} className="mm-row" data-reveal data-delay={String((i % 3) + 1)}>
                <span className="mm-n lx-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="mm-name">{o.name}</span>
                <p className="mm-body">{o.body}</p>
              </li>
            ))}
          </ol>
          <p className="mm-foot" data-reveal>
            All seven read one record. That&rsquo;s what you license, and that&rsquo;s what you own.{" "}
            <Link href="/product">What it does →</Link>
          </p>
        </div>
      </section>

      {/* 05: Fast and slow */}
      <section className="hx-section hx-deep" id="fast-slow">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">05</span> Fast and slow
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            It thinks <em>twice</em>. Once now, once tonight.
          </h2>
        </div>
        <div className="lx-wrap mh-facts mh-facts-2">
          <div className="mh-fact" data-reveal data-delay="1">
            <h3>In the moment</h3>
            <p>
              Every message is filed as you type it. The facts in it are dated, sourced and put in the right drawer, and
              the reply comes back in about ten seconds. Most of that work is arithmetic and lookups, not a model guessing.
            </p>
          </div>
          <div className="mh-fact" data-reveal data-delay="2">
            <h3>Overnight</h3>
            <p>
              At five in the morning it checks whether anything new landed yesterday. If nothing did, it does nothing, and
              that&rsquo;s most nights. If something did, it reads what the day wrote, links what repeats, flags what
              contradicts, and leaves you a note. That&rsquo;s how the two Reyes dates got caught.
            </p>
          </div>
        </div>
        <div className="lx-wrap hx-chart" data-reveal data-delay="2">
          <OvernightPass />
          <p className="lx-illustrative">Illustration. Example names.</p>
        </div>
      </section>

      {/* 06: Integrity */}
      <section className="hx-section" id="integrity">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">06</span> The integrity to push back
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Most AI agrees with everything. This one has a <em>record</em> to check you against.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              When a decision cuts against something it&rsquo;s been tracking, it says so, with the evidence and what
              happened last time. It would rather ask than guess. Ninety days in, it&rsquo;s asking the questions you
              didn&rsquo;t know to ask.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <article className="mh-note lx-card">
              <span className="mh-note-label">This morning</span>
              <p className="mh-note-text">
                You&rsquo;re about to hold the Pellworth rate for a second year. Last time you held a rate on a telematics
                gap, the loss ratio didn&rsquo;t recover. Worth a look before the renewal call?
              </p>
              <div className="mh-note-sources">
                <span className="rx-source">
                  <span className="rx-source-kind">Underwriting notes</span>
                  <span className="rx-source-date lx-num">14 Jan</span>
                </span>
                <span className="rx-source">
                  <span className="rx-source-kind">Renewal review</span>
                  <span className="rx-source-date lx-num">March</span>
                </span>
                <span className="rx-stamp rx-stamp-gold">A contradiction, flagged</span>
              </div>
            </article>
            <p className="lx-illustrative">Real behavior. Fictional account.</p>
          </div>
        </div>
      </section>

      {/* 07: What it is, and isn't */}
      <section className="hx-section hx-deep" id="different">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">07</span> What it is, and isn&rsquo;t
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Three things that look alike and <em>aren&rsquo;t</em>.
          </h2>
        </div>
        <div className="lx-wrap" data-reveal data-delay="2">
          <div className="mh-compare" role="table" aria-label="How LongStrider differs">
            <div className="mh-compare-row mh-compare-headrow" role="row">
              <span role="columnheader" />
              {COMPARE.map((c) => (
                <span key={c.name} role="columnheader" className={c.ours ? "mh-ours mh-ours-head" : undefined}>
                  {c.name}
                </span>
              ))}
            </div>
            {COMPARE_ROWS.map((label, r) => (
              <div key={label} className="mh-compare-row" role="row">
                <span role="rowheader" className="mh-compare-label">
                  {label}
                </span>
                {COMPARE.map((c) => (
                  <span key={c.name} role="cell" className={c.ours ? "mh-ours" : undefined}>
                    <span className="mh-cell-name">{c.name}</span>
                    {c.cells[r]}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="hx-chart" data-reveal data-delay="2">
            <RentVsOwn />
            <p className="lx-illustrative">Illustration</p>
          </div>
          <p className="mh-question mh-plain" data-reveal data-delay="2">
            Ask for an export and you get rows, not a paragraph. Every write has a name, a date and a receipt. That
            matters more than it used to: 23% of leaders say accountability is unclear when AI produces a negative
            outcome. (Deloitte, October 2026)
          </p>
        </div>
      </section>

      {/* 08: An asset */}
      <section className="hx-section" id="asset">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">08</span> An asset, not a renewal
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            The one AI line item that&rsquo;s worth <em>more</em> in month twelve than month one.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            An MIT NANDA study of more than 300 enterprise AI deployments found 95% saw no measurable return, and named the
            reason: &ldquo;Most GenAI systems do not retain feedback, adapt to context, or improve over time.&rdquo; (MIT
            NANDA, The GenAI Divide, 2025)
          </p>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            LongStrider retains it. Week one it learns your people. Month four it knows what was decided and why. Month
            twelve it answers questions no single person could. And all of it belongs to the company, which is the part
            that shows up when someone asks what you own.
          </p>
        </div>
        <div className="lx-wrap hx-chart" data-reveal data-delay="2">
          <MemoryCurve />
          <p className="gx-source">
            Illustration, not a measurement. Study:{" "}
            <a
              href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
              target="_blank"
              rel="noreferrer"
            >
              MIT NANDA, The GenAI Divide: State of AI in Business 2025
            </a>
          </p>
        </div>
      </section>

      {/* Ask your own AI */}
      <section className="hx-section hx-deep" id="ask">
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
      <section className="hx-section" id="buyers">
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
          <p className="lx-illustrative mh-center" data-reveal data-delay="3">
            Built live with real users since spring 2026.
          </p>
        </div>
      </section>
    </main>
  )
}
