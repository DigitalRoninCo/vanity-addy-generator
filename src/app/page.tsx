'use client';

import React from 'react';
import DRVanityGenerator from '../components/DRVanityGenerator';

export default function Home() {
  return <DRVanityGenerator />;

import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import TierSelector from '../components/TierSelector';
import LiveInfoPanel from '../components/LiveInfoPanel';
import { calculatePrice, Tier } from '../lib/pricing';
import { submitVanity } from '../lib/api';
import { useWallet } from '../components/WalletProvider';

export default function Home() {
  const [pattern, setPattern] = useState('');
  const [tier, setTier] = useState<Tier>('standard');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Idle');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();

  const price = calculatePrice(pattern, tier);
  const wsBase = process.env.NEXT_PUBLIC_WS_URL || '';

  async function handleSearch() {
    setLoading(true);
    setProgress(0);
    setTotal(0);
    setStatus('Submitting...');
    try {
      const address = publicKey ?? 'demo';
      const { job_id } = await submitVanity(pattern, tier, address);
      setStatus('Searching...');
      const ws = new WebSocket(`${wsBase}/ws/status/${job_id}`);
      ws.onmessage = (ev) => {
        const data = JSON.parse(ev.data);
        setProgress(data.progress);
        setStatus(data.status);
        if (data.status === 'complete') {
          ws.close();
          setLoading(false);
        }
      };
      ws.onerror = () => {
        setStatus('Error');
        setLoading(false);
      };
    } catch (e) {
      setStatus('Error');
      setLoading(false);
    } finally {
      // loading state cleared when websocket finishes
    }
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
        <button
          className="glow-btn"
          style={{ marginTop: 12 }}
          onClick={handleSearch}
          disabled={loading || !pattern}
        >
          {loading ? <span className="spinner" /> : 'Start Search'}
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
