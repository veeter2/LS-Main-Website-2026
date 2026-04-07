import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Film strip with key frames
export function EpisodicMemoryV1({ size = 24, ...props }: IconProps) {
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
      <rect x="2" y="6" width="20" height="12" rx="1" />
      <line x1="2" y1="10" x2="22" y2="10" opacity="0.4" />
      <line x1="2" y1="14" x2="22" y2="14" opacity="0.4" />
      <circle cx="6" cy="8" r="0.75" fill="currentColor" />
      <circle cx="10" cy="8" r="0.75" fill="currentColor" />
      <circle cx="14" cy="8" r="0.75" fill="currentColor" />
      <circle cx="18" cy="8" r="0.75" fill="currentColor" />
      <circle cx="6" cy="16" r="0.75" fill="currentColor" />
      <circle cx="10" cy="16" r="0.75" fill="currentColor" />
      <circle cx="14" cy="16" r="0.75" fill="currentColor" />
      <circle cx="18" cy="16" r="0.75" fill="currentColor" />
      <rect x="7" y="10" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// V2: Timeline with moment markers
export function EpisodicMemoryV2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 12h18" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 10v-4" opacity="0.5" />
      <path d="M12 9.5v-5" />
      <path d="M18 10v-3" opacity="0.5" />
      <circle cx="6" cy="5" r="1" opacity="0.4" />
      <circle cx="12" cy="3.5" r="1.5" fill="currentColor" />
      <circle cx="18" cy="6" r="1" opacity="0.4" />
    </svg>
  )
}

// V3: Snapshot/polaroid moments
export function EpisodicMemoryV3({ size = 24, ...props }: IconProps) {
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
      <rect x="3" y="5" width="10" height="12" rx="1" />
      <rect x="5" y="7" width="6" height="6" rx="0.5" opacity="0.3" />
      <rect x="11" y="7" width="10" height="12" rx="1" />
      <rect x="13" y="9" width="6" height="6" rx="0.5" fill="currentColor" opacity="0.3" />
      <line x1="5" y1="15" x2="11" y2="15" opacity="0.5" />
      <line x1="13" y1="17" x2="19" y2="17" opacity="0.5" />
    </svg>
  )
}
