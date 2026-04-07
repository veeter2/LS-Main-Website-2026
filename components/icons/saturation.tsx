import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Fully saturated field
export function SaturationV1({ size = 24, ...props }: IconProps) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}

// V2: Maximum density
export function SaturationV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <line x1="3" y1="3" x2="5" y2="5" opacity="0.4" />
      <line x1="21" y1="3" x2="19" y2="5" opacity="0.4" />
    </svg>
  )
}

// V3: Full bar/limit reached
export function SaturationV3({ size = 24, ...props }: IconProps) {
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
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <rect x="5" y="10" width="14" height="4" rx="0.5" fill="currentColor" />
      <line x1="12" y1="4" x2="12" y2="7" />
      <path d="M10 4l2-2 2 2" />
      <line x1="12" y1="17" x2="12" y2="20" opacity="0.4" />
    </svg>
  )
}
