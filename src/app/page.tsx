'use client';

import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import TierSelector from '../components/TierSelector';
import LiveInfoPanel from '../components/LiveInfoPanel';
import { calculatePrice, Tier } from '../lib/pricing';

export default function Home() {
  const [pattern, setPattern] = useState('');
  const [tier, setTier] = useState<Tier>('standard');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Idle');
  const [total, setTotal] = useState(0);

  const price = calculatePrice(pattern, tier);

  function handleSearch() {
    setProgress(0);
    setTotal(0);
    setStatus('Searching...');
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 0.1, 1);
        setTotal((t) => t + 100);
        if (next === 1) {
          clearInterval(interval);
          setStatus('Complete');
        }
        return next;
      });
    }, 300);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1 className="gradient-text">Vanity Address Generator</h1>
      <div className="card" style={{ marginTop: 20 }}>
        <label>
          Pattern:
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
        <TierSelector tier={tier} setTier={setTier} />
        <div style={{ marginTop: 12 }}>Price: ${price.toFixed(2)}</div>
        <button className="glow-btn" style={{ marginTop: 12 }} onClick={handleSearch}>
          Start Search
        </button>
        <div style={{ marginTop: 20 }}>
          <ProgressBar progress={progress} />
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <LiveInfoPanel
          difficulty={pattern.length.toString()}
          total={total}
          eta={status === 'Complete' ? '0s' : `${Math.round((1 - progress) * 10)}s`}
          speed={`${(total / (progress || 1)).toFixed(0)}/s`}
          status={status}
          progress={progress}
        />
      </div>
    </main>
  );
}
