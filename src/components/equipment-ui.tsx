/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import type {Equipment} from '@/types';
import SafeImage from './safe-image';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/services/api';
export const categories = ['Construction', 'Photography', 'Vehicles', 'Agriculture', 'Events', 'Electronics'];
export const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value || 0);
export function useApi<T>(path: string, revision = 0) {
  const [state, setState] = useState<{data:T|null;loading:boolean;error:string;path?:string;revision?:number}>({ data: null, loading: true, error: '' });
  useEffect(() => { const controller = new AbortController(); apiRequest<T>(path, { signal: controller.signal }).then(({ data }) => setState({ data, loading: false, error: '', path, revision })).catch((error) => { if (!controller.signal.aborted) setState({ data: null, loading: false, error: error.message, path, revision }); }); return () => controller.abort(); }, [path, revision]);
  return state.path === path && state.revision === revision ? state : { data: null, loading: true, error: '' };
}
export function LoadState({ loading, error, empty }: {loading?:boolean;error?:string;empty?:boolean}) {
  if (loading) return <div className="empty" role="status"><span className="spinner" />Loading…</div>;
  if (error) return <div className="empty error" role="alert"><h3>Unable to load data</h3><p>{error}</p><button className="button outline" onClick={() => window.location.reload()}>Try again</button></div>;
  if (empty) return <div className="empty"><h3>Nothing here yet</h3><p>Try another search or add your first equipment listing.</p><Link className="button outline" href="/dashboard/add-equipment">List equipment</Link></div>;
  return null;
}
export function EquipmentCard({ item, onRemove }: {item:Equipment;onRemove?:()=>void}) {
  const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function favorite() { setBusy(true); try { await apiRequest(`/my/favorites/${item._id}`, { method: onRemove ? 'DELETE' : 'PUT' }); setMessage(onRemove ? 'Removed' : 'Saved to favorites'); onRemove?.(); } catch (error) { setMessage(error.status === 401 ? 'Please sign in to save favorites.' : error.message); } finally { setBusy(false); } }
  return <article className="equipment-card"><div className="card-photo"><Link href={`/equipment/${item._id}`}><SafeImage src={item.image} category={item.category} alt={item.name} loading="lazy" /></Link><span className="badge">{item.category}</span><button className="favorite" onClick={favorite} disabled={busy} aria-label={onRemove ? `Remove ${item.name} from favorites` : `Save ${item.name}`}>{onRemove ? '♥' : '♡'}</button></div><div className="card-content"><Link href={`/equipment/${item._id}`}><h3>{item.name}</h3></Link><p className="muted small">⌖ {item.location?.city} <span className="availability">{item.quantity > 0 ? `${item.quantity} in fleet` : 'Unavailable'}</span></p><div className="card-bottom"><p><strong>{money(item.price)}</strong><span className="muted small"> / {item.rentalType?.toLowerCase() || 'daily'}</span></p><Link className="button compact outline" href={`/equipment/${item._id}`}>View details</Link></div>{message && <p className="small" role="status">{message}</p>}</div></article>;
}
export function EquipmentGrid({ items }: {items:Equipment[]}) { return <div className="equipment-grid">{items.map((item) => <EquipmentCard key={item._id} item={item} />)}</div>; }
