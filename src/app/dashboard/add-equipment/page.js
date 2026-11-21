import {requireUser} from '@/services/server-auth';
import {redirect} from 'next/navigation';
import EquipmentForm from '@/components/equipment-form';
export default async function Page({searchParams}){const user=await requireUser('/dashboard/add-equipment');const {edit}=await searchParams;if(user.role!=='owner'&&!(user.role==='admin'&&edit))redirect('/forbidden');return <EquipmentForm user={user} editId={edit}/>;}
