'use client';

import '../tech.css';
import './kernel.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { StoryTimeline } from '@/components/story-timeline';

const GOLD_G = 'rgba(200,169,110,0.40)';
const PURP_G = 'rgba(139,92,246,0.45)';

// Inline hex values referenced directly in TIMELINE
const GOLD = '#c8a96e';
const PURPLE = '#8b5cf6';

const TIMELINE = [
  { id: 'control',  label: 'LLM Control',      color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'routing',  label: 'Intent Routing',    color: PURPLE, glow: PURP_G, gated: false },
  { id: 'scoring',  label: 'Five-Axis Scoring', color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'assembly', label: 'CIP Assembly',      color: PURPLE, glow: PURP_G, gated: false },
  { id: 'runtime',  label: 'Runtime Policy',    color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'agents',   label: 'Agent Integration', color: PURPLE, glow: PURP_G, gated: false },
];

const PIPELINE = [
  { label: 'Query Arrives',       sub: 'Any model · Any format',              variant: 'neutral', symbol: '{ }' },
  { label: 'Intent Router',       sub: 'Classifies · Selects strategy',       variant: 'gold',    symbol: '⤳'   },
  { label: '19 Parallel Queries', sub: 'Parallel · Fault-tolerant',             variant: 'purple',  symbol: '⊕'   },
  { label: 'Five-Axis Scoring',   sub: 'Ranked by compound weight',           variant: 'gold',    symbol: '◈'   },
  { label: 'CIP Assembly',        sub: 'Structured intelligence package',     variant: 'purple',  symbol: '▣'   },
  { label: 'Governed Response',   sub: 'Sovereign · Behavioral · Precise',   variant: 'neutral', symbol: '✦'   },
];

const CONTROLS = [
  { aspect: 'Provider Control',  value: 'Model-Agnostic',    color: 'gold',   detail: 'OpenAI, Anthropic, Ollama, or any endpoint. The intelligence layer is fully independent of the model. Swap providers without touching the kernel.' },
  { aspect: 'Context Control',   value: 'CIP-Assembled',     color: 'purple', detail: 'Every LLM call receives a Contextual Intelligence Package — not raw history. Structured, ranked, and governed. The model sees exactly what the kernel decides it should see.' },
  { aspect: 'Behavioral Control',value: 'Runtime-Governed',  color: 'gold',   detail: 'The RuntimePolicy — written by the nightly engine — sets tone, challenge threshold, and depth for the next 24 hours. Persistent across every session and every model.' },
  { aspect: 'Memory Control',    value: 'Compounding',       color: 'purple', detail: 'What was learned in January shapes how the model responds in June. Automatically. The kernel routes compounded intelligence into every response without being instructed to.' },
];

const INTENTS = [
  { type: 'Recall',     sub: 'Retrieve a specific memory, decision, or entity record',  color: 'gold'   },
  { type: 'Synthesis',  sub: 'Cross-topic reasoning across the full substrate',          color: 'purple' },
  { type: 'Analysis',   sub: 'Pattern detection across longitudinal data',               color: 'gold'   },
  { type: 'Action',     sub: 'Agent task — result writes back to the substrate',        color: 'purple' },
  { type: 'Governance', sub: 'Evidence-challenge mode — behavioral override active',    color: 'gold'   },
];

const AXES = [
  { n: '01', name: 'Topic Similarity',     badge: 'Semantic',      desc: 'Vector embedding — the floor, not the ceiling. Every query starts here and is supplemented by four higher-order signals.' },
  { n: '02', name: 'Relevance Weight',     badge: 'Gravitational', desc: 'Frequency, recency, emotional density, and outcome correlation. What actually mattered — not just what surfaced.' },
  { n: '03', name: 'Cluster Membership',   badge: 'Structural',    desc: 'Information inside a Knowledge Cluster scores higher. Clusters compound. Isolated memories do not. Architecture enforces this.' },
  { n: '04', name: 'Entity Relationships', badge: 'Relational',    desc: 'Co-occurrence inference. Alias resolution. The live Relationship Graph — not keyword proximity.' },
  { n: '05', name: 'Temporal Horizon',     badge: 'Longitudinal',  desc: 'Recent, longitudinal, and historical weighting applied simultaneously — in proportion to the query context.' },
];

const QUERY_LABELS = [
  'Memories', 'Clusters', 'Entity Graph', 'Narratives',
  'Decisions', 'Arcs', 'Relationships', 'Cortex Config',
  'Corrections', 'Well Score', 'Temporal', 'Behavioral',
  'Topic Sim', 'Gravity', 'RuntimePolicy', 'Agent Writes',
  'Patterns', 'Salience', 'Edge Topology',
];

