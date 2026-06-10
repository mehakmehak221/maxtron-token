'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Ban, BarChart3, Building2, CheckCircle2, Coins, Flame,
  Gauge, Gem, Handshake, KeyRound, Landmark, Layers3, LineChart,
  LockKeyhole, Network, PieChart, Scale, Shield, ShieldCheck, Sparkles,
  Users, Vote, Globe, ChevronRight,
} from 'lucide-react';
import HeroVisual from './HeroVisual';
import ParticleField from './ParticleField';
import Reveal from './Reveal';
import SectionAmbient from './SectionAmbient';
import SectionHeader from './SectionHeader';
import AnalyticsDashboard from './TokenomicsCharts';

type Allocation = { name: string; percent: number; amount: string; color: string; note: string };
type UtilityModule = { title: string; eyebrow: string; icon: typeof Shield; body: string; detail: string; points: string[] };

const supplyFacts = [
  { label: 'Total Supply', value: '1,000,000,000', detail: 'MAXTRON', icon: Coins },
  { label: 'Token Type', value: 'Utility & Compliance', detail: 'Token', icon: Shield },
  { label: 'Blockchain', value: 'EVM Compatible', detail: 'Network', icon: Globe },
  { label: 'Burn Mechanism', value: 'Usage-Based', detail: 'Burn', icon: Flame },
  { label: 'Revenue Share', value: 'None', detail: 'No distribution', icon: Ban },
  { label: 'Rental Income', value: 'Property Tokens', detail: 'Exclusively reserved', icon: Building2 },
];

const firewallPrinciples = [
  { title: 'No Revenue Share', icon: Ban, copy: 'MAXTRON holders do not receive platform fee revenue. Platform revenues remain with the operating business and are not distributed to token holders.', metric: '0%', metricLabel: 'platform revenue to holders' },
  { title: 'No Revenue-Funded Buybacks', icon: ShieldCheck, copy: 'The platform does not use revenue to purchase tokens from the market. Any reduction in supply occurs only through actual platform usage.', metric: 'Use', metricLabel: 'only supply reduction trigger' },
  { title: 'Rental Income Firewall', icon: Landmark, copy: 'Rental income generated from tokenized properties belongs exclusively to Property Token holders. MAXTRON holders have no claim to rental income, property cash flows or real estate ownership rights.', metric: '100%', metricLabel: 'reserved for Property Token holders' },
  { title: 'Earned, Not Sold', icon: Sparkles, copy: 'The ecosystem prioritizes rewarding productive platform participation rather than speculative token accumulation. Users earn value through platform activity, contribution and engagement.', metric: 'Earn', metricLabel: 'through verified contribution' },
];

const utilityModules: UtilityModule[] = [
  { title: 'Issuer Compliance Bond', eyebrow: 'Primary Function', icon: LockKeyhole, body: 'Property sponsors must post MAXTRON as a compliance bond when listing tokenized real estate on the platform.', detail: 'If a property is found to contain fraudulent information, forged documentation or undisclosed encumbrances, the compliance bond may be partially slashed. A portion may be used to compensate affected participants while the remainder is permanently removed from circulation. This mechanism transforms MAXTRON into a trust and accountability layer for real estate tokenization.', points: ['Property verification', 'Ownership validation', 'KYC compliance', 'Valuation integrity', 'Title verification', 'Regulatory compliance'] },
  { title: 'Access & Diligence Credits', eyebrow: 'Primary Function', icon: KeyRound, body: 'Investors use MAXTRON to access premium platform services.', detail: 'A portion of MAXTRON spent on these services is permanently burned. As platform usage increases, token consumption increases.', points: ['Property due diligence reports', 'Valuation reports', 'Deal flow access', 'Investment analytics', 'Market intelligence', 'Verification services'] },
  { title: 'Listing Rewards', eyebrow: 'Ecosystem Growth', icon: Handshake, body: 'The ecosystem rewards participants who contribute high-quality properties to the platform.', detail: 'Property sponsors, strategic partners and ecosystem contributors may earn MAXTRON for introducing verified and investable real estate opportunities. This approach aligns incentives with platform growth and asset quality. Rewards are earned through contribution rather than passive token holding.', points: ['Verified assets', 'Investable opportunities', 'Strategic partners', 'Ecosystem contributors'] },
  { title: 'Governance', eyebrow: 'Operational Layer', icon: Vote, body: 'MAXTRON enables governance participation across the platform.', detail: 'Governance is focused on operational and ecosystem parameters. Governance does not control property-level rental distributions. Property economics remain isolated within individual Property Tokens. Voting influence may be determined through lock-weighted governance mechanisms that encourage long-term participation.', points: ['Verification standards', 'Compliance requirements', 'Listing criteria', 'Bond requirements', 'Platform fee structures', 'Ecosystem growth initiatives'] },
];

