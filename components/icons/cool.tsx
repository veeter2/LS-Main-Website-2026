import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Dormant node - low energy state with minimal connections
export function CoolV1({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="4" opacity="0.5" />
      <circle cx="12" cy="12" r="1.5" opacity="0.3" />
      <path d="M12 4v4" opacity="0.3" strokeDasharray="2 2" />
      <path d="M12 16v4" opacity="0.3" strokeDasharray="2 2" />
      <path d="M4 12h4" opacity="0.3" strokeDasharray="2 2" />
      <path d="M16 12h4" opacity="0.3" strokeDasharray="2 2" />
    </svg>
  )
}

// V2: Crystalline frost - frozen/inactive state
export function CoolV2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2v20" opacity="0.5" />
      <path d="M2 12h20" opacity="0.5" />
      <path d="M4.9 4.9l14.2 14.2" opacity="0.3" />
      <path d="M19.1 4.9L4.9 19.1" opacity="0.3" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 6l-1.5 2h3L12 6z" opacity="0.4" />
      <path d="M12 18l1.5-2h-3l1.5 2z" opacity="0.4" />
    </svg>
  )
}

// V3: Fading signal - diminishing presence
export function CoolV3({ size = 24, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="2" opacity="0.6" />
      <circle cx="12" cy="12" r="5" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="8" opacity="0.15" strokeDasharray="4 4" />
      <path d="M12 4v2" opacity="0.2" />
      <path d="M12 18v2" opacity="0.2" />
    </svg>
  )
}
