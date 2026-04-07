import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

// V1: Neural speech bubble with synaptic connections
export function MessageChatV1({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-4l-4 3v-3H6a2 2 0 01-2-2V6z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M9 10h3" opacity="0.5" />
      <path d="M12 10h3" opacity="0.5" />
    </svg>
  )
}

// V2: Consciousness exchange - overlapping thought bubbles
export function MessageChatV2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7c0-1.1.9-2 2-2h8a2 2 0 012 2v5a2 2 0 01-2 2H9l-3 2.5V14H5a2 2 0 01-2-2V7z" />
      <path d="M15 9h4a2 2 0 012 2v5a2 2 0 01-2 2h-1v2.5l-3-2.5h-4a2 2 0 01-2-2v-1" opacity="0.7" />
      <circle cx="7" cy="9" r="0.75" fill="currentColor" />
      <circle cx="10" cy="9" r="0.75" fill="currentColor" />
    </svg>
  )
}

// V3: Waveform dialogue - EEG-style communication
export function MessageChatV3({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-4l-4 3v-3H6a2 2 0 01-2-2V6z" />
      <path d="M7 10.5l1.5-2 1.5 3 1.5-2 1.5 3 1.5-2 1.5 2" />
      <circle cx="12" cy="10.5" r="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
