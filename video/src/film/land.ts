import { C } from "../beats"
import { k, ramp, rng, win } from "../util"
import { type Ctx, H, LY, type RGB, SX, W, glowAt, gz, halo, hex, lin, mix, orb, palAt, pile, rgba, sm, spline, splash, stream, trail } from "./core"
import { type Cam, type Plates, camT, depthAt, warp } from "./plates"
import { type Pose, figure, walkPose } from "./strider"

/* The second world: your land. One painting, relit, with a camera moving through it. The sand lands on it and stays. */
export const MX = SX
export const MY = 318
export const MR = 37

/**
 * How far the gold has run from the heap, as a share of the whole land. It compounds: the first sand
 * gilds the road by the heap, and each fall after it carries the gold further, to the gateway and beyond.
 */
const FALLS = [19.5, 21.1, 22.7] // when each later fall of sand starts; it lands 1.18 seconds after
const LAND = 1.18
const goldAt = (t: number) =>
  0.2 * lin(t, 13.5, 18.6) + 0.1 * ramp(t, FALLS[0] + LAND, FALLS[0] + LAND + 1.3) + 0.16 * ramp(t, FALLS[1] + LAND, FALLS[1] + LAND + 1.3) + 0.6 * ramp(t, FALLS[2] + LAND, FALLS[2] + LAND + 1.7)

/** A slow push in over the whole land, sinking to the heap, rising to the model at night, easing back at dawn. */
export const camAt = (t: number): Cam => ({
  z: spline(t, [[11.2, 0.24], [13.8, 0.045], [19, 0.12], [26, 0.2], [30.6, 0.22], [35, 0.31]]),
  px: spline(t, [[11.2, 10], [13.6, -28], [19, 6], [26, 34], [30.6, 12], [35, 64]]),
  py: spline(t, [[11.2, -6], [19, 8], [26, 2], [30.6, -10], [35, -2]]),
})

/** A lamp does not fade on. It catches, stutters, and holds. */
export const flick = (s: number) => (s < 0 ? 0 : s < 0.07 ? 0.85 : s < 0.13 ? 0.15 : s < 0.2 ? 1 : s < 0.25 ? 0.45 : 1)

/** The painting for this moment, before the camera: gold, shadow, the hour of the day, lamps, stars. */
/** Everything about the hour and the state of the land that a film decides for itself. */
export type Light = {
  t: number
  n: number // 1 night, 0 day
  warm: number // low sun: dusk and dawn
  gold: number // how far the gold has run from the heap, 0 to 1.05
  sunLow: number // 0 sun up in the gateway, 1 sun down behind the hill
  reach: number // how far the low sun's light reaches, in pixels
  lamp: (rank: number) => number // how lit a lamp is, by its place down the road
}

