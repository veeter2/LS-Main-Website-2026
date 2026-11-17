import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { BEATS, C, FPS, TOTAL_SECONDS } from "./beats"
import { Grain } from "./Grain"
import { k, ramp, ridge, rng, road, win } from "./util"

const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] })
loadFont("italic", { weights: ["400"], subsets: ["latin"] })

const W = 1920
const H = 1080

/* ---------- the clock ---------- */

/** Night: 0 by day, 1 at full dusk. Sun sets at 97, dawn at 104. */
const night = (t: number) => k(t, [[96.5, 0], [99, 1], [103.5, 1], [106, 0]])

/* ---------- small drawing helpers ---------- */

const Label = ({ x, y, children, size = 26, anchor = "middle", italic = false, color = C.goldInk, o = 1 }: {
  x: number; y: number; children: string; size?: number; anchor?: "start" | "middle" | "end"; italic?: boolean; color?: string; o?: number
}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={fontFamily} fontSize={size} fontStyle={italic ? "italic" : "normal"} fill={color} opacity={o}>
    {children}
  </text>
)

const Sun = ({ x, y, r, o }: { x: number; y: number; r: number; o: number }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r * 3.2} fill="url(#sunHalo)" />
    <circle cx={x} cy={y} r={r} fill="url(#sunBody)" />
  </g>
)

const Body = ({ x, y, r, o, lit = 0 }: { x: number; y: number; r: number; o: number; lit?: number }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r * 2.6} fill="url(#bodyHalo)" opacity={0.5 + 0.5 * lit} />
    <circle cx={x} cy={y} r={r} fill="url(#bodyFill)" />
    <circle cx={x} cy={y} r={r * 0.35} fill={C.goldLight} opacity={0.25 + 0.75 * lit} />
  </g>
)

/** The road as a path string. */
const ROAD = (() => {
  let d = `M -40 ${road(-40)}`
  for (let x = 0; x <= W + 40; x += 40) d += ` L ${x} ${road(x)}`
  return d
})()

/** The ridge as a path string (the gold rule vein). */
const RIDGE = (() => {
  let d = `M 0 ${ridge(0) + 6}`
  for (let x = 0; x <= W; x += 24) d += ` L ${x} ${ridge(x) + 6 + 4 * Math.sin(x / 90)}`
  return d
})()
const RIDGE_LEN = 2100

/** Bodies in orbit: the drawers. Center-right, where the orbit painting glows. */
const BODIES: [number, number, number][] = [
  [1180, 420, 34], // the center drawer
  [880, 520, 24],
  [1420, 300, 20],
  [1010, 300, 18],
  [1470, 560, 22],
  [720, 380, 16],
]

/* ---------- the arch ---------- */

const Arch = ({ t }: { t: number }) => {
  const cx = 620
  const cy = 700
  const R = 250
  const N = 12
  const stones = []
  for (let i = 0; i < N; i++) {
    const a0 = Math.PI + (i * Math.PI) / N
    const a1 = a0 + Math.PI / N - 0.02
    const tt = i / (N - 1)
    // Stones 0..8 are built during 47..52. Stone 9 is laid tonight (99..103). 10, 11 stay ghosts.
    const builtAt = i <= 8 ? 47 + i * 0.5 : i === 9 ? 100 : -1
    const b = builtAt < 0 ? 0 : ramp(t, builtAt, builtAt + 0.6)
    const ro = R + 56 + tt * 18
    const p = `M ${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)} A ${R} ${R} 0 0 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)} L ${cx + ro * Math.cos(a1)} ${cy + ro * Math.sin(a1)} A ${ro} ${ro} 0 0 0 ${cx + ro * Math.cos(a0)} ${cy + ro * Math.sin(a0)} Z`
    const col = C.ramp[Math.min(5, Math.floor(tt * 6))]
    stones.push(
      <g key={i}>
        <path d={p} fill="none" stroke={C.gold} strokeWidth={2} strokeDasharray="8 8" opacity={0.7 * (1 - b)} />
        <path d={p} fill={col} opacity={b} />
      </g>,
    )
  }
  const keystoneLit = k(t, [[104, 0], [106, 1]])
  return (
    <g opacity={win(t, 46.5, 110.5, 1.2)}>
      {stones}
      <circle cx={cx + 60} cy={cy - R - 40} r={60} fill="url(#bodyHalo)" opacity={keystoneLit} />
      <Label x={cx - R - 70} y={cy + 40} o={ramp(t, 48, 49)}>first light</Label>
      <Label x={cx + 70} y={cy - R - 86} o={ramp(t, 51.5, 52.5)}>now</Label>
      <Label x={cx + R + 70} y={cy + 40} o={win(t, 96, 104)} color={C.goldLight}>tonight</Label>
    </g>
  )
}

