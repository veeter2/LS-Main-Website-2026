'use client';

/**
 * HOME V2 — Preview at /home-v2. Hot-swap target: app/page.tsx
 *
 * Architecture mirrors manifesto/page.tsx exactly:
 *   - deck-page shell (aurora orbs + progress bar)
 *   - IntersectionObserver firing [data-reveal] → .deck-visible
 *   - StoryTimeline (same component, same pattern)
 *   - Section-driven narrative with data-section attributes
 *
 * Animation (HeroSection lines 10-260) is OFF LIMITS — imported as-is.
 * HeroSection content area (old copy) is acknowledged as temporary; replaced on hot-swap.
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
  { id: 'recall',   label: 'Total Recall',  color: GOLD,   glow: GOLD_G  },
  { id: 'memory',   label: 'Time Machine',  color: PURPLE, glow: PURP_G  },
  { id: 'compound', label: 'Living Memory', color: GOLD,   glow: GOLD_G  },
  { id: 'sectors',  label: "Who It's For",  color: PURPLE, glow: PURP_G  },
  { id: 'decision', label: 'The Decision',  color: GOLD,   glow: GOLD_G  },
];

// ── Total Recall data — curated, controlled, simulated ───────────

const QUERIES = [
  {
    query:    'How many times have we discussed the Brennan matter?',
    answer:   '41 discussions over 8 months.',
    detail:   'First raised: June 14, 2024 · Last: Yesterday at 3:47pm',
    entities: ['contract dispute', 'settlement terms', 'liability exposure'],
    gravity:  '0.91',
  },
  {
    query:    'What changed in deal flow after the Q3 miss?',
    answer:   '17 workstreams affected. 6 revised. 3 escalated.',
    detail:   'Approval-seeking behavior ↑73% · Pattern: budget reallocation active',
    entities: ['portfolio review', 'GP corrections', 'capital allocation'],
    gravity:  '0.87',
  },
  {
    query:    'Which supplier relationships are showing drift?',
    answer:   '3 accounts entering silence threshold.',
    detail:   'Pacific Materials · Vertex Supply · GTS Logistics · 47-day max silence',
    entities: ['engagement declining', 'October inflection', 'risk: sourcing'],
    gravity:  '0.78',
  },
];

type RecallPhase = 'query' | 'answer' | 'detail' | 'hold' | 'fade';

function TotalRecallCard() {
  const [qi,           setQi]           = useState(0);
  const [dispQuery,    setDispQuery]    = useState('');
  const [dispAnswer,   setDispAnswer]   = useState('');
  const [dispDetail,   setDispDetail]   = useState('');
  const [phase,        setPhase]        = useState<RecallPhase>('query');
  const [panelOpacity, setPanelOpacity] = useState(1);

  useEffect(() => {
    setDispQuery(''); setDispAnswer(''); setDispDetail('');
    setPhase('query'); setPanelOpacity(1);
  }, [qi]);

  useEffect(() => {
    const q = QUERIES[qi];

    if (phase === 'query') {
      if (dispQuery.length < q.query.length) {
        const t = setTimeout(() => setDispQuery(q.query.slice(0, dispQuery.length + 1)), 32);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('answer'), 520);
      return () => clearTimeout(t);
    }
    if (phase === 'answer') {
      if (dispAnswer.length < q.answer.length) {
        const t = setTimeout(() => setDispAnswer(q.answer.slice(0, dispAnswer.length + 1)), 28);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('detail'), 250);
      return () => clearTimeout(t);
    }
    if (phase === 'detail') {
      if (dispDetail.length < q.detail.length) {
        const t = setTimeout(() => setDispDetail(q.detail.slice(0, dispDetail.length + 1)), 18);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('hold'), 300);
      return () => clearTimeout(t);
    }
    if (phase === 'hold') {
      const t = setTimeout(() => setPhase('fade'), 3_800);
      return () => clearTimeout(t);
    }
    if (phase === 'fade') {
      setPanelOpacity(0);
      const t = setTimeout(() => setQi((c) => (c + 1) % QUERIES.length), 700);
      return () => clearTimeout(t);
    }
  }, [phase, dispQuery, dispAnswer, dispDetail, qi]);

  const q = QUERIES[qi];
  const showCursor  = phase === 'query' || (phase === 'answer' && !dispAnswer);
  const showEntities = phase === 'hold' || phase === 'fade';

  return (
    <div
      className="h2-card"
      style={{ opacity: panelOpacity, transition: 'opacity 0.65s var(--ease-out)', minHeight: '340px' }}
    >
      {/* Query line */}
      <div style={{ marginBottom: '24px' }}>
        <span className="h2-query-label">Query</span>
        <p className="h2-query-text">
          {dispQuery}
          {showCursor && <span className="h2-blink" style={{ color: GOLD, marginLeft: '1px' }}>▌</span>}
        </p>
      </div>

      {/* Answer block */}
      {dispAnswer && (
        <>
          <hr className="h2-card-divider h2-fadein" />
          <div style={{ marginBottom: '14px' }} className="h2-fadein">
            <span className="h2-recall-label">Recall</span>
            <p className="h2-recall-answer">{dispAnswer}</p>
          </div>
        </>
      )}

      {dispDetail && (
        <p className="h2-recall-detail h2-fadein">{dispDetail}</p>
      )}

      {/* Entity chips + gravity score */}
      {showEntities && (
        <div className="h2-chips h2-fadein">
          {q.entities.map((e, i) => (
            <span key={i} className="h2-chip">{e}</span>
          ))}
          <span className="h2-chip-meta">gravity {q.gravity}</span>
        </div>
      )}

      {/* Progress dots */}
      <div className="h2-dots">
        {QUERIES.map((_, i) => (
          <div
            key={i}
            className={`h2-dot ${i === qi ? 'h2-dot-active' : 'h2-dot-inactive'}`}
            style={{ width: i === qi ? 24 : 6 }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Time Machine data ─────────────────────────────────────────────

const MONTHS = [
  { label: 'Jan 2024', count: 12, density: 0.24 },
  { label: 'Feb 2024', count: 19, density: 0.38 },
  { label: 'Mar 2024', count: 28, density: 0.56 },
  { label: 'Apr 2024', count: 22, density: 0.44 },
  { label: 'May 2024', count: 35, density: 0.70 },
  { label: 'Jun 2024', count: 41, density: 0.82 },
  { label: 'Jul 2024', count: 30, density: 0.60 },
  { label: 'Aug 2024', count: 38, density: 0.76 },
  { label: 'Sep 2024', count: 53, density: 1.00 },
  { label: 'Oct 2024', count: 45, density: 0.90 },
  { label: 'Nov 2024', count: 39, density: 0.78 },
  { label: 'Dec 2024', count: 29, density: 0.58 },
  { label: 'Jan 2025', count: 47, density: 0.94 },
  { label: 'Feb 2025', count: 52, density: 0.99 },
  { label: 'Mar 2025', count: 49, density: 0.96 },
];

function TimeMachineCard() {
  const [active,  setActive]  = useState(MONTHS.length - 1);
  const [counter, setCounter] = useState(54_230);
  const dirRef = useRef(-1);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => {
        const n = p + dirRef.current;
        if (n <= 0 || n >= MONTHS.length - 1) dirRef.current *= -1;
        return Math.max(0, Math.min(MONTHS.length - 1, n));
      });
    }, 1_600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCounter((c) => c + Math.floor(Math.random() * 4 + 1)), 1_800);
    return () => clearInterval(id);
  }, []);

  const m = MONTHS[active];

  return (
    <div className="h2-card">
      {/* Header */}
      <div className="h2-card-header">
        <span className="h2-card-tag">Intelligence History</span>
        <span className="h2-card-counter">{counter.toLocaleString()} memories</span>
      </div>

      {/* Month rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {MONTHS.map((month, i) => {
          const isActive = i === active;
          const dotColor = month.density > 0.75 ? 'var(--color-gold)'
            : month.density > 0.45 ? 'var(--color-purple)'
            : 'var(--color-border)';
          const dotGlow = month.density > 0.75 ? '0 0 6px var(--color-gold-dim)' : 'none';
          const barColor = month.density > 0.75
            ? `linear-gradient(to right, var(--color-gold), var(--color-purple))`
            : 'var(--color-purple)';

          return (
            <div
              key={i}
              className={`h2-month-row ${isActive ? 'h2-month-row-active' : ''}`}
            >
              <div
                className="h2-month-dot"
                style={{ background: dotColor, boxShadow: dotGlow }}
              />
              <span className={`h2-month-label ${isActive ? 'h2-month-label-active' : ''}`}>
                {month.label}
              </span>
              <div className="h2-month-bar-track">
                <div
                  className="h2-month-bar-fill"
                  style={{ width: `${month.density * 100}%`, background: barColor }}
                />
              </div>
              <span className={`h2-month-count ${isActive ? 'h2-month-count-active' : ''}`}>
                {month.count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active month callout */}
      <div className="h2-card-footer">
        <span className="h2-card-footer-label">{m.label}</span>
        <span className="h2-card-footer-meta">
          {m.count} conversations · {(m.density * 100).toFixed(0)}% density
        </span>
      </div>
    </div>
  );
}

