'use client';

import '../cs-detail.css';
import '../simulation.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

const SIMULATION = [
  {
    speaker: 'Chief Claims Officer',
    text: 'We have a large-loss file from 18 months ago — a complex aggregation dispute in commercial property. A similar situation just came in. What did we decide last time and why?',
    role: 'user',
  },
  {
    speaker: 'LongStrider',
    text: 'The aggregation dispute from March last year was resolved in favor of the insured after internal escalation reached the senior claims panel. The deciding factor was a clause interpretation specific to the endorsement language in that policy form — a position that had been applied once before in 2021 on a similar manufacturing risk. The reserve was set at $4.2M and the final settlement came in at $3.8M. The adjuster who handled it noted that the opposing counsel\'s initial framing was identical to the current submission.',
    role: 'ls',
  },
  {
    speaker: 'Chief Claims Officer',
    text: 'That adjuster retired last quarter. Who on the current team has handled anything close to this?',
    role: 'user',
  },
  {
    speaker: 'LongStrider',
    text: 'Two active adjusters have touched files with aggregation disputes in the last three years. One handled the 2021 precedent directly. I can brief both of them with the full decision history, the clause interpretation thread, and the reserve logic from the prior files — so the institutional position doesn\'t need to be reconstructed from scratch.',
    role: 'ls',
  },
];

const ADDITIONAL_USE_CASES = [
  { title: 'Prior authorization intelligence', desc: 'Accumulate how the organization interprets coverage edges, pre-auth patterns, and denial history — so decisions are consistent and defensible across the desk.' },
  { title: 'Renewal memory', desc: 'Preserve the reasoning behind prior-year pricing decisions, account-specific sensitivity history, and loss patterns that affect renewal logic.' },
  { title: 'Brokerage relationship intelligence', desc: 'Retain submission history, broker communication patterns, and relationship context that doesn\'t fit in a CRM but drives how business gets handled.' },
  { title: 'Compliance and regulatory continuity', desc: 'Keep jurisdiction-specific interpretation history and regulatory guidance current — so the desk always refers to how the organization has actually applied the rules.' },
  { title: 'New adjuster onboarding acceleration', desc: 'Surface the accumulated institutional judgment to new team members from day one — not through documentation, but through access to every prior decision in context.' },
  { title: 'Audit trail for dispute resolution', desc: 'Every decision, weight, and correction is on record — so any claim handling challenge starts with a complete, auditable response.' },
];

