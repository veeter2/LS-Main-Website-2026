'use client';

import './tech.css';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { StoryTimeline } from '@/components/story-timeline';

// ── Design tokens ─────────────────────────────────────────────
const GOLD   = '#c8a96e';
const PURPLE = '#8b5cf6';
const GOLD_G = 'rgba(200,169,110,0.40)';
const PURP_G = 'rgba(139,92,246,0.45)';

// ── Timeline — 9 nodes, 4 free / 5 gated ─────────────────────
const TIMELINE = [
  { id: 'ingest',      label: 'Signal Extraction', color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'channels',    label: 'Eight Channels',     color: PURPLE, glow: PURP_G, gated: false },
  { id: 'nightly',     label: 'Nightly Engine',     color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'correction',  label: 'Correction Loop',    color: PURPLE, glow: PURP_G, gated: false },
  { id: 'routing',     label: 'Intent Routing',     color: GOLD,   glow: GOLD_G, gated: true  },
  { id: 'scoring',     label: 'Five-Axis Scoring',  color: PURPLE, glow: PURP_G, gated: true  },
  { id: 'assembly',    label: 'CIP Assembly',       color: GOLD,   glow: GOLD_G, gated: true  },
  { id: 'governance',  label: 'Behavior OS',        color: PURPLE, glow: PURP_G, gated: true  },
  { id: 'deployment',  label: 'Deployment Tiers',   color: GOLD,   glow: GOLD_G, gated: true  },
];

// ── Hub diagram spokes ────────────────────────────────────────
const SPOKES = [
  { cls: 'hub-spoke-models',  relCls: 'hub-spoke-rel-gold',   rel: 'Dominates',   name: 'Your Models',          desc: 'OpenAI · Claude · Ollama · Any', variant: 'gold'   },
  { cls: 'hub-spoke-tools',   relCls: '',                     rel: 'Ingests From', name: 'Your Tools',           desc: 'CRM · Docs · APIs · Email',      variant: ''       },
  { cls: 'hub-spoke-team',    relCls: '',                     rel: 'Learns From',  name: 'Your Team',            desc: 'Every interaction compounds',    variant: ''       },
  { cls: 'hub-spoke-agents',  relCls: 'hub-spoke-rel-purple', rel: 'Deploys',      name: 'Your Agents',          desc: 'Orbital intelligence · Background tasks', variant: 'purple' },
  { cls: 'hub-spoke-infra',   relCls: '',                     rel: 'Runs On',      name: 'Your Infrastructure',  desc: 'PostgreSQL · VPC · On-premise',  variant: ''       },
  { cls: 'hub-spoke-ip',      relCls: 'hub-spoke-rel-gold',   rel: 'Builds',       name: 'Your IP',              desc: 'Knowledge graph · Compounds daily', variant: 'gold' },
];

// ── Content ───────────────────────────────────────────────────
const CHANNELS = [
  { n: '01', name: 'Real-Time Chat Signal',                desc: 'Every live interaction processed through Signal Extraction — entity-resolved, emotionally scored, embedded, and written to the substrate immediately.', gold: true },
  { n: '02', name: 'Historical Import',                    desc: 'ChatGPT and Claude export files parsed through the same extraction pipeline. Prior intelligence recovered and gravity-weighted from day one.', gold: false },
  { n: '03', name: 'Agent Knowledge',                      desc: 'Orbital Task agents surface findings and write them back to the substrate. The system learns from what it does on your behalf.', gold: false },
  { n: '04', name: 'Document Ingestion',                   desc: 'SOPs, technical docs, institutional records — ingested as high-gravity memories with full behavioral and entity analysis.', gold: false },
  { n: '05', name: 'Continuous Intelligence Consolidation',desc: 'The nightly cycle itself writes back to the substrate — canonical summaries, cluster health, edge topology. Intelligence writes intelligence.', gold: true },
  { n: '06', name: 'Narrative Arc Generation',             desc: 'Longitudinal trajectories built from memory. The system tracks where topics started, how they shifted, where they are now.', gold: false },
  { n: '07', name: 'Relationship Intelligence Graph',      desc: 'Knowledge Clusters mapped to each other with binding strength computed nightly. The topology of what relates to what — and how strongly.', gold: false },
  { n: '08', name: 'Correction Loop',                      desc: 'User corrections propagate through the graph in real-time. Gravity weights adjusted immediately. Related clusters re-examined at next cycle.', gold: false },
];

