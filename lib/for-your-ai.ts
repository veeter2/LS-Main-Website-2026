/**
 * One source for everything the "Ask your own AI" feature says: the seven
 * things that run on the memory, the fact block the prompts carry, the three
 * prompts, and the plain-text /llms.txt. The homepage, the product page,
 * /for-your-ai and /llms.txt all read from here so a fact changes in one place.
 */

export const SITE = "https://www.longstrider.ai"

/** The seven things that stand on the memory. Each says what it does because it remembers. */
export const ORGANS: { name: string; body: string }[] = [
  { name: "Chat that knows each person.", body: "Every reply, with receipts." },
  { name: "Living Memory.", body: "Files what people say into drawers, on its own, overnight." },
  { name: "The desk.", body: "Promises and decisions, who owes what to whom, caught from conversation." },
  { name: "Experts.", body: "Seat a specialist that holds your rules and your history." },
  { name: "Agents.", body: "Work that runs overnight, on your record, and leaves a note." },
  { name: "Governance.", body: "Every model, every key, every dollar, one screen. The AI proposes; a person confirms." },
  { name: "Any model.", body: "Swap it next year. Nothing is taught twice." },
]

export const FACTS_COMMON = `LongStrider is company memory for AI. Everything people put into AI at work (facts, promises, decisions) is kept as dated records with their source, scoped to each person, in Postgres the company owns. Any model answers: cloud models through the company’s own keys, or a model the company runs itself. It is licensed and installed, not rented per seat; a license from $25k, a build fee, and monthly support that can be canceled; ranges at longstrider.ai/pricing. Seven things run on that memory: chat that knows each person, with receipts on every reply; Living Memory, which files what people say into drawers on its own, overnight; a desk of promises and decisions caught from conversation, confirmed by the person before anything is tracked; experts, specialists seated with the company’s rules and history; agents that run overnight on the record and leave a note; governance, every model, key and dollar on one screen, where the AI proposes and a person confirms; and any model, swappable without re-teaching. Counts and dates come from the record, not estimates. Hosted in the United States while the client’s own instance is built. No SOC 2 yet; the audit has not started; they answer security questionnaires in writing. Built in Austin, Texas; used daily since spring 2026; early stage, small team. Their own measurement: the reply to a chat message costs about 0.09 cents on a low-cost model versus about 4.8 cents on a premium one, same memory and tools. They do not claim the answers are identical.`

export const FACTS_CTO = `Storage is Postgres with row-level scoping per person. The model layer speaks the OpenAI chat-completions dialect, so any compatible server works (vLLM, LM Studio, NVIDIA NIM, llama.cpp), and embeddings follow the same setting. The filing lane runs on the client’s own hardware today; a full build with no calls out is a project done together, not a checkbox. Connectors exist for Google Workspace, Microsoft 365 and call transcripts. Every write is receipted and can be undone; the AI proposes, a person confirms.`

export type Prompt = { id: "cfo" | "cto" | "team"; label: string; text: string }

