"use client"

import { useState, type FormEvent } from "react"

// Same HubSpot form as /pilot, so a booking from the concept site lands in
// the same place. The page address travels with it, so these are easy to tell apart.
const HS_ENDPOINT = "https://forms.hubspot.com/uploads/form/v2/243871028/6ccbf5d8-fae4-4ee4-8fe5-48f749d33905"

type Status = "idle" | "sending" | "sent" | "error"

export function SessionForm() {
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "sending") return
    const data = new FormData(e.currentTarget)
    const field = (k: string) => String(data.get(k) ?? "").trim()

    const params = new URLSearchParams()
    params.append("firstname", field("firstname"))
    params.append("lastname", field("lastname"))
    params.append("email", field("email").toLowerCase())
    params.append("company", field("company"))
    const question = field("question")
    if (question) params.append("message", `[PILOT] ${question}`)
    params.append(
      "hs_context",
      JSON.stringify({ pageUri: window.location.href, pageName: "LongStrider · Book a working session" }),
    )

    setStatus("sending")
    try {
      const res = await fetch(HS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
      setStatus(res.ok || res.status === 204 || res.status === 302 ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="bk-card lx-card bk-done" role="status">
        <span className="bk-label">Booked</span>
        <h2 className="lx-display">
          The session starts <em>here</em>.
        </h2>
        <p>
          We have what we need. Expect to hear from us within one business day, and we&rsquo;ll come prepared with your
          question.
        </p>
      </div>
    )
  }

  return (
    <form className="bk-card lx-card" onSubmit={onSubmit} aria-label="Book a working session">
      <span className="bk-label">Book a working session</span>
      <div className="bk-row">
        <label className="bk-field">
          <span>First name</span>
          <input name="firstname" autoComplete="given-name" required />
        </label>
        <label className="bk-field">
          <span>Last name</span>
          <input name="lastname" autoComplete="family-name" required />
        </label>
      </div>
      <label className="bk-field">
        <span>Work email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="bk-field">
        <span>Company</span>
        <input name="company" autoComplete="organization" required />
      </label>
      <label className="bk-field">
        <span>The question your team can&rsquo;t answer today</span>
        <textarea
          name="question"
          rows={4}
          placeholder="A client, a claim, a matter, a rollout. The more specific, the better."
        />
      </label>
      <button className="lx-btn lx-btn-primary bk-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Book the session"} <span className="lx-arrow" aria-hidden>→</span>
      </button>
      <p className="bk-note" aria-live="polite">
        {status === "error" ? (
          <>
            Something went wrong. Email us at <a href="mailto:hello@longstrider.ai">hello@longstrider.ai</a>.
          </>
        ) : (
          "We reply within one business day."
        )}
      </p>
    </form>
  )
}
