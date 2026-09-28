"use client"

import { useState } from "react"

type Case = {
  id: string
  label: string
  who: string
  q: string
  a: string
  sources: string[]
}

const CASES: Case[] = [
  {
    id: "insurance",
    label: "Insurance",
    who: "Chief claims officer",
    q: "Have we seen an aggregation dispute like this before?",
    a: "Yes. A commercial property loss eighteen months ago turned on the same clause, and it settled below reserve once the earlier precedent was applied. The adjuster who handled it has retired, but two current adjusters have similar files open. Want me to brief them?",
    sources: ["Claim notes", "Coverage memo", "Settlement email"],
  },
  {
    id: "legal",
    label: "Legal",
    who: "Managing partner",
    q: "How have we handled indemnity in tech licensing matters?",
    a: "Across fourteen matters since 2022. The firm's position changed twice, most recently after an adverse arbitration last year, which now governs six of them. The partner who led it is on leave; two associates worked it with her.",
    sources: ["Matter files", "Arbitration debrief", "Partner meeting"],
  },
  {
    id: "automotive",
    label: "Automotive",
    who: "Regional director",
    q: "Where is the service-retention program stalling?",
    a: "Seven of eighteen stores have taken it up fully, six partly, five not yet. The same question about warranty add-ons keeps coming from eleven stores. The guidance is unclear, not ignored. One store has it working, and its approach could be shared.",
    sources: ["Field calls", "Store check-ins", "Program memo"],
  },
]

export function IndustryAsk() {
  const [active, setActive] = useState(0)

  return (
    <div className="ia lx-card" aria-label="Example questions from three industries">
      <div className="ox-tabs" role="tablist" aria-label="Industry">
        {CASES.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            id={`ia-tab-${c.id}`}
            aria-selected={i === active}
            aria-controls={`ia-panel-${c.id}`}
            className="ox-tab dm-tab"
            onClick={() => setActive(i)}
          >
            <span className="ox-tab-name">{c.label}</span>
          </button>
        ))}
        <span className="ox-tab-ink" style={{ transform: `translateX(${active * 100}%)` }} aria-hidden />
      </div>

      {/* All three answers share one cell, so switching never moves the page. */}
      <div className="ia-panels">
        {CASES.map((c, i) => (
          <div
            key={c.id}
            id={`ia-panel-${c.id}`}
            role="tabpanel"
            aria-labelledby={`ia-tab-${c.id}`}
            aria-hidden={i !== active}
            className="ia-panel"
            data-on={i === active}
          >
            <span className="rx-who">{c.who}</span>
            <p className="ia-q">{c.q}</p>
            <div className="ia-a">
              <span className="rx-who rx-who-ls">LongStrider</span>
              <p>{c.a}</p>
              <div className="ia-sources">
                {c.sources.map((s) => (
                  <span key={s} className="rx-source ia-source">
                    <span className="rx-source-kind">{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
