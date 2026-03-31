"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LongstriderLogo } from "@/components/longstrider-logo"

const GOLD = "#c8a96e"
const GOLD_DIM = "rgba(200,169,110,0.6)"
const GOLD_BORDER = "rgba(200,169,110,0.35)"

export function Navigation() {
  const [scrolled, setScrolled]       = useState(false)
  const [progress, setProgress]       = useState(0)
  const [entered, setEntered]         = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [beginHover, setBeginHover]   = useState(false)
  const pathname = usePathname()

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120)
    return () => clearTimeout(t)
  }, [])

  // Scroll: collapsed state + progress thread
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? Math.min(1, y / docH) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* ── Scroll progress thread ── */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        height: "1px",
        width: `${progress * 100}%`,
        background: `linear-gradient(to right, rgba(200,169,110,0.9), rgba(164,195,255,0.7))`,
        zIndex: 60,
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }} />

      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          overflow: "visible",
          background: "rgba(8,8,9,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.055)"
            : "1px solid rgba(255,255,255,0.018)",
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease",
        }}
      >
        {/* ── Logo lockup — collapses on scroll ── */}
        <Link
          href="/"
          aria-label="LongStrider Home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            textDecoration: "none",
            overflow: "visible",
          }}
        >
          {/* Logo mark — overflows nav boundary by 10px */}
          <div style={{
            position: "relative",
            marginBottom: "-10px",
            paddingBottom: "10px",
            overflow: "visible",
            flexShrink: 0,
          }}>
            <LongstriderLogo
              size={48}
              style={{
                filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.10))",
                opacity: 0.90,
                transition: "opacity 0.3s ease, transform 0.3s ease",
                display: "block",
              }}
            />
          </div>

          {/* Wordmark + tagline — fades out when scrolled */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateX(-8px)" : "translateX(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: scrolled ? "none" : "auto",
          }}>
            <span style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}>
              LongStrider
            </span>
            <span style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "10px",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: GOLD_DIM,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}>
              Sovereign Intelligence Layer
            </span>
          </div>
        </Link>

        {/* ── Desktop links + CTA ── */}
        <div
          className="ls-nav-desktop"
          style={{ display: "flex", alignItems: "center", gap: "36px" }}
        >
          

          {/* "Begin" — aura pill CTA */}
          <Link
            href="/contact"
            onMouseEnter={() => setBeginHover(true)}
            onMouseLeave={() => setBeginHover(false)}
            style={{
              position: "relative",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "13px",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              color: beginHover ? "rgba(200,169,110,0.95)" : GOLD,
              textDecoration: "none",
              padding: "8px 24px",
              border: `1px solid ${beginHover ? "rgba(200,169,110,0.55)" : GOLD_BORDER}`,
              borderRadius: "100px",
              background: beginHover ? "rgba(200,169,110,0.07)" : "transparent",
              boxShadow: beginHover ? "0 0 24px rgba(200,169,110,0.08), inset 0 0 12px rgba(200,169,110,0.03)" : "none",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              overflow: "hidden",
            }}
          >
            {/* Shimmer sweep */}
            <span style={{
              position: "absolute",
              top: 0, left: beginHover ? "110%" : "-110%",
              width: "100%", height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.12), transparent)",
              transition: "left 0.55s ease",
              pointerEvents: "none",
            }} />
            Begin
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="ls-nav-mobile-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.55)",
            fontSize: "20px",
            padding: "8px",
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div style={{
            position: "absolute",
            top: "72px", left: 0, right: 0,
            background: "rgba(8,8,9,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.055)",
            padding: "28px 32px 36px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}>
            {NAV_LINKS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "20px",
                  color: "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "15px",
                fontStyle: "italic",
                color: GOLD,
                textDecoration: "none",
                marginTop: "4px",
              }}
            >
              Begin →
            </Link>
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .ls-nav-desktop { display: none !important; }
            .ls-nav-mobile-btn { display: flex !important; }
          }
        `}</style>
      </nav>
    </>
  )
}
