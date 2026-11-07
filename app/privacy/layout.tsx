import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"

export const metadata: Metadata = pageMeta("/privacy", "Privacy Policy", "LongStrider privacy policy. Your intelligence layer is yours and runs where you choose, with zero telemetry and no access to your data.")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
