import type { Metadata } from "next"
import { BuyerPage } from "../buyer-page"
import { DeploymentMap } from "../../security/deployment-map"

export const metadata: Metadata = { title: "For technology — concept" }

export default function ForTechnology() {
  return (
    <BuyerPage
      b={{
        eyebrow: "For the CTO",
        title: (
          <>
            A memory layer your architects can <em>inspect</em>.
          </>
        ),
        lead: "Model-agnostic, scoped to each person, every answer traceable, and deployable from hosted to air-gapped. LongStrider sits beside your stack — it doesn't ask you to rebuild it.",
        points: [
          {
            title: "Any model, your keys",
            body: "Frontier models through your own keys, or a private model on your hardware. Swap without losing what's been learned.",
          },
          {
            title: "Scoped by default",
            body: "Every fact belongs to a person, a team or the company, and every read is checked against who's asking.",
          },
          {
            title: "Traceable end to end",
            body: "Every answer lists its sources, and every correction is logged with who made it and why.",
          },
        ],
        proof: {
          heading: (
            <>
              As much of it inside your walls as you <em>need</em>.
            </>
          ),
          body: "Start hosted and isolated, move the engine into your own cloud, or run a sovereign build with a private model and no calls out. Pick a deployment to see what sits inside your perimeter.",
          visual: <DeploymentMap />,
          caption: "Try each deployment option",
        },
        questions: [
          {
            q: "Does it train on our data?",
            a: "No. LongStrider never trains a model on your data. Models do the talking; the memory stays with you.",
          },
          {
            q: "How do our agents use it?",
            a: "They read the record before they act and write back what they found, so their work builds on itself instead of starting over.",
          },
          {
            q: "Can it run with no calls out?",
            a: "Yes. A sovereign build runs a private model on your own hardware and is air-gap capable.",
          },
        ],
        next: { label: "How it works", href: "/concepts/how-it-works" },
      }}
    />
  )
}
