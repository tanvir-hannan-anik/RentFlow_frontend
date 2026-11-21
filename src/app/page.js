import ApiConnectionCheck from "@/components/api-connection-check";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Equipment Rental Platform</h1>
      {process.env.NODE_ENV === "development" && <ApiConnectionCheck />}
    </main>
  );
}
