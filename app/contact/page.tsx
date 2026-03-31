'use client';

import { useState } from 'react';

const GOLD       = '#c8a96e';
const GOLD_LIGHT = '#d4b87c';

const HS_PORTAL_ID = '243871028';
const HS_FORM_GUID = '6ccbf5d8-fae4-4ee4-8fe5-48f749d33905';
const HS_ENDPOINT  = `https://forms.hubspot.com/uploads/form/v2/${HS_PORTAL_ID}/${HS_FORM_GUID}`;

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.88)',
} as const;

const inputFocus = (el: HTMLElement) => {
  el.style.borderColor = `${GOLD}70`;
  el.style.boxShadow   = `0 0 0 3px ${GOLD}12, 0 0 20px ${GOLD}14`;
};
const inputBlur = (el: HTMLElement) => {
  el.style.borderColor = 'rgba(255,255,255,0.12)';
  el.style.boxShadow   = 'none';
};

export default function ContactPage() {
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', company: '', broken: '' });
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    try {
      const params = new URLSearchParams();
      params.append('firstname', form.firstname);
      params.append('lastname',  form.lastname);
      params.append('email',     form.email.trim().toLowerCase());
      if (form.company) params.append('company', form.company);
      if (form.broken)  params.append('message', form.broken);
      params.append('hs_context', JSON.stringify({
        pageUri: 'https://longstrider.ai/contact',
        pageName: 'LongStrider — Start the Conversation',
      }));

      const res = await fetch(HS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (res.ok || res.status === 204 || res.status === 302) {
        setStatus('success');
      } else {
        const errBody = await res.text();
        console.error('HubSpot error', res.status, errBody);
        setStatus('error');
      }
    } catch (err) {
      console.error('Submit failed', err);
      setStatus('error');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#080809',
        fontFamily: "'Lora', Georgia, serif",
        paddingTop: '96px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          margin: '0 auto',
          padding: '0 24px',
          animation: 'contactReveal 0.9s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 300,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: 'rgba(255,255,255,0.97)',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Let us show you what{' '}
          <span style={{ color: GOLD }}>living memory</span> looks like.
        </h1>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ fontSize: '28px', fontWeight: 300, color: GOLD, marginBottom: '16px' }}>
              Consider yourself known.
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '8px' }}>
              We'll reach out within one business day to schedule your walkthrough.
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '40px' }}>
              LongStrider remembers the first time you reached out.
            </p>
            <a
              href="/"
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              ← Back to home
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: `0 0 60px rgba(200,169,110,0.05), inset 0 1px 0 rgba(255,255,255,0.05)`,
              borderRadius: '4px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="First Name" value={form.firstname} onChange={v => set('firstname', v)} required />
              <Field label="Last Name"  value={form.lastname}  onChange={v => set('lastname', v)}  required />
            </div>

            <Field label="Email" type="email" value={form.email} onChange={v => set('email', v)} required />
            <Field label="Company (optional)" value={form.company} onChange={v => set('company', v)} />

            {/* The one question */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                What's your biggest frustration with AI today?
              </label>
              <textarea
                rows={4}
                value={form.broken}
                onChange={e => set('broken', e.target.value)}
                placeholder="Be honest. We've heard it all — and we built LongStrider because of it."
                style={{
                  ...inputStyle,
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '2px',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onFocus={e => inputFocus(e.currentTarget)}
                onBlur={e => inputBlur(e.currentTarget)}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                backgroundColor: GOLD,
                color: '#0f172a',
                border: 'none',
                borderRadius: '2px',
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                opacity: status === 'submitting' ? 0.6 : 1,
                transition: 'background-color 0.2s ease, transform 0.15s ease, opacity 0.2s ease',
              }}
              onMouseEnter={e => { if (status !== 'submitting') e.currentTarget.style.backgroundColor = GOLD_LIGHT; }}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
            >
              {status === 'submitting' ? 'One moment…' : 'Start the Conversation'}
            </button>

            {status === 'error' && (
              <p style={{ fontSize: '13px', color: 'rgba(239,68,68,0.7)', textAlign: 'center' }}>
                Something went wrong — email us at{' '}
                <a href="mailto:hello@longstrider.ai" style={{ color: GOLD }}>hello@longstrider.ai</a>
              </p>
            )}
          </form>
        )}
      </div>

      <style>{`
        @keyframes contactReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

// ── Field component ─────────────────────────────────────────────────────────

function Field({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  const GOLD = '#c8a96e';
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '10px',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: '2px',
          fontSize: '14px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.88)',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = `${GOLD}70`; e.currentTarget.style.boxShadow = `0 0 0 3px ${GOLD}12, 0 0 20px ${GOLD}14`; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
      />
    </div>
  );
}
