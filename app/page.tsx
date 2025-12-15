'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

/**
 * Public Homepage
 * 
 * This is the landing page for the Math-101 tutoring platform.
 * Accessible to all users (authenticated or not).
 */
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-slate-800">
                Math-101
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-slate-600 hover:text-slate-900 transition">
                Home
              </a>
              <a href="#courses" className="text-slate-600 hover:text-slate-900 transition">
                Courses
              </a>
              <a href="#policy" className="text-slate-600 hover:text-slate-900 transition">
                Policy
              </a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 transition">
                Contact
              </a>
              <Link href="/login" className="text-slate-600 hover:text-slate-900 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-3">
                <a href="#home" className="text-slate-600 hover:text-slate-900 transition">
                  Home
                </a>
                <a href="#courses" className="text-slate-600 hover:text-slate-900 transition">
                  Courses
                </a>
                <a href="#policy" className="text-slate-600 hover:text-slate-900 transition">
                  Policy
                </a>
                <a href="#contact" className="text-slate-600 hover:text-slate-900 transition">
                  Contact
                </a>
                <Link href="/login" className="text-slate-600 hover:text-slate-900 transition">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition text-center"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
            Math-101
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Excellence in Mathematics Education Through Personalized Tutoring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-slate-800 text-white px-8 py-3 rounded-lg hover:bg-slate-700 transition text-lg"
            >
              Get Started
            </Link>
            <a
              href="#contact"
              className="bg-white text-slate-800 px-8 py-3 rounded-lg border-2 border-slate-800 hover:bg-slate-50 transition text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
            About Your Tutor
          </h2>
          <div className="bg-slate-50 rounded-lg p-8">
            <p className="text-slate-700 leading-relaxed mb-4">
              Welcome to Math-101! I am a dedicated mathematics educator with years of experience helping students achieve their academic goals. My approach combines rigorous mathematical foundations with personalized attention to each student's unique learning style.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Whether you're struggling with basic concepts or preparing for advanced placement exams, I'm here to guide you through every step of your mathematical journey. My teaching philosophy emphasizes understanding over memorization, building confidence alongside competence.
            </p>
            <p className="text-slate-700 leading-relaxed">
              With a proven track record of student success and a passion for mathematics education, I look forward to helping you reach your full potential in mathematics.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Courses Offered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Algebra',
                description: 'Master fundamental algebraic concepts, equations, and problem-solving techniques.',
              },
              {
                title: 'Geometry',
                description: 'Explore shapes, proofs, and spatial reasoning with comprehensive guidance.',
              },
              {
                title: 'Pre-Calculus',
                description: 'Build a strong foundation for calculus with functions, trigonometry, and more.',
              },
              {
                title: 'Calculus AB/BC',
                description: 'Advanced placement calculus preparation with limits, derivatives, and integrals.',
              },
              {
                title: 'SAT/ACT Prep',
                description: 'Targeted test preparation to maximize your standardized test scores.',
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {course.title}
                </h3>
                <p className="text-slate-600">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutoring Policy Section */}
      <section id="policy" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
            Tutoring Policy
          </h2>
          <div className="bg-slate-50 rounded-lg p-4 sm:p-8">
            <iframe
              src="/tutoring-policy.pdf"
              className="w-full h-[600px] sm:h-[700px] rounded-lg border border-slate-300"
              title="Tutoring Policy Document"
            />
            <p className="text-sm text-slate-600 text-center mt-4">
              <a 
                href="/tutoring-policy.pdf" 
                download 
                className="text-slate-800 hover:underline font-medium"
              >
                Download PDF
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
            Get In Touch
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">&copy; 2025 Math-101. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
