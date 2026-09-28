"use client"

import { useEffect, useRef, useState } from "react"

type Row = { id: string; from: string; to: string; what: string; when: string; state: "open" | "waiting" | "done" | "new" | "pending" }

const START: Row[] = [
  { id: "terms", from: "You", to: "Alder", what: "Send revised terms", when: "Due Friday · from the 22 Sep call", state: "open" },
  { id: "legal", from: "Priya", to: "You", what: "Legal feedback on the renewal", when: "Waiting 3 days", state: "waiting" },
  { id: "board", from: "Sam", to: "Board", what: "Q4 plan, final draft", when: "Due in 6 days", state: "open" },
]

// The promise that arrives mid-story. Its row is laid out from the start
// (hidden) so its arrival never pushes the page below it down.
const ARRIVAL: Row = {
  id: "forecast",
  from: "You",
  to: "Finance",
  what: "Put the Q4 rate hold in the forecast",
  when: "Caught just now · from your chat",
  state: "pending",
}

// Each row's first note is its longest; it sits invisibly under the live
// note so a row never shrinks when "Due Friday…" becomes "Done · sent 9:14".
const FIRST_NOTE: Record<string, string> = Object.fromEntries([...START, ARRIVAL].map((r) => [r.id, r.when]))

const OVERNIGHT = [
  "Merged 3 notes about Alder that said the same thing",
  "Flagged a conflict — two renewal dates were mentioned",
  "Moved the board pack up: due in 6 days",
]

export function Desk() {
  const [rows, setRows] = useState<Row[]>([...START, ARRIVAL])
  const [seen, setSeen] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)

  // The desk's small story (a promise arrives, one gets done) plays when it
  // comes into view — further down a long page it would otherwise be over.
  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seen) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRows([{ ...START[0], state: "done", when: "Done · sent 9:14" }, ...START.slice(1), { ...ARRIVAL, state: "open" }])
      return
    }
    const timers = [
      setTimeout(() => setRows((r) => r.map((x) => (x.id === "forecast" ? { ...x, state: "new" } : x))), 2200),
      setTimeout(
        () => setRows((r) => r.map((x) => (x.id === "terms" ? { ...x, state: "done", when: "Done · sent 9:14" } : x))),
        4600,
      ),
      setTimeout(() => setRows((r) => r.map((x) => (x.id === "forecast" ? { ...x, state: "open" } : x))), 6800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [seen])

  const open = rows.filter((r) => r.state !== "done" && r.state !== "pending").length

  return (
    <div className="dx-scene" ref={sceneRef} aria-label="Example: a desk of commitments and an overnight note">
      <div className="dx-desk lx-card">
        <div className="dx-head">
          <div>
            <span className="dx-title">Your desk</span>
            <span className="dx-sub">Thursday morning</span>
          </div>
          <span className="dx-count lx-num">{open} open</span>
        </div>
        <ul className="dx-rows">
          {rows.map((r) => (
            <li key={r.id} className="dx-row" data-state={r.state} aria-hidden={r.state === "pending" || undefined}>
              <span className="dx-box" aria-hidden>
                <svg viewBox="0 0 16 16">
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
              </span>
              <div className="dx-body">
                <span className="dx-who">
                  {r.from} <span aria-hidden>→</span> {r.to}
                </span>
                <span className="dx-what">{r.what}</span>
                <span className="dx-when">
                  <span>{r.when}</span>
                  <span className="dx-when-ghost" aria-hidden>
                    {FIRST_NOTE[r.id]}
                  </span>
                </span>
              </div>
              {/* The tag slot is always there (empty ones hold the widest label,
                  invisibly), so a tag coming or going never re-wraps the row. */}
              {r.state === "waiting" ? (
                <span className="dx-tag">Waiting</span>
              ) : r.state === "new" ? (
                <span className="dx-tag dx-tag-new">New</span>
              ) : (
                <span className="dx-tag dx-tag-empty" aria-hidden>
                  Waiting
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <aside className="dx-night">
        <span className="dx-night-label">While you were away</span>
        <ul>
          {OVERNIGHT.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
