'use client';

import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import TierSelector from '../components/TierSelector';
import { calculatePrice, Tier } from '../lib/pricing';

export default function Home() {
  const [pattern, setPattern] = useState('');
  const [tier, setTier] = useState<Tier>('standard');
  const [progress, setProgress] = useState(0);

  const price = calculatePrice(pattern, tier);

  function handleSearch() {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 0.1, 1);
        if (next === 1) clearInterval(interval);
        return next;
      });
    }, 300);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Vanity Address Generator</h1>
      <div>
        <label>
          Pattern:
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <TierSelector tier={tier} setTier={setTier} />
      <div style={{ marginTop: 12 }}>Price: ${price.toFixed(2)}</div>
      <button style={{ marginTop: 12 }} onClick={handleSearch}>
        Start Search
      </button>
      <div style={{ marginTop: 20 }}>
        <ProgressBar progress={progress} />
      </div>
    </main>
  );
}
