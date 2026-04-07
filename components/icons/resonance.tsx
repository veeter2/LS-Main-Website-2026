import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Harmonic waves amplifying outward
export function ResonanceV1({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M12 12c0 0 2-1.5 2-3s-2-3-2-3" />
      <path d="M12 12c0 0-2 1.5-2 3s2 3 2 3" />
      <path d="M12 12c0 0 4-2.5 4-5s-4-5-4-5" opacity="0.7" />
      <path d="M12 12c0 0-4 2.5-4 5s4 5 4 5" opacity="0.7" />
      <path d="M12 12c0 0 6-3.5 6-7s-6-7-6-7" opacity="0.4" />
      <path d="M12 12c0 0-6 3.5-6 7s6 7 6 7" opacity="0.4" />
    </svg>
  )
}

// V2: Concentric ripples with reinforcement points
export function ResonanceV2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="4" opacity="0.8" />
      <circle cx="12" cy="12" r="7" opacity="0.5" />
      <circle cx="12" cy="12" r="10" opacity="0.3" />
      <circle cx="12" cy="5" r="0.75" fill="currentColor" />
      <circle cx="12" cy="19" r="0.75" fill="currentColor" />
      <circle cx="5" cy="12" r="0.75" fill="currentColor" />
      <circle cx="19" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Standing wave pattern
export function ResonanceV3({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4 2-4 4-4" />
      <path d="M2 12c2 0 2 4 4 4s2-4 4-4 2 4 4 4 2-4 4-4 2 4 4 4" />
      <circle cx="6" cy="12" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
