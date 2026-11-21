import { k, ramp, rng, win } from "../util"
import { type Ctx, H, type OrbKind, type RGB, SAND_DAY, W, blank, gz, halo, lin, makeNoise, mix, orb, rgba, spline } from "./core"
import { spark } from "./cost"
import type { Plates } from "./plates"
import { figure, glide, walkPose } from "./strider"

/**
 * The sovereign film: nothing leaves the building.
 * Night. One great heap of pale grain: the work. Its owner walks in and stands beside it.
 * A model glows outside and the work lifts toward it. Then the wall lights, all the way round, and holds it.
 * The owner opens a gate. The model comes inside, reads the work where it lies, and what is learned
 * stays on the heap as gold. Models come and go through the same gate. The heap and the wall stay.
 */
export const SOV_SECONDS = 40

const SKY_TOP: RGB = [40, 36, 62]
const SKY_MID: RGB = [55, 49, 79]
const SKY_LOW: RGB = [72, 63, 100]
const PAPER: RGB = [250, 247, 240]
const GRAIN: RGB = [236, 230, 240]
const GOLD: RGB = [232, 204, 154]
const GOLD_DEEP: RGB = [200, 169, 110]
const GOLD_HI: RGB = [255, 236, 190]

/* ---------- the places ---------- */

/** The wall: a dome of glass over the heap, its feet on the gold line. */
const DOME = { x: 960, y: 800, rx: 720, ry: 600 }
/** The model's seat inside, and where the first one waits outside, up in the sky. */
const SEAT: [number, number] = [1180, 392]
const OUT: [number, number] = [1640, 130]
const BALL_R = 52
const inDome = (x: number, y: number) => ((x - DOME.x) / DOME.rx) ** 2 + ((y - DOME.y) / DOME.ry) ** 2 < 1
function crossing(ax: number, ay: number, bx: number, by: number): number {
  // a is outside, b inside; find p where the segment meets the dome
  let lo = 0, hi = 1
  for (let i = 0; i < 30; i++) {
    const m = (lo + hi) / 2
    inDome(ax + (bx - ax) * m, ay + (by - ay) * m) ? (hi = m) : (lo = m)
  }
  return (lo + hi) / 2
}
/** The gate: where the straight path from outside to the seat meets the wall. */
const GAP_P = crossing(OUT[0], OUT[1], SEAT[0], SEAT[1])
const GAP: [number, number] = [OUT[0] + (SEAT[0] - OUT[0]) * GAP_P, OUT[1] + (SEAT[1] - OUT[1]) * GAP_P]
const GAP_A = Math.atan2((GAP[1] - DOME.y) / DOME.ry, (GAP[0] - DOME.x) / DOME.rx) + 2 * Math.PI
const GAP_W = 0.105

/** The heap of grain, and the gold line it rests on. */
const lineAt = (x: number) => 804 - 70 * Math.pow(Math.max(0, (x - 820) / 1100), 1.7)
const F0 = 470, F1 = 1630
const fieldTop = (x: number) => lineAt(x) - 300 * Math.pow(Math.sin(Math.PI * lin(x, F0, F1)), 1.15)
/** Where what is learned settles: the crest, under the model. */
const CAP_X = 1085

/** The owner: where he stands, and how tall. */
const ST_X = 345
const ST_H = 186
const ST_STEPS = 6
const ST_D = (ST_STEPS - 1) * ST_H * 0.66

/** The models, in the order they come. Each waits outside, comes in through the gate, and leaves by it. */
type Model = { kind: OrbKind; c: RGB; wait: [number, number]; show: number; in0: number; in1: number; out0: number; out1: number }
const EXIT: [number, number] = [1800, 340]
const MODELS: Model[] = [
  { kind: "gold", c: GOLD_HI, wait: OUT, show: 3.4, in0: 13.3, in1: 15.7, out0: 25.3, out1: 26.9 },
  { kind: "pearl", c: [214, 204, 255], wait: [1450, 78], show: 24.4, in0: 26.5, in1: 28.1, out0: 31.3, out1: 32.7 },
  { kind: "rose", c: [255, 196, 172], wait: [1450, 78], show: 30.6, in0: 32.3, in1: 33.9, out0: 99, out1: 100 },
]
/** The gate is open while a model passes, and shut at every other time. */
const gateAt = (t: number) => Math.max(win(t, 13.0, 16.0, 0.5), win(t, 25.0, 28.4, 0.5), win(t, 31.0, 34.2, 0.5))
/** The owner opens it: a spark goes from his hand to the gate first. */
const KEYS = [12.4, 24.5, 30.5]
/** A question: when, and where on the heap the model looks for the answer. */
const ASKS: [number, number, number][] = [[16.8, 940, 600], [19.3, 1240, 590], [21.8, 800, 660], [28.5, 1060, 570]]
const lessonsAt = (t: number) => ASKS.reduce((a, [at]) => a + ramp(t, at + 2.1, at + 3.0), 0)

export type Scene = { P: Plates; buf: HTMLCanvasElement }
export function buildScene(): Scene {
  // the finishing pass needs only a small working canvas and the grain
  const P = { small: blank(W / 4, H / 4), noise: makeNoise() } as unknown as Plates
  return { P, buf: blank(W, H) }
}

