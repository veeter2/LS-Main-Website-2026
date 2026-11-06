"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type Stage = { id: string; label: string; title: string; body: ReactNode }

// One sentence from one chat, followed through every stage of the system.
const STAGES: Stage[] = [
  {
    id: "heard",
    label: "Heard",
    title: "It hears the work",
    body: (
      <>
        <p className="sj-quote">&ldquo;Reyes closing is the 12th.&rdquo;</p>
        <div className="sj-meta">
          <span>Kayla, partner, in chat</span>
          <span className="lx-num">Monday 3 November</span>
        </div>
      </>
    ),
  },
  {
    id: "split",
    label: "Split",
    title: "It breaks it into facts",
    body: (
      <ul className="sj-rows">
        <li><span className="sj-kind">Matter</span>Reyes</li>
        <li><span className="sj-kind">Event</span>Closing</li>
        <li><span className="sj-kind">Date</span>12 November</li>
        <li><span className="sj-kind">Source</span>Kayla, chat, 3 Nov, 09:40</li>
      </ul>
    ),
  },
  {
    id: "filed",
    label: "Filed",
    title: "It files and links them",
    body: (
      <ul className="sj-rows">
        <li><span className="sj-kind">Under</span>Reyes</li>
        <li><span className="sj-kind">Linked to</span>The two earlier notes on the same closing</li>
        <li><span className="sj-kind">Visible to</span>The Reyes team and nobody else</li>
      </ul>
    ),
  },
  {
    id: "second",
    label: "Thursday",
    title: "Thursday, a second date",
    body: (
      <>
        <p className="sj-quote">&ldquo;Reyes signs on the 19th.&rdquo;</p>
        <div className="sj-meta">
          <span>Same partner, different thread</span>
          <span>Filed the same way</span>
        </div>
      </>
    ),
  },
  {
    id: "night",
    label: "Overnight",
    title: "Overnight",
    body: (
      <ul className="sj-rows">
        <li><span className="sj-kind">Why it runs</span>Something new landed</li>
        <li><span className="sj-kind">Reads</span>The Reyes drawer</li>
        <li><span className="sj-kind">Links</span>The two dates as a contradiction, with the reason: same matter, two completion dates</li>
        <li><span className="sj-kind">Run ID</span>The link carries it, so it can be found and undone</li>
      </ul>
    ),
  },
  {
    id: "asked",
    label: "Friday",
    title: "Friday, she asks",
    body: (
      <>
        <p className="sj-quote sj-ask">&ldquo;Where are we on Reyes?&rdquo;</p>
        <p className="sj-answer">
          The model you chose writes the answer from what it&rsquo;s handed: <b>both dates</b>, <b>both sources</b>, and
          the open question. She picks one. Her answer becomes a correction, the older date is marked replaced, and the
          morning count goes up by one.
        </p>
        <div className="sj-meta">
          <span>Chat, 3 Nov · Chat, 6 Nov</span>
          <span className="sj-stamp">History kept</span>
        </div>
      </>
    ),
  },
]

const STEP_MS = 4200

export function SentenceJourney() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false)
      return
    }
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Walk the stages on its own until someone picks one.
  useEffect(() => {
    if (!auto || !seen) return
    const t = setTimeout(() => setActive((a) => (a + 1) % STAGES.length), STEP_MS)
    return () => clearTimeout(t)
  }, [active, auto, seen])

  const pick = (i: number) => {
    setAuto(false)
    setActive(i)
  }

  return (
    <div className="sj lx-card" ref={ref} aria-label="Example: one sentence followed through LongStrider">
      <div className="sj-steps" role="tablist" aria-label="Stage">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            id={`sj-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls={`sj-panel-${s.id}`}
            className="sj-step"
            data-done={i < active}
            onClick={() => pick(i)}
          >
            <span className="sj-dot lx-num" aria-hidden>
              {i + 1}
            </span>
            <span className="sj-label">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Every panel is laid out in the same cell, so the card is always as
          tall as its tallest stage and nothing below it moves. */}
      <div className="sj-panels">
        {STAGES.map((s, i) => (
          <div
            key={s.id}
            id={`sj-panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`sj-tab-${s.id}`}
            className="sj-panel"
            data-on={i === active}
            aria-hidden={i !== active}
          >
            <span className="sj-title">
              <span className="lx-num">{String(i + 1).padStart(2, "0")}</span> {s.title}
            </span>
            {s.body}
          </div>
        ))}
      </div>

      <div className="sj-progress" aria-hidden>
        <span key={`${active}-${auto && seen}`} data-run={auto && seen} />
      </div>
    </div>
  )
}
