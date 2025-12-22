'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

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
      <nav className="fixed w-full bg-[#164851] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/math-101-logo.png" 
                  alt="Math-101 Logo" 
                  width={140} 
                  height={70}
                  className="h-14 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#courses" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
                Courses
              </a>
              <a href="#policy" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
                Policy
              </a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
                Contact
              </a>
              <Link href="/login" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#F5F1EA] text-[#1F6F78] px-6 py-2.5 rounded-lg hover:bg-white transition-all duration-200 font-semibold"
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
                  className="bg-[#F5F1EA] text-[#1F6F78] px-6 py-2 rounded-xl hover:bg-[#9FC7C9] hover:text-white transition text-center shadow-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#4A8F95]/15 via-[#9FC7C9]/8 to-[#F5F1EA]">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B5C63] mb-4 tracking-tight leading-[1.1]">
              Math-101
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg sm:text-xl text-[#5F6B7A] mb-6 max-w-2xl mx-auto leading-relaxed">
              Excellence in Mathematics Education Through Personalized Tutoring
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link
                href="/register"
                className="bg-[#1B5C63] text-white px-10 py-3.5 rounded-lg hover:bg-[#164851] transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-base"
              >
                Get Started
              </Link>
              <a
                href="#contact"
                className="bg-white text-[#1F6F78] px-10 py-3.5 rounded-lg border-2 border-[#1F6F78]/20 hover:border-[#1F6F78] hover:bg-[#F5F1EA] transition-all duration-200 font-semibold text-base"
              >
                Contact Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#E8E4DC]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9FC7C9] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2933]">Expert Guidance</h3>
                  <p className="text-sm text-[#5F6B7A] leading-relaxed">Years of teaching experience</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9FC7C9] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2933]">Personalized Learning</h3>
                  <p className="text-sm text-[#5F6B7A] leading-relaxed">Tailored to your needs</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#9FC7C9] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2933]">Proven Results</h3>
                  <p className="text-sm text-[#5F6B7A] leading-relaxed">Track record of success</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Parents Choose Math-101 Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B5C63] mb-6 text-center leading-tight">
              Why Parents Choose Math-101
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1B5C63] mb-1.5">Lessons Designed Around Your Child</h3>
                    <p className="text-[#5F6B7A] text-sm leading-relaxed">Tailored to each student&apos;s unique learning style and pace</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1B5C63] mb-1.5">Concept-Driven Teaching</h3>
                    <p className="text-[#5F6B7A] text-sm leading-relaxed">Clear explanations focused on understanding, not rote memorization</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1B5C63] mb-1.5">Over 30 Years of Experience</h3>
                    <p className="text-[#5F6B7A] text-sm leading-relaxed">Decades of proven success working with students</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1B5C63] mb-1.5">Long-Term Understanding</h3>
                    <p className="text-[#5F6B7A] text-sm leading-relaxed">Focus on building foundations and exam readiness</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F1EA] to-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1B5C63] mb-8 text-center">
              About Me
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <ScrollReveal delay={0.1} className="md:col-span-2">
              <div className="rounded-2xl overflow-hidden border-4 border-[#1F6F78] shadow-sm">
                <div className="relative h-96">
                  <Image 
                    src="/P1070516.JPG" 
                    alt="Your Tutor" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </ScrollReveal>
            
            <div className="md:col-span-3 space-y-4">
              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#9FC7C9]/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B5C63] mb-1">Extensive Experience</h4>
                      <p className="text-[#5F6B7A] text-sm leading-relaxed">Over 30 years teaching mathematics, with academic background in Civil Engineering and a Post Graduate Diploma in Computer Applications</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#9FC7C9]/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B5C63] mb-1">Clear Teaching Philosophy</h4>
                      <p className="text-[#5F6B7A] text-sm leading-relaxed">Breaking down complex concepts into simple, step-by-step explanations that make math accessible and manageable</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#9FC7C9]/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B5C63] mb-1">Personalized Approach</h4>
                      <p className="text-[#5F6B7A] text-sm leading-relaxed">Every lesson tailored to individual strengths, challenges, and goals—never generic instruction</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#9FC7C9]/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B5C63] mb-1">Holistic Student Development</h4>
                      <p className="text-[#5F6B7A] text-sm leading-relaxed">Focused on improving grades, test scores, confidence, and building independent problem-solving skills</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section id="courses" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF9F6] to-[#F5F1EA]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1B5C63] mb-3 text-center">
              Courses Offered
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#5F6B7A] mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive mathematics instruction tailored to your academic goals
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
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
              <ScrollReveal key={index} delay={0.1 + index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                <div className="w-12 h-12 bg-gradient-to-br from-[#4A8F95] to-[#1F6F78] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={course.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1B5C63] mb-2">
                  {course.title}
                </h3>
                <p className="text-[#5F6B7A] leading-loose text-sm">
                  {course.description}
                </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tutoring Policy Section */}
      <section id="policy" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F1EA] to-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1B5C63] mb-8 text-center">
              Tutoring Policy
            </h2>
          </ScrollReveal>
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm">
            <iframe
              src="/tutoring-policy.pdf"
              className="w-full h-[600px] sm:h-[700px] rounded-xl bg-white"
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
      <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF9F6] to-[#F5F1EA]">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1B5C63] mb-3 text-center">
              Get In Touch
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-center text-[#5F6B7A] mb-8 leading-relaxed">
              Have questions? Ready to start your math journey? Contact us today.
            </p>
          </ScrollReveal>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1B5C63] to-[#1F6F78] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-semibold">Math-101</div>
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
