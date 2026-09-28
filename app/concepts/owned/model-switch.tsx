"use client"

import { useEffect, useState } from "react"

const MODELS = [
  {
    id: "claude",
    name: "Claude",
    maker: "Anthropic",
    answer: "Priya agreed on 11 June to hold this year’s rate through Q4, if Alder renews for two years.",
  },
  {
    id: "gpt",
    name: "GPT",
    maker: "OpenAI",
    answer: "On 11 June, Priya agreed Alder keeps this year’s rate through Q4, on the condition of a two-year renewal.",
  },
  {
    id: "private",
    name: "Private model",
    maker: "On your servers",
    answer: "11 June: rate held through Q4. Condition: two-year renewal. Agreed by Priya.",
  },
]

const MEMORY = [
  { kind: "Person", text: "Priya Shah: owns the Alder renewal" },
  { kind: "Decision", text: "Hold this year’s rate through Q4" },
  { kind: "Condition", text: "Two-year renewal" },
  { kind: "Source", text: "Call notes, 11 June · Email, 12 June" },
]

export function ModelSwitch() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setActive((i) => (i + 1) % MODELS.length), 4200)
    return () => clearInterval(t)
  }, [auto])

  const model = MODELS[active]

  return (
    <div className="ox-stack" aria-label="Example: switching models while memory stays the same">
      <div className="ox-layer ox-voice lx-card">
        <div className="ox-layer-head">
          <span className="ox-layer-label">The voice</span>
          <span className="ox-layer-sub">Rented · swappable</span>
        </div>
        <div className="ox-tabs" role="tablist" aria-label="Choose a model">
          {MODELS.map((m, i) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={i === active}
              className="ox-tab"
              onClick={() => {
                setActive(i)
                setAuto(false)
              }}
            >
              <span className="ox-tab-name">{m.name}</span>
              <span className="ox-tab-maker">{m.maker}</span>
            </button>
          ))}
          <span className="ox-tab-ink" style={{ transform: `translateX(${active * 100}%)` }} aria-hidden />
        </div>
        <p className="ox-answer" key={model.id} aria-live="polite">
          {model.answer}
        </p>
      </div>

      <div className="ox-bridge" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="ox-layer ox-memory">
        <div className="ox-layer-head">
          <span className="ox-layer-label">The memory</span>
          <span className="ox-layer-sub ox-owned">Yours · stays put</span>
        </div>
        <ul className="ox-rows">
          {MEMORY.map((r) => (
            <li key={r.kind}>
              <span className="ox-kind">{r.kind}</span>
              <span className="ox-text">{r.text}</span>
            </li>
          ))}
        </ul>
        <div className="ox-foot">
          <span className="ox-check" aria-hidden>✓</span>
          Same facts. Same sources. Nothing re-taught.
        </div>
      </div>

      <div className="ox-perimeter">Runs where you decide · your keys · each person&rsquo;s memory scoped to them</div>
    </div>
  )
}
