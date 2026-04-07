import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Domino effect chain
export function CascadeV1({ size = 24, ...props }: IconProps) {
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
      {/* Fallen dominoes */}
      <rect x="2" y="14" width="2" height="6" rx="0.5" transform="rotate(-60 3 17)" />
      <rect x="6" y="13" width="2" height="6" rx="0.5" transform="rotate(-45 7 16)" />
      <rect x="10" y="12" width="2" height="6" rx="0.5" transform="rotate(-30 11 15)" />
      {/* Falling domino */}
      <rect x="14" y="11" width="2" height="6" rx="0.5" transform="rotate(-15 15 14)" />
      {/* Standing domino */}
      <rect x="18" y="10" width="2" height="8" rx="0.5" />
      {/* Impact lines */}
      <path d="M4 10l1 1" strokeOpacity="0.4" />
      <path d="M8 9l1 1" strokeOpacity="0.5" />
      <path d="M12 8l1 1" strokeOpacity="0.6" />
    </svg>
  )
}

// V2: Waterfall cascade
export function CascadeV2({ size = 24, ...props }: IconProps) {
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
      {/* Stepped platforms */}
      <path d="M4 6h5" />
      <path d="M9 6v4h5" />
      <path d="M14 10v4h5" />
      <path d="M19 14v6" />
      {/* Water flow */}
      <path d="M6 6c0 2-1 3-1 4" strokeOpacity="0.6" />
      <path d="M8 6c0 3-2 4-2 6s0 4 0 4" strokeOpacity="0.7" />
      <path d="M11 10c0 2-1 3-1 4" strokeOpacity="0.6" />
      <path d="M13 10c0 3-2 4-2 6s0 4 0 4" strokeOpacity="0.7" />
      <path d="M16 14c0 2-1 3-1 4s0 2 0 2" strokeOpacity="0.8" />
    </svg>
  )
}

// V3: Neural cascade activation
export function CascadeV3({ size = 24, ...props }: IconProps) {
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
      {/* Initial trigger */}
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      {/* Cascade nodes */}
      <circle cx="9" cy="7" r="1.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="9" cy="17" r="1.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="14" cy="5" r="1.25" fill="currentColor" fillOpacity="0.6" />
      <circle cx="14" cy="12" r="1.25" fill="currentColor" fillOpacity="0.6" />
      <circle cx="14" cy="19" r="1.25" fill="currentColor" fillOpacity="0.6" />
      <circle cx="19" cy="8" r="1" fill="currentColor" fillOpacity="0.4" />
      <circle cx="19" cy="16" r="1" fill="currentColor" fillOpacity="0.4" />
      {/* Connection paths */}
      <path d="M6 11l2-3" strokeOpacity="0.6" />
      <path d="M6 13l2 3" strokeOpacity="0.6" />
      <path d="M10.5 6.5l2.5-1" strokeOpacity="0.5" />
      <path d="M10.5 8l2.5 3" strokeOpacity="0.5" />
      <path d="M10.5 16l2.5-3" strokeOpacity="0.5" />
      <path d="M10.5 17.5l2.5 1" strokeOpacity="0.5" />
      <path d="M15.5 5.5l2.5 2" strokeOpacity="0.4" />
      <path d="M15.5 18.5l2.5-2" strokeOpacity="0.4" />
    </svg>
  )
}
