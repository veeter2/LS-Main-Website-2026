import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Cognitive funnel - selective attention filter
export function FilterV1({ size = 24, ...props }: IconProps) {
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
      <path d="M3 4h18l-7 8.5V18l-4 2v-7.5L3 4z" />
      <circle cx="7" cy="7" r="0.75" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="7" r="0.75" fill="currentColor" opacity="0.5" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="14" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V2: Signal separation - frequency filtering
export function FilterV2({ size = 24, ...props }: IconProps) {
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
      <path d="M4 4l6.5 7.5v7l3 1.5v-8.5L20 4H4z" />
      <path d="M4 4h16" strokeWidth={2} />
      <path d="M6.5 7h11" opacity="0.6" />
      <path d="M9 10h6" opacity="0.4" />
    </svg>
  )
}

// V3: Layered sieve - multi-stage filtering
export function FilterV3({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4h20" />
      <path d="M5 4l4 5h6l4-5" opacity="0.8" />
      <path d="M5 9h14" />
      <path d="M7 9l3 4h4l3-4" opacity="0.6" />
      <path d="M7 13h10" />
      <path d="M9 13l2 4h2l2-4" opacity="0.4" />
      <path d="M9 17h6" />
      <path d="M12 17v4" />
      <circle cx="12" cy="21" r="1" fill="currentColor" />
    </svg>
  )
}
