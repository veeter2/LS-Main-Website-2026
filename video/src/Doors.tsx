import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { C } from "./beats"
import { ramp, win } from "./util"
import { finish } from "./film/air"
import { FILM_FPS, W, H } from "./film/core"
import { DOORS_SECONDS, type Scene, buildScene, doorsScene } from "./film/doors"

export { DOORS_SECONDS }

const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] })
loadFont("italic", { weights: ["400"], subsets: ["latin"] })
const DISPLAY = { fontFamily, fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.08 } as const
const INK = "rgba(31,27,20,.94)"

/**
 * The two doors film: whose memory is it?
 * The stepping stones painting, in daylight all the way. Each disc is one person's ground; the road is the company's.
 * `two` is how a long line breaks on the phone cut, where the words are larger.
 */
export const DOORS_TITLE = "Whose memory is it?"
export const DOORS_CAPTIONS: { at: number; to: number; text: string; two?: [string, string] }[] = [
  { at: 3.5, to: 8, text: "What you work on stays with you." },
  { at: 8, to: 12, text: "Everyone on the team gets their own." },
  { at: 12, to: 16, text: "The company has its own too." },
  { at: 16, to: 20.5, text: "You choose what you share." },
  { at: 20.5, to: 24.5, text: "The company sees what you shared. Nothing else.", two: ["The company sees what you shared.", "Nothing else."] },
  { at: 24.5, to: 28, text: "Yours grows. The company's grows." },
  { at: 28, to: 31, text: "Change the model. Nothing moves." },
]

/** `phone` sets the captions larger. `grain` is how strong the moving film grain is. */
export const Doors = ({ phone = false, grain = 1 }: { phone?: boolean; grain?: number }) => {
  const t = useCurrentFrame() / FILM_FPS
  const { width: vw } = useVideoConfig()
  const fit = vw / W
  const ref = useRef<HTMLCanvasElement>(null)
  const [scene, setScene] = useState<Scene | null>(null)
  const [handle] = useState(() => delayRender("painting"))
  const released = useRef(false)

  useEffect(() => {
    const im = new Image()
    im.onload = () => setScene(buildScene(im))
    im.src = staticFile("art/steps.webp")
  }, [])

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx || !scene) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, W, H)
    doorsScene(ctx, t, scene)
    finish(ctx, scene.P, 0, 0, grain, Math.round(t * FILM_FPS))
    if (!released.current) {
      released.current = true
      continueRender(handle)
    }
  }, [t, scene, handle, grain])

  return (
    <AbsoluteFill style={{ background: C.surface, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
        <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />

        <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", ...DISPLAY, fontSize: 96, color: INK, opacity: 1 - ramp(t, 2.9, 3.5), transform: `scale(${1 + 0.012 * t})` }}>
          {DOORS_TITLE.split(" ").map((w, i) => {
            const at = 0.25 + i * 0.16
            return (
              <span key={i} style={{ display: "inline-block", marginRight: "0.26em", opacity: ramp(t, at, at + 0.5), transform: `translateY(${(1 - ramp(t, at, at + 0.6)) * 18}px)` }}>
                {w}
              </span>
            )
          })}
        </div>

        {DOORS_CAPTIONS.map((c) => {
          const o = win(t, c.at + 0.2, c.to, 0.45)
          if (o <= 0) return null
          const rise = (1 - ramp(t, c.at + 0.2, c.at + 0.8)) * 14
          return (
            <div
              key={c.at}
              style={{
                position: "absolute", left: "4%", right: "4%", bottom: phone ? "4.5%" : "6.5%", textAlign: "center", ...DISPLAY, fontSize: phone ? 76 : 54, letterSpacing: "-0.015em", lineHeight: 1.16, whiteSpace: "nowrap",
                color: INK, opacity: o, transform: `translateY(${rise}px)`, padding: "14px 32px",
                textShadow: "0 0 18px rgba(255,251,243,1), 0 0 6px rgba(255,251,243,.9)",
              }}
            >
              {phone && c.two ? (<>{c.two[0]}<br />{c.two[1]}</>) : c.text}
            </div>
          )
        })}

        <div style={{ position: "absolute", left: 140, top: 130, ...DISPLAY, fontSize: 84, color: INK }}>
          <div style={{ opacity: win(t, 32, 34.3, 0.4), transform: `translateY(${(1 - ramp(t, 32, 32.8)) * 16}px)` }}>Your memory.</div>
          <div style={{ opacity: win(t, 32.4, 34.3, 0.4), transform: `translateY(${(1 - ramp(t, 32.4, 33.2)) * 16}px)` }}>
            Your <em style={{ fontStyle: "italic", color: C.goldInk }}>call</em>.
          </div>
        </div>
        <div style={{ position: "absolute", left: 138, top: 352, display: "flex", alignItems: "center", gap: 20, opacity: win(t, 32.7, 34.3, 0.4) }}>
          <Img src={staticFile("art/mark.png")} style={{ height: 82, width: "auto" }} />
          <span style={{ fontFamily, fontWeight: 500, fontSize: 43, letterSpacing: "0.01em", lineHeight: 1, color: INK }}>LongStrider</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
