import React from 'react';

export interface ProgressBarProps {
  progress: number; // value between 0 and 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const pct = Math.min(1, Math.max(0, progress)) * 100;
  return (
    <div style={{ border: '1px solid #ccc', width: '100%', padding: 2 }}>
      <div
        style={{
          height: 10,
          width: `${pct}%`,
          backgroundColor: 'green'
        }}
      />
    </div>
  );
}
