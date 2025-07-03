import React from 'react';
import ProgressBar from './ProgressBar';

export interface LiveInfoPanelProps {
  difficulty: string;
  total: number;
  eta: string;
  speed: string;
  status: string;
  progress: number;
}

export default function LiveInfoPanel({
  difficulty,
  total,
  eta,
  speed,
  status,
  progress,
}: LiveInfoPanelProps) {
  return (
    <div className="card">
      <div>Difficulty: {difficulty}</div>
      <div>Total Generated: {total}</div>
      <div>Estimated Time: {eta}</div>
      <div>Speed: {speed}</div>
      <div>Status: {status}</div>
      <ProgressBar progress={progress} />
    </div>
  );
}