const CYCLE_PASSES = [
  { pass: 'Pass 0', name: 'Gravity Aggregation',     body: 'Recalculates total_gravity and active_gravity across all Knowledge Cluster memberships. Updates any cluster that drifted > 0.5 since last cycle.' },
  { pass: 'Pass 1', name: 'Health Metrics',          body: 'Computes cohesion (avg membership strength), leakage (% members below threshold), drift, and dormancy. Salience scores updated in batches.' },
  { pass: 'Pass 2', name: 'Canonical Summary',       body: 'LLM-generated summaries for clusters whose canonical_summary is null or drift > 0.1. Maximum 5 per run. Category classification via entity-type decision tree.' },
  { pass: 'Pass 3', name: 'Edge Topology',           body: 'Calculates containment, co-activation, and semantic similarity between clusters. Builds the relationship graph that drives cross-cluster retrieval.' },
];

const AXES = [
  { n: '01', name: 'Topic Similarity',          desc: 'Vector embedding match — the floor, not the ceiling. Every query starts here.', badge: 'Semantic' },
  { n: '02', name: 'Relevance Weight',          desc: 'Composite score: frequency, recency, emotional density, outcome correlation. What actually mattered — not just what came up.', badge: 'Gravitational' },
  { n: '03', name: 'Knowledge Cluster Membership', desc: 'Information inside a cluster scores higher — it has accumulated operational significance over time. Clusters compound; raw memories do not.', badge: 'Structural' },
  { n: '04', name: 'Entity Relationships',      desc: 'The Relationship Intelligence Graph maps entities, history, and connection strength. Entity resolution with co-occurrence inference — not keyword matching.', badge: 'Relational' },
  { n: '05', name: 'Temporal Relevance',        desc: 'Recency decay is real but configurable. The system knows the difference between last week and three years ago — and surfaces both when context demands.', badge: 'Temporal' },
];

const GOVERNANCE_PRINCIPLES = [
  { title: 'Evidence-Based Challenge',        body: "When longitudinal data contradicts a stated decision, the system surfaces the gap — assertively. Not a suggestion. An observation grounded in everything the system has seen. You configure how often and how hard it pushes. The architecture enforces it." },
  { title: 'Decision Consistency Monitoring', body: "Flags when stated goals and observed behavior diverge. Not as judgment — as data. The system has been watching long enough to notice the pattern. It will tell you, without being asked." },
];

const DEPLOY_TIERS = [
  { tier: 'Hosted',         name: 'Hosted Intelligence',  desc: 'Isolated, dedicated infrastructure. Logically separated — never co-mingled. Architecturally enforced, not policy-enforced.', featured: false },
  { tier: 'Private Cloud',  name: 'Private Cloud Deploy', desc: 'Your VPC. Your region. AWS, GCP, or Azure — your compute, your security perimeter, your access controls.', featured: false },
  { tier: 'Sovereign Build',name: 'Sovereign Build',      desc: 'Fully air-gapped on-premise. No internet dependency. Your team owns the build. Designed for defense, regulated healthcare, active data residency requirements.', featured: true },
  { tier: 'Platform License',name: 'Platform License',   desc: 'Build LongStrider into your product. White-label or API-first. Your clients get sovereign intelligence. You get the moat.', featured: false },
];

const PROOF_CARDS = [
  { number: '116', label: 'Custom database functions',   body: 'Purpose-built for intelligence retrieval. Not ORMs. Not generic queries. Each function is a deliberate architectural decision.' },
  { number: '29',  label: 'Intelligence modules',        body: 'Running in parallel on every interaction. Behavioral extraction, entity resolution, arc synthesis, gravity calculation — simultaneously.' },
  { number: '18',  label: 'Governance rules',            body: 'Operational principles baked into how the system reasons — not safety guardrails bolted on afterward.' },
  { number: '4',   label: 'Isolation levels',            body: 'org_id → project_id → session_id → thread_id. Enterprise multi-tenancy from schema version one — not retrofitted.' },
  { number: '80+', label: 'Behavioral dimensions',       body: 'Per entity, per interaction. Communication style, decision patterns, risk tolerance, emotional density.' },
  { number: 'v18', label: 'Architecture version',        body: 'Each version is a discrete upgrade to the intelligence spec. One canonical architecture that improves.' },
];

