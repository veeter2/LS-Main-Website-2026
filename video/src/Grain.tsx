import { useLayoutEffect, useMemo, useRef } from "react"
import { gauss, ridge, rng } from "./util"

type G = { x: number; y: number; v: number; e: number; arrive: number; drift: number; shown: boolean }

const N = 9000
const W = 1920
const H = 1080

/**
 * The memory as sand. One deterministic field of grains; each has a world
 * position on the dune and the second it arrives (falls in). Drawn to a
 * canvas every frame, in ink by day and paper by night.
 */
function makeField(): G[] {
  const r = rng(7)
  const out: G[] = []
  for (let i = 0; i < N; i++) {
    const u = r()
    const v = r()
    const x = u * W
    const top = ridge(x)
    // Grain sits on the ridge and thins fast below it, so the dune reads as a shape with a textured crest.
    const y = top + 260 * Math.pow(v, 1.6)
    const e = (0.35 + 0.65 * gauss((u - 0.55) * 1.7)) * Math.exp(-(y - top) / 120)
    // Arrival: most grain lands between 5 s and 12 s, densest around 8 s.
    const arrive = 4.5 + 8 * Math.pow(r(), 0.8)
    out.push({ x, y, v, e, arrive, drift: (r() - 0.5) * 2, shown: i % 4 === 0 })
  }
  return out
}

export const Grain = ({ t, alpha, ink }: { t: number; alpha: number; ink: [number, number, number] }) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const field = useMemo(makeField, [])

  useLayoutEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)
    if (alpha <= 0.001) return
    const [cr, cg, cb] = ink
    // The dune itself: one soft wash under the ridge, so the land is a form before it is texture.
    const wash = ctx.createLinearGradient(0, 380, 0, H)
    wash.addColorStop(0, `rgba(${cr},${cg},${cb},${(0.26 * alpha).toFixed(3)})`)
    wash.addColorStop(0.45, `rgba(${cr},${cg},${cb},${(0.1 * alpha).toFixed(3)})`)
    wash.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
    ctx.fillStyle = wash
    ctx.beginPath()
    ctx.moveTo(0, H)
    for (let x = 0; x <= W; x += 16) ctx.lineTo(x, ridge(x))
    ctx.lineTo(W, H)
    ctx.closePath()
    ctx.fill()
    for (const g of field) {
      const dt = t - g.arrive
      if (dt < -2.2) continue
      let x = g.x
      let y = g.y
      let a = g.e * 0.7 * alpha
      let r = 2.4
      if (dt < 0) {
        if (!g.shown) continue
        // Still falling: above its spot, sparse, drifting a little.
        const f = -dt / 2.2
        y = g.y - f * f * 520
        x = g.x + g.drift * f * 40
        a = 0.5 * alpha
        r = 2.8
        if (y < -4) continue
      }
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 6.2832)
      ctx.fill()
    }
  }, [t, alpha, ink, field])

  return <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />
}
