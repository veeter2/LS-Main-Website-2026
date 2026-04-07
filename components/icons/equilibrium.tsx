import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Perfectly balanced orbital system
export function EquilibriumV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V2: Yin-yang inspired balance
export function EquilibriumV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20" />
      <path d="M12 2c-2.5 0-5 2.5-5 5s2.5 5 5 5" />
      <path d="M12 22c2.5 0 5-2.5 5-5s-2.5-5-5-5" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="12" cy="17" r="1.5" />
    </svg>
  )
}

// V3: Balanced scale/fulcrum
export function EquilibriumV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="5" r="2" />
      <line x1="12" y1="7" x2="12" y2="10" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="M4 12l2 6h4l-2-6" />
      <path d="M20 12l-2 6h-4l2-6" />
      <circle cx="7" cy="18" r="0.75" fill="currentColor" />
      <circle cx="17" cy="18" r="0.75" fill="currentColor" />
    </svg>
  )
}
