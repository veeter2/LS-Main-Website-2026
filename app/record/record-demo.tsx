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
    q: "How many times has the Reyes closing date come up this month, and what\u2019s the latest?",
    reading: "Reading 9 conversations across 2 people",
    answer: (
      <>
        The Reyes closing date has come up <b className="lx-num">7 times</b> since <b>3 November</b>. You gave me two
        dates: <b>the 12th</b> on Monday, and <b>the 19th</b> yesterday, in a different thread. I&rsquo;ve flagged that
        as a conflict. Which one stands?
      </>
    ),
    sources: [
      { kind: "Chat", date: "3 Nov" },
      { kind: "Chat", date: "6 Nov" },
    ],
    stamp: { label: "Counted from the record", tone: "gold" },
  },
  {
    q: "Has the Reyes closing happened?",
    reading: "Checking every mention since 3 November",
    answer: (
      <>
        I don&rsquo;t have a record of that yet. The last mention is <b>7 Nov</b>: &ldquo;Legal pushed it to the
        19th.&rdquo; I&rsquo;ll bring it up the moment it changes.
      </>
    ),
    sources: [{ kind: "Chat", date: "7 Nov" }],
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
        t = setTimeout(() => setTyped((n) => n + 1), 40 + Math.random() * 40)
      } else {
        t = setTimeout(() => setPhase("reading"), 700)
      }
    } else if (phase === "reading") {
      t = setTimeout(() => setPhase("answered"), 2200)
    } else {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % EXCHANGES.length)
        setTyped(0)
        setPhase("typing")
      }, 14000) // the answer is about 45 words plus sources; reading it takes this long
    }
    return () => clearTimeout(t)
  }, [phase, typed, current.q.length, reduced])

  // Every exchange is laid out from the first frame and stacked in one cell,
  // so the card is always the height of its tallest exchange: typing, the
  // reading line and the answer only fade. Nothing below them ever moves.
  // Reduced motion lists both exchanges, finished.
  return (
    <div className="rx-demo lx-card" id="see" aria-label="Example: asking LongStrider about an account">
      <div className="rx-demo-head">
        <span className="rx-dot" aria-hidden />
        <span>Ask LongStrider</span>
        <span className="rx-head-meta">Reyes matter · shared with the deal team</span>
      </div>

      <div className={reduced ? "rx-list" : "rx-stage"}>
        {EXCHANGES.map((ex, i) => {
          const live = !reduced
          const active = reduced || i === index
          const qTyped = live ? (active ? ex.q.slice(0, typed) : "") : ex.q
          const showReading = live ? active && phase !== "typing" : false
          const showAnswer = live ? active && phase === "answered" : true
          return (
            <div className="rx-exchange" key={ex.q} data-active={active} aria-hidden={!active}>
              <div className="rx-q">
                <span className="rx-who">You</span>
                <p className="rx-q-text">
                  {/* the whole question, invisible, holds its final size */}
                  <span className="rx-q-ghost" aria-hidden>
                    {ex.q}
                  </span>
                  <span className="rx-q-typed">
                    {qTyped}
                    {live && active && phase === "typing" && <span className="rx-caret" aria-hidden />}
                  </span>
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
    </div>
  )
}
