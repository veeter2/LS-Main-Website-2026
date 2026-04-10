import Link from 'next/link';

const SECTIONS = [
  {
    title: 'Agreement to Terms',
    body: 'By accessing or using LongStrider, you agree to be bound by these Terms of Service. These terms apply to all users, including individual users, business users, and enterprise customers. If you do not agree to these terms, you may not use our services.',
  },
  {
    title: 'User Responsibility and Liability',
    lead: 'You are solely responsible for how you use your LongStrider deployment and the content you create or process with it.',
    items: [
      { label: 'We are not responsible', text: 'for any content, decisions, actions, or outcomes resulting from your use of LongStrider.' },
      { label: 'You bear full responsibility', text: 'for ensuring your use complies with all applicable laws and regulations.' },
      { label: 'You are accountable', text: 'for any harm, damage, or legal issues arising from your use of the service.' },
      { label: 'You must verify', text: 'all information and outputs from your LongStrider before relying on them for important decisions.' },
    ],
    note: 'LongStrider is an AI system that may produce inaccurate or incomplete content. Exercise judgment and verify all outputs before use.',
  },
  {
    title: 'Acceptable Use',
    body: 'While we respect your operational autonomy, you agree not to use LongStrider to violate any applicable laws or regulations, infringe on intellectual property rights of others, harass, abuse, or harm others, distribute malware or malicious code, attempt unauthorized access to our systems, or interfere with or disrupt the service.',
  },
  {
    title: 'Intellectual Property',
    items: [
      { label: 'Your Content', text: 'You retain all rights to content you create, upload, or process using LongStrider. We do not claim ownership of your data, institutional memory, or outputs.' },
      { label: 'Our Technology', text: 'LongStrider — including its software, algorithms, architecture, and branding — is protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer our technology without explicit written permission.' },
      { label: 'License Grant', text: 'We grant you a limited, non-exclusive, non-transferable license to use LongStrider according to your service agreement for its duration.' },
    ],
  },
  {
    title: 'Service Availability',
    body: 'We strive to provide reliable service, but we do not guarantee uninterrupted or error-free service. We may modify, suspend, or discontinue features with reasonable notice. We reserve the right to update these terms with notice to users.',
  },
  {
    title: 'Disclaimers and Limitations of Liability',
    items: [
      { label: 'Service Provided "As Is"', text: 'LongStrider is provided without warranties of any kind, express or implied. We do not warrant that the service will meet your requirements or that outputs will be accurate, complete, or reliable.' },
      { label: 'Limitation of Liability', text: 'To the maximum extent permitted by law, LongStrider shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.' },
    ],
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by applicable law. Any disputes shall be resolved through binding arbitration, except where prohibited by law.',
  },
  {
    title: 'Contact',
    body: null,
    contact: { email: 'legal@longstrider.ai', label: 'Legal inquiries' },
  },
];

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.8vw, 19px)', lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: '540px', marginBottom: '64px' }}>
          Clear, transparent terms that respect your autonomy and establish the responsibilities of both parties.
        </p>

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
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
