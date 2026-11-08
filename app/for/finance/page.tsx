import type { Metadata } from "next"
import { pageMeta } from "@/lib/page-meta"
import { BuyerPage } from "../buyer-page"
import { MemoryCurve } from "../../learning-gap/memory-curve"

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
        lead: "Most AI spend buys access. Seats, renewals, a bill that resets every January, and when you change vendors, what your people taught it stays behind. Rent the whole stack and the vendor writes the rules you run under, and can rewrite them whenever it likes. LongStrider is the other kind of purchase. You license the software, install it on your infrastructure, run it under your own model, and own the result. Spend that was operating cost becomes something the company holds.",
        points: [
          {
            title: "Owned, not rented.",
            body: "You license the software and the memory belongs to the company. Neither resets when you switch models or when people leave.",
          },
          {
            title: "Capital, not subscription.",
            body: "A build you own and install is the kind of purchase many companies capitalize. Your accountants make that call; we give them the paperwork.",
          },
          {
            title: "Answers you can audit.",
            body: "Counts and dates come from the record with the source attached. Finance can check the work.",
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
                An MIT NANDA study of 300+ enterprise AI deployments found 95% saw no measurable return, and said why:
                &ldquo;Most GenAI systems do not retain feedback, adapt to context, or improve over time.&rdquo; (MIT
                NANDA, 2025) Deloitte&rsquo;s survey of 3,500 leaders this October found 86% plan to spend more on AI
                next year, while only 25% say it has changed how they operate. (Deloitte, October 2026)
              </p>
              <p className="lx-lead">
                A system that keeps what it learns gets more valuable the longer you run it. One that doesn&rsquo;t is a
                cost that resets every January.
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
                71% of companies track their total AI spend. 44% can see the cost per unit of work. (Deloitte, October
                2026) LongStrider shows spend by job and by model, every day, on one screen. You&rsquo;ll know what the
                overnight pass cost last night, and most nights the answer is nothing.
              </p>
              <p className="lx-lead" data-reveal data-delay="2">
                Here is what that screen told us about our own instance over the last two weeks, for the one call that
                answers a person&rsquo;s message:
              </p>
              <div className="fo-cost lx-card" data-reveal data-delay="2" role="table" aria-label="Cost per chat reply by model">
                <div className="fo-cost-row" role="row">
                  <span role="cell">Claude Sonnet 5.5, direct</span>
                  <span role="cell" className="lx-num">about 4.8 cents a reply</span>
                </div>
                <div className="fo-cost-row" role="row">
                  <span role="cell">DeepSeek V4.1 Flash, through Isoquant</span>
                  <span role="cell" className="lx-num">about 0.09 cents a reply</span>
                </div>
              </div>
              <p className="lx-lead" data-reveal data-delay="3">
                Roughly 55 times apart. Same memory, same tools, same receipts. Only the model answering changed. We
                don&rsquo;t claim the answers are identical; we measure that separately, and we&rsquo;ll show you that
                number next to this one. The point is that the choice is yours, per job, and you can change your mind,
                because the memory doesn&rsquo;t live in the model.
              </p>
            </div>
          </section>
        ),
        questions: [
          {
            q: "How is it priced?",
            a: "As software you own, not seats you rent. A license and a one-time build fee, which depend on where it runs and what we connect, then a yearly support fee. No per-seat meter. The model bill is yours, through your own keys or your own hardware, so you see it and you choose it. We scope all of it in the working session, and you’ll have a number before you leave.",
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
            a: "Which vendor? The model vendors sit behind your own keys, so a worse deal means a new setting, not a new system. We sit behind a license you hold and rows you can export, with exit terms agreed up front. Nobody in that chain can change an interface, a privacy rule or a price and leave you stuck.",
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
