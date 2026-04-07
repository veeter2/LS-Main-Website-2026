import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Submerged iceberg
export function ImplicitMemoryV1({ size = 24, ...props }: IconProps) {
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
      <line x1="2" y1="10" x2="22" y2="10" strokeDasharray="2 2" opacity="0.5" />
      <polygon points="12,4 16,10 14,10 14,10 10,10 10,10 8,10" />
      <polygon points="8,10 16,10 18,16 16,22 8,22 6,16" opacity="0.4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// V2: Hidden layer beneath surface
export function ImplicitMemoryV2({ size = 24, ...props }: IconProps) {
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
      <ellipse cx="12" cy="8" rx="8" ry="3" />
      <path d="M4 8v6c0 1.66 3.58 3 8 3s8-1.34 8-3V8" opacity="0.5" />
      <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" opacity="0.3" />
      <ellipse cx="12" cy="17" rx="4" ry="1.5" opacity="0.2" />
      <circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// V3: Faded/ghost pattern
export function ImplicitMemoryV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="8" strokeDasharray="4 2" opacity="0.4" />
      <circle cx="12" cy="12" r="5" strokeDasharray="3 2" opacity="0.6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 4v2" opacity="0.3" />
      <path d="M12 18v2" opacity="0.3" />
      <path d="M4 12h2" opacity="0.3" />
      <path d="M18 12h2" opacity="0.3" />
    </svg>
  )
}
