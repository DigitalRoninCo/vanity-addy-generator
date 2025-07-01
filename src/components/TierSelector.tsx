'use client';
import React from 'react';

export default function TierSelector({ tier, setTier }: { tier: string; setTier: (t: string) => void }) {
  return (
    <div className="mb-4">
      <label className="block mb-2">Speed Tier</label>
      <div className="flex gap-2">
        {['standard', 'priority', 'turbo'].map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`p-2 border rounded flex-1 ${tier === t ? 'bg-blue-100 border-blue-500' : ''}`}
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
