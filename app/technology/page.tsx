'use client';

import './tech.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// ── Section definitions for StoryTimeline rail ──────────────────
const SECTIONS = [
  { id: 'premise',      label: 'The Problem',       color: '#c8a96e', glow: 'rgba(200,169,110,0.4)' },
  { id: 'stack',        label: 'The Stack',          color: '#8b5cf6', glow: 'rgba(139,92,246,0.4)'  },
  { id: 'retrieval',    label: 'Retrieval',           color: '#c8a96e', glow: 'rgba(200,169,110,0.4)' },
  { id: 'consolidation',label: 'Consolidation',      color: '#8b5cf6', glow: 'rgba(139,92,246,0.4)'  },
  { id: 'correction',   label: 'Correction',         color: '#c8a96e', glow: 'rgba(200,169,110,0.4)' },
  { id: 'governance',   label: 'Governance',         color: '#8b5cf6', glow: 'rgba(139,92,246,0.4)'  },
  { id: 'sovereignty',  label: 'Sovereignty',        color: '#c8a96e', glow: 'rgba(200,169,110,0.4)' },
  { id: 'proof',        label: 'Proof of Craft',     color: '#8b5cf6', glow: 'rgba(139,92,246,0.4)'  },
  { id: 'deeper',       label: 'Go Deeper',          color: '#c8a96e', glow: 'rgba(200,169,110,0.4)' },
];

const GOLD = '#c8a96e';
const GOLD_DIM = 'rgba(200,169,110,0.65)';
const GOLD_BORDER = 'rgba(200,169,110,0.30)';

