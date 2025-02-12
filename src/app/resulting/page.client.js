"use client";

// Disable static prerendering for this page.
export const prerender = false;
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultingPage() {
  // Get URL query parameters
  const searchParams = useSearchParams();
  const postcode = searchParams.get("postcode");
  const router = useRouter();

  // Local state for data, loading, and error messages.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data only on the client when a postcode is provided.
  useEffect(() => {
    if (!postcode) return;
    async function fetchData() {
      try {
        const res = await fetch(`https://backend-7flt.onrender.com/api/${postcode}`);
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.statusText}`);
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [postcode]);

  // If no postcode is provided, display a message and a button to go back.
  if (!postcode) {
    return (
      <div className="text-center p-4">
        <p className="text-xl text-red-500">No postcode provided.</p>
        <button
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          onClick={() => router.push("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {loading && (
        <p className="text-center text-xl text-blue-900">Loading...</p>
      )}
      {error && (
        <p className="text-center text-xl text-red-500">{error}</p>
      )}
      {data && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">
            Results for {data.postcode}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weather Data Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-semibold text-blue-800 border-b-2 border-blue-500 pb-2 mb-4">
                Weather Information
              </h3>
              {data.weather?.error ? (
                <p>{data.weather.error}</p>
              ) : (
                <ul className="space-y-2">
                  <li>
                    <strong>Temperature:</strong> {data.weather.temperature}
                  </li>
                  <li>
                    <strong>Condition:</strong> {data.weather.condition}
                  </li>
                  <li>
                    <img
                      src={`http://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
                      alt={data.weather.condition}
                      className="mx-auto"
                    />
                  </li>
                </ul>
              )}
            </div>
            {/* Crime Data Summary Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-semibold text-blue-800 border-b-2 border-blue-500 pb-2 mb-4">
                Transport Police Data 2024
              </h3>
              {data.crime?.error ? (
                <p>{data.crime.error}</p>
              ) : (
                <ul className="space-y-2">
                  <li>
                    <strong>Total Crimes:</strong> {data.crime.total}
                  </li>
                  {data.crime.breakdown && (
                    <li>
                      <strong>Breakdown:</strong>{" "}
                      {Object.entries(data.crime.breakdown)
                        .map(([cat, count]) => `${cat}: ${count}`)
                        .join(", ")}
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          {/* Detailed Crime Data Section */}
          {data.crime?.crime_details && data.crime.crime_details.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-semibold text-blue-800 border-b-2 border-blue-500 pb-2 mb-4">
                Detailed Information
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {data.crime.crime_details.map((crime) => (
                  <div key={crime.id} className="border p-3 rounded">
                    <p>
                      <strong>ID:</strong> {crime.id}
                    </p>
                    <p>
                      <strong>Category:</strong> {crime.category}
                    </p>
                    <p>
                      <strong>Month:</strong> {crime.month}
                    </p>
                    <p>
                      <strong>Street:</strong> {crime.street}
                    </p>
                    <p>
                      <strong>Coordinates:</strong> {crime.latitude}, {crime.longitude}
                    </p>
                    <p>
                      <strong>Outcome:</strong> {crime.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-center">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
              onClick={() => router.push("/")}
            >
              Search Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
