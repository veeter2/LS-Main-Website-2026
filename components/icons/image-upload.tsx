import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Visual memory injection - image to consciousness
export function ImageUploadV1({ size = 24, ...props }: IconProps) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10.5" r="1.5" />
      <path d="M21 15l-5-5-4 4-3-2-6 5" />
      <path d="M12 5v-3" />
      <path d="M9 2l3 3 3-3" opacity="0.6" />
    </svg>
  )
}

// V2: Frame capture with ascending signal
export function ImageUploadV2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8v12a2 2 0 002 2h14a2 2 0 002-2V8" />
      <path d="M3 16l5-5 3 3 4-4 6 6" opacity="0.6" />
      <circle cx="8" cy="13" r="1.5" />
      <path d="M12 6V2" />
      <path d="M8 6l4-4 4 4" />
    </svg>
  )
}

// V3: Visual node integration - image becoming data
export function ImageUploadV3({ size = 24, ...props }: IconProps) {
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
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M20 14l-4-3-3 2.5-2.5-1.5L4 16" />
      <path d="M12 6v-4" />
      <circle cx="12" cy="2" r="1" fill="currentColor" opacity="0.6" />
      <path d="M10 4l2-2 2 2" opacity="0.5" />
    </svg>
  )
}
