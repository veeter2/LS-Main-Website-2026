'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
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
  '/manifesto':           'The Manifesto',
  '/pilot':               'Start a Pilot',
  '/field-notes':         'Field Notes',
  '/technology':          'Technology',
  '/technology/kernel':   'Intelligence Kernel',
  '/technology/memory':  'Living Memory',
  '/contact':             'Contact',
  '/about':               'About',
  '/about-us':            'About',
  '/pricing':             'Pricing',
  '/be-a-vendor':         'Be a Vendor',
  '/case-studies':        'Case Studies',
  '/blog':                'Blog',
  '/vision':              'Vision',
  '/privacy':             'Privacy',
  '/terms':               'Terms',
  '/cookies':             'Cookies',
  '/help-center':         'Help Center',
  '/community':           'Community',
  '/patch-notes':         'Patch Notes',
  '/archive':             'Archive',
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
interface SubItem {
  label: string;
  href: string;
  live?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  sub: string;
  live: boolean;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  children?: SubItem[]; // presence = chevron + accordion
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Manifesto',
    href: '/manifesto',
    sub: 'The argument for sovereign intelligence',
    live: true,
    Icon: LivingMemoryV5,
  },
  {
    label: 'Technology',
    href: '/technology',
    sub: 'Architecture & how it works',
    live: true,
    Icon: GravityWellV3,
    children: [
      { label: 'Overview',                href: '/technology',           live: true },
      { label: 'The Intelligence Kernel', href: '/technology/kernel',    live: true },
      { label: 'Living Memory',           href: '/technology/memory',    live: true },
    ],
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
    sub: 'Proof of compounding in practice',
    live: false,
    Icon: MemoryArcV1,
    children: [
      { label: 'Legal',        href: '/case-studies/legal',       live: false },
      { label: 'Energy',       href: '/case-studies/energy',      live: false },
      { label: 'Power',        href: '/case-studies/power',       live: false },
      { label: 'Hospitality',  href: '/case-studies/hospitality', live: false },
    ],
  },
  {
    label: 'Field Notes',
    href: '/field-notes',
    sub: 'Research, intelligence logs & guides',
    live: true,
    Icon: InsightSparkV2,
    children: [
      { label: 'White Papers',       href: '/field-notes?category=white-papers',   live: true  },
      { label: 'Novel Thoughts',     href: '/field-notes?category=novel-thoughts', live: true  },
      { label: 'Guides',             href: '/field-notes?category=guides',         live: true  },
      { label: 'Intelligence Briefs',href: '/field-notes/briefs',                  live: false },
    ],
  },
  {
    label: 'About',
    href: '/about',
    sub: 'Founding story & team',
    live: false,
    Icon: ConvergenceV1,
    children: [
      { label: 'Our Mission',      href: '/about',        live: false },
      { label: 'The Team',         href: '/about/team',   live: false },
      { label: 'Vision & Roadmap', href: '/vision',       live: false },
    ],
  },
];




