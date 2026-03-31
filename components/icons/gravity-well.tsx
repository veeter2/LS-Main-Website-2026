import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Concentric rings with increasing density toward center
export function GravityWellV1({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="12" r="4.5" strokeOpacity="0.8" />
      <circle cx="12" cy="12" r="7" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="9.5" strokeOpacity="0.3" />
      {/* Gravitational pull lines */}
      <path d="M12 2.5v2" strokeOpacity="0.4" />
      <path d="M12 19.5v2" strokeOpacity="0.4" />
      <path d="M2.5 12h2" strokeOpacity="0.4" />
      <path d="M19.5 12h2" strokeOpacity="0.4" />
    </svg>
  )
}

// V2: Warped spacetime grid converging to singularity
export function GravityWellV2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Central mass */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Warped grid lines - horizontal */}
      <path d="M3 8c3 0 5.5 1.5 9 4s6 4 9 4" strokeOpacity="0.4" />
      <path d="M3 12c3 0 6 0 9 0s6 0 9 0" strokeOpacity="0.6" />
      <path d="M3 16c3 0 5.5-1.5 9-4s6-4 9-4" strokeOpacity="0.4" />
      {/* Warped grid lines - vertical */}
      <path d="M8 3c0 3 1.5 5.5 4 9s4 6 4 9" strokeOpacity="0.4" />
      <path d="M12 3v18" strokeOpacity="0.6" />
      <path d="M16 3c0 3-1.5 5.5-4 9s-4 6-4 9" strokeOpacity="0.4" />
    </svg>
  )
}

// V3: Funnel depression with orbiting particles
export function GravityWellV3({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Funnel rings - perspective */}
      <ellipse cx="12" cy="6" rx="9" ry="3" strokeOpacity="0.3" />
      <ellipse cx="12" cy="9" rx="7" ry="2.5" strokeOpacity="0.5" />
      <ellipse cx="12" cy="12" rx="5" ry="2" strokeOpacity="0.7" />
      <ellipse cx="12" cy="15" rx="3" ry="1.5" strokeOpacity="0.85" />
      <ellipse cx="12" cy="18" rx="1" ry="0.5" />
      {/* Orbiting particles */}
      <circle cx="19" cy="5" r="1" fill="currentColor" fillOpacity="0.5" />
      <circle cx="5" cy="7" r="0.75" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}
