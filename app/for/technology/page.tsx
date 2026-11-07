import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import { BuyerPage } from "../buyer-page"

export const metadata: Metadata = pageMeta("/for/technology", "For the CTO · A memory layer you can open up", "Postgres, row-level scoping, receipts on every reply, any model through your keys. What’s hosted today and what we build with you.")

const FEATURES: { heading: string; items: string[] }[] = [
  {
    heading: "The store",
    items: [
      "Postgres with a vector column. Facts are rows, each with a date, a source and an owner. No proprietary store to learn or leave.",
      "Row-level rules decide every read. The question “who is asking” is answered by the database, not by a prompt.",
      "Every fact lives in a drawer: a person, a company, a matter, a topic. Drawers are earned by use, not configured up front.",
      "Corrections are kept, not overwritten. The old fact is marked replaced, with who changed it and why.",
      "Links between facts are kept too: what repeats, what contradicts, what replaced what.",
    ],
  },
  {
    heading: "The models",
    items: [
      "Seven jobs, seven model settings, changed in Settings without a deploy. Chat, filing, mood, the overnight pass, the judge, pictures and embeddings.",
      "Any frontier model through your keys. Any model you already run in-house. A local model on your hardware for the filing lane.",
      "Embeddings are the one switch that costs a re-index. We say so on the screen.",
      "Spend by job and by model, every day, on one screen.",
    ],
  },
  {
    heading: "The answers",
    items: [
      "Counts, dates and trends come from tools that read the whole record, and the model is handed the number. It is not allowed to estimate.",
      "Every reply carries a receipt: which drawers it opened, which facts it was shown, how long each step took.",
      "When there isn’t enough on record, it says so instead of guessing.",
      "Promises are heard and filed with an owner and a date. Nothing goes on a person’s desk until they confirm it.",
    ],
  },
  {
    heading: "The overnight pass",
    items: [
      "Runs at five in the morning, only for people whose day left something new. Most nights it does nothing, and the log says so.",
      "When it runs, it reads the day, links what repeats, flags what contradicts and leaves a note. It never deletes.",
    ],
  },
  {
    heading: "What comes in",
    items: [
      "Chat, uploaded documents and files, pasted notes.",
      "Call transcripts from your call-tracking system. Text only; we never hold audio.",
      "Calendar and email by read-only connection, for dates and names. Email bodies are never copied in.",
      "Agents read the record before they act and bring findings back. A person decides what is kept.",
    ],
  },
  {
    heading: "Getting out",
    items: [
      "Your rows, on request, in a form you can load somewhere else. Exit terms are agreed before you start.",
      "No training code in the product. Nothing you put in trains anything.",
    ],
  },
]

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
        lead: "Model-agnostic, scoped to each person in the database, every answer receipted, and deployable from hosted to inside your walls. LongStrider sits beside your stack. It doesn’t ask you to rebuild it.",
        cta: "Book an architecture session",
        points: [
          {
            title: "Any model, your keys.",
            body: "Seven jobs, seven model settings. Swap one and the memory doesn’t change. Embeddings are a separate setting, and that’s the one switch that does cost a re-index.",
          },
          {
            title: "Scoped by default.",
            body: "Every fact belongs to a person, a team or the company. Every read is checked against who’s asking, by row-level rules in Postgres, not by a prompt.",
          },
          {
            title: "Traceable end to end.",
            body: "Every reply logs which drawers it opened, which facts it was shown and how long each step took. Every correction is kept with who and why.",
          },
        ],
        sections: (
          <>
            <section className="hx-section hx-deep">
              <div className="lx-wrap fo-narrow">
                <h2 className="lx-display hx-h2" data-reveal>
                  What&rsquo;s under the hood, in one <em>paragraph</em>.
                </h2>
                <p className="lx-lead" data-reveal data-delay="1">
                  Postgres with a vector column. Facts as rows, dated, sourced, scoped. A scoring engine that picks what
                  the model sees with no model call. One model call for signals on the way in, one for the words on the
                  way out. An overnight pass that only runs when the day left something new. Receipts on every write,
                  and every write undoable. If that&rsquo;s all you read, that&rsquo;s the system.
                </p>
              </div>
            </section>

            <section className="hx-section">
              <div className="lx-wrap">
                <h2 className="lx-display hx-h2" data-reveal>
                  Features and functionality, the plain <em>list</em>.
                </h2>
                <p className="lx-lead" data-reveal data-delay="1">
                  Everything here is in the product today. If it isn&rsquo;t, it isn&rsquo;t on this list.
                </p>
                <div className="fo-grid">
                  {FEATURES.map((g) => (
                    <div key={g.heading} className="fo-group" data-reveal>
                      <h3>{g.heading}</h3>
                      <ul>
                        {g.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
                    <p>Isolated to you by access rules verified on every read. Available now.</p>
                  </div>
                  <div className="mh-fact" data-reveal data-delay="1">
                    <h3>Private cloud.</h3>
                    <p>The engine in your VPC. Built with you.</p>
                  </div>
                  <div className="mh-fact" data-reveal data-delay="2">
                    <h3>On-premises.</h3>
                    <p>
                      The filing lane runs on your hardware today. A full build with no calls out is a project, not a
                      checkbox, and we&rsquo;ll tell you where the calls out are before you sign anything.
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
            q: "How do our agents use it?",
            a: "They read the record before they act and bring back findings. A person decides what goes into memory. Today, nothing writes to memory without that click.",
          },
          {
            q: "Can it run with no calls out?",
            a: "Not fully, yet. The filing lane can. Chat, overnight and the judge still call a model through your keys. That’s the honest answer and we’d rather you hear it here.",
          },
          {
            q: "What happens when we switch models?",
            a: "We did it in October, for every job, in Settings. 222,000 facts, no re-teaching, no deploy.",
          },
        ],
        next: { label: "How it works", href: "/how-it-works" },
      }}
    />
  )
}
