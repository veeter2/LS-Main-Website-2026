'use client';

import Link from 'next/link';

export default function BlogPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden', paddingTop: '72px' }}>

      {/* Ambient orb */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-150px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,1), transparent 70%)', opacity: 0.018, filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,1), transparent 70%)', opacity: 0.020, filter: 'blur(120px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', padding: '80px 10vw 120px' }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--color-gold-dim)',
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--color-gold-dim)' }} />
          Field Intelligence
        </p>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.08,
          color: 'var(--color-text-primary)', marginBottom: '24px',
        }}>
          The Blog
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(17px, 2vw, 20px)',
          lineHeight: 1.7, color: 'var(--color-text-secondary)',
          maxWidth: '520px', marginBottom: '52px',
        }}>
          Architecture insights, philosophical explorations, and dispatches from the frontier of sovereign intelligence.
        </p>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.25), transparent)', marginBottom: '52px' }} />

        {/* Coming soon card */}
        <div style={{
          padding: '36px 40px',
          border: '1px solid var(--color-border-gold)',
          borderRadius: 'var(--card-radius)',
          background: 'var(--color-gold-ghost)',
          marginBottom: '48px',
        }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--color-gold-dim)', marginBottom: '16px',
          }}>
            Coming Soon
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.72, color: 'var(--color-text-body)', margin: 0 }}>
            While we prepare our first articles, the Field Notes section carries
            our white papers, novel thoughts, and technical guides — the same thinking,
            published and available now.
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/field-notes" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontFamily: 'var(--font-body)', fontStyle: 'italic',
            fontSize: '15px', letterSpacing: '0.04em',
            color: 'var(--color-gold)', textDecoration: 'none',
            padding: '13px 40px',
            border: '1px solid var(--color-gold-border)',
            borderRadius: '100px',
            background: 'var(--color-gold-ghost)',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}>
            Read Field Notes →
          </Link>
          <Link href="/" style={{
            fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--color-text-muted)',
            textDecoration: 'none', transition: 'color 0.25s ease',
          }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