const tokenUtilities = [
  { label: 'Compliance Bonding', icon: ShieldCheck },
  { label: 'Property Verification', icon: Building2 },
  { label: 'Due Diligence Access', icon: KeyRound },
  { label: 'Analytics Access', icon: LineChart },
  { label: 'Governance Participation', icon: Vote },
  { label: 'Listing Rewards', icon: Gem },
  { label: 'Platform Fee Discounts', icon: Gauge },
  { label: 'Burn-On-Use Mechanics', icon: Flame },
  { label: 'Ecosystem Participation', icon: Network },
];

const allocations: Allocation[] = [
  { name: 'Ecosystem & Listing Rewards', percent: 30, amount: '300,000,000', color: '#6b28c9', note: 'Largest allocation for contribution, listings and ecosystem growth.' },
  { name: 'Team & Core Contributors', percent: 18, amount: '180,000,000', color: '#581c87', note: 'Long-term builder alignment.' },
  { name: 'Liquidity & Market Making', percent: 12, amount: '120,000,000', color: '#7c3aed', note: 'Exchange depth and orderly market support.' },
  { name: 'Treasury', percent: 13, amount: '130,000,000', color: '#4c1d95', note: 'Platform sustainability and strategic reserves.' },
  { name: 'Compliance & Insurance Reserve', percent: 5, amount: '50,000,000', color: '#9333ea', note: 'Risk reserve for compliance and assurance systems.' },
  { name: 'Seed Allocation', percent: 4, amount: '40,000,000', color: '#3b0764', note: 'Early network formation.' },
  { name: 'Private Allocation', percent: 8, amount: '80,000,000', color: '#a855f7', note: 'Private strategic allocation.' },
  { name: 'Public & Community Distribution', percent: 7, amount: '70,000,000', color: '#8b5cf6', note: 'Public and community participation.' },
  { name: 'Advisors', percent: 3, amount: '30,000,000', color: '#c084fc', note: 'Advisory support for platform maturity.' },
];

const valueModel = [
  { step: '01', title: 'Demand to Bond', copy: 'Every property sponsor must acquire and lock MAXTRON to list assets on the platform. As more properties enter the ecosystem, demand for MAXTRON increases.', value: 'Lock', icon: LockKeyhole },
  { step: '02', title: 'Demand to Spend', copy: 'Investors consume MAXTRON to access reports, analytics, due diligence and premium platform services. As platform activity grows, token consumption increases.', value: 'Spend', icon: KeyRound },
  { step: '03', title: 'Burn Through Usage', copy: 'A portion of MAXTRON used within the platform is permanently removed from circulation. Supply reduction occurs through genuine utility rather than financial engineering.', value: 'Burn', icon: Flame },
  { step: '04', title: 'Fixed Supply', copy: 'The total supply is permanently capped at 1,000,000,000 MAXTRON. No additional tokens may be minted.', value: '1B', icon: Coins },
];

const legalExclusions = ['Equity ownership', 'Property ownership', 'Rental income rights', 'Revenue-sharing rights', 'Dividends', 'Financial securities'];

function roundCoord(n: number) {
  return Math.round(n * 100) / 100;
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: roundCoord(cx + r * Math.cos(rad)),
    y: roundCoord(cy + r * Math.sin(rad)),
  };
}

function describeDonutSlice(cx: number, cy: number, outerR: number, innerR: number, start: number, end: number) {
  const large = end - start > 180 ? 1 : 0;
  const oStart = polarToCartesian(cx, cy, outerR, end);
  const oEnd = polarToCartesian(cx, cy, outerR, start);
  const iStart = polarToCartesian(cx, cy, innerR, start);
  const iEnd = polarToCartesian(cx, cy, innerR, end);
  return `M ${oStart.x} ${oStart.y} A ${outerR} ${outerR} 0 ${large} 0 ${oEnd.x} ${oEnd.y} L ${iStart.x} ${iStart.y} A ${innerR} ${innerR} 0 ${large} 1 ${iEnd.x} ${iEnd.y} Z`;
}

