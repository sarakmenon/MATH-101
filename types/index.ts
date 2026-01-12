// User roles
export type UserRole = 'admin' | 'student' | 'pending';

// User status
export type UserStatus = 'active' | 'inactive' | 'pending';

// User document structure in Firestore
export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  assignedCourses: string[]; // Array of course IDs
  createdAt?: Date;
  updatedAt?: Date;
}

// Course file structure
export interface CourseFile {
  id: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
}

// Course document structure in Firestore
export interface Course {
  id: string;
  name: string;
  description: string;
  files?: CourseFile[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Waitlist entry status
export type WaitlistStatus = 'new' | 'contacted' | 'closed';

// Waitlist entry document structure in Firestore
export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: WaitlistStatus;
  source: string;
  createdAt: Date;
}
