import { useState } from 'react';
import { generateVanityKeypair, Keypair } from '../lib/solana';
import { submitVanity } from '../lib/api';

export default function VanityGenerator() {
  const [prefix, setPrefix] = useState('');
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const kp = await generateVanityKeypair(prefix);
    setKeypair(kp);
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      const data = await submitVanity(prefix, 'standard', keypair?.publicKey || '');
      setJobId(data.jobId || data.job_id);
    } catch (err) {
      console.error(err);
    }
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
      <button onClick={handleSubmit} disabled={!prefix}>Submit</button>
      {jobId && <p>Job ID: {jobId}</p>}
      {keypair && (
        <pre>{keypair.publicKey}</pre>
      )}
    </div>
  );
}
