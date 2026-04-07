import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Looping pathway
export function ProceduralMemoryV1({ size = 24, ...props }: IconProps) {
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
      <path d="M4 12a8 8 0 1 1 16 0" />
      <path d="M20 12a8 8 0 1 1-16 0" opacity="0.5" />
      <path d="M20 12l-2-2" />
      <path d="M20 12l-2 2" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" opacity="0.5" />
    </svg>
  )
}

// V2: Step sequence arrows
export function ProceduralMemoryV2({ size = 24, ...props }: IconProps) {
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
      <rect x="2" y="4" width="5" height="5" rx="1" />
      <rect x="9.5" y="4" width="5" height="5" rx="1" opacity="0.7" />
      <rect x="17" y="4" width="5" height="5" rx="1" opacity="0.4" />
      <path d="M7 6.5h2.5" />
      <path d="M14.5 6.5h2.5" />
      <path d="M19.5 9v3" />
      <path d="M19.5 12h-15" />
      <path d="M4.5 12v3" />
      <rect x="2" y="15" width="5" height="5" rx="1" opacity="0.4" />
      <rect x="9.5" y="15" width="5" height="5" rx="1" opacity="0.7" />
      <rect x="17" y="15" width="5" height="5" rx="1" />
      <path d="M7 17.5h2.5" />
      <path d="M14.5 17.5h2.5" />
    </svg>
  )
}

// V3: Muscle memory / hand gesture
export function ProceduralMemoryV3({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22c4-2 7-6 7-11V5l-7-3-7 3v6c0 5 3 9 7 11z" />
      <path d="M12 8v6" />
      <path d="M9 11h6" />
      <circle cx="12" cy="11" r="4" opacity="0.3" />
      <path d="M8 5c0 0-2 2-2 4" opacity="0.4" />
      <path d="M16 5c0 0 2 2 2 4" opacity="0.4" />
    </svg>
  )
}
