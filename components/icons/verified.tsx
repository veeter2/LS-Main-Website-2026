import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Locked sealed node
export function VerifiedV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.2" />
      <path d="M8 12l3 3 5-6" strokeWidth="2" />
    </svg>
  )
}

// V2: Shield with check
export function VerifiedV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3l9 4v5c0 5-3.5 9.7-9 11-5.5-1.3-9-6-9-11V7l9-4z" fill="currentColor" opacity="0.1" />
      <path d="M12 3l9 4v5c0 5-3.5 9.7-9 11-5.5-1.3-9-6-9-11V7l9-4z" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  )
}

// V3: Stamp of approval
export function VerifiedV3({ size = 24, ...props }: IconProps) {
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
      <polygon
        points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.8 5.8,21 7,14 2,9.3 9,8.5"
        fill="currentColor"
        opacity="0.2"
      />
      <polygon points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.8 5.8,21 7,14 2,9.3 9,8.5" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