/* ---------- the captions ---------- */

const Captions = ({ t }: { t: number }) => {
  const n = night(t)
  const end = TOTAL_SECONDS - 1.6
  return (
    <>
      {BEATS.map((b, i) => {
        const next = i + 1 < BEATS.length ? BEATS[i + 1].at : end
        const o = win(t, b.at, next, 0.45)
        if (o <= 0) return null
        const rise = (1 - ramp(t, b.at, b.at + 0.6)) * 14
        return (
          <div
            key={b.at}
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              bottom: "8%",
              textAlign: "center",
              fontFamily,
              fontWeight: 500,
              fontSize: 54,
              lineHeight: 1.2,
              color: n > 0.5 ? C.paper : C.ink,
              opacity: o,
              transform: `translateY(${rise}px)`,
              padding: "10px 32px",
              background: n > 0.5 ? `radial-gradient(ellipse at center, rgba(42,37,64,.92) 40%, rgba(42,37,64,0) 78%)` : `radial-gradient(ellipse at center, rgba(250,247,240,.96) 40%, rgba(250,247,240,0) 78%)`,
              textShadow: n > 0.5 ? `0 0 12px rgba(42,37,64,1)` : `0 0 12px rgba(250,247,240,1)`,
            }}
          >
            {b.text}
          </div>
        )
      })}
    </>
  )
}

/* ---------- the film ---------- */

