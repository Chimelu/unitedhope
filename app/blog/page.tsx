import Image from 'next/image';
import Link from 'next/link';

/**
 * Blog/Updates page showcasing recent posts and updates
 */
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Community Impact Report: Q1 2024',
    excerpt: 'We are excited to share our first quarter impact report, highlighting the incredible work made possible by your generous support. This quarter, we were able to assist over 2,000 individuals across 15 communities.',
    date: 'April 15, 2024',
    author: 'Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    category: 'Impact',
  },
  {
    id: '2',
    title: 'New Partnership Program Launched',
    excerpt: 'We are thrilled to announce a new partnership program that will allow us to expand our reach and impact. This initiative brings together community organizations, businesses, and individuals committed to making a difference.',
    date: 'April 5, 2024',
    author: 'Michael Chen',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    category: 'News',
  },
  {
    id: '3',
    title: 'Volunteer Spotlight: Stories of Hope',
    excerpt: 'In this special feature, we celebrate the volunteers who dedicate their time and energy to our mission. Their stories of compassion and commitment inspire us all to do more for our communities.',
    date: 'March 28, 2024',
    author: 'Emily Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    category: 'Community',
  },
  {
    id: '4',
    title: 'Emergency Relief Fund: Supporting Families in Crisis',
    excerpt: 'Our Emergency Relief Fund has been activated to provide immediate assistance to families facing unexpected hardships. Learn more about how these funds are making a difference and how you can help.',
    date: 'March 15, 2024',
    author: 'David Thompson',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    category: 'Programs',
  },
  {
    id: '5',
    title: 'Transparency Update: Annual Financial Report',
    excerpt: 'As part of our commitment to transparency, we are pleased to share our annual financial report. This document provides a detailed breakdown of how donations are used to support our programs and operations.',
    date: 'March 1, 2024',
    author: 'Lisa Wang',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    category: 'Transparency',
  },
  {
    id: '6',
    title: 'Success Story: Building Hope in Local Communities',
    excerpt: 'Read about how our community development programs have transformed neighborhoods and created lasting positive change. This success story showcases the power of collective action and community support.',
    date: 'February 20, 2024',
    author: 'Robert Martinez',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    category: 'Impact',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-red-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl opacity-20"></div>
      <div className="relative">
      {/* Header */}
      <section className="bg-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog & Updates
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Stay informed about our latest work, impact stories, and community updates
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-red-800/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-red-700/50"
              >
                <div className="relative h-48">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-100 mb-2">
                    {post.date} • {post.author}
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-white mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-red-500 font-semibold hover:text-yellow-300 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-red-800/40 backdrop-blur-sm relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-white mb-6">
            Subscribe to our newsletter to receive the latest updates and stories directly in your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/90 border-2 border-red-600 rounded-lg focus:border-red-600 focus:outline-none text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      </div>
    </div>
  );
}

