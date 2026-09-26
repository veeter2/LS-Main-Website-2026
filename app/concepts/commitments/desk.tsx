"use client"

import { useEffect, useState } from "react"

type Row = { id: string; from: string; to: string; what: string; when: string; state: "open" | "waiting" | "done" | "new" }

const START: Row[] = [
  { id: "terms", from: "You", to: "Alder", what: "Send revised terms", when: "Due Friday · from the 22 Sep call", state: "open" },
  { id: "legal", from: "Priya", to: "You", what: "Legal feedback on the renewal", when: "Waiting 3 days", state: "waiting" },
  { id: "board", from: "Sam", to: "Board", what: "Q4 plan, final draft", when: "Due in 6 days", state: "open" },
]

const ARRIVAL: Row = {
  id: "forecast",
  from: "You",
  to: "Finance",
  what: "Put the Q4 rate hold in the forecast",
  when: "Caught just now · from your chat",
  state: "new",
}

const OVERNIGHT = [
  "Merged 3 notes about Alder that said the same thing",
  "Flagged a conflict — two renewal dates were mentioned",
  "Moved the board pack up: due in 6 days",
]

export function Desk() {
  const [rows, setRows] = useState<Row[]>(START)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRows([{ ...START[0], state: "done", when: "Done · sent 9:14" }, ...START.slice(1), ARRIVAL])
      return
    }
    const timers = [
      setTimeout(() => setRows((r) => [...r, ARRIVAL]), 2200),
      setTimeout(
        () => setRows((r) => r.map((x) => (x.id === "terms" ? { ...x, state: "done", when: "Done · sent 9:14" } : x))),
        4600,
      ),
      setTimeout(() => setRows((r) => r.map((x) => (x.id === "forecast" ? { ...x, state: "open" } : x))), 6800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const open = rows.filter((r) => r.state !== "done").length

  return (
    <div className="dx-scene" aria-label="Example: a desk of commitments and an overnight note">
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
            <li key={r.id} className="dx-row" data-state={r.state}>
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
                <span className="dx-when">{r.when}</span>
              </div>
              {r.state === "waiting" && <span className="dx-tag">Waiting</span>}
              {r.state === "new" && <span className="dx-tag dx-tag-new">New</span>}
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
