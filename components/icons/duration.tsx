import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Stretched elastic form
export function DurationV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      <circle cx="20" cy="12" r="2" fill="currentColor" />
      <path d="M6 12c4-3 8 3 12 0" />
      <path d="M6 10h12" opacity="0.3" />
      <path d="M6 14h12" opacity="0.3" />
    </svg>
  )
}

// V2: Hourglass flowing
export function DurationV2({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3h14" />
      <path d="M5 21h14" />
      <path d="M7 3c0 4 5 6 5 9s-5 5-5 9" />
      <path d="M17 3c0 4-5 6-5 9s5 5 5 9" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="18" r="0.5" fill="currentColor" opacity="0.7" />
      <ellipse cx="12" cy="19.5" rx="2" ry="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// V3: Long continuous wave
export function DurationV3({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0 1.5-2 1.5-2" />
      <line x1="2" y1="8" x2="4" y2="8" opacity="0.4" />
      <line x1="20" y1="8" x2="22" y2="8" opacity="0.4" />
      <line x1="2" y1="16" x2="4" y2="16" opacity="0.4" />
      <line x1="20" y1="16" x2="22" y2="16" opacity="0.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
