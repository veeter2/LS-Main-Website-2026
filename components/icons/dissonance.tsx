import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Interfering waves creating chaos
export function DissonanceV1({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8c3 0 3 8 6 8s3-8 6-8" />
      <path d="M10 16c3 0 3-8 6-8s3 8 6 8" />
      <path d="M8 11l2 2-2 2" opacity="0.5" />
      <path d="M16 11l-2 2 2 2" opacity="0.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// V2: Jagged interference pattern
export function DissonanceV2({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12l3-4 2 6 3-8 2 10 3-7 2 5 3-4 2 2" />
      <path d="M4 17l4-3 4 2 4-4 4 3" opacity="0.4" />
      <line x1="7" y1="6" x2="9" y2="8" opacity="0.3" />
      <line x1="15" y1="5" x2="17" y2="7" opacity="0.3" />
    </svg>
  )
}

// V3: Broken/fractured circles
export function DissonanceV3({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2a10 10 0 0 1 7 3" />
      <path d="M21 9a10 10 0 0 1-1 7" />
      <path d="M16 20a10 10 0 0 1-8 0" />
      <path d="M4 15a10 10 0 0 1 0-8" />
      <path d="M8 4a10 10 0 0 1 2-1" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>
  )
}
