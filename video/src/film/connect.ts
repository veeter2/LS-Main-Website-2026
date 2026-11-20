import { C } from "../beats"
import { k, ramp, rng, win } from "../util"
import { type Ctx, H, LY, type RGB, SX, W, gz, halo, hex, lin, mix, orb, palAt, pile, rgba, sm, spline, trail } from "./core"
import { spark } from "./cost"
import { MR, MX, MY, compose, flick, roadAt } from "./land"
import { type Cam, type Plates, camT, depthAt, warp } from "./plates"
import { strider } from "./strider"

/**
 * The connectors film: where does the work go?
 * The work people already do falls from four places and lands as one heap on your road.
 * The model sits above and is handed a pinch. Experts and teammates read the same heap, each by a thin thread,
 * and what they learn comes back down to it.
 */
export const CONNECT_SECONDS = 36

/** 1 = night, 0 = day. It opens dark, the land comes up with the heap, then one dusk, one night and a dawn. */
export const nightK = (t: number) => k(t, [[0, 1], [7.6, 1], [9.6, 0], [24.4, 0], [27, 1], [30.6, 1], [33, 0], [35.2, 0], [36, 1]])
export const warmK = (t: number) => Math.max(win(t, 7.6, 11.4, 1.2) * 0.55, win(t, 24, 27.4, 1.6) * 0.9, k(t, [[29, 0], [31, 0.5], [32.8, 1], [35.2, 1], [36, 0]]))
export const landInK = (t: number) => ramp(t, 7.4, 9.4) * (1 - ramp(t, 35.2, 36))

const camK = (t: number): Cam => ({
  z: spline(t, [[0, 0.04], [8, 0.07], [12, 0.14], [21, 0.08], [29, 0.14], [36, 0.04]]),
  px: spline(t, [[0, 0], [12, -18], [21, 8], [29, 20], [36, 0]]),
  py: spline(t, [[0, 0], [21, 6], [29, -8], [36, 0]]),
})

/** Where the work comes from. Each has its own grain: a size, a tone after dark and a tone by day. */
type Src = { x: number; y: number; at: number; kind: "chat" | "files" | "calls" | "people"; size: number; dark: RGB; day: RGB }
const SRC: Src[] = [
  { x: 300, y: 330, at: 3.6, kind: "chat", size: 1.0, dark: [246, 236, 214], day: [84, 70, 132] },
  { x: 610, y: 150, at: 4.1, kind: "files", size: 1.25, dark: [236, 184, 100], day: [176, 124, 30] },
  { x: 1330, y: 116, at: 4.6, kind: "calls", size: 1.0, dark: [240, 190, 164], day: [160, 84, 50] },
  { x: 1455, y: 262, at: 5.1, kind: "people", size: 1.45, dark: [255, 226, 160], day: [120, 96, 50] },
]

/** The heap: fast while the work first lands, then a little more each time something is learned. */
const heapAt = (t: number) => k(t, [[4.5, 0], [8, 46], [12, 66], [21.6, 70], [22.4, 76], [23.4, 76], [24.2, 82], [29.4, 96], [36, 96]])

/** Experts and teammates: small gold balls, each on its own thread from the one heap. */
const EXP = [
  { x: 835, y: 440, at: 16.3 },
  { x: 1212, y: 545, at: 17.2 },
  { x: 905, y: 610, at: 18.1 },
]
/** When something learned comes back down a thread: [time, which expert]. */
const BACK: [number, number][] = [[21.5, 0], [23.3, 1], [25.7, 2], [27.3, 0], [28.7, 1], [31.9, 2]]
/** When the model is handed a pinch. */
const PINCH = [13.3, 14.9, 16.6, 19.2, 21.0, 23.9, 26.2, 28.0, 32.2, 33.6]

