import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Timeline with gravity wells - temporal memory
export function TimelineV1({ size = 24, ...props }: IconProps) {
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
      {/* Time axis */}
      <path d="M3 12h18" />
      {/* Arrow indicating flow */}
      <path d="M18 9l3 3-3 3" />
      {/* Gravity wells dipping below timeline */}
      <path d="M7 12c0 2 1 3 1 3" />
      <path d="M12 12c0 3 1.5 4 1.5 4" />
      <path d="M16 12c0 1.5 0.5 2 0.5 2" />
      {/* Memory nodes at events */}
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      {/* Past fading */}
      <circle cx="4" cy="12" r="0.5" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

// V2: Spiral time - past to present
export function TimelineV2({ size = 24, ...props }: IconProps) {
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
      {/* Spiral path */}
      <path d="M12 12m-2 0a2 2 0 1 0 4 0" />
      <path d="M12 12m-5 0a5 5 0 1 0 10 0" strokeOpacity="0.7" />
      <path d="M12 12m-8 0a8 8 0 1 0 16 0" strokeOpacity="0.4" />
      {/* Time flows inward */}
      <path d="M20 12l-2 0" />
      {/* Memory moments on spiral */}
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="7" cy="12" r="1" fill="currentColor" />
      <circle cx="17" cy="12" r="0.75" fill="currentColor" fillOpacity="0.6" />
      <circle cx="12" cy="4" r="0.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  )
}

// V3: Memory stream with flow
export function TimelineV3({ size = 24, ...props }: IconProps) {
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
      {/* Flowing river of time */}
      <path d="M4 8c4 0 4 8 8 8s4-8 8-8" />
      <path d="M4 12c4 0 4 8 8 8s4-8 8-8" strokeOpacity="0.5" />
      {/* Memory nodes floating */}
      <circle cx="6" cy="9" r="1.5" fill="currentColor" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <circle cx="18" cy="9" r="1" fill="currentColor" />
      {/* Time particles */}
      <circle cx="9" cy="11" r="0.5" fill="currentColor" />
      <circle cx="15" cy="13" r="0.5" fill="currentColor" />
    </svg>
  )
}
