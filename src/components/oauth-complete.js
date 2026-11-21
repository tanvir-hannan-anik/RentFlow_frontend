'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/services/auth-client';
import Link from 'next/link';
export default function OAuthComplete({ next }) {
 const router=useRouter();const [error,setError]=useState('');
 useEffect(()=>{let active=true;(async()=>{try{const result=await authClient.token();if(result.error||!result.data?.token)throw Error('Google sign-in could not establish a session. Please try again.');if(active){sessionStorage.setItem('gearrent-notice','Successfully signed in with Google.');router.replace(/^\/(dashboard(?:\/[a-z-]+)?|equipment\/[a-f\d]{24})$/.test(next||'')?next:'/dashboard');router.refresh();}}catch(e){if(active)setError(e.message);}})();return()=>{active=false;};},[next,router]);
 return <main className="state-page">{error?<><h1>Sign-in could not finish</h1><p role="alert">{error}</p><Link className="button" href="/login">Return to Login</Link></>:<><span className="spinner"/><p>Finishing your Google sign-in…</p></>}</main>;
}
