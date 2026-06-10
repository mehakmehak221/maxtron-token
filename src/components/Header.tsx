'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, Shield, X } from 'lucide-react';

const menuItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Framework', href: '#framework' },
  { label: 'Utility', href: '#utility' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Allocation', href: '#allocation' },
  { label: 'Value', href: '#value' },
  { label: 'Compliance', href: '#compliance' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const offset = 88;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-400 ${scrolled ? 'header-scrolled py-3' : 'bg-transparent py-5'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#overview" onClick={(e) => navigate(e, '#overview')} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md">
            <Shield className="h-5 w-5 text-[#6b28c9]" />
          </div>
          <div className="leading-none">
            <div className={`font-display text-lg font-black tracking-tight ${scrolled ? 'text-[#1e0a3c]' : 'text-white'}`}>MAXTRON</div>
            <div className={`mt-0.5 text-[10px] font-bold uppercase tracking-widest ${scrolled ? 'text-[#6b28c9]' : 'text-white/70'}`}>The Shield Token</div>
          </div>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`group relative rounded-lg px-4 py-2 text-sm font-semibold transition ${
                scrolled
                  ? 'text-[#6b5b8a] hover:bg-[#f5f3ff] hover:text-[#6b28c9]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
              <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#6b28c9] to-[#a855f7] transition-all duration-300 group-hover:w-4/5" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${scrolled ? 'border-[#ede9fe] bg-[#f5f3ff]' : 'border-white/25 bg-white/10'}`}>
            <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${scrolled ? 'bg-[#6b28c9]' : 'bg-white'}`} />
            <span className={`text-[11px] font-bold tracking-wider ${scrolled ? 'text-[#6b28c9]' : 'text-white'}`}>LIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${scrolled ? 'border-[#ede9fe] bg-[#f5f3ff]' : 'border-white/25 bg-white/10'}`}>
            <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${scrolled ? 'bg-[#6b28c9]' : 'bg-white'}`} />
            <span className={`text-[10px] font-bold tracking-wider ${scrolled ? 'text-[#6b28c9]' : 'text-white'}`}>LIVE</span>
          </div>
          <button onClick={() => setIsOpen((v) => !v)} className={`rounded-xl border p-2.5 shadow-sm ${scrolled ? 'border-[#ede9fe] bg-white text-[#6b28c9]' : 'border-white/30 bg-white/10 text-white'}`} aria-label="Menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-nav-panel lg:hidden">
          <nav className="grid gap-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => navigate(e, item.href)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-[#6b5b8a] transition-colors hover:bg-[#f5f3ff] hover:text-[#6b28c9]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