export const Hero = () => {
  const t = useCurrentFrame() / FPS
  const n = night(t)
  const { width: vw } = useVideoConfig()
  const fit = vw / W

  // Camera: scale and the world point that sits at screen center.
  const s = k(t, [[0, 1.06], [12, 1], [33, 1], [36.5, 2.5], [45, 2.5], [48.5, 0.96], [96, 0.96], [104, 1.02], [110, 1.02], [115, 1.1]])
  const cx = k(t, [[0, 960], [33, 960], [36.5, 1180], [45, 1180], [48.5, 960], [115, 960]])
  const cy = k(t, [[0, 540], [33, 540], [36.5, 585], [45, 585], [48.5, 540], [115, 540]])
  const camera = `translate(${W / 2}px, ${H / 2}px) scale(${s}) translate(${-cx}px, ${-cy}px)`

  // Paintings (the site's own art) under the grain.
  const archO = win(t, 11.5, 48, 2.5) * 0.92
  const orbitO = win(t, 46, 109, 2.5)
  const stepsO = ramp(t, 108, 111) * (1 - ramp(t, 113.4, 115))

  // Grain: the dune by day, light sand at night; it thins while the orbit holds the frame.
  const dayGrain = k(t, [[0, 1], [47, 1], [52, 0.42], [96, 0.42], [100, 0], [104, 0.42], [110, 0.42], [113.4, 0]])
  const nightGrain = k(t, [[98, 0], [100, 0.55], [103.5, 0.55], [105.5, 0]])

  // The sun and the lamp (12..20) and dawn (20..27, 104..110).
  const sunY = k(t, [[12, 760], [15.5, 230]])
  const sunA = win(t, 12, 17.2, 1.2) + 0 // first model
  const sunB = win(t, 16.6, 21, 1.2) // second model
  const lamp = ramp(t, 18, 19) * (1 - ramp(t, 45, 47.5))
  const dawn = Math.max(win(t, 19.5, 27.5, 1.5), win(t, 103.5, 110, 1.5)) * (1 - n)

  // Held grain and its receipt (33..41), then it becomes a rule (41..47).
  const held = ramp(t, 34, 35.5)
  const receipt = [ramp(t, 36, 37), ramp(t, 37.2, 38.2), ramp(t, 38.4, 39.4)]
  const heldOut = 1 - ramp(t, 43.5, 44.5)
  const toRule = ramp(t, 41.5, 43.5)
  const vein = ramp(t, 43, 46.5)

  // Ask (27..33): a ripple and one bright line on the surface.
  const ask = ramp(t, 27.5, 31)
  const askOut = 1 - ramp(t, 32, 33.5)

  // Morning dots on the road (20..27).
  const dots = [ramp(t, 21, 21.6), ramp(t, 22, 22.6), ramp(t, 23, 23.6)]

  // Bodies (52..) and threads (99..103).
  const bodiesIn = ramp(t, 52, 55.5)
  const bodiesOut = 1 - ramp(t, 109, 111)
  const threads = win(t, 99, 104.5, 1.2)

  // Promise grain (57..63): rolls down the road to a post.
  const roll = ramp(t, 58, 61.5)
  const promiseO = win(t, 57.5, 63.5, 0.6)
  const px = 880 + (1500 - 880) * roll
  const pyRoad = road(px)
  const py = roll < 0.05 ? 520 + (pyRoad - 520) * (roll / 0.05) : pyRoad

  // Expert (63..70): a new body gathers at the edge then moves close to center.
  const gather = ramp(t, 63.5, 66.5)
  const seat = ramp(t, 67, 69.5)
  const ex = 1700 + (1300 - 1700) * seat
  const ey = 780 + (480 - 780) * seat
  const expertO = win(t, 63.5, 109, 1.2)

  // Agents (70..79): small bodies on their own orbits; one sets a grain on the road.
  const agentsO = win(t, 70, 109, 1.2)
  const found = ramp(t, 73, 75)
  const choice = win(t, 75.5, 79.5, 0.5)
  const chosen = ramp(t, 77, 77.8)

  // Gate (79..85).
  const gateO = win(t, 79.5, 85.5, 0.6)
  const gateCheck = ramp(t, 81.5, 82.3)
  const gateUp = ramp(t, 82.3, 83.3)
  const through = ramp(t, 83, 85)

  // Paths (85..91): one per person, down to the shared road.
  const paths = ramp(t, 85.5, 89)
  const pathsO = win(t, 85.5, 91.5, 0.6)

  // Streams (91..97): four sources at the edge of the land.
  const streams = ramp(t, 91.5, 94)
  const streamsO = win(t, 91.5, 97.5, 0.6)

  // Night (97..104): aurora, the letter.
  const aurora = win(t, 98, 104, 1.5)
  const letter = ramp(t, 101.5, 102.5) * (1 - ramp(t, 105, 106))

  // Close (110..115).
  const wordmark = win(t, 110.6, 114, 0.8)
  const fadeOut = ramp(t, 113.4, 115)
  const fadeIn = 1 - ramp(t, 0, 0.6)

  const grainInk: [number, number, number] = [31, 27, 20]
  const sandInk: [number, number, number] = [241, 236, 223]

  const r = rng(3)
  const streamDots = Array.from({ length: 4 * 90 }, () => [r(), r(), r()] as [number, number, number])
  const STREAMS: { x0: number; y0: number; x1: number; y1: number; label: string; lx: number; ly: number }[] = [
    { x0: -40, y0: 300, x1: 500, y1: ridge(500) + 40, label: "CRM", lx: 190, ly: 250 },
    { x0: -40, y0: 980, x1: 420, y1: road(420) + 40, label: "Payments", lx: 230, ly: 950 },
    { x0: 1960, y0: 160, x1: 1500, y1: ridge(1500) + 30, label: "Forms", lx: 1720, ly: 200 },
    { x0: 1960, y0: 980, x1: 1540, y1: road(1540) + 30, label: "Files", lx: 1720, ly: 950 },
  ]
  const PATHS = [260, 520, 800, 1120, 1400]

  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
      {/* sky */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.surface} 0%, ${C.paper} 70%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(200,169,110,.30) 0%, rgba(200,169,110,0) 55%)`, opacity: dawn }} />

      {/* the site's paintings */}
      <Img src={staticFile("art/arch.webp")} style={{ position: "absolute", left: 0, top: 0, width: W, height: H, objectFit: "cover", opacity: archO }} />
      <Img src={staticFile("art/orbit.webp")} style={{ position: "absolute", left: 0, top: 0, width: W, height: H, objectFit: "cover", opacity: orbitO * (1 - 0.8 * n) }} />
      <Img src={staticFile("art/steps.webp")} style={{ position: "absolute", left: 0, top: 0, width: W, height: H, objectFit: "cover", opacity: stepsO }} />

      {/* night */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.dusk1} 0%, ${C.dusk2} 100%)`, opacity: n }} />

      {/* the world, under one camera */}
      <AbsoluteFill style={{ transform: camera, transformOrigin: "0 0" }}>
        <Grain t={t} alpha={dayGrain * (1 - n)} ink={grainInk} />
        <Grain t={t} alpha={nightGrain} ink={sandInk} />
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <radialGradient id="sunHalo"><stop offset="0" stopColor={C.gold} stopOpacity=".55" /><stop offset="1" stopColor={C.gold} stopOpacity="0" /></radialGradient>
            <radialGradient id="sunBody" cx=".35" cy=".35" r=".8"><stop offset="0" stopColor={C.goldLight} /><stop offset="1" stopColor="#a78b54" /></radialGradient>
            <radialGradient id="bodyHalo"><stop offset="0" stopColor={C.goldLight} stopOpacity=".5" /><stop offset="1" stopColor={C.goldLight} stopOpacity="0" /></radialGradient>
            <radialGradient id="bodyFill" cx=".35" cy=".35" r=".8"><stop offset="0" stopColor="#e8cd96" /><stop offset="1" stopColor="#57492e" /></radialGradient>
            <radialGradient id="grainFill" cx=".35" cy=".35" r=".8"><stop offset="0" stopColor="#e8cd96" /><stop offset="1" stopColor="#57492e" /></radialGradient>
            <linearGradient id="aurora" x1="0" x2="1"><stop offset="0" stopColor={C.gold} stopOpacity="0" /><stop offset=".5" stopColor={C.goldLight} stopOpacity=".26" /><stop offset="1" stopColor={C.gold} stopOpacity="0" /></linearGradient>
          </defs>

          {/* the road, drawn in one stroke at 9..12 */}
          <path d={ROAD} fill="none" stroke={C.gold} strokeWidth={3 + 3 * paths} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(t, 9, 12)} opacity={1 - fadeOut} />

          {/* 12..20 the sun is a model */}
          <Sun x={1400} y={sunY} r={46} o={sunA} />
          <Sun x={1290} y={sunY - 60} r={36} o={sunB} />
          <Label x={1400} y={sunY + 120} o={win(t, 13.5, 17, 0.6)}>a frontier model</Label>
          <g opacity={lamp}>
            <line x1={1690} y1={ridge(1690) + 40} x2={1690} y2={ridge(1690) - 140} stroke={C.ink} strokeOpacity=".8" strokeWidth={4} />
            <circle cx={1690} cy={ridge(1690) - 154} r={14} fill={C.goldLight} />
            <circle cx={1690} cy={ridge(1690) - 154} r={40} fill="url(#sunHalo)" />
            <Label x={1690} y={ridge(1690) + 80}>your own machine</Label>
          </g>

          {/* 20..27 the morning: three grains glow on the road, one keeps glowing */}
          {[520, 900, 1320].map((x, i) => (
            <g key={x} opacity={dots[i] * (i === 2 ? win(t, 20, 33, 0.4) : win(t, 20, 27.5, 0.4))}>
              <circle cx={x} cy={road(x)} r={34} fill="url(#bodyHalo)" />
              <circle cx={x} cy={road(x)} r={6} fill={C.goldLight} />
            </g>
          ))}
          <Label x={1320} y={road(1320) + 50} o={win(t, 24, 27.5, 0.5)} italic size={24}>waiting on you</Label>

          {/* 27..33 ask: a ripple, then grain from three places gathers into one bright line */}
          <circle cx={700} cy={ridge(700) + 30} r={40 + 520 * ask} fill="none" stroke={C.gold} strokeWidth={2} opacity={(1 - ask) * 0.8 * askOut * win(t, 27, 33.5, 0.3)} />
          {[[300, 420], [1250, 520], [1600, 640]].map(([x, y], i) => (
            <path key={i} d={`M ${x} ${y} Q ${(x + 700) / 2} ${Math.min(y, ridge(700)) - 160} 700 ${ridge(700) + 30}`} fill="none" stroke={C.gold} strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ask} opacity={askOut} />
          ))}
          <line x1={560} y1={ridge(560) + 30} x2={560 + 280 * ask} y2={ridge(560 + 280 * ask) + 30} stroke={C.goldLight} strokeWidth={5} strokeLinecap="round" opacity={ask * askOut * win(t, 27, 33.5, 0.3)} />

          {/* 33..47 one grain, held up; its receipt; then it becomes a rule */}
          <g opacity={heldOut}>
            <circle cx={1180} cy={585} r={56 * held} fill="url(#grainFill)" />
            <circle cx={1180} cy={585} r={56 * held} fill={C.goldLight} opacity={toRule} />
            <circle cx={1180} cy={585} r={130 * held} fill="none" stroke={C.gold} strokeWidth={1.2} opacity={0.9 - toRule} />
            {[
              { ang: -0.55, label: "the day it was said", p: receipt[0] },
              { ang: 0, label: "who said it, where", p: receipt[1] },
              { ang: 0.55, label: "what the reply cost", p: receipt[2] },
            ].map(({ ang, label, p }) => {
              const x0 = 1180 + 62 * Math.cos(ang)
              const y0 = 585 + 62 * Math.sin(ang)
              const x1 = 1180 + (62 + 110 * p) * Math.cos(ang)
              const y1 = 585 + (62 + 110 * p) * Math.sin(ang)
              return (
                <g key={label} opacity={1 - toRule}>
                  <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={C.gold} strokeWidth={1.2} />
                  <rect x={x1 - 2.5} y={y1 - 2.5} width={5} height={5} fill={C.gold} />
                  <Label x={x1 + 10} y={y1 + 4} anchor="start" italic size={13} o={p}>{label}</Label>
                </g>
              )
            })}
          </g>
          <path d={RIDGE} fill="none" stroke={C.gold} strokeWidth={2.5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - vein} opacity={win(t, 43, 52, 1)} />

          {/* 47..57 the arch and the bodies */}
          <Arch t={t} />
          {BODIES.map(([x, y, rr], i) => {
            const d = Math.hypot(x - 1180, y - 420)
            const o = bodiesIn * bodiesOut
            const bx = 1180 + (x - 1180) * (0.3 + 0.7 * bodiesIn)
            const by = 420 + (y - 420) * (0.3 + 0.7 * bodiesIn)
            return <Body key={i} x={bx} y={by} r={rr} o={o} lit={i === 0 ? 0.6 : Math.max(0, 1 - d / 400) * 0.3 + threads * 0.6} />
          })}
          {/* threads between bodies at night */}
          <g opacity={threads}>
            {BODIES.map(([x, y], i) =>
              BODIES.slice(i + 1).map(([x2, y2], j) => (
                <path key={`${i}-${j}`} d={`M ${x} ${y} Q ${(x + x2) / 2} ${Math.min(y, y2) - 90} ${x2} ${y2}`} fill="none" stroke={C.goldLight} strokeWidth={1.4} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(t, 99 + i * 0.3, 101 + i * 0.3)} opacity={0.85} />
              )),
            )}
          </g>

          {/* 57..63 the promise rolls down the road to its day */}
          <g opacity={promiseO}>
            <circle cx={px} cy={py - 8} r={10} fill="url(#grainFill)" />
            <line x1={1520} y1={road(1520) - 4} x2={1520} y2={road(1520) - 110} stroke={C.ink} strokeOpacity=".8" strokeWidth={3} />
            <circle cx={1520} cy={road(1520) - 118} r={9} fill={C.goldLight} opacity={0.4 + 0.6 * ramp(t, 61.4, 62)} />
            <circle cx={1520} cy={road(1520) - 118} r={32} fill="url(#bodyHalo)" opacity={ramp(t, 61.4, 62)} />
            <Label x={1520} y={road(1520) + 42} italic size={22} o={ramp(t, 61.6, 62.4)}>the day it is due</Label>
          </g>

          {/* 63..70 the expert gathers from the others, then takes a seat near the center */}
          <g opacity={expertO}>
            {BODIES.slice(1, 4).map(([x, y], i) => (
              <path key={i} d={`M ${x} ${y} Q ${(x + 1700) / 2} ${Math.max(y, 780) + 80} 1700 780`} fill="none" stroke={C.gold} strokeWidth={1.2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - gather} opacity={(1 - seat) * 0.8} />
            ))}
            <Body x={ex} y={ey} r={6 + 20 * gather} o={gather} lit={0.5} />
            <Label x={ex} y={ey + 70} italic size={22} o={win(t, 66.2, 70, 0.5) * (1 - seat)}>an expert, interviewed</Label>
          </g>

          {/* 70..79 agents: small bodies on their own orbits; one sets a grain on the road */}
          <g opacity={agentsO}>
            {[[880, 520, 70, 0.9], [1420, 300, 56, -1.1], [1470, 560, 62, 0.7]].map(([x, y, rad, sp], i) => {
              const a = t * sp + i
              return <circle key={i} cx={x + rad * Math.cos(a)} cy={y + rad * 0.45 * Math.sin(a)} r={5} fill={C.goldLight} stroke={C.goldInk} strokeWidth={1} />
            })}
            <circle cx={880 + (1000 - 880) * found} cy={520 + (road(1000) - 10 - 520) * found} r={9} fill="url(#grainFill)" opacity={found * (1 - chosen)} />
            <circle cx={1000} cy={road(1000) - 10} r={9} fill={C.goldLight} opacity={chosen} />
            <g opacity={choice}>
              <Label x={900} y={road(1000) + 60} size={32} color={C.ink} o={1}>keep</Label>
              <Label x={1000} y={road(1000) + 60} size={32} color={C.ink} o={0.55}>teach</Label>
              <Label x={1100} y={road(1000) + 60} size={32} color={C.ink} o={0.55}>skip</Label>
              <line x1={870} y1={road(1000) + 72} x2={930} y2={road(1000) + 72} stroke={C.gold} strokeWidth={3} strokeLinecap="round" opacity={chosen} />
            </g>
          </g>

          {/* 79..85 the gate on the road */}
          <g opacity={gateO}>
            <line x1={1240} y1={road(1240)} x2={1240} y2={road(1240) - 90} stroke={C.ink} strokeOpacity=".8" strokeWidth={3} />
            <line x1={1300} y1={road(1300)} x2={1300} y2={road(1300) - 90} stroke={C.ink} strokeOpacity=".8" strokeWidth={3} />
            <line x1={1240} y1={road(1270) - 40 - 50 * gateUp} x2={1300} y2={road(1270) - 40 - 50 * gateUp} stroke={C.ink} strokeOpacity=".8" strokeWidth={3} />
            <circle cx={1180 + 180 * through} cy={road(1180 + 180 * through) - 10} r={9} fill="url(#grainFill)" />
            <path d="M 1255 630 l 8 8 l 16 -16" transform={`translate(0 ${road(1270) - 740})`} fill="none" stroke={C.gold} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - gateCheck} opacity={1 - gateUp} />
          </g>

          {/* 85..91 one path per person down to the shared road */}
          <g opacity={pathsO}>
            {PATHS.map((x, i) => (
              <path key={x} d={`M ${x} 120 C ${x} 400 ${x + 120} 520 ${x + 160} ${road(x + 160)}`} fill="none" stroke={C.ink} strokeOpacity={0.35 + 0.1 * (i % 2)} strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(t, 85.5 + i * 0.4, 88 + i * 0.4)} />
            ))}
            {PATHS.map((x) => (
              <circle key={x} cx={x} cy={110} r={7} fill={C.ink} fillOpacity={0.55} />
            ))}
            <Label x={960} y={road(960) + 52} italic size={22} o={win(t, 88.5, 91.3, 0.5)}>the shared road</Label>
          </g>

          {/* 91..97 four streams of grain into the land */}
          <g opacity={streamsO}>
            {STREAMS.map((sd, i) => (
              <g key={sd.label}>
                {streamDots.slice(i * 90, i * 90 + 90).map(([a, b, c], j) => {
                  const f = ((a + streams * 1.4) % 1)
                  const x = sd.x0 + (sd.x1 - sd.x0) * f + (b - 0.5) * 60
                  const y = sd.y0 + (sd.y1 - sd.y0) * f + (c - 0.5) * 40
                  return <rect key={j} x={x} y={y} width={2.4} height={2.4} fill={C.goldInk} opacity={0.3 + 0.6 * f} />
                })}
                <Label x={sd.lx} y={sd.ly} size={24} o={ramp(t, 92 + i * 0.4, 92.8 + i * 0.4)}>{sd.label}</Label>
              </g>
            ))}
          </g>

          {/* 97..104 night: aurora and the letter on the road */}
          <g opacity={aurora}>
            {[0, 1, 2].map((b) => {
              const sh = 40 * Math.sin(t * 0.35 + b)
              return (
                <path key={b} d={`M 0 ${160 + b * 60 + sh} C 500 ${60 + b * 40 - sh} 1100 ${300 + b * 40 + sh} 1920 ${120 + b * 60} L 1920 ${220 + b * 60} C 1100 ${400 + b * 40 + sh} 500 ${160 + b * 40 - sh} 0 ${260 + b * 60 + sh} Z`} fill="url(#aurora)" opacity={1 - b * 0.25} />
              )
            })}
          </g>
          <g opacity={letter} transform={`translate(1040 ${road(1068) - 44})`}>
            <rect x={0} y={0} width={56} height={38} fill={C.paper} />
            <path d="M 0 0 L 28 22 L 56 0" fill="none" stroke={C.ink} strokeOpacity=".5" strokeWidth={1.5} />
          </g>
        </svg>
      </AbsoluteFill>

      {/* 110..115 the wordmark */}
      <div style={{ position: "absolute", left: 0, right: 0, top: "16%", textAlign: "center", fontFamily, fontWeight: 500, fontSize: 30, letterSpacing: "0.22em", color: C.ink, opacity: wordmark * 0.8 }}>LONGSTRIDER</div>

      <Captions t={t} />

      {/* loop seam: paper in, paper out */}
      <AbsoluteFill style={{ background: C.paper, opacity: Math.max(fadeIn, fadeOut), pointerEvents: "none" }} />
      </div>
    </AbsoluteFill>
  )
}
