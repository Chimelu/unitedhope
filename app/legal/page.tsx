/**
 * Legal/Policy page with privacy policy, terms of service, and cookie policy
 */
export default function LegalPage() {
  return (
    <div className="min-h-screen bg-red-900 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Legal & Policies
          </h1>
          <p className="text-xl text-white">
            Important information about our policies and terms
          </p>
        </div>

        {/* Privacy Policy */}
        <section className="bg-red-800/60 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8 border border-red-700/50">
          <h2 className="text-3xl font-bold text-white mb-6">Privacy Policy</h2>
          <div className="prose max-w-none space-y-4 text-white">
            <p className="text-sm text-gray-500 mb-4">Last updated: April 2024</p>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Information We Collect</h3>
              <p>
                UnitedHope collects information that you provide directly to us when you make a donation, 
                contact us, or interact with our services. This may include your name, email address, 
                phone number, mailing address, payment information, and any other information you choose to provide.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h3>
              <p>
                We use the information we collect to process donations, send you updates about our work, 
                respond to your inquiries, improve our services, and comply with legal obligations. We do not 
                sell or share your personal information with third parties for their marketing purposes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Data Security</h3>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Your Rights</h3>
              <p>
                You have the right to access, update, or delete your personal information at any time. You can also 
                opt-out of receiving communications from us by contacting us or using the unsubscribe link in our emails.
              </p>
            </div>
          </div>
        </section>

        {/* Terms of Service */}
        <section className="bg-red-800/60 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8 border border-red-700/50">
          <h2 className="text-3xl font-bold text-white mb-6">Terms of Service</h2>
          <div className="prose max-w-none space-y-4 text-white">
            <p className="text-sm text-gray-500 mb-4">Last updated: April 2024</p>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Acceptance of Terms</h3>
              <p>
                By accessing and using the UnitedHope website, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our website or services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Donations</h3>
              <p>
                All donations made through our website are final and non-refundable unless required by law. By making a 
                donation, you confirm that you have the legal right to use the payment method provided. We reserve the 
                right to refuse or cancel any donation at our discretion.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Use of Website</h3>
              <p>
                You agree to use our website only for lawful purposes and in a manner that does not infringe the rights 
                of others or restrict their use of the website. You may not use our website to transmit harmful code, spam, 
                or unauthorized content.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Intellectual Property</h3>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of UnitedHope 
                or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h3>
              <p>
                UnitedHope shall not be liable for any indirect, incidental, special, or consequential damages arising from 
                your use of our website or services, except as required by applicable law.
              </p>
            </div>
          </div>
        </section>

        {/* Cookie Policy */}
        <section className="bg-red-800/60 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8 border border-red-700/50">
          <h2 className="text-3xl font-bold text-white mb-6">Cookie Policy</h2>
          <div className="prose max-w-none space-y-4 text-white">
            <p className="text-sm text-gray-500 mb-4">Last updated: April 2024</p>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">What Are Cookies</h3>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us 
                provide you with a better experience by remembering your preferences and improving our services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">How We Use Cookies</h3>
              <p>
                We use cookies to enhance functionality, analyze website usage, and personalize your experience. Some 
                cookies are essential for the website to function properly, while others help us understand how visitors 
                interact with our site.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Managing Cookies</h3>
              <p>
                You can control and manage cookies through your browser settings. Please note that disabling cookies may 
                affect the functionality of our website. For more information about managing cookies, please consult your 
                browser's help documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Contact for Questions */}
        <section className="bg-red-800/60 backdrop-blur-sm border border-red-700/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-white mb-6">
            If you have any questions about our legal policies, please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-red-600 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
}

