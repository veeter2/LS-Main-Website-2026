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
