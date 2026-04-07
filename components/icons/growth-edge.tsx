import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Ascending steps with frontier glow
export function GrowthEdgeV1({ size = 24, ...props }: IconProps) {
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
      {/* Ascending steps */}
      <path d="M4 20h4v-4h4v-4h4v-4h4" />
      <path d="M4 20v-4h4v-4h4v-4h4v-4" />
      {/* Growth edge - frontier */}
      <circle cx="20" cy="8" r="2" strokeDasharray="2 1" />
      <path d="M20 4v2" strokeOpacity="0.5" />
      <path d="M22 6h-2" strokeOpacity="0.5" />
      <path d="M20 10v-2" strokeOpacity="0.5" />
    </svg>
  )
}

// V2: Sprouting from solid foundation
export function GrowthEdgeV2({ size = 24, ...props }: IconProps) {
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
      {/* Foundation */}
      <path d="M4 20h16" strokeWidth="2" />
      {/* Established trunk */}
      <path d="M12 20v-8" strokeWidth="2" />
      {/* Growing edge - new growth */}
      <path d="M12 12v-4" strokeOpacity="0.7" />
      <path d="M12 8v-3" strokeOpacity="0.4" strokeDasharray="2 1" />
      {/* Leaves/branches */}
      <path d="M12 14c-2-1-3-3-3-5" />
      <path d="M12 14c2-1 3-3 3-5" />
      <path d="M12 10c-1.5-0.5-2-2-2-3" strokeOpacity="0.6" />
      <path d="M12 10c1.5-0.5 2-2 2-3" strokeOpacity="0.6" />
    </svg>
  )
}

// V3: Expanding frontier boundary
export function GrowthEdgeV3({ size = 24, ...props }: IconProps) {
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
      {/* Core - established */}
      <circle cx="12" cy="14" r="4" />
      {/* Expanding edge */}
      <path d="M12 10V6" />
      <path d="M9 8l3-4 3 4" strokeOpacity="0.6" />
      {/* Growth rays */}
      <path d="M8 11l-3-2" strokeOpacity="0.4" />
      <path d="M16 11l3-2" strokeOpacity="0.4" />
      <path d="M12 4v-1" strokeOpacity="0.3" strokeDasharray="1 1" />
      <path d="M8 6l-1-1" strokeOpacity="0.3" strokeDasharray="1 1" />
      <path d="M16 6l1-1" strokeOpacity="0.3" strokeDasharray="1 1" />
    </svg>
  )
}
