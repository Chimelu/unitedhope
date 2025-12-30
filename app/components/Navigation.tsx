'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DonationCounter from './DonationCounter';

/**
 * Navigation component with user-requested pages
 * Homepage, Donate, About, Contact, FAQ, Blog, Legal
 * USA Theme: Red, White, Blue
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Total Collected Banner - Above Nav */}
      <div className="bg-red-900 text-white">
        <DonationCounter />
      </div>

      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo on Left */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.jpeg"
                  alt="UnitedHope Logo"
                  width={60}
                  height={60}
                  className="object-contain rounded"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide hover:text-red-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/donate"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide hover:text-red-500 transition-colors"
              >
                Donate
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide hover:text-red-500 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide hover:text-red-500 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide hover:text-red-500 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide hover:text-red-500 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/legal"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide hover:text-red-500 transition-colors"
              >
                Legal
              </Link>
            </div>

            {/* Right Side - Donate Button */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Prominent Donate Button - Red/White USA Theme */}
              <Link
                href="/donate"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 font-bold text-sm uppercase tracking-wide transition-colors shadow-md"
              >
                Donate Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <Link
                href="/donate"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-bold text-xs uppercase tracking-wide transition-colors"
              >
                Donate
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-800">
            <div className="px-4 pt-2 pb-4 space-y-1 bg-gray-900">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium uppercase hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/donate"
                className="block px-3 py-2 text-base font-medium uppercase hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium uppercase hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium uppercase hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 text-base font-medium uppercase hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium uppercase hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/legal"
                className="block px-3 py-2 text-base font-medium uppercase hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Legal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

