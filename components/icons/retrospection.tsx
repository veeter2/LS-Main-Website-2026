import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Backward-curving light trails
export function RetrospectionV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="18" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
      <path d="M15 12c-3 0-5-2-7-2s-4 2-6 2" />
      <path d="M15 10c-2-2-4-4-6-4s-4 2-6 2" opacity="0.5" />
      <path d="M15 14c-2 2-4 4-6 4s-4-2-6-2" opacity="0.5" />
      <path d="M4 10l-2 2 2 2" />
    </svg>
  )
}

// V2: Mirror reflection
export function RetrospectionV2({ size = 24, ...props }: IconProps) {
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
      <line x1="13" y1="4" x2="13" y2="20" strokeDasharray="2 2" opacity="0.4" />
      <ellipse cx="18" cy="12" rx="3" ry="5" opacity="0.4" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// V3: Rewinding spiral
export function RetrospectionV3({ size = 24, ...props }: IconProps) {
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
      <path d="M20 12a8 8 0 1 0-8 8" />
      <path d="M12 8v4l-3 3" />
      <path d="M4 12l-2-2" />
      <path d="M4 12l2-2" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}
