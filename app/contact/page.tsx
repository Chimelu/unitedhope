'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

/**
 * Contact page - Modern, clean design with blue background
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send contact form emails
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-red-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.03) 10px,
            rgba(255,255,255,0.03) 20px
          )`
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light">
            Have a question or want to learn more about our work? We'd love to hear from you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-red-700/50 hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                  <a href="mailto:admin@unitedhopefoundation.com" className="text-red-500 hover:text-yellow-300 font-medium block mb-1">
                    admin@unitedhopefoundation.com
                  </a>
                  <a href="mailto:admin@unitedhopefoundation.com" className="text-red-500 hover:text-yellow-300 font-medium block">
                    admin@unitedhopefoundation.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-red-700/50 hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
                  <a href="tel:+12136096521" className="text-red-500 hover:text-yellow-300 font-medium block">
                    +12136096521
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-red-700/50 hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Address</h3>
                  <p className="text-white leading-relaxed">
                    123 Hope Street<br />
                    Community City, CC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-red-800/60 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-red-700/50">
            <h2 className="text-3xl font-bold text-white mb-8">
              Send Us a Message
            </h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-500/20 border-2 border-green-400 rounded-lg text-green-300 font-medium">
                Thank you for your message! We'll get back to you as soon as possible.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors text-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors text-gray-900"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="donation">Donation Question</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="partnership">Partnership</option>
                  <option value="media">Media Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none transition-colors resize-none text-gray-900"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-gray-900 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-12 relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border-2 border-red-700">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
            alt="Contact us"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <p className="text-lg md:text-xl font-light max-w-2xl">
              We're here to help. Reach out to us with any questions, concerns, or ideas. 
              Your voice matters, and we're committed to listening and responding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
