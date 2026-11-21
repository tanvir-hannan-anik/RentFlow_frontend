import Link from 'next/link';
export default function Page() { return <main className="state-page"><span className="state-symbol">ⓘ</span><h1>Check Your Rental Status</h1><p className="muted">Online payments are not enabled. Sending a rental request does not charge you or confirm a reservation.</p><Link className="button" href="/dashboard/customer">View My Rentals</Link></main>; }
