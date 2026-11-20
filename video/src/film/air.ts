import { rng } from "../util"
import { type Ctx, H, W, mix, rgba, sm } from "./core"
import type { Plates } from "./plates"

/**
 * The empty dark a film opens on: far veils of colour, the ghost of a low horizon, dust drifting in the
 * near air, and a soft dark that follows the falling spark. `tt` is the opening's own clock in seconds,
 * negative just before the loop point.
 */
export function openingAir(ctx: Ctx, air: number, tt: number) {
    // far, slow veils of colour, so the dark has distance in it
    for (const [bx, by, br, col, sp, a0] of [[420, 300, 720, "88,70,140", 9, 0.2], [1520, 420, 800, "120,84,120", -7, 0.16], [980, 120, 620, "60,56,120", 5, 0.18]] as [number, number, number, string, number, number][]) {
      const x = bx + sp * tt, y = by + 10 * Math.sin(tt * 0.3 + br)
      const g = ctx.createRadialGradient(x, y, 0, x, y, br)
      g.addColorStop(0, `rgba(${col},${a0 * air})`)
      g.addColorStop(0.45, `rgba(${col},${a0 * 0.42 * air})`)
      g.addColorStop(0.8, `rgba(${col},${a0 * 0.07 * air})`)
      g.addColorStop(1, `rgba(${col},0)`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }
    // the ghost of a far horizon, so low you only feel it; the floor will firm up exactly here
    // (a breath of light above it, a breath of dark below, strongest in the middle and gone at the sides)
    ctx.save()
    ctx.translate(960, 792)
    ctx.scale(1, 0.085)
    const up = ctx.createRadialGradient(0, 0, 0, 0, 0, 1100)
    up.addColorStop(0, `rgba(160,142,204,${0.1 * air})`)
    up.addColorStop(1, "rgba(160,142,204,0)")
    ctx.fillStyle = up
    ctx.fillRect(-1100, -1100, 2200, 1100)
    ctx.restore()
    const dn = ctx.createLinearGradient(0, 780, 0, 1080)
    dn.addColorStop(0, "rgba(10,8,22,0)")
    dn.addColorStop(0.3, `rgba(10,8,22,${0.2 * air})`)
    dn.addColorStop(1, `rgba(10,8,22,${0.1 * air})`)
    ctx.fillStyle = dn
    ctx.fillRect(0, 780, W, 300)
    // dust in the near air, out of focus, drifting toward us
    const dr = rng(303)
    ctx.save()
    ctx.globalCompositeOperation = "lighter"
    for (let i = 0; i < 46; i++) {
      const x0 = dr() * W, y0 = dr() * H, d = dr(), ph = dr() * 6.28
      const grow = 1 + 0.05 * (tt + 1) * (0.4 + d)
      const x = 960 + (x0 - 960 + 14 * tt * (d - 0.3)) * grow, y = 400 + (y0 - 400 - 9 * tt * d) * grow
      const rad = 2 + 9 * d * d
      const a = (0.03 + 0.07 * (1 - d)) * (0.6 + 0.4 * Math.sin(tt * (0.7 + d) + ph)) * air
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad)
      g.addColorStop(0, `rgba(226,214,240,${a})`)
      g.addColorStop(1, "rgba(226,214,240,0)")
      ctx.fillStyle = g
      ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2)
    }
    ctx.restore()
    // a soft pool of dark at the edges that follows the grain down, so the eye goes where it goes
    const gy = Math.max(160, Math.min(792, -40 + 832 * Math.pow(Math.max(0, tt) / 2.3, 2)))
    const vg = ctx.createRadialGradient(960, gy, 120, 960, gy, 1150)
    vg.addColorStop(0, "rgba(6,5,14,0)")
    vg.addColorStop(1, `rgba(6,5,14,${0.62 * air})`)
    ctx.fillStyle = vg
    ctx.fillRect(0, 0, W, H)
  }

/** The last touches on every frame: bloom after dark, a vignette, and film grain that moves. */
export function finish(ctx: Ctx, P: Plates, n: number, bloom: number, grain: number, frame: number) {
  // bloom: whatever is bright after dark spills a little light
  if (bloom > 0.01) {
    const sx = P.small.getContext("2d")!
    sx.filter = "none"
    sx.drawImage(ctx.canvas, 0, 0, W / 4, H / 4)
    sx.filter = "blur(5px)"
    sx.drawImage(P.small, 0, 0)
    ctx.save()
    ctx.globalCompositeOperation = "screen"
    ctx.globalAlpha = bloom
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(P.small, 0, 0, W, H)
    ctx.restore()
  }

  // finish: vignette and a breath of grain
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 1.05)
  vg.addColorStop(0, "rgba(0,0,0,0)")
  vg.addColorStop(1, rgba(mix([87, 73, 46], [4, 3, 10], sm(n)), 0.09 + 0.46 * sm(n)))
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, W, H)
  // film grain that lives: the same grain, sitting somewhere new every frame, heavier in the dark
  const fr = rng(frame + 1)
  const ox = -Math.floor(fr() * W), oy = -Math.floor(fr() * H)
  ctx.globalAlpha = 0.9 * grain
  for (let pass = 0; grain > 0 && pass < (n > 0.5 ? 2 : 1); pass++) {
    for (const dx of [-W, 0, W]) for (const dy of [0, H]) ctx.drawImage(P.noise, ox + dx + pass * 311, oy + dy)
  }
  ctx.globalAlpha = 1
}
