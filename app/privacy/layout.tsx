import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"

export const metadata: Metadata = pageMeta("/privacy", "Privacy Policy", "LongStrider privacy policy. Your memory is yours and runs where you choose, and sends us nothing about usage. On an owned build we have no access to your data.")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
