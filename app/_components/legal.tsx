import type { ReactNode } from "react"

export type LegalSection = {
  title: string
  lead?: string
  body?: string | null
  items?: { label: string; text: string }[]
  note?: string
  contact?: { email: string; label: string }
}

/** Shared page for the privacy policy and terms of service, in the daylight style. */
export function LegalPage({
  title,
  intro,
  updated,
  strip,
  sections,
}: {
  title: string
  intro: ReactNode
  updated: string
  strip?: { label: string; body: string }[]
  sections: LegalSection[]
}) {
  return (
    <main>
      <section className="lx-hero lg-hero">
        <div className="lx-wrap lg-wrap">
          <p className="lx-eyebrow" data-rise="0">
            Legal &middot; Last updated {updated}
          </p>
          <h1 className="lx-display lx-h1" data-rise="1">
            {title}
          </h1>
          <p className="lx-lead" data-rise="2">
            {intro}
          </p>
          {strip && (
            <ul className="lg-strip" data-rise="3">
              {strip.map((p) => (
                <li key={p.label}>
                  <span className="lg-strip-label">{p.label}</span>
                  <span>{p.body}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="lg-body">
        <div className="lx-wrap lg-wrap">
          {sections.map((s) => (
            <section key={s.title} className="lg-section">
              <h2 className="lx-display lg-h2">{s.title}</h2>
              {s.lead && <p className="lg-lead">{s.lead}</p>}
              {s.body && <p>{s.body}</p>}
              {s.items && (
                <ul className="lg-items">
                  {s.items.map((item) => (
                    <li key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.note && <p className="lg-note">{s.note}</p>}
              {s.contact && (
                <p>
                  {s.contact.label}: <a href={`mailto:${s.contact.email}`}>{s.contact.email}</a>
                </p>
              )}
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}
