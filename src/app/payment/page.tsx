import {requireUser} from '@/services/server-auth';
import Payment from '@/components/payment';
import {redirect} from 'next/navigation';
export default async function Page({searchParams}: {searchParams: import("@/types").SearchParams}){await requireUser('/payment','customer');const {booking}=await searchParams;if(!booking||!/^[a-f\d]{24}$/i.test(booking))redirect('/dashboard/customer');return <Payment id={booking}/>;}
