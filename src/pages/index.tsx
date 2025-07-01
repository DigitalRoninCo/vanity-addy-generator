import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { calculatePrice, Tier } from '../lib/pricing';

export default function Home() {
  const [pattern, setPattern] = useState('');
  const [tier, setTier] = useState<Tier>('basic');
  const [progress, setProgress] = useState(0);

  const price = calculatePrice(pattern, tier);

  // Simple fake progress update when pattern or tier changes
  React.useEffect(() => {
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.1;
        return next > 1 ? 1 : next;
      });
    }, 200);
    return () => clearInterval(id);
  }, [pattern, tier]);

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h1>Vanity Address Generator</h1>
      <label>
        Pattern:
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          style={{ width: '100%' }}
        />
      </label>
      <label>
        Tier:
        <select value={tier} onChange={(e) => setTier(e.target.value as Tier)}>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </label>
      <p>Price: ${price.toFixed(2)}</p>
      <ProgressBar progress={progress} />
    </div>
  );
}
