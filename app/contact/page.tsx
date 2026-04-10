'use client';

import { useState } from 'react';

const GOLD        = '#c8a96e';
const GOLD_DIM    = 'rgba(200,169,110,0.65)';
const GOLD_BORDER = 'rgba(200,169,110,0.30)';
const GOLD_GHOST  = 'rgba(200,169,110,0.07)';

const HS_PORTAL_ID = '243871028';
const HS_FORM_GUID = '6ccbf5d8-fae4-4ee4-8fe5-48f749d33905';
const HS_ENDPOINT  = `https://forms.hubspot.com/uploads/form/v2/${HS_PORTAL_ID}/${HS_FORM_GUID}`;

export default function ContactPage() {
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', company: '', broken: '' });
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [btnHover, setBtnHover] = useState(false);

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
        console.error('HubSpot error', res.status, await res.text());
        setStatus('error');
      }
    } catch (err) {
      console.error('Submit failed', err);
      setStatus('error');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden' }}>

      {/* ── Ambient orbs ── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '-200px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,1), transparent 70%)', opacity: 0.026, filter: 'blur(130px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-150px', width: '650px', height: '650px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,1), transparent 70%)', opacity: 0.020, filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', top: '35%', left: '35%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(164,195,255,1), transparent 70%)', opacity: 0.014, filter: 'blur(120px)' }} />
      </div>

      {/* ── SUCCESS STATE — full width, no left column ── */}
      {status === 'success' && (
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '600px', margin: '0 auto',
          padding: '140px 48px 100px',
          textAlign: 'center',
          animation: 'cReveal 0.9s var(--ease-out) both',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 300, fontStyle: 'italic', color: GOLD, marginBottom: '28px', lineHeight: 1.05 }}>
            Consider yourself known.
          </p>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: '16px' }}>
            You just took the first step toward an intelligence layer that compounds
            over time, stays in your hands, and gets smarter every day you use it.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '48px' }}>
            We'll be in touch within one business day. Adventure is close.
          </p>
          <a
            href="/manifesto"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-ui)', fontSize: '11px',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: GOLD_DIM, textDecoration: 'none',
              border: `1px solid ${GOLD_BORDER}`,
              borderRadius: '100px',
              padding: '13px 32px',
              transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD_DIM; e.currentTarget.style.background = GOLD_GHOST; }}
            onMouseLeave={e => { e.currentTarget.style.color = GOLD_DIM; e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.background = 'transparent'; }}
          >
            Explore the Manifesto →
          </a>
        </div>
      )}

      {/* ── TWO-COLUMN LAYOUT — form state ── */}
      {status !== 'success' && (
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1000px', margin: '0 auto',
          padding: '112px 48px 100px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '80px', alignItems: 'stretch',
        }}>

          {/* ── LEFT: Editorial ── */}
          <div style={{ animation: 'cReveal 0.9s var(--ease-out) both', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 3.8vw, 54px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--color-text-primary)', marginBottom: '28px' }}>
              Let us show you what{' '}
              <em style={{ fontStyle: 'italic', color: GOLD }}>living memory</em>{' '}
              looks like.
            </h1>

            <div style={{ width: '40px', height: '1px', background: `linear-gradient(to right, ${GOLD_BORDER}, transparent)`, marginBottom: '32px' }} />

            {/* Four pillars */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>
                Sovereign · Persistent · Compounding · Living Memory
              </p>
            </div>

            {/* Manifesto bridge */}
            <div style={{ marginBottom: '0' }}>
              <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>
                LongStrider is the layer that sits above your existing stack — synthesizing
                what every tool knows, accumulating what actually mattered, compounding it
                over time. It doesn't replace your tools. It's what makes them worth keeping.
              </p>
            </div>

            {/* Assumptive close */}
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 1.8vw, 24px)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.25,
              color: 'var(--color-text-primary)',
              borderTop: `1px solid ${GOLD_BORDER}`,
              paddingTop: '20px',
              marginTop: 'auto',
            }}>
              "You're not buying software. You're buying the head start we spent years building for you."
            </p>
          </div>

          {/* ── RIGHT: Form ── */}
          <div style={{ animation: 'cReveal 1s 150ms var(--ease-out) both' }}>
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--color-border-gold)',
                borderRadius: 'var(--card-radius)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                boxShadow: 'var(--glow-gold), var(--shadow-float)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="First Name" value={form.firstname} onChange={v => set('firstname', v)} required />
                <Field label="Last Name"  value={form.lastname}  onChange={v => set('lastname', v)}  required />
              </div>

              <Field label="Work Email" type="email" value={form.email} onChange={v => set('email', v)} required />
              <Field label="Company (optional)" value={form.company} onChange={v => set('company', v)} />

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                  What's your biggest frustration with AI today?
                </label>
                <textarea
                  rows={4}
                  value={form.broken}
                  onChange={e => set('broken', e.target.value)}
                  placeholder="Be honest. We've heard it all — and we built LongStrider because of it."
                  style={{
                    width: '100%', padding: '14px 18px',
                    borderRadius: 'calc(var(--card-radius) - 4px)',
                    fontSize: '15px', lineHeight: 1.65, resize: 'none', outline: 'none',
                    boxSizing: 'border-box',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-body)',
                    fontFamily: 'var(--font-body)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(200,169,110,0.07), 0 0 20px rgba(200,169,110,0.09)`; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  alignSelf: 'center',
                  padding: '13px 44px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '12px', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: btnHover ? GOLD : GOLD_DIM,
                  background: btnHover ? GOLD_GHOST : 'transparent',
                  border: `1px solid ${btnHover ? GOLD_DIM : GOLD_BORDER}`,
                  borderRadius: '100px',
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  opacity: status === 'submitting' ? 0.5 : 1,
                  transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                }}
              >
                {status === 'submitting' ? 'One moment…' : 'Start the Conversation'}
              </button>

              {status === 'error' && (
                <p style={{ fontSize: '13px', color: 'rgba(239,68,68,0.65)', textAlign: 'center', fontFamily: 'var(--font-ui)' }}>
                  Something went wrong —{' '}
                  <a href="mailto:hello@longstrider.ai" style={{ color: GOLD }}>hello@longstrider.ai</a>
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cReveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; gap: 48px !important; padding: 96px 24px 80px !important; }
        }
      `}</style>
    </main>
  );
}

function Field({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  const GOLD_BORDER = 'rgba(200,169,110,0.30)';
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '9px' }}>
        {label}
      </label>
      <input
        type={type} required={required} value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', padding: '13px 18px',
          borderRadius: '10px', fontSize: '15px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.88)',
          fontFamily: "'Lora', Georgia, serif",
          outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(200,169,110,0.07), 0 0 20px rgba(200,169,110,0.09)`; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
      />
    </div>
  );
}
