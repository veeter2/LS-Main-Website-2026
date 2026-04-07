import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural fire - active synaptic intensity
export function HeatV1({ size = 24, ...props }: IconProps) {
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
      <path d="M12 21c-4 0-7-3-7-7 0-2 1-4 2.5-5.5C9 7 9.5 5 9 3c3 1.5 4 4 4 6 1-1 1.5-2 1.5-3 2.5 2 4 5 4 8 0 4-3 7-6.5 7z" />
      <path d="M12 21c-1.5 0-3-1.5-3-3.5 0-1 .5-2 1.5-2.5.5-.25.75-1 .5-1.5 1 .5 2 1.5 2 2.5.5-.5 1-1 1-1.5 1 1 1.5 2.5 1.5 4 0 1.5-1.5 2.5-3.5 2.5z" opacity="0.6" />
    </svg>
  )
}

// V2: Radiating intensity - thermal energy waves
export function HeatV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1" opacity="0.7" />
      <path d="M16.3 16.3l2.1 2.1" opacity="0.7" />
      <path d="M5.6 18.4l2.1-2.1" opacity="0.7" />
      <path d="M16.3 7.7l2.1-2.1" opacity="0.7" />
    </svg>
  )
}

// V3: Pulse intensity - heartbeat of activity
export function HeatV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="9" opacity="0.2" />
      <circle cx="12" cy="12" r="6" opacity="0.4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
