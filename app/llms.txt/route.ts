import { LLMS_TXT } from "@/lib/for-your-ai"

/** Plain facts for the AI a buyer already uses. The prompts on the site point here first. */
export function GET() {
  return new Response(LLMS_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
