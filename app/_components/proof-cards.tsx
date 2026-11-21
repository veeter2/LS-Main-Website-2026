/**
 * Proof, not story: static cards that show the thing the copy claims.
 * A receipt under an answer, a job held for a yes, a sentence taught as a
 * rule, the team roster. Fictional accounts and names. Glass surfaces,
 * tokens only, nothing moves.
 */

const STOOD_ON = [
  { what: "Hailey wants the signed renewal back before any second hold.", kind: "Chat", when: "Tuesday" },
  { what: "Hailey agreed to hold Pellworth’s price through December.", kind: "Note", when: "Last week" },
  { what: "Their office manager said the renewal is on the owner’s desk. Second time.", kind: "Call", when: "October" },
]

export function ReceiptCard({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`pf-receipt lx-card${compact ? " pf-receipt-compact" : ""}`} aria-label="Example: an answer with its receipt">
      <div className="pf-q">
        <span className="pf-who">You</span>
        <p>Can we send Pellworth next year&rsquo;s price list this week?</p>
      </div>
      <div className="pf-a">
        <span className="pf-who pf-who-ls">LongStrider</span>
        <p>Not yet. Hailey&rsquo;s price hold runs through December, and she wants the signed renewal back first. Their office manager has said it&rsquo;s on the owner&rsquo;s desk twice.</p>
      </div>
      <dl className="pf-lines">
        <div className="pf-line">
          <dt>Memory used</dt>
          <dd>
            <ul className="pf-stood">
              {STOOD_ON.map((s) => (
                <li key={s.what}>
                  <span>{s.what}</span>
                  <span className="pf-src">
                    {s.kind} <b>{s.when}</b>
                  </span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="pf-line">
          <dt>Rules fired</dt>
          <dd>Nothing goes to a customer while a condition is still open. The price list waits for Hailey&rsquo;s yes.</dd>
        </div>
        <div className="pf-line">
          <dt>Cost</dt>
          <dd>a fraction of a cent, Claude through your own key</dd>
        </div>
                <div className="pf-line">
          <dt>Who can see this</dt>
          <dd>You and the deal team. Nobody else.</dd>
        </div>
      </dl>
    </article>
  )
}

export function HeldJobCard() {
  return (
    <article className="pf-held lx-card" aria-label="Example: a job waiting for a person's yes">
      <span className="pf-tag">Waiting on you</span>
      <p className="pf-held-line">LongStrider wants to send Pellworth next year&rsquo;s price list. Waiting for your yes.</p>
      <div className="pf-held-actions" aria-hidden>
        <span className="lx-btn lx-btn-primary pf-inert">Yes</span>
        <span className="lx-btn lx-btn-ghost pf-inert">Not now</span>
      </div>
      <p className="pf-meta">Hailey, accounts. This morning.</p>
      <p className="pf-note">Nothing goes out in your name until a person says yes, and the yes is on the record.</p>
    </article>
  )
}

export function TeachCard() {
  return (
    <article className="pf-teach lx-card" aria-label="Example: a sentence in a reply taught as a rule">
      <span className="pf-who pf-who-ls">LongStrider</span>
      <p className="pf-teach-reply">
        Pellworth&rsquo;s price is held through December. <mark className="pf-mark">Never send a new price list while a condition is still open.</mark>{" "}
        I&rsquo;ll check for their signed renewal first.
      </p>
      <span className="pf-teach-tag">Teach</span>
      <p className="pf-note">Highlight any answer. It becomes a rule the system follows from then on.</p>
    </article>
  )
}

const TEAM = [
  { name: "Renewals specialist", kind: "Expert", job: "Reads every renewal before it is priced and flags what the customer asked for.", for: "Accounts", spent: "little", waiting: false },
  { name: "Invoice reviewer", kind: "Expert", job: "Checks a disputed invoice against the order and what was actually delivered.", for: "Billing", spent: "none", waiting: false },
  { name: "Morning letter", kind: "Agent", job: "Reads the night’s record and writes what moved and what is due.", for: "Everyone", spent: "little", waiting: false },
  { name: "Customer follow-up", kind: "Agent", job: "Drafts the chase when a signed renewal is late, and waits for a yes.", for: "Hailey", spent: "more", waiting: true },
]

export function TeamCard() {
  return (
    <div className="pf-team lx-card" role="table" aria-label="Example: the team roster">
      <div className="pf-team-head" role="row">
        <span role="columnheader">Teammate</span>
        <span role="columnheader">Job description</span>
        <span role="columnheader">Works for</span>
        <span role="columnheader">Spent this month</span>
      </div>
      {TEAM.map((t) => (
        <div key={t.name} className="pf-team-row" role="row">
          <span role="cell">
            <b>{t.name}</b>
            <span className="pf-kind">{t.kind}</span>
          </span>
          <span role="cell">{t.job}</span>
          <span role="cell">{t.for}</span>
          <span role="cell" className="pf-spent">
            {t.spent}
            {t.waiting && <span className="pf-tag">Waiting on you</span>}
          </span>
        </div>
      ))}
    </div>
  )
}
