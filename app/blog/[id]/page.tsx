import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/**
 * Individual blog post detail page
 */
interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  category: string;
}

// In a real application, this would fetch from a database or CMS
const blogPosts: Record<string, BlogPost> = {
  '1': {
    id: '1',
    title: 'Community Impact Report: Q1 2024',
    content: `We are excited to share our first quarter impact report, highlighting the incredible work made possible by your generous support.

This quarter, we were able to assist over 2,000 individuals across 15 communities. Our programs focused on providing essential resources, emergency assistance, and long-term community development initiatives.

Key highlights from this quarter include:
- Distribution of essential supplies to families in need
- Launch of three new community support programs
- Partnership with local organizations to expand our reach
- Educational workshops that reached over 500 participants

None of this would have been possible without the dedication of our volunteers and the generosity of our donors. Your support enables us to continue making a real difference in the lives of those we serve.

We are grateful for your continued trust and partnership as we work together to build stronger, more resilient communities.`,
    date: 'April 15, 2024',
    author: 'Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80',
    category: 'Impact',
  },
  '2': {
    id: '2',
    title: 'New Partnership Program Launched',
    content: `We are thrilled to announce a new partnership program that will allow us to expand our reach and impact.

This initiative brings together community organizations, businesses, and individuals committed to making a difference. Through strategic partnerships, we can leverage resources, share expertise, and create a more comprehensive support network for those in need.

Partnership benefits include:
- Expanded service areas and increased capacity
- Shared resources and expertise
- Collaborative program development
- Stronger community connections

We believe that by working together, we can achieve far more than any organization could alone. This partnership program represents our commitment to collaboration and collective impact.`,
    date: 'April 5, 2024',
    author: 'Michael Chen',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80',
    category: 'News',
  },
  '3': {
    id: '3',
    title: 'Volunteer Spotlight: Stories of Hope',
    content: `In this special feature, we celebrate the volunteers who dedicate their time and energy to our mission.

Their stories of compassion and commitment inspire us all to do more for our communities. From organizing donation drives to providing direct support to families, our volunteers are the heart of UnitedHope.

This month, we want to recognize volunteers who have gone above and beyond:
- Community coordinators who organize local initiatives
- Outreach volunteers who connect with those in need
- Administrative volunteers who keep our operations running smoothly

These individuals demonstrate that everyone has something valuable to contribute. Their dedication shows that positive change is possible when people come together with a shared purpose.

We are always looking for passionate individuals to join our volunteer team. If you're interested in getting involved, please visit our Contact page.`,
    date: 'March 28, 2024',
    author: 'Emily Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80',
    category: 'Community',
  },
  '4': {
    id: '4',
    title: 'Emergency Relief Fund: Supporting Families in Crisis',
    content: `Our Emergency Relief Fund has been activated to provide immediate assistance to families facing unexpected hardships.

This fund is designed to respond quickly to urgent needs, whether caused by natural disasters, medical emergencies, or unexpected financial crises. When families find themselves in difficult situations, we're here to help bridge the gap.

The Emergency Relief Fund supports:
- Immediate housing and shelter needs
- Essential supplies and groceries
- Medical and utility bill assistance
- Transportation and emergency services

Through the generosity of our donors, we've been able to provide rapid response assistance to dozens of families this year. Your donations to this fund have a direct and immediate impact on those facing crisis situations.

To support the Emergency Relief Fund, visit our Donate page and select "Emergency Relief" as your preferred fund designation.`,
    date: 'March 15, 2024',
    author: 'David Thompson',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    category: 'Programs',
  },
  '5': {
    id: '5',
    title: 'Transparency Update: Annual Financial Report',
    content: `As part of our commitment to transparency, we are pleased to share our annual financial report.

This document provides a detailed breakdown of how donations are used to support our programs and operations. We believe that transparency builds trust and helps donors make informed decisions about their giving.

Key financial highlights:
- 85% of donations go directly to programs and services
- 10% supports operational expenses
- 5% covers administrative costs
- Full financial audit completed by independent auditors

We are proud of our commitment to financial stewardship and transparency. Every dollar is used carefully and responsibly to maximize impact. Complete financial statements and audit reports are available upon request.

Thank you for your trust and support. Together, we are creating meaningful change in our communities.`,
    date: 'March 1, 2024',
    author: 'Lisa Wang',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80',
    category: 'Transparency',
  },
  '6': {
    id: '6',
    title: 'Success Story: Building Hope in Local Communities',
    content: `Read about how our community development programs have transformed neighborhoods and created lasting positive change.

This success story showcases the power of collective action and community support. Through our partnership with local residents and organizations, we've been able to implement programs that address the root causes of community challenges.

The transformation included:
- Community centers that provide resources and support
- Job training and skills development programs
- Health and wellness initiatives
- Youth mentorship programs

These programs have not only provided immediate assistance but have also created sustainable solutions that continue to benefit the community long after implementation.

Success stories like this remind us why we do what we do. They demonstrate that with dedication, collaboration, and community support, we can overcome challenges and build a brighter future for everyone.`,
    date: 'February 20, 2024',
    author: 'Robert Martinez',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80',
    category: 'Impact',
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts[id];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <article className="bg-white">
        {/* Hero Image */}
        <div className="relative h-96 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="text-white">
                {post.date} • By {post.author}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}

