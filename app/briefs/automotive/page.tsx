'use client';

import '../cs-detail.css';
import './automotive.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

// ── Comparison table ──────────────────────────────────────────────

const COMPARISON = [
  {
    category: 'Knowledge scope',
    typical: 'Answers questions from available documents',
    ls: 'Synthesizes guidance, activity, repeated questions, local patterns, and leadership context across the network',
  },
  {
    category: 'Memory',
    typical: 'Forgets unless manually rebuilt',
    ls: 'Compounds operational memory over time — preserves what mattered, survives personnel and vendor changes',
  },
  {
    category: 'Direction',
    typical: 'Broadcasts information one way',
    ls: 'Supports two-way knowledge flow between the field and leadership',
  },
  {
    category: 'Ownership',
    typical: 'Usually tied to a specific vendor experience',
    ls: 'Memory and intelligence positioned as an owned layer above the stack',
  },
  {
    category: 'Adoption visibility',
    typical: 'Limited visibility into why confusion persists',
    ls: 'Tracks recurring friction, adoption gaps, and where knowledge is failing to land',
  },
];

// ── Role-based experience table ───────────────────────────────────

const ROLES = [
  {
    role: 'Service Advisor',
    sees: 'Current process guidance, active programs, recurring customer-communication questions, local exceptions',
    value: 'Faster answers in the moment — less time hunting through disconnected systems',
  },
  {
    role: 'Technician / Shop Foreman',
    sees: 'Known issue clusters, relevant updates, escalation patterns, repeated operational friction',
    value: 'Better continuity around recurring problems — less dependence on informal memory',
  },
  {
    role: 'Sales or Fixed Ops Manager',
    sees: 'Program requirements, adoption gaps, unanswered staff questions, store-level process friction',
    value: 'Cleaner execution — faster identification of where support is needed',
  },
  {
    role: 'General Manager',
    sees: 'Store-wide initiative activity, training gaps, overloaded owners, repeated confusion points',
    value: 'A clear picture of what the store is absorbing — versus merely receiving',
  },
  {
    role: 'Regional / National Leader',
    sees: 'Adoption trends, recurring question clusters, weak-absorption stores, high-performing exemplars',
    value: 'Living visibility into how the network is actually operating',
  },
];

// ── Additional use cases ──────────────────────────────────────────

const USE_CASES = [
  {
    title: 'Service lane intelligence',
    desc: 'Capture recurring repair or escalation patterns, repeated policy interpretation issues, and successful handling approaches across stores.',
  },
  {
    title: 'Training absorption and readiness',
    desc: 'Move beyond completion metrics to identify what staff still don\'t understand after training is released.',
  },
  {
    title: 'Dealer-to-corporate feedback',
    desc: 'Aggregate repeated questions, workarounds, and field friction into signals leadership can act on earlier.',
  },
  {
    title: 'Best-practice capture across rooftops',
    desc: 'Detect stores that adopt initiatives cleanly or develop stronger local processes — and redistribute those patterns network-wide.',
  },
  {
    title: 'Compliance and brand standards',
    desc: 'Reveal where stores are relying on outdated guidance or interpreting standards inconsistently.',
  },
  {
    title: 'Staffing and workstream visibility',
    desc: 'Show who is actually carrying initiative work at the store level, where ownership is vague, and where support is needed before execution slips.',
  },
];

// ── Simulation dialogue ───────────────────────────────────────────

const SIMULATION = [
  {
    speaker: 'Regional Director',
    text: 'LongStrider, show me which dealerships in my region are actively working on the new service-retention program and where adoption appears stalled.',
    role: 'user',
  },
  {
    speaker: 'LongStrider',
    text: 'I found 18 dealerships in your region with activity tied to the initiative in the last 21 days. Seven stores show strong implementation signals. Six show partial adoption. Five show weak adoption signals, where the material was distributed but local execution remains inconsistent. The most common friction patterns are confusion around the customer communication workflow, unclear ownership between service advisors and managers, and uncertainty about whether store-level customization is allowed.',
    role: 'ls',
  },
  {
    speaker: 'Regional Director',
    text: 'Show me which stores are asking the same questions so we can correct the root issue instead of repeating ourselves.',
    role: 'user',
  },
  {
    speaker: 'LongStrider',
    text: 'Three recurring question clusters are appearing across 11 stores. This suggests a network-level distribution problem rather than isolated local underperformance. I can draft a regional clarification memo and identify one high-performing store whose implementation pattern can be used as an operating example.',
    role: 'ls',
  },
  {
    speaker: 'Regional Director',
    text: 'Do that. Also tell me who at the weak-adoption stores is actively working on implementation.',
    role: 'user',
  },
  {
    speaker: 'LongStrider',
    text: 'In the five weakest-adoption stores, I found activity from eight named employees across service and management roles. Two stores show effort concentrated in one individual without broader adoption — indicating a staffing concentration risk. I can prepare targeted outreach notes for those store leaders and summarize where support is needed.',
    role: 'ls',
  },
];

