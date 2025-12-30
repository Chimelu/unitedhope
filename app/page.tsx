import Link from 'next/link';
import Image from 'next/image';

/**
 * Homepage with hero section - USA themed with red, white, blue colors
 * Enhanced design with better visual appeal
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-red-900 relative overflow-hidden">
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

      {/* Decorative Elements - USA Colors */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>

      <div className="relative">
      {/* Hero Section - Enhanced USA Style */}
      <section className="relative text-white min-h-[600px] lg:min-h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
        <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80"
            alt="Community support and donation"
            fill
            className="object-cover"
          priority
        />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-900/80 to-red-900/70"></div>
        </div>

        {/* Content - 2 Column Layout */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px] lg:min-h-[700px]">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-xl">
                <p className="text-white/90 mb-4 text-sm uppercase tracking-wider font-semibold">
                  Official Fundraising Platform
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-red-500">United</span><span className="text-white">Hope</span>
          </h1>
                <p className="text-xl md:text-2xl mb-8 text-white leading-relaxed">
                  Supporting communities across America with transparency and efficiency. 
                  Together, we build a stronger nation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/donate"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold text-lg uppercase tracking-wide transition-colors shadow-lg text-center transform hover:scale-105"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="/about"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-red-900 transition-colors text-center transform hover:scale-105"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Empty space, image is now background */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Brief Write-up */}
      <section className="pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Tiny USA Flag Icons */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
            <Image
              src="https://flagcdn.com/w40/us.png"
              alt="USA Flag"
              width={20}
              height={13}
              className="object-contain opacity-60"
            />
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
            <Image
              src="https://flagcdn.com/w40/us.png"
              alt="USA Flag"
              width={20}
              height={13}
              className="object-contain opacity-60"
            />
          </div>
          <p className="text-lg text-white leading-relaxed">
            UnitedHope provides comprehensive fund distribution reports every week across all funding categories. 
            We believe that trust is built through transparency. Every donation is tracked, 
            every dollar is accounted for, and every impact is reported with complete visibility.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="USA Flag"
                width={32}
                height={20}
                className="object-contain"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                How It Works
              </h2>
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="USA Flag"
                width={32}
                height={20}
                className="object-contain"
              />
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Making a difference is simple. Follow these easy steps to contribute to communities in need.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-6 border-2 border-red-700/50 hover:border-red-600 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-xl hover:scale-105">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-lg">
                  1
                </div>
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Choose Your Cause</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Browse our active projects and select the cause that resonates with you. Every project has clear goals and impact metrics.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-6 border-2 border-red-700/50 hover:border-red-600 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-xl hover:scale-105">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-lg">
                  2
                </div>
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Select Amount</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Choose from preset amounts or enter a custom donation. Every contribution, big or small, makes a meaningful impact.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-6 border-2 border-red-700/50 hover:border-red-600 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-xl hover:scale-105">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-lg">
                  3
                </div>
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Choose Payment</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Pay securely via bank transfer, cryptocurrency, CashApp, or PayPal. All payment methods are safe and encrypted.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-6 border-2 border-red-700/50 hover:border-red-600 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-xl hover:scale-105">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-lg">
                  4
                </div>
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Track Impact</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Receive confirmation and track your donation's impact through our weekly reports. See exactly how your contribution helps.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold text-lg uppercase tracking-wide transition-colors shadow-lg transform hover:scale-105 rounded-lg"
            >
              Start Donating Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Reports Section - Enhanced USA Style */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Title and Navigation Arrows */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              {/* Tiny USA Flag Icon */}
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="USA Flag"
                width={24}
                height={16}
                className="object-contain"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                IMPACT REPORT
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                className="w-10 h-10 rounded-full border-2 border-red-700 hover:border-red-600 hover:bg-red-600/20 flex items-center justify-center transition-colors"
                aria-label="Previous reports"
              >
                <svg className="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="w-10 h-10 rounded-full border-2 border-red-700 hover:border-red-600 hover:bg-red-600/20 flex items-center justify-center transition-colors"
                aria-label="Next reports"
              >
                <svg className="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Impact Report Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Report 1 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                  alt="Emergency Relief Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Emergency Relief
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    EMERGENCY RELIEF IMPACT REPORT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Report 2 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                  alt="Medical Aid Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Medical Aid
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    MEDICAL AID IMPACT REPORT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Report 3 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                  alt="Community Development Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-red-900 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Community
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    COMMUNITY DEVELOPMENT IMPACT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Report 4 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer h-[400px]">
              <div className="relative h-full">
            <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                  alt="Education Impact Report"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Education
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    EDUCATION & TRAINING IMPACT
                  </h3>
                  <p className="text-white/80 text-sm mb-4">Q1 2024 Financial Report</p>
                </div>
                <Link
                  href="/reports/impact"
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all group-hover:scale-110 shadow-lg"
                  aria-label="Download PDF"
                >
                  <svg className="w-6 h-6 text-gray-800 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Show All Reports Button */}
          <div className="text-center relative">
            <Link
              href="/reports/impact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors transform hover:scale-105"
            >
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="USA Flag"
              width={16}
                height={10}
                className="object-contain"
              />
              View All Impact Reports
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {/* Tiny USA Flag Icon */}
                <Image
                  src="https://flagcdn.com/w40/us.png"
                  alt="USA Flag"
                  width={32}
                  height={20}
                  className="object-contain"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Efficiency and Transparency
                </h2>
              </div>
              <p className="text-lg text-white mb-4 leading-relaxed">
                People from all across America have united in their will to help those in need. 
                UnitedHope's goal is to increase donations and ensure the efficiency and transparency 
                of their distribution.
              </p>
              <p className="text-lg text-white mb-6 leading-relaxed">
                We believe that trust is built through transparency. Every donation is tracked, 
                every dollar is accounted for, and every impact is reported. Our weekly reports 
                provide complete visibility into how funds are distributed across our programs.
              </p>
              <Link
                href="/about"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
              >
                More About UnitedHope
              </Link>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl border-2 border-red-700">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                alt="Community impact"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
