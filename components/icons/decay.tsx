import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Fading dissolving connection
export function DecayV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="20" cy="12" r="2" opacity="0.3" />
      <path d="M6 12h3" />
      <path d="M10 12h2" opacity="0.7" />
      <path d="M13 12h2" opacity="0.4" strokeDasharray="2 1" />
      <path d="M16 12h2" opacity="0.2" strokeDasharray="1 2" />
      <circle cx="11" cy="9" r="0.5" fill="currentColor" opacity="0.3" />
      <circle cx="14" cy="15" r="0.5" fill="currentColor" opacity="0.2" />
      <circle cx="16" cy="10" r="0.5" fill="currentColor" opacity="0.1" />
    </svg>
  )
}

// V2: Crumbling structure
export function DecayV2({ size = 24, ...props }: IconProps) {
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
      <path d="M4 20h8" />
      <path d="M6 20v-8" />
      <path d="M10 20v-6" />
      <path d="M6 12h4" />
      <path d="M14 18l2-2" opacity="0.5" />
      <path d="M16 20l1-3" opacity="0.4" />
      <path d="M18 17l2-1" opacity="0.3" />
      <circle cx="15" cy="14" r="1" opacity="0.4" />
      <circle cx="18" cy="12" r="0.75" opacity="0.3" />
      <circle cx="20" cy="14" r="0.5" opacity="0.2" />
      <circle cx="17" cy="9" r="0.5" opacity="0.2" />
    </svg>
  )
}

// V3: Signal losing strength
export function DecayV3({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12c2-4 4-4 6 0s4 4 6 0" />
      <path d="M14 12c1-2 2-2 3 0s2 2 3 0" opacity="0.5" />
      <path d="M20 12c0.5-1 1-1 1.5 0" opacity="0.2" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="10" cy="12" r="0.75" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="12" r="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
