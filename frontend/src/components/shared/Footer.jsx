import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Job<span className="text-[#0072E0]">Genie</span>
            </h2>
            <p className="text-sm text-gray-500">
              © 2024 JobGenie. All rights reserved.
            </p>
          </div>

          <div className="flex justify-center md:justify-start gap-6 text-gray-600">
            <a
              href="https://facebook.com"
              className="hover:text-[#0072E0]"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                ...
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-[#0072E0]"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                ...
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-[#0072E0]"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                ...
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
