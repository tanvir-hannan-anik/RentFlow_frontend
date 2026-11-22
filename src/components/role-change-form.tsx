"use client";

import { useState } from "react";
import { authenticatedRequest } from "@/services/authenticated-api";

export default function RoleChangeForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    try {
      await authenticatedRequest(`/admin/users/${encodeURIComponent(String(values.get("userId")||"").trim())}/role`, {
        method: "POST", body: { role: values.get("role") },
      });
      setMessage("Role updated.");
    } catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="mt-6 max-w-md space-y-4">
      <h2 className="text-lg font-semibold">Change another user&apos;s role</h2>
      <label className="block">User ID<input name="userId" required maxLength={128} className="mt-1 block w-full rounded border p-3" /></label>
      <label className="block">Role<select name="role" className="mt-1 block w-full rounded border p-3"><option value="customer">Customer</option><option value="owner">Owner</option><option value="admin">Admin</option></select></label>
      <button disabled={busy} className="rounded bg-gray-900 px-4 py-3 text-white disabled:opacity-50">{busy ? "Updating..." : "Update role"}</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
