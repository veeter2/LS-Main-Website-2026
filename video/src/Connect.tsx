import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { C } from "./beats"
import { ramp, rng, win } from "./util"
import { finish } from "./film/air"
import { type Ctx, FILM_FPS, W, H, hex, mix, rgba } from "./film/core"
import { CONNECT_SECONDS, type Scene, buildScene, connectScene, dayAt } from "./film/connect"

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
  { at: 8, to: 12.5, text: "It all lands in one memory. Yours." },
  { at: 12.5, to: 16.5, text: "The model lights it. It does not hold it." },
  { at: 16.5, to: 21.5, text: "Experts and teammates read the same memory." },
  { at: 21.5, to: 25.5, text: "What they learn comes back to it." },
  { at: 25.5, to: 29.5, text: "It compounds." },
  { at: 29.5, to: 33, text: "Change the model. The memory stays." },
]

function paintConnect(ctx: Ctx, t: number, S: Scene, grain: number) {
  connectScene(ctx, t, S)
  finish(ctx, S.land, 0, 0, grain, Math.round(t * FILM_FPS))
}

/** `phone` sets the captions larger. `grain` is how strong the moving film grain is. */
export const Connect = ({ phone = false, grain = 1 }: { phone?: boolean; grain?: number }) => {
  const t = useCurrentFrame() / FILM_FPS
  const { width: vw } = useVideoConfig()
  const fit = vw / W
  const ref = useRef<HTMLCanvasElement>(null)
  const [land, setLand] = useState<Scene | null>(null)
  const [handle] = useState(() => delayRender("painting"))
  const released = useRef(false)

  useEffect(() => {
    const load = (src: string) =>
      new Promise<HTMLImageElement>((res, rej) => {
        const im = new Image()
        im.onload = () => res(im)
        im.onerror = rej
        im.src = src
      })
    Promise.all([load(staticFile("art/orbit.webp")), load(staticFile("art/land.png"))]).then(([paint, landImg]) => setLand(buildScene(paint, landImg)))
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

  // words go from paper to ink as the light comes, quickly, so they are never grey on grey
  const dk = t > 33.2 ? 0 : Math.max(0, Math.min(1, (1 - dayAt(t) - 0.38) / 0.24))
  const wordC = rgba(mix(hex(C.ink), hex(C.paper), dk), 1)
  const padC = mix([253, 252, 246], [22, 19, 38], dk).join(",")
  return (
    <AbsoluteFill style={{ background: C.dusk1, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
        <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />

        <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", ...DISPLAY, fontSize: 92, color: C.paper, opacity: 1 - ramp(t, 2.9, 3.5), transform: `scale(${1 + 0.012 * t})` }}>
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
          <div style={{ opacity: win(t, 34, 36.3, 0.4), transform: `translateY(${(1 - ramp(t, 34, 34.9)) * 16}px)` }}>
            One <em style={{ fontStyle: "italic", color: C.goldInk }}>memory</em>.
          </div>
          <div style={{ opacity: win(t, 34.5, 36.3, 0.4), transform: `translateY(${(1 - ramp(t, 34.5, 35.4)) * 16}px)` }}>Every model.</div>
        </div>
        <div style={{ position: "absolute", left: 138, top: 372, display: "flex", alignItems: "center", gap: 20, opacity: win(t, 34.9, 36.3, 0.4) }}>
          <Img src={staticFile("art/mark.png")} style={{ height: 82, width: "auto" }} />
          <span style={{ fontFamily, fontWeight: 500, fontSize: 43, letterSpacing: "0.01em", lineHeight: 1, color: "rgba(31,27,20,.94)" }}>LongStrider</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
