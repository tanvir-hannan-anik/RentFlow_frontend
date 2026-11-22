"use client";

import Link from "next/link";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <main className="state-page">
      <span className="state-symbol">!</span>
      <h1>Dashboard Unavailable</h1>
      <p className="muted">Your account could not be loaded. The account service may be temporarily unavailable.</p>
      <div className="actions">
        <button className="button" onClick={reset}>Try Again</button>
        <Link className="button outline" href="/">Back to Home</Link>
      </div>
    </main>
  );
}
