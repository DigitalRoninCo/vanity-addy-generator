import { useState } from 'react';
import { generateVanityKeypair, Keypair } from '../lib/solana';

export default function VanityGenerator() {
  const [prefix, setPrefix] = useState('');
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const kp = await generateVanityKeypair(prefix);
    setKeypair(kp);
    setLoading(false);
  };

  return (
    <div>
      <h2>Vanity Address Generator</h2>
      <input
        type="text"
        value={prefix}
        placeholder="Enter prefix"
        onChange={(e) => setPrefix(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading || !prefix}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {keypair && (
        <pre>{keypair.publicKey}</pre>
      )}
    </div>
  );
}
