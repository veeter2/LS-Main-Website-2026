"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { PROMPTS } from "@/lib/for-your-ai"

/**
 * "Don't take our word for it. Ask your own AI." Three prompts, one Copy
 * button. Copying sends one anonymous tick to /api/tick (a counter, not a
 * tracker: no cookie, no identity).
 *
 * Two shapes. The full block (used on /for-your-ai) shows the prompt text as
 * static text with tabs and a Copy button. The strip (used on the homepage)
 * is three buttons that each copy their prompt directly, with a link to the
 * page where the full prompts stay visible.
 */
export function AskYourAI({ compact = false, strip = false }: { compact?: boolean; strip?: boolean }) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState<number | null>(null)
  const timer = useRef<number | null>(null)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  async function copy(i: number) {
    const prompt = PROMPTS[i]
    let ok = false
    try {
      await navigator.clipboard.writeText(prompt.text)
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
    setCopied(i)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(null), 2000)
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

  if (strip) {
    return (
      <div className="ay-strip">
        <div className="lx-cta-row ay-strip-row" role="group" aria-label="Copy a prompt">
          {PROMPTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="lx-btn lx-btn-ghost ay-strip-btn"
              onClick={() => copy(i)}
              data-copied={copied === i}
            >
              <span aria-live="polite">{copied === i ? "Copied" : `Copy: ${p.label.replace(/^For the /, "")}`}</span>
            </button>
          ))}
        </div>
        <p className="ay-note ay-strip-note">
          Each button copies a prompt for that reader. Works with any AI that can open a link; if yours can&rsquo;t,
          the prompt carries the facts. Read the prompts and the facts first: <Link href="/for-your-ai">/for-your-ai</Link>
        </p>
      </div>
    )
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
            onClick={() => { setActive(i); setCopied(null) }}
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
        <button type="button" className="lx-btn lx-btn-primary ay-copy" onClick={() => copy(active)} data-copied={copied === active}>
          <span aria-live="polite">{copied === active ? "Copied" : "Copy the prompt"}</span>
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