/* ---------- the clock ---------- */

/** 1 is night, 0 is day. Night nearly all the way; dawn at the close; dark again to loop. */
export const nightAt = (t: number) => k(t, [[0, 1], [35.2, 1], [37.2, 0], [40, 0]])
/** The camera: it follows the work up to the wall, comes back for the gate, and steps away to see it whole. */
const CAM: [number, number, number, number][] = [
  [0, 960, 600, 1.0], [3.5, 960, 596, 1.03], [8.6, 1150, 512, 1.17], [11.6, 1165, 520, 1.2], [13.6, 1070, 530, 1.1], [16.5, 985, 575, 1.06], [21, 1010, 558, 1.11], [24.4, 1030, 545, 1.15],
  [25.6, 1050, 530, 1.1], [27, 1110, 490, 1.08], [31, 1050, 520, 1.05], [35.2, 760, 606, 0.86], [40, 720, 610, 0.82],
]
const camAt = (t: number) => ({
  x: spline(t, CAM.map((c) => [c[0], c[1]] as [number, number])),
  y: spline(t, CAM.map((c) => [c[0], c[2]] as [number, number])),
  z: spline(t, CAM.map((c) => [c[0], c[3]] as [number, number])),
})
/** `depth` 1 is the heap; less is farther off and moves less; more is nearer the lens. */
function cam(ctx: Ctx, t: number, depth = 1) {
  const c = camAt(t)
  const z = 1 + (c.z - 1) * depth + (depth > 1 ? (depth - 1) * 0.4 : 0)
  const x = 960 + (c.x - 960) * depth, y = 600 + (c.y - 600) * depth
  ctx.setTransform(z, 0, 0, z, W / 2 - x * z, H / 2 - y * z)
}

/* ---------- the heap ---------- */

type Light = { x: number; y: number; c: RGB; a: number; r: number }

function field(ctx: Ctx, t: number, n: number, lessons: number, lights: Light[], pulse: number) {
  const day = 1 - n
  // the body of the heap: a breath lighter than the sky, gone by the gold line
  const body = ctx.createLinearGradient(0, 500, 0, 800)
  body.addColorStop(0, rgba(mix([96, 87, 116], [208, 198, 178], day), 0.6))
  body.addColorStop(1, rgba(mix(SKY_LOW, [226, 218, 204], day), 0))
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.moveTo(F0, lineAt(F0))
  for (let x = F0; x <= F1; x += 12) ctx.lineTo(x, fieldTop(x))
  for (let x = F1; x >= F0; x -= 40) ctx.lineTo(x, lineAt(x))
  ctx.closePath()
  ctx.fill()
  // the grain: thick along the top edge, thinning down to the line, a few strays above
  const r = rng(31)
  const capW = 26 + 64 * lessons, capD = 0.05 + 0.04 * lessons
  for (let i = 0; i < 19000; i++) {
    const u = r(), v = Math.pow(r(), 2.2), s = r(), c = r(), q = r()
    const x = F0 + u * (F1 - F0)
    const top = fieldTop(x)
    const stray = s > 0.985
    const y = stray ? top - r() * 70 : top + v * (lineAt(x) - 6 - top)
    const nightC = mix(GRAIN, GOLD_HI, c * 0.3)
    const dayC = SAND_DAY[Math.floor(c * SAND_DAY.length)]
    let col = mix(nightC, dayC, day)
    // the side toward the model's sky is a little brighter: the heap has a round back
    let a = (stray ? 0.22 : 0.2 + 0.7 * (1 - v)) * (0.7 + 0.3 * c) * (0.8 + 0.28 * u) * (day > 0 ? 0.78 + 0.22 * n : 1)
    let rad = 0.7 + s * 1.5
    // what has been learned lies on the crest as gold, and stays
    const inCap = lessons > 0 && !stray && Math.abs(x - CAP_X) < capW * (0.55 + 0.45 * q) && v < capD * (0.4 + 0.6 * c)
    if (inCap) {
      col = mix(mix(GOLD_DEEP, GOLD_HI, 0.25 + 0.75 * c * n), [176, 132, 52], day * 0.8)
      a = Math.min(1, 0.75 + 0.25 * c + 0.3 * pulse)
      rad = 1.1 + s * 1.7 + 0.5 * pulse
    }
    // light from the model falls on the grain where it lies
    for (const l of lights) {
      if (l.a <= 0) continue
      const d2 = (x - l.x) * (x - l.x) + (y - l.y) * (y - l.y)
      const w = l.a * Math.exp(-d2 / (l.r * l.r))
      if (w < 0.02) continue
      col = mix(col, l.c, Math.min(0.9, w))
      a = Math.min(1, a + 0.45 * w)
      rad += 0.6 * w
    }
    ctx.fillStyle = rgba(col, a)
    ctx.beginPath()
    ctx.arc(x, y, rad, 0, 6.2832)
    ctx.fill()
  }
  // the gold on the crest glows a little of its own
  if (lessons > 0) {
    ctx.save()
    ctx.globalCompositeOperation = "lighter"
    for (let i = -3; i <= 3; i++) {
      const x = CAP_X + (i / 3) * capW * 0.8
      halo(ctx, x, fieldTop(x) + 6, 46 + 14 * lessons, GOLD, (0.05 + 0.02 * lessons + 0.12 * pulse) * (0.35 + 0.65 * n))
    }
    ctx.restore()
  }
}

