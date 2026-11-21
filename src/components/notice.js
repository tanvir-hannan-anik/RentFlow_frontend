'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Notice() {
 const [message,setMessage]=useState('');const pathname=usePathname();
 useEffect(()=>{let timer;const read=()=>{const next=sessionStorage.getItem('gearrent-notice');if(next){sessionStorage.removeItem('gearrent-notice');setMessage(next);timer=setTimeout(()=>setMessage(''),6000);}};const initial=setTimeout(read,100);window.addEventListener('gearrent-notice',read);return()=>{clearTimeout(initial);clearTimeout(timer);window.removeEventListener('gearrent-notice',read);};},[pathname]);
 return message?<div className="app-toast" role="status"><span>✓ {message}</span><button aria-label="Dismiss notification" onClick={()=>setMessage('')}>×</button></div>:null;
}
