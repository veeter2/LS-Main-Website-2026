'use client';

import '../tech.css';
import './memory.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { StoryTimeline } from '@/components/story-timeline';

const GOLD_G = 'rgba(200,169,110,0.40)';
const PURP_G = 'rgba(139,92,246,0.45)';

// Inline hex values referenced directly in TIMELINE
const GOLD = '#c8a96e';
const PURPLE = '#8b5cf6';

const TIMELINE = [
  { id: 'signal',      label: 'Signal Ingestion',    color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'recall',      label: 'Four-Axis Recall',    color: PURPLE, glow: PURP_G, gated: false },
  { id: 'clusters',    label: 'Knowledge Clusters',  color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'gravity',     label: 'Gravity Weighting',   color: PURPLE, glow: PURP_G, gated: false },
  { id: 'graph',       label: 'Relationship Graph',  color: GOLD,   glow: GOLD_G, gated: false },
  { id: 'correction',  label: 'Correction Propagation', color: PURPLE, glow: PURP_G, gated: false },
];

const SIGNAL_STAGES = [
  { icon: '⤵', name: 'Raw Signal',       desc: 'Chat · Document · Agent · Correction · Import', variant: 'neutral' },
  { icon: '◎', name: 'Entity Resolution', desc: 'Named entities extracted. Aliases mapped. Co-occurrence inferred.', variant: 'gold' },
  { icon: '⊛', name: 'Vector Embedding', desc: 'Semantic embedding generated. Topic similarity axis anchored.', variant: 'purple' },
  { icon: '◈', name: 'Gravity Scored',   desc: 'Initial weight calculated. Emotional density, frequency, recency.', variant: 'gold' },
  { icon: '▣', name: 'Substrate Write',  desc: 'Written to PostgreSQL. Cluster membership assigned or created.', variant: 'purple' },
];

const RECALL_AXES = [
  { n: '01', axis: 'Entity',    badge: 'Who',  color: 'gold',   desc: 'Recall surfaces everything connected to a specific entity — people, organizations, projects, concepts. Alias resolution ensures the graph is complete, not fragmented by name variation.' },
  { n: '02', axis: 'Temporal',  badge: 'When', color: 'purple', desc: 'Time-scoped retrieval. Recent context weighted differently from longitudinal. The system knows the difference between a decision made last week and a pattern established over six months.' },
  { n: '03', axis: 'Well',      badge: 'Depth', color: 'gold',  desc: 'The Gravity Well score — a composite of frequency, recency, emotional density, and outcome correlation. Deep wells surface first. Shallow wells only when directly relevant.' },
  { n: '04', axis: 'Topic',     badge: 'What', color: 'purple', desc: 'Semantic topic clustering. Vector similarity anchors retrieval to a concept space, then structural and relational signals amplify the most operationally significant results within that space.' },
];

const CLUSTER_METRICS = [
  { key: 'Cohesion',   val: '0.84',  color: 'gold',   desc: 'Average membership strength across all nodes in the cluster. High cohesion = tight, operationally specific topic.' },
  { key: 'Leakage',    val: '4.2%',  color: 'purple', desc: 'Percentage of cluster members below the gravity threshold. Managed nightly — leaking members pruned or reassigned.' },
  { key: 'Drift',      val: '0.11',  color: 'gold',   desc: 'Rate at which the cluster centroid is shifting topic-wise. High drift triggers canonical summary regeneration.' },
  { key: 'Salience',   val: '0.91',  color: 'purple', desc: 'Composite score used by five-axis retrieval. Determines whether the cluster amplifies or attenuates individual memory scores.' },
];

