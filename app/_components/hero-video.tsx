"use client"

import { useEffect, useRef, useState } from "react"
import { PauseButton, usePlayback } from "./pause-button"

/**
 * The home film as the hero: muted, looping, inline on phones,
 * poster first. The file is only attached once the hero is near the screen,
 * and phones get the 720 file. Under prefers-reduced-motion only the poster
 * shows (WCAG 2.3.3). Rendered from code in /video; the captions are the
 * site's own words.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const { playing, reduced, toggle } = usePlayback()
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const pick = () => (window.matchMedia("(max-width: 900px)").matches ? "/video/hero-720.mp4" : "/video/hero-1080.mp4")
    if (!("IntersectionObserver" in window)) {
      setSrc(pick())
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSrc(pick())
          io.disconnect()
        }
      },
      { rootMargin: "200px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  useEffect(() => {
    const el = ref.current
    if (!el || !src) return
    if (playing) void el.play().catch(() => {})
    else el.pause()
  }, [playing, src])

  if (reduced) {
    return (
      <figure className="mh-screen mh-film">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/video/hero-poster.jpg" alt="A landscape of sand and gold at night: the company's memory, kept with you." width={1920} height={1080} />
        <figcaption className="lx-illustrative">Where the memory lives, in half a minute.</figcaption>
      </figure>
    )
  }

  return (
    <figure className="mh-screen mh-film">
      <div className="mh-film-frame">
        <video
          ref={ref}
          src={src ?? undefined}
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          width={1920}
          height={1080}
          aria-label="Where the memory lives: kept with the model it blows away by morning; kept with you it grows, and the model can change without losing any of it."
        />
        <PauseButton playing={playing} reduced={reduced} onToggle={toggle} className="mh-film-pause" />
      </div>
      <figcaption className="lx-illustrative">Where the memory lives, in half a minute. No sound.</figcaption>
    </figure>
  )
}
