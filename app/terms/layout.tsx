import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"

export const metadata: Metadata = pageMeta("/terms", "Terms of Service", "LongStrider terms of service. Software that runs where you choose and is owned by you, so your data stays yours. Read the terms.")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
