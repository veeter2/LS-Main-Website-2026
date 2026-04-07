import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Downward spiral funnel
export function DeepDiveV1({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Spiral descent */}
      <ellipse cx="12" cy="4" rx="8" ry="2" />
      <path d="M4 4c0 2 3.5 4 8 4s8-2 8-4" />
      <ellipse cx="12" cy="9" rx="6" ry="1.5" strokeOpacity="0.7" />
      <ellipse cx="12" cy="13" rx="4" ry="1" strokeOpacity="0.5" />
      <ellipse cx="12" cy="16" rx="2" ry="0.5" strokeOpacity="0.3" />
      {/* Focus point */}
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      {/* Descent line */}
      <path d="M12 8v10" strokeOpacity="0.3" strokeDasharray="2 2" />
    </svg>
  )
}

// V2: Tunnel perspective
export function DeepDiveV2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Concentric squares - perspective tunnel */}
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <rect x="5" y="5" width="14" height="14" rx="1.5" strokeOpacity="0.7" />
      <rect x="8" y="8" width="8" height="8" rx="1" strokeOpacity="0.5" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.5" strokeOpacity="0.3" />
      {/* Center point */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// V3: Drilling into layers
export function DeepDiveV3({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Layers being penetrated */}
      <path d="M4 5h16" strokeOpacity="0.3" />
      <path d="M5 9h14" strokeOpacity="0.4" />
      <path d="M6 13h12" strokeOpacity="0.6" />
      <path d="M7 17h10" strokeOpacity="0.8" />
      {/* Drill path */}
      <path d="M12 2v19" strokeWidth="2" />
      {/* Arrow head */}
      <path d="M9 18l3 3 3-3" fill="currentColor" />
    </svg>
  )
}
