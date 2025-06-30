"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [pattern, setPattern] = useState("");
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [info, setInfo] = useState({
    difficulty: 0,
    generated: 0,
    time: "-",
    speed: 0,
    status: "idle",
  });

  const handleSubmit = async () => {
    setStatus("Submitting...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pattern, wallet }),
    });
    const { job_id } = await res.json();
    setStatus("Generating...");

    const interval = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/status/${job_id}`);
      const data = await res.json();
      setProgress(data.progress || 0);
      setInfo({
        difficulty: data.difficulty,
        generated: data.generated,
        time: data.estimated_time,
        speed: data.speed,
        status: data.status,
      });
      if (data.status === "done") {
        clearInterval(interval);
        setStatus(`✅ Wallet: ${data.pubkey}`);
      }
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-black text-cyan-100 font-mono p-6">
      <h1 className="text-3xl font-bold text-center text-cyan-400 drop-shadow-glow">
        Enhanced Solana Vanity Generator
      </h1>

      <div className="max-w-xl mx-auto mt-10 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter pattern (e.g. SOL4NAaa)"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="p-2 rounded border border-cyan-500 bg-black text-cyan-200"
        />
        <input
          type="text"
          placeholder="Your wallet address (optional)"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="p-2 rounded border border-cyan-500 bg-black text-cyan-200"
        />
        <button
          onClick={handleSubmit}
          className="bg-cyan-500 text-black py-2 px-4 rounded hover:bg-cyan-400 font-semibold"
        >
          🚀 Generate Vanity Wallet
        </button>
        <div className="text-sm text-cyan-400 text-center">{status}</div>
      </div>

      <section className="bg-gradient-to-br from-black to-gray-900 border border-cyan-700/20 rounded-xl p-6 mt-10 shadow-lg max-w-xl mx-auto">
        <div className="text-cyan-300 mb-2">
          <strong>Difficulty:</strong> {info.difficulty}
        </div>
        <div className="text-cyan-300 mb-2">
          <strong>Generated:</strong> {info.generated} addresses
        </div>
        <div className="text-cyan-300 mb-2">
          <strong>Estimated Time:</strong> {info.time}
        </div>
        <div className="text-cyan-300 mb-2">
          <strong>Speed:</strong> {info.speed} addresses/sec
        </div>
        <div className="text-cyan-300 mb-4">
          <strong>Status:</strong> {info.status}
        </div>

        <div className="w-full bg-cyan-800/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-cyan-400 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-xs mt-2">{progress}%</p>
      </section>
    </main>
  );
}
