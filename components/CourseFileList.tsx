'use client';

import { CourseFile } from '@/types';
import { ref, deleteObject } from 'firebase/storage';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { useState } from 'react';

interface CourseFileListProps {
  files: CourseFile[];
  courseId: string;
  isAdmin: boolean;
  onFileDeleted: () => void;
}

export default function CourseFileList({ files, courseId, isAdmin, onFileDeleted }: CourseFileListProps) {
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleDownload = (file: CourseFile) => {
    window.open(file.url, '_blank');
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
      <div className="bg-[#eee3d4] rounded-lg p-6 text-center">
        <p className="text-[#5F6B7A]">No course materials available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between bg-[#eee3d4] rounded-lg p-4 hover:shadow-md hover:bg-white transition"
        >
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
                <p className="font-semibold text-[#1F6F78] truncate">{file.name}</p>
                <p className="text-sm text-[#5F6B7A]">
                  {formatFileSize(file.size)} • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => handleDownload(file)}
              className="bg-[#1F6F78] text-white px-4 py-2 rounded-lg hover:bg-[#1a5c63] transition text-sm shadow-sm font-medium"
            >
              Download
            </button>
            
            {isAdmin && (
              <button
                onClick={() => handleDelete(file)}
                disabled={deletingFileId === file.id}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm disabled:opacity-50 shadow-sm font-medium"
              >
                {deletingFileId === file.id ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
