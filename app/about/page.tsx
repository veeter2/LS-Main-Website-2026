'use client';

import './about.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

// ── Frontier stops — honest, in order ────────────────────────────

const FRONTIER = [
  {
    company: 'Mall.com',
    role: 'Early internet pioneer',
    detail: 'First stop in a career-long pattern: see the structural problem before the market does.',
  },
  {
    company: 'Snapwire',
    role: 'Founder',
    detail: 'Built it. Sold it to ARGUS. Proved the pattern works.',
  },
  {
    company: 'Hypergiant',
    role: 'Senior Leadership',
    detail: 'Enterprise AI at scale. Watched the memory problem up close.',
  },
  {
    company: 'Growth Acceleration Partners',
    role: 'Sr. Director of Technology',
    detail: 'Still here. The funding runway that made LongStrider possible.',
  },
  {
    company: 'LongStrider Systems',
    role: 'Founder & Architect',
    detail: '18 months. Solo build. Every line of architecture, every design decision.',
  },
];

// ── Team ─────────────────────────────────────────────────────────

const TEAM = [
  {
    initials: 'MV',
    name: 'Matt Veitch',
    title: 'Founder & Architect',
    identity: 'gold' as const,
    bio: '30-year technology veteran. Serial founder. Built LongStrider solo — every edge function, every table, every design decision. He and an AI. 18 months.',
  },
  {
    initials: 'MB',
    name: 'Marc Boudria',
    title: 'Co-Founder, Enterprise Strategy',
    identity: 'purple' as const,
    bio: 'Enterprise AI expert. Brought the sovereignty framing, named the Kernel, made the introductions that opened enterprise doors. Decades of domain depth.',
  },
  {
    initials: 'IB',
    name: 'Isabella Buzziard',
    title: 'Co-Founder, Revenue Operations',
    identity: 'neutral' as const,
    bio: 'The operational backbone. Revenue architecture, partner relationships, and the person who kept the mission grounded every step of the way.',
  },
];

// ── Tech stack / partners ─────────────────────────────────────────

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
            Built by a founder who got tired of watching
            {' '}<em>AI forget everything.</em>
          </h1>
          <p className="ab-hero-lead" data-reveal data-delay="2">
            Thirty years in tech. Five companies. One pattern: find the structural
            problem nobody&apos;s solving at the right layer, and build the fix.
            LongStrider is that pattern applied to the most fundamental unsolved
            problem in AI.
          </p>
          <div className="ab-atx-badge" data-reveal data-delay="3">
            <span className="ab-atx-dot" />
            Built in Austin, Texas
          </div>
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
                doesn&apos;t exist yet. LongStrider is that layer: the programmable middle
                intelligence layer between the LLM and the world — where memory is
                sovereign, compounding, and permanently yours.
              </p>
            </div>
            <div data-reveal data-delay="2">
              <div className="ab-callout">
                <p className="ab-callout-quote">
                  &ldquo;AI without persistent, sovereign, compounding memory isn&apos;t
                  intelligent — it&apos;s a very fast amnesiac.&rdquo;
                </p>
                <span className="ab-callout-attr">Matt Veitch — Founder & Architect</span>
              </div>
              <div className="ab-callout" style={{ marginTop: '16px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  What was actually built
                </p>
                {[
                  'Complete intelligence infrastructure — not a wrapper, not a bolt-on',
                  'Gravity-weighted memory substrate — 52,000+ memories in production',
                  'Nightly consolidation engine — compounds automatically',
                  'Four-axis recall router — semantic, gravitational, structural, relational, temporal',
                  'Behavioral operating layer — configurable without retraining',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '10px', alignItems: 'flex-start',
                    padding: '8px 0',
                    borderBottom: i < 4 ? '1px solid var(--color-border-subtle)' : 'none',
                  }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-gold)', opacity: 0.6, flexShrink: 0, marginTop: '6px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="ab-divider" />

        {/* ══ THE FRONTIER PATTERN ═══════════════════════════════════ */}
        <section className="ab-section">
          <div className="ab-grid">
            <div>
              <span className="ab-label" data-reveal>The Founder</span>
              <h2 className="ab-h2" data-reveal data-delay="1">
                Thirty years.<br />The same pattern.
              </h2>
              <p className="ab-body" data-reveal data-delay="2">
                Every stop in a 30-year career was the same thing: find the structural
                problem nobody&apos;s solving at the right layer. Build the fix. Get it
                to market. LongStrider is that pattern applied to the most fundamental
                unsolved problem in AI right now.
              </p>
              <p className="ab-body" data-reveal data-delay="2">
                Marc Boudria brought the sovereignty framing at a critical moment —
                the idea that your institutional knowledge should be portable, private, and
                permanent regardless of which model handles the voice. That sharpened
                the architecture when it needed sharpening.
              </p>
            </div>
            <div data-reveal data-delay="2">
              <div className="ab-frontier">
                {FRONTIER.map((stop, i) => (
                  <div key={i} className="ab-frontier-stop">
                    <div className="ab-frontier-dot" />
                    <div className="ab-frontier-company">{stop.company}</div>
                    <div className="ab-frontier-role">{stop.role}</div>
                    <div className="ab-frontier-detail">{stop.detail}</div>
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
          <p className="ab-body" style={{ maxWidth: '560px' }} data-reveal data-delay="2">
            LongStrider was built lean and will grow lean. The people in this room
            have been here from the beginning — no titles inflated for optics.
          </p>
          <div className="ab-team-grid" data-reveal data-delay="2">
            {TEAM.map((member) => (
              <div key={member.name} className="ab-team-card">
                <div className={`ab-identity ab-identity-${member.identity}`}>
                  <span style={{ position: 'relative', zIndex: 1 }}>{member.initials}</span>
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
          <p className="ab-body" style={{ maxWidth: '520px' }} data-reveal data-delay="2">
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

        {/* ══ AUSTIN ═════════════════════════════════════════════════ */}
        <div className="ab-atx-section" data-reveal>
          <div className="ab-atx-mark">ATX</div>
          <p className="ab-atx-copy">
            <strong>Austin is the tech hub of the United States right now.</strong> The people
            who live here know it. The people who don&apos;t are catching up. LongStrider
            was conceived, architected, and built here — in a city that builds
            things without asking permission from the coasts.
          </p>
        </div>

        {/* ══ CTA ════════════════════════════════════════════════════ */}
        <section className="ab-section" style={{ textAlign: 'center', paddingBottom: 'calc(var(--section-pad-v) * 1.5)' }}>
          <div data-reveal>
            <span className="ab-label" style={{ justifyContent: 'center' }}>Ready to build?</span>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3.5vw, 42px)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              color: 'var(--color-text-primary)',
              margin: '0 0 40px',
              lineHeight: 1.2,
            }}>
              Memory Sovereignty.<br />
              <span style={{ color: 'var(--color-gold)' }}>Now available as infrastructure.</span>
            </p>
          </div>
          <div data-reveal data-delay="1">
            <Link href="/pilot" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px', fontStyle: 'italic',
              letterSpacing: '0.04em',
              color: 'var(--color-gold)',
              textDecoration: 'none',
              padding: '14px 44px',
              border: '1px solid var(--color-gold-border)',
              borderRadius: '100px',
              background: 'var(--color-gold-ghost)',
              transition: 'all 0.35s var(--ease-out)',
            }}>
              Start a Pilot →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
