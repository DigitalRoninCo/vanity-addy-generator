import React from 'react';

interface ProgressBarProps {
  progress: number; // value between 0 and 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const width = Math.min(Math.max(progress, 0), 1) * 100;
  return (
    <div style={{ width: '100%', background: '#e0e0e0', height: 10 }}>
      <div style={{ width: `${width}%`, background: '#0070f3', height: '100%' }} />
    </div>
  );
}
