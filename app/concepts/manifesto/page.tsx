import type { Metadata } from "next"
import Link from "next/link"
import { ChapterRail, type Chapter } from "./chapter-rail"

export const metadata: Metadata = { title: "The Manifesto — concept" }

/**
 * The Manifesto in daylight. Matt’s argument and words, set as a long read.
 * Edits from the dark original: internal recipe names and counts that other
 * pages contradict ("five axes", "five-pass", "eighteen principles") are said
 * in plain words instead, and the deployment tiers match the Security page.
 */

const CHAPTERS: Chapter[] = [
  { id: "evidence", label: "The evidence" },
  { id: "what", label: "What it is" },
  { id: "moat", label: "Your moat" },
  { id: "practice", label: "In practice" },
  { id: "who", label: "Who it’s for" },
  { id: "how", label: "How it works" },
  { id: "landscape", label: "The landscape" },
  { id: "next", label: "What’s next" },
]

const SCENARIOS = [
  {
    title: "The board meeting",
    paragraphs: [
      "Tuesday afternoon. A partner asks why a key client’s engagement has shifted — and what’s actually driving it.",
      "Without LongStrider, that question takes two days. Someone pulls CRM data. Someone digs through email. Someone remembers a conversation from March that never got documented. The answer arrives as a spreadsheet with no story.",
      "With LongStrider, the system has already been tidying this overnight — connecting that client’s interactions, keeping what mattered, letting go of what didn’t. The answer arrives as a trajectory: where the relationship was, when the shift started, the conversation that preceded it, and two other accounts following the same arc.",
    ],
    turn: "Not a report. An understanding.",
  },
  {
    title: "The key departure",
    paragraphs: [
      "Your head of client services gives two weeks’ notice on a Friday. She’s been with you for eleven years. She knows every key account personally — the politics, the preferences, the history that never made it into a CRM record.",
      "On Monday morning, her replacement opens LongStrider. What she knew is there — not as a knowledge dump, but as a living record. The relationships. The conversations that shaped each engagement. The moments a client’s tone shifted before anyone noticed.",
      "Not because someone asked her to document it. Because the system was learning alongside her the entire time.",
    ],
    turn: "Her expertise didn’t walk out the door. It became the company’s.",
  },
  {
    title: "Ninety days in",
    paragraphs: [
      "Ninety days after deployment. Nobody’s maintaining the system. Nobody’s feeding it data. But this morning’s briefing flagged something: a pricing decision your team made last week contradicts a pattern the system has been tracking for three months.",
      "It doesn’t just show you the data. It shows you what happened last time, what changed, and why the current path looks familiar. It pushes back, with evidence, because the history earned it the right to.",
    ],
    turn: "Not a tool that answers questions. A system that asks them — before you knew to.",
  },
]

const PERSONAS = [
  {
    type: "The PE-backed portfolio company",
    body: "Your board didn’t ask whether you’re using AI. They asked what you own. LongStrider compounds from week one and gives you something that shows up in due diligence. Not a subscription renewal — a line item on the asset side.",
  },
  {
    type: "The regulated-industry operator",
    body: "Financial services. Healthcare. Legal. Your data doesn’t leave your perimeter — because your regulators, your clients and your counsel require it. LongStrider was built for exactly this: sovereign deployment, full data residency, air-gapped where required.",
  },
  {
    type: "The professional services firm",
    body: "Your product is what your people know. Every methodology, every relationship, every hard-won pattern lives in people, not systems. LongStrider makes it permanent — not a knowledge base someone has to maintain, but a living system that learns alongside your team and stays when they don’t.",
  },
  {
    type: "The technology company building on AI",
    body: "Everything you’re building is only as smart as what it remembers — and right now, it resets every session. LongStrider is the layer underneath that makes what you deploy compound, stay in context, and become worth defending. Not a competitor. A foundation.",
  },
]

const CAPABILITIES = [
  {
    title: "It runs by your rules",
    body: "Most AI has guardrails bolted on after the fact. LongStrider has a written operating code — how it thinks, speaks, challenges and stays in bounds. Configure it for a law firm and it behaves one way; for a PE fund, another. Same engine. A different operating mind. Entirely yours.",
  },
  {
    title: "It retrieves understanding, not documents",
    body: "Ask a question and it doesn’t search an index. It weighs what’s relevant, what mattered, who was involved and how recent it is — and answers with the arc: where things started, how they shifted, where they are now.",
  },
  {
    title: "It gets smarter while you sleep",
    body: "Every night, without being asked, it tidies what the day taught it: merging what repeats, flagging what conflicts, summarising what’s settled, and noticing where priorities are starting to move. It compounds without anyone maintaining it.",
  },
  {
    title: "It has the integrity to challenge you",
    body: "Every other AI is optimised to keep the conversation rolling. LongStrider is built not to tell you what you want to hear under pressure. When a decision cuts against the evidence, it says so — and would rather stop than give in.",
  },
  {
    title: "The interface remembers too",
    body: "No threads. No session limit. One continuous timeline across every interaction since the system went live. Mark an answer right and it holds; correct it and the correction is kept, with who made it and why.",
  },
]

