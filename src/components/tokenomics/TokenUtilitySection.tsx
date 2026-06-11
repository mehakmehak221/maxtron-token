'use client';

import Reveal from '../Reveal';
import TkSection from './TkSection';
import { tokenUtilityList, utilityIntro, utilityTagline } from '@/lib/tokenomics-data';

export default function TokenUtilitySection() {
  return (
    <TkSection
      id="utility"
      label="Token Utility"
      subtitle={utilityIntro}
      center
      alt
    >
      <Reveal variant="up">
        <div className="te-tags">
          {tokenUtilityList.map((item) => (
            <span key={item} className="te-tag w3-tag-enter">{item}</span>
          ))}
        </div>
        <p className="te-body" style={{ marginTop: '1.5rem', textAlign: 'center' }}>{utilityTagline}</p>
      </Reveal>
    </TkSection>
  );
}
