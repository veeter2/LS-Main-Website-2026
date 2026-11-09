import type { Metadata } from "next"
import Link from "next/link"
import { pageMeta } from "@/lib/page-meta"
import { FaqJsonLd } from "../_components/faq-jsonld"

export const metadata: Metadata = pageMeta(
  "/pricing",
  "Pricing · A license you own, from $25k",
  "Three license ranges, a build you own, and support you can cancel. The numbers, before the call. No per-seat meter.",
)

/**
 * Pricing: the shape and the ranges, in writing, before anyone books a call.
 * Final numbers come out of the working session; nothing here is a quote.
 */

const TIERS = [
  {
    name: "Team",
    from: "$25k",
    fit: "One team or one office, up to a few dozen people, one or two systems to connect.",
    includes: ["The license, yours outright", "Install on your cloud or ours while yours is built", "One connector, your chat, your overnight pass"],
  },
  {
    name: "Company",
    from: "$50k",
    fit: "A whole firm, several teams, the systems where your work already lives.",
    includes: ["Everything in Team", "Several connectors and call transcripts", "Experts and agents set up for your work", "Your own model keys, per job"],
    ours: true,
  },
  {
    name: "Enterprise",
    from: "$100k",
    fit: "Many offices, a regulator to answer to, or a build that must run with no calls out.",
    includes: ["Everything in Company", "Your own cloud or on-premises, your own models", "Security review and written answers to your questionnaire", "A named engineer through the build"],
  },
]

const ALSO = [
  {
    title: "Managed services, scoped per install.",
    body: "Integrations, data enrichment, moving what you already have into the record, training your people. Priced as work, not as a percentage of anything, and written into the proposal before you sign.",
  },
  {
    title: "Support, a monthly share of your license.",
    body: "Updates, upgrades and technical support for a fixed monthly amount agreed up front. Cancel any time. The software keeps running; you just stop getting new versions.",
  },
  {
    title: "Your model bill is your model bill.",
    body: "Inference runs through your own keys or your own hardware. We never mark it up and we never see it. Pick the model per job and change your mind whenever it pays to.",
  },
]

const INWRITING = [
  "The license transfers if your company is acquired.",
  "Support is cancelable. The license is not a subscription.",
  "Leave, and you take the rows. Exit terms are agreed before you sign.",
]

const QA = [
  {
    q: "Why a range and not a price?",
    a: "Because the build is the variable. Where it runs, what we connect and how much history we bring in change the work. The ranges are honest; the number you leave the working session with is exact.",
  },
  {
    q: "Is there a per-seat charge?",
    a: "No. The license covers the company. Add people and nothing on the bill changes except your own model usage, which you can see by the day.",
  },
  {
    q: "What does the monthly support actually cover?",
    a: "New versions, upgrades to the record and the overnight pass, and a person to call when something breaks. It is a fixed share of your license, agreed up front, and you can stop it any month. Your install keeps working without it.",
  },
  {
    q: "Operating cost or capital?",
    a: "Ask your accountants. What you buy is a license, an installation and a memory that belongs to you. Most finance teams treat that differently from a subscription, and we give them the paperwork.",
  },
  {
    q: "What if you get acquired, or we do?",
    a: "If you do, the license transfers with the company. If we do, you still hold the license, the install and the rows. Nothing about your memory lives on our servers unless you asked us to host it, and then it moves with you.",
  },
  {
    q: "Can we start small?",
    a: "Yes. Most installs start with one team and one connector, prove the record is worth keeping, and grow from there. The license range you start in is the one you pay for.",
  },
]

export default function PricingPage() {
  return (
    <main>
      <FaqJsonLd items={QA} />
      <section className="lx-hero">
        <div className="lx-wrap by-hero">
          <p className="lx-eyebrow" data-rise="0">Pricing</p>
          <h1 className="lx-display lx-h1 by-h1" data-rise="1">
            The numbers, <em>before</em> the call.
          </h1>
          <p className="lx-lead" data-rise="2">
            You license LongStrider once and install it where you say. There is no per-seat meter, support is a monthly
            share you can cancel, and the license goes with your company if it is sold. These are the ranges we quote
            from today. The exact number comes out of a working session, in writing, before you leave.
          </p>
          <div className="lx-cta-row" data-rise="3">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/for/finance">
              For the CFO
            </Link>
          </div>
        </div>
      </section>

      <section className="hx-section pr-tiers-section" id="tiers">
        <div className="lx-wrap">
          <div className="pr-tiers" data-rise="4">
            {TIERS.map((t) => (
              <article key={t.name} className={t.ours ? "pr-tier lx-card pr-tier-mid" : "pr-tier lx-card"}>
                <p className="pr-tier-name">{t.name}</p>
                <p className="pr-tier-from">
                  <span className="pr-from">from</span> <span className="lx-num">{t.from}</span>
                </p>
                <p className="pr-tier-fit">{t.fit}</p>
                <ul className="pr-tier-list">
                  {t.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="lx-illustrative pr-note">License ranges, United States dollars. Build and services scoped separately.</p>
        </div>
      </section>

      <section className="hx-section hx-deep" id="also">
        <div className="lx-wrap hx-center">
          <p className="lx-eyebrow" data-reveal>What else is on the bill</p>
          <h2 className="lx-display hx-h2" data-reveal data-delay="1">
            Three more lines, and <em>none</em> of them is a seat.
          </h2>
        </div>
        <div className="lx-wrap mh-facts by-points" data-reveal data-delay="2">
          {ALSO.map((a) => (
            <div key={a.title} className="mh-fact">
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hx-section" id="writing">
        <div className="lx-wrap pr-writing">
          <div>
            <p className="lx-eyebrow" data-reveal>In writing</p>
            <h2 className="lx-display hx-h2" data-reveal data-delay="1">
              Three things we put in the <em>contract</em>, not the pitch.
            </h2>
          </div>
          <ol className="pr-writing-list" data-reveal data-delay="2">
            {INWRITING.map((w, i) => (
              <li key={w}>
                <span className="pr-writing-n lx-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{w}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hx-section hx-deep" id="questions">
        <div className="lx-wrap by-hero">
          <h2 className="lx-display hx-h2" data-reveal>
            Questions a buyer <em>asks</em>.
          </h2>
          <dl className="by-qas">
            {QA.map((x) => (
              <div key={x.q} className="by-qa" data-reveal>
                <dt>{x.q}</dt>
                <dd>{x.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hx-close">
        <div className="lx-wrap hx-center">
          <h2 className="lx-display hx-h2" data-reveal>
            Leave the session with a <em>number</em>.
          </h2>
          <div className="lx-cta-row hx-cta-center" data-reveal data-delay="1">
            <Link className="lx-btn lx-btn-primary" href="/book">
              Book a working session <span className="lx-arrow" aria-hidden>→</span>
            </Link>
            <Link className="lx-btn lx-btn-ghost" href="/security">
              Where it runs, and who owns it
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
