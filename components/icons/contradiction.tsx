import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Opposing arrows with tension field
export function ContradictionV1({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Opposing forces */}
      <path d="M4 12h6" />
      <path d="M4 12l3-2.5" />
      <path d="M4 12l3 2.5" />
      <path d="M20 12h-6" />
      <path d="M20 12l-3-2.5" />
      <path d="M20 12l-3 2.5" />
      {/* Tension field in middle */}
      <circle cx="12" cy="12" r="2" strokeDasharray="2 1" />
      {/* Repulsion lines */}
      <path d="M10 10l-1-1" strokeOpacity="0.4" />
      <path d="M14 10l1-1" strokeOpacity="0.4" />
      <path d="M10 14l-1 1" strokeOpacity="0.4" />
      <path d="M14 14l1 1" strokeOpacity="0.4" />
    </svg>
  )
}

// V2: Magnetic field repulsion
export function ContradictionV2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Two poles */}
      <rect x="3" y="9" width="4" height="6" rx="1" />
      <rect x="17" y="9" width="4" height="6" rx="1" />
      {/* Repelling field lines */}
      <path d="M7 10c2-2 4-2 5-2" strokeOpacity="0.4" />
      <path d="M7 12c2 0 4 0 5 0" strokeOpacity="0.6" />
      <path d="M7 14c2 2 4 2 5 2" strokeOpacity="0.4" />
      <path d="M17 10c-2-2-4-2-5-2" strokeOpacity="0.4" />
      <path d="M17 12c-2 0-4 0-5 0" strokeOpacity="0.6" />
      <path d="M17 14c-2 2-4 2-5 2" strokeOpacity="0.4" />
    </svg>
  )
}

// V3: Crossed out connection
export function ContradictionV3({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Two concepts */}
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      {/* Attempted connection */}
      <path d="M9 12h6" strokeOpacity="0.3" />
      {/* Contradiction X */}
      <path d="M10 10l4 4" strokeWidth="2" />
      <path d="M14 10l-4 4" strokeWidth="2" />
    </svg>
  )
}
