import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural receiver - waveform capture device
export function MicrophoneV1({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0014 0" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <path d="M12 6v3" opacity="0.5" />
      <circle cx="12" cy="6" r="0.75" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// V2: Resonance capture - frequency sensitive receptor
export function MicrophoneV2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M6 10a6 6 0 0012 0" />
      <path d="M12 16v5" />
      <path d="M4 10a8 8 0 008 8" opacity="0.4" />
      <path d="M20 10a8 8 0 01-8 8" opacity="0.4" />
      <path d="M10 7h4" opacity="0.5" />
      <path d="M10 10h4" opacity="0.5" />
    </svg>
  )
}

// V3: Voice consciousness - speaking neural interface
export function MicrophoneV3({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z" />
      <path d="M19 10v1a7 7 0 01-14 0v-1" />
      <path d="M12 18v3" />
      <circle cx="12" cy="21" r="1" fill="currentColor" />
      <path d="M3 10c0 0 1-2 2-2" opacity="0.4" />
      <path d="M21 10c0 0-1-2-2-2" opacity="0.4" />
    </svg>
  )
}
