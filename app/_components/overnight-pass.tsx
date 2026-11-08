/**
 * The overnight pass, in one picture. What the day wrote goes in on the
 * left, the pass runs inside your building at five in the morning, and what
 * comes out on the right is links, a flagged conflict and a kept promise.
 * Nothing leaves the building. Three panels so it stacks on a phone.
 * Illustration only; example names.
 */
const DAY = [
  { kind: "Chat · Kayla", what: "Reyes closing is the 19th." },
  { kind: "Call · Hailey", what: "Pellworth wants the schedule Friday." },
  { kind: "Note · Dev", what: "Thistlewood scope is still open." },
]

const NIGHT = [
  { tag: "Linked", what: "Three Pellworth notes said the same thing." },
  { tag: "Flagged", what: "Two Reyes closing dates this week." },
  { tag: "Kept", what: "Hailey owes the broker a schedule Friday." },
]

function Cards({ title, rows, out }: { title: string; rows: { kind?: string; tag?: string; what: string }[]; out?: boolean }) {
  return (
    <svg viewBox="0 0 340 290" aria-hidden="true">
      <text className="on-title" x={0} y={24}>
        {title}
      </text>
      {rows.map((r, i) => (
        <g key={r.what} className={out ? "on-card on-card-out" : "on-card"} transform={`translate(0 ${48 + i * 80})`}>
          <rect width={340} height={64} rx={4} />
          <text className={out ? "on-tag" : "on-kind"} x={14} y={25}>
            {r.kind ?? r.tag}
          </text>
          <text className="on-what" x={14} y={48}>
            {r.what}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Building() {
  return (
    <svg viewBox="0 0 300 330" aria-hidden="true">
      <circle className="on-moon" cx={150} cy={14} r={8} />
      <path className="on-walls" d="M10 100 L 150 44 L 290 100 V 322 H 10 Z" />
      <path className="on-roofline" d="M10 100 L 150 44 L 290 100" />
      <text className="on-time" x={150} y={150} textAnchor="middle">
        5:00 a.m.
      </text>
      <text className="on-inside" x={150} y={180} textAnchor="middle">
        Inside your building
      </text>
      <text className="on-step" x={150} y={224} textAnchor="middle">
        Reads what the day wrote
      </text>
      <text className="on-step" x={150} y={250} textAnchor="middle">
        Links what repeats
      </text>
      <text className="on-step" x={150} y={276} textAnchor="middle">
        Flags what contradicts
      </text>
      <text className="on-nothing" x={150} y={310} textAnchor="middle">
        Nothing leaves the building.
      </text>
    </svg>
  )
}

export function OvernightPass() {
  return (
    <figure
      className="on-figure lx-card"
      role="img"
      aria-label="Illustration. The day's chats, calls and notes go in on the left. At five in the morning the overnight pass runs inside your building. Out on the right come links between repeated notes, a flagged conflict and a kept promise. Nothing leaves the building."
    >
      <div className="on-col">
        <Cards title="What the day wrote" rows={DAY} />
      </div>
      <div className="on-arrow" aria-hidden="true" />
      <div className="on-col on-col-mid">
        <Building />
      </div>
      <div className="on-arrow" aria-hidden="true" />
      <div className="on-col">
        <Cards title="What you find in the morning" rows={NIGHT} out />
      </div>
      <figcaption className="on-foot">Most nights, nothing happens. That is the point.</figcaption>
    </figure>
  )
}