const CIP_LINES = [
  'Ranked memory records (top 12)',
  'Active Knowledge Cluster contexts',
  'Entity profile + relationship map',
  'Narrative arc — current trajectory',
  'RuntimePolicy — behavioral params',
  'Correction flags — active overrides',
];

const AGENTS = [
  { icon: '◉', name: 'Research Agent',    trigger: 'Scheduled',     writes: 'Topic summaries → Knowledge Cluster' },
  { icon: '◎', name: 'Pattern Monitor',   trigger: 'Threshold',     writes: 'Behavioral signals → Entity Profile' },
  { icon: '◈', name: 'Decision Tracker',  trigger: 'Event-driven',  writes: 'Decision records → Decision Cluster' },
  { icon: '◐', name: 'Narrative Builder', trigger: 'Nightly',       writes: 'Arc updates → Narrative Substrate' },
];

const POLICY_ROWS = [
  { key: 'challenge_threshold',  val: 'Float 0–1. Controls how aggressively the system surfaces contradictions. Written by governance pass. Applied immediately.' },
  { key: 'response_depth',       val: 'Enum: concise / standard / deep. Set per entity profile nightly. Adapts to observed preference patterns.' },
  { key: 'tone_calibration',     val: 'Formal / direct / collaborative. Derived from Communication Calibration principle and behavioral history.' },
  { key: 'evidence_gate',        val: 'Boolean. When active: assertions require observed supporting evidence before being surfaced.' },
  { key: 'recency_bias_flag',    val: 'Triggered when temporal analysis detects anchoring to short-term data. Surfaces longitudinal pattern explicitly.' },
];

