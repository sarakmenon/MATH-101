'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export const dynamic = 'force-dynamic';

/**
 * Register Page
 * 
 * Allows new users to create an account with email and password.
 * New users are assigned 'pending' role by default and redirected to /pending.
 * Admin must approve and assign role before user can access other features.
 */
export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      router.push('/pending'); // New users start with pending status
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A8F95]/10 to-[#F5F1EA] px-4">
      <div className="max-w-md w-full bg-[#FAF9F6] rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1B5C63]">Math-101</h1>
          <p className="text-[#5F6B7A] mt-2">Create your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#1F2933] mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#4A8F95]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F6F78] focus:border-transparent disabled:opacity-50 transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#1F2933] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#4A8F95]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F6F78] focus:border-transparent disabled:opacity-50 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#1F2933] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#4A8F95]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F6F78] focus:border-transparent disabled:opacity-50 transition"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#1F2933] mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#4A8F95]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F6F78] focus:border-transparent disabled:opacity-50 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B5C63] text-white py-3 rounded-xl hover:bg-[#1F6F78] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#5F6B7A] text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1F6F78] hover:text-[#4A6F8A] hover:underline font-semibold">
              Sign in
            </Link>
          </p>
          <Link href="/" className="text-[#5F6B7A] hover:text-[#4A6F8A] hover:underline block mt-3 text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
