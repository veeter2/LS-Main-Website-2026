import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Pulsing concentric rings
export function MemoryLoadingV1({ size = 24, ...props }: IconProps) {
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
      {/* Center core */}
      <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
      {/* Pulsing rings */}
      <circle cx="12" cy="12" r="4" strokeOpacity="0.7" />
      <circle cx="12" cy="12" r="6" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="8" strokeOpacity="0.3" />
      {/* Loading arc */}
      <path d="M12 4a8 8 0 015.66 2.34" strokeWidth="2" />
    </svg>
  )
}

// V2: Gravity well forming
export function MemoryLoadingV2({ size = 24, ...props }: IconProps) {
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
      {/* Forming funnel */}
      <ellipse cx="12" cy="6" rx="8" ry="2" strokeDasharray="4 2" />
      <ellipse cx="12" cy="10" rx="5" ry="1.5" strokeDasharray="3 2" />
      <ellipse cx="12" cy="14" rx="3" ry="1" strokeOpacity="0.7" />
      {/* Core materializing */}
      <circle cx="12" cy="18" r="2" strokeDasharray="2 2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

// V3: Data particles coalescing
export function MemoryLoadingV3({ size = 24, ...props }: IconProps) {
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
      {/* Target area */}
      <circle cx="12" cy="12" r="4" strokeDasharray="2 2" strokeOpacity="0.3" />
      {/* Incoming particles */}
      <circle cx="4" cy="4" r="1" fill="currentColor" fillOpacity="0.4" />
      <path d="M5 5l4 4" strokeOpacity="0.3" />
      <circle cx="20" cy="6" r="1" fill="currentColor" fillOpacity="0.5" />
      <path d="M19 7l-4 3" strokeOpacity="0.4" />
      <circle cx="3" cy="16" r="1" fill="currentColor" fillOpacity="0.6" />
      <path d="M4 16l5-2" strokeOpacity="0.5" />
      <circle cx="21" cy="18" r="1" fill="currentColor" fillOpacity="0.7" />
      <path d="M20 17l-5-3" strokeOpacity="0.6" />
      {/* Coalesced particles */}
      <circle cx="10" cy="11" r="0.75" fill="currentColor" />
      <circle cx="13" cy="10" r="0.75" fill="currentColor" />
      <circle cx="14" cy="13" r="0.75" fill="currentColor" />
    </svg>
  )
}
