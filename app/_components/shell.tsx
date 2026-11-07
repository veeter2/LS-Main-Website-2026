"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { LongstriderLogo } from "@/components/longstrider-logo"
import { SiteFooter } from "./site-footer"

const NAV = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Industries", href: "/industries" },
  { label: "Security", href: "/security" },
  { label: "Company", href: "/company" },
]

/**
 * Daylight concept shell. The page scrolls the document itself; the site's
 * dark nav, footer and ambient layer are hidden for the site in
 * concepts.css (keyed on #lx-root), so there is only ever one scroller.
 */
export function ConceptShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

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
            <LongstriderLogo size={30} className="lx-brand-mark" />
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
            <Link className="lx-btn lx-btn-ghost" href="/product">
              See it answer
            </Link>
            <Link className="lx-btn lx-btn-primary" href="/book">
              <span className="lx-long">Book a working session</span>
              <span className="lx-short">Book a session</span>
              <span className="lx-arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <SiteFooter />
    </div>
  )
}
