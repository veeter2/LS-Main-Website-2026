import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Many paths merging to one
export function ConvergenceV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="4" cy="6" r="1.5" />
      <circle cx="4" cy="12" r="1.5" opacity="0.7" />
      <circle cx="4" cy="18" r="1.5" />
      <path d="M5.5 6c4 0 4 6 8 6" />
      <path d="M5.5 12h8" opacity="0.7" />
      <path d="M5.5 18c4 0 4-6 8-6" />
      <path d="M14 12h4" />
      <circle cx="20" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

// V2: Funnel collection
export function ConvergenceV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="20" cy="4" r="1.5" />
      <path d="M4 5.5l8 8.5" />
      <path d="M12 5.5v8" opacity="0.7" />
      <path d="M20 5.5l-8 8.5" />
      <path d="M12 14v6" />
      <circle cx="12" cy="20" r="2" fill="currentColor" />
    </svg>
  )
}

// V3: Imploding star
export function ConvergenceV3({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3v5" />
      <path d="M12 16v5" />
      <path d="M3 12h5" />
      <path d="M16 12h5" />
      <path d="M5.6 5.6l4 4" opacity="0.6" />
      <path d="M14.4 14.4l4 4" opacity="0.6" />
      <path d="M5.6 18.4l4-4" opacity="0.6" />
      <path d="M14.4 9.6l4-4" opacity="0.6" />
      <circle cx="12" cy="3" r="1" opacity="0.4" />
      <circle cx="12" cy="21" r="1" opacity="0.4" />
      <circle cx="3" cy="12" r="1" opacity="0.4" />
      <circle cx="21" cy="12" r="1" opacity="0.4" />
    </svg>
  )
}
