'use client';

import Reveal from '../Reveal';
import ShieldVisual from '../visuals/ShieldVisual';
import { shieldFramework } from '@/lib/tokenomics-data';

export default function ShieldFrameworkSection() {
  return (
    <section id="framework" className="te-sec te-sec-alt">
      <div className="page-container">
        <div className="te-split">
          <Reveal variant="scale">
            <ShieldVisual />
          </Reveal>
          <div>
            <Reveal variant="left">
              <span className="te-label">{shieldFramework.title}</span>
              <h2 className="te-split-title">
                {shieldFramework.lead} <em>{shieldFramework.emphasis}</em>
              </h2>
              <p className="te-body">{shieldFramework.body}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
