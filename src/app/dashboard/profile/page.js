import {requireUser} from '@/services/server-auth';
import Profile from '@/components/profile';
export default async function Page(){const user=await requireUser('/dashboard/profile');return <Profile user={user}/>;}
