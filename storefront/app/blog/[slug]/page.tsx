import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft, Calendar, Clock, BookOpen, Feather } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '../../../lib/botble';
import ArticleShareBar from '../../../components/blog/ArticleShareBar';
import BlogCard from '../../../components/blog/BlogCard';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Article Not Found — LUNE',
    };
  }

  return {
    title: `${post.name} — The Journal | LUNE`,
    description: post.description,
    openGraph: {
      title: `${post.name} — LUNE`,
      description: post.description,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const { posts: allPosts } = await getBlogPosts({ per_page: 5 });
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const category = post.categories && post.categories.length > 0 ? post.categories[0] : null;
  const authorName = typeof post.author === 'string' ? post.author : post.author?.name || 'Editorial Atelier';

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    : 'Recent Chronicle';

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24 font-sans">
      {/* Article Top Navigation & Meta */}
      <div className="border-b border-neutral-100 bg-neutral-50/50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-xs text-neutral-400 font-light truncate">
              <Link href="/" className="hover:text-neutral-900 transition-colors shrink-0">
                Home
              </Link>
              <ChevronRight size={12} className="shrink-0" />
              <Link href="/blog" className="hover:text-neutral-900 transition-colors shrink-0">
                The Journal
              </Link>
              <ChevronRight size={12} className="shrink-0" />
              <span className="text-neutral-900 font-medium truncate">{post.name}</span>
            </nav>

            {/* Back Button */}
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-black shrink-0 ml-4 font-display"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">Back to Journal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Article Header & Main Column */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Category & Date Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          {category && (
            <span className="inline-block bg-neutral-950 text-white text-[10px] uppercase tracking-[0.25em] font-semibold px-3 py-1 font-display">
              {category.name}
            </span>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-medium text-neutral-950 tracking-tight leading-tight sm:leading-tight">
            {post.name}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 font-light pt-2">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              <span>{post.reading_time || '5 min read'}</span>
            </span>
            <span>&bull;</span>
            <span className="font-medium text-neutral-800 font-display">
              By {authorName}
            </span>
          </div>
        </div>

        {/* Featured Hero Banner Image */}
        <div className="my-10 overflow-hidden border border-neutral-200 aspect-[16/9] sm:aspect-[21/9] bg-neutral-100">
          <img
            src={post.image}
            alt={post.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lead Excerpt Callout */}
        {post.description && (
          <div className="p-6 sm:p-8 bg-neutral-50 border-l-2 border-neutral-950 my-8">
            <p className="text-sm sm:text-base text-neutral-800 font-serif italic leading-relaxed">
              &ldquo;{post.description}&rdquo;
            </p>
          </div>
        )}

        {/* Formatted Article Body */}
        <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-img:border prose-img:border-neutral-200 prose-blockquote:border-l-neutral-900 prose-a:text-neutral-950 prose-a:underline hover:prose-a:text-black">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              {post.description}
            </p>
          )}
        </div>

        {/* Social Share Bar */}
        <ArticleShareBar title={post.name} />

        {/* Author Bio Box */}
        <div className="p-6 sm:p-8 bg-neutral-50 border border-neutral-200/80 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-950 text-white flex items-center justify-center font-display font-medium uppercase text-sm shrink-0">
            {authorName.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display">
                {authorName}
              </span>
              <span className="text-[10px] text-neutral-400">&bull; Editorial Staff</span>
            </div>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Documenting wardrobe styling, fabric care, and the thoughtful design ethos of LUNE.
            </p>
          </div>
        </div>
      </article>

      {/* Related Stories Section */}
      {relatedPosts.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1 font-display">
                Continue Reading
              </span>
              <h3 className="text-2xl font-display font-medium text-neutral-950 tracking-tight">
                Related Stories
              </h3>
            </div>

            <Link
              href="/blog"
              className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:underline font-display"
            >
              All Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map((rPost) => (
              <BlogCard key={rPost.id} post={rPost} aspect="video" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
