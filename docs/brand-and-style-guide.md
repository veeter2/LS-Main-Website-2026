# LongStrider Brand and Style Guide

**Version 2.0 · 1 October 2026 · Owner: Matt Veitch**

This is the rulebook for anything with the LongStrider name on it: the website, the app, decks, one-pagers, emails, PDFs and social posts. If a rule here fights your instinct, the rule wins. If something isn't covered, ask Matt before it ships.

Version 2.0 replaces the August marketing guide. Three things changed since then: the brand now has a daylight look as well as the dark one, Lora is the main font everywhere, and em dashes are banned in anything a customer reads.

---

## 1. First question: whose document is it?

Brand it for the owner and the reader, not by reflex for LongStrider.

- A LongStrider document gets the full house style below.
- A document for or about a client or partner (their name on it, their audience) wears **their** brand. A LongStrider skin on a client deliverable is a credibility hit.
- Not sure? Ask before styling. Never guess.

---

## 2. The name

- Write it **LongStrider** in customer copy. This is how the new website spells it.
- The wordmark is set in Lora, sentence weight, slight positive tracking.
- Never abbreviate to "LS" in anything a customer reads. "LS" is internal shorthand only.

---

## 3. Voice: how LongStrider sounds

LongStrider writes like a confident person, not a vendor.

- **Say the outcome first.** The first sentence is the point. Explanation comes after, if at all.
- **One idea per sentence. Short sentences.** No stacked clauses. No "that said", "worth noting" or "to be clear".
- **Plain English.** If a word needs a glossary, rewrite the sentence. Write so a ten-year-old could follow it.
- **Honesty is the pitch.** One founder, a real working system. Saying the limits out loud is what makes the rest believable. Never trim the honest part to sound bigger.
- **No hype words.** Banned: revolutionary, game-changing, cutting-edge, next-generation, battle-tested, seamless, supercharge.
- **No fear.** LongStrider doesn't sell danger. The contrast is dull versus glowing, never danger versus safety.
- **Labels are human words.** "at work", "winding down", "day off". Never engine words, colons with values, or internal names on anything a person reads.

### No em dashes

No em dashes (—) in anything a customer reads: website, decks, briefs, emails, page titles, even CSS `content:` text. Reviewers read them as a sign that AI wrote the copy.

- Rewrite the sentence with a full stop, comma, colon or brackets.
- Don't swap in " - ", "–" or "--". They read the same way.
- Page titles use the middle dot: `Security · LongStrider`.
- Ship check: `grep -E '—|&mdash;'` returns zero.

---

## 4. Claims: say this, never that

Every factual claim checks against this table.

| Say | Never say |
|---|---|
| "working system", "the full loop runs end to end" | "battle-tested", "enterprise-proven" |
| "unbounded retrievable memory" | "no context window" |
| "grounded: it refuses to guess" | "it never hallucinates" |
| "the benefit of fine-tuning without touching the weights" | "it fine-tunes itself" (LongStrider never changes model weights) |
| "one connected system, not six integrated ones" | "does everything" |
| "it gets smarter while you sleep", "an overnight tidy" | leading with the word "dream", or any claim about consciousness or emotional scores |
| "we read your systems of record, we don't replace them" | anything that sounds like rip-and-replace or a data lake |
| "sovereign, on-prem, air-gapped deployment" (approved 28 Sep 2026) | |
| "46.8% on LongMemEval, 444 questions" | "all 500 questions" |
| "LongStrider makes any agent's work permanent", "agents that compound, not evaporate" | "13 agents", "we ship agents" |

**Numbers come from a live pull of the system, requested through Matt.** Never from an old deck, an old doc or memory. Stale numbers are how credibility dies. Never publish two numbers that disagree (for example 4 axes on one page, 5 on another).

---

## 5. The IP line: capability, never the recipe

Outside documents describe **what it does, how big it is, and what it measurably changed.** They never describe how it's built.

**Publish:** named capabilities, live scale figures, benchmark results, the shape of the architecture ("several fused retrieval streams scored on several axes, with no model in the retrieval path").

**Never publish:** file paths, table or column names, the names of scoring axes or retrieval streams, weights, thresholds, formulas, prompt design, schema, code, or internal model names (Jev, Laya) without Matt's OK.

