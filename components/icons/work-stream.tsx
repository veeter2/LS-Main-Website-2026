import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Infinite loop with flowing data - continuous memory stream
export function WorkStreamV1({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Infinity symbol / continuous loop */}
      <path d="M12 12c-2-2-4-3-6-3-3 0-4 2-4 3s1 3 4 3c2 0 4-1 6-3z" />
      <path d="M12 12c2 2 4 3 6 3 3 0 4-2 4-3s-1-3-4-3c-2 0-4 1-6 3z" />
      {/* Data particles flowing through */}
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="20" cy="12" r="1" fill="currentColor" />
      {/* Active indicator rays */}
      <line x1="12" y1="5" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="19" />
    </svg>
  )
}

// V2: Always-on pulse with streaming waves - perpetual activity
export function WorkStreamV2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Central always-active core */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      {/* Radiating activity pulses */}
      <circle cx="12" cy="12" r="6" strokeDasharray="3 2" />
      <circle cx="12" cy="12" r="9" strokeDasharray="4 3" strokeOpacity="0.6" />
      {/* Streaming data lines */}
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M12 3v3" />
      <path d="M12 18v3" />
    </svg>
  )
}

// V3: River of consciousness - continuous flow with memory nodes
export function WorkStreamV3({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Main flowing stream */}
      <path d="M3 8c3-2 6 2 9 0s6-2 9 0" />
      <path d="M3 12c3 2 6-2 9 0s6 2 9 0" />
      <path d="M3 16c3-2 6 2 9 0s6-2 9 0" />
      {/* Memory nodes along the stream */}
      <circle cx="6" cy="10" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="14" r="1.5" fill="currentColor" />
      {/* Infinite indicator - no start/end */}
      <line x1="2" y1="12" x2="3" y2="12" strokeOpacity="0.5" />
      <line x1="21" y1="12" x2="22" y2="12" strokeOpacity="0.5" />
    </svg>
  )
}
