export function backendOrigin(value = process.env.BACKEND_URL): string {
  const raw = value?.trim() || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');
  if (!raw) throw new Error('Set BACKEND_URL to the deployed backend URL before building.');
  let url: URL;
  try { url = new URL(raw); } catch { throw new Error('BACKEND_URL must be a full URL, for example https://your-backend.vercel.app'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || !['', '/api'].includes(url.pathname.replace(/\/+$/, ''))) {
    throw new Error('BACKEND_URL must be the backend HTTP(S) URL, optionally ending in /api, without credentials, query parameters or other paths.');
  }
  return url.origin;
}
