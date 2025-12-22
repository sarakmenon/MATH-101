'use client';

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.text || 'Failed to send message. Please try again.');
    }
  };

  return (
    <>
      {status === 'success' && (
        <div className="mb-6 bg-[#7FB3B8]/20 text-[#1F6F78] p-4 rounded-xl border border-[#7FB3B8]/40">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-xl border border-red-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1B5C63] mb-1.5">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={status === 'sending'}
            className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#1F6F78]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 focus:border-[#1F6F78] focus:bg-white disabled:opacity-50 transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#1B5C63] mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={status === 'sending'}
            className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#1F6F78]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 focus:border-[#1F6F78] focus:bg-white disabled:opacity-50 transition-all"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[#1B5C63] mb-1.5">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            disabled={status === 'sending'}
            className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#1F6F78]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 focus:border-[#1F6F78] focus:bg-white disabled:opacity-50 transition-all"
            placeholder="What would you like to discuss?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[#1B5C63] mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            disabled={status === 'sending'}
            className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#1F6F78]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 focus:border-[#1F6F78] focus:bg-white disabled:opacity-50 transition-all resize-none"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-[#1B5C63] text-white px-6 py-3 rounded-lg hover:bg-[#164851] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}
