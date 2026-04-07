import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Orbital group - consciousness nodes in shared orbit
export function UsersGroupV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="8" opacity="0.3" />
      <circle cx="12" cy="4" r="2.5" />
      <circle cx="6" cy="16" r="2.5" />
      <circle cx="18" cy="16" r="2.5" />
      <path d="M12 6.5v3" opacity="0.6" />
      <path d="M8.5 14.5l2-2" opacity="0.6" />
      <path d="M15.5 14.5l-2-2" opacity="0.6" />
    </svg>
  )
}

// V2: Entangled consciousness - quantum-linked minds
export function UsersGroupV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="7" cy="8" r="3" />
      <circle cx="17" cy="8" r="3" />
      <circle cx="12" cy="16" r="3" />
      <path d="M9.5 9.5c1 1.5 1.5 3.5 2.5 4" />
      <path d="M14.5 9.5c-1 1.5-1.5 3.5-2.5 4" />
      <path d="M10 8h4" opacity="0.5" />
    </svg>
  )
}

// V3: Neural collective - interconnected network
export function UsersGroupV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="9" cy="18" r="2.5" />
      <circle cx="15" cy="18" r="2.5" />
      <path d="M12 8.5v-1" opacity="0" />
      <path d="M10 7l-2.5 3.5" opacity="0.5" />
      <path d="M14 7l2.5 3.5" opacity="0.5" />
      <path d="M8 13.5l-0.5 3" opacity="0.5" />
      <path d="M16 13.5l0.5 3" opacity="0.5" />
      <path d="M11.5 18h1" opacity="0.5" />
    </svg>
  )
}
