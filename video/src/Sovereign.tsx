import { useLayoutEffect, useRef, useState } from "react"
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { C } from "./beats"
import { ramp, win } from "./util"
import { finish } from "./film/air"
import { FILM_FPS, W, H, hex, mix, rgba } from "./film/core"
import { SOV_SECONDS, type Scene, buildScene, nightAt, sovereignScene } from "./film/sovereign"

export { SOV_SECONDS }

const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] })
loadFont("italic", { weights: ["400"], subsets: ["latin"] })
const DISPLAY = { fontFamily, fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.08 } as const

/**
 * The sovereign film: nothing leaves the building.
 * The night painting. The work stops at the wall, and the model comes inside instead.
 * `two` is how a long line breaks on the phone cut, where the words are larger.
 */
export const SOV_TITLE = "Some work can never leave the building."
export const SOV_CAPTIONS: { at: number; to: number; text: string; two?: [string, string] }[] = [
  { at: 3.5, to: 8, text: "Most AI sends your work out to the model." },
  { at: 8, to: 12, text: "Here, nothing crosses the line." },
  { at: 12, to: 16.5, text: "The model comes to the memory. Not the other way.", two: ["The model comes to the memory.", "Not the other way."] },
  { at: 16.5, to: 21, text: "Your work stays on your side." },
  { at: 21, to: 25, text: "And it keeps every lesson." },
  { at: 25, to: 30.6, text: "Change the model. The wall stays." },
  { at: 30.6, to: 35.4, text: "Your box. Your models. Your keys." },
]

/** `phone` sets the captions larger. `grain` is how strong the moving film grain is. */
export const Sovereign = ({ phone = false, grain = 1 }: { phone?: boolean; grain?: number }) => {
  const t = useCurrentFrame() / FILM_FPS
  const { width: vw } = useVideoConfig()
  const fit = vw / W
  const ref = useRef<HTMLCanvasElement>(null)
  const [scene] = useState<Scene>(() => buildScene())

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, W, H)
    sovereignScene(ctx, t, scene)
    const n = nightAt(t)
    finish(ctx, scene.P, n, 0.22 * n, grain, Math.round(t * FILM_FPS))
  }, [t, scene, grain])

  const dk = nightAt(t)
  const wordC = rgba(mix(hex(C.ink), hex(C.paper), dk), 1)
  const padC = mix([253, 252, 246], [40, 35, 62], dk).join(",")
  return (
    <AbsoluteFill style={{ background: C.dusk1, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
        <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />

        <div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center", ...DISPLAY, fontSize: phone ? 88 : 80, color: C.paper, opacity: 1 - ramp(t, 2.9, 3.5), transform: `scale(${1 + 0.012 * t})` }}>
          {SOV_TITLE.split(" ").map((w, i) => {
            const at = 0.25 + i * 0.13
            const lit = Math.exp(-Math.pow((t - 1.7) / 0.3, 2))
            return (
              <span key={i} style={{ display: "inline-block", marginRight: "0.26em", opacity: ramp(t, at, at + 0.5), transform: `translateY(${(1 - ramp(t, at, at + 0.6)) * 18}px)`, textShadow: `0 0 ${10 + 36 * lit}px rgba(232,205,150,${0.85 * lit})` }}>
                {w}
              </span>
            )
          })}
        </div>

        {SOV_CAPTIONS.map((c) => {
          const o = win(t, c.at + 0.2, c.to, 0.45)
          if (o <= 0) return null
          const rise = (1 - ramp(t, c.at + 0.2, c.at + 0.8)) * 14
          return (
            <div
              key={c.at}
              style={{
                position: "absolute", left: "4%", right: "4%", bottom: phone ? "4.5%" : "6.5%", textAlign: "center", ...DISPLAY, fontSize: phone ? 76 : 54, letterSpacing: "-0.015em", lineHeight: 1.16, whiteSpace: "nowrap",
                color: wordC, opacity: o, transform: `translateY(${rise}px)`, padding: "14px 32px",
                textShadow: `0 0 18px rgba(${padC},1), 0 0 6px rgba(${padC},.9)`,
              }}
            >
              {phone && c.two ? (<>{c.two[0]}<br />{c.two[1]}</>) : c.text}
            </div>
          )
        })}

        <div style={{ position: "absolute", left: 140, top: 150, ...DISPLAY, fontSize: 84, color: "rgba(31,27,20,.94)" }}>
          <div style={{ opacity: win(t, 36.3, 39.2, 0.4), transform: `translateY(${(1 - ramp(t, 36.3, 37.1)) * 16}px)` }}>
            Nothing <em style={{ fontStyle: "italic", color: C.goldInk }}>leaves</em>
          </div>
          <div style={{ opacity: win(t, 36.7, 39.2, 0.4), transform: `translateY(${(1 - ramp(t, 36.7, 37.5)) * 16}px)` }}>the building.</div>
        </div>
        <div style={{ position: "absolute", left: 138, top: 372, display: "flex", alignItems: "center", gap: 20, opacity: win(t, 37, 39.2, 0.4) }}>
          <Img src={staticFile("art/mark.png")} style={{ height: 82, width: "auto" }} />
          <span style={{ fontFamily, fontWeight: 500, fontSize: 43, letterSpacing: "0.01em", lineHeight: 1, color: "rgba(31,27,20,.94)" }}>LongStrider</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
