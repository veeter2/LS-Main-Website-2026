const COOKIE_TYPES = [
  { name: 'Essential Cookies',  purpose: 'Required for the website to function properly', examples: ['Session management', 'Authentication', 'Security'], required: true },
  { name: 'Functional Cookies', purpose: 'Remember your preferences and settings', examples: ['Language preferences', 'Theme selection', 'UI customization'], required: false },
  { name: 'Analytics Cookies',  purpose: 'Help us understand how visitors use our website', examples: ['Page views', 'Navigation patterns', 'Error tracking'], required: false },
];

const BROWSERS = [
  { name: 'Chrome',  path: 'Settings → Privacy and security → Cookies and other site data' },
  { name: 'Firefox', path: 'Settings → Privacy & Security → Cookies and Site Data' },
  { name: 'Safari',  path: 'Preferences → Privacy → Manage Website Data' },
  { name: 'Edge',    path: 'Settings → Cookies and site permissions → Manage and delete cookies' },
];

const SECTIONS = [
  {
    title: 'What Are Cookies?',
    body: 'Cookies are small text files placed on your device when you visit a website. They help provide a better experience by remembering your preferences, keeping you logged in, and understanding how you use our service.',
  },
  {
    title: 'Third-Party Cookies',
    body: 'We may use third-party services that set cookies on your device:',
    list: ['Payment Processors: to securely process payments and subscriptions', 'Analytics Services: to understand how visitors use our website (only with your consent)', 'Content Delivery Networks: to deliver content quickly and reliably'],
    footer: 'These third parties have their own privacy policies. We recommend reviewing them.',
  },
  {
    title: 'Your Rights Under GDPR',
    body: 'If you are located in the European Economic Area (EEA), you have the right to: consent before non-essential cookies are placed, withdraw consent at any time through browser settings, request information about what cookies we use, and object to the use of cookies for specific purposes.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Cookie Policy from time to time. We will notify you of material changes by posting an updated policy with a new date, displaying a prominent notice on our website, and sending email notification for significant changes. Review this policy periodically to stay informed.',
  },
];

export default function CookiesPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '72px' }}>

      {/* Header */}
      <section style={{ padding: '80px 10vw 64px' }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          Legal · Last updated January 2025
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--color-text-primary)', marginBottom: '20px' }}>
          Cookie Policy
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: '560px' }}>
          We believe in minimal, transparent cookie usage that respects your privacy and gives you full control.
        </p>
      </section>

      {/* Principles */}
      <section style={{ padding: '0 10vw 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'var(--color-border)' }}>
          {[
            { title: 'Minimal Cookie Usage', body: 'We use only essential cookies necessary for the service to function. Your privacy is the priority.' },
            { title: 'Full Control',         body: 'You have complete control over cookie preferences. Manage or delete them at any time through your browser.' },
            { title: 'Transparent Tracking', body: 'We clearly disclose what cookies we use and why. No hidden tracking or covert data collection.' },
          ].map((p) => (
            <div key={p.title} style={{ background: 'var(--color-bg)', padding: '40px 32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '12px' }}>{p.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cookie types table */}
      <section style={{ padding: '0 10vw 64px' }}>
        <div style={{ maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 300, color: 'var(--color-text-primary)', marginBottom: '32px' }}>
            Types of Cookies We Use
          </h2>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {COOKIE_TYPES.map((t) => (
              <div key={t.name} style={{ borderBottom: '1px solid var(--color-border)', padding: '28px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{t.name}</h3>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: t.required ? 'var(--color-text-muted)' : 'var(--color-gold)',
                    border: t.required ? '1px solid var(--color-border)' : '1px solid var(--color-gold-border)',
                    borderRadius: '100px', padding: '3px 10px',
                  }}>
                    {t.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>{t.purpose}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {t.examples.map((ex) => (
                    <span key={ex} style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.04em', color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '3px 10px' }}>{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to manage */}
      <section style={{ padding: '0 10vw 64px' }}>
        <div style={{ maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 300, color: 'var(--color-text-primary)', marginBottom: '20px' }}>
            How to Manage Cookies
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            You have the right to decide whether to accept or reject cookies through your browser settings:
          </p>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {BROWSERS.map((b) => (
              <div key={b.name} style={{ borderBottom: '1px solid var(--color-border)', padding: '16px 0', display: 'flex', gap: '24px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', width: '80px', flexShrink: 0 }}>{b.name}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{b.path}</span>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: '2px solid rgba(255,200,0,0.3)', paddingLeft: '16px', marginTop: '24px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
              <strong style={{ color: 'var(--color-text-secondary)' }}>Note: </strong>
              If you disable essential cookies, some features may not function properly and you may be unable to log in.
            </p>
          </div>
        </div>
      </section>

      {/* Remaining sections */}
      <section style={{ padding: '0 10vw 120px' }}>
        <div style={{ maxWidth: '720px' }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px', paddingBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '16px' }}>{s.title}</h2>
              {s.body && <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: s.list ? '16px' : 0 }}>{s.body}</p>}
              {'list' in s && s.list && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {s.list.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-border)', flexShrink: 0, marginTop: '8px' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {'footer' in s && s.footer && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontStyle: 'italic', color: 'var(--color-text-muted)', marginTop: '12px' }}>{s.footer}</p>}
            </div>
          ))}

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '16px' }}>Cookie Questions</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-text-secondary)' }}>
              Email: <a href="mailto:privacy@longstrider.ai" style={{ color: 'var(--color-gold)', textDecoration: 'none', borderBottom: '1px solid var(--color-gold-border)' }}>privacy@longstrider.ai</a>
              {' '}· DPO: <a href="mailto:dpo@longstrider.ai" style={{ color: 'var(--color-gold)', textDecoration: 'none', borderBottom: '1px solid var(--color-gold-border)' }}>dpo@longstrider.ai</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