export function compose(P: Plates, L: Light) {
  const { t, n, warm } = L
  const c = P.sceneCtx
  c.setTransform(1, 0, 0, 1, 0, 0)
  c.globalAlpha = 1
  c.globalCompositeOperation = "source-over"
  c.filter = "none"

  // the land before the gold, then the gold running out along the road from where the sand lands
  const g = L.gold
  const front = g * (P.maxDist + 130)
  if (g <= 0) c.drawImage(P.grey, 0, 0)
  else if (g >= 1.05) c.drawImage(P.day, 0, 0)
  else {
    const gd = P.gildData.data, ed = P.edgeData.data, dd = P.dayData, gr = P.greyData
    const idx = P.goldIdx, dist = P.goldDist, ga = P.goldRGBA
    for (let j = 0; j < idx.length; j++) {
      const i = idx[j] * 4
      const e = front - dist[j]
      if (e <= 0) {
        gd[i] = gr[i]; gd[i + 1] = gr[i + 1]; gd[i + 2] = gr[i + 2]
        ed[i + 3] = 0
        continue
      }
      const f = e >= 14 ? 1 : e / 14
      // molten at the front: deep amber, cooling to the painted gold behind it
      const hot = e < 120 ? 1 - e / 120 : 0
      const h2 = hot * hot * 0.9
      const r = gr[i] + (dd[i] - gr[i]) * f, gg = gr[i + 1] + (dd[i + 1] - gr[i + 1]) * f, b = gr[i + 2] + (dd[i + 2] - gr[i + 2]) * f
      gd[i] = r + (238 - r) * h2
      gd[i + 1] = gg + (150 - gg) * h2
      gd[i + 2] = b + (40 - b) * h2
      ed[i] = 242; ed[i + 1] = 164; ed[i + 2] = 58
      ed[i + 3] = hot * hot * ga[j * 4 + 3] * 0.95
    }
    P.gildCtx.putImageData(P.gildData, 0, 0)
    c.drawImage(P.gild, 0, 0)
    P.edgeCtx.putImageData(P.edgeData, 0, 0)
    c.save()
    c.filter = "blur(9px)"
    c.globalAlpha = 0.8
    c.drawImage(P.edge, 0, 0)
    c.restore()
  }

  // by day, soft shadows drift across the dunes
  if (n < 0.98) {
    const tx = P.tmp.getContext("2d")!
    tx.setTransform(1, 0, 0, 1, 0, 0)
    tx.globalCompositeOperation = "source-over"
    tx.globalAlpha = 1
    tx.clearRect(0, 0, W, H)
    tx.drawImage(P.cloud, -((t * 26) % W), 0)
    tx.globalCompositeOperation = "destination-in"
    tx.drawImage(P.ground, 0, 0, W, H)
    c.save()
    c.globalAlpha = 1 - n
    c.globalCompositeOperation = "multiply"
    c.drawImage(P.tmp, 0, 0)
    c.restore()
  }

  // night is the same painting under a deep sky
  if (n > 0) {
    c.save()
    c.globalCompositeOperation = "multiply"
    c.globalAlpha = n
    const ng = c.createLinearGradient(0, 0, 0, H)
    ng.addColorStop(0, "rgb(30,26,60)")
    ng.addColorStop(0.72, "rgb(74,62,112)")
    ng.addColorStop(1, "rgb(40,34,72)")
    c.fillStyle = ng
    c.fillRect(0, 0, W, H)
    c.restore()
  }

  if (warm > 0) {
    // the sun sinks inside the gateway at dusk and rises there at dawn; its light reaches out across the land
    const low = L.sunLow
    const sy = 612 + 112 * low
    const reach = L.reach
    c.save()
    c.globalCompositeOperation = "soft-light"
    const wg = c.createRadialGradient(1600, sy, 0, 1600, sy, reach)
    wg.addColorStop(0, `rgba(255,176,96,${0.95 * warm})`)
    wg.addColorStop(0.5, `rgba(240,150,110,${0.5 * warm})`)
    wg.addColorStop(1, "rgba(200,120,120,0)")
    c.fillStyle = wg
    c.fillRect(0, 0, W, H)
    c.globalCompositeOperation = "screen"
    const sg = c.createRadialGradient(1600, sy - 10, 0, 1600, sy - 10, 600)
    sg.addColorStop(0, `rgba(255,214,150,${0.42 * warm * (1 - 0.5 * low)})`)
    sg.addColorStop(1, "rgba(255,200,130,0)")
    c.fillStyle = sg
    c.fillRect(0, 0, W, H)
    // and spills through the gateway, down the road toward us, longer as the sun gets lower
    c.filter = "blur(30px)"
    const rg = c.createLinearGradient(1640, 750, 1000 - 260 * low, 1060)
    rg.addColorStop(0, `rgba(255,204,140,${0.3 * warm})`)
    rg.addColorStop(1, "rgba(255,204,140,0)")
    c.fillStyle = rg
    c.beginPath()
    c.moveTo(1500, 752)
    c.lineTo(1800, 752)
    c.lineTo(1560 - 300 * low, 1120)
    c.lineTo(820 - 420 * low, 1120)
    c.closePath()
    c.fill()
    c.restore()
  }

  if (n > 0) {
    // the gold keeps its own light after dark, and the light runs out along the road from the heap
    const ed = P.glowData.data
    const idx = P.goldIdx, dist = P.goldDist, ga = P.goldRGBA, sun = P.goldSun
    for (let j = 0; j < idx.length; j++) {
      const i = idx[j] * 4
      const m = sun[j] ? 0.16 : 0.8 + 0.8 * Math.pow(Math.max(0, Math.sin(dist[j] * 0.011 - t * 2.6)), 8)
      ed[i] = ga[j * 4] * m
      ed[i + 1] = ga[j * 4 + 1] * m
      ed[i + 2] = ga[j * 4 + 2] * m
      // only gold the memory has reached can glow
      const e = front - dist[j]
      ed[i + 3] = e <= 0 ? 0 : (sun[j] ? ga[j * 4 + 3] * 0.25 : ga[j * 4 + 3]) * (e >= 14 ? 1 : e / 14)
    }
    P.glowCtx.putImageData(P.glowData, 0, 0)
    c.save()
    c.globalAlpha = n
    c.drawImage(P.glow, 0, 0)
    c.globalCompositeOperation = "lighter"
    c.filter = "blur(9px)"
    c.globalAlpha = n * 0.85
    c.drawImage(P.glow, 0, 0)
    c.filter = "blur(26px)"
    c.globalAlpha = n * 0.66
    c.drawImage(P.glow, 0, 0)
    c.restore()

    // the lamps come on one by one, down the road from the heap, and go out at dawn the way they came
    c.save()
    c.globalCompositeOperation = "lighter"
    for (const lp of P.lamps) {
      const I = L.lamp(lp.rank) * lin(front - lp.dist, 0, 40) * (0.94 + 0.06 * Math.sin(t * 2.3 + lp.rank * 9)) * (0.55 + 0.45 * lp.gold)
      if (I <= 0) continue
      halo(c, lp.x, lp.y, lp.r * 9, [255, 206, 140], 0.5 * I)
      c.save()
      c.translate(lp.x, lp.base)
      c.scale(1, 0.22)
      halo(c, 0, 0, lp.r * 8, [255, 200, 130], 0.28 * I)
      c.restore()
      c.fillStyle = `rgba(255,238,200,${0.85 * I})`
      c.beginPath()
      c.arc(lp.x, lp.y, lp.r * 0.96, 0, 6.2832)
      c.fill()
    }
    c.restore()

    for (const [x, y, s] of P.stars) {
      const tw = 0.65 + 0.35 * Math.sin(t * (1 + s * 2) + x)
      c.fillStyle = `rgba(241,236,223,${Math.max(0, (n - 0.35) / 0.65) * (0.15 + 0.7 * s * s) * tw * (1 - y / 900)})`
      c.beginPath()
      c.arc(x, y, 0.6 + s * 1.2, 0, 6.2832)
      c.fill()
    }
  }
}

