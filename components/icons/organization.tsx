import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Hierarchical network - organizational structure
export function OrganizationV1({ size = 24, ...props }: IconProps) {
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
      <rect x="9" y="2" width="6" height="5" rx="1" />
      <rect x="2" y="17" width="6" height="5" rx="1" />
      <rect x="9" y="17" width="6" height="5" rx="1" />
      <rect x="16" y="17" width="6" height="5" rx="1" />
      <path d="M12 7v4" />
      <path d="M5 17v-4h14v4" />
      <path d="M12 13v4" />
    </svg>
  )
}

// V2: Neural organization - consciousness hierarchy
export function OrganizationV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="12" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 8v8.5" />
      <path d="M10 12l-3.5 4.5" opacity="0.6" />
      <path d="M14 12l3.5 4.5" opacity="0.6" />
      <circle cx="12" cy="5" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// V3: Structured grid - systematic organization
export function OrganizationV3({ size = 24, ...props }: IconProps) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 9v12" />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="6" cy="15" r="1" opacity="0.5" />
      <circle cx="15" cy="15" r="1" opacity="0.5" />
    </svg>
  )
}
