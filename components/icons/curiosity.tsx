import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Expanding tendrils reaching outward
export function CuriosityV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9c0-3-1-5-3-7" />
      <path d="M12 9c0-3 1-5 3-7" />
      <path d="M15 12c3 0 5-1 7-3" />
      <path d="M15 12c3 0 5 1 7 3" />
      <path d="M12 15c0 3-1 5-3 7" />
      <path d="M12 15c0 3 1 5 3 7" />
      <path d="M9 12c-3 0-5-1-7-3" />
      <path d="M9 12c-3 0-5 1-7 3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V2: Question mark morphing into exploration
export function CuriosityV2({ size = 24, ...props }: IconProps) {
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
      <path d="M8 8c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-1 2.5-2 3s-2 1.5-2 3" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <path d="M4 10c-1-2 0-4 2-5" opacity="0.4" />
      <path d="M20 10c1-2 0-4-2-5" opacity="0.4" />
      <path d="M6 18l-2 2" opacity="0.3" />
      <path d="M18 18l2 2" opacity="0.3" />
    </svg>
  )
}

// V3: Magnifying exploration field
export function CuriosityV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5L20 20" />
      <circle cx="10" cy="10" r="2" opacity="0.5" />
      <path d="M10 6v-3" opacity="0.4" />
      <path d="M6 10h-3" opacity="0.4" />
      <path d="M14 10h2" opacity="0.4" />
      <path d="M10 14v2" opacity="0.4" />
      <circle cx="10" cy="10" r="0.75" fill="currentColor" />
    </svg>
  )
}