// ── Command Center diagram ────────────────────────────────────
function CommandCenterDiagram() {
  return (
    <div className="hub-diagram" aria-hidden>
      {/* SVG connecting lines — gold to models/IP, dim for infra/agents */}
      <svg className="hub-svg" viewBox="0 0 920 480" preserveAspectRatio="none">
        {/* Hub→Models (straight up, gold) */}
        <line className="hub-line" x1="460" y1="158" x2="460" y2="68" stroke="rgba(200,169,110,0.30)" />
        {/* Hub→Tools (left) */}
        <line className="hub-line" x1="357" y1="190" x2="190" y2="178" stroke="rgba(255,255,255,0.12)" />
        {/* Hub→Team (right) */}
        <line className="hub-line" x1="563" y1="190" x2="730" y2="178" stroke="rgba(255,255,255,0.12)" />
        {/* Hub→Agents (bottom-left diagonal, purple) */}
        <line className="hub-line" x1="440" y1="222" x2="190" y2="390" stroke="rgba(139,92,246,0.20)" />
        {/* Hub→Infra (straight down) */}
        <line className="hub-line" x1="460" y1="228" x2="460" y2="392" stroke="rgba(255,255,255,0.09)" />
        {/* Hub→IP (bottom-right diagonal, gold) */}
        <line className="hub-line" x1="480" y1="222" x2="730" y2="390" stroke="rgba(200,169,110,0.22)" />
      </svg>

      {/* Hub center */}
      <div className="hub-center">
        <div className="hub-center-ring" />
        <p className="hub-center-eyebrow">LongStrider</p>
        <p className="hub-center-name">Intelligence OS</p>
        <div className="hub-center-status">
          <span className="hub-live-dot" />
          <span>29 modules · live</span>
        </div>
      </div>

      {/* Spoke nodes */}
      {SPOKES.map((s) => (
        <div
          key={s.cls}
          className={`hub-spoke ${s.cls}${s.variant === 'gold' ? ' hub-spoke-gold' : s.variant === 'purple' ? ' hub-spoke-purple' : ''}`}
        >
          <p className={`hub-spoke-rel${s.relCls ? ` ${s.relCls}` : ''}`}>{s.rel}</p>
          <p className="hub-spoke-name">{s.name}</p>
          <p className="hub-spoke-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Mobile fallback
function CommandCenterMobile() {
  return (
    <div className="hub-diagram-mobile">
      {SPOKES.map((s) => (
        <div key={s.cls} className="hub-mobile-spoke">
          <span className="hub-mobile-rel">{s.rel}</span>
          <span className="hub-mobile-name">{s.name}</span>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function TechnologyPage() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((window.scrollY / docH) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('deck-visible'); }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observerRef.current?.observe(el));
  }, []);

  useEffect(() => { setupObserver(); return () => observerRef.current?.disconnect(); }, [setupObserver]);
  useEffect(() => { if (isRevealed) setTimeout(() => setupObserver(), 80); }, [isRevealed, setupObserver]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="tech-page">
      <div className="tech-progress" style={{ width: `${scrollProgress}%` }} />
      <div aria-hidden className="tech-aurora-1" />
      <div aria-hidden className="tech-aurora-2" />
      <div aria-hidden className="tech-aurora-3" />

      <StoryTimeline key={String(isRevealed)} nodes={TIMELINE} unlockGated={isRevealed} showAfter={300} />

      {/* ══════════════════════════════════════════════
          HERO — Command Center
      ══════════════════════════════════════════════ */}
      <section className="tech-container">
        <div className="tech-hero-v2">
          <span className="tech-hero-v2-eyebrow" data-reveal>Technology — How It Works</span>
          <h1 className="tech-hero-v2-h1" data-reveal data-delay="1">
            You&apos;re not adding another AI tool.<br />
            You&apos;re installing the command center<br />
            that controls all of them.
          </h1>
          <p className="tech-hero-v2-sub" data-reveal data-delay="2">
            LongStrider deploys inside your ecosystem — ingesting from your tools,
            dominating your model choice, deploying your agents, and building a
            knowledge graph that belongs <em>entirely to you</em>.
          </p>

          {/* Hub diagram */}
          <div data-reveal data-delay="3">
            <CommandCenterDiagram />
            <CommandCenterMobile />
          </div>

          {/* The Knife — three time horizons */}
          <div className="tech-knife" data-reveal data-delay="3">
            <div className="tech-knife-card">
              <span className="tech-knife-horizon">Today</span>
              <p className="tech-knife-statement">
                <strong>Your entire AI operation has a sovereign command center.</strong>{' '}
                Model-agnostic. Deployed in your ecosystem. Controlled by you.
              </p>
            </div>
            <div className="tech-knife-divider" />
            <div className="tech-knife-card tech-knife-card-center">
              <span className="tech-knife-horizon">Year Two</span>
              <p className="tech-knife-statement">
                <strong>Not a subscription. A compounding intelligence asset.</strong>{' '}
                Every interaction deepens it. Worth more on your term sheet than your entire tool spend.
              </p>
            </div>
            <div className="tech-knife-divider" />
            <div className="tech-knife-card">
              <span className="tech-knife-horizon">Forever</span>
              <p className="tech-knife-statement">
                <strong>The models will change. Your IP won&apos;t.</strong>{' '}
                Swap providers anytime. The intelligence you&apos;ve accumulated belongs to your organization. Permanently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ── Chapter I Marker ── */}
      <div className="tech-container">
        <div className="tech-chapter-marker" style={{ margin: '72px 0 0' }}>
          <div className="tech-chapter-marker-line" />
          <div className="tech-chapter-marker-text">
            <span className="tech-chapter-eyebrow">Chapter I</span>
            <span className="tech-chapter-title">The Memory Engine</span>
          </div>
          <div className="tech-chapter-marker-line" />
        </div>
      </div>

      {/* Chapter I intro */}
      <div className="tech-container">
        <div className="tech-chapter-intro" style={{ marginTop: '56px' }} data-reveal>
          <span className="tech-chapter-intro-number">How knowledge accumulates</span>
          <p className="tech-chapter-intro-title">
            What happens from the moment data enters to the moment it becomes intelligence you can act on.
          </p>
          <p className="tech-chapter-intro-body">
            LongStrider sits between your team and your LLM. Every signal that flows through it gets extracted,
            weighted, and written to a substrate that compounds. Here is exactly what runs.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          01 — SIGNAL EXTRACTION
      ══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="ingest">
        <div className="tech-grid">
          <div>
            <p className="tech-label" data-reveal>01 — Signal Extraction</p>
            <h2 className="tech-heading" data-reveal data-delay="1">
              Every other AI stores what you said.<br />
              LongStrider captures what you meant.
            </h2>
            <p className="tech-lead" data-reveal data-delay="2">
              Before a single word reaches your LLM, the Signal Extraction Engine runs.
              Every interaction is decomposed — entities resolved, behavioral markers identified,
              emotional weight scored, intent classified. The raw material for everything else.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              This is why LongStrider can answer &ldquo;how many times did I mention X?&rdquo; with
              perfect accuracy. The entity was resolved at ingest — not at query time. The
              system didn&apos;t guess. It counted.
            </p>
            <p className="tech-body" data-reveal data-delay="3">
              Other AI tools store conversation history. LongStrider stores a structured
              intelligence record — gravity-scored, entity-tagged, emotionally mapped,
              and immediately available for five-axis retrieval.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <div className="tech-card tech-card-gold">
              <p className="tech-compare-header">What gets captured — per interaction</p>
              {[
                { label: 'Entity extraction',     val: 'Named resolution + alias graph' },
                { label: 'Behavioral markers',    val: 'Communication style · risk tolerance · decision patterns' },
                { label: 'Emotional weight',      val: 'Blend scored · trajectory tracked' },
                { label: 'Intent classification', val: 'count · entity · pattern · temporal · complex' },
                { label: 'Gravity score',         val: 'Computed at ingest · drives retrieval priority' },
                { label: 'Context type',          val: 'professional / personal — inferred automatically' },
              ].map((row) => (
                <div key={row.label} className="tech-compare-row">
                  <span className="tech-compare-label">{row.label}</span>
                  <span className="tech-compare-val tech-compare-val-gold">{row.val}</span>
                </div>
              ))}
            </div>
            <p className="tech-body" style={{ marginTop: '24px', fontSize: '14px', color: 'var(--color-text-muted)' }} data-reveal data-delay="3">
              LongStrider sits above five infrastructure layers: your LLM, the Intelligence Orchestration Layer,
              Adaptive Retrieval, and your own infrastructure. The LLM is the voice. We are the memory
              and the judgment.
            </p>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══════════════════════════════════════════════
          02 — EIGHT CHANNELS
      ══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="channels">
        <div className="tech-section-header">
          <p className="tech-label" data-reveal>02 — Eight Input Channels</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            Most systems have one input.<br />LongStrider has eight.
          </h2>
          <p className="tech-lead tech-lead-centered" data-reveal data-delay="2">
            All eight channels write to one schema. One{' '}
            <code style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--color-gold-dim)', background: 'var(--color-gold-ghost)', padding: '1px 7px', borderRadius: '3px' }}>gravity_map</code>{' '}
            table. No separate data lake. No external ML pipeline.
            Intelligence compounds in one place — and it&apos;s yours.
          </p>
        </div>
        <div className="tech-channel-grid" data-reveal data-delay="2">
          {CHANNELS.map((ch) => (
            <div key={ch.n} className={`tech-channel-cell${ch.gold ? ' tech-channel-cell-gold' : ''}`}>
              <span className={`tech-channel-n${ch.gold ? ' tech-channel-n-gold' : ' tech-channel-n-dim'}`}>{ch.n}</span>
              <p className={`tech-channel-name${ch.gold ? ' tech-channel-name-gold' : ' tech-channel-name-default'}`}>{ch.name}</p>
              <p className="tech-channel-desc">{ch.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══════════════════════════════════════════════
          03 — NIGHTLY ENGINE
      ══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="nightly">
        <div className="tech-grid">
          <div>
            <p className="tech-label" data-reveal>03 — The Nightly Engine</p>
            <h2 className="tech-heading" data-reveal data-delay="1">
              While you sleep,<br />four passes run.
            </h2>
            <p className="tech-lead" data-reveal data-delay="2">
              Every night, <code style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-gold-dim)', background: 'var(--color-gold-ghost)', padding: '1px 7px', borderRadius: '3px' }}>cortex-dreaming</code>{' '}
              runs against the full memory substrate. Not summaries. Not compression.
              Actual intelligence computation — four sequential passes per user, every 24 hours.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              This is what separates compounding intelligence from a growing database.
              A database stores. The nightly engine <em>understands</em> — recalculating
              what matters, detecting patterns across months, writing a RuntimePolicy that
              shapes how the system behaves tomorrow.
            </p>
            <div className="tech-card" style={{ marginTop: '28px' }} data-reveal data-delay="3">
              <div className="tech-facts">
                {[
                  { dot: 'gold', text: 'RuntimePolicy written nightly — shapes tone, depth, and challenge threshold for next 24h' },
                  { dot: 'purple', text: 'Patterns detected across weeks and months — invisible in any single session' },
                  { dot: 'gold', text: 'Up to 5 Knowledge Cluster summaries regenerated per run — LLM-quality synthesis' },
                  { dot: 'purple', text: '350s wall-clock limit with 50s safety margin — runs reliably every night' },
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
            <p className="tech-label-purple tech-label">Four passes — every night</p>
            <div className="tech-card tech-card-purple">
              {CYCLE_PASSES.map((pass, i) => (
                <div key={i} className="tech-cycle-item">
                  <div className="tech-cycle-icon"><div className="tech-cycle-dot" /></div>
                  <div>
                    <p className="tech-cycle-title">
                      <span style={{ color: 'rgba(139,92,246,0.60)', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.12em', marginRight: '8px' }}>{pass.pass}</span>
                      {pass.name}
                    </p>
                    <p className="tech-cycle-body">{pass.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="tech-numbers" style={{ marginTop: '24px' }} data-reveal data-delay="3">
              <div className="tech-number-cell">
                <div className="tech-number-value">51k+</div>
                <div className="tech-number-label">Memory records in active deployments</div>
              </div>
              <div className="tech-number-cell">
                <div className="tech-number-value">80+</div>
                <div className="tech-number-label">Behavioral dimensions per entity</div>
              </div>
              <div className="tech-number-cell">
                <div className="tech-number-value">4</div>
                <div className="tech-number-label">Sequential passes per user, every night</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══════════════════════════════════════════════
          04 — CORRECTION LOOP
      ══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="correction">
        <div className="tech-grid">
          <div data-reveal>
            <p className="tech-label">04 — The Correction Loop</p>
            <div className="tech-card tech-correction-card">
              <div className="tech-correction-message">
                <span className="tech-correction-sender">LongStrider</span>
                <p className="tech-correction-text">
                  Based on your Q4 pricing history, I&apos;d recommend holding floor rates
                  through the first week of December — you&apos;ve typically outperformed
                  comp set by 12% doing so.
                </p>
              </div>
              <div className="tech-correction-action">
                <span className="tech-correction-btn">✕ Flag as incorrect</span>
                <span className="tech-correction-context">That week we ran a private event — data isn&apos;t comparable.</span>
              </div>
              <div className="tech-correction-result">
                <div className="tech-pipeline">
                  {['Correction received', 'Memory downweighted', 'Context flag applied', 'Cluster recalculated'].map((step, i, arr) => (
                    <span key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`tech-pipeline-step${i < 3 ? ' tech-pipeline-step-done' : ''}`}>{step}</span>
                      {i < arr.length - 1 && <span className="tech-pipeline-arrow">→</span>}
                    </span>
                  ))}
                </div>
                <p className="tech-correction-note">The system never uses that data point to influence a recommendation again.</p>
              </div>
            </div>
          </div>
          <div>
            <p className="tech-label" data-reveal>04 — Correction Loop</p>
            <h2 className="tech-heading" data-reveal data-delay="1">
              One flag. Immediate propagation. Constitutional by design.
            </h2>
            <p className="tech-lead" data-reveal data-delay="2">
              Wrong information that stays in memory is worse than no information.
              LongStrider&apos;s correction loop fires in real-time — not queued for next month&apos;s training run.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              When you flag something wrong: the memory&apos;s gravity weight is immediately reduced,
              the correction reason is stored as context, and any Knowledge Clusters that memory
              influenced are flagged for re-examination at the next nightly cycle.
            </p>
            <div className="tech-card" style={{ marginTop: '28px' }} data-reveal data-delay="3">
              <div className="tech-facts">
                <div className="tech-fact"><div className="tech-fact-dot" />Real-time weight update — not queued for next training run</div>
                <div className="tech-fact"><div className="tech-fact-dot-purple" />Correction reason stored as signal — informs future retrieval</div>
                <div className="tech-fact"><div className="tech-fact-dot" />Cascades through related cluster members at next consolidation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GATE
      ══════════════════════════════════════════════ */}
      {!isRevealed && (
        <div className="tech-tease">
          <button id="tech-reveal-btn" className="tech-tease-button" onClick={() => setIsRevealed(true)}>
            Continue Reading
          </button>
          <p className="tech-tease-hint">
            How a query becomes intelligence. How you configure what it knows. How your data never leaves.
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          GATED — Chapters II & III
      ══════════════════════════════════════════════ */}
      {isRevealed && (
        <>
          {/* ── Chapter II Marker ── */}
          <div className="tech-container">
            <div className="tech-chapter-marker" style={{ margin: '80px 0 0' }}>
              <div className="tech-chapter-marker-line" />
              <div className="tech-chapter-marker-text">
                <span className="tech-chapter-eyebrow">Chapter II</span>
                <span className="tech-chapter-title">The Intelligence Engine</span>
              </div>
              <div className="tech-chapter-marker-line" />
            </div>
          </div>
          <div className="tech-container">
            <div className="tech-chapter-intro" style={{ marginTop: '56px' }} data-reveal>
              <span className="tech-chapter-intro-number">How the system retrieves and reasons</span>
              <p className="tech-chapter-intro-title">
                What happens between your question and the response that knows your business.
              </p>
              <p className="tech-chapter-intro-body">
                The Intelligence Engine doesn&apos;t retrieve records. It assembles a Contextual Intelligence
                Package — a curated narrative built from five simultaneous scoring axes. Here is the pipeline.
              </p>
            </div>
          </div>

          <div className="tech-divider" />

          {/* ═════════ 05 — INTENT ROUTING ═════════ */}
          <section className="tech-section tech-container" data-section="routing">
            <div className="tech-grid">
              <div>
                <p className="tech-label" data-reveal>05 — Query Intent Classification</p>
                <h2 className="tech-heading" data-reveal data-delay="1">
                  The system decides how to retrieve before it retrieves.
                </h2>
                <p className="tech-lead" data-reveal data-delay="2">
                  Before any scoring runs, the engine classifies what you&apos;re asking.
                  Each query type routes differently — to different modules, different
                  data sources, different assembly logic.
                </p>
                <p className="tech-body" data-reveal data-delay="2">
                  This is why &ldquo;how many times did I mention X?&rdquo; returns a perfect count
                  instead of a hallucinated estimate. That&apos;s a count query — it routes to the
                  Relationship Intelligence Graph for a pre-computed exact total, not to the
                  embedding search.
                </p>
              </div>
              <div data-reveal data-delay="2">
                <div className="tech-card">
                  <p className="tech-compare-header">Query classification routes</p>
                  {[
                    { type: 'count',    route: 'Relationship Intelligence Graph — exact pre-computed total' },
                    { type: 'entity',   route: 'Entity resolution + consciousness cord lookup' },
                    { type: 'pattern',  route: 'Longitudinal Behavioral Pattern Engine' },
                    { type: 'temporal', route: 'Time-bucketed recall with recency decay applied' },
                    { type: 'complex',  route: 'Full five-axis scoring pipeline — all five simultaneously' },
                  ].map((r) => (
                    <div key={r.type} className="tech-compare-row">
                      <code style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'var(--color-gold-dim)', letterSpacing: '0.08em' }}>{r.type}</code>
                      <span className="tech-compare-val">{r.route}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="tech-divider" />

          {/* ═════════ 06 — FIVE-AXIS SCORING ═════════ */}
          <section className="tech-section tech-container" data-section="scoring">
            <div className="tech-section-header">
              <p className="tech-label" data-reveal>06 — Five-Axis Scoring</p>
              <h2 className="tech-heading" data-reveal data-delay="1">
                Not similarity search.<br />Five simultaneous signals.
              </h2>
              <p className="tech-lead tech-lead-centered" data-reveal data-delay="2">
                Vector embedding is axis one. The remaining four are what make LongStrider
                retrieve differently from any RAG system you&apos;ve evaluated.
                All five run in parallel. Every query.
              </p>
            </div>
            <div data-reveal data-delay="1">
              <div className="tech-card">
                <div className="tech-axis-table">
                  {AXES.map((axis) => (
                    <div className="tech-axis-row" key={axis.n}>
                      <span className="tech-axis-number">{axis.n}</span>
                      <div>
                        <p className="tech-axis-name">{axis.name}</p>
                        <p className="tech-axis-desc">{axis.desc}</p>
                      </div>
                      <span className="tech-axis-badge">{axis.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="tech-divider" />

          {/* ═════════ 07 — CIP ASSEMBLY ═════════ */}
          <section className="tech-section tech-container" data-section="assembly">
            <div className="tech-grid">
              <div>
                <p className="tech-label" data-reveal>07 — Intelligence Assembly</p>
                <h2 className="tech-heading" data-reveal data-delay="1">
                  Not a list of results.<br />A Contextual Intelligence Package.
                </h2>
                <p className="tech-lead" data-reveal data-delay="2">
                  The output of the retrieval pipeline is not records. It&apos;s a
                  curated intelligence package — narrative arc included — assembled
                  by 19 parallel SQL queries running via Promise.allSettled.
                </p>
                <p className="tech-body" data-reveal data-delay="2">
                  The Narrative Arc Generation layer synthesizes results into a trajectory:
                  where a topic started, how it shifted, where it is now. More data does not
                  mean better intelligence. The system is engineered to be precise about
                  what it surfaces — not comprehensive.
                </p>
                <p className="tech-body" data-reveal data-delay="3">
                  Your LLM receives this package. It doesn&apos;t see your raw memory records.
                  It doesn&apos;t touch your database. It sees curated context — and generates
                  a response using a substrate it couldn&apos;t have built on its own.
                </p>
              </div>
              <div data-reveal data-delay="2">
                <div className="tech-card">
                  <p className="tech-compare-header">What the Contextual Intelligence Package contains</p>
                  {[
                    { label: 'Identity anchors',        val: 'Defining memories that shape reasoning' },
                    { label: 'Gravity Wells',            val: 'Top Knowledge Clusters by relevance score' },
                    { label: 'Memory arcs',              val: 'Longitudinal trajectory for surfaced topics' },
                    { label: 'Psychological profile',    val: 'Communication style · values · behavioral patterns' },
                    { label: 'Pattern detection',        val: 'Active patterns flagged from nightly analysis' },
                    { label: 'Cognitive conflicts',      val: 'Unresolved contradictions surfaced proactively' },
                    { label: 'Emotional forecast',       val: 'State predictions from transition matrix' },
                    { label: 'RuntimePolicy',            val: 'Tone · depth · challenge threshold for this session' },
                  ].map((row) => (
                    <div key={row.label} className="tech-compare-row">
                      <span className="tech-compare-label">{row.label}</span>
                      <span className="tech-compare-val tech-compare-val-gold">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Chapter III Marker ── */}
          <div className="tech-container">
            <div className="tech-chapter-marker" style={{ margin: '40px 0 0' }}>
              <div className="tech-chapter-marker-line" />
              <div className="tech-chapter-marker-text">
                <span className="tech-chapter-eyebrow">Chapter III</span>
                <span className="tech-chapter-title">The Control Plane</span>
              </div>
              <div className="tech-chapter-marker-line" />
            </div>
          </div>
          <div className="tech-container">
            <div className="tech-chapter-intro" style={{ marginTop: '56px' }} data-reveal>
              <span className="tech-chapter-intro-number">What you own and configure</span>
              <p className="tech-chapter-intro-title">
                The intelligence substrate is yours. The behavior is yours to define. The data never leaves.
              </p>
              <p className="tech-chapter-intro-body">
                Enterprise AI has one unsolved problem: who&apos;s actually in control?
                LongStrider answers that architecturally — not through policy.
              </p>
            </div>
          </div>

          <div className="tech-divider" style={{ marginTop: '0' }} />

          {/* ═════════ 08 — BEHAVIOR OS ═════════ */}
          <section className="tech-section tech-container" data-section="governance">
            <div className="tech-grid">
              <div>
                <p className="tech-label" data-reveal>08 — Programmable Behavior OS</p>
                <h2 className="tech-heading" data-reveal data-delay="1">
                  Sliders, not prompts.<br />Configuration, not fine-tuning.
                </h2>
                <p className="tech-lead" data-reveal data-delay="2">
                  Eighteen operating principles baked into how the system reasons — not
                  safety guardrails bolted on afterward. Configurable per deployment,
                  per business unit, per user tier. No model retraining.
                </p>
                <div data-reveal data-delay="2">
                  {GOVERNANCE_PRINCIPLES.map((p, i) => (
                    <div key={i} className="tech-governance-principle">
                      <p className="tech-governance-title">{p.title}</p>
                      <p className="tech-governance-body">{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="tech-label-purple tech-label" data-reveal>The Personality Engine</p>
                <p className="tech-lead" data-reveal data-delay="1">
                  Same intelligence kernel. Different operational personality. Configure via
                  the Cortex interface — not months of prompt engineering.
                </p>
                <p className="tech-body" data-reveal data-delay="2">
                  A luxury hospitality deployment gets conservative recommendations with precise language.
                  A trading desk gets direct signals and aggressive challenge.
                  A clinical advisory deployment holds a tighter boundary on what the system will assert without evidence.
                </p>
                <p className="tech-body" data-reveal data-delay="2">
                  Same substrate. Same memory. Same retrieval architecture.
                </p>
                <div className="tech-card tech-card-purple" style={{ marginTop: '28px' }} data-reveal data-delay="3">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 1.8vw, 21px)', fontStyle: 'italic', color: 'rgba(255,255,255,0.82)', lineHeight: 1.55, margin: 0 }}>
                    &ldquo;Configure personality in minutes via the Cortex operating interface.
                    Sliders with real-time preview. Not a fine-tuning run.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="tech-divider" />

          {/* ═════════ 09 — DEPLOYMENT TIERS ═════════ */}
          <section className="tech-section tech-container" data-section="deployment">
            <div className="tech-section-header">
              <p className="tech-label" data-reveal>09 — Data Sovereignty</p>
              <h2 className="tech-heading" data-reveal data-delay="1">
                Your data never leaves your perimeter.<br />
                That&apos;s not a feature — it&apos;s a design constraint.
              </h2>
              <p className="tech-lead tech-lead-centered" data-reveal data-delay="2">
                Every dollar your organization spent on AI this year made someone else&apos;s model smarter.
                LongStrider&apos;s architecture makes that structurally impossible — not by policy.
              </p>
            </div>
            <div className="tech-deploy-grid" data-reveal data-delay="2">
              {DEPLOY_TIERS.map((dep) => (
                <div key={dep.tier} className={`tech-deploy-card${dep.featured ? ' tech-deploy-card-featured' : ''}`}>
                  <p className="tech-deploy-tier">{dep.tier}</p>
                  <p className="tech-deploy-name">{dep.name}</p>
                  <p className="tech-deploy-desc">{dep.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="tech-divider" />

          {/* ═════════ PROOF OF CRAFT ═════════ */}
          <section className="tech-section tech-container">
            <div className="tech-section-header">
              <p className="tech-label" data-reveal>Proof of Craft</p>
              <h2 className="tech-heading" data-reveal data-delay="1">
                This wasn&apos;t assembled from libraries.<br />It was engineered from the problem up.
              </h2>
            </div>
            <div className="tech-proof-grid" data-reveal data-delay="1">
              {PROOF_CARDS.map((item, i) => (
                <div key={i} className="tech-proof-card">
                  <div className="tech-proof-number">{item.number}</div>
                  <p className="tech-proof-label">{item.label}</p>
                  <p className="tech-proof-body">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Final quote ── */}
          <div className="tech-container">
            <p className="tech-final-quote" data-reveal>
              Six months from now, you won&apos;t have a software vendor relationship.
              You&apos;ll have organizational intelligence that compounds every night — and belongs to you. Permanently.
            </p>
          </div>

          {/* ═════════ CTA ═════════ */}
          <section className="tech-container tech-cta-wrap">
            <p className="tech-label" data-reveal>Ready</p>
            <h2 className="tech-heading" style={{ maxWidth: '480px', margin: '0 auto 16px', textAlign: 'center' }} data-reveal data-delay="1">
              The pilot is how it earns its place.
            </h2>
            <p className="tech-body" style={{ maxWidth: '440px', margin: '0 auto 40px', textAlign: 'center' }} data-reveal data-delay="2">
              We deploy alongside your team, in your environment. The intelligence starts compounding
              from the first interaction.
            </p>
            <div data-reveal data-delay="3">
              <Link href="/pilot" className="tech-cta-pill">Start a Pilot →</Link>
              <p className="tech-sovereignty-note">Sovereign · No training on your data · Your infrastructure</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
