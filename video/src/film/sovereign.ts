import { k, ramp, rng, win } from "../util"
import { type Ctx, H, type RGB, SAND_DAY, W, blank, gz, halo, lin, makeNoise, mix, orb, rgba, spline } from "./core"
import { spark } from "./cost"
import type { Plates } from "./plates"
import { strider } from "./strider"

/**
 * The sovereign film: nothing leaves the building.
 * It lives in the night painting: a dark sky, a field of pale grain, the gold line with the letter, the dated
 * arch and the gold nodes above. All of it is drawn fresh here, in the painting's own marks, so it can move.
 * The wall is a thin gold dome over the field. Work lifts toward a model outside and stops at the glass.
 * Then the model comes inside instead. Models come and go through the same gap. The wall stays.
 */
export const SOV_SECONDS = 37

const SKY_TOP: RGB = [48, 44, 69]
const SKY_MID: RGB = [55, 49, 79]
const SKY_LOW: RGB = [65, 58, 92]
const PAPER: RGB = [250, 247, 240]
const GRAIN: RGB = [236, 230, 240]
const GOLD: RGB = [232, 204, 154]
const GOLD_DEEP: RGB = [200, 169, 110]
const GOLD_HI: RGB = [255, 236, 190]
const INKC: RGB = [31, 27, 20]

/* ---------- the places ---------- */

/** The wall: a dome over the field, its feet on the gold line. */
const DOME = { x: 960, y: 800, rx: 720, ry: 600 }
/** The model's seat inside, and where it waits outside, up in the sky. */
const SEAT: [number, number] = [1180, 400]
const OUT: [number, number] = [1640, 130]
const BALL_R = 46
/** Where the straight path from outside to the seat crosses the wall: that is the gap. */
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
const GAP_P = crossing(OUT[0], OUT[1], SEAT[0], SEAT[1])
const GAP: [number, number] = [OUT[0] + (SEAT[0] - OUT[0]) * GAP_P, OUT[1] + (SEAT[1] - OUT[1]) * GAP_P]
const GAP_A = Math.atan2((GAP[1] - DOME.y) / DOME.ry, (GAP[0] - DOME.x) / DOME.rx) + 2 * Math.PI

/** The top of the field of grain, a low hill, and the gold line below it. */
const lineAt = (x: number) => 804 - 70 * Math.pow(Math.max(0, (x - 820) / 1100), 1.7)
const F0 = 290, F1 = 1630
const fieldTop = (x: number) => lineAt(x) - 290 * Math.pow(Math.sin(Math.PI * lin(x, F0, F1)), 1.15)
const LETTER: [number, number] = [1070, 770]

/** The arch: its stones from the left foot round to the right, dark to light, and two ghost stones to come. */
const ARCH = { x: 610, y: 712, ro: 300, ri: 236, a0: Math.PI + 0.22, a1: 2 * Math.PI - 0.18, n: 11 }
/** The nodes above the field, and which are joined. */
const NODES: [number, number, number][] = [[1010, 300, 15], [1425, 290, 17], [1300, 485, 19], [1475, 560, 21], [880, 525, 19], [720, 380, 12]]
const JOINS: [number, number][] = [[5, 0], [0, 1], [0, 2], [1, 3], [2, 3], [4, 2], [5, 4], [1, 2]]

export type Scene = { P: Plates; buf: HTMLCanvasElement }
export function buildScene(): Scene {
  // the finishing pass needs only a small working canvas and the grain
  const P = { small: blank(W / 4, H / 4), noise: makeNoise() } as unknown as Plates
  return { P, buf: blank(W, H) }
}

/* ---------- the clock ---------- */

