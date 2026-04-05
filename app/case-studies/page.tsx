'use client';

import Link from 'next/link';

export default function CaseStudiesPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      padding: '0 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient orb */}
      <div style={{
        position: 'fixed',
        width: '600px', height: '600px',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, var(--color-gold), transparent 70%)',
        opacity: 0.012,
        filter: 'blur(120px)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      {/* Eyebrow */}
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-gold-dim)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{ display: 'block', width: '20px', height: '1px', background: 'var(--color-gold-dim)' }} />
        In Progress
        <span style={{ display: 'block', width: '20px', height: '1px', background: 'var(--color-gold-dim)' }} />
      </div>

      {/* Heading */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 5vw, 56px)',
        fontWeight: 300,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
        color: 'var(--color-text-primary)',
        margin: '0 0 20px',
        maxWidth: '600px',
      }}>
        Case Studies<br />
        <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>coming soon.</em>
      </h1>

      {/* Sub */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(15px, 1.6vw, 17px)',
        lineHeight: 1.7,
        color: 'var(--color-text-secondary)',
        maxWidth: '460px',
        margin: '0 0 48px',
      }}>
        Documented deployments are in progress. In the meantime, our
        Industry Briefs map exactly how LongStrider deploys across
        each vertical — with the same depth, less redaction.
      </p>

      {/* CTA */}
      <Link href="/briefs" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'var(--font-body)',
        fontStyle: 'italic',
        fontSize: '15px',
        letterSpacing: '0.04em',
        color: 'var(--color-gold)',
        textDecoration: 'none',
        padding: '13px 40px',
        border: '1px solid var(--color-gold-border)',
        borderRadius: '100px',
        background: 'var(--color-gold-ghost)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        marginBottom: '20px',
      }}>
        Read the Industry Briefs →
      </Link>

      <Link href="/" style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '12px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        textDecoration: 'none',
        transition: 'color 0.25s ease',
      }}>
        ← Back to home
      </Link>
    </div>
  );
}
