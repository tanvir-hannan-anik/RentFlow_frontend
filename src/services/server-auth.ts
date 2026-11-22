import type {User} from '@/types';
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser(path:string, role?:string):Promise<User> {
  const cookieStore = await cookies();
  const backend = process.env.BACKEND_URL ?? "http://localhost:5000";
  const response = await fetch(`${backend}/api/${role ?? "me"}`, {
    headers: { Cookie: cookieStore.toString() }, cache: "no-store", signal: AbortSignal.timeout(10000),
  });
  if (response.status === 401) redirect(`/login?next=${encodeURIComponent(path)}`);
  if (response.status === 403) redirect("/forbidden");
  if (!response.ok) throw new Error("Authentication is temporarily unavailable.");
  const result = await response.json();
  return result.data.user;
}
