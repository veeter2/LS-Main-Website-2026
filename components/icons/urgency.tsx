import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Compressed accelerating spiral
export function UrgencyV1({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12c0-3 1-5 3-7" />
      <path d="M12 12c2 1 4 1 7 0" />
      <path d="M12 12c1 2 1 4 0 7" />
      <path d="M12 12c-2 0-5-1-7-3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 2v2" strokeWidth="2" />
      <path d="M12 2l-1 3" opacity="0.5" />
      <path d="M12 2l1 3" opacity="0.5" />
    </svg>
  )
}

// V2: Converging arrows with speed lines
export function UrgencyV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4v6" strokeWidth="2" />
      <path d="M12 4l-2 2" />
      <path d="M12 4l2 2" />
      <circle cx="12" cy="14" r="3" />
      <path d="M6 8l4 4" opacity="0.6" />
      <path d="M18 8l-4 4" opacity="0.6" />
      <path d="M4 12h3" opacity="0.4" />
      <path d="M17 12h3" opacity="0.4" />
      <path d="M12 18v3" opacity="0.3" />
    </svg>
  )
}

// V3: Tightening coil
export function UrgencyV3({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2c5.5 0 10 2 10 5s-4.5 5-10 5" />
      <path d="M12 12c-4 0-7 1.5-7 3.5s3 3.5 7 3.5" opacity="0.7" />
      <path d="M12 19c2.5 0 4.5 0.8 4.5 2s-2 2-4.5 2" opacity="0.4" />
      <circle cx="12" cy="21" r="1" fill="currentColor" />
    </svg>
  )
}