const LANDSCAPE = [
  {
    name: "The model providers",
    body: "Every conversation your team has on their platforms makes their models smarter. Not yours. When they offer you “memory,” read the fine print: your knowledge is the product. It always was.",
  },
  {
    name: "The enterprise search layer",
    body: "Retrieval systems dressed up as intelligence. They find things and summarise things. They don’t understand your business, remember what mattered, or get smarter about it over time.",
  },
  {
    name: "The memory infrastructure startups",
    body: "Real technology, and we respect the work — but it’s developer plumbing: APIs that store and fetch. Nobody built the layer an enterprise needs to accumulate, weigh, challenge and fully own what it learns.",
  },
]

const TIERS = [
  { name: "Hosted", body: "A dedicated instance we run, isolated to you. You own the knowledge; we run the engine." },
  { name: "Private cloud", body: "Containerised inside your VPC — your servers, your perimeter, full data residency. No source code shipped." },
  { name: "Sovereign build", body: "Built alongside your team, on your hardware, air-gap capable. When it’s done, every part belongs to you. Permanently." },
  { name: "Partner program", body: "Run it under your brand for your clients. You bring the relationships and the vertical knowledge; the engine is yours to operate." },
]

export default function ManifestoConcept() {
  return (
    <main>
      <section className="lx-hero mf-hero">
        <div className="lx-wrap mf-hero-inner">
          <p className="lx-eyebrow" data-rise="0">The Manifesto</p>
          <h1 className="lx-display lx-h1 mf-h1" data-rise="1">
            The intelligence layer that knows your business — and never <em>forgets</em>.
          </h1>
          <p className="mf-hook" data-rise="2">
            Every dollar your organisation spent on AI this year made someone else&rsquo;s platform smarter.
          </p>
          <ul className="mf-litany" data-rise="3">
            <li>The decision your team made six months ago.</li>
            <li>The client context that only one person carries in their head.</li>
            <li>The pattern that only shows up when you look across everything at once.</li>
          </ul>
          <p className="mf-litany-turn" data-rise="4">
            It only ever taught the model. When they leave, their knowledge goes with them.
          </p>
        </div>
      </section>

      <div className="lx-wrap mf-body">
        <ChapterRail chapters={CHAPTERS} />
        <article className="mf-article">
          <section id="evidence" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">01</span> The evidence
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              Every AI you buy or build starts from <em>zero</em>.
            </h2>
            <div className="mf-prose" data-reveal data-delay="2">
              <p>Your tools execute. Your dashboards visualise. Your search finds documents. And not one of them remembers.</p>
              <p>
                The race to the bottom everyone predicted is here. The model is already a commodity. Every provider is
                building &ldquo;memory&rdquo; that keeps your preferences, your history, your patterns — but it&rsquo;s
                their memory, not yours. Every conversation on their platform makes their models smarter, and your
                competitor&rsquo;s experience identical to yours.
              </p>
              <p>
                Nobody asks which search algorithm powers the bar they type into. They won&rsquo;t ask which model runs
                your stack either. When the next one drops — cheaper, faster, better — you&rsquo;ll switch. And start from
                zero. Again.
              </p>
            </div>
            <blockquote className="mf-pull" data-reveal>
              What happens to everything you learn between now and the next switch? Where does it go? <em>Who owns it?</em>
            </blockquote>
            <p className="mf-coda" data-reveal>
              That layer wasn&rsquo;t built. Until now.
            </p>
          </section>

          <section id="what" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">02</span> What it is
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              The intelligence layer that was never <em>built</em>.
            </h2>
            <div className="mf-prose" data-reveal data-delay="2">
              <p>
                LongStrider sits above your existing stack — making sense of what every tool knows, keeping what actually
                mattered, and compounding it over time. It doesn&rsquo;t replace your tools. It&rsquo;s what makes them
                worth keeping.
              </p>
              <p>
                It adapts at every scale. For a person, it learns how you think and what you need. For a team, it builds
                shared context that survives people changing roles. For an enterprise, it accumulates what thousands of
                people and years of decisions have taught it — all sovereign, all yours.
              </p>
              <p>
                And it isn&rsquo;t a black box. Every answer shows what it drew on and why. Disagree, correct it, and the
                correction is kept and logged. What it knows can be audited, because every decision it makes leaves a
                record.
              </p>
            </div>
          </section>

          <section id="moat" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> Your moat
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              Every company using AI today is building on <em>rented land</em>.
            </h2>
            <div className="mf-prose" data-reveal data-delay="2">
              <p>
                The models get smarter every quarter. The prices drop every month. And when you switch providers — and you
                will — you start over with nothing.
              </p>
              <p>
                The companies that win the next decade won&rsquo;t be the ones with the best models. Everyone has the same
                models. They&rsquo;ll be the ones who built something the models can&rsquo;t replace: an intelligence layer
                that knows their business, compounds over time, and belongs entirely to them.
              </p>
              <p>
                That&rsquo;s your moat. The asset that shows up on a term sheet, survives an acquisition, and gives every
                tool in your stack an advantage your competitor can&rsquo;t buy.
              </p>
            </div>
            <blockquote className="mf-pull" data-reveal>
              The models will keep getting smarter. The question is whether they&rsquo;re getting smarter about{" "}
              <em>your</em> business — or just smarter in general.
            </blockquote>
          </section>

          <section id="practice" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">04</span> In practice
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              What this looks like in the <em>room</em>.
            </h2>
            <div className="mf-scenes">
              {SCENARIOS.map((s) => (
                <div key={s.title} className="mf-scene" data-reveal>
                  <h3>{s.title}</h3>
                  <div className="mf-prose">
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  <p className="mh-story-turn mf-turn">{s.turn}</p>
                </div>
              ))}
            </div>
            <p className="lx-illustrative mf-left">Scenarios</p>
          </section>

          <section id="who" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">05</span> Who it&rsquo;s for
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              For companies whose advantage is what they <em>know</em>.
            </h2>
            <div className="mf-grid">
              {PERSONAS.map((p, i) => (
                <div key={p.type} className="mf-card lx-card" data-reveal data-delay={String((i % 2) + 1)}>
                  <h3>{p.type}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="how" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">06</span> How it works
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              Five things no other system does <em>together</em>.
            </h2>
            <div className="mf-prose" data-reveal data-delay="2">
              <p>
                LongStrider sits between your organisation and whichever model you choose. It doesn&rsquo;t replace the
                model. It makes the model aware of your business in a way no model provider can.
              </p>
            </div>
            <ol className="mf-caps">
              {CAPABILITIES.map((c, i) => (
                <li key={c.title} data-reveal>
                  <span className="mf-cap-n lx-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mf-more" data-reveal>
              <Link href="/concepts/how-it-works">Follow one sentence through the system →</Link>
            </p>
          </section>

          <section id="landscape" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">07</span> The landscape
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              A category that wasn&rsquo;t <em>built</em>.
            </h2>
            <blockquote className="mf-pull" data-reveal>
              Most AI remembers everything and agrees with everything. LongStrider remembers everything and has the{" "}
              <em>integrity</em> to challenge you.
            </blockquote>
            <div className="mf-landscape">
              {LANDSCAPE.map((c) => (
                <div key={c.name} className="mh-fact" data-reveal>
                  <h3>{c.name}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="next" className="mf-chapter">
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">08</span> What&rsquo;s next
            </p>
            <h2 className="lx-display mf-h2" data-reveal data-delay="1">
              Four ways in. One <em>decision</em>.
            </h2>
            <div className="mf-prose" data-reveal data-delay="2">
              <p>
                LongStrider isn&rsquo;t a subscription you spin up and forget. It&rsquo;s institutional intelligence you
                build, own and compound — configured for your environment, your regulators and your timeline.
              </p>
            </div>
            <div className="mf-grid">
              {TIERS.map((t, i) => (
                <div key={t.name} className="mf-card lx-card" data-reveal data-delay={String((i % 2) + 1)}>
                  <h3>{t.name}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
            <p className="mf-coda" data-reveal>
              We don&rsquo;t sell seat licences. We build it with you — and what gets built belongs to you.
            </p>
          </section>
        </article>
      </div>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            You&rsquo;re not buying software. You&rsquo;re buying the head start.
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Bring us your <em>hardest</em> problem.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            If you recognise your organisation in these pages, start with a working session — your people, a real question,
            and what you&rsquo;d own ninety days from now.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="3">
            <a className="lx-btn lx-btn-primary" href="/pilot">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <Link className="lx-btn lx-btn-ghost" href="/concepts/product">
              See what it does
            </Link>
          </div>
        </div>
      </section>

      <footer className="lx-foot">
        <div className="lx-wrap">
          Concept preview — not published. <Link href="/concepts">All concepts</Link>
        </div>
      </footer>
    </main>
  )
}
