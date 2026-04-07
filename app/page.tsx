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
import './home-v2.css'; // CSS co-located at app/home-v2.css
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
    ls:       'Consolidation completed at 3:12am. Your focus on the GTM plan has intensified — 6 sessions in 9 days. I\'ve promoted it to a primary knowledge cluster.',
    context:  'Overnight: 3 patterns recalibrated · 1 new arc detected · Stance adjusted: depth → standard',
    signals:  ['consolidation cycle', 'relevance promotion', 'circadian'],
    gravity:  '0.62',
  },
];


// ── Knows Card — rolling intelligence reel ───────────────────────
// Business + Personal interleaved. Duplicated for seamless CSS loop.
const KNOWS_ITEMS = [
  { text: "Which customer relationships are starting to drift",                          cat: "Business"  },
  { text: "The pattern you've been repeating for six months",                            cat: "Personal"  },
  { text: "Where your pipeline keeps stalling — and why",                                cat: "Business"  },
  { text: "What your energy actually looks like across the week",                        cat: "Personal"  },
  { text: "What your team's tribal knowledge actually is",                               cat: "Business"  },
  { text: "The conversation you keep having with yourself",                              cat: "Personal"  },
  { text: "Which decisions have a proven track record — and which don't",                cat: "Business"  },
  { text: "Where you're growing — and where you're looping",                            cat: "Personal"  },
  { text: "What leaves when your best people leave",                                    cat: "Business"  },
  { text: "What you said you'd change — but haven't",                                  cat: "Personal"  },
  { text: "Which interactions are signalling risk before it's visible",                  cat: "Business"  },
  { text: "The version of yourself that's quietly emerging right now",                   cat: "Personal"  },
  { text: "Where your last three decisions lost their momentum",                         cat: "Business"  },
  { text: "The relationship that's been shifting without either of you noticing",        cat: "Personal"  },
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

function EvolvesCard() {
  const [activeOutput, setActiveOutput] = React.useState(0);

  // Cycle through last night's outputs every 3.2s
  React.useEffect(() => {
    const t = setInterval(() => setActiveOutput(p => (p + 1) % 4), 3200);
    return () => clearInterval(t);
  }, []);

  // What the engine actually produced last night — B2B translation of real engine outputs:
  // pattern_matrix (pattern detection) · memory_arcs (arc intelligence) ·
  // consciousness_cords (relationship re-weighting) · gravity_wells (cluster promotion)
  const OUTPUTS = [
    { result: '11 decision and behavioral patterns re-scored',     channel: 'Pattern Detection'  },
    { result: 'New intelligence arc: Supplier concentration risk', channel: 'Arc Intelligence'    },
    { result: '4 accounts re-weighted by relationship drift',      channel: 'Relationship Intel'  },
    { result: 'GTM plan promoted to primary knowledge cluster',    channel: 'Gravity Engine'      },
  ];

  return (
    <div className="h2-card h2-evolves-card">

      {/* Decorative pulse rings — corner glow */}
      <div className="h2-evolves-ring h2-evolves-ring-1" />
      <div className="h2-evolves-ring h2-evolves-ring-2" />
      <div className="h2-evolves-ring h2-evolves-ring-3" />

      {/* Moon icon — LS gold treatment */}
      <svg className="h2-evolves-moon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 20.5A12 12 0 1 1 15.5 8a9 9 0 0 0 12.5 12.5z"
              stroke="var(--color-gold-dim)" strokeWidth="0.75" fill="rgba(200,169,110,0.06)" />
        <circle cx="24" cy="9"  r="1.5"  fill="var(--color-gold-dim)" />
        <circle cx="29" cy="14" r="1"    fill="var(--color-gold-dim)" />
        <circle cx="26" cy="17" r="0.75" fill="var(--color-gold-dim)" />
      </svg>

      {/* Eyebrow — real timestamp */}
      <div className="h2-evolves-eyebrow">Last night · 3:12am</div>
      <div className="h2-evolves-headline">
        It gets smarter<br />while you sleep.
      </div>

      {/* What actually ran — cycling output panel */}
      <div style={{ marginBottom: '20px' }}>
        {OUTPUTS.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '9px 0',
              borderBottom: i < OUTPUTS.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
              opacity: activeOutput === i ? 1 : 0.3,
              transition: 'opacity 0.5s ease',
            }}
          >
            <span style={{
              width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
              marginTop: '2px',
              background: activeOutput === i ? 'rgba(200,169,110,0.12)' : 'transparent',
              border: `0.5px solid ${activeOutput === i ? 'rgba(200,169,110,0.4)' : 'rgba(255,255,255,0.07)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.5s ease',
            }}>
              {activeOutput === i && (
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-gold)' }} />
              )}
            </span>
            <div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.45,
                color: activeOutput === i ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                transition: 'color 0.5s ease',
              }}>{item.result}</div>
              <div style={{
                fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.08em',
                color: 'var(--color-gold-dim)', marginTop: '2px',
              }}>{item.channel}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="h2-evolves-hr" />

      {/* Stats */}
      <div className="h2-evolves-stats">
        <div className="h2-evolves-stat">
          <div className="h2-evolves-stat-num h2-evolves-stat-zero">0</div>
          <div className="h2-evolves-stat-label">configuration<br />required</div>
        </div>
        <div className="h2-evolves-stat">
          <div className="h2-evolves-stat-num">8</div>
          <div className="h2-evolves-stat-label">intelligence<br />channels per cycle</div>
        </div>
      </div>

      {/* Running tonight badge */}
      <div className="h2-evolves-badge">
        <span className="h2-evolves-badge-dot" />
        running tonight
      </div>

    </div>
  );
}

function KnowsCard() {
  const doubled = [...KNOWS_ITEMS, ...KNOWS_ITEMS];
  return (
    <div className="h2-card h2-knows-card">

      {/* ── Header ── */}
      <div className="h2-knows-header">
        <span className="h2-knows-live-dot" />
        <span className="h2-knows-header-label">Active intelligence</span>
        <span className="h2-knows-counter">51,847 signals</span>
      </div>

      {/* ── Scroll window with mask + focus strip ── */}
      <div className="h2-knows-window">
        <div className="h2-knows-focus-strip" />
        <ul className="h2-knows-reel">
          {doubled.map((item, i) => (
            <li key={i} className="h2-knows-item">
              <span className={`h2-knows-dot ${item.cat === 'Business' ? 'h2-knows-dot-biz' : 'h2-knows-dot-personal'}`} />
              <span className="h2-knows-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Footer ── */}
      <div className="h2-knows-footer">
        <span className="h2-knows-footer-label">The longer it runs, the sharper it gets.</span>
      </div>

    </div>
  );
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
                Every LLM you use today has a memory problem. Context windows overflow.
                Summaries lose detail. Ask &quot;how many times did we discuss this?&quot; and
                you&apos;ll get a guess, or nothing.
                LongStrider tracks 80+ signals across every interaction —
                who was involved, what mattered, how sentiment shifted, and how many times
                a topic has resurfaced. Ask anything about your past. Get the exact answer.
              </p>
              <div className="h2-compare">
                <div>51,000+ memories in production · sub-5 second recall</div>
                <div>5-axis retrieval — who, when, why, what, and how it connects</div>
                <div>Exact counts, not AI guesses</div>
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
              <span className="h2-label">It Knows You</span>
              <h2 className="h2-heading">
                It builds institutional intelligence.<br />Not a database. Not a dashboard.
              </h2>
              <p className="h2-lead">
                Every customer interaction. Every decision. Every outcome.<br />
                Accumulated, connected, and ready to surface what matters — before you ask.
              </p>
              <p className="h2-body">
                LongStrider builds a living model of your business: your customer relationships
                and their risk signals, your operational patterns, your team&apos;s accumulated
                expertise, the decisions that worked and the ones that didn&apos;t. Every
                interaction deepens it. Every night, it consolidates. After a year, it knows
                your business better than any new hire ever will — and it gets smarter every
                day you run it.
              </p>
              <div className="h2-compare">
                <div>Maps customer relationships — depth, history, risk signals</div>
                <div>Preserves expertise that would otherwise walk out the door</div>
                <div>Every agent you deploy inherits full context — and you control exactly what it can see and do</div>
                <div>Full audit trail: every decision, every action, every correction — owned by you</div>
              </div>
              <p className="h2-body" style={{ marginTop: '20px', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                After two years, you&apos;re not leaving a software vendor.<br />
                You&apos;re leaving your institutional memory.
              </p>
            </div>

            {/* Card right — rolling intelligence reel */}
            <div data-reveal data-delay="2">
              <KnowsCard />
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 3: IT EVOLVES ══════════════════ */}
        <section className="h2-section" data-section="evolves">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">It Evolves</span>
              <h2 className="h2-heading">
                It gets smarter<br />while you sleep.
              </h2>
              <p className="h2-lead">
                No maintenance windows. No manual retraining.<br />
                Every night, while you&apos;re not watching, it consolidates.
              </p>
              <p className="h2-body">
                A background consolidation cycle runs automatically — recalculating every
                knowledge cluster, surfacing patterns only visible across months of accumulated
                data, generating predictive signals about where your business is heading.
                Nobody schedules it. Nobody configures it. Year one, it knows things about
                your business that no single person on your team knows.
              </p>
              <div className="h2-compare">
                <div>Automatic nightly consolidation — zero configuration required</div>
                <div>Surfaces patterns only visible across months of accumulated data</div>
                <div>Predictive signals: where your business is heading before you ask</div>
              </div>
              <p className="h2-body" style={{ marginTop: '20px', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                The system compounds without anyone maintaining it.<br />
                That&apos;s the architecture — not a feature.
              </p>
            </div>

            {/* Visual right — EvolvesCard */}
            <div data-reveal data-delay="2">
              <EvolvesCard />
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
                exactly where you tell it to stay. The{' '}
                <Link href="/agents" style={{ color: 'var(--color-gold-dim)', textDecoration: 'none', borderBottom: '1px solid var(--color-border-gold)' }}>agents that run on this substrate</Link>
                {' '}are architecturally different from every framework you&apos;ve evaluated.
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
