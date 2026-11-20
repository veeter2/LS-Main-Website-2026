import { C } from "../beats"
import { k, ramp, rng, win } from "../util"
import { type Ctx, H, LY, type RGB, SX, W, gz, halo, hex, lin, mix, orb, palAt, pile, rgba, sm, spline, stream, trail } from "./core"
import { BR, BX, BY, FLOOR, F_TOP, funnelSide } from "./first"
import { MR, MX, MY, compose, flick, roadAt } from "./land"
import { type Cam, type Plates, camT, depthAt, warp } from "./plates"
import { strider } from "./strider"

/**
 * The cost film: what does an answer cost?
 * First the costly way: the whole memory poured through the model for every question, more each time,
 * and ash where the money went. Then the same land as the home film, where a question takes a pinch.
 */
export const COST_SECONDS = 34
/** The land half keeps its own clock, two seconds ahead: the costly half was tightened so the turn comes sooner. */
const AHEAD = 2

/** 1 = night, 0 = day. The costly world is all night. Day comes with the land, then dusk, night, dawn. */
export const nightC = (t0: number, t = t0 + AHEAD) => k(t, [[0, 1], [15.6, 1], [17.2, 0], [25, 0], [28.2, 1], [31.6, 1], [33.4, 0], [35.2, 0], [36, 1]])
export const warmC = (t0: number, t = t0 + AHEAD) => Math.max(win(t, 15.4, 19, 1.2) * 0.55, win(t, 24.6, 28.8, 1.6) * 0.9, k(t, [[29.6, 0], [31.6, 0.5], [33.2, 1], [35.2, 1], [36, 0]]))
export const landInC = (t0: number, t = t0 + AHEAD) => ramp(t, 15.4, 17.2) * (1 - ramp(t, 35.2, 36))

const QUESTION: RGB = [226, 216, 244]
const ANSWER: RGB = [255, 226, 160]
const ASH: RGB[] = [[52, 48, 58], [74, 70, 82], [98, 94, 106], [124, 120, 132], [152, 148, 160]]

/** A spark in flight: a bright point with a short tail the way it came. */
function spark(ctx: Ctx, x: number, y: number, px: number, py: number, c: RGB, a: number, size = 4, core: RGB = [255, 255, 255]) {
  if (a <= 0) return
  const g = ctx.createLinearGradient(px, py, x, y)
  g.addColorStop(0, rgba(c, 0))
  g.addColorStop(1, rgba(c, 0.8 * a))
  ctx.strokeStyle = g
  ctx.lineWidth = size * 0.8
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(px, py)
  ctx.lineTo(x, y)
  ctx.stroke()
  halo(ctx, x, y, size * 11, c, 0.5 * a)
  ctx.fillStyle = rgba(core, a)
  ctx.beginPath()
  ctx.arc(x, y, size, 0, 6.2832)
  ctx.fill()
}

/* ---------- the costly world ---------- */

/** Three questions. Each one waits longer than the last, because there is more to send. */
const ASK = [4.6, 7.5, 10.6]
const WAIT = [1.4, 2.0, 2.6]
/** How full the funnel is: it only ever fills. */
const loadAt = (t: number) => 0.3 + 0.28 * ramp(t, 6.5, 7.4) + 0.34 * ramp(t, 9.9, 10.6)
const NECK = 470

