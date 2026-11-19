# Relaunch punch list

One branch: site/relaunch, PR #41. Nothing merges until the list is done and Matt ends the freeze.
Check a box only when it is on localhost:3000 and pushed.

## Build (in order)
- [x] Tokens cleaned, dead code out
- [x] Real brand mark, header on its own glass ground
- [x] Glass system on every page
- [x] Header no longer lets text bleed through
- [x] 1. Own-it headline stays "Rent the model. Own everything else." (Matt, 2026-11-19)
- [x] 2. Product page shows all eight: Today and Connections added, Any model folded into Governance
- [x] 3. Proof adds and noise sweep done (receipt, held job, teach, team, old fact, buyer lines, two clocks, owned-not-rented frame). Was: Gap map Part 2: decide which shipped powers go on the site now (receipts trail, teach a rule, Inbox, Team, held jobs, ask-your-data, named connectors). Add the chosen ones.
- [ ] 4. Brand guide: daylight values and token path updated to match site.css
- [ ] 5. Dark mode as a token pass (same tokens, dark values)
- [ ] 6. Phone width pass on every page, by me, in the browser pane
- [ ] 7. Marc's copy read of the whole site, one fix pass. Also docs/for-marc.md: terms page says rental, contradicts own-it

## Matt
- [ ] A. Lead form keys in Vercel production (LS_SUPABASE_URL, LS_SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, LEAD_TO_EMAIL), then one test submit; I confirm the row
- [ ] B. Pricing: review with Marc, then unhide (flip PRICING_HIDDEN, restore links and figures)

## Test (only after Build is done)
- [ ] 8. Matt walks the preview on the TV and the phone, lists what is off
- [ ] 9. Fix list, re-walk

## Ship
- [ ] 10. Matt ends the freeze. Squash-merge PR #41. Close #33, #36, #37, #39, #40 as folded in. Remove worktrees and branches.
- [ ] 11. Confirm www.longstrider.ai live, every route, phone and TV

## After launch
- [ ] Animation session: hero and supporting animations (new session, its own brief)
- [ ] Demo overnight letter (Dream agent)
- [ ] Lint config
