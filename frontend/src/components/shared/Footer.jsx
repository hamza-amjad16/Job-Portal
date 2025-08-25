import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400 text-center md:text-left">
            © 2025 Job Hunt. All rights reserved.
          </div>
          <div className="flex justify-center md:justify-end space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
