'use client';

import './labs.css';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

// ── Labs entry registry — add new entries here only ───────────────
// Single source of truth. Index page picks up automatically.

const ENTRIES = [
  {
    slug: 'beyond-retrieval',
    type: 'Benchmark Analysis',
    title: 'Beyond Retrieval',
    subtitle: 'Why Long-Term Memory Benchmarks Penalize Intelligence',
    abstract: 'LongStrider scored 46.8% on LongMemEval — below commercial baselines. This paper explains why that score understates real-world performance and proposes a new evaluation framework: Trust Accuracy.',
    author: 'Matt Veitch',
    date: 'March 2026',
    benchmark: 'LongMemEval',
    scoreLabel: 'LongMemEval',
    score: '46.8%',
    featured: true,
    live: true,
  },
] as const;

type EntryType = (typeof ENTRIES)[number]['type'];
const ALL_TYPES = ['All', ...Array.from(new Set(ENTRIES.map((e) => e.type)))] as string[];

// ── Page ──────────────────────────────────────────────────────────

export default function LabsIndexPage() {
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
    ? ENTRIES
    : ENTRIES.filter((e) => e.type === filter);

  return (
    <div className="lb-page">
      <div className="lb-orb-1" />
      <div className="lb-orb-2" />

      <div className="lb-container">

        {/* ══ HERO ══ */}
        <div className="lb-hero">
          <span className="lb-eyebrow" data-reveal>LongStrider Labs</span>
          <h1 className="lb-hero-h1" data-reveal data-delay="1">
            Empirical findings.<br />
            <em>Not press releases.</em>
          </h1>
          <p className="lb-hero-lead" data-reveal data-delay="2">
            Benchmarks, test runs, architecture experiments, and honest
            post-mortems. Labs is where we publish what we actually observe —
            including the results that don&apos;t flatter us.
          </p>
        </div>

        {/* ══ FILTER ══ */}
        {ALL_TYPES.length > 2 && (
          <div className="lb-filter-wrap" data-reveal>
            <span className="lb-filter-label">Filter by type</span>
            <div className="lb-filter-strip">
              {ALL_TYPES.map((t) => (
                <button
                  key={t}
                  className={`lb-filter-btn${filter === t ? ' active' : ''}`}
                  onClick={() => setFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══ ENTRY CARDS ══ */}
        <div className="lb-grid" data-reveal data-delay="1">
          {filtered.map((entry) =>
            entry.live ? (
              <Link
                key={entry.slug}
                href={`/labs/${entry.slug}`}
                className={`lb-card${entry.featured ? ' lb-card-featured' : ''}`}
              >
                <div className="lb-card-body">
                  <div className="lb-card-type">
                    <span className="lb-card-type-dot" />
                    {entry.type}
                  </div>
                  <h2 className="lb-card-title">{entry.title}</h2>
                  <p className="lb-card-subtitle">{entry.subtitle}</p>
                  <p className="lb-card-abstract">{entry.abstract}</p>
                  <div className="lb-card-meta">
                    <span>{entry.author}</span>
                    <span style={{ opacity: 0.3 }}>·</span>
                    <span>{entry.date}</span>
                    <span className="lb-card-cta">Read the paper →</span>
                  </div>
                </div>
                {entry.featured && (
                  <div className="lb-card-score">
                    <span className="lb-score-value">{entry.score}</span>
                    <span className="lb-score-label">Score</span>
                    <span className="lb-score-bench">{entry.scoreLabel}</span>
                  </div>
                )}
              </Link>
            ) : (
              <div
                key={entry.slug}
                className="lb-card"
                style={{ opacity: 0.4, cursor: 'default' }}
              >
                <div className="lb-card-type">
                  <span className="lb-card-type-dot" style={{ opacity: 0.3 }} />
                  {entry.type}
                </div>
                <h2 className="lb-card-title">{entry.title}</h2>
                <p className="lb-card-subtitle">{entry.subtitle}</p>
                <p className="lb-card-abstract">{entry.abstract}</p>
                <div className="lb-card-meta">
                  <span>{entry.author}</span>
                  <span style={{ opacity: 0.3 }}>·</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>— Coming</span>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
