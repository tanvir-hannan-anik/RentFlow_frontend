import {requireUser} from '@/services/server-auth';
import {redirect} from 'next/navigation';
import PaymentStatus from '@/components/payment-status';
import type {SearchParams} from '@/types';
export default async function Page({searchParams}:{searchParams:SearchParams}){await requireUser('/payment/success','customer');const {booking,session_id}=await searchParams;if(!booking||!/^[a-f\d]{24}$/i.test(booking))redirect('/dashboard/customer');return <PaymentStatus bookingId={booking} sessionId={session_id} cancelled={false}/>;}
