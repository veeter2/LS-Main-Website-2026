import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { C } from "./beats"
import { ramp, rng, win } from "./util"
import { finish, openingAir } from "./film/air"
import { type Ctx, FILM_FPS, H, W, hex, mix, rgba } from "./film/core"
import { CONNECT_SECONDS, connectScene, landInK, nightK, warmK } from "./film/connect"
import { type Plates, buildPlates } from "./film/plates"

export { CONNECT_SECONDS }

const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] })
loadFont("italic", { weights: ["400"], subsets: ["latin"] })
const DISPLAY = { fontFamily, fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.08 } as const

/**
 * The connectors film: where does the work go?
 * Same land, same type as the other two. The work falls in from four places and lands as one memory.
 */
export const CONNECT_CAPTIONS: { at: number; to: number; text: string }[] = [
  { at: 3.8, to: 8, text: "Chat. Files. Calls. Your people." },
  { at: 8, to: 12, text: "It all lands in one memory. Yours." },
  // one thought in two breaths, so each line stays short enough for a phone
  { at: 12, to: 14, text: "The model does not hold it." },
  { at: 14, to: 16.2, text: "It is handed what it needs." },
  { at: 16.2, to: 21, text: "Experts and teammates read the same memory." },
  { at: 21, to: 25, text: "What they learn comes back to it." },
  { at: 25, to: 29, text: "It compounds." },
  { at: 29, to: 32.6, text: "Change the model. The memory stays." },
]

function paintConnect(ctx: Ctx, t: number, P: Plates, grain: number) {
  const n = nightK(t)
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, rgba(mix(hex(C.surface), [22, 19, 38], n), 1))
  sky.addColorStop(0.62, rgba(mix(hex(C.paper), hex(C.dusk2), n), 1))
  sky.addColorStop(1, rgba(mix(hex(C.paper), hex(C.dusk1), n), 1))
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  const landIn = landInK(t)
  const first = 1 - landIn
  if (first > 0) {
    const air = t < 4.4 ? 1 - ramp(t, 3.1, 4.4) : ramp(t, 35.2, CONNECT_SECONDS)
    if (air > 0) openingAir(ctx, air, t < 20 ? t : t - CONNECT_SECONDS)
    if (n > 0.3) {
      const r = rng(11)
      for (let i = 0; i < 260; i++) {
        const x = r() * W, y = r() * 620, s = r()
        const tw = 0.6 + 0.4 * Math.sin((t * 6.2832 * (4 + Math.floor(s * 14))) / CONNECT_SECONDS + i)
        ctx.fillStyle = `rgba(241,236,223,${first * ((n - 0.3) / 0.7) * (0.12 + 0.5 * s * s) * tw * (1 - y / 760)})`
        ctx.beginPath()
        ctx.arc(x, y, 0.5 + s * 1.1, 0, 6.2832)
        ctx.fill()
      }
    }
  }
  connectScene(ctx, t, n, P)
  finish(ctx, P, n, 0.2 * n + 0.1 * warmK(t) * landIn, grain, Math.round(t * FILM_FPS))
}

/** `phone` sets the captions larger. `grain` is how strong the moving film grain is. */
export const Connect = ({ phone = false, grain = 1 }: { phone?: boolean; grain?: number }) => {
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
    paintConnect(ctx, t, land, grain)
    if (!released.current) {
      released.current = true
      continueRender(handle)
    }
  }, [t, land, handle, grain])

  const dk = Math.max(0, Math.min(1, (nightK(t) - 0.38) / 0.24))
  const wordC = rgba(mix(hex(C.ink), hex(C.paper), dk), 1)
  const padC = mix([244, 239, 228], [22, 19, 38], dk).join(",")
  return (
    <AbsoluteFill style={{ background: C.dusk1, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
        <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />

        <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", ...DISPLAY, fontSize: 92, color: C.paper, opacity: 1 - ramp(t, 2.6, 3.1), transform: `scale(${1 + 0.012 * t})` }}>
          {"Where does the work go?".split(" ").map((w, i) => {
            const at = 0.25 + i * 0.16
            const lit = Math.exp(-Math.pow((t - 1.62) / 0.3, 2))
            return (
              <span key={i} style={{ display: "inline-block", marginRight: "0.26em", opacity: ramp(t, at, at + 0.5), transform: `translateY(${(1 - ramp(t, at, at + 0.6)) * 18}px)`, textShadow: `0 0 ${10 + 36 * lit}px rgba(232,205,150,${0.85 * lit})` }}>
                {w}
              </span>
            )
          })}
        </div>

        {CONNECT_CAPTIONS.map((c) => {
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
          <div style={{ opacity: win(t, 33.3, 35.5, 0.6), transform: `translateY(${(1 - ramp(t, 33.3, 34.2)) * 16}px)` }}>
            One <em style={{ fontStyle: "italic", color: C.goldInk }}>memory</em>.
          </div>
          <div style={{ opacity: win(t, 33.9, 35.5, 0.6), transform: `translateY(${(1 - ramp(t, 33.9, 34.8)) * 16}px)` }}>Every model.</div>
        </div>
        <div style={{ position: "absolute", left: 138, top: 372, display: "flex", alignItems: "center", gap: 20, opacity: win(t, 34.4, 35.5, 0.6) }}>
          <Img src={staticFile("art/mark.png")} style={{ height: 82, width: "auto" }} />
          <span style={{ fontFamily, fontWeight: 500, fontSize: 43, letterSpacing: "0.01em", lineHeight: 1, color: "rgba(31,27,20,.94)" }}>LongStrider</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
