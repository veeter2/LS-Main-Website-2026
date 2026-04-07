import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Bell with neural wave emanating
export function NotificationsV1({ size = 24, ...props }: IconProps) {
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
      {/* Bell form */}
      <path d="M12 5c-3 0-5 2-5 5v4l-2 2h14l-2-2v-4c0-3-2-5-5-5z" />
      <path d="M10 18c0 1 1 2 2 2s2-1 2-2" />
      {/* Neural waves emanating */}
      <path d="M17 8c1-1 2-1 3 0" strokeOpacity="0.6" />
      <path d="M18 6c1-1 2.5-1 3.5 0" strokeOpacity="0.3" />
      {/* Alert indicator */}
      <circle cx="12" cy="5" r="1" fill="currentColor" />
    </svg>
  )
}

// V2: EEG spike - pattern detected
export function NotificationsV2({ size = 24, ...props }: IconProps) {
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
      {/* Baseline */}
      <path d="M3 12h5l2-6 2 12 2-8 2 4h5" />
      {/* Alert circle */}
      <circle cx="12" cy="8" r="4" strokeOpacity="0.5" />
      <circle cx="12" cy="8" r="2" strokeOpacity="0.3" />
      {/* Peak node */}
      <circle cx="10" cy="6" r="1.5" fill="currentColor" />
      {/* Baseline nodes */}
      <circle cx="3" cy="12" r="0.5" fill="currentColor" />
      <circle cx="21" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}

// V3: Attention burst with direction
export function NotificationsV3({ size = 24, ...props }: IconProps) {
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
      {/* Central alert */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Directed attention rays */}
      <path d="M12 9V4" />
      <path d="M15 10l3-3" />
      <path d="M17 13h4" />
      {/* Softer ambient rays */}
      <path d="M9 10l-2-2" strokeOpacity="0.4" />
      <path d="M7 13H5" strokeOpacity="0.4" />
      <path d="M9 15l-2 2" strokeOpacity="0.4" />
      <path d="M12 15v2" strokeOpacity="0.4" />
      {/* Primary attention nodes */}
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="18" cy="7" r="0.75" fill="currentColor" />
      <circle cx="21" cy="13" r="0.75" fill="currentColor" />
    </svg>
  )
}
