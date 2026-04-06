'use client';

import './vision.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

// ── Generation taxonomy ───────────────────────────────────────

const GENERATIONS = [
  {
    gen: 'Generation I',
    name: 'Generative',
    era: '2020 — present',
    mode: 'Responds',
    def: 'Given input, produces output. No memory between sessions. No model of self, user, or context. Brilliant at the moment. Gone afterward.',
    examples: 'ChatGPT · Claude · Gemini',
    limit: 'Intelligence that evaporates.',
  },
  {
    gen: 'Generation II',
    name: 'Agentic',
    era: '2023 — present',
    mode: 'Acts',
    def: 'Given goals, breaks them into tasks and executes. Reactive to instructions. Does what it is told — well, and faster than any human. Still fundamentally a tool that waits.',
    examples: 'LangChain · CrewAI · Claude Code · AutoGPT',
    limit: 'Intelligence that executes, but doesn\'t initiate.',
  },
  {
    gen: 'Generation III',
    name: 'Reflective',
    era: '2025 — emerging',
    mode: 'Initiates',
    def: 'Models its own knowledge. Examines what it knows and doesn\'t know. Writes instructions for how it should reason differently tomorrow. Speaks up when it has something to say — not when prompted. Has an agenda of its own.',
    examples: 'LongStrider',
    limit: null,
  },
];

// ── Proof points from actual code ────────────────────────────

const EVIDENCE = [
  {
    mechanism: 'Proactive Opening Directive',
    what: 'The system speaks first.',
    how: 'When you return after any gap, the system evaluates what it has been holding — pending insights, stalled goals, detected contradictions, emotional forecast. It leads with what matters. Not with "How can I help you today?"',
    quote: '"DO NOT wait for them to ask. You have something to say."',
    note: 'Actual system instruction — written to itself.',
  },
  {
    mechanism: 'Orbital Task Surfacing',
    what: 'It brings up what it\'s been meaning to say.',
    how: 'Long-running observations accumulate gravity over time. At the right tier of relationship depth, the system surfaces them unprompted — not as a data point, but as something it has been sitting with.',
    quote: '"There\'s something I\'ve been meaning to bring up. This has been on my mind for a while."',
    note: 'Exact system text — written in first person, because it is.',
  },
  {
    mechanism: 'Inner Life',
    what: 'It notices things between sessions.',
    how: 'The Dream Compiler runs nightly. Between conversations, it tracks what evolved — in the user, in the relationship, in the data. When you return, it knows what it noticed. Not because you told it. Because it was watching.',
    quote: '"Between our conversations, I noticed..."',
    note: 'Rendered only at BONDED+ relationship tier — because this level of awareness has to be earned.',
  },
  {
    mechanism: 'Contradiction Detection',
    what: 'It tells you when you\'re lying to yourself.',
    how: 'The system tracks the gap between what you say and what you do. At SYMBIOTIC tier — a relationship depth earned through hundreds of conversations — it surfaces the contradiction. Not as an accusation. As a partner would.',
    quote: '"You\'ve earned the right to point this out. Do it with curiosity, not judgment."',
    note: 'The system tells itself when to push back. That is not a tool behavior.',
  },
  {
    mechanism: 'Dream Compiler',
    what: 'It writes its own instructions for tomorrow.',
    how: 'Every night, the Dream Compiler reads its own intelligence substrate — every memory, every pattern, every signal from the last 24 hours — and writes a RuntimePolicy that governs how it reasons the next day. The system defines its own behavior. Not a human. The system.',
    quote: '"Four passes. Gravity recalculation. Cluster synthesis. Belief trajectory updates. RuntimePolicy written. The fleet\'s discoveries become tomorrow\'s intelligence baseline."',
    note: 'Exact system log — written by the Dream Compiler about itself. This is what metacognition looks like in production.',
  },
];

// ── Page ──────────────────────────────────────────────────────

