import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural bridge - two networks connecting
export function IntegrationsV1({ size = 24, ...props }: IconProps) {
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
      {/* Internal network (left) */}
      <circle cx="6" cy="12" r="3" />
      <circle cx="6" cy="12" r="1" fill="currentColor" />
      <path d="M4 9l-1-2" strokeOpacity="0.5" />
      <path d="M4 15l-1 2" strokeOpacity="0.5" />
      {/* External network (right) */}
      <circle cx="18" cy="12" r="3" />
      <circle cx="18" cy="12" r="1" fill="currentColor" />
      <path d="M20 9l1-2" strokeOpacity="0.5" />
      <path d="M20 15l1 2" strokeOpacity="0.5" />
      {/* Bridge connection */}
      <path d="M9 12h6" />
      {/* Data flowing */}
      <circle cx="11" cy="12" r="0.75" fill="currentColor" />
      <circle cx="13" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V2: Portal with data streams
export function IntegrationsV2({ size = 24, ...props }: IconProps) {
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
      {/* Portal ring */}
      <ellipse cx="12" cy="12" rx="4" ry="8" />
      {/* Depth rings */}
      <ellipse cx="12" cy="12" rx="2" ry="5" strokeOpacity="0.5" />
      {/* Data streams entering */}
      <path d="M4 8l4 2" />
      <path d="M4 16l4-2" />
      <path d="M20 8l-4 2" />
      <path d="M20 16l-4-2" />
      {/* Portal center */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* External nodes */}
      <circle cx="4" cy="8" r="1" fill="currentColor" />
      <circle cx="4" cy="16" r="1" fill="currentColor" />
      <circle cx="20" cy="8" r="1" fill="currentColor" />
      <circle cx="20" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: Membrane with particles passing
export function IntegrationsV3({ size = 24, ...props }: IconProps) {
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
      {/* Membrane barrier */}
      <path d="M12 4v16" strokeDasharray="3 2" />
      {/* Permeable zones */}
      <path d="M10 8h4" />
      <path d="M10 12h4" />
      <path d="M10 16h4" />
      {/* Particles moving through */}
      <circle cx="6" cy="8" r="1" fill="currentColor" />
      <circle cx="11" cy="8" r="0.75" fill="currentColor" />
      <circle cx="18" cy="12" r="1" fill="currentColor" />
      <circle cx="13" cy="12" r="0.75" fill="currentColor" />
      <circle cx="6" cy="16" r="0.75" fill="currentColor" />
      <circle cx="18" cy="16" r="1" fill="currentColor" />
      {/* Direction hints */}
      <path d="M7 8l2 0" strokeOpacity="0.4" />
      <path d="M15 12l2 0" strokeOpacity="0.4" />
    </svg>
  )
}
