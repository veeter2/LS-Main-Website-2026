type Kept = { kind: string; text: string; source: string }

// One account note, four things worth keeping. Static panel, example data.
const KEPT: Kept[] = [
  { kind: "Fact", text: "Pellworth’s invoices are running late.", source: "Note, 14 Jan." },
  { kind: "Decision", text: "Hold Pellworth’s price through December.", source: "Note, 14 Jan." },
  { kind: "Condition", text: "Signed renewal back before any second hold.", source: "Note, 14 Jan." },
  {
    kind: "Pattern",
    text: "“It’s on the owner’s desk” has now been said twice.",
    source: "First in October.",
  },
]

export function CallSplit() {
  return (
    <div className="cs" aria-label="Example: one account note, and the four things LongStrider keeps from it">
      <div className="cs-call lx-card">
        <div className="cs-head">
          <span className="rx-dot" aria-hidden />
          <b>Hailey, account note</b>
          <span className="cs-head-meta lx-num">14 Jan</span>
        </div>
        <ul className="cs-lines">
          <li data-on="true">
            <span className="cs-who">Hailey</span>
            <span className="cs-said">
              <mark>Pellworth&rsquo;s invoices are running late again</mark>. I&rsquo;m{" "}
              <mark>holding their price through December</mark> but I want the{" "}
              <mark>signed renewal back before I&rsquo;ll do it twice</mark>. Their office manager says it&rsquo;s on
              the owner&rsquo;s desk. <mark>Said that in October too</mark>.
            </span>
          </li>
        </ul>
      </div>

      <div className="cs-kept">
        <span className="cs-kept-label">
          Kept, <span className="lx-num">{KEPT.length}</span> of {KEPT.length}:
        </span>
        <ul>
          {KEPT.map((k) => (
            <li key={k.kind} className="cs-item" data-on="true">
              <span className="cs-kind">{k.kind}</span>
              <span className="cs-text">{k.text}</span>
              <span className="cs-source">{k.source}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