export function costWorld(ctx: Ctx, t: number, o: number) {
  ctx.save()
  ctx.globalAlpha = o
  const n = 1
  const inn = ramp(t, 3.0, 4.2)

  // the floor
  const fl = ramp(t, 2.6, 4)
  if (fl > 0) {
    const g = ctx.createLinearGradient(0, FLOOR, 0, H)
    g.addColorStop(0, `rgba(14,12,26,${0.85 * fl})`)
    g.addColorStop(1, `rgba(8,7,16,${0.9 * fl})`)
    ctx.fillStyle = g
    ctx.fillRect(-300, FLOOR, W + 600, H - FLOOR + 200)
    const lg = ctx.createLinearGradient(0, 0, W, 0)
    lg.addColorStop(0, "rgba(214,200,240,0)")
    lg.addColorStop(0.5, `rgba(214,200,240,${0.45 * fl})`)
    lg.addColorStop(1, "rgba(214,200,240,0)")
    ctx.fillStyle = lg
    ctx.fillRect(-300, FLOOR - 1, W + 600, 2)
  }

  // 0..3 the first question falls alone
  const one = 1 - ramp(t, 3.0, 3.6)
  if (one > 0) {
    const landY = 792
    const f = Math.min(1, t / 2.3)
    const gy = -40 + (landY + 40) * f * f
    if (t < 2.3) spark(ctx, BX, gy, BX, gy - 190 * f, QUESTION, one, 4.6)
    else {
      for (const [d0, wide, a0] of [[2.3, 220, 0.6], [2.42, 760, 0.4]] as [number, number, number][]) {
        const rp = ramp(t, d0, d0 + 1.1)
        ctx.strokeStyle = rgba(QUESTION, a0 * (1 - rp) * one)
        ctx.lineWidth = 1.3
        ctx.beginPath()
        ctx.ellipse(BX, landY + 5, 20 + wide * rp, (20 + wide * rp) * 0.15, 0, 0, 6.2832)
        ctx.stroke()
      }
      halo(ctx, BX, landY, 260 * (1 - ramp(t, 2.3, 3.3)), [240, 232, 255], 0.5 * (1 - ramp(t, 2.3, 3.3)) * one)
    }
  }

  if (inn > 0) {
    ctx.save()
    ctx.globalAlpha = o * inn
    const load = loadAt(t)
    const level = NECK - 360 * load // the top of the resting sand
    // which question is being answered, and how far through the wait
    let qi = -1, qp = 0
    ASK.forEach((a, i) => { if (t >= a && t < a + WAIT[i]) { qi = i; qp = (t - a) / WAIT[i] } })
    const pour = qi >= 0 ? Math.min(1, qp * 6) * Math.min(1, (1 - qp) * 8) : 0
    const heavy = qi >= 0 ? 0.45 + 0.275 * qi : 0

    // the funnel, holding the memory
    const wall = (sgn: number) => {
      ctx.beginPath()
      for (let y = F_TOP; y <= NECK; y += 6) y === F_TOP ? ctx.moveTo(funnelSide(sgn, y), y) : ctx.lineTo(funnelSide(sgn, y), y)
    }
    // the resting sand: everything known so far
    ctx.save()
    ctx.beginPath()
    for (let y = level; y <= NECK; y += 6) y === level ? ctx.moveTo(funnelSide(-1, y), y) : ctx.lineTo(funnelSide(-1, y), y)
    for (let y = NECK; y >= level; y -= 6) ctx.lineTo(funnelSide(1, y), y)
    ctx.closePath()
    const bg = ctx.createLinearGradient(0, level, 0, NECK)
    bg.addColorStop(0, "rgba(232,205,150,.95)")
    bg.addColorStop(1, "rgba(150,118,62,.95)")
    ctx.fillStyle = bg
    ctx.fill()
    ctx.clip()
    const sr = rng(301)
    const pal = palAt(1)
    for (let i = 0; i < 9000; i++) {
      const u = sr(), v = sr(), c = sr()
      const y = NECK - 360 * v
      if (y < level) continue
      const half = funnelSide(1, y) - BX
      // while it pours the whole body slides toward the neck
      const slide = pour > 0 ? ((t * 60 * (0.4 + c)) % 26) * pour : 0
      ctx.fillStyle = rgba(pal[Math.floor(c * pal.length)], 0.5 + 0.5 * sr())
      ctx.beginPath()
      ctx.arc(BX + (u * 2 - 1) * half, y + slide, 0.8 + c * 1.3, 0, 6.2832)
      ctx.fill()
    }
    ctx.restore()
    halo(ctx, BX, level + 40, 300 + 300 * load, [232, 205, 150], 0.1 + 0.08 * load)
    for (const sgn of [-1, 1]) {
      wall(sgn)
      const lg = ctx.createLinearGradient(0, 0, 0, NECK)
      lg.addColorStop(0, "rgba(226,214,240,0)")
      lg.addColorStop(0.35, "rgba(226,214,240,.45)")
      lg.addColorStop(1, "rgba(226,214,240,.85)")
      ctx.strokeStyle = lg
      ctx.lineWidth = 2
      ctx.stroke()
    }
    // more memory arrives between questions: the funnel only ever fills
    for (const [a, b] of [[5.8, 6.9], [9.3, 10.1]]) {
      const hd = (t - a) * 0.85, tl = (t - b) * 0.85
      if (hd > 0 && tl < 1) stream(ctx, t, BX, -30, level + 6, 60, 5200, 1, 311, 0.5, { head: hd, tail: tl })
    }

    // the pour: all of it, through the model, for one question
    if (pour > 0) {
      halo(ctx, BX, BY - BR - 10, 260, [232, 205, 150], 0.22 * pour)
      stream(ctx, t, BX, NECK - 14, BY - BR + 8, 8 + 16 * heavy, 5200, 1, 33, pour * (0.35 + 0.65 * heavy))
    }

    // shadow under the ball
    const sh = ctx.createRadialGradient(BX, FLOOR + 8, 0, BX, FLOOR + 8, 300)
    sh.addColorStop(0, "rgba(0,0,0,.6)")
    sh.addColorStop(1, "rgba(0,0,0,0)")
    ctx.save()
    ctx.scale(1, 0.14)
    ctx.fillStyle = sh
    ctx.fillRect(BX - 520, (FLOOR + 8) / 0.14 - 300, 1040, 600)
    ctx.restore()

    // the model, straining under the load
    const strain = pour * heavy
    if (strain > 0) {
      for (let i = 0; i < 3; i++) {
        ctx.setLineDash([3, 9 + i * 3])
        ctx.strokeStyle = `rgba(232,205,150,${(0.6 - i * 0.16) * strain})`
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.arc(BX, BY, BR + 58 + i * 26 + 5 * Math.sin(t * 5 + i), 0, 6.2832)
        ctx.stroke()
      }
      ctx.setLineDash([])
      halo(ctx, BX, BY, BR * 2.4, [232, 170, 100], 0.3 * strain)
    }
    ctx.save()
    const squash = 1 + 0.04 * strain
    ctx.translate(BX, BY + BR)
    ctx.scale(squash, 1 / squash)
    ctx.translate(-BX, -(BY + BR))
    orb(ctx, BX, BY, BR, "night", 21, 1)
    if (pour > 0) {
      ctx.beginPath()
      ctx.arc(BX, BY, BR, 0, 6.2832)
      ctx.clip()
      const hg = ctx.createRadialGradient(BX, BY - BR * 0.9, 0, BX, BY - BR * 0.9, BR * 2.1)
      hg.addColorStop(0, `rgba(255,214,140,${0.9 * strain + 0.25 * pour})`)
      hg.addColorStop(0.4, `rgba(226,130,70,${0.55 * strain})`)
      hg.addColorStop(1, "rgba(200,90,50,0)")
      ctx.fillStyle = hg
      ctx.fillRect(BX - BR, BY - BR, BR * 2, BR * 2)
    }
    ctx.restore()

    // the wait: a ring that has to go all the way round before the answer comes, slower each time
    if (qi >= 0) {
      ctx.strokeStyle = "rgba(226,214,240,.16)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(BX, BY, BR + 30, 0, 6.2832)
      ctx.stroke()
      ctx.strokeStyle = rgba(QUESTION, 0.9)
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.arc(BX, BY, BR + 30, -Math.PI / 2, -Math.PI / 2 + 6.2832 * qp)
      ctx.stroke()
    }

    // what is left of everything that was sent: ash, out the far side, and it never stops piling up
    const spent = ASK.reduce((s, a, i) => s + lin(t, a + 0.2, a + WAIT[i] + 0.4) * (0.45 + 0.275 * i), 0)
    const ashX = BX - 470
    if (pour > 0) {
      const ar = rng(331)
      for (let i = 0; i < 2600; i++) {
        const a = ar(), b = gz(ar), c = ar(), d = ar()
        if (d > pour * (0.35 + 0.65 * heavy)) continue
        const ph = (a + t * 0.9) % 1
        const x = BX - BR * 0.8 + (ashX - BX + BR * 0.8) * ph + b * 26 * ph
        const y = BY - 10 - 150 * Math.sin(Math.PI * ph) * (0.5 + 0.5 * c) + (FLOOR - BY - 6) * ph * ph + b * 6
        // it leaves as gold and lands as ash
        ctx.fillStyle = rgba(mix([255, 196, 120], ASH[Math.floor(c * ASH.length)], Math.min(1, ph * 2.2)), 0.85 * (1 - 0.3 * ph))
        ctx.beginPath()
        ctx.arc(x, y, 0.8 + c * 1.3, 0, 6.2832)
        ctx.fill()
      }
    }
    pile(ctx, ashX, FLOOR + 3, 118 * Math.pow(spent / 2.2, 0.8), 1, 341, pour > 0 ? t : 0, 0, ASH)

    // questions in, answers out: a spark from the right, a wait, a spark back
    ASK.forEach((a, i) => {
      const fin = lin(t, a - 0.6, a)
      if (fin > 0 && fin < 1) {
        const e = fin * fin
        const x = W + 60 + (BX + BR + 6 - W - 60) * e, y = BY - 330 + 280 * e
        const e0 = Math.max(0, fin - 0.12) ** 2
        spark(ctx, x, y, W + 60 + (BX + BR + 6 - W - 60) * e0, BY - 330 + 280 * e0, QUESTION, 1)
      }
      const out = lin(t, a + WAIT[i], a + WAIT[i] + 0.55)
      if (out > 0 && out < 1) {
        const e = 1 - (1 - out) * (1 - out)
        const x = BX + BR + 6 + (W + 60 - BX - BR - 6) * e, y = BY - 50 - 250 * e
        const e0 = Math.max(0, e - 0.12)
        spark(ctx, x, y, BX + BR + 6 + (W + 60 - BX - BR - 6) * e0, BY - 50 - 250 * e0, ANSWER, 1)
      }
    })
    ctx.restore()
  }
  ctx.restore()
}