/* ---------- the grain that lifts, stops at the wall, and settles back ---------- */

type Grain = { ox: number; oy: number; lift: number; sp: number; stop: number; wob: number; c: number; s: number; rel: number; land: number }
const GRAINS: Grain[] = (() => {
  const r = rng(808)
  const out: Grain[] = []
  for (let i = 0; i < 1500; i++) {
    const u = r(), v = Math.pow(r(), 1.6)
    const ox = F0 + 30 + u * (F1 - F0 - 60)
    const top = fieldTop(ox)
    const oy = top + v * Math.min(120, lineAt(ox) - 8 - top)
    const lift = 3.6 + Math.pow(r(), 1.3) * 4.2
    // where its straight run to the model meets the wall
    const stop = crossing(OUT[0], OUT[1], ox, oy)
    out.push({ ox, oy, lift, sp: 0.09 + 0.06 * r(), stop: 1 - stop, wob: r() * 6.28, c: r(), s: r(), rel: 12 + r() * 1.4, land: top + Math.pow(r(), 1.4) * Math.min(110, lineAt(ox) - 8 - top) })
  }
  return out
})()

/**
 * Held against the glass. It hits, then creeps down the inside of the wall the way sand slides down a pane,
 * slower and slower, and banks up in a thin layer with the grains behind it. `over` is how long it has pressed.
 */
function banked(g: Grain, t: number, over: number): [number, number] {
  const hx = g.ox + (OUT[0] - g.ox) * g.stop, hy = g.oy + (OUT[1] - g.oy) * g.stop
  const a0 = Math.atan2((hy - DOME.y) / DOME.ry, (hx - DOME.x) / DOME.rx)
  const o = Math.max(0, over)
  const slip = (0.05 + 0.2 * g.c) * (1 - Math.exp(-o * 5))
  const a = a0 + slip + Math.sin(t * 7 + g.wob * 3) * 0.0012
  // later grains cannot reach the glass: they rest on the ones already there
  const depth = 1 - (0.004 + 0.034 * g.s * g.s) * Math.min(1, o * 8 + 0.2)
  return [DOME.x + DOME.rx * depth * Math.cos(a), DOME.y + DOME.ry * depth * Math.sin(a)]
}

/** Where one grain is now, and where it was a breath ago (so it can streak). */
function grainAt(g: Grain, t: number): [number, number, number] | null {
  if (t < g.lift) return null
  // rising: it starts slow, then runs toward the model
  const run = Math.pow(Math.max(0, t - g.lift) * g.sp, 1.35)
  const held = t >= g.rel
  const dx = OUT[0] - g.ox, dy = OUT[1] - g.oy
  if (!held) {
    if (run <= g.stop) return [g.ox + dx * run, g.oy + dy * run, 0]
    return [...banked(g, t, run - g.stop), Math.min(1, (run - g.stop) * 4)] as [number, number, number]
  }
  // let go: it falls back the way sand falls, faster and faster, and lands
  const fall = t - g.rel
  const [px, py] = banked(g, g.rel, Math.pow(Math.max(0, g.rel - g.lift) * g.sp, 1.35) - g.stop)
  const drop = Math.min(1, (fall * fall * 0.62) / Math.max(0.3, (g.land - py) / 600))
  const e = drop
  const x = px + (g.ox - px) * (e * 0.9) + Math.sin(fall * 5 + g.wob) * 4 * (1 - e)
  const y = py + (g.land - py) * e
  if (drop >= 1) return [g.ox + (g.ox - px) * -0.1, g.land, -1]
  return [x, y, 0]
}

function liftedGrain(ctx: Ctx, t: number, n: number) {
  if (t < 3.6 || t > 17) return
  ctx.lineCap = "round"
  for (const g of GRAINS) {
    const now = grainAt(g, t)
    if (!now) continue
    const [x, y, press] = now
    if (press < 0) {
      // settled: one of the field again
      ctx.fillStyle = rgba(mix(GRAIN, GOLD_HI, g.c * 0.35), (0.6 + 0.3 * g.c) * (1 - ramp(t, 14.6, 16.9)))
      ctx.beginPath()
      ctx.arc(x, y, 0.8 + g.s * 1.4, 0, 6.2832)
      ctx.fill()
      continue
    }
    const was = grainAt(g, t - (t >= g.rel ? 0.016 : 0.03))
    const col = mix(GRAIN, GOLD_HI, 0.3 + 0.6 * press)
    ctx.strokeStyle = rgba(col, 0.5 + 0.45 * g.c)
    ctx.lineWidth = (0.8 + g.s * 1.3) * (1 + 0.4 * press)
    ctx.beginPath()
    if (was && was[2] >= 0) ctx.moveTo(was[0], was[1])
    else ctx.moveTo(x, y)
    ctx.lineTo(x, y)
    ctx.stroke()
    if (press > 0.5 && g.s > 0.7) halo(ctx, x, y, 10, GOLD_HI, 0.25 * press)
  }
}

