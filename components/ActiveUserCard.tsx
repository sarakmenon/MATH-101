'use client';

import { useState } from 'react';
import { User, Course } from '@/types';

interface ActiveUserCardProps {
  user: User;
  courses: Course[];
  onUpdate: (userId: string, updates: { assignedCourses?: string[]; role?: string; status?: string }) => Promise<void>;
  isProcessing: boolean;
}

export default function ActiveUserCard({ user, courses, onUpdate, isProcessing }: ActiveUserCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(user.assignedCourses || []);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [selectedStatus, setSelectedStatus] = useState(user.status);

  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSave = async () => {
    await onUpdate(user.uid, {
      assignedCourses: selectedCourses,
      role: selectedRole,
      status: selectedStatus,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedCourses(user.assignedCourses || []);
    setSelectedRole(user.role);
    setSelectedStatus(user.status);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500 mt-1">User ID: {user.uid}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded ${
            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {user.role}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
            {user.status}
          </span>
        </div>
      </div>

      {!isEditing ? (
        <div>
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700 mb-1">Assigned Courses:</p>
            {user.assignedCourses && user.assignedCourses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.assignedCourses.map((courseId) => {
                  const course = courses.find(c => c.id === courseId);
                  return (
                    <span key={courseId} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {course?.name || courseId}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No courses assigned</p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            Edit User
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Assign Courses:</p>
            {courses.length === 0 ? (
              <p className="text-sm text-gray-500">No courses available</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {courses.map((course) => (
                  <label key={course.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourse(course.id)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{course.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isProcessing ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isProcessing}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
