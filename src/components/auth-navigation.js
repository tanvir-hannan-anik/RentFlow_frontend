"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { authClient } from "@/services/auth-client";

export default function AuthNavigation() {
  const { data, isPending, error } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    setBusy(true);
    setMessage("");
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Logout failed");
      router.replace("/login");
      router.refresh();
    } catch { setMessage("Could not sign out. Please try again."); }
    finally { setBusy(false); }
  }

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="container header-inner">
        <Link href="/" className="brand"><span className="brand-icon">⚒</span>GearRent</Link>
        <button className="menu-toggle button outline compact" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">Menu</button>
        <div className={`main-links ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}><Link className={pathname === '/' ? 'active' : ''} href="/">Home</Link><Link className={pathname.startsWith('/equipment') ? 'active' : ''} href="/equipment">All Equipment</Link><Link href="/#how-it-works">How It Works</Link><Link href="/#why-choose-us">About Us</Link><Link href="/#footer">Contact Us</Link></div>
        <div className="header-actions">
          {isPending ? <span role="status">Checking session...</span> : data?.user ? <>
            <Link href="/dashboard" className="text-link">Dashboard</Link>
            <button onClick={logout} disabled={busy} className="rounded border px-3 py-2 disabled:opacity-50">
              {busy ? "Signing out..." : "Log out"}
            </button>
          </> : <><Link href="/login" className="button compact outline">Login</Link><Link href="/register" className="button compact">Register</Link></>}
          {(message || error) && <span role="alert">{message || "Session service is unavailable."}</span>}
        </div>
      </nav>
    </header>
  );
}
