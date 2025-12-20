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
    <div className="bg-[#FAF9F6] rounded-xl p-5 shadow-sm border border-[#4A8F95]/10">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-[#1B5C63]">{user.name}</h3>
          <p className="text-sm text-[#5F6B7A]">{user.email}</p>
          <p className="text-xs text-[#5F6B7A] mt-1">User ID: {user.uid}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded border ${
            user.role === 'admin' ? 'bg-[#4A6F8A]/10 text-[#4A6F8A] border-[#4A6F8A]/30' : 'bg-[#7FB3B8]/10 text-[#1F6F78] border-[#7FB3B8]/30'
          }`}>
            {user.role}
          </span>
          <span className="px-2 py-1 bg-[#7FB3B8]/20 text-[#1F6F78] text-xs rounded border border-[#7FB3B8]/40">
            {user.status}
          </span>
        </div>
      </div>

      {!isEditing ? (
        <div>
          <div className="mb-3">
            <p className="text-sm font-semibold text-[#1F2933] mb-1">Assigned Courses:</p>
            {user.assignedCourses && user.assignedCourses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.assignedCourses.map((courseId) => {
                  const course = courses.find(c => c.id === courseId);
                  return (
                    <span key={courseId} className="px-2 py-1 bg-white text-[#1F6F78] text-xs rounded border border-[#1F6F78]/20">
                      {course?.name || courseId}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-[#5F6B7A]">No courses assigned</p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            disabled={isProcessing}
            className="w-full bg-[#1B5C63] text-white py-2 rounded-xl hover:bg-[#1F6F78] transition shadow-md disabled:opacity-50 font-semibold"
          >
            Edit User
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-[#1F2933] mb-2">Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-[#4A8F95]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F6F78] focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-semibold text-[#1F2933] mb-2">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-[#4A8F95]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F6F78] focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-3">
            <p className="text-sm font-semibold text-[#1F2933] mb-2">Assign Courses:</p>
            {courses.length === 0 ? (
              <p className="text-sm text-[#5F6B7A]">No courses available</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {courses.map((course) => (
                  <label key={course.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourse(course.id)}
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
              onClick={handleSave}
              disabled={isProcessing}
              className="flex-1 bg-[#1B5C63] text-white py-2 rounded-xl hover:bg-[#1F6F78] transition shadow-md disabled:opacity-50 font-semibold"
            >
              {isProcessing ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isProcessing}
              className="flex-1 bg-[#4A8F95] text-white py-2 rounded-xl hover:bg-[#1F6F78] transition shadow-md disabled:opacity-50 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
