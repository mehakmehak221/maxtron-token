'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  eager?: boolean;
  variant?: 'up' | 'scale' | 'left' | 'right';
};

export default function Reveal({ children, delay = 0, className = '', eager = false, variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(eager);
  const isContents = className.includes('contents');

  useEffect(() => {
    if (eager) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [eager]);

  const hidden = {
    up: 'translateY(20px)',
    scale: 'translateY(12px) scale(0.96)',
    left: 'translateX(-24px)',
    right: 'translateX(24px)',
  }[variant];

  const shown = {
    up: 'translateY(0)',
    scale: 'translateY(0) scale(1)',
    left: 'translateX(0)',
    right: 'translateX(0)',
  }[variant];

  return (
    <div
      ref={ref}
      className={className}
      style={isContents ? undefined : {
        opacity: vis ? 1 : 0,
        transform: vis ? shown : hidden,
        transition: `opacity .65s ${delay}ms cubic-bezier(.22,1,.36,1), transform .65s ${delay}ms cubic-bezier(.22,1,.36,1)`,
      }}
    >
      {children}
    </div>
  );
}
