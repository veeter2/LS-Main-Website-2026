import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Multiple streams to single output
export function SynthesisV1({ size = 24, ...props }: IconProps) {
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
      {/* Input nodes */}
      <circle cx="4" cy="5" r="1.5" fill="currentColor" fillOpacity="0.5" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" fillOpacity="0.5" />
      <circle cx="4" cy="19" r="1.5" fill="currentColor" fillOpacity="0.5" />
      {/* Converging lines */}
      <path d="M5.5 5.5L14 12" />
      <path d="M5.5 12L14 12" />
      <path d="M5.5 18.5L14 12" />
      {/* Synthesis point */}
      <circle cx="17" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="17" cy="12" r="3" />
      {/* Output */}
      <path d="M20 12h2" />
    </svg>
  )
}

// V2: Venn diagram overlap
export function SynthesisV2({ size = 24, ...props }: IconProps) {
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
      {/* Overlapping circles */}
      <circle cx="9" cy="10" r="5" strokeOpacity="0.5" />
      <circle cx="15" cy="10" r="5" strokeOpacity="0.5" />
      <circle cx="12" cy="15" r="5" strokeOpacity="0.5" />
      {/* Synthesis center */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

// V3: Chemical bond formation
export function SynthesisV3({ size = 24, ...props }: IconProps) {
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
      {/* Reactants */}
      <circle cx="5" cy="8" r="2.5" />
      <circle cx="5" cy="16" r="2.5" />
      {/* Arrow */}
      <path d="M10 12h4" />
      <path d="M13 10l2 2-2 2" />
      {/* Product - bonded */}
      <circle cx="19" cy="10" r="2" />
      <circle cx="19" cy="14" r="2" />
      <path d="M19 12v0" strokeWidth="3" />
    </svg>
  )
}
