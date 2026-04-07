import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Forward-leaning wave forms
export function AnticipationV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="6" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <path d="M9 12c3 0 5 2 7 2s4-2 6-2" />
      <path d="M9 10c2-2 4-4 6-4s4 2 6 2" opacity="0.5" />
      <path d="M9 14c2 2 4 4 6 4s4-2 6-2" opacity="0.5" />
      <path d="M20 10l2 2-2 2" />
    </svg>
  )
}

// V2: Telescope looking forward
export function AnticipationV2({ size = 24, ...props }: IconProps) {
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
      <path d="M4 15l4-8h8l4 8" />
      <ellipse cx="12" cy="7" rx="3" ry="1" />
      <ellipse cx="12" cy="15" rx="6" ry="2" />
      <circle cx="18" cy="5" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="20" cy="3" r="1" fill="currentColor" opacity="0.3" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="10" y1="21" x2="14" y2="21" />
    </svg>
  )
}

// V3: Horizon with rising elements
export function AnticipationV3({ size = 24, ...props }: IconProps) {
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
      <line x1="2" y1="16" x2="22" y2="16" />
      <path d="M6 16v-2" opacity="0.4" />
      <path d="M10 16v-4" opacity="0.6" />
      <path d="M14 16v-6" opacity="0.8" />
      <path d="M18 16v-8" />
      <circle cx="18" cy="6" r="2" fill="currentColor" />
      <path d="M20 4l2-2" opacity="0.5" />
      <path d="M20 8l2 0" opacity="0.3" />
    </svg>
  )
}
