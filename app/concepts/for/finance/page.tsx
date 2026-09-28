import type { Metadata } from "next"
import { BuyerPage } from "../buyer-page"
import { MemoryCurve } from "../../learning-gap/memory-curve"

export const metadata: Metadata = { title: "For finance · concept" }

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
        lead: "Most AI spend buys access. When you change vendors, what your people taught it stays behind. LongStrider turns that spend into something the company owns and can point to in due diligence.",
        points: [
          {
            title: "Owned, not rented",
            body: "The memory belongs to the company. It doesn't reset when you switch models or leave when people do.",
          },
          {
            title: "Answers you can audit",
            body: "Counts and dates come from the record with the source attached, so finance can check the work.",
          },
          {
            title: "Ready for the price war",
            body: "Models get cheaper every quarter. Switch whenever it pays to. Nothing has to be re-taught.",
          },
        ],
        proof: {
          heading: (
            <>
              Month twelve knows what month one <em>couldn&rsquo;t</em>.
            </>
          ),
          body: "MIT reviewed more than 300 enterprise AI initiatives and found 95% delivered no measurable return. The tools didn't keep what they learned. A system that keeps it gets more valuable the longer you run it.",
          visual: <MemoryCurve />,
          caption: "Illustration, not a measurement. Study: MIT NANDA, The GenAI Divide, 2025",
        },
        questions: [
          {
            q: "How is it priced?",
            a: "As a build you own, not per seat. The cost depends on where it runs and how widely it's used. We scope it with you in the working session.",
          },
          {
            q: "What should we measure?",
            a: "How long the questions that used to take days now take, how much knowledge stays when people leave, and how many corrections stay corrected.",
          },
          {
            q: "What if we stop?",
            a: "It's your company's memory. Agree the exit terms up front, and in a sovereign build it never leaves your hardware in the first place.",
          },
        ],
        next: { label: "For your CTO", href: "/concepts/for/technology" },
      }}
    />
  )
}
