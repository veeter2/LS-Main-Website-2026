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
 *
 * GravityGardenOrbital: adapted from living-memory-v2/orbital-graph.tsx
 * and living-memory-v3/orbital-graph-physics.tsx — SVG rings + CSS keyframe orbits.
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
  { id: 'recall',    label: 'Total Recall',  color: GOLD,   glow: GOLD_G  },
  { id: 'memory',    label: 'Time Machine',  color: PURPLE, glow: PURP_G  },
  { id: 'compound',  label: 'Living Memory', color: GOLD,   glow: GOLD_G  },
  { id: 'cortex',    label: 'The Cortex',    color: PURPLE, glow: PURP_G  },
  { id: 'sovereign', label: 'Sovereignty',   color: GOLD,   glow: GOLD_G  },
  { id: 'sectors',   label: "Who It's For",  color: PURPLE, glow: PURP_G  },
  { id: 'decision',  label: 'The Decision',  color: GOLD,   glow: GOLD_G  },
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

interface RecallState {
  qi:          number;
  queryChars:  number;
  answerChars: number;
  detailChars: number;
  phase:       RecallPhase;
  opacity:     number;
}

const RECALL_INIT: RecallState = {
  qi: 0, queryChars: 0, answerChars: 0, detailChars: 0,
  phase: 'query', opacity: 1,
};

function nextRecallState(s: RecallState): [RecallState, number] {
  const q = QUERIES[s.qi];
  // returns [nextState, delayMs]
  if (s.phase === 'query') {
    if (s.queryChars < q.query.length)
      return [{ ...s, queryChars: s.queryChars + 1 }, 32];
    return [{ ...s, phase: 'answer' }, 520];
  }
  if (s.phase === 'answer') {
    if (s.answerChars < q.answer.length)
      return [{ ...s, answerChars: s.answerChars + 1 }, 28];
    return [{ ...s, phase: 'detail' }, 250];
  }
  if (s.phase === 'detail') {
    if (s.detailChars < q.detail.length)
      return [{ ...s, detailChars: s.detailChars + 1 }, 18];
    return [{ ...s, phase: 'hold' }, 300];
  }
  if (s.phase === 'hold')
    return [{ ...s, phase: 'fade', opacity: 0 }, 3_800];
  // fade → reset atomically — no qi/phase split
  return [{
    qi:          (s.qi + 1) % QUERIES.length,
    queryChars:  0,
    answerChars: 0,
    detailChars: 0,
    phase:       'query',
    opacity:     1,
  }, 700];
}

