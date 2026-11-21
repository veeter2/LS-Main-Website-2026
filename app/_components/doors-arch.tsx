/**
 * Section 08 on /product: every door feeds one record.
 *
 * Doors on one side, the record as the film's arch of stones in the middle
 * with the enrichment steps along it, what grows out of it on the other
 * side. Two lanes, yours and the company's, enter the same arch with a hard
 * wall between them. Static SVG, tokens only. Drawn twice: landscape for
 * wide screens, portrait for phones, from the same data.
 */

const DOORS = ["Chat", "Connected systems", "Documents", "Dropped files", "What teammates find"]
const STEPS = ["dated", "sourced", "filed", "linked", "flagged", "judged"]
const GROWS = ["Answers", "The expert's rules", "The agent's findings", "The morning letter", "The promise due today"]
const LANES = ["Yours", "The company's"]

type P = { x: number; y: number }
const pt = (cx: number, cy: number, r: number, a: number): P => ({ x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) })

/** The arch: stones along a half circle, brightening toward the end, a step label on each. */
function Arch({ cx, cy, r, labelSize }: { cx: number; cy: number; r: number; labelSize: number }) {
  const n = STEPS.length
  const stones = []
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI - (i / n) * Math.PI + 0.02
    const a1 = Math.PI - ((i + 1) / n) * Math.PI - 0.02
    const o = pt(cx, cy, r + 22, a0)
    const o2 = pt(cx, cy, r + 22, a1)
    const i1 = pt(cx, cy, r - 22, a1)
    const i2 = pt(cx, cy, r - 22, a0)
    const d = `M ${o.x} ${o.y} A ${r + 22} ${r + 22} 0 0 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${r - 22} ${r - 22} 0 0 0 ${i2.x} ${i2.y} Z`
    const am = (a0 + a1) / 2
    const l = pt(cx, cy, r + 54, am)
    const anchor = am > Math.PI / 2 + 0.15 ? "end" : am < Math.PI / 2 - 0.15 ? "start" : "middle"
    stones.push(
      <g key={STEPS[i]}>
        <path d={d} fill="var(--lx-gold)" opacity={0.3 + (0.7 * (i + 1)) / n} stroke="var(--lx-gold-ink)" strokeOpacity={0.35} strokeWidth={1} />
        <text x={l.x} y={l.y + labelSize * 0.35} fontSize={labelSize} textAnchor={anchor} fill="var(--lx-gold-ink)" letterSpacing="0.12em">
          {STEPS[i].toUpperCase()}
        </text>
      </g>,
    )
  }
  return (
    <g>
      {/* the ground the arch stands on */}
      <line x1={cx - r - 60} y1={cy} x2={cx + r + 60} y2={cy} stroke="var(--lx-gold)" strokeWidth={1.5} />
      {/* a soft glow inside the arch */}
      <path d={`M ${cx - (r - 30)} ${cy} A ${r - 30} ${r - 30} 0 0 1 ${cx + (r - 30)} ${cy} Z`} fill="var(--lx-gold)" opacity={0.08} />
      {stones}
    </g>
  )
}

function Door({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const r = w / 2
  return (
    <g>
      <path
        d={`M ${x} ${y + h} V ${y + r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + h} Z`}
        fill="var(--lx-glass-ground-lift)"
        stroke="var(--lx-ink-primary)"
        strokeOpacity={0.55}
        strokeWidth={1.5}
      />
      <circle cx={x + w * 0.72} cy={y + h * 0.62} r={1.6} fill="var(--lx-gold-ink)" />
    </g>
  )
}

function Sun({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill="var(--lx-gold)" opacity={0.18} />
      <circle cx={x} cy={y} r={9} fill="var(--lx-gold)" />
    </g>
  )
}
function Moon({ x, y }: { x: number; y: number }) {
  return <path d={`M ${x} ${y - 10} a 10 10 0 1 0 0 20 a 7 10 0 1 1 0 -20 Z`} fill="var(--lx-ink-primary)" opacity={0.7} />
}

/** The two lanes, named: a short sample of each line, then the word. */
function Lanes({ x, y, fs }: { x: number; y: number; fs: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + 34} y2={y} stroke="var(--lx-ink-primary)" strokeOpacity={0.5} strokeWidth={1.5} />
      <text x={x + 46} y={y + fs * 0.35} fontSize={fs} fill="var(--lx-ink-primary)" letterSpacing="0.12em">
        {LANES[0].toUpperCase()}
      </text>
      <line x1={x} y1={y + fs * 1.7} x2={x + 34} y2={y + fs * 1.7} stroke="var(--lx-gold-ink)" strokeOpacity={0.8} strokeWidth={1.5} />
      <text x={x + 46} y={y + fs * 1.7 + fs * 0.35} fontSize={fs} fill="var(--lx-gold-ink)" letterSpacing="0.12em">
        {LANES[1].toUpperCase()}
      </text>
    </g>
  )
}

