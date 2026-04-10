import Link from 'next/link';

const SECTIONS = [
  {
    title: 'The One-to-One Relationship',
    body: 'The very nature of LongStrider is a one-to-one relationship between you and your intelligence layer. This architectural design ensures that your instance exists solely for your organization, all data remains private to your deployment, nothing is shared or aggregated across customers, and your relationship with your sovereign intelligence is completely isolated and secure.',
  },
  {
    title: 'Zero Access Architecture',
    lead: 'We do not store, access, review, or have any ability to access your data.',
    items: [
      { label: 'On-Premises Deployments', text: 'All data remains on your infrastructure. We have zero access to your conversations, institutional memory, or any information processed by your LongStrider instance.' },
      { label: 'Hosted Intelligence', text: 'Your data is stored in isolated, dedicated instances. Our infrastructure team cannot access the contents of your data.' },
      { label: 'Sovereign Build', text: 'You maintain complete ownership of your data and the compiled intelligence layer. No telemetry. No external calls.' },
    ],
  },
  {
    title: 'What We Collect',
    body: 'To provide our service, we collect minimal information necessary for account management and deployment coordination: email address for account communication, payment information (processed through third-party payment processors), and license and service status.',
    note: 'We do not collect the content of your interactions, institutional memory, documents, or any information processed within your LongStrider environment.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on our website and emailing your registered address. Continued use of LongStrider after changes constitutes acceptance of the updated policy.',
  },
  {
    title: 'Contact',
    body: null,
    contact: { email: 'privacy@longstrider.ai', label: 'Privacy inquiries' },
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden', paddingTop: '72px' }}>

      {/* Ambient */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-150px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,1), transparent 70%)', opacity: 0.016, filter: 'blur(120px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto', padding: '80px 10vw 120px' }}>

        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: '48px', transition: 'color 0.25s ease' }}>
          ← LongStrider
        </Link>

        {/* Hero */}
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-gold-dim)', marginBottom: '20px' }}>
          Legal · Last updated January 2025
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--color-text-primary)', marginBottom: '24px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.8vw, 19px)', lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: '540px', marginBottom: '64px' }}>
          Your data belongs to you. That isn't a policy statement — it's the architectural premise of everything we build.
        </p>

        {/* Principles strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--color-border-subtle)', marginBottom: '64px' }}>
          {[
            { label: 'Your Data', body: 'Belongs to you and you alone. We never claim rights to your content.' },
            { label: 'One-to-One', body: 'Your instance serves you exclusively. No data sharing across customers.' },
            { label: 'Zero Access', body: 'We cannot access your conversations, memory, or processed data.' },
          ].map((p) => (
            <div key={p.label} style={{ background: 'var(--color-bg)', padding: '28px 24px' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-gold-dim)', marginBottom: '10px' }}>{p.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.7, color: 'var(--color-text-secondary)', margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        {SECTIONS.map((s, i) => (
          <section key={i} style={{ paddingBottom: '52px', marginBottom: '52px', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', marginBottom: '20px' }}>
              {s.title}
            </h2>
            {'lead' in s && s.lead && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, lineHeight: 1.7, color: 'var(--color-text-body)', marginBottom: '16px' }}>
                {s.lead}
              </p>
            )}
            {s.body && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: s.note ? '16px' : 0 }}>
                {s.body}
              </p>
            )}
            {'items' in s && s.items && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {s.items.map((item) => (
                  <li key={item.label} style={{ paddingLeft: '20px', borderLeft: '2px solid var(--color-border-gold)' }}>
                    <strong style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-body)', display: 'block', marginBottom: '4px' }}>{item.label}</strong>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.note && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--color-text-muted)', marginTop: '16px', paddingLeft: '20px', borderLeft: '2px solid var(--color-border-subtle)' }}>
                {s.note}
              </p>
            )}
            {s.contact && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                {s.contact.label}:{' '}
                <a href={`mailto:${s.contact.email}`} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>{s.contact.email}</a>
              </p>
            )}
          </section>
        ))}

      </div>
    </main>
  );
}
