'use client';

import '../cs-detail.css';
import '../simulation.css';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

// ── Comparison table data ─────────────────────────────────────────

const COMPARISON = [
  {
    category: 'Memory',
    typical: 'Session-based, product-specific, or retrieval-only',
    ls: 'Persistent and compounding across matters, users, and time',
  },
  {
    category: 'Ownership',
    typical: 'Vendor platform grows smarter',
    ls: 'The firm\'s intelligence layer grows smarter',
  },
  {
    category: 'Model strategy',
    typical: 'Often tied to one provider or workflow',
    ls: 'Model-agnostic and portable as models evolve',
  },
  {
    category: 'Knowledge continuity',
    typical: 'Depends on prompts and manual handoffs',
    ls: 'Institutional memory survives staff turnover and tool changes',
  },
  {
    category: 'Explainability',
    typical: 'Often limited to output and citation',
    ls: 'Shows which memories were weighted, why, and how corrections changed future behavior',
  },
  {
    category: 'Security posture',
    typical: 'Usually product-defined',
    ls: 'Firm-defined, environment-specific, and role-governed',
  },
];

// ── Operating scenarios ───────────────────────────────────────────

const SCENARIOS = [
  {
    user: 'Associate',
    ask: 'Revise a data sharing clause for an AI client',
    uses: 'Prior firm precedent, partner preference, fallback language history, related matter memory',
    change: 'Drafting is faster, more consistent, and strategically aligned with approved posture',
  },
  {
    user: 'Partner',
    ask: 'Review morning updates across the practice',
    uses: 'Matter summaries, exception alerts, approval status, clause trend patterns',
    change: 'Oversight becomes proactive — not dependent on status emails',
  },
  {
    user: 'Knowledge Operations',
    ask: 'Retire outdated playbooks, promote approved language',
    uses: 'Versioned firm knowledge, usage patterns, deprecation rules',
    change: 'The firm\'s knowledge base becomes governed and current',
  },
  {
    user: 'Risk / Compliance',
    ask: 'Audit why a clause was suggested and who approved it',
    uses: 'Memory weighting, provenance, access logs, approval trail',
    change: 'AI activity becomes reviewable and defensible',
  },
];

// ── Measurable outcomes ───────────────────────────────────────────

const OUTCOMES = [
  {
    outcome: 'Faster drafting and review',
    measure: 'Cycle time to first draft, partner review time, redline turnaround',
  },
  {
    outcome: 'Lower knowledge loss',
    measure: 'Reuse of approved precedent, continuity during staffing changes, reduction in rediscovery work',
  },
  {
    outcome: 'Higher consistency',
    measure: 'Clause standardization, reduced use of deprecated language, fewer structural drafting errors',
  },
  {
    outcome: 'Better governance',
    measure: 'Audit completion time, traceability coverage, role-appropriate usage',
  },
  {
    outcome: 'Better leverage',
    measure: 'Junior attorney ramp speed, knowledge operations efficiency, matter support throughput',
  },
];

// ── Simulation ───────────────────────────────────────────────────

const SIMULATION = [
  {
    speaker: 'Managing Partner',
    text: 'We have a new matter coming in — a significant data licensing dispute. Pull everything we have on how we\'ve handled IP licensing positions for tech clients in the last three years.',
    role: 'user',
  },
  {
    speaker: 'LongStrider',
    text: 'I found 14 matters involving IP licensing or data rights disputes across the tech practice since 2022. The firm\'s approved position on data licensing indemnities has shifted twice — most recently in Q3 last year when the partnership approved a narrower indemnity scope following an adverse arbitration outcome. That updated posture is reflected in 6 of the 14 matters. The other 8 predate the change. I can surface the current approved fallback language and flag the two matters where similar opposing counsel patterns appeared.',
    role: 'ls',
  },
  {
    speaker: 'Managing Partner',
    text: 'The partner who handled the arbitration matter is on leave. Who else knows this file well enough to brief the team?',
    role: 'user',
  },
  {
    speaker: 'LongStrider',
    text: 'Two senior associates worked directly on that matter. One has since moved to the corporate group but is still with the firm. The full strategic arc of the arbitration — prior drafts, the positions that were conceded, partner instructions through each stage, and the final reasoning behind the indemnity revision — is retained and available to brief the incoming team without requiring anyone to reconstruct it from archived files.',
    role: 'ls',
  },
];

