'use client';

import { useState } from 'react';
import { WaitlistEntry, WaitlistStatus } from '@/types';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface WaitlistManagerProps {
  entries: WaitlistEntry[];
  onRefresh: () => Promise<void>;
}

export default function WaitlistManager({ entries, onRefresh }: WaitlistManagerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const updateStatus = async (entryId: string, newStatus: WaitlistStatus) => {
    setProcessingId(entryId);
    try {
      const entryRef = doc(db, 'waitlist', entryId);
      await updateDoc(entryRef, { status: newStatus });
      await onRefresh();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const deleteEntry = async (entryId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the entry from ${name}?`)) {
      return;
    }
    
    setProcessingId(entryId);
    try {
      const entryRef = doc(db, 'waitlist', entryId);
      await deleteDoc(entryRef);
      await onRefresh();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusColor = (status: WaitlistStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'contacted':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'closed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (entries.length === 0) {
    return (
      <p className="text-[#5F6B7A]">No waitlist entries yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className="bg-[#FAF9F6] rounded-xl p-5 border border-[#1F6F78]/10 hover:border-[#1F6F78]/20 transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 bg-[#1F6F78] text-white rounded-full text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <h3 className="font-bold text-lg text-[#1B5C63]">{entry.name}</h3>
                <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(entry.status)}`}>
                  {entry.status}
                </span>
              </div>
              <p className="text-sm text-[#5F6B7A]">{entry.email}</p>
              <p className="text-sm font-semibold text-[#1F2933] mt-1">{entry.subject}</p>
              <p className="text-xs text-[#5F6B7A] mt-1">
                {formatDate(entry.createdAt)} • Source: {entry.source}
              </p>
            </div>
            <button
              onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              className="text-[#1F6F78] hover:text-[#164851] transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {expandedId === entry.id && (
            <div className="mt-4 pt-4 border-t border-[#1F6F78]/10">
              <div className="mb-4">
                <p className="text-sm font-semibold text-[#1F2933] mb-2">Message:</p>
                <p className="text-sm text-[#5F6B7A] whitespace-pre-wrap bg-white p-3 rounded-lg border border-[#1F6F78]/10">
                  {entry.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(entry.id, 'new')}
                    disabled={processingId === entry.id || entry.status === 'new'}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark New
                  </button>
                  <button
                    onClick={() => updateStatus(entry.id, 'contacted')}
                    disabled={processingId === entry.id || entry.status === 'contacted'}
                    className="px-3 py-1.5 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => updateStatus(entry.id, 'closed')}
                    disabled={processingId === entry.id || entry.status === 'closed'}
                    className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark Closed
                  </button>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id, entry.name)}
                  disabled={processingId === entry.id}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