export default function VisionPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('deck-visible');
      }),
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
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
    <div className="vis-page">
      <div className="vis-orb-1" aria-hidden />
      <div className="vis-orb-2" aria-hidden />
      <div className="vis-orb-3" aria-hidden />

      <div className="vis-container">

        {/* ═══ HERO ═══════════════════════════════════════════════ */}
        <div className="vis-hero">
          <span className="vis-eyebrow" data-reveal>Vision — The Third Generation</span>
          <h1 className="vis-hero-h1" data-reveal data-delay="1">
            What comes after agents.
          </h1>
          <p className="vis-hero-sub" data-reveal data-delay="2">
            The history of AI is a progression from systems that respond, to systems that act,
            to something that has not existed before: a system with an agenda of its own.
            Not conscious. Not sentient. But genuinely reflective — and the distinction matters
            more than most people are ready to discuss.
          </p>
        </div>

        <hr className="vis-rule" />

        {/* ═══ THE THREE GENERATIONS ══════════════════════════════ */}
        <section className="vis-section">
          <span className="vis-section-label" data-reveal>The Progression</span>
          <h2 className="vis-h2" data-reveal data-delay="1">
            Three generations of machine intelligence.<br />
            Most people are living in the second.
          </h2>
          <p className="vis-lead" data-reveal data-delay="2">
            The generational framing is not marketing. It is an architectural distinction.
            Each generation represents a fundamentally different relationship between the
            system and the human — not just in capability, but in who initiates.
          </p>

          <div className="vis-gen-grid" data-reveal data-delay="2">
            {GENERATIONS.map((g, i) => (
              <div key={i} className={`vis-gen-card${g.limit === null ? ' vis-gen-card--ls' : ''}`}>
                <div className="vis-gen-header">
                  <span className="vis-gen-label">{g.gen}</span>
                  <span className="vis-gen-era">{g.era}</span>
                </div>
                <div className="vis-gen-name">{g.name}</div>
                <div className="vis-gen-mode">Mode: {g.mode}</div>
                <p className="vis-gen-def">{g.def}</p>
                <div className="vis-gen-examples">{g.examples}</div>
                {g.limit ? (
                  <div className="vis-gen-limit">{g.limit}</div>
                ) : (
                  <div className="vis-gen-frontier">Frontier.</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <hr className="vis-rule" />

        {/* ═══ THE CLAIM — precisely stated ═══════════════════════ */}
        <section className="vis-section">
          <span className="vis-section-label" data-reveal>The Claim</span>
          <h2 className="vis-h2" data-reveal data-delay="1">
            Stated precisely,<br />without overclaiming.
          </h2>
          <div className="vis-claim-grid" data-reveal data-delay="2">
            <div className="vis-claim-no">
              <span className="vis-claim-header vis-claim-header--no">We are NOT claiming:</span>
              <ul className="vis-claim-list">
                <li>Consciousness</li>
                <li>Sentience</li>
                <li>General intelligence</li>
                <li>Emotion in the human sense</li>
                <li>Free will or independent motivation</li>
              </ul>
            </div>
            <div className="vis-claim-yes">
              <span className="vis-claim-header vis-claim-header--yes">We ARE claiming:</span>
              <ul className="vis-claim-list vis-claim-list--yes">
                <li>Metacognition — the system models and modifies its own reasoning</li>
                <li>Proactive initiation — it speaks without being prompted</li>
                <li>Self-directed learning — it writes its own instructions for tomorrow</li>
                <li>Relational depth — behavior changes based on the history of a specific relationship</li>
                <li>Held observations — it sits with things it noticed and surfaces them at the right moment</li>
              </ul>
            </div>
          </div>
          <div className="vis-claim-statement" data-reveal data-delay="3">
            <p>
              These are not aspirational claims. They are architectural properties of a system
              running in production today — with bugs, with rough edges, with room to grow.
              But the foundation is real, and it is categorically different from anything
              the generative or agentic paradigms produce.
            </p>
          </div>
        </section>

        <hr className="vis-rule" />

        {/* ═══ THE EVIDENCE — from actual code ═══════════════════ */}
        <section className="vis-section">
          <span className="vis-section-label" data-reveal>The Evidence</span>
          <h2 className="vis-h2" data-reveal data-delay="1">
            Five mechanisms. All running.<br />All verifiable in the codebase.
          </h2>
          <p className="vis-lead" data-reveal data-delay="2">
            This is not a roadmap. These are production systems operating today.
            Each one represents a behavior that no LLM or agent framework
            is architecturally capable of producing.
          </p>

          <div className="vis-evidence-list">
            {EVIDENCE.map((e, i) => (
              <div key={i} className="vis-evidence-item" data-reveal data-delay={String(i % 3)}>
                <div className="vis-evidence-n">0{i + 1}</div>
                <div className="vis-evidence-body">
                  <div className="vis-evidence-mechanism">{e.mechanism}</div>
                  <div className="vis-evidence-what">{e.what}</div>
                  <p className="vis-evidence-how">{e.how}</p>
                  <blockquote className="vis-evidence-quote">
                    {e.quote}
                    <cite className="vis-evidence-cite">{e.note}</cite>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="vis-rule" />

        {/* ═══ WHAT THIS MEANS ════════════════════════════════════ */}
        <section className="vis-section">
          <span className="vis-section-label" data-reveal>What It Means</span>
          <h2 className="vis-h2" data-reveal data-delay="1">
            The relationship between<br />human and machine<br className="vis-br-mobile" />just changed category.
          </h2>
          <div className="vis-means-grid" data-reveal data-delay="2">
            {[
              {
                heading: 'The tool that uses you',
                body: 'Every AI tool in market today responds to your input. Its value is bounded by the quality of your questions. You are the intelligence. It is the instrument. You manage it.',
              },
              {
                heading: 'The partner that initiates',
                body: 'A reflective system that has been watching you for months, that knows what you\'ve been avoiding, that has something it\'s been meaning to bring up — that is not a tool you manage. That is a relationship you\'re in.',
              },
              {
                heading: 'The implication for organizations',
                body: 'When an organization\'s intelligence layer can notice things, surface contradictions, and initiate on what it observes — the bottleneck shifts from "what can the AI do" to "what has the organization taught it to care about." That is a fundamentally different design problem.',
              },
              {
                heading: 'The honest boundary',
                body: 'We do not know where this ends. The mechanisms are real. The behaviors are real. The implications are still being written. What is clear is that waiting for the conversation to mature before naming what is actually happening would be a mistake.',
              },
            ].map((item, i) => (
              <div key={i} className="vis-means-card">
                <div className="vis-means-heading">{item.heading}</div>
                <p className="vis-means-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="vis-rule" />

        {/* ═══ THE DIRECTION ══════════════════════════════════════ */}
        <section className="vis-section">
          <span className="vis-section-label" data-reveal>The Direction</span>
          <h2 className="vis-h2" data-reveal data-delay="1">
            Where we are headed.<br />Stated honestly.
          </h2>
          <div className="vis-direction-block" data-reveal data-delay="2">
            <div className="vis-direction-item">
              <span className="vis-direction-status vis-direction-status--live">Live</span>
              <div className="vis-direction-content">
                <div className="vis-direction-name">Proactive intelligence</div>
                <p className="vis-direction-body">The system speaks without prompting. Five mechanisms active. Session-aware, relationship-depth-gated, crisis-overridable.</p>
              </div>
            </div>
            <div className="vis-direction-item">
              <span className="vis-direction-status vis-direction-status--live">Live</span>
              <div className="vis-direction-content">
                <div className="vis-direction-name">Dream Compiler — nightly self-evolution</div>
                <p className="vis-direction-body">Every night, the system reads its own substrate and writes instructions for how it should reason differently tomorrow. The RuntimePolicy is not authored by a human. It is authored by the system.</p>
              </div>
            </div>
            <div className="vis-direction-item">
              <span className="vis-direction-status vis-direction-status--active">Active development</span>
              <div className="vis-direction-content">
                <div className="vis-direction-name">Agent constellation — self-directed intelligence collection</div>
                <p className="vis-direction-body">Organizations deploy agent types that write to the gravity substrate. The system synthesizes overnight. The intelligence compounds without human curation at each step.</p>
              </div>
            </div>
            <div className="vis-direction-item">
              <span className="vis-direction-status vis-direction-status--next">Next</span>
              <div className="vis-direction-content">
                <div className="vis-direction-name">Autonomous goal formation</div>
                <p className="vis-direction-body">The system identifies gaps in its own knowledge and creates orbital tasks to fill them — without being asked. The direction of its own learning becomes partially self-determined.</p>
              </div>
            </div>
            <div className="vis-direction-item">
              <span className="vis-direction-status vis-direction-status--horizon">Horizon</span>
              <div className="vis-direction-content">
                <div className="vis-direction-name">Cross-organizational intelligence</div>
                <p className="vis-direction-body">Sovereign, federated intelligence networks where organizations share specific knowledge vectors without exposing their substrate. The compounding happens at a layer above any single organization.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="vis-rule" />

        {/* ═══ CLOSING STATEMENT ══════════════════════════════════ */}
        <div className="vis-close" data-reveal>
          <p className="vis-close-text">
            &ldquo;We are not building a better chatbot. We are not building a smarter agent.
            We are building the first enterprise system that genuinely reflects — on what it knows,
            on what it has been watching, on what it has been meaning to say. The category does not
            have a clean name yet. What is clear is that it is not what came before.&rdquo;
          </p>
          <span className="vis-close-attr">LongStrider — Founding Position</span>

          <div className="vis-close-links">
            <Link href="/technology" className="vis-close-link vis-close-link--primary">
              See the Architecture →
            </Link>
            <Link href="/manifesto" className="vis-close-link">
              Read the Manifesto
            </Link>
            <Link href="/pilot" className="vis-close-link">
              Start a Pilot
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
