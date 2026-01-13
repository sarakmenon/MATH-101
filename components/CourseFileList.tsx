'use client';

import { CourseFile, User } from '@/types';
import { ref, deleteObject } from 'firebase/storage';
import { doc, updateDoc, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { useState, useEffect } from 'react';

interface CourseFileListProps {
  files: CourseFile[];
  courseId: string;
  isAdmin: boolean;
  onFileDeleted: () => void;
  currentUserId: string;
  allCourseFiles: CourseFile[];
}

export default function CourseFileList({ files, courseId, isAdmin, onFileDeleted, currentUserId, allCourseFiles }: CourseFileListProps) {
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const [updatingPermissions, setUpdatingPermissions] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAssignedUsers();
    }
  }, [courseId, isAdmin]);

  const fetchAssignedUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('assignedCourses', 'array-contains', courseId));
      const querySnapshot = await getDocs(q);
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
      });
      setAssignedUsers(users);
    } catch (error) {
      console.error('Error fetching assigned users:', error);
    }
  };

  const handleDownload = (file: CourseFile) => {
    window.open(file.url, '_blank');
  };

  const updateFilePermissions = async (file: CourseFile, newAllowedUsers: string[]) => {
    setUpdatingPermissions(file.id);
    try {
      const courseRef = doc(db, 'courses', courseId);
      const updatedFile = { ...file, allowedUsers: newAllowedUsers };
      
      await updateDoc(courseRef, {
        files: arrayRemove(file),
      });
      
      const courseDoc = await getDocs(query(collection(db, 'courses'), where('__name__', '==', courseId)));
      const currentFiles = courseDoc.docs[0]?.data()?.files || [];
      const otherFiles = currentFiles.filter((f: CourseFile) => f.id !== file.id);
      
      await updateDoc(courseRef, {
        files: [...otherFiles, updatedFile],
        updatedAt: new Date(),
      });

      onFileDeleted();
    } catch (error) {
      console.error('Error updating file permissions:', error);
      alert('Failed to update permissions. Please try again.');
    } finally {
      setUpdatingPermissions(null);
    }
  };

  const toggleUserAccess = async (file: CourseFile, userId: string) => {
    const currentAllowed = file.allowedUsers || [];
    const newAllowed = currentAllowed.includes(userId)
      ? currentAllowed.filter(id => id !== userId)
      : [...currentAllowed, userId];
    await updateFilePermissions(file, newAllowed);
  };

  const handleDelete = async (file: CourseFile) => {
    if (!confirm(`Are you sure you want to delete "${file.name}"?`)) return;

    setDeletingFileId(file.id);
    try {
      // Delete from Firebase Storage
      const fileRef = ref(storage, `courses/${courseId}/${file.id}`);
      await deleteObject(fileRef);

      // Remove from Firestore
      const courseRef = doc(db, 'courses', courseId);
      await updateDoc(courseRef, {
        files: arrayRemove(file),
        updatedAt: new Date(),
      });

      onFileDeleted();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
    } finally {
      setDeletingFileId(null);
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="bg-[#FAF9F6] rounded-xl p-6 text-center border border-[#4A8F95]/10">
        <p className="text-[#5F6B7A]">No course materials available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-[#FAF9F6] rounded-xl border border-[#4A8F95]/10 overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 hover:bg-[#F5F1EA] transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-[#1F6F78] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#1B5C63] truncate">{file.name}</p>
                  <p className="text-sm text-[#5F6B7A]">
                    {formatFileSize(file.size)} • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                  {isAdmin && (
                    <p className="text-xs text-[#5F6B7A] mt-1">
                      {!file.allowedUsers || file.allowedUsers.length === 0 
                        ? 'Restricted (admin only - no student access)' 
                        : `${file.allowedUsers.length} student(s) have access`}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => handleDownload(file)}
                className="bg-[#1B5C63] text-white px-4 py-2 rounded-xl hover:bg-[#1F6F78] transition text-sm shadow-md font-semibold"
              >
                Download
              </button>
              
              {isAdmin && (
                <>
                  <button
                    onClick={() => setExpandedFileId(expandedFileId === file.id ? null : file.id)}
                    className="bg-[#7FB3B8] text-white px-4 py-2 rounded-xl hover:bg-[#6AA3A8] transition text-sm shadow-md font-semibold"
                  >
                    {expandedFileId === file.id ? 'Hide' : 'Permissions'}
                  </button>
                  <button
                    onClick={() => handleDelete(file)}
                    disabled={deletingFileId === file.id}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition text-sm disabled:opacity-50 shadow-md font-semibold"
                  >
                    {deletingFileId === file.id ? 'Deleting...' : 'Delete'}
                  </button>
                </>
              )}
            </div>
          </div>

          {isAdmin && expandedFileId === file.id && (
            <div className="border-t border-[#4A8F95]/10 p-4 bg-white">
              <h4 className="font-bold text-[#1B5C63] mb-3">Manage File Access</h4>
              <p className="text-sm text-[#5F6B7A] mb-3">
                Select which students can access this file. If no students are selected, only admins can see this file.
              </p>
              
              {assignedUsers.length === 0 ? (
                <p className="text-sm text-[#5F6B7A]">No students assigned to this course yet.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {assignedUsers.map((user) => (
                    <label
                      key={user.uid}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAF9F6] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={file.allowedUsers?.includes(user.uid) || false}
                        onChange={() => toggleUserAccess(file, user.uid)}
                        disabled={updatingPermissions === file.id}
                        className="rounded border-[#1F6F78]/30 text-[#1F6F78] focus:ring-[#1F6F78]"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1B5C63]">{user.name}</p>
                        <p className="text-xs text-[#5F6B7A]">{user.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              
              {updatingPermissions === file.id && (
                <p className="text-sm text-[#5F6B7A] mt-3">Updating permissions...</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
