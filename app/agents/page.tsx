'use client';

import './agents.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef, useState } from 'react';
import { StoryTimeline } from '@/components/story-timeline';

// ── Colors (canvas / JS only — CSS vars not accessible in canvas 2D) ──
const GOLD   = '#c8a96e';
const PURPLE = '#8b5cf6';
const GOLD_G = 'rgba(200,169,110,0.40)';
const PURP_G = 'rgba(139,92,246,0.45)';

// ── Chapter timeline ──────────────────────────────────────────
const TIMELINE = [
  { id: 'chaos',       label: 'The Chaos',       color: PURPLE, glow: PURP_G },
  { id: 'pipeline',    label: 'The Problem',      color: GOLD,   glow: GOLD_G },
  { id: 'flywheel',    label: 'The Flywheel',     color: PURPLE, glow: PURP_G },
  { id: 'graph',       label: 'The Graph',        color: GOLD,   glow: GOLD_G },
  { id: 'fleet',       label: 'The Fleet',        color: PURPLE, glow: PURP_G },
  { id: 'sovereignty', label: 'Sovereignty',      color: GOLD,   glow: GOLD_G },
];

// ── Agent constellation ───────────────────────────────────────
const AGENTS = [
  { n: '01', name: 'R&D Oracle',               badge: 'Research',      desc: 'Monitors GitHub, arXiv, and industry signals. Every finding filed as a memory. Cross-referenced against your existing knowledge graph. Gaps become orbital tasks.' },
  { n: '02', name: 'Marketing Intelligence',   badge: 'Intelligence',  desc: 'Monitors competitor releases and content performance. After 60 days, briefs draw from 60 days of accumulated signal — not a one-time pull. The longer it runs, the sharper it gets.' },
  { n: '03', name: 'Knowledge Graph Builder',  badge: 'Structure',     desc: 'Connects CRM, Slack, docs, APIs. Turns your existing stack into substrate entries. Every integration feeds the same graph that your humans write to.' },
  { n: '04', name: 'Autonomous Insight',       badge: 'Cognition',     desc: 'Runs inside the Dream cycle. Reviews behavioral telemetry across 30 days. Surfaces patterns no individual session would reveal. Feeds findings back into the graph.' },
  { n: '05', name: 'Source Monitor',           badge: 'Signal',        desc: 'Ingests RSS, news APIs, data streams through the full CFE pipeline. Headlines become entity-resolved intelligence, cross-referenced against your relationship graph.' },
  { n: '06', name: 'Relationship Intelligence',badge: 'Relational',    desc: 'Monitors all sources for entity co-occurrences and relationship signals. Updates the consciousness chord graph with trust, tension, and depth scores in real time.' },
  { n: '07', name: 'Pattern Consolidation',    badge: 'Memory',        desc: 'Strengthens validated patterns. Downweights contradicted ones. Epistemic memory — not storage. The graph knows the difference between a signal and noise.' },
  { n: '08', name: 'Fleet Coordinator',        badge: 'Control',       desc: 'Monitors orbital task queue health. Detects agents producing low-gravity signal. Routes tasks. Checks every 15 minutes. Command-and-control that keeps the fleet coherent.' },
  { n: '09', name: 'Document Intelligence',    badge: 'Sovereign',     desc: 'Processes SOPs, contracts, transcripts, legal documents. Every document stays on your infrastructure. Employee departure cannot remove this intelligence.' },
  { n: '10', name: 'Competitive Intelligence', badge: 'Strategy',      desc: 'Monitors competitor moves, pricing, hiring, reviews. After 90 days, competitive questions draw from 90 days of accumulated telemetry — not marketing copy.' },
  { n: '11', name: 'Belief Evolution',         badge: 'Longitudinal',  desc: 'Tracks how your organization\'s understanding of key topics shifts over time. Writes longitudinal belief trajectory records. Contradiction detection. Active intention monitoring.' },
  { n: '12', name: 'Integration Mesh',         badge: 'Integration',   desc: 'Slack → gravity_map. Notion → knowledge_graph. Salesforce → consciousness_cords. Everything into the substrate through the same CFE pipeline.' },
  { n: '13', name: 'Dream Compiler',           badge: 'Evolution',     desc: 'Runs at 4am. Reads all agent-sourced memories from the last 24 hours alongside human intelligence. Synthesizes what the fleet learned. Writes the RuntimePolicy that shapes how tomorrow starts.' },
];

