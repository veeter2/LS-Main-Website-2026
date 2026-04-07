import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Zen ripples - concentric calm
export function SettingsV1({ size = 24, ...props }: IconProps) {
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
      {/* Concentric ripples */}
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="12" r="5" strokeOpacity="0.8" />
      <circle cx="12" cy="12" r="8" strokeOpacity="0.5" />
      {/* Center point - stillness */}
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V2: Nested depth circles with calibration marks
export function SettingsV2({ size = 24, ...props }: IconProps) {
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
      {/* Nested circles - varying thickness */}
      <circle cx="12" cy="12" r="9" strokeWidth="1" />
      <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
      {/* Calibration marks */}
      <path d="M12 3v2" strokeWidth="1" />
      <path d="M12 19v2" strokeWidth="1" />
      <path d="M3 12h2" strokeWidth="1" />
      <path d="M19 12h2" strokeWidth="1" />
      {/* Center */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: Mandala-like balanced pattern
export function SettingsV3({ size = 24, ...props }: IconProps) {
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
      {/* Central stillness */}
      <circle cx="12" cy="12" r="2" />
      {/* Inner petal pattern */}
      <path d="M12 10c-1-2-1-4 0-6" />
      <path d="M12 14c1 2 1 4 0 6" />
      <path d="M10 12c-2 1-4 1-6 0" />
      <path d="M14 12c2-1 4-1 6 0" />
      {/* Diagonal balance */}
      <path d="M10 10c-1.5-1.5-3-2-4.5-2" />
      <path d="M14 14c1.5 1.5 3 2 4.5 2" />
      <path d="M14 10c1.5-1.5 3-2 4.5-2" />
      <path d="M10 14c-1.5 1.5-3 2-4.5 2" />
      {/* Center point */}
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V4: Delta wave visualization
export function SettingsV4({ size = 24, ...props }: IconProps) {
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
      {/* Slow delta wave pattern */}
      <path d="M4 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      {/* Surrounding calm circle */}
      <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
      {/* Adjustment nodes */}
      <circle cx="7" cy="9" r="1" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="17" cy="9" r="1" />
    </svg>
  )
}

// V5: Tuning fork / resonance
export function SettingsV5({ size = 24, ...props }: IconProps) {
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
      {/* Central axis */}
      <path d="M12 20v-8" />
      {/* Tuning prongs */}
      <path d="M12 12c-2 0-3-1-3-4V4" />
      <path d="M12 12c2 0 3-1 3-4V4" />
      {/* Resonance waves */}
      <path d="M6 7c0-2 1-3 3-3" strokeOpacity="0.5" />
      <path d="M18 7c0-2-1-3-3-3" strokeOpacity="0.5" />
      <path d="M5 9c0-3 2-5 4-5" strokeOpacity="0.3" />
      <path d="M19 9c0-3-2-5-4-5" strokeOpacity="0.3" />
      {/* Base node */}
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}
