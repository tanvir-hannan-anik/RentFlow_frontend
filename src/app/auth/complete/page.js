import OAuthComplete from '@/components/oauth-complete';
export default async function Page({searchParams}) { const {next}=await searchParams;return <OAuthComplete next={next}/>; }
