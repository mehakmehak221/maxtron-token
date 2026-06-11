'use client';

import { useEffect, useState } from 'react';
import { Vote } from 'lucide-react';
import Reveal from '../Reveal';
import EcosystemHub from '../visuals/EcosystemHub';
import { governanceContent } from '@/lib/tokenomics-data';

export default function GovernanceSection() {
  const [active, setActive] = useState<number | null>(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((v) => ((v ?? 0) + 1) % governanceContent.scope.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="governance" className="te-sec">
      <div className="page-container">
        <div
          className="te-gov-shell te-glass"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal variant="up">
            <div className="te-gov-head">
              <span className="te-label">{governanceContent.title}</span>
              <p className="te-gov-lead">{governanceContent.body}</p>
            </div>
          </Reveal>

          <div className="te-gov-split">
            <Reveal variant="scale">
              <EcosystemHub labels={governanceContent.scope} activeIndex={active} />
            </Reveal>

            <div className="te-gov-side">
              <Reveal variant="right">
                <p className="te-gov-scope-intro">{governanceContent.scopeIntro}</p>
              </Reveal>
              <div className="te-gov-grid">
                {governanceContent.scope.map((pt, i) => (
                  <Reveal key={pt} variant="up" delay={i * 50}>
                    <button
                      type="button"
                      className={`te-gov-item${active === i ? ' te-gov-item-on' : ''}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                    >
                      <Vote className="h-3.5 w-3.5 shrink-0 text-[#c084fc]" />
                      <span>{pt}</span>
                    </button>
                  </Reveal>
                ))}
              </div>
              <Reveal variant="up" delay={200}>
                <div className="te-gov-callout">
                  <p>{governanceContent.isolation}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
