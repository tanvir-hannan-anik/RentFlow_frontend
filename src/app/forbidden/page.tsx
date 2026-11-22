import Link from 'next/link';
export default function Page(){return <main className="state-page"><span className="state-symbol">403</span><h1>Access Denied</h1><p className="muted">Your account does not have permission to view this page.</p><Link className="button" href="/dashboard">Return to Dashboard</Link></main>;}
