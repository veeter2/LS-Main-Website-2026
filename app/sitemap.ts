import type { MetadataRoute } from "next"

const BASE = "https://www.longstrider.ai"

const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/product", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/security", priority: 0.8, changeFrequency: "monthly" },
  { path: "/for/finance", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for/technology", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for/teams", priority: 0.6, changeFrequency: "monthly" },
  { path: "/for-your-ai", priority: 0.6, changeFrequency: "monthly" },
  { path: "/company", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/manifesto", priority: 0.6, changeFrequency: "yearly" },
  { path: "/book", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-07")
  return PAGES.map((p) => ({ url: `${BASE}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }))
}
