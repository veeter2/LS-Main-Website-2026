import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AbsoluteFill, Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { C } from "./beats"
import { ramp, rng, win } from "./util"
import { type Ctx, FILM_FPS, FILM_SECONDS, H, W, glowAt, hex, mix, nightAt, rgba, sm, spline } from "./film/core"
import { BX, BY, sceneOne } from "./film/first"
import { sceneLand } from "./film/land"
import { type Plates, buildPlates } from "./film/plates"

export { FILM_FPS, FILM_SECONDS }

// The site's face, set the site's way: Lora, regular weight, tight tracking, the turn of the line in gold italic.
const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] })
loadFont("italic", { weights: ["400"], subsets: ["latin"] })
const DISPLAY = { fontFamily, fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.08 } as const

/**
 * The home page film: where does the memory live?
 * One world at 1920 x 1080, painted to a canvas each frame, with the words set on top.
 * It loops: the last dawn falls back into the first dark.
 */
export const CAPTIONS: { at: number; to: number; text: string }[] = [
  { at: 3, to: 8, text: "Most AI keeps it with the model." },
  { at: 8, to: 12, text: "Change the model, and you start over." },
  { at: 12, to: 19, text: "LongStrider keeps it with you." },
  // one line, said in two breaths, so each stays short enough to read on a phone
  { at: 19, to: 22.2, text: "It compounds." },
  { at: 22.2, to: 26, text: "The model gets only what the question needs." },
  { at: 26, to: 31, text: "Change the model. Keep everything." },
]

