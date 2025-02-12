// /app/results/page.js
import { Suspense } from "react";
import ResultsClient from "./ResultsClient.client";

// Disable prerendering for this route.
export const prerender = false;
export const dynamic = "force-dynamic";

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-center text-xl text-blue-900 p-4">Loading...</div>}>
      <ResultsClient />
    </Suspense>
  );
}
