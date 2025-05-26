"use client";

export default function Footer() {
  return (
    <footer className="bg-navy text-neutral">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">MyBrand</h2>
            <p className="text-sm text-neutral">
              Building beautiful interfaces with care and color.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Follow us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky transition"
              >
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 
                  10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 
                  20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky transition"
              >
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12a12 12 0 
                  008.21 11.44c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.78-1.34-1.78-1.1-.75.08-.74.08-.74 
                  1.22.09 1.87 1.25 1.87 1.25 1.08 1.86 2.83 1.32 
                  3.52 1 .11-.78.42-1.32.76-1.63-2.67-.3-5.47-1.33-5.47-5.93 
                  0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 
                  0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 
                  3.29-1.23 3.29-1.23.67 1.64.26 2.86.13 
                  3.16.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 
                  5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 
                  .32.21.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky transition"
              >
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 
                  0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 
                  110 4 2 2 0 010-4z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-neutral opacity-70">
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
