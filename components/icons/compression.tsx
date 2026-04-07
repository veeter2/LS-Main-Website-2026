import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Dense packed information
export function CompressionV1({ size = 24, ...props }: IconProps) {
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
      <path d="M4 8l4 4-4 4" />
      <path d="M20 8l-4 4 4 4" />
      <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.2" />
      <line x1="10" y1="10" x2="14" y2="10" />
      <line x1="10" y1="12" x2="14" y2="12" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  )
}

// V2: Squeezing forces
export function CompressionV2({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4 10l2 2-2 2" />
      <path d="M20 10l-2 2 2 2" />
      <ellipse cx="12" cy="12" rx="4" ry="6" fill="currentColor" opacity="0.2" />
      <ellipse cx="12" cy="12" rx="3" ry="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: File/data compression
export function CompressionV3({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <rect x="9" y="10" width="2" height="2" fill="currentColor" />
      <rect x="13" y="10" width="2" height="2" fill="currentColor" />
      <rect x="9" y="13" width="2" height="2" fill="currentColor" />
      <rect x="13" y="13" width="2" height="2" fill="currentColor" />
      <rect x="9" y="16" width="6" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
