import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"

export const metadata: Metadata = pageMeta("/terms", "Terms of Service", "LongStrider terms of service. Sovereign intelligence deployed in your environment, where your data stays yours, permanently. Read the terms.")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
