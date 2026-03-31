import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Archive — LongStrider",
  description: "Internal archive of pages under review.",
  robots: { index: false, follow: false },
}

const GOLD = "#c8a96e"
const GOLD_DIM = "rgba(200,169,110,0.6)"
const GOLD_BORDER = "rgba(200,169,110,0.25)"

const ARCHIVED_PAGES = [
  {
    label: "01",
    title: "About",
    href: "/about",
    status: "Under Review",
    note: "Vision page — evaluate whether content merges into hero or manifesto.",
  },
  {
    label: "02",
    title: "About Us",
    href: "/about-us",
    status: "Under Review",
    note: "Team/founding story — may belong in a future About page once positioning is locked.",
  },
  {
    label: "03",
    title: "Be a Vendor",
    href: "/be-a-vendor",
    status: "Kill",
    note: "No longer aligned with GTM strategy.",
  },
  {
    label: "04",
    title: "Community",
    href: "/community",
    status: "Kill",
    note: "Consumer-era positioning. Conflicts with enterprise-first manifesto.",
  },
  {
    label: "05",
    title: "Help Center",
    href: "/help-center",
    status: "Kill",
    note: "Premature — no public product yet.",
  },
  {
    label: "06",
    title: "Pricing",
    href: "/pricing",
    status: "Under Review",
    note: "Evaluate whether to keep, simplify, or replace with 'Request Access' flow.",
  },
  {
    label: "07",
    title: "Patch Notes",
    href: "/patch-notes",
    status: "Kill",
    note: "Premature for current GTM stage.",
  },
  {
    label: "08",
    title: "Slide",
    href: "/slide",
    status: "Kill",
    note: "Legacy deck route. Replaced by /manifesto.",
  },
  {
    label: "09",
    title: "Blog / Field Notes",
    href: "/field-notes",
    status: "Under Review",
    note: "Potential for Field Notes as a curated intelligence log. Evaluate separately.",
  },
  {
    label: "10",
    title: "Technology",
    href: "/technology",
    status: "Under Review",
    note: "May become a deep-technical Architecture Annex linked from the manifesto.",
  },
  {
    label: "11",
    title: "Vision",
    href: "/vision",
    status: "Kill",
    note: "Content absorbed into the manifesto.",
  },
  {
    label: "12",
    title: "Case Studies",
    href: "/case-studies",
    status: "Under Review",
    note: "High value once we have traction proof. Placeholder for now.",
  },
]

const STATUS_COLORS: Record<string, string> = {
  "Kill": "rgba(239,68,68,0.7)",
  "Under Review": GOLD_DIM,
  "Keep": "rgba(52,211,153,0.7)",
}

export default function ArchivePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080809", paddingTop: "120px", paddingBottom: "120px" }}>

      {/* Aurora ambient */}
      <div style={{
        position: "fixed", top: "-200px", left: "-200px",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,1), transparent 70%)",
        opacity: 0.022, filter: "blur(120px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "10%", right: "-100px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,1), transparent 70%)",
        opacity: 0.016, filter: "blur(120px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: "72px" }}>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "11px", letterSpacing: "0.18em",
            textTransform: "uppercase", color: GOLD_DIM,
            marginBottom: "16px",
          }}>
            Internal · Not Indexed
          </p>
          <h1 style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 300, letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.95)",
            marginBottom: "20px", lineHeight: 1.1,
          }}>
            Page Archive
          </h1>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "18px", lineHeight: 1.72,
            color: "rgba(255,255,255,0.55)",
          }}>
            Pages under review before the final site consolidation.
            Review each before any deletions are made.
          </p>
          <div style={{
            marginTop: "32px", height: "1px",
            background: "linear-gradient(to right, rgba(200,169,110,0.3), transparent)",
          }} />
        </div>

        {/* Status legend */}
        <div style={{ display: "flex", gap: "28px", marginBottom: "48px" }}>
          {Object.entries(STATUS_COLORS).map(([status, color]) => (
            <div key={status} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color }} />
              <span style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "12px", letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.4)",
              }}>
                {status}
              </span>
            </div>
          ))}
        </div>

        {/* Page list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ARCHIVED_PAGES.map((page, i) => (
            <div
              key={page.href}
              style={{
                padding: "28px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex", gap: "24px", alignItems: "flex-start",
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "12px", color: "rgba(200,169,110,0.5)",
                minWidth: "24px", paddingTop: "3px",
                letterSpacing: "0.06em",
              }}>
                {page.label}
              </span>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                  <Link
                    href={page.href}
                    target="_blank"
                    style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "18px", fontWeight: 500,
                      color: "rgba(255,255,255,0.88)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      paddingBottom: "1px",
                      transition: "color 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    {page.title}
                  </Link>
                  <span style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "10px", letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: STATUS_COLORS[page.status],
                  }}>
                    {page.status}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "15px", lineHeight: 1.65,
                  color: "rgba(255,255,255,0.45)",
                  margin: 0,
                }}>
                  {page.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: "72px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "14px", fontStyle: "italic",
            color: "rgba(255,255,255,0.28)",
          }}>
            Nothing is deleted until explicitly approved. This page is not indexed or linked from any public-facing route.
          </p>
        </div>

      </div>
    </div>
  )
}
