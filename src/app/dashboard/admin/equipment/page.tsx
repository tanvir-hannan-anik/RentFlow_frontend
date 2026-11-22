import {requireUser} from '@/services/server-auth';
import Dashboard from '@/components/dashboard';
export default async function Page(){const user=await requireUser('/dashboard/admin/equipment','admin');return <Dashboard user={user} view="equipment"/>;}