// ── Overlay nav row ───────────────────────────────────────────
function OverlayRow({
  item, isActive, coming, delay, menuOpen, onClose, expanded, onToggle,
}: {
  item: NavItem; isActive: boolean; coming: boolean; delay: number;
  menuOpen: boolean; onClose: () => void; expanded: boolean; onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.Icon;
  const hasChildren = !!item.children?.length;

  const rowColor = coming ? 'rgba(255,255,255,0.22)'
    : isActive ? GOLD
    : hovered ? 'rgba(255,255,255,0.95)'
    : 'rgba(255,255,255,0.68)';

  const iconColor = coming ? 'rgba(255,255,255,0.18)'
    : isActive || hovered ? GOLD
    : 'rgba(255,255,255,0.35)';

  const inner = (
    <div
      onMouseEnter={() => !coming && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (coming) return; if (hasChildren) onToggle(); }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '20px',
        padding: '20px 0',
        cursor: coming ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Icon — vertically centered to the label line */}
      <div style={{
        width: '26px', height: '26px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, color: iconColor, transition: 'color 0.3s ease',
        marginTop: '4px',
      }}>
        <Icon size={19} />
      </div>

      {/* Text — no flex:1, hugs the content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: 'clamp(20px, 2.6vw, 28px)',
            fontWeight: 400, letterSpacing: '-0.02em',
            color: rowColor, transition: 'color 0.3s ease',
            lineHeight: 1.15,
          }}>
            {item.label}
          </span>

          {/* Inline arrow/chevron — sits right after the label */}
          {!coming && (
            <span style={{
              fontSize: hasChildren ? '19px' : '15px',
              color: isActive || hovered ? GOLD : 'rgba(255,255,255,0.20)',
              transform: hasChildren
                ? (expanded ? 'rotate(90deg)' : 'rotate(0deg)')
                : (hovered ? 'translateX(4px)' : 'translateX(0)'),
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              display: 'inline-block',
              lineHeight: 1,
            }}>
              {hasChildren ? '›' : '→'}
            </span>
          )}

          {coming && (
            <span style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: '9px',
              letterSpacing: '0.14em', textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.16)',
            }}>— coming</span>
          )}
        </div>
        <p style={{
          fontFamily: "'Lora', Georgia, serif", fontSize: '12px',
          color: coming ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.28)',
          marginTop: '4px', letterSpacing: '0.01em',
          transition: 'color 0.3s ease',
        }}>
          {item.sub}
        </p>
      </div>
    </div>
  );

  // Sub-items accordion
  const subItems = (
    <div style={{
      overflow: 'hidden',
      maxHeight: expanded ? '300px' : '0',
      transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{
        paddingLeft: '46px', paddingBottom: '14px',
        display: 'flex', flexDirection: 'column', gap: '2px',
        position: 'relative',
      }}>
        {/* Purple connector thread — runs at icon-center column, fades out */}
        <div style={{
          position: 'absolute',
          left: '13px',
          top: 0,
          bottom: '14px',
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(139,92,246,0.38), rgba(139,92,246,0.0))',
          pointerEvents: 'none',
        }} />

        {item.children?.map((child) => (
          child.live !== false ? (
            <Link key={child.href} href={child.href} onClick={onClose} style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: '13px',
              color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
              padding: '6px 0', letterSpacing: '0.01em',
              transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '7px',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              {child.label} <span style={{ opacity: 0.35, fontSize: '11px' }}>→</span>
            </Link>
          ) : (
            <span key={child.href} style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: '13px',
              color: 'rgba(255,255,255,0.15)', padding: '6px 0',
              letterSpacing: '0.01em', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              {child.label} <span style={{ fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>— coming</span>
            </span>
          )
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      opacity: menuOpen ? 1 : 0,
      transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
      transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {coming || hasChildren ? inner : (
        <Link href={item.href} onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>
          {inner}
        </Link>
      )}
      {hasChildren && subItems}
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [beginHover, setBeginHover]   = useState(false);
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
          style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            textDecoration: 'none', overflow: 'visible',
          }}>
          {/* Logo mark — static, inert, full opacity always */}
          <div style={{
            position: 'relative',
            marginBottom: '-10px', paddingBottom: '10px',
            overflow: 'visible', flexShrink: 0,
          }}>
            <LongstriderLogo
              size={54}
              style={{
                opacity: 1,
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
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          padding: '96px 10vw 60px', overflowY: 'auto',
        }}
      >
        {/* Ambient orb */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,110,1), transparent 70%)',
          opacity: 0.018, filter: 'blur(120px)', pointerEvents: 'none',
        }} />

        {/* Nav rows — justified to top, no eyebrow */}
        <nav style={{ width: '100%' }}>
          {NAV_ITEMS.map((item, i) => (
            <OverlayRow
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              coming={!item.live}
              delay={80 + i * 55}
              menuOpen={menuOpen}
              onClose={() => { setMenuOpen(false); setExpandedItem(null); }}
              expanded={expandedItem === item.href}
              onToggle={() => setExpandedItem(expandedItem === item.href ? null : item.href)}
            />
          ))}
        </nav>

        {/* ── Start a Pilot CTA — gold, earned position ── */}
        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(200,169,110,0.10)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
          transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${80 + NAV_ITEMS.length * 55 + 80}ms`,
        }}>
          <Link
            href="/pilot"
            onClick={() => { setMenuOpen(false); setExpandedItem(null); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '15px', fontStyle: 'italic', letterSpacing: '0.04em',
              color: '#c8a96e', textDecoration: 'none',
              padding: '12px 28px',
              border: '1px solid rgba(200,169,110,0.35)',
              borderRadius: '100px',
              background: 'rgba(200,169,110,0.05)',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200,169,110,0.10)';
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(200,169,110,0.05)';
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)';
            }}
          >
            Start a Pilot →
          </Link>
        </div>

        {/* Footer — pinned to overlay bottom */}
        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <Footer />
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
