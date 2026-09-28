"use client"

import { useEffect, useState } from "react"

/**
 * The problem in one picture: the same things a team teaches AI land in two
 * places. On a rented platform they reset when the model changes; in
 * LongStrider they stay, with their sources, and belong to you.
 */

const ITEMS = [
  { text: "Alder: hold this year's rate through Q4", source: "Call · 11 Jun" },
  { text: "Priya owns the Alder renewal", source: "Email · 12 Jun" },
  { text: "Why we left the old supplier", source: "Retro · March" },
  { text: "Board pack is Sam's, due Friday", source: "Weekly review" },
  { text: "Brennan prefers a call to an email", source: "Call · 2 Sep" },
]

const STEP_MS = 850
const SWITCH_AT = ITEMS.length + 1 // step when the model changes
const LOOP_AT = SWITCH_AT + 7 // step when the story restarts

export function OwnershipBoard() {
  const [step, setStep] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReduced(r)
    if (r) return
    const t = setInterval(() => setStep((s) => (s + 1) % LOOP_AT), STEP_MS)
    return () => clearInterval(t)
  }, [])

  const s = reduced ? SWITCH_AT + 1 : step
  const shown = Math.min(ITEMS.length, s)
  const switched = s >= SWITCH_AT

  return (
    <div className="ob-board" aria-label="Illustration: what a team teaches AI, on a rented platform versus in LongStrider">
      <div className="ob-pane ob-rented" data-switched={switched}>
        <div className="ob-head">
          <span className="ob-title">On a rented platform</span>
          <span className="ob-sub">
            {/* The longer label stays underneath, invisibly, so the header keeps its height. */}
            <span>{switched ? "Back to zero" : "Theirs · resets when you switch"}</span>
            <span className="ob-ghost" aria-hidden>
              Theirs · resets when you switch
            </span>
          </span>
        </div>
        <ul className="ob-list">
          {ITEMS.map((it, i) => (
            <li key={it.text} className="ob-item" data-in={i < shown}>
              <span className="ob-text">{it.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ob-event" data-on={switched} aria-hidden={!switched}>
        <span>New model this quarter</span>
      </div>

      <div className="ob-pane ob-owned">
        <div className="ob-head">
          <span className="ob-title">In LongStrider</span>
          <span className="ob-sub ob-sub-owned">
            <span>{switched ? "Nothing lost" : "Yours · kept with its source"}</span>
            <span className="ob-ghost" aria-hidden>
              Yours · kept with its source
            </span>
          </span>
        </div>
        <ul className="ob-list">
          {ITEMS.map((it, i) => (
            <li key={it.text} className="ob-item" data-in={i < shown}>
              <span className="ob-text">{it.text}</span>
              <span className="ob-source">{it.source}</span>
            </li>
          ))}
        </ul>
        <div className="ob-foot">
          <span className="ob-count lx-num">{shown}</span> things your team taught it this week, still here next year
        </div>
      </div>
    </div>
  )
}
