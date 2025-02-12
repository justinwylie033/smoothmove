// app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedPostcode = postcode.trim();
    
    // Check that the postcode contains at least one space (indicating a full postcode).
    if (!trimmedPostcode.includes(" ")) {
      setError("Please enter a full postcode (e.g., 'EH11 1AA').");
      return;
    }
    
    setError("");
    router.push(`/resulting?postcode=${encodeURIComponent(trimmedPostcode.toUpperCase())}`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-blue-900">
          Discover Your Next Home's Neighborhood
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Enter your postcode to receive real‑time insights on local weather,
          crime data, and more before you move.
        </p>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {error && (
          <div className="mb-4 text-red-500 font-semibold">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Enter postcode e.g. EH11 1AA"
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value);
              setError("");
            }}
            className="p-4 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
