"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { PROMPTS } from "@/lib/for-your-ai"

/**
 * "Don't take our word for it. Ask your own AI." Three prompts, one Copy
 * button. Copying sends one anonymous tick to /api/tick (a counter, not a
 * tracker: no cookie, no identity). The prompt text is static on the page so
 * it works, and can be selected by hand, without JavaScript.
 */
export function AskYourAI({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const prompt = PROMPTS[active]

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  async function copy() {
    const text = prompt.text
    let ok = false
    try {
      await navigator.clipboard.writeText(text)
      ok = true
    } catch {
      // Older browsers: select the visible text so a manual copy works.
      const pre = preRef.current
      if (pre) {
        const range = document.createRange()
        range.selectNodeContents(pre)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
        try { ok = document.execCommand("copy") } catch { ok = false }
      }
    }
    if (!ok) return
    setCopied(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
    try {
      fetch("/api/tick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: `ask-${prompt.id}` }),
        keepalive: true,
      }).catch(() => undefined)
    } catch {
      // The count is a nicety. Never let it touch the page.
    }
  }

  return (
    <div className={`ay lx-card${compact ? " ay-compact" : ""}`}>
      <div className="ox-tabs" role="tablist" aria-label="Who is asking">
        {PROMPTS.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            id={`ay-tab-${p.id}`}
            aria-selected={i === active}
            aria-controls={`ay-panel-${p.id}`}
            className="ox-tab dm-tab"
            onClick={() => { setActive(i); setCopied(false) }}
          >
            <span className="ox-tab-name">{p.label}</span>
          </button>
        ))}
        <span className="ox-tab-ink" style={{ transform: `translateX(${active * 100}%)` }} aria-hidden />
      </div>

      <div className="ay-panels">
        {PROMPTS.map((p, i) => (
          <div
            key={p.id}
            id={`ay-panel-${p.id}`}
            role="tabpanel"
            aria-labelledby={`ay-tab-${p.id}`}
            hidden={i !== active}
            className="ay-panel"
          >
            <pre className="ay-prompt" ref={i === active ? preRef : undefined} tabIndex={0}>
              {p.text}
            </pre>
          </div>
        ))}
      </div>

      <div className="ay-foot">
        <button type="button" className="lx-btn lx-btn-primary ay-copy" onClick={copy} data-copied={copied}>
          <span aria-live="polite">{copied ? "Copied" : "Copy the prompt"}</span>
        </button>
        <p className="ay-note">
          Works with any AI that can open a link. If yours can&rsquo;t, the prompt carries the facts.
          {!compact && (
            <>
              {" "}
              The same facts, for people: <Link href="/for-your-ai">/for-your-ai</Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
