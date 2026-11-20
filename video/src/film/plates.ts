import { rng } from "../util"
import { H, LY, SX, W, blank, makeNoise } from "./core"

/**
 * Everything the film needs from the painting, made once:
 * the land by day, the same land before any gold reached it, the gold on its own,
 * how far along the gold each gold pixel is from where the sand lands (so gold can run like poured metal),
 * how near each part of the painting is (so a camera can move through it), and where the lamps are.
 */
const SC = W / 1672 // the painting is 1672 wide; the film is 1920

export type Lamp = { x: number; y: number; r: number; base: number; gold: number; rank: number; dist: number }
export type Plates = {
  day: HTMLCanvasElement
  grey: HTMLCanvasElement
  dayData: Uint8ClampedArray
  greyData: Uint8ClampedArray
  goldIdx: Int32Array
  goldDist: Float32Array
  goldRGBA: Uint8ClampedArray
  goldSun: Uint8Array
  maxDist: number
  depth: Float32Array
  ground: HTMLCanvasElement
  cloud: HTMLCanvasElement
  lamps: Lamp[]
  stars: [number, number, number][]
  noise: HTMLCanvasElement
  // working surfaces, reused every frame
  scene: HTMLCanvasElement
  sceneCtx: CanvasRenderingContext2D
  out: HTMLCanvasElement
  outCtx: CanvasRenderingContext2D
  outData: ImageData
  gild: HTMLCanvasElement
  gildCtx: CanvasRenderingContext2D
  gildData: ImageData
  edge: HTMLCanvasElement
  edgeCtx: CanvasRenderingContext2D
  edgeData: ImageData
  glow: HTMLCanvasElement
  glowCtx: CanvasRenderingContext2D
  glowData: ImageData
  tmp: HTMLCanvasElement
  small: HTMLCanvasElement
}

/** The top of the ground across the painting, in painting pixels. Above it is sky and the far gateway. */
const HORIZON: [number, number][] = [[0, 598], [50, 632], [100, 678], [170, 703], [250, 722], [700, 716], [800, 690], [900, 662], [1000, 642], [1100, 628], [1200, 640], [1300, 655], [1672, 650]]
const horizonAt = (xw: number) => {
  const x = xw / SC
  for (let i = 0; i < HORIZON.length - 1; i++) {
    const [x0, y0] = HORIZON[i], [x1, y1] = HORIZON[i + 1]
    if (x <= x1) return (y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)) * SC
  }
  return HORIZON[HORIZON.length - 1][1] * SC
}

/** Lamp heads in painting pixels: x, y, radius, where the post meets the ground, how gold the head is. */
const LAMP_SRC: [number, number, number, number, number][] = [
  [142, 636, 16, 820, 1], [60, 531, 7, 640, 0.5], [48, 575, 4, 640, 0.8], [358, 710, 5, 745, 0.5],
  [1108, 655, 13, 803, 1], [1207, 476, 10, 665, 0.8], [1310, 568, 6, 660, 0.5], [1448, 574, 9, 720, 0.6],
  [1537, 511, 8, 645, 0.9], [1603, 244, 12, 632, 1],
]

const work = (w: number, h: number, read = false) => {
  const cv = blank(w, h)
  return [cv, cv.getContext("2d", read ? { willReadFrequently: true } : undefined)!] as const
}