function TotalRecallCard() {
  const [s, setS] = useState<RecallState>(RECALL_INIT);

  // Single effect — one timeout per tick, always cleaned up
  useEffect(() => {
    const [next, delay] = nextRecallState(s);
    const t = setTimeout(() => setS(next), delay);
    return () => clearTimeout(t);
  }, [s]);

  const q           = QUERIES[s.qi];
  const dispQuery   = q.query.slice(0, s.queryChars);
  const dispAnswer  = q.answer.slice(0, s.answerChars);
  const dispDetail  = q.detail.slice(0, s.detailChars);
  const showCursor  = s.phase === 'query' || (s.phase === 'answer' && !s.answerChars);
  const showEntities = s.phase === 'hold' || s.phase === 'fade';

  return (
    <div
      className="h2-card"
      style={{ opacity: s.opacity, transition: 'opacity 0.65s var(--ease-out)', minHeight: '340px' }}
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
            className={`h2-dot ${i === s.qi ? 'h2-dot-active' : 'h2-dot-inactive'}`}
            style={{ width: i === s.qi ? 24 : 6 }}
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

// ── Gravity Garden Orbital (────────────────────────────────────────────────
// Adapted from living-memory-v2/orbital-graph.tsx +
// living-memory-v3/orbital-graph-physics.tsx
// ─ SVG dashed orbit rings
// ─ Center sun: liquid glass sphere, CSS pulse
// ─ Planets: 5-layer nested div counter-rotation (keeps label upright)
// ─ CSS @keyframes orbitCW / orbitCCW
// ─ No canvas. No physics sim. No Framer Motion dependency.
// ───────────────────────────────────────────────────────────────

// 3 concentric rings — outer slowest (40s), inner fastest (14s)
const ORBIT_RINGS = [
  { radius: 145, duration: 40 }, // outer — slow
  { radius:  96, duration: 25 }, // middle
  { radius:  52, duration: 14 }, // inner — fast
];

// Curated org-intelligence nodes. Gold = high gravity. Purple = mid.
const ORB_PLANETS = [
  // Inner ring (2 fast)
  { id:'pm',  label:'Pattern Matrix',       ring:2, slot:0, slots:2, color: GOLD   },
  { id:'ti',  label:'Team Intelligence',    ring:2, slot:1, slots:2, color: PURPLE },
  // Middle ring (3)
  { id:'cr',  label:'Client Intel',         ring:1, slot:0, slots:3, color: GOLD   },
  { id:'dh',  label:'Decision History',     ring:1, slot:1, slots:3, color: PURPLE },
  { id:'rs',  label:'Risk Signals',         ring:1, slot:2, slots:3, color: GOLD   },
  // Outer ring (3 slow)
  { id:'rc',  label:'Regulatory Context',   ring:0, slot:0, slots:3, color: PURPLE },
  { id:'ms',  label:'Market Signals',       ring:0, slot:1, slots:3, color: GOLD   },
  { id:'ha',  label:'Historical Arc',       ring:0, slot:2, slots:3, color: PURPLE },
];

function GravityGardenOrbital() {
  return (
    <div className="h2-canvas-wrap" style={{ overflow:'hidden' }}>
      <style>{`
        @keyframes h2orbitCW  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
        @keyframes h2orbitCCW { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes h2sunPulse {
          0%,100%{ box-shadow: 0 0 40px rgba(200,169,110,0.30), 0 0 12px rgba(255,255,255,0.08),
                               inset 0 -8px 16px rgba(200,169,110,0.18), inset 0 2px 4px rgba(255,255,255,0.22); transform:scale(0.97); }
          50%    { box-shadow: 0 0 72px rgba(200,169,110,0.52), 0 0 28px rgba(255,255,255,0.18),
                               inset 0 -8px 16px rgba(200,169,110,0.30), inset 0 2px 4px rgba(255,255,255,0.32); transform:scale(1.05); }
        }
      `}</style>

      {/* Deep-space radial background */}
      <div style={{
        position:'absolute', inset:0,
        background: 'radial-gradient(circle at center, rgba(139,92,246,0.05) 0%, rgba(8,8,9,0) 70%)',
      }} />

      {/* SVG orbit rings — 3 dashed concentric circles */}
      <svg
        viewBox="0 0 440 440"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
        aria-hidden
      >
        {ORBIT_RINGS.map((ring, i) => (
          <circle
            key={i}
            cx="220" cy="220"
            r={ring.radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            strokeDasharray="4 9"
          />
        ))}
      </svg>

      {/* Center sun — liquid glass gold sphere */}
      <div style={{
        position:'absolute',
        left:'50%', top:'50%',
        width:58, height:58,
        marginLeft:-29, marginTop:-29,
        borderRadius:'50%',
        background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.55) 0%, rgba(200,169,110,0.35) 38%, rgba(200,169,110,0.10) 68%, transparent 100%)',
        backdropFilter: 'blur(10px) saturate(1.5)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 0 40px rgba(200,169,110,0.30), 0 0 12px rgba(255,255,255,0.08), inset 0 -8px 16px rgba(200,169,110,0.18), inset 0 2px 4px rgba(255,255,255,0.22)',
        animation: 'h2sunPulse 5s ease-in-out infinite',
        zIndex: 10,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <span style={{
          fontFamily:'var(--font-ui)', fontSize:'8px', letterSpacing:'0.12em',
          textTransform:'uppercase', color:'rgba(255,255,255,0.9)',
          textShadow:'0 0 8px rgba(255,255,255,0.5)',
          textAlign:'center', lineHeight:1.2, padding:'0 4px',
        }}>
          Living<br/>Memory
        </span>
      </div>

      {/* Orbiting planet nodes */}
      {ORB_PLANETS.map((p, i) => {
        const ring       = ORBIT_RINGS[p.ring];
        const startDeg   = (p.slot / p.slots) * 360;
        const isGold     = p.color === GOLD;
        const planetSize = isGold ? 20 : 17;
        const halfSize   = planetSize / 2;
        const spinAnim   = i % 2 === 0 ? 'h2orbitCW' : 'h2orbitCCW';
        const counterAnim = i % 2 === 0 ? 'h2orbitCCW' : 'h2orbitCW';

        return (
          <div
            key={p.id}
            style={{ position:'absolute', left:'50%', top:'50%', width:0, height:0 }}
          >
            {/* Layer 1: initial angle offset */}
            <div style={{ transform:`rotate(${startDeg}deg)` }}>
              {/* Layer 2: main ring spin */}
              <div style={{ animation:`${spinAnim} ${ring.duration}s linear infinite` }}>
                {/* Layer 3: push to ring radius */}
                <div style={{ transform:`translateX(${ring.radius}px)` }}>
                  {/* Layer 4: counter-spin (keeps node upright) */}
                  <div style={{ animation:`${counterAnim} ${ring.duration}s linear infinite` }}>
                    {/* Layer 5: counter initial angle */}
                    <div style={{ transform:`rotate(-${startDeg}deg)` }}>

                      {/* The planet */}
                      <div style={{
                        position:'absolute',
                        width:planetSize, height:planetSize,
                        left:-halfSize, top:-halfSize,
                        borderRadius:'50%',
                        background: isGold
                          ? `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.40) 0%, rgba(200,169,110,0.75) 38%, rgba(200,169,110,0.22) 70%, transparent 100%)`
                          : `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.30) 0%, rgba(139,92,246,0.75) 38%, rgba(139,92,246,0.22) 70%, transparent 100%)`,
                        backdropFilter:'blur(6px) saturate(1.3)',
                        border: isGold ? '1px solid rgba(200,169,110,0.45)' : '1px solid rgba(139,92,246,0.45)',
                        boxShadow: isGold
                          ? '0 0 14px rgba(200,169,110,0.35), inset 0 2px 3px rgba(255,255,255,0.22)'
                          : '0 0 14px rgba(139,92,246,0.35), inset 0 2px 3px rgba(255,255,255,0.18)',
                        zIndex: 5,
                      }} />

                      {/* Label — appears below planet */}
                      <div style={{
                        position:'absolute',
                        left: '50%',
                        top: halfSize + 6,
                        transform: 'translateX(-50%)',
                        fontFamily:'var(--font-ui)',
                        fontSize:'8px',
                        letterSpacing:'0.08em',
                        textTransform:'uppercase',
                        color: isGold ? 'rgba(200,169,110,0.75)' : 'rgba(180,160,255,0.65)',
                        whiteSpace:'nowrap',
                        pointerEvents:'none',
                      }}>
                        {p.label}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Corner tag */}
      <span className="h2-canvas-tag">Living Memory · orbital</span>
    </div>
  );
}

// ── Cortex Panel ────────────────────────────────────────────────────────────────
// Same intelligence kernel. Different operating mind.
// Cycles through 4 domain configurations showing which living laws
// are active vs suppressed for each vertical.

const DOMAIN_CONFIGS = [
  {
    label: 'Legal Firm',
    subtitle: 'Privilege-aware · Citation-mandatory',
    laws: [
      { name: 'Attorney-Client Privilege Protocol', on: true  },
      { name: 'Citation & Source Mandate',          on: true  },
      { name: 'Conflict of Interest Awareness',     on: true  },
      { name: 'Regulatory Compliance Context',      on: true  },
      { name: 'Aggressive Advocacy Mode',           on: false },
    ],
  },
  {
    label: 'PE Fund',
    subtitle: 'Deal-flow-aware · LP-sensitive',
    laws: [
      { name: 'Portfolio Signal Priority',          on: true  },
      { name: 'LP Communication Protocol',          on: true  },
      { name: 'Deal Flow Context',                  on: true  },
      { name: 'Exit Timeline Awareness',            on: true  },
      { name: 'Attorney-Client Privilege Protocol', on: false },
    ],
  },
  {
    label: 'Healthcare System',
    subtitle: 'HIPAA-compliant · Clinical-aware',
    laws: [
      { name: 'PHI Boundary Enforcement',           on: true  },
      { name: 'Clinical Context Priority',          on: true  },
      { name: 'HIPAA Compliance Layer',             on: true  },
      { name: 'Patient Relationship Memory',        on: true  },
      { name: 'Deal Flow Context',                  on: false },
    ],
  },
  {
    label: 'Professional Services',
    subtitle: 'Client-relationship-aware',
    laws: [
      { name: 'Client Relationship Priority',       on: true  },
      { name: 'Engagement History Context',         on: true  },
      { name: 'Methodology Enforcement',            on: true  },
      { name: 'Billable Context Tracking',          on: true  },
      { name: 'PHI Boundary Enforcement',           on: false },
    ],
  },
];

function CortexPanel() {
  const [idx,    setIdx]    = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(c => (c + 1) % DOMAIN_CONFIGS.length);
        setFading(false);
      }, 360);
    }, 3_400);
    return () => clearInterval(id);
  }, []);

  const mode = DOMAIN_CONFIGS[idx];

  return (
    <div className="h2-card" style={{ minHeight: '360px' }}>
      <div className="h2-card-header">
        <span className="h2-card-tag">Intelligence Kernel</span>
        <span className="h2-card-counter">18 living laws</span>
      </div>
      <div style={{
        opacity: fading ? 0 : 1,
        transform: fading ? 'translateY(5px)' : 'translateY(0)',
        transition: 'opacity 0.34s var(--ease-out), transform 0.34s var(--ease-out)',
      }}>
        <div className="h2-cortex-mode-chip">
          <div className="h2-cortex-mode-dot" />
          {mode.label}
        </div>
        <p style={{ fontFamily:'var(--font-ui)', fontSize:'10px', color:'var(--color-text-muted)', letterSpacing:'0.06em', marginBottom:'20px' }}>
          {mode.subtitle}
        </p>
        <div className="h2-law-list">
          {mode.laws.map((law, i) => (
            <div key={i} className={`h2-law-row ${law.on ? 'h2-law-row-on' : 'h2-law-row-off'}`}>
              <div
                className="h2-law-dot"
                style={{
                  background: law.on ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)',
                  boxShadow:  law.on ? '0 0 6px var(--color-gold-dim)' : 'none',
                }}
              />
              <span className="h2-law-name">{law.name}</span>
              <span className="h2-law-status" style={{ color: law.on ? 'var(--color-gold-dim)' : 'rgba(255,255,255,0.15)' }}>
                {law.on ? 'ACTIVE' : 'OFF'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h2-dots" style={{ marginTop:'24px' }}>
        {DOMAIN_CONFIGS.map((_, i) => (
          <div key={i} className={`h2-dot ${i === idx ? 'h2-dot-active' : 'h2-dot-inactive'}`} />
        ))}
      </div>
    </div>
  );
}

// Sectors data

// ── Sovereign Lattice ────────────────────────────────────────────────────────────
// Perimeter of ~180 particles with spring physics.
// Mouse hover = inverse-square repulsion, particles scatter + spring back.
// Automated probe every ~8s: red dot launches from outside, hits lattice,
// nearby particles scatter gold, probe bounces back — rejected silently.
// Data nodes = drifting rectangles inside the perimeter.
// Canvas fills its own dark background — card shell uses design system tokens.

interface LatP { rx:number; ry:number; px:number; py:number; vx:number; vy:number; glow:number; }
interface LatN { x:number; y:number; vx:number; vy:number; w:number; h:number; label:string; }
interface LatProbe { on:boolean; sx:number; sy:number; tx:number; ty:number; t:number; hit:boolean; }

const SOV_NODES = ['Memory','Patterns','Decisions','Relationships','Context','History','Intelligence','Identity'];

function SovereignLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const STEP   = 11;    // lattice spacing px
    const PAD    = 22;    // lattice inset from canvas edge
    const KS     = 0.048; // spring constant
    const DAMP   = 0.79;  // velocity damping
    const R_RAD  = 78;    // mouse repulsion radius
    const R_STR  = 15000; // mouse repulsion strength
    const IN_PAD = 90;    // data node exclusion from edge

    let W = 0, H = 0;
    let particles: LatP[]  = [];
    let nodes: LatN[]      = [];
    let probe: LatProbe    = { on:false, sx:0, sy:0, tx:0, ty:0, t:0, hit:false };
    let mx = -999, my = -999, mActive = false;
    let tick = 0, frameId = 0;

    // Rounded rect path helper (avoids TS type issues with ctx.roundRect)
    const rr = (x:number, y:number, w:number, h:number, r:number) => {
      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
      ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
      ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
      ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
      ctx.closePath();
    };

    const buildLattice = () => {
      const pts: {x:number; y:number}[] = [];
      for (let x = PAD;         x <= W-PAD; x += STEP) pts.push({x, y:PAD});
      for (let y = PAD+STEP;    y <= H-PAD; y += STEP) pts.push({x:W-PAD, y});
      for (let x = W-PAD-STEP;  x >= PAD;   x -= STEP) pts.push({x, y:H-PAD});
      for (let y = H-PAD-STEP;  y  > PAD;   y -= STEP) pts.push({x:PAD, y});
      particles = pts.map(p => ({ rx:p.x, ry:p.y, px:p.x, py:p.y, vx:0, vy:0, glow:0 }));
    };

    const buildNodes = () => {
      const sw = W - IN_PAD*2, sh = H - IN_PAD*2;
      const cols = 3, rows = Math.ceil(SOV_NODES.length / cols);
      nodes = SOV_NODES.map((label, i) => {
        const nw = label.length * 7 + 18, nh = 24;
        const col = i % cols, row = Math.floor(i / cols);
        return {
          x:  IN_PAD + (col + 0.5) * (sw/cols) - nw/2 + (Math.random()-0.5)*24,
          y:  IN_PAD + (row + 0.5) * (sh/rows) - nh/2 + (Math.random()-0.5)*18,
          vx: (Math.random()-0.5)*0.22, vy: (Math.random()-0.5)*0.22,
          w: nw, h: nh, label,
        };
      });
    };

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      W = wrap.offsetWidth; H = wrap.offsetHeight;
      canvas.width  = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W+'px'; canvas.style.height = H+'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildLattice(); buildNodes();
    };

    const scatter = (tx:number, ty:number, str:number) => {
      particles.forEach(p => {
        const dx = p.px-tx, dy = p.py-ty, d = Math.hypot(dx, dy);
        if (d < 68 && d > 0) {
          const f = (68-d)/68 * str;
          p.vx += dx/d*f; p.vy += dy/d*f;
          p.glow = Math.max(p.glow, 1 - d/68);
        }
      });
    };

    const launchProbe = () => {
      const edge = Math.floor(Math.random()*4);
      let sx=0, sy=0, tx=0, ty=0;
      if (edge===0) { tx=W*.25+Math.random()*W*.5; ty=PAD;   sx=tx+(Math.random()-.5)*30; sy=-18; }
      if (edge===1) { ty=H*.25+Math.random()*H*.5; tx=W-PAD; sx=W+18; sy=ty+(Math.random()-.5)*30; }
      if (edge===2) { tx=W*.25+Math.random()*W*.5; ty=H-PAD; sx=tx+(Math.random()-.5)*30; sy=H+18; }
      if (edge===3) { ty=H*.25+Math.random()*H*.5; tx=PAD;   sx=-18;  sy=ty+(Math.random()-.5)*30; }
      probe = { on:true, sx, sy, tx, ty, t:0, hit:false };
    };

    const loop = () => {
      tick++;
      if (!probe.on && tick % 480 === 120) launchProbe();

      // Update probe
      if (probe.on) {
        probe.t += 0.022;
        if (probe.t >= 1 && !probe.hit) { probe.hit = true; scatter(probe.tx, probe.ty, 7.5); }
        if (probe.t >= 2) probe.on = false;
      }

      // Update particles
      particles.forEach(p => {
        p.vx += (p.rx-p.px)*KS; p.vy += (p.ry-p.py)*KS;
        if (mActive) {
          const dx=p.px-mx, dy=p.py-my, d=Math.hypot(dx, dy);
          if (d < R_RAD && d > 0) {
            const f = R_STR / (d*d*d);
            p.vx += dx*f; p.vy += dy*f;
            p.glow = Math.max(p.glow, (1 - d/R_RAD)*0.85);
          }
        }
        p.vx *= DAMP; p.vy *= DAMP;
        p.px += p.vx; p.py += p.vy;
        p.glow *= 0.93;
      });

      // Update nodes
      nodes.forEach((n, i) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < IN_PAD)           { n.x = IN_PAD;           n.vx *= -0.8; }
        if (n.y < IN_PAD)           { n.y = IN_PAD;           n.vy *= -0.8; }
        if (n.x+n.w > W-IN_PAD)     { n.x = W-IN_PAD-n.w;    n.vx *= -0.8; }
        if (n.y+n.h > H-IN_PAD)     { n.y = H-IN_PAD-n.h;    n.vy *= -0.8; }
        // Gentle random nudge
        if (tick % 200 === i*25 % 200) {
          n.vx += (Math.random()-.5)*0.08; n.vy += (Math.random()-.5)*0.08;
          const spd = Math.hypot(n.vx, n.vy);
          if (spd > 0.35) { n.vx *= 0.35/spd; n.vy *= 0.35/spd; }
        }
      });

      // ── Draw ──
      ctx.clearRect(0, 0, W, H);

      // Dark interior (canvas fills background, card shell keeps token styles)
      ctx.fillStyle = 'rgba(6,6,8,0.97)';
      ctx.fillRect(0, 0, W, H);

      // Subtle inner gold ambient
      const ag = ctx.createRadialGradient(W/2,H/2,0, W/2,H/2, Math.min(W,H)*0.42);
      ag.addColorStop(0, 'rgba(200,169,110,0.035)'); ag.addColorStop(1, 'transparent');
      ctx.fillStyle = ag; ctx.fillRect(0, 0, W, H);

      // Lattice connections
      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i], b = particles[(i+1) % particles.length];
        const d = Math.hypot(a.px-b.px, a.py-b.py);
        if (d > STEP*3.8) continue;
        const stress = Math.max(a.glow, b.glow);
        const alpha  = (1 - d/(STEP*3.8)) * (0.13 + stress*0.32);
        ctx.strokeStyle = stress > 0.08
          ? `rgba(200,169,110,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.beginPath(); ctx.moveTo(a.px, a.py); ctx.lineTo(b.px, b.py); ctx.stroke();
      }

      // Lattice particles
      particles.forEach(p => {
        const sz = 1.4 + p.glow*1.6;
        if (p.glow > 0.06) {
          const g = ctx.createRadialGradient(p.px,p.py,0, p.px,p.py, sz*5);
          g.addColorStop(0, `rgba(200,169,110,${p.glow*0.42})`); g.addColorStop(1,'transparent');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.px, p.py, sz*5, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = `rgba(200,169,110,${0.65+p.glow*0.35})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.26+p.glow*0.18})`;
        }
        ctx.beginPath(); ctx.arc(p.px, p.py, sz, 0, Math.PI*2); ctx.fill();
      });

      // Probe (approach phase only — bounce-back is invisible)
      if (probe.on && !probe.hit) {
        const t  = Math.min(probe.t, 1);
        const px = probe.sx + (probe.tx-probe.sx)*t;
        const py = probe.sy + (probe.ty-probe.sy)*t;
        ctx.strokeStyle = 'rgba(220,55,55,0.15)';
        ctx.lineWidth   = 1;
        ctx.beginPath(); ctx.moveTo(probe.sx, probe.sy); ctx.lineTo(px, py); ctx.stroke();
        ctx.fillStyle = 'rgba(240,70,55,0.88)';
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2); ctx.fill();
      }

      // Data nodes (rectangles)
      ctx.font = '7.5px ui-monospace, "SF Mono", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      nodes.forEach(n => {
        rr(n.x, n.y, n.w, n.h, 3);
        ctx.fillStyle   = 'rgba(200,169,110,0.045)'; ctx.fill();
        ctx.strokeStyle = 'rgba(200,169,110,0.20)';  ctx.lineWidth = 0.75; ctx.stroke();
        ctx.fillStyle   = 'rgba(200,169,110,0.60)';
        ctx.fillText(n.label.toUpperCase(), n.x+n.w/2, n.y+n.h/2);
      });

      frameId = requestAnimationFrame(loop);
    };

    setup();
    frameId = requestAnimationFrame(loop);

    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX-r.left; my = e.clientY-r.top; mActive = true;
    };
    const onLeave = () => { mActive = false; };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    const ro = new ResizeObserver(setup); ro.observe(wrap);

    return () => {
      cancelAnimationFrame(frameId);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="h2-sovereign-wrap">
      <canvas ref={canvasRef} className="h2-sovereign-canvas" />
      <div className="h2-sovereign-badge">Sovereign Architecture</div>
      <div className="h2-sovereign-hint">hover to probe the perimeter</div>
      <div className="h2-sovereign-footer">
        <span>Your data · Your rules · Your infrastructure</span>
        <span>Model-Agnostic</span>
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
              <GravityGardenOrbital />
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 4: CORTEX ═══════════════════ */}
        <section className="h2-section h2-section-alt" data-section="cortex">
          <div className="h2-grid h2-grid-reverse" data-reveal>

            {/* Panel left (reversed) */}
            <div data-reveal data-delay="2">
              <CortexPanel />
            </div>

            {/* Editorial right */}
            <div>
              <span className="h2-label">The Cortex</span>
              <h2 className="h2-heading">
                Same engine.<br />Different mind.
              </h2>
              <p className="h2-lead">
                Configure the intelligence kernel for your organization —
                not just your data.
              </p>
              <p className="h2-body">
                Every deployment is governed by 18 living laws that define how
                the system thinks, communicates, challenges, and stays in bounds.
                Configure it for a legal firm and it operates one way. Configure
                it for a PE fund and it operates another. The same sovereign
                intelligence kernel. Entirely different operating mind.
              </p>
              <div className="h2-compare">
                <div>18 governing principles — programmable, not fine-tuned</div>
                <div>Domain-aware from day one, not retrofitted</div>
                <div>The mind changes. The memory persists.</div>
              </div>
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 5: SOVEREIGNTY ════════════════ */}
        <section className="h2-section" data-section="sovereign">
          <div className="h2-grid" data-reveal>

            {/* Editorial left */}
            <div>
              <span className="h2-label">Data Sovereignty</span>
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
                funds their next training run. LongStrider is different
                in design: deploy on your own infrastructure, connect any
                LLM — hosted or local — and keep every byte of organizational
                intelligence exactly where you tell it to stay.
              </p>
              <div className="h2-compare">
                <div>Deploy on your own infrastructure — cloud or on-prem</div>
                <div>Bring any LLM — OpenAI, Ollama, Claude, Llama</div>
                <div>Your data never trains an external model</div>
              </div>
            </div>

            {/* Lattice right */}
            <div data-reveal data-delay="2">
              <SovereignLattice />
            </div>

          </div>
        </section>

        <div data-reveal className="h2-divider" />

        {/* ══ Chapter 6: SECTORS ════════════════════ */}

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
