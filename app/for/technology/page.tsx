import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import { BuyerPage } from "../buyer-page"

export const metadata: Metadata = pageMeta("/for/technology", "For the CTO · A memory layer you can open up", "Plain Postgres, scoped to each person, a receipt on every answer, any model through your keys. Hosted today, inside your walls when you need it.")

export default function ForTechnology() {
  return (
    <BuyerPage
      b={{
        eyebrow: "For the CTO",
        title: (
          <>
            A memory layer your architects can <em>open</em> up.
          </>
        ),
        lead: "Model-agnostic, scoped to each person, a receipt on every answer, and deployable from hosted to inside your walls. LongStrider sits beside your stack and never puts a vendor between you and your own model.",
        cta: "Talk to us",
        points: [
          {
            title: "Any model, your keys.",
            body: "Every job has its own model setting. Swap one in Settings and the memory doesn’t change. No re-teaching, no deploy.",
          },
          {
            title: "Scoped by default.",
            body: "Every fact belongs to a person, a team or the company. Every read is checked against who’s asking.",
          },
          {
            title: "Traceable end to end.",
            body: "Every reply shows which drawers it opened and which facts it was shown. Corrections are kept, not overwritten.",
          },
        ],
        sections: (
          <>
            <section className="hx-section">
              <div className="lx-wrap fo-narrow fo-moat">
                <h2 className="lx-display hx-h2" data-reveal>
                  Anyone can stand up Postgres. That isn&rsquo;t the two <em>years</em>.
                </h2>
                <p data-reveal data-delay="1">
                  The database is the easy part. Any team can have Postgres with a vector column running by lunch, and
                  you should be suspicious of anyone who calls that a product. The two years went into what reads and
                  writes it. The intake that turns a message into dated, sourced facts. The filing that puts each one in
                  the right drawer without being told. The overnight passes that link what repeats and flag what
                  contradicts. The identity rules that decide who may see what, on every read. The
                  experts that hold your rules. The screen where every model and key
                  is set and every dollar is watched. And the part that took longest: all of them read and write one
                  memory, so a correction in chat changes what the overnight pass believes and what an agent sees on
                  Wednesday. That is the moat. Copy the schema and you have a table. The system is the part that fills
                  it, keeps it in order, and answers from it.
                </p>
              </div>
            </section>

            <section className="hx-section hx-deep">
              <div className="lx-wrap">
                <h2 className="lx-display hx-h2" data-reveal>
                  As much of it inside your walls as you <em>need</em>.
                </h2>
                <div className="mh-facts fo-tiers">
                  <div className="mh-fact" data-reveal>
                    <h3>Hosted.</h3>
                    <p>Yours alone. Every lookup checks who&rsquo;s asking. Available now, and you hold the license either way.</p>
                  </div>
                  <div className="mh-fact" data-reveal data-delay="1">
                    <h3>Your cloud.</h3>
                    <p>The engine in your own cloud account. Built with you.</p>
                  </div>
                  <div className="mh-fact" data-reveal data-delay="2">
                    <h3>Inside your walls.</h3>
                    <p>
                      Filing runs on your hardware today. A full build with no calls out is a project, not a checkbox,
                      and we&rsquo;ll tell you where the calls out are before you sign anything.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ),
        questions: [
          {
            q: "Does it train on our data?",
            a: "No. There’s no training code in the product. The model vendors are bound by their business terms, which we’ll show you.",
          },
          {
            q: "What happens when we switch models?",
            a: "You change the setting. No re-teaching, no deploy. We’ve moved every job to a different vendor that way.",
          },
          {
            q: "What happens when a model vendor turns the screws?",
            a: "You move. Every job’s model is yours to set, through your keys, and the memory doesn’t notice the swap. The same goes for us: you hold the license and the rows, and the exit terms are written before you start.",
          },
          {
            q: "Can it run with no calls out?",
            a: "Not fully, yet. Filing can run on a model you host. Chat and the overnight pass still call a model through your keys. That’s the honest answer and we’d rather you hear it here.",
          },
          {
            q: "We have more questions than this.",
            a: "Good. Bring them. The first call is you telling us how your stack works and us showing you where this sits in it.",
          },
        ],
        next: { label: "How it works", href: "/how-it-works" },
      }}
    />
  )
}
