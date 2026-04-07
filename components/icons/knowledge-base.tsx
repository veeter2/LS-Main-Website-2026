import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Honeycomb cells - organized knowledge
export function KnowledgeBaseV1({ size = 24, ...props }: IconProps) {
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
      {/* Central hexagon */}
      <path d="M12 6l4 2.5v5L12 16l-4-2.5v-5L12 6z" />
      {/* Surrounding cells */}
      <path d="M12 6l4-2.5 4 2.5v5" strokeOpacity="0.6" />
      <path d="M8 3.5L12 6" strokeOpacity="0.6" />
      <path d="M4 8.5l4-2.5" strokeOpacity="0.4" />
      <path d="M12 16l4 2.5" strokeOpacity="0.6" />
      <path d="M8 18.5l4-2.5" strokeOpacity="0.6" />
      {/* Knowledge nodes glowing */}
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8.5" r="0.75" fill="currentColor" />
      <circle cx="16" cy="8.5" r="0.75" fill="currentColor" />
      <circle cx="16" cy="13.5" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V2: Knowledge tree with branching wisdom
export function KnowledgeBaseV2({ size = 24, ...props }: IconProps) {
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
      {/* Root/trunk */}
      <path d="M12 21v-8" />
      {/* Main branches */}
      <path d="M12 13l-5-4" />
      <path d="M12 13l5-4" />
      {/* Sub-branches */}
      <path d="M7 9l-3-2" />
      <path d="M7 9l0-4" />
      <path d="M17 9l3-2" />
      <path d="M17 9l0-4" />
      {/* Knowledge leaves/nodes */}
      <circle cx="4" cy="7" r="1" fill="currentColor" />
      <circle cx="7" cy="5" r="1" fill="currentColor" />
      <circle cx="20" cy="7" r="1" fill="currentColor" />
      <circle cx="17" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" />
    </svg>
  )
}

// V3: Archive constellation - crystallized knowledge
export function KnowledgeBaseV3({ size = 24, ...props }: IconProps) {
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
      {/* Archive container */}
      <path d="M4 6h16v14H4V6z" />
      <path d="M4 6l4-3h8l4 3" />
      {/* Internal constellation pattern */}
      <path d="M8 10l4 3 4-3" strokeOpacity="0.5" />
      <path d="M12 13v4" strokeOpacity="0.5" />
      {/* Knowledge points */}
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="16" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="13" r="1.25" fill="currentColor" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
      <circle cx="12" cy="3" r="0.75" fill="currentColor" />
    </svg>
  )
}