// ── Five-Axis SVG Radar ───────────────────────────────────────
function FiveAxisRadar() {
  const cx = 160; const cy = 160; const r = 110;
  const angles = [-90, -18, 54, 126, 198];
  const toRad = (d: number) => d * Math.PI / 180;
  const scores = [0.88, 0.74, 0.93, 0.70, 0.82];
  const pts  = angles.map(a => ({ x: cx + r * Math.cos(toRad(a)), y: cy + r * Math.sin(toRad(a)) }));
  const sPts = angles.map((a, i) => ({ x: cx + r * scores[i] * Math.cos(toRad(a)), y: cy + r * scores[i] * Math.sin(toRad(a)) }));
  return (
    <svg viewBox="0 0 320 320" className="kn-radar" aria-hidden>
      {[0.25, 0.5, 0.75, 1].map(s => (
        <polygon key={s} points={pts.map(p => `${cx+(p.x-cx)*s},${cy+(p.y-cy)*s}`).join(' ')}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {pts.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />)}
      <polygon points={sPts.map(p=>`${p.x},${p.y}`).join(' ')}
        fill="rgba(200,169,110,0.10)" stroke="rgba(200,169,110,0.55)" strokeWidth="1.5" className="kn-radar-score" />
      {sPts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#c8a96e" className="kn-radar-dot" style={{animationDelay:`${i*0.15}s`}} />)}
      {pts.map((p, i) => {
        const lx = cx + (p.x-cx)*1.3; const ly = cy + (p.y-cy)*1.3;
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
          fontSize="8" fill="rgba(200,169,110,0.55)" fontFamily="'Inter',system-ui" letterSpacing="0.14em">
          {AXES[i].badge.toUpperCase()}
        </text>;
      })}
      <circle cx={cx} cy={cy} r={3} fill="rgba(200,169,110,0.4)" />
      <circle cx={cx} cy={cy} r={r+22} fill="none" stroke="rgba(200,169,110,0.06)" strokeWidth="1"
        strokeDasharray="3 5" className="kn-radar-ring" />
    </svg>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function KernelPage() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('deck-visible'); }),
      { threshold: 0.07, rootMargin: '0px 0px -5% 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="kn-root">
      <div className="tech-progress-bar" style={{ width: `${scrollPct * 100}%` }} />
      <StoryTimeline nodes={TIMELINE} />

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="kn-hero">
        <div className="kn-orb kn-orb-gold" />
        <div className="kn-orb kn-orb-purple" />
        <div className="kn-hero-grid tech-container">

          {/* Copy */}
          <div className="kn-hero-copy">
            <Link href="/technology" className="kn-back-link" data-reveal>← Technology Overview</Link>
            <span className="kn-eyebrow" data-reveal>Intelligence Kernel — Architecture</span>
            <h1 className="kn-h1" data-reveal data-delay="1">
              Every query.<br />One deterministic<br />operating layer.
            </h1>
            <p className="kn-lead" data-reveal data-delay="2">
              The Intelligence Kernel is what makes any LLM sovereign. It wraps every model call in
              memory, governance, and compounding context — regardless of which provider renders the response.
            </p>
            <p className="kn-sub" data-reveal data-delay="3">
              Six stages. Deterministic. Running on every request your organization makes.
            </p>
          </div>

          {/* Animated Pipeline */}
          <div className="kn-pipeline-wrap" data-reveal data-delay="2">
            {PIPELINE.map((stage, i) => (
              <div key={stage.label}>
                <div className={`kn-pipe-stage kn-pipe-stage-${stage.variant}`}>
                  <div className="kn-pipe-symbol">{stage.symbol}</div>
                  <div>
                    <div className="kn-pipe-label">{stage.label}</div>
                    <div className="kn-pipe-sub">{stage.sub}</div>
                  </div>
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className="kn-connector"><div className="kn-packet" /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ LLM CONTROL ════════════════════════════════════════ */}
      <section className="kn-section tech-container" data-section="control">
        <div className="kn-section-header">
          <span className="kn-section-label" data-reveal>The Control Layer</span>
          <h2 className="kn-section-h2" data-reveal data-delay="1">
            You decide the model.<br />The kernel decides what it knows.
          </h2>
          <p className="kn-section-body" data-reveal data-delay="2">
            LongStrider doesn&apos;t pick your LLM. It wraps whichever one you choose
            in four layers of sovereign control — applied to every single call, automatically.
          </p>
        </div>
        <div className="kn-control-grid" data-reveal data-delay="2">
          {CONTROLS.map(c => (
            <div key={c.aspect} className={`kn-control-card${c.color === 'purple' ? ' kn-control-card-purple' : ''}`}>
              <p className="kn-control-aspect">{c.aspect}</p>
              <p className="kn-control-value">{c.value}</p>
              <p className="kn-control-detail">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ INTENT ROUTING ═════════════════════════════════════ */}
      <section className="kn-section tech-container" data-section="routing">
        <div className="tech-grid">
          <div>
            <p className="kn-section-label" data-reveal>01 — Intent Router</p>
            <h2 className="kn-section-h2" data-reveal data-delay="1">
              Before any retrieval runs,<br />the query is classified.
            </h2>
            <p className="kn-section-body" data-reveal data-delay="2">
              The Intent Router reads the incoming query and assigns a retrieval strategy before
              a single database call is made. Five intent types. Each selects a different retrieval
              profile and CIP assembly pattern.
            </p>
            <div className="tech-card" style={{ marginTop: '28px' }} data-reveal data-delay="3">
              <div className="tech-facts">
                {[
                  { dot: 'gold',   text: 'Intent classification runs before retrieval — no wasted queries' },
                  { dot: 'purple', text: 'Each intent type maps to a distinct retrieval strategy and scoring weight profile' },
                  { dot: 'gold',   text: 'Misrouted intent = wrong memory surface. Classification accuracy is architecture, not tuning.' },
                ].map((f, i) => (
                  <div key={i} className="tech-fact">
                    <div className={f.dot === 'gold' ? 'tech-fact-dot' : 'tech-fact-dot-purple'} />
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div data-reveal data-delay="2">
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Five intent classifications
            </p>
            <div className="kn-intent-grid">
              {INTENTS.map(intent => (
                <div key={intent.type} className={`kn-intent-row${intent.color === 'purple' ? ' kn-intent-row-purple' : ''}`}>
                  <span className="kn-intent-type">{intent.type}</span>
                  <span className="kn-intent-sub">{intent.sub}</span>
                  <div className="kn-intent-dot" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ FIVE-AXIS SCORING ══════════════════════════════════ */}
      <section className="kn-section tech-container" data-section="scoring">
        <div className="kn-section-header">
          <span className="kn-section-label" data-reveal>02 — Five-Axis Scoring</span>
          <h2 className="kn-section-h2" data-reveal data-delay="1">
            Vector similarity is axis one.<br />The floor, not the ceiling.
          </h2>
          <p className="kn-section-body" data-reveal data-delay="2">
            Every other retrieval system optimizes one signal. The kernel scores five simultaneously —
            semantic, gravitational, structural, relational, and longitudinal — then ranks by composite weight.
          </p>
        </div>
        <div className="kn-radar-section" data-reveal data-delay="2">
          <FiveAxisRadar />
          <div className="kn-axes-list">
            {AXES.map(axis => (
              <div key={axis.n} className="kn-axis-row">
                <span className="kn-axis-n">{axis.n}</span>
                <div>
                  <div className="kn-axis-name">
                    {axis.name}
                    <span className="kn-axis-badge">{axis.badge}</span>
                  </div>
                  <p className="kn-axis-desc">{axis.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ CIP ASSEMBLY ════════════════════════════════════════ */}
      <section className="kn-section tech-container" data-section="assembly">
        <div className="kn-section-header">
          <span className="kn-section-label" data-reveal>03 — CIP Assembly</span>
          <h2 className="kn-section-h2" data-reveal data-delay="1">
            19 queries. Parallel.<br />One structured package.
          </h2>
          <p className="kn-section-body" data-reveal data-delay="2">
              The Contextual Intelligence Package is assembled from 19 parallel queries —
              each contributing a distinct layer of intelligence. The architecture is designed
              for graceful degradation: every layer contributes independently, so no single
              slow source blocks the response.
            </p>
        </div>
        <div className="kn-cip-wrap" data-reveal data-delay="2">
          <div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              19 parallel queries — all sources simultaneously
            </p>
            <div className="kn-queries-grid">
              {QUERY_LABELS.map(q => (
                <div key={q} className="kn-query-cell">{q}</div>
              ))}
            </div>
          </div>
          <div className="kn-cip-arrow">→</div>
          <div className="kn-cip-package">
            <p className="kn-cip-package-label">CIP — Assembled Package</p>
            {CIP_LINES.map(line => (
              <div key={line} className="kn-cip-line">
                <div className="kn-cip-line-dot" />
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ RUNTIME POLICY ══════════════════════════════════════ */}
      <section className="kn-section tech-container" data-section="runtime">
        <div className="kn-section-header">
          <span className="kn-section-label" data-reveal>04 — Runtime Policy</span>
          <h2 className="kn-section-h2" data-reveal data-delay="1">
            Written nightly.<br />Applied to every response.
          </h2>
          <p className="kn-section-body" data-reveal data-delay="2">
            The nightly engine doesn&apos;t just consolidate memory — it writes a RuntimePolicy that
            governs how the kernel behaves for the next 24 hours. Tone, depth, challenge thresholds,
            evidence gates. Persisted in the substrate. Applied automatically.
          </p>
        </div>
        <div className="kn-policy-card" data-reveal data-delay="2">
          <p className="kn-policy-eyebrow">RuntimePolicy — example fields</p>
          <p className="kn-policy-title">Written at 02:00. Active until next cycle.</p>
          {POLICY_ROWS.map(row => (
            <div key={row.key} className="kn-policy-row">
              <code className="kn-policy-key">{row.key}</code>
              <p className="kn-policy-val">{row.val}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ AGENT INTEGRATION ═══════════════════════════════════ */}
      <section className="kn-section tech-container" data-section="agents">
        <div className="tech-grid">
          <div>
            <p className="kn-section-label" data-reveal>05 — Agent Integration</p>
            <h2 className="kn-section-h2" data-reveal data-delay="1">
              Agents that work.<br />Then write back.
            </h2>
            <p className="kn-section-body" data-reveal data-delay="2">
              Orbital agents don&apos;t just surface findings — they write them back to the memory
              substrate. Every agent task adds to the compounding intelligence. The system learns from
              what it does on your behalf, not just from what you say directly.
            </p>
            <p className="kn-section-body" style={{ marginTop: '16px' }} data-reveal data-delay="3">
              Agent writes are first-class citizens — gravity-weighted, entity-resolved, and visible
              to the five-axis scoring engine on the next retrieval.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <div className="kn-agent-grid">
              {AGENTS.map(a => (
                <div key={a.name} className="kn-agent-card">
                  <div className="kn-agent-icon">{a.icon}</div>
                  <p className="kn-agent-name">{a.name}</p>
                  <p className="kn-agent-trigger">{a.trigger}</p>
                  <p className="kn-agent-writes">
                    <span className="kn-agent-arrow">↳ </span>{a.writes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════ */}
      <section className="kn-cta-section tech-container">
        <span className="kn-cta-label" data-reveal>Next</span>
        <h2 className="kn-cta-h2" data-reveal data-delay="1">
          See where the intelligence lives.
        </h2>
        <div className="kn-cta-links" data-reveal data-delay="2">
          <Link href="/technology/memory" className="kn-cta-primary">Living Memory — The Substrate →</Link>
          <Link href="/pilot" className="kn-cta-secondary">Start a Pilot</Link>
        </div>
      </section>
    </main>
  );
}