export default function InsuranceBriefPage() {
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
    <div className="bd-page">
      <div className="bd-orb-1" />
      <div className="bd-orb-2" />

      <div className="bd-container">

        {/* ── Back ── */}
        <Link href="/briefs" className="bd-back" data-reveal>
          ← Industry Briefs
        </Link>

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <div className="bd-hero">
          <div className="bd-industry-badge" data-reveal>
            Insurance
          </div>
          <h1 className="bd-hero-h1" data-reveal data-delay="1">
            Claims Intelligence &amp;<br />Underwriting Memory
          </h1>
          <p className="bd-hero-premise" data-reveal data-delay="2">
            Decades of adjuster judgment, edge-case precedent, and
            carrier-specific exception logic live in people. When they
            leave, the institutional intelligence leaves with them —
            and no claims system, no CRM, and no AI copilot was
            built to stop that.
          </p>

          <div className="bd-insight" data-reveal data-delay="3">
            <span className="bd-insight-label">Key Insight</span>
            <p className="bd-insight-text">
              Institutional knowledge is the real underwriting asset.
              The problem isn&apos;t access to models — it&apos;s that
              no one owns the intelligence the organization has already built.
            </p>
          </div>
        </div>

        <hr className="bd-divider" />

        {/* ══ 01 — THE ENVIRONMENT ═══════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">01</span>
          <span className="bd-section-label">The Environment</span>
          <div className="bd-grid">
            <div>
              <h2 className="bd-section-h2" data-reveal>
                Insurance runs on judgment.<br />Not just data.
              </h2>
              <p className="bd-lead" data-reveal data-delay="1">
                Every carrier, MGA, and brokerage is a machine built
                on precedent, exception, and accumulated interpretation.
              </p>
              <p className="bd-body" data-reveal data-delay="2">
                Claims adjusters don&apos;t just apply policy — they apply
                years of pattern recognition about how this carrier,
                in this jurisdiction, interprets this type of loss.
                Underwriters don&apos;t just price risk — they carry mental
                models of which edge cases get approved, which precedents
                hold, and why the last three exceptions went the way they did.
              </p>
              <p className="bd-body" data-reveal data-delay="2">
                That judgment is the product. It&apos;s also the fragility.
                It lives in people, not systems — and the industry has been
                spending on AI tools that make those people faster,
                while doing nothing to make the organization smarter.
              </p>
            </div>
            <div data-reveal data-delay="2">
              {[
                { label: 'Document-heavy', value: 'Every claim, submission, and policy interpretation generates documentation that gets stored — but never understood at the institutional level.' },
                { label: 'Precedent-heavy', value: 'Edge case resolution follows patterns that exist in adjuster memory, not policy language. The precedent is the real policy.' },
                { label: 'Penalty-heavy', value: 'Bad-faith exposure, E&O risk, and regulatory scrutiny mean that inconsistent decision-making isn\'t just inefficient — it\'s a liability.' },
                { label: 'Personnel-fragile', value: 'Veteran adjuster departure is the single largest unmanaged risk in most operations. The industry calls it "brain drain." It\'s actually an architecture problem.' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '16px 0',
                  borderBottom: i < 3 ? '1px solid var(--color-border-subtle)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-gold-dim)', marginBottom: '6px' }}>
                    {item.label}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-secondary)', margin: 0 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 02 — WHERE IT BREAKS ══════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">02</span>
          <span className="bd-section-label">Where It Breaks</span>
          <h2 className="bd-section-h2" data-reveal>
            The intelligence is there.<br />The system doesn&apos;t own it.
          </h2>
          <p className="bd-lead" data-reveal data-delay="1">
            Every AI deployment in insurance today is making individual
            adjusters faster. None of them are making the organization smarter.
          </p>
          <div className="bd-signal-list" data-reveal data-delay="2">
            {[
              {
                icon: '↗',
                title: 'Adjuster departure resets institutional judgment',
                desc: 'A 20-year adjuster leaves and takes with them: how this carrier interprets aggregation clauses in manufacturing risks, which submissions get the benefit of the doubt, and 40 edge cases that never made it into the manual.'
              },
              {
                icon: '⟲',
                title: 'Exception logic is rediscovered, not remembered',
                desc: 'The same edge case gets escalated, debated, and resolved repeatedly across the organization — because the resolution from 18 months ago lives in an email thread nobody can find.'
              },
              {
                icon: '⊘',
                title: 'Underwriting memory doesn\'t transfer',
                desc: 'When a book of business transfers between underwriters, what moves is the data. What stays behind is the reasoning — why certain risks were priced the way they were, which accounts have history that affects renewal logic.'
              },
              {
                icon: '◈',
                title: 'Copilots make individuals faster, not organizations smarter',
                desc: 'AI tools in market today accelerate document review and drafting. They don\'t accumulate institutional judgment. When the adjuster who uses them leaves, everything they learned using those tools leaves with them.'
              },
            ].map((item, i) => (
              <div key={i} className="bd-signal-item">
                <div className="bd-signal-icon">{item.icon}</div>
                <div>
                  <div className="bd-signal-title">{item.title}</div>
                  <p className="bd-signal-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 03 — THE ARCHITECTURE ═════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">03</span>
          <span className="bd-section-label">The Architecture</span>
          <div className="bd-grid">
            <div>
              <h2 className="bd-section-h2" data-reveal>
                LongStrider doesn&apos;t replace<br />your claims system.
              </h2>
              <p className="bd-body" data-reveal data-delay="1">
                It sits above your existing stack — core admin system,
                claims management, CRM, document management — and
                accumulates what actually mattered across every
                decision, resolution, and exception.
              </p>
              <p className="bd-body" data-reveal data-delay="1">
                Every claim resolved, every edge case escalated,
                every underwriting exception approved or denied
                feeds the intelligence layer. The system learns
                how your organization actually operates — not how
                the manual says it should.
              </p>
              <p className="bd-body" data-reveal data-delay="1">
                The model remains your choice: switch from OpenAI
                to a sovereign on-prem model, and the intelligence
                layer stays exactly where you built it. What changes
                is the voice. What doesn&apos;t is the accumulated judgment.
              </p>
            </div>
            <div data-reveal data-delay="2">
              <div className="bd-arch-card">
                <div className="bd-arch-layer tool-layer">
                  <span>OpenAI · Anthropic · Ollama · On-Prem LLM</span>
                  <span className="bd-arch-label">Model Layer</span>
                </div>
                <div className="bd-arch-connector" />
                <div className="bd-arch-layer ls-layer">
                  <span>LongStrider Intelligence Layer</span>
                  <span className="bd-arch-label">Owned · Sovereign</span>
                </div>
                <div className="bd-arch-connector" />
                {[
                  'Core Admin System',
                  'Claims Management',
                  'Underwriting Platform',
                  'Document Management · CRM',
                ].map((layer, i) => (
                  <div key={i}>
                    {i > 0 && <div style={{ height: '2px' }} />}
                    <div className="bd-arch-layer tool-layer">
                      <span>{layer}</span>
                      <span className="bd-arch-label">Existing Stack</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginTop: '12px' }}>
                LongStrider accumulates the intelligence above your existing tools — without replacing them. The intelligence layer is yours permanently, regardless of which model or tools sit above or below it.
              </p>
            </div>
          </div>
        </section>

        {/* ══ 04 — WHAT CHANGES ═════════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">04</span>
          <span className="bd-section-label">What Changes</span>
          <h2 className="bd-section-h2" data-reveal>
            The organization gets smarter.<br />Not just faster.
          </h2>
          <div className="bd-outcomes" data-reveal data-delay="1">
            {[
              {
                title: 'Claims precedent becomes institutional',
                body: 'Edge case resolutions, exception approvals, and escalation outcomes are stored and weighted — not as documents, but as understanding. The next adjuster facing a similar situation inherits the organization\'s prior judgment.'
              },
              {
                title: 'Underwriting memory survives book transfers',
                body: 'When a book moves between underwriters, the reasoning moves with it — not just the data. Why risks were priced the way they were. Which accounts have sensitivity history. What patterns preceded adverse development.'
              },
              {
                title: 'Exception handling becomes consistent',
                body: 'The same edge case doesn\'t get escalated and re-litigated. The system remembers how it was resolved, who approved it, and what the reasoning was — and makes that available before the next escalation.'
              },
              {
                title: 'Adjuster departure stops being a loss event',
                body: 'The institutional judgment a veteran adjuster carries gets accumulated by the system over time — not through documentation, but through observation of every decision they make. When they leave, it stays.'
              },
            ].map((item, i) => (
              <div key={i} className="bd-outcome-card">
                <span className="bd-outcome-title">{item.title}</span>
                <p className="bd-outcome-body">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Simulation */}
          <div style={{ marginTop: '48px' }} data-reveal data-delay="2">
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '20px' }}>
              Institutional memory — in practice
            </span>
            <div className="auto-simulation">
              <div className="auto-sim-context">
                Context: A complex large-loss file just came in that mirrors a prior dispute from 18 months ago. The adjuster who handled the original case retired last quarter. The institutional position needs to be recovered before the response deadline.
              </div>
              {SIMULATION.map((turn, i) => (
                <div key={i} className={`auto-sim-turn auto-sim-turn--${turn.role}`}>
                  <div className="auto-sim-speaker">{turn.speaker}</div>
                  <p className="auto-sim-text">{turn.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 05 — WHAT THEY OWN ════════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">05</span>
          <span className="bd-section-label">What They Own</span>
          <h2 className="bd-section-h2" data-reveal>
            Memory Sovereignty.<br />Permanently.
          </h2>
          <p className="bd-body" style={{ maxWidth: '600px' }} data-reveal data-delay="1">
            LongStrider deploys into your environment. Your intelligence
            stays in your environment. When you switch models, change vendors,
            or scale headcount — the accumulated institutional judgment
            remains exactly where you built it.
          </p>

          <div className="bd-sovereignty" data-reveal data-delay="2">
            <span className="bd-sovereignty-label">What the organization permanently owns</span>
            <p className="bd-sovereignty-statement">
              &ldquo;Not a subscription to someone else&apos;s intelligence.
              An asset that shows up in due diligence — a proprietary
              claims knowledge base that compounds every day and belongs
              entirely to your organization.&rdquo;
            </p>
            <ul className="bd-owns-list">
              {[
                'Complete claims precedent library — weighted by outcome, gravity, and recency',
                'Underwriting exception memory — every edge case resolved and why',
                'Carrier-specific interpretation logic — how your organization reads policy language',
                'Full audit trail — every decision, every weight, every correction on record',
                'Model-agnostic architecture — switch providers without losing the intelligence layer',
              ].map((item, i) => (
                <li key={i} className="bd-owns-item">{item}</li>
              ))}
            </ul>
          </div>

          {/* Additional use cases */}
          <div style={{ marginTop: '40px' }} data-reveal data-delay="2">
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '20px' }}>
              Additional deployment areas
            </span>
            <div className="bd-outcomes">
              {ADDITIONAL_USE_CASES.map((uc, i) => (
                <div key={i} className="bd-outcome-card">
                  <span className="bd-outcome-title">{uc.title}</span>
                  <p className="bd-outcome-body">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="bd-divider" />

        {/* ══ CTA ═══════════════════════════════════════════════════ */}
        <div className="bd-cta-section" data-reveal>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3.5vw, 42px)',
            fontWeight: 300,
            letterSpacing: '-0.025em',
            color: 'var(--color-text-primary)',
            margin: '0 0 12px',
            lineHeight: 1.2,
          }}>
            Ready to build claims intelligence<br />your organization actually owns?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-text-muted)',
            marginBottom: '36px',
          }}>
            90-day pilot. Your environment. Your data stays yours.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pilot" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-body)', fontStyle: 'italic',
              fontSize: '16px', letterSpacing: '0.04em',
              color: 'var(--color-gold)', textDecoration: 'none',
              padding: '14px 44px',
              border: '1px solid var(--color-gold-border)',
              borderRadius: '100px',
              background: 'var(--color-gold-ghost)',
              transition: 'all 0.35s var(--ease-out)',
            }}>
              Start a Pilot →
            </Link>
            <Link href="/briefs" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px', letterSpacing: '0.04em',
              color: 'var(--color-text-muted)', textDecoration: 'none',
              padding: '14px 28px',
              border: '1px solid var(--color-border)',
              borderRadius: '100px',
              transition: 'all 0.35s var(--ease-out)',
            }}>
              ← All Industry Briefs
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
