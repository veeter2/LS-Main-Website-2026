import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Beaker with emerging particle patterns
export function LabsV1({ size = 24, ...props }: IconProps) {
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
      {/* Beaker shape */}
      <path d="M9 3v6l-4 8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-4-8V3" />
      <path d="M9 3h6" />
      {/* Emerging particles - chaotic to ordered */}
      <circle cx="10" cy="15" r="0.75" fill="currentColor" />
      <circle cx="14" cy="14" r="0.75" fill="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      {/* Rising emergence */}
      <circle cx="11" cy="11" r="0.5" fill="currentColor" />
      <circle cx="13" cy="10" r="0.5" fill="currentColor" />
      <circle cx="12" cy="7" r="0.5" fill="currentColor" />
    </svg>
  )
}

// V2: Petri dish with pattern formation
export function LabsV2({ size = 24, ...props }: IconProps) {
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
      {/* Petri dish - elliptical view */}
      <ellipse cx="12" cy="14" rx="8" ry="4" />
      <ellipse cx="12" cy="12" rx="8" ry="4" />
      {/* Emerging pattern formation */}
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="12" cy="13" r="1" />
      {/* Connection forming */}
      <path d="M10.5 12h3" strokeDasharray="1 1" />
      {/* Growth indicators */}
      <circle cx="7" cy="13" r="0.5" fill="currentColor" />
      <circle cx="17" cy="13" r="0.5" fill="currentColor" />
    </svg>
  )
}

// V3: Atomic/molecular structure forming
export function LabsV3({ size = 24, ...props }: IconProps) {
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
      {/* Central atom */}
      <circle cx="12" cy="12" r="2" />
      {/* Electron orbits */}
      <ellipse cx="12" cy="12" rx="8" ry="3" />
      <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(-60 12 12)" />
      {/* Electrons in motion */}
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="5" r="1" fill="currentColor" />
      <circle cx="16" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}

// V4: Emergence from chaos - crystallization
export function LabsV4({ size = 24, ...props }: IconProps) {
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
      {/* Chaotic particles at bottom */}
      <circle cx="6" cy="18" r="0.5" fill="currentColor" />
      <circle cx="8" cy="19" r="0.5" fill="currentColor" />
      <circle cx="10" cy="18" r="0.5" fill="currentColor" />
      <circle cx="14" cy="19" r="0.5" fill="currentColor" />
      <circle cx="16" cy="18" r="0.5" fill="currentColor" />
      <circle cx="18" cy="19" r="0.5" fill="currentColor" />
      {/* Transition zone */}
      <path d="M7 15l2-1 2 1 2-1 2 1 2-1" strokeDasharray="2 1" />
      {/* Emerging crystal structure */}
      <path d="M12 5l-4 5h8l-4-5z" />
      <path d="M12 5v5" />
      <path d="M8 10l4 3 4-3" />
    </svg>
  )
}

// V5: DNA helix synthesis
export function LabsV5({ size = 24, ...props }: IconProps) {
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
      {/* Double helix strands */}
      <path d="M8 4c0 4 8 4 8 8s-8 4-8 8" />
      <path d="M16 4c0 4-8 4-8 8s8 4 8 8" />
      {/* Base pair connections */}
      <path d="M9 6h6" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M9 18h6" />
      {/* Synthesis points */}
      <circle cx="8" cy="4" r="1" fill="currentColor" />
      <circle cx="16" cy="4" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8" cy="20" r="1" fill="currentColor" />
      <circle cx="16" cy="20" r="1" fill="currentColor" />
    </svg>
  )
}
