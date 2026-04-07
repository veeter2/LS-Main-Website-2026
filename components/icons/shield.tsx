import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural barrier - protective consciousness field
export function ShieldV1({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" />
      <path d="M12 6v10" opacity="0.4" />
      <path d="M7 9h10" opacity="0.4" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  )
}

// V2: Warning shield - danger zone indicator
export function ShieldV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: Layered defense - multi-barrier protection
export function ShieldV3({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" />
      <path d="M12 5l5.5 2.75v4.13c0 3.78-2.61 7.36-5.5 8.25-2.89-.89-5.5-4.47-5.5-8.25V7.75L12 5z" opacity="0.5" />
      <path d="M12 8l3 1.5v2.25c0 2.06-1.42 4.01-3 4.5-1.58-.49-3-2.44-3-4.5V9.5l3-1.5z" opacity="0.3" />
    </svg>
  )
}
