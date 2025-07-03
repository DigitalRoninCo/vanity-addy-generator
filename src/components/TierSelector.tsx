'use client';
import React from 'react';
import { Tier } from '../lib/pricing';

export default function TierSelector({ tier, setTier }: { tier: Tier; setTier: (t: Tier) => void }) {
  return (
    <div className="mb-4">
      <label className="block mb-2">Speed Tier</label>
      <div className="tier-selector">
        {(['standard', 'priority', 'turbo'] as Tier[]).map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`tier-button ${tier === t ? 'active' : ''}`}
          >
            <div className="font-bold">{t.charAt(0).toUpperCase() + t.slice(1)}</div>
            <div className="text-xs">
              {t === 'standard'
                ? '5-60 min'
                : t === 'priority'
                ? '1-5 min (+0.05 SOL)'
                : '<10 sec (+0.15 SOL)'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