// ── Gravity Garden canvas (adapted from gravity-garden-v2.tsx) ────

interface GNode { id:string; label:string; gravity:number; connections:string[]; x:number; y:number; vx:number; vy:number; }

const SEED_NODES = [
  { id:'strategy',   label:'M&A Strategy',      gravity:1.00, connections:['finance','legal']       },
  { id:'finance',    label:'Capital Allocation', gravity:0.85, connections:['strategy','portfolio']  },
  { id:'legal',      label:'Regulatory Risk',    gravity:0.75, connections:['strategy','compliance'] },
  { id:'portfolio',  label:'Portfolio Intel',    gravity:0.72, connections:['finance','exits']       },
  { id:'exits',      label:'Exit Planning',      gravity:0.65, connections:['portfolio','strategy']  },
  { id:'compliance', label:'Compliance',         gravity:0.52, connections:['legal']                 },
  { id:'departures', label:'Key Departures',     gravity:0.61, connections:['strategy','portfolio']  },
  { id:'signals',    label:'Market Signals',     gravity:0.48, connections:['strategy','exits']      },
];

function GravityGardenCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef  = useRef<GNode[]>([]);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    nodesRef.current = SEED_NODES.map((n, i) => {
      const a = (i / SEED_NODES.length) * Math.PI * 2;
      const d = 110 + (1 - n.gravity) * 155;
      return { ...n, x: Math.cos(a)*d, y: Math.sin(a)*d, vx:0, vy:0 };
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // DPR-aware resize
    const resize = () => {
      const r = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w * r;
      canvas.height = h * r;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(r, r);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const tick = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.fillStyle = 'rgba(8,8,9,0.88)';
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.translate(W/2, H/2);

      const ns = nodesRef.current;

      // Physics step
      ns.forEach((n, i) => {
        ns.forEach((o, j) => {
          if (i===j) return;
          const dx = o.x-n.x, dy = o.y-n.y;
          const d  = Math.hypot(dx, dy);
          if (d < 20 || d > 380) return;
          const conn = n.connections.includes(o.id);
          const f  = conn
            ? (o.gravity*n.gravity*42)/(d*d)
            : (o.gravity*n.gravity*9)/(d*d);
          n.vx += dx*f*0.01;
          n.vy += dy*f*0.01;
        });
        // Gentle center pull
        const cd = Math.hypot(n.x, n.y);
        if (cd > 45) { n.vx += (-n.x)*0.0012; n.vy += (-n.y)*0.0012; }
        n.x += n.vx; n.y += n.vy;
        n.vx *= 0.972; n.vy *= 0.972;
      });

      // Draw connection lines
      ns.forEach(n => {
        n.connections.forEach(tid => {
          const tgt = ns.find(o => o.id===tid);
          if (!tgt) return;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(200,169,110,0.07)';
          ctx.lineWidth = 1;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(tgt.x, tgt.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      ns.forEach(n => {
        const base  = 7 + n.gravity * 24;
        const pulse = base + Math.sin(t*2.2 + n.gravity*Math.PI)*2;
        const isGold = n.gravity > 0.75;
        const rgb    = isGold ? [200,169,110] : [139,92,246];

        // Glow halo
        const grad = ctx.createRadialGradient(n.x,n.y,0, n.x,n.y, pulse*2.8);
        grad.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${n.gravity*0.26})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse*2.8, 0, Math.PI*2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = isGold ? GOLD : PURPLE;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse, 0, Math.PI*2);
        ctx.fill();

        // Label for significant nodes
        if (n.gravity > 0.60) {
          ctx.fillStyle   = isGold ? 'rgba(200,169,110,0.80)' : 'rgba(200,200,255,0.52)';
          ctx.font        = `${9 + n.gravity*3}px "Lora", Georgia, serif`;
          ctx.textAlign   = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(n.label, n.x, n.y + pulse + 7);
        }
      });

      ctx.restore();
      t += 0.016;
      animRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="h2-canvas-wrap">
      <canvas ref={canvasRef} className="h2-canvas" />
      <span className="h2-canvas-tag">Gravity simulation · live</span>
    </div>
  );
}

// ── Sectors data ──────────────────────────────────────────────────

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
      <StoryTimeline nodes={TIMELINE} showAfter={500} />

      {/* Hero animation — OFF LIMITS, exactly as built */}
      <HeroSection />

      {/* ── Main story ────────────────────────────── */}
      <div className="h2-container">

        {/* ══ Chapter 1: TOTAL RECALL ══════════════ */}
        <section className="h2-section" data-section="recall">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">Total Recall</span>
              <h2 className="h2-heading">
                Ask anything<br />about your past.
              </h2>
              <p className="h2-lead">
                Not semantic similarity. Not approximations.<br />
                Exact counts. Exact dates. Exact context.
              </p>
              <p className="h2-body">
                LongStrider tracks 80+ behavioral dimensions per interaction —
                not just what was said, but what mattered, who was involved,
                how the sentiment shifted, and how many times the thread has
                resurfaced since. Other systems guess. This one counts.
              </p>
              <div className="h2-compare">
                <div>vs. ChatGPT — forgets after every session</div>
                <div>vs. RAG — estimates counts, loses exact detail</div>
                <div>vs. Fine-tuning — $50k, 3 months, still no memory</div>
              </div>
            </div>

            {/* Product demo right */}
            <div data-reveal data-delay="2">
              <TotalRecallCard />
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 2: TIME MACHINE ══════════════ */}
        <section className="h2-section h2-section-alt" data-section="memory">
          <div className="h2-grid h2-grid-reverse" data-reveal>

            {/* Product demo left (reversed) */}
            <div data-reveal data-delay="2">
              <TimeMachineCard />
            </div>

            {/* Editorial right */}
            <div>
              <span className="h2-label">The Time Machine</span>
              <h2 className="h2-heading">
                Every moment,<br />preserved.
              </h2>
              <p className="h2-lead">
                Jump to any point in your organization's intelligence history.
              </p>
              <p className="h2-body">
                See which decisions were made, which patterns were forming,
                what your team was thinking — before and after every inflection
                point. The data is continuous. The timeline is infinite.
                Every conversation your organization has ever had, weighted
                by relevance and organized by gravity.
              </p>
              <div className="h2-compare">
                <div>No manual tagging. No categorization.</div>
                <div>Built automatically from every conversation.</div>
                <div>Continuously. Without being asked.</div>
              </div>
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 3: LIVING MEMORY ═════════════ */}
        <section className="h2-section" data-section="compound">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">Living Memory</span>
              <h2 className="h2-heading">
                Intelligence that<br />organizes itself.
              </h2>
              <p className="h2-lead">
                Gravity Wells pull related intelligence into clusters.
                Automatically.
              </p>
              <p className="h2-body">
                The more significant a topic — measured across time, frequency,
                and emotional weight — the larger its gravitational pull on
                everything connected to it. No tagging. No filing. No maintenance.
                Every night, a five-pass engine recalculates the gravity of every
                cluster, identifies what's healthy or drifting, and compounds it
                further. The system works while you sleep.
              </p>
              <div className="h2-compare">
                <div>Every night: five-pass compounding engine</div>
                <div>Recalculates every knowledge cluster</div>
                <div>Builds predictive signals on drift</div>
              </div>
            </div>

            {/* Canvas right */}
            <div data-reveal data-delay="2">
              <GravityGardenCanvas />
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 4: SECTORS ═══════════════════ */}
        <section className="h2-section h2-section-alt h2-section-center" data-section="sectors">
          <div className="h2-inner">
            <div data-reveal>
              <span className="h2-label">Where It Works</span>
              <h2 className="h2-heading" style={{ maxWidth: 680, margin: '0 auto 64px' }}>
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

        {/* ══ Chapter 5: THE DECISION ══════════════ */}
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