/** 1 is night, 0 is day. Night nearly all the way; dawn at the close; dark again to loop. */
export const nightAt = (t: number) => k(t, [[0, 1], [32.3, 1], [34.2, 0], [35.9, 0], [36.6, 1]])
/** How far the camera stands. It leans in while the work is held, and steps back to see the whole wall. */
const camAt = (t: number) => ({
  z: spline(t, [[0, 1.04], [8, 1.1], [12, 1.12], [16.5, 1.06], [25, 1.04], [29, 1.03], [32.5, 0.9], [37, 0.9]]),
  x: spline(t, [[0, 960], [8, 1060], [12, 1080], [16.5, 1000], [25, 960], [32.5, 960], [37, 960]]),
  y: spline(t, [[0, 600], [8, 560], [12, 560], [16.5, 590], [25, 600], [32.5, 600], [37, 600]]),
})
function cam(ctx: Ctx, t: number, near = 0) {
  const c = camAt(t)
  const z = c.z * (1 + near)
  ctx.setTransform(z, 0, 0, z, W / 2 - c.x * z, H / 2 - c.y * z)
}

/* ---------- the field ---------- */

function field(ctx: Ctx, t: number, n: number, thick: number) {
  // the body of the hill: a breath lighter than the sky, gone by the gold line
  const body = ctx.createLinearGradient(0, 520, 0, 800)
  body.addColorStop(0, rgba(mix([91, 83, 108], [214, 206, 190], 1 - n), 0.55))
  body.addColorStop(1, rgba(mix(SKY_LOW, [226, 218, 204], 1 - n), 0))
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.moveTo(F0, lineAt(F0))
  for (let x = F0; x <= F1; x += 12) ctx.lineTo(x, fieldTop(x))
  for (let x = F1; x >= F0; x -= 40) ctx.lineTo(x, lineAt(x))
  ctx.closePath()
  ctx.fill()
  // the grain: thick along the top edge, thinning down to the line, a few strays above
  const r = rng(31)
  const day = 1 - n
  const total = Math.round(17000 * (1 + 0.5 * thick))
  for (let i = 0; i < 26000; i++) {
    const u = r(), v = Math.pow(r(), 2.2), s = r(), c = r()
    if (i >= total) continue
    const x = F0 + u * (F1 - F0)
    const top = fieldTop(x)
    const stray = s > 0.985
    const y = stray ? top - r() * 70 : top + v * (lineAt(x) - 6 - top)
    const nightC = mix(GRAIN, GOLD_HI, c * 0.35)
    const dayC = SAND_DAY[Math.floor(c * SAND_DAY.length)]
    const a = (stray ? 0.25 : 0.22 + 0.7 * (1 - v)) * (0.7 + 0.3 * c)
    ctx.fillStyle = rgba(mix(nightC, dayC, day), a * (day > 0 ? 0.75 + 0.25 * n : 1))
    ctx.beginPath()
    ctx.arc(x, y, 0.7 + s * 1.5, 0, 6.2832)
    ctx.fill()
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
      ctx.fillStyle = rgba(mix(GRAIN, GOLD_HI, g.c * 0.35), 0.6 + 0.3 * g.c)
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

function dome(ctx: Ctx, t: number, n: number, edge: number, press: number, gapOpen: number, round: number) {
  const a = edge
  if (a <= 0) return
  const { x, y, rx, ry } = DOME
  const col = mix([176, 132, 52], mix(GOLD, GOLD_HI, 0.3), n)
  // the arc, faint, and with a gap while something passes through it
  const draw = (from: number, to: number, alpha: number, wdt: number, blur: number) => {
    if (to <= from || alpha <= 0) return
    ctx.strokeStyle = rgba(col, alpha)
    ctx.lineWidth = wdt
    ctx.shadowColor = rgba(col, 0.9 * n)
    ctx.shadowBlur = blur
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, from, to)
    ctx.stroke()
    ctx.shadowBlur = 0
  }
  const g = 0.085 * gapOpen
  const base = (0.24 + 0.5 * round) * a
  draw(Math.PI, GAP_A - g, base, 1.3 + 1.4 * round, 6 + 18 * round)
  draw(GAP_A + g, 2 * Math.PI, base, 1.3 + 1.4 * round, 6 + 18 * round)
  // seen whole, the wall goes all the way round, under the ground too
  draw(0, Math.PI, 0.45 * round * a, 1.3 + 1.2 * round, 6 + 14 * round)
  // where the grain presses, the glass lights up along the arc
  if (press > 0) {
    ctx.save()
    ctx.globalCompositeOperation = "lighter"
    for (let s = 0; s < 1; s += 1 / 70) {
      const ang = Math.PI + s * Math.PI
      const px = x + rx * Math.cos(ang), py = y + ry * Math.sin(ang)
      // how much grain is near this stretch of wall
      const d = Math.hypot(px - 1470, py - 360)
      const w = Math.exp(-(d * d) / (2 * 250 * 250)) * (0.85 + 0.15 * Math.sin(t * 3.1 + s * 40))
      if (w < 0.02) continue
      halo(ctx, px, py, 60, GOLD_HI, 0.22 * press * w)
    }
    ctx.restore()
    draw(Math.PI, 2 * Math.PI, 0.3 * press, 1.8, 10)
    draw(1.5 * Math.PI, 2 * Math.PI - 0.12, 0.55 * press, 2.6, 18)
  }
  // the gap's bright ends
  if (gapOpen > 0) {
    for (const s of [-1, 1]) {
      const ang = GAP_A + s * g
      const px = x + rx * Math.cos(ang), py = y + ry * Math.sin(ang)
      halo(ctx, px, py, 34, GOLD_HI, 0.6 * gapOpen)
      ctx.fillStyle = rgba(GOLD_HI, 0.9 * gapOpen)
      ctx.beginPath()
      ctx.arc(px, py, 2.6, 0, 6.2832)
      ctx.fill()
    }
  }
  // seen whole: a soft inner breath of gold against the sky
  if (round > 0) {
    ctx.save()
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, Math.PI, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()
    ctx.beginPath()
    ctx.rect(x - rx, y - ry, rx * 2, ry - 70)
    ctx.clip()
    const gl = ctx.createRadialGradient(x, y, ry * 0.8, x, y, ry)
    gl.addColorStop(0, rgba(col, 0))
    gl.addColorStop(1, rgba(col, 0.14 * round))
    ctx.fillStyle = gl
    ctx.fillRect(x - rx, y - ry, rx * 2, ry)
    ctx.restore()
  }
}

/* ---------- the gold line, the letter, the arch, the nodes ---------- */

function goldLine(ctx: Ctx, t: number, n: number, lit: number) {
  const col = mix(GOLD_DEEP, GOLD_HI, 0.3 * lit)
  ctx.strokeStyle = rgba(col, 0.9)
  ctx.lineWidth = 3.2
  ctx.shadowColor = rgba(GOLD_HI, 0.8 * lit)
  ctx.shadowBlur = 16 * lit
  ctx.beginPath()
  for (let x = -400; x <= W + 400; x += 16) x === -400 ? ctx.moveTo(x, lineAt(x)) : ctx.lineTo(x, lineAt(x))
  ctx.stroke()
  ctx.shadowBlur = 0
  // the small ball on the line, and the letter beside it
  const bx = 1000, by = lineAt(1000)
  halo(ctx, bx, by, 20, GOLD_HI, 0.3 + 0.4 * lit)
  ctx.fillStyle = rgba(col, 1)
  ctx.beginPath()
  ctx.arc(bx, by, 9, 0, 6.2832)
  ctx.fill()
  const [lx, ly] = LETTER
  const lw = 60, lh = 38
  halo(ctx, lx, ly - lh / 2, 70, GOLD_HI, 0.35 * lit)
  ctx.fillStyle = rgba(mix([241, 235, 223], [255, 248, 230], lit), 1)
  ctx.fillRect(lx - lw / 2, ly - lh, lw, lh)
  ctx.strokeStyle = rgba(mix([196, 176, 130], GOLD_DEEP, lit), 0.9)
  ctx.lineWidth = 1.4
  ctx.beginPath()
  ctx.moveTo(lx - lw / 2, ly - lh)
  ctx.lineTo(lx, ly - lh * 0.42)
  ctx.lineTo(lx + lw / 2, ly - lh)
  ctx.stroke()
}

function arch(ctx: Ctx, t: number, n: number, built: number) {
  const { x, y, ro, ri, a0, a1, n: N } = ARCH
  const step = (a1 - a0) / (N + 2)
  const gapA = 0.012
  for (let i = 0; i < N + 2; i++) {
    const p = lin(built, i / (N + 2), i / (N + 2) + 1.4 / (N + 2))
    if (p <= 0) continue
    const s0 = a0 + step * i + gapA, s1 = a0 + step * (i + 1) - gapA
    const ghost = i >= N
    const e = 1 - Math.pow(1 - p, 3)
    // each stone rises into its place from a little below
    const dy = (1 - e) * 60
    const shade = mix([84, 70, 38], [206, 176, 116], i / (N - 1))
    ctx.save()
    ctx.translate(0, dy)
    ctx.beginPath()
    ctx.arc(x, y, ro, s0, s1)
    ctx.arc(x, y, ri, s1, s0, true)
    ctx.closePath()
    if (ghost) {
      ctx.strokeStyle = rgba(mix(GOLD_DEEP, INKC, 0.3 * (1 - n)), 0.7 * e)
      ctx.lineWidth = 1.6
      ctx.setLineDash([7, 6])
      ctx.stroke()
      ctx.setLineDash([])
    } else {
      ctx.fillStyle = rgba(mix(shade, mix(shade, PAPER, 0.1), 1 - n), e)
      ctx.fill()
      if (p < 1) halo(ctx, x + ((ro + ri) / 2) * Math.cos((s0 + s1) / 2), y + ((ro + ri) / 2) * Math.sin((s0 + s1) / 2), 50, GOLD_HI, 0.5 * Math.sin(Math.PI * p))
    }
    ctx.restore()
  }
}

function nodes(ctx: Ctx, t: number, n: number, built: number, lit: number) {
  // the joins, thin arcs bowed upward, drawn on in order
  ctx.lineCap = "round"
  JOINS.forEach(([a, b], i) => {
    const p = lin(built, 0.2 + (i / JOINS.length) * 0.8, 0.2 + (i / JOINS.length) * 0.8 + 0.18)
    if (p <= 0) return
    const [x0, y0] = NODES[a], [x1, y1] = NODES[b]
    const mx = (x0 + x1) / 2, my = Math.min(y0, y1) - 90 - (i % 3) * 30
    const e = 1 - Math.pow(1 - p, 2)
    ctx.strokeStyle = rgba(mix(GOLD_DEEP, GOLD_HI, 0.4), 0.55 * (0.7 + 0.3 * lit))
    ctx.lineWidth = 1.1
    ctx.beginPath()
    for (let s = 0; s <= 24; s++) {
      const u = (e * s) / 24
      const px = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1
      const py = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1
      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    }
    ctx.stroke()
    if (p < 1) {
      const u = e
      halo(ctx, (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1, 22, GOLD_HI, 0.8)
    }
  })
  NODES.forEach(([x, y, r], i) => {
    const p = lin(built, (i / NODES.length) * 0.35, (i / NODES.length) * 0.35 + 0.2)
    if (p <= 0) return
    const pop = 1 + 0.4 * Math.sin(Math.PI * p) * (p < 1 ? 1 : 0)
    halo(ctx, x, y, r * 3.6, GOLD_HI, (0.28 + 0.2 * lit) * p * n + 0.06 * (1 - n))
    orb(ctx, x, y, r * pop, "gold", 600 + i, p)
  })
}

/* ---------- the model ---------- */

/** Where the model ball is: outside, on its way in, seated, on its way out; then the second one. */
function ballAt(t: number): { x: number; y: number; kind: "gold" | "pearl"; a: number; glow: number; dim: number } | null {
  // the first model
  if (t < 27.2) {
    const inn = ramp(t, 13.0, 15.6)
    const out = ramp(t, 25.0, 27.2)
    const e = 1 - Math.pow(1 - inn, 2.2)
    let x = OUT[0] + (SEAT[0] - OUT[0]) * e, y = OUT[1] + (SEAT[1] - OUT[1]) * e
    if (out > 0) {
      const eo = out * out
      x = SEAT[0] + (OUT[0] - SEAT[0]) * eo
      y = SEAT[1] + (OUT[1] - SEAT[1]) * eo
    }
    const glow = win(t, 3.5, 12.6, 1) * (0.7 + 0.3 * Math.sin(t * 2.4))
    return { x, y, kind: "gold", a: ramp(t, 3.4, 4.4) * (1 - ramp(t, 26.6, 27.2)), glow, dim: ramp(t, 12, 13.2) * (1 - ramp(t, 15.4, 16.6)) }
  }
  // the second one, a different ball through the same gap
  const inn = ramp(t, 26.9, 28.9)
  const e = 1 - Math.pow(1 - inn, 2.2)
  return { x: OUT[0] + (SEAT[0] - OUT[0]) * e, y: OUT[1] + (SEAT[1] - OUT[1]) * e, kind: "pearl", a: ramp(t, 26.9, 27.5), glow: 0, dim: 0 }
}

/** When the model is passing through the wall, the gap is open. */
const gapAt = (t: number) => Math.max(win(t, 13.2, 15.4, 0.6), win(t, 25.2, 28.6, 0.5))

/* ---------- questions and answers ---------- */

const ASKS: [number, number][] = [[16.6, 0], [17.7, 1], [18.9, 2], [20.1, 0], [21.6, 1], [29.6, 1], [30.9, 0]]
const FROM: [number, number][] = [[900, 610], [1060, 585], [780, 650]]

function asks(ctx: Ctx, t: number, n: number) {
  const b = ballAt(t)
  if (!b) return
  const [lx, ly] = LETTER
  ASKS.forEach(([at, which], i) => {
    // a spark runs in along the gold line to the letter
    const run = lin(t, at, at + 0.7)
    if (run > 0 && run < 1) {
      const e = 1 - (1 - run) * (1 - run)
      const x0 = -60, x1 = lx - 40
      const sx = x0 + (x1 - x0) * e, px = x0 + (x1 - x0) * Math.max(0, e - 0.12)
      spark(ctx, sx, lineAt(sx) - 4, px, lineAt(px) - 4, GOLD, 1, 5, [255, 250, 232])
    }
    // the letter lights, and a thin thread rises from the field to the model
    const [fx, fy] = FROM[which]
    const up = lin(t, at + 0.6, at + 1.3)
    if (up > 0) {
      const a = 1 - ramp(t, at + 2.4, at + 3.2)
      ctx.strokeStyle = rgba(GOLD, 0.6 * a)
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(fx, fy)
      ctx.lineTo(fx + (b.x - fx) * up, fy + (b.y - fy) * up)
      ctx.stroke()
      // a pinch of grain goes up the thread
      const r = rng(700 + i)
      for (let j = 0; j < 12; j++) {
        const lag = r() * 0.3, w = gz(r) * 2
        const ph = Math.max(0, Math.min(1, (lin(t, at + 0.6, at + 1.5) - lag) / 0.7))
        if (ph <= 0 || ph >= 1) continue
        ctx.fillStyle = rgba(GOLD_HI, 0.95)
        ctx.beginPath()
        ctx.arc(fx + (b.x - fx) * ph + w, fy + (b.y - fy) * ph + w * 0.5, 1.4 + r() * 1.3, 0, 6.2832)
        ctx.fill()
      }
    }
    // the model flares, and the answer drops back to the line
    const fl = lin(t, at + 1.4, at + 1.9)
    if (fl > 0 && fl < 1) halo(ctx, b.x, b.y, BALL_R * 2.6, b.kind === "gold" ? GOLD_HI : [214, 204, 255], 0.55 * Math.sin(Math.PI * fl))
    const dn = lin(t, at + 1.7, at + 2.4)
    if (dn > 0 && dn < 1) {
      const e = dn * dn, e0 = Math.max(0, dn - 0.18) ** 2
      const tx = lx + 60, ty = lineAt(lx + 60) - 6
      spark(ctx, b.x + (tx - b.x) * e, b.y + (ty - b.y) * e, b.x + (tx - b.x) * e0, b.y + (ty - b.y) * e0, GOLD, 1, 5, [255, 250, 232])
    }
  })
}

/* ---------- the whole scene ---------- */

/** The film, and at the very end a soft return to its own first frame, so the loop has no seam. */
export function sovereignScene(ctx: Ctx, t: number, S: Scene) {
  paint(ctx, t)
  const back = ramp(t, 36.3, SOV_SECONDS)
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
  const press = ramp(t, 7.6, 10.4) * (1 - ramp(t, 12, 13.2))
  const built = lin(t, 21, 25)
  const lineLit = Math.max(win(t, 16.6, 25.5, 1.2), ramp(t, 32.3, 34))
  const round = ramp(t, 29, 31.5) * (1 - 0.45 * ramp(t, 33, 34.6))
  const edge = ramp(t, 0.4, 2.4)

  // the sky
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, rgba(mix(SKY_TOP, PAPER, day), 1))
  sky.addColorStop(0.5, rgba(mix(SKY_MID, [245, 240, 228], day), 1))
  sky.addColorStop(0.74, rgba(mix(SKY_LOW, [238, 230, 214], day), 1))
  sky.addColorStop(1, rgba(mix(SKY_LOW, [230, 220, 200], day), 1))
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)
  // dawn: warm light low in the sky behind the field
  if (day > 0) {
    const g = ctx.createRadialGradient(1100, 760, 0, 1100, 760, 1200)
    g.addColorStop(0, rgba([255, 226, 160], 0.5 * day))
    g.addColorStop(0.5, rgba([255, 226, 160], 0.12 * day))
    g.addColorStop(1, rgba([255, 226, 160], 0))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }
  // stars, only by night
  if (n > 0.1) {
    const r = rng(19)
    for (let i = 0; i < 180; i++) {
      const x = r() * W, y = r() * 520, s = r()
      const tw = 0.6 + 0.4 * Math.sin(t * (1 + s * 3) + i)
      ctx.fillStyle = rgba([236, 230, 240], (0.08 + 0.4 * s * s) * tw * n)
      ctx.beginPath()
      ctx.arc(x, y, 0.5 + s * 0.9, 0, 6.2832)
      ctx.fill()
    }
  }

  cam(ctx, t)
  // the ground below the line is a shade lighter, like the painting
  ctx.fillStyle = rgba(mix([68, 61, 95], [226, 216, 196], day), 0.6)
  ctx.beginPath()
  ctx.moveTo(-400, 1500)
  for (let x = -400; x <= W + 400; x += 24) ctx.lineTo(x, lineAt(x) + 2)
  ctx.lineTo(W + 400, 1500)
  ctx.closePath()
  ctx.fill()

  field(ctx, t, n, built)
  arch(ctx, t, n, built)
  goldLine(ctx, t, n, lineLit)
  nodes(ctx, t, n, built, lineLit)

  // the model outside: it glows, and the grain starts to lift toward it
  const b = ballAt(t)
  if (b && b.a > 0) {
    const c: RGB = b.kind === "gold" ? GOLD_HI : [214, 204, 255]
    halo(ctx, b.x, b.y, BALL_R * 4, c, (0.18 + 0.45 * b.glow + 0.2 * ramp(t, 15.6, 16.8)) * (1 - b.dim * 0.45) * b.a)
    if (b.glow > 0) halo(ctx, b.x, b.y, BALL_R * 9, c, 0.12 * b.glow * (1 - b.dim))
  }

  liftedGrain(ctx, t, n)
  dome(ctx, t, n, edge, press, gapAt(t), round)

  if (b && b.a > 0) {
    // the seat, drawn only while the first model is away and the second not yet in
    const empty = win(t, 25.4, 28.6, 0.3)
    if (empty > 0) {
      ctx.strokeStyle = rgba(GOLD, 0.6 * empty)
      ctx.lineWidth = 1.2
      ctx.setLineDash([3, 8])
      ctx.lineDashOffset = -t * 5
      ctx.beginPath()
      ctx.arc(SEAT[0], SEAT[1], BALL_R + 6, 0, 6.2832)
      ctx.stroke()
      ctx.setLineDash([])
    }
    const dimmed = b.kind === "gold" ? b.dim * 0.22 : 0
    orb(ctx, b.x, b.y, BALL_R, b.kind, 77, b.a)
    if (dimmed > 0) {
      ctx.fillStyle = rgba([30, 26, 48], dimmed * b.a)
      ctx.beginPath()
      ctx.arc(b.x, b.y, BALL_R, 0, 6.2832)
      ctx.fill()
    }
    // the second model wakes once it is seated
    if (b.kind === "pearl") halo(ctx, b.x, b.y, BALL_R * 2.4, [214, 204, 255], 0.35 * ramp(t, 28.8, 29.6))
  }
  asks(ctx, t, n)

  // the strider walks the gold line at dawn
  const st = ramp(t, 32.8, 33.6) * (1 - ramp(t, 35.8, 36.4))
  if (st > 0) {
    const walked = (t - 32.6) * 150
    const fx = 330 + walked * 0.92
    const fy = lineAt(fx) - 2
    ctx.save()
    ctx.globalAlpha = st
    strider(ctx, fx, fy, 250, walked, { body: "rgba(50,46,42,1)", far: "rgba(86,80,74,1)" })
    ctx.restore()
  }

  // dust close to the lens, out of focus
  cam(ctx, t, 0.4)
  const dr = rng(321)
  for (let i = 0; i < 22; i++) {
    const x0 = dr() * 2400 - 200, y0 = dr() * 1300 - 100, s = dr(), ph = dr() * 6.28
    const x = x0 - t * (5 + 10 * s), y = y0 + 12 * Math.sin(t * 0.4 + ph)
    halo(ctx, x, y, 16 + 40 * s, s > 0.6 ? GOLD : [200, 190, 230], (0.05 + 0.07 * s) * n)
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // room for the words
  const words = win(t, 3.4, 32.6, 0.6)
  if (words > 0) {
    const mist = ctx.createLinearGradient(0, 860, 0, H)
    const mc = mix(SKY_LOW, PAPER, day)
    mist.addColorStop(0, rgba(mc, 0))
    mist.addColorStop(0.55, rgba(mc, 0.82 * words))
    mist.addColorStop(1, rgba(mc, 0.95 * words))
    ctx.fillStyle = mist
    ctx.fillRect(0, 860, W, H - 860)
  }
  // the close: the words sit on a quiet corner of the sky
  const close = ramp(t, 32.8, 33.6)
  if (close > 0) {
    const g = ctx.createRadialGradient(420, 280, 0, 420, 280, 760)
    g.addColorStop(0, rgba(PAPER, 0.8 * close * day))
    g.addColorStop(1, rgba(PAPER, 0))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }
}
