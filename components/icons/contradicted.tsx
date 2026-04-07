import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Crossed negated form
export function ContradictedV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" opacity="0.3" />
    </svg>
  )
}

// V2: Broken link
export function ContradictedV2({ size = 24, ...props }: IconProps) {
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
      <path d="M9 15l-2 2a3 3 0 0 1-4.2-4.2l2-2" />
      <path d="M15 9l2-2a3 3 0 0 1 4.2 4.2l-2 2" />
      <line x1="10" y1="14" x2="14" y2="10" strokeDasharray="2 2" opacity="0.5" />
      <line x1="8" y1="8" x2="10" y2="10" />
      <line x1="14" y1="14" x2="16" y2="16" />
    </svg>
  )
}

// V3: X mark emphatic
export function ContradictedV3({ size = 24, ...props }: IconProps) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="8" y1="8" x2="16" y2="16" strokeWidth="2" />
      <line x1="16" y1="8" x2="8" y2="16" strokeWidth="2" />
    </svg>
  )
}
