import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * One server-side tick per button press on the "Ask your own AI" block.
 * A counter, not a tracker: no cookie, no identity, no IP stored. The row
 * `website_ticks(key, count)` in the LongStrider project is bumped through a
 * Postgres function; if the table or function is missing, or the request is
 * malformed, the route still answers 204 so the page never sees an error.
 */

const SUPABASE_URL = process.env.LS_SUPABASE_URL
const SUPABASE_KEY = process.env.LS_SUPABASE_SERVICE_ROLE_KEY

const KEYS = new Set(["ask-cfo", "ask-cto", "ask-team"])

// Best-effort per-instance limit: 30 ticks per IP per 10 minutes. The IP is
// only compared in memory and never written anywhere.
const hits = new Map<string, number[]>()
function limited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 30
}

export async function POST(req: Request) {
  const done = new NextResponse(null, { status: 204 })
  try {
    const body = (await req.json()) as { key?: unknown }
    const key = typeof body.key === "string" ? body.key : ""
    if (!KEYS.has(key)) return done

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (limited(ip)) return done

    if (!SUPABASE_URL || !SUPABASE_KEY) return done
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/website_tick`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tick_key: key }),
    }).catch(() => undefined)
  } catch {
    // Fail silently by design.
  }
  return done
}
