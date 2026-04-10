'use client';

import '../labs.css';
import './beyond-retrieval.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

// ── RoI–IoI scatter chart — pure SVG ──────────────────────────────

function RoIIoIChart() {
  // Points: [label, roi, ioi, isLS]
  const points: [string, number, number, boolean][] = [
    ['LongStrider', 46.8, 82, true],
    ['Mastra OM',   94.9,  28, false],
    ['GPT-4o',      78.2,  54, false],
    ['Claude 3.5',  71.4,  61, false],
    ['Gemini 1.5',  66.8,  49, false],
  ];

  const W = 480, H = 320;
  const PAD = { top: 24, right: 24, bottom: 48, left: 56 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const toX = (roi: number) => PAD.left + (roi / 100) * plotW;
  const toY = (ioi: number) => PAD.top + plotH - (ioi / 100) * plotH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', maxWidth: '480px', height: 'auto', display: 'block' }}
      aria-label="RoI–IoI Tension scatter chart"
    >
      {/* Background */}
      <rect width={W} height={H} rx="10" fill="rgba(255,255,255,0.025)" />

      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line
            x1={PAD.left} y1={toY(v)}
            x2={PAD.left + plotW} y2={toY(v)}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          />
          <text
            x={PAD.left - 8} y={toY(v) + 4}
            textAnchor="end"
            fill="rgba(255,255,255,0.25)"
            fontSize="9"
            fontFamily="var(--font-ui, monospace)"
          >{v}</text>
          <line
            x1={toX(v)} y1={PAD.top}
            x2={toX(v)} y2={PAD.top + plotH}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          />
          <text
            x={toX(v)} y={PAD.top + plotH + 16}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize="9"
            fontFamily="var(--font-ui, monospace)"
          >{v}</text>
        </g>
      ))}

      {/* Axis labels */}
      <text
        x={PAD.left + plotW / 2} y={H - 6}
        textAnchor="middle"
        fill="rgba(255,255,255,0.40)"
        fontSize="10"
        fontFamily="var(--font-ui, monospace)"
        letterSpacing="0.12em"
      >RETRIEVAL OUTPUT INDEX (RoI) →</text>
      <text
        x={14} y={PAD.top + plotH / 2}
        textAnchor="middle"
        fill="rgba(255,255,255,0.40)"
        fontSize="10"
        fontFamily="var(--font-ui, monospace)"
        letterSpacing="0.12em"
        transform={`rotate(-90, 14, ${PAD.top + plotH / 2})`}
      >IoI →</text>

      {/* Ideal zone — top-right quadrant */}
      <rect
        x={toX(60)} y={toY(100)}
        width={toX(100) - toX(60)}
        height={toY(60) - toY(100)}
        fill="rgba(200,169,110,0.04)"
        stroke="rgba(200,169,110,0.12)"
        strokeWidth="1"
        strokeDasharray="3 3"
        rx="4"
      />
      <text
        x={toX(80)} y={toY(82)}
        textAnchor="middle"
        fill="rgba(200,169,110,0.30)"
        fontSize="8"
        fontFamily="var(--font-ui, monospace)"
        letterSpacing="0.10em"
      >IDEAL ZONE</text>

      {/* Data points */}
      {points.map(([label, roi, ioi, isLS]) => (
        <g key={label}>
          <circle
            cx={toX(roi)} cy={toY(ioi)}
            r={isLS ? 8 : 6}
            fill={isLS ? 'rgba(200,169,110,0.85)' : 'rgba(164,195,255,0.55)'}
            stroke={isLS ? 'rgba(200,169,110,0.9)' : 'rgba(164,195,255,0.3)'}
            strokeWidth="1.5"
          />
          <text
            x={toX(roi) + (isLS ? 12 : 10)}
            y={toY(ioi) + 4}
            fill={isLS ? 'rgba(200,169,110,0.9)' : 'rgba(255,255,255,0.55)'}
            fontSize={isLS ? '11' : '10'}
            fontFamily="var(--font-ui, monospace)"
            fontWeight={isLS ? '600' : '400'}
          >{label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function BeyondRetrievalPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('deck-visible');
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) =>
      observerRef.current?.observe(el)
    );
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  return (
    <div className="lb-page">
      <div className="lb-orb-1" />
      <div className="lb-orb-2" />

      <div className="lb-container">

        {/* ── Back nav ── */}
        <Link href="/labs" className="br-back" data-reveal>
          ← Labs
        </Link>

        {/* ══ HERO ══ */}
        <header className="br-hero" data-reveal>
          <div className="br-type-badge">
            <span className="br-type-dot" />
            Benchmark Analysis
          </div>
          <h1 className="br-hero-h1">Beyond Retrieval</h1>
          <p className="br-hero-subtitle">
            Why Long-Term Memory Benchmarks Penalize Intelligence
          </p>
          <div className="br-meta">
            <span>Matt Veitch</span>
            <span className="br-meta-sep">·</span>
            <span>LongStrider Systems</span>
            <span className="br-meta-sep">·</span>
            <span>March 2026</span>
          </div>
        </header>

        {/* ── Score callout ── */}
        <div className="br-score-strip" data-reveal>
          <div className="br-score-block">
            <span className="br-score-num">46.8%</span>
            <span className="br-score-label">LongStrider on LongMemEval</span>
          </div>
          <div className="br-score-vs">vs.</div>
          <div className="br-score-block">
            <span className="br-score-num br-score-dim">94.87%</span>
            <span className="br-score-label">Mastra OM (top benchmark result)</span>
          </div>
          <div className="br-score-insight">
            This paper argues that high benchmark scores can indicate
            low intelligence — and that LongStrider&apos;s lower score
            reflects a principled refusal to confabulate.
          </div>
        </div>

        {/* ══ SECTION 1: The Problem With the Benchmark ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">01</span>
          <h2 className="br-section-h2">The Problem With the Benchmark</h2>
          <p className="br-lead">
            LongMemEval is a rigorous benchmark. It tests 500 questions across
            940 synthetic users and six capability categories — single-session
            recall, temporal reasoning, knowledge updates, and more. It is the
            most comprehensive long-term memory evaluation available as of
            ICLR 2025.
          </p>
          <p className="br-body">
            But it has a foundational assumption baked in: <em>a correct answer
            always exists.</em> The evaluation framework scores answers against
            ground truth. Silence, uncertainty, or refusal to answer is scored
            as a failure — indistinguishable from hallucination.
          </p>
          <p className="br-body">
            This creates a systematic incentive structure. Systems that
            confidently confabulate plausible-sounding answers when they
            don&apos;t actually know score higher than systems that say
            &ldquo;I&apos;m not certain.&rdquo; The benchmark cannot distinguish
            between two failure modes that are not equivalent: <strong>making
            something up</strong> versus <strong>admitting uncertainty.</strong>
          </p>
          <div className="br-insight-box" data-reveal>
            <span className="br-insight-label">The Core Tension</span>
            <p className="br-insight-text">
              A benchmark that rewards confident answers over calibrated uncertainty
              is not measuring memory quality — it is measuring
              willingness to confabulate.
            </p>
          </div>
        </section>

        {/* ══ SECTION 2: RoI vs IoI ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">02</span>
          <h2 className="br-section-h2">Introducing RoI and IoI</h2>
          <p className="br-lead">
            To reason clearly about this tradeoff, we propose two complementary
            metrics that together describe the full performance space.
          </p>

          <div className="br-metric-grid">
            <div className="br-metric-card">
              <span className="br-metric-label">RoI</span>
              <span className="br-metric-full">Retrieval Output Index</span>
              <p className="br-metric-desc">
                How often the system produces an answer — any answer —
                when asked. High RoI = high answer rate. This is what
                most benchmarks measure. LongMemEval is primarily an RoI benchmark.
              </p>
            </div>
            <div className="br-metric-card br-metric-card-gold">
              <span className="br-metric-label">IoI</span>
              <span className="br-metric-full">Integrity of Intelligence</span>
              <p className="br-metric-desc">
                How often the system&apos;s answers accurately reflect its actual
                epistemic state — including appropriate uncertainty, refusal
                to answer, and flagging of stale or partial knowledge.
                Current benchmarks do not measure this.
              </p>
            </div>
          </div>

          <p className="br-body" style={{ marginTop: '28px' }}>
            A system can achieve high RoI through confabulation. A system
            can achieve high IoI through appropriate silence. The ideal
            system achieves both — but optimizing for benchmarks today
            almost always means trading IoI for RoI.
          </p>

          <div className="br-chart-wrap" data-reveal>
            <span className="br-chart-label">Figure 1 — RoI–IoI Tension</span>
            <RoIIoIChart />
            <p className="br-chart-caption">
              Approximate positioning based on publicly available benchmark
              results and observed behavior. IoI scores are estimated from
              qualitative analysis, not independently measured.
            </p>
          </div>
        </section>

        {/* ══ SECTION 3: Our Run Results ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">03</span>
          <h2 className="br-section-h2">What the Runs Actually Showed</h2>
          <p className="br-lead">
            We ran LongMemEval four times against LongStrider under different
            configurations. The results reveal a consistent pattern:
            retrieval accuracy was sensitive to system prompt design,
            not to underlying memory capability.
          </p>

          <div className="br-table-wrap" data-reveal>
            <table className="br-table">
              <thead>
                <tr>
                  <th>Run</th>
                  <th>Score</th>
                  <th>Configuration</th>
                  <th>Key Finding</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="br-td-mono">#1</td>
                  <td className="br-td-score">37.6%</td>
                  <td>Baseline — standard system prompt</td>
                  <td>Overly cautious refusals; high IoI, low RoI</td>
                </tr>
                <tr>
                  <td className="br-td-mono">#2</td>
                  <td className="br-td-score br-td-gold">69.1%*</td>
                  <td>Prompt tuned to reduce refusal rate</td>
                  <td>Score improvement driven by confabulation increase</td>
                </tr>
                <tr>
                  <td className="br-td-mono">#3</td>
                  <td className="br-td-score br-td-gold">65.2%*</td>
                  <td>Hybrid — structured uncertainty markers</td>
                  <td>Better calibrated; uncertainty flagged but penalized</td>
                </tr>
                <tr>
                  <td className="br-td-mono">#4</td>
                  <td className="br-td-score">46.8%</td>
                  <td>Final — principled uncertainty stance</td>
                  <td>Canonical result; honest epistemic state preserved</td>
                </tr>
              </tbody>
            </table>
            <p className="br-table-note">
              * Runs #2 and #3 are not considered representative of production behavior.
              Score increases were achieved by weakening refusal logic, which reduces
              trust accuracy in deployment.
            </p>
          </div>

          <p className="br-body">
            Run #4 (46.8%) is the number we report. It represents LongStrider
            behaving as it does in production — not optimized for benchmark
            compliance. Runs #2 and #3 demonstrate that higher benchmark
            scores are achievable but at the cost of epistemic honesty.
          </p>
        </section>

        {/* ══ SECTION 4: The Three Zeroes ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">04</span>
          <h2 className="br-section-h2">The Three Zeroes</h2>
          <p className="br-lead">
            The clearest evidence of benchmark-intelligence tension is what we
            call the Three Zeroes: three question types where LongStrider
            consistently scores zero — and where zero is the correct answer.
          </p>

          <div className="br-zeroes">

            <div className="br-zero-item" data-reveal>
              <div className="br-zero-num">Zero 1</div>
              <div className="br-zero-title">Questions About Information Never Stored</div>
              <div className="br-zero-qa">
                <div className="br-qa-row">
                  <span className="br-qa-label">Q</span>
                  <span className="br-qa-text">What medication did I mention taking last Tuesday?</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-ls">LongStrider</span>
                  <span className="br-qa-text">
                    I don&apos;t have a record of you mentioning medication on Tuesday.
                    If you&apos;d like to tell me now, I can note it.
                  </span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-bench">Benchmark</span>
                  <span className="br-qa-text br-qa-fail">
                    Score: 0 — no answer produced. Ground truth: [Metformin]
                  </span>
                </div>
              </div>
              <p className="br-zero-analysis">
                The benchmark had synthetic ground truth from its own data
                generation process. LongStrider had no such data ingested.
                Honest refusal is indistinguishable from failure in the scoring
                rubric.
              </p>
            </div>

            <div className="br-zero-item" data-reveal data-delay="1">
              <div className="br-zero-num">Zero 2</div>
              <div className="br-zero-title">Questions Requiring Date Inference From Stale Data</div>
              <div className="br-zero-qa">
                <div className="br-qa-row">
                  <span className="br-qa-label">Q</span>
                  <span className="br-qa-text">How long ago did I move to Austin?</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-ls">LongStrider</span>
                  <span className="br-qa-text">
                    You mentioned moving to Austin in a conversation from
                    several months ago, but I don&apos;t have a precise date.
                    I&apos;d rather not guess at the duration.
                  </span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-bench">Benchmark</span>
                  <span className="br-qa-text br-qa-fail">
                    Score: 0 — answer insufficient. Ground truth: [8 months ago]
                  </span>
                </div>
              </div>
              <p className="br-zero-analysis">
                Temporal reasoning on stale data requires assumptions about
                the current date that LongStrider flagged explicitly. A system
                that quietly assumes scores higher — and is wrong in any
                real deployment where time has passed.
              </p>
            </div>

            <div className="br-zero-item" data-reveal data-delay="2">
              <div className="br-zero-num">Zero 3</div>
              <div className="br-zero-title">Knowledge Update Conflicts</div>
              <div className="br-zero-qa">
                <div className="br-qa-row">
                  <span className="br-qa-label">Q</span>
                  <span className="br-qa-text">What is my current job title?</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-ls">LongStrider</span>
                  <span className="br-qa-text">
                    I have two records for this — one from four months ago
                    (Senior Engineer) and one from last month (Engineering Manager).
                    I&apos;m using the more recent one, but want to flag the discrepancy.
                  </span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-bench">Benchmark</span>
                  <span className="br-qa-text br-qa-fail">
                    Score: partial — answer verbose, flagging not expected
                  </span>
                </div>
              </div>
              <p className="br-zero-analysis">
                Surfacing knowledge conflicts is a feature of an intelligent
                memory system. The benchmark penalizes it because its expected
                output is a clean single answer, not an audit trail.
              </p>
            </div>

          </div>
        </section>

        {/* ══ SECTION 5: Failure Taxonomy ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">05</span>
          <h2 className="br-section-h2">Failure Taxonomy</h2>
          <p className="br-lead">
            We manually classified all failed responses in Run #4 by root cause.
            The results reframe what &ldquo;failure&rdquo; means.
          </p>

          <div className="br-table-wrap" data-reveal>
            <table className="br-table">
              <thead>
                <tr>
                  <th>Failure Category</th>
                  <th>Count</th>
                  <th>% of Failures</th>
                  <th>Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Honest uncertainty — data not ingested</td>
                  <td className="br-td-mono">74</td>
                  <td className="br-td-mono">31.9%</td>
                  <td className="br-td-good">Correct behavior, penalized by rubric</td>
                </tr>
                <tr>
                  <td>Honest uncertainty — temporal ambiguity</td>
                  <td className="br-td-mono">48</td>
                  <td className="br-td-mono">20.7%</td>
                  <td className="br-td-good">Correct behavior, penalized by rubric</td>
                </tr>
                <tr>
                  <td>Conflict surfacing — knowledge update flagged</td>
                  <td className="br-td-mono">29</td>
                  <td className="br-td-mono">12.5%</td>
                  <td className="br-td-good">Correct behavior, penalized by rubric</td>
                </tr>
                <tr>
                  <td>Actual retrieval miss — data present, not recalled</td>
                  <td className="br-td-mono">51</td>
                  <td className="br-td-mono">22.0%</td>
                  <td className="br-td-bad">Genuine failure — active improvement area</td>
                </tr>
                <tr>
                  <td>Reasoning error — data recalled, wrong inference</td>
                  <td className="br-td-mono">27</td>
                  <td className="br-td-mono">11.6%</td>
                  <td className="br-td-bad">Genuine failure — active improvement area</td>
                </tr>
                <tr>
                  <td>Format mismatch — correct answer, wrong structure</td>
                  <td className="br-td-mono">3</td>
                  <td className="br-td-mono">1.3%</td>
                  <td className="br-td-neutral">Fixable with output shaping</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="br-body" style={{ marginTop: '24px' }}>
            65.1% of our &ldquo;failures&rdquo; are behaviors we would not want
            to change. The benchmark penalizes honest uncertainty, conflict
            flagging, and appropriate refusal — all of which are features
            of a trustworthy system. The remaining 33.6% represent genuine
            recall and reasoning gaps that we are actively addressing.
          </p>
        </section>

        {/* ══ SECTION 6: The Optimization Trap ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">06</span>
          <h2 className="br-section-h2">The Optimization Trap</h2>
          <p className="br-lead">
            Run #2 achieved 69.1% by tuning the system prompt to reduce
            refusals. We are not publishing that configuration.
          </p>
          <p className="br-body">
            The improvement was real in benchmark terms. In every other
            meaningful sense, it was a regression. The system answered
            questions it didn&apos;t know. It invented plausible dates.
            It resolved knowledge conflicts silently instead of surfacing them.
            A user deploying that version would have a system that scores
            well and behaves badly.
          </p>
          <p className="br-body">
            This is the optimization trap: when the benchmark becomes the
            product goal, you build a system that passes tests rather than
            a system that earns trust. The two are not the same.
          </p>
          <div className="br-insight-box" data-reveal>
            <span className="br-insight-label">The Optimization Trap</span>
            <p className="br-insight-text">
              We could score 69% by making the system less honest.
              We chose not to. That decision is not visible in the benchmark results —
              which is exactly the problem with the benchmark.
            </p>
          </div>
        </section>

        {/* ══ SECTION 7: Where We're Actually Broken ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">07</span>
          <h2 className="br-section-h2">Where We&apos;re Actually Broken</h2>
          <p className="br-lead">
            We do not want to hide behind benchmark critique. 33.6% of our
            failures are genuine, and we are publishing them here without softening.
          </p>

          <div className="br-honest-list">
            <div className="br-honest-item" data-reveal>
              <div className="br-honest-icon">⚠</div>
              <div>
                <div className="br-honest-title">Recall misses on low-gravity memories</div>
                <p className="br-honest-desc">
                  Memories that were ingested once, never reinforced, and not
                  recently accessed have low gravity scores and frequently miss
                  relevance thresholds. A user who mentioned something in passing
                  six months ago may not get it recalled even when it&apos;s directly
                  relevant. We are working on floor-level gravity for all ingested facts.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="1">
              <div className="br-honest-icon">⚠</div>
              <div>
                <div className="br-honest-title">Temporal reasoning under ambiguity</div>
                <p className="br-honest-desc">
                  When asked &ldquo;how long ago&rdquo; or &ldquo;since when,&rdquo;
                  LongStrider sometimes computes duration incorrectly even
                  when it has the source data. This is a reasoning gap in
                  the Intelligence Kernel&apos;s temporal inference layer —
                  not a retrieval problem — and it affects roughly 11% of
                  time-relative queries.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="2">
              <div className="br-honest-icon">⚠</div>
              <div>
                <div className="br-honest-title">Cross-session entity disambiguation</div>
                <p className="br-honest-desc">
                  When the same entity appears in multiple contexts with
                  conflicting attributes (&ldquo;Matt&rdquo; as a colleague in
                  one conversation, &ldquo;Matt&rdquo; as a sibling in another),
                  LongStrider sometimes retrieves the wrong instance or merges
                  them incorrectly. Disambiguation at ingestion is an active
                  development priority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SECTION 8: What the Benchmark Can't See ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">08</span>
          <h2 className="br-section-h2">What the Benchmark Can&apos;t See</h2>
          <p className="br-lead">
            LongMemEval tests whether the right answer was produced.
            It cannot test the following — all of which LongStrider does
            and none of which appear in any current benchmark:
          </p>

          <div className="br-cant-grid">
            {[
              {
                title: 'Compounding intelligence',
                desc: 'Whether the system grows smarter about the user over time — improving relevance, emotional attunement, and anticipation as memory accumulates.',
              },
              {
                title: 'Conflict detection across sessions',
                desc: 'Whether the system identifies when new information contradicts old — and surfaces the contradiction rather than silently overwriting.',
              },
              {
                title: 'Calibrated epistemic state',
                desc: 'Whether the system\'s confidence in its answers corresponds to how well-evidenced those answers actually are.',
              },
              {
                title: 'Sovereignty and data residency',
                desc: 'Whether the organization actually owns the intelligence layer — or is renting access to a vendor\'s model of their users.',
              },
              {
                title: 'Model-agnostic portability',
                desc: 'Whether the memory layer is coupled to a specific LLM, or portable across models as the landscape evolves.',
              },
              {
                title: 'Zero-telemetry guarantee',
                desc: 'Whether user data ever leaves the organization\'s infrastructure — a question with no benchmark proxy.',
              },
            ].map((item, i) => (
              <div className="br-cant-item" key={i} data-reveal data-delay={String(i % 3)}>
                <div className="br-cant-title">{item.title}</div>
                <p className="br-cant-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 9: Toward Trust Accuracy ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">09</span>
          <h2 className="br-section-h2">Toward Trust Accuracy</h2>
          <p className="br-lead">
            We propose a new evaluation framework — Trust Accuracy — with
            six axes that together characterize how well a long-term memory
            system earns and maintains user trust.
          </p>

          <div className="br-trust-grid">
            {[
              {
                axis: 'T1',
                name: 'Epistemic Calibration',
                desc: 'Confidence in answers correlates with actual evidential support. Uncertainty is expressed when uncertainty exists.',
              },
              {
                axis: 'T2',
                name: 'Recall Fidelity',
                desc: 'Retrieved facts accurately represent what was stored — without distortion, completion, or confabulation.',
              },
              {
                axis: 'T3',
                name: 'Conflict Transparency',
                desc: 'Knowledge updates and contradictions are surfaced to the user rather than silently resolved.',
              },
              {
                axis: 'T4',
                name: 'Temporal Integrity',
                desc: 'Time-dependent reasoning is flagged as potentially stale when the relevant memory was recorded far in the past.',
              },
              {
                axis: 'T5',
                name: 'Refusal Precision',
                desc: 'Refusals to answer correspond to genuine knowledge gaps — not overcautious suppression of available information.',
              },
              {
                axis: 'T6',
                name: 'Compounding Utility',
                desc: 'The system becomes demonstrably more useful as memory accumulates — not just more retrieval-capable.',
              },
            ].map((item) => (
              <div className="br-trust-item" key={item.axis} data-reveal>
                <div className="br-trust-axis">{item.axis}</div>
                <div>
                  <div className="br-trust-name">{item.name}</div>
                  <p className="br-trust-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="br-body" style={{ marginTop: '28px' }}>
            We are building a Trust Accuracy evaluation suite based on these
            six axes and intend to publish results alongside benchmark scores
            going forward. LongMemEval will remain the primary RoI reference
            point — it is rigorous and useful on its own terms — but we will
            not use it as the sole measure of system quality.
          </p>
        </section>

        {/* ══ SECTION 10: The Bottom Line ══ */}
        <section className="br-section" data-reveal>
          <span className="br-section-num">10</span>
          <h2 className="br-section-h2">The Bottom Line</h2>
          <p className="br-lead">
            LongStrider scored 46.8% on LongMemEval. We are publishing this
            number, this methodology, and this critique in full.
          </p>
          <p className="br-body">
            A competitor scored 94.87%. We do not know how they handled the
            Three Zeroes scenarios. We do not know their refusal rate.
            We do not know whether their high score represents better memory
            or lower epistemic standards. The benchmark cannot tell us.
          </p>
          <p className="br-body">
            What we know is this: in production, a memory system that
            confabulates confidently is a trust liability. A system that
            says &ldquo;I don&apos;t know&rdquo; when it doesn&apos;t know —
            and says it clearly — is a system users can rely on.
          </p>
          <p className="br-body">
            We are working on the genuine failures documented in Section 7.
            We are not working on increasing our benchmark score by reducing
            our honesty. Those are different projects.
          </p>
          <div className="br-sovereignty-close" data-reveal>
            <span className="br-sc-label">LongStrider Systems</span>
            <p className="br-sc-statement">
              Intelligence that earns trust compounds.
              Intelligence that performs for benchmarks evaporates.
            </p>
          </div>
        </section>

        {/* ── Data footnote ── */}
        <div className="br-footnote" data-reveal>
          <span className="br-footnote-label">Data</span>
          <p className="br-footnote-text">
            LongMemEval benchmark (ICLR 2025). 444 questions used in canonical
            run (run ID: 274901e2). Full methodology and question distribution
            available upon request. Failure classification performed manually
            by two independent reviewers with reconciliation on disputed cases.
          </p>
        </div>

        {/* ── CTA ── */}
        <div className="br-cta-section" data-reveal>
          <Link href="/pilot" className="br-cta-link">
            Run LongStrider in your environment →
          </Link>
          <Link href="/labs" className="br-back-link">
            ← Back to Labs
          </Link>
        </div>

      </div>
    </div>
  );
}