Rule of thumb: counting a thing proves it's hard. Listing it hands over the build plan. Count, don't list.

---

## 6. Names we never use outside

- **Rush.** Under NDA. Never named, never hinted at, never a case study.
- **CallRail data.** Under NDA. Public sources only.
- Any client or partner name without Matt's written OK for that specific piece.
- No made-up quotes or testimonials. Ever.

---

## 7. Positioning: the locked spine

The answer to "what is LongStrider". Don't rewrite it, don't improve it:

> LongStrider is the intelligence layer that sits above your AI: sovereign, owned, and compounding. It turns the fragmented tools and data you already have into one governed system of intelligence the organization owns outright, that never forgets, gets smarter every night, and works like a living partner.

**The website's argument is ownership.** Every dollar spent on AI made someone else's platform smarter. Building on rented land. Knowledge walks out the door. Memory, the record, promises and pushback are the proof.

**One flag, three heights.** Pick by audience:

| Audience | Line |
|---|---|
| Manifesto | "Sovereign Intelligence Layer" |
| CIO, budget | "Own your Operational Intelligence Layer" |
| Plain | "The intelligence stack above your AI" |

**Lines that land.** Use them as written:

- "The model is not the memory."
- "Retrieval is not intelligence."
- "LLM is the voice, we are the memory and the judgment."
- "One connected system, not six integrated ones."
- "Correct it once."
- "It gets smarter while you sleep."
- "A competitive signal at 11pm. Institutional position by 9am."
- "It does not leave. It does not take competing offers. It does not need an exit interview."
- "The substrate is ours. The vertical IP is completely yours." (partners)

**Don't look like Glean.** No search-bar hero, no blue gradients, no logo wall.

**Business model words.** LongStrider is not SaaS and is never called a subscription. The offer is a flat-rate install plus managed services: the customer buys an asset they own. Sovereignty is how; the unblocked outcome is the sale.

---

## 8. Colour

LongStrider has **two looks built from one set of tokens**: Dark (the app's default) and Daylight (the new website, and the app's sun switch). Same gold, same purple, same glass, same rules.

**Never type a colour value into a component or document.** Use the tokens. If you need a colour role the tokens don't cover, propose it to Matt. Don't invent it inline.

### Brand colours (both looks)

| Token | Value | Use |
|---|---|---|
| Gold | `#C8A96E` | The accent. Wins, emphasis, "after" states, LongStrider's own voice |
| Gold light | `#DCC38A` | Highlights on gold |
| Gold ink | `#7E5E26` | Gold text on light paper (readable) |
| Purple | `#8B5CF6` | Second accent. Use sparingly |
| Purple ink | `#6B3FD9` | Purple text on light paper |
| Silver | `rgb(148 163 184)` | When LongStrider talks about itself (self-reflection), not gold |

### Dark look

| Role | Value |
|---|---|
| Ground (documents, website) | `#080809` |
| Ground (app) | near-black `rgb(10,10,10)` |
| Border, standard | `rgba(255,255,255,0.07)` |
| Border, subtle | `rgba(255,255,255,0.05)` |
| Border, gold | `rgba(200,169,110,0.22)` |
| Gold glow | `0 0 24px rgba(200,169,110,0.15)` |

### Daylight look

| Role | Value |
|---|---|
| Paper | `#F6F3EC` |
| Paper, deep | `#EEE8DC` |
| Surface | `#FDFCF9` |
| Ink | `#17150F` |
| Line | `rgba(23,21,15,0.10)` |
| Line, subtle | `rgba(23,21,15,0.06)` |
| Gold wash | `rgba(200,169,110,0.12)` |

### Text is never a solid colour

Text is ink (white on dark, warm black on daylight) at a fixed opacity ladder. These are the app's current values, tuned for contrast:

| Role | Dark | Daylight |
|---|---|---|
| Bright (headings) | 0.98 | 0.94 |
| Body | 0.92 | 0.84 |
| Mid (secondary) | 0.80 | 0.76 |
| Label | 0.60 | 0.68 |
| Hint (captions, times) | 0.58 | 0.64 |
| Ghost (empty states) | 0.42 | 0.58 |

In app code use the class names (`text-bright`, `text-body`, `text-mid`, `text-label`, `text-hint`, `text-ghost`, `text-soul`). The names are the contract; the numbers live in `styles/globals.css`.

