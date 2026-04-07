import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural network inside discovery lens
export function GlobalSearchV1({ size = 24, ...props }: IconProps) {
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
      {/* Search field */}
      <circle cx="10" cy="10" r="7" />
      {/* Discovery beam */}
      <path d="M15.5 15.5L21 21" />
      {/* Neural network inside - discovery happening */}
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <path d="M10 8.5V6" />
      <path d="M10 14v-2.5" />
      <path d="M8.5 10H6" />
      <path d="M14 10h-2.5" />
      {/* Pattern nodes discovered */}
      <circle cx="10" cy="6" r="0.75" fill="currentColor" />
      <circle cx="6" cy="10" r="0.75" fill="currentColor" />
      <circle cx="14" cy="10" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V2: Radar pulse - cognitive sonar
export function GlobalSearchV2({ size = 24, ...props }: IconProps) {
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
      {/* Radar origin */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {/* Expanding search waves */}
      <circle cx="12" cy="12" r="5" strokeOpacity="0.7" />
      <circle cx="12" cy="12" r="8" strokeOpacity="0.4" />
      {/* Radar sweep line */}
      <path d="M12 12l6-6" />
      {/* Discovered patterns lighting up */}
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="15" r="0.75" fill="currentColor" />
      <circle cx="17" cy="14" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Spotlight with particle discovery
export function GlobalSearchV3({ size = 24, ...props }: IconProps) {
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
      {/* Light source */}
      <circle cx="6" cy="6" r="2.5" />
      {/* Spotlight beam expanding */}
      <path d="M8 8l10 10" />
      <path d="M7.5 9.5l8 12" />
      <path d="M9.5 7.5l12 8" />
      {/* Particles being discovered in beam */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="15" r="1.25" fill="currentColor" />
      <circle cx="14" cy="18" r="0.75" fill="currentColor" />
      <circle cx="18" cy="14" r="0.75" fill="currentColor" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
    </svg>
  )
}

// V4: Memory layer refraction search
export function GlobalSearchV4({ size = 24, ...props }: IconProps) {
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
      {/* Search origin point */}
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      {/* Search beam refracting through layers */}
      <path d="M5.5 12h3" />
      <path d="M8.5 12l3-4" />
      <path d="M11.5 8l3 4" />
      <path d="M14.5 12l4 0" />
      {/* Memory layers being searched */}
      <path d="M9 4v16" strokeOpacity="0.3" strokeDasharray="2 2" />
      <path d="M15 4v16" strokeOpacity="0.3" strokeDasharray="2 2" />
      {/* Found memories */}
      <circle cx="9" cy="8" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
      <circle cx="9" cy="16" r="0.75" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V5: Node sequence illumination - discovery path
export function GlobalSearchV5({ size = 24, ...props }: IconProps) {
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
      {/* Search path through memory network */}
      <path d="M4 12h3" />
      <path d="M7 12l3-4" />
      <path d="M10 8h4" />
      <path d="M14 8l3 4" />
      <path d="M17 12h3" />
      {/* Nodes lighting up in discovery sequence */}
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="7" cy="12" r="1" fill="currentColor" strokeOpacity="0.8" />
      <circle cx="10" cy="8" r="1" fill="currentColor" strokeOpacity="0.6" />
      <circle cx="14" cy="8" r="1.25" fill="currentColor" strokeOpacity="0.4" />
      <circle cx="17" cy="12" r="1.5" fill="currentColor" />
      <circle cx="20" cy="12" r="1.75" fill="currentColor" />
      {/* Background network hints */}
      <path d="M7 12v5" strokeOpacity="0.2" />
      <path d="M14 8v-4" strokeOpacity="0.2" />
    </svg>
  )
}
