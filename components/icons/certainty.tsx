import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Crystallized locked form
export function CertaintyV1({ size = 24, ...props }: IconProps) {
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
      <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
      <polygon points="12,6 17,9 17,15 12,18 7,15 7,9" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

// V2: Diamond with locked center
export function CertaintyV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2l10 10-10 10L2 12z" />
      <path d="M12 6l6 6-6 6-6-6z" opacity="0.5" />
      <path d="M10 12h4" />
      <path d="M12 10v4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: Solid anchor point
export function CertaintyV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="6" r="3" />
      <line x1="12" y1="9" x2="12" y2="21" />
      <path d="M12 21c-4-2-6-5-6-8" />
      <path d="M12 21c4-2 6-5 6-8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <circle cx="12" cy="6" r="1" fill="currentColor" />
    </svg>
  )
}
