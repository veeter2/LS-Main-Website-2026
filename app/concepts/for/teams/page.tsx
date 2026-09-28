import type { Metadata } from "next"
import { BuyerPage } from "../buyer-page"
import { Desk } from "../../commitments/desk"

export const metadata: Metadata = { title: "For your team · concept" }

export default function ForTeams() {
  return (
    <BuyerPage
      b={{
        eyebrow: "For your team",
        title: (
          <>
            Stop explaining your job to a chat window every <em>morning</em>.
          </>
        ),
        lead: "LongStrider remembers what you've already told it, keeps track of what you promised, and tells you what changed overnight, so you start the day where you left off.",
        points: [
          {
            title: "It remembers",
            body: "The people, the accounts and the decisions, so you never brief it twice.",
          },
          {
            title: "It keeps your promises in view",
            body: "What you said you'd do, for whom and by when, on your desk until it's done.",
          },
          {
            title: "It says when it doesn't know",
            body: "No confident guesses. If the record is thin, it tells you so, along with what it's waiting for.",
          },
        ],
        proof: {
          heading: (
            <>
              Your desk, <em>already</em> sorted.
            </>
          ),
          body: "A promise from yesterday's call is waiting for you. Last night's notes are tidied. Something that conflicts has been flagged before it trips you up.",
          visual: <Desk />,
          caption: "Illustrative example",
        },
        questions: [
          {
            q: "Who can see what I tell it?",
            a: "What's yours stays yours. Team knowledge is visible to the team, and only the team.",
          },
          {
            q: "Will it track things I didn't agree to?",
            a: "No. It suggests a promise when it hears one; it only goes on your desk once you confirm it.",
          },
          {
            q: "What if it gets something wrong?",
            a: "Correct it once. It keeps the fix, and it won't come back wrong.",
          },
        ],
        next: { label: "What it does", href: "/concepts/product" },
      }}
    />
  )
}