export default function TechnologyPageV2() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [showRail, setShowRail] = useState(false);

  // Scroll progress + rail visibility
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(1, y / docH) : 0);
      setShowRail(y > 280);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // data-reveal IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('deck-visible');
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Section observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.getAttribute('data-section') ?? '');
        });
      },
      { threshold: 0.15, rootMargin: '-20% 0px -60% 0px' }
    );
    document.querySelectorAll('[data-section]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeIdx = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <main className="tech-page">

      {/* ── Scroll progress thread ── */}
      <div className="tech-progress" style={{ width: `${progress * 100}%` }} />

      {/* ── Aurora orbs ── */}
      <div aria-hidden className="tech-aurora-1" />
      <div aria-hidden className="tech-aurora-2" />
      <div aria-hidden className="tech-aurora-3" />

      {/* ── Left rail ── */}
      <div
        aria-hidden
        style={{
          position: 'fixed', left: '36px', top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
          opacity: showRail ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: showRail ? 'auto' : 'none',
        }}
      >
        {SECTIONS.map((node, i) => {
          const isActive = node.id === activeSection;
          const isPassed = i < activeIdx;
          const isEarned = i <= activeIdx;
          return (
            <div
              key={node.id}
              onClick={() => document.querySelector(`[data-section="${node.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '9px 0',
                cursor: isEarned ? 'pointer' : 'default',
                opacity: isEarned ? 1 : 0.22,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const label = e.currentTarget.querySelector('.node-label') as HTMLElement;
                if (label) { label.style.color = 'rgba(255,255,255,0.65)'; label.style.transform = 'translateX(0)'; }
              }}
              onMouseLeave={(e) => {
                const label = e.currentTarget.querySelector('.node-label') as HTMLElement;
                if (label && !isActive) { label.style.color = 'rgba(255,255,255,0)'; label.style.transform = 'translateX(-4px)'; }
              }}
            >
              <div style={{
                width: isActive ? '9px' : '7px',
                height: isActive ? '9px' : '7px',
                borderRadius: '50%',
                background: isActive || isPassed ? node.color : 'rgba(255,255,255,0.12)',
                border: `1px solid ${isActive ? node.color : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isActive ? `0 0 12px ${node.glow}` : 'none',
                opacity: isPassed ? 0.45 : 1,
                flexShrink: 0,
                transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
              }} />
              <span className="node-label" style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0)',
                whiteSpace: 'nowrap',
                transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                transition: 'color 0.35s ease, transform 0.35s ease',
              }}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 0 — HERO
      ═══════════════════════════════════════════════ */}
      <section className="tech-container" style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div className="tech-hero">
          <p className="tech-hero-eyebrow" data-reveal>
            Architecture
          </p>
          <h1 className="tech-hero-heading" data-reveal data-delay="1">
            How it actually works
          </h1>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 1 — THE PREMISE
      ═══════════════════════════════════════════════ */}
      <section
        className="tech-section tech-container"
        data-section="premise"
      >
        <div className="tech-grid">
          {/* Left: editorial */}
          <div>
            <p className="tech-label" data-reveal>Section 01 — The Problem</p>
            <h2 className="tech-heading" data-reveal data-delay="1">
              Every AI tool right now is a short-order cook.
              It takes your order and forgets you walked in.
            </h2>
            <p className="tech-lead" data-reveal data-delay="2">
              ChatGPT, Claude, Copilot — they perform per session.
              What you said last Tuesday is gone. What you said six months ago
              never existed. They don't know your business. They never will.
            </p>
            <p className="tech-body" data-reveal data-delay="3">
              RAG tries to solve this by stuffing relevant documents into context
              before each call. It finds what's semantically similar. It can't
              tell you how often something happened, who the key people are, or
              why a decision was made eighteen months ago. It retrieves. It doesn't
              understand.
            </p>
            <p className="tech-body" data-reveal data-delay="3">
              Fine-tuning bakes in a snapshot of what you knew then. The moment
              the world changes, you rebuild. It doesn't compound — it resets.
            </p>
          </div>

          {/* Right: comparison */}
          <div data-reveal data-delay="2">
            <div className="tech-card">
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                  The status quo
                </p>
                {[
                  { label: 'Memory', val: 'Session only' },
                  { label: 'Retrieval', val: 'Keyword / semantic similarity' },
                  { label: 'Patterns', val: 'Not detected' },
                  { label: 'Who asked what', val: 'Unknown' },
                  { label: 'Your data leaves?', val: 'Yes' },
                ].map((r) => (
                  <div key={r.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    padding: '10px 0', borderBottom: '1px solid var(--color-border-subtle)',
                    fontFamily: 'var(--font-body)', gap: '16px',
                  }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-body)' }}>{r.label}</span>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'right' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '8px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-gold-dim)', marginBottom: '16px' }}>
                  LongStrider
                </p>
                {[
                  { label: 'Memory', val: 'Permanent, weighted, compounding' },
                  { label: 'Retrieval', val: 'Five-axis scoring — entity, time, weight, topic, cluster' },
                  { label: 'Patterns', val: 'Detected nightly across weeks, months, years' },
                  { label: 'Who asked what', val: 'Full entity mapping with relationship graph' },
                  { label: 'Your data leaves?', val: 'Never — runs in your infrastructure' },
                ].map((r) => (
                  <div key={r.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    padding: '10px 0', borderBottom: '1px solid var(--color-border-subtle)',
                    fontFamily: 'var(--font-body)', gap: '16px',
                  }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-body)' }}>{r.label}</span>
                    <span style={{ fontSize: '13px', color: 'var(--color-gold)', textAlign: 'right' }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 2 — THE STACK
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="stack">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p className="tech-label" data-reveal>Section 02 — The Stack</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            Three layers. Nothing redundant.
          </h2>
          <p className="tech-lead" data-reveal data-delay="2">
            LongStrider is the intelligence layer that sits between your people and
            your infrastructure. Your LLM is the voice. We are the memory.
          </p>
        </div>

        <div className="tech-grid" data-reveal>
          {/* Stack visualization */}
          <div>
            <div className="tech-card tech-card-gold">
              <div className="tech-stack">
                {/* Layer: Your people */}
                <div className="tech-stack-row">
                  <p className="tech-stack-layer">Layer 01 — Interface</p>
                  <p className="tech-stack-name">Your People</p>
                  <p className="tech-stack-detail">
                    Chat, agents, integrations, API — however your team interacts,
                    every signal enters the intelligence substrate.
                  </p>
                </div>
                {/* Layer: LongStrider */}
                <div className="tech-stack-row" style={{ background: 'rgba(200,169,110,0.03)' }}>
                  <p className="tech-stack-layer">Layer 02 — Intelligence</p>
                  <p className="tech-stack-name">LongStrider Intelligence Kernel</p>
                  <p className="tech-stack-detail">
                    Receives every interaction. Extracts behavioral and contextual signals.
                    Routes through five-axis retrieval. Assembles the
                    Contextual Intelligence Package. Calls your LLM of choice.
                    Consolidates nightly.
                  </p>
                </div>
                {/* Layer: Your infra */}
                <div className="tech-stack-row">
                  <p className="tech-stack-layer-purple tech-stack-layer">Layer 03 — Infrastructure</p>
                  <p className="tech-stack-name">Your Infrastructure</p>
                  <p className="tech-stack-detail">
                    PostgreSQL (with pgvector), your LLM provider or local model,
                    your servers or private cloud. Nothing we run, nothing we can see.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial context */}
          <div>
            <p className="tech-label-purple tech-label" data-reveal>The model is not the brain</p>
            <p className="tech-lead" data-reveal data-delay="1">
              OpenAI, Claude, Ollama, local Llama. Swap them — nothing changes about
              what your system knows. The LLM is a generation engine you rent.
              The intelligence substrate is something you own.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              This is why "Postgres for AI" is the closest analogy. Postgres doesn't
              care which application queries it. LongStrider doesn't care which LLM
              generates the response. The memory — the intelligence — lives in
              the substrate, not the model.
            </p>
            <div className="tech-facts" data-reveal data-delay="3">
              <div className="tech-fact">
                <div className="tech-fact-dot" />
                116 custom database functions, purpose-built — not ORMs on top of generic schemas
              </div>
              <div className="tech-fact">
                <div className="tech-fact-dot-purple" />
                29 intelligence modules running in parallel on every interaction
              </div>
              <div className="tech-fact">
                <div className="tech-fact-dot" />
                4-level isolation: org → project → session → thread — enterprise-ready from day one
              </div>
              <div className="tech-fact">
                <div className="tech-fact-dot-purple" />
                Zero training on your data. The LLM sees a Contextual Intelligence Package — never raw records.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 3 — RETRIEVAL
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="retrieval">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p className="tech-label" data-reveal>Section 03 — Retrieval</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            Five simultaneous scores.
            One sharp answer.
          </h2>
          <p className="tech-lead" data-reveal data-delay="2">
            Every query runs through five axes of relevance before an answer is
            assembled. This is why you can ask "how many times did we discount
            below floor in Q1?" and get an exact number — not a recollection.
          </p>
        </div>

        <div className="tech-grid">
          <div data-reveal>
            <div className="tech-card">
              <div className="tech-axis-table">
                {[
                  {
                    n: '01', name: 'Topic Similarity',
                    desc: 'Vector embedding match — the floor, not the ceiling. Everything starts here.',
                    badge: 'Semantic',
                  },
                  {
                    n: '02', name: 'Relevance Weight',
                    desc: 'A composite gravity score: frequency of reference, recency, emotional density, outcome correlation. The system knows what actually mattered — not just what came up.',
                    badge: 'Gravitational',
                  },
                  {
                    n: '03', name: 'Knowledge Cluster Membership',
                    desc: 'Which topics has the system formed durable clusters around? Information inside a cluster scores higher — it has accumulated operational significance over time.',
                    badge: 'Structural',
                  },
                  {
                    n: '04', name: 'Entity Relationships',
                    desc: 'Who or what is this query about? The Relationship Intelligence Graph maps entities, their history, and their connection strength. Not keyword matching — understanding.',
                    badge: 'Relational',
                  },
                  {
                    n: '05', name: 'Temporal Relevance',
                    desc: 'When did this matter? Recency decay is real but configurable. The system knows the difference between last week and three years ago, and surfaces both when context demands it.',
                    badge: 'Temporal',
                  },
                ].map((axis) => (
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

          <div>
            <p className="tech-label-purple tech-label" data-reveal>The result</p>
            <p className="tech-lead" data-reveal data-delay="1">
              Results aren't returned as a list of records. The Narrative Arc
              Generation layer synthesizes them into a trajectory.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              Ask "how did we perform last Easter?" The system doesn't return
              last Easter's number. It returns the pricing strategy leading up to
              Easter, how competitors behaved, what recommendations were made,
              whether they were followed, and how the outcome compared to
              expectations. That's a narrative — not a metric.
            </p>
            <p className="tech-body" data-reveal data-delay="3">
              The final assembly — the Contextual Intelligence Package — is curated
              to maximize signal and minimize noise. More data does not mean better
              intelligence. The system is engineered to be wise about what it surfaces.
            </p>

            <div className="tech-card" style={{ marginTop: '32px' }} data-reveal data-delay="3">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,1.6vw,19px)', fontStyle: 'italic', color: 'var(--color-text-primary)', lineHeight: 1.55, margin: 0 }}>
                "Perfect accuracy on census tasks — 'how many times did I say X?' — is
                not a party trick. It's the baseline any system claiming to remember
                you should clear on day one."
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 4 — CONSOLIDATION ENGINE
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="consolidation">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p className="tech-label-purple tech-label" data-reveal>Section 04 — The Consolidation Engine</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            While you sleep, your system gets smarter.
          </h2>
          <p className="tech-lead" data-reveal data-delay="2">
            Every night, a consolidation process runs. Not summaries.
            Not compression. Actual pattern detection — across every interaction
            from the last 24 hours and every prior session in memory.
          </p>
        </div>

        <div className="tech-grid">
          <div data-reveal>
            <div className="tech-card tech-card-purple">
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-purple)', marginBottom: '24px' }}>Each night — what runs</p>
              <div className="tech-cycle">
                {[
                  {
                    title: 'Pattern Detection',
                    body: 'The Longitudinal Behavioral Pattern Engine scans for recurring patterns, loops, and inflection points across weeks, months, and years. Invisible in any single session. Obvious across history.',
                  },
                  {
                    title: 'Gravity Recalculation',
                    body: 'Relevance weights are recomputed. Topics reinforced over the last 24 hours gain weight. Dormant topics age naturally. No manual curation required — ever.',
                  },
                  {
                    title: 'Arc Synthesis',
                    body: "Individual data points are woven into trajectories: where a topic started, how it shifted, where it is now. The system builds the narrative so you don't have to reconstruct it.",
                  },
                ].map((step, i) => (
                  <div className="tech-cycle-item" key={i}>
                    <div className="tech-cycle-icon">
                      <div className="tech-cycle-dot" />
                    </div>
                    <div>
                      <p className="tech-cycle-title">{step.title}</p>
                      <p className="tech-cycle-body">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="tech-label" data-reveal>What this means at 12 months</p>
            <p className="tech-lead" data-reveal data-delay="1">
              After a year of nightly consolidation, you don't have a database of
              events. You have institutional understanding.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              Patterns invisible in any single quarter emerge across the full record.
              A hotel discovers it discounts too early every Q1 — three years of
              data makes this undeniable. An advisory firm finds its best recommendations
              all came from a particular analyst's framing — and can now replicate it.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              This is compounding. Not a marketing word — a technical description of
              what happens when intelligence runs nightly on its own history.
            </p>

            <div className="tech-numbers" data-reveal data-delay="3">
              <div className="tech-number-cell">
                <div className="tech-number-value">51k+</div>
                <div className="tech-number-label">Memory records in active deployments</div>
              </div>
              <div className="tech-number-cell">
                <div className="tech-number-value">80+</div>
                <div className="tech-number-label">Behavioral dimensions tracked per entity</div>
              </div>
              <div className="tech-number-cell">
                <div className="tech-number-value">&lt;5s</div>
                <div className="tech-number-label">End-to-end retrieval with five-axis scoring</div>
              </div>
            </div>

            <p className="tech-body" data-reveal data-delay="3" style={{ marginTop: '20px' }}>
              The consolidation engine runs on the same PostgreSQL infrastructure
              as the rest of the system. No separate ML pipeline, no external data
              lake, no additional vendor. One schema. One substrate. Everything compounds together.
            </p>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 5 — CORRECTION LOOP
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="correction">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p className="tech-label" data-reveal>Section 05 — The Correction Loop</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            Mark it wrong. The system reweights
            before you finish typing.
          </h2>
          <p className="tech-lead" data-reveal data-delay="2">
            Most AI systems treat corrections as feedback for future training — which
            means next month, maybe things improve. LongStrider's correction loop
            fires immediately. One signal changes the weight of that memory across
            the entire intelligence substrate in real-time.
          </p>
        </div>

        <div className="tech-grid">
          {/* Live mockup of a correction */}
          <div data-reveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              What it looks like
            </p>
            <div className="tech-card tech-correction-card">
              <div className="tech-correction-message">
                <span className="tech-correction-label">LongStrider</span>
                <p className="tech-correction-text">
                  Based on your Q4 pricing history, I'd recommend holding floor rates
                  through the first week of December — you've typically outperformed
                  comp set by 12% doing so.
                </p>
              </div>

              <div className="tech-correction-action">
                <span className="tech-correction-btn">✕ Flag as incorrect</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  That week we ran a private event — data isn't comparable.
                </span>
              </div>

              <div className="tech-correction-result">
                <div className="tech-correction-pipeline">
                  <span className="tech-pipeline-step tech-pipeline-step-active">Correction received</span>
                  <span className="tech-pipeline-arrow">→</span>
                  <span className="tech-pipeline-step tech-pipeline-step-active">Memory downweighted</span>
                  <span className="tech-pipeline-arrow">→</span>
                  <span className="tech-pipeline-step tech-pipeline-step-active">Context flag applied</span>
                  <span className="tech-pipeline-arrow">→</span>
                  <span className="tech-pipeline-step">Cluster recalculated at next consolidation</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '10px', lineHeight: 1.5 }}>
                  The system never uses that data point to influence a recommendation again — and flags similar anomalies in future Q4 data automatically.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="tech-label-purple tech-label" data-reveal>Why this matters</p>
            <p className="tech-lead" data-reveal data-delay="1">
              Wrong information that stays in memory is worse than no information.
              Most systems give you a thumbs down and call it a day.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              LongStrider's correction loop is constitutional. When you flag something
              wrong, the system: downgrades the memory's Relevance Weight, stores the
              correction reason as context, propagates the update to any clusters
              that memory influenced, and adjusts the next consolidation to re-examine
              related patterns.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              The system gets it right more often over time not because it was instructed
              to — but because every correction teaches it what reliable intelligence
              looks like in your specific context.
            </p>
            <div className="tech-facts" data-reveal data-delay="3">
              <div className="tech-fact">
                <div className="tech-fact-dot" />
                Real-time weight update — not queued for next training run
              </div>
              <div className="tech-fact">
                <div className="tech-fact-dot-purple" />
                Correction reason stored as signal, not discarded
              </div>
              <div className="tech-fact">
                <div className="tech-fact-dot" />
                Cascades through related cluster members at next consolidation
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 6 — GOVERNANCE + CORTEX
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="governance">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p className="tech-label-purple tech-label" data-reveal>Section 06 — Governance &amp; Behavior</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            Sliders, not prompts.
            Configuration, not fine-tuning.
          </h2>
          <p className="tech-lead" data-reveal data-delay="2">
            Enterprise buyers always ask the same question: how do we control
            what the AI does? The Programmable Behavior Operating System is the
            answer. Configurable rules that define how the intelligence thinks,
            communicates, and behaves — without touching the underlying model.
          </p>
        </div>

        <div className="tech-grid">
          <div>
            <p className="tech-label" data-reveal>What you configure</p>
            <p className="tech-body" data-reveal data-delay="1">
              Eighteen operating principles baked into how the system reasons —
              not safety guardrails bolted on afterward. Configure per deployment,
              per business unit, per user tier. Two of them will make your
              legal team uncomfortable. That's the point.
            </p>

            <div data-reveal data-delay="2">
              <div style={{ padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: 500, color: 'rgba(255,255,255,0.88)', marginBottom: '12px', lineHeight: 1.35 }}>
                  Evidence-Based Challenge
                </p>
                <p className="tech-body" style={{ margin: 0 }}>
                  When longitudinal data contradicts a stated decision, the system
                  surfaces the gap — assertively. Not a suggestion. An observation
                  grounded in everything the system has seen. You calibrate how
                  often and how hard it pushes. The architecture enforces it.
                </p>
              </div>

              <div style={{ padding: '28px 0' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: 500, color: 'rgba(255,255,255,0.88)', marginBottom: '12px', lineHeight: 1.35 }}>
                  Decision Consistency Monitoring
                </p>
                <p className="tech-body" style={{ margin: 0 }}>
                  Flags when stated goals and observed behavior diverge.
                  Not as judgment — as data. The system has been watching long
                  enough to notice the pattern. It will tell you, without being asked.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="tech-label-purple tech-label" data-reveal>The Personality Engine</p>
            <p className="tech-lead" data-reveal data-delay="1">
              Same intelligence kernel. Different operational personality.
              The Personality &amp; Voice Engine ensures consistency across every
              interaction — whether the system is delivering a briefing, responding
              to a query, or pushing back on a decision.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              A luxury hospitality deployment gets conservative recommendations
              with precise language. A trading desk deployment gets direct signals
              and aggressive challenge. A clinical advisory deployment holds a tighter
              boundary on what the system will assert without evidence.
            </p>
            <p className="tech-body" data-reveal data-delay="2">
              Same substrate. Same memory. Same retrieval architecture.
              Zero model retraining.
            </p>

            <div className="tech-card tech-card-purple" style={{ marginTop: '32px' }} data-reveal data-delay="3">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,1.6vw,19px)', fontStyle: 'italic', color: 'var(--color-text-primary)', lineHeight: 1.55, margin: 0 }}>
                "Configure personality in minutes via the Cortex operating interface.
                Not months of prompt engineering. Not a fine-tuning run.
                Sliders with real-time preview."
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 7 — SOVEREIGNTY
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="sovereignty">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p className="tech-label" data-reveal>Section 07 — Data Sovereignty</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            Your data never leaves your perimeter.
            That's not a feature. It's a design constraint.
          </h2>
          <p className="tech-lead" data-reveal data-delay="2">
            Every dollar you've spent on AI this year made someone else's model
            better. LongStrider's architecture makes that impossible by design —
            not by policy.
          </p>
        </div>

        <div className="tech-deploy-grid" data-reveal>
          {[
            {
              tier: 'Hosted',
              name: 'Hosted Intelligence',
              desc: 'LongStrider hosts and manages the full stack on isolated, dedicated infrastructure. Your data is logically separated and never co-mingled with other tenants. Zero cross-tenant access — architecturally enforced, not policy-enforced.',
              featured: false,
            },
            {
              tier: 'Private Cloud',
              name: 'Private Cloud Deploy',
              desc: 'Your VPC. Your region. LongStrider deploys into your existing AWS, GCP, or Azure environment. The intelligence substrate runs on your compute, under your security perimeter, with your access controls.',
              featured: false,
            },
            {
              tier: 'Sovereign Build',
              name: 'Sovereign Build',
              desc: 'Fully air-gapped on-premise deployment. No internet dependency. Your team owns the build. Suitable for defense, intelligence, regulated healthcare, and environments with active data residency requirements.',
              featured: true,
            },
            {
              tier: 'Partner Program',
              name: 'Platform License',
              desc: 'Build LongStrider into your own product. White-label or API-first integration. Your clients get sovereign intelligence — you get the differentiation. The intelligence substrate becomes your competitive moat.',
              featured: false,
            },
          ].map((dep) => (
            <div
              key={dep.tier}
              className={`tech-deploy-card ${dep.featured ? 'tech-deploy-card-featured' : ''}`}
            >
              <p className="tech-deploy-tier">{dep.tier}</p>
              <p className="tech-deploy-name">{dep.name}</p>
              <p className="tech-deploy-desc">{dep.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '680px', margin: '56px auto 0', textAlign: 'center' }} data-reveal data-delay="2">
          <p className="tech-body" style={{ color: 'var(--color-text-secondary)' }}>
            Compliance-ready by architecture, not by afterthought — a critical
            distinction for enterprise environments operating across regulatory
            jurisdictions. GDPR, data residency requirements, enterprise security
            reviews: the architecture satisfies them without contortion.
          </p>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 8 — PROOF OF CRAFT
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="proof">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <p className="tech-label-purple tech-label" data-reveal>Section 08 — Proof of Craft</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            This wasn't assembled from libraries.
            It was engineered from the problem up.
          </h2>
        </div>

        <div className="tech-grid-3" data-reveal>
          {[
            {
              number: '116',
              label: 'Custom database functions',
              body: 'Purpose-built for intelligence retrieval. Not ORMs. Not generic queries. Each function is a deliberate architectural decision.',
            },
            {
              number: '29',
              label: 'Intelligence modules',
              body: 'Running in parallel on every interaction. Behavioral extraction, entity resolution, arc synthesis, gravity calculation — simultaneously.',
            },
            {
              number: '18',
              label: 'Governance rules',
              body: 'Operational principles baked into how the system reasons, not appended as guardrails. Every configuration option was designed, not accommodated.',
            },
            {
              number: '4',
              label: 'Isolation levels',
              body: 'org_id → project_id → session_id → thread_id. Enterprise multi-tenancy from the first schema version, not retrofitted.',
            },
            {
              number: '80+',
              label: 'Behavioral dimensions',
              body: 'Per entity, per interaction. Communication style, decision patterns, risk tolerance, emotional density — the substrate tracks what conversation history misses.',
            },
            {
              number: 'v18',
              label: 'Current architecture version',
              body: 'Each version is a discrete upgrade to the intelligence spec. No forks. No experimental branches. One canonical architecture that improves.',
            },
          ].map((item, i) => (
            <div key={i} className="tech-card" style={{ padding: '28px' }}>
              <div className="tech-number-value" style={{ fontSize: 'clamp(28px,3vw,40px)', marginBottom: '8px', textAlign: 'left' }}>{item.number}</div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-dim)', marginBottom: '12px' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="tech-divider" />

      {/* ═══════════════════════════════════════════════
          SECTION 9 — GO DEEPER
      ═══════════════════════════════════════════════ */}
      <section className="tech-section tech-container" data-section="deeper">
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
          <p className="tech-label" data-reveal>Go Deeper</p>
          <h2 className="tech-heading" data-reveal data-delay="1">
            Three sub-systems worth understanding.
          </h2>
          <p className="tech-lead" data-reveal data-delay="2">
            The overview you've just read is the skeleton. These pages are the tissue.
          </p>
        </div>

        <div className="tech-subpages" data-reveal data-delay="2">
          {[
            {
              n: '01',
              title: 'Intelligence Kernel',
              sub: 'The orchestration layer. How 29 modules coordinate to compose a response. What the Conductor decides and why.',
              href: '/technology/kernel',
              live: false,
            },
            {
              n: '02',
              title: 'Neural Topology',
              sub: 'The memory architecture. How Relevance Weights are calculated, how Knowledge Clusters form, and how gravity shapes what surfaces.',
              href: '/technology/cortex',
              live: false,
            },
            {
              n: '03',
              title: 'Living Memory',
              sub: 'The full-lifecycle memory model. Import your existing history. What happens to records that consolidate. How the substrate ages, without forgetting.',
              href: '/technology/memory',
              live: false,
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.live ? card.href : '#'}
              className={`tech-subpage-card ${!card.live ? 'tech-subpage-coming' : ''}`}
            >
              <div>
                <p className="tech-subpage-number">{card.n}</p>
                <p className="tech-subpage-title">{card.title}</p>
                <p className="tech-subpage-sub">{card.sub}</p>
              </div>
              {card.live
                ? <span className="tech-subpage-arrow">→</span>
                : <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: '20px' }}>— coming</span>
              }
            </Link>
          ))}
        </div>
      </section>

      <div className="tech-divider" />

      {/* ── Final CTA ── */}
      <section className="tech-container tech-cta-wrap">
        <p className="tech-label" data-reveal>Ready</p>
        <h2 className="tech-heading" style={{ maxWidth: '540px', margin: '0 auto 16px', textAlign: 'center' }} data-reveal data-delay="1">
          The pilot is how it earns its place.
        </h2>
        <p className="tech-body" style={{ maxWidth: '480px', margin: '0 auto 40px', textAlign: 'center' }} data-reveal data-delay="2">
          We deploy alongside your team, in your environment, connected to your
          existing systems. The intelligence starts compounding from the first interaction.
        </p>
        <div data-reveal data-delay="3">
          <Link href="/pilot" className="tech-cta-pill">
            Start a Pilot →
          </Link>
          <p className="tech-sovereignty">Sovereign · No training on your data · Your infrastructure</p>
        </div>
      </section>

    </main>
  );
}