export function buildPlates(landImg: HTMLImageElement): Plates {
  const day = blank(W, H)
  const dctx = day.getContext("2d")!
  dctx.imageSmoothingQuality = "high"
  dctx.drawImage(landImg, 0, 0, W, H)
  const src = dctx.getImageData(0, 0, W, H)
  const N = W * H
  const dayData = src.data
  const greyData = new Uint8ClampedArray(dayData.length)
  const alpha = new Uint8Array(N)
  let count = 0
  for (let p = 0, i = 0; p < N; p++, i += 4) {
    const r = dayData[i], g = dayData[i + 1], b = dayData[i + 2]
    const a = Math.max(0, Math.min(1, (r - b - 44) / 30)) * (r > 110 ? 1 : 0)
    const l = 0.3 * r + 0.59 * g + 0.11 * b
    greyData[i] = r + (l + 6 - r) * a
    greyData[i + 1] = g + (l + 3 - g) * a
    greyData[i + 2] = b + (l - 4 - b) * a
    greyData[i + 3] = 255
    alpha[p] = a * 255
    if (a > 0.02) count++
  }
  const grey = blank(W, H)
  grey.getContext("2d")!.putImageData(new ImageData(greyData.slice(), W, H), 0, 0)

  /* ---- how far along the gold each pixel is from where the sand lands ---- */
  // Gold is cheap to cross, bare ground is dear, so the front runs along the road lines first
  // and only then jumps the gaps to the lamps and the gateway.
  const cost = new Uint8Array(N)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let on = alpha[y * W + x] > 60
      if (!on && x > 0 && x < W - 1 && y > 0 && y < H - 1) on = alpha[y * W + x - 1] > 60 || alpha[y * W + x + 1] > 60 || alpha[(y - 1) * W + x] > 60 || alpha[(y + 1) * W + x] > 60
      cost[y * W + x] = on ? 1 : 5
    }
  }
  let seed = Math.round(LY) * W + Math.round(SX)
  search: for (let rad = 0; rad < 160; rad++) {
    for (let dy = -rad; dy <= rad; dy++) {
      for (let dx = -rad; dx <= rad; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== rad) continue
        const p = (Math.round(LY) + dy) * W + Math.round(SX) + dx
        if (p >= 0 && p < N && cost[p] === 1) { seed = p; break search }
      }
    }
  }
  const di = new Int32Array(N).fill(2147483647)
  const B = 128
  const buckets: number[][] = Array.from({ length: B }, () => [])
  di[seed] = 0
  buckets[0].push(seed)
  let pending = 1
  const NB = [[1, 0, 10], [-1, 0, 10], [0, 1, 10], [0, -1, 10], [1, 1, 14], [1, -1, 14], [-1, 1, 14], [-1, -1, 14]]
  for (let cur = 0; pending > 0; cur++) {
    const b = buckets[cur % B]
    while (b.length) {
      const p = b.pop()!
      pending--
      if (di[p] !== cur) continue
      const x = p % W, y = (p - x) / W
      for (const [dx, dy, c] of NB) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const q = ny * W + nx
        const nd = cur + c * cost[q]
        if (nd < di[q]) { di[q] = nd; buckets[nd % B].push(q); pending++ }
      }
    }
  }
  const goldIdx = new Int32Array(count)
  const goldDist = new Float32Array(count)
  const goldRGBA = new Uint8ClampedArray(count * 4)
  const goldSun = new Uint8Array(count) // the painted sun inside the gateway: it sets, so it must not glow all night
  let maxDist = 0
  for (let p = 0, j = 0; p < N; p++) {
    if (alpha[p] / 255 <= 0.02) continue
    const i = p * 4
    goldIdx[j] = p
    goldDist[j] = di[p] / 10
    if (goldDist[j] > maxDist) maxDist = goldDist[j]
    goldRGBA[j * 4] = Math.min(255, dayData[i] * 1.12 + 14)
    goldRGBA[j * 4 + 1] = Math.min(255, dayData[i + 1] * 1.1 + 10)
    goldRGBA[j * 4 + 2] = Math.min(255, dayData[i + 2] * 1.02)
    goldRGBA[j * 4 + 3] = alpha[p]
    const px = (p % W) / SC, py = Math.floor(p / W) / SC
    goldSun[j] = px > 1298 && px < 1472 && py > 472 && py < 618 ? 1 : 0
    j++
  }

  /* ---- how near each part of the painting is: 0 the sky and the far gateway, 1 the sand at our feet ---- */
  let depth = new Float32Array(N)
  for (let x = 0; x < W; x++) {
    const hy = horizonAt(x)
    for (let y = Math.ceil(hy); y < H; y++) depth[y * W + x] = Math.pow((y - hy) / (H - hy), 0.85)
  }
  const ground = blank(W / 2, H / 2)
  const gx = ground.getContext("2d")!
  const gd = gx.createImageData(W / 2, H / 2)
  for (let y = 0; y < H / 2; y++) for (let x = 0; x < W / 2; x++) gd.data[(y * (W / 2) + x) * 4 + 3] = Math.min(255, depth[y * 2 * W + x * 2] * 40 * 255)
  gx.putImageData(gd, 0, 0)

  // a lamp post is as near as its foot, all the way up, so it stands straight when the camera moves
  for (const [lx, ly, lr, lb] of LAMP_SRC) {
    const X = lx * SC, top = (ly - lr - 8) * SC, bot = Math.min(H - 1, lb * SC)
    const dB = depth[Math.round(bot) * W + Math.round(X)]
    if (dB <= 0) continue
    const half = (lr + 8) * SC, feather = 36
    for (let y = Math.max(0, Math.round(top - 30)); y <= bot; y++) {
      const wy = Math.min(1, (y - (top - 30)) / 30)
      for (let x = Math.max(0, Math.round(X - half - feather)); x <= Math.min(W - 1, X + half + feather); x++) {
        const u = Math.max(0, Math.min(1, (Math.abs(x - X) - half) / feather))
        const w = (1 - u * u * (3 - 2 * u)) * wy
        depth[y * W + x] += (dB - depth[y * W + x]) * w
      }
    }
  }
  // soften it, so nothing tears where near meets far
  const boxBlur = (a: Float32Array, rad: number) => {
    const o = new Float32Array(N)
    for (let y = 0; y < H; y++) {
      let s = 0
      for (let x = -rad; x <= rad; x++) s += a[y * W + Math.min(W - 1, Math.max(0, x))]
      for (let x = 0; x < W; x++) {
        o[y * W + x] = s / (2 * rad + 1)
        s += a[y * W + Math.min(W - 1, x + rad + 1)] - a[y * W + Math.max(0, x - rad)]
      }
    }
    const o2 = new Float32Array(N)
    for (let x = 0; x < W; x++) {
      let s = 0
      for (let y = -rad; y <= rad; y++) s += o[Math.min(H - 1, Math.max(0, y)) * W + x]
      for (let y = 0; y < H; y++) {
        o2[y * W + x] = s / (2 * rad + 1)
        s += o[Math.min(H - 1, y + rad + 1) * W + x] - o[Math.max(0, y - rad) * W + x]
      }
    }
    return o2
  }
  depth = boxBlur(boxBlur(depth, 9), 9)

  /* ---- soft shadows that drift across the dunes by day: the same strip twice, so it can scroll for ever ---- */
  const cloud = blank(W * 2, H)
  const cx = cloud.getContext("2d")!
  cx.filter = "blur(46px)"
  const cr = rng(71)
  for (let i = 0; i < 9; i++) {
    const x = cr() * W, y = 700 + cr() * 420, rx = 240 + cr() * 300, ry = 46 + cr() * 80, a = 0.1 + cr() * 0.12
    cx.fillStyle = `rgba(58,48,34,${a})`
    for (const off of [-W, 0, W, 2 * W]) {
      cx.beginPath()
      cx.ellipse(x + off, y, rx, ry, -0.08, 0, 6.2832)
      cx.fill()
    }
  }

  /* ---- lamps, in the order the light reaches them from the heap ---- */
  const lamps: Lamp[] = LAMP_SRC.map(([x, y, r, base, gold]) => ({ x: x * SC, y: y * SC, r: r * SC, base: base * SC, gold, rank: 0, dist: di[Math.round(y * SC) * W + Math.round(x * SC)] / 10 }))
  const byDist = lamps.map((l, i) => [di[Math.round(l.y) * W + Math.round(l.x)], i]).sort((a, b) => a[0] - b[0])
  byDist.forEach(([, i], rank) => (lamps[i].rank = rank / (lamps.length - 1)))

  // stars only where the painting is open sky
  const r = rng(11)
  const stars: [number, number, number][] = []
  for (let i = 0; i < 2600 && stars.length < 520; i++) {
    const x = Math.floor(r() * W), y = Math.floor(r() * 800), s = r()
    let sky = true
    for (const [ox, oy] of [[0, 0], [5, 0], [-5, 0], [0, 5], [0, -5]]) {
      const j = (Math.min(H - 1, Math.max(0, y + oy)) * W + Math.min(W - 1, Math.max(0, x + ox))) * 4
      if (dayData[j] < 238 || dayData[j] - dayData[j + 2] > 30) sky = false
    }
    if (sky) stars.push([x, y, s])
  }

  const [scene, sceneCtx] = work(W, H, true)
  const [out, outCtx] = work(W, H)
  const [gild, gildCtx] = work(W, H)
  const [edge, edgeCtx] = work(W, H)
  const [glow, glowCtx] = work(W, H)
  const gildData = new ImageData(greyData.slice(), W, H)
  return {
    day, grey, dayData, greyData, goldIdx, goldDist, goldRGBA, goldSun, maxDist, depth, ground, cloud, lamps, stars, noise: makeNoise(),
    scene, sceneCtx, out, outCtx, outData: outCtx.createImageData(W, H), gild, gildCtx, gildData, edge, edgeCtx, edgeData: edgeCtx.createImageData(W, H), glow, glowCtx, glowData: glowCtx.createImageData(W, H),
    tmp: blank(W, H), small: blank(W / 4, H / 4),
  }
}

