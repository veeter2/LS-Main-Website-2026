'use client';

import './partners.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';
import { StoryTimeline } from '@/components/story-timeline';

// ── Chapter timeline ──────────────────────────────────────────
const GOLD   = '#c8a96e';
const PURPLE = '#8b5cf6';
const GOLD_G = 'rgba(200,169,110,0.40)';
const PURP_G = 'rgba(139,92,246,0.45)';

const TIMELINE = [
  { id: 'burning',   label: 'The Threat',         color: PURPLE, glow: PURP_G },
  { id: 'opp',       label: 'The Opportunity',     color: GOLD,   glow: GOLD_G },
  { id: 'shift',     label: 'The Model Shift',     color: PURPLE, glow: PURP_G },
  { id: 'models',    label: 'Partner Models',      color: GOLD,   glow: GOLD_G },
  { id: 'compound',  label: 'Compound Effect',     color: PURPLE, glow: PURP_G },
  { id: 'asset',     label: 'The Asset',           color: GOLD,   glow: GOLD_G },
  { id: 'revenue',   label: 'Revenue',             color: PURPLE, glow: PURP_G },
  { id: 'window',    label: 'The Window',          color: GOLD,   glow: GOLD_G },
];

// ── Verified-source stat data ─────────────────────────────────
// All citations link directly to primary sources.

const STATS = [
  {
    figure: '78%',
    label: 'of organizations using AI in 2025',
    source: 'McKinsey Global Survey on AI, 2025',
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    context: '78% of organizations now use AI in at least one business function — up from 55% in 2023. Adoption doubled in two years. The firms not building an intelligence layer are already behind.',
  },
  {
    figure: '$761B',
    label: 'in AI services spending by 2027',
    source: 'Gartner Worldwide AI Spending Forecast, January 2026',
    href: 'https://www.gartner.com/en/newsroom/press-releases/2026-01-22-gartner-forecasts-worldwide-ai-spending-to-reach-nearly-3-trillion-by-2027',
    context: 'Global spend on AI services alone reaches $761B by 2027. The organizations capturing that spend are not the ones building models — they are the ones owning the intelligence layer clients cannot exit.',
  },
  {
    figure: '$5.9B',
    label: 'in GenAI bookings, one firm, one year',
    source: 'Accenture FY2025 Annual Report',
    href: 'https://www.accenture.com/us-en/investor-relations',
    context: 'Accenture nearly doubled its generative AI bookings to $5.9B in FY2025. The market for AI-wrapped professional services is not coming — it arrived.',
  },
];

// ── Partner model comparison ──────────────────────────────────

const MODEL_COMPARISON = [
  { dimension: 'Revenue model',        before: 'Selling hours and headcount',                            after: 'Recurring revenue from clients who cannot leave' },
  { dimension: 'Client relationship',  before: 'Resets after every engagement',                          after: 'Embeds deeper with every engagement' },
  { dimension: 'Competitive moat',     before: 'Rate comparison — you lose eventually',                  after: 'Switching costs are real. The intelligence stays.' },
  { dimension: 'Delivery economics',   before: 'Junior headcount under growing AI pressure',             after: 'AI-amplified delivery at a fraction of the cost' },
  { dimension: 'Proprietary IP',       before: 'None — your methodology walks out with your people',     after: 'Proprietary vertical IP built on a proven architecture' },
  { dimension: 'Engagement continuity',before: 'Each project starts from zero context',                  after: 'Every engagement compounds on the last' },
];

// ── Three partner models ──────────────────────────────────────

const PARTNER_MODELS = [
  {
    n: '01',
    name: 'Deploy & Maintain',
    body: 'License the platform, deploy it into client environments, and maintain it as a managed service. Your clients accumulate intelligence that cannot migrate to a competitor. Predictable recurring revenue from organizations whose institutional memory now lives in a system you own and operate.',
  },
  {
    n: '02',
    name: 'Wrap & Extend',
    body: 'Build vertical-specific configurations, custom agent types, and proprietary integrations on top of LongStrider\u2019s architecture. What you build is yours — defensible, scalable, and sellable as a distinct offering. The substrate is ours. The vertical IP is completely yours.',
  },
  {
    n: '03',
    name: 'Advise & Transform',
    body: 'Lead institutional intelligence engagements — helping clients design, govern, and evolve their knowledge architecture. High-value advisory work that only firms who own the platform can credibly do. You\u2019re not selling hours. You\u2019re selling a transformation your clients can\u2019t execute without you.',
  },
];

// ── Simulation ────────────────────────────────────────────────

