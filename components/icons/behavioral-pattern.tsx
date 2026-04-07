import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Consistent sine wave loop
export function BehavioralPatternV1({ size = 24, ...props }: IconProps) {
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
      {/* Repeating wave pattern */}
      <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0" />
      {/* Cycle markers */}
      <circle cx="5" cy="12" r="1" fill="currentColor" fillOpacity="0.4" />
      <circle cx="11" cy="12" r="1" fill="currentColor" fillOpacity="0.4" />
      <circle cx="17" cy="12" r="1" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

// V2: Circular recurring pattern
export function BehavioralPatternV2({ size = 24, ...props }: IconProps) {
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
      {/* Circular path */}
      <circle cx="12" cy="12" r="8" strokeOpacity="0.3" />
      {/* Recurring points on cycle */}
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="19" cy="9" r="1.5" fill="currentColor" />
      <circle cx="17" cy="18" r="1.5" fill="currentColor" />
      <circle cx="7" cy="18" r="1.5" fill="currentColor" />
      <circle cx="5" cy="9" r="1.5" fill="currentColor" />
      {/* Direction arrows */}
      <path d="M14 4l-2 0" />
      <path d="M19 11l0-2" />
    </svg>
  )
}

// V3: Stacked recurring signatures
export function BehavioralPatternV3({ size = 24, ...props }: IconProps) {
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
      {/* Stacked identical waveforms */}
      <path d="M4 6c2 0 3-2 4-2s2 2 4 2 3-2 4-2 2 2 4 2" strokeOpacity="0.3" />
      <path d="M4 10c2 0 3-2 4-2s2 2 4 2 3-2 4-2 2 2 4 2" strokeOpacity="0.5" />
      <path d="M4 14c2 0 3-2 4-2s2 2 4 2 3-2 4-2 2 2 4 2" strokeOpacity="0.7" />
      <path d="M4 18c2 0 3-2 4-2s2 2 4 2 3-2 4-2 2 2 4 2" />
      {/* Consistency indicator */}
      <path d="M2 6v12" strokeOpacity="0.2" strokeDasharray="1 2" />
    </svg>
  )
}