/* ---------- the land: the same questions, a pinch each ---------- */

/** The outline of a heap that is not there: what the costly way would have burned by now. */
function ghost(ctx: Ctx, cx: number, base: number, h: number, c: RGB, a: number, t: number) {
  if (h < 2 || a <= 0) return
  const w = h / Math.tan((33 * Math.PI) / 180)
  const surf = (dx: number) => {
    const u = Math.abs(dx) / w
    return base - h * Math.max(0, 1 - Math.sqrt(u * u + 0.004))
  }
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(cx - w, base)
  for (let dx = -w; dx <= w; dx += 4) ctx.lineTo(cx + dx, surf(dx))
  ctx.lineTo(cx + w, base)
  const g = ctx.createLinearGradient(0, base - h, 0, base)
  g.addColorStop(0, rgba(c, 0.17 * a))
  g.addColorStop(1, rgba(c, 0.03 * a))
  ctx.fillStyle = g
  ctx.fill()
  ctx.setLineDash([5, 9])
  ctx.lineDashOffset = -t * 6
  ctx.strokeStyle = rgba(c, 0.85 * a)
  ctx.lineWidth = 2.3
  ctx.lineCap = "round"
  ctx.stroke()
  ctx.restore()
}

const camC = (t: number): Cam => ({
  z: spline(t, [[15.4, 0.15], [17.8, 0.05], [25, 0.1], [31.6, 0.15], [36, 0.08]]),
  px: spline(t, [[15.4, 10], [17.8, -22], [25, 6], [31.6, 22], [36, -14]]),
  py: spline(t, [[15.4, -4], [25, 6], [31.6, -10], [36, -4]]),
})