const GRAVITY_EXAMPLES = [
  { label: 'Q3 budget decision, revisited 12x',     score: '0.94', bar: '94%',  purple: false },
  { label: 'Key vendor risk — flagged, corrected',  score: '0.87', bar: '87%',  purple: true  },
  { label: 'Communication preference pattern',       score: '0.81', bar: '81%',  purple: false },
  { label: 'New topic — 2 mentions, no outcome',    score: '0.31', bar: '31%',  purple: true  },
  { label: 'Offhand comment, never revisited',      score: '0.12', bar: '12%',  purple: false },
];

const CORRECTION_STEPS = [
  { icon: '✕', name: 'Flag Received',       sub: 'User marks incorrect' },
  { icon: '↓', name: 'Gravity Reduced',     sub: 'Memory downweighted immediately' },
  { icon: '⚑', name: 'Context Flag Set',    sub: 'Override marker written' },
  { icon: '↺', name: 'Cluster Recalculated',sub: 'Affected clusters re-examined' },
  { icon: '✓', name: 'Propagation Complete', sub: 'Next retrieval reflects correction' },
];

// ── Canvas Gravity Well ───────────────────────────────────────
function GravityWell() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const clusters = [
      { x: W*0.50, y: H*0.44, r: 16, isGold: true,  label: 'Primary',  g: 0.94 },
      { x: W*0.24, y: H*0.28, r: 11, isGold: false, label: 'Entity',   g: 0.76 },
      { x: W*0.74, y: H*0.61, r: 12, isGold: true,  label: 'Topic',    g: 0.71 },
      { x: W*0.34, y: H*0.70, r: 9,  isGold: false, label: 'Arc',      g: 0.58 },
      { x: W*0.70, y: H*0.22, r: 8,  isGold: true,  label: 'Decision', g: 0.63 },
    ];

    // Re-compute cluster positions on resize
    const updateClusters = () => {
      clusters[0].x = W*0.50; clusters[0].y = H*0.44;
      clusters[1].x = W*0.24; clusters[1].y = H*0.28;
      clusters[2].x = W*0.74; clusters[2].y = H*0.61;
      clusters[3].x = W*0.34; clusters[3].y = H*0.70;
      clusters[4].x = W*0.70; clusters[4].y = H*0.22;
    };

    type MemNode = { x:number; y:number; vx:number; vy:number; g:number; ci:number; r:number; op:number };
    const memories: MemNode[] = Array.from({ length: 48 }, (_, i) => {
      const ci = i % clusters.length;
      const cl = clusters[ci];
      const a  = Math.random() * Math.PI * 2;
      const d  = 30 + Math.random() * 90;
      return {
        x: cl.x + Math.cos(a) * d,
        y: cl.y + Math.sin(a) * d,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        g:  0.25 + Math.random() * 0.75,
        ci, r: 1.5 + Math.random() * 2.5, op: 0.4 + Math.random() * 0.5,
      };
    });

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Edges among cluster siblings
      for (let i = 0; i < memories.length; i++) {
        for (let j = i + 1; j < memories.length; j++) {
          if (memories[i].ci !== memories[j].ci) continue;
          const dx = memories[i].x - memories[j].x;
          const dy = memories[i].y - memories[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d > 72) continue;
          const a = (1 - d/72) * 0.10;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(200,169,110,${a})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(memories[i].x, memories[i].y);
          ctx.lineTo(memories[j].x, memories[j].y);
          ctx.stroke();
        }
      }

      // Memory → cluster spokes
      memories.forEach(m => {
        const cl = clusters[m.ci];
        const dx = m.x - cl.x; const dy = m.y - cl.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d > 110) return;
        const a = (1 - d/110) * 0.07 * m.g;
        ctx.beginPath();
        ctx.strokeStyle = cl.isGold ? `rgba(200,169,110,${a})` : `rgba(139,92,246,${a})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(m.x, m.y); ctx.lineTo(cl.x, cl.y); ctx.stroke();
      });

      // Physics
      memories.forEach(m => {
        const cl = clusters[m.ci];
        const dx = cl.x - m.x; const dy = cl.y - m.y;
        const d  = Math.max(1, Math.sqrt(dx*dx + dy*dy));
        const f  = 0.0004 * m.g;
        m.vx += (dx/d) * f * d;
        m.vy += (dy/d) * f * d;
        m.vx *= 0.96; m.vy *= 0.96;
        m.x  += m.vx;  m.y  += m.vy;
        const mg = 50;
        if (m.x < mg) m.vx += 0.06; if (m.x > W-mg) m.vx -= 0.06;
        if (m.y < mg) m.vy += 0.06; if (m.y > H-mg) m.vy -= 0.06;
      });

      // Memory nodes
      memories.forEach(m => {
        const cl = clusters[m.ci];
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI*2);
        ctx.fillStyle = cl.isGold
          ? `rgba(200,169,110,${m.op * 0.75})`
          : `rgba(139,92,246,${m.op * 0.75})`;
        ctx.fill();
      });

      // Cluster nodes
      const now = Date.now();
      clusters.forEach(cl => {
        const pulse = 0.5 + 0.5 * Math.sin(now * 0.0008 + cl.g * 8);
        const glowR = cl.r * 4 + pulse * 8;
        const grad  = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, glowR);
        grad.addColorStop(0, cl.isGold ? 'rgba(200,169,110,0.30)' : 'rgba(139,92,246,0.28)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(cl.x, cl.y, glowR, 0, Math.PI*2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(cl.x, cl.y, cl.r, 0, Math.PI*2);
        ctx.fillStyle = cl.isGold ? 'rgba(200,169,110,0.88)' : 'rgba(139,92,246,0.88)'; ctx.fill();
        ctx.beginPath(); ctx.arc(cl.x, cl.y, cl.r*0.45, 0, Math.PI*2);
        ctx.fillStyle = cl.isGold ? 'rgba(255,245,220,0.55)' : 'rgba(210,190,255,0.45)'; ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => { resize(); updateClusters(); };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize); };
  }, []);

  return <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />;
}

// ── Main page ─────────────────────────────────────────────────
export default function MemoryPage() {
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
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('deck-visible'); }),
      { threshold: 0.07, rootMargin: '0px 0px -5% 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="mem-root">
      <div className="tech-progress-bar" style={{ width:`${scrollPct*100}%` }} />
      <StoryTimeline nodes={TIMELINE} />

      {/* ══ HERO — Gravity Well canvas ══════════════════════════ */}
      <section className="mem-hero">
        <div className="mem-canvas-wrap"><GravityWell /></div>
        <div className="mem-hero-content tech-container">
          <Link href="/technology" className="mem-back-link" data-reveal>← Technology Overview</Link>
          <span className="mem-eyebrow" data-reveal>Living Memory — The Substrate</span>
          <h1 className="mem-h1" data-reveal data-delay="1">
            Not a database.<br />A gravitational<br />system.
          </h1>
          <p className="mem-lead" data-reveal data-delay="2">
            Every memory has a gravity score. High-gravity memories orbit close to their cluster.
            Low-gravity memories drift to the periphery. The nightly engine recalculates everything.
          </p>
          <p className="mem-sub" data-reveal data-delay="3">
            What you see in the background is a live simulation of the substrate topology —
            clusters, memories, and the relationships binding them.
          </p>
          <div className="mem-legend" data-reveal data-delay="3">
            <div className="mem-legend-item"><div className="mem-legend-dot mem-legend-dot-gold" />Knowledge Cluster</div>
            <div className="mem-legend-item"><div className="mem-legend-dot mem-legend-dot-purple" />Entity Cluster</div>
            <div className="mem-legend-item"><div className="mem-legend-dot mem-legend-dot-dim" />Memory record</div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ SIGNAL INGESTION ════════════════════════════════════ */}
      <section className="mem-section tech-container" data-section="signal">
        <div className="mem-section-header">
          <span className="mem-eyebrow-sm" data-reveal>01 — Signal Ingestion</span>
          <h2 className="mem-h2" data-reveal data-delay="1">
            What enters the substrate.<br />How it gets there.
          </h2>
          <p className="mem-body" data-reveal data-delay="2">
            Every signal — real-time chat, imported history, agent findings, corrections — passes through
            the same five-stage ingestion pipeline before being written to the substrate.
            No exceptions. No shortcuts.
          </p>
        </div>
        <div className="mem-signal-flow" data-reveal data-delay="2">
          {SIGNAL_STAGES.map((stage, i) => (
            <div key={stage.name} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="mem-signal-stage">
                <div className={`mem-signal-icon${stage.variant === 'purple' ? ' mem-signal-icon-purple' : stage.variant === 'neutral' ? ' mem-signal-icon-neutral' : ''}`}>
                  {stage.icon}
                </div>
                <div className="mem-signal-name">{stage.name}</div>
                <div className="mem-signal-desc">{stage.desc}</div>
              </div>
              {i < SIGNAL_STAGES.length - 1 && <div className="mem-signal-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ FOUR-AXIS RECALL ════════════════════════════════════ */}
      <section className="mem-section tech-container" data-section="recall">
        <div className="mem-section-header">
          <span className="mem-eyebrow-sm" data-reveal>02 — Four-Axis Recall</span>
          <h2 className="mem-h2" data-reveal data-delay="1">
            Entity. Temporal. Well. Topic.<br />All four. Simultaneously.
          </h2>
          <p className="mem-body" data-reveal data-delay="2">
            Retrieval runs across four independent dimensions — none of which is a standard vector search.
            The five-axis scoring engine in the kernel uses these four dimensions as inputs.
            This is where &ldquo;compounding&rdquo; becomes structural, not metaphorical.
          </p>
        </div>
        <div className="mem-four-axis" data-reveal data-delay="2">
          {RECALL_AXES.map(a => (
            <div key={a.axis} className={`mem-axis-card${a.color === 'purple' ? ' mem-axis-card-purple' : ''}`} data-axis={a.axis}>
              <p className="mem-axis-n">{a.n}</p>
              <p className="mem-axis-name">{a.axis} Axis</p>
              <span className="mem-axis-badge">{a.badge}</span>
              <p className="mem-axis-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ KNOWLEDGE CLUSTERS ═════════════════════════════════ */}
      <section className="mem-section tech-container" data-section="clusters">
        <div className="mem-section-header">
          <span className="mem-eyebrow-sm" data-reveal>03 — Knowledge Clusters</span>
          <h2 className="mem-h2" data-reveal data-delay="1">
            Memories organize.<br />Clusters compound.
          </h2>
          <p className="mem-body" data-reveal data-delay="2">
            Individual memories are assigned to Knowledge Clusters — topic groupings with measured
            cohesion, leakage, drift, and salience. A cluster isn&apos;t a folder. It&apos;s a living
            structure with health metrics, recalculated every night by the engine.
          </p>
        </div>
        <div className="mem-cluster-grid" data-reveal data-delay="2">
          <div className="mem-cluster-visual">
            <div className="mem-cluster-node mem-cluster-core">Cluster</div>
            <div className="mem-cluster-node mem-cluster-orbit mem-o1">Memory</div>
            <div className="mem-cluster-node mem-cluster-orbit mem-o2">Entity</div>
            <div className="mem-cluster-node mem-cluster-orbit mem-cluster-orbit-purple mem-o3">Arc</div>
            <div className="mem-cluster-node mem-cluster-orbit mem-o4">Decision</div>
            <div className="mem-cluster-node mem-cluster-orbit mem-cluster-orbit-purple mem-o5">Pattern</div>
            <div className="mem-cluster-node mem-cluster-orbit mem-o6">Topic</div>
          </div>
          <div className="mem-cluster-stats">
            {CLUSTER_METRICS.map(m => (
              <div key={m.key} className="mem-stat-row">
                <p className="mem-stat-key">{m.key}</p>
                <p className={`mem-stat-val${m.color === 'purple' ? ' mem-stat-val-purple' : ''}`}>{m.val}</p>
                <p className="mem-stat-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ GRAVITY WEIGHTING ═══════════════════════════════════ */}
      <section className="mem-section tech-container" data-section="gravity">
        <div className="tech-grid">
          <div>
            <p className="mem-eyebrow-sm" data-reveal>04 — Gravity Weighting</p>
            <h2 className="mem-h2" data-reveal data-delay="1">
              Not all memory is equal.<br />Gravity decides what surfaces.
            </h2>
            <p className="mem-body" data-reveal data-delay="2">
              Every memory has a gravity score — a composite of frequency, recency,
              emotional density, and outcome correlation. High-gravity memories surface
              first in retrieval. Low-gravity memories require direct relevance before they appear.
            </p>
            <p className="mem-body" style={{ marginTop: '16px' }} data-reveal data-delay="3">
              The nightly engine recalculates{' '}
              <code style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--color-gold-dim)', background: 'var(--color-gold-ghost)', padding: '1px 6px', borderRadius: '3px' }}>
                total_gravity
              </code>
              {' '}and{' '}
              <code style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--color-gold-dim)', background: 'var(--color-gold-ghost)', padding: '1px 6px', borderRadius: '3px' }}>
                active_gravity
              </code>
              {' '}for every memory in every cluster that drifted more than 0.5 since the last cycle.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Gravity score examples — same substrate
            </p>
            <div className="mem-gravity-rows">
              {GRAVITY_EXAMPLES.map(ex => (
                <div key={ex.label} className="mem-gravity-row">
                  <span className="mem-gravity-label">{ex.label}</span>
                  <div className="mem-gravity-bar-wrap">
                    <div className={`mem-gravity-bar${ex.purple ? ' mem-gravity-bar-purple' : ''}`} style={{ width: ex.bar }} />
                  </div>
                  <span className="mem-gravity-score" style={{ color: ex.purple ? 'rgba(139,92,246,0.7)' : 'var(--color-gold-dim)' }}>{ex.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="tech-divider" />

      {/* ══ CORRECTION PROPAGATION ══════════════════════════════ */}
      <section className="mem-section tech-container" data-section="correction">
        <div className="mem-section-header">
          <span className="mem-eyebrow-sm" data-reveal>05 — Correction Propagation</span>
          <h2 className="mem-h2" data-reveal data-delay="1">
            One flag.<br />Immediate propagation.
          </h2>
          <p className="mem-body" data-reveal data-delay="2">
            When a user marks something incorrect, the correction doesn&apos;t just suppress a single
            memory — it propagates through the graph. Gravity is adjusted. Context flags are set.
            Affected clusters are queued for recalculation. Five steps. Real-time.
          </p>
        </div>
        <div className="mem-correction-chain" data-reveal data-delay="2">
          {CORRECTION_STEPS.map((step, i) => (
            <div key={step.name} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="mem-correction-step">
                <div className="mem-correction-icon">{step.icon}</div>
                <div className="mem-correction-step-name">{step.name}</div>
                <div className="mem-correction-step-sub">{step.sub}</div>
              </div>
              {i < CORRECTION_STEPS.length - 1 && <div className="mem-correction-pipe">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════ */}
      <section className="mem-cta-section tech-container">
        <span className="mem-cta-label" data-reveal>Next</span>
        <h2 className="mem-cta-h2" data-reveal data-delay="1">
          See the operating layer that runs on top of this.
        </h2>
        <div className="mem-cta-links" data-reveal data-delay="2">
          <Link href="/technology/kernel" className="mem-cta-primary">Intelligence Kernel →</Link>
          <Link href="/pilot" className="mem-cta-secondary">Start a Pilot</Link>
        </div>
      </section>
    </main>
  );
}