/* ---------- the wall ---------- */

/** `up` is how far the light has run up the wall from its two feet, 0 to 1. `round` shows the whole ring. */
function dome(ctx: Ctx, t: number, n: number, up: number, press: number, gate: number, round: number) {
  if (up <= 0) return
  const { x, y, rx, ry } = DOME
  const col = mix([170, 126, 48], mix(GOLD, GOLD_HI, 0.35), n)
  const reach = (up * Math.PI) / 2
  const g = GAP_W * gate
  // the lit stretches: up from the left foot, up from the right foot, less the gate
  const spans: [number, number][] = [[Math.PI, Math.PI + reach], [2 * Math.PI - reach, 2 * Math.PI]]
  const cut = (a: number, b: number): [number, number][] => {
    if (g <= 0 || GAP_A + g < a || GAP_A - g > b) return [[a, b]]
    return [[a, GAP_A - g], [GAP_A + g, b]]
  }
  const draw = (alpha: number, wdt: number, blur: number, c: RGB = col) => {
    if (alpha <= 0) return
    ctx.strokeStyle = rgba(c, alpha)
    ctx.lineWidth = wdt
    ctx.shadowColor = rgba(c, 0.9 * (0.35 + 0.65 * n))
    ctx.shadowBlur = blur
    for (const [a0, b0] of spans)
      for (const [a, b] of cut(a0, b0)) {
        if (b <= a) continue
        ctx.beginPath()
        ctx.ellipse(x, y, rx, ry, 0, a, b)
        ctx.stroke()
      }
    ctx.shadowBlur = 0
  }
  // glass has a body: a breath of gold just inside the rim, strongest low down
  ctx.save()
  ctx.beginPath()
  ctx.rect(x - rx - 40, y - ry - 40, rx * 2 + 80, ry + 40 - 2)
  ctx.clip()
  ctx.beginPath()
  ctx.ellipse(x, y, rx, ry, 0, 0, 6.2832)
  ctx.clip()
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(1, ry / rx)
  const gl = ctx.createRadialGradient(0, 0, rx * 0.8, 0, 0, rx)
  gl.addColorStop(0, rgba(col, 0))
  gl.addColorStop(0.8, rgba(col, (0.035 + 0.05 * round) * up))
  gl.addColorStop(1, rgba(col, (0.13 + 0.12 * round + 0.1 * press) * up))
  ctx.fillStyle = gl
  ctx.fillRect(-rx, -rx, rx * 2, rx)
  ctx.restore()
  ctx.restore()
  // the rim itself: a soft wide line under a fine bright one
  draw(0.16 + 0.14 * round, 7, 22)
  draw(0.62 + 0.25 * round, 1.6 + 0.8 * round, 10)
  // seen whole, the wall goes all the way round, under the ground too
  if (round > 0) {
    ctx.strokeStyle = rgba(col, 0.4 * round)
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI)
    ctx.stroke()
  }
  // a slow shine slides along the glass
  if (up >= 1) {
    const sa = Math.PI + 0.62 + 0.1 * Math.sin(t * 0.35)
    for (let i = 0; i < 14; i++) {
      const f = i / 13
      ctx.strokeStyle = rgba([255, 248, 226], 0.5 * Math.sin(Math.PI * f) * (0.4 + 0.6 * n))
      ctx.lineWidth = 2.4
      ctx.beginPath()
      ctx.ellipse(x, y, rx - 5, ry - 5, 0, sa + f * 0.34, sa + (f + 1 / 13) * 0.34 + 0.002)
      ctx.stroke()
    }
  }
  // the light running up the wall has two bright heads until they meet at the top
  if (up < 1) {
    for (const ang of [Math.PI + reach, 2 * Math.PI - reach]) {
      const px = x + rx * Math.cos(ang), py = y + ry * Math.sin(ang)
      halo(ctx, px, py, 90, GOLD_HI, 0.55)
      halo(ctx, px, py, 22, [255, 252, 240], 0.9)
    }
  } else {
    const met = 1 - lin(t, WALL_T1, WALL_T1 + 0.9)
    if (met > 0) halo(ctx, x, y - ry, 260 * (1.2 - met), GOLD_HI, 0.5 * met)
  }
  // where the grain presses, the glass lights up along the arc
  if (press > 0) {
    ctx.save()
    ctx.globalCompositeOperation = "lighter"
    for (let s = 0; s < 1; s += 1 / 70) {
      const ang = Math.PI + s * Math.PI
      const px = x + rx * Math.cos(ang), py = y + ry * Math.sin(ang)
      const d = Math.hypot(px - 1470, py - 360)
      const w = Math.exp(-(d * d) / (2 * 250 * 250)) * (0.85 + 0.15 * Math.sin(t * 3.1 + s * 40))
      if (w < 0.02) continue
      halo(ctx, px, py, 64, GOLD_HI, 0.22 * press * w)
    }
    ctx.restore()
  }
  // the gate: two bright posts, and the glass between them gone
  if (gate > 0) {
    for (const s of [-1, 1]) {
      const ang = GAP_A + s * g
      const px = x + rx * Math.cos(ang), py = y + ry * Math.sin(ang)
      halo(ctx, px, py, 46, GOLD_HI, 0.7 * gate)
      ctx.fillStyle = rgba([255, 250, 232], gate)
      ctx.beginPath()
      ctx.arc(px, py, 3.4, 0, 6.2832)
      ctx.fill()
    }
  }
}
const WALL_T0 = 6.9, WALL_T1 = 8.0

