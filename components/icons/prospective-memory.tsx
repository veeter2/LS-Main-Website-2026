import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Forward trajectory with target
export function ProspectiveMemoryV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="18" cy="12" r="4" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
      <path d="M3 12h9" />
      <path d="M10 9l3 3-3 3" />
      <circle cx="5" cy="12" r="1" opacity="0.4" />
      <path d="M3 8c2-2 4-3 6-3" opacity="0.3" />
      <path d="M3 16c2 2 4 3 6 3" opacity="0.3" />
    </svg>
  )
}

// V2: Calendar/clock hybrid
export function ProspectiveMemoryV2({ size = 24, ...props }: IconProps) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <circle cx="12" cy="16" r="3" />
      <path d="M12 14v2l1.5 1" />
      <circle cx="7" cy="14" r="0.75" fill="currentColor" opacity="0.3" />
      <circle cx="17" cy="14" r="0.75" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// V3: Future beacon/lighthouse
export function ProspectiveMemoryV3({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3v4" />
      <circle cx="12" cy="10" r="3" fill="currentColor" opacity="0.3" />
      <path d="M9 10h-5" opacity="0.5" />
      <path d="M20 10h-5" opacity="0.5" />
      <path d="M6 6l2 2" opacity="0.4" />
      <path d="M18 6l-2 2" opacity="0.4" />
      <path d="M10 13l-4 8h12l-4-8" />
      <line x1="8" y1="17" x2="16" y2="17" opacity="0.5" />
    </svg>
  )
}