function buildDonutSegments(items: Allocation[]) {
  const gap = 1.2;
  let cursor = 0;
  return items.map((item) => {
    const sweep = (item.percent / 100) * 360 - gap;
    const start = cursor;
    const end = cursor + sweep;
    cursor = end + gap;
    return { ...item, path: describeDonutSlice(150, 150, 122, 88, start, end) };
  });
}

function AllocationBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="allocation-bar overflow-hidden rounded-2xl shadow-sm">
      {allocations.map((a, i) => (
        <div
          key={a.name}
          className="allocation-segment group relative"
          style={{
            flex: a.percent,
            background: a.color,
            transform: vis ? 'scaleY(1)' : 'scaleY(0)',
            transition: `transform .7s ${i * 70}ms cubic-bezier(.22,1,.36,1)`,
            transformOrigin: 'bottom',
          }}
          title={`${a.name}: ${a.percent}%`}
        >
          <span className="allocation-segment-label">{a.percent}%</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ items, activeIndex, onActive, animated }: { items: Allocation[]; activeIndex: number | null; onActive: (i: number | null) => void; animated?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const segments = buildDonutSegments(items);
  const active = activeIndex != null ? items[activeIndex] : null;
  const show = !animated || vis;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[300px]">
      {!mounted ? (
        <div className="absolute inset-4 rounded-full bg-[#f5f3ff]" />
      ) : (
      <svg className="h-full w-full -rotate-90" viewBox="0 0 300 300">
        {segments.map((seg, i) => (
          <path
            key={seg.name}
            d={seg.path}
            fill={seg.color}
            style={{
              filter: activeIndex === i ? `drop-shadow(0 4px 12px ${seg.color}66)` : 'none',
              opacity: show ? (activeIndex != null && activeIndex !== i ? 0.4 : 1) : 0,
              transform: show ? (activeIndex === i ? 'scale(1.04)' : 'scale(1)') : 'scale(0.6)',
              transformOrigin: '150px 150px',
              transition: `all .5s ${i * 60}ms cubic-bezier(.22,1,.36,1)`,
              cursor: 'pointer',
            }}
            onMouseEnter={() => onActive(i)}
            onMouseLeave={() => onActive(null)}
          />
        ))}
      </svg>
      )}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {active ? (
          <>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9b8ab8]">{active.percent}%</span>
            <span className="font-display mt-1 line-clamp-2 text-lg font-black leading-snug text-[#1e0a3c]">{active.name}</span>
          </>
        ) : (
          <>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9b8ab8]">Total Supply</span>
            <span className="font-display mt-1 text-4xl font-black text-[#1e0a3c]">1B</span>
            <span className="mt-0.5 text-xs font-bold text-[#6b28c9]">MAXTRON</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function PageContent() {
  const [activeAllocation, setActiveAllocation] = useState<number | null>(null);
  const [activeUtility, setActiveUtility] = useState(0);

  const currentUtility = utilityModules[activeUtility];
  const CurrentUtilityIcon = currentUtility.icon;

  return (
    <div className="min-h-screen bg-white">

      <section id="overview" className="relative overflow-hidden">
        <div className="bg-hero-gradient absolute inset-0" />
        <div className="bg-grid-light absolute inset-0 opacity-40" />
        <div className="absolute inset-0 z-[1] opacity-30">
          <ParticleField count={90} spread={16} />
        </div>
        <div className="blob blob-purple animate-blob absolute -left-40 -top-40 h-[420px] w-[420px]" />
        <div className="blob blob-violet animate-blob absolute -right-32 bottom-0 h-[320px] w-[320px]" style={{ animationDelay: '-4s' }} />

        <div className="page-container relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-center py-28 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal eager>
                <div className="badge badge-on-purple mb-6">
                  <Shield className="h-3 w-3" />
                  MAXTRON — The Shield Token
                </div>
              </Reveal>

              <Reveal eager delay={40}>
                <h1 className="font-display text-[clamp(3.5rem,9vw,5.5rem)] font-black leading-[0.92] tracking-tight text-white">
                  MAX<span className="text-white/90">TRON</span>
                </h1>
              </Reveal>

              <Reveal eager delay={80}>
                <p className="font-display mt-5 text-[clamp(1.35rem,3vw,2rem)] font-extrabold leading-tight text-white">
                  A Shield, Not A Security
                </p>
              </Reveal>

              <Reveal eager delay={120}>
                <div className="text-on-purple-muted mt-8 max-w-xl space-y-4 text-[15px] leading-[1.75] sm:text-base">
                  <p>MAXTRON is the utility and compliance token powering the next generation of real-world asset (RWA) tokenization.</p>
                  <p>Designed as the foundation of The Shield Framework, MAXTRON enables secure property onboarding, investor verification, compliance enforcement, access management, governance participation and ecosystem growth.</p>
                  <p>Unlike traditional crypto tokens, MAXTRON is not designed to provide dividends, revenue sharing or rental income. Instead, it functions as the operational layer that secures trust across the platform.</p>
                </div>
              </Reveal>

              <Reveal eager delay={160}>
                <div className="trust-marquee mt-8">
                  {['Real-World Assets', 'Tokenized Real Estate', 'EVM Network', 'Compliance Layer', 'Fixed 1B Supply'].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Reveal>

              <Reveal eager delay={200}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a href="#analytics" className="btn-primary">
                    View Analytics <LineChart className="h-4 w-4" />
                  </a>
                  <a href="#allocation" className="btn-secondary btn-secondary-light">
                    Tokenomics <PieChart className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pl-4">
              <Reveal eager delay={80}>
                <HeroVisual />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-purple relative overflow-hidden pb-16 pt-4 sm:pb-20">
        <div className="page-container relative z-10">
          <div className="stat-strip surface-card blockchain-card">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {supplyFacts.map((f, i) => (
                <Reveal key={f.label} delay={i * 50} variant="scale">
                  <div className="stat-cell group border-b border-[#ede9fe] transition hover:bg-[#f5f3ff] sm:border-b-0 sm:border-r sm:border-[#ede9fe] sm:last:border-r-0">
                    <div className="icon-box icon-box-pulse mb-2.5 h-10 w-10 transition group-hover:bg-[#6b28c9] group-hover:text-white">
                      <f.icon className="h-4 w-4" />
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#9b8ab8]">{f.label}</div>
                    <div className="mt-1 text-xs font-black leading-snug text-[#1e0a3c] sm:text-sm">{f.value}</div>
                    <div className="mt-0.5 text-[10px] font-semibold text-[#6b28c9]">{f.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="framework" className="section-white section-glow section-pad relative overflow-hidden">
        <div className="page-container relative z-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
              <SectionHeader
                number="01"
                icon={Layers3}
                eyebrow="The Shield Framework"
                title={<>Real estate tokenization requires more than blockchain infrastructure.</>}
                subtitle="The Shield Framework is designed to protect investors, property sponsors and ecosystem participants through compliance, verification and accountability. MAXTRON serves as the operational token that secures and powers this framework."
              />
              <p className="mt-6 font-display text-2xl font-extrabold text-gradient">It requires trust.</p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {[
                { label: 'Property onboarding', value: 'Verified', icon: Building2 },
                { label: 'Investor verification', value: 'KYC', icon: Users },
                { label: 'Compliance enforcement', value: 'Rules', icon: Scale },
                { label: 'Access management', value: 'Secure', icon: KeyRound },
                { label: 'Governance participation', value: 'Vote', icon: Vote },
                { label: 'Ecosystem growth', value: 'Scale', icon: Network },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 70} variant="scale">
                  <div className="card-modern blockchain-card gradient-border flex h-full min-h-[160px] flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <div className="icon-box h-11 w-11 rounded-2xl">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-[#f5f3ff] px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-[#6b28c9]">Shield</span>
                    </div>
                    <div className="mt-8">
                      <div className="font-display text-3xl font-black text-[#1e0a3c]">{item.value}</div>
                      <div className="mt-1 text-sm font-bold text-[#6b28c9]">{item.label}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-purple section-pad relative overflow-hidden">
        <SectionAmbient theme="dark" density={0.45} />
        <div className="page-container relative z-10">
          <Reveal className="mb-16">
            <SectionHeader
              align="center"
              number="02"
              icon={ShieldCheck}
              eyebrow="The Firewall"
              title="The corrected MAXTRON model is built on four fundamental principles."
              light
            />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {firewallPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} variant="scale">
                <article className="card-modern blockchain-card firewall-card relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#6b28c9] via-[#7c3aed] to-[#a855f7]" />
                  <div className="relative mb-6 flex items-start justify-between gap-4">
                    <div className="icon-box-solid h-12 w-12 shrink-0 rounded-2xl shadow-lg">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-3xl font-black text-[#1e0a3c]">{p.metric}</div>
                      <div className="text-[9px] font-bold uppercase leading-tight tracking-widest text-[#9b8ab8]">{p.metricLabel}</div>
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-black text-[#1e0a3c]">{p.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-[#6b5b8a]">{p.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="utility" className="section-muted section-pad relative overflow-hidden">
        <div className="page-container relative z-10">
          <Reveal className="mb-14">
            <SectionHeader
              number="03"
              icon={Network}
              eyebrow="What MAXTRON Does"
              title="MAXTRON has two primary functions within the ecosystem."
              subtitle="Compliance bonding, access-based utility, listing rewards and governance participation — designed to be used rather than simply held."
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col gap-2 lg:col-span-4">
              {utilityModules.map((mod, idx) => {
                const isActive = activeUtility === idx;
                return (
                  <Reveal key={mod.title} delay={idx * 60} variant="left">
                  <button
                    onClick={() => setActiveUtility(idx)}
                    className={`blockchain-card flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                      isActive
                        ? 'border-[#6b28c9]/30 bg-white shadow-[0_8px_32px_rgba(107,40,201,0.12)]'
                        : 'border-transparent bg-white/80 hover:border-[#ede9fe] hover:bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isActive ? 'icon-box-solid' : 'icon-box'}`}
                    >
                      <mod.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-black text-[#1e0a3c]">{mod.title}</div>
                      <div className="text-[11px] font-bold text-[#6b28c9]">{mod.eyebrow}</div>
                    </div>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition ${isActive ? 'text-[#6b28c9]' : 'text-[#d1d5db]'}`} />
                  </button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="lg:col-span-8" variant="right">
              <div className="card-modern blockchain-card gradient-border h-full overflow-hidden p-7 sm:p-10">
                <div className="mb-8 flex flex-col gap-6 border-b border-[#ede9fe] pb-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="icon-box-solid h-14 w-14 rounded-2xl shadow-lg">
                      <CurrentUtilityIcon className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6b28c9]">{currentUtility.eyebrow}</div>
                      <h3 className="font-display text-2xl font-black text-[#1e0a3c] sm:text-3xl">{currentUtility.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-[#6b5b8a] sm:text-lg">{currentUtility.body}</p>

                {activeUtility === 0 && (
                  <p className="mt-4 text-sm font-semibold text-[#6b28c9]">The bond serves as collateral supporting:</p>
                )}
                {activeUtility === 1 && (
                  <p className="mt-4 text-sm font-semibold text-[#6b28c9]">These include:</p>
                )}
                {activeUtility === 3 && (
                  <p className="mt-4 text-sm font-semibold text-[#6b28c9]">Governance is focused on operational and ecosystem parameters, including:</p>
                )}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {currentUtility.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-3 rounded-xl border border-[#ede9fe] bg-[#f5f3ff] px-4 py-3.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6b28c9]" />
                      <span className="text-sm font-semibold text-[#374151]">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[#ede9fe] bg-[#f5f3ff] p-5 text-sm leading-relaxed text-[#6b5b8a] sm:p-6">
                  {currentUtility.detail}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-14" variant="scale">
            <div className="utility-grid-wrap blockchain-card">
              <div className="mb-6 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-[#6b28c9]">Token Utility</p>
                <p className="mt-2 text-[#6b5b8a]">MAXTRON serves multiple ecosystem functions.</p>
                <p className="mt-1 text-sm font-semibold text-[#6b28c9]">The token is designed to be used rather than simply held.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {tokenUtilities.map((u, i) => (
                  <Reveal key={u.label} delay={i * 40} variant="scale" className="contents">
                  <div className="utility-pill blockchain-card">
                    <div className="icon-box h-9 w-9 shrink-0 rounded-lg">
                      <u.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold leading-snug text-[#374151]">{u.label}</span>
                  </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="analytics" className="section-band section-soft section-pad relative overflow-hidden">
        <div className="page-container relative z-10">
          <Reveal className="mb-14">
            <SectionHeader
              align="center"
              number="04"
              icon={LineChart}
              eyebrow="Tokenomics Analytics"
              title={<>Platform metrics & <span className="text-gradient">utility demand</span></>}
              subtitle="Bond demand, utility consumption, vesting unlocks and the demand flow from acquisition to burn across the MAXTRON ecosystem."
            />
          </Reveal>
          <Reveal delay={80}>
            <AnalyticsDashboard />
          </Reveal>
        </div>
      </section>

      <section id="allocation" className="section-white section-pad allocation-section relative overflow-hidden">
        <div className="page-container relative z-10">
          <Reveal className="mb-10">
            <SectionHeader
              align="center"
              number="05"
              icon={BarChart3}
              eyebrow="Supply & Distribution"
              title={<>Total Supply: <span className="text-gradient">1,000,000,000</span> MAXTRON</>}
              subtitle="The distribution model prioritizes ecosystem participants, platform growth and long-term sustainability."
            />
          </Reveal>

          <Reveal delay={40} className="mb-10">
            <AllocationBar />
          </Reveal>

          <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-10">
            <Reveal className="mb-2 lg:col-span-2 lg:mb-0">
              <div className="chart-panel blockchain-card lg:sticky lg:top-28">
                <div className="chart-panel-head">
                  <div>
                    <h3 className="font-display text-lg font-black text-[#1e0a3c]">Distribution Chart</h3>
                    <p className="mt-0.5 text-xs text-[#9b8ab8]">Hover segments or cards to explore</p>
                  </div>
                </div>
                <div className="chart-panel-body flex flex-col items-center pb-6 sm:pb-8">
                  <DonutChart items={allocations} activeIndex={activeAllocation} onActive={setActiveAllocation} animated />
                </div>
              </div>
            </Reveal>

            <div className="allocation-cards-grid grid gap-3 sm:grid-cols-2 lg:col-span-3">
              {allocations.map((a, i) => (
                <Reveal key={a.name} delay={i * 30} variant="scale">
                  <button
                    onMouseEnter={() => setActiveAllocation(i)}
                    onMouseLeave={() => setActiveAllocation(null)}
                    onFocus={() => setActiveAllocation(i)}
                    className={`chart-panel blockchain-card w-full text-left transition-all ${activeAllocation === i ? 'ring-2 ring-[#6b28c9]/25' : ''}`}
                  >
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: a.color }} />
                          <span className="truncate text-xs font-bold text-[#1e0a3c] sm:text-sm">{a.name}</span>
                        </div>
                        <span className="font-display text-lg font-black" style={{ color: a.color }}>{a.percent}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#f5f3ff]">
                        <div className="h-full rounded-full transition-all" style={{ width: `${a.percent}%`, background: a.color }} />
                      </div>
                      <div className="mt-2 text-[9px] font-bold uppercase tracking-wider text-[#9b8ab8]">{a.amount}</div>
                      {activeAllocation === i && (
                        <p className="mt-2 border-t border-[#ede9fe] pt-2 text-[11px] leading-relaxed text-[#6b5b8a]">{a.note}</p>
                      )}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="value" className="section-purple section-pad relative overflow-hidden">
        <SectionAmbient theme="dark" density={0.4} />
        <div className="page-container relative z-10">
          <Reveal className="mb-16">
            <SectionHeader
              align="center"
              number="06"
              icon={Flame}
              eyebrow="Value Creation Model"
              title="Utility demand, not revenue distribution."
              subtitle="MAXTRON is designed around utility demand rather than revenue distribution. The fixed supply remains permanently capped at 1,000,000,000 MAXTRON."
              light
            />
          </Reveal>

          <div className="value-flow-grid">
            {valueModel.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="value-flow-item" variant="scale">
                <article className="value-card blockchain-card h-full">
                  <div className="flex items-start gap-4">
                    <div className="value-card-icon">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="font-display text-xs font-black text-[#c084fc]">{item.step}</span>
                        <span className="rounded-full bg-[#f5f3ff] px-2.5 py-0.5 font-display text-sm font-black text-[#6b28c9]">{item.value}</span>
                      </div>
                      <h3 className="mb-2 text-base font-black text-[#1e0a3c]">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-[#6b5b8a]">{item.copy}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <section id="compliance" className="section-muted section-pad relative overflow-hidden">
        <div className="page-container relative z-10">
          <Reveal className="mb-14">
            <SectionHeader
              align="center"
              number="07"
              icon={Scale}
              eyebrow="Compliance & Legal Position"
              title="MAXTRON is designed as a utility and compliance token."
              subtitle="Property Tokens and MAXTRON serve separate purposes within the ecosystem and operate under distinct frameworks."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="rwa-arch-strip blockchain-card mx-auto mb-10 max-w-5xl">
              <div className="rwa-arch-card blockchain-card">
                <div className="mb-3 flex items-center gap-3">
                  <div className="icon-box h-10 w-10 rounded-xl"><Building2 className="h-4 w-4" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#6b28c9]">Property Tokens</div>
                    <div className="text-sm font-black text-[#1e0a3c]">Asset-level economics</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#6b5b8a]">Rental income, property ownership rights and investable real estate exposure remain exclusively with Property Token holders.</p>
              </div>
              <div className="rwa-arch-divider" />
              <div className="rwa-arch-card blockchain-card">
                <div className="mb-3 flex items-center gap-3">
                  <div className="icon-box-solid icon-box-pulse h-10 w-10 rounded-xl"><Shield className="h-4 w-4" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#6b28c9]">MAXTRON</div>
                    <div className="text-sm font-black text-[#1e0a3c]">Platform utility layer</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#6b5b8a]">Compliance bonding, verification, access-based utility and governance — securing trust across the RWA tokenization stack.</p>
              </div>
            </div>

            <div className="glass-panel blockchain-card gradient-border mx-auto max-w-5xl overflow-hidden p-7 sm:p-10">
              <p className="mb-8 text-center text-lg font-extrabold text-[#6b28c9]">MAXTRON is not intended to represent:</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {legalExclusions.map((item, i) => (
                  <Reveal key={item} delay={i * 50} variant="scale" className="contents">
                  <div className="card-flat blockchain-card flex items-center gap-3 rounded-xl px-4 py-3.5">
                    <div className="icon-box h-9 w-9 shrink-0 rounded-lg">
                      <Ban className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-[#374151]">{item}</span>
                  </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-[#ede9fe] bg-[#f5f3ff] p-6 text-center">
                <Shield className="mx-auto mb-3 h-7 w-7 text-[#6b28c9]" />
                <p className="text-sm font-bold text-[#374151] sm:text-base">
                  Rental Income: <span className="text-[#6b28c9]">Exclusively Reserved for Property Token Holders</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-purple relative overflow-hidden py-28 sm:py-36">
        <div className="bg-dots-light absolute inset-0 z-[2] opacity-40" />
        <div className="absolute inset-0 z-[2] opacity-25">
          <ParticleField count={80} spread={16} />
        </div>
        <div className="blob blob-violet absolute -bottom-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 opacity-40" />

        <div className="page-container relative z-10">
          <Reveal className="mx-auto max-w-4xl text-center">
            <div className="icon-box-solid mx-auto mb-10 flex h-20 w-20 animate-float items-center justify-center rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.25)] sm:h-24 sm:w-24">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>

            <h2 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-black leading-[1.02] tracking-tight text-white">
              The Future of Secure Real Estate Tokenization
            </h2>
            <p className="text-on-purple mt-5 text-xl font-bold">MAXTRON transforms trust into infrastructure.</p>

            <p className="text-on-purple-muted mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg">
              By combining compliance bonding, verification systems, access-based utility and transparent governance, MAXTRON creates a foundation for secure and scalable real-world asset tokenization.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              {['A utility token with a purpose.', 'A compliance layer with accountability.', 'A shield for the future of tokenized real estate.'].map((line) => (
                <div key={line} className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-sm">
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#analytics" className="btn-primary">
                View Analytics <LineChart className="h-4 w-4" />
              </a>
              <a href="#allocation" className="btn-secondary btn-secondary-light">
                Tokenomics <PieChart className="h-4 w-4" />
              </a>
            </div>

            <div className="text-on-purple mt-10 font-display text-sm font-black tracking-[0.2em] sm:text-base">
              MAXTRON — THE SHIELD TOKEN
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