/* ---------- the gold line ---------- */

function goldLine(ctx: Ctx, n: number, lit: number) {
  const col = mix(GOLD_DEEP, GOLD_HI, 0.3 * lit)
  ctx.strokeStyle = rgba(col, 0.92)
  ctx.lineWidth = 3
  ctx.shadowColor = rgba(GOLD_HI, 0.8 * lit)
  ctx.shadowBlur = 16 * lit
  ctx.beginPath()
  for (let x = -900; x <= W + 700; x += 16) x === -900 ? ctx.moveTo(x, lineAt(x)) : ctx.lineTo(x, lineAt(x))
  ctx.stroke()
  ctx.shadowBlur = 0
}

/* ---------- the models ---------- */

/** A curve from a to c that passes through b half way. */
function through(a: [number, number], b: [number, number], c: [number, number], u: number): [number, number] {
  const qx = 2 * b[0] - (a[0] + c[0]) / 2, qy = 2 * b[1] - (a[1] + c[1]) / 2
  const v = 1 - u
  return [v * v * a[0] + 2 * v * u * qx + u * u * c[0], v * v * a[1] + 2 * v * u * qy + u * u * c[1]]
}
type Ball = { m: Model; i: number; x: number; y: number; a: number; lit: number; seated: number }
function ballsAt(t: number): Ball[] {
  const out: Ball[] = []
  MODELS.forEach((m, i) => {
    const a = ramp(t, m.show, m.show + 0.9) * (1 - ramp(t, m.out1 - 0.5, m.out1 + 0.1))
    if (a <= 0) return
    const inn = k(t, [[m.in0, 0], [m.in1, 1]])
    const go = k(t, [[m.out0, 0], [m.out1, 1]])
    let [x, y] = through(m.wait, GAP, SEAT, inn)
    if (go > 0) [x, y] = through(SEAT, GAP, EXIT, go)
    // it hangs in the air: a slow drift while it waits, stillness in the seat
    const seated = inn * (1 - go)
    x += 5 * Math.sin(t * 0.7 + i * 2) * (1 - seated)
    y += 7 * Math.sin(t * 0.9 + i) * (1 - seated)
    const lit = ramp(t, m.in1 - 0.2, m.in1 + 0.9) * (1 - ramp(t, m.out0 - 0.3, m.out0 + 0.4))
    out.push({ m, i, x, y, a, lit, seated })
  })
  return out
}

/* ---------- sparks in the air ---------- */

const arcPt = (a: [number, number], b: [number, number], lift: number, u: number): [number, number] => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - lift * 4 * u * (1 - u)]
/** A spark that flies from a to b in a low arc, with a thread of light fading behind it. */
function fly(ctx: Ctx, a: [number, number], b: [number, number], lift: number, u: number, c: RGB, size = 5) {
  if (u <= 0 || u >= 1) return
  const e = u * u * (3 - 2 * u)
  ctx.lineCap = "round"
  for (let i = 0; i < 16; i++) {
    const f0 = Math.max(0, e - 0.34 * ((i + 1) / 16)), f1 = Math.max(0, e - 0.34 * (i / 16))
    const p0 = arcPt(a, b, lift, f0), p1 = arcPt(a, b, lift, f1)
    ctx.strokeStyle = rgba(c, 0.55 * (1 - i / 16))
    ctx.lineWidth = 2.2 * (1 - i / 20)
    ctx.beginPath()
    ctx.moveTo(p0[0], p0[1])
    ctx.lineTo(p1[0], p1[1])
    ctx.stroke()
  }
  const p = arcPt(a, b, lift, e), q = arcPt(a, b, lift, Math.max(0, e - 0.03))
  halo(ctx, p[0], p[1], 34, c, 0.5)
  spark(ctx, p[0], p[1], q[0], q[1], c, 1, size, [255, 250, 232])
}

/* ---------- the owner ---------- */

/** How far his arm is lifted: he opens the gate, and he asks. */
const reachAt = (t: number) => Math.max(...KEYS.map((at) => win(t, at - 0.35, at + 0.75, 0.38)), ...ASKS.map(([at]) => win(t, at - 0.3, at + 0.85, 0.38)))
const WALK_OFF = 36.3

