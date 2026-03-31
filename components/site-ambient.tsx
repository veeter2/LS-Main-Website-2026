"use client"

import { useEffect, useRef } from "react"

export function SiteAmbient() {
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animId: number
    let mx = window.innerWidth * 0.5
    let my = window.innerHeight * 0.5
    let cx = mx, cy = my

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener("mousemove", onMove, { passive: true })

    const tick = () => {
      // Lazy follow — orbs drift toward cursor at different speeds
      cx += (mx - cx) * 0.04
      cy += (my - cy) * 0.04

      const w = window.innerWidth
      const h = window.innerHeight

      // Orb 1 (purple) — follows closest
      if (orb1Ref.current) {
        const ox = -250 + (cx / w) * 120
        const oy = -250 + (cy / h) * 80
        orb1Ref.current.style.transform = `translate(${ox}px, ${oy}px)`
      }
      // Orb 2 (gold) — follows slower, inverse
      if (orb2Ref.current) {
        const ox = (w - cx) / w * -60
        const oy = -40 + (cy / h) * 60
        orb2Ref.current.style.transform = `translate(${ox}px, ${oy}px)`
      }
      // Orb 3 (blue) — barely moves
      if (orb3Ref.current) {
        const ox = (cx / w) * 30
        const oy = (cy / h) * -20
        orb3Ref.current.style.transform = `translate(${ox}px, ${oy}px)`
      }

      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

      {/* Aurora orb 1 — purple */}
      <div ref={orb1Ref} style={{
        position: "absolute", top: "-250px", left: "-250px",
        width: "900px", height: "900px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,1), transparent 70%)",
        opacity: 0.026, filter: "blur(130px)",
        willChange: "transform", transition: "transform 1.8s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Aurora orb 2 — gold */}
      <div ref={orb2Ref} style={{
        position: "absolute", top: "45%", right: "-200px",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,1), transparent 70%)",
        opacity: 0.020, filter: "blur(120px)",
        willChange: "transform", transition: "transform 2.6s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Aurora orb 3 — blue */}
      <div ref={orb3Ref} style={{
        position: "absolute", bottom: "5%", left: "25%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(164,195,255,1), transparent 70%)",
        opacity: 0.018, filter: "blur(120px)",
        willChange: "transform", transition: "transform 3.2s cubic-bezier(0.16,1,0.3,1)",
      }} />

      {/* Grain overlay — matte glass texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
        opacity: 0.028,
        mixBlendMode: "screen",
      }} />

      {/* Edge vignette — draws eye to center */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
      }} />

    </div>
  )
}
