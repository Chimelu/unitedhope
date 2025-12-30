/**
 * About page - Redesigned layout with USA donation-themed images
 */
import Image from 'next/image';

export default function AboutPage() {
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

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Title Section with Image */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                About <span className="text-red-500">UnitedHope</span>
              </h1>
              <div className="w-24 h-1 bg-red-600 mb-6"></div>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Empowering communities across America through transparent, accountable giving. 
                Every donation strengthens our nation's foundation.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-red-700/50">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                alt="American community support"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Foundation - Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50 hover:border-red-500 transition-colors">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Foundation</h2>
            <p className="text-white/90 leading-relaxed">
              UnitedHope was founded with a vision to create a world where no one faces difficult times alone. 
              We provide essential support and resources to communities across America.
            </p>
          </div>

          <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50 hover:border-red-500 transition-colors">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/90 leading-relaxed">
              To provide comprehensive support and assistance to individuals and communities, fostering hope 
              and creating pathways to a better future through compassionate action.
            </p>
          </div>

          <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50 hover:border-red-500 transition-colors">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-white/90 leading-relaxed">
              A world where every person has access to support, where communities are strengthened 
              through mutual aid, and where hope and opportunity are available to all.
            </p>
          </div>
        </div>

        {/* Image Gallery - USA Donation Theme */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Our Impact Across America
            </h2>
            <div className="w-32 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          {/* Different Layout - Masonry Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Large Image */}
            <div className="md:col-span-2 lg:col-span-2 relative h-[500px] rounded-xl overflow-hidden shadow-xl border-2 border-red-700/50 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                alt="Community support and charity"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Community Support</h3>
                <p className="text-white/90">Helping families across all 50 states</p>
              </div>
            </div>
            
            {/* Medium Image */}
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl border-2 border-red-700/50 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
                alt="Education and training programs"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white">Education Programs</h3>
              </div>
            </div>
            
            {/* Small Image */}
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl border-2 border-red-700/50 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80"
                alt="Medical aid and healthcare"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white">Medical Aid</h3>
              </div>
            </div>
            
            {/* Volunteer Network Image */}
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl border-2 border-red-700/50 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                alt="Volunteer support"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white">Volunteer Network</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Large Quote Section */}
        <div className="mb-20 bg-red-800/40 backdrop-blur-sm rounded-2xl p-10 md:p-16 border border-red-700/50 shadow-xl relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-10">
            <Image
              src="https://flagcdn.com/w40/us.png"
              alt="USA Flag"
              width={60}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="text-3xl md:text-4xl font-light text-white leading-relaxed italic text-center relative z-10">
            "Creating a world where no one has to face difficult times alone."
          </p>
        </div>

        {/* What We Do & Approach - Side by Side with Image */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                What We Do
              </h2>
              <p className="text-white/90 leading-relaxed text-lg mb-4">
                Every day, we work tirelessly to bridge gaps, provide assistance, and build stronger, 
                more resilient communities across America. Our work is made possible by the generous 
                support of donors, volunteers, and partners who share our vision.
              </p>
              <p className="text-white/90 leading-relaxed text-lg">
                We operate across multiple program areas including emergency relief, medical aid, 
                community development, education and training, and infrastructure rebuilding.
              </p>
            </div>

            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Our Approach
              </h2>
              <p className="text-white/90 leading-relaxed text-lg">
                We believe in the power of community, compassion, and collective action to create 
                lasting positive change. Our approach is rooted in understanding, collaboration, 
                and respect for the dignity of every individual we serve.
              </p>
            </div>
          </div>

          <div className="relative h-full min-h-[600px] rounded-xl overflow-hidden shadow-xl border-2 border-red-700/50">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Community impact and support"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/40 to-transparent"></div>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-10 md:p-12 shadow-lg border border-red-700/50 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight text-center">
            Transparency & Accountability
          </h2>
          <p className="text-white/90 leading-relaxed text-lg text-center max-w-4xl mx-auto">
            We maintain the highest standards of transparency and accountability in all our operations. 
            Every donation is tracked, every dollar is accounted for, and every impact is reported with 
            complete visibility. We provide weekly fund distribution reports across all our program areas, 
            ensuring that our supporters can see exactly how their contributions are making a difference.
          </p>
        </div>

        {/* Values Section - Horizontal Cards */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Our Values
            </h2>
            <div className="w-32 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50 text-center hover:border-red-500 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Compassion</h3>
              <p className="text-white/90 leading-relaxed">
                We approach every situation with empathy and understanding, recognizing the dignity 
                and worth of every individual we serve.
              </p>
            </div>
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50 text-center hover:border-red-500 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Integrity</h3>
              <p className="text-white/90 leading-relaxed">
                We maintain the highest standards of transparency, accountability, and ethical conduct 
                in all our operations and relationships.
              </p>
            </div>
            <div className="bg-red-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-700/50 text-center hover:border-red-500 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Impact</h3>
              <p className="text-white/90 leading-relaxed">
                We focus on creating meaningful, measurable outcomes that make a real difference 
                in the lives of those we support.
              </p>
            </div>
          </div>
        </div>

        {/* Large Closing Statement */}
        <div className="bg-red-800/40 backdrop-blur-sm rounded-2xl p-10 md:p-16 border border-red-700/50 shadow-xl relative overflow-hidden">
          <div className="absolute bottom-4 left-4 opacity-10">
            <Image
              src="https://flagcdn.com/w40/us.png"
              alt="USA Flag"
              width={80}
              height={52}
              className="object-contain"
            />
          </div>
          <p className="text-2xl md:text-3xl font-light text-white leading-relaxed text-center relative z-10 mb-6">
            UnitedHope represents more than an organization—it represents a movement of people who 
            believe in the power of collective action to create positive change.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-white text-center relative z-10">
            Together, we can build a future where hope, opportunity, and support are accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
}