/** The thin thread of sand the model takes: it climbs from the heap grain by grain. */
function thread(ctx: Ctx, t: number, n: number, top: number, start: number, a: number) {
  const rise = (t - start) * 0.42
  if (rise <= 0 || a <= 0) return
  const y1 = MY + MR + 16
  const yHead = top - (top - y1) * Math.min(1, rise)
  const lineC: RGB = mix(hex(C.goldInk), [232, 205, 150], sm(n))
  if (n > 0.2) {
    ctx.save()
    ctx.strokeStyle = `rgba(232,205,150,${0.32 * n * a})`
    ctx.lineWidth = 6
    ctx.filter = "blur(5px)"
    ctx.beginPath()
    ctx.moveTo(MX, yHead)
    ctx.lineTo(MX, top)
    ctx.stroke()
    ctx.restore()
  }
  ctx.strokeStyle = rgba(lineC, 0.5 * a)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(MX, yHead)
  ctx.lineTo(MX, top)
  ctx.stroke()
  const r = rng(95)
  const pal = palAt(n)
  for (let i = 0; i < 420; i++) {
    const p0 = r(), b = gz(r), c = r(), e = r()
    if (c > a * (0.4 + 0.6 * n)) continue
    const ph = (p0 + t * 0.42) % 1
    if (ph > rise) continue
    ctx.fillStyle = rgba(pal[Math.floor(e * pal.length)], 0.92)
    ctx.beginPath()
    ctx.arc(MX + b * 2.4 + Math.sin(ph * 14 + e * 6) * 0.8, top - (top - y1) * ph, 0.9 + e * 1.3, 0, 6.2832)
    ctx.fill()
  }
}

/** The road the strider walks, in film pixels, from the near corner toward the heap. */
const ROAD: [number, number][] = [[-140, 1052], [40, 1030], [300, 1000], [560, 968], [820, 936], [1000, 918]]
export const roadAt = (s: number): [number, number] => {
  let left = s
  for (let i = 0; i < ROAD.length - 1; i++) {
    const [x0, y0] = ROAD[i], [x1, y1] = ROAD[i + 1]
    const len = Math.hypot(x1 - x0, y1 - y0)
    if (left <= len || i === ROAD.length - 2) return [x0 + ((x1 - x0) * left) / len, y0 + ((y1 - y0) * left) / len]
    left -= len
  }
  return ROAD[0]
}

