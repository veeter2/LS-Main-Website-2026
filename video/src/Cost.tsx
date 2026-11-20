import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { C } from "./beats"
import { ramp, rng, win } from "./util"
import { finish, openingAir } from "./film/air"
import { type Ctx, FILM_FPS, H, W, hex, mix, rgba, spline } from "./film/core"
import { COST_SECONDS, costLand, costWorld, landInC, nightC, warmC } from "./film/cost"
import { BX, BY } from "./film/first"
import { type Plates, buildPlates } from "./film/plates"

export { COST_SECONDS }

const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] })
loadFont("italic", { weights: ["400"], subsets: ["latin"] })
const DISPLAY = { fontFamily, fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.08 } as const

/**
 * The cost film: what does an answer cost?
 * The costly way first, then the same land as the home film. Same type, same world, it loops.
 */
export const COST_CAPTIONS: { at: number; to: number; text: string }[] = [
  { at: 3.6, to: 7.3, text: "Most AI sends the model everything." },
  { at: 7.3, to: 10.4, text: "Every question. Every time." },
  { at: 10.4, to: 14, text: "Know more, and every answer burns more tokens." },
  { at: 14.4, to: 18.6, text: "LongStrider keeps the memory on your side." },
  { at: 18.6, to: 23, text: "Each question takes only what it needs." },
  { at: 23, to: 26.6, text: "So answers come fast, and the bill stays flat." },
  { at: 26.6, to: 30.2, text: "Use a smaller model. Same memory." },
]

function paintCost(ctx: Ctx, t: number, P: Plates, grain: number) {
  const n = nightC(t)
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, rgba(mix(hex(C.surface), [22, 19, 38], n), 1))
  sky.addColorStop(0.62, rgba(mix(hex(C.paper), hex(C.dusk2), n), 1))
  sky.addColorStop(1, rgba(mix(hex(C.paper), hex(C.dusk1), n), 1))
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  const landIn = landInC(t)
  const first = 1 - landIn
  const early = t < 15.3
  if (first > 0) {
    const air = t < 4.4 ? 1 - ramp(t, 3.1, 4.4) : ramp(t, 33.2, COST_SECONDS)
    if (air > 0) openingAir(ctx, air, t < 20 ? t : t - COST_SECONDS)
    if (n > 0.3) {
      const r = rng(11)
      const drift = early ? spline(t, [[0, 0], [9, 14], [15.3, 20]]) : 0
      for (let i = 0; i < 260; i++) {
        const x = r() * W, y = r() * 620, s = r()
        const tw = 0.6 + 0.4 * Math.sin((t * 6.2832 * (4 + Math.floor(s * 14))) / COST_SECONDS + i)
        const push = 1 + (early ? 0.012 * t : 0) * (0.3 + s)
        ctx.fillStyle = `rgba(241,236,223,${((n - 0.3) / 0.7) * (0.12 + 0.5 * s * s) * tw * (1 - y / 760)})`
        ctx.beginPath()
        ctx.arc(960 + (x - 960) * push, 380 + (y - drift * (0.4 + s) - 380) * push, 0.5 + s * 1.1, 0, 6.2832)
        ctx.fill()
      }
    }
    if (early) {
      // a slow push in while the load gets heavier
      const z = spline(t, [[0, 1], [3, 1.012], [13.2, 1.075], [15.3, 1.06]])
      ctx.save()
      ctx.translate(BX, BY)
      ctx.scale(z, z)
      ctx.translate(-BX, -BY)
      costWorld(ctx, t, first)
      ctx.restore()
    }
  }
  if (landIn > 0) costLand(ctx, t, n, landIn, P)
  finish(ctx, P, n, 0.2 * n + 0.1 * (early ? 0 : warmC(t)) * landIn, grain, Math.round(t * FILM_FPS))
}

