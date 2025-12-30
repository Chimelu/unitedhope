'use client';

import Link from 'next/link';

/**
 * Impact Reports page with downloadable PDFs for bank transfers and cryptocurrency donations
 */
interface ImpactReport {
  id: string;
  title: string;
  category: 'bank' | 'crypto' | 'general';
  date: string;
  period: string;
  totalAmount: number;
  description: string;
  downloadUrl: string;
}

const impactReports: ImpactReport[] = [
  {
    id: '1',
    title: 'Bank Transfer Impact Report - Q1 2024',
    category: 'bank',
    date: 'April 15, 2024',
    period: 'January - March 2024',
    totalAmount: 24567890,
    description: 'Detailed breakdown of all bank transfer donations received in Q1 2024, including allocation across programs and impact metrics.',
    downloadUrl: '#',
  },
  {
    id: '2',
    title: 'Cryptocurrency Impact Report - Q1 2024',
    category: 'crypto',
    date: 'April 15, 2024',
    period: 'January - March 2024',
    totalAmount: 12345678,
    description: 'Comprehensive report on cryptocurrency donations received in Q1 2024, including BTC, ETH, USDT, and USDC contributions and their utilization.',
    downloadUrl: '#',
  },
  {
    id: '3',
    title: 'Bank Transfer Impact Report - December 2023',
    category: 'bank',
    date: 'January 15, 2024',
    period: 'December 2023',
    totalAmount: 8901234,
    description: 'Monthly impact report for bank transfer donations received in December 2023.',
    downloadUrl: '#',
  },
  {
    id: '4',
    title: 'Cryptocurrency Impact Report - December 2023',
    category: 'crypto',
    date: 'January 15, 2024',
    period: 'December 2023',
    totalAmount: 5678901,
    description: 'Monthly impact report for cryptocurrency donations received in December 2023.',
    downloadUrl: '#',
  },
  {
    id: '5',
    title: 'Annual Impact Report 2023',
    category: 'general',
    date: 'February 1, 2024',
    period: 'January - December 2023',
    totalAmount: 187654321,
    description: 'Complete annual impact report covering all donation methods and their combined impact throughout 2023.',
    downloadUrl: '#',
  },
  {
    id: '6',
    title: 'Bank Transfer Impact Report - November 2023',
    category: 'bank',
    date: 'December 15, 2023',
    period: 'November 2023',
    totalAmount: 7654321,
    description: 'Monthly impact report for bank transfer donations received in November 2023.',
    downloadUrl: '#',
  },
  {
    id: '7',
    title: 'Cryptocurrency Impact Report - November 2023',
    category: 'crypto',
    date: 'December 15, 2023',
    period: 'November 2023',
    totalAmount: 4321098,
    description: 'Monthly impact report for cryptocurrency donations received in November 2023.',
    downloadUrl: '#',
  },
];

export default function ImpactReportsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownload = (report: ImpactReport) => {
    // In a real application, this would download an actual PDF
    // For now, we'll create a simple text representation
    const content = `
HOPEFORUA IMPACT REPORT

${report.title}
Period: ${report.period}
Published: ${report.date}

EXECUTIVE SUMMARY
Total Amount: ${formatCurrency(report.totalAmount)}

${report.description}

DONATION BREAKDOWN
- Program Allocation: ${formatCurrency(report.totalAmount * 0.85)}
- Operational Costs: ${formatCurrency(report.totalAmount * 0.10)}
- Administrative: ${formatCurrency(report.totalAmount * 0.05)}

IMPACT METRICS
- People Helped: ${Math.floor(report.totalAmount / 250)}
- Projects Funded: ${Math.floor(report.totalAmount / 50000)}
- Communities Reached: ${Math.floor(report.totalAmount / 500000)}

For detailed financial statements, please contact: info@unitedhope.org

© ${new Date().getFullYear()} UnitedHope Foundation. All rights reserved.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Impact Reports
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Detailed transparency reports for bank transfers, cryptocurrency, and all donation methods. 
            Download comprehensive PDF reports showing exactly how your contributions make an impact.
          </p>
        </div>
      </section>

      {/* Report Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
              All Reports
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Bank Transfers
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Cryptocurrency
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Annual Reports
            </button>
          </div>
        </div>
      </section>

      {/* Reports List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {impactReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          report.category === 'bank'
                            ? 'bg-red-100 text-red-800'
                            : report.category === 'crypto'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {report.category === 'bank'
                          ? 'Bank Transfer'
                          : report.category === 'crypto'
                          ? 'Cryptocurrency'
                          : 'General'}
                      </span>
                      <span className="text-sm text-gray-500">{report.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {report.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Period: </span>
                        <span className="font-semibold text-gray-900">{report.period}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Amount: </span>
                        <span className="font-bold text-red-600 text-lg">
                          {formatCurrency(report.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleDownload(report)}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      Download PDF
                    </button>
                    <Link
                      href={`/reports/impact/${report.id}`}
                      className="text-red-600 hover:text-red-700 font-semibold text-center"
                    >
                      View Online →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About Our Impact Reports
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our impact reports provide complete transparency into how donations are received and utilized. 
                Each report includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Detailed breakdown of donations by payment method</li>
                <li>Fund allocation across programs and categories</li>
                <li>Impact metrics including people helped and projects funded</li>
                <li>Financial statements and audit information</li>
                <li>Case studies and success stories</li>
              </ul>
              <p>
                Reports are published monthly for bank transfers and cryptocurrency donations, 
                with quarterly and annual summaries available. All reports are independently audited 
                and comply with international accounting standards.
              </p>
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm">
                  <strong>Need a custom report?</strong> Contact us at{' '}
                  <a href="mailto:info@unitedhope.org" className="text-red-600 hover:underline">
                    info@unitedhope.org
                  </a>{' '}
                  for specific donation details or historical data.
                </p>
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
            className="inline-block bg-red-600 hover:bg-red-700 text-gray-900 px-8 py-4 font-bold text-lg uppercase tracking-wide transition-colors shadow-lg"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}

