import type { Metadata } from "next"
import { BuyerPage } from "../buyer-page"

export const metadata: Metadata = {
  title: "LongStrider for your team · Stop re-explaining your job",
  description: "It remembers what you told it, keeps your promises in view, and says when it doesn't know.",
}

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
            title: "It remembers.",
            body: "The people, the accounts and the decisions, so you never brief it twice.",
          },
          {
            title: "It keeps your promises in view.",
            body: "What you said you'd do, for whom and by when, on your desk until you close it. It never closes anything for you.",
          },
          {
            title: "It says when it doesn't know.",
            body: "No confident guesses. If the record is thin, it tells you so, along with what it's waiting for.",
          },
        ],
        proof: {
          heading: (
            <>
              Your morning, <em>already</em> sorted.
            </>
          ),
          body: (
            <p className="lx-lead">
              A promise from yesterday&rsquo;s chat is waiting for you to confirm. Last night&rsquo;s notes are filed.
              Something that conflicts has been flagged before it trips you up.
            </p>
          ),
          visual: (
            <div className="lx-card fo-demo">
              <span className="fo-demo-head">While you were away</span>
              <p>Linked 3 notes about Thistlewood that say the same thing.</p>
              <p>Flagged a conflict: two dates for the Reyes closing.</p>
              <p>Caught a promise from your 4:50 chat: revised scope, due Friday. Track it?</p>
            </div>
          ),
        },
        questions: [
          {
            q: "Who can see what I tell it?",
            a: "What's yours stays yours. Team knowledge is visible to the team, and only the team. The check is in the database, not in the prompt.",
          },
          {
            q: "Will it track things I didn't agree to?",
            a: "No. It suggests a promise when it hears one. It only goes on your desk once you confirm it.",
          },
          {
            q: "What if it gets something wrong?",
            a: "Correct it once. It keeps the fix, with your name and the date, and marks the old fact as replaced.",
          },
        ],
        next: { label: "What it does", href: "/product" },
      }}
    />
  )
}
