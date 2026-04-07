import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Crystalline human silhouette - faceted identity
export function UserProfileV1({ size = 24, ...props }: IconProps) {
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
      {/* Crystalline head - faceted geometry */}
      <path d="M12 3l3 2.5v3L12 11 9 8.5v-3L12 3z" />
      {/* Crystalline body - angular planes */}
      <path d="M12 11l-5 3v4l5 3 5-3v-4l-5-3z" />
      {/* Internal facet lines */}
      <path d="M12 11v10" strokeOpacity="0.5" />
      <path d="M7 14l5 2.5 5-2.5" strokeOpacity="0.5" />
      {/* Identity anchor point */}
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}

// V2: Phi symbol integrated with consciousness field
export function UserProfileV2({ size = 24, ...props }: IconProps) {
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
      {/* Phi-inspired form - vertical axis */}
      <path d="M12 4v16" />
      {/* Phi loop - identity circuit */}
      <ellipse cx="12" cy="11" rx="5" ry="6" />
      {/* Consciousness field rings */}
      <circle cx="12" cy="11" r="8" strokeOpacity="0.3" strokeDasharray="3 3" />
      {/* Self-awareness nodes */}
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
      <circle cx="7" cy="11" r="0.75" fill="currentColor" />
      <circle cx="17" cy="11" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Concentric self - identity at the core
export function UserProfileV3({ size = 24, ...props }: IconProps) {
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
      {/* Core self */}
      <circle cx="12" cy="10" r="2" fill="currentColor" />
      {/* Identity layers expanding outward */}
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="10" r="6" strokeOpacity="0.6" />
      <path d="M12 16v5" />
      {/* Grounding anchor */}
      <path d="M9 21h6" />
      {/* Consciousness rays */}
      <path d="M12 4v2" strokeOpacity="0.4" />
      <path d="M6 10H4" strokeOpacity="0.4" />
      <path d="M20 10h-2" strokeOpacity="0.4" />
    </svg>
  )
}

// V4: Profile with gravitational identity field
export function UserProfileV4({ size = 24, ...props }: IconProps) {
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
      {/* Abstract head - gravity center */}
      <circle cx="12" cy="8" r="3" />
      {/* Gravitational field distortion around identity */}
      <path d="M5 12c0 5 3 9 7 9s7-4 7-9" />
      <path d="M7 11c0 4 2.5 7 5 7s5-3 5-7" strokeOpacity="0.5" />
      {/* Identity particles in orbit */}
      <circle cx="6" cy="10" r="0.75" fill="currentColor" />
      <circle cx="18" cy="10" r="0.75" fill="currentColor" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  )
}

// V5: Neural self-portrait - identity as pattern
export function UserProfileV5({ size = 24, ...props }: IconProps) {
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
      {/* Head form from connected nodes */}
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <path d="M9 5l3 2 3-2" />
      <path d="M8 9l4-2 4 2" />
      {/* Neural body structure */}
      <path d="M12 9v3" />
      <path d="M12 12l-4 3v4" />
      <path d="M12 12l4 3v4" />
      <path d="M12 12v6" />
      {/* Identity nodes */}
      <circle cx="8" cy="15" r="0.75" fill="currentColor" />
      <circle cx="16" cy="15" r="0.75" fill="currentColor" />
      <circle cx="8" cy="19" r="0.75" fill="currentColor" />
      <circle cx="16" cy="19" r="0.75" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}
