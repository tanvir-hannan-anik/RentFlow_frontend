import EquipmentDetails from '@/components/equipment-details';
import {requireUser} from '@/services/server-auth';
export default async function Page({ params }) { const { id } = await params; const user=await requireUser(`/equipment/${id}`); return <EquipmentDetails id={id} user={user} />; }
