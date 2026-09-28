import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Research · concept" }

/**
 * Research: publish the score, not the spin. The Beyond Retrieval paper
 * (March 2026), the Trust Accuracy axes it proposes, what has been fixed
 * since, and the fast/slow direction the research is heading.
 */

const NUMBERS = [
  { n: "46.8%", label: "Our LongMemEval score: published, not hidden" },
  { n: "444", label: "Questions evaluated, and every failure sorted by cause" },
  { n: "6", label: "Axes we propose for measuring whether memory can be trusted" },
]

const AXES = [
  { title: "Fact retrieval", body: "The test the field already runs: did it return the right fact?" },
  { title: "Uncertainty calibration", body: "Does its confidence match the quality of the evidence?" },
  { title: "Temporal coherence", body: "Does its picture of events make sense across months, not just one session?" },
  { title: "Pattern synthesis", body: "Can it see patterns nobody stated outright?" },
  { title: "Relationship continuity", body: "Does it follow how relationships change, not just static facts about people?" },
  { title: "Safe refusal", body: "Does it say “I don’t know” when it doesn’t, and answer when it does?" },
]

export default function ResearchConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Research</p>
            <h1 className="lx-display lx-h1" data-rise="1">
              Empirical findings. Not <em>press releases</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              We publish our numbers, including the ones that don&rsquo;t flatter us. The question that matters to a
              business isn&rsquo;t whether a system can find a fact. It&rsquo;s whether you can trust what it tells you
              when the evidence is thin, old or contradictory.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/labs/beyond-retrieval">
                Read Beyond Retrieval <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#direction">
                Where the research is going
              </a>
            </div>
          </div>
          <div data-rise="2">
            <figure className="rq lx-card" aria-label="Two ways to read a memory score">
              <span className="rq-title">Two ways to read a score</span>
              <svg viewBox="0 0 320 240" role="img" aria-label="Retrieval on one axis, integrity on the other">
                <line className="rq-axis" x1="40" y1="200" x2="300" y2="200" />
                <line className="rq-axis" x1="40" y1="200" x2="40" y2="20" />
                <rect className="rq-goal" x="200" y="24" width="96" height="60" rx="4" />
                <text className="rq-goal-text" x="248" y="58" textAnchor="middle">
                  The goal
                </text>
                <circle className="rq-them" cx="270" cy="170" r="7" />
                <text className="rq-note" x="270" y="192" textAnchor="middle">
                  Tuned to the test
                </text>
                <circle className="rq-us" cx="130" cy="96" r="8" />
                <text className="rq-note rq-note-us" x="130" y="124" textAnchor="middle">
                  LongStrider, March
                </text>
                <path className="rq-path" d="M140 90 Q 180 64 200 58" />
                <text className="rq-label" x="170" y="222" textAnchor="middle">
                  Finds the right fact →
                </text>
                <text className="rq-label" x="16" y="110" textAnchor="middle" transform="rotate(-90 16 110)">
                  Honest when unsure →
                </text>
              </svg>
            </figure>
            <p className="lx-illustrative">Illustration of the paper&rsquo;s argument, not a plot of measurements</p>
          </div>
        </div>
      </section>

      {/* 01: The paper */}
      <section className="hx-section hx-deep" id="paper">
        <div className="lx-wrap mh-story">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">01</span> Beyond Retrieval · March 2026
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            The smarter it got, the <em>worse</em> it scored.
          </h2>
          <div className="mh-story-body" data-reveal data-delay="2">
            <p>
              We ran LongStrider against LongMemEval, the field&rsquo;s standard long-term memory benchmark, and scored
              46.8%. Systems tuned to the test score above 90%. We published our number anyway, because of what we found
              inside the gap.
            </p>
            <p>
              When we gave the system a better sense of what it knew and how sure it was, the score went down. It
              started saying &ldquo;these two records disagree&rdquo; instead of picking one. The benchmark counts that as
              wrong.
            </p>
            <p className="mh-story-turn">
              It didn&rsquo;t retrieve less. <em>It knew too much to guess.</em>
            </p>
          </div>
        </div>
        <div className="lx-wrap rn">
          {NUMBERS.map((x, i) => (
            <div key={x.n} className="rn-item" data-reveal data-delay={String(i + 1)}>
              <span className="rn-n lx-num">{x.n}</span>
              <span className="rn-label">{x.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 02: Trust Accuracy */}
      <section className="hx-section" id="trust">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">02</span> Trust Accuracy
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Retrieval is one axis. Trust takes <em>six</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            A benchmark that only asks &ldquo;did you return the fact?&rdquo; rewards the system that never admits doubt.
            We proposed measuring the things a business actually relies on.
          </p>
        </div>
        <div className="lx-wrap mh-facts">
          {AXES.map((a, i) => (
            <div key={a.title} className="mh-fact" data-reveal data-delay={String((i % 3) + 1)}>
              <span className="rn-axis lx-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03: What changed since */}
      <section className="hx-section hx-deep" id="since">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-reveal>
              <span className="hx-step">03</span> What we fixed
            </p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              We published where we were broken. Then we got to <em>work</em>.
            </h2>
            <p className="lx-lead" data-reveal data-delay="2">
              The paper listed what the benchmark caught us getting wrong. One of them: the model had no reliable way to
              count, so &ldquo;how many times?&rdquo; got an estimate. Today that question is answered by an exact
              counting engine over the record, and the model is handed the number to put into words.
            </p>
          </div>
          <div className="rf" data-reveal data-delay="2">
            <div className="rf-row">
              <span className="rf-when">March 2026 · the paper</span>
              <p>&ldquo;How many times did pricing come up?&rdquo; The model estimated from the few notes it was shown.</p>
            </div>
            <div className="rf-row rf-now">
              <span className="rf-when">Since August 2026</span>
              <p>
                Counted exactly across the whole record: whole words only, only what people said, with the first and last
                time it came up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04: Direction */}
      <section className="hx-section" id="direction">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>
            <span className="hx-step">04</span> Where the research is going
          </p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Fast judgement. Slow reasoning. <em>One</em> memory.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="2">
            People make most decisions quickly and a few slowly. We&rsquo;re building the same split: a small, fast,
            carefully calibrated model for the constant everyday calls, and the large model of your choice for the moments
            that need real reasoning. Both work over the memory you own.
          </p>
        </div>
        <div className="lx-wrap s12" data-reveal data-delay="2" aria-label="A fast system and a slow system sharing one memory">
          <div className="s12-lane">
            <span className="s12-tag">Fast</span>
            <h3>Every message, in the moment</h3>
            <p>Is this worth keeping? Where does it belong? Does it contradict something we know? Small enough to run on your own hardware.</p>
          </div>
          <div className="s12-core">
            <span>The memory you own</span>
          </div>
          <div className="s12-lane">
            <span className="s12-tag">Slow</span>
            <h3>When it matters</h3>
            <p>The frontier or private model you choose, called in for the hard questions and given exactly the record it needs.</p>
          </div>
        </div>
        <p className="lx-wrap rs-note" data-reveal data-delay="3">
          Research direction, shared openly. Not yet a shipped feature.
        </p>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Judge us by what we <em>publish</em>.
          </h2>
          <p className="lx-lead hx-lead-center" data-reveal data-delay="1">
            Read the full paper: the method, the failures sorted by cause, and the case for Trust Accuracy. Then bring us
            a question from your own business and hold us to it.
          </p>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="2">
            <a className="lx-btn lx-btn-primary" href="/labs/beyond-retrieval">
              Read Beyond Retrieval <span className="lx-arrow" aria-hidden>→</span>
            </a>
            <a className="lx-btn lx-btn-ghost" href="/concepts/book">
              Book a working session
            </a>
          </div>
        </div>
      </section>

      <footer className="lx-foot">
        <div className="lx-wrap">
          Concept preview, not published. <Link href="/concepts">All concepts</Link>
        </div>
      </footer>
    </main>
  )
}
