import { C } from "../beats"
import { k, ramp, rng, win } from "../util"
import { type Ctx, H, LY, type RGB, SX, W, glowAt, gz, halo, hex, lin, mix, orb, palAt, pile, rgba, sm, spline, splash, stream, trail } from "./core"
import { type Cam, type Plates, camT, depthAt, warp } from "./plates"
import { strider } from "./strider"

/* The second world: your land. One painting, relit, with a camera moving through it. The sand lands on it and stays. */
export const MX = SX
export const MY = 318
export const MR = 37

/** When the gold starts to run from the heap, and when it has reached everything. */
const G0 = 13.5
const G1 = 19.3

/** A slow push in over the whole land, sinking to the heap, rising to the model at night, easing back at dawn. */
export const camAt = (t: number): Cam => ({
  z: spline(t, [[11.2, 0.04], [19, 0.1], [26, 0.14], [30.6, 0.16], [35, 0.08]]),
  px: spline(t, [[11.2, -24], [19, 4], [26, 26], [30.6, 14], [35, -16]]),
  py: spline(t, [[11.2, -6], [19, 8], [26, 2], [30.6, -12], [35, -4]]),
})

/** A lamp does not fade on. It catches, stutters, and holds. */
const flick = (s: number) => (s < 0 ? 0 : s < 0.07 ? 0.85 : s < 0.13 ? 0.15 : s < 0.2 ? 1 : s < 0.25 ? 0.45 : 1)

