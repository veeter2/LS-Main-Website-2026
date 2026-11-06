"use client"

import { useState } from "react"

type Option = { id: string; label: string; status: string; body: string }

const OPTIONS: Option[] = [
  {
    id: "hosted",
    label: "Hosted",
    status: "Hosted, available now.",
    body: "Your company\u2019s instance, isolated to you by per-person and per-team access rules, verified on every read. No shared memory between customers. The fastest way to start.",
  },
  {
    id: "private",
    label: "Private cloud",
    status: "Private cloud, built with you.",
    body: "The engine inside your VPC, on your servers, inside your perimeter. Scoped and priced in the working session.",
  },
  {
    id: "onprem",
    label: "On-premises",
    status: "On-premises, built with you.",
    body: "A private model inside your walls. Today the filing lane can run on your own hardware. A full build with no calls out is a project we take on together, not a checkbox.",
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