**Buttons:** label at rest is `text-label` or brighter. Never `text-hint` or `text-ghost` on anything you click.

### LongStrider has no red

Never use red, brick or orange for "cost", "before" or "problem".

- **Before, old, manual** = quiet, dim ink.
- **After, win, savings** = lit, glowing gold.

---

## 9. Type

- **Lora** (400, 500, 600, italics) is the brand font. It carries everything: body, headings, labels, navigation, badges, the wordmark.
- Fallback: `Georgia, serif`.
- **Cormorant Garamond** appears only in the older dark briefing set. Don't use it in new work.
- Never add a sans-serif, a script face or a third font.
- **All numbers** use `font-variant-numeric: tabular-nums` so figures line up.
- **Eyebrows** on website and documents: Lora, uppercase, letter-spacing 0.2em to 0.32em, gold.
- **Inside the app, no uppercase on rails.** Rail headings are Lora around 11px, sentence case. Mono type is for tiny meta labels and numbers only.

---

## 10. Surfaces, glass and layout

The house look is **liquid glass**. Matt spent weeks on it. Keep it in both looks.

- **Corner radius is 4px.** Not rounded-lg, not pills, not circles as cards.
- **Dark glass card:** `background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 4px; backdrop-filter: blur(20px)`, plus a 1px top highlight `linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)` and `box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`.
- **Daylight glass:** frosted white over paper, a white sheen on top, thin ink hairlines. Never flat opaque cream cards.
- **In the app**, build glass from `app/styles/glass.tsx` (`GLASS_CARD`, `getCardStyle`). Never hand-roll it.
- **Ambient depth (dark):** soft aurora blobs behind content, radial gold at 0.05 plus purple at 0.045, `filter: blur(130px)`.
- **Hero stat cards are never flat:** light from the top inside the card, gold eyebrow, big glowing number, a "from X" line, and a change chip pinned to the bottom.
- **Website layout:** max width 1240px, gutter `clamp(20px, 5vw, 64px)`. No sideways scrolling at phone width.
- **Motion:** content fades in as you scroll, only when the reader hasn't asked for reduced motion. Nothing moves the layout once it has loaded.
- **The daylight heartbeat:** on the daylight enter page the orb is a warm pearl that breathes every 6 seconds with a soft double beat. "The heartbeat of the soul, not a solar system."

---

## 11. Charts and data

- Charts read colours from the tokens at runtime. Never a hardcoded palette.
- Before is dim ink, after is gold. No red.
- Numbers are tabular. Every number comes from a live pull.

---

## 12. Document formats

- Every external document ships as a set: `.md`, `.html` and `.pdf`, all in house style, kept in `docs/`.
- **PDF from HTML:** headless Chrome `--print-to-pdf`. Hide the aurora and grain layers, set `print-color-adjust: exact`, and put `break-inside: avoid` on cards only, never whole sections.
- **One long poster page:** Puppeteer with screen media and the page sized to full scroll height.
- **Always look at the finished PDF before it goes out.** Force every animation to its end state first and check contrast on every line of text.

---

## 13. Pre-flight checklist

Nothing ships until every box is ticked:

- [ ] Whose document is it, and is it branded to them? (§1)
- [ ] Name written LongStrider? (§2)
- [ ] Outcome first, short sentences, no hype, zero em dashes? (§3)
- [ ] Every claim checked against the table? Every number from a live pull? (§4)
- [ ] Capability and outcome only, no recipe? (§5)
- [ ] No NDA names, no invented quotes? (§6)
- [ ] Spine and lines used as written? (§7)
- [ ] Colours from tokens only, no red, before dim and after gold? (§8)
- [ ] Lora only, tabular numbers? (§9)
- [ ] 4px corners, glass kept? (§10)
- [ ] PDF rendered, looked at and contrast-checked? (§12)
- [ ] Would Matt read it in one go?

---

*Where the tokens live. Website (current): `LS-Main-Website-2026/app/concepts/concepts.css`. Website (older dark pages and briefs): `LS-Main-Website-2026/styles/ls-tokens.css`. App: `longstrider/styles/globals.css` and `app/styles/glass.tsx`. If this guide and a token file disagree, the token file wins. Questions go to Matt.*