function glyph(ctx: Ctx, s: Src, c: RGB, a: number, t: number) {
  if (a <= 0) return
  ctx.save()
  ctx.translate(s.x, s.y)
  ctx.strokeStyle = rgba(c, 0.5 * a)
  ctx.lineWidth = 1.4
  ctx.setLineDash([2, 7])
  ctx.lineDashOffset = -t * 5
  ctx.beginPath()
  ctx.arc(0, 0, 40, 0, 6.2832)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.strokeStyle = rgba(c, 0.95 * a)
  ctx.lineWidth = 2.2
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.beginPath()
  if (s.kind === "chat") {
    ctx.roundRect(-17, -14, 34, 23, 7)
    ctx.moveTo(-7, 9)
    ctx.lineTo(-10, 17)
    ctx.lineTo(0, 9)
  } else if (s.kind === "files") {
    ctx.moveTo(-12, -17)
    ctx.lineTo(5, -17)
    ctx.lineTo(13, -9)
    ctx.lineTo(13, 17)
    ctx.lineTo(-12, 17)
    ctx.closePath()
    ctx.moveTo(5, -17)
    ctx.lineTo(5, -9)
    ctx.lineTo(13, -9)
    ctx.moveTo(-6, 0)
    ctx.lineTo(7, 0)
    ctx.moveTo(-6, 8)
    ctx.lineTo(7, 8)
  } else if (s.kind === "calls") {
    const hs = [7, 15, 24, 12, 19, 8]
    hs.forEach((h0, i) => {
      const h = h0 * (0.7 + 0.3 * Math.sin(t * 5 + i * 1.7))
      const x = -17.5 + i * 7
      ctx.moveTo(x, -h / 2)
      ctx.lineTo(x, h / 2)
    })
  } else {
    ctx.arc(0, -8, 7, 0, 6.2832)
    ctx.moveTo(-15, 16)
    ctx.bezierCurveTo(-15, 2, 15, 2, 15, 16)
  }
  ctx.stroke()
  ctx.restore()
}

