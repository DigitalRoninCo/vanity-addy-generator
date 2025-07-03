import { useEffect, useState } from "react";

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/metrics/costs")
      .then(res => res.json())
      .then(data => setMetrics(data));
  }, []);

  return (
    <div className="rounded-xl border border-cyan-400 bg-gray-900 p-4 mt-4 text-sm text-cyan-200 w-full">
      <h2 className="text-lg font-bold mb-2">\uD83D\uDCCA Usage Metrics</h2>
      {!metrics ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-1">
          <li>\uD83E\uDDEE Jobs: <span className="font-mono">{metrics.jobs_processed}</span></li>
          <li>\u23F1\uFE0F GPU Hours: <span className="font-mono">{metrics.gpu_hours_used}</span></li>
          <li>\uD83D\uDCB0 Est. Cost: <span className="font-mono">${metrics.estimated_cost_usd}</span></li>
        </ul>
      )}
    </div>
  );
}
