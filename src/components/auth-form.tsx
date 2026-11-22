"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/services/auth-client";

const destinations = ["/dashboard", "/dashboard/customer", "/dashboard/owner", "/dashboard/admin", "/dashboard/add-equipment", "/dashboard/listings", "/dashboard/favorites", "/dashboard/profile"];

export default function AuthForm({ register = false, nextPath = "/dashboard", oauthError = false }: {register?:boolean;nextPath?:string;oauthError?:string|boolean}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(oauthError ? (String(oauthError).includes('link') || String(oauthError).includes('account') ? 'If this email already has a password account, log in with your password, then link Google from My Profile.' : 'Google sign-in was not completed. Check the Google consent screen and try again.') : '');
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const destination = destinations.includes(nextPath) || /^\/equipment\/[a-f\d]{24}$/i.test(nextPath) ? nextPath : "/dashboard";

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/auth-options", { signal: controller.signal })
      .then((response) => response.json())
      .then((options) => setGoogleEnabled(options.googleEnabled === true))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (session?.user) { router.replace(destination); router.refresh(); }
  }, [session, router, destination]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get("email")||"").trim();
    const password = String(fields.get("password")||"");
    if (register && (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password))) {
      setError("Use at least 6 characters, including uppercase and lowercase letters.");
      return;
    }
    setBusy(true);
    try {
      const result = register
        ? await authClient.signUp.email({ name: String(fields.get("name")||"").trim(), email, password, image: String(fields.get("image")||"").trim() })
        : await authClient.signIn.email({ email, password, rememberMe: true });
      if (result.error) {
        setError(register ? "Registration failed. Check your details or use an existing account." : "Unable to log in. Check your email and password.");
        return;
      }
      await authClient.token();
      sessionStorage.setItem('gearrent-notice', register ? 'Your account was created successfully.' : 'Welcome back! You are signed in.');
      router.replace(destination);
      router.refresh();
    } catch { setError("Unable to connect. Please try again."); }
    finally { setBusy(false); }
  }

  async function googleLogin() {
    setBusy(true);
    setError("");
    try {
      const callbackURL = `${window.location.origin}/auth/complete?next=${encodeURIComponent(destination)}`;
      const result = await authClient.signIn.social({ provider: 'google', callbackURL, errorCallbackURL: `${window.location.origin}/login` });
      if (result.error) throw new Error(result.error.message || 'Google sign-in failed.');
    } catch (error) { setError(error.message || 'Google sign-in is unavailable. Please try again.'); setBusy(false); }
  }

  if (isPending || session?.user) return <p className="p-8" role="status">Checking your session...</p>;
  return (
    <main className="auth-panel panel">
      <h1 className="text-2xl font-semibold">{register ? "Create your account" : "Welcome back"}</h1>
      <p className="mt-2 text-sm text-gray-600">{register ? "Register to get started with equipment rentals." : "Welcome back. Enter your account details."}</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {register && <>
          <label className="block">Name<input name="name" autoComplete="name" required maxLength={100} className="mt-1 block w-full rounded border p-3" /></label>
          <label className="block">Photo URL<input name="image" type="url" required maxLength={2048} placeholder="https://example.com/photo.jpg" className="mt-1 block w-full rounded border p-3" /></label>
        </>}
        <label className="block">Email<input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-1 block w-full rounded border p-3" /></label>
        <label className="block">Password<input name="password" type="password" autoComplete={register ? "new-password" : "current-password"} required minLength={register ? 6 : undefined} maxLength={128} aria-describedby={register ? "password-help" : undefined} className="mt-1 block w-full rounded border p-3" /></label>
        {register && <p id="password-help" className="text-sm text-gray-600">At least 6 characters, with uppercase and lowercase letters.</p>}
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded bg-gray-900 px-4 py-3 text-white disabled:opacity-50">{busy ? "Please wait..." : register ? "Register" : "Log in"}</button>
      </form>
      <button onClick={googleLogin} disabled={busy || !googleEnabled} className="mt-4 w-full rounded border px-4 py-3 disabled:opacity-50">Continue with Google</button>
      {!googleEnabled && <p className="mt-2 text-sm text-gray-600">Google sign-in is currently unavailable.</p>}
      <p className="mt-6 text-sm">{register ? "Already registered? " : "New to GearRent? "}<Link className="underline" href={register ? "/login" : "/register"}>{register ? "Log in" : "Create an account"}</Link></p>
    </main>
  );
}
