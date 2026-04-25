'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import './deck.css';
import { StoryTimeline } from '@/components/story-timeline';

// ── SECTION IDS & TIMELINE CONFIG ─────────────────────────────

interface TimelineNode {
  id: string;
  label: string;
  color: string;
  glow: string;
  gated: boolean;
}

const GOLD   = '#c8a96e';
const PURPLE = '#8b5cf6';
const GOLD_G  = 'rgba(200,169,110,0.4)';
const PURP_G  = 'rgba(139,92,246,0.45)';

const TIMELINE: TimelineNode[] = [
  { id: 'hero',        label: 'LongStrider',   color: GOLD,   glow: GOLD_G,  gated: false },
  { id: 'gap',         label: 'The Evidence',  color: PURPLE, glow: PURP_G,  gated: false },
  { id: 'what',        label: 'What It Is',    color: GOLD,   glow: GOLD_G,  gated: false },
  { id: 'moat',        label: 'Your Moat',     color: PURPLE, glow: PURP_G,  gated: false },
  { id: 'practice',    label: 'In Practice',   color: GOLD,   glow: GOLD_G,  gated: false },
  { id: 'who',         label: "Who It's For",  color: PURPLE, glow: PURP_G,  gated: false },
  { id: 'how',         label: 'How It Works',  color: GOLD,   glow: GOLD_G,  gated: false },
  { id: 'competitive', label: 'Competitive',   color: PURPLE, glow: PURP_G,  gated: false },
  { id: 'engage',      label: "What's Next",   color: GOLD,   glow: GOLD_G,  gated: false },
];

// ── CONTENT DATA ──────────────────────────────────────────────

const CAPABILITIES = [
  { number: '01', title: 'A programmable intelligence kernel — configured for your business', body: 'Most AI has guardrails bolted on after the fact. LongStrider has a programmable operating system — eighteen governing principles that define how the system thinks, communicates, challenges, and stays in bounds. Configure it for a legal firm and it operates one way. Configure it for a PE fund and it operates another. Same intelligence engine. Different operating mind. Entirely yours.' },
  { number: '02', title: 'It retrieves understanding, not documents', body: "When you need an answer, the system doesn't search a document index. It scores every candidate memory across five axes simultaneously — semantic relevance, gravity-weighted significance, named entity relationships, recency decay, and organizational knowledge cluster membership. The output isn't a list of results. It's a narrative arc: where things started, how they shifted, where they are now. The system infers relationships you never declared." },
  { number: '03', title: 'It gets smarter while you sleep', body: 'Every night, a five-pass background engine runs without being asked. It recalculates the gravity of every knowledge cluster, identifies which ones are healthy or drifting, generates canonical summaries, maps cluster relationships, and builds a predictive signal about where organizational priorities are likely to shift next. The system compounds without anyone maintaining it — because compounding is the architecture, not a feature.' },
  { number: '04', title: 'It has the integrity to challenge you', body: "Every other AI is optimized to keep the conversation rolling. LongStrider is the only system with a constitutional mechanism that prevents it from telling you what you want to hear under pressure. When integrity risk exceeds threshold — measured across authenticity, contradiction density, and cognitive load — the system stops rather than capitulates. Evidence-based pushback, grounded in everything the system has observed about your business. And the architecture enforces it." },
  { number: '05', title: 'The interface remembers too', body: 'There are no threads. There is no session limit. The conversation is infinite — a single, continuous timeline that spans every interaction since the system went live. Every response is weighted in real time: mark it accurate and the system reinforces that understanding; correct it and the gravity of that memory shifts immediately, firing the intelligence pipeline before you finish typing. The interface is not a chat window. It is a living record of everything the system has learned.' },
];