const SIMULATION = [
  {
    speaker: 'Partner — Year 1 — Discovery',
    role: 'partner',
    text: 'We\u2019re deploying LongStrider into a mid-market financial services client. Six months of engagement history. Three prior consultants whose context we can recover from email exports and document archives.',
  },
  {
    speaker: 'LongStrider — During Onboarding',
    role: 'ls',
    text: 'Historical import pipeline processed. 847 memories recovered from prior engagement artifacts, gravity-weighted, and embedded. Knowledge cluster formation begins tonight. Your client is not starting from zero — they\u2019re starting with six months of context already structured and retrievable.',
  },
  {
    speaker: 'Partner — Month 6',
    role: 'partner',
    text: 'Client asked why they would ever switch consultants. Their exact words: \u201ceven if we wanted to, the system knows us too well.\u201d',
  },
  {
    speaker: 'LongStrider',
    role: 'ls',
    text: 'That is the architectural outcome. The intelligence is sovereign to the client\u2019s infrastructure — but the expertise that shaped it, the agents that built it, the governance layer that ensures it stays accurate — that belongs to the relationship you have with them. Switching the consultant means rebuilding the methodology. No one does that.',
  },
];

// ── ROI timeline ──────────────────────────────────────────────

const ROI_ITEMS = [
  {
    timeline: 'Day 1',
    what: 'Historical context recovered.',
    detail: 'Import pipeline processes prior email, document, and CRM exports. Hundreds of recovered memories, gravity-weighted from the start. Your client does not start from zero.',
  },
  {
    timeline: '90 days',
    what: 'A queryable model of their business.',
    detail: 'Customer relationship depth scores. Decision history with outcomes. Behavioral patterns visible only across months of data. Risk signals that no dashboard surfaces.',
  },
  {
    timeline: '1 year',
    what: 'An intelligence asset that outperforms any new hire.',
    detail: 'The substrate knows the client\u2019s business better than anyone who joined in the last 12 months. It does not leave. It does not take competing offers. It does not need an exit interview.',
  },
  {
    timeline: '3 years',
    what: 'A documented institutional memory with provable value.',
    detail: 'Every significant decision, every customer relationship arc, every operational pattern — structured, queryable, and permanently owned. This is a balance sheet asset. Not a software subscription.',
  },
];

// ── TAM expansion ─────────────────────────────────────────────

const TAM_ITEMS = [
  {
    label: 'Your current TAM',
    desc: 'Clients who can afford your day rates. Competitive on rate. Capped by hours. Revenue resets after every project.',
    accent: false,
  },
  {
    label: 'Your expanded TAM',
    desc: 'Any organization that benefits from compounding institutional memory — offered as a productized $5\u201325K/month service contract. New clients. New revenue tier. Running in parallel with your existing practice.',
    accent: true,
  },
  {
    label: 'The intelligence advisory tier',
    desc: 'High-value engagements to design, govern, and evolve a client\u2019s entire knowledge architecture. A category of work that did not exist three years ago. Only firms who own the platform can credibly deliver it.',
    accent: false,
  },
];

// ── Page ──────────────────────────────────────────────────────

