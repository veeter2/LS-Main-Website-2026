import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Crystalline geometric structure
export function IdentityAnchorV1({ size = 24, ...props }: IconProps) {
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
      {/* Crystal facets */}
      <path d="M12 2l7 5v10l-7 5-7-5V7l7-5z" />
      <path d="M12 2v20" strokeOpacity="0.5" />
      <path d="M5 7l7 5 7-5" strokeOpacity="0.5" />
      <path d="M5 17l7-5 7 5" strokeOpacity="0.5" />
      {/* Central anchor point */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

// V2: Root system extending downward
export function IdentityAnchorV2({ size = 24, ...props }: IconProps) {
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
      {/* Ground line */}
      <path d="M4 10h16" strokeOpacity="0.3" />
      {/* Above ground - stable trunk */}
      <path d="M12 3v7" strokeWidth="2" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      {/* Root system */}
      <path d="M12 10v4" />
      <path d="M12 14c-3 2-5 5-6 7" />
      <path d="M12 14v7" />
      <path d="M12 14c3 2 5 5 6 7" />
      <path d="M9 12c-2 1-4 3-5 5" strokeOpacity="0.5" />
      <path d="M15 12c2 1 4 3 5 5" strokeOpacity="0.5" />
    </svg>
  )
}

// V3: Keystone in arch structure
export function IdentityAnchorV3({ size = 24, ...props }: IconProps) {
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
      {/* Arch structure */}
      <path d="M3 20v-8c0-5 4-9 9-9s9 4 9 9v8" />
      {/* Keystone */}
      <path d="M10 3l2-1 2 1v4l-2 1-2-1V3z" fill="currentColor" fillOpacity="0.2" />
      <path d="M10 3l2-1 2 1v4l-2 1-2-1V3z" />
      {/* Foundation blocks */}
      <rect x="3" y="17" width="4" height="3" fill="none" />
      <rect x="17" y="17" width="4" height="3" fill="none" />
      {/* Center support */}
      <path d="M12 8v9" strokeOpacity="0.4" />
    </svg>
  )
}
