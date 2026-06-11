'use client';

import { useEffect, useState } from 'react';
import AnimatedAreaChart from '../charts/AnimatedAreaChart';
import Reveal from '../Reveal';
import { valueCreation, valueCreationIntro } from '@/lib/tokenomics-data';

const areaData = valueCreation.map((item, i) => ({
  label: item.title,
  value: [55, 72, 48, 100][i],
}));

export default function ValueCreationSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % valueCreation.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="value" className="te-sec te-sec-alt">
      <div className="page-container">
        <div
          className="te-value-shell te-glass"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal variant="up">
            <div className="te-value-head">
              <span className="te-label">Value Creation Model</span>
              <h2 className="te-value-intro">{valueCreationIntro}</h2>
            </div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="te-value-chart-band">
              <AnimatedAreaChart data={areaData} activeIndex={active} height={112} />
            </div>
          </Reveal>

          <div className="te-value-grid">
            {valueCreation.map((item, i) => (
              <Reveal key={item.title} variant="up" delay={120 + i * 60}>
                <button
                  type="button"
                  className={`te-value-tile${active === i ? ' te-value-tile-on' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="te-value-tile-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
