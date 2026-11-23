"use client"

import { useState } from "react"

type Option = { id: string; label: string; status: string; body: string }

const OPTIONS: Option[] = [
  {
    id: "private",
    label: "Your cloud",
    status: "Your cloud, available now.",
    body: "The engine in your own cloud account, walled off to your company, and every lookup checks who\u2019s asking. The fastest way to start.",
  },
  {
    id: "onprem",
    label: "On-premises",
    status: "On-premises, built with you.",
    body: "A private model inside your walls. Today chat and filing can run on your own hardware. A full build with no calls out is a project we take on together, not a checkbox.",
  },
]

export function DeploymentMap() {
  const [active, setActive] = useState(0)
  const opt = OPTIONS[active]

  return (
    <div className="dm lx-card" aria-label="Where LongStrider runs, by deployment option">
      <div className="dm-tabs ox-tabs" role="tablist" aria-label="Deployment option">
        {OPTIONS.map((o, i) => (
          <button
            key={o.id}
            role="tab"
            aria-selected={i === active}
            className="ox-tab dm-tab"
            onClick={() => setActive(i)}
          >
            <span className="ox-tab-name">{o.label}</span>
          </button>
        ))}
        <span className="ox-tab-ink" style={{ transform: `translateX(${active * 100}%)` }} aria-hidden />
      </div>
      <div key={opt.id} aria-live="polite">
        <p className="sec-map-status">{opt.status}</p>
        <p className="dm-line">{opt.body}</p>
      </div>
    </div>
  )
}
