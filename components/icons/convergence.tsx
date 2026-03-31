import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Two paths converging to a unified point — founding story, team
export function ConvergenceV1({ size = 24, ...props }: IconProps) {
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
      {/* Left path converging */}
      <path d="M3 4C3 4 6 8 12 14" />
      {/* Right path converging */}
      <path d="M21 4C21 4 18 8 12 14" />
      {/* Convergence node */}
      <circle cx="12" cy="14" r="2" fill="currentColor" fillOpacity="0.8" />
      {/* Unified continuation */}
      <path d="M12 16v4" />
      {/* Start nodes */}
      <circle cx="3" cy="4" r="1.25" fill="currentColor" fillOpacity="0.4" />
      <circle cx="21" cy="4" r="1.25" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

// V2: Radiating strands converging to center
export function ConvergenceV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12L4 4" strokeOpacity="0.6" />
      <path d="M12 12L20 4" strokeOpacity="0.6" />
      <path d="M12 12L4 20" strokeOpacity="0.6" />
      <path d="M12 12L20 20" strokeOpacity="0.6" />
      <path d="M12 12L12 3" strokeOpacity="0.4" />
      <path d="M12 12L12 21" strokeOpacity="0.4" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.9" />
    </svg>
  )
}
