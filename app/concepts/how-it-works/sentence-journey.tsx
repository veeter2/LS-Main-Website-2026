"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type Stage = { id: string; label: string; title: string; body: ReactNode }

// One sentence from one call, followed through every stage of the system.
const STAGES: Stage[] = [
  {
    id: "heard",
    label: "Heard",
    title: "It hears the work",
    body: (
      <>
        <p className="sj-quote">&ldquo;We can hold this year&rsquo;s rate through Q4, as long as it&rsquo;s a two-year renewal.&rdquo;</p>
        <div className="sj-meta">
          <span>Priya, to Dana at Alder</span>
          <span className="lx-num">Renewal call · 22 Sep</span>
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
        <li><span className="sj-kind">Offer</span>Priya will hold this year&rsquo;s rate for Alder</li>
        <li><span className="sj-kind">Until</span>The end of Q4</li>
        <li><span className="sj-kind">If</span>Alder signs a two-year renewal</li>
        <li><span className="sj-kind">Source</span>Renewal call, 22 Sep: who said it, to whom</li>
      </ul>
    ),
  },
  {
    id: "filed",
    label: "Filed",
    title: "It files and links them",
    body: (
      <ul className="sj-rows">
        <li><span className="sj-kind">Under</span>Alder · the renewal</li>
        <li><span className="sj-kind">Linked to</span>Pricing, now 14 conversations this year</li>
        <li><span className="sj-kind">A promise</span>Priya → Alder, due 31 Dec, on Priya&rsquo;s desk</li>
        <li><span className="sj-kind">Visible to</span>The Alder team and no one else</li>
      </ul>
    ),
  },
  {
    id: "night",
    label: "Overnight",
    title: "It tidies overnight",
    body: (
      <ul className="sj-rows">
        <li><span className="sj-kind">Merged</span>With the 11 June note that said the same thing</li>
        <li><span className="sj-kind">Flagged</span>An email on 24 Sep says &ldquo;one-year renewal&rdquo;, which conflicts</li>
        <li><span className="sj-kind">Raised</span>To Priya in her morning note, with both sources</li>
      </ul>
    ),
  },
  {
    id: "asked",
    label: "Asked",
    title: "Weeks later, someone asks",
    body: (
      <>
        <p className="sj-quote sj-ask">&ldquo;What did we agree on Alder&rsquo;s rate?&rdquo;</p>
        <ul className="sj-rows">
          <li><span className="sj-kind">Kind</span>A question about what was agreed, and when</li>
          <li><span className="sj-kind">Pulls</span>The offer, its condition, its date, and the open conflict</li>
        </ul>
      </>
    ),
  },
  {
    id: "answered",
    label: "Answered",
    title: "The model you choose writes the answer",
    body: (
      <>
        <p className="sj-answer">
          Priya agreed on <b>22 Sep</b> to hold this year&rsquo;s rate through Q4 if Alder signs for <b>two years</b>. One
          email on <b>24 Sep</b> says one year. That&rsquo;s still open with Priya.
        </p>
        <div className="sj-meta">
          <span>Call, 22 Sep · Email, 24 Sep</span>
          <span className="sj-stamp">Every claim sourced</span>
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
