"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/services/api";

export default function ApiConnectionCheck() {
  const [message, setMessage] = useState("Checking API connection...");

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    let active = true;
    apiRequest("/health")
      .then((result) => { if (active) setMessage(`API connected: ${result.message}`); })
      .catch(() => { if (active) setMessage("API unavailable. Start the backend and check BACKEND_URL."); });
    return () => { active = false; };
  }, []);

  if (process.env.NODE_ENV !== "development") return null;
  return <p role="status" className="mt-4 text-sm">{message}</p>;
}
