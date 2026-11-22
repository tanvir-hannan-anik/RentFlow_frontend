import {requireUser} from '@/services/server-auth';
import Dashboard from '@/components/dashboard';
export default async function Page(){const user=await requireUser('/dashboard/owner/rentals','owner');return <Dashboard user={user} view="rentals"/>;}
