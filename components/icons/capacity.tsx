import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Vessel with headroom
export function CapacityV1({ size = 24, ...props }: IconProps) {
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
      <path d="M6 4v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4" />
      <line x1="4" y1="4" x2="20" y2="4" />
      <line x1="6" y1="14" x2="18" y2="14" strokeDasharray="2 2" opacity="0.5" />
      <rect x="8" y="14" width="8" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <path d="M10 10l2 2 2-2" opacity="0.4" />
    </svg>
  )
}

// V2: Gauge meter
export function CapacityV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22c5.5 0 10-4.5 10-10h-4c0 3.3-2.7 6-6 6s-6-2.7-6-6H2c0 5.5 4.5 10 10 10z" />
      <path d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10" opacity="0.3" />
      <line x1="12" y1="12" x2="16" y2="8" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

// V3: Battery style
export function CapacityV3({ size = 24, ...props }: IconProps) {
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
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <line x1="23" y1="10" x2="23" y2="14" strokeWidth="2" />
      <rect x="5" y="8" width="4" height="8" rx="0.5" fill="currentColor" />
      <rect x="10" y="8" width="4" height="8" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="15" y="8" width="4" height="8" rx="0.5" opacity="0.3" />
    </svg>
  )
}
