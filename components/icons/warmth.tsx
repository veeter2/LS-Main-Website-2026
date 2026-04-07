import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Gentle glow - soft ambient presence
export function WarmthV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="7" opacity="0.4" />
      <circle cx="12" cy="12" r="10" opacity="0.2" />
      <path d="M12 5v-2" opacity="0.6" />
      <path d="M12 21v-2" opacity="0.6" />
      <path d="M5 12H3" opacity="0.6" />
      <path d="M21 12h-2" opacity="0.6" />
    </svg>
  )
}

// V2: Ember glow - fading warmth with residual energy
export function WarmthV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="14" r="5" />
      <path d="M10 10c0-2 1-3 2-4 1 1 2 2 2 4" opacity="0.6" />
      <path d="M9 8c-1-1-1-2.5 0-4 0 2 1 3 3 3" opacity="0.4" />
      <path d="M15 8c1-1 1-2.5 0-4 0 2-1 3-3 3" opacity="0.4" />
      <circle cx="12" cy="14" r="2" opacity="0.5" />
    </svg>
  )
}

// V3: Thermal gradient - layered warmth levels
export function WarmthV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="18" r="3" />
      <path d="M9 6h6" opacity="0.3" />
      <path d="M9 9h6" opacity="0.5" />
      <path d="M9 12h6" opacity="0.7" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