function Landscape() {
  const W = 1400
  const H = 620
  const cx = 700
  const cy = 440
  const r = 170
  const fs = 19
  const doorX = 70
  const doorYs = DOORS.map((_, i) => 110 + i * 82)
  const laneEnd = [
    { x: cx - r - 40, y: cy - 26 },
    { x: cx - r - 40, y: cy - 8 },
  ]
  const growYs = GROWS.map((_, i) => 110 + i * 82)
  const growX = W - 70
  const from = { x: cx + r + 40, y: cy - 16 }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cx-svg cx-svg-wide" role="img" aria-label="Five doors feed two lanes, yours and the company's, into one arch of stones where each fact is dated, sourced, filed, linked, flagged and judged. Answers, rules, findings, the morning letter and the promise due today grow out of the other side.">
      {/* doors */}
      {DOORS.map((d, i) => (
        <g key={d}>
          <Door x={doorX} y={doorYs[i] - 30} w={26} h={44} />
          <text x={doorX + 44} y={doorYs[i] + 2} fontSize={fs} fill="var(--lx-ink-primary)">
            {d}
          </text>
        </g>
      ))}
      {/* two lanes: every door joins a lane; the lanes run side by side into the arch with a wall between */}
      {DOORS.map((d, i) => {
        const y = doorYs[i]
        const lane = i < 2 ? 0 : 1
        const e = laneEnd[lane]
        const mx = 360
        return <path key={d} d={`M ${doorX + 250} ${y} C ${mx} ${y}, ${mx} ${e.y}, ${e.x} ${e.y}`} fill="none" stroke={lane === 0 ? "var(--lx-ink-primary)" : "var(--lx-gold-ink)"} strokeOpacity={lane === 0 ? 0.5 : 0.8} strokeWidth={1.5} />
      })}
      <line x1={430} y1={cy - 17} x2={cx - r - 40} y2={cy - 17} stroke="var(--lx-ink-primary)" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="3 6" />
      <Lanes x={doorX} y={cy + 40} fs={fs - 4} />
      {/* the two clocks */}
      <Sun x={cx - 250} y={120} />
      <Moon x={cx + 250} y={120} />
      <Arch cx={cx} cy={cy} r={r} labelSize={fs - 4} />
      {/* what grows out */}
      {GROWS.map((g, i) => {
        const y = growYs[i]
        const mx = 1040
        return (
          <g key={g}>
            <path d={`M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${y}, ${growX - 250} ${y}`} fill="none" stroke="var(--lx-gold)" strokeWidth={1.5} />
            <circle cx={growX - 250} cy={y} r={4} fill="var(--lx-gold)" />
            <text x={growX - 236} y={y + 2} fontSize={fs} fill="var(--lx-ink-primary)">
              {g}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Portrait() {
  const W = 720
  const H = 1180
  const cx = 360
  const cy = 700
  const r = 150
  const fs = 24
  const doorXs = DOORS.map((_, i) => 72 + i * 144)
  const doorY = 60
  const laneEnd = [
    { x: cx - r - 30, y: cy - 24 },
    { x: cx - r - 30, y: cy - 6 },
  ]
  const growYs = GROWS.map((_, i) => 860 + i * 60)
  const from = { x: cx + r + 30, y: cy - 14 }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cx-svg cx-svg-tall" role="img" aria-label="Five doors feed two lanes, yours and the company's, into one arch of stones where each fact is dated, sourced, filed, linked, flagged and judged. Answers, rules, findings, the morning letter and the promise due today grow out of the other side.">
      {DOORS.map((d, i) => {
        const x = doorXs[i]
        const words = d.split(" ")
        return (
          <g key={d}>
            <Door x={x - 13} y={doorY} w={26} h={44} />
            {words.map((w, j) => (
              <text key={w + j} x={x} y={doorY + 70 + j * (fs + 2)} fontSize={fs - 4} textAnchor="middle" fill="var(--lx-ink-primary)">
                {w}
              </text>
            ))}
          </g>
        )
      })}
      {DOORS.map((d, i) => {
        const x = doorXs[i]
        const lane = i < 2 ? 0 : 1
        const e = laneEnd[lane]
        const y0 = doorY + 70 + d.split(" ").length * (fs + 2)
        return <path key={d} d={`M ${x} ${y0} C ${x} ${y0 + 160}, ${e.x} ${e.y - 220}, ${e.x} ${e.y}`} fill="none" stroke={lane === 0 ? "var(--lx-ink-primary)" : "var(--lx-gold-ink)"} strokeOpacity={lane === 0 ? 0.5 : 0.8} strokeWidth={1.5} />
      })}
      <line x1={cx - r - 110} y1={cy - 15} x2={cx - r - 30} y2={cy - 15} stroke="var(--lx-ink-primary)" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="3 6" />
      <Lanes x={40} y={cy + 40} fs={fs - 6} />
      <Sun x={44} y={cy - r + 10} />
      <Moon x={W - 44} y={cy - r + 10} />
      <Arch cx={cx} cy={cy} r={r} labelSize={fs - 6} />
      {GROWS.map((g, i) => {
        const y = growYs[i]
        return (
          <g key={g}>
            <path d={`M ${from.x} ${from.y} C ${from.x + 40} ${from.y + 120}, ${cx - 60} ${y - 40}, ${cx - 60} ${y}`} fill="none" stroke="var(--lx-gold)" strokeWidth={1.5} />
            <circle cx={cx - 60} cy={y} r={4} fill="var(--lx-gold)" />
            <text x={cx - 44} y={y + 2} fontSize={fs - 2} fill="var(--lx-ink-primary)">
              {g}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function DoorsArch() {
  return (
    <figure className="lx-wrap cx-dia" data-reveal>
      <Landscape />
      <Portrait />
    </figure>
  )
}
