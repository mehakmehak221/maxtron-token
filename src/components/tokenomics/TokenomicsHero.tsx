'use client';

import { ArrowRight, BarChart3, ShieldCheck, Target } from 'lucide-react';
import QuarterlyLineChart from '../charts/QuarterlyLineChart';
import Reveal from '../Reveal';
import { allocations, heroContent, heroMetrics } from '@/lib/tokenomics-data';

export default function TokenomicsHero() {
  return (
    <section id="overview" className="te-hero">
      <div className="te-hero-halo" aria-hidden />

      <div className="page-container">
        <Reveal eager variant="blur">
          <p className="te-kicker">{heroContent.kicker}</p>
        </Reveal>
        <Reveal eager variant="blur" delay={80}>
          <h1 className="te-h1">
            A <span className="te-gradient-text">Shield</span>, Not A{' '}
            <span className="te-gradient-text">Security</span>
          </h1>
        </Reveal>
        <Reveal eager variant="up" delay={160}>
          <p className="te-lead">{heroContent.lead}</p>
          <p className="te-lead" style={{ marginTop: '0.65rem' }}>{heroContent.body}</p>
          <p className="te-note">{heroContent.footnote}</p>
        </Reveal>
        <Reveal eager variant="up" delay={240}>
          <div className="te-hero-btns">
            <a href="#framework" className="te-btn te-btn-primary">
              Shield Framework <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#supply" className="te-btn te-btn-outline">Supply & Distribution</a>
          </div>
        </Reveal>

        <div className="te-hero-arc" aria-hidden />

        <Reveal eager variant="up" delay={300}>
          <div className="te-hero-cards">
            <div className="te-glass te-feature-card w3-metric-enter">
              <div className="te-feature-icon"><Target className="h-4 w-4" /></div>
              <h3>{allocations[0].name}</h3>
              <p>{allocations[0].percent}% · {allocations[0].amount}</p>
            </div>
            <div className="te-glass te-feature-card w3-metric-enter">
              <div className="te-feature-icon"><ShieldCheck className="h-4 w-4" /></div>
              <h3>{heroMetrics[1].label}</h3>
              <p>{heroMetrics[1].value}</p>
            </div>
            <div className="te-glass te-stat-card-chart w3-metric-enter">
              <div className="te-chart-card-head">
                <h4>{heroMetrics[3].label}</h4>
                <BarChart3 className="h-4 w-4 text-[#c084fc]" />
              </div>
              <p>{heroMetrics[3].value}</p>
              <div className="te-chart-slot">
                <QuarterlyLineChart />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal eager variant="up" delay={380}>
          <div className="te-metrics-strip">
            {heroMetrics.map((m) => (
              <div key={m.label} className="te-glass te-metric-pill w3-metric-enter">
                <span>{m.label}</span>
                <strong>{m.value}</strong>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
