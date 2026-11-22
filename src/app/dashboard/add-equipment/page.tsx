import {requireUser} from '@/services/server-auth';
import {redirect} from 'next/navigation';
import EquipmentForm from '@/components/equipment-form';
export default async function Page({searchParams}: {searchParams: import("@/types").SearchParams}){const user=await requireUser('/dashboard/add-equipment');const {edit}=await searchParams;return <EquipmentForm user={user} editId={edit}/>;}
