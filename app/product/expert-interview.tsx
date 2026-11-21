const QUESTIONS = [
  { q: "Which accounts matter most this quarter?", a: "Pellworth and Ashgrove. Both are large customers." },
  { q: "What counts as “at risk” here?", a: "Any customer that asks for a second price hold." },
  { q: "Who can agree to hold a price?", a: "Hailey, up to a tenth off. Above that it comes to me." },
]

// Static panel, example answers.
export function ExpertInterview() {
  return (
    <div className="ei lx-card" aria-label="Example: a renewals specialist interviewing you before it starts">
      <div className="ei-head">
        <div>
          <b className="ei-role">Renewals specialist</b>
          <span className="ei-sub">Hired this morning</span>
        </div>
        <span className="ei-step lx-num">Interview 1 of {QUESTIONS.length}</span>
      </div>
      <ol className="ei-qs">
        {QUESTIONS.map((x) => (
          <li key={x.q} data-on="true">
            <span className="ei-q">{x.q}</span>
            <span className="ei-a">{x.a}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
