"use client"

import { useEffect, useState } from "react"

export type Chapter = { id: string; label: string }

/**
 * The Manifesto's reading aids: a thin progress line under the bar and a
 * chapter list that follows the reader. Both read the concept shell's own
 * scroll container, not the window.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const root = document.getElementById("lx-root")
    if (!root) return

    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight
      setProgress(max > 0 ? Math.min(root.scrollTop / max, 1) : 0)
    }
    onScroll()
    root.addEventListener("scroll", onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { root, rootMargin: "-30% 0px -60% 0px" },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })

    return () => {
      root.removeEventListener("scroll", onScroll)
      io.disconnect()
    }
  }, [chapters])

  return (
    <>
      <div className="mf-progress" aria-hidden>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav className="mf-rail" aria-label="Chapters">
        <ol>
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined}>
                <span className="mf-rail-n lx-num">{String(i + 1).padStart(2, "0")}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
