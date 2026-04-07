import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Agent swarm - autonomous nodes orbiting
export function AgentsV1({ size = 24, ...props }: IconProps) {
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
      {/* Central coordinator */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      {/* Orbital path */}
      <circle cx="12" cy="12" r="7" strokeOpacity="0.3" strokeDasharray="4 2" />
      {/* Autonomous agents in orbit */}
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="8" cy="18" r="1" fill="currentColor" />
      <circle cx="16" cy="18" r="1" fill="currentColor" />
      {/* Activity trails */}
      <path d="M6.5 12l2.5 0" strokeOpacity="0.5" />
      <path d="M15 12l2.5 0" strokeOpacity="0.5" />
    </svg>
  )
}

// V2: Parallel processing streams
export function AgentsV2({ size = 24, ...props }: IconProps) {
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
      {/* Multiple processing streams */}
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      {/* Agent nodes on streams */}
      <circle cx="7" cy="6" r="1.5" fill="currentColor" />
      <circle cx="14" cy="6" r="1" fill="currentColor" />
      <circle cx="10" cy="12" r="1.5" fill="currentColor" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" />
      {/* Inter-stream communication */}
      <path d="M7 7.5v3" strokeOpacity="0.4" />
      <path d="M12 13.5v3" strokeOpacity="0.4" />
    </svg>
  )
}

// V3: Constellation with active agents
export function AgentsV3({ size = 24, ...props }: IconProps) {
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
      {/* Hub */}
      <circle cx="12" cy="12" r="2" />
      {/* Connection paths */}
      <path d="M12 10V5" />
      <path d="M12 14v5" />
      <path d="M10 12H5" />
      <path d="M14 12h5" />
      <path d="M10.5 10.5L7 7" />
      <path d="M13.5 13.5l3.5 3.5" />
      {/* Active agent nodes - varying sizes show processing */}
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    </svg>
  )
}
