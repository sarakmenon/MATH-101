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
    <div className="min-h-screen bg-[#F7F3ED]">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-[#1F6F78] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-white">
                Math-101
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
                className="bg-white text-[#1F6F78] px-6 py-2 rounded-lg hover:bg-[#F5EFE6] transition shadow-sm font-medium"
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
                  className="bg-white text-[#1F6F78] px-6 py-2 rounded-lg hover:bg-[#F5EFE6] transition text-center shadow-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#efe7db]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1F6F78] mb-5 tracking-tight leading-tight">
            Math-101
          </h1>
          <p className="text-lg sm:text-xl text-[#5F6B7A] mb-8 max-w-2xl mx-auto leading-relaxed">
            Excellence in Mathematics Education Through Personalized Tutoring
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-[#1F6F78]/10">
            <Link
              href="/register"
              className="bg-[#1F6F78] text-white px-8 py-3 rounded-lg hover:bg-[#1a5c63] transition font-medium shadow-sm"
            >
              Get Started
            </Link>
            <a
              href="#contact"
              className="bg-white text-[#1F6F78] px-8 py-3 rounded-lg border border-[#1F6F78]/30 hover:border-[#1F6F78] hover:bg-[#eee3d4] transition font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F6F78] mb-8 text-center">
            About Your Tutor
          </h2>
          <div className="bg-[#eee3d4] rounded-lg p-8 shadow-sm">
            <p className="text-[#1F2933] leading-relaxed mb-4">
              Welcome to Math-101! I am a dedicated mathematics educator with years of experience helping students achieve their academic goals. My approach combines rigorous mathematical foundations with personalized attention to each student's unique learning style.
            </p>
            <p className="text-[#1F2933] leading-relaxed mb-4">
              Whether you're struggling with basic concepts or preparing for advanced placement exams, I'm here to guide you through every step of your mathematical journey. My teaching philosophy emphasizes understanding over memorization, building confidence alongside competence.
            </p>
            <p className="text-[#1F2933] leading-relaxed">
              With a proven track record of student success and a passion for mathematics education, I look forward to helping you reach your full potential in mathematics.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section id="courses" className="py-14 px-4 sm:px-6 lg:px-8 bg-[#F7F3ED]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F6F78] mb-8 text-center">
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
                <h3 className="text-xl font-bold text-[#1F6F78] mb-2">
                  {course.title}
                </h3>
                <p className="text-[#5F6B7A] leading-relaxed">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutoring Policy Section */}
      <section id="policy" className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F6F78] mb-8 text-center">
            Tutoring Policy
          </h2>
          <div className="bg-[#eee3d4] rounded-lg p-4 sm:p-8 shadow-sm">
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
      <section id="contact" className="py-14 px-4 sm:px-6 lg:px-8 bg-[#F7F3ED]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F6F78] mb-8 text-center">
            Get In Touch
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2933] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#7FB3B8] text-sm">&copy; 2025 Math-101. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