const SCENARIOS = [
  { title: 'The Board Meeting', paragraphs: [
    'Tuesday afternoon. A partner asks why a key client\'s engagement has shifted — and what\'s actually driving it.',
    'Without LongStrider, that question takes two days. Someone pulls CRM data. Someone digs through email. Someone remembers a conversation from March that never got documented. The answer arrives as a spreadsheet with no story.',
    'With LongStrider, the system has already been consolidating this overnight — strengthening the connections between that client\'s interactions, weighting what mattered operationally, aging out what didn\'t. The answer arrives as a trajectory: here\'s where the relationship was, here\'s when the shift started, here\'s the conversation that preceded it, and here are two other accounts following the same arc. Not a report. An understanding.',
  ]},
  { title: 'The Key Departure', paragraphs: [
    'Your head of client services gives two weeks\' notice on a Friday. She\'s been with you for eleven years. She knows every key account personally — the politics, the preferences, the history that never made it into a CRM record.',
    'On Monday morning, her replacement opens LongStrider. Everything she knew is there — not as a knowledge dump, but as living intelligence. The relationship trajectories. The conversations that shaped each engagement. The moments when a client\'s tone shifted before anyone noticed. Eleven years of institutional understanding, consolidated overnight, every night, since the system went live.',
    'Her expertise didn\'t walk out the door. It became part of the organization\'s permanent intelligence — weighted, connected, and available to everyone who needs it. Not because someone asked her to document it. Because the system was learning alongside her the entire time.',
  ]},
  { title: 'Ninety Days In', paragraphs: [
    'Ninety days after deployment. Nobody\'s maintaining the system. Nobody\'s feeding it data. But this morning\'s briefing flagged something: a pricing decision your team made last week contradicts a pattern the system has been tracking for three months.',
    'It doesn\'t just show you the data. It shows you the trajectory — what happened last time, what changed, and why the current path looks familiar. It pushes back, with evidence, because the longitudinal data earned it the right to.',
    'This is what compounding intelligence looks like. Not a tool that answers questions. A system that asks them — before you knew to.',
  ]},
];

const PERSONAS = [
  { type: 'The PE-Backed Portfolio Company', body: "Your board didn't ask whether you're using AI. They asked what you own. You've been given a window — and it's not wide. LongStrider deploys in ninety days, compounds from week one, and gives you something that shows up in due diligence. Not a subscription renewal. A line item on the asset side." },
  { type: 'The Regulated-Industry Operator', body: "Financial services. Healthcare. Legal. Your data doesn't leave your perimeter — full stop. Not because you're cautious. Because your regulators, your clients, and your counsel require it. LongStrider was architected for exactly this: sovereign deployment, full data residency, air-gapped where required. Compliance-ready by design, not by afterthought." },
  { type: 'The Professional Services Firm', body: "Your product is what your people know. Every methodology, every client relationship, every hard-won pattern — it lives in people, not systems. When they leave, it goes with them. LongStrider makes your firm's institutional intelligence permanent. Not a knowledge base someone has to maintain. A living system that learns alongside your team and stays when they don't." },
  { type: 'The Technology Company Building on AI', body: "You're building products on top of models. Workflows. Pipelines. Intelligent applications. Everything you're building is only as smart as what it remembers — and right now, it resets every session. LongStrider isn't a replacement for what you've built. It's the intelligence layer underneath it that makes everything you deploy compound, context-aware, and worth defending. Not a competitor. A foundation." },
];

const COMPETITORS = [
  { name: 'The Model Providers', body: "The model providers want your data. All of them. Not because they're malicious — because their business model depends on it. Every conversation your team has on their platforms makes their models smarter. Not yours. Theirs. When they offer you \"memory\" or \"institutional intelligence,\" read the fine print. Your knowledge is the product. It always was." },
  { name: 'The Enterprise Search Layer', body: "The enterprise search and productivity layer are retrieval systems dressed up as intelligence. They find things. They summarize things. They do not understand your business, remember what actually mattered, or get smarter about your specific operational reality over time. Retrieval is not intelligence. Never was." },
  { name: 'The Memory Infrastructure Startups', body: "The memory infrastructure startups are building real technology. We respect the work. But they are solving a different problem — developer plumbing for engineers building applications. APIs that store and retrieve interactions. Neither category was architected from day one for the enterprise that needs to accumulate, weight, compound, challenge, and fully own its institutional intelligence. Storage is not intelligence. Retrieval is not understanding." },
];

// ── PAGE COMPONENT ──────────────────────────────────────────────

