import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Circle with dotted void center
export function BlindSpotV1({ size = 24, ...props }: IconProps) {
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
      {/* Outer awareness ring */}
      <circle cx="12" cy="12" r="9" />
      {/* Dotted void - the blind spot */}
      <circle cx="12" cy="12" r="4" strokeDasharray="2 2" strokeOpacity="0.4" />
      {/* Question essence */}
      <path d="M11 10c0-1 1-2 2-2s2 1 1.5 2-1.5 1-1.5 2" strokeOpacity="0.5" />
      <circle cx="12" cy="15" r="0.5" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

// V2: Eclipse - partial obstruction
export function BlindSpotV2({ size = 24, ...props }: IconProps) {
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
      {/* Full circle - awareness */}
      <circle cx="12" cy="12" r="8" />
      {/* Obscuring element */}
      <circle cx="15" cy="12" r="6" fill="currentColor" fillOpacity="0.1" />
      <path d="M13 6.5a8 8 0 010 11" strokeWidth="2" />
      {/* Light rays being blocked */}
      <path d="M3 12h3" strokeOpacity="0.3" />
      <path d="M5 8l2.5 1.5" strokeOpacity="0.3" />
      <path d="M5 16l2.5-1.5" strokeOpacity="0.3" />
    </svg>
  )
}

// V3: Fragmented perception
export function BlindSpotV3({ size = 24, ...props }: IconProps) {
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
      {/* Broken circle segments */}
      <path d="M12 3a9 9 0 014.5 1" />
      <path d="M19 7a9 9 0 012 5" />
      <path d="M21 14a9 9 0 01-3 5" />
      <path d="M15 20a9 9 0 01-6 0" />
      <path d="M6 18a9 9 0 01-3-6" />
      <path d="M3 10a9 9 0 013-5" />
      <path d="M8 4a9 9 0 012-1" />
      {/* Central void */}
      <circle cx="12" cy="12" r="3" strokeDasharray="1 3" strokeOpacity="0.3" />
    </svg>
  )
}
