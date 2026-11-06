import type { MetadataRoute } from "next"

// Search and answer engines are welcome. Training-only crawlers are not.
// OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User and PerplexityBot
// fetch pages to answer questions and cite us; GPTBot, ClaudeBot, CCBot and
// Google-Extended only collect training data.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: "https://www.longstrider.ai/sitemap.xml",
    host: "https://www.longstrider.ai",
  }
}
