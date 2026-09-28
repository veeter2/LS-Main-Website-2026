"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { LongstriderLogo } from "@/components/longstrider-logo"

// Pages that exist link to themselves; the rest point at the homepage
// section that covers them until they are built.
const NAV = [
  { label: "Product", href: "/concepts/product" },
  { label: "How it works", href: "/concepts/how-it-works" },
  { label: "Security", href: "/concepts/security" },
  { label: "Research", href: "/concepts/home#asset" },
  { label: "Company", href: "/concepts/home#company" },
]

/**
 * Daylight concept shell. Sits over the site's dark chrome as its own scroll
 * container, so concept pages need no changes to the shared nav or footer.
 */
export function ConceptShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onScroll = () => setScrolled(root.scrollTop > 8)
    root.addEventListener("scroll", onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("deck-visible")
            io.unobserve(e.target)
          }
        }
      },
      { root, threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    const watch = () => root.querySelectorAll("[data-reveal]:not(.deck-visible)").forEach((el) => io.observe(el))
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      root.removeEventListener("scroll", onScroll)
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div className="lx" ref={rootRef} id="lx-root">
      <header className="lx-bar" data-scrolled={scrolled}>
        <div className="lx-wrap lx-bar-inner">
          <Link href="/concepts/home" className="lx-brand" aria-label="LongStrider home">
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
            <Link className="lx-btn lx-btn-ghost" href="/concepts/home#own">
              See it answer
            </Link>
            <a className="lx-btn lx-btn-primary" href="/pilot">
              <span className="lx-long">Book a working session</span>
              <span className="lx-short">Book a session</span>
              <span className="lx-arrow" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
