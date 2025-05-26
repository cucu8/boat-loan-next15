"use client";

import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-neutral">
      <div className=" mx-auto px-2 py-1">
        <div className="flex flex-row justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">MyBrand</h2>
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
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky transition"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky transition"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div
          className="
        text-center text-sm text-neutral opacity-70"
        >
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
