import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ConceptShell } from "./_components/shell"
import "./concepts.css"

export const metadata: Metadata = {
  title: "Concepts",
  robots: { index: false, follow: false },
}

// Lora carries everything, display included. It is loaded once in the root layout.
export default function ConceptsLayout({ children }: { children: ReactNode }) {
  return <ConceptShell>{children}</ConceptShell>
}
