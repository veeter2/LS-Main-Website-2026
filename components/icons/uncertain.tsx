import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Probability cloud
export function UncertainV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="5" strokeDasharray="3 2" opacity="0.6" />
      <circle cx="12" cy="12" r="2" strokeDasharray="2 1" opacity="0.4" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}

// V2: Question in field
export function UncertainV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.2-0.8 2.2-2 2.7V14" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: Fuzzy boundary
export function UncertainV3({ size = 24, ...props }: IconProps) {
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
      <ellipse cx="12" cy="12" rx="8" ry="6" strokeDasharray="3 2" />
      <ellipse cx="12" cy="12" rx="6" ry="4" opacity="0.5" />
      <ellipse cx="12" cy="12" rx="3" ry="2" opacity="0.7" />
      <circle cx="10" cy="12" r="0.5" fill="currentColor" />
      <circle cx="14" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}
