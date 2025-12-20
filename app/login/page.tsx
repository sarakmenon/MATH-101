'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Login Page
 * 
 * Allows users to sign in with email and password.
 * After successful login, users are redirected based on their role:
 * - pending → /pending
 * - student → first assigned course or /dashboard
 * - admin → /dashboard
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/dashboard'); // Will be redirected by ProtectedRoute based on role
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A8F95]/10 to-[#F5F1EA] px-4">
      <div className="max-w-md w-full bg-[#FAF9F6] rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1B5C63]">Math-101</h1>
          <p className="text-[#5F6B7A] mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B5C63] text-white py-3 rounded-xl hover:bg-[#1F6F78] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#5F6B7A] text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#1F6F78] hover:text-[#4A6F8A] hover:underline font-semibold">
              Register
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
