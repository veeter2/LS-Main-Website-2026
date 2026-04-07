import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural overlay on data visualization
export function AnalyticsV1({ size = 24, ...props }: IconProps) {
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
      {/* Base chart bars */}
      <path d="M4 20V14" />
      <path d="M9 20V10" />
      <path d="M14 20V6" />
      <path d="M19 20V12" />
      {/* Neural wave overlay */}
      <path d="M4 14c2-2 3 1 5-4s3 2 5-8c2 6 3 2 5 6" strokeOpacity="0.6" />
      {/* Insight nodes */}
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="6" r="1.25" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V2: Circular consciousness gauge
export function AnalyticsV2({ size = 24, ...props }: IconProps) {
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
      {/* Gauge arc */}
      <path d="M5 17A8 8 0 0 1 12 4a8 8 0 0 1 7 13" />
      {/* EEG pattern inside */}
      <path d="M7 14l2-3 2 4 2-5 2 3 2-2" />
      {/* Gauge needle */}
      <path d="M12 12l3-5" />
      {/* Center hub */}
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
      {/* Tick marks */}
      <circle cx="5" cy="12" r="0.5" fill="currentColor" />
      <circle cx="19" cy="12" r="0.5" fill="currentColor" />
      <circle cx="12" cy="4" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Dendritic data bars
export function AnalyticsV3({ size = 24, ...props }: IconProps) {
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
      {/* Branching bars like dendrites */}
      <path d="M6 20V12l-2-2" />
      <path d="M6 12l2-2" />
      <path d="M10 20V8l-2-3" />
      <path d="M10 8l2-2" />
      <path d="M14 20V5l-2-2" />
      <path d="M14 5l2-2" />
      <path d="M18 20V10l2-3" />
      {/* Synaptic terminals */}
      <circle cx="4" cy="10" r="0.75" fill="currentColor" />
      <circle cx="8" cy="10" r="0.75" fill="currentColor" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
      <circle cx="12" cy="6" r="0.75" fill="currentColor" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
      <circle cx="16" cy="3" r="0.75" fill="currentColor" />
      <circle cx="20" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}
