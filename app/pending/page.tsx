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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Pending</h1>
          <p className="text-gray-600">
            Welcome, {userData?.name}!
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            Your account is currently pending approval. An administrator will review your
            registration and assign you the appropriate access level.
          </p>
        </div>

        <div className="text-sm text-gray-500 mb-6">
          <p>You'll receive access once your account is approved.</p>
          <p className="mt-2">Please check back later or contact support if you have questions.</p>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
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
