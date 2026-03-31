'use client';

/**
 * HOME V2 — The Fab 5. Preview at /home-v2. Hot-swap target: app/page.tsx
 *
 * Narrative structure: Infinite Memory → It Knows You → It Evolves → You Own It → The Decision
 * Architecture mirrors manifesto/page.tsx exactly:
 *   - deck-page shell (aurora orbs + progress bar)
 *   - IntersectionObserver firing [data-reveal] → .deck-visible
 *   - StoryTimeline (same component, same pattern)
 *   - Section-driven narrative with data-section attributes
 *   - All styling via ls-tokens.css responsive layout tokens
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import './home-v2.css';
import { HeroSection } from '@/components/hero-section';
import { StoryTimeline, type StoryNode } from '@/components/story-timeline';

// ── Canvas & StoryTimeline constants — CSS vars cannot be used here.
// Canvas 2D API requires literal color strings.
// StoryTimeline node.color/glow are JS string props.
const GOLD     = '#c8a96e';
// Matches --color-gold
const PURPLE   = '#8b5cf6';
// Matches --color-purple
const GOLD_G   = 'rgba(200,169,110,0.40)';
// Matches approx --color-gold-ghost (slightly higher opacity for glow)
const PURP_G   = 'rgba(139,92,246,0.45)';
// Matches --color-purple-glow

// ── StoryTimeline nodes ───────────────────────────────────────────

const TIMELINE: StoryNode[] = [
  { id: 'top',       label: 'LongStrider',      color: GOLD,   glow: GOLD_G  },
  { id: 'memory',    label: 'Infinite Memory',   color: GOLD,   glow: GOLD_G  },
  { id: 'knows',     label: 'It Knows You',      color: PURPLE, glow: PURP_G  },
  { id: 'evolves',   label: 'It Evolves',        color: GOLD,   glow: GOLD_G  },
  { id: 'sovereign', label: 'You Own It',         color: PURPLE, glow: PURP_G  },
  { id: 'decision',  label: 'The Decision',      color: GOLD,   glow: GOLD_G  },
];

// ── Infinite Memory conversations — companion voice, not database ──

const CONVERSATIONS = [
  {
    you:      'How many times have we discussed the Brennan matter?',
    ls:       '41 times over 8 months. The tone shifted after the December call — you stopped negotiating and started litigating.',
    context:  'First raised: June 14, 2024 · Last: Yesterday at 3:47pm · Escalation detected Nov 28',
    signals:  ['contract dispute', 'strategy shift', 'liability exposure'],
    gravity:  '0.91',
  },
  {
    you:      'Hey — what did I miss?',
    ls:       'It\'s 7:14am. 2 days, 9 hours since we last connected. You have 4 open threads. I\'d close the GTM pricing model first — you said you wanted it done by Friday.',
    context:  'Open: GTM pricing · Brennan liability · Q2 board deck · Supplier audit · GTM deadline: April 4',
    signals:  ['session awareness', 'thread tracking', 'deadline recall'],
    gravity:  '0.84',
  },
  {
    you:      'Which supplier relationships are going quiet on us?',
    ls:       '3 accounts have crossed the silence threshold. Pacific Materials hasn\'t responded in 47 days — that\'s new for them.',
    context:  'Pacific Materials · Vertex Supply · GTS Logistics · Engagement declining since October',
    signals:  ['silence threshold', 'engagement drift', 'risk: sourcing'],
    gravity:  '0.78',
  },
  {
    you:      'What happened overnight?',
    ls:       'Dream cycle completed at 3:12am. Your focus on the GTM plan has intensified — 6 sessions in 9 days. I\'ve promoted it to a primary gravity well.',
    context:  'Overnight: 3 patterns recalibrated · 1 new arc detected · Stance adjusted: depth → standard',
    signals:  ['dream cycle', 'gravity promotion', 'circadian'],
    gravity:  '0.62',
  },
];

type ConvPhase = 'you' | 'ls' | 'context' | 'hold' | 'fade';

interface ConvState {
  ci:           number;
  youChars:     number;
  lsChars:      number;
  contextChars: number;
  phase:        ConvPhase;
  opacity:      number;
}

const CONV_INIT: ConvState = {
  ci: 0, youChars: 0, lsChars: 0, contextChars: 0,
  phase: 'you', opacity: 1,
};

function nextConvState(s: ConvState): [ConvState, number] {
  const c = CONVERSATIONS[s.ci];
  if (s.phase === 'you') {
    if (s.youChars < c.you.length)
      return [{ ...s, youChars: s.youChars + 1 }, 42];
    return [{ ...s, phase: 'ls' }, 650];   // pause — LS is thinking
  }
  if (s.phase === 'ls') {
    if (s.lsChars < c.ls.length)
      return [{ ...s, lsChars: s.lsChars + 1 }, 22];
    return [{ ...s, phase: 'context' }, 350];
  }
  if (s.phase === 'context') {
    if (s.contextChars < c.context.length)
      return [{ ...s, contextChars: s.contextChars + 1 }, 14];
    return [{ ...s, phase: 'hold' }, 400];
  }
  if (s.phase === 'hold')
    return [{ ...s, phase: 'fade', opacity: 0 }, 5_200];
  return [{
    ci:           (s.ci + 1) % CONVERSATIONS.length,
    youChars:     0,
    lsChars:      0,
    contextChars: 0,
    phase:        'you',
    opacity:      1,
  }, 800];
}

function TotalRecallCard() {
  const [s, setS] = useState<ConvState>(CONV_INIT);

  useEffect(() => {
    const [next, delay] = nextConvState(s);
    const t = setTimeout(() => setS(next), delay);
    return () => clearTimeout(t);
  }, [s]);

  const c            = CONVERSATIONS[s.ci];
  const dispYou      = c.you.slice(0, s.youChars);
  const dispLs       = c.ls.slice(0, s.lsChars);
  const dispContext  = c.context.slice(0, s.contextChars);
  const showCursor   = s.phase === 'you' || (s.phase === 'ls' && !s.lsChars);
  const showSignals  = s.phase === 'hold' || s.phase === 'fade';

  return (
    <div
      className="h2-card"
      style={{ opacity: s.opacity, transition: 'opacity 0.65s var(--ease-out)', minHeight: '340px' }}
    >
      {/* User message */}
      <div style={{ marginBottom: '24px' }}>
        <span className="h2-query-label">You</span>
        <p className="h2-query-text">
          {dispYou}
          {showCursor && <span className="h2-blink" style={{ color: GOLD, marginLeft: '1px' }}>▌</span>}
        </p>
      </div>

      {/* LS response */}
      {dispLs && (
        <>
          <hr className="h2-card-divider h2-fadein" />
          <div style={{ marginBottom: '14px' }} className="h2-fadein">
            <span className="h2-recall-label">LongStrider</span>
            <p className="h2-recall-answer">{dispLs}</p>
          </div>
        </>
      )}

      {dispContext && (
        <p className="h2-recall-detail h2-fadein">{dispContext}</p>
      )}

      {/* Signal chips + gravity */}
      {showSignals && (
        <div className="h2-chips h2-fadein">
          {c.signals.map((sig, i) => (
            <span key={i} className="h2-chip">{sig}</span>
          ))}
          <span className="h2-chip-meta">gravity {c.gravity}</span>
        </div>
      )}

      {/* Progress dots */}
      <div className="h2-dots">
        {CONVERSATIONS.map((_, i) => (
          <div
            key={i}
            className={`h2-dot ${i === s.ci ? 'h2-dot-active' : 'h2-dot-inactive'}`}
            style={{ width: i === s.ci ? 24 : 6 }}
          />
        ))}
      </div>
    </div>
  );
}

