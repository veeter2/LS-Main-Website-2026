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
  { title: 'Claim Precision Threshold',       body: "When the system makes a factual assertion, it requires observed supporting evidence — not inference from context. The confidence boundary is configurable. Below it, the system hedges explicitly. Above it, it asserts." },
  { title: 'Behavioral Pattern Surfacing',    body: "When the system detects a repeated pattern across time — decision cadence, risk posture, communication shift — it surfaces the observation proactively. Not on request. On observation. The detection threshold is yours to configure." },
  { title: 'Temporal Horizon Bias Correction', body: "The system tracks when reasoning is anchored to recent events at the expense of longitudinal data. When recency bias is detected in a decision context, the longer pattern is surfaced without being asked." },
  { title: 'Communication Calibration',      body: "Depth, directness, and formality adapt to the entity and context — independently of the underlying model. Consistent operational voice regardless of which provider renders the response." },
];

const DEPLOY_TIERS = [
  { tier: 'Hosted',         name: 'Hosted Intelligence',  desc: 'Isolated, dedicated infrastructure. Logically separated — never co-mingled. Architecturally enforced, not policy-enforced.', featured: false },
  { tier: 'Private Cloud',  name: 'Private Cloud Deploy', desc: 'Your VPC. Your region. AWS, GCP, or Azure — your compute, your security perimeter, your access controls.', featured: false },
  { tier: 'Sovereign Build',name: 'Sovereign Build',      desc: 'Fully air-gapped on-premise. No internet dependency. Your team owns the build. Designed for defense, regulated healthcare, active data residency requirements.', featured: true },
  { tier: 'Platform License',name: 'Platform License',   desc: 'Build LongStrider into your product. White-label or API-first. Your clients get sovereign intelligence. You get the moat.', featured: false },
];

const SETUP_STEPS = [
  { n: '01', badge: 'Infrastructure', name: 'Postgres Native',         body: 'Your database, your schema. Deploy to any PostgreSQL instance — AWS RDS, GCP Cloud SQL, Azure Database, or on-prem bare metal. No proprietary storage layer. No data lake to manage.' },
  { n: '02', badge: 'Model-Agnostic', name: 'Point Your API',          body: 'Register your provider credentials. OpenAI, Anthropic, Ollama, any endpoint that accepts standard requests. Swap providers at any time — the intelligence layer is completely independent of the model.' },
  { n: '03', badge: 'Migration',      name: 'Import Your Knowledge',   body: 'ChatGPT and Claude export files parse through the same extraction pipeline as live chat. Prior intelligence recovered, gravity-weighted, and embedded from day one. You do not start from zero.' },
  { n: '04', badge: 'Control',        name: 'Configure Your Environment', body: 'Set governance principles, behavioral parameters, and challenge thresholds via the Cortex interface. Not prompt engineering. Operational configuration that persists across every session and every model.' },
  { n: '05', badge: 'Agency',         name: 'Deploy Your Agents',      body: 'Launch orbital intelligence agents — scheduled tasks, pattern monitors, async research threads. They surface findings and write them back to the substrate. The system learns from what it does on your behalf.' },
  { n: '06', badge: 'Sovereignty',    name: 'Own It Permanently',      body: 'The intelligence substrate you build belongs to your organization. Export it, mirror it, air-gap it. Change providers anytime. The accumulated knowledge travels with you — not with your vendor.' },
];

