import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Object with orbital pull lines
export function GravitateV1({ size = 24, ...props }: IconProps) {
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
      {/* Central attractor */}
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="12" r="3" />
      {/* Orbital path */}
      <ellipse cx="12" cy="12" rx="8" ry="4" strokeOpacity="0.3" />
      {/* Approaching satellite */}
      <circle cx="5" cy="10" r="1.5" fill="currentColor" />
      {/* Pull lines */}
      <path d="M6.5 10.5l2.5 1" strokeOpacity="0.5" />
      <path d="M5.5 11.5l3 0.5" strokeOpacity="0.4" />
      <path d="M5 12l4 0" strokeOpacity="0.3" />
    </svg>
  )
}

// V2: Gravitational slingshot
export function GravitateV2({ size = 24, ...props }: IconProps) {
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
      {/* Central body */}
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="12" r="4" />
      {/* Curved approach path */}
      <path d="M3 3c4 1 6 5 7 9" />
      {/* Satellite */}
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
      {/* Gravitational distortion */}
      <path d="M8 9c1-1 2-1 3-1" strokeOpacity="0.4" />
      <path d="M9 11c0.5-0.5 1-0.5 1.5 0" strokeOpacity="0.3" />
    </svg>
  )
}

// V3: Multiple objects gravitating to center
export function GravitateV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      {/* Gravitating objects with trails */}
      <circle cx="4" cy="6" r="1" fill="currentColor" fillOpacity="0.7" />
      <path d="M5 6.5l3 2.5" strokeOpacity="0.4" />
      <circle cx="20" cy="8" r="1" fill="currentColor" fillOpacity="0.7" />
      <path d="M19 8.5l-3 2" strokeOpacity="0.4" />
      <circle cx="6" cy="18" r="1" fill="currentColor" fillOpacity="0.7" />
      <path d="M7 17.5l2.5-2.5" strokeOpacity="0.4" />
      <circle cx="18" cy="17" r="1" fill="currentColor" fillOpacity="0.7" />
      <path d="M17 16.5l-2.5-2" strokeOpacity="0.4" />
    </svg>
  )
}
