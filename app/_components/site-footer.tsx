import Link from "next/link"

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "What it does", href: "/product" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Security", href: "/security" },
      { label: "For finance", href: "/for/finance" },
      { label: "For technology", href: "/for/technology" },
      { label: "For your team", href: "/for/teams" },
    ],
  },
  {
    title: "Who it's for",
    links: [
      { label: "Insurance", href: "/industries#insurance" },
      { label: "Legal", href: "/industries#legal" },
      { label: "Professional services", href: "/industries#professional-services" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "The manifesto", href: "/manifesto" },
      { label: "Book a session", href: "/book" },
      { label: "Contact", href: "mailto:hello@longstrider.ai" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
]

/** Site footer for every daylight page. Copy from site-copy-v1, nav and footer. */
export function SiteFooter() {
  return (
    <footer className="sf" aria-label="Site footer">
      <div className="lx-wrap sf-inner">
        <div className="sf-brand">
          <p className="sf-line">The AI memory your company owns.</p>
          <p className="sf-sub">
            Software you license and install, not a seat you rent. Your own model, your own keys. Hosted while we build
            yours. No trackers on this site.
          </p>
        </div>
        <div className="sf-cols">
          {COLUMNS.map((c) => (
            <div key={c.title} className="sf-col">
              <span className="sf-col-title">{c.title}</span>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("mailto:") ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="lx-wrap sf-legal">
        &copy; 2026 LongStrider, LLC. Built in Austin, Texas. Used every day since spring 2026.
      </div>
    </footer>
  )
}
