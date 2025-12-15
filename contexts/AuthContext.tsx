'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';
import emailjs from '@emailjs/browser';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as User);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserData(firebaseUser.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore with 'pending' role by default
    const newUser: User = {
      uid: userCredential.user.uid,
      name,
      email,
      role: 'pending',
      status: 'pending',
      assignedCourses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
    setUserData(newUser);

    // Send registration notification email to admin
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_REGISTRATION!,
        {
          user_name: name,
          user_email: email,
          user_id: userCredential.user.uid,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
    } catch (error) {
      console.error('Failed to send registration notification email:', error);
    }
  };

  // Sign out
  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserData(null);
  };

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
