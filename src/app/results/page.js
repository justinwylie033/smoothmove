// app/results/page.js

// This export forces the page to be dynamically rendered (not statically prerendered)
export const dynamic = "force-dynamic";

import ResultsClient from "./ResultsClient";

export default function ResultsPage() {
  return <ResultsClient />;
}
