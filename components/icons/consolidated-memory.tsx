import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Compressed crystal form
export function ConsolidatedMemoryV1({ size = 24, ...props }: IconProps) {
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
      <polygon points="12,2 20,8 20,16 12,22 4,16 4,8" fill="currentColor" opacity="0.1" />
      <polygon points="12,2 20,8 20,16 12,22 4,16 4,8" />
      <polygon points="12,6 16,9 16,15 12,18 8,15 8,9" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

// V2: Vault/archive box
export function ConsolidatedMemoryV2({ size = 24, ...props }: IconProps) {
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
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <circle cx="12" cy="15" r="3" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      <path d="M7 3h10" />
      <path d="M9 3v3" />
      <path d="M15 3v3" />
    </svg>
  )
}

// V3: Dense particle cluster
export function ConsolidatedMemoryV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="8" opacity="0.3" />
      <circle cx="12" cy="12" r="5" opacity="0.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="13" r="1" fill="currentColor" />
      <circle cx="14" cy="13" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      <circle cx="9" cy="9" r="0.5" fill="currentColor" opacity="0.5" />
      <circle cx="15" cy="9" r="0.5" fill="currentColor" opacity="0.5" />
      <circle cx="9" cy="15" r="0.5" fill="currentColor" opacity="0.5" />
      <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
