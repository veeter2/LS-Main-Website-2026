"use client"

import { useEffect, useState } from "react"

type Exchange = {
  q: string
  reading: string
  answer: React.ReactNode
  sources: { kind: string; date: string }[]
  stamp: { label: string; tone: "gold" | "quiet" }
}

const EXCHANGES: Exchange[] = [
  {
    q: "How many times has pricing come up with Alder, and when did it change?",
    reading: "Reading 14 conversations across 3 people",
    answer: (
      <>
        Pricing came up in <b className="lx-num">14</b> conversations between <b>3 Feb</b> and <b>22 Sep</b>. It changed
        on <b>11 June</b>: Priya agreed to hold this year&rsquo;s rate through Q4, on the condition of a two-year renewal.
      </>
    ),
    sources: [
      { kind: "Call notes", date: "11 Jun" },
      { kind: "Email thread", date: "12 Jun" },
      { kind: "Weekly review", date: "18 Jun" },
    ],
    stamp: { label: "Counted from the record", tone: "gold" },
  },
  {
    q: "Has Alder signed the renewal?",
    reading: "Checking every mention since 11 June",
    answer: (
      <>
        I don&rsquo;t have a record of that yet. The last mention is <b>22 Sep</b>: &ldquo;contract is with their legal
        team.&rdquo; I&rsquo;ll bring it up the moment it changes.
      </>
    ),
    sources: [{ kind: "Call notes", date: "22 Sep" }],
    stamp: { label: "Not enough to say yes", tone: "quiet" },
  },
]

// Phases per exchange: type the question, read, answer.
type Phase = "typing" | "reading" | "answered"

export function RecordDemo() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")
  const [typed, setTyped] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const current = EXCHANGES[index]

  useEffect(() => {
    if (reduced) return
    let t: ReturnType<typeof setTimeout>
    if (phase === "typing") {
      if (typed < current.q.length) {
        t = setTimeout(() => setTyped((n) => n + 1), 26 + Math.random() * 30)
      } else {
        t = setTimeout(() => setPhase("reading"), 420)
      }
    } else if (phase === "reading") {
      t = setTimeout(() => setPhase("answered"), 1500)
    } else {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % EXCHANGES.length)
        setTyped(0)
        setPhase("typing")
      }, 7200)
    }
    return () => clearTimeout(t)
  }, [phase, typed, current.q.length, reduced])

  // Reduced motion: show both exchanges, finished.
  const shown = reduced ? EXCHANGES : [current]

  return (
    <div className="rx-demo lx-card" id="see" aria-label="Example: asking LongStrider about an account">
      <div className="rx-demo-head">
        <span className="rx-dot" aria-hidden />
        <span>Ask LongStrider</span>
        <span className="rx-head-meta">Alder account · shared with Sales</span>
      </div>

      {shown.map((ex, i) => {
        const isLive = !reduced
        const qText = isLive ? ex.q.slice(0, typed) : ex.q
        const showReading = isLive ? phase !== "typing" : true
        const showAnswer = isLive ? phase === "answered" : true
        return (
          <div className="rx-exchange" key={ex.q} style={i > 0 ? { borderTop: "1px solid var(--lx-line-subtle)" } : undefined}>
            <div className="rx-q">
              <span className="rx-who">You</span>
              <p>
                {qText}
                {isLive && phase === "typing" && <span className="rx-caret" aria-hidden />}
              </p>
            </div>

            <div className="rx-reading" data-on={showReading && !showAnswer}>
              <span className="rx-pulse" aria-hidden />
              {ex.reading}
            </div>

            <div className="rx-a" data-on={showAnswer}>
              <span className="rx-who rx-who-ls">LongStrider</span>
              <p>{ex.answer}</p>
              <div className="rx-sources">
                {ex.sources.map((s, j) => (
                  <span className="rx-source" key={s.kind + s.date} style={{ transitionDelay: `${240 + j * 90}ms` }}>
                    <span className="rx-source-kind">{s.kind}</span>
                    <span className="rx-source-date lx-num">{s.date}</span>
                  </span>
                ))}
                <span className={`rx-stamp rx-stamp-${ex.stamp.tone}`}>{ex.stamp.label}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
