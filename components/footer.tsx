'use client';

import Link from 'next/link';
import { LongstriderLogo } from '@/components/longstrider-logo';
const GOLD_BORDER = 'rgba(200,169,110,0.10)';
const MUTED       = 'rgba(255,255,255,0.22)';
const MUTED_HOVER = 'rgba(255,255,255,0.45)';


const NAV_LINKS = [
  { label: 'Manifesto',       href: '/manifesto'  },
  { label: 'Technology',     href: '/technology' },
  { label: 'Industry Briefs', href: '/briefs'     },
  { label: 'Field Notes',    href: '/field-notes' },
  { label: 'About',          href: '/about'      },
];

const LEGAL_LINKS = [
  { label: 'Contact',  href: '/contact'  },
  { label: 'Privacy',  href: '/privacy'  },
  { label: 'Terms',    href: '/terms'    },
];

export function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg)',
      borderTop: `1px solid ${GOLD_BORDER}`,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        maxWidth: '1000px', margin: '0 auto',
        padding: '18px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '24px',
      }}>

        {/* Empty left spacer */}
        <div />

        {/* Nav links — truly centered */}
        <nav style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, href }, i, arr) => (
            <span key={href} style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href={href}
                style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.08em', color: MUTED, textDecoration: 'none', transition: 'color 0.2s ease', padding: '0 10px' }}
                onMouseEnter={e => (e.currentTarget.style.color = MUTED_HOVER)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
              >
                {label}
              </Link>
              {i < arr.length - 1 && <span style={{ color: 'rgba(200,169,110,0.2)', fontSize: '10px' }}>·</span>}
            </span>
          ))}
          {/* Divider */}
          <span style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.1)', margin: '0 10px' }} />
          {LEGAL_LINKS.map(({ label, href }, i, arr) => (
            <span key={href} style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href={href}
                style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: 'color 0.2s ease', padding: '0 10px' }}
                onMouseEnter={e => (e.currentTarget.style.color = MUTED)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
              >
                {label}
              </Link>
              {i < arr.length - 1 && <span style={{ color: 'rgba(200,169,110,0.2)', fontSize: '10px' }}>·</span>}
            </span>
          ))}
        </nav>

        {/* Copyright — hard right */}
        <p style={{ fontSize: '11px', color: MUTED, letterSpacing: '0.04em', whiteSpace: 'nowrap', textAlign: 'right' }}>
          © 2026 Longstrider, LLC
        </p>

      </div>
    </footer>
  );
}