/** When each question reaches the model. They come faster and faster, and nothing slows them. */
const ASKS = [18.4, 19.6, 20.6, 21.5, 22.3, 23.0, 23.6, 24.2, 24.8, 25.4, 26.0, 26.6, 27.2, 27.8, 28.4, 31.4, 32.0, 32.6, 33.2, 33.8, 34.4]
const FALLS = [18.9, 22.4, 25.6]
const LANDS = 1.5
/** Where the ash lands on the land: left of the heap, away from the road the questions use. */
const ASHX = SX - 500
/** How many questions have been answered so far, counted smoothly. */
const asked = (t: number) => ASKS.reduce((s2, a) => s2 + lin(t, a + 0.3, a + 0.9), 0)

export function costLand(ctx: Ctx, t0: number, n: number, o: number, P: Plates) {
  const t = t0 + AHEAD
  const warm = warmC(t0)
  const dusk = t < 30
  compose(P, {
    t, n, warm,
    gold: 0.3 + FALLS.reduce((s, f, i) => s + [0.16, 0.2, 0.4][i] * ramp(t, f + LANDS, f + LANDS + 1.5), 0),
    sunLow: dusk ? lin(t, 24.8, 28.6) : 1 - lin(t, 31.6, 34.6),
    reach: dusk ? 1700 : 700 + 1100 * ramp(t, 31.6, 34.6),
    lamp: (rank) => flick(t - 25.3 - 2.4 * rank) * (1 - ramp(t, 31.8 + 1.1 * (1 - rank), 32.4 + 1.1 * (1 - rank))),
  })
  const cam = camC(t)
  warp(P, cam, 1.2 * warm * (1 - 0.6 * n), t)

  ctx.save()
  ctx.globalAlpha = o
  ctx.drawImage(P.out, 0, 0)

  const words = win(t, 16.4, 32.3, 0.6)
  if (words > 0) {
    const mc = mix([247, 242, 231], [22, 19, 38], sm(n))
    const mist = ctx.createLinearGradient(0, 905, 0, H)
    mist.addColorStop(0, rgba(mc, 0))
    mist.addColorStop(0.6, rgba(mc, 0.9 * words))
    mist.addColorStop(1, rgba(mc, 0.96 * words))
    ctx.fillStyle = mist
    ctx.fillRect(0, 905, W, H - 905)
  }

  const [s, tx, ty] = camT(cam, depthAt(P, SX, LY))
  ctx.save()
  ctx.transform(s, 0, 0, s, tx, ty)

  // the memory: already here, on your road, and still growing
  const heapH = 78 + FALLS.reduce((a, f) => a + 7 * ramp(t, f + LANDS, f + LANDS + 1.4), 0)
  const top = LY - heapH + 4
  ctx.save()
  ctx.filter = "blur(8px)"
  ctx.fillStyle = `rgba(31,27,20,${0.3 * (1 - n * 0.5)})`
  ctx.beginPath()
  ctx.ellipse(SX - heapH * 0.5, LY + 5, heapH * 1.9, heapH * 0.16, 0, 0, 6.2832)
  ctx.fill()
  ctx.restore()
  if (n > 0.2) halo(ctx, SX, LY - heapH * 0.4, heapH * 3.2, [232, 205, 150], 0.3 * n * (0.94 + 0.06 * Math.sin(t * 1.3)))
  // the bill, measured the same way in both worlds. The dotted heap is what the costly way would have
  // burned by now, and it climbs with every question. The real ash is the small pile at its foot.
  const cnt = asked(t)
  const ashC: RGB = mix([70, 62, 96], [214, 204, 236], sm(n))
  const ghostH = 112 + 150 * Math.pow(cnt / ASKS.length, 0.8)
  let bump = 0
  for (const a of ASKS) bump = Math.max(bump, Math.sin(Math.PI * lin(t, a + 0.3, a + 0.9)))
  ghost(ctx, ASHX, LY + 2, ghostH * (1 + 0.025 * bump), ashC, ramp(t, 16.2, 17.6) * (0.75 + 0.25 * bump), t)
  const ashH = 27 * Math.sqrt(cnt / ASKS.length)
  pile(ctx, ASHX, LY + 3, ashH, 1, 343, 0, 0, ASH)
  const rich = ramp(t, 31.8, 33.8)
  if (rich > 0) halo(ctx, SX, LY - heapH * 0.45, heapH * 3.4, [255, 214, 130], 0.34 * rich * (1 - n))
  pile(ctx, SX, LY + 4, heapH, n, 81, Math.min(t, 27.6), rich)
  // what the day adds comes in light: a drift of sand along the road from the right, settling on the heap.
  // Nothing pours here. The flood belongs to the other world.
  const dpal = palAt(n)
  FALLS.forEach((f, i) => {
    const dr = rng(87 + i * 7)
    for (let j = 0; j < 520; j++) {
      const born = dr() * 1.5, c = dr(), lift = dr(), land = dr(), wob = dr() * 6.28
      const ph = (t - f - born) / LANDS
      if (ph <= 0 || ph >= 1) continue
      const e = Math.pow(ph, 0.85)
      const x1 = SX - heapH * 0.4 + land * heapH * 1.3
      const x = x1 + 880 * (1 - e)
      const y1 = top + heapH * (0.15 + 0.7 * Math.abs(land - 0.45))
      const y = y1 + (LY - 24 - y1) * (1 - e) - (30 + 90 * lift) * Math.sin(Math.PI * ph) + 5 * Math.sin(ph * 9 + wob)
      ctx.fillStyle = rgba(dpal[Math.floor(c * dpal.length)], 0.85 * Math.min(1, ph * 5) * Math.min(1, (1 - ph) * 8))
      ctx.beginPath()
      ctx.arc(x, y, 0.8 + c * 1.3, 0, 6.2832)
      ctx.fill()
    }
  })

  // the seat, and the faint line a pinch of sand travels
  const lineC: RGB = mix(hex(C.goldInk), [232, 205, 150], sm(n))
  ctx.strokeStyle = rgba(lineC, 0.6)
  ctx.lineWidth = 1.4
  ctx.setLineDash([2, 7])
  ctx.lineDashOffset = -t * 5
  ctx.beginPath()
  ctx.arc(MX, MY, MR + 16, 0, 6.2832)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.strokeStyle = rgba(lineC, 0.28)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(MX, MY + MR + 16)
  ctx.lineTo(MX, top)
  ctx.stroke()

  // the model: the gold ball, then at night a smaller one in the same seat
  const out = k(t, [[28.7, 0], [30.6, 1]])
  const inn = k(t, [[29.2, 0], [31.2, 1]])
  const SMALL = 23
  const gx = MX + 420 * out * out, gy = MY - 190 * Math.pow(out, 1.4)
  const goldA = 1 - ramp(out, 0.84, 1)
  let mx = MX, my = MY, mr = MR
  if (goldA > 0) {
    if (out > 0.02) trail(ctx, MX, MY, gx, gy, [232, 205, 150], 0.55 * goldA * Math.min(1, out * 4))
    halo(ctx, gx, gy, MR * (3.4 + 2 * n), [232, 205, 150], (0.3 + 0.35 * n) * goldA)
    orb(ctx, gx, gy, MR * (1 - 0.1 * out), "gold", 97, goldA)
  }
  if (inn > 0) {
    const e = 1 - Math.pow(1 - inn, 2.2)
    mx = MX - 560 * (1 - e) * (1 - e)
    my = MY - 170 * Math.pow(1 - e, 1.5)
    mr = SMALL
    const pa = ramp(inn, 0, 0.2)
    if (inn < 0.98) trail(ctx, MX - 560, MY - 170, mx, my, [214, 200, 240], 0.5 * pa * (1 - inn))
    halo(ctx, mx, my, SMALL * 5.4, [214, 200, 240], 0.42 * pa * Math.max(n, 0.35))
    orb(ctx, mx, my, SMALL, "pearl", 99, pa)
    const f = lin(t, 31.15, 32.15)
    if (f > 0 && f < 1) {
      ctx.strokeStyle = rgba(lineC, 0.7 * (1 - f) * (1 - f))
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.arc(MX, MY, MR + 16 + 70 * (1 - (1 - f) * (1 - f)), 0, 6.2832)
      ctx.stroke()
    }
  }

  // every question: in from the right, one pinch of sand up the line, the answer straight back out
  const pal = palAt(n)
  const seatR = inn >= 1 ? SMALL : MR
  // by day a question is ink and an answer is deep gold; after dark both are light
  const qC = mix([84, 70, 132], QUESTION, sm(n)), qCore = mix([58, 46, 100], [255, 255, 255], sm(n))
  const aC = mix([176, 124, 30], ANSWER, sm(n)), aCore = mix([150, 100, 16], [255, 250, 232], sm(n))
  for (let i = 0; i < ASKS.length; i++) {
    const a = ASKS[i]
    const sx0 = MX + 760, sy0 = MY - 250 + ((i * 53) % 90)
    const fin = lin(t, a - 0.5, a)
    if (fin > 0 && fin < 1) {
      const e = fin * fin, e0 = Math.max(0, fin - 0.26) ** 2
      spark(ctx, sx0 + (MX + seatR + 4 - sx0) * e, sy0 + (MY - sy0) * e, sx0 + (MX + seatR + 4 - sx0) * e0, sy0 + (MY - sy0) * e0, qC, 1, 7.5, qCore)
    }
    const up = lin(t, a - 0.05, a + 0.36)
    if (up > 0 && up < 1) {
      const pr = rng(500 + i)
      for (let j = 0; j < 16; j++) {
        const lag = pr() * 0.16, bx = gz(pr) * 2.6, c = pr()
        const ph = Math.max(0, Math.min(1, (up - lag) / (1 - 0.16)))
        const e = 1 - (1 - ph) * (1 - ph)
        ctx.fillStyle = rgba(n > 0.5 ? [255, 240, 204] : pal[Math.floor(c * pal.length)], ph > 0 && ph < 1 ? 0.95 : 0)
        ctx.beginPath()
        ctx.arc(MX + bx, top - (top - MY - seatR) * e, 1.2 + c * 1.6, 0, 6.2832)
        ctx.fill()
      }
    }
    // the wait, drawn the way it was in the costly world: here the ring is round before you can watch it
    const snap = lin(t, a - 0.04, a + 0.3)
    const hold = lin(t, a + 0.3, a + 0.7)
    if (snap > 0 && hold < 1) {
      ctx.strokeStyle = rgba(qC, 0.95 * (1 - hold))
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.arc(MX, MY, seatR + 16, -Math.PI / 2, -Math.PI / 2 + 6.2832 * (1 - (1 - snap) * (1 - snap)))
      ctx.stroke()
    }
    // what it burned: a few grains of ash, off to the small pile
    const burn = lin(t, a + 0.3, a + 1.0)
    if (burn > 0 && burn < 1) {
      const br = rng(700 + i)
      for (let j = 0; j < 11; j++) {
        const lag = br() * 0.25, c = br(), b = gz(br)
        const ph = Math.max(0, Math.min(1, (burn - lag) / 0.75))
        if (ph <= 0 || ph >= 1) continue
        const x = MX - seatR + (ASHX - MX + seatR + b * 10) * ph
        const y = MY + (LY - ashH - MY) * ph * ph - 70 * Math.sin(Math.PI * ph) + b * 4
        ctx.fillStyle = rgba(mix([255, 196, 120], mix(ASH[1 + Math.floor(c * 3)], ASH[4], sm(n) * 0.6), Math.min(1, ph * 3)), 0.9)
        ctx.beginPath()
        ctx.arc(x, y, 1.1 + c * 1.3, 0, 6.2832)
        ctx.fill()
      }
    }
    const flash = lin(t, a + 0.3, a + 0.62)
    if (flash > 0 && flash < 1) halo(ctx, MX, MY, seatR * 4.5, mix([232, 176, 70], ANSWER, sm(n)), 0.55 * Math.sin(Math.PI * flash))
    const fout = lin(t, a + 0.36, a + 0.82)
    if (fout > 0 && fout < 1) {
      const e = 1 - (1 - fout) * (1 - fout), e0 = Math.max(0, e - 0.3)
      const ex = MX + 820, ey = MY - 120 + ((i * 37) % 80)
      spark(ctx, MX + seatR + 4 + (ex - MX - seatR - 4) * e, MY + (ey - MY) * e, MX + seatR + 4 + (ex - MX - seatR - 4) * e0, MY + (ey - MY) * e0, aC, 1, 7.5, aCore)
    }
  }
  ctx.restore()

  // dawn: the strider on the road
  const walked = (t - 31.4) * 185
  const st = ramp(t, 31.8, 32.8)
  if (walked > 0 && st > 0) {
    const [fx, fy] = roadAt(walked)
    const h = 310 * (1 - 0.14 * Math.min(1, walked / 900))
    const [ss, sx, sy] = camT(cam, depthAt(P, fx, fy))
    ctx.save()
    ctx.transform(ss, 0, 0, ss, sx, sy)
    ctx.globalAlpha = o * st
    strider(ctx, fx, fy, h, walked, { body: rgba(mix([64, 60, 54], [20, 18, 32], sm(n)), 1), far: rgba(mix([92, 87, 79], [34, 30, 50], sm(n)), 1) })
    ctx.restore()
  }

  // dust that catches the light
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
  ctx.restore()
}
