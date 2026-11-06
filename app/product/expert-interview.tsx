const QUESTIONS = [
  { q: "Which renewals matter most this quarter?", a: "Pellworth and Ashgrove. Both over $400k." },
  { q: "What counts as “at risk” here?", a: "Any account that asks for a second rate hold." },
  { q: "Who can agree to hold a rate?", a: "Hailey, up to 10%. Above that it comes to me." },
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