// ── Page ──────────────────────────────────────────────────────────

export default function AutomotiveBriefPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('deck-visible');
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
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
    <div className="bd-page">
      <div className="bd-orb-1" />
      <div className="bd-orb-2" />

      <div className="bd-container">

        {/* ── Back ── */}
        <Link href="/briefs" className="bd-back" data-reveal>
          ← Industry Briefs
        </Link>

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <div className="bd-hero">
          <div className="bd-industry-badge" data-reveal>Automotive</div>
          <h1 className="bd-hero-h1" data-reveal data-delay="1">
            Dealer Network &amp;<br />Initiative Intelligence
          </h1>
          <p className="bd-hero-premise" data-reveal data-delay="2">
            Dealership networks don&apos;t suffer from a lack of information.
            They suffer from fragmented operational memory. Critical guidance
            lives in portals, inboxes, PDFs, calls, LMS systems, and the
            heads of experienced staff. Distribution does not guarantee
            absorption — and leadership often can&apos;t see which stores
            are truly acting on what has been pushed into the field.
          </p>

          <div className="bd-insight" data-reveal data-delay="3">
            <span className="bd-insight-label">Key Insight</span>
            <p className="bd-insight-text">
              Distribution does not guarantee absorption. The network
              knows what it received. It doesn&apos;t know what it understood
              — and leadership can&apos;t see the difference.
            </p>
          </div>
        </div>

        <hr className="bd-divider" />

        {/* ══ 01 — THE ENVIRONMENT ═══════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">01</span>
          <span className="bd-section-label">The Environment</span>
          <div className="bd-grid">
            <div>
              <h2 className="bd-section-h2" data-reveal>
                A dealership network is a<br />distributed execution machine.
              </h2>
              <p className="bd-lead" data-reveal data-delay="1">
                Every initiative, program, and standard flows from
                national to regional to store level. Very little flows
                back up cleanly.
              </p>
              <p className="bd-body" data-reveal data-delay="2">
                OEM programs, service retention standards, compliance
                requirements, training rollouts, warranty updates —
                all of it lands in portals, emails, PDFs, and LMS modules.
                The assumption is that distribution equals adoption.
                It doesn&apos;t.
              </p>
              <p className="bd-body" data-reveal data-delay="2">
                What actually happens: guidance gets interpreted differently
                across stores, high-value know-how stays in local practice,
                the same questions get asked over and over across the network,
                and when experienced staff leave, their operational
                intelligence leaves with them.
              </p>
              <p className="bd-body" data-reveal data-delay="2">
                The network becomes smarter as a network only when what
                works in one store can reach the others. Right now,
                it doesn&apos;t.
              </p>
            </div>
            <div data-reveal data-delay="2">
              {[
                {
                  label: 'Fragmented distribution',
                  value: 'Guidance lives across portals, inboxes, PDFs, LMS systems, and regional calls. Personnel need answers in the moment — not after navigating five disconnected systems.',
                },
                {
                  label: 'No absorption visibility',
                  value: 'Leadership can push an initiative into the field but can\'t see which stores are truly acting on it, which misunderstood it, and which are running a workaround.',
                },
                {
                  label: 'One-way flow',
                  value: 'Field realities, repeated questions, and local friction don\'t flow upward cleanly enough to become reusable institutional knowledge.',
                },
                {
                  label: 'Tribal knowledge risk',
                  value: 'High-value operational know-how stays trapped in local practice — and walks out the door when experienced managers and service staff leave.',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '16px 0',
                  borderBottom: i < 3 ? '1px solid var(--color-border-subtle)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-gold-dim)', marginBottom: '6px' }}>
                    {item.label}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-secondary)', margin: 0 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 02 — WHERE IT BREAKS ══════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">02</span>
          <span className="bd-section-label">Where It Breaks</span>
          <h2 className="bd-section-h2" data-reveal>
            The AI tools in market make<br />individuals faster.
          </h2>
          <p className="bd-lead" data-reveal data-delay="1">
            None of them make the network smarter.
          </p>

          <div data-reveal data-delay="2" style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-gold)' }}>
                  {['', 'Typical AI / Search Layer', 'LongStrider Intelligence Layer'].map((h, i) => (
                    <th key={i} style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontFamily: 'var(--font-ui)', fontSize: '10px',
                      letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: i === 2 ? 'var(--color-gold-dim)' : 'var(--color-text-muted)',
                      fontWeight: 400,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-body)', fontWeight: 500, whiteSpace: 'nowrap', width: '160px' }}>{row.category}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{row.typical}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{row.ls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══ 03 — THE ARCHITECTURE ═════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">03</span>
          <span className="bd-section-label">The Architecture</span>
          <div className="bd-grid">
            <div>
              <h2 className="bd-section-h2" data-reveal>
                Above the dealership stack.<br />Not in place of it.
              </h2>
              <p className="bd-body" data-reveal data-delay="1">
                LongStrider doesn&apos;t require the OEM or dealer network
                to replace portals, LMS systems, service guidance repositories,
                warranty systems, or regional reporting workflows.
                It becomes the persistent layer that connects them into
                usable operational memory.
              </p>
              <p className="bd-body" data-reveal data-delay="1">
                Knowledge is routed by role, permissions, store, region,
                and operational situation. A service advisor, technician,
                general manager, regional leader, and national operations
                leader don&apos;t need the same view. They each get
                what&apos;s useful in context — not what&apos;s merely available.
              </p>
              <p className="bd-body" data-reveal data-delay="1">
                When one store figures out a better way to implement
                a program, manage a repeated issue, or reduce confusion
                in service operations, LongStrider preserves that pattern
                and surfaces it elsewhere. The network becomes smarter
                as a network.
              </p>
            </div>
            <div data-reveal data-delay="2">
              <div className="bd-arch-card">
                <div className="bd-arch-layer tool-layer">
                  <span>National · Regional · Store Leadership</span>
                  <span className="bd-arch-label">Leadership Layer</span>
                </div>
                <div className="bd-arch-connector" />
                <div className="bd-arch-layer ls-layer">
                  <span>LongStrider Intelligence Layer</span>
                  <span className="bd-arch-label">Owned · Two-Way</span>
                </div>
                <div className="bd-arch-connector" />
                {[
                  'OEM Portal · LMS · Warranty Systems',
                  'Service Guidance · DMS · CRM',
                  'Communications Platforms · Regional Reporting',
                  'Field Staff · Service Advisors · GMs',
                ].map((layer, i) => (
                  <div key={i}>
                    {i > 0 && <div style={{ height: '2px' }} />}
                    <div className="bd-arch-layer tool-layer">
                      <span>{layer}</span>
                      <span className="bd-arch-label">Existing Stack</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginTop: '12px' }}>
                Unlike a one-way broadcast layer, LongStrider routes knowledge down to the right role and surfaces field intelligence back up to leadership simultaneously.
              </p>
            </div>
          </div>
        </section>

        {/* ══ 04 — WHAT CHANGES ═════════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">04</span>
          <span className="bd-section-label">What Changes</span>
          <h2 className="bd-section-h2" data-reveal>
            Every role gets the right view.<br />Leadership gets a living picture.
          </h2>
          <p className="bd-lead" data-reveal data-delay="1" style={{ marginBottom: '32px' }}>
            The same intelligence layer surfaces differently depending
            on who&apos;s asking and what they need to act on.
          </p>

          {/* Role table */}
          <div data-reveal data-delay="2" style={{ overflowX: 'auto', marginBottom: '56px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-gold)' }}>
                  {['Role', 'What LongStrider surfaces', 'Primary value'].map((h, i) => (
                    <th key={i} style={{
                      padding: '10px 14px', textAlign: 'left',
                      fontFamily: 'var(--font-ui)', fontSize: '9px',
                      letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: 'var(--color-text-muted)', fontWeight: 400,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROLES.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-subtle)', verticalAlign: 'top' }}>
                    <td style={{ padding: '14px', color: 'var(--color-gold-dim)', fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{row.role}</td>
                    <td style={{ padding: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{row.sees}</td>
                    <td style={{ padding: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Simulation */}
          <div data-reveal data-delay="2">
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '20px' }}>
              Initiative visibility — in practice
            </span>
            <div className="auto-simulation">
              <div className="auto-sim-context">
                Context: A new service-retention process has been launched
                across 18 dealerships. Some are adopting cleanly. Others
                are not. Regional leadership needs to know where adoption
                is real, where it&apos;s weak, and what confusion is repeating
                across stores.
              </div>
              {SIMULATION.map((turn, i) => (
                <div key={i} className={`auto-sim-turn auto-sim-turn--${turn.role}`}>
                  <div className="auto-sim-speaker">{turn.speaker}</div>
                  <p className="auto-sim-text">{turn.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 05 — WHAT THEY OWN ════════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">05</span>
          <span className="bd-section-label">What They Own</span>
          <h2 className="bd-section-h2" data-reveal>
            A living intelligence asset.<br />Not a reporting dashboard.
          </h2>
          <p className="bd-body" style={{ maxWidth: '640px' }} data-reveal data-delay="1">
            LongStrider deploys into the organization&apos;s environment.
            The intelligence it accumulates — initiative history, adoption
            patterns, field friction signals, best practices from high-performing
            stores — stays in the organization permanently. Not on a vendor&apos;s
            servers. Not tied to a platform subscription.
          </p>

          <div className="bd-sovereignty" data-reveal data-delay="2">
            <span className="bd-sovereignty-label">What the network permanently owns</span>
            <p className="bd-sovereignty-statement">
              &ldquo;Not a reporting tool that shows what happened.
              An intelligence layer that shows what&apos;s happening —
              and remembers everything the network learned about
              how to operate, permanently.&rdquo;
            </p>
            <ul className="bd-owns-list">
              {[
                'Network-wide initiative memory — what was launched, what landed, what didn\'t',
                'Recurring friction intelligence — where the same confusion appears across stores',
                'Role-governed knowledge routing — the right guidance to the right person at the right moment',
                'Best-practice capture — high-performing store patterns surfaced to the rest of the network',
                'Staffing concentration visibility — where initiative ownership is too narrow before it fails',
                'Full audit trail — every decision, every guidance update, every correction on record',
              ].map((item, i) => (
                <li key={i} className="bd-owns-item">{item}</li>
              ))}
            </ul>
          </div>

          {/* Additional use cases */}
          <div style={{ marginTop: '40px' }} data-reveal data-delay="2">
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '20px' }}>
              Additional deployment areas
            </span>
            <div className="bd-outcomes">
              {USE_CASES.map((uc, i) => (
                <div key={i} className="bd-outcome-card">
                  <span className="bd-outcome-title">{uc.title}</span>
                  <p className="bd-outcome-body">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="bd-divider" />

        {/* ══ CTA ═══════════════════════════════════════════════════ */}
        <div className="bd-cta-section" data-reveal>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3.5vw, 42px)',
            fontWeight: 300, letterSpacing: '-0.025em',
            color: 'var(--color-text-primary)',
            margin: '0 0 12px', lineHeight: 1.2,
          }}>
            Ready to build network intelligence<br />your organization actually owns?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '36px' }}>
            90-day pilot. Your environment. Your network intelligence stays yours.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pilot" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-body)', fontStyle: 'italic',
              fontSize: '16px', letterSpacing: '0.04em',
              color: 'var(--color-gold)', textDecoration: 'none',
              padding: '14px 44px',
              border: '1px solid var(--color-gold-border)',
              borderRadius: '100px',
              background: 'var(--color-gold-ghost)',
              transition: 'all 0.35s var(--ease-out)',
            }}>
              Start a Pilot →
            </Link>
            <Link href="/briefs" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-body)', fontSize: '14px', letterSpacing: '0.04em',
              color: 'var(--color-text-muted)', textDecoration: 'none',
              padding: '14px 28px',
              border: '1px solid var(--color-border)',
              borderRadius: '100px',
              transition: 'all 0.35s var(--ease-out)',
            }}>
              ← All Industry Briefs
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