/** `phone` sets the captions larger. `grain` is how strong the moving film grain is. */
export const Cost = ({ phone = false, grain = 1 }: { phone?: boolean; grain?: number }) => {
  const t = useCurrentFrame() / FILM_FPS
  const { width: vw } = useVideoConfig()
  const fit = vw / W
  const ref = useRef<HTMLCanvasElement>(null)
  const [land, setLand] = useState<Plates | null>(null)
  const [handle] = useState(() => delayRender("painting"))
  const released = useRef(false)

  useEffect(() => {
    const im = new Image()
    im.onload = () => setLand(buildPlates(im))
    im.src = staticFile("art/land.png")
  }, [])

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx || !land) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, W, H)
    paintCost(ctx, t, land, grain)
    if (!released.current) {
      released.current = true
      continueRender(handle)
    }
  }, [t, land, handle, grain])

  const dk = Math.max(0, Math.min(1, (nightC(t) - 0.38) / 0.24))
  const wordC = rgba(mix(hex(C.ink), hex(C.paper), dk), 1)
  const padC = mix([244, 239, 228], [22, 19, 38], dk).join(",")
  return (
    <AbsoluteFill style={{ background: C.dusk1, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
        <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />

        <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", ...DISPLAY, fontSize: 92, color: C.paper, opacity: 1 - ramp(t, 2.6, 3.1), transform: `scale(${1 + 0.012 * t})` }}>
          {"What does an answer cost?".split(" ").map((w, i) => {
            const at = 0.25 + i * 0.16
            const lit = Math.exp(-Math.pow((t - 1.62) / 0.3, 2))
            return (
              <span key={i} style={{ display: "inline-block", marginRight: "0.26em", opacity: ramp(t, at, at + 0.5), transform: `translateY(${(1 - ramp(t, at, at + 0.6)) * 18}px)`, textShadow: `0 0 ${10 + 36 * lit}px rgba(226,216,244,${0.85 * lit})` }}>
                {w}
              </span>
            )
          })}
        </div>

        {COST_CAPTIONS.map((c) => {
          const o = win(t, c.at + 0.2, c.to, 0.45)
          if (o <= 0) return null
          const rise = (1 - ramp(t, c.at + 0.2, c.at + 0.8)) * 14
          return (
            <div
              key={c.at}
              style={{
                position: "absolute", left: "4%", right: "4%", bottom: phone ? "5%" : "6.5%", textAlign: "center", ...DISPLAY, fontSize: phone ? 76 : 54, letterSpacing: "-0.015em", lineHeight: 1.2, whiteSpace: "nowrap",
                color: wordC, opacity: o, transform: `translateY(${rise}px)`, padding: "14px 32px",
                textShadow: `0 0 18px rgba(${padC},1), 0 0 6px rgba(${padC},.9)`,
              }}
            >
              {c.text}
            </div>
          )
        })}

        <div style={{ position: "absolute", left: 140, top: 150, ...DISPLAY, fontSize: 84, color: "rgba(31,27,20,.94)" }}>
          <div style={{ opacity: win(t, 30.6, 33.5, 0.6), transform: `translateY(${(1 - ramp(t, 30.6, 31.5)) * 16}px)` }}>Know more.</div>
          <div style={{ opacity: win(t, 31.2, 33.5, 0.6), transform: `translateY(${(1 - ramp(t, 31.2, 32.1)) * 16}px)` }}>
            Spend <em style={{ fontStyle: "italic", color: C.goldInk }}>less</em>.
          </div>
        </div>
        <div style={{ position: "absolute", left: 138, top: 372, display: "flex", alignItems: "center", gap: 20, opacity: win(t, 31.8, 33.5, 0.6) }}>
          <Img src={staticFile("art/mark.png")} style={{ height: 82, width: "auto" }} />
          <span style={{ fontFamily, fontWeight: 500, fontSize: 43, letterSpacing: "0.01em", lineHeight: 1, color: "rgba(31,27,20,.94)" }}>LongStrider</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
