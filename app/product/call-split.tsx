type Kept = { kind: string; text: string; source: string }

// One underwriting note, four things worth keeping. Static panel, example data.
const KEPT: Kept[] = [
  { kind: "Fact", text: "Pellworth fleet loss ratio is up.", source: "Note, 14 Jan." },
  { kind: "Decision", text: "Hold Pellworth’s rate through December.", source: "Note, 14 Jan." },
  { kind: "Condition", text: "Telematics gap closed before any second hold.", source: "Note, 14 Jan." },
  {
    kind: "Pattern",
    text: "“Telematics data is coming” has now been promised twice.",
    source: "First in October.",
  },
]

export function CallSplit() {
  return (
    <div className="cs" aria-label="Example: one underwriting note, and the four things LongStrider keeps from it">
      <div className="cs-call lx-card">
        <div className="cs-head">
          <span className="rx-dot" aria-hidden />
          <b>Hailey, underwriting note</b>
          <span className="cs-head-meta lx-num">14 Jan</span>
        </div>
        <ul className="cs-lines">
          <li data-on="true">
            <span className="cs-who">Hailey</span>
            <span className="cs-said">
              <mark>Pellworth&rsquo;s fleet loss ratio is up again</mark>. I&rsquo;m{" "}
              <mark>holding this year&rsquo;s rate through December</mark> but I want the{" "}
              <mark>telematics gap closed before I&rsquo;ll do it twice</mark>. Their broker says the data&rsquo;s
              coming. <mark>Said that in October too</mark>.
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
