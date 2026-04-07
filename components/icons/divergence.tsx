import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Single path splitting into many
export function DivergenceV1({ size = 24, ...props }: IconProps) {
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
      <path d="M6 12h4" />
      <path d="M10 12c4 0 4-6 8-6" />
      <path d="M10 12h10" opacity="0.7" />
      <path d="M10 12c4 0 4 6 8 6" />
      <circle cx="20" cy="6" r="1.5" />
      <circle cx="20" cy="12" r="1.5" opacity="0.7" />
      <circle cx="20" cy="18" r="1.5" />
    </svg>
  )
}

// V2: Branching delta
export function DivergenceV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4v6" />
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path d="M12 10l-6 10" />
      <path d="M12 10l0 10" opacity="0.6" />
      <path d="M12 10l6 10" />
      <circle cx="6" cy="20" r="1.5" />
      <circle cx="12" cy="20" r="1" opacity="0.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  )
}

// V3: Explosion outward
export function DivergenceV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M12 9V3" />
      <path d="M15 12h6" />
      <path d="M12 15v6" />
      <path d="M9 12H3" />
      <path d="M14.5 9.5l4-4" opacity="0.6" />
      <path d="M14.5 14.5l4 4" opacity="0.6" />
      <path d="M9.5 14.5l-4 4" opacity="0.6" />
      <path d="M9.5 9.5l-4-4" opacity="0.6" />
    </svg>
  )
}
