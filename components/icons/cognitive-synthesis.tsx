import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: EEG waveforms converging to synthesis point
export function CognitiveSynthesisV1({ size = 24, ...props }: IconProps) {
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
      {/* Top waveform converging */}
      <path d="M3 8c1-2 2 2 3 0s2-2 3 0l3 4" />
      {/* Bottom waveform converging */}
      <path d="M3 16c1 2 2-2 3 0s2 2 3 0l3-4" />
      {/* Synthesis point */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {/* Output stream */}
      <path d="M14 12h4" />
      <path d="M18 12l2-2" />
      <path d="M18 12l2 2" />
    </svg>
  )
}

// V2: Multiple thought streams merging into one
export function CognitiveSynthesisV2({ size = 24, ...props }: IconProps) {
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
      {/* Converging thought streams */}
      <path d="M4 5c3 0 5 3 8 7" />
      <path d="M4 12h8" />
      <path d="M4 19c3 0 5-3 8-7" />
      {/* Central synthesis node */}
      <circle cx="12" cy="12" r="2.5" />
      {/* Unified output */}
      <path d="M14.5 12h5" />
      <circle cx="20" cy="12" r="1" fill="currentColor" />
      {/* Input nodes */}
      <circle cx="4" cy="5" r="0.75" fill="currentColor" />
      <circle cx="4" cy="12" r="0.75" fill="currentColor" />
      <circle cx="4" cy="19" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Ripple interference pattern
export function CognitiveSynthesisV3({ size = 24, ...props }: IconProps) {
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
      {/* Left ripple source */}
      <circle cx="7" cy="12" r="1" fill="currentColor" />
      <path d="M7 12a3 3 0 0 1 3 0" strokeOpacity="0.8" />
      <path d="M7 12a5 5 0 0 1 5 0" strokeOpacity="0.5" />
      {/* Right ripple source */}
      <circle cx="17" cy="12" r="1" fill="currentColor" />
      <path d="M17 12a3 3 0 0 0-3 0" strokeOpacity="0.8" />
      <path d="M17 12a5 5 0 0 0-5 0" strokeOpacity="0.5" />
      {/* Interference/synthesis center */}
      <circle cx="12" cy="12" r="2" />
      {/* Vertical interference lines */}
      <path d="M12 6v2" strokeOpacity="0.6" />
      <path d="M12 16v2" strokeOpacity="0.6" />
    </svg>
  )
}

// V4: Neural pathway convergence
export function CognitiveSynthesisV4({ size = 24, ...props }: IconProps) {
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
      {/* Curved converging paths */}
      <path d="M4 4q4 4 8 8" />
      <path d="M4 20q4-4 8-8" />
      <path d="M12 4q0 4 0 8" />
      {/* Central synthesis hub */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Output path */}
      <path d="M15 12q3 0 5 0" />
      {/* Input nodes */}
      <circle cx="4" cy="4" r="1" fill="currentColor" />
      <circle cx="4" cy="20" r="1" fill="currentColor" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
    </svg>
  )
}

// V5: Helix streams merging
export function CognitiveSynthesisV5({ size = 24, ...props }: IconProps) {
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
      {/* Double helix approaching center */}
      <path d="M4 6c2 2 4-2 6 0s2 4 2 6" />
      <path d="M4 18c2-2 4 2 6 0s2-4 2-6" />
      {/* Synthesis point */}
      <circle cx="12" cy="12" r="2.5" />
      {/* Unified strand emerging */}
      <path d="M14.5 12c1.5 0 3-1 4-2" />
      <path d="M14.5 12c1.5 0 3 1 4 2" />
      <circle cx="18.5" cy="10" r="0.75" fill="currentColor" />
      <circle cx="18.5" cy="14" r="0.75" fill="currentColor" />
    </svg>
  )
}
