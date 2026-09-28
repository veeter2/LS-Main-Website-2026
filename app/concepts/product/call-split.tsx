"use client"

import { useEffect, useRef, useState } from "react"

type Line = { who: string; before: string; mark: string; after: string }
type Kept = { kind: string; text: string; source: string }

// One call, four things worth keeping. Each marked phrase becomes one row.
const LINES: Line[] = [
  { who: "Dana, Alder", before: "The ", mark: "contract's with our legal team", after: " — back by mid-October." },
  { who: "Priya", before: "And ", mark: "the rate holds through Q4", after: ", as long as it's two years." },
  { who: "Dana, Alder", before: "", mark: "Send contract questions to me now", after: " — Marcus moved to procurement." },
  { who: "Dana, Alder", before: "Honestly, ", mark: "price is the whole conversation", after: " again this year." },
]

const KEPT: Kept[] = [
  { kind: "Fact", text: "Alder's contract is with their legal team, due back mid-October", source: "Renewal call · 22 Sep" },
  { kind: "Promise", text: "Priya → Alder: hold this year's rate through Q4, on a two-year renewal", source: "Due 31 Dec" },
  { kind: "Change", text: "Alder's contract contact is now Dana, not Marcus", source: "Replaces a fact from March" },
  { kind: "Pattern", text: "Pricing has come up in 14 conversations with Alder this year", source: "Since 3 Feb" },
]

export function CallSplit() {
  const [step, setStep] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(KEPT.length - 1)
      return
    }
    let timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        timers = KEPT.map((_, i) => setTimeout(() => setStep(i), 900 + i * 1300))
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="cs" ref={ref} aria-label="Example: one call, and the four things LongStrider keeps from it">
      <div className="cs-call lx-card">
        <div className="cs-head">
          <span className="rx-dot" aria-hidden />
          <span>Alder renewal call</span>
          <span className="cs-head-meta lx-num">22 Sep · 31 min</span>
        </div>
        <ul className="cs-lines">
          {LINES.map((l, i) => (
            <li key={l.mark} data-on={step >= i}>
              <span className="cs-who">{l.who}</span>
              <span className="cs-said">
                {l.before}
                <mark>{l.mark}</mark>
                {l.after}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="cs-kept">
        <span className="cs-kept-label">
          Kept <span className="lx-num">{Math.max(step + 1, 0)}</span> of {KEPT.length}
        </span>
        <ul>
          {KEPT.map((k, i) => (
            <li key={k.kind} className="cs-item" data-on={step >= i}>
              <span className="cs-kind">{k.kind}</span>
              <span className="cs-text">{k.text}</span>
              <span className="cs-source">{k.source}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
