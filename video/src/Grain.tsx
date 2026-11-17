import { useLayoutEffect, useMemo, useRef } from "react"
import { gauss, ridge, rng } from "./util"

type G = { x: number; y: number; v: number; e: number; arrive: number; drift: number }

const N = 42000
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
    const y = top + (H - top) * Math.pow(v, 0.72)
    const e = 0.35 + 0.65 * gauss((u - 0.55) * 1.7)
    // Arrival: most grain lands between 5 s and 12 s, densest around 8 s.
    const arrive = 4.5 + 8 * Math.pow(r(), 0.8)
    out.push({ x, y, v, e, arrive, drift: (r() - 0.5) * 2 })
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
    for (const g of field) {
      const dt = t - g.arrive
      if (dt < -2.2) continue
      let x = g.x
      let y = g.y
      let a = g.e * (0.92 - 0.72 * g.v) * alpha
      if (dt < 0) {
        // Still falling: above its spot, sparse, drifting a little.
        const f = -dt / 2.2
        y = g.y - f * f * 520
        x = g.x + g.drift * f * 40
        a *= 0.55
        if (y < -4) continue
      }
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`
      ctx.fillRect(x, y, 2.2, 2.2)
    }
  }, [t, alpha, ink, field])

  return <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />
}
