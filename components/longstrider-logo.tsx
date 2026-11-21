import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

/**
 * The LongStrider mark: the strider under the arc.
 * Drawn in currentColor so the header, footer and dark surfaces color it
 * with a token instead of a filter. Clean strokes, so it stays sharp small.
 */
export function LongstriderLogo({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M 18 8 C 40 2, 92 8, 86 88" strokeWidth="6" />
      <circle cx="54" cy="36" r="6.5" fill="currentColor" stroke="none" />
      <path d="M 54 44 L 44 68 L 26 86" strokeWidth="6" />
      <path d="M 50 58 L 66 76" strokeWidth="6" />
      <path d="M 54 50 L 38 56" strokeWidth="5" />
    </svg>
  )
}
