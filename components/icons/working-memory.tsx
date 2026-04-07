import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Active juggling orbits
export function WorkingMemoryV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9" ry="3" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
      <ellipse cx="12" cy="12" rx="5" ry="7" opacity="0.5" />
    </svg>
  )
}

// V2: Buffer slots with items
export function WorkingMemoryV2({ size = 24, ...props }: IconProps) {
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
      <rect x="2" y="8" width="5" height="8" rx="1" />
      <rect x="9" y="8" width="5" height="8" rx="1" />
      <rect x="16" y="8" width="5" height="8" rx="1" opacity="0.5" />
      <circle cx="4.5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="11.5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18.5" cy="12" r="1" opacity="0.3" />
      <path d="M4.5 4v4" opacity="0.5" />
      <path d="M11.5 4v4" opacity="0.5" />
      <path d="M4.5 16v4" opacity="0.3" />
      <path d="M11.5 16v4" opacity="0.3" />
    </svg>
  )
}

// V3: Spinning plates
export function WorkingMemoryV3({ size = 24, ...props }: IconProps) {
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
      <ellipse cx="6" cy="6" rx="4" ry="1.5" />
      <line x1="6" y1="7.5" x2="6" y2="20" />
      <ellipse cx="12" cy="4" rx="3" ry="1" />
      <line x1="12" y1="5" x2="12" y2="20" />
      <ellipse cx="18" cy="7" rx="4" ry="1.5" />
      <line x1="18" y1="8.5" x2="18" y2="20" />
      <line x1="3" y1="20" x2="21" y2="20" />
      <circle cx="6" cy="6" r="0.5" fill="currentColor" />
      <circle cx="12" cy="4" r="0.5" fill="currentColor" />
      <circle cx="18" cy="7" r="0.5" fill="currentColor" />
    </svg>
  )
}
