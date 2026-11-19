/**
 * Proof, not story: static cards that show the thing the copy claims.
 * A receipt under an answer, a job held for a yes, a sentence taught as a
 * rule, the team roster. Fictional accounts and names. Glass surfaces,
 * tokens only, nothing moves.
 */

const STOOD_ON = [
  { what: "Pellworth asked for the telematics gap closed before any second hold.", kind: "Chat", when: "Tuesday" },
  { what: "Hailey agreed to hold Pellworth’s rate through December.", kind: "Note", when: "Last week" },
  { what: "Their broker said the telematics data is coming. Second time.", kind: "Call", when: "October" },
]

export function ReceiptCard({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`pf-receipt lx-card${compact ? " pf-receipt-compact" : ""}`} aria-label="Example: an answer with its receipt">
      <div className="pf-q">
        <span className="pf-who">You</span>
        <p>Can we send Pellworth the revised terms this week?</p>
      </div>
      <div className="pf-a">
        <span className="pf-who pf-who-ls">LongStrider</span>
        <p>Not yet. Hailey&rsquo;s hold runs through December, and Pellworth wants the telematics gap closed first. Their broker has promised that data twice.</p>
      </div>
      <dl className="pf-lines">
        <div className="pf-line">
          <dt>Stood on</dt>
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
          <dt>Rules that fired</dt>
          <dd>Nothing goes to a client before their open conditions are met. Terms wait for Hailey&rsquo;s yes.</dd>
        </div>
        <div className="pf-line">
          <dt>Model</dt>
          <dd>Claude, through your own key</dd>
        </div>
        <div className="pf-line">
          <dt>Cost</dt>
          <dd>a fraction of a cent</dd>
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
      <p className="pf-held-line">LongStrider wants to send Pellworth the revised terms. Waiting for your yes.</p>
      <div className="pf-held-actions" aria-hidden>
        <span className="lx-btn lx-btn-primary pf-inert">Yes</span>
        <span className="lx-btn lx-btn-ghost pf-inert">Not now</span>
      </div>
      <p className="pf-meta">Hailey, underwriting. This morning.</p>
      <p className="pf-note">Nothing goes out in your name until a person says yes, and the yes is on the record.</p>
    </article>
  )
}

export function TeachCard() {
  return (
    <article className="pf-teach lx-card" aria-label="Example: a sentence in a reply taught as a rule">
      <span className="pf-who pf-who-ls">LongStrider</span>
      <p className="pf-teach-reply">
        Pellworth is on hold through December. <mark className="pf-mark">Never quote a renewal while a condition the client set is still open.</mark>{" "}
        I&rsquo;ll check their telematics gap first.
      </p>
      <span className="pf-teach-tag">Teach</span>
      <p className="pf-note">Highlight any answer. It becomes a rule the system follows from then on.</p>
    </article>
  )
}

const TEAM = [
  { name: "Renewals specialist", kind: "Expert", job: "Reads every renewal before it is quoted and flags what the client asked for.", for: "Underwriting", spent: "little", waiting: false },
  { name: "Claims reviewer", kind: "Expert", job: "Checks a new claim against the file and what the policy actually says.", for: "Claims", spent: "none", waiting: false },
  { name: "Morning letter", kind: "Agent", job: "Reads the night’s record and writes what moved and what is due.", for: "Everyone", spent: "little", waiting: false },
  { name: "Broker follow-up", kind: "Agent", job: "Drafts the chase when a promised document is late, and waits for a yes.", for: "Hailey", spent: "more", waiting: true },
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
