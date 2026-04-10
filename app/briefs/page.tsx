'use client';

import './briefs.css';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

// ── Brief registry — add new briefs here only ─────────────────────
// This is the single source of truth for all industry briefs.
// To add a new brief: add an entry here. The index page picks it up automatically.

const BRIEFS = [
  {
    slug: 'insurance',
    industry: 'Insurance',
    title: 'Claims Intelligence & Underwriting Memory',
    problem: 'Decades of adjuster judgment, edge-case precedent, and carrier-specific exception logic lives in people — and walks out the door when they leave.',
    keyInsight: 'Institutional knowledge is the real underwriting asset.',
    live: true,
  },
  {
    slug: 'legal',
    industry: 'Legal',
    title: 'Institutional Practice Intelligence',
    problem: 'Senior partner knowledge — the precedents, client nuances, and strategic patterns built over decades — resets every time someone leaves the firm.',
    keyInsight: 'Practice intelligence shouldn\'t retire when partners do.',
    live: true,
  },
  {
    slug: 'automotive',
    industry: 'Automotive',
    title: 'Dealer Network & Initiative Intelligence',
    problem: 'Critical guidance lives in portals, inboxes, PDFs, and LMS systems. Distribution doesn\'t guarantee absorption — and leadership can\'t see which stores are truly acting on what was pushed into the field.',
    keyInsight: 'Distribution does not guarantee absorption.',
    live: true,
  },
  {
    slug: 'healthcare',
    industry: 'Healthcare',
    title: 'Clinical Operations & Care-Path Intelligence',
    problem: 'Escalation paths, prior auth logic, care-path variation, and discharge coordination exist as tribal knowledge spread across shifts, departments, and systems.',
    keyInsight: 'Care continuity is a knowledge continuity problem.',
    live: false,
  },
  {
    slug: 'financial-services',
    industry: 'Financial Services',
    title: 'Relationship Memory & Compliance Intelligence',
    problem: 'Relationship context, credit exception logic, and compliance interpretation live in the heads of individual bankers — not in the institution.',
    keyInsight: 'The relationship IS the asset. It needs to compound.',
    live: false,
  },
  {
    slug: 'energy',
    industry: 'Energy & Utilities',
    title: 'Field Operations & Grid Knowledge Continuity',
    problem: 'Incident history, safety constraints, permit logic, and plant-specific operating reality live in veteran technicians — not in any system.',
    keyInsight: 'Operational memory is a safety issue, not just an efficiency one.',
    live: false,
  },
  {
    slug: 'manufacturing',
    industry: 'Manufacturing',
    title: 'Plant Operations & Tribal Knowledge Recovery',
    problem: 'Maintenance logic, escalation paths, supplier exceptions, and decades of plant-specific workarounds disappear when veteran operators retire.',
    keyInsight: 'The floor knows things the manual doesn\'t.',
    live: false,
  },
  {
    slug: 'life-sciences',
    industry: 'Life Sciences',
    title: 'Regulatory Intelligence & Scientific Knowledge Continuity',
    problem: 'Regulatory submission history, evidence positioning logic, and internal go/no-go rationale are fragmented across medical, regulatory, and commercial teams.',
    keyInsight: 'Institutional scientific judgment is the rarest resource in the pipeline.',
    live: false,
  },
] as const;

type BriefSlug = typeof BRIEFS[number]['slug'];

// ── Industries for filter (derived from registry) ─────────────────

const ALL_INDUSTRIES = ['All', ...Array.from(new Set(BRIEFS.map((b) => b.industry)))];

// ── Page ──────────────────────────────────────────────────────────

export default function BriefsIndexPage() {
  const [filter, setFilter] = useState('All');
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

  const filtered = filter === 'All'
    ? BRIEFS
    : BRIEFS.filter((b) => b.industry === filter);

  return (
    <div className="br-page">
      <div className="br-orb-1" />
      <div className="br-orb-2" />

      <div className="br-container">

        {/* ══ HERO ══ */}
        <div className="br-hero">
          <div className="br-eyebrow" data-reveal>Industry Briefs</div>
          <h1 className="br-hero-h1" data-reveal data-delay="1">
            Sovereign intelligence,<br />
            <em>deployed by industry.</em>
          </h1>
          <p className="br-hero-lead" data-reveal data-delay="2">
            Not case studies — these are deployment briefs. Each one maps
            a specific industry&apos;s knowledge failure to the LongStrider
            architecture that solves it. Pre-proposal precision before
            the first meeting.
          </p>
        </div>

        {/* ══ FILTER ══ */}
        <div className="br-filter-wrap" data-reveal>
          <span className="br-filter-label">Filter by industry</span>
          <div className="br-filter-strip">
            {ALL_INDUSTRIES.map((ind) => (
              <button
                key={ind}
                className={`br-filter-btn${filter === ind ? ' active' : ''}`}
                onClick={() => setFilter(ind)}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* ══ BRIEF CARDS ══ */}
        <div className="br-grid" data-reveal data-delay="1">
          {filtered.map((brief) => (
            brief.live ? (
              <Link
                key={brief.slug}
                href={`/briefs/${brief.slug}`}
                className="br-card"
              >
                <div className="br-card-industry">
                  <span className="br-card-dot" />
                  {brief.industry}
                </div>
                <h2 className="br-card-title">{brief.title}</h2>
                <p className="br-card-problem">{brief.problem}</p>
                <div className="br-card-cta">
                  Read the brief →
                </div>
              </Link>
            ) : (
              <div key={brief.slug} className="br-card" style={{ opacity: 0.4, cursor: 'default' }}>
                <div className="br-card-industry">
                  <span className="br-card-dot" style={{ opacity: 0.3 }} />
                  {brief.industry}
                </div>
                <h2 className="br-card-title">{brief.title}</h2>
                <p className="br-card-problem">{brief.problem}</p>
                <div className="br-card-cta" style={{ color: 'var(--color-text-muted)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>— Coming</span>
                </div>
              </div>
            )
          ))}
        </div>

        {/* ══ COMPETITIVE CALLOUT ══ */}
        <div className="br-competitive" data-reveal>
          <span className="br-competitive-label">Market Context</span>
          <p className="br-competitive-statement">
            The market doesn&apos;t lack AI tools. It lacks{' '}
            <strong>owned intelligence.</strong> There are memory products,
            agent frameworks, and copilots across every industry. What&apos;s
            rare is the combination:{' '}
            <strong>sovereignty, compounding memory, model-agnostic
            architecture, and an auditable intelligence layer the
            organization permanently owns.</strong> That&apos;s the gap
            every brief in this section addresses.
          </p>
        </div>

        {/* ══ CTA ══ */}
        <div className="br-cta-section" data-reveal>
          <h2 className="br-cta-heading">
            See it in your environment.<br />
            <span>Before anyone else does.</span>
          </h2>
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
        </div>

      </div>
    </div>
  );
}
