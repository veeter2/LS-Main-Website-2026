export default function VisionPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '72px' }}>
      <section style={{ padding: '80px 10vw 48px' }}>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '24px',
        }}>
          Strategic Direction
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
        }}>
          Our Vision
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(16px, 2vw, 19px)',
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          maxWidth: '580px',
        }}>
          The philosophical foundations, ethical frameworks, and long-horizon thinking behind sovereign intelligence.
        </p>
      </section>

      <section style={{ padding: '0 10vw 120px' }}>
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '64px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px',
        }}>
          <div style={{
            width: '4px', height: '4px', borderRadius: '50%',
            background: 'var(--color-gold)',
            marginTop: '10px', flexShrink: 0,
          }} />
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 300,
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
            }}>
              Coming Soon
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
            }}>
              A comprehensive exploration of our position on the future of human–AI relationships, institutional
              sovereignty, and what it means to build intelligence that compounds rather than resets.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
