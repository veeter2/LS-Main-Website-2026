"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { SiteFooter } from "./site-footer"

const NAV = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Industries", href: "/industries" },
  { label: "Security", href: "/security" },
  { label: "Own it", href: "/own-it" },
  { label: "Company", href: "/company" },
]

/**
 * Daylight site shell. The page scrolls the document itself; site.css keys
 * the page ground on #lx-root, so there is only ever one scroller.
 */
export function ConceptShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // The phone menu closes when the page changes or Escape is pressed.
  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("deck-visible")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    const watch = () => root.querySelectorAll("[data-reveal]:not(.deck-visible)").forEach((el) => io.observe(el))
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div className="lx" ref={rootRef} id="lx-root">
      <header className="lx-bar" data-scrolled={scrolled}>
        <div className="lx-wrap lx-bar-inner">
          <Link href="/" className="lx-brand" aria-label="LongStrider home">
            <Image src="/longstrider-mark.png" alt="" width={56} height={68} priority className="lx-brand-mark" />
            <span className="lx-brand-word">LongStrider</span>
          </Link>
          <nav className="lx-links" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.label} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="lx-bar-cta">
            <Link className="lx-btn lx-btn-primary" href="/book">
              <span className="lx-long">Talk to us</span>
              <span className="lx-short">Talk to us</span>
              <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <button
              type="button"
              className="lx-menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="lx-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span aria-hidden />
              <span aria-hidden />
            </button>
          </div>
        </div>
        <nav id="lx-menu" className="lx-menu" aria-label="Pages" hidden={!menuOpen}>
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setMenuOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Link className="lx-btn lx-btn-primary" href="/book" onClick={() => setMenuOpen(false)}>
            Talk to us <span className="lx-arrow" aria-hidden>→</span>
          </Link>
        </nav>
      </header>
      {children}
      <SiteFooter />
    </div>
  )
}
