import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Stylized neuron with asymmetric dendrites
export function CortexV1({ size = 24, ...props }: IconProps) {
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
      {/* Soma (cell body) */}
      <circle cx="12" cy="12" r="3" />
      {/* Dendrites - asymmetric, organic */}
      <path d="M9 10c-2-1-4 0-5-2" />
      <path d="M9 12c-3 0-5 1-6 0" />
      <path d="M9 14c-2 1-3 3-5 3" />
      <path d="M10 9c-1-2 0-4-1-5" />
      {/* Axon with terminal */}
      <path d="M15 12h4" />
      <path d="M19 12l1-2" />
      <path d="M19 12l1 2" />
      <path d="M19 12l2 0" />
      {/* Synaptic terminals */}
      <circle cx="20" cy="10" r="0.5" fill="currentColor" />
      <circle cx="20" cy="14" r="0.5" fill="currentColor" />
      <circle cx="21" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}

// V2: Radial synaptic burst from central soma
export function CortexV2({ size = 24, ...props }: IconProps) {
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
      {/* Central soma */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Radiating dendrites with varying lengths */}
      <path d="M12 9V4" />
      <path d="M12 20v-5" />
      <path d="M9 12H4" />
      <path d="M20 12h-5" />
      <path d="M9.5 9.5L6 6" />
      <path d="M18 18l-3.5-3.5" />
      <path d="M14.5 9.5L17 7" />
      <path d="M7 17l2.5-2.5" />
      {/* Terminal nodes */}
      <circle cx="12" cy="4" r="0.75" fill="currentColor" />
      <circle cx="12" cy="20" r="0.75" fill="currentColor" />
      <circle cx="4" cy="12" r="0.75" fill="currentColor" />
      <circle cx="20" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Abstract brain region with neural pathways
export function CortexV3({ size = 24, ...props }: IconProps) {
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
      {/* Brain-like outline - abstract, not literal */}
      <path d="M12 4c-4 0-7 3-7 7 0 2 1 4 2 5l1 4h8l1-4c1-1 2-3 2-5 0-4-3-7-7-7z" />
      {/* Internal neural pathways */}
      <path d="M9 8c0 2 1 3 3 4s3 2 3 4" strokeDasharray="2 1" />
      <path d="M15 8c0 2-1 3-3 4s-3 2-3 4" strokeDasharray="2 1" />
      {/* Active processing nodes */}
      <circle cx="9" cy="8" r="1" fill="currentColor" />
      <circle cx="15" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V4: Branching dendritic tree
export function CortexV4({ size = 24, ...props }: IconProps) {
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
      {/* Central trunk */}
      <path d="M12 20v-8" />
      {/* Primary branches */}
      <path d="M12 12c-2-2-4-1-6-3" />
      <path d="M12 12c2-2 4-1 6-3" />
      {/* Secondary branches */}
      <path d="M8 10c-1-1-2 0-3-1" />
      <path d="M6 9c0-2-1-3-2-4" />
      <path d="M16 10c1-1 2 0 3-1" />
      <path d="M18 9c0-2 1-3 2-4" />
      {/* Soma at base */}
      <circle cx="12" cy="20" r="2" />
      {/* Terminal boutons */}
      <circle cx="4" cy="5" r="0.75" fill="currentColor" />
      <circle cx="5" cy="8" r="0.75" fill="currentColor" />
      <circle cx="19" cy="8" r="0.75" fill="currentColor" />
      <circle cx="20" cy="5" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V5: Pulsing neural network cluster
export function CortexV5({ size = 24, ...props }: IconProps) {
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
      {/* Central processing cluster */}
      <circle cx="12" cy="12" r="2.5" />
      {/* Synaptic connections - some active */}
      <path d="M9.5 12H6" />
      <path d="M18 12h-3.5" />
      <path d="M12 9.5V6" />
      <path d="M12 18v-3.5" />
      {/* Diagonal connections */}
      <path d="M10 10L7 7" />
      <path d="M17 7l-3 3" />
      <path d="M14 14l3 3" />
      <path d="M7 17l3-3" />
      {/* Processing nodes - varying sizes show activity */}
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="6" r="1" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="17" cy="7" r="1" />
      <circle cx="17" cy="17" r="1" fill="currentColor" />
      <circle cx="7" cy="17" r="1" />
    </svg>
  )
}
