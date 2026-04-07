import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Quantum-linked paired particles
export function EntanglementV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <circle cx="6" cy="12" r="1" fill="currentColor" />
      <circle cx="18" cy="12" r="1" fill="currentColor" />
      <path d="M9 12c2-3 4-3 6 0" strokeDasharray="2 1" />
      <path d="M9 12c2 3 4 3 6 0" strokeDasharray="2 1" />
      <path d="M6 9c-2-3-2-5 0-7" opacity="0.4" />
      <path d="M18 9c2-3 2-5 0-7" opacity="0.4" />
    </svg>
  )
}

// V2: Infinity bond
export function EntanglementV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12c-2-2-4-2-6 0s-2 4 0 6 4 2 6 0" />
      <path d="M12 12c2 2 4 2 6 0s2-4 0-6-4-2-6 0" />
      <circle cx="6" cy="15" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="18" cy="9" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: Mirrored orbital dance
export function EntanglementV3({ size = 24, ...props }: IconProps) {
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
      <ellipse cx="8" cy="12" rx="5" ry="8" />
      <ellipse cx="16" cy="12" rx="5" ry="8" />
      <circle cx="8" cy="5" r="1.5" fill="currentColor" />
      <circle cx="16" cy="19" r="1.5" fill="currentColor" />
      <line x1="12" y1="4" x2="12" y2="20" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  )
}
