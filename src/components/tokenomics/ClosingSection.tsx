'use client';

import Reveal from '../Reveal';
import { closingContent } from '@/lib/tokenomics-data';

export default function ClosingSection() {
  return (
    <section className="te-closing">
      <div className="te-closing-glow" aria-hidden />
      <div className="page-container" style={{ position: 'relative' }}>
        <Reveal variant="blur">
          <h2 className="te-split-title" style={{ textAlign: 'center', maxWidth: '32rem', margin: '0 auto' }}>
            {closingContent.title}
          </h2>
        </Reveal>
        <Reveal variant="up" delay={80}>
          {closingContent.lines.map((line) => (
            <p key={line} className="te-body" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0.75rem auto 0' }}>
              {line}
            </p>
          ))}
        </Reveal>
        <Reveal variant="up" delay={160}>
          <div className="te-pillars">
            {closingContent.pillars.map((p) => (
              <span key={p} className="te-pillar w3-pillar">{p}</span>
            ))}
          </div>
        </Reveal>
        <Reveal variant="up" delay={200}>
          <div className="te-hero-btns" style={{ marginTop: '1.75rem' }}>
            <a href="#framework" className="te-btn te-btn-primary">Shield Framework</a>
            <a href="#supply" className="te-btn te-btn-outline">Supply & Distribution</a>
          </div>
        </Reveal>
        <Reveal variant="blur" delay={280}>
          <p className="te-label" style={{ textAlign: 'center', marginTop: '2rem', display: 'block' }}>
            {closingContent.signoff}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