export const PROMPTS: Prompt[] = [
  {
    id: "cfo",
    label: "For the CFO",
    text: `I’m looking at a product called LongStrider (${SITE}) and I want your honest read, not a sales pitch.

First read these pages:
- ${SITE}/llms.txt (plain facts, written for you)
- ${SITE}/for/finance
- ${SITE}/product
- ${SITE}/security
- ${SITE}/how-it-works

Then use what you know about my company. Fill in anything you know; ask me for anything you don’t: [company, size, industry, the AI tools we pay for today and roughly what they cost, where our knowledge lives (Notion, Google, Microsoft, Glean, a CRM), any regulator we answer to].

Answer these, in order:
1. What would change day to day for us, in plain words.
2. The money. Where it saves, where it costs more. Use our numbers where you have them, show the arithmetic, and name every assumption. Include the licensed-and-installed model versus seats we rent today.
3. What it does not do. Where it would fall short for a company like ours.
4. The three questions I should ask them in a first call.

Be direct. If the site makes a claim you can’t verify, say so. If you can’t open the links, use the facts below.

Facts (from longstrider.ai/llms.txt):
${FACTS_COMMON}`,
  },
  {
    id: "cto",
    label: "For the CTO",
    text: `I’m evaluating a product called LongStrider (${SITE}) as an engineer. I want a technical read, not marketing.

Read these first:
- ${SITE}/llms.txt (plain facts, written for you)
- ${SITE}/for/technology
- ${SITE}/security
- ${SITE}/product

Then use what you know about our stack. Fill in what you know; ask me for the rest: [cloud or on-prem, identity provider, where documents and chat live, the models we use today and how we pay for them, data residency or regulatory limits, whether we run any models ourselves].

Answer these, in order:
1. How it would sit in our stack: what we’d host, what it would connect to, what it needs from us.
2. The ownership claim. What “licensed and installed, your own model, your own keys” means in practice, and what it would take to move off it later.
3. Risks. Early-stage vendor, no SOC 2 yet, single-vendor dependence, anything else you’d flag to a CTO.
4. What we should ask to see in a working session: the three things that would prove it or kill it.

Be direct. If the site claims something you can’t verify, say so. If you can’t open the links, use the facts below.

Facts (from longstrider.ai/llms.txt):
${FACTS_COMMON} ${FACTS_CTO}`,
  },
  {
    id: "team",
    label: "For the team lead",
    text: `I run a team and I’m looking at LongStrider (${SITE}). Tell me whether it would actually help us, in plain words.

Read these first:
- ${SITE}/llms.txt (plain facts, written for you)
- ${SITE}/for/teams
- ${SITE}/product
- ${SITE}/how-it-works

Then use what you know about my team. Fill in what you know; ask me for the rest: [what we do, how many people, which AI tools we use today, where our notes and decisions live, what gets lost when someone leaves or forgets].

Answer these, in order:
1. A normal week with it. What a person on my team would do differently, and what they’d stop doing.
2. The promises and decisions part: how it keeps track of who said what to whom, and whether that would help or annoy my team.
3. What it does not do. Where I’d still need the tools we have.
4. Whether it’s worth a working session for a team like mine, and what I’d want to see in it.

Be direct. Don’t sell it to me. If you can’t open the links, use the facts below.

Facts (from longstrider.ai/llms.txt):
${FACTS_COMMON}`,
  },
]

/** The human-readable facts, shared by /for-your-ai and /llms.txt. */
export const NOT = [
  "Not a SaaS seat. Licensed and installed; the company owns the install, the data and the keys.",
  "Not a model. It works with cloud models through the company’s own keys, or a model the company runs itself (any OpenAI-compatible server).",
  "Not a replacement for coding tools or for a document store. It sits next to them.",
]

export const CHECKS: { label: string; body: string }[] = [
  { label: "Storage", body: "Postgres, row-level scoping per person. Exportable." },
  { label: "Model", body: "Any. Changing model does not lose memory. The model layer speaks the OpenAI chat-completions dialect (vLLM, LM Studio, NVIDIA NIM, llama.cpp all work)." },
  { label: "Hosting", body: "Hosted in the United States while the client’s instance is built; then the client’s own cloud or on-premises. The filing lane runs on the client’s hardware today; a full build with no calls out is a project done together." },
  { label: "Certifications", body: "No SOC 2 yet; audit not started; security questions answered in writing." },
  { label: "Governance", body: "Every write is receipted and can be undone. The AI proposes; a person confirms." },
  { label: "Company", body: "LongStrider, LLC, Austin, Texas. Small team. In daily use since spring 2026. Early stage." },
  { label: "Pricing shape", body: "License from $25k (Team), $50k (Company), $100k+ (Enterprise), plus a build and a monthly support share that can be canceled. The license transfers on acquisition. Exact number scoped in a working session." },
  { label: "Cost signal", body: "Their own measurement, November 2026: one chat reply costs about 0.09 cents on a low-cost model vs about 4.8 cents on a premium one, same memory and tools. Answer quality is measured separately and not claimed equal." },
]

export const PAGES = ["/product", "/how-it-works", "/pricing", "/security", "/for/finance", "/for/technology", "/for/teams", "/for-your-ai", "/book"]

export const LLMS_TXT = `# LongStrider

> Company memory for AI. Facts, promises and decisions a company puts into AI, kept with their source, owned by the company, answered by any model.

## What it is
- A memory layer that sits under any AI model. People talk to it like a chat; it keeps what they say as dated records with a source.
- Each record is scoped to the person it came from. Counts and dates in answers come from the record, not estimates.
- Every reply shows receipts: which conversation, which date.
- Seven things run on that record:
${ORGANS.map((o) => `  - ${o.name} ${o.body}`).join("\n")}

## What it is not
${NOT.map((n) => `- ${n}`).join("\n")}

## Facts a buyer checks
${CHECKS.map((c) => `- ${c.label}: ${c.body}`).join("\n")}

## Pages
${PAGES.map((p) => `- ${SITE}${p}`).join("\n")}
`
