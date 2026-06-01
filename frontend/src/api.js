// In dev, Vite proxies /api → http://127.0.0.1:8000
// In production (Vercel), set VITE_API_URL to your Render backend URL
const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export async function getPortfolioData() {
  const res = await fetch(`${BASE}/summary/`);
  if (!res.ok) throw new Error('Failed to load portfolio data');
  return res.json();
}

export async function sendContactMessage(data) {
  const res = await fetch(`${BASE}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || 'Failed to send message');
  return json;
}
