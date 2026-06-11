'use client';

import { Ban } from 'lucide-react';
import Reveal from '../Reveal';
import TkSection from './TkSection';
import { complianceContent, legalExclusions } from '@/lib/tokenomics-data';

export default function ComplianceSection() {
  return (
    <TkSection
      id="compliance"
      label={complianceContent.title}
      subtitle={`${complianceContent.body} ${complianceContent.exclusionsIntro}`}
      center
      alt
    >
      <Reveal variant="up">
        <div className="te-excl-grid">
          {legalExclusions.map((item, i) => (
            <div key={item} className="te-glass te-excl w3-excl-card" style={{ animationDelay: `${i * 40}ms` }}>
              <Ban className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5 text-[#c084fc]" />
              {item}
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal variant="up" delay={200}>
        <p className="te-body" style={{ marginTop: '1.5rem', textAlign: 'center' }}>{complianceContent.footer}</p>
      </Reveal>
    </TkSection>
  );
}
