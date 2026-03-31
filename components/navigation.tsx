'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LongstriderLogo } from '@/components/longstrider-logo';
import { LivingMemoryV5 } from '@/components/icons/living-memory';
import { InsightSparkV2 } from '@/components/icons/insight-spark';
import { CognitiveSynthesisV2 } from '@/components/icons/cognitive-synthesis';
import { GravityWellV3 } from '@/components/icons/gravity-well';
import { MemoryArcV1 } from '@/components/icons/memory-arc';
import { ConvergenceV1 } from '@/components/icons/convergence';

// ── Design tokens ─────────────────────────────────────────────
const GOLD        = '#c8a96e';
const GOLD_DIM    = 'rgba(200,169,110,0.6)';
const GOLD_BORDER = 'rgba(200,169,110,0.35)';

// ── Page display names (breadcrumb) ──────────────────────────
const PAGE_NAMES: Record<string, string> = {
  '/manifesto':    'The Manifesto',
  '/field-notes':  'Field Notes',
  '/technology':   'Technology',
  '/contact':      'Contact',
  '/about':        'About',
  '/about-us':     'About',
  '/pricing':      'Pricing',
  '/be-a-vendor':  'Be a Vendor',
  '/case-studies': 'Case Studies',
  '/blog':         'Blog',
  '/vision':       'Vision',
  '/privacy':      'Privacy',
  '/terms':        'Terms',
  '/cookies':      'Cookies',
  '/help-center':  'Help Center',
  '/community':    'Community',
  '/patch-notes':  'Patch Notes',
  '/archive':      'Archive',
};

// ── Section node types ────────────────────────────────────────
export interface SectionNode {
  id: string;
  label: string;
  color: string;
  glow: string;
}

// ── Section Context — lets pages register their nodes ─────────
interface SectionContextValue {
  sections: SectionNode[];
  setSections: (s: SectionNode[]) => void;
}
const SectionContext = createContext<SectionContextValue>({
  sections: [],
  setSections: () => {},
});

export function useSections(nodes: SectionNode[]) {
  const { setSections } = useContext(SectionContext);
  useEffect(() => {
    setSections(nodes);
    return () => setSections([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ── Nav items ─────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  sub: string;
  live: boolean;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Manifesto',    href: '/manifesto',    sub: 'The argument for sovereign intelligence',    live: true,  Icon: LivingMemoryV5     },
  { label: 'Field Notes',  href: '/field-notes',  sub: 'Research, intelligence logs & guides',       live: true,  Icon: InsightSparkV2     },
  { label: 'Technology',   href: '/technology',   sub: 'Architecture & how it works',               live: true,  Icon: GravityWellV3      },
  { label: 'Contact',      href: '/contact',      sub: 'Start a conversation',                       live: true,  Icon: CognitiveSynthesisV2 },
  { label: 'Case Studies', href: '/case-studies', sub: 'Proof of compounding in practice',           live: false, Icon: MemoryArcV1        },
  { label: 'About',        href: '/about',        sub: 'Founding story & team',                      live: false, Icon: ConvergenceV1      },
];


// ── Overlay nav row ───────────────────────────────────────────
function OverlayRow({
  item,
  isActive,
  coming,
  delay,
  menuOpen,
  onClose,
  pathname,
}: {
  item: NavItem;
  isActive: boolean;
  coming: boolean;
  delay: number;
  menuOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.Icon;

  const rowColor = coming
    ? 'rgba(255,255,255,0.22)'
    : isActive
      ? GOLD
      : hovered
        ? 'rgba(255,255,255,0.95)'
        : 'rgba(255,255,255,0.68)';

  const iconColor = coming
    ? 'rgba(255,255,255,0.18)'
    : isActive || hovered
      ? GOLD
      : 'rgba(255,255,255,0.35)';

  const inner = (
    <div
      onMouseEnter={() => !coming && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '24px 0',
        cursor: coming ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '36px', height: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        color: iconColor,
        transition: 'color 0.3s ease',
      }}>
        <Icon size={26} />
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
          <span style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: 'clamp(20px, 2.8vw, 30px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: rowColor,
            transition: 'color 0.3s ease',
          }}>
            {item.label}
          </span>
          {coming && (
            <span style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>
              — coming
            </span>
          )}
        </div>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '13px',
          color: coming ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.36)',
          marginTop: '3px',
          letterSpacing: '0.01em',
          transition: 'color 0.3s ease',
        }}>
          {item.sub}
        </p>
      </div>

      {/* Arrow */}
      {!coming && (
        <span style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '16px',
          color: isActive || hovered ? GOLD : 'rgba(255,255,255,0.15)',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'all 0.3s ease',
        }}>
          →
        </span>
      )}
    </div>
  );

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {coming ? inner : (
        <Link href={item.href} onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>
          {inner}
        </Link>
      )}
    </div>
  );
}

