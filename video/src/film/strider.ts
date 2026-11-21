import type { Ctx } from "./core"

/**
 * The strider, drawn in the painting's own shapes: a floating head, a body that leans into the walk,
 * and long blade limbs that end in a point. Drawn fresh each frame so the legs can truly walk.
 * `walked` is how far the feet have carried the body, so a planted foot stays planted.
 */

/** A tapered blade from a (wide, rounded) to b (fine), bowed to one side. */
function blade(ctx: Ctx, ax: number, ay: number, bx: number, by: number, w0: number, w1: number, bow: number) {
  const dx = bx - ax, dy = by - ay
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len, ny = dx / len
  const cx = (ax + bx) / 2 + nx * bow * len, cy = (ay + by) / 2 + ny * bow * len
  const L: [number, number][] = [], R: [number, number][] = []
  const STEPS = 22
  for (let i = 0; i <= STEPS; i++) {
    const u = i / STEPS
    const x = (1 - u) * (1 - u) * ax + 2 * u * (1 - u) * cx + u * u * bx
    const y = (1 - u) * (1 - u) * ay + 2 * u * (1 - u) * cy + u * u * by
    const tx = 2 * (1 - u) * (cx - ax) + 2 * u * (bx - cx), ty = 2 * (1 - u) * (cy - ay) + 2 * u * (by - cy)
    const tl = Math.hypot(tx, ty) || 1
    const w = (w1 + (w0 - w1) * Math.pow(1 - u, 0.85)) * 0.5
    L.push([x - (ty / tl) * w, y + (tx / tl) * w])
    R.push([x + (ty / tl) * w, y - (tx / tl) * w])
  }
  ctx.beginPath()
  ctx.moveTo(L[0][0], L[0][1])
  for (const p of L) ctx.lineTo(p[0], p[1])
  for (let i = R.length - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1])
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.arc(ax, ay, w0 * 0.5, 0, 6.2832)
  ctx.fill()
}

/** Where one foot is, relative to the hip's ground point. Half the cycle planted, half swinging through. */
function foot(p: number, stride: number, lift: number): [number, number] {
  if (p < 0.5) return [stride / 2 - stride * (p / 0.5), 0]
  const u = (p - 0.5) / 0.5
  const e = u * u * (3 - 2 * u)
  return [-stride / 2 + stride * e, -lift * Math.sin(Math.PI * u)]
}

/**
 * A leg with a knee, drawn as one curved stroke the way the painting draws a limb: thigh and shin of
 * fixed length decide where the knee is, and the stroke bows through it. The knee always bends forward.
 */
function leg(ctx: Ctx, hx: number, hy: number, fx: number, fy: number, len: number, w: number) {
  const a = len / 2
  let dx = fx - hx, dy = fy - hy
  let d = Math.hypot(dx, dy)
  const max = len * 0.995
  if (d > max) { dx *= max / d; dy *= max / d; d = max }
  const ux = dx / d, uy = dy / d
  const perp = Math.sqrt(Math.max(0, a * a - (d / 2) * (d / 2)))
  // blade() bows along its left-hand normal; forward is the other side
  blade(ctx, hx, hy, hx + dx, hy + dy, w, 0, -(perp * 0.9) / d - 0.02)
}

export function strider(ctx: Ctx, fx: number, fy: number, h: number, walked: number, tone: { body: string; far: string }) {
  const stride = h * 0.66 // a long stride: it is his name
  const cyc = walked / (2 * stride)
  const frac = (v: number) => v - Math.floor(v)
  const beat = Math.cos(cyc * 4 * Math.PI) // +1 with both feet down and legs widest, -1 as one leg passes the other
  const L = h * 0.62
  const hx = fx
  const hy = fy - h * (0.5475 - 0.0225 * beat)
  const lean = 0.3 + 0.08 * beat
  const T = h * 0.31
  const shx = hx + Math.sin(lean) * T, shy = hy - Math.cos(lean) * T
  const [f1x, f1y] = foot(frac(cyc), stride, h * 0.05)
  const [f2x, f2y] = foot(frac(cyc + 0.5), stride, h * 0.05)
  const swing = Math.sin(cyc * 2 * Math.PI)
  const arm = (dir: number, w: number) => {
    const a = -0.06 + 0.62 * dir * swing
    const ax = shx - h * 0.012, ay = shy + h * 0.03
    blade(ctx, ax, ay, ax + Math.sin(a) * h * 0.31, ay + Math.cos(a) * h * 0.31, w, 0, -0.07)
  }

  // far arm and far leg, a shade lighter, behind the body
  ctx.fillStyle = tone.far
  arm(1, h * 0.034)
  leg(ctx, hx, hy, fx + f2x, fy + f2y, L, h * 0.104)
  // the body, the near leg, the near arm
  ctx.fillStyle = tone.body
  leg(ctx, hx, hy, fx + f1x, fy + f1y, L, h * 0.108)
  blade(ctx, shx, shy, hx, hy, h * 0.124, h * 0.106, 0.06)
  arm(-1, h * 0.038)
  // the head floats just clear of the shoulders
  ctx.beginPath()
  ctx.arc(shx + h * 0.012, shy - h * 0.098, h * 0.044, 0, 6.2832)
  ctx.fill()
}

/* ---------- the same figure, posed: he can start, stop, stand and lift an arm ---------- */

export type Pose = {
  /** hip, in the picture */
  hx: number; hy: number; h: number
  /** near foot and far foot, in the picture */
  fa: [number, number]; fb: [number, number]
  lean: number
  /** arm angles from straight down, positive forward */
  armN: number; armF: number
  /** when set, the head follows the spine at this angle: for a deep bow */
  nod?: number
}

