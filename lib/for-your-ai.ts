/**
 * One source for everything the "Ask your own AI" feature says: the eight
 * things that run on the memory, the fact block the prompts carry, the three
 * prompts, and the plain-text /llms.txt. The homepage, the product page,
 * /for-your-ai and /llms.txt all read from here so a fact changes in one place.
 */

export const SITE = "https://www.longstrider.ai"

/** The eight things that stand on the memory, in the same order as the homepage. Each says what it does because it remembers. */
export const ORGANS: { name: string; body: string }[] = [
  { name: "Chat.", body: "Answers from what your company already knows, with a receipt under every reply." },
  { name: "Receipts.", body: "Click any answer and see what it used, what it cost, and who can see it." },
  { name: "Promises.", body: "Who said they would do what, by when. Nothing owed is forgotten." },
  { name: "Today.", body: "What moved, what slipped, what to do first. Written before you sit down." },
  { name: "Experts.", body: "A specialist that already knows your rules and your history. No re-briefing." },
  { name: "Agents.", body: "Overnight work that starts where yesterday’s left off." },
  { name: "Governance.", body: "Which model, whose keys, what each answer cost, one screen. Swap the model and nothing is taught twice." },
  { name: "Connections.", body: "Your CRM, files, forms and payments. Plugged in once, kept in sync." },
]

export const FACTS_COMMON = `LongStrider is company memory for AI. Everything people put into AI at work (facts, promises, decisions) is kept as dated records with their source, scoped to each person, in Postgres the company owns. Any model answers: cloud models through the company’s own keys, or a model the company runs itself. It is licensed and installed, not rented per seat; a license, a build fee, and monthly support that can be canceled; the number is scoped with the buyer, in writing. Software you own, on your books, not a bill every month. Eight things run on that memory: chat that knows each person, with receipts on every reply; Memory, which files what people say into drawers on its own, overnight; a desk of promises and decisions caught from conversation, confirmed by the person before anything is tracked; Today, a short letter at the top of the morning with what changed and what is waiting; experts, specialists seated with the company’s rules and history; agents that run overnight on the record and leave a note; governance, every model, key and cost on one screen, where the AI proposes and a person confirms, and the model can be swapped without re-teaching; and connections, the company’s CRM, files, forms and payments, plugged in once and kept in sync. Counts and dates come from the record, not estimates. Hosted in the United States while the client’s own instance is built. No SOC 2 yet; the audit has not started; they answer security questionnaires in writing. Built in Austin, Texas; in daily use at LongStrider itself; early stage, small team. Their own measurement: the same reply, with the same memory and tools, costs a fraction as much when a cheaper model answers. They do not claim the answers are identical.`

export const FACTS_CTO = `Storage is Postgres with row-level scoping per person. The model layer speaks the OpenAI chat-completions dialect, so any compatible server works (vLLM, LM Studio, NVIDIA NIM, llama.cpp), and embeddings follow the same setting. Chat and filing run on the client’s own hardware today; a full build with no calls out is a project done together, not a checkbox. Connectors exist for Google Workspace, Microsoft 365 and call transcripts. Every write leaves a receipt and can be undone; the AI proposes, a person confirms.`

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
4. What we should ask to see on a first call: the three things that would prove it or kill it.

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
4. Whether it’s worth a call for a team like mine, and what I’d want to see on it.

Be direct. Don’t sell it to me. If you can’t open the links, use the facts below.