/** The painting for this moment, before the camera: gold, shadow, the hour of the day, lamps, stars. */
function compose(P: Plates, t: number, n: number, warm: number) {
  const c = P.sceneCtx
  c.setTransform(1, 0, 0, 1, 0, 0)
  c.globalAlpha = 1
  c.globalCompositeOperation = "source-over"
  c.filter = "none"

  // the land before the gold, then the gold running out along the road from where the sand lands
  const g = lin(t, G0, G1)
  if (g <= 0) c.drawImage(P.grey, 0, 0)
  else if (g >= 1) c.drawImage(P.day, 0, 0)
  else {
    const front = g * (P.maxDist + 130)
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
    const dusk = t < 28
    const low = dusk ? lin(t, 21.2, 25.6) : 1 - lin(t, 30.3, 33.8)
    const sy = 612 + 112 * low
    const reach = dusk ? 1700 : 700 + 1100 * ramp(t, 30.3, 33.8)
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
    const ed = P.edgeData.data
    const idx = P.goldIdx, dist = P.goldDist, ga = P.goldRGBA, sun = P.goldSun
    for (let j = 0; j < idx.length; j++) {
      const i = idx[j] * 4
      const m = sun[j] ? 0.16 : 0.8 + 0.8 * Math.pow(Math.max(0, Math.sin(dist[j] * 0.011 - t * 2.6)), 8)
      ed[i] = ga[j * 4] * m
      ed[i + 1] = ga[j * 4 + 1] * m
      ed[i + 2] = ga[j * 4 + 2] * m
      ed[i + 3] = sun[j] ? ga[j * 4 + 3] * 0.25 : ga[j * 4 + 3]
    }
    P.edgeCtx.putImageData(P.edgeData, 0, 0)
    c.save()
    c.globalAlpha = n
    c.drawImage(P.edge, 0, 0)
    c.globalCompositeOperation = "lighter"
    c.filter = "blur(9px)"
    c.globalAlpha = n * 0.85
    c.drawImage(P.edge, 0, 0)
    c.filter = "blur(26px)"
    c.globalAlpha = n * 0.66
    c.drawImage(P.edge, 0, 0)
    c.restore()

    // the lamps come on one by one, down the road from the heap, and go out at dawn the way they came
    c.save()
    c.globalCompositeOperation = "lighter"
    for (const L of P.lamps) {
      const on = 21.9 + 2.7 * L.rank
      const off = 30.5 + 1.1 * (1 - L.rank)
      const I = flick(t - on) * (1 - ramp(t, off, off + 0.6)) * (0.94 + 0.06 * Math.sin(t * 2.3 + L.rank * 9)) * (0.55 + 0.45 * L.gold)
      if (I <= 0) continue
      halo(c, L.x, L.y, L.r * 9, [255, 206, 140], 0.5 * I)
      c.save()
      c.translate(L.x, L.base)
      c.scale(1, 0.22)
      halo(c, 0, 0, L.r * 8, [255, 200, 130], 0.28 * I)
      c.restore()
      c.fillStyle = `rgba(255,238,200,${0.85 * I})`
      c.beginPath()
      c.arc(L.x, L.y, L.r * 0.96, 0, 6.2832)
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
const roadAt = (s: number): [number, number] => {
  let left = s
  for (let i = 0; i < ROAD.length - 1; i++) {
    const [x0, y0] = ROAD[i], [x1, y1] = ROAD[i + 1]
    const len = Math.hypot(x1 - x0, y1 - y0)
    if (left <= len || i === ROAD.length - 2) return [x0 + ((x1 - x0) * left) / len, y0 + ((y1 - y0) * left) / len]
    left -= len
  }
  return ROAD[0]
}

export function sceneLand(ctx: Ctx, t: number, n: number, o: number, P: Plates) {
  const warm = glowAt(t)
  compose(P, t, n, warm)
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
  const heapH = 74 * k(t, [[13.35, 0], [19.2, 1]]) + 16 * lin(t, 20.6, 26.4)
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
  pile(ctx, SX, LY + 4, heapH, n, 81, Math.max(0, Math.min(t, 26.6) - 13.35))
  if (head > 0 && tail < 1) stream(ctx, t, SX, -30, top + 4, 12, 6400, n, 83, 1, { head, tail, sway: 1.5 })
  splash(ctx, t, SX, top + 2, win(t, 13.35, 19.25, 0.25), n, 85)
  // "It grows": a finer fall keeps arriving on the wind while the model takes only a thread
  const vHead = (t - 19.4) * 0.85
  const vTail = (t - 25.2) * 0.85
  if (vHead > 0 && vTail < 1) stream(ctx, t, SX, -30, top + 4, 17, 6400, n, 87, 0.24, { head: vHead, tail: vTail, lean: 240, sway: 3 })
  splash(ctx, t, SX, top + 2, 0.16 * win(t, 20.6, 26.4, 0.25), n, 89)

  // 19.. the model: a seat, one small gold ball that settles into it, and the thin thread it takes
  const seat = ramp(t, 18.5, 19.3)
  const arrive = k(t, [[18.9, 0], [20.4, 1]], "out")
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
    for (const at of [20.35, 29.75]) {
      const f = lin(t, at, at + 1)
      if (f <= 0 || f >= 1) continue
      ctx.strokeStyle = rgba(lineC, 0.7 * (1 - f) * (1 - f))
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.arc(MX, MY, MR + 16 + 70 * (1 - (1 - f) * (1 - f)), 0, 6.2832)
      ctx.stroke()
    }

    thread(ctx, t, n, top, 20.5, 1 - ramp(t, 26.0, 26.7))
    thread(ctx, t, n, top, 29.95, 1)

    // the gold ball: down into the seat, then lifted out up and to the right
    const back = (1 - arrive) * (1 - arrive)
    const gx = out > 0 ? MX + 420 * out * out : MX + 380 * back
    const gy = out > 0 ? MY - 190 * Math.pow(out, 1.4) : MY - 230 * Math.pow(1 - arrive, 1.6)
    const goldA = ramp(t, 18.9, 19.5) * (1 - ramp(out, 0.84, 1))
    if (goldA > 0) {
      if (arrive < 0.98) trail(ctx, MX + 380, MY - 230, gx, gy, [232, 205, 150], 0.5 * goldA * (1 - arrive))
      if (out > 0.02) trail(ctx, MX, MY, gx, gy, [232, 205, 150], 0.55 * goldA * Math.min(1, out * 4))
      halo(ctx, gx, gy, MR * (3.4 + 2 * n) * (1 + 0.04 * Math.sin(t * 1.7)), [232, 205, 150], (0.3 + 0.35 * n) * goldA)
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

  // 31.. the strider walks the finished land toward the light
  const walked = (t - 30.3) * 185
  const st = ramp(t, 30.7, 31.7)
  if (walked > 0 && st > 0) {
    const [fx, fy] = roadAt(walked)
    const h = 310 * (1 - 0.14 * Math.min(1, walked / 900))
    const [ss, sx, sy] = camT(cam, depthAt(P, fx, fy))
    const body = mix([64, 60, 54], [20, 18, 32], sm(n))
    const far = mix([92, 87, 79], [34, 30, 50], sm(n))
    ctx.save()
    ctx.transform(ss, 0, 0, ss, sx, sy)
    // his shadow, long behind him, because the sun is ahead in the gateway
    ctx.save()
    ctx.globalAlpha = o * st * 0.3 * (1 - n)
    ctx.translate(fx, fy)
    ctx.transform(1, 0, 1.05, -0.36, 0, 0)
    ctx.translate(-fx, -fy)
    ctx.filter = "blur(4px)"
    strider(ctx, fx, fy, h, walked, { body: "rgb(40,34,24)", far: "rgb(40,34,24)" })
    ctx.restore()
    ctx.globalAlpha = o * st
    strider(ctx, fx, fy, h, walked, { body: rgba(body, 1), far: rgba(far, 1) })
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
