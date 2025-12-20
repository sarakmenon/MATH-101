'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-gradient-to-b from-[#1B5C63] to-[#1F6F78] shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/math-101-logo.png" 
                  alt="Math-101 Logo" 
                  width={120} 
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white/90 hover:text-white transition">
                Home
              </a>
              <a href="#courses" className="text-white/90 hover:text-white transition">
                Courses
              </a>
              <a href="#policy" className="text-white/90 hover:text-white transition">
                Policy
              </a>
              <a href="#contact" className="text-white/90 hover:text-white transition">
                Contact
              </a>
              <Link href="/login" className="text-white/90 hover:text-white transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#F5F1EA] text-[#1F6F78] px-6 py-2 rounded-xl hover:bg-[#9FC7C9] hover:text-white transition shadow-sm font-semibold"
              >
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-white/80"
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
                <a href="#home" className="text-white/90 hover:text-white transition">
                  Home
                </a>
                <a href="#courses" className="text-white/90 hover:text-white transition">
                  Courses
                </a>
                <a href="#policy" className="text-white/90 hover:text-white transition">
                  Policy
                </a>
                <a href="#contact" className="text-white/90 hover:text-white transition">
                  Contact
                </a>
                <Link href="/login" className="text-white/90 hover:text-white transition">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#F5F1EA] text-[#1F6F78] px-6 py-2 rounded-xl hover:bg-[#9FC7C9] hover:text-white transition text-center shadow-sm font-semibold"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#4A8F95]/20 via-[#9FC7C9]/10 to-[#F5F1EA]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B5C63] mb-6 tracking-tight leading-none">
            Math-101
          </h1>
          <p className="text-xl sm:text-2xl text-[#5F6B7A] mb-10 max-w-3xl mx-auto leading-relaxed">
            Excellence in Mathematics Education Through Personalized Tutoring
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <Link
              href="/register"
              className="bg-[#1B5C63] text-white px-10 py-4 rounded-xl hover:bg-[#1F6F78] transition font-semibold shadow-md text-lg"
            >
              Get Started
            </Link>
            <a
              href="#contact"
              className="bg-transparent text-[#1F6F78] px-10 py-4 rounded-xl border-2 border-[#1F6F78] hover:bg-[#1F6F78] hover:text-white transition font-semibold text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#F5F1EA] border-y border-[#1F6F78]/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#9FC7C9] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#1F2933]">Expert Guidance</h3>
                <p className="text-sm text-[#5F6B7A]">Years of teaching experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#9FC7C9] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#1F2933]">Personalized Learning</h3>
                <p className="text-sm text-[#5F6B7A]">Tailored to your needs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#9FC7C9] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#1F2933]">Proven Results</h3>
                <p className="text-sm text-[#5F6B7A]">Track record of success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1B5C63] mb-12 text-center">
            About Your Tutor
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-2xl shadow-lg h-80 flex items-center justify-center">
              <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="bg-[#FAF9F6] rounded-2xl shadow-md p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#4A8F95] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[#1F2933] leading-relaxed">
                    Dedicated mathematics educator with years of experience helping students achieve their academic goals
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#4A8F95] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[#1F2933] leading-relaxed">
                    Personalized approach combining rigorous foundations with attention to each student's unique learning style
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#4A8F95] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[#1F2933] leading-relaxed">
                    Philosophy emphasizing understanding over memorization, building both confidence and competence
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#4A8F95] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[#1F2933] leading-relaxed">
                    Proven track record of student success from basic concepts to advanced placement exams
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F1EA] to-[#ebe5da]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1B5C63] mb-4 text-center">
            Courses Offered
          </h2>
          <p className="text-center text-[#5F6B7A] mb-12 max-w-2xl mx-auto">
            Comprehensive mathematics instruction tailored to your academic goals
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: 'Algebra',
                description: 'Master fundamental algebraic concepts, equations, and problem-solving techniques.',
                icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
              },
              {
                title: 'Geometry',
                description: 'Explore shapes, proofs, and spatial reasoning with comprehensive guidance.',
                icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
              },
              {
                title: 'Pre-Calculus',
                description: 'Build a strong foundation for calculus with functions, trigonometry, and more.',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              },
              {
                title: 'Calculus AB/BC',
                description: 'Advanced placement calculus preparation with limits, derivatives, and integrals.',
                icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
              },
              {
                title: 'SAT/ACT Prep',
                description: 'Targeted test preparation to maximize your standardized test scores.',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-[#FAF9F6] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={course.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1B5C63] mb-3">
                  {course.title}
                </h3>
                <p className="text-[#5F6B7A] leading-relaxed">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/register"
              className="inline-block bg-[#1B5C63] text-white px-8 py-3 rounded-xl hover:bg-[#1F6F78] transition font-semibold shadow-md"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Tutoring Policy Section */}
      <section id="policy" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1B5C63] mb-12 text-center">
            Tutoring Policy
          </h2>
          <div className="bg-[#FAF9F6] rounded-2xl p-4 sm:p-8 shadow-md">
            <iframe
              src="/tutoring-policy.pdf"
              className="w-full h-[600px] sm:h-[700px] rounded-lg bg-white"
              title="Tutoring Policy Document"
            />
            <p className="text-sm text-[#5F6B7A] text-center mt-4">
              <a 
                href="/tutoring-policy.pdf" 
                download 
                className="text-[#1F6F78] hover:text-[#4A6F8A] hover:underline font-medium"
              >
                Download PDF
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#ebe5da] to-[#F5F1EA]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1B5C63] mb-4 text-center">
            Get In Touch
          </h2>
          <p className="text-center text-[#5F6B7A] mb-10">
            Have questions? Ready to start your math journey? Contact us today.
          </p>
          <div className="bg-[#FAF9F6] rounded-2xl p-8 shadow-md">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1B5C63] to-[#1F6F78] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold">Math-101</div>
            <div className="flex gap-6 text-sm">
              <a href="#home" className="text-white/80 hover:text-white transition">Home</a>
              <a href="#about" className="text-white/80 hover:text-white transition">About</a>
              <a href="#courses" className="text-white/80 hover:text-white transition">Courses</a>
              <a href="#contact" className="text-white/80 hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-[#9FC7C9] text-sm">&copy; 2025 Math-101. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
