'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * Handles role-based routing logic:
 * 1. If user is not authenticated → redirect to /login
 * 2. If user has 'pending' role → redirect to /pending (unless already there)
 * 3. If user has 'student' role → redirect to their first assigned course (unless already on a course page)
 * 4. If user has 'admin' role → allow access to /dashboard and all routes
 * 
 * This component should wrap protected pages to enforce authentication and authorization.
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Not authenticated → redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // Wait for user data to load
    if (!userData) return;

    // Role-based routing logic
    switch (userData.role) {
      case 'pending':
        // Pending users can only access /pending page
        if (pathname !== '/pending') {
          router.push('/pending');
        }
        break;

      case 'student':
        // Students should be redirected to their first assigned course
        // Unless they're already on a course page or dashboard
        if (userData.assignedCourses.length > 0) {
          const isOnCoursePage = pathname.startsWith('/courses/');
          const isOnDashboard = pathname === '/dashboard';
          
          if (!isOnCoursePage && !isOnDashboard) {
            // Redirect to first assigned course
            router.push(`/courses/${userData.assignedCourses[0]}`);
          }
        } else {
          // Student has no assigned courses, redirect to dashboard
          if (pathname !== '/dashboard') {
            router.push('/dashboard');
          }
        }
        break;

      case 'admin':
        // Admins have full access, no restrictions
        // They can access dashboard and all other routes
        break;

      default:
        // Unknown role, redirect to login
        router.push('/login');
    }
  }, [user, userData, loading, pathname, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!user || !userData) {
    return null;
  }

  return <>{children}</>;
}
