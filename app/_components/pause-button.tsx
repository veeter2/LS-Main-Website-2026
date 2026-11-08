"use client"

import { useEffect, useState } from "react"

/**
 * Pause and play for the demos that move on their own (WCAG 2.2.2). One
 * small text button in the card's corner. Under prefers-reduced-motion the
 * demos are already static, so the hook reports `reduced` and the button
 * stays off the page.
 */
export function usePlayback() {
  const [playing, setPlaying] = useState(true)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])
  return { playing, reduced, toggle: () => setPlaying((p) => !p) }
}

export function PauseButton({
  playing,
  reduced,
  onToggle,
  className,
}: {
  playing: boolean
  reduced: boolean
  onToggle: () => void
  className?: string
}) {
  if (reduced) return null
  return (
    <button
      type="button"
      className={`dm-pause${className ? ` ${className}` : ""}`}
      aria-pressed={!playing}
      aria-label={playing ? "Pause the animation" : "Play the animation"}
      onClick={onToggle}
    >
      {playing ? "Pause" : "Play"}
    </button>
  )
}
