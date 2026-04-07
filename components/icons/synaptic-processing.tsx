import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Active neural nodes with connections
export function SynapticProcessingV1({ size = 24, ...props }: IconProps) {
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
      {/* Neural nodes */}
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="12" r="2.5" />
      {/* Synaptic connections */}
      <path d="M7.5 7.5l3 3" />
      <path d="M16.5 7.5l-3 3" />
      <path d="M7.5 16.5l3-3" />
      <path d="M16.5 16.5l-3-3" />
      {/* Activity pulses */}
      <circle cx="9" cy="9" r="0.75" fill="currentColor" />
      <circle cx="15" cy="9" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V2: Signal transmission
export function SynapticProcessingV2({ size = 24, ...props }: IconProps) {
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
      {/* Pre-synaptic */}
      <circle cx="5" cy="12" r="3" />
      {/* Post-synaptic */}
      <circle cx="19" cy="12" r="3" />
      {/* Synaptic gap */}
      <path d="M8 12h8" strokeDasharray="2 1" strokeOpacity="0.5" />
      {/* Neurotransmitters in transit */}
      <circle cx="10" cy="12" r="0.75" fill="currentColor" />
      <circle cx="12" cy="11" r="0.75" fill="currentColor" fillOpacity="0.7" />
      <circle cx="12" cy="13" r="0.75" fill="currentColor" fillOpacity="0.7" />
      <circle cx="14" cy="12" r="0.75" fill="currentColor" fillOpacity="0.5" />
      {/* Activity indicator */}
      <path d="M5 8v-2" strokeOpacity="0.5" />
      <path d="M3 9l-1-1" strokeOpacity="0.4" />
      <path d="M7 9l1-1" strokeOpacity="0.4" />
    </svg>
  )
}

// V3: Network activation spreading
export function SynapticProcessingV3({ size = 24, ...props }: IconProps) {
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
      {/* Central activated node */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {/* Spreading activation */}
      <circle cx="5" cy="8" r="1.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="19" cy="8" r="1.5" fill="currentColor" fillOpacity="0.5" />
      <circle cx="5" cy="16" r="1.5" fill="currentColor" fillOpacity="0.6" />
      <circle cx="19" cy="16" r="1.5" fill="currentColor" fillOpacity="0.4" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" fillOpacity="0.3" />
      {/* Activation paths */}
      <path d="M10.5 10.5l-4-2" strokeOpacity="0.6" />
      <path d="M13.5 10.5l4-2" strokeOpacity="0.5" />
      <path d="M10.5 13.5l-4 2" strokeOpacity="0.5" />
      <path d="M13.5 13.5l4 2" strokeOpacity="0.4" />
      <path d="M12 10v-4" strokeOpacity="0.3" />
      <path d="M12 14v4" strokeOpacity="0.3" />
    </svg>
  )
}
