import React, { useState, useEffect } from "react";

export default function VanityGenerator() {
  // State management
  const [pattern, setPattern] = useState("");
  const [length, setLength] = useState(8);
  const [speedTier, setSpeedTier] = useState("standard");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [charset, setCharset] = useState("A-Z, a-z, 0-9");
  const [prefix, setPrefix] = useState(true);
  const [suffix, setSuffix] = useState(false);
  const [regex, setRegex] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(1000000);
  const [paymentMethod, setPaymentMethod] = useState("SOL");

  // API integration state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ public_key: string; secret_key: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL || "";

  // Mocked stats
  const attemptsPerSec = speedTier === "turbo" ? 430000 : 180000;
  const gpu = speedTier === "turbo" ? "RTX 4090" : "Standard GPU";
  const queuePosition = 2;
  const estTime = speedTier === "turbo" ? "1 min" : "2 min";
  const price = speedTier === "turbo" ? 1.2 : 0.7;

  async function handleGenerate() {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pattern }),
      });
      if (!res.ok) {
        const text = await res.text();
        setError(text || "Request failed");
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[url('/grainy-metal-texture.png')] bg-dark-gray text-white flex flex-col items-center p-2 md:p-8">
      {/* Header / Logo */}
      <div className="flex flex-col items-center mb-4 md:mb-8">
        <img src="/digital-ronin-logo.png" alt="Digital Ronin Collective" className="h-16 md:h-20 mb-2" />
        <h1 className="text-xl md:text-3xl font-bold tracking-wide text-center">Generate Legendary Vanity Wallets</h1>
        <div className="text-cyan-300 text-sm md:text-lg font-medium text-center">Fastest. Safest. Most Legendary.</div>
      </div>

      {/* Connection Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full max-w-sm justify-center">
        <button className="w-full sm:w-auto rounded-lg px-6 py-2 border-2 border-cyan-400 bg-gray-900 hover:bg-cyan-950 transition font-bold shadow-md">Connect Wallet</button>
        <button className="w-full sm:w-auto rounded-lg px-6 py-2 border-2 border-cyan-400 bg-gray-900 hover:bg-cyan-950 transition font-bold shadow-md">Connect Telegram</button>
      </div>

      <div className="mb-4 text-cyan-400 font-mono text-xs text-center">Avg. 8-char generation: 1:14 &bull; Powered by {gpu}s</div>

      {/* Main Card: stacks on mobile, side-by-side on desktop */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Generator Section */}
        <div className="rounded-2xl border-2 border-cyan-400 bg-gray-800/70 p-3 md:p-6 shadow-xl relative flex flex-col">
          <label className="block text-cyan-300 font-semibold mb-2">Vanity Pattern</label>
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="e.g. RONIN, $SEND, DRAGON"
            className="w-full mb-3 md:mb-4 rounded-lg p-2 bg-gray-900 border border-cyan-400 focus:outline-cyan-300 text-base md:text-lg text-cyan-100 placeholder-gray-500"
          />

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 items-center">
            <label className="font-semibold">Difficulty</label>
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="accent-cyan-400 flex-1"
            />
            <span className="ml-0 md:ml-2 text-cyan-200">{length} chars</span>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 items-center">
            <div className="flex gap-2">
              <button
                className={speedTier === 'standard' ? 'border-b-2 border-cyan-300 px-2' : 'px-2'}
                onClick={() => setSpeedTier('standard')}
              >Standard</button>
              <button
                className={speedTier === 'turbo' ? 'border-b-2 border-cyan-300 px-2' : 'px-2'}
                onClick={() => setSpeedTier('turbo')}
              >Turbo</button>
            </div>
            <span className="md:ml-2">Est. time: <span className="text-cyan-400 font-mono">{estTime}</span></span>
            <span className="md:ml-2">Price: <span className="text-cyan-400 font-mono">{price} SOL</span></span>
          </div>

          {/* Payment method (SOL only, but UI ready for future options) */}
          <div className="flex items-center gap-2 md:gap-3 mb-2 mt-2">
            <span className="font-semibold text-cyan-300">Pay with:</span>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="rounded bg-gray-800 border border-cyan-400 px-2 py-1 text-cyan-100"
              disabled
            >
              <option value="SOL">SOL</option>
            </select>
            <span className="text-xs text-gray-400">(SOL only)</span>
          </div>

          {/* Advanced settings toggle */}
          <div className="flex items-center mt-2 md:mt-4 mb-2">
            <button onClick={() => setAdvancedOpen(!advancedOpen)} className="text-cyan-300 underline">{advancedOpen ? 'Hide' : 'Show'} Advanced Settings</button>
          </div>

          {/* Advanced settings panel */}
          {advancedOpen && (
            <div className="rounded-lg border border-cyan-400 bg-gray-900/80 p-3 md:p-4 mb-4">
              <div className="flex flex-wrap gap-2 md:gap-4 mb-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={regex} onChange={() => setRegex(!regex)} /> Regex/pattern mode
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={prefix} onChange={() => setPrefix(!prefix)} /> Prefix
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={suffix} onChange={() => setSuffix(!suffix)} /> Suffix
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={caseSensitive} onChange={() => setCaseSensitive(!caseSensitive)} /> Case Sensitive
                </label>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4 mb-2">
                <label>
                  Charset:
                  <select value={charset} onChange={e => setCharset(e.target.value)} className="ml-2 p-1 rounded border border-cyan-400 bg-gray-800 text-cyan-200">
                    <option value="A-Z, a-z, 0-9">A-Z, a-z, 0-9</option>
                    <option value="A-Z, 0-9">A-Z, 0-9</option>
                    <option value="A-Z">A-Z only</option>
                  </select>
                </label>
                <label>
                  Max Attempts:
                  <input type="number" value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))} className="ml-2 p-1 w-24 rounded border border-cyan-400 bg-gray-800 text-cyan-200" />
                </label>
              </div>
              <button className="text-xs text-gray-300 underline mt-2">Reset to Default</button>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mt-3 md:mt-4 py-2 rounded-lg bg-cyan-400 text-gray-900 font-bold text-lg md:text-xl shadow-lg hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'GENERATE'}
          </button>

          {result && (
            <div className="mt-3 p-2 border border-cyan-400 rounded bg-gray-900 text-sm break-words">
              <div>Public Key: <span className="text-cyan-300">{result.public_key}</span></div>
              <div>Secret Key: <span className="text-cyan-300">{result.secret_key}</span></div>
            </div>
          )}

          {error && (
            <div className="mt-2 text-red-400 text-sm">{error}</div>
          )}

          <div className="mt-2 md:mt-4 text-xs text-cyan-200">Keys are never stored. You control your wallet. <span className="underline cursor-pointer">Learn more</span></div>

          {/* Live stats and progress */}
          <div className="mt-4 md:mt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-2">
              <span className="font-mono text-cyan-400">{attemptsPerSec.toLocaleString()} keys/sec</span>
              <span className="text-sm text-gray-400">{gpu} MODE</span>
              <span className="text-xs text-gray-400">Queue #{queuePosition}</span>
            </div>
            <div className="w-full h-3 rounded bg-gray-900 border border-cyan-800 overflow-hidden">
              <div className="h-full bg-cyan-400 transition-all" style={{ width: '40%' }} />
            </div>
            <div className="mt-1 text-xs text-gray-400">Live progress: {Math.floor(Math.random() * 100)}%</div>
          </div>
        </div>

        {/* Hall of Fame + Promo */}
        <div className="rounded-2xl border-2 border-cyan-400 bg-gray-800/70 p-3 md:p-6 shadow-xl flex flex-col gap-6 mt-4 md:mt-0">
          <div>
            <h2 className="text-cyan-200 text-lg font-bold mb-2">Hall of Fame</h2>
            {/* Replace avatars with Ronin, meme, or user-chosen avatars */}
            <div className="flex flex-col gap-3">
              {/* ...Leaderboard mapped items go here... */}
              <div className="flex items-center gap-3">
                <img src="/digital-ronin-logo.png" alt="Ronin OG" className="h-8 w-8 rounded-full bg-gray-700 border-2 border-cyan-400" />
                <div>
                  <div className="font-mono text-cyan-100">8E REPVXY</div>
                  <div className="text-xs text-gray-300">backed but based</div>
                </div>
                <div className="ml-auto flex gap-1 text-cyan-300">
                  <span>🔥</span><span>😆</span><span>💸</span>
                  <span className="ml-2 text-white font-bold">11</span>
                </div>
              </div>
              {/* More leaderboard rows... */}
            </div>
          </div>
          <div className="rounded-lg border border-cyan-400 p-2 bg-gray-900/60 mt-4 flex items-center justify-between">
            <div className="text-cyan-300 font-bold">WIN ⧫⧫⧫⧫⧫ TOKEN<br /><span className="text-xs">This week!</span></div>
            <button className="px-3 py-1 rounded bg-cyan-400 text-gray-900 font-bold">Vote</button>
          </div>
          {/* Promo and referral section */}
          <div className="mt-4 text-sm text-gray-300">
            <div>Claim influencer freebie • Refer a friend • Ronin API partner</div>
          </div>
        </div>
      </div>

      {/* Footer / Transparency */}
      <footer className="w-full max-w-4xl mx-auto mt-6 md:mt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2 border-t border-gray-800 pt-4">
        <div className="flex items-center gap-2">
          <img src="/digital-ronin-logo.png" alt="Logo" className="h-6" />
          Digital Ronin Collective
        </div>
        <div>Transparency</div>
      </footer>
    </div>
  );
}
