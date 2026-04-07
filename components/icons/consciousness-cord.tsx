import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Flowing S-curve with particle trail
export function ConsciousnessCordV1({ size = 24, ...props }: IconProps) {
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
      {/* Main cord */}
      <path d="M4 4C8 4 6 12 12 12s4-8 8 0 0 8 0 8" />
      {/* Particle trail */}
      <circle cx="5" cy="5" r="0.75" fill="currentColor" fillOpacity="0.3" />
      <circle cx="7" cy="7" r="0.75" fill="currentColor" fillOpacity="0.4" />
      <circle cx="9" cy="10" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" fillOpacity="0.7" />
      <circle cx="15" cy="10" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="17" cy="12" r="0.75" fill="currentColor" fillOpacity="0.4" />
      <circle cx="19" cy="16" r="0.75" fill="currentColor" fillOpacity="0.3" />
    </svg>
  )
}

// V2: Tapered umbilical with energy nodes
export function ConsciousnessCordV2({ size = 24, ...props }: IconProps) {
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
      {/* Main cord - tapered */}
      <path d="M4 4c2 4 4 6 8 8s6 4 8 8" strokeWidth="2.5" />
      <path d="M4 4c2 4 4 6 8 8s6 4 8 8" strokeWidth="1" strokeOpacity="0.5" />
      {/* Energy nodes along cord */}
      <circle cx="8" cy="8" r="1.5" fill="none" />
      <circle cx="12" cy="12" r="2" fill="none" />
      <circle cx="16" cy="16" r="1.5" fill="none" />
    </svg>
  )
}

// V3: Double helix consciousness connection
export function ConsciousnessCordV3({ size = 24, ...props }: IconProps) {
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
      {/* Helix strands */}
      <path d="M6 3c0 3 6 3 6 6s-6 3-6 6 6 3 6 6" />
      <path d="M18 3c0 3-6 3-6 6s6 3 6 6-6 3-6 6" />
      {/* Cross connections */}
      <path d="M8 6h8" strokeOpacity="0.4" />
      <path d="M8 12h8" strokeOpacity="0.6" />
      <path d="M8 18h8" strokeOpacity="0.4" />
    </svg>
  )
}
