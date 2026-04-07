import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Dotted dashed foundation
export function AssumptionV1({ size = 24, ...props }: IconProps) {
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
      <polygon points="12,4 20,20 4,20" strokeDasharray="4 2" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  )
}

// V2: Floating ungrounded
export function AssumptionV2({ size = 24, ...props }: IconProps) {
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
      <rect x="6" y="4" width="12" height="10" rx="2" />
      <circle cx="12" cy="9" r="2" fill="currentColor" opacity="0.3" />
      <line x1="4" y1="20" x2="20" y2="20" strokeDasharray="3 2" />
      <line x1="8" y1="14" x2="8" y2="18" strokeDasharray="2 2" opacity="0.5" />
      <line x1="16" y1="14" x2="16" y2="18" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  )
}

// V3: Theoretical construct
export function AssumptionV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="4" strokeDasharray="2 2" opacity="0.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.5" />
      <path d="M12 4v-2" opacity="0.4" />
      <path d="M12 22v-2" opacity="0.4" />
      <path d="M4 12h-2" opacity="0.4" />
      <path d="M22 12h-2" opacity="0.4" />
    </svg>
  )
}
