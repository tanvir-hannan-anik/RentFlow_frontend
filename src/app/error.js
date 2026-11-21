'use client';
export default function ErrorPage({ reset }) { return <main className="state-page"><span className="state-symbol">!</span><h1>Something Went Wrong</h1><p className="muted">We could not load this page. Please try again.</p><button className="button" onClick={reset}>Try Again</button></main>; }
