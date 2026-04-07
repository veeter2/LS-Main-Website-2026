import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Thickening strengthening bond
export function ReinforcementV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="4" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="20" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <line x1="7" y1="12" x2="17" y2="12" strokeWidth="1" opacity="0.3" />
      <line x1="7" y1="11" x2="17" y2="11" strokeWidth="1" opacity="0.5" />
      <line x1="7" y1="12" x2="17" y2="12" strokeWidth="2" />
      <line x1="7" y1="13" x2="17" y2="13" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

// V2: Layered connection building
export function ReinforcementV2({ size = 24, ...props }: IconProps) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" opacity="0.2" />
      <rect x="6" y="6" width="12" height="12" rx="2" opacity="0.4" />
      <rect x="8" y="8" width="8" height="8" rx="2" opacity="0.6" />
      <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" />
    </svg>
  )
}

// V3: Growing roots/foundation
export function ReinforcementV3({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4v8" strokeWidth="2" />
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path d="M12 12v4" />
      <path d="M12 16c-2 0-4 2-6 4" />
      <path d="M12 16v6" opacity="0.7" />
      <path d="M12 16c2 0 4 2 6 4" />
      <path d="M8 18c-1 0-3 1-4 2" opacity="0.4" />
      <path d="M16 18c1 0 3 1 4 2" opacity="0.4" />
    </svg>
  )
}
