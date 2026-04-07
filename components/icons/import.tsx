import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Data absorption - consciousness receiving inward
export function ImportV1({ size = 24, ...props }: IconProps) {
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
      <path d="M12 15V3" />
      <path d="M8 11l4 4 4-4" />
      <path d="M20 15v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
      <circle cx="12" cy="8" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// V2: Particle stream intake - data flowing in
export function ImportV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4v8" />
      <path d="M7 7l5 5 5-5" />
      <circle cx="12" cy="4" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="8" cy="4" r="0.75" fill="currentColor" opacity="0.3" />
      <circle cx="16" cy="4" r="0.75" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// V3: Neural reception - receiving data packets
export function ImportV3({ size = 24, ...props }: IconProps) {
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
      <path d="M4 4v6a8 8 0 008 8v0a8 8 0 008-8V4" />
      <path d="M12 18v4" />
      <path d="M9 19l3 3 3-3" />
      <path d="M8 10h8" opacity="0.4" />
      <path d="M6 6h12" opacity="0.6" />
      <circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