// ── Command Center Diagram — LS on top, commanding everything ──
function CommandCenterDiagram() {
  return (
    <div className="cc-diagram" aria-label="LongStrider Intelligence Architecture">

      {/* LS — the dominant commanding layer */}
      <div className="cc-hub">
        <div className="cc-hub-ring" />
        <div className="cc-hub-ring cc-hub-ring-outer" />
        <div className="cc-hub-content">
          <span className="cc-hub-eyebrow">LongStrider</span>
          <span className="cc-hub-name">Intelligence OS</span>
          <div className="cc-hub-stats">
            <span className="cc-hub-stat">Sovereign</span>
            <span className="cc-hub-stat-sep">{'\u00b7'}</span>
            <span className="cc-hub-stat">Model-agnostic</span>
            <span className="cc-hub-stat-sep">{'\u00b7'}</span>
            <span className="cc-hub-stat">Compounding</span>
          </div>
        </div>
      </div>

      {/* Connector lines from hub down */}
      <div className="cc-connectors">
        <div className="cc-line" />
        <div className="cc-line" />
        <div className="cc-line" />
        <div className="cc-line" />
      </div>

      {/* Four satellites — what LS commands */}
      <div className="cc-satellites">
        <div className="cc-sat cc-sat-gold">
          <span className="cc-sat-rel">Directs</span>
          <span className="cc-sat-name">Your Models</span>
          <span className="cc-sat-detail">OpenAI {'\u00b7'} Claude {'\u00b7'} Ollama {'\u00b7'} Any</span>
        </div>
        <div className="cc-sat">
          <span className="cc-sat-rel">Sources</span>
          <span className="cc-sat-name">Your Tools</span>
          <span className="cc-sat-detail">CRM {'\u00b7'} Docs {'\u00b7'} APIs {'\u00b7'} Email</span>
        </div>
        <div className="cc-sat cc-sat-purple">
          <span className="cc-sat-rel">Deploys</span>
          <span className="cc-sat-name">Your Agents</span>
          <span className="cc-sat-detail">Scheduled tasks {'\u00b7'} Pattern monitoring</span>
        </div>
        <div className="cc-sat">
          <span className="cc-sat-rel">Runs On</span>
          <span className="cc-sat-name">Your Infrastructure</span>
          <span className="cc-sat-detail">PostgreSQL {'\u00b7'} VPC {'\u00b7'} On-prem {'\u00b7'} Air-gapped</span>
        </div>
      </div>

      {/* Compounding — the thing nobody else does */}
      <div className="cc-compound">
        <div className="cc-compound-line" />
        <div className="cc-compound-node">
          <span className="cc-compound-pulse" />
          <span className="cc-compound-label">Compounds nightly</span>
        </div>
        <div className="cc-compound-line" />
      </div>

      {/* Your IP — the asset */}
      <div className="cc-ip">
        <span className="cc-ip-glow" />
        <span className="cc-ip-name">Your IP</span>
        <span className="cc-ip-sub">Permanent IP. Compounding daily.</span>
      </div>

    </div>
  );
}

