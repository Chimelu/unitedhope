import Link from 'next/link';
import Image from 'next/image';

/**
 * Projects page showcasing active projects and initiatives
 */
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  status: 'active' | 'completed';
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Emergency Housing Support',
    category: 'Emergency Relief',
    description: 'Providing immediate housing assistance to families displaced by crisis situations. This project helps secure temporary and permanent housing solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    targetAmount: 500000,
    currentAmount: 342000,
    status: 'active',
  },
  {
    id: '2',
    title: 'Medical Equipment for Rural Clinics',
    category: 'Medical Aid',
    description: 'Supplying essential medical equipment to rural healthcare facilities to improve access to quality medical care in underserved communities.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    targetAmount: 750000,
    currentAmount: 589000,
    status: 'active',
  },
  {
    id: '3',
    title: 'Community Center Construction',
    category: 'Community Development',
    description: 'Building a new community center to serve as a hub for social services, educational programs, and community gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    targetAmount: 1200000,
    currentAmount: 950000,
    status: 'active',
  },
  {
    id: '4',
    title: 'Scholarship Program for Students',
    category: 'Education & Training',
    description: 'Funding scholarships for students from underserved backgrounds to pursue higher education and vocational training.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    targetAmount: 300000,
    currentAmount: 300000,
    status: 'completed',
  },
  {
    id: '5',
    title: 'Infrastructure Repair Initiative',
    category: 'Infrastructure Rebuild',
    description: 'Repairing and upgrading essential infrastructure including roads, bridges, and public utilities to improve community access and safety.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    targetAmount: 2000000,
    currentAmount: 1250000,
    status: 'active',
  },
  {
    id: '6',
    title: 'Clean Water Access Program',
    category: 'Community Development',
    description: 'Installing clean water systems in communities without access to safe drinking water, improving health and quality of life.',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    targetAmount: 600000,
    currentAmount: 423000,
    status: 'active',
  },
];

export default function ProjectsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Active initiatives making a real difference in communities worldwide
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const progress = calculateProgress(project.currentAmount, project.targetAmount);
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'active'
                            ? 'bg-red-600 text-white'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        {project.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-red-600 font-medium mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Raised: {formatCurrency(project.currentAmount)}</span>
                        <span>Goal: {formatCurrency(project.targetAmount)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            project.status === 'completed'
                              ? 'bg-green-600'
                              : 'bg-red-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {progress.toFixed(0)}% funded
                      </div>
                    </div>
                    <Link
                      href={`/donate?project=${project.id}`}
                      className="block w-full bg-red-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Support This Project
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Start Your Own Project?
          </h2>
          <p className="text-xl mb-8 text-white">
            Partner with us to create positive change in your community
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-red-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

