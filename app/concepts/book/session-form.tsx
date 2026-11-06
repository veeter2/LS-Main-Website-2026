"use client"

import { useState, type FormEvent } from "react"

// Posts to the site's own route (app/api/lead), which keeps the lead in the
// LongStrider project and emails the team. No CRM, no third-party script.
const LEAD_ENDPOINT = "/api/lead"

type Status = "idle" | "sending" | "sent" | "error"

export function SessionForm() {
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "sending") return
    const data = new FormData(e.currentTarget)
    const field = (k: string) => String(data.get(k) ?? "").trim()

    const payload = {
      firstname: field("firstname"),
      lastname: field("lastname"),
      email: field("email").toLowerCase(),
      company: field("company"),
      question: field("question"),
      website: field("website"),
      page: window.location.pathname,
    }

    setStatus("sending")
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      setStatus(res.ok ? "sent" : "error")
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
      <label className="bk-trap" aria-hidden="true">
        <span>Website</span>
        <input name="website" tabIndex={-1} autoComplete="off" />
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
