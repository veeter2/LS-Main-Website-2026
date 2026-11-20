import { ramp, rng } from "../util"
import { AX, type Ctx, H, SAND_DAY, W, gz, halo, mix, orb, palAt, pile, rgba, sm, stream, tone } from "./core"

/* The first world: one grain, then the funnel and the ball, then the wind. */
export const BX = AX
export const BY = 668
export const BR = 128
export const FLOOR = BY + BR - 4

export function funnelSide(sign: number, y: number) {
  // wide past the edges of the frame at the top, a narrow neck above the ball
  const u = Math.min(1, Math.max(0, (y + 30) / 500))
  return BX + sign * (22 + 1040 * Math.pow(1 - u, 2.5))
}
export const F_TOP = -30

export function sceneOne(ctx: Ctx, t: number, n: number, o: number) {
  ctx.save()
  ctx.globalAlpha = o

  // the floor: a line of light and its fall-off
  const fl = ramp(t, 2.6, 4)
  if (fl > 0) {
    const g = ctx.createLinearGradient(0, FLOOR, 0, H)
    g.addColorStop(0, tone(n, [206, 197, 176], [14, 12, 26], (0.75 + 0.1 * sm(n)) * fl))
    g.addColorStop(1, tone(n, [226, 219, 202], [8, 7, 16], (0.4 + 0.5 * sm(n)) * fl))
    ctx.fillStyle = g
    ctx.fillRect(-300, FLOOR, W + 600, H - FLOOR + 200)
    const lg = ctx.createLinearGradient(0, 0, W, 0)
    const lc = mix([126, 94, 38], [214, 200, 240], sm(n)).join(",")
    lg.addColorStop(0, `rgba(${lc},0)`)
    lg.addColorStop(0.5, `rgba(${lc},${0.45 * fl})`)
    lg.addColorStop(1, `rgba(${lc},0)`)
    ctx.fillStyle = lg
    ctx.fillRect(-300, FLOOR - 1, W + 600, 2)
  }

  // 0..3 one grain falls and lands
  const one = 1 - ramp(t, 3.0, 3.6)
  if (one > 0) {
    const landY = 792
    const f = Math.min(1, t / 2.3)
    const gy = -40 + (landY + 40) * f * f
    const landed = ramp(t, 2.3, 2.34)
    halo(ctx, BX, gy, 150, [232, 205, 150], 0.4 * one)
    if (!landed) {
      const tr = ctx.createLinearGradient(0, gy - 190 * f, 0, gy)
      tr.addColorStop(0, "rgba(232,205,150,0)")
      tr.addColorStop(1, `rgba(246,230,192,${0.75 * one})`)
      ctx.strokeStyle = tr
      ctx.lineWidth = 2.2
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(BX, gy - 190 * f)
      ctx.lineTo(BX, gy)
      ctx.stroke()
    } else {
      const rp = ramp(t, 2.3, 3.3)
      ctx.strokeStyle = `rgba(232,205,150,${0.6 * (1 - rp) * one})`
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.ellipse(BX, landY + 5, 20 + 220 * rp, (20 + 220 * rp) * 0.16, 0, 0, 6.2832)
      ctx.stroke()
    }
    ctx.fillStyle = `rgba(255,244,214,${one})`
    ctx.beginPath()
    ctx.arc(BX, gy, 4.6, 0, 6.2832)
    ctx.fill()
  }

  // 3.. the ball and the funnel arrive
  const ballIn = ramp(t, 3.0, 4.2)
  const pour = ramp(t, 3.6, 4.6) * (1 - ramp(t, 7.7, 8.3))
  const full = ramp(t, 4.2, 7.8) // how heaped it is
  const blown = ramp(t, 8.3, 11.4)
  const strain = ramp(t, 5.4, 7.6) * (1 - ramp(t, 8, 8.8))

  if (ballIn > 0) {
    // funnel: two fine lines and a breath of glass between them
    ctx.save()
    ctx.globalAlpha = o * ballIn * (1 - 0.55 * ramp(t, 8.4, 10))
    ctx.beginPath()
    for (let y = F_TOP; y <= 470; y += 6) y === F_TOP ? ctx.moveTo(funnelSide(-1, y), y) : ctx.lineTo(funnelSide(-1, y), y)
    for (let y = 470; y >= F_TOP; y -= 6) ctx.lineTo(funnelSide(1, y), y)
    ctx.closePath()
    const fg = ctx.createLinearGradient(0, 0, 0, 470)
    fg.addColorStop(0, tone(n, [31, 27, 20], [214, 200, 240], 0))
    fg.addColorStop(1, tone(n, [31, 27, 20], [214, 200, 240], 0.05 + 0.02 * sm(n)))
    ctx.fillStyle = fg
    ctx.fill()
    for (const sgn of [-1, 1]) {
      ctx.beginPath()
      for (let y = F_TOP; y <= 470; y += 6) y === F_TOP ? ctx.moveTo(funnelSide(sgn, y), y) : ctx.lineTo(funnelSide(sgn, y), y)
      const lg = ctx.createLinearGradient(0, 0, 0, 470)
      const lc = mix([31, 27, 20], [226, 214, 240], sm(n)).join(",")
      lg.addColorStop(0, `rgba(${lc},0)`)
      lg.addColorStop(0.35, `rgba(${lc},.45)`)
      lg.addColorStop(1, `rgba(${lc},.85)`)
      ctx.strokeStyle = lg
      ctx.lineWidth = 2
      ctx.stroke()
    }
    ctx.restore()

    // sand in the funnel: it slides down the walls and crowds at the neck
    if (pour > 0) {
      const r = rng(31)
      const pal = palAt(n)
      const thick = 0.35 + 0.65 * full
      for (let i = 0; i < 5200; i++) {
        const a = r(), b = r() * 2 - 1, c = r(), d = r()
        if (d > pour * thick) continue
        const ph = (a + t * 0.55) % 1
        const y = -20 + 490 * Math.pow(ph, 1.5)
        const half = funnelSide(1, y) - BX
        // near the walls more than the middle, like sand on a slope
        const x = BX + Math.sign(b) * half * (1 - Math.pow(Math.abs(b), 2.2) * 0.98) * (y > 380 ? 1 : 0.985)
        const xx = y > 330 ? BX + (x - BX) * 1 : x
        const len = 3 + 14 * ph
        ctx.strokeStyle = rgba(pal[Math.floor(c * pal.length)], (0.4 + 0.6 * c) * Math.min(1, Math.max(0, (y + 10) / 190)))
        ctx.lineWidth = 0.9 + c * 1.4
        ctx.lineCap = "round"
        ctx.beginPath()
        const dxdy = (funnelSide(1, y - len) - funnelSide(1, y)) * Math.sign(b) * (1 - Math.pow(Math.abs(b), 2.2) * 0.98)
        ctx.moveTo(xx + dxdy, y - len)
        ctx.lineTo(xx, y)
        ctx.stroke()
      }
      // the neck stream down to the ball
      halo(ctx, BX, BY - BR - 10, 240, [232, 205, 150], 0.2 * pour * n)
      stream(ctx, t, BX, 440, BY - BR - 40 * full + 6, 12 + 12 * full, 2600, n, 33, pour * (0.4 + 0.6 * full))
    }

    // shadow / reflection under the ball
    const sh = ctx.createRadialGradient(BX, FLOOR + 8, 0, BX, FLOOR + 8, 300)
    sh.addColorStop(0, tone(n, [31, 27, 20], [0, 0, 0], (0.34 + 0.26 * sm(n)) * ballIn))
    sh.addColorStop(1, "rgba(0,0,0,0)")
    ctx.save()
    ctx.translate(-150 * (1 - sm(n)), 0)
    ctx.scale(1, 0.14)
    ctx.fillStyle = sh
    ctx.fillRect(BX - 520, (FLOOR + 8) / 0.14 - 300, 1040, 600)
    ctx.restore()

    if (n < 1) {
      // morning sun low on the right: a long shadow to the left
      ctx.save()
      ctx.globalAlpha = o * ballIn * (1 - n)
      const sg = ctx.createLinearGradient(BX - 760, 0, BX + 40, 0)
      sg.addColorStop(0, "rgba(31,27,20,0)")
      sg.addColorStop(1, "rgba(31,27,20,.42)")
      ctx.fillStyle = sg
      ctx.filter = "blur(7px)"
      ctx.beginPath()
      ctx.ellipse(BX - 330, FLOOR + 16, 400, 20, 0, 0, 6.2832)
      ctx.fill()
      ctx.restore()
    }

    // the ball
    ctx.save()
    ctx.globalAlpha = o * ballIn
    if (strain > 0) {
      // it strains: rings of pressure, and heat showing through
      for (let i = 0; i < 3; i++) {
        const rr = BR + 22 + i * 26 + 5 * Math.sin(t * 5 + i)
        ctx.setLineDash([3, 9 + i * 3])
        ctx.strokeStyle = `rgba(232,205,150,${(0.6 - i * 0.16) * strain})`
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.arc(BX, BY, rr, 0, 6.2832)
        ctx.stroke()
      }
      ctx.setLineDash([])
      halo(ctx, BX, BY, BR * 2.3, [232, 180, 110], 0.26 * strain)
    }
    const squash = 1 + 0.035 * strain
    ctx.translate(BX, BY + BR)
    ctx.scale(squash, 1 / squash)
    ctx.translate(-BX, -(BY + BR))
    const dayBall = 1 - n
    orb(ctx, BX, BY, BR, "night", 21, 1)
    if (dayBall > 0) orb(ctx, BX, BY, BR, "ink", 22, dayBall)
    if (strain > 0 || full > 0) {
      // the load glowing inside it, from the top down
      ctx.save()
      ctx.beginPath()
      ctx.arc(BX, BY, BR, 0, 6.2832)
      ctx.clip()
      const hot = full * (1 - blown) * n
      const hg = ctx.createRadialGradient(BX, BY - BR * 0.9, 0, BX, BY - BR * 0.9, BR * 1.7)
      hg.addColorStop(0, `rgba(255,226,160,${0.85 * hot})`)
      hg.addColorStop(0.35, `rgba(214,150,80,${0.4 * hot})`)
      hg.addColorStop(1, "rgba(200,120,60,0)")
      ctx.fillStyle = hg
      ctx.fillRect(BX - BR, BY - BR, BR * 2, BR * 2)
      ctx.restore()
    }
    ctx.restore()

    // the heap on the ball, and what runs off it
    const heapH = 96 * full * (1 - ramp(t, 8.3, 10.2))
    if (heapH > 1) {
      ctx.save()
      capHeap(ctx, heapH, n)
      ctx.restore()
      const r = rng(41)
      const pal = palAt(n)
      // rivulets down both shoulders, then off into the air and onto the floor
      for (let i = 0; i < 2600; i++) {
        const a = r(), sgn = r() > 0.5 ? 1 : -1, c = r(), d = r(), e = r()
        if (d > full * (1 - blown)) continue
        const ph = (a + t * 0.5) % 1
        const ang = -Math.PI / 2 + sgn * (0.3 + 1.2 * Math.min(1, ph * 1.6))
        let x: number, y: number
        if (ph < 0.62) {
          const rad = BR + 1 + e * 5
          x = BX + rad * Math.cos(ang)
          y = BY + rad * Math.sin(ang)
        } else {
          const q = (ph - 0.62) / 0.38
          const a1 = -Math.PI / 2 + sgn * 1.5
          x = BX + (BR + 4) * Math.cos(a1) + sgn * (10 + e * 46) * q
          y = BY + (BR + 4) * Math.sin(a1) + (FLOOR - BY - 4) * q * q
        }
        ctx.fillStyle = rgba(pal[Math.floor(c * pal.length)], 0.6 + 0.4 * c)
        ctx.beginPath()
        ctx.arc(x, y, 0.7 + c * 1.2, 0, 6.2832)
        ctx.fill()
      }
      // small heaps where it lands on the floor
      const fh = 30 * full * (1 - ramp(t, 8.6, 10.6))
      pile(ctx, BX - BR - 34, FLOOR + 3, fh, n, 45)
      pile(ctx, BX + BR + 34, FLOOR + 3, fh * 0.9, n, 46)
    }
  }

  // 8.. morning wind: the heap lifts off as dust and is gone
  const wind = ramp(t, 8.3, 9.2) * (1 - ramp(t, 11, 12))
  if (wind > 0) {
    const r = rng(53)
    const lift = ramp(t, 8.3, 11.6)
    for (let i = 0; i < 6; i++) {
      const hx = BX + 180 + i * 190 + 200 * lift
      const hy = BY - BR - 60 - i * 34 - 30 * Math.sin(i * 1.7)
      halo(ctx, hx, hy, 260 - i * 14, [200, 169, 110], 0.11 * wind * (1 - i / 7))
    }
    for (let i = 0; i < 46000; i++) {
      const a = r(), b = r(), c = r(), d = r(), e = r(), g2 = gz(r)
      if (d > wind) continue
      const age = (a * 0.92 + lift * 0.7) % 1
      // dust travels in strands: each grain rides one, and the strands fray as they go
      const strand = Math.floor(c * 9)
      const sp = strand * 2.39
      const sa = -Math.PI / 2 + (b - 0.5) * 1.7
      const sr = BR + 3 + e * 46 * (1 - age)
      const sx = BX + sr * Math.cos(sa)
      const sy = BY + sr * Math.sin(sa)
      const far = Math.pow(age, 1.3)
      const x = sx + far * (1180 + 240 * Math.sin(sp))
      const centre = -far * (70 + 34 * strand) - 70 * far * Math.sin(far * (4.2 + (strand % 3)) + sp + t * 0.9) - 60 * far * far
      const y = sy + centre + g2 * (5 + 74 * far) * (0.5 + 0.5 * e)
      const al = Math.pow(1 - age, 1.15) * (0.25 + 0.6 * e) * wind
      const len = 1 + 9 * far * e
      ctx.strokeStyle = rgba(SAND_DAY[Math.floor(b * SAND_DAY.length)], al)
      ctx.lineWidth = 0.6 + e * 1.1 * (1 - far * 0.55)
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(x - len, y + len * 0.12)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }
  ctx.restore()
}

/** The heap that sits on top of the ball: a cap that follows the curve, peaked under the stream. */
export function capHeap(ctx: Ctx, h: number, n: number) {
  const spread = 0.42 + 0.5 * (h / 96)
  const pal = palAt(n)
  const top = (a: number) => {
    const u = Math.abs(a) / spread
    if (u >= 1) return BR
    return BR + h * Math.pow(1 - u, 1.15) * (1 - 0.25 * (1 - u))
  }
  ctx.beginPath()
  for (let a = -spread; a <= spread; a += 0.01) {
    const rad = top(a)
    const x = BX + rad * Math.sin(a), y = BY - rad * Math.cos(a)
    a === -spread ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  for (let a = spread; a >= -spread; a -= 0.02) ctx.lineTo(BX + (BR - 1) * Math.sin(a), BY - (BR - 1) * Math.cos(a))
  ctx.closePath()
  const g = ctx.createLinearGradient(BX - BR, 0, BX + BR, 0)
  g.addColorStop(0, tone(n, [107, 90, 56], [107, 87, 48]))
  g.addColorStop(0.5, tone(n, [176, 147, 90], [200, 169, 110]))
  g.addColorStop(1, tone(n, [220, 195, 138], [241, 220, 171]))
  ctx.fillStyle = g
  ctx.fill()
  ctx.clip()
  const r = rng(43)
  for (let i = 0; i < 9000; i++) {
    const a = (r() * 2 - 1) * spread
    const rad = BR + Math.pow(r(), 0.7) * (top(a) - BR)
    const side = a / spread
    const c = r()
    const tone = Math.max(0, Math.min(pal.length - 1, Math.floor((0.5 + side * 0.4 + (c - 0.5) * 0.9) * pal.length)))
    ctx.fillStyle = rgba(pal[tone], 0.5 + 0.5 * r())
    ctx.beginPath()
    ctx.arc(BX + rad * Math.sin(a), BY - rad * Math.cos(a), 0.7 + r() * 1.2, 0, 6.2832)
    ctx.fill()
  }
}
