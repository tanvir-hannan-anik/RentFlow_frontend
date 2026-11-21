"use client";

export default function DashboardError({ reset }) {
  return <main className="p-6"><p role="alert">Your account could not be loaded. Please try again.</p><button onClick={reset} className="mt-4 rounded border p-3">Try again</button></main>;
}
