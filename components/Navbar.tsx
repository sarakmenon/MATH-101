'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userData, signOut } = useAuth();

  return (
    <nav className="fixed w-full bg-[#164851] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/math-101-logo.png" 
                alt="Math-101 Logo" 
                width={140} 
                height={70}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
              Home
            </Link>
            {user && userData?.role !== 'pending' && (
              <Link href="/dashboard" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
                Dashboard
              </Link>
            )}
            {!user ? (
              <>
                <Link href="/login" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#F5F1EA] text-[#1F6F78] px-6 py-2.5 rounded-lg hover:bg-white transition-all duration-200 font-semibold"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg hover:bg-white/20 transition-all shadow-sm font-semibold border border-white/20"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-white/80"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-white/90 hover:text-white transition">
                Home
              </Link>
              {user && userData?.role !== 'pending' && (
                <Link href="/dashboard" className="text-white/90 hover:text-white transition">
                  Dashboard
                </Link>
              )}
              {!user ? (
                <>
                  <Link href="/login" className="text-white/90 hover:text-white transition">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-[#F5F1EA] text-[#1F6F78] px-6 py-2 rounded-xl hover:bg-[#9FC7C9] hover:text-white transition text-center shadow-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="bg-white/10 text-white px-5 py-2.5 rounded-lg hover:bg-white/20 transition-all text-left"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
