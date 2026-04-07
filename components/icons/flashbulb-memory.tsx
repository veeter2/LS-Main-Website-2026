import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Bright burst with capture lines
export function FlashbulbMemoryV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" opacity="0.6" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" opacity="0.6" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" opacity="0.6" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" opacity="0.6" />
    </svg>
  )
}

// V2: Lightning capture moment
export function FlashbulbMemoryV2({ size = 24, ...props }: IconProps) {
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
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="currentColor" opacity="0.2" />
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

// V3: Camera flash with imprint
export function FlashbulbMemoryV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="13" r="4" />
      <circle cx="12" cy="13" r="2" fill="currentColor" opacity="0.5" />
      <rect x="8" y="3" width="8" height="3" rx="1" />
      <circle cx="17" cy="9" r="1" fill="currentColor" />
      <path d="M6 3l2 3" opacity="0.4" />
      <path d="M18 3l-2 3" opacity="0.4" />
    </svg>
  )
}