/** The strider's walk: worked out on a flat line, then laid along the road, a little smaller as it goes away. */
const WALK_H = 310, WALK_X0 = -160, WALK_T0 = 28.54, WALK_V = (WALK_H * 0.66) / 1.05
const walkSize = (w: number) => 1 - 0.14 * Math.max(0, Math.min(1, w / 900))
const walkLen = (w: number) => (w <= 0 ? w : w < 900 ? w - (0.07 * w * w) / 900 : 837 + 0.86 * (w - 900))

export function sceneLand(ctx: Ctx, t: number, n: number, o: number, P: Plates) {
  const warm = glowAt(t)
  const dusk = t < 28
  compose(P, {
    t, n, warm,
    gold: goldAt(t),
    sunLow: dusk ? lin(t, 21.2, 25.6) : 1 - lin(t, 30.3, 33.8),
    reach: dusk ? 1700 : 700 + 1100 * ramp(t, 30.3, 33.8),
    lamp: (rank) => flick(t - 21.9 - 2.7 * rank) * (1 - ramp(t, 30.5 + 1.1 * (1 - rank), 31.1 + 1.1 * (1 - rank))),
  })
  const cam = camAt(t)
  warp(P, cam, 1.2 * warm * (1 - 0.6 * n), t)

  ctx.save()
  ctx.globalAlpha = o
  ctx.drawImage(P.out, 0, 0)

  // haze at the foot of the frame while there are words on it
  const words = win(t, 12.2, 31.2, 0.6)
  if (words > 0) {
    const mc = mix([247, 242, 231], [22, 19, 38], sm(n))
    const mist = ctx.createLinearGradient(0, 905, 0, H)
    mist.addColorStop(0, rgba(mc, 0))
    mist.addColorStop(0.6, rgba(mc, 0.9 * words))
    mist.addColorStop(1, rgba(mc, 0.96 * words))
    ctx.fillStyle = mist
    ctx.fillRect(0, 905, W, H - 905)
  }

  // everything that stands on the heap's spot moves with that spot
  const [s, tx, ty] = camT(cam, depthAt(P, SX, LY))
  ctx.save()
  ctx.transform(s, 0, 0, s, tx, ty)

  // 12..19 the same sand falls again, lands on the road, and stays. Then it keeps growing.
  const head = (t - 12.2) * 0.85
  const tail = (t - 18.0) * 0.85
  const heapH = 74 * k(t, [[13.35, 0], [19.2, 1]]) + FALLS.reduce((s, f) => s + 6 * ramp(t, f + LAND, f + LAND + 1.4), 0)
  const top = LY - heapH + 4
  if (heapH > 2) {
    // its shadow on the road
    ctx.save()
    ctx.filter = "blur(8px)"
    ctx.fillStyle = `rgba(31,27,20,${0.3 * (1 - n * 0.5)})`
    ctx.beginPath()
    ctx.ellipse(SX - heapH * 0.5, LY + 5, heapH * 1.9, heapH * 0.16, 0, 0, 6.2832)
    ctx.fill()
    ctx.restore()
    if (n > 0.2) halo(ctx, SX, LY - heapH * 0.4, heapH * 3.2, [232, 205, 150], 0.3 * n * (0.94 + 0.06 * Math.sin(t * 1.3)))
  }
  // at dawn the heap catches the first light: the richest gold in the film
  const rich = ramp(t, 30.4, 32.6)
  if (rich > 0) halo(ctx, SX, LY - heapH * 0.45, heapH * 3.4, [255, 214, 130], 0.34 * rich * (1 - n))
  pile(ctx, SX, LY + 4, heapH, n, 81, Math.max(0, Math.min(t, 26.6) - 13.35), rich)
  if (rich > 0) {
    // glints on the sunward face
    const gr = rng(211)
    ctx.save()
    ctx.globalCompositeOperation = "lighter"
    const hw = heapH / Math.tan((33 * Math.PI) / 180)
    for (let i = 0; i < 46; i++) {
      const u = gr(), v = gr(), ph = gr() * 6.28, sp = 1.4 + gr() * 2.2
      const gx = SX + u * hw * 0.9, gy = LY + 2 - heapH * (1 - u) * (0.15 + 0.8 * v)
      const tw = Math.pow(Math.max(0, Math.sin(t * sp + ph)), 6)
      ctx.fillStyle = `rgba(255,244,210,${0.9 * tw * rich})`
      ctx.beginPath()
      ctx.arc(gx, gy, 1 + 1.6 * tw, 0, 6.2832)
      ctx.fill()
    }
    ctx.restore()
  }
  if (head > 0 && tail < 1) stream(ctx, t, SX, -30, top + 4, 12, 6400, n, 83, 1, { head, tail, sway: 1.5 })
  splash(ctx, t, SX, top + 2, win(t, 13.35, 19.25, 0.25), n, 85)
  // "It grows": a finer fall keeps arriving on the wind while the model takes only a thread
  FALLS.forEach((f, i) => {
    const vHead = (t - f) * 0.85
    const vTail = (t - f - 1.0) * 0.85
    if (vHead > 0 && vTail < 1) stream(ctx, t, SX, -30, top + 4, 15, 6400, n, 87 + i * 7, 0.42, { head: vHead, tail: vTail, lean: 240, sway: 3 })
    splash(ctx, t, SX, top + 2, 0.3 * win(t, f + LAND, f + LAND + 1.1, 0.2), n, 89 + i * 7)
  })

  // 19.. the model: a seat, one small gold ball that settles into it, and the thin thread it takes
  const seat = ramp(t, 18.2, 18.9)
  const arrive = k(t, [[18.6, 0], [19.8, 1]], "out")
  const out = k(t, [[26.5, 0], [29.0, 1]])
  const inn = k(t, [[26.9, 0], [29.8, 1]])
  if (seat > 0) {
    const lineC: RGB = mix(hex(C.goldInk), [232, 205, 150], sm(n))
    ctx.strokeStyle = rgba(lineC, 0.6 * seat)
    ctx.lineWidth = 1.4
    ctx.setLineDash([2, 7])
    ctx.lineDashOffset = -t * 5
    ctx.beginPath()
    ctx.arc(MX, MY, MR + 16, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
    // a ring goes out from the seat each time a ball settles into it
    for (const at of [19.75, 29.75]) {
      const f = lin(t, at, at + 1)
      if (f <= 0 || f >= 1) continue
      ctx.strokeStyle = rgba(lineC, 0.7 * (1 - f) * (1 - f))
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.arc(MX, MY, MR + 16 + 70 * (1 - (1 - f) * (1 - f)), 0, 6.2832)
      ctx.stroke()
    }

    const lean = lin(t, FALLS[0] + LAND, FALLS[2] + LAND + 1.7) // 0 to 1 as the land fills in
    thread(ctx, t, n, top, 19.9, (1 - 0.55 * lean) * (1 - ramp(t, 26.0, 26.7)))
    thread(ctx, t, n, top, 29.95, 0.45)

    // the gold ball: down into the seat, then lifted out up and to the right
    const back = (1 - arrive) * (1 - arrive)
    const gx = out > 0 ? MX + 420 * out * out : MX + 380 * back
    const gy = out > 0 ? MY - 190 * Math.pow(out, 1.4) : MY - 230 * Math.pow(1 - arrive, 1.6)
    const goldA = ramp(t, 18.6, 19.2) * (1 - ramp(out, 0.84, 1))
    if (goldA > 0) {
      if (arrive < 0.98) trail(ctx, MX + 380, MY - 230, gx, gy, [232, 205, 150], 0.5 * goldA * (1 - arrive))
      if (out > 0.02) trail(ctx, MX, MY, gx, gy, [232, 205, 150], 0.55 * goldA * Math.min(1, out * 4))
      halo(ctx, gx, gy, MR * (3.4 + 2 * n) * (1 + 0.45 * lean) * (1 + 0.04 * Math.sin(t * 1.7)), [232, 205, 150], (0.3 + 0.35 * n) * (1 + 0.3 * lean) * goldA)
      orb(ctx, gx, gy, MR * (1 - 0.1 * out), "gold", 97, goldA)
    }
    // the different ball: down from the upper left into the same seat
    if (inn > 0) {
      const e = 1 - Math.pow(1 - inn, 2.2)
      const px = MX - 560 * (1 - e) * (1 - e)
      const py = MY - 170 * Math.pow(1 - e, 1.5)
      const pa = ramp(inn, 0, 0.2)
      if (inn < 0.98) trail(ctx, MX - 560, MY - 170, px, py, [214, 200, 240], 0.5 * pa * (1 - inn))
      halo(ctx, px, py, MR * 4.6 * (1 + 0.04 * Math.sin(t * 1.7 + 1)), [214, 200, 240], 0.42 * pa * Math.max(n, 0.35))
      orb(ctx, px, py, MR * 1.06, "pearl", 99, pa)
    }
  }
  ctx.restore()

  // dawn comes through the gateway in long soft shafts, and the strider walks into them
  const rays = ramp(t, 31, 32.8) * (1 - n) * o
  if (rays > 0) {
    const [rs, rx, ry] = camT(cam, depthAt(P, 1600, 660))
    const ox = 1600 * rs + rx, oy = 660 * rs + ry
    ctx.save()
    ctx.globalCompositeOperation = "lighter"
    ctx.filter = "blur(16px)"
    const rr = rng(47)
    for (let i = 0; i < 9; i++) {
      const a0 = Math.PI * (0.62 + 0.34 * rr()) + 0.03 * Math.sin(t * 0.5 + i)
      const wd = 0.02 + 0.05 * rr(), len = 1500 + 600 * rr()
      const g = ctx.createRadialGradient(ox, oy, 40, ox, oy, len)
      g.addColorStop(0, `rgba(255,226,160,${0.17 * rays})`)
      g.addColorStop(1, "rgba(255,226,160,0)")
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(ox + Math.cos(a0 - wd) * len, oy + Math.sin(a0 - wd) * len)
      ctx.lineTo(ox + Math.cos(a0 + wd) * len, oy + Math.sin(a0 + wd) * len)
      ctx.closePath()
      ctx.fill()
    }
    ctx.restore()
  }

  // 30.. the strider walks the finished land toward the light: in from the near corner, on the road, with real steps
  const went = WALK_V * (t - WALK_T0)
  if (went > 0) {
    const flat = walkPose(WALK_X0, 0, WALK_H, went, 99, true)
    const size = walkSize(flat.hx)
    const at = (w: number, up: number): [number, number] => {
      const [x, y] = roadAt(walkLen(w))
      return [x, y + up * walkSize(w)]
    }
    const [hx, hy] = at(flat.hx, flat.hy)
    const [gx, gy] = at(flat.hx, 0)
    const p: Pose = { ...flat, hx, hy, h: WALK_H * size, fa: at(flat.fa[0], flat.fa[1]), fb: at(flat.fb[0], flat.fb[1]) }
    const [ss, sx, sy] = camT(cam, depthAt(P, gx, gy))
    const body = mix([30, 26, 20], [14, 12, 24], sm(n))
    const far = mix([62, 56, 48], [26, 23, 40], sm(n))
    ctx.save()
    ctx.transform(ss, 0, 0, ss, sx, sy)
    // his shadow, long behind him, because the sun is ahead in the gateway
    ctx.save()
    ctx.globalAlpha = o * 0.34 * (1 - n)
    ctx.translate(gx, gy)
    ctx.transform(1, 0, 1.05, -0.36, 0, 0)
    ctx.translate(-gx, -gy)
    ctx.filter = "blur(4px)"
    figure(ctx, p, { body: "rgb(40,34,24)", far: "rgb(40,34,24)" })
    ctx.restore()
    ctx.globalAlpha = o
    figure(ctx, p, { body: rgba(body, 1), far: rgba(far, 1) })
    ctx.restore()
  }

  // the air: dust that catches the light, nearer motes drifting faster
  ctx.globalCompositeOperation = "lighter"
  const mr = rng(131)
  for (let i = 0; i < 150; i++) {
    const x0 = mr() * W, y0 = mr() * H, dm = mr(), ph = mr() * 6.28, sp = mr()
    const [ms, mtx, mty] = camT(cam, dm)
    const x = ((x0 + t * (6 + 22 * dm)) % (W + 80)) - 40
    const yy = y0 - t * (3 + 5 * sp) + 16 * Math.sin(t * 0.6 + ph)
    const y = (((yy % (H + 40)) + H + 40) % (H + 40)) - 20
    const a = (0.05 + 0.16 * dm) * (0.5 + 0.5 * Math.sin(t * (0.8 + sp) + ph))
    const X = x * ms + mtx, Y = y * ms + mty, rad = 0.8 + 2.2 * dm
    // dust only shows where the light catches it against something darker: never as specks on a bright sky
    ctx.fillStyle = `rgba(255,228,178,${a * (0.5 * warm * (1 - n) + 1.5 * n)})`
    ctx.beginPath()
    ctx.arc(X, Y, rad * (0.8 + 0.2 * (1 - n)), 0, 6.2832)
    ctx.fill()
  }
  ctx.globalCompositeOperation = "source-over"
  ctx.restore()
}
