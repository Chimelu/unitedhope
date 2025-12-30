import Link from 'next/link';
import Image from 'next/image';

/**
 * Reports/Transparency page showing detailed fund distribution reports
 * Similar to UNITED24's transparency structure
 */
interface ReportCategory {
  id: string;
  name: string;
  amount: number;
  description: string;
  imageUrl: string;
  latestReport: string;
  totalProjects: number;
  beneficiaries: number;
}

const categories: ReportCategory[] = [
  {
    id: 'emergency',
    name: 'Emergency Relief',
    amount: 856234567,
    description: 'Providing immediate assistance to families facing crisis situations, natural disasters, and urgent needs.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    latestReport: 'April 15, 2024',
    totalProjects: 127,
    beneficiaries: 45000,
  },
  {
    id: 'medical',
    name: 'Medical Aid',
    amount: 723456789,
    description: 'Supporting healthcare services, medical equipment, medications, and health programs for communities in need.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    latestReport: 'April 15, 2024',
    totalProjects: 89,
    beneficiaries: 32000,
  },
  {
    id: 'community',
    name: 'Community Development',
    amount: 612345678,
    description: 'Building stronger communities through infrastructure, resources, and long-term development initiatives.',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    latestReport: 'April 15, 2024',
    totalProjects: 156,
    beneficiaries: 78000,
  },
  {
    id: 'education',
    name: 'Education & Training',
    amount: 498765432,
    description: 'Funding educational programs, scholarships, training initiatives, and learning resources.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    latestReport: 'April 15, 2024',
    totalProjects: 94,
    beneficiaries: 56000,
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Rebuild',
    amount: 217521490,
    description: 'Rebuilding and improving essential infrastructure including housing, utilities, and public facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    latestReport: 'April 15, 2024',
    totalProjects: 67,
    beneficiaries: 28000,
  },
];

export default function ReportsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fund Distribution Reports
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Complete transparency and accountability. Weekly reports across all funding categories.
          </p>
          <p className="mt-4 text-gray-100">
            Last updated: April 15, 2024
          </p>
          <div className="mt-6">
            <Link
              href="/reports/impact"
              className="inline-block bg-red-600 hover:bg-red-700 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Impact Reports (PDF Downloads)
            </Link>
          </div>
        </div>
      </section>

      {/* Transparency Statement */}
      <section className="py-12 bg-white border-b-4 border-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700">
            <strong>Efficiency and Transparency:</strong> UnitedHope provides fund distribution reports 
            every week in five directions. People from all over the world have united in their will to help. 
            Our goal is to ensure the efficiency and transparency of fund distribution.
          </p>
        </div>
      </section>

      {/* Report Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {categories.map((category) => (
              <div
                key={category.id}
                id={category.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative h-64 md:h-full min-h-[200px]">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {category.name}
                      </h2>
                      <Link
                        href={`/donate?category=${category.id}`}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm whitespace-nowrap ml-4"
                      >
                        Donate
                      </Link>
                    </div>
                    <div className="text-3xl font-bold text-red-600 mb-4">
                      {formatCurrency(category.amount)}
                    </div>
                    <p className="text-gray-700 mb-6">
                      {category.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-500">Latest Report</div>
                        <div className="font-semibold text-gray-900">{category.latestReport}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Total Projects</div>
                        <div className="font-semibold text-gray-900">{formatNumber(category.totalProjects)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Beneficiaries</div>
                        <div className="font-semibold text-gray-900">{formatNumber(category.beneficiaries)}</div>
                      </div>
                    </div>
                    <Link
                      href={`#${category.id}-details`}
                      className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center"
                    >
                      View Full Report
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Financial Overview
          </h2>
          <div className="bg-red-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fund Allocation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Programs & Services</span>
                    <span className="font-bold text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Operational Expenses</span>
                    <span className="font-bold text-gray-900">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Administrative Costs</span>
                    <span className="font-bold text-gray-900">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Annual Report</h3>
                <p className="text-gray-700 mb-4">
                  Complete financial statements and audit reports are available for review. 
                  All reports are prepared by independent auditors and comply with international 
                  accounting standards.
                </p>
                <Link
                  href="/legal"
                  className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  View Full Financial Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make a Transparent, Trackable Donation
          </h2>
          <p className="text-xl mb-8 text-white">
            Every donation is tracked and reported. See exactly how your contribution makes a difference.
          </p>
          <Link
            href="/donate"
            className="inline-block bg-white text-red-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors shadow-lg"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}

