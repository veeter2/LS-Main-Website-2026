import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Tessellating hexagons emerging from chaos
export function PatternDetectionV1({ size = 24, ...props }: IconProps) {
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
      {/* Complete hexagons */}
      <path d="M12 3l4 2.3v4.6L12 12.2 8 9.9V5.3L12 3z" />
      <path d="M12 12l4 2.3v4.6L12 21.2l-4-2.3v-4.6L12 12z" />
      {/* Forming hexagon - partial */}
      <path d="M4 7.5l2-1.2" strokeOpacity="0.4" />
      <path d="M4 7.5v2.3" strokeOpacity="0.5" />
      <path d="M4 9.8l2 1.2" strokeOpacity="0.6" />
      {/* Another forming */}
      <path d="M20 7.5l-2-1.2" strokeOpacity="0.4" />
      <path d="M20 7.5v2.3" strokeOpacity="0.5" />
      <path d="M20 9.8l-2 1.2" strokeOpacity="0.6" />
    </svg>
  )
}

// V2: Wave interference creating pattern
export function PatternDetectionV2({ size = 24, ...props }: IconProps) {
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
      {/* Intersecting wave sources */}
      <circle cx="6" cy="12" r="2" strokeOpacity="0.3" />
      <circle cx="6" cy="12" r="5" strokeOpacity="0.2" />
      <circle cx="6" cy="12" r="8" strokeOpacity="0.1" />
      <circle cx="18" cy="12" r="2" strokeOpacity="0.3" />
      <circle cx="18" cy="12" r="5" strokeOpacity="0.2" />
      <circle cx="18" cy="12" r="8" strokeOpacity="0.1" />
      {/* Pattern emergence - central nodes */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" fillOpacity="0.6" />
      <circle cx="12" cy="16" r="1" fill="currentColor" fillOpacity="0.6" />
    </svg>
  )
}

// V3: Grid with highlighted pattern
export function PatternDetectionV3({ size = 24, ...props }: IconProps) {
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
      {/* Background grid */}
      <circle cx="5" cy="5" r="1" strokeOpacity="0.2" />
      <circle cx="12" cy="5" r="1" strokeOpacity="0.2" />
      <circle cx="19" cy="5" r="1" strokeOpacity="0.2" />
      <circle cx="5" cy="12" r="1" strokeOpacity="0.2" />
      <circle cx="19" cy="12" r="1" strokeOpacity="0.2" />
      <circle cx="5" cy="19" r="1" strokeOpacity="0.2" />
      <circle cx="12" cy="19" r="1" strokeOpacity="0.2" />
      <circle cx="19" cy="19" r="1" strokeOpacity="0.2" />
      {/* Detected pattern - diagonal */}
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="19" r="1.5" fill="currentColor" />
      <path d="M5 5l14 14" strokeOpacity="0.5" />
    </svg>
  )
}
