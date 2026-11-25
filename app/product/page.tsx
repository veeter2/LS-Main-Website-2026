import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import Link from "next/link"
import { FilmStill as Still } from "../_components/film-still"
import { ConnectFilm } from "../_components/connect-film"
import { ReceiptCard, TeamCard } from "../_components/proof-cards"
import { CallSplit } from "./call-split"
import { ExpertInterview } from "./expert-interview"
import { RecordDemo } from "../_components/record-demo"
import { Desk } from "../_components/desk"

export const metadata: Metadata = pageMeta("/product", "What it does · Facts, promises, decisions", "LongStrider turns your team’s conversations into a dated, sourced memory your company owns. Counts, not guesses. Promises tracked only after you confirm.")

/**
 * What LongStrider does: the eight things that run on the memory, one
 * section each, in the order a buyer meets them. The hero chips are the
 * section names, so a reader can count along. Receipts live inside 01;
 * any model lives inside 07. One picture per section, and only where it
 * shows something the words do not.
 */

const SECTIONS = ["Chat", "Receipts", "Promises", "Today", "Experts", "Agents", "Governance", "Connections"]

const RECORD_POINTS = [
  {
    title: "Counted, not guessed.",
    body: "How often, since when, who said it. The count is done by the system over the whole record, and the model is handed the number to put into words. It is not allowed to estimate.",
  },
  {
    title: "Correct it once.",
    body: "Fix a fact and the fix is kept, with who made it and when. The old fact isn\u2019t deleted. It\u2019s marked as replaced, so you can always see what it used to believe.",
  },
  {
    title: "Honest about gaps.",
    body: "When there isn\u2019t enough to go on, it says \u201CI don\u2019t have a record of that yet\u201D and tells you what it\u2019s waiting on.",
  },
]

const NIGHT = [
  {
    time: "Last spring",
    body: "Ashgrove took its business to another supplier after two late deliveries.",
    old: "last confirmed in March",
  },
  {
    time: "11:04 pm",
    body: "A rep mentions, in passing, that Pellworth has been talking to another supplier.",
  },
  {
    time: "Overnight",
    body: "Filed with Pellworth. Linked to the two earlier hints. Checked against how Ashgrove went last spring.",
  },
  {
    time: "9:00 am",
    body: "One line at the top of your morning: what changed, what it means for the renewal, and the three sources behind it.",
  },
]

const GOVERNANCE = [
  {
    title: "The AI proposes.",
    body: "Promises, links, corrections, agent findings. It suggests; it doesn\u2019t decide.",
  },
  {
    title: "A person confirms.",
    body: "Nothing enters memory, and nothing lands on a desk, without a click from someone with a name.",
  },
  {
    title: "Every write has a receipt.",
    body: "What changed, who did it, when, and the run it came from, so it can be found and undone. Anything that happened without asking you is in one log, every day.",
  },
]

const BEATS = [
  { title: "Every door", body: "Chat, your connected systems (anything with an API or an MCP server), documents, dropped files, and what your teammates find. Not five silos. One memory." },
  { title: "Nothing lands raw", body: "Everything that comes in gets a date and a source, goes in the right drawer, and is checked against what’s already there before it’s trusted." },
  { title: "Two books", body: "Yours and the company\u2019s. Your private connectors and drops feed your memory, and nobody else sees it. Shared sources feed the company\u2019s memory, which everyone works from. Same system, hard wall between them." },
]
const MODELS = ["Anthropic", "OpenAI", "DeepSeek", "Ollama, or any OpenAI-compatible server", "A local model on your hardware"]