/* ---------- the camera ---------- */

/** z pushes in, px and py slide. Near things move more than far things: that is all depth is. */
export type Cam = { z: number; px: number; py: number }
export const CXC = 960
export const CYC = 900 // the camera pushes in on the ground, so the sky opens upward and the heap holds its place

/** Where a point of the painting at depth d lands on screen: scale, then offset. */
export function camT(cam: Cam, d: number): [number, number, number] {
  const s = 1 + cam.z * (0.4 + 0.6 * d)
  const par = 0.25 + 0.75 * d
  return [s, CXC * (1 - s) - cam.px * par, CYC * (1 - s) - cam.py * par]
}

export const depthAt = (P: Plates, x: number, y: number) => P.depth[Math.min(H - 1, Math.max(0, Math.round(y))) * W + Math.min(W - 1, Math.max(0, Math.round(x)))]

/**
 * Look at the composed painting through the camera. For every screen pixel, find the painting pixel that
 * lands there, given how near it is. `shim` is heat shimmer in pixels around the low sun.
 */
export function warp(P: Plates, cam: Cam, shim: number, t: number) {
  const src = P.sceneCtx.getImageData(0, 0, W, H).data
  const dst = P.outData.data
  const D = P.depth
  const { z, px, py } = cam
  const XM = W - 1.001, YM = H - 1.001
  let o = 0
  for (let Y = 0; Y < H; Y++) {
    const dyc = Y - CYC
    for (let X = 0; X < W; X++) {
      let d = D[Y * W + X]
      let x = 0, y = 0
      for (let it = 0; it < 3; it++) {
        const s = 1 + z * (0.4 + 0.6 * d), par = 0.25 + 0.75 * d
        x = CXC + (X - CXC + px * par) / s
        y = CYC + (dyc + py * par) / s
        if (x < 0) x = 0; else if (x > XM) x = XM
        if (y < 0) y = 0; else if (y > YM) y = YM
        if (it < 2) d = D[(y | 0) * W + (x | 0)]
      }
      if (shim > 0) {
        const ddx = X - 1600, ddy = Y - 660
        const w = 1 - (ddx * ddx + ddy * ddy * 2.4) / 200000
        if (w > 0) {
          y += shim * w * Math.sin(Y * 0.23 + t * 5.1 + X * 0.011)
          if (y < 0) y = 0; else if (y > YM) y = YM
        }
      }
      const x0 = x | 0, y0 = y | 0
      const fx = x - x0, fy = y - y0
      const i = (y0 * W + x0) * 4
      const j = i + W * 4
      const w00 = (1 - fx) * (1 - fy), w10 = fx * (1 - fy), w01 = (1 - fx) * fy, w11 = fx * fy
      dst[o] = src[i] * w00 + src[i + 4] * w10 + src[j] * w01 + src[j + 4] * w11
      dst[o + 1] = src[i + 1] * w00 + src[i + 5] * w10 + src[j + 1] * w01 + src[j + 5] * w11
      dst[o + 2] = src[i + 2] * w00 + src[i + 6] * w10 + src[j + 2] * w01 + src[j + 6] * w11
      dst[o + 3] = 255
      o += 4
    }
  }
  P.outCtx.putImageData(P.outData, 0, 0)
}
