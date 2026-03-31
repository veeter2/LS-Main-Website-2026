import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Starburst with varied ray lengths
export function InsightSparkV1({ size = 24, ...props }: IconProps) {
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
      {/* Core */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {/* Radiating rays - varied lengths */}
      <path d="M12 2v5" />
      <path d="M12 17v5" />
      <path d="M2 12h5" />
      <path d="M17 12h5" />
      <path d="M5.6 5.6l3.5 3.5" />
      <path d="M14.9 14.9l3.5 3.5" />
      <path d="M5.6 18.4l3.5-3.5" />
      <path d="M14.9 9.1l3.5-3.5" />
    </svg>
  )
}

// V2: Neural spark - synapse firing
export function InsightSparkV2({ size = 24, ...props }: IconProps) {
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
      {/* Synapse gap */}
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Electric discharge */}
      <path d="M12 3l-1 3 2-1-1 3" />
      <path d="M12 16l1 3-2-1 1 3" />
      <path d="M3 12l3-1-1 2 3-1" />
      <path d="M16 12l3 1-1-2 3 1" />
      {/* Particle scatter */}
      <circle cx="6" cy="6" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="18" cy="6" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="6" cy="18" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="18" cy="18" r="0.75" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

// V3: Crystalline revelation
export function InsightSparkV3({ size = 24, ...props }: IconProps) {
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
      {/* Diamond core */}
      <path d="M12 6l4 6-4 6-4-6 4-6z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 6l4 6-4 6-4-6 4-6z" />
      {/* Facet lines */}
      <path d="M12 6v12" strokeOpacity="0.5" />
      <path d="M8 12h8" strokeOpacity="0.5" />
      {/* Emanating light */}
      <path d="M12 2v2" strokeOpacity="0.6" />
      <path d="M12 20v2" strokeOpacity="0.6" />
      <path d="M4 12h2" strokeOpacity="0.6" />
      <path d="M18 12h2" strokeOpacity="0.6" />
      <path d="M6 6l1.5 1.5" strokeOpacity="0.4" />
      <path d="M16.5 16.5l1.5 1.5" strokeOpacity="0.4" />
      <path d="M6 18l1.5-1.5" strokeOpacity="0.4" />
      <path d="M16.5 7.5l1.5-1.5" strokeOpacity="0.4" />
    </svg>
  )
}