export default function ProductConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">What it does</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Your people talk. Your company <em>remembers</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              LongStrider takes what your team already puts into AI, in chat, in documents, in uploaded files and call
              transcripts, and keeps the part that matters: the facts, the promises, what changed, and what keeps coming
              up. Each with its source. Each yours. Eight things run on that memory. Here they are, in the order
              you&rsquo;d meet them.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <Link className="lx-btn lx-btn-primary" href="/book">
                Talk to us <span className="lx-arrow" aria-hidden>→</span>
              </Link>
              <a className="lx-btn lx-btn-ghost" href="#record">
                See it answer
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              {SECTIONS.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
          <div data-rise="2">
            <CallSplit />
            <p className="lx-illustrative">Real behavior. Fictional account.</p>
          </div>
        </div>
        <div className="lx-wrap hw-film" data-rise="4">
          <ConnectFilm />
        </div>
      </section>

      {/* 01: Chat that knows each person */}
      <section className="hx-section hx-deep" id="record">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">01</span> Chat that knows each person
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Search finds a document that mentions Pellworth. This knows what <em>happened</em> with Pellworth.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              Every fact is dated. Every change is kept, with what it replaced. Every answer points back to the message
              it came from, and you can open it. Every reply comes with its receipt: what it stood on, which rules fired, and
              what it cost.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <RecordDemo />
          </div>
        </div>
        <div className="lx-wrap pf-wrap" data-reveal>
          <ReceiptCard />
          <p className="lx-illustrative">Every answer comes with its receipt. Click any line and it opens.</p>
        </div>
        <div className="lx-wrap mh-facts">
          {RECORD_POINTS.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 02: Receipts */}
      <section className="hx-section" id="living-memory">
        <Still src="/art/film-night.jpg" alt="Night over the memory: gold threads link what the day wrote, and a letter waits on the road for morning." />
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> Receipts
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Most nights it does <em>nothing</em>. That&rsquo;s the point.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            At five in the morning it asks one question: did anything new land yesterday? If not, it stops, and you
            aren&rsquo;t paying for a model to re-read what it already knows. If something did, it reads what the day
            wrote and files it into the right drawers on its own: a person, an account, a matter. It links the notes
            that say the same thing and flags the ones that contradict. Then it leaves a short note at the top of your
            morning. Nobody tags anything. When a fact has not been confirmed in a while, it says so. And when it
            doesn&rsquo;t have something, it says that too, instead of guessing.
          </p>
        </div>
        <ol className="lx-wrap nt-line">
          {NIGHT.map((n, i) => (
            <li key={n.time} className="nt-step" data-reveal data-delay={String(i + 1)} data-old={"old" in n || undefined}>
              <span className="nt-time lx-num">
                <b>{n.time}</b>
              </span>
              <p>{n.body}</p>
              {"old" in n && <span className="pf-old">{n.old}</span>}
            </li>
          ))}
        </ol>
      </section>

      {/* 03: Promises */}
      <section className="hx-section hx-deep" id="desk">
        <div className="lx-wrap lx-hero-grid hx-flip">
          <div data-reveal data-delay="1">
            <Desk />
          </div>
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> Promises
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Every promise gets an owner and a <em>date</em>. After you say so.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              &ldquo;I&rsquo;ll send the revised terms Friday&rdquo; is a promise. LongStrider notices it, files it,
              and suggests it to the person who said it. It only goes on their desk once they confirm. Decisions land
              the same way, with who made them and why. Nothing is tracked that nobody agreed to, and nothing clears
              itself.
            </p>
          </div>
        </div>
      </section>

      {/* 04: Today */}
      <section className="hx-section" id="today">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> Today
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            A short letter at the top of your <em>morning</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            At night it reads the week and writes down what moved, what slipped, and what to do first. A promise due
            today. A fact that changed since you last looked. Two notes that disagree. It is written before you sit
            down, and on a quiet night it says so in one line and stops.
          </p>
        </div>
      </section>

      {/* 05: Experts */}
      <section className="hx-section" id="experts">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">05</span> Experts
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Hire a specialist. It <em>interviews</em> you first.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              A specialist is a built-in expert for one job: renewals, claims, a practice area, your call traffic. Before
              it does anything it asks how your company works. What counts as risk here. Who can agree to what. Which
              accounts matter this quarter. Your answers go into the memory, so it starts from your judgment, not a
              generic playbook. Then it studies, and brings back findings you keep or drop. What it learns goes into
              the same memory your chat and your agents read, so every one of them gets richer.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <ExpertInterview />
            <p className="lx-illustrative">Real flow. Fictional answers.</p>
          </div>
        </div>
      </section>

      {/* 06: Agents */}
      <section className="hx-section hx-deep" id="agents">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">06</span> Agents
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Your teammates start where <em>yesterday&rsquo;s</em> left off.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            The model is the voice. LongStrider is the memory and the judgment. Your teammates read the memory before
            they act, run overnight if you want them to, and bring their findings back as a note. You decide what goes
            into memory. So Wednesday&rsquo;s run starts from Monday&rsquo;s and Tuesday&rsquo;s, instead of from
            nothing. A new agent starts as an observer and earns trust run by run. You see how often its work was
            useful before you let it act.
          </p>
        </div>
        <div className="lx-wrap pf-wrap" data-reveal>
          <TeamCard />
        </div>
      </section>

      {/* 07: Governance, which includes any model */}
      <section className="hx-section" id="governance">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">07</span> Governance
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Every model, every key, every dollar. <em>One</em> screen.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            Every job has its own model setting, changed in Settings, no engineer needed. Your keys, not ours. Spend by job and by model,
            every day, so you know what last night cost, and most nights it&rsquo;s nothing. Set how it speaks, what it
            won&rsquo;t do, and when it must check with a person first.
          </p>
        </div>
        <div className="lx-wrap mh-facts">
          {GOVERNANCE.map((f, i) => (
            <div key={f.title} className="mh-fact" data-reveal data-delay={String(i + 1)}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <div className="lx-wrap hx-center">
          <p className="lx-lead hx-lead-center" data-reveal>
            The model changes. The memory stays. One is a bill every month. The other
            is something your company owns. Run a frontier model through your
            own keys, a model you already host, or a local one on your hardware. We&rsquo;ve moved every job to a different
            model ourselves. Nothing was re-taught.
          </p>
          <ul className="cp-parts hx-cta-center" data-reveal data-delay="1" aria-label="Models LongStrider runs with">
            {MODELS.map((m) => (
              <li key={m}>{m}</li>
            ))}
            <li className="cp-parts-ours">Your memory: the one part that stays.</li>
          </ul>
        </div>
      </section>

      {/* 08: Connections */}
      <section className="hx-section hx-deep" id="connections">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">08</span> Connections
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Every door feeds one <em>memory</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            ChatGPT is a box you talk to. LongStrider is a memory everything feeds.
          </p>
        </div>
        <div className="lx-wrap mh-facts cx-beats">
          {BEATS.map((b, i) => (
            <div key={b.title} className="mh-fact" data-reveal data-delay={String((i % 3) + 1)}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
        <p className="lx-wrap lx-display cx-close" data-reveal>
          <span className="cx-dim">Change the model, and a chat box starts over.</span>
          <span className="cx-lit">The memory remembers for the company.</span>
        </p>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            See it on your <em>own</em> work.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Tell us what your business does and the question your team can&rsquo;t answer today. We&rsquo;ll show you
            what LongStrider would keep: the memory, the promises and the first morning note.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Talk to us <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/security">
              Where it runs, and who owns it
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