// Mobile
function CommandCenterMobile() {
  return (
    <div className="cc-mobile">
      <div className="cc-mobile-hub">
        <span className="cc-mobile-hub-eyebrow">LongStrider</span>
        <span className="cc-mobile-hub-name">Intelligence Architecture</span>
        <span className="cc-mobile-hub-stats">Five-axis scoring {'\u00b7'} sovereign by design {'\u00b7'} model-agnostic</span>
      </div>
      {[
        { rel: 'Directs', name: 'Your Models' },
        { rel: 'Ingests From', name: 'Your Tools' },
        { rel: 'Deploys', name: 'Your Agents' },
        { rel: 'Runs On', name: 'Your Infrastructure' },
      ].map((s) => (
        <div key={s.name} className="cc-mobile-sat">
          <span className="cc-mobile-rel">{s.rel}</span>
          <span className="cc-mobile-name">{s.name}</span>
        </div>
      ))}
      <div className="cc-mobile-ip">
        <span className="cc-mobile-ip-text">Your IP {'\u00b7'} Compounds daily {'\u00b7'} Permanently yours</span>
      </div>
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
          <span className="tech-hero-v2-eyebrow" data-reveal>Technology — Architecture</span>
          <h1 className="tech-hero-v2-h1" data-reveal data-delay="1">
            The AI layer your organization builds once — and compounds forever.
          </h1>
          <p className="tech-hero-v2-sub" data-reveal data-delay="2">
            Every AI tool your organization runs today is an island.
            LongStrider is the Intelligence layer that connects them —
            compounding organizational intelligence that no individual
            tool can build on its own.
          </p>

          {/* Architecture diagram */}
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
                Every interaction deepens it. An intelligence asset that accrues — not a vendor dependency that expires.
              </p>
            </div>
            <div className="tech-knife-divider" />
            <div className="tech-knife-card">
              <span className="tech-knife-horizon">Forever</span>
              <p className="tech-knife-statement">
                <strong>The models will change. Your institutional intelligence won&apos;t.</strong>{' '}
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
            The field is converging on one insight: intelligence should compound — not just retrieve.
            The right architecture ingests signals, compiles them into structured knowledge,
            and writes intelligence back to itself. LongStrider has been the production implementation
            of that architecture since day one. Here is exactly what runs.
          </p>
        </div>
      </div>

      {/* ── Architecture pattern comparison ── */}
      <div className="tech-container">
        <div className="tech-pattern-block" data-reveal>
          <p className="tech-pattern-eyebrow">The Pattern — Right Idea. Enterprise Scale.</p>
          <div className="tech-pattern-grid">
            <div className="tech-pattern-col tech-pattern-col-concept">
              <p className="tech-pattern-col-header">The Concept</p>
              {[
                { idea: 'Ingest raw signals',                   ls: 'Eight channels — all writing to one schema' },
                { idea: 'Compile into structured knowledge',    ls: 'Nightly engine — four passes, every night' },
                { idea: 'Synthesize at query time',             ls: 'Five-axis scoring + CIP Assembly' },
                { idea: 'Write intelligence back to itself',    ls: 'Channel 05 — intelligence writes intelligence' },
                { idea: 'Compounds over time',                  ls: 'Enterprise-scale · Postgres · Sovereign' },
              ].map((row) => (
                <div key={row.idea} className="tech-pattern-row">
                  <span className="tech-pattern-check">✓</span>
                  <span className="tech-pattern-idea">{row.idea}</span>
                </div>
              ))}
            </div>
            <div className="tech-pattern-arrow-col">
              {[0,1,2,3,4].map((i) => <div key={i} className="tech-pattern-arrow">→</div>)}
            </div>
            <div className="tech-pattern-col tech-pattern-col-ls">
              <p className="tech-pattern-col-header">LongStrider — Production Implementation</p>
              {[
                { idea: 'Ingest raw signals',                   ls: 'Eight channels — all writing to one schema' },
                { idea: 'Compile into structured knowledge',    ls: 'Nightly engine — four passes, every night' },
                { idea: 'Synthesize at query time',             ls: 'Five-axis scoring + CIP Assembly' },
                { idea: 'Write intelligence back to itself',    ls: 'Channel 05 — intelligence writes intelligence' },
                { idea: 'Compounds over time',                  ls: 'Enterprise-scale · Postgres · Sovereign' },
              ].map((row) => (
                <div key={row.ls} className="tech-pattern-row">
                  <span className="tech-pattern-ls">{row.ls}</span>
                </div>
              ))}
            </div>
          </div>
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
          <p className="tech-label" data-reveal>02 — Eight Channels</p>
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
              Every night, the Intelligence Engine runs against the full memory substrate. Not summaries. Not compression.
              Actual intelligence computation — four sequential passes per user, every 24 hours.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              This is what separates compounding intelligence from a growing database.
              A database stores. The nightly engine <em>understands</em> — recalculating
              what matters, detecting patterns across months, writing a RuntimePolicy that
              shapes how the system behaves tomorrow.
              What the field describes as a proof-of-concept, LongStrider runs as infrastructure —
              automated, multi-tenant, and sovereign.
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
                <div className="tech-number-value">8</div>
                <div className="tech-number-label">Input channels — all writing to one schema</div>
              </div>
              <div className="tech-number-cell">
                <div className="tech-number-value">5</div>
                <div className="tech-number-label">Simultaneous scoring axes — every query</div>
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

            {/* ── Message card ── */}
            <div className="tech-correction-card">
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
                <span className="tech-correction-context">
                  That week we ran a private event — data isn&apos;t comparable.
                </span>
              </div>
            </div>

            {/* ── Propagation steps ── */}
            <div className="tech-propagation">
              {[
                { n: '01', label: 'Correction received',   sub: 'Flag + context written to substrate',         status: 'complete', timing: '0ms'   },
                { n: '02', label: 'Gravity downweighted',  sub: 'total_gravity reduced immediately',            status: 'complete', timing: '< 1ms' },
                { n: '03', label: 'Context flag applied',  sub: 'Override marker — blocks future surface',     status: 'complete', timing: '< 1ms' },
                { n: '04', label: 'Cluster flagged',       sub: 'Affected clusters queued for recalculation',  status: 'active',   timing: 'Next cycle' },
                { n: '05', label: 'Propagation complete',  sub: 'Data point removed from all future retrieval',status: 'pending',  timing: '02:00'  },
              ].map((step) => (
                <div key={step.n} className={`tech-prop-row tech-prop-${step.status}`}>
                  <div className="tech-prop-indicator">
                    <div className="tech-prop-dot" />
                    {step.n !== '05' && <div className="tech-prop-line" />}
                  </div>
                  <div className="tech-prop-content">
                    <div className="tech-prop-header">
                      <span className="tech-prop-label">{step.label}</span>
                      <span className="tech-prop-timing">{step.timing}</span>
                    </div>
                    <span className="tech-prop-sub">{step.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
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
          <p className="tech-tease-chapter-intro">
            Chapters II and III cover retrieval intelligence, behavioral governance, and how data sovereignty is enforced architecturally — not by policy.
          </p>
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
                  from 19 parallel queries, designed for graceful degradation at every layer.
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
                <div data-reveal data-delay="4" style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <p className="tech-label" style={{ color: 'var(--color-text-muted)', marginBottom: '10px' }}>Full Observability</p>
                  <p className="tech-body" style={{ margin: 0 }}>
                    Every agent action, every decision trail, every correction — recorded, weighted,
                    auditable. Not a log file. A living record that improves the system every time
                    it&apos;s read. Enterprise governance without the compliance theater.
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

          {/* ═════════ SETUP — Built to Deploy ═════════ */}
          <section className="tech-section tech-container">
            <div className="tech-section-header">
              <p className="tech-label" data-reveal>Setup</p>
              <h2 className="tech-heading" data-reveal data-delay="1">
                Postgres. Point your API.<br />Import, configure, deploy.
              </h2>
              <p className="tech-lead tech-lead-centered" data-reveal data-delay="2">
                No proprietary storage layer. No months-long professional services engagement.
                The intelligence substrate runs on infrastructure you already own — and so does everything it builds.
              </p>
            </div>
            <div className="tech-proof-grid" data-reveal data-delay="2">
              {SETUP_STEPS.map((step) => (
                <div key={step.n} className="tech-proof-card">
                  <div className="tech-setup-row">
                    <div className="tech-proof-number">{step.n}</div>
                    <span className="tech-axis-badge">{step.badge}</span>
                  </div>
                  <p className="tech-proof-label">{step.name}</p>
                  <p className="tech-proof-body">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Final quote ── */}
          <div className="tech-container">
            <p className="tech-final-quote" data-reveal>
              In a year, you won&apos;t be renewing a subscription.
              You&apos;ll be sitting on an intelligence asset that knows your organization better than any single person on your team — and it belongs to you. Permanently.
            </p>
          </div>

          {/* ═════════ CTA ═════════ */}
          <section className="tech-container tech-cta-wrap">
            <p className="tech-label" data-reveal>Ready</p>
            <h2 className="tech-heading" style={{ maxWidth: '480px', margin: '0 auto 16px', textAlign: 'center' }} data-reveal data-delay="1">
              The pilot is how it earns its place.
            </h2>
            <p className="tech-body" style={{ maxWidth: '440px', margin: '0 auto 40px', textAlign: 'center' }} data-reveal data-delay="2">
              Deploy in your environment. Your team owns it from day one.
              The pilot runs in your stack — not ours.
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
