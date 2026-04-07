import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Interconnected knowledge web
export function SemanticMemoryV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="5" cy="5" r="1.5" />
      <circle cx="19" cy="5" r="1.5" />
      <circle cx="5" cy="19" r="1.5" />
      <circle cx="19" cy="19" r="1.5" />
      <circle cx="12" cy="3" r="1" />
      <circle cx="12" cy="21" r="1" />
      <line x1="12" y1="10" x2="6" y2="6" opacity="0.6" />
      <line x1="12" y1="10" x2="18" y2="6" opacity="0.6" />
      <line x1="12" y1="14" x2="6" y2="18" opacity="0.6" />
      <line x1="12" y1="14" x2="18" y2="18" opacity="0.6" />
      <line x1="12" y1="10" x2="12" y2="4" opacity="0.4" />
      <line x1="12" y1="14" x2="12" y2="20" opacity="0.4" />
    </svg>
  )
}

// V2: Layered concept hierarchy
export function SemanticMemoryV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
      <circle cx="4" cy="20" r="1" opacity="0.6" />
      <circle cx="8" cy="20" r="1" opacity="0.6" />
      <circle cx="12" cy="20" r="1" opacity="0.6" />
      <circle cx="16" cy="20" r="1" opacity="0.6" />
      <circle cx="20" cy="20" r="1" opacity="0.6" />
      <line x1="12" y1="6" x2="6" y2="10.5" />
      <line x1="12" y1="6" x2="12" y2="10.5" />
      <line x1="12" y1="6" x2="18" y2="10.5" />
      <line x1="6" y1="13.5" x2="4" y2="19" opacity="0.5" />
      <line x1="6" y1="13.5" x2="8" y2="19" opacity="0.5" />
      <line x1="12" y1="13.5" x2="12" y2="19" opacity="0.5" />
      <line x1="18" y1="13.5" x2="16" y2="19" opacity="0.5" />
      <line x1="18" y1="13.5" x2="20" y2="19" opacity="0.5" />
    </svg>
  )
}

// V3: Dictionary/encyclopedia form
export function SemanticMemoryV3({ size = 24, ...props }: IconProps) {
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
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="14" y2="10" opacity="0.6" />
      <line x1="8" y1="14" x2="15" y2="14" opacity="0.6" />
      <line x1="8" y1="18" x2="12" y2="18" opacity="0.6" />
      <path d="M4 6h2" />
      <circle cx="5" cy="10" r="0.5" fill="currentColor" opacity="0.5" />
      <circle cx="5" cy="14" r="0.5" fill="currentColor" opacity="0.5" />
      <circle cx="5" cy="18" r="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