export default function ManifestoPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // data-reveal fade-in observer (manifesto-specific)
  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('deck-visible');
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observerRef.current?.observe(el);
    });
  }, []);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="deck-page">
      <div className="deck-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="deck-aurora-1" />
      <div className="deck-aurora-2" />
      <div className="deck-aurora-3" />



      <StoryTimeline nodes={TIMELINE} unlockGated={true} />

      <main className="deck-container">

        {/* ── HERO ─────────────────────────────── */}
        <section className="deck-hero" data-section="hero">
          <div data-reveal>
            <div className="deck-wordmark">LongStrider</div>
            <div className="deck-tagline-row">Sovereign · Persistent · Compounding · Living Memory</div>
          </div>
          <div data-reveal data-delay="1" className="deck-divider" />
          <div data-reveal data-delay="2">
            <h1 className="deck-hero-heading">
              The Intelligence layer that knows your business — and never forgets.
            </h1>
          </div>
          <div data-reveal data-delay="3">
            <div className="deck-pain-points">
              <div className="deck-pain-opener">Every dollar your organization spent on AI this year made someone else&apos;s platform smarter.</div>
              <div className="deck-pain-line">The decision your team made six months ago.</div>
              <div className="deck-pain-line">The client context that only one person carries in their head.</div>
              <div className="deck-pain-line">The pattern that only shows up when you look across everything at once.</div>
              <div className="deck-pain-closer">It only taught the LLM — when they leave, their knowledge goes with them.</div>
            </div>
            <p className="deck-body">
              LongStrider isn&apos;t a tool you subscribe to. It&apos;s an intelligence asset you own that sits above your existing stack, makes sense of everything your tools know, and gets smarter every day without anyone maintaining it.
            </p>
            <p className="deck-body" style={{ fontWeight: 500, color: 'rgba(255,255,255,0.90)' }}>
              Permanently. Sovereign. Yours.
            </p>
            <div className="deck-cta-moment">
              <span className="deck-cta-text">LongStrider closes the gap between what your AI stack knows and what your organization knows.</span>
            </div>
          </div>
        </section>

        <div data-reveal className="deck-divider" />

        {/* ── THE GAP ──────────────────────────── */}
        <section className="deck-section" data-section="gap">
          <div data-reveal>
            <div className="deck-label">The Evidence</div>
            <h2 className="deck-heading">Every AI You Buy or Build Starts from Zero</h2>
          </div>
          <div data-reveal data-delay="1">
            <p className="deck-lead">
              Your tools execute. Your dashboards visualize. Your search finds documents.<br />
              And not one of them remembers.
            </p>
          </div>
          <div data-reveal data-delay="2">
            <p className="deck-body">
              The race to the bottom everyone predicted — it&apos;s here. The model is already commodity.
            </p>
            <p className="deck-body">
              Every model provider is building &ldquo;memory&rdquo; features that retain your preferences, your history, your patterns. But read the fine print: it&apos;s their memory, not yours. Every conversation your team has on their platforms makes the vendor&apos;s models smarter — and your competitor&apos;s experience identical to yours.
            </p>
            <p className="deck-body">
              Nobody asks which search algorithm powers the bar they type into. They won&apos;t ask which model runs your stack either. And when the next model drops — cheaper, faster, better — they&apos;ll switch. And they&apos;ll start from zero. Again.
            </p>
            <p className="deck-body">
              The question your organization hasn&apos;t answered yet: what happens to everything you learn between now and when you switch again? Where does that go? Who owns it?
            </p>
            <p className="deck-body" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.88)' }}>
              That layer wasn&apos;t built.
            </p>
            <p className="deck-body" style={{ fontWeight: 500, color: 'rgba(255,255,255,0.95)' }}>
              Until now.
            </p>
          </div>
        </section>

        {/* ── WHAT LONGSTRIDER IS ───────────────── */}
        <section className="deck-section" data-section="what">
          <div data-reveal>
            <div className="deck-label">What It Is</div>
            <h2 className="deck-heading">The Intelligence Layer That Was Never Built</h2>
          </div>
          <div data-reveal data-delay="1">
            <p className="deck-body">
              LongStrider is the layer that sits above your existing stack — synthesizing what every tool knows, accumulating what actually mattered, compounding it over time. It doesn&apos;t replace your tools. It&apos;s what makes them worth keeping.
            </p>
            <p className="deck-body">
              The system adapts at every scale. For an individual, it learns how you think and what you need. For a team, it builds shared operational context that survives personnel changes. For an enterprise, it accumulates institutional intelligence across thousands of users, dozens of systems, and years of decisions — all sovereign, all yours.
            </p>
            <p className="deck-body">
              This isn&apos;t a black box. Every response shows which memories it weighted, why they scored above others, and what the system learned from them. Disagree with an answer — correct it in the interface and the system immediately adjusts, logs the correction, and reweights that understanding. The intelligence it builds is auditable because every decision it makes leaves a record.
            </p>
          </div>
        </section>

        {/* ── YOUR MOAT ────────────────────────── */}
        <section className="deck-section" data-section="moat">
          <div data-reveal>
            <div className="deck-label">Your Moat</div>
            <h2 className="deck-heading">What You&apos;re Actually Building</h2>
          </div>
          <div data-reveal data-delay="1">
            <p className="deck-lead">Every company using AI today is building on rented land.</p>
          </div>
          <div data-reveal data-delay="2">
            <p className="deck-body">
              The models get smarter every quarter. The prices drop every month. And when you switch providers — and you will — you start over with nothing.
            </p>
            <p className="deck-body">
              The companies that win the next decade won&apos;t be the ones with access to the best models. Everyone has access to the same models. They&apos;ll be the ones who built something the models can&apos;t replace — a proprietary intelligence layer that knows their business, compounds over time, and belongs entirely to them.
            </p>
            <p className="deck-body">
              That&apos;s your moat. The asset that shows up on a term sheet, survives an acquisition, and gives every tool in your stack an advantage your competitor can&apos;t buy.
            </p>
            <p className="deck-body">
              LongStrider is how you build it. Starting today.
            </p>
            <p className="deck-body" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.88)' }}>
              The models will keep getting smarter. The question is whether they&apos;re getting smarter about your business — or just smarter in general.
            </p>
          </div>
        </section>

        {/* ── IN PRACTICE ── */}
        <>
            <section className="deck-section" data-section="practice">
              <div data-reveal>
                <div className="deck-label">In Practice</div>
                <h2 className="deck-heading">What This Looks Like in the Room</h2>
              </div>
              {SCENARIOS.map((scenario, i) => (
                <div key={scenario.title} className="deck-scenario" data-reveal data-delay={String(i + 1)}>
                  <div className="deck-scenario-title">{scenario.title}</div>
                  {scenario.paragraphs.map((para, j) => (
                    <p key={j} className="deck-body" style={{ fontSize: '17px', marginBottom: j < scenario.paragraphs.length - 1 ? '18px' : '0' }}>
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </section>

            {/* ── WHO THIS IS FOR ── */}
            <section className="deck-section" data-section="who">
              <div data-reveal>
                <div className="deck-label">Audience</div>
                <h2 className="deck-heading">Who This Is For</h2>
              </div>
              {PERSONAS.map((persona, i) => (
                <div key={persona.type} className="deck-persona" data-reveal data-delay={String((i % 3) + 1)}>
                  <div className="deck-persona-type">{persona.type}</div>
                  <p className="deck-persona-body">{persona.body}</p>
                </div>
              ))}
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="deck-section" data-section="how">
              <div data-reveal>
                <div className="deck-label">Architecture</div>
                <h2 className="deck-heading">How It Works — In Plain Terms</h2>
              </div>
              <div data-reveal data-delay="1">
                <p className="deck-body" style={{ marginBottom: '44px' }}>
                  LongStrider is a sovereign intelligence layer — model-agnostic, positioned between your organization and whatever LLM you choose to use. It doesn&apos;t replace the model. It makes the model aware of your business in ways no model provider can give you. Five capabilities. No other system has all of them.
                </p>
              </div>
              {CAPABILITIES.map((cap, i) => (
                <div key={cap.number} className="deck-capability" data-reveal data-delay={String(Math.min(i + 2, 6))}>
                  <div className="deck-capability-number">{cap.number}</div>
                  <div>
                    <div className="deck-capability-title">{cap.title}</div>
                    <div className="deck-capability-body">{cap.body}</div>
                  </div>
                </div>
              ))}
            </section>

            {/* ── COMPETITIVE ── */}
            <section className="deck-section" data-section="competitive">
              <div data-reveal>
                <div className="deck-label">Competitive Landscape</div>
                <h2 className="deck-heading">A Category That Wasn&apos;t Built</h2>
              </div>
              {COMPETITORS.map((comp, i) => (
                <div key={comp.name} className="deck-competitor" data-reveal data-delay={String(i + 1)}>
                  <div className="deck-competitor-name">{comp.name}</div>
                  <p className="deck-competitor-body">{comp.body}</p>
                </div>
              ))}
              <div data-reveal data-delay="4">
                <p className="deck-body" style={{ marginTop: '40px', fontStyle: 'italic', color: 'rgba(255,255,255,0.88)' }}>
                  Most AI remembers everything and agrees with everything. LongStrider remembers everything and has the integrity to challenge you.
                </p>
              </div>
            </section>

            {/* ── WHAT'S NEXT ── */}
            <section className="deck-section" data-section="engage">
              <div data-reveal>
                <div className="deck-label">What&apos;s Next</div>
                <h2 className="deck-heading">Four Tiers. One Decision.</h2>
              </div>
              <div data-reveal data-delay="1">
                <p className="deck-body">
                  LongStrider isn&apos;t a SaaS subscription you spin up and forget. It&apos;s institutional intelligence you <span style={{ color: GOLD }}>build</span>, <span style={{ color: GOLD }}>own</span>, and <span style={{ color: GOLD }}>compound</span> — configured for your environment, your regulatory requirements, and your timeline. We work with organizations across four deployment models.
                </p>
              </div>
              <div data-reveal data-delay="2" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div className="deck-deploy-card" style={{ border: '1px solid rgba(200,169,110,0.2)', borderRadius: '4px', background: 'rgba(200,169,110,0.04)' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.7)', marginBottom: '10px', fontFamily: 'var(--font-ui)' }}>Hosted Intelligence</div>
                  <p className="deck-body" style={{ marginBottom: 0 }}>Your data stays in your environment. The intelligence engine runs in a dedicated instance we operate — isolated to your organization, accessible via API, no shared infrastructure. You own the knowledge. We run the engine.</p>
                </div>
                <div className="deck-deploy-card" style={{ border: '1px solid rgba(200,169,110,0.15)', borderRadius: '4px', background: 'rgba(200,169,110,0.025)' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', marginBottom: '10px', fontFamily: 'var(--font-ui)' }}>Private Cloud</div>
                  <p className="deck-body" style={{ marginBottom: 0 }}>For organizations requiring complete network control. The intelligence engine deploys as containerized software into your private cloud — your VPC, your servers, your perimeter. No external calls. No source code. Full data residency.</p>
                </div>
                <div className="deck-deploy-card" style={{ border: '1px solid rgba(200,169,110,0.1)', borderRadius: '4px', background: 'rgba(200,169,110,0.015)' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '10px', fontFamily: 'var(--font-ui)' }}>Sovereign Build</div>
                  <p className="deck-body" style={{ marginBottom: 0 }}>For the most sensitive environments. We build alongside your team — containerized, compiled, no source code transferred. When the engagement is complete, the intelligence layer, the knowledge graph, and every compounding insight belong to you. Permanently.</p>
                </div>
                <div className="deck-deploy-card" style={{ border: '1px solid rgba(200,169,110,0.08)', borderRadius: '4px', background: 'rgba(200,169,110,0.015)' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.45)', marginBottom: '10px', fontFamily: 'var(--font-ui)' }}>Partner Program</div>
                  <p className="deck-body" style={{ marginBottom: 0 }}>Deploy LongStrider under your brand, in your client environments. For consultancies, managed service providers, and technology firms building institutional intelligence into their own offerings. You bring the relationships and the vertical knowledge. The intelligence engine is yours to operate, configure, and take to market.</p>
                </div>
              </div>
              <div data-reveal data-delay="3">
                <p className="deck-body" style={{ marginTop: '48px', fontStyle: 'italic', color: 'rgba(255,255,255,0.88)' }}>
                  We don&apos;t sell seat licenses. We build institutional intelligence together. What gets built belongs to you.
                </p>
              </div>
            </section>

            {/* ── FINAL QUOTE ── */}
            <div data-reveal className="deck-final-quote">
              You&apos;re not buying software. You&apos;re buying the head start we spent years building for you.
            </div>

            {/* ── FOOTER ── */}
            <footer className="deck-footer" data-reveal>
              <p className="deck-footer-headline">
                Bring us your hardest problem.
              </p>
              <p className="deck-body" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 32px', color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7' }}>
                If what you read resonates — if you recognize your organization in these pages — start a pilot.
              </p>
              <Link href="/pilot" className="deck-footer-button">
                <span>Start a pilot</span>
                <span style={{ fontSize: '14px', opacity: 0.7 }}>→</span>
              </Link>
              <Link href="/contact" className="deck-footer-button" style={{ marginTop: '12px' }}>
                <span>See it in action</span>
                <span style={{ fontSize: '14px', opacity: 0.7 }}>→</span>
              </Link>

            </footer>
          </>
      </main>
    </div>
  );
}
