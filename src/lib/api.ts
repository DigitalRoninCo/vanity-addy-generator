
function apiUrl(path: string): string {
  const base = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL || ''
    : '';
  return `${base}${path}`;
}

export async function submitVanity(pattern: string, tier: string, address: string) {
  const res = await fetch(apiUrl('/api/vanity/submit'), {

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export async function submitVanity(pattern: string, tier: string, address: string) {
  const res = await fetch(`${API_BASE}/api/vanity/submit`, {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pattern, tier, address })
  });
  if (!res.ok) {
    throw new Error('Failed to submit job');
  }
  return res.json();
}

export async function getStatus(jobId: string) {

  const res = await fetch(apiUrl(`/api/vanity/status/${jobId}`));
  const res = await fetch(`${API_BASE}/api/vanity/status/${jobId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch status');
  }
  return res.json();
}
