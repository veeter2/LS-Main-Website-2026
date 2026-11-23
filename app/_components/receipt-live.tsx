"use client"

import { useEffect, useRef, useState } from "react"
import { RECEIPT_Q, ReceiptAnswer, ReceiptLines } from "./proof-cards"

/**
 * The receipt card, played once: the question types itself when the card
 * scrolls into view, the answer lands, and the receipt waits under a button
 * until the reader clicks. Same words as the static card. Under
 * prefers-reduced-motion it is the static card with the receipt open.
 */
type Phase = "idle" | "typing" | "reading" | "answered"

export function ReceiptLive() {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [typed, setTyped] = useState(0)
  const [open, setOpen] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      setOpen(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase((p) => (p === "idle" ? "typing" : p))
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) return
    let t: ReturnType<typeof setTimeout>
    if (phase === "typing") {
      if (typed < RECEIPT_Q.length) t = setTimeout(() => setTyped((n) => n + 1), 40 + Math.random() * 40)
      else t = setTimeout(() => setPhase("reading"), 600)
    } else if (phase === "reading") {
      t = setTimeout(() => setPhase("answered"), 1800)
    }
    return () => clearTimeout(t)
  }, [phase, typed, reduced])

  const done = reduced || phase === "answered"
  const qText = reduced ? RECEIPT_Q : RECEIPT_Q.slice(0, typed)

  return (
    <article ref={ref} className="pf-receipt pf-receipt-compact pf-live lx-card" aria-label="Example: an answer with its receipt">
      <div className="pf-q">
        <span className="pf-who">You</span>
        <p className="rx-q-text">
          <span className="rx-q-ghost" aria-hidden>
            {RECEIPT_Q}
          </span>
          <span className="rx-q-typed">
            {qText}
            {!reduced && phase === "typing" && <span className="rx-caret" aria-hidden />}
          </span>
        </p>
      </div>

      {!reduced && (
        <div className="rx-reading" data-on={phase === "reading"}>
          <span className="rx-pulse" aria-hidden />
          Reading 3 notes about Pellworth
        </div>
      )}

      <div className="pf-a pf-live-a" data-on={done}>
        <span className="pf-who pf-who-ls">LongStrider</span>
        <ReceiptAnswer />
      </div>

      {!open && (
        <div className="pf-live-cta" data-on={done}>
          <button type="button" className="lx-btn lx-btn-ghost" onClick={() => setOpen(true)} disabled={!done}>
            Show the receipt
          </button>
        </div>
      )}

      {open && <ReceiptLines />}
    </article>
  )
}
