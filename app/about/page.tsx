'use client';

import './about.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

// ── Team ─────────────────────────────────────────────────────────

const TEAM = [
  {
    initials: 'MV',
    name: 'Matt Veitch',
    title: 'Founder & Architect',
    identity: 'gold' as const,
    bio: 'Thirty years in technology across enterprise software, AI infrastructure, and two previous companies. Drives architecture and product direction.',
  },
  {
    initials: 'MB',
    name: 'Marc Boudria',
    title: 'Co-Founder, Enterprise Strategy',
    identity: 'purple' as const,
    bio: 'Enterprise AI strategy and go-to-market. Brings decades of domain depth and the relationships that open enterprise doors.',
  },
  {
    initials: 'IB',
    name: 'Isabella Buzziard',
    title: 'Co-Founder, Revenue Operations',
    identity: 'neutral' as const,
    bio: 'Revenue architecture, partner relationships, and the operational backbone that keeps the mission grounded and moving.',
  },
];

// ── What was built ────────────────────────────────────────────────

const BUILT = [
  'Complete intelligence infrastructure — not a wrapper, not a bolt-on',
  'Gravity-weighted memory substrate — 52,000+ memories in production',
  'Nightly consolidation engine — compounds automatically',
  'Five-axis recall router — semantic, gravitational, structural, relational, temporal',
  'Behavioral operating layer — configurable without retraining',
];

// ── Tech stack ────────────────────────────────────────────────────

const STACK = [
  'Supabase',
  'OpenAI',
  'Anthropic',
  'Ollama',
  'Vercel',
  'Next.js',
  'LM Studio',
];

// ── Main page ─────────────────────────────────────────────────────

