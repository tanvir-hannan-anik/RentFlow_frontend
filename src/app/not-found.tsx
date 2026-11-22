import Link from 'next/link';
export default function NotFound() { return <main className="state-page"><span className="state-symbol">404</span><h1>Page Not Found</h1><p className="muted">The page you are looking for may have moved or no longer exists.</p><Link className="button" href="/">Back to Home</Link></main>; }
