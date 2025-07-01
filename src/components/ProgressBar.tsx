import React from 'react';

interface ProgressBarProps {
  progress: number; // value between 0 and 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const width = Math.min(Math.max(progress, 0), 1) * 100;
  return (
    <div className="progress-container">
      <div className="progress-fill" style={{ width: `${width}%` }} />
    </div>
  );
}
