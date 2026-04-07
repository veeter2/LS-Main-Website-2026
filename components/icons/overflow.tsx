import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Container with particles spilling
export function OverflowV1({ size = 24, ...props }: IconProps) {
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
      <path d="M6 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <circle cx="9" cy="4" r="1" fill="currentColor" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
      <circle cx="15" cy="5" r="1" fill="currentColor" />
      <circle cx="17" cy="3" r="0.75" fill="currentColor" opacity="0.6" />
      <circle cx="7" cy="5" r="0.75" fill="currentColor" opacity="0.6" />
      <circle cx="10" cy="12" r="0.75" fill="currentColor" opacity="0.4" />
      <circle cx="14" cy="14" r="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// V2: Burst from center
export function OverflowV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path d="M12 8V3" />
      <path d="M16 12h5" />
      <path d="M12 16v5" />
      <path d="M8 12H3" />
      <circle cx="12" cy="2" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="22" cy="12" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="22" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="2" cy="12" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// V3: Flood waves
export function OverflowV3({ size = 24, ...props }: IconProps) {
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
      <rect x="6" y="10" width="12" height="10" rx="1" />
      <path d="M6 14h12" opacity="0.3" />
      <path d="M6 18h12" opacity="0.3" />
      <path d="M4 10c1-2 2-2 4-2s3 2 4 2 2-2 4-2 3 2 4 2" />
      <path d="M5 7c1-1 2-1 3-1s2 1 3 1 2-1 3-1 2 1 3 1 2-1 3-1" opacity="0.5" />
      <path d="M8 4c1-1 1.5-1 2-1s1 1 2 1 1.5-1 2-1 1 1 2 1" opacity="0.3" />
    </svg>
  )
}
