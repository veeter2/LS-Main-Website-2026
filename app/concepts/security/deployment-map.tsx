"use client"

import { useState } from "react"

type Block = { name: string; where: string }
type Option = {
  id: string
  label: string
  line: string
  inside: Block[]
  outside: Block[]
}

const OPTIONS: Option[] = [
  {
    id: "hosted",
    label: "Hosted",
    line: "The fastest start. You own the knowledge; we run the engine for you.",
    inside: [{ name: "Your company's memory", where: "Stays in your environment" }],
    outside: [
      { name: "The LongStrider engine", where: "A dedicated instance, isolated to you" },
      { name: "The model", where: "Your choice — through your own keys" },
    ],
  },
  {
    id: "private",
    label: "Private cloud",
    line: "Complete network control. The engine runs as software inside your own cloud.",
    inside: [
      { name: "Your company's memory", where: "In your cloud, your perimeter" },
      { name: "The LongStrider engine", where: "Containerised, in your VPC" },
    ],
    outside: [{ name: "The model", where: "Frontier through your keys — or bring a private one inside" }],
  },
  {
    id: "sovereign",
    label: "Sovereign build",
    line: "For the most sensitive environments. Built alongside your team, and everything belongs to you.",
    inside: [
      { name: "Your company's memory", where: "On your infrastructure" },
      { name: "The LongStrider engine", where: "Compiled and deployed in-house" },
      { name: "The model", where: "A private model on your hardware" },
    ],
    outside: [],
  },
]

export function DeploymentMap() {
  const [active, setActive] = useState(0)
  const opt = OPTIONS[active]

  return (
    <div className="dm lx-card" aria-label="Where each part of LongStrider runs, by deployment option">
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

      <div className="dm-zones" key={opt.id}>
        <div className="dm-zone dm-inside">
          <span className="dm-zone-label">Inside your perimeter</span>
          <ul>
            {opt.inside.map((b) => (
              <li key={b.name} className="dm-block">
                <span className="dm-block-name">{b.name}</span>
                <span className="dm-block-where">{b.where}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="dm-zone dm-outside">
          <span className="dm-zone-label">Outside it</span>
          {opt.outside.length ? (
            <ul>
              {opt.outside.map((b) => (
                <li key={b.name} className="dm-block dm-block-out">
                  <span className="dm-block-name">{b.name}</span>
                  <span className="dm-block-where">{b.where}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dm-nothing">Nothing. No calls out — air-gap capable.</p>
          )}
        </div>
      </div>
      <p className="dm-line" aria-live="polite">
        {opt.line}
      </p>
    </div>
  )
}