// ── Main Navigation ───────────────────────────────────────────
export function Navigation() {
  const pathname = usePathname();
  const [sections, setSections] = useState<SectionNode[]>([]);
  const [scrolled, setScrolled]       = useState(false);
  const [progress, setProgress]       = useState(0);
  const [entered, setEntered]         = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [beginHover, setBeginHover]   = useState(false);
  const [logoHover, setLogoHover]     = useState(false);
  const [showNodes, setShowNodes]     = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Entrance
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setShowNodes(y > 240);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(1, y / docH) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section observer
  useEffect(() => {
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.getAttribute('data-section') ?? '');
        });
      },
      { threshold: 0.15, rootMargin: '-20% 0px -60% 0px' }
    );
    document.querySelectorAll('[data-section]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isManifesto = pathname === '/manifesto';

  const activeIdx = sections.findIndex((s) => s.id === activeSection);

  return (
    <SectionContext.Provider value={{ sections, setSections }}>
      {/* ── Scroll progress thread ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        height: '1px',
        width: `${progress * 100}%`,
        background: 'linear-gradient(to right, rgba(200,169,110,0.9), rgba(164,195,255,0.7))',
        zIndex: 60,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }} />

      {/* ── Nav bar ── */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        overflow: 'visible',
        background: 'rgba(8,8,9,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.055)'
          : '1px solid rgba(255,255,255,0.018)',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease',
      }}>

        {/* ── Logo lockup ── */}
        <Link href="/" aria-label="LongStrider Home"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            textDecoration: 'none', overflow: 'visible',
          }}>
          {/* Logo mark — overflows nav boundary by 10px */}
          <div style={{
            position: 'relative',
            marginBottom: '-10px', paddingBottom: '10px',
            overflow: 'visible', flexShrink: 0,
          }}>
            <LongstriderLogo
              size={46}
              style={{
                filter: logoHover
                  ? 'brightness(0) invert(1) drop-shadow(0 0 16px rgba(200,169,110,0.30))'
                  : 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.10))',
                opacity: logoHover ? 1 : 0.88,
                transition: 'opacity 0.35s ease, filter 0.35s ease',
                display: 'block',
              }}
            />
          </div>

          {/* Wordmark + breadcrumb */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '15px', fontWeight: 500,
              letterSpacing: '0.09em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.95)', lineHeight: 1, whiteSpace: 'nowrap',
            }}>
              LongStrider
            </span>
            {/* Homepage: tagline in gold. Sub-pages: page name — always visible, always readable */}
            <span style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '10px', letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: pathname === '/' ? GOLD_DIM : GOLD,
              lineHeight: 1, whiteSpace: 'nowrap',
              opacity: pathname === '/' ? (scrolled ? 0.5 : 1) : 1,
              transition: 'opacity 0.4s ease, color 0.3s ease',
            }}>
              {pathname === '/'
                ? 'Sovereign Intelligence Layer'
                : PAGE_NAMES[pathname] ?? ''
              }
            </span>
          </div>
        </Link>

        {/* ── Begin — sole trigger, opens overlay ── */}
        <button
          id="nav-begin-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => setBeginHover(true)}
          onMouseLeave={() => setBeginHover(false)}
          aria-label={menuOpen ? 'Close menu' : 'Open navigation'}
          style={{
            position: 'relative',
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '13px', fontStyle: 'italic',
            letterSpacing: '0.08em',
            color: GOLD,
            background: 'none',
            cursor: 'pointer',
            padding: '9px 26px',
            border: `1px solid ${menuOpen || beginHover ? 'rgba(200,169,110,0.65)' : 'rgba(200,169,110,0.45)'}`,
            borderRadius: '100px',
            backgroundColor: menuOpen ? 'rgba(200,169,110,0.09)' : beginHover ? 'rgba(200,169,110,0.07)' : 'transparent',
            boxShadow: menuOpen
              ? '0 0 32px rgba(200,169,110,0.12), inset 0 0 16px rgba(200,169,110,0.04)'
              : beginHover
              ? '0 0 20px rgba(200,169,110,0.08), inset 0 0 10px rgba(200,169,110,0.03)'
              : 'none',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            overflow: 'hidden',
          }}
        >
          <span style={{
            position: 'absolute', top: 0,
            left: beginHover || menuOpen ? '110%' : '-110%',
            width: '100%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.14), transparent)',
            transition: 'left 0.6s ease',
            pointerEvents: 'none',
          }} />
          {pathname === '/' ? 'Begin' : 'Explore'}
        </button>

        <style>{`
          @media (max-width: 640px) {
            nav { padding: 0 24px !important; }
          }
        `}</style>
      </nav>

      {/* ── Full-screen overlay ── */}
      <div
        id="nav-overlay"
        style={{
          position: 'fixed', inset: 0,
          zIndex: 45,
          background: 'rgba(8,8,9,0.97)',
          backdropFilter: 'blur(24px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 10vw 60px',
        }}
      >
        {/* Ambient orb */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,110,1), transparent 70%)',
          opacity: 0.018, filter: 'blur(120px)', pointerEvents: 'none',
        }} />

        {/* Eyebrow */}
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(200,169,110,0.4)', marginBottom: '40px',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1) 80ms',
        }}>
          Navigate
        </p>

        {/* Nav rows */}
        <nav>
          {NAV_ITEMS.map((item, i) => (
            <OverlayRow
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              coming={!item.live}
              delay={100 + i * 65}
              menuOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* ── Conversion CTA ── */}
        <div style={{
          marginTop: '56px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
          transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${100 + NAV_ITEMS.length * 65 + 60}ms`,
        }}>
          <div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '13px',
              color: 'rgba(255,255,255,0.38)',
              letterSpacing: '0.02em',
              marginBottom: '4px',
            }}>
              Ready to make your intelligence sovereign?
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {[{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }].map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: '11px', letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.2)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '14px', fontStyle: 'italic',
              letterSpacing: '0.06em',
              color: '#c8a96e',
              textDecoration: 'none',
              padding: '12px 32px',
              border: '1px solid rgba(200,169,110,0.4)',
              borderRadius: '100px',
              background: 'rgba(200,169,110,0.06)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200,169,110,0.12)';
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(200,169,110,0.06)';
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)';
            }}
          >
            Start a conversation →
          </Link>
        </div>
      </div>

      {/* ── Left-rail section nodes ── */}
      {sections.length > 0 && (
        <div
          aria-hidden
          style={{
            position: 'fixed', left: '36px', top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
            opacity: showNodes && !menuOpen ? 1 : 0,
            pointerEvents: showNodes && !menuOpen ? 'auto' : 'none',
            transition: 'opacity 0.6s ease',
          }}
        >
          {sections.map((node, i) => {
            const isActive = node.id === activeSection;
            const isPassed = i < activeIdx;
            const isEarned = i <= activeIdx;
            return (
              <div
                key={node.id}
                onClick={() => {
                  if (!isEarned) return;
                  document.querySelector(`[data-section="${node.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '11px 0',
                  cursor: isEarned ? 'pointer' : 'default',
                  opacity: isEarned ? 1 : 0.22,
                  pointerEvents: isEarned ? 'auto' : 'none',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const label = e.currentTarget.querySelector('.node-label') as HTMLElement;
                  const dot   = e.currentTarget.querySelector('.node-dot') as HTMLElement;
                  if (label) { label.style.color = 'rgba(255,255,255,0.65)'; label.style.transform = 'translateX(0)'; }
                  if (dot && !isActive) { dot.style.background = node.color; dot.style.opacity = '0.55'; }
                }}
                onMouseLeave={(e) => {
                  const label = e.currentTarget.querySelector('.node-label') as HTMLElement;
                  const dot   = e.currentTarget.querySelector('.node-dot') as HTMLElement;
                  if (label) { label.style.color = 'rgba(255,255,255,0)'; label.style.transform = 'translateX(-4px)'; }
                  if (dot && !isActive) { dot.style.background = 'rgba(255,255,255,0.12)'; dot.style.opacity = '1'; }
                }}
              >
                <div className="node-dot" style={{
                  width: isActive ? '10px' : '8px',
                  height: isActive ? '10px' : '8px',
                  borderRadius: '50%',
                  background: isActive || isPassed ? node.color : 'rgba(255,255,255,0.12)',
                  border: `1px solid ${isActive ? node.color : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? `0 0 12px ${node.glow}` : 'none',
                  opacity: isPassed ? 0.45 : 1,
                  flexShrink: 0,
                  transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                }} />
                <span className="node-label" style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: '10px', letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0)',
                  whiteSpace: 'nowrap',
                  transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                  transition: 'color 0.35s ease, transform 0.35s ease',
                }}>
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </SectionContext.Provider>
  );
}