Facts (from longstrider.ai/llms.txt):
${FACTS_COMMON}`,
  },
]

/** The human-readable facts, shared by /for-your-ai and /llms.txt. */
export const NOT = [
  "Not a chatbot. A memory the company owns; chat is one door into it.",
  "Not a harness or an agent framework. The memory and the judgment live in LongStrider; the model is only the voice.",
  "Not a SaaS seat. Licensed and installed; the company owns the install, the data and the keys.",
  "Not a model. It works with cloud models through the company’s own keys, or a model the company runs itself (any OpenAI-compatible server).",
  "Not a replacement for coding tools or for a document store. It sits next to them.",
]

export const CHECKS: { label: string; body: string }[] = [
  { label: "Storage", body: "Postgres, row-level scoping per person. Your data sits in plain Postgres you can read with any tool." },
  { label: "Model", body: "Any. Changing model does not lose memory. The model layer speaks the OpenAI chat-completions dialect (vLLM, LM Studio, NVIDIA NIM, llama.cpp all work)." },
  { label: "Hosting", body: "Hosted in the United States while the client’s instance is built; then the client’s own cloud or on-premises. Chat and filing run on the client’s hardware today; a full build with no calls out is a project done together." },
  { label: "Certifications", body: "No SOC 2 yet; audit not started; security questions answered in writing." },
  { label: "Governance", body: "Every write leaves a receipt and can be undone. The AI proposes; a person confirms." },
  { label: "Company", body: "LongStrider, LLC, Austin, Texas. Small team. Runs the company that builds it. Early stage." },
  { label: "Pricing shape", body: "A license, a build fee, and a monthly support share that can be canceled. Exact number scoped with you, in writing." },
  { label: "Cost signal", body: "Their own measurement: the same chat reply, with the same memory and tools, costs a fraction as much when a cheaper model answers. Answer quality is measured separately and not claimed equal." },
]

/** Questions buyers ask, answered plainly. Rendered on /for-your-ai, carried in /llms.txt, and marked up as FAQPage. */
export const FAQ: { q: string; a: string }[] = [
  { q: "Is this another chatbot?", a: "No. It is a memory your company owns. Chat is one door into it; connected systems, files and your teammates are the others. Everything lands in one record." },
  { q: "Is it a harness or an agent framework?", a: "No. A harness hands your material to a model and hopes. Here the record, the counting and the judgment live in LongStrider. The model is only the voice, and it gets the slice that earned its place." },
  { q: "Do you rent us a model?", a: "Never. You bring your own key to a frontier model, or run an open model on your own machine. We do not sit between you and the model, and we do not mark it up." },
  { q: "What do we actually own?", a: "The software, the install, the data, the keys and everything built from your material. It runs on your machines or ours. A cost you capitalize, not a bill forever." },
  { q: "What happens to our data if we leave?", a: "It is in plain Postgres you can read with any tool. It leaves with you. Nothing is trained on it, and there is no model of ours to take it back out of." },
  { q: "How does it stay cheap?", a: "It reads the summary first, then the facts under it, and opens the raw notes only when they earn their place. The model gets that slice and nothing more. Most nights it finds nothing new and does nothing." },
  { q: "How do we know an answer is true?", a: "Every answer comes with a receipt: what it stood on, which rules fired, what it cost. Counts and dates come from the record, not from the model. When it has no record, it says so instead of guessing." },
  { q: "Can it act on its own?", a: "Only with a yes. It drafts and proposes; a person confirms, and the yes is on the record. Anything that happened without asking is in one log, every day." },
  { q: "Can one person see another person's memory?", a: "No. Each person has private memory, and the company has shared memory. A hard wall sits between them, checked on every read." },
  { q: "Do we need engineers to run it?", a: "Not day to day. Models, keys and spend are settings, changed on one screen. Connecting a new system is a project we scope with you." },
  { q: "Is it proven?", a: "It runs our own company every day. Every nightly letter and every answer is on the record. We are early stage, with no SOC 2 yet, and we answer security questions in writing." },
]

export const PAGES = ["/product", "/how-it-works", "/security", "/for/finance", "/for/technology", "/for/teams", "/for-your-ai", "/book"]

export const LLMS_TXT = `# LongStrider

> Company memory for AI. Facts, promises and decisions a company puts into AI, kept with their source, owned by the company, answered by any model.

## What it is
- Software a company owns that keeps what its people put into AI, under any model. People talk to it like a chat; it keeps what they say as dated records with a source.
- Each record is scoped to the person it came from. Counts and dates in answers come from the record, not estimates.
- Every reply shows receipts: which conversation, which date.
- Eight things run on that record:
${ORGANS.map((o) => `  - ${o.name} ${o.body}`).join("\n")}

## What it is not
${NOT.map((n) => `- ${n}`).join("\n")}

## Facts a buyer checks
${CHECKS.map((c) => `- ${c.label}: ${c.body}`).join("\n")}

## Questions buyers ask
${FAQ.map((f) => `- Q: ${f.q}\n  A: ${f.a}`).join("\n")}

## Pages
${PAGES.map((p) => `- ${SITE}${p}`).join("\n")}
`