// ── What the graph knows over time ───────────────────────────
const GRAPH_DEPTH = [
  {
    time: '90 days',
    human: 'Decision patterns. Customer relationship signals. Your dominant concerns.',
    agent: 'Competitive landscape snapshot. Research gaps identified. Industry signals indexed.',
    synthesis: 'The graph cross-references both. Competitive questions get answered in the context of your actual behavioral patterns — not generically.',
  },
  {
    time: '1 year',
    human: 'Full behavioral model. Organizational belief trajectory. Team knowledge mapped.',
    agent: 'Sustained competitive monitoring. 365 research episodes synthesized. Capability deltas tracked over time.',
    synthesis: 'The system knows what you knew a year ago and how your understanding has evolved. Agents surface information that specifically closes the gaps your human intelligence has.',
  },
  {
    time: '3 years',
    human: 'Institutional memory that outsurvives any employee departure.',
    agent: 'A living competitive intelligence substrate — cross-referenced, gravity-weighted, permanently owned.',
    synthesis: 'Human and agent intelligence are indistinguishable in the graph. Both compound. Every night. Automatically. This is not a log. This is an organization that learns.',
  },
];

// ── Flywheel visualization ────────────────────────────────────
function FlywheelViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const timeRef   = useRef<number>(0);
  const [activeNode, setActiveNode] = useState<number>(-1);

  const NODES = [
    { label: 'Human\nIntelligence',  sublabel: 'Conversations · Decisions',        angle: -90,  color: GOLD,   glow: 'rgba(200,169,110,0.35)' },
    { label: 'Agent\nIntelligence',  sublabel: 'R&D · Research · Monitoring',      angle: 30,   color: PURPLE, glow: 'rgba(139,92,246,0.35)'  },
    { label: 'Dream\nCompiler',      sublabel: 'Nightly synthesis · 4:00 AM',      angle: 150,  color: GOLD,   glow: 'rgba(200,169,110,0.35)' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.parentElement?.clientWidth || 600;
      const h = Math.min(w * 0.75, 480);
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (ts: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const orbitR = Math.min(w, h) * 0.32;
      const nodeR  = 46;
      const coreR  = nodeR * 0.9;

      timeRef.current = ts * 0.0004;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Orbit ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Animated flow particles on orbit ──
      for (let i = 0; i < 3; i++) {
        const pAngle = (t * 0.8 + i * (Math.PI * 2 / 3)) % (Math.PI * 2);
        const px = cx + Math.cos(pAngle) * orbitR;
        const py = cy + Math.sin(pAngle) * orbitR;
        const nodeColor = i === 0 ? GOLD : i === 1 ? PURPLE : GOLD;
        const glowA = (Math.sin(t * 3 + i * 2) + 1) * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = 0.5 + glowA * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── Spoke lines from nodes to core ──
      NODES.forEach((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * orbitR;
        const ny = cy + Math.sin(rad) * orbitR;
        const pulse = (Math.sin(t * 2 + rad) + 1) * 0.5;

        const grad = ctx.createLinearGradient(nx, ny, cx, cy);
        grad.addColorStop(0, node.color.replace(')', `, ${0.1 + pulse * 0.25})`).replace('rgb', 'rgba').replace('#c8a96e', 'rgba(200,169,110,').replace('#8b5cf6', 'rgba(139,92,246,') + ')');
        grad.addColorStop(1, 'rgba(255,255,255,0.02)');

        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(cx, cy);

        const isGold = node.color === GOLD;
        ctx.strokeStyle = isGold
          ? `rgba(200,169,110,${0.12 + pulse * 0.18})`
          : `rgba(139,92,246,${0.12 + pulse * 0.18})`;
        ctx.lineWidth = 1 + pulse;
        ctx.stroke();
      });

      // ── Core — Intelligence Substrate ──
      const corePulse = (Math.sin(t * 1.5) + 1) * 0.5;

      // Outer glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.2);
      coreGlow.addColorStop(0, `rgba(200,169,110,${0.06 + corePulse * 0.08})`);
      coreGlow.addColorStop(1, 'rgba(200,169,110,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      // Core body
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20,16,30,0.92)';
      ctx.fill();
      ctx.strokeStyle = `rgba(200,169,110,${0.25 + corePulse * 0.25})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core label
      ctx.font = '500 11px Lora, Georgia, serif';
      ctx.fillStyle = GOLD;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Intelligence', cx, cy - 8);
      ctx.fillText('Substrate', cx, cy + 8);

      // ── Outer nodes ──
      NODES.forEach((node, idx) => {
        const rad = (node.angle * Math.PI) / 180;
        const nx  = cx + Math.cos(rad) * orbitR;
        const ny  = cy + Math.sin(rad) * orbitR;
        const isActive = activeNode === idx;
        const nodePulse = (Math.sin(t * 1.8 + rad * 2) + 1) * 0.5;
        const isGold = node.color === GOLD;

        // Glow ring
        const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, nodeR * 1.8);
        ng.addColorStop(0, isGold
          ? `rgba(200,169,110,${0.08 + nodePulse * 0.1 + (isActive ? 0.1 : 0)})`
          : `rgba(139,92,246,${0.08 + nodePulse * 0.1 + (isActive ? 0.1 : 0)})`);
        ng.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(nx, ny, nodeR * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();

        // Node body
        ctx.beginPath();
        ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(18,14,28,0.88)';
        ctx.fill();
        ctx.strokeStyle = isGold
          ? `rgba(200,169,110,${0.3 + nodePulse * 0.3})`
          : `rgba(139,92,246,${0.3 + nodePulse * 0.3})`;
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();

        // Node label
        const lines = node.label.split('\n');
        ctx.font = '500 10px Lora, Georgia, serif';
        ctx.fillStyle = node.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (lines.length === 2) {
          ctx.fillText(lines[0], nx, ny - 7);
          ctx.fillText(lines[1], nx, ny + 7);
        } else {
          ctx.fillText(lines[0], nx, ny);
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [activeNode]);

  return (
    <div className="ag-flywheel-wrap">
      <canvas ref={canvasRef} className="ag-flywheel-canvas" />
      <div className="ag-flywheel-legend">
        <div className="ag-flywheel-legend-item ag-flywheel-legend-item--gold">
          <div className="ag-flywheel-legend-dot" />
          <span>Human intelligence — every conversation, decision, and pattern</span>
        </div>
        <div className="ag-flywheel-legend-item ag-flywheel-legend-item--purple">
          <div className="ag-flywheel-legend-dot" />
          <span>Agent intelligence — every research episode, signal, and find</span>
        </div>
        <div className="ag-flywheel-legend-item ag-flywheel-legend-item--core">
          <div className="ag-flywheel-legend-dot" />
          <span>Intelligence Substrate — both write here. Both compound. Every night.</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function AgentsPage() {
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
    <div className="ag-page">
      <div className="ag-orb-1" aria-hidden />
      <div className="ag-orb-2" aria-hidden />
      <div className="ag-orb-3" aria-hidden />

      <StoryTimeline nodes={TIMELINE} showAfter={50} />

      <div className="ag-container">

        {/* ═══ HERO ═══════════════════════════════════════════════ */}
        <div className="ag-hero" data-section="chaos">
          <span className="ag-eyebrow" data-reveal>Agent Intelligence</span>
          <h1 className="ag-hero-h1" data-reveal data-delay="1">
            Agents are here.<br />
            So is the chaos.
          </h1>
          <p className="ag-hero-sub" data-reveal data-delay="2">
            Autonomous agents can browse, research, execute, and act. What they cannot do
            is remember — not across sessions, not across agents, not at the organizational level.
            Every run starts from zero. Every find evaporates. The chaos is architectural.
          </p>
          <p className="ag-hero-sub ag-hero-sub--accent" data-reveal data-delay="3">
            LongStrider is the substrate that ends it. Every agent write becomes a permanent,
            governed, compounding entry in a living knowledge graph.
            Not a log. Intelligence.
          </p>
        </div>

        <hr className="ag-rule" />

        {/* ═══ THE PIPELINE PROBLEM ══════════════════════════════ */}
        <section className="ag-section" data-section="pipeline">
          <span className="ag-section-label" data-reveal>The Problem</span>
          <h2 className="ag-h2" data-reveal data-delay="1">
            Every other framework treats agents as pipelines.<br />
            Pipelines don&apos;t compound.
          </h2>
          <p className="ag-lead" data-reveal data-delay="2">
            A pipeline runs a task and produces an output. The output lives in a file,
            a Slack message, a report. Next run, the agent starts from zero — no memory
            of what it found last time, no cross-reference against what your humans know,
            no synthesis of what patterns are emerging across weeks of runs.
            You have outputs. You do not have intelligence.
          </p>

          <div className="ag-compare-grid" data-reveal data-delay="2">
            <div className="ag-compare-card ag-compare-card--bad">
              <div className="ag-compare-label">Agent as pipeline</div>
              <div className="ag-compare-flow">
                <span className="ag-compare-node">Task in</span>
                <span className="ag-compare-arrow">→</span>
                <span className="ag-compare-node">Agent runs</span>
                <span className="ag-compare-arrow">→</span>
                <span className="ag-compare-node">Output out</span>
                <span className="ag-compare-arrow">→</span>
                <span className="ag-compare-node ag-compare-node--dead">Evaporates</span>
              </div>
              <p className="ag-compare-note">
                LangChain · CrewAI · AutoGPT · Claude Code — all task-execution frameworks.
                Powerful. Stateless. What they find disappears when the session ends.
                No memory. No synthesis. No compounding. No governance.
              </p>
            </div>
            <div className="ag-compare-card ag-compare-card--good">
              <div className="ag-compare-label">Agent as substrate contributor</div>
              <div className="ag-compare-flow">
                <span className="ag-compare-node">Agent runs</span>
                <span className="ag-compare-arrow">→</span>
                <span className="ag-compare-node ag-compare-node--gold">Substrate write</span>
                <span className="ag-compare-arrow">→</span>
                <span className="ag-compare-node">Overnight synthesis</span>
                <span className="ag-compare-arrow">→</span>
                <span className="ag-compare-node ag-compare-node--purple">Compounds forever</span>
              </div>
              <p className="ag-compare-note">
                LongStrider agents write to the same knowledge graph your humans write to.
                Every find is gravity-weighted, cross-referenced, and synthesized overnight.
                The graph grows smarter. The distinction between human and agent intelligence
                disappears. It is all just intelligence.
              </p>
            </div>
          </div>
        </section>

        <hr className="ag-rule" />

        {/* ═══ THE FLYWHEEL ════════════════════════════════════════ */}
        <section className="ag-section" data-section="flywheel">
          <span className="ag-section-label" data-reveal>The Flywheel</span>
          <h2 className="ag-h2" data-reveal data-delay="1">
            Human intelligence compounds agent intelligence.<br />
            Agent intelligence compounds human intelligence.
          </h2>
          <p className="ag-lead" data-reveal data-delay="2">
            Both write to the same substrate. Every night, the Dream Compiler reads both —
            synthesizes what the fleet found alongside what your humans discussed —
            and writes a RuntimePolicy that makes tomorrow&apos;s intelligence sharper than today&apos;s.
            It is not a feature. It is the architecture.
          </p>
          <div data-reveal data-delay="2">
            <FlywheelViz />
          </div>
          <div className="ag-flywheel-steps" data-reveal data-delay="3">
            {[
              { n: '01', title: 'Agents run.', body: 'R&D Oracle files a research memory. Competitive Intelligence logs a competitor move. Marketing Intelligence indexes a content signal. Each write goes into the substrate with a gravity score.' },
              { n: '02', title: 'Humans talk.', body: 'You ask about the competitive landscape. You discuss a decision. You surface a concern. That conversation is also a substrate write — same graph, same architecture.' },
              { n: '03', title: 'Dream Compiler synthesizes.', body: 'At 4am, it reads everything from the last 24 hours. Agent intelligence. Human intelligence. Cross-references both. Strengthens validated patterns. Writes the RuntimePolicy for tomorrow.' },
              { n: '04', title: 'Tomorrow is sharper.', body: 'Your next conversation draws on what the agents found. The agents\' next run is informed by what you discussed. The graph compounds. Night after night. Automatically.' },
            ].map((step, i) => (
              <div key={i} className="ag-flywheel-step">
                <div className="ag-flywheel-step-n">{step.n}</div>
                <div className="ag-flywheel-step-body">
                  <div className="ag-flywheel-step-title">{step.title}</div>
                  <p className="ag-flywheel-step-text">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="ag-rule" />

        {/* ═══ WHAT THE GRAPH KNOWS ════════════════════════════════ */}
        <section className="ag-section" data-section="graph">
          <span className="ag-section-label" data-reveal>The Graph</span>
          <h2 className="ag-h2" data-reveal data-delay="1">
            What the graph knows<br />at 90 days. At one year. At three.
          </h2>
          <p className="ag-lead" data-reveal data-delay="2">
            This is not a time-series of agent outputs. It is an organization that learns.
            Human intelligence and agent intelligence are indistinguishable in the substrate.
            Both compound. Both cross-reference. Both become more valuable with every night the graph runs.
          </p>
          <div className="ag-depth-grid" data-reveal data-delay="2">
            {GRAPH_DEPTH.map((d, i) => (
              <div key={i} className="ag-depth-card">
                <div className="ag-depth-time">{d.time}</div>
                <div className="ag-depth-row">
                  <div className="ag-depth-source ag-depth-source--human">Human layer</div>
                  <p className="ag-depth-desc">{d.human}</p>
                </div>
                <div className="ag-depth-row">
                  <div className="ag-depth-source ag-depth-source--agent">Agent layer</div>
                  <p className="ag-depth-desc">{d.agent}</p>
                </div>
                <div className="ag-depth-synthesis">
                  <div className="ag-depth-synthesis-label">Synthesized</div>
                  <p className="ag-depth-synthesis-text">{d.synthesis}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="ag-rule" />

        {/* ═══ THE FLEET ═══════════════════════════════════════════ */}
        <section className="ag-section" data-section="fleet">
          <span className="ag-section-label" data-reveal>The Fleet</span>
          <h2 className="ag-h2" data-reveal data-delay="1">
            13 agents. One substrate.<br />
            All compounding the same graph.
          </h2>
          <p className="ag-lead" data-reveal data-delay="2">
            Every agent in the fleet writes to the same knowledge graph. Their intelligence
            is not siloed — it is cross-referenced. The R&D Oracle&apos;s research finds are
            available to the Competitive Intelligence agent. The Relationship Intelligence
            agent&apos;s social graph informs the Autonomous Insight agent&apos;s behavioral analysis.
            One graph. Thirteen contributors. Compounding.
          </p>
          <div className="ag-fleet-grid" data-reveal data-delay="2">
            {AGENTS.map((a) => (
              <div key={a.n} className="ag-fleet-card">
                <div className="ag-fleet-header">
                  <span className="ag-fleet-n">{a.n}</span>
                  <span className="ag-fleet-badge">{a.badge}</span>
                </div>
                <div className="ag-fleet-name">{a.name}</div>
                <p className="ag-fleet-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="ag-rule" />

        {/* ═══ SOVEREIGNTY ═════════════════════════════════════════ */}
        <section className="ag-section" data-section="sovereignty">
          <span className="ag-section-label" data-reveal>Sovereignty</span>
          <h2 className="ag-h2" data-reveal data-delay="1">
            Your agents.<br />
            Your substrate.<br />
            Zero telemetry.
          </h2>
          <p className="ag-lead" data-reveal data-delay="2">
            The chaos in the market is not just architectural — it is a data sovereignty crisis.
            Agents with deep system access, running on vendor infrastructure, logging findings
            to vendor servers. LongStrider is built on a different premise: sovereign by default.
          </p>
          <div className="ag-sovereignty-grid" data-reveal data-delay="2">
            {[
              { label: 'Your infrastructure', body: 'Agents write to your Supabase instance. Your cloud. Your network perimeter. Nothing leaves.' },
              { label: 'Your LLM', body: 'Bring any model — OpenAI, Anthropic, Ollama, Llama. LongStrider is model-agnostic. The intelligence never trains an external model.' },
              { label: 'Your audit trail', body: 'Every agent action, every substrate write, every RuntimePolicy update — logged, traceable, owned by you. Full governance, zero black boxes.' },
              { label: 'Your deployment', body: 'Hosted fleet, self-hosted, or sovereign air-gap. For regulated environments: no external API calls, all models local, intelligence never leaves the network.' },
            ].map((item, i) => (
              <div key={i} className="ag-sovereignty-card">
                <div className="ag-sovereignty-label">{item.label}</div>
                <p className="ag-sovereignty-body">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="ag-mcp-statement" data-reveal data-delay="3">
            <span className="ag-mcp-eyebrow">MCP-native architecture</span>
            <p className="ag-mcp-text">
              LongStrider speaks MCP natively. Every agent in the fleet is a Model Context Protocol
              server — exposing substrate reads and writes as structured tools. Any MCP-compatible
              orchestrator can coordinate the fleet without custom integration.
              The intelligence layer is open. The data never is.
            </p>
          </div>
        </section>

        <hr className="ag-rule" />

        {/* ═══ CTA ═════════════════════════════════════════════════ */}
        <div className="ag-cta" data-reveal>
          <span className="ag-cta-eyebrow">Deploy the fleet</span>
          <h2 className="ag-cta-h2">
            Stop running agents.<br />Start compounding intelligence.
          </h2>
          <p className="ag-cta-body">
            The difference between an agent that runs a task and an agent that compiles
            institutional knowledge overnight is the substrate. Start a pilot.
          </p>
          <div className="ag-cta-actions">
            <Link href="/pilot" className="ag-cta-primary">Start a Pilot →</Link>
            <Link href="/technology" className="ag-cta-secondary">Read the Architecture</Link>
          </div>
          <p className="ag-cta-note">
            100% on-premises · LLM-agnostic · Zero telemetry
          </p>
        </div>

      </div>
    </div>
  );
}
