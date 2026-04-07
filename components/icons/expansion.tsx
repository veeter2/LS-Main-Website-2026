import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Decompressing outward
export function ExpansionV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="5" opacity="0.5" />
      <circle cx="12" cy="12" r="8" opacity="0.3" />
      <path d="M12 4l-1-2 2 0z" opacity="0.5" />
      <path d="M12 20l-1 2 2 0z" opacity="0.5" />
      <path d="M4 12l-2-1 0 2z" opacity="0.5" />
      <path d="M20 12l2-1 0 2z" opacity="0.5" />
    </svg>
  )
}

// V2: Unfolding layers
export function ExpansionV2({ size = 24, ...props }: IconProps) {
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
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="6" width="12" height="12" rx="1" opacity="0.5" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 3l-1-1" opacity="0.4" />
      <path d="M21 3l1-1" opacity="0.4" />
      <path d="M3 21l-1 1" opacity="0.4" />
      <path d="M21 21l1 1" opacity="0.4" />
    </svg>
  )
}

// V3: Breath/inhale
export function ExpansionV3({ size = 24, ...props }: IconProps) {
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
      <ellipse cx="12" cy="12" rx="8" ry="6" />
      <ellipse cx="12" cy="12" rx="5" ry="3" opacity="0.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path d="M4 6l-2-2" opacity="0.3" />
      <path d="M20 6l2-2" opacity="0.3" />
      <path d="M4 18l-2 2" opacity="0.3" />
      <path d="M20 18l2 2" opacity="0.3" />
    </svg>
  )
}
