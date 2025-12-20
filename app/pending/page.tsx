'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

/**
 * Pending Page
 * 
 * Shown to users with 'pending' role.
 * These users have registered but are awaiting admin approval.
 * They cannot access other parts of the application until approved.
 */
function PendingContent() {
  const { userData, signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A8F95]/10 to-[#F5F1EA] px-4">
      <div className="max-w-md w-full bg-[#FAF9F6] rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-200">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1B5C63] mb-2">Account Pending</h1>
          <p className="text-[#5F6B7A]">
            Welcome, {userData?.name}!
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-[#1F2933]">
            Your account is currently pending approval. An administrator will review your
            registration and assign you the appropriate access level.
          </p>
        </div>

        <div className="text-sm text-[#5F6B7A] mb-6 leading-relaxed">
          <p>You'll receive access once your account is approved.</p>
          <p className="mt-2">Please check back later or contact support if you have questions.</p>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full bg-[#4A8F95] text-white py-3 rounded-xl hover:bg-[#1F6F78] transition shadow-md font-semibold"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function PendingPage() {
  return (
    <ProtectedRoute>
      <PendingContent />
    </ProtectedRoute>
  );
}