/** Draws a pose. Gives back where the near hand and the head are. */
export function figure(ctx: Ctx, p: Pose, tone: { body: string; far: string }): { hand: [number, number]; head: [number, number] } {
  const { hx, hy, h } = p
  const L = h * 0.62
  const T = h * 0.31
  const shx = hx + Math.sin(p.lean) * T, shy = hy - Math.cos(p.lean) * T
  const ax = shx - h * 0.012, ay = shy + h * 0.03
  const AL = h * 0.31
  const arm = (a: number, w: number): [number, number] => {
    const ex = ax + Math.sin(a) * AL, ey = ay + Math.cos(a) * AL
    // a hanging arm bows a little back at the elbow; a lifted one straightens
    blade(ctx, ax, ay, ex, ey, w, 0, -0.07 * Math.cos(Math.min(1.5, Math.abs(a))))
    return [ex, ey]
  }
  ctx.fillStyle = tone.far
  arm(p.armF, h * 0.034)
  leg(ctx, hx, hy, p.fb[0], p.fb[1], L, h * 0.104)
  ctx.fillStyle = tone.body
  leg(ctx, hx, hy, p.fa[0], p.fa[1], L, h * 0.108)
  blade(ctx, shx, shy, hx, hy, h * 0.124, h * 0.106, 0.06)
  const hand = arm(p.armN, h * 0.038)
  const head: [number, number] = p.nod === undefined ? [shx + h * 0.012 + Math.sin(p.lean) * h * 0.02, shy - h * 0.098] : [shx + h * 0.012 + Math.sin(p.nod) * h * 0.09, shy - Math.cos(p.nod) * h * 0.098]
  ctx.beginPath()
  ctx.arc(head[0], head[1], h * 0.044, 0, 6.2832)
  ctx.fill()
  return { hand, head }
}

/** Where the near hand of a pose is, without drawing it. */
export function handOf(p: Pose): [number, number] {
  const T = p.h * 0.31
  const ax = p.hx + Math.sin(p.lean) * T - p.h * 0.012, ay = p.hy - Math.cos(p.lean) * T + p.h * 0.03
  return [ax + Math.sin(p.armN) * p.h * 0.31, ay + Math.cos(p.armN) * p.h * 0.31]
}

const sstep = (u: number) => u * u * (3 - 2 * u)
const mixn = (a: number, b: number, f: number) => a + (b - a) * f

/**
 * A walk made of real steps. He stands at x0, takes `steps` steps and stands again, having gone
 * (steps - 1) strides. `s` is how far the hip has come. With `on` he does not stop: he keeps walking.
 * Every foot stays where it lands until it lifts, so nothing slides.
 */
export function walkPose(x0: number, gy: number, h: number, s: number, steps: number, on = false, breath = 0, rest = 1.6): Pose {
  const S = h * 0.66
  const D = (steps - 1) * S
  const d = 0.05 * h // how far apart the feet rest when he stands
  s = Math.max(0, on ? s : Math.min(D, s))
  // which step is in the air: step 0 and the last one are half steps
  let kk: number, u: number
  if (s < S / 2) { kk = 0; u = s / (S / 2) }
  else if (!on && s >= D - S / 2) { kk = steps - 1; u = D > 0 ? (s - (D - S / 2)) / (S / 2) : 1 }
  else { kk = 1 + Math.floor((s - S / 2) / S); u = ((s - S / 2) / S) % 1 }
  const last = !on && kk === steps - 1
  const nearSwings = kk % 2 === 0
  // where a foot is after step j: before his first step it rests beside the other one
  const land = (j: number, near: boolean) => {
    if (j < 0) return x0 + (near ? d : -d)
    if (!on && j >= steps - 1) return x0 + D + (near ? rest * d : -rest * d)
    return x0 + S * (j + 1)
  }
  const from = land(kk - 2, nearSwings), to = land(kk, nearSwings)
  const e = sstep(u)
  const lift = h * (kk === 0 || last ? 0.032 : 0.055) * Math.sin(Math.PI * Math.pow(u, 0.85))
  const sw: [number, number] = [mixn(from, to, e), gy - lift]
  const st: [number, number] = [land(kk - 1, !nearSwings), gy]
  const fa = nearSwings ? sw : st, fb = nearSwings ? st : sw
  const g = kk === 0 ? sstep(u) : last ? 1 - sstep(u) : 1 // how much he is walking
  const beat = Math.cos(2 * Math.PI * u)
  const hipWalk = 0.5475 - 0.0225 * beat
  const hipH = kk === 0 ? mixn(0.598, 0.525, sstep(u)) : last ? mixn(0.525, 0.598, sstep(u)) : hipWalk
  const hx = x0 + s
  const hy = gy - h * (hipH + 0.004 * Math.sin(breath) * (1 - g))
  const lean = mixn(0.05, 0.27 + 0.05 * beat, g)
  // each arm swings against its own leg, and is widest when the legs are widest
  const A = 0.5 * g
  const armN = -0.05 - (A * (fa[0] - hx)) / (S / 2) + 0.03 * (1 - g)
  const armF = -0.05 - (A * (fb[0] - hx)) / (S / 2) - 0.02 * (1 - g)
  return { hx, hy, h, fa, fb, lean, armN, armF }
}

/** An even walk that eases away from rest and eases back to it. `u` and the answer run 0 to 1. */
export function glide(u: number, e = 0.22): number {
  u = Math.max(0, Math.min(1, u))
  const v = 1 / (1 - e)
  if (u < e) return (v * u * u) / (2 * e)
  if (u > 1 - e) return 1 - (v * (1 - u) * (1 - u)) / (2 * e)
  return v * (u - e / 2)
}
