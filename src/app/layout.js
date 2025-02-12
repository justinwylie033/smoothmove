// app/layout.js
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "SmoothMove - Your Moving House Advisor",
  description:
    "Discover real‑time insights on local weather, crime, and property data for your next home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="bg-blue-900 text-white shadow-md">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link href="/" className="text-2xl font-bold hover:text-yellow-300">
              SmoothMove
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-yellow-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-yellow-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-yellow-300">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-yellow-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-10 px-6">{children}</main>
        <footer className="bg-blue-900 text-white py-4 mt-10">
          <div className="container mx-auto text-center">
            © 2025 SmoothMove. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
