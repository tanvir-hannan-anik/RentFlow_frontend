import { redirect } from 'next/navigation';
import { requireUser } from '@/services/server-auth';
export default async function Page() { const user = await requireUser('/dashboard'); redirect('/dashboard/' + user.role); }
