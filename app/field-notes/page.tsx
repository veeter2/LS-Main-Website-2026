'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'all',           label: 'All',          count: 6 },
  { id: 'white-papers',  label: 'White Papers',  count: 2 },
  { id: 'novel-thoughts',label: 'Novel Thoughts',count: 2 },
  { id: 'guides',        label: 'Guides',        count: 2 },
];

const CONTENT = [
  {
    id: 1, category: 'white-papers',
    title: 'Beyond Prompt Engineering: Why Architecture Beats Instruction',
    description: 'Why prompt engineering is a workaround for a missing layer. The case for sovereign, persistent intelligence substrate as the structural replacement for elaborate system prompts.',
    date: '2026-03-10', readTime: '12 min',
  },
  {
    id: 2, category: 'novel-thoughts',
    title: 'The Compounding Thesis: What Happens When Intelligence Never Forgets',
    description: 'Most AI resets. What does an organization look like after two years of continuous accumulation — where every decision, every correction, every pattern has been gravity-weighted and synthesized nightly?',
    date: '2026-02-28', readTime: '8 min',
  },
  {
    id: 3, category: 'guides',
    title: 'Deploying Sovereign Intelligence: Infrastructure Decisions That Matter',
    description: 'A technical guide to deploying LongStrider — from Postgres configuration and model selection to agent deployment and the first nightly synthesis cycle.',
    date: '2026-02-14', readTime: '15 min',
  },
  {
    id: 4, category: 'white-papers',
    title: 'Gravity Weighting and the Five-Axis Recall Problem',
    description: 'How LongStrider scores memories across semantic relevance, gravity weight, cluster membership, entity relationships, and temporal decay — and why retrieval without all five axes misses what actually matters.',
    date: '2026-01-22', readTime: '10 min',
  },
  {
    id: 5, category: 'novel-thoughts',
    title: 'The Institutional Knowledge Problem Is an Architecture Problem',
    description: 'Every organization loses decades of judgment when people leave. This is not a documentation problem or a culture problem. It is an architectural layer that was never built — until now.',
    date: '2026-01-08', readTime: '6 min',
  },
  {
    id: 6, category: 'guides',
    title: 'Running Your First Agent Constellation',
    description: 'How to configure, deploy, and govern the 13-agent fleet: R&D Oracle, Competitive Intelligence, Dream Compiler, and the agents that write back to your substrate every night.',
    date: '2025-12-15', readTime: '20 min',
  },
];

const CATEGORY_LABEL: Record<string, string> = {
  'white-papers':   'White Paper',
  'novel-thoughts': 'Novel Thought',
  'guides':         'Guide',
};

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function FieldNotesPage() {
  const [selected, setSelected] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = CONTENT.filter((item) => {
    const matchCat = selected === 'all' || item.category === selected;
    const q = query.toLowerCase();
    const matchQ = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <main style={{ minHeight: '100vh', paddingTop: '72px' }}>

      {/* Header */}
      <section style={{ padding: '80px 10vw 64px' }}>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-text-muted)', marginBottom: '24px',
        }}>
          Research & Intelligence
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300,
          letterSpacing: '-0.02em', lineHeight: 1.1,
          color: 'var(--color-text-primary)', marginBottom: '24px',
        }}>
          Field Notes
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.7,
          color: 'var(--color-text-secondary)', maxWidth: '560px',
        }}>
          Research findings, architectural insights, and explorations from the frontier of sovereign intelligence.
        </p>
      </section>

      {/* Filter + Search */}
      <section style={{ padding: '0 10vw 48px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '8px 18px', borderRadius: '100px',
                  border: selected === cat.id ? '1px solid var(--color-gold-border)' : '1px solid transparent',
                  background: selected === cat.id ? 'var(--color-gold-ghost)' : 'transparent',
                  color: selected === cat.id ? 'var(--color-gold)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
                <span style={{ marginLeft: '8px', opacity: 0.5, fontSize: '10px' }}>{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="search"
            placeholder="Search notes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '14px',
              color: 'var(--color-text-primary)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: '100px',
              padding: '8px 20px',
              width: '220px', outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
        </div>
      </section>

      {/* Content list */}
      <section style={{ padding: '0 10vw 120px' }}>
        {filtered.length === 0 ? (
          <div style={{ paddingTop: '80px', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '16px',
              fontStyle: 'italic', color: 'var(--color-text-muted)',
            }}>
              No notes match that search.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map((item, i) => (
              <article
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr auto',
                  gap: '32px',
                  alignItems: 'start',
                  padding: '40px 0',
                  borderBottom: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {/* Left: meta */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--color-gold)', marginBottom: '8px',
                    padding: '4px 10px',
                    border: '1px solid var(--color-gold-border)',
                    borderRadius: '100px', display: 'inline-block',
                  }}>
                    {CATEGORY_LABEL[item.category] ?? item.category}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.04em',
                    color: 'var(--color-text-muted)', marginTop: '10px',
                  }}>
                    {fmt(item.date)}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.04em',
                    color: 'var(--color-text-muted)', marginTop: '2px',
                  }}>
                    {item.readTime} read
                  </div>
                </div>

                {/* Center: content */}
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 400,
                    letterSpacing: '-0.01em', lineHeight: 1.25,
                    color: 'var(--color-text-primary)', marginBottom: '12px',
                  }}>
                    {item.title}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Right: arrow */}
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '16px',
                  color: 'var(--color-text-muted)', paddingTop: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}>
                  →
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
