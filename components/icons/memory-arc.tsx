import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Smooth trajectory with waypoint nodes, start-end differentiation
export function MemoryArcV1({ size = 24, ...props }: IconProps) {
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
      {/* Arc path */}
      <path d="M4 18C4 18 6 6 12 6s8 12 8 12" />
      {/* Start node - hollow */}
      <circle cx="4" cy="18" r="2" fill="none" />
      {/* Waypoint nodes */}
      <circle cx="8" cy="10" r="1.25" fill="currentColor" fillOpacity="0.5" />
      <circle cx="12" cy="6" r="1.25" fill="currentColor" fillOpacity="0.5" />
      <circle cx="16" cy="10" r="1.25" fill="currentColor" fillOpacity="0.5" />
      {/* End node - filled */}
      <circle cx="20" cy="18" r="2" fill="currentColor" />
    </svg>
  )
}

// V2: Ribbon-like arc with motion blur effect
export function MemoryArcV2({ size = 24, ...props }: IconProps) {
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
      {/* Main arc */}
      <path d="M3 20Q7 4 12 4t9 16" />
      {/* Motion echo lines */}
      <path d="M5 19Q8 6 12 6t7 13" strokeOpacity="0.5" />
      <path d="M7 18Q9 8 12 8t5 10" strokeOpacity="0.25" />
      {/* Direction indicator */}
      <path d="M18 17l3 3-1.5-4" fill="currentColor" fillOpacity="0.6" />
    </svg>
  )
}

// V3: Branching narrative arc with divergent paths
export function MemoryArcV3({ size = 24, ...props }: IconProps) {
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
      {/* Main arc */}
      <path d="M3 18C5 12 8 8 12 8" />
      {/* Branch points */}
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
      {/* Divergent paths */}
      <path d="M12 8c4 0 6 2 9 6" />
      <path d="M12 8c3 2 5 6 6 10" strokeOpacity="0.5" />
      <path d="M12 8c2 3 3 8 3 12" strokeOpacity="0.3" />
      {/* Start marker */}
      <circle cx="3" cy="18" r="1.5" fill="none" />
    </svg>
  )
}
