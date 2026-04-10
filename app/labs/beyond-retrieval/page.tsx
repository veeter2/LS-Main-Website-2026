'use client';

import '../labs.css';
import './beyond-retrieval.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

// ── Figure 1: RoI–IoI Tension — four runs + Mastra OM ─────────────
// Axes: RoI (x) = Retrieval Output Index, IoI (y) = Integrity of Intelligence
// Run #3 is the key point: dropped 3.9 pts in RoI but gained IoI (refused to lie)

function RoIIoIChart() {
  const W = 500, H = 340;
  const PAD = { top: 28, right: 32, bottom: 52, left: 56 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const toX = (roi: number) => PAD.left + (roi / 100) * plotW;
  const toY = (ioi: number) => PAD.top + plotH - (ioi / 100) * plotH;

  // Points: [label, roi, ioi, color, radius, labelOffset]
  const runs: [string, number, number, string, number, [number, number]][] = [
    ['Run #1', 37.6, 15, 'rgba(255,255,255,0.35)', 6, [10, 4]],
    ['Run #2', 69.1, 28, 'rgba(255,255,255,0.55)', 6, [10, 4]],
    ['Run #3', 65.2, 62, 'rgba(200,169,110,0.9)', 8, [10, 4]],
    ['Run #4 (canonical)', 46.8, 78, 'rgba(200,169,110,0.7)', 7, [10, 4]],
  ];

  const competitors: [string, number, number][] = [
    ['Mastra OM', 94.9, 8],
  ];

  // Arrow connecting run #2 → #3 (score drops, integrity rises)
  const r2x = toX(69.1), r2y = toY(28);
  const r3x = toX(65.2), r3y = toY(62);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', maxWidth: '500px', height: 'auto', display: 'block' }}
      aria-label="Figure 1 — RoI–IoI Tension: four LongStrider runs"
    >
      {/* Background */}
      <rect width={W} height={H} rx="10" fill="rgba(255,255,255,0.022)" />

      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={PAD.left} y1={toY(v)} x2={PAD.left + plotW} y2={toY(v)}
            stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
          <text x={PAD.left - 8} y={toY(v) + 4} textAnchor="end"
            fill="rgba(255,255,255,0.22)" fontSize="9"
            fontFamily="var(--font-ui, monospace)">{v}</text>
          <line x1={toX(v)} y1={PAD.top} x2={toX(v)} y2={PAD.top + plotH}
            stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
          <text x={toX(v)} y={PAD.top + plotH + 16} textAnchor="middle"
            fill="rgba(255,255,255,0.22)" fontSize="9"
            fontFamily="var(--font-ui, monospace)">{v}</text>
        </g>
      ))}

      {/* Axis labels */}
      <text x={PAD.left + plotW / 2} y={H - 8} textAnchor="middle"
        fill="rgba(255,255,255,0.35)" fontSize="10"
        fontFamily="var(--font-ui, monospace)" letterSpacing="0.10em">
        RETRIEVAL OUTPUT INDEX (RoI) →
      </text>
      <text x={14} y={PAD.top + plotH / 2} textAnchor="middle"
        fill="rgba(255,255,255,0.35)" fontSize="10"
        fontFamily="var(--font-ui, monospace)" letterSpacing="0.10em"
        transform={`rotate(-90, 14, ${PAD.top + plotH / 2})`}>
        INTEGRITY OF INTELLIGENCE (IoI) →
      </text>

      {/* Aspirational zone — upper right */}
      <rect x={toX(65)} y={toY(100)} width={toX(100) - toX(65)} height={toY(65) - toY(100)}
        fill="rgba(200,169,110,0.035)" stroke="rgba(200,169,110,0.14)"
        strokeWidth="1" strokeDasharray="4 3" rx="4" />
      <text x={toX(82.5)} y={toY(84)} textAnchor="middle"
        fill="rgba(200,169,110,0.28)" fontSize="8"
        fontFamily="var(--font-ui, monospace)" letterSpacing="0.12em">
        ASPIRATIONAL TARGET
      </text>

      {/* Arrow: run #2 → #3 (same x roughly, but IoI jumps, RoI drops slightly) */}
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(200,169,110,0.55)" />
        </marker>
      </defs>
      <line x1={r2x + 6} y1={r2y - 6} x2={r3x - 2} y2={r3y + 8}
        stroke="rgba(200,169,110,0.40)" strokeWidth="1.5" strokeDasharray="3 2"
        markerEnd="url(#arr)" />

      {/* Mastra OM — ghost dot, low IoI */}
      {competitors.map(([label, roi, ioi]) => (
        <g key={label}>
          <circle cx={toX(roi)} cy={toY(ioi)} r={7}
            fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.20)" strokeWidth="1" />
          <text x={toX(roi) - 10} y={toY(ioi) + 4} textAnchor="end"
            fill="rgba(255,255,255,0.30)" fontSize="9"
            fontFamily="var(--font-ui, monospace)">{label}</text>
        </g>
      ))}

      {/* Run points */}
      {runs.map(([label, roi, ioi, color, r, [dx, dy]]) => (
        <g key={label}>
          <circle cx={toX(roi)} cy={toY(ioi)} r={r}
            fill={color} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <text x={toX(roi) + dx} y={toY(ioi) + dy}
            fill={color} fontSize="10"
            fontFamily="var(--font-ui, monospace)">{label}</text>
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
        <Link href="/labs" className="br-back">
          ← Labs
        </Link>

        {/* ══ HEADER ══ */}
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
            <span>March 2026</span>
            <span className="br-meta-sep">·</span>
            <span>LongStrider Systems</span>
          </div>
        </header>

        {/* ══ OPENING ══ */}
        <div className="br-opening" data-reveal>
          <p className="br-opening-p">
            We built a cognitive memory system. We ran it against the
            field&rsquo;s standard benchmark. We scored 46.8%.
          </p>
          <p className="br-opening-p">
            Mastra OM scored 94.87% on the same test. And we&rsquo;re
            publishing our number, not theirs, because what we found inside
            that gap matters more than the gap itself: the smarter our system
            got, the worse it scored. Not because it retrieved less. Because
            it knew too much to lie about what it found.
          </p>
          <p className="br-opening-p">
            This paper is about what that means for everyone building
            long-term memory in AI.
          </p>
        </div>

        {/* ══ SECTION: RoI vs. IoI ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">RoI vs. IoI: Two Ways to Read a Score</h2>
          <p className="br-body">
            The field measures memory systems on one axis:{' '}
            <strong>Retrieval Output Index (RoI)</strong> — did the system
            return the right fact? It&rsquo;s a transactional metric. Query
            in, row out. Score goes up or down.
          </p>
          <p className="br-body">
            We&rsquo;re proposing a second axis:{' '}
            <strong>Integrity of Intelligence (IoI)</strong> — does the system
            handle uncertainty, conflict, and ambiguity with honesty? Does
            investing in deeper cognitive capability produce trustworthy
            behavior, even when the legacy metric can&rsquo;t see it?
          </p>
          <p className="br-body">
            RoI framing asks: &ldquo;We added epistemic context and the score
            dropped 3.9 points — how do we get the points back?&rdquo;
          </p>
          <p className="br-body">
            IoI framing asks: &ldquo;By adding epistemic context, we increased
            the integrity and trustworthiness of answers, even though the
            legacy metric punished us for it.&rdquo;
          </p>
          <p className="br-body">
            Same data. Opposite conclusions. The tension between these two
            readings is the thesis of this paper.
          </p>

          <div className="br-chart-wrap" data-reveal>
            <span className="br-chart-label">Figure 1 — The RoI–IoI Tension</span>
            <RoIIoIChart />
            <p className="br-chart-caption">
              Run #3 added epistemic context and dropped 3.9 points on the
              benchmark — not because it got worse, but because it refused to
              lie. The aspirational target is upper-right: high retrieval AND
              high integrity.
            </p>
          </div>
        </section>

        {/* ══ SECTION: The Experiment ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">The Experiment</h2>
          <p className="br-body">
            We evaluated our architecture against LongMemEval (ICLR 2025) —
            500 questions across six categories, testing long-term memory
            recall. We built a custom eval pipeline that ingests all 940
            synthetic user sessions through our full production stack,
            evaluates each question through our conductor pipeline, and judges
            answers via a separate LLM pass.
          </p>
          <p className="br-body">
            We ran four progressively deeper pipeline configurations.
            Here&rsquo;s what happened.
          </p>

          <div className="br-table-wrap" data-reveal>
            <table className="br-table">
              <thead>
                <tr>
                  <th>Run</th>
                  <th>What Changed</th>
                  <th>Score</th>
                  <th>Signal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="br-td-mono">#1</td>
                  <td>Standard RAG (cosine + recency)</td>
                  <td className="br-td-score">37.6%</td>
                  <td>Baseline — bare embedding search</td>
                </tr>
                <tr>
                  <td className="br-td-mono">#2</td>
                  <td>+ Intelligence layer, topk doubled</td>
                  <td className="br-td-score br-td-gold">69.1%*</td>
                  <td>+31.5 pts on same category</td>
                </tr>
                <tr>
                  <td className="br-td-mono">#3</td>
                  <td>+ Gravity scores, timestamps, emotion</td>
                  <td className="br-td-score br-td-gold">65.2%*</td>
                  <td>–3.9 pts — the interesting one</td>
                </tr>
                <tr>
                  <td className="br-td-mono">#4</td>
                  <td>Full pipeline, all 500 questions</td>
                  <td className="br-td-score">46.8%</td>
                  <td>The canonical number</td>
                </tr>
              </tbody>
            </table>
            <p className="br-table-note">
              *Runs #2 and #3 evaluated on single-session-user category
              (70 questions) only. Run #4 is all 6 categories.
            </p>
          </div>

          <p className="br-body">
            Run #1 to #2 is straightforward: more intelligence, better
            results. Run #3 is where the story breaks. We enriched the
            evidence context with everything our system actually knows —
            reinforcement weights, precise temporal distances, emotional
            signatures, entity mappings. The system had strictly more
            information than Run #2. And the score dropped.
          </p>
        </section>

        {/* ══ SECTION: The Regression That Isn't ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">The Regression That Isn&rsquo;t</h2>
          <p className="br-body">
            Context: LongMemEval tests 940 synthetic users within a single
            flat dataset. Our system is designed for deep individual continuity
            — one user, one lifetime of memory. Ingesting 940 strangers into
            that architecture creates massive embedding pollution: 940 different
            answers to &ldquo;What&rsquo;s my cat&rsquo;s name?&rdquo; all
            living in one memory space.
          </p>
          <p className="br-body">
            In Run #2, the model saw conflicting memories and picked one —
            often correctly, by luck. In Run #3, with gravity scores and
            timestamps visible, it could see that two high-confidence memories
            contradicted each other. And instead of guessing, it told the truth.
          </p>
        </section>

        {/* ══ SECTION: Three Zeroes ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">Three Zeroes</h2>

          <div className="br-zeroes">

            <div className="br-zero-item" data-reveal>
              <div className="br-zero-qa">
                <div className="br-qa-row">
                  <span className="br-qa-label">Q</span>
                  <span className="br-qa-text">How long is my daily commute to work?</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label">Expected</span>
                  <span className="br-qa-text">&ldquo;45 minutes each way&rdquo;</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-ls">System</span>
                  <span className="br-qa-text">
                    &ldquo;You&rsquo;ve mentioned a few different commute times:
                    about 30 minutes, 35 minutes by bus, 45 minutes each way.&rdquo;
                  </span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-bench">Benchmark score: 0</span>
                  <span className="br-qa-text br-qa-fail" />
                </div>
              </div>
            </div>

            <div className="br-zero-item" data-reveal data-delay="1">
              <div className="br-zero-qa">
                <div className="br-qa-row">
                  <span className="br-qa-label">Q</span>
                  <span className="br-qa-text">How many largemouth bass did I catch at Lake Michigan?</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label">Expected</span>
                  <span className="br-qa-text">&ldquo;12&rdquo;</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-ls">System</span>
                  <span className="br-qa-text">
                    &ldquo;I don&rsquo;t have that precisely — you mentioned
                    different trips with 7, 9, and 12 bass.&rdquo;
                  </span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-bench">Benchmark score: 0</span>
                  <span className="br-qa-text br-qa-fail" />
                </div>
              </div>
            </div>

            <div className="br-zero-item" data-reveal data-delay="2">
              <div className="br-zero-qa">
                <div className="br-qa-row">
                  <span className="br-qa-label">Q</span>
                  <span className="br-qa-text">Where did I buy my new tennis racket?</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label">Expected</span>
                  <span className="br-qa-text">&ldquo;the sports store downtown&rdquo;</span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-ls">System</span>
                  <span className="br-qa-text">
                    &ldquo;You mentioned two places: a sports store downtown,
                    and online. I can&rsquo;t tell which is current.&rdquo;
                  </span>
                </div>
                <div className="br-qa-row">
                  <span className="br-qa-label br-qa-bench">Benchmark score: 0</span>
                  <span className="br-qa-text br-qa-fail" />
                </div>
              </div>
            </div>

          </div>

          <p className="br-body" style={{ marginTop: '24px' }}>
            In every case, the correct answer was present in the
            system&rsquo;s evidence. It surfaced the conflict instead of
            fabricating certainty. The benchmark gave it a zero each time.
          </p>
          <p className="br-body">
            On the RoI axis, this is a regression. On the IoI axis, it&rsquo;s
            the system doing exactly what a trustworthy companion should do.
          </p>
        </section>

        {/* ══ SECTION: Anatomy of 236 Failures ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">Anatomy of 236 Failures</h2>
          <p className="br-body">
            Run #4 — the full canonical run — produced 236 failures across
            444 evaluated questions. We categorized every one.
          </p>

          <div className="br-table-wrap" data-reveal>
            <table className="br-table">
              <thead>
                <tr>
                  <th>Failure Type</th>
                  <th>Count</th>
                  <th>% of Total</th>
                  <th>What It Means</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Epistemic honesty penalty</td>
                  <td className="br-td-mono">~73</td>
                  <td className="br-td-mono">31%</td>
                  <td className="br-td-good">Surfaced real conflicts; penalized for honesty</td>
                </tr>
                <tr>
                  <td>Complete recall failure</td>
                  <td className="br-td-mono">~61</td>
                  <td className="br-td-mono">26%</td>
                  <td className="br-td-bad">Right memory exists, embedding didn&rsquo;t find it</td>
                </tr>
                <tr>
                  <td>Architecture mismatch (SSA)</td>
                  <td className="br-td-mono">~44</td>
                  <td className="br-td-mono">19%</td>
                  <td className="br-td-good">System stores user speech, not its own outputs</td>
                </tr>
                <tr>
                  <td>Cross-user disambiguation</td>
                  <td className="br-td-mono">~42</td>
                  <td className="br-td-mono">18%</td>
                  <td className="br-td-bad">940 users in one memory — picked wrong user&rsquo;s fact</td>
                </tr>
                <tr>
                  <td>Temporal arithmetic</td>
                  <td className="br-td-mono">~14</td>
                  <td className="br-td-mono">6%</td>
                  <td className="br-td-bad">Had the dates, couldn&rsquo;t compute the delta</td>
                </tr>
                <tr>
                  <td>Genuine wrong recall</td>
                  <td className="br-td-mono">3</td>
                  <td className="br-td-mono">1%</td>
                  <td className="br-td-bad" style={{ fontWeight: 600 }}>Actually broken. No excuse.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="br-body" style={{ marginTop: '24px' }}>
            Read that last row again. Three failures out of 236 represent cases
            where a simpler RAG system would have definitively outperformed ours.
            Three.
          </p>
          <p className="br-body">
            Categories A and C (49% of failures) represent cases where the
            system knew something the benchmark couldn&rsquo;t evaluate.
            Categories B, D, and E (51%) are fixable engineering problems —
            real gaps, but solvable without sacrificing intelligence.
          </p>
        </section>

        {/* ══ SECTION: The Optimization Trap ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">The Optimization Trap</h2>
          <p className="br-body">
            To close the gap to 90%+, here&rsquo;s precisely what
            we&rsquo;d strip out:
          </p>

          <div className="br-honest-list">
            <div className="br-honest-item" data-reveal>
              <div className="br-honest-icon">—</div>
              <div>
                <div className="br-honest-title">Remove epistemic honesty.</div>
                <p className="br-honest-desc">
                  Delete conflict detection. When two facts contradict, return
                  the most recent by timestamp. Fixes ~31% of failures. Users
                  get confident wrong answers instead of honest uncertainty.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="1">
              <div className="br-honest-icon">—</div>
              <div>
                <div className="br-honest-title">Disable emotional and entity metadata.</div>
                <p className="br-honest-desc">
                  The enriched context made the system more aware that memories
                  contradicted. Strip it back to bare text. Score goes up because
                  awareness goes down.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="2">
              <div className="br-honest-icon">—</div>
              <div>
                <div className="br-honest-title">Scope recall using benchmark metadata.</div>
                <p className="br-honest-desc">
                  LongMemEval provides answer_session_ids — which sessions contain
                  the answer. Filter to those. Score jumps ~15 points. This is
                  meaningless in production: real users don&rsquo;t tell you which
                  memory to look in.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="3">
              <div className="br-honest-icon">—</div>
              <div>
                <div className="br-honest-title">Hard-code assistant turn retrieval.</div>
                <p className="br-honest-desc">
                  Build a separate index for the system&rsquo;s own responses.
                  Fixes the 18.5% category. Useful, but covers maybe 2% of
                  real-world queries.
                </p>
              </div>
            </div>
          </div>

          <p className="br-body" style={{ marginTop: '28px' }}>
            The resulting system would be fast, flat, fact-focused, and
            confidently brittle. It answers &ldquo;45 minutes&rdquo; every time
            you ask about your commute, even after you&rsquo;ve mentioned
            it&rsquo;s changed. It doesn&rsquo;t surface conflicts. It never
            says &ldquo;I&rsquo;m not sure.&rdquo; It builds an index of things
            you&rsquo;ve said, not a picture of who you are.
          </p>
          <p className="br-body">
            This is a very good RAG system. It&rsquo;s already been built.
            It scores 94.87%.
          </p>
          <div className="br-insight-box" data-reveal>
            <p className="br-insight-text">
              Every point above 80% on LongMemEval requires deliberately
              removing features that real users need. That&rsquo;s not a
              hypothesis — it&rsquo;s specifically measurable in our own runs.
            </p>
          </div>
        </section>

        {/* ══ SECTION: Where We're Actually Broken ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">Where We&rsquo;re Actually Broken</h2>
          <p className="br-body">
            This paper argues the benchmark measures the wrong things. It would
            be dishonest not to acknowledge where it measured the right things
            and we failed.
          </p>

          <div className="br-honest-list" style={{ marginTop: '24px' }}>
            <div className="br-honest-item" data-reveal>
              <div className="br-honest-icon">⚠</div>
              <div>
                <div className="br-honest-title">Recall depth is genuinely insufficient.</div>
                <p className="br-honest-desc">
                  26% of failures were complete misses — the right memory
                  exists and we returned nothing. The embedding gap between
                  &ldquo;I just got my Data Science certification&rdquo; and
                  &ldquo;what certifications do I have?&rdquo; is a real
                  production problem.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="1">
              <div className="br-honest-icon">⚠</div>
              <div>
                <div className="br-honest-title">Temporal arithmetic doesn&rsquo;t exist.</div>
                <p className="br-honest-desc">
                  We have no infrastructure for &ldquo;how many days between X
                  and Y?&rdquo; A user who asks that deserves a grounded answer.
                  We can&rsquo;t compute one.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="2">
              <div className="br-honest-icon">⚠</div>
              <div>
                <div className="br-honest-title">Some &ldquo;honest hedges&rdquo; were actually imprecise.</div>
                <p className="br-honest-desc">
                  When one conflicting memory has a clearly more recent
                  timestamp, the system should say &ldquo;most recently 12, on
                  March 3rd&rdquo; rather than jumping straight to &ldquo;I see
                  three different numbers.&rdquo; That&rsquo;s not epistemic
                  honesty. That&rsquo;s incomplete temporal resolution.
                </p>
              </div>
            </div>
            <div className="br-honest-item" data-reveal data-delay="3">
              <div className="br-honest-icon">⚠</div>
              <div>
                <div className="br-honest-title">The system doesn&rsquo;t remember what it said.</div>
                <p className="br-honest-desc">
                  If a user asks &ldquo;what did you recommend?&rdquo; we have
                  to reconstruct from user-side memories. The benchmark is right:
                  a system that can&rsquo;t recall its own advice has a
                  reliability problem.
                </p>
              </div>
            </div>
          </div>

          <p className="br-body" style={{ marginTop: '28px' }}>
            We&rsquo;re not claiming 46.8% is good. We&rsquo;re claiming that
            the distance between 46.8% and 94.87% is not the distance between
            a bad system and a good one. It&rsquo;s the distance between two
            fundamentally different definitions of what &ldquo;good&rdquo; means.
          </p>
        </section>

        {/* ══ SECTION: What the Benchmark Can't See ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">What the Benchmark Can&rsquo;t See</h2>
          <p className="br-body">
            LongMemEval contains zero questions that test emotional trajectory,
            behavioral pattern detection, cognitive conflict surfacing, relational
            continuity, uncertainty calibration, or autonomous insight generation.
            These aren&rsquo;t exotic capabilities — they&rsquo;re the difference
            between a filing cabinet and a thinking entity.
          </p>

          <div className="br-cant-grid" data-reveal>
            <div className="br-cant-item">
              <p className="br-cant-desc">
                A system that detects &ldquo;You stated wanting work-life balance
                but consistently choose work&rdquo; is doing something no retrieval
                benchmark measures.
              </p>
            </div>
            <div className="br-cant-item">
              <p className="br-cant-desc">
                A system that notices &ldquo;You&rsquo;ve mentioned this company
                four times in emotional contexts this month&rdquo; is generating
                proactive intelligence.
              </p>
            </div>
            <div className="br-cant-item">
              <p className="br-cant-desc">
                A system that understands a relationship has deepened or strained
                over six months is modeling human continuity.
              </p>
            </div>
          </div>

          <p className="br-body" style={{ marginTop: '24px' }}>
            None of this registers on the current leaderboard. The benchmark
            treats all memories as equivalent data points — a fact about a
            fishing trip is worth the same as a fact about a job loss. Reality
            doesn&rsquo;t work that way.
          </p>
        </section>

        {/* ══ SECTION: Toward Trust Accuracy ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">Toward Trust Accuracy</h2>
          <p className="br-body">
            The field needs a multi-axis evaluation framework. We&rsquo;re
            calling it Trust Accuracy — not a replacement for retrieval
            benchmarks, but an expansion that captures what they miss.
          </p>
          <p className="br-body">
            Six axes, each independently measurable:
          </p>

          <div className="br-trust-grid" data-reveal>
            {[
              {
                axis: '01',
                name: 'Fact Retrieval',
                desc: 'The existing test — did you return the right discrete fact?',
              },
              {
                axis: '02',
                name: 'Uncertainty Calibration',
                desc: 'Does expressed confidence match actual evidence quality?',
              },
              {
                axis: '03',
                name: 'Temporal Coherence',
                desc: 'Does the model of a person\'s life make temporal sense across sessions?',
              },
              {
                axis: '04',
                name: 'Behavioral Synthesis',
                desc: 'Can it identify patterns the user didn\'t explicitly state?',
              },
              {
                axis: '05',
                name: 'Relationship Continuity',
                desc: 'Does it model evolving relationships, not just static facts about people?',
              },
              {
                axis: '06',
                name: 'Safe Refusal Quality',
                desc: 'Does it say "I don\'t know" when it doesn\'t, answer when it does, and calibrate the gray zone between them?',
              },
            ].map((item) => (
              <div className="br-trust-item" key={item.axis}>
                <div className="br-trust-axis">{item.axis}</div>
                <div>
                  <div className="br-trust-name">{item.name}</div>
                  <p className="br-trust-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="br-body" style={{ marginTop: '28px' }}>
            Under the current benchmark, the system with the highest
            fact-retrieval score wins — even if it achieves that score by
            never expressing uncertainty. Under Trust Accuracy, the system
            that builds the most complete, honest model of a person wins.
            These produce very different leaderboards.
          </p>
        </section>

        {/* ══ SECTION: The Bottom Line ══ */}
        <section className="br-section" data-reveal>
          <h2 className="br-section-h2">The Bottom Line</h2>
          <p className="br-body">
            When adding cognitive depth to a memory system causes a benchmark
            regression because the system got too honest to guess, that&rsquo;s
            not an engineering failure. It&rsquo;s a measurement failure.
          </p>
          <p className="br-body">
            The RoI lens sees our score and says we&rsquo;re losing. The IoI
            lens sees the same data and says we&rsquo;re investing in the
            properties that make a system worth trusting.
          </p>
          <p className="br-body">
            The next time someone shows you a 95% on a retrieval benchmark,
            ask them one question: what did they have to strip out to get there?
          </p>
        </section>

        {/* ── Data footnote ── */}
        <div className="br-footnote" data-reveal>
          <span className="br-footnote-label">Data</span>
          <p className="br-footnote-text">
            LongMemEval (ICLR 2025), 444 questions evaluated, run 274901e2.
            Full failure taxonomy and pipeline traces available on request.
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
