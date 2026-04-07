import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Stretched connection under strain
export function TensionV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="20" cy="12" r="2" fill="currentColor" />
      <path d="M6 12c2-2 3-2 6 0s4 2 6 0" />
      <path d="M8 10v-2" opacity="0.4" />
      <path d="M12 8v-2" opacity="0.5" />
      <path d="M16 10v-2" opacity="0.4" />
      <path d="M4 14l-2 4" opacity="0.3" />
      <path d="M20 14l2 4" opacity="0.3" />
    </svg>
  )
}

// V2: Opposing forces pulling
export function TensionV2({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12h6" />
      <path d="M4 10l-2 2 2 2" />
      <path d="M16 12h6" />
      <path d="M20 10l2 2-2 2" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
      <line x1="10" y1="10" x2="14" y2="14" opacity="0.5" />
      <line x1="14" y1="10" x2="10" y2="14" opacity="0.5" />
    </svg>
  )
}

// V3: Taut wire with vibration
export function TensionV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="3" cy="12" r="2" />
      <circle cx="21" cy="12" r="2" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <path d="M8 12c0-1 1-2 2-2s2 1 2 2" opacity="0.3" />
      <path d="M12 12c0 1 1 2 2 2s2-1 2-2" opacity="0.3" />
      <path d="M10 8l2-2 2 2" opacity="0.4" />
      <path d="M10 16l2 2 2-2" opacity="0.4" />
    </svg>
  )
}