export function connectScene(ctx: Ctx, t: number, n: number, P: Plates) {
  const o = landInK(t)
  const warm = warmK(t)
  const dusk = t < 29
  const cam = camK(t)
  // everything that is not the land is there from the first second, in the dark, and leaves with the last
  const A = 1 - ramp(t, 35.2, 36)

  if (o > 0) {
    compose(P, {
      t, n, warm,
      gold: k(t, [[8.4, 0], [12, 0.34], [21, 0.44], [29, 0.86], [33.4, 1.05]]),
      sunLow: dusk ? lin(t, 24.2, 27.4) : 1 - lin(t, 30.6, 33.6),
      reach: dusk ? 1700 : 700 + 1100 * ramp(t, 30.6, 33.6),
      lamp: (rank) => flick(t - 24.9 - 1.9 * rank) * (1 - ramp(t, 30.9 + 1.1 * (1 - rank), 31.5 + 1.1 * (1 - rank))),
    })
    warp(P, cam, 1.2 * warm * (1 - 0.6 * n), t)
    ctx.save()
    ctx.globalAlpha = o
    ctx.drawImage(P.out, 0, 0)
    const words = win(t, 8.4, 33.3, 0.6)
    if (words > 0) {
      const mc = mix([247, 242, 231], [22, 19, 38], sm(n))
      const mist = ctx.createLinearGradient(0, 905, 0, H)
      mist.addColorStop(0, rgba(mc, 0))
      mist.addColorStop(0.6, rgba(mc, 0.9 * words))
      mist.addColorStop(1, rgba(mc, 0.96 * words))
      ctx.fillStyle = mist
      ctx.fillRect(0, 905, W, H - 905)
    }
    ctx.restore()
  }

  ctx.save()
  ctx.globalAlpha = A
  const [s, tx, ty] = camT(cam, depthAt(P, SX, LY))
  ctx.save()
  ctx.transform(s, 0, 0, s, tx, ty)

  const heapH = heapAt(t)
  const top = LY - heapH + 4
  const pal = palAt(n)
  const lineC: RGB = mix(hex(C.goldInk), [232, 205, 150], sm(n))

  // the heap, and its light
  if (heapH > 1) {
    ctx.save()
    ctx.filter = "blur(8px)"
    ctx.fillStyle = `rgba(31,27,20,${0.3 * (1 - n * 0.5) * o})`
    ctx.beginPath()
    ctx.ellipse(SX - heapH * 0.5, LY + 5, heapH * 1.9, heapH * 0.16, 0, 0, 6.2832)
    ctx.fill()
    ctx.restore()
    if (n > 0.2) halo(ctx, SX, LY - heapH * 0.4, heapH * 3.4, [232, 205, 150], 0.34 * n * (0.94 + 0.06 * Math.sin(t * 1.3)))
    // each thing learned lands as a soft pulse of light in the heap
    for (const [bt] of BACK) {
      const f = lin(t, bt + 0.55, bt + 1.5)
      if (f > 0 && f < 1) halo(ctx, SX, LY - heapH * 0.5, heapH * (2 + 2.4 * f), mix([232, 176, 70], [255, 226, 160], sm(n)), 0.5 * (1 - f) * (1 - f))
    }
    const rich = ramp(t, 33, 34.8)
    if (rich > 0) halo(ctx, SX, LY - heapH * 0.45, heapH * 3.4, [255, 214, 130], 0.34 * rich * (1 - n))
    pile(ctx, SX, LY + 4, heapH, n, 81, Math.min(t, 32.6), rich)
  }

  // the work, falling from where it is done. Four streams, four grains, one place to land.
  const feed = (i: number) => (t < 12 ? 1 : 0.42 + 0.3 * Math.max(0, Math.sin(t * 0.9 + i * 1.9))) * (1 - ramp(t, 32.3, 33.2))
  SRC.forEach((sc, i) => {
    const life = t - sc.at
    const on = ramp(t, sc.at - 0.2, sc.at + 0.8) * (1 - ramp(t, 32.3, 33.2))
    // before it is anything, a faint spark far off in the dark
    const sparkA = (1 - ramp(t, sc.at - 0.4, sc.at + 0.6)) * ramp(t, 0.2 + i * 0.25, 1.2 + i * 0.25)
    if (sparkA > 0) {
      const tw = 0.6 + 0.4 * Math.sin(t * 2.4 + i * 2.1)
      halo(ctx, sc.x, sc.y, 90, sc.dark, 0.5 * sparkA * tw)
      ctx.fillStyle = rgba([255, 250, 236], 0.9 * sparkA * tw)
      ctx.beginPath()
      ctx.arc(sc.x, sc.y, 3.2, 0, 6.2832)
      ctx.fill()
    }
    if (on > 0) {
      if (n > 0.2) halo(ctx, sc.x, sc.y, 120, sc.dark, 0.22 * n * on)
      glyph(ctx, sc, lineC, on, t)
    }
    if (life <= 0) return
    const amt = feed(i)
    const tint = mix(sc.day, sc.dark, sm(n))
    const r = rng(600 + i * 13)
    for (let j = 0; j < 900; j++) {
      const a = r(), b = gz(r), c = r(), d = r(), sp = 0.42 + 0.2 * r(), land = gz(r)
      if (d > amt) continue
      const ph = (a + t * sp) % 1
      // the head of the stream on its way down for the first time
      if (ph > life * sp) continue
      const y0 = sc.y + 44
      const e = Math.pow(ph, 1.6)
      const hx = SX + land * heapH * 0.42
      const hy = top + Math.abs(land) * heapH * 0.5
      const x = sc.x + (hx - sc.x) * Math.pow(ph, 2.3) + b * 13 * Math.sin(Math.PI * ph) + 5 * Math.sin(ph * 11 + j)
      const y = y0 + (hy - y0) * e
      ctx.fillStyle = rgba(mix(pal[Math.floor(c * pal.length)], tint, 0.55), (0.55 + 0.4 * c) * Math.min(1, ph * 9) * Math.min(1, (1 - ph) * 14))
      ctx.beginPath()
      ctx.arc(x, y, (0.8 + c * 1.3) * sc.size, 0, 6.2832)
      ctx.fill()
    }
  })

  // the model: it comes in above the land once the heap is there, and it never touches it
  const here = ramp(t, 11.5, 12.8)
  const out = k(t, [[29.3, 0], [31, 1]])
  const inn = k(t, [[29.8, 0], [31.6, 1]])
  if (here > 0) {
    ctx.strokeStyle = rgba(lineC, 0.6 * here)
    ctx.lineWidth = 1.4
    ctx.setLineDash([2, 7])
    ctx.lineDashOffset = -t * 5
    ctx.beginPath()
    ctx.arc(MX, MY, MR + 16, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.strokeStyle = rgba(lineC, 0.3 * ramp(t, 12.6, 13.4))
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(MX, MY + MR + 16)
    ctx.lineTo(MX, top)
    ctx.stroke()

    const drop = 1 - Math.pow(1 - here, 2.2)
    const gx = MX + 190 * out * out, gy = MY - 150 * (1 - drop) - 430 * Math.pow(out, 1.4)
    const goldA = here * (1 - ramp(out, 0.84, 1))
    if (goldA > 0) {
      if (out > 0.02) trail(ctx, MX, MY, gx, gy, [232, 205, 150], 0.55 * goldA * Math.min(1, out * 4))
      halo(ctx, gx, gy, MR * (3.4 + 2 * n), [232, 205, 150], (0.3 + 0.35 * n) * goldA)
      orb(ctx, gx, gy, MR * (1 - 0.1 * out), "gold", 97, goldA)
    }
    if (inn > 0) {
      const e = 1 - Math.pow(1 - inn, 2.2)
      const px = MX - 250 * (1 - e) * (1 - e), py = MY - 430 * Math.pow(1 - e, 1.5)
      const pa = ramp(inn, 0, 0.2)
      if (inn < 0.98) trail(ctx, MX - 250, MY - 430, px, py, [214, 200, 240], 0.5 * pa * (1 - inn))
      halo(ctx, px, py, MR * 4.6, [214, 200, 240], 0.42 * pa * Math.max(n, 0.35))
      orb(ctx, px, py, MR, "pearl", 99, pa)
      const f = lin(t, 31.55, 32.55)
      if (f > 0 && f < 1) {
        ctx.strokeStyle = rgba(lineC, 0.7 * (1 - f) * (1 - f))
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.arc(MX, MY, MR + 16 + 70 * (1 - (1 - f) * (1 - f)), 0, 6.2832)
        ctx.stroke()
      }
    }
    // it is handed a pinch, and the answer leaves
    const aC = mix([176, 124, 30], [255, 226, 160], sm(n)), aCore = mix([150, 100, 16], [255, 250, 232], sm(n))
    PINCH.forEach((a, i) => {
      const up = lin(t, a, a + 0.55)
      if (up > 0 && up < 1) {
        const pr = rng(500 + i)
        for (let j = 0; j < 16; j++) {
          const lag = pr() * 0.2, bx = gz(pr) * 2.6, c = pr()
          const ph = Math.max(0, Math.min(1, (up - lag) / 0.8))
          if (ph <= 0 || ph >= 1) continue
          const e = 1 - (1 - ph) * (1 - ph)
          ctx.fillStyle = rgba(n > 0.5 ? [255, 240, 204] : pal[Math.floor(c * pal.length)], 0.95)
          ctx.beginPath()
          ctx.arc(MX + bx, top - (top - MY - MR) * e, 1.2 + c * 1.6, 0, 6.2832)
          ctx.fill()
        }
      }
      const flash = lin(t, a + 0.5, a + 0.9)
      if (flash > 0 && flash < 1) halo(ctx, MX, MY, MR * 4.5, mix([232, 176, 70], [255, 226, 160], sm(n)), 0.5 * Math.sin(Math.PI * flash))
      const fout = lin(t, a + 0.6, a + 1.2)
      if (fout > 0 && fout < 1) {
        const e = 1 - (1 - fout) * (1 - fout), e0 = Math.max(0, e - 0.3)
        const ex = MX + 300 + ((i * 97) % 160), ey = -40
        spark(ctx, MX + (ex - MX) * e, MY - MR - 4 + (ey - MY + MR + 4) * e, MX + (ex - MX) * e0, MY - MR - 4 + (ey - MY + MR + 4) * e0, aC, 1, 6.5, aCore)
      }
    })
  }

  // experts and teammates: each reads the same heap by its own thread
  EXP.forEach((ex, i) => {
    const on = ramp(t, ex.at, ex.at + 0.7)
    if (on <= 0) return
    const R = 16
    const pop = 1 + 0.35 * Math.sin(Math.PI * lin(t, ex.at, ex.at + 0.6))
    // the thread, drawn from the heap up
    const grow = ramp(t, ex.at + 0.2, ex.at + 1.0)
    const bx0 = SX + (ex.x - SX) * 0.12, by0 = top + 6
    ctx.strokeStyle = rgba(lineC, 0.42 * on)
    ctx.lineWidth = 1.1
    ctx.beginPath()
    ctx.moveTo(bx0, by0)
    ctx.lineTo(bx0 + (ex.x - bx0) * grow, by0 + (ex.y + R - by0) * grow)
    ctx.stroke()
    halo(ctx, ex.x, ex.y, R * (3.6 + 2 * n), [232, 205, 150], (0.26 + 0.3 * n) * on)
    orb(ctx, ex.x, ex.y, R * pop, "gold", 140 + i, on)

    // it reads: a few grains up its thread, every so often, then an answer leaves
    const aC = mix([176, 124, 30], [255, 226, 160], sm(n)), aCore = mix([150, 100, 16], [255, 250, 232], sm(n))
    for (let q = 0; q < 9; q++) {
      const a = ex.at + 1.0 + q * 1.9 + i * 0.37
      if (a > 32.6) break
      const up = lin(t, a, a + 0.5)
      if (up > 0 && up < 1) {
        const pr = rng(800 + i * 31 + q)
        for (let j = 0; j < 8; j++) {
          const lag = pr() * 0.2, c = pr(), w = gz(pr) * 2
          const ph = Math.max(0, Math.min(1, (up - lag) / 0.8))
          if (ph <= 0 || ph >= 1) continue
          ctx.fillStyle = rgba(n > 0.5 ? [255, 240, 204] : pal[Math.floor(c * pal.length)], 0.95)
          ctx.beginPath()
          ctx.arc(bx0 + (ex.x - bx0) * ph + w, by0 + (ex.y + R - by0) * ph, 1.1 + c * 1.4, 0, 6.2832)
          ctx.fill()
        }
      }
      const fout = lin(t, a + 0.5, a + 1.05)
      if (fout > 0 && fout < 1) {
        const e = 1 - (1 - fout) * (1 - fout), e0 = Math.max(0, e - 0.3)
        const dir = ex.x < SX ? -1 : 1
        const tx2 = ex.x + dir * 420, ty2 = ex.y - 150 - ((q * 41) % 70)
        spark(ctx, ex.x + (tx2 - ex.x) * e, ex.y + (ty2 - ex.y) * e, ex.x + (tx2 - ex.x) * e0, ex.y + (ty2 - ex.y) * e0, aC, 1 - 0.5 * fout, 4.6, aCore)
      }
    }
    // what it learned comes back down the same thread, a little richer than what went up
    for (const [bt, who] of BACK) {
      if (who !== i) continue
      const dn = lin(t, bt, bt + 0.8)
      if (dn <= 0 || dn >= 1) continue
      const pr = rng(900 + Math.round(bt * 10))
      for (let j = 0; j < 14; j++) {
        const lag = pr() * 0.28, c = pr(), w = gz(pr) * 2.4
        const ph = Math.max(0, Math.min(1, (dn - lag) / 0.72))
        if (ph <= 0 || ph >= 1) continue
        const e = ph * ph
        const x = ex.x + (bx0 - ex.x) * e + w, y = ex.y + R + (by0 - ex.y - R) * e
        halo(ctx, x, y, 9, [255, 214, 130], 0.5)
        ctx.fillStyle = rgba(mix([214, 150, 40], [255, 236, 180], sm(n)), 1)
        ctx.beginPath()
        ctx.arc(x, y, 1.6 + c * 1.6, 0, 6.2832)
        ctx.fill()
      }
    }
  })
  ctx.restore()

  // dawn: the strider on the road
  const walked = (t - 32.9) * 185
  const st = ramp(t, 33.2, 34.2)
  if (walked > 0 && st > 0) {
    const [fx, fy] = roadAt(walked)
    const h = 310 * (1 - 0.14 * Math.min(1, walked / 900))
    const [ss, sx, sy] = camT(cam, depthAt(P, fx, fy))
    ctx.save()
    ctx.transform(ss, 0, 0, ss, sx, sy)
    ctx.globalAlpha = A * st
    strider(ctx, fx, fy, h, walked, { body: rgba(mix([64, 60, 54], [20, 18, 32], sm(n)), 1), far: rgba(mix([92, 87, 79], [34, 30, 50], sm(n)), 1) })
    ctx.restore()
  }

  // dust that catches the light
  if (o > 0) {
    ctx.globalAlpha = A * o
    ctx.globalCompositeOperation = "lighter"
    const mr2 = rng(131)
    for (let i = 0; i < 150; i++) {
      const x0 = mr2() * W, y0 = mr2() * H, dm = mr2(), ph = mr2() * 6.28, sp = mr2()
      const [ms, mtx, mty] = camT(cam, dm)
      const x = ((x0 + t * (6 + 22 * dm)) % (W + 80)) - 40
      const yy = y0 - t * (3 + 5 * sp) + 16 * Math.sin(t * 0.6 + ph)
      const y = (((yy % (H + 40)) + H + 40) % (H + 40)) - 20
      const a = (0.05 + 0.16 * dm) * (0.5 + 0.5 * Math.sin(t * (0.8 + sp) + ph))
      ctx.fillStyle = `rgba(255,228,178,${a * (0.5 * warm * (1 - n) + 1.5 * n)})`
      ctx.beginPath()
      ctx.arc(x * ms + mtx, y * ms + mty, (0.8 + 2.2 * dm) * (0.8 + 0.2 * (1 - n)), 0, 6.2832)
      ctx.fill()
    }
    ctx.globalCompositeOperation = "source-over"
  }
  ctx.restore()
}
