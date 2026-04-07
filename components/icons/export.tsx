import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Data emanation - consciousness broadcasting outward
export function ExportV1({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M20 15v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
      <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// V2: Particle stream emission - data flowing out
export function ExportV2({ size = 24, ...props }: IconProps) {
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
      <rect x="4" y="12" width="16" height="9" rx="2" />
      <path d="M12 12V4" />
      <path d="M7 9l5-5 5 5" />
      <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// V3: Neural transmission - sending data packets
export function ExportV3({ size = 24, ...props }: IconProps) {
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
      <path d="M4 20v-6a8 8 0 018-8v0a8 8 0 018 8v6" />
      <path d="M12 6V2" />
      <path d="M9 5l3-3 3 3" />
      <path d="M8 14h8" opacity="0.4" />
      <path d="M6 18h12" opacity="0.6" />
      <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