export default function PartnersPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('deck-visible');
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) =>
      observerRef.current?.observe(el)
    );
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  return (
    <div className="pt-page">
      <div className="pt-orb-1" aria-hidden />
      <div className="pt-orb-2" aria-hidden />

      <StoryTimeline nodes={TIMELINE} showAfter={50} />

      <div className="pt-container">

        {/* ═══ HERO ═══════════════════════════════════════════════ */}
        <div className="pt-hero">
          <span className="pt-badge" data-reveal>Partner Brief — Confidential</span>
          <h1 className="pt-hero-h1" data-reveal data-delay="1">
            Your clients need institutional memory.<br />
            You can sell it.
          </h1>
          <p className="pt-hero-sub" data-reveal data-delay="2">
            LongStrider is the sovereign intelligence platform that consulting and software
            engineering firms deploy, wrap services around, and own as a recurring revenue asset —
            without building a single line of AI infrastructure.
          </p>
          <div className="pt-hero-cta" data-reveal data-delay="3">
            <Link href="/pilot" className="pt-cta-primary">Start the Conversation →</Link>
            <span className="pt-cta-note">Select partner engagements only · Founding team intake</span>
          </div>
        </div>

        <hr className="pt-rule" />

        {/* ═══ 01 — THE BURNING PLATFORM ══════════════════════════ */}
        <section className="pt-section" data-section="burning">
          <span className="pt-section-num">01</span>
          <span className="pt-section-label">The Burning Platform</span>
          <div className="pt-section-grid">
            <div>
              <h2 className="pt-h2" data-reveal>
                Your business model is under siege.<br />You already know it.
              </h2>
              <p className="pt-lead" data-reveal data-delay="1">
                AI agents can now do in hours what junior consultants and engineers took
                weeks to deliver. Your clients are starting to ask the question you have
                been dreading: why are we paying for headcount when AI does it faster?
              </p>
              <p className="pt-body" data-reveal data-delay="2">
                The firms that survive this shift will not be the ones who fight AI.
                They will be the ones who wrap themselves around it — and own the layer
                that AI cannot commoditize. The research is not ambiguous about the
                direction. The only open question is who positions themselves first in each vertical.
              </p>
              <p className="pt-body" data-reveal data-delay="2">
                There is one layer AI will never commoditize: the institutional memory
                of a specific organization. The decisions made, the relationships built,
                the patterns accumulated over years of operation. No model knows that.
                No vendor ships it. No tool compounds it — unless you deploy one
                specifically designed to.
              </p>
            </div>
            <div data-reveal data-delay="2">
              <div className="pt-stats">
                {STATS.map((s, i) => (
                  <div key={i} className="pt-stat-card">
                    <div className="pt-stat-figure">{s.figure}</div>
                    <div className="pt-stat-label">{s.label}</div>
                    <p className="pt-stat-context">{s.context}</p>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-stat-source"
                    >
                      ↗ {s.source}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ 02 — THE OPPORTUNITY ════════════════════════════════ */}
        <section className="pt-section" data-section="opp">
          <span className="pt-section-num">02</span>
          <span className="pt-section-label">The Opportunity</span>
          <h2 className="pt-h2" data-reveal>
            What every client desperately needs —<br />and cannot build themselves.
          </h2>
          <p className="pt-lead" data-reveal data-delay="1">
            Every professional services client has the same invisible problem:
            institutional knowledge walks out the door every time someone leaves.
            Projects restart from zero. Decisions get relitigated. Context lives
            in email threads and the memories of people who no longer work there.
          </p>
          <div className="pt-opportunity-grid" data-reveal data-delay="2">
            {[
              {
                label: 'Not a data problem',
                body: 'Clients have data. They have CRMs, ERPs, Slack archives, project management tools. None of those systems know what the data means to this specific organization. That\u2019s the gap.',
              },
              {
                label: 'Not a search problem',
                body: 'Retrieval is solved. The problem is that what gets retrieved lacks gravity — there is no system that knows what mattered, what was learned from it, and how it should shape the next decision.',
              },
              {
                label: 'A memory problem',
                body: 'LongStrider is the first platform built specifically for sovereign, persistent, compounding institutional memory. Memory that grows more valuable with every engagement, every interaction, every decision made.',
              },
              {
                label: 'Not one they can solve alone',
                body: 'They cannot build this. It requires infrastructure architecture, intelligence design, and ongoing operational expertise. That is what you become. That is why they cannot leave.',
              },
            ].map((item, i) => (
              <div key={i} className="pt-opportunity-card">
                <div className="pt-opportunity-label">{item.label}</div>
                <p className="pt-opportunity-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ 03 — THE MODEL SHIFT ════════════════════════════════ */}
        <section className="pt-section" data-section="shift">
          <span className="pt-section-num">03</span>
          <span className="pt-section-label">The Model Shift</span>
          <h2 className="pt-h2" data-reveal>
            Stop selling time.<br />Start selling intelligence.
          </h2>
          <p className="pt-lead" data-reveal data-delay="1">
            This is not a gradual optimization of your current model. It is a
            structural shift in what you sell, how you price it, and what makes
            clients impossible to replace. The comparison is not subtle.
          </p>
          <div className="pt-comparison-table" data-reveal data-delay="2">
            <div className="pt-comparison-header">
              <div className="pt-comparison-dim" />
              <div className="pt-comparison-col-header">Your model today</div>
              <div className="pt-comparison-col-header pt-comparison-col-header--ls">
                Your model with LongStrider
              </div>
            </div>
            {MODEL_COMPARISON.map((row, i) => (
              <div key={i} className="pt-comparison-row">
                <div className="pt-comparison-dim">{row.dimension}</div>
                <div className="pt-comparison-before">{row.before}</div>
                <div className="pt-comparison-after">{row.after}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ 04 — THREE PARTNER MODELS ══════════════════════════ */}
        <section className="pt-section" data-section="models">
          <span className="pt-section-num">04</span>
          <span className="pt-section-label">Partner Models</span>
          <h2 className="pt-h2" data-reveal>
            Three ways you build revenue<br />around LongStrider.
          </h2>
          <p className="pt-lead" data-reveal data-delay="1">
            Partner firms choose the motion that fits their practice — or combine
            all three across different client segments. Each model is architecturally
            distinct. All three compound in the same direction.
          </p>
          <div className="pt-models-grid" data-reveal data-delay="2">
            {PARTNER_MODELS.map((m) => (
              <div key={m.n} className="pt-model-card">
                <div className="pt-model-n">{m.n}</div>
                <div className="pt-model-name">{m.name}</div>
                <p className="pt-model-body">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ 05 — THE COMPOUND EFFECT ════════════════════════════ */}
        <section className="pt-section" data-section="compound">
          <span className="pt-section-num">05</span>
          <span className="pt-section-label">The Compound Effect</span>
          <h2 className="pt-h2" data-reveal>
            The longer you are in it,<br />the more impossible you are to replace.
          </h2>
          <p className="pt-lead" data-reveal data-delay="1">
            Most consulting relationships are as durable as the last invoice.
            A competitor quotes lower and the conversation starts.
            A LongStrider-embedded engagement is architecturally different —
            because the intelligence the client has built lives in a platform
            your firm operates and your methodology shaped.
          </p>

          <div className="pt-sim-wrap" data-reveal data-delay="2">
            <div className="pt-sim-context">
              Context: A financial services consulting firm deploys LongStrider at the start of a new client engagement. Six months in, a competitor approaches the client with a lower rate proposal.
            </div>
            {SIMULATION.map((turn, i) => (
              <div key={i} className={`pt-sim-turn pt-sim-turn--${turn.role}`}>
                <div className="pt-sim-speaker">{turn.speaker}</div>
                <p className="pt-sim-text">{turn.text}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ 06 — THE ASSET ARGUMENT ════════════════════════════ */}
        <section className="pt-section" data-section="asset">
          <span className="pt-section-num">06</span>
          <span className="pt-section-label">The Asset Argument</span>
          <h2 className="pt-h2" data-reveal>
            Not promised efficiencies.<br />
            A compounding asset your clients own.
          </h2>
          <p className="pt-lead" data-reveal data-delay="1">
            Every AI vendor in market today sells the same thing: efficiency gains measured
            in percentages, backed by slide decks, delivered as OPEX that evaporates when
            you stop paying. LongStrider sells something categorically different — an intelligence
            asset that grows in value, belongs to your client permanently, and that you are
            uniquely positioned to deliver because you own the platform.
          </p>

          <div className="pt-roi-timeline" data-reveal data-delay="2">
            <div className="pt-roi-header">What your client actually gets — not a number in a deck</div>
            {ROI_ITEMS.map((item, i) => (
              <div key={i} className="pt-roi-item">
                <div className="pt-roi-track">
                  <div className="pt-roi-dot" />
                  {i < ROI_ITEMS.length - 1 && <div className="pt-roi-connector" />}
                </div>
                <div className="pt-roi-content">
                  <div className="pt-roi-when">{item.timeline}</div>
                  <div className="pt-roi-what">{item.what}</div>
                  <p className="pt-roi-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-own-rent" data-reveal data-delay="3">
            <div className="pt-own-rent-row pt-own-rent-row--bad">
              <div className="pt-own-rent-label">Renting AI &mdash; OpenAI · Anthropic · etc.</div>
              <div className="pt-own-rent-math">$60K/year &times; 3 years = $180K spent &rarr; zero residual asset</div>
              <p className="pt-own-rent-note">
                100% OPEX. Intelligence stays with the vendor. Service contract ends, memory ends.
                You paid for access to a tool, not ownership of an asset.
              </p>
            </div>
            <div className="pt-own-rent-row pt-own-rent-row--good">
              <div className="pt-own-rent-label">Deploying LongStrider</div>
              <div className="pt-own-rent-math">Same investment &rarr; 3-year compounded substrate, permanently owned</div>
              <p className="pt-own-rent-note">
                The intelligence lives in your client&apos;s infrastructure. It does not expire.
                Every night it compounds. After 3 years, synthesized over 1,000 times.
                The data, the patterns, the decision history — that is a balance sheet asset.
                Your clients know the difference.
              </p>
            </div>
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ 07 — REVENUE & VALUATION ════════════════════════════ */}
        <section className="pt-section" data-section="revenue">
          <span className="pt-section-num">07</span>
          <span className="pt-section-label">Revenue &amp; Valuation</span>
          <h2 className="pt-h2" data-reveal>
            A new revenue stream.<br />
            A different business valuation.
          </h2>
          <p className="pt-lead" data-reveal data-delay="1">
            Firms that deploy LongStrider are not just protecting existing revenue. They are
            entering a new market category — and revaluing their own business in the process.
          </p>

          <div className="pt-tam-grid" data-reveal data-delay="2">
            {TAM_ITEMS.map((item, i) => (
              <div key={i} className={`pt-tam-card${item.accent ? ' pt-tam-card--accent' : ''}`}>
                <div className="pt-tam-label">{item.label}</div>
                <p className="pt-tam-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-valuation-block" data-reveal data-delay="3">
            <div className="pt-valuation-header">The valuation arbitrage — same revenue, different multiple</div>
            <div className="pt-valuation-table">
              <div className="pt-valuation-row pt-valuation-row--head">
                <div className="pt-valuation-cell">Business type</div>
                <div className="pt-valuation-cell">Revenue model</div>
                <div className="pt-valuation-cell">Typical multiple</div>
                <div className="pt-valuation-cell">$1M ARR value</div>
              </div>
              <div className="pt-valuation-row">
                <div className="pt-valuation-cell">Services firm (today)</div>
                <div className="pt-valuation-cell">Project billing</div>
                <div className="pt-valuation-cell">1&ndash;2&times;</div>
                <div className="pt-valuation-cell pt-valuation-cell--muted">$1&ndash;$2M</div>
              </div>
              <div className="pt-valuation-row pt-valuation-row--highlighted">
                <div className="pt-valuation-cell">Platform-embedded firm</div>
                <div className="pt-valuation-cell">Recurring service contract</div>
                <div className="pt-valuation-cell">5&ndash;10&times;</div>
                <div className="pt-valuation-cell pt-valuation-cell--gold">$5&ndash;$10M</div>
              </div>
            </div>
            <p className="pt-valuation-note">
              A firm with 10 clients on a $10K/month intelligence subscription generates $1.2M ARR.
              At a 7&times; platform multiple versus 1.5&times; services: $8.4M versus $1.8M of enterprise
              value — from a revenue stream that did not exist before you deployed this.
              Platform multiples are a market reality. This is a business architecture decision.
            </p>
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ 08 — THE WINDOW ═════════════════════════════════════ */}
        <section className="pt-section" data-section="window">
          <span className="pt-section-num">08</span>
          <span className="pt-section-label">The Window</span>
          <h2 className="pt-h2" data-reveal>
            The window is open now.<br />It will not stay open long.
          </h2>
          <p className="pt-lead" data-reveal data-delay="1">
            The firms that become known as institutional intelligence partners
            in their verticals will own that positioning for a decade.
            The firms that wait — watching their billable hours compress,
            their margins thin, and their junior pipelines evaporate —
            will spend that decade trying to catch up.
          </p>
          <p className="pt-body" data-reveal data-delay="2">
            LongStrider is not asking you to bet on AI. You already know AI is changing
            everything. We are asking you to own the layer of intelligence that AI companies
            cannot commoditize — the sovereign memory of your clients&apos; organizations —
            and to build a business around it that grows with every engagement
            instead of resetting after every project.
          </p>
          <p className="pt-body" data-reveal data-delay="2">
            When you deploy LongStrider, the expertise, the relationships, and the
            compounding knowledge stay with your firm — not with a model provider
            who doesn&apos;t know your client&apos;s name.
          </p>

          <div className="pt-sovereignty-block" data-reveal data-delay="3">
            <span className="pt-sovereignty-eyebrow">The partner position</span>
            <p className="pt-sovereignty-statement">
              &ldquo;The product of a consulting engagement should increasingly be a living
              intelligence layer the client compounds on — not a document about what they
              should do. LongStrider is that layer. And when you deploy it, everything it
              learns stays with your firm&apos;s relationship — not with a vendor
              who doesn&apos;t know the client.&rdquo;
            </p>
          </div>
        </section>

        <hr className="pt-rule" />

        {/* ═══ CTA ═════════════════════════════════════════════════ */}
        <div className="pt-cta-section" data-reveal>
          <span className="pt-cta-eyebrow">Begin the Conversation</span>
          <h2 className="pt-cta-h2">
            Ready to own the intelligence layer<br />your clients can&apos;t live without?
          </h2>
          <p className="pt-cta-body">
            LongStrider works with a select group of professional services partners.
            We are looking for firms ready to lead this shift — not follow it.
            Reach the founding team directly.
          </p>
          <div className="pt-cta-actions">
            <Link href="/pilot" className="pt-cta-primary">Reach the Founding Team →</Link>
            <Link href="/technology" className="pt-cta-secondary">Review the Architecture</Link>
          </div>
          <p className="pt-cta-note-bottom">
            Memory Sovereignty · Institutional Intelligence · Recurring Revenue
          </p>
        </div>

      </div>
    </div>
  );
}
