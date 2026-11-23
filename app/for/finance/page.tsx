import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import { BuyerPage } from "../buyer-page"
import { MemoryCurve } from "../../_components/memory-curve"
import { CostFilm } from "../../_components/cost-film"

export const metadata: Metadata = pageMeta("/for/finance", "For the CFO · AI spend that ends in an asset", "Licensed and installed, not rented per seat. Your own model, your own bill. Answers you can audit. Spend that becomes something the company owns.")

export default function ForFinance() {
  return (
    <BuyerPage
      b={{
        eyebrow: "For the CFO",
        title: (
          <>
            An AI budget that ends in an <em>asset</em>, not a renewal.
          </>
        ),
        lead: "Most AI spend buys access. Seats, renewals, a bill that resets every January, and what your people taught it stays behind when you leave. LongStrider is the other kind of purchase: license it, point it at the models you already pay for through your own keys, and own the result.",
        film: <CostFilm />,
        points: [
          {
            title: "Owned, not rented.",
            body: "You license the software and the memory belongs to the company. Neither resets when you switch models or when people leave. What’s yours stays yours. What’s shared is shared.",
          },
          {
            title: "Capital, not subscription.",
            body: "A build you own and install is the kind of purchase many companies capitalize. Your accountants make that call; we give them the paperwork.",
          },
          {
            title: "Answers you can audit.",
            body: "Counts and dates come from the record with the source attached. Finance can check the work. Nothing goes out in your name until a person says yes, and the yes is on the record.",
          },
          {
            title: "Ready for the price war.",
            body: "Models get cheaper every quarter. Switch whenever it pays to. Nothing has to be re-taught, and no vendor gets to decide your price for you.",
          },
        ],
        proof: {
          heading: (
            <>
              Month twelve knows what month one <em>couldn&rsquo;t</em>.
            </>
          ),
          body: (
            <>
              <p className="lx-lead">
                Most companies plan to spend more on AI next year. Few say it has changed how they operate, and the
                reason is simple: most AI tools don&rsquo;t get better with use.
              </p>
              <p className="lx-lead">
                A system that keeps what it learns gets more valuable the longer you run it. One that doesn&rsquo;t is a
                cost that resets every January.
              </p>
              <p className="lx-lead">
                The AI cost nobody can see is the people checking its work. Here every check is a click on the
                record, with a name and a time, so oversight shows up on the same screen as the model bill.
              </p>
            </>
          ),
          visual: <MemoryCurve />,
          caption: "Illustration, not a measurement.",
        },
        sections: (
          <section className="hx-section">
            <div className="lx-wrap fo-narrow">
              <h2 className="lx-display hx-h2" data-reveal>
                You can see the bill. Can you see what <em>drives</em> it?
              </h2>
              <p className="lx-lead" data-reveal data-delay="1">
                Most companies can see their total AI bill. Far fewer can see what one piece of work costs. LongStrider
                shows spend by job and by model, on one screen. You&rsquo;ll know what the overnight pass
                cost last night, and many nights the answer is nothing.
              </p>
              <p className="lx-lead" data-reveal data-delay="2">
                Here is what that screen told us about our own instance. The same reply to a person&rsquo;s message,
                with the same memory, the same tools and the same receipts, costs a fraction as much when a cheaper
                model answers. Only the model changed.
              </p>
              <p className="lx-lead" data-reveal data-delay="3">
                We don&rsquo;t claim the answers are identical; we measure that separately, and we&rsquo;ll show you
                that next to the bill. The point is that the choice is yours, per job, and you can change your mind,
                because the memory doesn&rsquo;t live in the model.
              </p>
            </div>
          </section>
        ),
        questions: [
          {
            q: "How is it priced?",
            a: "As software you own, not seats you rent. A license and a one-time build fee, which depend on where it runs and what we connect, then a monthly support share you can cancel any time. No per-seat meter. The model bill is yours, through your own keys or your own hardware, so you see it and you choose it. We scope all of it with you, and you’ll have a number in writing before anything starts.",
          },
          {
            q: "Operating cost or capital?",
            a: "Ask your accountants, not us. What we can say is what you buy: a license, an installation and a memory that belongs to you. That is a different thing from a subscription, and most finance teams treat it differently.",
          },
          {
            q: "What should we measure?",
            a: "How long the questions that used to take days take now. How much knowledge stays when people leave. How many corrections stay corrected. What you spent on models last month, by job.",
          },
          {
            q: "What if a vendor changes its terms?",
            a: "Which vendor? The model vendors sit behind your own keys, so a worse deal means a new setting, not a new system. We sit behind a license you hold and data that sits in plain Postgres you can read with any tool, with exit terms agreed up front. Nobody in that chain can change an interface, a privacy rule or a price and leave you stuck.",
          },
          {
            q: "What if we stop?",
            a: "It’s your company’s memory. We agree the exit terms up front, and you get the rows, not a PDF.",
          },
        ],
        next: { label: "For your CTO", href: "/for/technology" },
      }}
    />
  )
}
