'use client';

import Link from 'next/link';
import { LongstriderLogo } from '@/components/longstrider-logo';
import './footer.css';

// ── Single source of truth for footer links ───────────────────
// Update here — footer stays in sync automatically.

const FOOTER_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Manifesto',    href: '/manifesto'   },
      { label: 'Technology',   href: '/technology'  },
      { label: 'Agents',       href: '/agents'      },
      { label: 'Start a Pilot',href: '/pilot'       },
    ],
  },
  {
    heading: 'Industry',
    links: [
      { label: 'Insurance',         href: '/briefs/insurance'   },
      { label: 'Legal',             href: '/briefs/legal'       },
      { label: 'Automotive',        href: '/briefs/automotive'  },
      { label: 'All Briefs',        href: '/briefs'             },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Field Notes',    href: '/field-notes'                         },
      { label: 'White Papers',   href: '/field-notes?category=white-papers'   },
      { label: 'Novel Thoughts', href: '/field-notes?category=novel-thoughts' },
      { label: 'Partners',       href: '/partners'                            },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',    href: '/about'   },
      { label: 'Contact',  href: '/contact' },
      { label: 'Privacy',  href: '/privacy' },
      { label: 'Terms',    href: '/terms'   },
    ],
  },
];

export function Footer() {
  return (
    <footer className="ft-root">
      <div className="ft-inner">

        {/* ── Brand column ── */}
        <div className="ft-brand">
          <Link href="/" className="ft-logo-link">
            <LongstriderLogo className="ft-logo" />
          </Link>
          <p className="ft-tagline">
            Sovereign intelligence.<br />
            Permanently yours.
          </p>
          <p className="ft-sovereignty">
            100% On-Premises · LLM-Agnostic · Zero Telemetry
          </p>
        </div>

        {/* ── Nav columns ── */}
        {FOOTER_COLS.map((col) => (
          <div key={col.heading} className="ft-col">
            <span className="ft-col-heading">{col.heading}</span>
            <ul className="ft-col-list">
              {col.links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="ft-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <span className="ft-copyright">© {new Date().getFullYear()} Longstrider, LLC</span>
        <span className="ft-bottom-links">
          <Link href="/privacy" className="ft-bottom-link">Privacy</Link>
          <span className="ft-bottom-sep">·</span>
          <Link href="/terms" className="ft-bottom-link">Terms</Link>
          <span className="ft-bottom-sep">·</span>
          <Link href="/contact" className="ft-bottom-link">Contact</Link>
        </span>
      </div>
    </footer>
  );
}
