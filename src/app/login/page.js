import AuthForm from "@/components/auth-form";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return <AuthForm nextPath={params.next} oauthError={params.error} />;
}
