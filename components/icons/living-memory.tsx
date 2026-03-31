import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Galaxy cluster with orbital memory nodes
export function LivingMemoryV1({ size = 24, ...props }: IconProps) {
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
      {/* Central gravity well */}
      <circle cx="12" cy="12" r="2" />
      {/* Orbital paths with memory nodes */}
      <ellipse cx="12" cy="12" rx="6" ry="3" transform="rotate(-30 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="4" transform="rotate(20 12 12)" />
      {/* Memory nodes at orbital intersections */}
      <circle cx="6" cy="10" r="1" fill="currentColor" />
      <circle cx="18" cy="14" r="1" fill="currentColor" />
      <circle cx="9" cy="17" r="0.75" fill="currentColor" />
      <circle cx="16" cy="7" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V2: Neural constellation network
export function LivingMemoryV2({ size = 24, ...props }: IconProps) {
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
      {/* Central hub */}
      <circle cx="12" cy="12" r="2.5" />
      {/* Radiating connection paths */}
      <path d="M12 9.5V5" />
      <path d="M12 19v-4.5" />
      <path d="M9.5 12H5" />
      <path d="M19 12h-4.5" />
      {/* Diagonal neural branches */}
      <path d="M14 10l3-3" />
      <path d="M10 14l-3 3" />
      <path d="M14 14l3 3" />
      <path d="M10 10l-3-3" />
      {/* Outer memory nodes */}
      <circle cx="5" cy="5" r="1" fill="currentColor" />
      <circle cx="19" cy="5" r="1" fill="currentColor" />
      <circle cx="5" cy="19" r="1" fill="currentColor" />
      <circle cx="19" cy="19" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="0.75" fill="currentColor" />
      <circle cx="19" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Layered memory strata with depth
export function LivingMemoryV3({ size = 24, ...props }: IconProps) {
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
      {/* Layered planes suggesting depth */}
      <path d="M4 8l8-4 8 4" />
      <path d="M4 12l8-4 8 4" />
      <path d="M4 16l8-4 8 4" />
      {/* Vertical connection threads */}
      <path d="M8 6v12" strokeDasharray="2 2" />
      <path d="M16 6v12" strokeDasharray="2 2" />
      {/* Memory points at intersections */}
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="10" r="0.75" fill="currentColor" />
      <circle cx="16" cy="10" r="0.75" fill="currentColor" />
      <circle cx="12" cy="16" r="1.25" fill="currentColor" />
    </svg>
  )
}

// V4: 3D wireframe cube with nodal vertices
export function LivingMemoryV4({ size = 24, ...props }: IconProps) {
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
      {/* Front face */}
      <path d="M6 8l6-3 6 3v8l-6 3-6-3V8z" />
      {/* Back edges */}
      <path d="M12 5v3" />
      <path d="M6 8l6 3 6-3" />
      <path d="M12 11v8" />
      {/* Memory nodes at vertices */}
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="6" cy="8" r="1" fill="currentColor" />
      <circle cx="18" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1.25" fill="currentColor" />
      <circle cx="6" cy="16" r="0.75" fill="currentColor" />
      <circle cx="18" cy="16" r="0.75" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}

// V5: Gravitational field lines with memory mass
export function LivingMemoryV5({ size = 24, ...props }: IconProps) {
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
      {/* Central mass */}
      <circle cx="12" cy="12" r="3" />
      {/* Gravitational field lines curving toward center */}
      <path d="M4 4c4 2 6 6 8 8" />
      <path d="M20 4c-4 2-6 6-8 8" />
      <path d="M4 20c4-2 6-6 8-8" />
      <path d="M20 20c-4-2-6-6-8-8" />
      {/* Orbiting memory particles */}
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" />
      <circle cx="6" cy="17" r="0.75" fill="currentColor" />
      <circle cx="18" cy="17" r="1" fill="currentColor" />
    </svg>
  )
}