function owner(ctx: Ctx, t: number, n: number, lit: number): { hand: [number, number]; chest: [number, number] } {
  const gy = lineAt(ST_X) - 1.5
  const pose =
    t < WALK_OFF
      ? walkPose(ST_X - ST_D, gy, ST_H, ST_D * glide(lin(t, 0.15, 3.7), 0.14), ST_STEPS, false, t * 1.6)
      : walkPose(ST_X, gy, ST_H, 150 * (Math.pow(lin(t, WALK_OFF, WALK_OFF + 1) , 2) * 0.5 + Math.max(0, t - WALK_OFF - 1)), 99, true)
  const rc = reachAt(t)
  if (rc > 0) {
    pose.armN = pose.armN + (2.15 - pose.armN) * rc
    pose.lean -= 0.07 * rc
  }
  // by night he is a pale figure like the grain; by day he is ink
  const body = mix(mix([226, 219, 236], GOLD_HI, 0.35 * lit), [50, 46, 42], 1 - n)
  const far = mix(mix([168, 160, 190], GOLD, 0.3 * lit), [92, 86, 78], 1 - n)
  const day = 1 - n
  if (day > 0.05) {
    // his shadow, long behind him, because the sun is low ahead
    ctx.save()
    ctx.globalAlpha = 0.26 * day
    ctx.translate(pose.hx, gy)
    ctx.transform(1, 0, 1.25, -0.24, 0, 0)
    ctx.translate(-pose.hx, -gy)
    ctx.filter = "blur(3px)"
    figure(ctx, pose, { body: "rgb(60,48,30)", far: "rgb(60,48,30)" })
    ctx.restore()
  } else {
    // by night, a faint pool of light at his feet
    halo(ctx, pose.hx, gy, 90, GOLD, 0.1 + 0.1 * lit)
  }
  const { hand } = figure(ctx, pose, { body: rgba(body, 1), far: rgba(far, 1) })
  return { hand, chest: [pose.hx + 12, pose.hy - ST_H * 0.22] }
}

/* ---------- questions and what they leave behind ---------- */

