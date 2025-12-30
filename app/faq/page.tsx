'use client';

import { useState } from 'react';

/**
 * FAQ page with accordion-style questions and answers
 */
interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How can I make a donation?',
    answer: 'You can make a donation by visiting our Donate page and filling out the donation form. We accept various payment methods including credit cards, debit cards, and bank transfers. All transactions are processed securely through encrypted channels.',
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes, UnitedHope is a registered charitable organization, and all donations are tax-deductible. You will receive a receipt via email for your records. Please consult with a tax professional for specific advice regarding your tax situation.',
  },
  {
    question: 'How is my donation used?',
    answer: 'We are committed to transparency and accountability. The majority of your donation goes directly to our programs and services. A small percentage covers administrative costs and operational expenses. We publish annual reports detailing our financial activities and impact. You can find these reports on our website.',
  },
  {
    question: 'Can I make a recurring donation?',
    answer: 'Yes, we offer recurring donation options. When you make a donation, you can choose to set up monthly, quarterly, or annual recurring payments. This helps us plan ahead and provide consistent support to those in need.',
  },
  {
    question: 'How do I update my donation information?',
    answer: 'You can update your donation information by contacting our support team at info@unitedhope.org or by calling us at +12136096521. We can help you change your payment method, update your contact information, or modify your recurring donation schedule.',
  },
  {
    question: 'What types of support does UnitedHope provide?',
    answer: 'UnitedHope provides a wide range of support including financial assistance, essential resources, community programs, and educational initiatives. Our focus areas include emergency relief, long-term community development, and providing access to essential services.',
  },
  {
    question: 'How can I volunteer with UnitedHope?',
    answer: 'We welcome volunteers who share our mission and values. You can learn more about volunteer opportunities by visiting our Contact page and selecting "Volunteering" as your subject. Our team will provide information about current volunteer needs and the application process.',
  },
  {
    question: 'How can I stay updated on your work?',
    answer: 'You can stay updated by visiting our Blog page for regular updates and stories about our impact. We also send out periodic newsletters to our donors. You can subscribe by contacting us or checking the newsletter signup option on our website.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely. We take your privacy and data security very seriously. All personal information is encrypted and stored securely. We never sell or share your information with third parties. For more details, please review our Privacy Policy on our Legal page.',
  },
  {
    question: 'Can I specify how my donation is used?',
    answer: 'Yes, you can indicate your preference for how your donation is used when making a contribution. While we allocate funds based on the most pressing needs, we do our best to honor donor preferences when possible. You can note your preference in the message field during donation.',
  },
  {
    question: 'What happens if I need to cancel a recurring donation?',
    answer: 'You can cancel your recurring donation at any time by contacting our support team. We can process the cancellation immediately, and you will not be charged for future installments. There are no penalties or fees for canceling a recurring donation.',
  },
  {
    question: 'Do you accept donations in other currencies?',
    answer: 'Currently, we primarily accept donations in USD. However, we are working on expanding our payment options to accept other major currencies. If you need to make a donation in a different currency, please contact us directly, and we will work with you to find a solution.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-red-900 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white">
            Find answers to common questions about UnitedHope and our work
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-red-800/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-red-700/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-red-700/50 transition-colors focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-red-500 flex-shrink-0 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-white leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-red-800/60 backdrop-blur-sm border border-red-700/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-white mb-6">
            If you couldn't find the answer you're looking for, please don't hesitate to reach out to us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-red-600 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

