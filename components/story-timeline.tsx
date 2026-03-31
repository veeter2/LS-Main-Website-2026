'use client';

import { useState, useEffect, useRef } from 'react';
import './story-timeline.css';

// ── Types ────────────────────────────────────────────────────────

export interface StoryNode {
  id:      string;
  label:   string;
  color?:  string;
  glow?:   string;
  gated?:  boolean;
}

interface Props {
  nodes:          StoryNode[];
  /**
   * When false, gated nodes are shown but locked (opacity 0.18, no pointer).
   * When true (default), all nodes are fully interactive.
   * The manifesto passes `isRevealed` here to progressively unlock chapters.
   */
  unlockGated?:   boolean;
  /** Scroll depth (px) before the timeline appears. Default: 300 */
  showAfter?:     number;
}

// ── Component ────────────────────────────────────────────────────

export function StoryTimeline({ nodes, unlockGated = true, showAfter = 300 }: Props) {
  const [activeSection, setActiveSection] = useState<string>(nodes[0]?.id ?? '');
  const [visible, setVisible]             = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track which section is in the viewport
  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 },
    );

    document.querySelectorAll('[data-section]').forEach((el) =>
      observerRef.current?.observe(el),
    );

    return () => observerRef.current?.disconnect();
  }, [nodes]);

  // Show/hide based on scroll depth
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  // Click → smooth scroll to section
  const scrollTo = (id: string) => {
    document.querySelector(`[data-section="${id}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const visibleNodes = unlockGated
    ? nodes
    : nodes.filter((n) => !n.gated);

  const activeIdx = visibleNodes.findIndex((n) => n.id === activeSection);

  return (
    <nav
      aria-label="Page chapters"
      className={`story-timeline${visible ? ' st-visible' : ''}`}
    >
      <div className="story-timeline-line" />

      {visibleNodes.map((node, i) => {
        const isActive = node.id === activeSection;
        const isPassed = i < activeIdx;
        const isGated  = node.gated && !unlockGated;

        return (
          <div
            key={node.id}
            className={[
              'story-timeline-node',
              isActive ? 'st-active' : '',
              isPassed ? 'st-passed' : '',
              isGated  ? 'st-gated'  : '',
            ].filter(Boolean).join(' ')}
            style={{
              '--node-color': node.color ?? '#c8a96e',
              '--node-glow':  node.glow  ?? 'rgba(200,169,110,0.35)',
            } as React.CSSProperties}
            onClick={() => !isGated && scrollTo(node.id)}
            role="button"
            tabIndex={isGated ? -1 : 0}
            aria-label={`Jump to ${node.label}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <div className="story-timeline-dot" />
            <span className="story-timeline-label">{node.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
