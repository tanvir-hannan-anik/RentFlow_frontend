'use client';
import {useState} from 'react';
import {apiRequest} from '@/services/api';
export default function ImageUpload({onUploaded,onBusy}:{onUploaded:(url:string)=>void;onBusy?:(busy:boolean)=>void}){
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 async function upload(event:React.ChangeEvent<HTMLInputElement>){const file=event.target.files?.[0];if(!file)return;setError('');if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>4*1024*1024){setError('Choose a JPG, PNG or WebP file up to 4 MB.');return;}setBusy(true);onBusy?.(true);try{const body=new FormData();body.set('image',file);const result=await apiRequest<{url:string}>('/uploads/image',{method:'POST',body});onUploaded(result.data.url);}catch(e){setError(e instanceof Error?e.message:'Upload failed.');}finally{setBusy(false);onBusy?.(false);event.target.value='';}}
 return <div className="upload-design"><span className="feature-icon">↑</span><h3>Upload Equipment Photo</h3><p className="small muted">JPG, PNG or WebP · up to 4 MB</p><label className="button outline">{busy?'Uploading…':'Choose Image'}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={upload} className="sr-only"/></label>{busy&&<p role="status">Uploading to imgbb…</p>}{error&&<p className="error" role="alert">{error}</p>}</div>;
}
