/**
 * What an AI knows about your business over a year — a shape, not a measurement.
 * No y-axis numbers on purpose: nothing here is a measured figure.
 */
const W = 1120
const H = 392
const PAD = { l: 24, r: 24, t: 28, b: 84 }
const innerW = W - PAD.l - PAD.r
const innerH = H - PAD.t - PAD.b
const x = (t: number) => PAD.l + t * innerW
const y = (v: number) => PAD.t + (1 - v) * innerH

// A tool that forgets: learns within a session, back to zero after.
function forgetfulPath() {
  const sessions = 22
  let d = `M ${x(0)} ${y(0.04)}`
  for (let i = 0; i < sessions; i++) {
    const a = i / sessions
    const b = (i + 0.72) / sessions
    const c = (i + 1) / sessions
    const peak = 0.16 + ((i * 7) % 5) * 0.012
    d += ` C ${x(a + 0.01)} ${y(peak)}, ${x(b - 0.01)} ${y(peak)}, ${x(b)} ${y(peak * 0.9)}`
    d += ` L ${x(c)} ${y(0.04)}`
  }
  return d
}

// LongStrider: keeps what it learns, tidied a little every night.
function keptPath() {
  const pts: string[] = []
  const n = 96
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const base = 0.06 + 0.86 * (1 - Math.exp(-2.3 * t)) + 0.05 * t
    pts.push(`${x(t).toFixed(1)} ${y(Math.min(base, 0.97)).toFixed(1)}`)
  }
  return "M " + pts.join(" L ")
}

const MARKS = [
  { t: 0.08, label: "Week 1", note: "Learns your people" },
  { t: 0.33, label: "Month 4", note: "Knows what was decided, and why" },
  { t: 0.97, label: "Month 12", note: "Answers no single person could" },
]

function keptAt(t: number) {
  return Math.min(0.06 + 0.86 * (1 - Math.exp(-2.3 * t)) + 0.05 * t, 0.97)
}

export function MemoryCurve() {
  return (
    <figure className="gx-figure lx-card">
      <figcaption className="gx-legend">
        <span className="gx-key gx-key-kept">LongStrider — kept, linked, tidied every night</span>
        <span className="gx-key gx-key-forget">A tool that forgets — every session starts from zero</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Illustration: a tool that forgets keeps returning to zero, while LongStrider's knowledge of your business keeps rising over twelve months.">
        <defs>
          <linearGradient id="gx-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={PAD.l} x2={W - PAD.r} y1={y(g)} y2={y(g)} className="gx-grid" />
        ))}
        <line x1={PAD.l} x2={W - PAD.r} y1={y(0)} y2={y(0)} className="gx-axis" />

        <path d={`${keptPath()} L ${x(1)} ${y(0)} L ${x(0)} ${y(0)} Z`} fill="url(#gx-fill)" className="gx-area" />
        <path d={forgetfulPath()} className="gx-forget" />
        <path d={keptPath()} className="gx-kept" pathLength={1} />

        {MARKS.map((m, i) => {
          const cx = x(m.t)
          const cy = y(keptAt(m.t))
          const anchor = m.t > 0.8 ? "end" : m.t < 0.15 ? "start" : "middle"
          const tx = m.t > 0.8 ? cx + 6 : m.t < 0.15 ? cx - 6 : cx
          return (
            <g key={m.label} className="gx-mark" style={{ animationDelay: `${1200 + i * 380}ms` }}>
              <line x1={cx} x2={cx} y1={cy + 8} y2={y(0) + 10} className="gx-drop" />
              <circle cx={cx} cy={cy} r={12} className="gx-halo" />
              <circle cx={cx} cy={cy} r={5.5} className="gx-dot" />
              <text x={tx} y={H - 50} textAnchor={anchor} className="gx-tick">
                {m.label}
              </text>
              <text x={tx} y={H - 20} textAnchor={anchor} className="gx-note">
                {m.note}
              </text>
            </g>
          )
        })}
      </svg>
      <ol className="gx-marks-list">
        {MARKS.map((m) => (
          <li key={m.label}>
            <span className="gx-marks-when">{m.label}</span>
            {m.note}
          </li>
        ))}
      </ol>
    </figure>
  )
}
