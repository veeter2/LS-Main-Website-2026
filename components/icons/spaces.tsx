import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Nested containers - spaces within spaces, dimensional rooms
export function SpacesV1({ size = 24, ...props }: IconProps) {
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
      {/* Outer space boundary */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      {/* Inner nested space */}
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      {/* Core space */}
      <rect x="10" y="10" width="4" height="4" rx="1" />
      {/* Portal connections between layers */}
      <line x1="5" y1="5" x2="7" y2="7" />
      <line x1="19" y1="5" x2="17" y2="7" />
      <line x1="5" y1="19" x2="7" y2="17" />
      <line x1="19" y1="19" x2="17" y2="17" />
    </svg>
  )
}

// V2: Floating planes - multiple dimensional planes/workspaces
export function SpacesV2({ size = 24, ...props }: IconProps) {
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
      {/* Back plane */}
      <path d="M6 4h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" strokeOpacity="0.4" />
      {/* Middle plane */}
      <path d="M4 8h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" strokeOpacity="0.7" />
      {/* Front plane - active space */}
      <rect x="6" y="10" width="14" height="10" rx="1" />
      {/* Node on active space */}
      <circle cx="13" cy="15" r="2" />
    </svg>
  )
}

// V3: Orbital spaces - separate spaces orbiting a central hub
export function SpacesV3({ size = 24, ...props }: IconProps) {
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
      {/* Central hub */}
      <circle cx="12" cy="12" r="3" />
      {/* Orbiting spaces */}
      <circle cx="12" cy="4" r="2" />
      <circle cx="19" cy="9" r="2" />
      <circle cx="17" cy="17" r="2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="5" cy="9" r="2" />
      {/* Connection lines to hub */}
      <line x1="12" y1="6" x2="12" y2="9" strokeDasharray="2 1" />
      <line x1="17.3" y1="10" x2="14.5" y2="11" strokeDasharray="2 1" />
      <line x1="15.5" y1="16" x2="13.8" y2="14" strokeDasharray="2 1" />
      <line x1="8.5" y1="16" x2="10.2" y2="14" strokeDasharray="2 1" />
      <line x1="6.7" y1="10" x2="9.5" y2="11" strokeDasharray="2 1" />
    </svg>
  )
}
