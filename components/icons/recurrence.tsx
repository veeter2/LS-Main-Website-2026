import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Spiral returning at different levels
export function RecurrenceV1({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3c5 0 9 4 9 9" />
      <path d="M12 7c3 0 5 2.5 5 5" opacity="0.7" />
      <path d="M12 11c1 0 2 1 2 2" opacity="0.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M21 12c0 5-4 9-9 9" />
      <path d="M17 12c0 3-2.5 5-5 5" opacity="0.7" />
      <path d="M14 12c0 1-1 2-2 2" opacity="0.4" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
    </svg>
  )
}

// V2: Cycle with waypoints
export function RecurrenceV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="19" cy="9" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="5" cy="9" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M13 3l-1 2h-1" />
    </svg>
  )
}

// V3: Pendulum swing
export function RecurrenceV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="3" r="1.5" />
      <line x1="12" y1="4.5" x2="12" y2="14" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <path d="M6 20c2-3 4-4 6-4s4 1 6 4" strokeDasharray="2 2" opacity="0.4" />
      <circle cx="6" cy="16" r="1.5" opacity="0.3" />
      <circle cx="18" cy="16" r="1.5" opacity="0.3" />
      <path d="M6 16l6-2" opacity="0.2" />
      <path d="M18 16l-6-2" opacity="0.2" />
    </svg>
  )
}
