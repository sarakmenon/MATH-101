'use client';

import { useState, ChangeEvent } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { CourseFile } from '@/types';

interface CourseFileUploadProps {
  courseId: string;
  userId: string;
  onUploadComplete: () => void;
}

export default function CourseFileUpload({ courseId, userId, onUploadComplete }: CourseFileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // Upload file to Firebase Storage
      const fileRef = ref(storage, `courses/${courseId}/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      // Create file metadata
      const courseFile: CourseFile = {
        id: fileRef.name,
        name: file.name,
        url: downloadURL,
        size: file.size,
        uploadedAt: new Date(),
        uploadedBy: userId,
      };

      // Update course document in Firestore
      const courseRef = doc(db, 'courses', courseId);
      await updateDoc(courseRef, {
        files: arrayUnion(courseFile),
        updatedAt: new Date(),
      });

      setSuccess(`File "${file.name}" uploaded successfully!`);
      onUploadComplete();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err: any) {
      console.error('Error uploading file:', err);
      setError(err.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  return (
    <div className="border-2 border-dashed border-[#4A8F95]/30 rounded-xl p-6 bg-[#FAF9F6]">
      <h4 className="font-bold mb-3 text-[#1B5C63] text-lg">Upload Course Materials</h4>
      
      {success && (
        <div className="mb-4 bg-[#7FB3B8]/20 text-[#1F6F78] p-3 rounded-lg text-sm border border-[#7FB3B8]/40">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 text-red-800 p-3 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="flex-1">
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="block w-full text-sm text-[#5F6B7A] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#1B5C63] file:text-white hover:file:bg-[#1F6F78] disabled:opacity-50 file:shadow-md file:cursor-pointer"
          />
        </label>
      </div>
      
      {uploading && (
        <p className="text-sm text-[#5F6B7A] mt-3">Uploading file...</p>
      )}
      
      <p className="text-xs text-[#5F6B7A] mt-3">
        Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, images
      </p>
    </div>
  );
}
