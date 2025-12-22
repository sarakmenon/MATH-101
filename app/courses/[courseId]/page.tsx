'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import CourseFileUpload from '@/components/CourseFileUpload';
import CourseFileList from '@/components/CourseFileList';
import { Course } from '@/types';
import Link from 'next/link';

/**
 * Course Detail Page
 * 
 * Displays course information for a specific course.
 * Accessible to:
 * - Students who are assigned to this course
 * - Admin users (can view all courses)
 * 
 * Students are automatically redirected here if they have assigned courses.
 */
function CourseContent() {
  const params = useParams();
  const router = useRouter();
  const { userData, signOut } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const courseId = params.courseId as string;

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      if (courseDoc.exists()) {
        setCourse({ id: courseDoc.id, ...courseDoc.data() } as Course);
      } else {
        setError('Course not found');
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  // Check if user has access to this course
  const hasAccess = 
    userData?.role === 'admin' || 
    userData?.assignedCourses.includes(courseId);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this course.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Loading course...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Course not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1B5C63] to-[#1F6F78] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Math-101</h1>
            <p className="text-sm text-white/80">
              {userData?.name} ({userData?.role})
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition shadow-sm font-semibold border border-white/30"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition shadow-sm font-semibold border border-white/30"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#1B5C63] mb-3">{course.name}</h2>
            <p className="text-[#5F6B7A] leading-relaxed text-lg">{course.description}</p>
          </div>

          {/* Admin File Upload */}
          {userData?.role === 'admin' && (
            <div className="border-t border-[#4A8F95]/10 pt-6 mb-6">
              <CourseFileUpload
                courseId={courseId}
                userId={userData.uid}
                onUploadComplete={fetchCourse}
              />
            </div>
          )}

          {/* Course Materials */}
          <div className="border-t border-[#4A8F95]/10 pt-6">
            <h3 className="text-2xl font-bold mb-6 text-[#1B5C63]">Course Materials</h3>
            <CourseFileList
              files={course.files || []}
              courseId={courseId}
              isAdmin={userData?.role === 'admin'}
              onFileDeleted={fetchCourse}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CoursePage() {
  return (
    <ProtectedRoute>
      <CourseContent />
    </ProtectedRoute>
  );
}
