import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * Book-a-session leads. Two copies, one source of truth:
 *   1. a row in the LongStrider project's `website_leads` table (the record)
 *   2. an email to the team via Resend (the notification)
 * No third-party CRM, no scripts on the page. The honeypot field `website`
 * must be empty; bots fill it, people never see it.
 */

const SUPABASE_URL = process.env.LS_SUPABASE_URL
const SUPABASE_KEY = process.env.LS_SUPABASE_SERVICE_ROLE_KEY
const RESEND_KEY = process.env.RESEND_API_KEY
const LEAD_TO = process.env.LEAD_TO_EMAIL ?? "matt@longstrider.ai"
const LEAD_FROM = process.env.LEAD_FROM_EMAIL ?? "LongStrider site <site@longstrider.ai>"

const MAX = { name: 120, email: 200, company: 200, question: 4000 }

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>()
function limited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

function clean(v: unknown, max: number): string {
  return String(v ?? "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .trim()
    .slice(0, max)
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string)
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 })
  }

  // Honeypot: real people never see this field.
  if (clean(body.website, 50)) return NextResponse.json({ ok: true })

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })

  const lead = {
    first_name: clean(body.firstname, MAX.name),
    last_name: clean(body.lastname, MAX.name),
    email: clean(body.email, MAX.email).toLowerCase(),
    company: clean(body.company, MAX.company),
    question: clean(body.question, MAX.question),
    page: clean(body.page, 300),
    user_agent: clean(req.headers.get("user-agent"), 300),
  }

  if (!lead.first_name || !lead.last_name || !lead.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 })
  }

  const results = await Promise.allSettled([storeLead(lead), emailLead(lead)])
  const stored = results[0].status === "fulfilled" && results[0].value
  const mailed = results[1].status === "fulfilled" && results[1].value

  if (!stored && !mailed) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 })
  }
  return NextResponse.json({ ok: true, stored, mailed })
}

type Lead = {
  first_name: string
  last_name: string
  email: string
  company: string
  question: string
  page: string
  user_agent: string
}

async function storeLead(lead: Lead): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return false
  const res = await fetch(`${SUPABASE_URL}/rest/v1/website_leads`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  })
  return res.ok
}

async function emailLead(lead: Lead): Promise<boolean> {
  if (!RESEND_KEY) return false
  const name = `${lead.first_name} ${lead.last_name}`
  const text = [
    `${name} at ${lead.company} booked a working session.`,
    ``,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Page: ${lead.page || "unknown"}`,
    ``,
    `Their question:`,
    lead.question || "(none given)",
  ].join("\n")
  const html = `<p><b>${escapeHtml(name)}</b> at <b>${escapeHtml(lead.company)}</b> booked a working session.</p>
<p>Email: <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a><br>Page: ${escapeHtml(lead.page || "unknown")}</p>
<p><b>Their question</b></p>
<p>${escapeHtml(lead.question || "(none given)").replace(/\n/g, "<br>")}</p>`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: LEAD_FROM,
      to: [LEAD_TO],
      reply_to: lead.email,
      subject: `Working session: ${name}, ${lead.company}`,
      text,
      html,
    }),
  })
  return res.ok
}
