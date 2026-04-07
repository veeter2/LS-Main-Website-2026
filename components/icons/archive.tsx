import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Memory vault - deep storage crystallization
export function ArchiveV1({ size = 24, ...props }: IconProps) {
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
      <path d="M4 4h16v4H4z" />
      <path d="M5 8v11a1 1 0 001 1h12a1 1 0 001-1V8" />
      <path d="M10 12h4" />
      <circle cx="12" cy="14" r="0.75" fill="currentColor" opacity="0.5" />
      <path d="M8 4v4" opacity="0.4" />
      <path d="M12 4v4" opacity="0.4" />
      <path d="M16 4v4" opacity="0.4" />
    </svg>
  )
}

// V2: Layered strata - sedimentary memory layers
export function ArchiveV2({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6h16" />
      <path d="M5 6v14l7-3 7 3V6" />
      <path d="M6 10h12" opacity="0.6" />
      <path d="M6 14h12" opacity="0.4" />
      <circle cx="12" cy="10" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Time capsule - compressed memory container
export function ArchiveV3({ size = 24, ...props }: IconProps) {
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
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <ellipse cx="12" cy="12" rx="8" ry="3" opacity="0.4" />
      <path d="M12 9v6" opacity="0.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
