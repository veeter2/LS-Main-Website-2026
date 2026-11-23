"use client"

import { useEffect, useRef, useState } from "react"
import { PauseButton, usePlayback } from "./pause-button"

export type SiteFilmProps = {
  /** File stem under /video: "hero" plays hero-1080.mp4, hero-720.mp4, hero-poster.jpg. */
  name: string
  /** Alt text for the poster when motion is reduced. */
  posterAlt: string
  /** One line under the film. "No sound." is added when it plays. */
  caption: string
  /** What the film says, for people who cannot see it. */
  label: string
}

/**
 * A site film: muted, looping, inline on phones, poster first. The file is
 * only attached once the film is near the screen, and phones get the 720
 * file. Under prefers-reduced-motion only the poster shows (WCAG 2.3.3).
 * Rendered from code in /video; the captions are the site's own words.
 */
export function SiteFilm({ name, posterAlt, caption, label }: SiteFilmProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const { playing, reduced, toggle } = usePlayback()
  const [src, setSrc] = useState<string | null>(null)
  const poster = `/video/${name}-poster.jpg`

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const pick = () => (window.matchMedia("(max-width: 900px)").matches ? `/video/${name}-720.mp4` : `/video/${name}-1080.mp4`)
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
  }, [reduced, name])

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
        <img src={poster} alt={posterAlt} width={1920} height={1080} />
        <figcaption className="lx-illustrative">{caption}</figcaption>
      </figure>
    )
  }

  return (
    <figure className="mh-screen mh-film">
      <div className="mh-film-frame">
        <video
          ref={ref}
          src={src ?? undefined}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          width={1920}
          height={1080}
          aria-label={label}
        />
        <PauseButton playing={playing} reduced={reduced} onToggle={toggle} className="mh-film-pause" />
      </div>
      <figcaption className="lx-illustrative">{caption} No sound.</figcaption>
    </figure>
  )
}