function asks(ctx: Ctx, t: number, hand: [number, number], chest: [number, number], b: Ball | undefined) {
  if (!b) return
  ASKS.forEach(([at, lx, ly], i) => {
    const d = t - at
    if (d < 0 || d > 3.2) return
    const eye: [number, number] = [b.x, b.y]
    // he asks: a spark from his hand to the model
    fly(ctx, hand, eye, 150, lin(d, 0.15, 0.95), GOLD_HI)
    // the model wakes, and looks at the work where it lies
    const fl = lin(d, 0.9, 1.5)
    if (fl > 0 && fl < 1) halo(ctx, b.x, b.y, BALL_R * 3, b.m.c, 0.6 * Math.sin(Math.PI * fl))
    const read = win(d, 0.95, 2.05, 0.3)
    if (read > 0) {
      const sx = lx + 46 * Math.sin((d - 1) * 2.4), sy = fieldTop(sx) + (ly - fieldTop(lx))
      ctx.save()
      ctx.globalCompositeOperation = "lighter"
      const beam = ctx.createLinearGradient(b.x, b.y, sx, sy)
      beam.addColorStop(0, rgba(b.m.c, 0.26 * read))
      beam.addColorStop(1, rgba(b.m.c, 0.03 * read))
      ctx.fillStyle = beam
      ctx.beginPath()
      ctx.moveTo(b.x - 8, b.y)
      ctx.lineTo(b.x + 8, b.y)
      ctx.lineTo(sx + 120, sy)
      ctx.lineTo(sx - 120, sy)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    // the answer goes to him, not out
    fly(ctx, eye, chest, 120, lin(d, 1.85, 2.6), b.m.c)
    const got = lin(d, 2.5, 3.1)
    if (got > 0 && got < 1) halo(ctx, chest[0], chest[1], 70, GOLD_HI, 0.5 * Math.sin(Math.PI * got))
    // and what was learned falls to the crest and stays there
    const r = rng(900 + i)
    for (let j = 0; j < 22; j++) {
      const lag = r() * 0.5, tx = CAP_X + gz(r) * (30 + 40 * i), sz = 1.3 + r() * 1.4
      const ph = lin(d, 1.95 + lag, 2.75 + lag)
      if (ph <= 0 || ph >= 1) continue
      const e = ph * ph
      const x = b.x + (tx - b.x) * ph + 6 * Math.sin(ph * 9 + j), y = b.y + BALL_R * 0.6 + (fieldTop(tx) - b.y - BALL_R * 0.6) * e
      halo(ctx, x, y, 9, GOLD_HI, 0.5)
      ctx.fillStyle = rgba(GOLD_HI, 0.95)
      ctx.beginPath()
      ctx.arc(x, y, sz, 0, 6.2832)
      ctx.fill()
    }
  })
}
/** Where the model is looking now, as a light on the heap. */
function lookLight(t: number, b: Ball | undefined): Light | null {
  if (!b) return null
  for (const [at, lx, ly] of ASKS) {
    const d = t - at
    const read = win(d, 0.95, 2.05, 0.3)
    if (read <= 0) continue
    const sx = lx + 46 * Math.sin((d - 1) * 2.4)
    return { x: sx, y: fieldTop(sx) + (ly - fieldTop(lx)), c: mix(b.m.c, GOLD_HI, 0.3), a: 1.1 * read, r: 120 }
  }
  return null
}

/* ---------- far ground, for depth ---------- */

function farDunes(ctx: Ctx, t: number, n: number) {
  const day = 1 - n
  const rows: [number, number, number, number, RGB, RGB][] = [
    [0.35, 742, 46, 0.0021, [58, 51, 84], [236, 229, 214]],
    [0.6, 772, 62, 0.0015, [63, 55, 90], [232, 223, 205]],
  ]
  for (const [depth, base, amp, f, nc, dc] of rows) {
    cam(ctx, t, depth)
    ctx.fillStyle = rgba(mix(nc, dc, day), 1)
    ctx.beginPath()
    ctx.moveTo(-1400, 1400)
    for (let x = -1400; x <= W + 1400; x += 30) ctx.lineTo(x, base - amp * (0.5 + 0.5 * Math.sin(x * f + depth * 9)) * (0.6 + 0.4 * Math.sin(x * f * 2.7 + 1)))
    ctx.lineTo(W + 1400, 1400)
    ctx.closePath()
    ctx.fill()
  }
}

/* ---------- the whole scene ---------- */

/** The film, and at the very end a soft return to its own first frame, so the loop has no seam. */
export function sovereignScene(ctx: Ctx, t: number, S: Scene) {
  paint(ctx, t)
  const back = ramp(t, SOV_SECONDS - 0.7, SOV_SECONDS)
  if (back > 0) {
    const bx = S.buf.getContext("2d")!
    paint(bx, 0)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = back
    ctx.drawImage(S.buf, 0, 0)
    ctx.globalAlpha = 1
  }
}

function paint(ctx: Ctx, t: number) {
  const n = nightAt(t)
  const day = 1 - n
  const up = lin(t, WALL_T0, WALL_T1)
  const press = ramp(t, 7.9, 10.2) * (1 - ramp(t, 12, 13.2))
  const round = ramp(t, 31.5, 34.8) * (1 - 0.35 * ramp(t, 35.6, 37.2))
  const lessons = lessonsAt(t)
  const pulse = Math.max(...ASKS.map(([at]) => win(t, at + 2.3, at + 3.3, 0.35)), 0.8 * win(t, 23.6, 25.2, 0.6))
  const balls = ballsAt(t)
  const inside = balls.find((b) => b.seated > 0.5)

  // the sky
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalCompositeOperation = "source-over"
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, rgba(mix(SKY_TOP, PAPER, day), 1))
  sky.addColorStop(0.5, rgba(mix(SKY_MID, [245, 240, 228], day), 1))
  sky.addColorStop(0.74, rgba(mix(SKY_LOW, [238, 230, 214], day), 1))
  sky.addColorStop(1, rgba(mix(SKY_LOW, [230, 220, 200], day), 1))
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)
  // stars, only by night
  if (n > 0.1) {
    cam(ctx, t, 0.15)
    const r = rng(19)
    for (let i = 0; i < 260; i++) {
      const x = r() * 2400 - 240, y = r() * 760 - 120, s = r()
      const tw = 0.6 + 0.4 * Math.sin(t * (1 + s * 3) + i)
      ctx.fillStyle = rgba([236, 230, 240], (0.08 + 0.45 * s * s) * tw * n * (1 - 0.5 * lin(y, 400, 640)))
      ctx.beginPath()
      ctx.arc(x, y, 0.5 + s * 1.0, 0, 6.2832)
      ctx.fill()
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
  // a low glow where the sky meets the ground: cool by night, the sun's by day
  cam(ctx, t, 0.5)
  halo(ctx, 1150, 800, 1300, mix([120, 104, 170], [255, 226, 160], day), 0.22 + 0.35 * day)
  farDunes(ctx, t, n)

  cam(ctx, t)
  // the ground below the line
  const gr = ctx.createLinearGradient(0, 800, 0, 1300)
  gr.addColorStop(0, rgba(mix([74, 66, 104], [228, 218, 198], day), 1))
  gr.addColorStop(1, rgba(mix([52, 46, 78], [222, 211, 190], day), 1))
  ctx.fillStyle = gr
  ctx.beginPath()
  ctx.moveTo(-900, 1700)
  for (let x = -900; x <= W + 700; x += 24) ctx.lineTo(x, lineAt(x) + 1)
  ctx.lineTo(W + 700, 1700)
  ctx.closePath()
  ctx.fill()
  // the heap's own shadow and its light on the ground
  ctx.save()
  ctx.translate(1050, 812)
  ctx.scale(1, 0.09)
  halo(ctx, 0, 0, 760, mix([30, 26, 50], [150, 128, 90], day), 0.5)
  ctx.restore()

  // the light the models give
  const lights: Light[] = []
  for (const b of balls) {
    // outside, the first one pulls: its glow reaches for the heap
    if (b.i === 0 && t < 13) lights.push({ x: 1380, y: 520, c: GOLD_HI, a: 0.3 * win(t, 4, 12.6, 1.2), r: 300 })
    if (b.lit > 0) lights.push({ x: b.x, y: b.y + 150, c: mix(b.m.c, GRAIN, 0.25), a: 0.5 * b.lit * b.a, r: 250 })
  }
  const look = lookLight(t, inside)
  if (look) lights.push(look)

  field(ctx, t, n, lessons, lights, pulse)
  goldLine(ctx, n, Math.max(0.25 * up, ramp(t, 35.2, 37)))

  // halos behind the models
  for (const b of balls) {
    const pull = b.i === 0 ? win(t, 3.6, 12.4, 1) * (0.7 + 0.3 * Math.sin(t * 2.4)) : 0
    const hush = b.i === 0 ? ramp(t, 11.8, 13) * (1 - ramp(t, 15.4, 16.4)) : 0
    halo(ctx, b.x, b.y, BALL_R * 4.2, b.m.c, (0.16 + 0.42 * pull + 0.34 * b.lit) * (1 - 0.5 * hush) * b.a)
    if (pull > 0) halo(ctx, b.x, b.y, BALL_R * 9, b.m.c, 0.12 * pull * (1 - hush))
    if (b.lit > 0) halo(ctx, b.x, b.y, BALL_R * 8, b.m.c, 0.1 * b.lit * b.a * (0.4 + 0.6 * n))
  }

  liftedGrain(ctx, t, n)
  dome(ctx, t, n, up, press, gateAt(t), round)

  // the seat: a ring that waits while no model is in it
  const seat = ramp(t, 12.6, 13.4) * (1 - ramp(t, 35.4, 36.6))
  const empty = seat * (1 - Math.max(0, ...balls.map((b) => (b.seated > 0.92 ? 1 : 0))))
  if (seat > 0) {
    ctx.strokeStyle = rgba(GOLD, (0.25 + 0.4 * empty) * seat)
    ctx.lineWidth = 1.3
    ctx.setLineDash([3, 8])
    ctx.lineDashOffset = -t * 5
    ctx.beginPath()
    ctx.arc(SEAT[0], SEAT[1], BALL_R + 9, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
    // a ring goes out each time one settles
    for (const m of MODELS) {
      const f = lin(t, m.in1 - 0.05, m.in1 + 1.1)
      if (f <= 0 || f >= 1) continue
      ctx.strokeStyle = rgba(m.c, 0.7 * (1 - f) * (1 - f))
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.arc(SEAT[0], SEAT[1], BALL_R + 9 + 90 * (1 - (1 - f) * (1 - f)), 0, 6.2832)
      ctx.stroke()
    }
  }
  for (const b of balls) {
    orb(ctx, b.x, b.y, BALL_R * (0.9 + 0.1 * b.seated), b.m.kind, 77 + b.i, b.a)
    // asleep until it is seated: a veil over it while it waits
    const veil = 0.3 * (1 - b.lit) * (b.i === 0 && t < 12 ? 0 : 1)
    if (veil > 0) {
      ctx.fillStyle = rgba(mix([34, 30, 54], [240, 234, 220], day), veil * b.a)
      ctx.beginPath()
      ctx.arc(b.x, b.y, BALL_R * (0.9 + 0.1 * b.seated) + 0.5, 0, 6.2832)
      ctx.fill()
    }
  }

  const who = owner(ctx, t, n, inside ? inside.lit : 0)
  // he opens the gate: a spark from his hand to the wall
  for (const at of KEYS) fly(ctx, who.hand, GAP, 210, lin(t, at, at + 0.75), GOLD_HI, 4)
  asks(ctx, t, who.hand, who.chest, inside)

  // dust close to the lens, out of focus
  cam(ctx, t, 1.9)
  const dr = rng(321)
  for (let i = 0; i < 26; i++) {
    const x0 = dr() * 2600 - 300, y0 = dr() * 1300 - 100, s = dr(), ph = dr() * 6.28
    const x = x0 - t * (5 + 10 * s), y = y0 + 12 * Math.sin(t * 0.4 + ph)
    halo(ctx, x, y, 16 + 40 * s, s > 0.6 ? GOLD : [200, 190, 230], (0.05 + 0.07 * s) * n)
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // the edges fall away
  const vg = ctx.createRadialGradient(W / 2, H * 0.52, H * 0.42, W / 2, H * 0.52, H * 1.05)
  vg.addColorStop(0, "rgba(0,0,0,0)")
  vg.addColorStop(1, rgba(mix([14, 10, 30], [120, 96, 60], day), 0.5 * n + 0.14 * day))
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, W, H)

  // room for the words
  const words = win(t, 3.4, 35.6, 0.6)
  if (words > 0) {
    const mist = ctx.createLinearGradient(0, 850, 0, H)
    const mc = mix([44, 38, 68], PAPER, day)
    mist.addColorStop(0, rgba(mc, 0))
    mist.addColorStop(0.55, rgba(mc, 0.8 * words))
    mist.addColorStop(1, rgba(mc, 0.95 * words))
    ctx.fillStyle = mist
    ctx.fillRect(0, 850, W, H - 850)
  }
  // the close: the words sit on a quiet corner of the sky
  const close = ramp(t, 36, 36.9)
  if (close > 0) {
    const g = ctx.createRadialGradient(400, 270, 0, 400, 270, 700)
    g.addColorStop(0, rgba(PAPER, 0.85 * close * day))
    g.addColorStop(1, rgba(PAPER, 0))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }
}
