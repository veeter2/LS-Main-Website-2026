import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Multiple sources pointing to node
export function CorroboratedV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="4" cy="4" r="2" />
      <circle cx="20" cy="4" r="2" />
      <circle cx="4" cy="20" r="2" />
      <circle cx="20" cy="20" r="2" />
      <line x1="5.5" y1="5.5" x2="10" y2="10" />
      <line x1="18.5" y1="5.5" x2="14" y2="10" />
      <line x1="5.5" y1="18.5" x2="10" y2="14" />
      <line x1="18.5" y1="18.5" x2="14" y2="14" />
    </svg>
  )
}

// V2: Triangulated confirmation
export function CorroboratedV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <line x1="6.5" y1="16.5" x2="10.5" y2="13" />
      <line x1="17.5" y1="16.5" x2="13.5" y2="13" />
      <polygon points="12,4 5,18 19,18" fill="none" opacity="0.3" />
    </svg>
  )
}

// V3: Stacked confirmations
export function CorroboratedV3({ size = 24, ...props }: IconProps) {
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
      <path d="M8 15l3 3 5-6" />
      <path d="M8 11l3 3 5-6" opacity="0.5" />
      <path d="M8 7l3 3 5-6" opacity="0.3" />
      <circle cx="17" cy="6" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="17" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="17" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )
}
