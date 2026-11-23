"use client"

import { useEffect, useRef, useState } from "react"

/**
 * The centerpiece of /own-it: the memory never moves, everything around it can.
 *
 * The record sits fixed at center. As the reader scrolls the figure through
 * the screen, the model slot swaps (frontier, open, your own) while answers
 * keep flowing into the record, then the host frame slides from our cloud
 * to your rack. The record does not flinch.
 *
 * Scroll-driven through one data-stage attribute (0 to 3); CSS transitions do
 * the motion. Pure SVG and CSS, no dependency. Under prefers-reduced-motion
 * the figure holds the final still.
 */

const STAGES = [
  { model: "Frontier model", line: "A frontier model answers through your own key." },
  { model: "Open model", line: "An open model answers. Same memory, nothing re-taught." },
  { model: "Your own model", line: "Your own model, on your own machine, answers." },
  { model: "Your own model", line: "Now it runs in your rack. The memory did not move." },
]

export function MemoryStays() {
  const ref = useRef<HTMLElement>(null)
  const [stage, setStage] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    if (mq.matches) {
      setStage(3)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        // 0 when the figure's top reaches the bottom of the screen, 1 when its bottom reaches the top.
        const p = (vh - r.top) / (vh + r.height)
        const s = p < 0.3 ? 0 : p < 0.45 ? 1 : p < 0.6 ? 2 : 3
        setStage(s)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const hosted = stage < 3
  const current = STAGES[stage]

  return (
    <figure ref={ref} className="lx-wrap ms-figure" data-stage={stage} data-reduced={reduced ? "true" : undefined} data-reveal>
      <svg viewBox="0 0 1400 640" role="img" aria-label="The memory stays fixed at center while the model beside it swaps and the host around it changes." className="ms-svg">
        <defs>
          <radialGradient id="ms-glow">
            <stop offset="0" stopColor="var(--lx-gold)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--lx-gold)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* the host frame: our cloud, then your rack */}
        <g className="ms-host">
          <rect className="ms-host-box" x="120" y="70" width="1160" height="500" rx="16" />
          <text className="ms-host-label ms-host-us" x="160" y="112">
            Hosted by us, isolated to you
          </text>
          <text className="ms-host-label ms-host-you" x="160" y="112">
            Your cloud, or your rack
          </text>
          {/* the building: appears when the host becomes yours */}
          <g className="ms-building">
            <path d="M 1120 120 h 120 v 60 h -120 z M 1140 140 h 20 v 12 h -20 z M 1180 140 h 20 v 12 h -20 z M 1140 160 h 20 v 12 h -20 z M 1180 160 h 20 v 12 h -20 z" />
          </g>
        </g>

        {/* the model slot: swaps while the record stays */}
        <g className="ms-slot" transform="translate(220 230)">
          <rect className="ms-slot-box" x="0" y="0" width="300" height="180" rx="12" />
          <text className="ms-slot-kicker" x="24" y="44">
            The model
          </text>
          {STAGES.slice(0, 3).map((s, i) => (
            <text key={s.model} className="ms-slot-name" data-i={i} x="24" y="104">
              {s.model}
            </text>
          ))}
          <text className="ms-slot-note" x="24" y="146">
            swappable, rented or yours
          </text>
          {/* a small hardware mark when the model is your own */}
          <g className="ms-chip">
            <rect x="236" y="22" width="40" height="28" rx="4" />
            <line x1="246" y1="50" x2="246" y2="58" />
            <line x1="256" y1="50" x2="256" y2="58" />
            <line x1="266" y1="50" x2="266" y2="58" />
          </g>
        </g>

        {/* answers flowing from the model into the record, and back out to people */}
        <path className="ms-flow" d="M 520 320 C 580 320, 600 320, 660 320" />
        <path className="ms-flow ms-flow-out" d="M 1060 320 C 1120 320, 1140 320, 1200 320" />

        {/* the record: fixed, never animated */}
        <g transform="translate(660 160)">
          <circle cx="200" cy="160" r="230" fill="url(#ms-glow)" />
          <rect className="ms-record-box" x="0" y="0" width="400" height="320" rx="14" />
          <text className="ms-record-kicker" x="28" y="46">
            The memory
          </text>
          <text className="ms-record-title" x="28" y="96">
            Your company&rsquo;s memory
          </text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(28 ${128 + i * 30})`}>
              <circle cx="4" cy="0" r="3.5" className="ms-dot" />
              <line x1="18" y1="0" x2={[300, 220, 260, 180, 290, 240][i]} y2="0" className="ms-line" />
            </g>
          ))}
          <text className="ms-record-foot" x="28" y="300">
            dated, sourced, in plain Postgres
          </text>
        </g>

        {/* people, answered */}
        <g className="ms-people" transform="translate(1200 250)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 0 + 20} ${i * 56})`}>
              <circle cx="0" cy="0" r="9" />
              <path d={`M -16 30 a 16 16 0 0 1 32 0`} />
            </g>
          ))}
        </g>
      </svg>
      <figcaption className="lx-illustrative ms-caption" aria-live="polite">
        {current.line}
      </figcaption>
    </figure>
  )
}