function paint(ctx: Ctx, t: number, P: Plates, grain: number) {
  const n = nightAt(t)

  // sky
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, rgba(mix(hex(C.surface), [22, 19, 38], n), 1))
  sky.addColorStop(0.62, rgba(mix(hex(C.paper), hex(C.dusk2), n), 1))
  sky.addColorStop(1, rgba(mix(hex(C.paper), hex(C.dusk1), n), 1))
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  // the land comes in at the turn, and falls away at the very end so the film can begin again
  const landIn = ramp(t, 11.2, 13.2) * (1 - ramp(t, 34.2, FILM_SECONDS))
  const first = 1 - landIn
  const early = t < 13.3

  if (first > 0) {
    // warm light low in the sky on the first morning
    const glow = early ? glowAt(t) : 0
    if (glow > 0) {
      const g = ctx.createRadialGradient(1700, 800, 0, 1700, 800, 1300)
      g.addColorStop(0, `rgba(232,196,128,${0.62 * glow})`)
      g.addColorStop(0.35, `rgba(214,160,110,${0.3 * glow})`)
      g.addColorStop(1, "rgba(200,169,110,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }
    // the opening is empty, but it is not flat: three seconds of air before anything arrives.
    // Its clock runs through the loop point, so the last frame of the film is the first frame's neighbour.
    const air = t < 4.4 ? 1 - ramp(t, 3.1, 4.4) : ramp(t, 34.2, FILM_SECONDS)
    if (air > 0) {
      const tt = t < 20 ? t : t - FILM_SECONDS
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
    // stars: each one keeps its own slow beat, and the beat comes round exactly when the film does
    if (n > 0.3) {
      const r = rng(11)
      const drift = early ? spline(t, [[0, 0], [8, 14], [13.3, 20]]) : 0
      for (let i = 0; i < 260; i++) {
        const x = r() * W, y = r() * 620, s = r()
        const tw = 0.6 + 0.4 * Math.sin((t * 6.2832 * (4 + Math.floor(s * 14))) / FILM_SECONDS + i)
        ctx.fillStyle = `rgba(241,236,223,${((n - 0.3) / 0.7) * (0.12 + 0.5 * s * s) * tw * (1 - y / 760)})`
        ctx.beginPath()
        const push = 1 + (early ? 0.016 * t : 0) * (0.3 + s)
        ctx.arc(960 + (x - 960) * push, 380 + (y - drift * (0.4 + s) - 380) * push, 0.5 + s * 1.1, 0, 6.2832)
        ctx.fill()
      }
    }
    if (early) {
      // a slow push in on the ball while it is loaded, then a drift after the dust as the wind takes it
      const z = spline(t, [[0, 1], [3, 1.012], [8, 1.07], [11.6, 1.045], [13.3, 1.045]])
      const pan = spline(t, [[8.2, 0], [12, -34], [13.3, -38]])
      ctx.save()
      ctx.translate(BX + pan, BY)
      ctx.scale(z, z)
      ctx.translate(-BX, -BY)
      sceneOne(ctx, t, n, first)
      ctx.restore()
    }
  }
  if (landIn > 0) sceneLand(ctx, t, n, landIn, P)

  // bloom: whatever is bright after dark spills a little light
  const bloom = 0.2 * n + 0.1 * (early ? 0 : glowAt(t)) * landIn
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
  const fr = rng(Math.round(t * FILM_FPS) + 1)
  const ox = -Math.floor(fr() * W), oy = -Math.floor(fr() * H)
  ctx.globalAlpha = 0.9 * grain
  for (let pass = 0; grain > 0 && pass < (n > 0.5 ? 2 : 1); pass++) {
    for (const dx of [-W, 0, W]) for (const dy of [0, H]) ctx.drawImage(P.noise, ox + dx + pass * 311, oy + dy)
  }
  ctx.globalAlpha = 1
}

/* ---------- the film ---------- */

const Big = ({ o, top, color, children, size = 92 }: { o: number; top: number; color: string; children: string; size?: number }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", ...DISPLAY, fontSize: size, color, opacity: o }}>{children}</div>
)

/** `phone` sets the captions larger: the phone file is shown about 360 pixels wide. */
/** `grain` is how strong the moving film grain is: 1 for the full picture, less for a lighter file. */
export const Film = ({ phone = false, grain = 1 }: { phone?: boolean; grain?: number }) => {
  const t = useCurrentFrame() / FILM_FPS
  const { width: vw } = useVideoConfig()
  const fit = vw / W
  const ref = useRef<HTMLCanvasElement>(null)
  const [land, setLand] = useState<Plates | null>(null)
  const [handle] = useState(() => delayRender("paintings"))
  const released = useRef(false)

  useEffect(() => {
    const load = (src: string) =>
      new Promise<HTMLImageElement>((res, rej) => {
        const im = new Image()
        im.onload = () => res(im)
        im.onerror = rej
        im.src = src
      })
    load(staticFile("art/land.png")).then((a) => setLand(buildPlates(a)))
  }, [])

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx || !land) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, W, H)
    paint(ctx, t, land, grain)
    if (!released.current) {
      released.current = true
      continueRender(handle)
    }
  }, [t, land, handle, grain])

  // words go from ink to paper as the light goes, quickly, so they are never grey on grey
  const dk = Math.max(0, Math.min(1, (nightAt(t) - 0.38) / 0.24))
  const wordC = rgba(mix(hex(C.ink), hex(C.paper), dk), 1)
  const padC = mix([244, 239, 228], [22, 19, 38], dk).join(",")
  return (
    <AbsoluteFill style={{ background: C.dusk1, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
        <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />

        {/* the question */}
        {/* the question arrives a word at a time, and takes the light of the grain as it falls past */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", ...DISPLAY, fontSize: 92, color: C.paper, opacity: 1 - ramp(t, 2.6, 3.1), transform: `scale(${1 + 0.012 * t})` }}>
          {"Where does the memory live?".split(" ").map((w, i) => {
            const at = 0.25 + i * 0.16
            const lit = Math.exp(-Math.pow((t - 1.62) / 0.3, 2))
            return (
              <span key={i} style={{ display: "inline-block", marginRight: "0.26em", opacity: ramp(t, at, at + 0.5), transform: `translateY(${(1 - ramp(t, at, at + 0.6)) * 18}px)`, textShadow: `0 0 ${10 + 36 * lit}px rgba(232,205,150,${0.85 * lit})` }}>
                {w}
              </span>
            )
          })}
        </div>

        {/* the captions */}
        {CAPTIONS.map((c) => {
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

        {/* the close: the page headline, word for word and set as the page sets it */}
        <div style={{ position: "absolute", left: 140, top: 150, ...DISPLAY, fontSize: 84, color: "rgba(31,27,20,.94)" }}>
          <div style={{ opacity: win(t, 31.4, 34.5, 0.6), transform: `translateY(${(1 - ramp(t, 31.4, 32.3)) * 16}px)` }}>The model changes.</div>
          <div style={{ opacity: win(t, 32.1, 34.5, 0.6), transform: `translateY(${(1 - ramp(t, 32.1, 33)) * 16}px)` }}>
            The memory is <em style={{ fontStyle: "italic", color: C.goldInk }}>yours</em>.
          </div>
        </div>
        {/* the mark and the name, as they sit in the site's bar */}
        <div style={{ position: "absolute", left: 138, top: 372, display: "flex", alignItems: "center", gap: 20, opacity: win(t, 32.8, 34.5, 0.6) }}>
          <Img src={staticFile("art/mark.png")} style={{ height: 82, width: "auto" }} />
          <span style={{ fontFamily, fontWeight: 500, fontSize: 43, letterSpacing: "0.01em", lineHeight: 1, color: "rgba(31,27,20,.94)" }}>LongStrider</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