// ── Additional use cases ──────────────────────────────────────────

const ADDITIONAL_USE_CASES = [
  { title: 'Lateral onboarding acceleration', desc: 'Surface the firm\'s preferred positions, approved clause language, and client relationship history to lateral hires from their first matter — not after months of informal knowledge transfer.' },
  { title: 'Knowledge operations governance', desc: 'Promote approved language, retire deprecated playbooks, and track which guidance is actively being used versus ignored — with full version history.' },
  { title: 'Client relationship continuity', desc: 'Preserve the strategic context of each client relationship — what the client has approved, what they\'ve pushed back on, and how the relationship has evolved across matters and years.' },
  { title: 'Practice group intelligence', desc: 'Build a shared understanding of how the group approaches recurring issue types — reducing variation across practitioners and making consistent advice structural rather than accidental.' },
  { title: 'Competitive intelligence retention', desc: 'Remember how opposing counsel has argued and what strategies have succeeded or failed against specific adversaries across prior matters.' },
  { title: 'Due diligence and deal memory', desc: 'Retain the institutional reasoning behind key deal terms, risk positions, and approval decisions — so the next similar transaction starts from accumulated knowledge, not from scratch.' },
];

// ── Page ──────────────────────────────────────────────────────────

export default function LegalBriefPage() {
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
          <div className="bd-industry-badge" data-reveal>Legal</div>
          <h1 className="bd-hero-h1" data-reveal data-delay="1">
            Institutional Practice<br />Intelligence
          </h1>
          <p className="bd-hero-premise" data-reveal data-delay="2">
            Law firms don&apos;t have an AI problem. They have a continuity
            problem. Knowledge lives in documents, inboxes, work product,
            individual memory, and unwritten judgment — and most legal AI
            products do nothing to preserve it in a way the firm actually owns.
          </p>

          <div className="bd-insight" data-reveal data-delay="3">
            <span className="bd-insight-label">Key Insight</span>
            <p className="bd-insight-text">
              Practice intelligence shouldn&apos;t retire when partners do.
              The firm&apos;s best legal judgment shouldn&apos;t live only in
              the heads of its most experienced people.
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
                A law firm is a machine<br />built on accumulated judgment.
              </h2>
              <p className="bd-lead" data-reveal data-delay="1">
                Every matter generates intelligence. Almost none of it
                gets preserved in a form the firm can compound.
              </p>
              <p className="bd-body" data-reveal data-delay="2">
                Prior strategy, clause history, negotiation posture,
                client preferences, approval pathways, opposing counsel
                patterns — this is the real product of legal practice.
                It compounds in the minds of senior partners over decades.
                It resets when they leave, when a client moves, or when
                the matter closes and the file gets archived.
              </p>
              <p className="bd-body" data-reveal data-delay="2">
                The tools the firm buys — document management, research
                platforms, drafting assistants, contract lifecycle systems —
                can retrieve and generate. None of them remember. None of
                them are owned by the firm in any meaningful sense.
              </p>
            </div>
            <div data-reveal data-delay="2">
              {[
                {
                  label: 'Document-heavy',
                  value: 'Every matter generates drafts, redlines, approvals, and correspondence that contain institutional judgment — stored but never synthesized.',
                },
                {
                  label: 'Precedent-driven',
                  value: 'Legal practice runs on pattern recognition. Which clauses hold, which positions get approved, which arguments succeed — that pattern lives in people.',
                },
                {
                  label: 'Penalty-heavy',
                  value: 'Inconsistent advice, reused deprecated language, and poor matter continuity expose the firm to malpractice risk, client attrition, and reputational damage.',
                },
                {
                  label: 'Personnel-fragile',
                  value: 'A partner\'s departure takes decades of client relationship context, negotiation posture, and practice judgment. No knowledge base was ever built to catch it.',
                },
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
            Every legal AI deployment today<br />makes lawyers faster.
          </h2>
          <p className="bd-lead" data-reveal data-delay="1">
            None of them make the firm smarter. That&apos;s the gap.
          </p>

          {/* Comparison table */}
          <div data-reveal data-delay="2" style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-gold)' }}>
                  {['', 'Typical Legal AI Tool', 'LongStrider'].map((h, i) => (
                    <th key={i} style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: i === 2 ? 'var(--color-gold-dim)' : 'var(--color-text-muted)',
                      fontWeight: 400,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-body)', fontWeight: 500, whiteSpace: 'nowrap', width: '140px' }}>
                      {row.category}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                      {row.typical}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {row.ls}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bd-signal-list" style={{ marginTop: '40px' }} data-reveal data-delay="2">
            {[
              {
                icon: '↗',
                title: 'Partner departure resets decades of accumulated judgment',
                desc: 'Client relationship context, preferred negotiation posture, and approved risk positions live in the partner\'s memory — not in any system the firm controls. When they leave, it all leaves with them.',
              },
              {
                icon: '⟲',
                title: 'Approved precedent gets rediscovered, not reused',
                desc: 'The same clause gets drafted, reviewed, and approved repeatedly across matters — because the prior approval exists only as a document buried in a closed file, not as accessible institutional knowledge.',
              },
              {
                icon: '⊘',
                title: 'Matter handoffs lose the reasoning, not just the context',
                desc: 'When a matter changes hands — through staffing, departure, or lateral movement — the data transfers. The strategy doesn\'t. Why certain positions were taken. Which concessions were deliberate. What the client said privately.',
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
                Above the stack.<br />Not in place of it.
              </h2>
              <p className="bd-body" data-reveal data-delay="1">
                LongStrider doesn&apos;t require the firm to replace its
                document management system, precedent bank, research
                platform, contract lifecycle tools, or billing workflows.
                It becomes the layer that synthesizes what those systems
                know, what lawyers repeatedly decide, and what the firm
                wants preserved as reusable intelligence.
              </p>
              <p className="bd-body" data-reveal data-delay="1">
                For each matter, LongStrider retains the strategic arc:
                prior drafts, fallback clauses, approved risk posture,
                negotiation tradeoffs, opposing counsel patterns, client
                preferences, and partner instructions. Memory can be scoped
                to the matter, client, practice group, or firm — governed
                by policy, not improvisation.
              </p>
              <p className="bd-body" data-reveal data-delay="1">
                The model stays the firm&apos;s choice. Switch providers
                as models improve or on-premise requirements change —
                the accumulated intelligence layer remains exactly where
                the firm built it. The model may change. What the firm
                knows does not reset.
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
                  'Document Management · Precedent Bank',
                  'Research Platform · Drafting Tools',
                  'Contract Lifecycle · Matter Management',
                  'Email · Billing · Knowledge Repositories',
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
                The intelligence layer sits above everything the firm already uses — synthesizing without replacing, accumulating without interrupting existing workflows.
              </p>
            </div>
          </div>
        </section>

        {/* ══ 04 — WHAT CHANGES ═════════════════════════════════════ */}
        <section className="bd-section">
          <span className="bd-section-num">04</span>
          <span className="bd-section-label">What Changes</span>
          <h2 className="bd-section-h2" data-reveal>
            Four roles. One intelligence layer.<br />Every interaction compounds.
          </h2>
          <p className="bd-lead" data-reveal data-delay="1" style={{ marginBottom: '32px' }}>
            The business case is broader than cutting drafting time.
            LongStrider reduces rework, improves handoffs, increases
            consistency, and preserves the reasoning behind legal decisions.
          </p>

          {/* Scenarios table */}
          <div data-reveal data-delay="2" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-gold)' }}>
                  {['Role', 'What they need', 'What LongStrider uses', 'What changes'].map((h, i) => (
                    <th key={i} style={{
                      padding: '10px 14px',
                      textAlign: 'left',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '9px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      fontWeight: 400,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCENARIOS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-subtle)', verticalAlign: 'top' }}>
                    <td style={{ padding: '14px', color: 'var(--color-gold-dim)', fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                      {row.user}
                    </td>
                    <td style={{ padding: '14px', color: 'var(--color-text-body)', lineHeight: 1.6 }}>{row.ask}</td>
                    <td style={{ padding: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{row.uses}</td>
                    <td style={{ padding: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurable outcomes */}
          <div style={{ marginTop: '48px' }} data-reveal data-delay="2">
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '16px' }}>
              Measurable outcomes
            </span>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    {['Operational outcome', 'What the firm measures'].map((h, i) => (
                      <th key={i} style={{
                        padding: '10px 14px',
                        textAlign: 'left',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '9px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        fontWeight: 400,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {OUTCOMES.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < OUTCOMES.length - 1 ? '1px solid var(--color-border-subtle)' : 'none', verticalAlign: 'top' }}>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-body)', fontWeight: 500, whiteSpace: 'nowrap', lineHeight: 1.5 }}>{row.outcome}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{row.measure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Simulation */}
          <div style={{ marginTop: '48px' }} data-reveal data-delay="2">
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '20px' }}>
              Institutional memory — in practice
            </span>
            <div className="auto-simulation">
              <div className="auto-sim-context">
                Context: A significant data licensing dispute just came in. The partner who handled the most relevant prior matter is on leave. The institutional position — and the reasoning behind a posture change made 18 months ago — needs to be recovered before the client brief.
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
          <span className="bd-section-label">Governance & Sovereignty</span>
          <h2 className="bd-section-h2" data-reveal>
            Sovereignty is structural.<br />Not a marketing layer.
          </h2>
          <p className="bd-body" style={{ maxWidth: '640px' }} data-reveal data-delay="1">
            Data security is not added after the fact. The firm defines
            where the system runs, what it can access, how memory is
            partitioned, and what categories of intelligence persist.
            Memory scopes by firm, office, practice group, client,
            matter, and role — governed by policy, not improvisation.
          </p>
          <p className="bd-body" style={{ maxWidth: '640px' }} data-reveal data-delay="1">
            LongStrider shows which memories, policies, and prior decisions
            influenced a response — why those items were weighted, and how
            corrections changed future behavior. In legal environments,
            this matters as much as drafting speed.
          </p>

          <div className="bd-sovereignty" data-reveal data-delay="2">
            <span className="bd-sovereignty-label">What the firm permanently owns</span>
            <p className="bd-sovereignty-statement">
              &ldquo;The firm is no longer buying access to tools that
              generate language. It is building a proprietary intelligence
              layer that compounds with every matter, every correction,
              every partner approval, and every governed knowledge update.&rdquo;
            </p>
            <ul className="bd-owns-list">
              {[
                'Firm-owned intelligence — not vendor-owned memory',
                'Matter- and role-scoped access with deliberate permission boundaries',
                'Clear provenance for every clause suggestion, summary, and strategic recommendation',
                'Versioned knowledge management — approved language promoted and deprecated intentionally',
                'Correction logging — the system improves through supervised legal feedback, not silent drift',
                'Full audit trail — AI activity that is reviewable, defensible, and ready for due diligence',
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
            Ready to build practice intelligence<br />your firm actually owns?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-text-muted)',
            marginBottom: '36px',
          }}>
            90-day pilot. Your environment. Your intelligence stays yours.
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
