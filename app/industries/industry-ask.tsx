"use client"

import { useState } from "react"

type Case = {
  id: string
  label: string
  who: string
  q: string
  a: string
  sources: string[]
  note?: string
}

const CASES: Case[] = [
  {
    id: "insurance",
    label: "Insurance",
    who: "Chief claims officer",
    q: "Have we seen an aggregation dispute like this before?",
    a: "Yes. A commercial property loss eighteen months ago turned on the same clause and settled below reserve once the earlier precedent was applied. The adjuster who handled it retired in March. Two current adjusters have similar files open: Okafor and Lindqvist.",
    sources: ["Claim notes", "Coverage memo", "Settlement email"],
    note: "all uploaded.",
  },
  {
    id: "legal",
    label: "Legal",
    who: "Managing partner",
    q: "How have we handled indemnity caps in tech licensing?",
    a: "Across 14 matters since 2022. The firm\u2019s position changed twice, most recently after an adverse arbitration last year, which now governs six of them. The partner who led it is on leave. Two associates worked it with her.",
    sources: ["Matter files", "Arbitration debrief", "Partner meeting notes"],
  },
  {
    id: "professional-services",
    label: "Professional services",
    who: "Head of delivery",
    q: "Which Thistlewood promises are still open?",
    a: "Three. The revised scope (yours, due Friday), the data room access (theirs, four days overdue), and the pricing memo (Dev\u2019s, confirmed Tuesday). The scope has been promised twice before.",
    sources: ["Chat, 14 Oct", "Chat, 29 Oct", "Call transcript, 3 Nov"],
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
                <span className="ia-sources-label">Sources:</span>
                {c.sources.map((s) => (
                  <span key={s} className="rx-source ia-source">
                    <span className="rx-source-kind">{s}</span>
                  </span>
                ))}
                {c.note && <span className="ia-sources-label">{c.note}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
