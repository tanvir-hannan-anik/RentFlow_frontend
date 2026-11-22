'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {apiRequest} from '@/services/api';
import type {Booking} from '@/types';
import {money} from './equipment-ui';
export default function PaymentStatus({bookingId,sessionId,cancelled=false}:{bookingId:string;sessionId?:string;cancelled?:boolean}){
 const [booking,setBooking]=useState<Booking|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(true),[revision,setRevision]=useState(0);
 useEffect(()=>{let active=true;apiRequest<Booking>('/payments/verify',{method:'POST',body:{bookingId,sessionId}}).then(({data})=>{if(active)setBooking(data);}).catch(e=>{if(active)setError(e.message);}).finally(()=>{if(active)setBusy(false);});return()=>{active=false;};},[bookingId,sessionId,revision]);
 async function release(){setBusy(true);setError('');try{const {data}=await apiRequest<Booking>('/payments/cancel-checkout',{method:'POST',body:{bookingId}});setBooking(data);}catch(e){setError(e instanceof Error?e.message:'Could not update checkout.');}finally{setBusy(false);}}
 const paid=booking?.paymentStatus==='paid';
 return <main className="state-page"><span className="state-symbol">{paid?'✓':cancelled?'×':'◷'}</span><h1>{busy?'Checking Payment…':paid?'Payment Confirmed & Booking Saved':cancelled?'Checkout Was Not Completed':'Payment Not Yet Confirmed'}</h1>{busy?<span className="spinner"/>:<>{error&&<p className="error" role="alert">{error}</p>}{booking&&<section className="panel"><h2>{booking.equipmentName}</h2><p>{booking.startDate} – {booking.endDate}</p><p>{booking.quantity} units · {money(booking.total)}</p><span className="badge">{booking.paymentStatus}</span>{paid&&<p className="small muted">Payment verified directly with Stripe. Your transaction is saved.</p>}</section>}{!paid&&<p className="muted">If you completed payment, check the status again. You will not be charged by checking.</p>}<div className="actions"><Link className="button" href="/dashboard/customer">My Rentals</Link>{!paid&&<><button className="button outline" onClick={()=>{setBusy(true);setError('');setRevision(v=>v+1);}}>Check Again</button><Link className="button outline" href={`/payment?booking=${bookingId}`}>Return to Checkout</Link>{cancelled&&booking?.status==='checkout_pending'&&<button className="button outline" onClick={release}>Release Unpaid Checkout</button>}</>}</div></>}</main>;
}
