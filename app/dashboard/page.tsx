'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ActiveUserCard from '@/components/ActiveUserCard';
import WaitlistManager from '@/components/WaitlistManager';
import Link from 'next/link';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, Course, WaitlistEntry } from '@/types';

export const dynamic = 'force-dynamic';

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
  onDecline, 
  isProcessing 
}: { 
  user: User; 
  courses: Course[]; 
  onApprove: (userId: string, selectedCourses: string[]) => Promise<void>;
  onDecline: (userId: string, userName: string) => Promise<void>; 
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
    <div className="bg-[#FAF9F6] rounded-xl p-5 shadow-sm border border-[#1F6F78]/10">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-[#1B5C63]">{user.name}</h3>
          <p className="text-sm text-[#5F6B7A]">{user.email}</p>
          <p className="text-xs text-[#5F6B7A] mt-1">User ID: {user.uid}</p>
        </div>
        <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-200">
          Pending
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm font-semibold text-[#1F2933] mb-2">Assign Courses:</p>
        {courses.length === 0 ? (
          <p className="text-sm text-[#5F6B7A]">No courses available. Create courses in Firestore first.</p>
        ) : (
          <div className="space-y-2">
            {courses.map((course) => (
              <label key={course.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => toggleCourse(course.id)}
                  disabled={isProcessing}
                  className="rounded border-[#1F6F78]/30 text-[#1F6F78] focus:ring-[#1F6F78]"
                />
                <span className="text-sm text-[#1F2933]">{course.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApprove}
          disabled={isProcessing || selectedCourses.length === 0}
          className="flex-1 bg-[#1B5C63] text-white py-2.5 rounded-lg hover:bg-[#164851] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isProcessing ? 'Approving...' : 'Approve as Student'}
        </button>
        <button
          onClick={() => onDecline(user.uid, user.name)}
          disabled={isProcessing}
          className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isProcessing ? 'Processing...' : 'Decline'}
        </button>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { userData, signOut } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);

  // Fetch pending users, active users, courses, and waitlist (admin only)
  useEffect(() => {
    if (userData?.role === 'admin') {
      fetchPendingUsers();
      fetchActiveUsers();
      fetchCourses();
      fetchWaitlist();
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

  const fetchWaitlist = async () => {
    try {
      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, orderBy('createdAt', 'asc'));
      const querySnapshot = await getDocs(q);
      const entries: WaitlistEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        entries.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          status: data.status,
          source: data.source,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      });
      setWaitlistEntries(entries);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
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

  const declineUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to decline ${userName}'s registration request? This will permanently delete their account.`)) {
      return;
    }

    setProcessingUserId(userId);
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      await fetchPendingUsers();
      alert('User registration declined and account deleted.');
    } catch (error) {
      console.error('Error declining user:', error);
      alert('Failed to decline user. Please try again.');
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
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Header */}
      <header className="bg-[#0F3A42] shadow-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white/80 hover:text-white transition-colors font-medium">
              ← Home
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Math-101 Dashboard</h1>
              <p className="text-sm text-white/70">
                Welcome, {userData?.name} ({userData?.role})
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg hover:bg-white/20 transition-all shadow-sm font-semibold border border-white/20"
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
            <div className="bg-white rounded-2xl shadow-md border border-[#1F6F78]/10 p-6">
              <h2 className="text-2xl font-bold mb-5 text-[#1B5C63]">Manage Courses</h2>
              
              {loading ? (
                <p className="text-[#5F6B7A]">Loading courses...</p>
              ) : courses.length === 0 ? (
                <div className="text-[#5F6B7A]">
                  <p>No courses available yet.</p>
                  <p className="text-sm mt-2">Create courses in Firestore Console to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="block bg-[#FAF9F6] rounded-xl p-5 hover:shadow-md transition-all border border-[#1F6F78]/10 hover:border-[#1F6F78]/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-[#1B5C63]">{course.name}</h3>
                        <svg
                          className="w-5 h-5 text-[#7FB3B8]"
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
                      <p className="text-sm text-[#5F6B7A] line-clamp-2 leading-relaxed">{course.description}</p>
                      <div className="mt-3 flex items-center text-xs text-[#5F6B7A]">
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
            <div className="bg-white rounded-2xl shadow-md border border-[#1F6F78]/10 p-6">
              <h2 className="text-2xl font-bold mb-5 text-[#1B5C63]">Manage Active Users</h2>
              
              {loading ? (
                <p className="text-[#5F6B7A]">Loading active users...</p>
              ) : activeUsers.length === 0 ? (
                <p className="text-[#5F6B7A]">No active users at this time.</p>
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

            {/* Waitlist Section */}
            <div className="bg-white rounded-2xl shadow-md border border-[#1F6F78]/10 p-6">
              <h2 className="text-2xl font-bold mb-5 text-[#1B5C63]">Waitlist</h2>
              
              {loading ? (
                <p className="text-[#5F6B7A]">Loading waitlist...</p>
              ) : (
                <WaitlistManager entries={waitlistEntries} onRefresh={fetchWaitlist} />
              )}
            </div>

            {/* Pending User Approvals Section */}
            <div className="bg-white rounded-2xl shadow-md border border-[#1F6F78]/10 p-6">
              <h2 className="text-2xl font-bold mb-5 text-[#1B5C63]">Pending User Approvals</h2>
              
              {loading ? (
                <p className="text-[#5F6B7A]">Loading pending users...</p>
              ) : pendingUsers.length === 0 ? (
                <p className="text-[#5F6B7A]">No pending users at this time.</p>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <PendingUserCard
                      key={user.uid}
                      user={user}
                      courses={courses}
                      onApprove={approveUser}
                      onDecline={declineUser}
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
            <div className="bg-white rounded-2xl shadow-md border border-[#1F6F78]/10 p-6">
              <h2 className="text-2xl font-bold mb-5 text-[#1B5C63]">My Courses</h2>
              {userData.assignedCourses.length > 0 ? (
                <div className="space-y-3">
                  {userData.assignedCourses.map((courseId) => (
                    <Link
                      key={courseId}
                      href={`/courses/${courseId}`}
                      className="block bg-[#FAF9F6] rounded-xl p-5 hover:shadow-md transition-all border border-[#1F6F78]/10 hover:border-[#1F6F78]/20"
                    >
                      <div className="font-bold text-[#1B5C63] text-lg">Course: {courseId}</div>
                      <div className="text-sm text-[#5F6B7A]">Click to view course details</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-[#5F6B7A]">
                  <p>You don&apos;t have any assigned courses yet.</p>
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
