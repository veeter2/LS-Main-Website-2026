import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural link - connected data node
export function AttachmentV1({ size = 24, ...props }: IconProps) {
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
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
      <circle cx="17" cy="7" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// V2: Bonded particle - quantum attachment
export function AttachmentV2({ size = 24, ...props }: IconProps) {
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
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="7" r="3" />
      <path d="M9.5 14.5l5-5" />
      <path d="M14 9l2.5-2.5" opacity="0.5" />
      <path d="M7.5 16.5l2.5-2.5" opacity="0.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

// V3: Tethered data - floating connected element
export function AttachmentV3({ size = 24, ...props }: IconProps) {
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
      <rect x="4" y="4" width="8" height="10" rx="1" />
      <path d="M12 9l4-2" />
      <circle cx="18" cy="6" r="3" />
      <path d="M7 8h2" opacity="0.5" />
      <path d="M7 11h3" opacity="0.5" />
      <circle cx="18" cy="6" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
