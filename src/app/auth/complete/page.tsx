import OAuthComplete from '@/components/oauth-complete';
export default async function Page({searchParams}: {searchParams: import("@/types").SearchParams}) { const {next}=await searchParams;return <OAuthComplete next={next}/>; }
