'use client';

import { useEffect, useRef, useState } from 'react';
import { Coins, Flame, Globe, LockKeyhole, Shield } from 'lucide-react';
import ParticleField from './ParticleField';

const allocation = [
  { label: 'Ecosystem', pct: 30, color: '#6b28c9' },
  { label: 'Team', pct: 18, color: '#581c87' },
  { label: 'Liquidity', pct: 12, color: '#7c3aed' },
  { label: 'Treasury', pct: 13, color: '#4c1d95' },
  { label: 'Compliance', pct: 5, color: '#9333ea' },
  { label: 'Seed', pct: 4, color: '#3b0764' },
  { label: 'Private', pct: 8, color: '#a855f7' },
  { label: 'Public', pct: 7, color: '#8b5cf6' },
  { label: 'Advisors', pct: 3, color: '#c084fc' },
];

const facts = [
  { icon: Shield, title: 'Utility & Compliance', desc: 'Token type' },
  { icon: Globe, title: 'EVM Compatible', desc: 'Blockchain network' },
  { icon: Flame, title: 'Usage-Based Burn', desc: 'Burn mechanism' },
  { icon: LockKeyhole, title: 'No Revenue Share', desc: 'Rental income reserved for Property Tokens' },
];

function useVisible(eager = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(eager);
  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);
  return { ref, vis };
}

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

export default function HeroVisual() {
  const { ref, vis } = useVisible();
  const count = useCountUp(1000000000, vis);

  return (
    <div ref={ref} className="relative w-full">
      <div className="token-snapshot relative overflow-hidden rounded-[24px] border border-white/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <ParticleField count={45} spread={7} />
        </div>

        <div className="relative border-b border-[#ede9fe] bg-gradient-to-br from-[#f5f3ff] via-white to-[#ede9fe] px-5 py-6 sm:px-6 sm:py-7">
          <div className="mb-4 flex items-center gap-2">
            <div className="icon-box-solid h-9 w-9 animate-glow-pulse rounded-xl">
              <Coins className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#6b28c9]">MAXTRON — The Shield Token</div>
              <div className="text-xs font-semibold text-[#9b8ab8]">Token overview</div>
            </div>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-widest text-[#9b8ab8]">Total Supply</div>
          <div className="font-display mt-1 text-[clamp(1.5rem,4.5vw,2rem)] font-black leading-none text-[#1e0a3c] tabular-nums">
            {vis ? count.toLocaleString('en-US') : '0'}
          </div>
          <div className="mt-1 text-sm font-bold text-[#6b28c9]">MAXTRON</div>
          <div className="mt-2 inline-flex rounded-full bg-[#f5f3ff] px-3 py-1 text-[10px] font-bold text-[#6b28c9]">
            Fixed cap · No additional tokens may be minted
          </div>
        </div>

        <div className="relative border-b border-[#ede9fe] px-5 py-5 sm:px-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9b8ab8]">Allocation</span>
            <span className="text-[10px] font-bold text-[#6b28c9]">9 pools</span>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full sm:h-4">
            {allocation.map((a, i) => (
              <div
                key={a.label}
                className="alloc-segment"
                style={{
                  flex: a.pct,
                  background: a.color,
                  transform: vis ? 'scaleY(1)' : 'scaleY(0)',
                  transition: `transform .6s ${i * 60}ms cubic-bezier(.22,1,.36,1)`,
                  transformOrigin: 'bottom',
                }}
                title={`${a.label} ${a.pct}%`}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {allocation.map((a, i) => (
              <span
                key={a.label}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6b5b8a]"
                style={{ opacity: vis ? 1 : 0, transition: `opacity .4s ${300 + i * 40}ms ease` }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
                {a.label} {a.pct}%
              </span>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-px bg-[#ede9fe]">
          {facts.map((f, i) => (
            <div
              key={f.title}
              className="flex gap-3 bg-white p-4 transition hover:bg-[#f5f3ff] sm:p-5"
              style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(8px)', transition: `all .5s ${400 + i * 80}ms cubic-bezier(.22,1,.36,1)` }}
            >
              <div className="icon-box h-10 w-10 shrink-0 rounded-xl">
                <f.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-[#1e0a3c] sm:text-sm">{f.title}</div>
                <div className="mt-0.5 text-[10px] leading-snug text-[#6b5b8a] sm:text-[11px]">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
