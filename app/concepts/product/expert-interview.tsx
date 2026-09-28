"use client"

import { useEffect, useRef, useState } from "react"

const QUESTIONS = [
  { q: "Which renewals matter most this quarter?", a: "Alder and Brennan. Both over $400k." },
  { q: "What counts as “at risk” here?", a: "Any account that asks for a discount twice." },
  { q: "Who can agree to hold a rate?", a: "Priya, up to 10%. Above that, it comes to me." },
]

export function ExpertInterview() {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  // Questions arrive one at a time once the card is in view. Every row is
  // always rendered, so nothing below it moves as they appear.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(QUESTIONS.length + 1)
      return
    }
    let timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        timers = Array.from({ length: QUESTIONS.length + 1 }, (_, i) => setTimeout(() => setShown(i + 1), 600 + i * 1500))
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const done = shown > QUESTIONS.length

  return (
    <div className="ei lx-card" ref={ref} aria-label="Example: a renewals specialist interviewing you before it starts">
      <div className="ei-head">
        <div>
          <span className="ei-role">Renewals specialist</span>
          <span className="ei-sub">Hired this morning</span>
        </div>
        <span className="ei-step lx-num" data-done={done}>
          {done ? "Ready to start" : `Interview · ${Math.max(shown, 1)} of ${QUESTIONS.length}`}
        </span>
      </div>
      <ol className="ei-qs">
        {QUESTIONS.map((x, i) => (
          <li key={x.q} data-on={shown > i}>
            <span className="ei-q">{x.q}</span>
            <span className="ei-a">{x.a}</span>
          </li>
        ))}
      </ol>
      <p className="ei-foot" data-on={done}>
        Kept in the record — so it starts from <em>your</em> rules, not a generic playbook.
      </p>
    </div>
  )
}