const SECTORS = [
  { num:'01', label:'Legal',
    body:'Every case. Every client conversation. Privileged, queryable, and never leaving your network.' },
  { num:'02', label:'Energy',
    body:'Decades of operational intelligence. Regulatory context. Asset history that compounds in real time.' },
  { num:'03', label:'Power',
    body:'Grid intelligence, maintenance history, anomaly patterns — owned and accumulating at scale.' },
  { num:'04', label:'Hospitality',
    body:"Guest relationships, operational memory, staff intelligence that survives every transition." },
];

// ── Main page component ───────────────────────────────────────────

export default function HomeV2Page() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll progress bar — same as manifesto
  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // data-reveal IntersectionObserver — same pattern as manifesto
  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('deck-visible');
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observerRef.current?.observe(el));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  return (
    <div className="h2-page">

      {/* Progress bar */}
      <div className="h2-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Aurora ambient orbs */}
      <div className="h2-aurora-1" />
      <div className="h2-aurora-2" />
      <div className="h2-aurora-3" />

      {/* StoryTimeline — same component the manifesto uses */}
      <StoryTimeline nodes={TIMELINE} showAfter={50} />

      {/* Hero — tracked by timeline */}
      <div data-section="top">
        <HeroSection />
      </div>

      {/* ── Main story — The Fab 5 ──────────────────── */}
      <div className="h2-container">

        {/* ══ Chapter 1: INFINITE MEMORY ══════════════ */}
        <section className="h2-section" data-section="memory">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">Infinite Memory</span>
              <h2 className="h2-heading">
                No context window.<br />It remembers everything.
              </h2>
              <p className="h2-lead">
                Not estimates. Not approximations.<br />
                Exact counts. Exact dates. Exact context.
              </p>
              <p className="h2-body">
                Every AI you use today forgets. ChatGPT resets after every session.
                RAG approximates. Fine-tuning costs $50k and still has no memory.
                LongStrider tracks 80+ behavioral dimensions across every interaction —
                who was involved, what mattered, how sentiment shifted, and how many times
                a thread has resurfaced. Ask anything about your past. Get the exact answer.
              </p>
              <div className="h2-compare">
                <div>51,000+ memories · sub-5 second recall</div>
                <div>Four-axis retrieval: Entity × Temporal × Well × Topic</div>
                <div>Deterministic SQL aggregation, not LLM estimation</div>
              </div>
            </div>

            {/* Demo right */}
            <div data-reveal data-delay="2">
              <TotalRecallCard />
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 2: IT KNOWS YOU ════════════════ */}
        <section className="h2-section h2-section-alt" data-section="knows">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">Intelligence That Learns</span>
              <h2 className="h2-heading">
                It doesn&apos;t just remember.<br />It understands.
              </h2>
              <p className="h2-lead">
                Identity. Relationships. Patterns. Blind spots.<br />
                — and every agent you connect inherits this intelligence.
              </p>
              <p className="h2-body">
                LongStrider&apos;s intelligence kernel extracts 70+ dimensions from every interaction —
                emotional signatures, behavioral patterns, relational dynamics, and psychological
                markers that standard AI systems never track. Gravity physics determines what
                matters. Consciousness cords map who matters. The Cortex gives you 18 Living Laws
                that control how the system thinks, communicates, and stays in character.
                Connect any agent to this substrate and it inherits persistent memory,
                behavioral control, and deep context — instantly.
              </p>
              <div className="h2-compare">
                <div>70+ cognitive dimensions per interaction</div>
                <div>Gravity physics — significance, not just frequency</div>
                <div>Plug any agent in — persistent memory + behavioral control</div>
              </div>
            </div>

            {/* Card right */}
            <div data-reveal data-delay="2">
              <div className="h2-card" style={{ padding: 'var(--card-pad)', background: 'var(--card-bg)', border: 'var(--card-border)', borderRadius: 'var(--card-radius)' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--color-gold-dim)', marginBottom: '24px' }}>
                  What LongStrider knows about you
                </div>
                {[
                  'Your communication style and preferences',
                  'Who matters to you — and why',
                  'Patterns you repeat without realizing',
                  'Blind spots you consistently avoid',
                  'How your thinking has evolved over time',
                  'What you care about right now vs. six months ago',
                  'The relationships between your people, topics, and decisions',
                  'Every correction you\'ve ever given it',
                ].map((item, i) => (
                  <div key={i} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    lineHeight: 1.65,
                    color: i < 3 ? 'var(--color-text-body)' : 'var(--color-text-secondary)',
                    padding: '8px 0',
                    borderBottom: i < 7 ? '1px solid var(--color-border-subtle)' : 'none',
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 3: IT EVOLVES ══════════════════ */}
        <section className="h2-section" data-section="evolves">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">Living Intelligence</span>
              <h2 className="h2-heading">
                It gets smarter<br />while you sleep.
              </h2>
              <p className="h2-lead">
                Every night, LongStrider runs a dream cycle.<br />
                It recalibrates. It detects patterns. It learns your preferences.
              </p>
              <p className="h2-body">
                This isn&apos;t static storage. It&apos;s a living system. Every night, a five-pass engine
                recalculates the gravity of every knowledge cluster, identifies what&apos;s healthy
                or drifting, detects fragile focus areas, and learns your preferred tone from
                your corrections. Patterns emerge across eight parallel detectors. Memory arcs
                form narrative threads. Week over week, the system compounds — and the gap
                between what it knows and what your competitors know grows wider.
              </p>
              <div className="h2-compare">
                <div>Nightly dream cycle — five-pass substrate recompilation</div>
                <div>8 parallel pattern detectors (behavioral, emotional, temporal)</div>
                <div>Stance learning — adapts tone and depth from your feedback</div>
              </div>
            </div>

            {/* Visual right — compounding metaphor */}
            <div data-reveal data-delay="2">
              <div className="h2-card" style={{ padding: 'var(--card-pad)', background: 'var(--card-bg)', border: 'var(--card-border)', borderRadius: 'var(--card-radius)', textAlign: 'center' as const }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--color-text-primary)', lineHeight: 1 }}>
                  ∞
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--color-gold-dim)', marginTop: '20px', marginBottom: '32px' }}>
                  Compounding Intelligence
                </div>
                {[
                  { label: 'Day 1', desc: 'Baseline — your first conversations', opacity: 0.4 },
                  { label: 'Week 1', desc: 'Patterns emerge. Relationships form.', opacity: 0.55 },
                  { label: 'Month 1', desc: 'Gravity wells crystalize. Identity distilled.', opacity: 0.72 },
                  { label: 'Month 6', desc: 'Predictive signals. Anticipatory intelligence.', opacity: 0.88 },
                  { label: 'Year 1', desc: 'Your competitive moat is uncatchable.', opacity: 1 },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: i < 4 ? '1px solid var(--color-border-subtle)' : 'none',
                    opacity: row.opacity,
                  }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', fontWeight: 500, color: 'var(--color-gold)', minWidth: '72px' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)', textAlign: 'right' as const }}>{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 4: YOU OWN IT ══════════════════ */}
        <section className="h2-section h2-section-alt" data-section="sovereign">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">Sovereign Architecture</span>
              <h2 className="h2-heading">
                Intelligence that never<br />leaves your perimeter.
              </h2>
              <p className="h2-lead">
                Built to run on your infrastructure.<br />
                Your LLM. Your database. Your rules.
              </p>
              <p className="h2-body">
                Most AI tools are built for their infrastructure — your data
                flows through their systems, lives on their servers, and
                funds their next training run. LongStrider is architecturally
                different: the LLM is a voicebox, the intelligence is sovereign.
                Deploy on your own infrastructure, connect any model — hosted
                or local — and keep every byte of organizational intelligence
                exactly where you tell it to stay.
              </p>
              <div className="h2-compare">
                <div>Deploy on your own infrastructure — cloud or on-prem</div>
                <div>Bring any LLM — OpenAI, Ollama, Claude, Llama</div>
                <div>Your data never trains an external model</div>
              </div>
            </div>

            {/* Clean sovereignty proof — no canvas, editorial card */}
            <div data-reveal data-delay="2">
              <div className="h2-card" style={{ padding: 'var(--card-pad)', background: 'var(--card-bg)', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--card-radius)' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--color-gold-dim)', marginBottom: '28px' }}>
                  The Architecture
                </div>
                {[
                  { layer: 'Your Agents', detail: 'Any tool, any workflow, any LLM', border: true },
                  { layer: 'LongStrider', detail: 'Intelligence kernel · Memory · Cortex · Living Laws', border: true },
                  { layer: 'Your Infrastructure', detail: 'Your cloud, your database, your security perimeter', border: false },
                ].map((row, i) => (
                  <div key={i} style={{
                    padding: '18px 0',
                    borderBottom: row.border ? '1px solid var(--color-border-subtle)' : 'none',
                  }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '4px' }}>{row.layer}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-muted)' }}>{row.detail}</div>
                  </div>
                ))}
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--color-gold)', marginTop: '20px', textAlign: 'center' as const }}>
                  100% On-Premises · LLM-Agnostic · Zero Telemetry
                </div>
              </div>
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ SECTORS — compact ══════════════════════ */}
        <section className="h2-section h2-section-center" data-section="sectors" style={{ paddingTop: 'calc(var(--section-pad-v) * 0.6)', paddingBottom: 'calc(var(--section-pad-v) * 0.6)' }}>
          <div className="h2-inner">
            <div data-reveal>
              <span className="h2-label">Where It Works</span>
              <h2 className="h2-heading" style={{ maxWidth: 680, margin: '0 auto 48px' }}>
                Built for organizations where<br />intelligence is the moat.
              </h2>
            </div>
            <div className="h2-sectors-grid" data-reveal data-delay="1">
              {SECTORS.map((s) => (
                <div key={s.num} className="h2-sector-card">
                  <span className="h2-sector-num">{s.num}</span>
                  <h3 className="h2-sector-name">{s.label}</h3>
                  <p className="h2-sector-body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 5: THE DECISION ════════════════ */}
        <section className="h2-section h2-section-center" data-section="decision">
          <div className="h2-decision-wrap">
            <div data-reveal>
              <span className="h2-label">The Decision</span>
              <p className="h2-decision-copy">
                <span style={{ color: 'var(--color-gold)' }}>Build</span>
                {' '}something that gets smarter every day.{' '}
                <span style={{ color: 'var(--color-gold)' }}>Own</span>
                {' '}it completely.{' '}
                <span style={{ color: 'var(--color-gold)' }}>Compound</span>
                {' '}it indefinitely.
              </p>
            </div>
            <div data-reveal data-delay="1">
              <Link href="/pilot" className="h2-cta-pill">
                Start a Pilot →
              </Link>
              <p className="h2-sovereignty">
                100% on-premises · LLM-agnostic · Zero telemetry
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
