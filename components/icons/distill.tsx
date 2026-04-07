import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Funnel with droplet emerging
export function DistillV1({ size = 24, ...props }: IconProps) {
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
      {/* Funnel top */}
      <path d="M4 3h16" />
      <path d="M4 3l5 8h6l5-8" />
      {/* Funnel neck */}
      <path d="M9 11v4" />
      <path d="M15 11v4" />
      {/* Droplet - essence */}
      <path d="M12 17c-2 2-2 4 0 5s2-3 0-5z" fill="currentColor" fillOpacity="0.3" />
      <path d="M12 17c-2 2-2 4 0 5s2-3 0-5z" />
      {/* Input particles */}
      <circle cx="6" cy="5" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="10" cy="4" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="14" cy="5" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="18" cy="4" r="0.75" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

// V2: Compression to core
export function DistillV2({ size = 24, ...props }: IconProps) {
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
      {/* Outer chaos */}
      <circle cx="4" cy="4" r="1" strokeOpacity="0.3" />
      <circle cx="20" cy="4" r="1" strokeOpacity="0.3" />
      <circle cx="4" cy="20" r="1" strokeOpacity="0.3" />
      <circle cx="20" cy="20" r="1" strokeOpacity="0.3" />
      <circle cx="7" cy="8" r="1" strokeOpacity="0.5" />
      <circle cx="17" cy="8" r="1" strokeOpacity="0.5" />
      <circle cx="7" cy="16" r="1" strokeOpacity="0.5" />
      <circle cx="17" cy="16" r="1" strokeOpacity="0.5" />
      {/* Compression arrows */}
      <path d="M5 5l4 4" strokeOpacity="0.4" />
      <path d="M19 5l-4 4" strokeOpacity="0.4" />
      <path d="M5 19l4-4" strokeOpacity="0.4" />
      <path d="M19 19l-4-4" strokeOpacity="0.4" />
      {/* Distilled core */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  )
}

// V3: Filter refinement
export function DistillV3({ size = 24, ...props }: IconProps) {
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
      {/* Filter layers */}
      <path d="M4 4h16" />
      <path d="M6 4v3l4 4v9l4 0v-9l4-4V4" />
      {/* Particles being filtered */}
      <circle cx="7" cy="6" r="0.75" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="5" r="0.75" fill="currentColor" fillOpacity="0.4" />
      <circle cx="17" cy="6" r="0.75" fill="currentColor" fillOpacity="0.3" />
      <circle cx="10" cy="9" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="14" cy="8" r="0.75" fill="currentColor" fillOpacity="0.5" />
      {/* Pure output */}
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}
