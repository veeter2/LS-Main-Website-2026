import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: EEG-style waveform
export function ConsciousnessWaveV1({ size = 24, ...props }: IconProps) {
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
      {/* Main consciousness wave */}
      <path d="M2 12c1-4 2-6 3 0s2 6 3 0 2-6 3 0 2 6 3 0 2-6 3 0 2 6 3 0" strokeWidth="2" />
      {/* Baseline */}
      <path d="M2 12h20" strokeOpacity="0.2" />
      {/* Activity peaks */}
      <circle cx="5" cy="8" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="11" cy="8" r="0.75" fill="currentColor" fillOpacity="0.5" />
      <circle cx="17" cy="8" r="0.75" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

// V2: Layered frequency bands
export function ConsciousnessWaveV2({ size = 24, ...props }: IconProps) {
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
      {/* Delta - slow */}
      <path d="M2 6c4 0 6 2 10 2s6-2 10-2" strokeOpacity="0.3" />
      {/* Theta */}
      <path d="M2 10c2 0 3 1 5 1s3-1 5-1 3 1 5 1 3-1 5-1" strokeOpacity="0.5" />
      {/* Alpha */}
      <path
        d="M2 14c1.5 0 2 0.5 3 0.5s1.5-0.5 3-0.5 1.5 0.5 3 0.5 1.5-0.5 3-0.5 1.5 0.5 3 0.5 1.5-0.5 3-0.5 1.5 0.5 3 0.5"
        strokeOpacity="0.7"
      />
      {/* Beta - fast */}
      <path d="M2 18c1 0 1 0.3 2 0.3s1-0.3 2-0.3 1 0.3 2 0.3 1-0.3 2-0.3 1 0.3 2 0.3 1-0.3 2-0.3 1 0.3 2 0.3 1-0.3 2-0.3 1 0.3 2 0.3 1-0.3 2-0.3" />
    </svg>
  )
}

// V3: Radial pulse wave
export function ConsciousnessWaveV3({ size = 24, ...props }: IconProps) {
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
      {/* Center point */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Expanding waves */}
      <circle cx="12" cy="12" r="4" strokeOpacity="0.8" />
      <circle cx="12" cy="12" r="6.5" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
      {/* Wave distortion - consciousness effect */}
      <path d="M3 12c1-1 1.5-2 2-2s1 1 2 2" strokeOpacity="0.4" />
      <path d="M17 12c1 1 1.5 2 2 2s1-1 2-2" strokeOpacity="0.4" />
    </svg>
  )
}
