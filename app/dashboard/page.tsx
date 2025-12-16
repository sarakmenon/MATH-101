'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ActiveUserCard from '@/components/ActiveUserCard';
import Link from 'next/link';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, Course } from '@/types';

/**
 * Dashboard Page
 * 
 * Main dashboard accessible to:
 * - Admin users (full access to manage users and courses)
 * - Student users (view their assigned courses)
 * 
 * Pending users are redirected to /pending by ProtectedRoute.
 */

// Component for displaying and approving pending users
function PendingUserCard({ 
  user, 
  courses, 
  onApprove, 
  isProcessing 
}: { 
  user: User; 
  courses: Course[]; 
  onApprove: (userId: string, selectedCourses: string[]) => Promise<void>; 
  isProcessing: boolean;
}) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleApprove = () => {
    if (selectedCourses.length === 0) {
      alert('Please select at least one course to assign to this user.');
      return;
    }
    onApprove(user.uid, selectedCourses);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500 mt-1">User ID: {user.uid}</p>
        </div>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
          Pending
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Assign Courses:</p>
        {courses.length === 0 ? (
          <p className="text-sm text-gray-500">No courses available. Create courses in Firestore first.</p>
        ) : (
          <div className="space-y-2">
            {courses.map((course) => (
              <label key={course.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => toggleCourse(course.id)}
                  disabled={isProcessing}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{course.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleApprove}
        disabled={isProcessing || selectedCourses.length === 0}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Approving...' : 'Approve as Student'}
      </button>
    </div>
  );
}

function DashboardContent() {
  const { userData, signOut } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);

  // Fetch pending users, active users, and courses (admin only)
  useEffect(() => {
    if (userData?.role === 'admin') {
      fetchPendingUsers();
      fetchActiveUsers();
      fetchCourses();
    } else {
      setLoading(false);
    }
  }, [userData]);

  const fetchPendingUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
      });
      setPendingUsers(users);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
      });
      setActiveUsers(users);
    } catch (error) {
      console.error('Error fetching active users:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const coursesRef = collection(db, 'courses');
      const querySnapshot = await getDocs(coursesRef);
      const coursesData: Course[] = [];
      querySnapshot.forEach((doc) => {
        coursesData.push(doc.data() as Course);
      });
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const approveUser = async (userId: string, selectedCourses: string[]) => {
    setProcessingUserId(userId);
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        role: 'student',
        status: 'active',
        assignedCourses: selectedCourses,
        updatedAt: new Date(),
      });
      // Refresh pending users list
      await fetchPendingUsers();
      await fetchActiveUsers();
      alert('User approved successfully!');
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Failed to approve user. Please try again.');
    } finally {
      setProcessingUserId(null);
    }
  };

  const updateUser = async (userId: string, updates: { assignedCourses?: string[]; role?: string; status?: string }) => {
    setProcessingUserId(userId);
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date(),
      });
      // Refresh active users list
      await fetchActiveUsers();
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setProcessingUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Math-101 Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome, {userData?.name} ({userData?.role})
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Admin View */}
        {userData?.role === 'admin' && (
          <div className="space-y-6">
            {/* Course Management Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
              
              {loading ? (
                <p className="text-gray-600">Loading courses...</p>
              ) : courses.length === 0 ? (
                <div className="text-gray-600">
                  <p>No courses available yet.</p>
                  <p className="text-sm mt-2">Create courses in Firestore Console to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-500 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {course.files?.length || 0} files
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Active Users Management Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Active Users</h2>
              
              {loading ? (
                <p className="text-gray-600">Loading active users...</p>
              ) : activeUsers.length === 0 ? (
                <p className="text-gray-600">No active users at this time.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeUsers.map((user) => (
                    <ActiveUserCard
                      key={user.uid}
                      user={user}
                      courses={courses}
                      onUpdate={updateUser}
                      isProcessing={processingUserId === user.uid}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pending User Approvals Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Pending User Approvals</h2>
              
              {loading ? (
                <p className="text-gray-600">Loading pending users...</p>
              ) : pendingUsers.length === 0 ? (
                <p className="text-gray-600">No pending users at this time.</p>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <PendingUserCard
                      key={user.uid}
                      user={user}
                      courses={courses}
                      onApprove={approveUser}
                      isProcessing={processingUserId === user.uid}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Student View */}
        {userData?.role === 'student' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">My Courses</h2>
              {userData.assignedCourses.length > 0 ? (
                <div className="space-y-3">
                  {userData.assignedCourses.map((courseId) => (
                    <Link
                      key={courseId}
                      href={`/courses/${courseId}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div className="font-semibold">Course: {courseId}</div>
                      <div className="text-sm text-gray-600">Click to view course details</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">
                  <p>You don't have any assigned courses yet.</p>
                  <p className="text-sm mt-2">Contact your administrator to get enrolled.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
