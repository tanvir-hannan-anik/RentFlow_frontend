import Catalog from '@/components/catalog';
export default async function Page({ searchParams }) { const params = await searchParams; return <Catalog initial={{ q: params.q, city: params.city, category: params.category }} />; }