export default function AboutPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('deck-visible');
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
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
    <div className="ab-page">

      {/* Ambient orbs */}
      <div className="ab-orb-1" />
      <div className="ab-orb-2" />

      <div className="ab-container">

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <div className="ab-hero">
          <div className="ab-hero-label" data-reveal>
            About LongStrider
          </div>
          <h1 className="ab-hero-h1" data-reveal data-delay="1">
            We built this because{' '}
            <em>the problem needed solving.</em>
          </h1>
          <p className="ab-hero-lead" data-reveal data-delay="2">
            Three people. A clear structural gap in how AI handles institutional
            knowledge. Eighteen months of building the layer that didn&apos;t exist.
          </p>
        </div>

        <hr className="ab-divider" />

        {/* ══ THE PROBLEM ════════════════════════════════════════════ */}
        <section className="ab-section">
          <div className="ab-grid">
            <div>
              <span className="ab-label" data-reveal>The Problem</span>
              <h2 className="ab-h2" data-reveal data-delay="1">
                Brilliant models.<br />Zero memory.
              </h2>
              <p className="ab-lead" data-reveal data-delay="2">
                The AI industry built incredible engines and gave them amnesia.
              </p>
              <p className="ab-body" data-reveal data-delay="2">
                Every enterprise AI conversation starts from zero. Every agent forgets.
                Every deployment requires you to explain your business again. The models
                kept getting smarter — the institutional knowledge problem stayed exactly
                the same.
              </p>
              <p className="ab-body" data-reveal data-delay="2">
                That&apos;s not a model problem. It&apos;s an architectural layer that
                doesn&apos;t exist yet. LongStrider is that layer: the programmable
                intelligence infrastructure between the LLM and the world — where memory
                is sovereign, compounding, and permanently yours.
              </p>
            </div>
            <div data-reveal data-delay="2">
              <div className="ab-callout">
                <p className="ab-callout-quote">
                  &ldquo;AI without persistent, sovereign, compounding memory
                  isn&apos;t intelligent — it&apos;s a very fast amnesiac.&rdquo;
                </p>
              </div>
              <div className="ab-callout" style={{ marginTop: '16px' }}>
                <p className="ab-built-label">What was actually built</p>
                {BUILT.map((item, i) => (
                  <div key={i} className={`ab-built-row${i < BUILT.length - 1 ? ' ab-built-row-border' : ''}`}>
                    <div className="ab-built-dot" />
                    <span className="ab-built-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="ab-divider" />

        {/* ══ FOUNDING PRINCIPLE ════════════════════════════════════ */}
        <section className="ab-section ab-principle-section">
          <div data-reveal>
            <span className="ab-label">Founding Principle</span>
          </div>
          <div className="ab-principle-wrap" data-reveal data-delay="1">
            <p className="ab-principle-line">
              You pay for the software.{' '}
              <span className="ab-principle-gold">You own it.</span>
            </p>
            <p className="ab-principle-line">
              Your data stays on your infrastructure.{' '}
              <span className="ab-principle-gold">Not theirs.</span>
            </p>
            <p className="ab-principle-line">
              The intelligence your business builds{' '}
              <span className="ab-principle-gold">compounds for you.</span>
            </p>
          </div>
          <div className="ab-principle-body" data-reveal data-delay="2">
            <p>
              For thirty years, the enterprise software industry ran the same play:
              charge for access, keep the intelligence, and make the exit painful.
              Your data lives on their servers. Your workflows depend on their APIs.
              Your institutional knowledge compounds — for them.
            </p>
            <p>
              SaaS didn&apos;t democratize software. It rented it back to you at a markup.
              Small and mid-sized companies have been overcharged and locked in for
              too long — forced to rebuild from scratch every time they switch tools,
              every time a vendor changes pricing, every time a model provider decides
              your data is their training set.
            </p>
            <p>
              LongStrider is built on a different premise: the intelligence your
              organization generates belongs to your organization. Permanently.
              Not licensed. Not hosted somewhere you can&apos;t control.
              Portable. Auditable. Yours.
            </p>
            <p className="ab-principle-kicker">
              That&apos;s not a feature. That&apos;s the whole point.
            </p>
          </div>
        </section>

        <hr className="ab-divider" />

        {/* ══ HOW WE GOT HERE ════════════════════════════════════════ */}
        <section className="ab-section">
          <div className="ab-grid">
            <div>
              <span className="ab-label" data-reveal>How We Got Here</span>
              <h2 className="ab-h2" data-reveal data-delay="1">
                The pattern was<br />always the same.
              </h2>
              <p className="ab-body" data-reveal data-delay="2">
                Across enterprise software, AI deployments, and two previous companies,
                the same problem kept surfacing: organizations building on AI platforms
                were generating institutional intelligence that didn&apos;t belong to them.
                Every conversation trained the vendor. Every insight fed the platform.
                The customer got a bill.
              </p>
              <p className="ab-body" data-reveal data-delay="2">
                LongStrider started with a clear premise — sovereignty first — and was
                built from the ground up to deliver it. The sovereignty framing, the
                architecture decisions, the go-to-market approach: every piece shaped
                by the founding team working the problem from different angles.
              </p>
              <p className="ab-body" data-reveal data-delay="2">
                Eighteen months. A small team. A production system with 52,000+
                memories and a real behavioral engine. Built lean on purpose.
              </p>
            </div>
            <div data-reveal data-delay="2">
              <div className="ab-principles-list">
                {[
                  { label: 'Sovereignty first', detail: 'Your intelligence stays on your infrastructure. Non-negotiable from day one.' },
                  { label: 'No wrappers', detail: 'Purpose-built architecture. Not an API layer over someone else\'s platform.' },
                  { label: 'Compounding by design', detail: 'The system gets more valuable over time. That\'s the architecture, not the pitch.' },
                  { label: 'Replaceable components', detail: 'Run OpenAI today, switch to Ollama tomorrow. The memory layer stays put.' },
                ].map((p, i) => (
                  <div key={i} className="ab-principle-item">
                    <div className="ab-principle-item-label">{p.label}</div>
                    <div className="ab-principle-item-detail">{p.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="ab-divider" />

        {/* ══ TEAM ═══════════════════════════════════════════════════ */}
        <section className="ab-section">
          <span className="ab-label" data-reveal>The Team</span>
          <h2 className="ab-h2" data-reveal data-delay="1">
            Small. On purpose.
          </h2>
          <p className="ab-body ab-team-intro" data-reveal data-delay="2">
            LongStrider was built lean and will grow lean. The people in this room
            have been here from the beginning — no titles inflated for optics.
          </p>
          <div className="ab-team-grid" data-reveal data-delay="2">
            {TEAM.map((member) => (
              <div key={member.name} className="ab-team-card">
                <div className={`ab-identity ab-identity-${member.identity}`}>
                  <span className="ab-identity-initials">{member.initials}</span>
                </div>
                <h3 className="ab-team-name">{member.name}</h3>
                <span className="ab-team-title">{member.title}</span>
                <p className="ab-team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="ab-divider" />

        {/* ══ STACK / PARTNERS ═══════════════════════════════════════ */}
        <section className="ab-section">
          <span className="ab-label" data-reveal>Built On</span>
          <h2 className="ab-h2" data-reveal data-delay="1">
            Production-grade stack.<br />No proprietary lock-in.
          </h2>
          <p className="ab-body ab-stack-intro" data-reveal data-delay="2">
            Every component is replaceable. That&apos;s the architecture — not a pitch.
            Run on OpenAI today, switch to Ollama tomorrow. The intelligence layer stays
            exactly where you left it.
          </p>
          <div className="ab-stack-grid" data-reveal data-delay="2">
            {STACK.map((item) => (
              <div key={item} className="ab-stack-item">
                <span className="ab-stack-dot" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ════════════════════════════════════════════════════ */}
        <section className="ab-cta-section">
          <div data-reveal>
            <span className="ab-label ab-label-center">Ready to build?</span>
            <p className="ab-cta-heading">
              Memory Sovereignty.<br />
              <span className="ab-cta-gold">Now available as infrastructure.</span>
            </p>
          </div>
          <div data-reveal data-delay="1">
            <Link href="/pilot" className="ab-cta-btn">
              Start a Pilot →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
